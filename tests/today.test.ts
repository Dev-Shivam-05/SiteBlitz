import { describe, it, expect } from "vitest";
import {
  bucketLeads, countYesterdayBySource, istDayStart, istWeekRange, istYmd, ymdToIstDate,
} from "@/lib/today";
import { buildBriefText } from "@/lib/brief";

// IST = UTC+05:30. 2026-11-01 is a Sunday; 2026-11-02 a Monday.
const at = (iso: string) => new Date(iso);

describe("IST day boundaries", () => {
  it("00:00 IST is 18:30 UTC the previous day", () => {
    expect(istDayStart(at("2026-11-01T12:00:00Z")).toISOString()).toBe("2026-10-31T18:30:00.000Z");
  });

  it("23:59 IST still belongs to the same IST day; 00:00 IST starts the next", () => {
    expect(istYmd(at("2026-11-01T18:29:59Z"))).toBe("2026-11-01"); // 23:59:59 IST, Nov 1
    expect(istYmd(at("2026-11-01T18:30:00Z"))).toBe("2026-11-02"); // 00:00 IST, Nov 2
    expect(istYmd(at("2026-11-01T02:00:00Z"))).toBe("2026-11-01"); // 07:30 IST
    expect(istYmd(at("2026-10-31T20:00:00Z"))).toBe("2026-11-01"); // 01:30 IST, while UTC is still Oct 31
  });

  it("ymdToIstDate round-trips and rejects impossible dates", () => {
    expect(ymdToIstDate("2026-11-02")!.toISOString()).toBe("2026-11-01T18:30:00.000Z");
    expect(istYmd(ymdToIstDate("2026-11-02")!)).toBe("2026-11-02");
    expect(ymdToIstDate("2026-02-30")).toBeNull();
    expect(ymdToIstDate("02-11-2026")).toBeNull();
  });
});

describe("IST week (Mon–Sun)", () => {
  it("Sunday 23:59 IST is still in the week that started Monday Oct 26", () => {
    const w = istWeekRange(at("2026-11-01T18:29:00Z"));
    expect(w.start.toISOString()).toBe("2026-10-25T18:30:00.000Z"); // Mon Oct 26, 00:00 IST
    expect(w.end.toISOString()).toBe("2026-11-01T18:30:00.000Z"); // Mon Nov 2, 00:00 IST
  });
  it("Monday 00:00 IST starts a new week", () => {
    const w = istWeekRange(at("2026-11-01T18:30:00Z"));
    expect(w.start.toISOString()).toBe("2026-11-01T18:30:00.000Z");
  });
  it("a Monday 03:00 UTC is Monday IST too", () => {
    expect(istWeekRange(at("2026-11-02T03:00:00Z")).start.toISOString()).toBe("2026-11-01T18:30:00.000Z");
  });
});

describe("bucketLeads", () => {
  // now = Mon 2 Nov 2026, 09:00 IST
  const now = at("2026-11-02T03:30:00Z");
  const todayIst = "2026-11-01T18:30:00.000Z";
  const L = (id: string, status: string, nextActionAt?: string | null) => ({ id, status, nextActionAt });

  const leads = [
    L("overdue-1", "contacted", "2026-10-30T18:30:00.000Z"),
    L("overdue-late-evening", "qualified", "2026-11-01T18:29:59.000Z"), // Sun 23:59:59 IST = yesterday
    L("due-midnight", "demo", todayIst), // Mon 00:00 IST
    L("due-evening", "quoted", "2026-11-02T18:29:59.000Z"), // Mon 23:59:59 IST
    L("tomorrow", "contacted", "2026-11-02T18:30:00.000Z"), // Tue 00:00 IST — on track, hidden
    L("new-no-date", "new"),
    L("new-future", "new", "2026-11-05T18:30:00.000Z"),
    L("new-due-today", "new", todayIst), // due today wins over new
    L("drifting", "qualified", null),
    L("won-overdue", "won", "2026-10-01T00:00:00.000Z"),
    L("lost-no-date", "lost"),
  ];
  const b = bucketLeads(leads, now);
  const ids = (xs: { id: string }[]) => xs.map((x) => x.id);

  it("overdue = before 00:00 IST today, oldest first", () => {
    expect(ids(b.overdue)).toEqual(["overdue-1", "overdue-late-evening"]);
  });
  it("due today = the whole IST day, inclusive of 00:00 and 23:59:59", () => {
    expect(ids(b.dueToday)).toEqual(["due-midnight", "new-due-today", "due-evening"]);
  });
  it("new = status new without a due date today or earlier", () => {
    expect(ids(b.new)).toEqual(["new-no-date", "new-future"]);
  });
  it("no next action = other open leads without a date", () => {
    expect(ids(b.noNextAction)).toEqual(["drifting"]);
  });
  it("won/lost and on-track leads appear nowhere; no lead appears twice", () => {
    const all = [...b.overdue, ...b.dueToday, ...b.new, ...b.noNextAction].map((x) => x.id);
    expect(all).not.toContain("won-overdue");
    expect(all).not.toContain("lost-no-date");
    expect(all).not.toContain("tomorrow");
    expect(new Set(all).size).toBe(all.length);
  });
  it("the same lead flips from due-today to overdue exactly at 00:00 IST", () => {
    const one = [L("x", "contacted", "2026-11-02T10:00:00Z")]; // Mon 15:30 IST
    expect(ids(bucketLeads(one, at("2026-11-02T18:29:59Z")).dueToday)).toEqual(["x"]); // Mon 23:59:59 IST
    expect(ids(bucketLeads(one, at("2026-11-02T18:30:00Z")).overdue)).toEqual(["x"]); // Tue 00:00 IST
  });
});

describe("countYesterdayBySource", () => {
  const now = at("2026-11-02T03:30:00Z"); // Mon 09:00 IST → yesterday = Sun 1 Nov IST
  it("counts only leads created during yesterday (IST), grouped by source code", () => {
    const r = countYesterdayBySource(
      [
        { createdAt: "2026-10-31T18:30:00.000Z", source: { code: "SB-H1" } }, // Sun 00:00 IST
        { createdAt: "2026-11-01T18:29:59.000Z", source: { code: "SB-H1" } }, // Sun 23:59:59 IST
        { createdAt: "2026-11-01T10:00:00.000Z", source: {} }, // legacy web lead → "website"
        { createdAt: "2026-10-31T18:29:59.000Z", source: { code: "SB-G1" } }, // Sat → excluded
        { createdAt: "2026-11-01T18:30:00.000Z", source: { code: "SB-G1" } }, // today → excluded
      ],
      now
    );
    expect(r).toEqual({ total: 3, bySource: { "SB-H1": 2, website: 1 } });
  });
});

describe("buildBriefText", () => {
  it("contains counts only and the admin link", () => {
    const text = buildBriefText({
      now: at("2026-11-02T02:30:00Z"),
      siteUrl: "https://example.test/",
      newYesterday: { total: 3, bySource: { "SB-H1": 2, website: 1 } },
      overdue: 2, dueToday: 4, untouchedNew: 1, noNextAction: 0,
      concepts: { thisWeek: 3, cap: 3 },
      adSpend: { mediaTotal: 420, cap: 800, estimatedWithGst: 496 },
      alerts: { failed: 1, pending: 0 },
      retry: { candidates: 2, sent: 1, failed: 1 },
    });
    expect(text).toContain("New yesterday: 3 — SB-H1 2 · website 1");
    expect(text).toContain("Concepts this week: 3 / 3 (cap reached)");
    expect(text).toContain("₹420 / ₹800");
    expect(text).toContain("₹496 incl. 18% GST");
    expect(text).toContain("https://example.test/admin/today");
    expect(text).not.toMatch(/\d{10}/); // no phone numbers
  });
});
