import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { allIndexable, footerColumns, MAIN_NAV } from "@/lib/routes";
import { graph, organizationNode, websiteNode, BRAND_ALTERNATE_NAMES } from "@/lib/seo";
import { llmsTxt, llmsFullTxt } from "@/lib/llms";
import { PACKAGES, inr } from "@/lib/offer";
import { SITE } from "@/lib/site";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";

/* SEO-1: the search surface (sitemap, nav, footer, structured data, llms.txt) is generated from one registry. These
   checks fail when a registered URL has no page, a page is unreachable, or a machine-readable file drifts from the
   offer and the truthful-location rule. */

/** Map a URL path to the App Router file that would serve it, allowing one dynamic [slug] segment. */
function routeExists(path: string): boolean {
  if (path === "/") return existsSync(join("src", "app", "page.tsx"));
  const parts = path.replace(/^\//, "").split("/");
  let dir = join("src", "app");
  for (const part of parts) {
    if (existsSync(join(dir, part))) {
      dir = join(dir, part);
      continue;
    }
    const dyn = readdirSync(dir).find((n) => /^\[.+\]$/.test(n) && statSync(join(dir, n)).isDirectory());
    if (!dyn) return false;
    dir = join(dir, dyn);
  }
  return existsSync(join(dir, "page.tsx")) || existsSync(join(dir, "route.ts"));
}

describe("route registry", () => {
  const urls = allIndexable().map((e) => e.path);

  it("has no duplicate URLs", () => {
    expect(new Set(urls).size).toBe(urls.length);
  });

  it.each(urls)("%s is served by a page", (path) => {
    expect(routeExists(path)).toBe(true);
  });

  it("keeps fictional demo sites and private areas out", () => {
    expect(urls.filter((u) => /^\/(demo|admin|api)\b/.test(u))).toEqual([]);
  });

  it("puts only real pages in the main navigation (no home anchors)", () => {
    for (const e of MAIN_NAV) expect(e.path).not.toContain("#");
  });

  it("links every footer entry to an existing route", () => {
    const links = footerColumns().flatMap((c) => c.links.map((l) => l.href));
    for (const href of links) expect(routeExists(href), href).toBe(true);
  });

  it("reaches every indexable page from the header or footer", () => {
    const reachable = new Set([
      "/",
      ...MAIN_NAV.map((e) => e.path),
      ...footerColumns().flatMap((c) => c.links.map((l) => l.href)),
    ]);
    const orphans = urls.filter((u) => !reachable.has(u) && !/^\/blog\/|^\/(privacy|terms|refunds)$/.test(u));
    expect(orphans).toEqual([]);
  });
});

describe("sitemap", () => {
  const entries = sitemap();

  it("lists absolute URLs on the canonical origin", () => {
    for (const e of entries) expect(e.url.startsWith(SITE.url)).toBe(true);
  });

  it("uses real per-page dates, not the build time", () => {
    const today = new Date().toISOString().slice(0, 10);
    const stamps = entries.map((e) => (e.lastModified as Date).toISOString().slice(0, 10));
    expect(stamps.every((d) => d === today)).toBe(false);
    for (const d of stamps) expect(d >= "2024-01-01").toBe(true);
  });
});

describe("robots", () => {
  it("keeps admin and API private for every group and points at the sitemap", () => {
    const r = robots();
    const rules = Array.isArray(r.rules) ? r.rules : [r.rules];
    for (const rule of rules) expect(rule.disallow).toEqual(expect.arrayContaining(["/admin", "/api/"]));
    expect(r.sitemap).toBe(`${SITE.url}/sitemap.xml`);
  });
});

describe("structured data", () => {
  const json = JSON.stringify(graph(organizationNode(), websiteNode()));

  it("states the brand's alternate spellings openly", () => {
    expect(BRAND_ALTERNATE_NAMES).toContain("Site Blitz");
    expect(json).toContain('"alternateName"');
  });

  it("carries the package prices from offer.ts and the truthful location", () => {
    for (const p of PACKAGES) if (p.priceInr) expect(json).toContain(`"price":"${p.priceInr}"`);
    expect(json).toContain('"addressRegion":"Gujarat"');
    expect(json).not.toMatch(/Mumbai|streetAddress|addressLocality/);
  });
});

describe("llms.txt", () => {
  const short = llmsTxt();
  const full = llmsFullTxt();

  it("matches the offer and never names another city or a dollar price", () => {
    for (const p of PACKAGES) if (p.priceInr) expect(short).toContain(inr(p.priceInr));
    expect(short).toContain("Gujarat");
    for (const t of [short, full]) {
      expect(t).not.toMatch(/Mumbai|Thane|\$\s?\d|14,999|24,999/);
      // negations ("nobody can guarantee rankings") are fine; a promise is not
      expect(t).not.toMatch(/\b(we|siteblitz) guarantees?\b/i);
    }
  });

  it("links only to registered pages", () => {
    const links = [...short.matchAll(/\]\((https?:\/\/[^)]+)\)/g)].map((m) => m[1].replace(SITE.url, "") || "/");
    const known = new Set([...allIndexable().map((e) => e.path), "/llms-full.txt"]);
    expect(links.filter((l) => !known.has(l))).toEqual([]);
  });

  it("is no longer shadowed by a stale static file", () => {
    expect(existsSync(join("public", "llms.txt"))).toBe(false);
  });
});

describe("every public page declares its canonical URL", () => {
  function pages(dir: string, out: string[] = []): string[] {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name);
      if (statSync(p).isDirectory()) {
        if (["admin", "api"].includes(name)) continue;
        pages(p, out);
      } else if (name === "page.tsx") out.push(p);
    }
    return out;
  }
  const files = pages(join("src", "app")).filter((f) => !f.includes(join("app", "demo")));

  it.each(files)("%s", (f) => {
    const src = readFileSync(f, "utf8");
    expect(/canonical|pageMeta\(/.test(src)).toBe(true);
  });
});
