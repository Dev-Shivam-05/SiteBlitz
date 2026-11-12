import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { NextRequest } from "next/server";
import { emailHash, signToken } from "@/lib/outreachToken";
import { CONCEPT_LABEL } from "@/lib/outreachPages";
import { assertNoScripts, assertPrivatePage } from "./helpers/outreach";
import { mongodBinary, startScratchMongo, type ScratchMongo } from "./helpers/scratch-mongo";

/** Outreach flows against a real, throwaway MongoDB (tests/helpers/scratch-mongo.ts: a local mongod on a temp dbpath,
 *  127.0.0.1 only). Unsubscribe, suppression API and snapshot pages, then a real "database down" at the end. */

const KEY = "db-suite-outreach-api-key-0123456789abcdef";
const SECRET = "db-suite-outreach-signing-secret-0123456789";
const BASE = "https://outreach.siteblitz.test";

type Handler = (req: NextRequest, ctx: { params: Promise<Record<string, string>> }) => Promise<Response>;
const R: Record<string, Handler> = {};
let mongo: ScratchMongo;
let models: typeof import("@/lib/models");

const HAS_MONGOD = mongodBinary() !== null;
if (!HAS_MONGOD) console.warn("outreach-db.test.ts skipped: no mongod binary (set MONGOD_BINARY)");

beforeAll(async () => {
  if (!HAS_MONGOD) return;
  mongo = await startScratchMongo();
  // Set before the first import of src/lib/db.ts, which reads MONGODB_URI once at module load.
  expect(mongo.uri).toMatch(/^mongodb:\/\/127\.0\.0\.1:\d+$/);
  process.env.MONGODB_URI = mongo.uri;
  process.env.MONGODB_DB = "sb_outreach_test";
  process.env.OUTREACH_API_KEY = KEY;
  process.env.OUTREACH_SIGNING_SECRET = SECRET;
  process.env.OUTREACH_PUBLIC_BASE_URL = `${BASE}/`;
  R.check = (await import("@/app/api/outreach/suppressions/check/route")).POST as Handler;
  const sup = await import("@/app/api/outreach/suppressions/route");
  R.suppress = sup.POST as Handler;
  R.list = sup.GET as Handler;
  R.snapshot = (await import("@/app/api/outreach/snapshots/route")).POST as Handler;
  const u = await import("@/app/u/[token]/route");
  R.uGet = u.GET as Handler;
  R.uPost = u.POST as Handler;
  R.sGet = (await import("@/app/s/[slug]/route")).GET as Handler;
  R.sRemove = (await import("@/app/s/[slug]/remove/route")).POST as Handler;
  models = await import("@/lib/models");
}, 90_000);

afterAll(async () => {
  if (!HAS_MONGOD) return;
  const mongoose = (await import("mongoose")).default;
  await mongoose.disconnect().catch(() => {});
  globalThis._mongoose = undefined;
  await mongo?.stop();
}, 60_000);

const none = { params: Promise.resolve({}) };
const ctx = (p: Record<string, string>) => ({ params: Promise.resolve(p) });

function api(body: unknown, path = "/x", method = "POST") {
  return new NextRequest(`http://localhost${path}`, {
    method,
    headers: { authorization: `Bearer ${KEY}`, "content-type": "application/json" },
    body: method === "GET" ? undefined : JSON.stringify(body),
  });
}
async function checkHashes(hashes: string[]): Promise<string[]> {
  const res = await R.check(api({ hashes }), none);
  expect(res.status).toBe(200);
  expect(res.headers.get("cache-control")).toBe("no-store");
  const json = await res.json();
  expect(Date.parse(json.checked_at)).not.toBeNaN();
  return json.suppressed;
}
const uReq = (t: string, method = "GET", body?: BodyInit, type?: string) =>
  new NextRequest(`http://localhost/u/${t}`, { method, body, headers: type ? { "content-type": type } : {} });

describe.skipIf(!HAS_MONGOD)("unsubscribe (/u/{token}) with a database", () => {
  const hash = emailHash("salon.owner@example.com");
  const token = () => signToken(hash, "send-42", SECRET);

  it("GET shows the question and does NOT suppress (link scanners open every link)", async () => {
    for (let i = 0; i < 3; i++) {
      const res = await R.uGet(uReq(token()), ctx({ token: token() }));
      expect(res.status).toBe(200);
    }
    expect(await checkHashes([hash])).toEqual([]);
    expect(await models.OutreachSuppression.countDocuments({})).toBe(0);
  });

  it("one-click POST suppresses, answers plain 'ok' with 200, no redirect", async () => {
    const res = await R.uPost(uReq(token(), "POST", "List-Unsubscribe=One-Click", "application/x-www-form-urlencoded"), ctx({ token: token() }));
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("text/plain; charset=utf-8");
    expect(res.headers.get("location")).toBeNull();
    expect(await res.text()).toBe("ok");
    expect(await checkHashes([hash])).toEqual([hash]);
    const doc = await models.OutreachSuppression.findOne({ hash }).lean();
    expect(doc?.reason).toBe("unsubscribe_one_click");
    expect(doc?.source).toBe("send:send-42");
    expect(doc?.history).toEqual([]);
  });

  it("is idempotent: repeating it keeps one document, the first reason and time, and logs the repeat", async () => {
    const before = await models.OutreachSuppression.findOne({ hash }).lean();
    const fd = new FormData();
    fd.set("List-Unsubscribe", "One-Click");
    const again = await R.uPost(uReq(token(), "POST", fd), ctx({ token: token() })); // multipart this time
    expect(again.status).toBe(200);
    expect(await again.text()).toBe("ok");
    const form = await R.uPost(uReq(token(), "POST", "confirm=1", "application/x-www-form-urlencoded"), ctx({ token: token() }));
    expect(form.status).toBe(200);
    assertPrivatePage(form);
    expect(await form.text()).toContain("No more");
    expect(await models.OutreachSuppression.countDocuments({ hash })).toBe(1);
    const after = await models.OutreachSuppression.findOne({ hash }).lean();
    expect(after?.reason).toBe("unsubscribe_one_click");
    expect(after?.created_at.getTime()).toBe(before?.created_at.getTime());
    expect(after?.history.map((h) => h.reason)).toEqual(["unsubscribe_one_click", "unsubscribe_link"]);
  });

  it("the page's own button suppresses with reason unsubscribe_link and shows a confirmation page", async () => {
    const h2 = emailHash("coach@example.com");
    const t2 = signToken(h2, "send-43", SECRET);
    const res = await R.uPost(uReq(t2, "POST", "confirm=1", "application/x-www-form-urlencoded"), ctx({ token: t2 }));
    expect(res.status).toBe(200);
    const page = await res.text();
    expect(page).toContain("will not email this address again");
    assertNoScripts(page);
    expect((await models.OutreachSuppression.findOne({ hash: h2 }).lean())?.reason).toBe("unsubscribe_link");
  });

  it("a tampered or foreign-secret token writes nothing", async () => {
    const h3 = emailHash("someone@example.com");
    for (const t of [signToken(h3, "send-44", SECRET + "x"), signToken(h3, "send-44", SECRET).replace(/.$/, "A")]) {
      const res = await R.uPost(uReq(t, "POST", "List-Unsubscribe=One-Click", "application/x-www-form-urlencoded"), ctx({ token: t }));
      expect(res.status).toBe(400);
    }
    expect(await models.OutreachSuppression.countDocuments({ hash: h3 })).toBe(0);
  });
});

describe.skipIf(!HAS_MONGOD)("suppression API with a database", () => {
  it("POST upserts; the first reason/source/time stay and later ones go to history", async () => {
    const hash = emailHash("bounce@example.com");
    expect((await R.suppress(api({ hash, reason: "hard_bounce", source: "smtp 550 5.1.1" }), none)).status).toBe(200);
    const res = await R.suppress(api({ hash, reason: "reply_stop", source: "reply 2026-11-12" }), none);
    expect(res.status).toBe(200);
    expect(res.headers.get("cache-control")).toBe("no-store");
    expect(await res.json()).toEqual({ ok: true });
    const doc = await models.OutreachSuppression.findOne({ hash }).lean();
    expect(doc?.reason).toBe("hard_bounce");
    expect(doc?.source).toBe("smtp 550 5.1.1");
    expect(doc?.history).toHaveLength(1);
    expect(doc?.history[0]).toMatchObject({ reason: "reply_stop", source: "reply 2026-11-12" });
  });

  it("check returns only the suppressed hashes among up to 500", async () => {
    const clean = Array.from({ length: 497 }, (_, i) => emailHash(`clean${i}@example.com`));
    const hit = emailHash("bounce@example.com");
    const got = await checkHashes([...clean, hit, hit, emailHash("salon.owner@example.com")]);
    expect(got.sort()).toEqual([hit, emailHash("salon.owner@example.com")].sort());
  });

  it("history is capped at 100 events per address", async () => {
    const hash = emailHash("repeat@example.com");
    for (let i = 0; i < 105; i++) await R.suppress(api({ hash, reason: "manual", source: `n${i}` }), none);
    const doc = await models.OutreachSuppression.findOne({ hash }).lean();
    expect(doc?.history).toHaveLength(100);
    expect(doc?.history[99].source).toBe("n104");
    expect(doc?.source).toBe("n0");
  });

  it("GET pages 1,000 at a time with an inclusive since; following next reaches every item", async () => {
    const start = Date.UTC(2020, 0, 1);
    await models.OutreachSuppression.insertMany(
      Array.from({ length: 1001 }, (_, i) => ({
        hash: emailHash(`page${i}@example.com`),
        reason: "manual",
        source: "",
        created_at: new Date(start + i * 1000),
        history: [],
      }))
    );
    const page1 = await (await R.list(api(null, `/x?since=${new Date(start).toISOString()}`, "GET"), none)).json();
    expect(page1.items).toHaveLength(1000);
    expect(Object.keys(page1.items[0]).sort()).toEqual(["created_at", "hash", "reason"]);
    expect(page1.next).toBe(page1.items[999].created_at);
    const res2 = await R.list(api(null, `/x?since=${encodeURIComponent(page1.next)}`, "GET"), none);
    expect(res2.headers.get("cache-control")).toBe("no-store");
    const page2 = await res2.json();
    const seen = new Set([...page1.items, ...page2.items].map((i: { hash: string }) => i.hash));
    for (let i = 0; i < 1001; i++) expect(seen.has(emailHash(`page${i}@example.com`))).toBe(true);
    expect(page2.next).toBeNull(); // the rest (the 2020 batch tail + this suite's earlier rows) fits in one page
  });

  it("a concurrent first suppression of the same address leaves exactly one document", async () => {
    const hash = emailHash("race@example.com");
    const results = await Promise.all(
      Array.from({ length: 8 }, (_, i) => R.suppress(api({ hash, reason: "complaint", source: `p${i}` }), none))
    );
    expect(results.map((r) => r.status)).toEqual(Array(8).fill(200));
    expect(await models.OutreachSuppression.countDocuments({ hash })).toBe(1);
    expect((await models.OutreachSuppression.findOne({ hash }).lean())?.history).toHaveLength(7);
  });
});

/* ------------------------------------------------------------------ */
/* Snapshots                                                           */
/* ------------------------------------------------------------------ */

// 1x1 PNG
const PNG = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

const snapshotBody = (over: Record<string, unknown> = {}) => ({
  business_name: "Shree Ganesh Hair & Beauty",
  city: "Navsari",
  vertical: "salon_beauty",
  observation: {
    type: "SOCIAL_ONLY",
    text: "On 10 Nov 2026 we found the salon on Instagram and Google Maps, but no website of its own.",
    checked_at: "2026-11-10T11:30:00+05:30",
  },
  evidence_image_base64: PNG,
  concept_demo: "salon",
  offer: {
    price_inr: 7999,
    scope_lines: ["One responsive page", "Services and timings", "WhatsApp and call buttons"],
    yearly_costs_note: "Domain about Rs 900 a year, paid by you; hosting on a free plan.",
  },
  recording: { url: "https://media.siteblitz.test/overview-salon.mp3", transcript: "Hello. This is a short overview.\nSecond line." },
  reply_email: "hello@siteblitz.test",
  expires_in_days: 30,
  ...over,
});

async function create(over: Record<string, unknown> = {}) {
  const res = await R.snapshot(api(snapshotBody(over)), none);
  return { res, json: await res.json() };
}
const sGet = (slug: string) => R.sGet(new NextRequest(`http://localhost/s/${slug}`), ctx({ slug }));
const sRemove = (slug: string) => R.sRemove(new NextRequest(`http://localhost/s/${slug}/remove`, { method: "POST" }), ctx({ slug }));

describe.skipIf(!HAS_MONGOD)("snapshot pages with a database", () => {
  let slug = "";

  it("create answers slug, public URL and expiry", async () => {
    const { res, json } = await create();
    expect(res.status).toBe(200);
    expect(res.headers.get("cache-control")).toBe("no-store");
    expect(json.slug).toMatch(/^shree-ganesh-hair-beauty-[a-z2-7]{10}$/);
    expect(json.url).toBe(`${BASE}/s/${json.slug}`);
    const days = (Date.parse(json.expires_at) - Date.now()) / 86_400_000;
    expect(days).toBeGreaterThan(29.9);
    expect(days).toBeLessThanOrEqual(30);
    slug = json.slug;
  });

  it("the page renders all three layers, the concept label, no autoplay and no scripts", async () => {
    const res = await sGet(slug);
    expect(res.status).toBe(200);
    assertPrivatePage(res);
    const page = await res.text();
    assertNoScripts(page);
    // layer 1: business name, the observation, a one-line offer
    expect(page).toContain("Shree Ganesh Hair &amp; Beauty</h1>");
    expect(page).toContain("found the salon on Instagram and Google Maps");
    expect(page).toContain("₹7,999 one-time");
    // layer 2: date checked, evidence image, concept from the salon demo with the label
    expect(page).toContain("Checked on <span class=\"serif\">10 Nov 2026</span>");
    expect(page).toContain(`src="data:image/png;base64,${PNG}"`);
    expect(page).toContain(CONCEPT_LABEL);
    expect(page.indexOf(CONCEPT_LABEL)).toBeLessThan(page.indexOf("A little time, just for you."));
    expect(page).toContain("demo-salon");
    expect(page).toContain("Shree Ganesh Hair &amp; Beauty, Navsari");
    expect(page).not.toContain("Rose &amp; Comb"); // the fictional demo brand is replaced
    expect(page).not.toMatch(/\/photos\//); // no photographs in the concept
    // layer 3: scope, price, yearly costs, recording with transcript, reply button, removal
    for (const l of ["One responsive page", "Services and timings", "WhatsApp and call buttons", "Domain about Rs 900 a year"]) expect(page).toContain(l);
    expect(page).toContain('<audio controls preload="none" src="https://media.siteblitz.test/overview-salon.mp3"></audio>');
    expect(page).not.toMatch(/autoplay/i);
    expect(page).toContain("General recorded overview");
    expect(page).toContain("Hello. This is a short overview.\nSecond line.");
    expect(page).toContain('href="mailto:hello@siteblitz.test?subject=Website%20snapshot%3A%20Shree%20Ganesh%20Hair%20%26%20Beauty"');
    expect(page).toContain(`<form class="remove" method="post" action="/s/${slug}/remove">`);
    expect(page).toContain('<meta name="robots" content="noindex, nofollow">');
  });

  it("counts raw requests server-side", async () => {
    await sGet(slug);
    const doc = await models.OutreachSnapshot.findOne({ slug }).lean();
    expect(doc?.raw_view_count).toBe(2);
  });

  it("hides the recording block when there is no recording", async () => {
    const { json } = await create({ recording: undefined, evidence_image_base64: undefined, concept_demo: "coaching", business_name: "BrightStar Tuition" });
    const page = await (await sGet(json.slug)).text();
    expect(page).not.toContain("<audio");
    expect(page).not.toContain("General recorded overview");
    expect(page).not.toContain("data:image");
    expect(page).toContain("demo-coaching");
    expect(page).toContain(CONCEPT_LABEL);
  });

  it("escapes everything that came from the lead generator", async () => {
    const { json } = await create({ business_name: '<script>alert(1)</script> "Salon"', city: "<b>Surat</b>" });
    expect(json.slug).toMatch(/^script-alert-1-script-salon-[a-z2-7]{10}$/);
    const page = await (await sGet(json.slug)).text();
    assertNoScripts(page);
    expect(page).toContain("&lt;script&gt;alert(1)&lt;/script&gt; &quot;Salon&quot;");
    expect(page).not.toContain("<b>Surat</b>");
  });

  it("expired -> 410 with no business data", async () => {
    const { json } = await create({ business_name: "Expired Showroom", concept_demo: "showroom" });
    await models.OutreachSnapshot.updateOne({ slug: json.slug }, { $set: { expires_at: new Date(Date.now() - 1000) } });
    const res = await sGet(json.slug);
    expect(res.status).toBe(410);
    assertPrivatePage(res);
    const page = await res.text();
    assertNoScripts(page);
    expect(page).not.toContain("Expired Showroom");
    expect(page).not.toContain("Navsari");
    expect((await models.OutreachSnapshot.findOne({ slug: json.slug }).lean())?.raw_view_count).toBe(0);
  });

  it("removal is final: 200 'removed', then 410; removing again is still 200", async () => {
    const first = await sRemove(slug);
    expect(first.status).toBe(200);
    assertPrivatePage(first);
    expect(await first.text()).toContain("removed");
    const doc = await models.OutreachSnapshot.findOne({ slug }).lean();
    expect(doc?.removed_at).toBeInstanceOf(Date);
    const gone = await sGet(slug);
    expect(gone.status).toBe(410);
    expect(await gone.text()).not.toContain("Shree Ganesh");
    expect((await sRemove(slug)).status).toBe(200);
    expect((await models.OutreachSnapshot.findOne({ slug }).lean())?.removed_at?.getTime()).toBe(doc?.removed_at?.getTime());
  });

  it("an unknown slug -> 404", async () => {
    expect((await sGet("no-such-page-abcdefghij")).status).toBe(404);
    expect((await sRemove("no-such-page-abcdefghij")).status).toBe(404);
  });

  it.each([
    ["recording url without transcript", { recording: { url: "https://x.test/a.mp3" } }],
    ["http recording url", { recording: { url: "http://x.test/a.mp3", transcript: "t" } }],
    ["transcript over 2,000", { recording: { url: "https://x.test/a.mp3", transcript: "x".repeat(2001) } }],
    ["image not PNG/JPEG", { evidence_image_base64: Buffer.from("GIF89a-not-allowed").toString("base64") }],
    ["image over 400 KB", { evidence_image_base64: Buffer.concat([Buffer.from(PNG, "base64"), Buffer.alloc(410_000)]).toString("base64") }],
    ["7 scope lines", { offer: { price_inr: 7999, scope_lines: Array(7).fill("x"), yearly_costs_note: "n" } }],
    ["scope line over 120", { offer: { price_inr: 7999, scope_lines: ["x".repeat(121)], yearly_costs_note: "n" } }],
    ["31 days", { expires_in_days: 31 }],
    ["unknown vertical", { vertical: "restaurant" }],
    ["unknown demo", { concept_demo: "restaurant" }],
    ["business name over 120", { business_name: "x".repeat(121) }],
    ["observation over 300", { observation: { type: "SITE_DOWN", text: "x".repeat(301), checked_at: "2026-11-10" } }],
    ["bad checked_at", { observation: { type: "SITE_DOWN", text: "t", checked_at: "yesterday" } }],
    ["bad reply email", { reply_email: "not an email" }],
  ])("create rejects %s with 400", async (_label, over) => {
    const { res, json } = await create(over);
    expect(res.status).toBe(400);
    expect(json.ok).toBe(false);
  });
});

describe.skipIf(!HAS_MONGOD)("database down (the scratch mongod is stopped)", () => {
  beforeAll(async () => {
    await mongo.stop();
  }, 60_000);

  it("check answers 503, so the lead generator sends nothing", async () => {
    const res = await R.check(api({ hashes: [emailHash("x@example.com")] }), none);
    expect(res.status).toBe(503);
    expect(await res.json()).toEqual({ ok: false, error: "db_unavailable" });
  }, 60_000);

  it("unsubscribe POST answers 503, never a false 'ok'", async () => {
    const t = signToken(emailHash("late@example.com"), "send-99", SECRET);
    const res = await R.uPost(uReq(t, "POST", "List-Unsubscribe=One-Click", "application/x-www-form-urlencoded"), ctx({ token: t }));
    expect(res.status).toBe(503);
    expect(await res.text()).not.toBe("ok");
  }, 60_000);

  it("snapshot page and creation answer 503", async () => {
    expect((await sGet("shree-ganesh-hair-beauty-abcdefghij")).status).toBe(503);
    expect((await create()).res.status).toBe(503);
  }, 60_000);
});
