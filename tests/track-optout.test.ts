import { describe, it, expect, beforeAll } from "vitest";
import { NextRequest } from "next/server";

/** /api/track must honour browser opt-out signals (PR1): with Global Privacy Control or
 *  Do Not Track it records nothing and sets no cookies. Without a database configured the
 *  route still sets its cookies, so "no Set-Cookie" proves the opt-out branch ran. */

delete process.env.MONGODB_URI;

let POST: (req: NextRequest) => Promise<Response>;

beforeAll(async () => {
  ({ POST } = await import("@/app/api/track/route"));
});

function track(headers: Record<string, string> = {}) {
  return new NextRequest("http://localhost/api/track", {
    method: "POST",
    headers: { "content-type": "text/plain", ...headers },
    body: JSON.stringify({ type: "pageview", path: "/" }),
  });
}

describe("/api/track opt-out signals", () => {
  it("sets the session and visitor cookies for an ordinary visit", async () => {
    const res = await POST(track());
    expect(res.status).toBe(204);
    const cookies = res.headers.get("set-cookie") || "";
    expect(cookies).toContain("sb_sid=");
    expect(cookies).toContain("sb_vid=");
  });

  it("records nothing and sets no cookies with Sec-GPC: 1", async () => {
    const res = await POST(track({ "sec-gpc": "1" }));
    expect(res.status).toBe(204);
    expect(res.headers.get("set-cookie")).toBeNull();
  });

  it("records nothing and sets no cookies with DNT: 1", async () => {
    const res = await POST(track({ dnt: "1" }));
    expect(res.status).toBe(204);
    expect(res.headers.get("set-cookie")).toBeNull();
  });

  it("ignores a GPC header that is not exactly 1", async () => {
    const res = await POST(track({ "sec-gpc": "0" }));
    expect(res.headers.get("set-cookie") || "").toContain("sb_vid=");
  });
});
