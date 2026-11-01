import { describe, it, expect, beforeAll, beforeEach, afterAll, vi } from "vitest";
import { NextRequest } from "next/server";
import { bearerMatches } from "@/lib/cron";

/** /api/cron/brief sits outside /api/admin, so the middleware does not protect it — the CRON_SECRET
 *  bearer check inside the route is its only gate. No DB: with MONGODB_URI unset an authorised
 *  request stops at the 503 db guard, proving it got past auth without touching anything. */

delete process.env.MONGODB_URI;
const ORIGINAL = process.env.CRON_SECRET;
const SECRET = "cron-secret-for-tests-only-0123456789";

let GET: (req: NextRequest) => Promise<Response>;
const fetchSpy = vi.spyOn(globalThis, "fetch");

beforeAll(async () => {
  ({ GET } = await import("@/app/api/cron/brief/route"));
});
beforeEach(() => {
  process.env.CRON_SECRET = SECRET;
  fetchSpy.mockClear();
});
afterAll(() => {
  if (ORIGINAL === undefined) delete process.env.CRON_SECRET;
  else process.env.CRON_SECRET = ORIGINAL;
  fetchSpy.mockRestore();
});

const call = (auth?: string) =>
  GET(new NextRequest("http://localhost/api/cron/brief", { headers: auth ? { authorization: auth } : {} }));

describe("GET /api/cron/brief auth", () => {
  it("401 without an Authorization header", async () => {
    const res = await call();
    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({ ok: false, error: "Unauthorized" });
  });

  it("401 with a wrong secret", async () => {
    expect((await call("Bearer not-the-secret")).status).toBe(401);
  });

  it("401 with the right secret but the wrong scheme or extra text", async () => {
    expect((await call(SECRET)).status).toBe(401);
    expect((await call(`Basic ${SECRET}`)).status).toBe(401);
    expect((await call(`Bearer ${SECRET}x`)).status).toBe(401);
    expect((await call(`Bearer ${SECRET.slice(0, -1)}`)).status).toBe(401);
  });

  it("503 when CRON_SECRET is not configured, even with a header", async () => {
    delete process.env.CRON_SECRET;
    const res = await call("Bearer anything");
    expect(res.status).toBe(503);
    expect((await res.json()).error).toBe("cron_not_configured");
  });

  it("the right secret gets past auth (and stops at the db guard)", async () => {
    const res = await call(`Bearer ${SECRET}`);
    expect(res.status).toBe(503);
    expect((await res.json()).error).toBe("db_not_configured");
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});

describe("bearerMatches", () => {
  it("accepts only an exact Bearer token", () => {
    expect(bearerMatches(`Bearer ${SECRET}`, SECRET)).toBe(true);
    expect(bearerMatches(`bearer ${SECRET}`, SECRET)).toBe(false);
    expect(bearerMatches(null, SECRET)).toBe(false);
    expect(bearerMatches("Bearer ", SECRET)).toBe(false);
  });
  it("never matches when the secret is empty", () => {
    expect(bearerMatches("Bearer ", "")).toBe(false);
    expect(bearerMatches("Bearer x", "")).toBe(false);
  });
});
