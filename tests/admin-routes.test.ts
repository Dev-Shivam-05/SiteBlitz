import { describe, it, expect, vi, beforeAll } from "vitest";
import { readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { NextRequest } from "next/server";
import { SignJWT } from "jose";

/** Defence in depth (P3): every /api/admin data route must refuse an unauthenticated request ON ITS
 *  OWN, with the middleware out of the picture. The route list is discovered from the filesystem, so a
 *  new admin route without `requireAdmin()` fails this suite instead of shipping public. */

const SECRET = "test-secret-value-for-admin-routes-suite-only";
process.env.JWT_SECRET = SECRET;
delete process.env.MONGODB_URI; // authorised requests then stop at the 503 db guard, never touching a DB

let cookieValue: string | undefined;
vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: (name: string) => (name === "sb_admin" && cookieValue ? { name, value: cookieValue } : undefined),
    set: () => {},
    delete: () => {},
  }),
}));

const ROOT = join(__dirname, "..", "src", "app", "api", "admin");
const PUBLIC = new Set(["login", "logout"]); // they authenticate themselves

function routeFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return routeFiles(p);
    return name === "route.ts" ? [p] : [];
  });
}

const files = routeFiles(ROOT).filter((f) => !PUBLIC.has(relative(ROOT, f).split(/[\\/]/)[0]));
const METHODS = ["GET", "POST", "PATCH", "PUT", "DELETE"] as const;

type Handler = (req: NextRequest, ctx: { params: Promise<Record<string, string>> }) => Promise<Response>;
const handlers: { name: string; fn: Handler }[] = [];

beforeAll(async () => {
  for (const f of files) {
    const mod = await import(f);
    for (const m of METHODS) if (typeof mod[m] === "function") handlers.push({ name: `${m} ${relative(ROOT, f)}`, fn: mod[m] });
  }
});

const call = (fn: Handler) =>
  fn(new NextRequest("http://localhost/api/admin/x", { method: "POST", body: "{}" }), {
    params: Promise.resolve({ sid: "abc" }),
  });

describe("admin data routes check auth themselves", () => {
  it("discovers the admin routes", () => {
    expect(files.length).toBeGreaterThanOrEqual(16);
    expect(handlers.length).toBeGreaterThanOrEqual(20);
  });

  it("includes the lead-ops routes (quick-add, today, ad spend, alert retry)", () => {
    const names = handlers.map((h) => h.name.replace(/\\/g, "/"));
    for (const n of [
      "POST leads/route.ts",
      "PATCH leads/route.ts",
      "GET today/route.ts",
      "POST adspend/route.ts",
      "DELETE adspend/route.ts",
      "POST notifications/retry/route.ts",
    ]) {
      expect(names, n).toContain(n);
    }
  });

  it("every handler returns 401 without a session cookie", async () => {
    cookieValue = undefined;
    for (const h of handlers) {
      const res = await call(h.fn);
      expect(res.status, h.name).toBe(401);
    }
  });

  it("every handler returns 401 with a forged token", async () => {
    cookieValue = await new SignJWT({ role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1h")
      .sign(new TextEncoder().encode("not-the-secret"));
    for (const h of handlers) expect((await call(h.fn)).status, h.name).toBe(401);
  });

  it("a valid admin token gets past auth (stops at the db guard instead)", async () => {
    cookieValue = await new SignJWT({ role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1h")
      .sign(new TextEncoder().encode(SECRET));
    for (const h of handlers) expect((await call(h.fn)).status, h.name).not.toBe(401);
  });
});
