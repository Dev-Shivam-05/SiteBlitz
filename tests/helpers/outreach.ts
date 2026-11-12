import { expect } from "vitest";

/** Shared checks for the /u/ and /s/ pages (tests/outreach-routes.test.ts, tests/outreach-db.test.ts). */

/** No script element, no inline handler, and every src/href stays on this origin, is a data: image or mailto:. The
 *  one exception is the recorded overview's <audio>, which may load from any https host (and only on play). */
export function assertNoScripts(page: string) {
  expect(page).not.toMatch(/<script/i);
  expect(page).not.toMatch(/<(iframe|object|embed)\b/i);
  expect(page).not.toMatch(/\son[a-z]+\s*=/i);
  for (const m of page.matchAll(/<([a-z]+)\b[^>]*?\s(?:src|href)="([^"]*)"/gi)) {
    const [, tag, url] = m;
    if (tag.toLowerCase() === "audio") expect(url, url).toMatch(/^https:\/\//);
    else expect(url, `${tag} ${url.slice(0, 60)}`).toMatch(/^(\/|data:image\/(png|jpeg);base64,|mailto:)/);
  }
}

export function assertPrivatePage(res: Response) {
  expect(res.headers.get("content-type")).toBe("text/html; charset=utf-8");
  expect(res.headers.get("x-robots-tag")).toBe("noindex, nofollow");
  expect(res.headers.get("cache-control")).toBe("no-store");
  const csp = res.headers.get("content-security-policy") || "";
  expect(csp).toContain("default-src 'none'");
  expect(csp).not.toMatch(/script-src/);
  expect(res.headers.get("location")).toBeNull();
  expect(res.headers.get("set-cookie")).toBeNull();
}
