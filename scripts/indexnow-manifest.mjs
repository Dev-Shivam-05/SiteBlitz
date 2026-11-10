// IndexNow, step 1 of 2 (SEO-5): build the change manifest of the LIVE site.
//
//   SITE_URL=https://<production-origin> node scripts/indexnow-manifest.mjs > current-indexnow.json
//
// Reads <SITE_URL>/sitemap.xml, fetches every listed page once (sequentially, polite) and maps
//   absolute canonical URL -> SHA-256 of the page's editorial payload
// (title, meta description, canonical, the visible text of <main> and the JSON-LD). Build hashes, asset file names
// and animation changes are not in the payload, so a redeploy that changes nothing a reader sees changes no hash and
// submits nothing (IndexNow asks for meaningful changes only; debate round 3).
// Step 2 is scripts/indexnow.mjs, which diffs this file against the last submitted one. No dependencies; Node >= 22.
import { createHash } from "node:crypto";

const base = new URL(process.env.SITE_URL ?? "");
if (base.protocol !== "https:" || base.pathname !== "/") {
  console.error("SITE_URL must be the canonical HTTPS production origin, e.g. https://siteblitz.in");
  process.exit(1);
}

const get = async (url) => {
  const res = await fetch(url, { redirect: "error", signal: AbortSignal.timeout(20000), headers: { "User-Agent": "SiteBlitz-IndexNow-manifest" } });
  if (res.status !== 200) throw new Error(`${res.status} ${url}`);
  return res.text();
};

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'");
const pick = (html, re) => decode((html.match(re) ?? [, ""])[1].trim());

// Pages whose <main> shows live measurements (re-rendered every minute): only their metadata is hashed, otherwise every
// run would report them changed. Found by running the manifest twice on an unchanged site (debate round 4 check).
const LIVE_PAGES = new Set(["/proof"]);

const sitemap = await get(new URL("/sitemap.xml", base).href);
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decode(m[1].trim()));
const out = {};
for (const url of urls) {
  const html = await get(url);
  const canonical = pick(html, /<link rel="canonical" href="([^"]+)"/);
  if (canonical !== url && canonical !== url.replace(/\/$/, "")) {
    console.error(`skip ${url}: canonical is ${canonical || "missing"}`);
    continue;
  }
  const main = (html.match(/<main[^>]*>([\s\S]*?)<\/main>/) ?? [, ""])[1]
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]).join("\n");
  const live = LIVE_PAGES.has(new URL(url).pathname);
  const payload = [
    pick(html, /<title>([^<]*)<\/title>/),
    pick(html, /<meta name="description" content="([^"]*)"/),
    canonical,
    live ? "" : decode(main),
    live ? "" : ld,
  ].join("\n␞\n");
  out[url] = createHash("sha256").update(payload).digest("hex");
  await new Promise((r) => setTimeout(r, 300));
}
process.stdout.write(JSON.stringify(out, null, 2) + "\n");
console.error(`${Object.keys(out).length} of ${urls.length} sitemap URLs hashed`);
