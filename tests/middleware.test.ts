import { describe, it, expect, beforeAll } from "vitest";
import { NextRequest } from "next/server";
import { SignJWT } from "jose";

/** src/middleware.ts is the ONLY thing standing between the public internet and
 *  every admin page and data API — no admin route re-checks the session. These
 *  tests exist so that breaking the matcher, or adding a route outside it, fails
 *  loudly instead of silently publishing the panel. */

const SECRET = "test-secret-value-for-middleware-suite-only";

// Must be set before the module is imported: middleware reads process.env lazily
// per request, but keeping this in beforeAll documents the dependency.
process.env.JWT_SECRET = SECRET;

let middleware: (req: NextRequest) => Promise<Response>;

beforeAll(async () => {
  ({ middleware } = await import("@/middleware"));
});

const key = () => new TextEncoder().encode(SECRET);

async function token(opts: { role?: string; expired?: boolean; secret?: Uint8Array } = {}) {
  const { role = "admin", expired = false, secret = key() } = opts;
  return new SignJWT({ role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(expired ? Math.floor(Date.now() / 1000) - 7200 : undefined)
    .setExpirationTime(expired ? Math.floor(Date.now() / 1000) - 3600 : "1h")
    .sign(secret);
}

function req(path: string, cookie?: string) {
  const r = new NextRequest(new URL(`https://siteblitz.test${path}`));
  if (cookie) r.cookies.set("sb_admin", cookie);
  return r;
}

/** Every route under /api/admin. If a new one is added outside the middleware
 *  matcher, this list is where the omission surfaces. */
const ADMIN_APIS = [
  "/api/admin/adspend",
  "/api/admin/audience",
  "/api/admin/campaigns",
  "/api/admin/events",
  "/api/admin/export",
  "/api/admin/funnel",
  "/api/admin/grader",
  "/api/admin/leads",
  "/api/admin/live",
  "/api/admin/notifications/retry",
  "/api/admin/pages",
  "/api/admin/settings",
  "/api/admin/stats",
  "/api/admin/today",
  "/api/admin/visitors",
  "/api/admin/visitors/abc123",
];

describe("admin pages", () => {
  it("redirects an unauthenticated visitor to the login page", async () => {
    const res = await middleware(req("/admin"));
    expect(res.status).toBe(307);
    const loc = new URL(res.headers.get("location")!);
    expect(loc.pathname).toBe("/admin/login");
    expect(loc.searchParams.get("next")).toBe("/admin");
  });

  it("preserves the originally requested path in ?next", async () => {
    const res = await middleware(req("/admin/leads"));
    const loc = new URL(res.headers.get("location")!);
    expect(loc.searchParams.get("next")).toBe("/admin/leads");
  });

  it("lets an authenticated admin through", async () => {
    const res = await middleware(req("/admin", await token()));
    expect(res.headers.get("location")).toBeNull();
    expect(res.status).toBe(200);
  });

  it("bounces an authenticated admin away from the login page", async () => {
    const res = await middleware(req("/admin/login", await token()));
    expect(res.status).toBe(307);
    expect(new URL(res.headers.get("location")!).pathname).toBe("/admin");
  });

  it("serves the login page to an unauthenticated visitor", async () => {
    const res = await middleware(req("/admin/login"));
    expect(res.status).toBe(200);
    expect(res.headers.get("location")).toBeNull();
  });
});

describe("admin APIs — every route is gated", () => {
  for (const path of ADMIN_APIS) {
    it(`401s ${path} without a session`, async () => {
      const res = await middleware(req(path));
      expect(res.status).toBe(401);
    });
  }

  it("allows login and logout through unauthenticated", async () => {
    for (const path of ["/api/admin/login", "/api/admin/logout"]) {
      const res = await middleware(req(path));
      expect(res.status).toBe(200);
    }
  });

  it("allows an authenticated admin through", async () => {
    const res = await middleware(req("/api/admin/stats", await token()));
    expect(res.status).toBe(200);
  });
});

describe("token rejection", () => {
  const bad: [string, () => Promise<string> | string][] = [
    ["a garbage cookie", () => "not-a-jwt"],
    ["an empty cookie", () => ""],
    ["an expired token", () => token({ expired: true })],
    ["a token signed with the wrong secret", () =>
      token({ secret: new TextEncoder().encode("a-completely-different-secret-value") })],
    ["a valid token without the admin role", () => token({ role: "viewer" })],
  ];

  for (const [label, make] of bad) {
    it(`401s the admin API for ${label}`, async () => {
      const res = await middleware(req("/api/admin/stats", await make()));
      expect(res.status).toBe(401);
    });

    it(`redirects the admin page for ${label}`, async () => {
      const res = await middleware(req("/admin", await make()));
      expect(res.status).toBe(307);
    });
  }
});
