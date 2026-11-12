import { readFileSync } from "node:fs";
import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { signToken, emailHash } from "@/lib/outreachToken";
import { assertNoScripts, assertPrivatePage } from "./helpers/outreach";

/** Outreach routes without a database (docs/spec/outreach-contract.md): auth, validation, the 503 cases, the /u/ page
 *  and everything that could sit between a mail provider and /u/ or /s/ (middleware, redirects, scripts). The flows that
 *  write data are in tests/outreach-db.test.ts. */

const KEY = "test-outreach-api-key-0123456789abcdef";
const SECRET = "test-outreach-signing-secret-0123456789";
delete process.env.MONGODB_URI; // nothing here may reach a database

type Handler = (req: NextRequest, ctx: { params: Promise<Record<string, string>> }) => Promise<Response>;
let check: Handler, suppressPost: Handler, suppressGet: Handler, snapshots: Handler;
let uGet: Handler, uPost: Handler, sGet: Handler, sRemove: Handler;

beforeAll(async () => {
  check = (await import("@/app/api/outreach/suppressions/check/route")).POST as Handler;
  const sup = await import("@/app/api/outreach/suppressions/route");
  suppressPost = sup.POST as Handler;
  suppressGet = sup.GET as Handler;
  snapshots = (await import("@/app/api/outreach/snapshots/route")).POST as Handler;
  const u = await import("@/app/u/[token]/route");
  uGet = u.GET as Handler;
  uPost = u.POST as Handler;
  sGet = (await import("@/app/s/[slug]/route")).GET as Handler;
  sRemove = (await import("@/app/s/[slug]/remove/route")).POST as Handler;
});

beforeEach(() => {
  process.env.OUTREACH_API_KEY = KEY;
  process.env.OUTREACH_SIGNING_SECRET = SECRET;
});

const HASH = emailHash("owner@example.com");
const noParams = { params: Promise.resolve({}) };

function api(path: string, body: unknown, auth: string | null = `Bearer ${KEY}`, method = "POST") {
  const headers: Record<string, string> = { "content-type": "application/json" };
  if (auth) headers.authorization = auth;
  return new NextRequest(`http://localhost${path}`, {
    method,
    headers,
    body: method === "GET" ? undefined : typeof body === "string" ? body : JSON.stringify(body),
  });
}

const API_CALLS: [string, () => Promise<Response>, (auth: string | null) => Promise<Response>][] = [
  ["POST check", () => check(api("/api/outreach/suppressions/check", { hashes: [HASH] }), noParams), (a) => check(api("/x", { hashes: [HASH] }, a), noParams)],
  ["POST suppressions", () => suppressPost(api("/x", { hash: HASH, reason: "manual" }), noParams), (a) => suppressPost(api("/x", { hash: HASH, reason: "manual" }, a), noParams)],
  ["GET suppressions", () => suppressGet(api("/x", null, `Bearer ${KEY}`, "GET"), noParams), (a) => suppressGet(api("/x", null, a, "GET"), noParams)],
  ["POST snapshots", () => snapshots(api("/x", {}), noParams), (a) => snapshots(api("/x", {}, a), noParams)],
];

describe("Bearer API: auth", () => {
  it.each(API_CALLS)("%s answers 401 without the key, with a wrong key and with a non-Bearer scheme", async (_n, _ok, call) => {
    for (const auth of [null, `Bearer ${KEY}x`, `Bearer ${KEY.slice(0, -1)}`, `Basic ${KEY}`, KEY, "Bearer "]) {
      const res = await call(auth);
      expect(res.status, String(auth)).toBe(401);
      expect(res.headers.get("cache-control")).toBe("no-store");
      expect(await res.json()).toEqual({ ok: false, error: "Unauthorized" });
    }
  });

  it.each(API_CALLS)("%s answers 503 when the key or the signing secret is missing or short (never an insecure default)", async (_n, _ok, call) => {
    for (const [k, s] of [["", SECRET], [KEY, ""], ["short-key", SECRET], [KEY, "short-secret"]]) {
      process.env.OUTREACH_API_KEY = k;
      process.env.OUTREACH_SIGNING_SECRET = s;
      const res = await call(`Bearer ${k}`);
      expect(res.status, `${k}/${s}`).toBe(503);
      expect((await res.json()).error).toBe("outreach_not_configured");
    }
  });

  it.each(API_CALLS)("%s answers 503 when the database is unavailable", async (_n, call) => {
    if (_n === "POST snapshots") return; // needs a valid body first; covered in outreach-db.test.ts
    const res = await call();
    expect(res.status).toBe(503);
    expect(res.headers.get("cache-control")).toBe("no-store");
    expect(await res.json()).toEqual({ ok: false, error: "db_unavailable" });
  });
});

describe("Bearer API: validation (400 before any database work)", () => {
  const bad: [string, Handler | (() => Handler), unknown][] = [
    ["check: uppercase hash", () => check, { hashes: [HASH.toUpperCase()] }],
    ["check: short hash", () => check, { hashes: ["abc"] }],
    ["check: 501 hashes", () => check, { hashes: Array.from({ length: 501 }, () => HASH) }],
    ["check: no array", () => check, { hash: HASH }],
    ["check: not JSON", () => check, "{not json"],
    ["suppress: bad reason", () => suppressPost, { hash: HASH, reason: "unsubscribe_link" }],
    ["suppress: unknown reason", () => suppressPost, { hash: HASH, reason: "spam" }],
    ["suppress: source over 200", () => suppressPost, { hash: HASH, reason: "manual", source: "x".repeat(201) }],
    ["suppress: bad hash", () => suppressPost, { hash: "z".repeat(64), reason: "manual" }],
    ["snapshot: empty", () => snapshots, {}],
  ];
  it.each(bad)("%s -> 400", async (_label, h, body) => {
    const res = await (h as () => Handler)()(api("/x", body), noParams);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.ok).toBe(false);
    expect(json.error).toBe("Invalid input");
  });

  it("500 hashes is the maximum that passes validation (then 503: no database here)", async () => {
    const res = await check(api("/x", { hashes: Array.from({ length: 500 }, () => HASH) }), noParams);
    expect(res.status).toBe(503);
  });

  it("GET with an invalid since -> 400", async () => {
    const res = await suppressGet(api("/x?since=yesterday", null, `Bearer ${KEY}`, "GET"), noParams);
    expect(res.status).toBe(400);
  });
});

/* ------------------------------------------------------------------ */
/* /u/ and /s/ without a database                                      */
/* ------------------------------------------------------------------ */

const token = () => signToken(HASH, "send-1", SECRET);
const uReq = (t: string, method = "GET", body?: string, type = "application/x-www-form-urlencoded") =>
  new NextRequest(`http://localhost/u/${t}`, { method, body, headers: body ? { "content-type": type } : {} });
const ctx = (p: Record<string, string>) => ({ params: Promise.resolve(p) });

describe("/u/{token} without a database", () => {
  it("GET with a valid token shows the question and one button, works without a database (GET writes nothing)", async () => {
    const res = await uGet(uReq(token()), ctx({ token: token() }));
    expect(res.status).toBe(200);
    assertPrivatePage(res);
    const page = await res.text();
    expect(page).toContain("Stop emails from SiteBlitz to this address?");
    expect(page.match(/<button/g)).toHaveLength(1);
    expect(page).toMatch(/<form method="post">/);
    expect(page).toContain('<meta name="robots" content="noindex, nofollow">');
    assertNoScripts(page);
  });

  it("GET with a tampered token -> 400 page", async () => {
    const t = token().slice(0, -2) + "AA";
    const res = await uGet(uReq(t), ctx({ token: t }));
    expect(res.status).toBe(400);
    assertPrivatePage(res);
    assertNoScripts(await res.text());
  });

  it("GET without a usable signing secret -> 503 page, even for a token that would be valid", async () => {
    process.env.OUTREACH_SIGNING_SECRET = "";
    const res = await uGet(uReq(token()), ctx({ token: token() }));
    expect(res.status).toBe(503);
    process.env.OUTREACH_SIGNING_SECRET = "short";
    expect((await uGet(uReq("x.y"), ctx({ token: "x.y" }))).status).toBe(503);
  });

  it("GET keeps working when only the API key is missing (unsubscribes must not depend on it)", async () => {
    process.env.OUTREACH_API_KEY = "";
    expect((await uGet(uReq(token()), ctx({ token: token() }))).status).toBe(200);
  });

  it("POST with a valid token but no database -> 503, never a success", async () => {
    const res = await uPost(uReq(token(), "POST", "List-Unsubscribe=One-Click"), ctx({ token: token() }));
    expect(res.status).toBe(503);
    expect(await res.text()).not.toBe("ok");
    const form = await uPost(uReq(token(), "POST", "confirm=1"), ctx({ token: token() }));
    expect(form.status).toBe(503);
    assertPrivatePage(form);
  });

  it("POST with a bad token -> 400 (plain for one-click, page for the form)", async () => {
    const one = await uPost(uReq("abc.def", "POST", "List-Unsubscribe=One-Click"), ctx({ token: "abc.def" }));
    expect(one.status).toBe(400);
    expect(one.headers.get("content-type")).toContain("text/plain");
    const form = await uPost(uReq("abc.def", "POST", "confirm=1"), ctx({ token: "abc.def" }));
    expect(form.status).toBe(400);
    expect(form.headers.get("content-type")).toContain("text/html");
  });
});

describe("/s/{slug} without a database", () => {
  it("malformed slug -> 404 page with no scripts", async () => {
    const res = await sGet(new NextRequest("http://localhost/s/Bad_Slug"), ctx({ slug: "Bad_Slug" }));
    expect(res.status).toBe(404);
    assertPrivatePage(res);
    assertNoScripts(await res.text());
  });

  it("well-formed slug, no database -> 503 (GET and remove)", async () => {
    const slug = "shree-salon-abcdefghij";
    expect((await sGet(new NextRequest(`http://localhost/s/${slug}`), ctx({ slug }))).status).toBe(503);
    expect((await sRemove(new NextRequest(`http://localhost/s/${slug}/remove`, { method: "POST" }), ctx({ slug }))).status).toBe(503);
  });

  it("the remove route has no GET (a link scanner cannot remove a page)", async () => {
    const mod = await import("@/app/s/[slug]/remove/route");
    expect("GET" in mod).toBe(false);
  });
});

/* ------------------------------------------------------------------ */
/* Nothing in front of /u/ and /s/                                     */
/* ------------------------------------------------------------------ */

describe("no middleware, redirect, auth or analytics in front of /u/ and /s/", () => {
  it("the middleware matcher covers only /admin and /api/admin", async () => {
    const { config } = await import("@/middleware");
    for (const m of config.matcher) expect(m).toMatch(/^\/(admin|api\/admin)(\/|$)/);
  });

  it("the middleware passes /u/ and /s/ requests straight through", async () => {
    process.env.JWT_SECRET = "outreach-suite-jwt-secret-only-for-this-test";
    const { middleware } = await import("@/middleware");
    for (const path of [`/u/${token()}`, "/s/shree-salon-abcdefghij", "/s/shree-salon-abcdefghij/remove"]) {
      const res = await middleware(new NextRequest(`https://siteblitz.test${path}`, { method: "POST" }));
      expect(res.headers.get("location"), path).toBeNull();
      expect(res.headers.get("x-middleware-next"), path).toBe("1");
    }
  });

  it("next.config has no trailing-slash, redirect or rewrite rules", async () => {
    const cfg = (await import("../next.config")).default as Record<string, unknown>;
    expect(cfg.trailingSlash).toBeFalsy();
    expect(cfg.redirects).toBeUndefined();
    expect(cfg.rewrites).toBeUndefined();
    expect(cfg.basePath).toBeUndefined();
    const headers = await (cfg.headers as () => Promise<{ source: string; headers: { key: string }[] }[]>)();
    for (const rule of headers) for (const h of rule.headers) expect(h.key.toLowerCase()).not.toMatch(/location|refresh|set-cookie/);
  });

  it("vercel.json and netlify.toml add no redirects, rewrites or trailing-slash handling", () => {
    const vercel = JSON.parse(readFileSync("vercel.json", "utf8"));
    for (const k of ["redirects", "rewrites", "routes", "trailingSlash", "cleanUrls"]) expect(vercel[k], k).toBeUndefined();
    const netlify = readFileSync("netlify.toml", "utf8");
    expect(netlify).not.toMatch(/\[\[(redirects|edge_functions)\]\]/);
  });

  it("the /u/ and /s/ route files do not import the analytics Tracker or any React page shell", () => {
    for (const f of ["src/app/u/[token]/route.ts", "src/app/s/[slug]/route.ts", "src/app/s/[slug]/remove/route.ts", "src/lib/outreachPages.ts"]) {
      const src = readFileSync(f, "utf8");
      const imports = src.split("\n").filter((l) => /^import\b/.test(l)).join("\n");
      expect(imports, f).not.toMatch(/Tracker|components\/|next\/script|\/api\/track/);
      expect(src, f).not.toMatch(/sbTrack|fetch\(/);
    }
  });
});

describe("look: only the site's own colours and fonts", () => {
  it("every colour in the outreach stylesheet is defined in globals.css", async () => {
    const { OUTREACH_CSS } = await import("@/lib/outreachPages");
    const globals = readFileSync("src/app/globals.css", "utf8").toLowerCase().replace(/\s+/g, "");
    const colours = OUTREACH_CSS.toLowerCase().match(/#[0-9a-f]{3,8}\b|rgba?\([^)]*\)/g) || [];
    expect(colours.length).toBeGreaterThan(10);
    for (const c of colours) expect(globals, c).toContain(c.replace(/\s+/g, ""));
  });

  it("the font copies served from /fonts are byte-identical to src/fonts", () => {
    for (const f of ["mona-sans-600-800.woff2", "dm-sans-400-600.woff2"]) {
      expect(readFileSync(`public/fonts/${f}`).equals(readFileSync(`src/fonts/${f}`)), f).toBe(true);
    }
  });

  it("names no font family the site does not use", async () => {
    const { OUTREACH_CSS } = await import("@/lib/outreachPages");
    const families = new Set([...OUTREACH_CSS.matchAll(/"([^"]+)"/g)].map((m) => m[1]));
    expect([...families].sort()).toEqual(["DM Sans", "Instrument Serif", "Mona Sans", "woff2"].sort());
  });

  it("layout classes that share an element with .wrap use padding longhands (a shorthand wiped the side padding at 390 px)", async () => {
    const { OUTREACH_CSS } = await import("@/lib/outreachPages");
    expect(OUTREACH_CSS.match(/\.(wrap|layer|bar|center|foot)\{[^}]*\bpadding:/g) ?? []).toEqual([]);
  });
});
