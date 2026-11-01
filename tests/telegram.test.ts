import { describe, it, expect, vi, beforeEach, afterAll } from "vitest";

/** New-lead alerts: no real network or database. Models are mocked; fetch is spied on. */

const chain = <T>(value: T) => {
  const q = { sort: () => q, limit: () => q, select: () => q, lean: async () => value };
  return q;
};

const Notification = {
  create: vi.fn(async (doc: Record<string, unknown>) => ({ _id: "n-created", ...doc })),
  insertMany: vi.fn(async (docs: Record<string, unknown>[]) => docs.map((d, i) => ({ _id: `n${i}`, ...d }))),
  findOneAndUpdate: vi.fn(() => chain<{ _id: string } | null>({ _id: "claimed" })),
  updateOne: vi.fn(async () => ({})),
  find: vi.fn(() => chain([] as unknown[])),
  exists: vi.fn(async () => null),
  countDocuments: vi.fn(async () => 0),
  findOne: vi.fn(() => chain(null)),
};
const Lead = { find: vi.fn(() => chain([] as unknown[])) };
vi.mock("@/lib/models", () => ({ Notification, Lead }));

const { notifyNewLead, retryNotifications, NOT_CONFIGURED } = await import("@/lib/notify");
const { buildLeadAlertText, sendTelegram, telegramConfig } = await import("@/lib/telegram");

const fetchSpy = vi.spyOn(globalThis, "fetch");
const saved = { token: process.env.TELEGRAM_BOT_TOKEN, ids: process.env.TELEGRAM_CHAT_IDS };

const lead = {
  _id: "64b000000000000000000001",
  ref: "SB-7K2Q",
  name: "Riya Shah",
  phone: "+919876543210",
  message: "Need a salon site, call me on 98765 43210",
  businessType: "salon",
  source: { code: "SB-H1", channel: "whatsapp" },
  createdAt: new Date("2026-11-01T05:02:00Z"),
};

beforeEach(() => {
  vi.clearAllMocks();
  fetchSpy.mockReset();
  delete process.env.TELEGRAM_BOT_TOKEN;
  delete process.env.TELEGRAM_CHAT_IDS;
});
afterAll(() => {
  fetchSpy.mockRestore();
  if (saved.token !== undefined) process.env.TELEGRAM_BOT_TOKEN = saved.token;
  if (saved.ids !== undefined) process.env.TELEGRAM_CHAT_IDS = saved.ids;
});

describe("env missing", () => {
  it("telegramConfig is null without both vars", () => {
    expect(telegramConfig({})).toBeNull();
    expect(telegramConfig({ TELEGRAM_BOT_TOKEN: "t" })).toBeNull();
    expect(telegramConfig({ TELEGRAM_CHAT_IDS: "1,2" })).toBeNull();
    expect(telegramConfig({ TELEGRAM_BOT_TOKEN: "t", TELEGRAM_CHAT_IDS: " 1, ,2 " })).toEqual({ token: "t", chatIds: ["1", "2"] });
  });

  it("notifyNewLead does not call Telegram, records a visible failure, and does not throw", async () => {
    const r = await notifyNewLead(lead);
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(r).toEqual({ configured: false, sent: 0, failed: 1, skipped: 0 });
    expect(Notification.create).toHaveBeenCalledWith(
      expect.objectContaining({ leadId: lead._id, channel: "telegram", status: "failed", lastError: NOT_CONFIGURED })
    );
  });

  it("notifyNewLead swallows a database error", async () => {
    Notification.create.mockRejectedValueOnce(new Error("db down"));
    await expect(notifyNewLead(lead)).resolves.toMatchObject({ configured: false });
  });

  it("retryNotifications does not call Telegram and leaves rows alone", async () => {
    Notification.find.mockReturnValueOnce(chain([{ _id: "n1", status: "failed", attempts: 0, recipient: "", leadId: lead._id }]));
    const r = await retryNotifications();
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(Notification.findOneAndUpdate).not.toHaveBeenCalled();
    expect(r).toMatchObject({ configured: false, candidates: 1, sent: 0 });
  });
});

describe("env configured", () => {
  beforeEach(() => {
    process.env.TELEGRAM_BOT_TOKEN = "123:secret-token";
    process.env.TELEGRAM_CHAT_IDS = "111,222";
  });

  it("creates one notification per recipient and sends each once, with no phone or message", async () => {
    fetchSpy.mockImplementation(async () => new Response(JSON.stringify({ ok: true, result: { message_id: 42 } })));
    const r = await notifyNewLead(lead);
    expect(r).toEqual({ configured: true, sent: 2, failed: 0, skipped: 0 });
    expect(Notification.insertMany).toHaveBeenCalledWith([
      expect.objectContaining({ recipient: "111", status: "pending", attempts: 0 }),
      expect.objectContaining({ recipient: "222", status: "pending", attempts: 0 }),
    ]);
    expect(fetchSpy).toHaveBeenCalledTimes(2);
    for (const [url, init] of fetchSpy.mock.calls) {
      expect(String(url)).toBe("https://api.telegram.org/bot123:secret-token/sendMessage");
      const body = JSON.parse(String((init as RequestInit).body));
      expect(body.text).toContain("SB-7K2Q");
      expect(body.text).not.toMatch(/9876543210|98765 43210|Riya|salon site/);
    }
    expect(Notification.updateOne).toHaveBeenCalledWith(
      { _id: "n0" },
      expect.objectContaining({ $set: expect.objectContaining({ status: "sent", providerMessageId: "42" }) })
    );
  });

  it("records a Telegram error without leaking the bot token", async () => {
    fetchSpy.mockImplementation(async () => {
      throw new Error("connect ECONNREFUSED api.telegram.org/bot123:secret-token");
    });
    const r = await notifyNewLead(lead);
    expect(r.failed).toBe(2);
    const sets = Notification.updateOne.mock.calls.map((c) => JSON.stringify(c));
    expect(sets.join()).not.toContain("secret-token");
    expect(sets.join()).toContain("failed");
  });

  it("skips a notification another retry already claimed (idempotent)", async () => {
    Notification.findOneAndUpdate.mockReturnValue(chain(null));
    fetchSpy.mockImplementation(async () => new Response(JSON.stringify({ ok: true, result: { message_id: 1 } })));
    const r = await notifyNewLead(lead);
    expect(r).toEqual({ configured: true, sent: 0, failed: 0, skipped: 2 });
    expect(fetchSpy).not.toHaveBeenCalled();
    Notification.findOneAndUpdate.mockImplementation(() => chain({ _id: "claimed" }));
  });
});

describe("sendTelegram", () => {
  it("gives up after the timeout instead of hanging", async () => {
    fetchSpy.mockImplementation(
      (_url, init) =>
        new Promise((_resolve, reject) => {
          (init as RequestInit).signal!.addEventListener("abort", () => reject(new Error("aborted")));
        })
    );
    const t0 = Date.now();
    const r = await sendTelegram("tok", "1", "hi", 50);
    expect(r).toEqual({ ok: false, error: "timeout" });
    expect(Date.now() - t0).toBeLessThan(1000);
  });

  it("reports an HTTP error with Telegram's description", async () => {
    fetchSpy.mockImplementation(async () => new Response(JSON.stringify({ ok: false, description: "chat not found" }), { status: 400 }));
    expect(await sendTelegram("tok", "1", "hi")).toEqual({ ok: false, error: "telegram_http_400: chat not found" });
  });
});

describe("buildLeadAlertText", () => {
  it("has ref, business type, source, IST time and the admin link only", () => {
    const text = buildLeadAlertText(lead, "https://siteblitz.example");
    expect(text).toBe(
      [
        "New lead SB-7K2Q",
        "Business: salon",
        "Source: SB-H1 / whatsapp",
        "Time: 01 Nov, 10:32 am IST",
        "https://siteblitz.example/admin/leads?q=SB-7K2Q",
      ].join("\n")
    );
  });
});
