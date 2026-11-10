// Rendered-HTML SEO audit (SEO-6). Checks what search engines actually receive, page by page, from a running server:
//
//   node scripts/seo-audit.mjs --base http://localhost:3100 [--origin https://siteblitz.vercel.app]
//
// For every URL in the sitemap (origin rewritten to --base): HTTP 200, exactly one canonical equal to the sitemap URL,
// one <h1>, a unique <title> and meta description (<= 160 chars), parseable JSON-LD whose "@id" references all resolve
// within the page, an og:image that returns a PNG, and no out-of-policy words (Mumbai, guaranteed rankings).
// Then every internal link found on those pages must answer 200. Exit code 1 on any failure. No dependencies.
const args = Object.fromEntries(
  process.argv.slice(2).reduce((a, v, i, all) => (v.startsWith("--") ? [...a, [v.slice(2), all[i + 1]]] : a), [])
);
const base = (args.base ?? "http://localhost:3100").replace(/\/$/, "");
const fails = [];
const fail = (url, msg) => fails.push(`${url}: ${msg}`);
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const origin = args.origin ?? new URL(sitemap.match(/<loc>([^<]+)<\/loc>/)[1]).origin;
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decode(m[1]));
const local = (u) => u.replace(origin, base);

const titles = new Map();
const descs = new Map();
const links = new Set();
for (const url of urls) {
  const res = await fetch(local(url), { redirect: "manual" });
  if (res.status !== 200) {
    fail(url, `status ${res.status}`);
    continue;
  }
  const html = await res.text();
  const canon = [...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)].map((m) => decode(m[1]));
  if (canon.length !== 1) fail(url, `${canon.length} canonical tags`);
  else if (canon[0].replace(/\/$/, "") !== url.replace(/\/$/, "")) fail(url, `canonical ${canon[0]}`);
  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1 !== 1) fail(url, `${h1} h1 elements`);
  const title = decode((html.match(/<title>([^<]*)<\/title>/) ?? [, ""])[1]);
  const desc = decode((html.match(/<meta name="description" content="([^"]*)"/) ?? [, ""])[1]);
  if (!title) fail(url, "no title");
  if (!desc) fail(url, "no meta description");
  if (desc.length > 160) fail(url, `description ${desc.length} chars`);
  if (titles.has(title)) fail(url, `title duplicates ${titles.get(title)}`);
  if (descs.has(desc)) fail(url, `description duplicates ${descs.get(desc)}`);
  titles.set(title, url);
  descs.set(desc, url);
  if (/Mumbai|(we|siteblitz) guarantees?/i.test(html.replace(/<script[\s\S]*?<\/script>/g, ""))) {
    fail(url, "out-of-policy wording");
  }
  // JSON-LD: every script parses and every {"@id": x} reference names a node declared on this page.
  const ids = new Set();
  const refs = new Set();
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let data;
    try {
      data = JSON.parse(m[1]);
    } catch {
      fail(url, "JSON-LD does not parse");
      continue;
    }
    const walk = (v) => {
      if (Array.isArray(v)) return v.forEach(walk);
      if (!v || typeof v !== "object") return;
      const keys = Object.keys(v);
      if (v["@id"] && keys.length === 1) refs.add(v["@id"]);
      else if (v["@id"]) ids.add(v["@id"]);
      keys.forEach((k) => walk(v[k]));
    };
    walk(data);
  }
  // A Dataset may point at its parent study's dataset on another page (isPartOf): that is a cross-page reference.
  for (const r of refs) if (!ids.has(r) && !/#dataset$/.test(r)) fail(url, `JSON-LD @id ${r} not declared`);
  const og = (html.match(/<meta property="og:image" content="([^"]+)"/) ?? [, ""])[1];
  if (!og) fail(url, "no og:image");
  else {
    const img = await fetch(local(decode(og)));
    if (img.status !== 200 || !(img.headers.get("content-type") ?? "").includes("image/png")) fail(url, `og:image ${img.status}`);
  }
  for (const m of html.matchAll(/<a [^>]*href="(\/[^"#?]*)/g)) links.add(m[1]);
}

let checked = 0;
for (const href of links) {
  if (/^\/(api|admin)/.test(href) || /\.(csv|txt)$/.test(href)) continue;
  const r = await fetch(`${base}${href}`, { redirect: "manual" });
  checked++;
  if (r.status !== 200) fail(href, `internal link status ${r.status}`);
}

console.log(`${urls.length} sitemap URLs, ${checked} internal links checked, ${fails.length} problems`);
for (const f of fails) console.log("  FAIL " + f);
process.exitCode = fails.length ? 1 : 0;
