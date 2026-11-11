#!/usr/bin/env node
// Harsh raw-HTML SEO crawl for the 2026-11-11 audit round. Reads only what a non-rendering crawler receives.
//   node seo-deep.mjs --base http://localhost:3100 --out <file.json>
// Per sitemap URL: status, headers, HTML bytes (raw + gzip), title length + approx pixel width, description length,
// h1 count, heading order, visible word count inside <main>, images without alt / without width+height, hreflang,
// robots meta, JSON-LD types + Google required/recommended field gaps, internal links. Then click depth from "/",
// orphans, and edge-case status codes. No dependencies.
import { gzipSync } from "node:zlib";
import { writeFileSync } from "node:fs";

const args = Object.fromEntries(process.argv.slice(2).reduce((a, v, i, all) => (v.startsWith("--") ? [...a, [v.slice(2), all[i + 1]]] : a), []));
const base = (args.base ?? "http://localhost:3100").replace(/\/$/, "");
const dec = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ");

// Rough Arial-16/20px glyph widths for Google's ~580-600 px title cut-off. Approximate on purpose; flagged as such.
const W = (ch) => (/[il.,:;'|!]/.test(ch) ? 5 : /[fjrt ]/.test(ch) ? 6 : /[mw]/.test(ch) ? 15 : /[A-Z]/.test(ch) ? (/[MW]/.test(ch) ? 17 : 13) : /[0-9]/.test(ch) ? 11 : /[—–]/.test(ch) ? 20 : /₹/.test(ch) ? 11 : 10);
const px = (s) => [...s].reduce((n, c) => n + W(c), 0);

const sm = await (await fetch(`${base}/sitemap.xml`)).text();
const origin = new URL(sm.match(/<loc>([^<]+)<\/loc>/)[1]).origin;
const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => dec(m[1]));
const toLocal = (u) => u.replace(origin, base);
const toPath = (u) => new URL(u, origin).pathname;

const pages = [];
const graph = new Map();
for (const url of urls) {
  const path = toPath(url);
  const res = await fetch(toLocal(url), { redirect: "manual" });
  const html = await res.text();
  const head = html.split("</head>")[0];
  const title = dec(head.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
  const desc = dec(head.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "");
  const robots = head.match(/<meta name="robots" content="([^"]*)"/)?.[1] ?? "";
  const hreflang = [...head.matchAll(/<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/gi)].map((m) => [m[1], toPath(m[2])]);
  const body = html.slice(html.indexOf("<body"));
  const heads = [...body.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  const skips = heads.filter((h, i) => i > 0 && h > heads[i - 1] + 1).length;
  const mainHtml = body.match(/<main[\s\S]*?<\/main>/)?.[0] ?? body;
  const text = dec(mainHtml.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
  const words = text ? text.split(" ").length : 0;
  const imgs = [...body.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  const noAlt = imgs.filter((t) => !/\salt="/.test(t)).length;
  const noDims = imgs.filter((t) => !(/\swidth="/.test(t) && /\sheight="/.test(t)) && !/data-nimg="fill"/.test(t)).length;
  const lazyAll = imgs.filter((t) => /loading="lazy"/.test(t)).length;
  const links = [...body.matchAll(/<a\b[^>]*href="([^"#]*)(#[^"]*)?"[^>]*>([\s\S]*?)<\/a>/g)];
  const internal = new Set();
  const weakAnchors = [];
  for (const [, href, , inner] of links) {
    if (!href) continue;
    let u;
    try { u = new URL(href, origin); } catch { continue; }
    if (u.origin !== origin && !href.startsWith("/")) continue;
    internal.add(u.pathname);
    const t = dec(inner.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
    if (/^(click here|here|read more|more|learn more|link)$/i.test(t)) weakAnchors.push(`${u.pathname}:"${t}"`);
  }
  graph.set(path, [...internal]);
  // JSON-LD
  const ld = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap((m) => {
    try { const j = JSON.parse(m[1]); return j["@graph"] ?? [j]; } catch { return [{ "@type": "PARSE_ERROR" }]; }
  });
  const types = ld.map((n) => [].concat(n["@type"]).join("+"));
  const gaps = [];
  for (const n of ld) {
    const t = [].concat(n["@type"]);
    if (t.includes("Organization")) { if (!n.logo) gaps.push("Organization.logo"); if (!n.sameAs?.length) gaps.push("Organization.sameAs"); if (!n.contactPoint && !n.telephone && !n.email) gaps.push("Organization.contact"); }
    if (t.includes("BlogPosting") || t.includes("Article")) for (const f of ["headline", "image", "datePublished", "dateModified", "author"]) if (!n[f]) gaps.push(`${t[0]}.${f}`);
    if (t.includes("Dataset")) { for (const f of ["name", "description", "license", "creator", "distribution"]) if (!n[f]) gaps.push(`Dataset.${f}`); if (n.description && (n.description.length < 50 || n.description.length > 5000)) gaps.push("Dataset.description length"); }
    if (t.includes("BreadcrumbList")) for (const [i, e] of (n.itemListElement ?? []).entries()) { if (e.position !== i + 1) gaps.push("Breadcrumb.position"); if (!e.name) gaps.push("Breadcrumb.name"); }
    if (t.includes("PARSE_ERROR")) gaps.push("JSON-LD parse error");
  }
  pages.push({
    path, status: res.status, cache: res.headers.get("cache-control"), xrobots: res.headers.get("x-robots-tag"),
    htmlKB: +(html.length / 1024).toFixed(1), gzipKB: +(gzipSync(html).length / 1024).toFixed(1),
    title, titleLen: title.length, titlePx: px(title), desc: desc.length, robots, h1: heads.filter((h) => h === 1).length, headingSkips: skips,
    words, imgs: imgs.length, noAlt, noDims, lazyAll, internalLinks: internal.size, weakAnchors, hreflang, types: [...new Set(types)], gaps: [...new Set(gaps)],
  });
}

// Click depth from home (BFS over raw-HTML links), orphans = sitemap URLs never reached.
const depth = new Map([["/", 0]]);
const q = ["/"];
while (q.length) {
  const p = q.shift();
  for (const n of graph.get(p) ?? []) if (!depth.has(n) && graph.has(n)) { depth.set(n, depth.get(p) + 1); q.push(n); }
}
for (const p of pages) p.depth = depth.get(p.path) ?? null;
const inlinks = new Map();
for (const [from, tos] of graph) for (const t of tos) if (t !== from) inlinks.set(t, (inlinks.get(t) ?? 0) + 1);
for (const p of pages) p.inlinks = inlinks.get(p.path) ?? 0;

// Edge cases a crawler will hit.
const edge = [];
for (const [path, expect] of [
  ["/this-page-does-not-exist", "404"], ["/services/not-a-service", "404"], ["/blog/not-a-post", "404"], ["/for/not-an-industry", "404"],
  ["/research/not-a-study", "404"], ["/pricing/", "308 -> /pricing"], ["/Pricing", "404 or 308"], ["/pricing?utm_source=x", "200, canonical /pricing"],
  ["/demo/" , "?"], ["/admin", "401/307, noindex"], ["/api/track", "204/405"], ["/robots.txt", "200"], ["/sitemap.xml", "200"], ["/llms.txt", "200"], ["/manifest.webmanifest", "200"],
]) {
  const r = await fetch(base + path, { redirect: "manual" });
  const t = r.status === 200 || r.status === 404 ? await r.text() : "";
  edge.push({ path, expect, status: r.status, location: r.headers.get("location"), robotsMeta: t.match(/<meta name="robots" content="([^"]*)"/)?.[1] ?? null, canonical: t.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? null, xrobots: r.headers.get("x-robots-tag") });
}

const out = { base, origin, count: pages.length, pages, edge };
if (args.out) writeFileSync(args.out, JSON.stringify(out, null, 2));
const flag = (p) => [
  p.status !== 200 && `status ${p.status}`, p.titleLen > 60 && `title ${p.titleLen}ch`, p.titlePx > 580 && `title ~${p.titlePx}px`,
  (p.desc < 110 || p.desc > 160) && `desc ${p.desc}ch`, p.h1 !== 1 && `h1=${p.h1}`, p.headingSkips && `heading skips ${p.headingSkips}`,
  p.words < 300 && `thin ${p.words} words`, p.noAlt && `${p.noAlt} img no alt`, p.noDims && `${p.noDims} img no dims`,
  p.depth === null ? "ORPHAN (not reachable from /)" : p.depth > 3 && `depth ${p.depth}`, p.inlinks < 2 && `inlinks ${p.inlinks}`,
  p.gzipKB > 50 && `html ${p.gzipKB}KB gz`, p.gaps.length && `ld gaps: ${p.gaps.join(",")}`, p.weakAnchors.length && `weak anchors ${p.weakAnchors.length}`,
].filter(Boolean);
for (const p of pages) console.log(`${p.path}  [${p.words}w d${p.depth} in${p.inlinks} ${p.gzipKB}KBgz]  ${flag(p).join(" | ") || "ok"}`);
console.log("\nEDGE CASES");
for (const e of edge) console.log(`${e.path} -> ${e.status}${e.location ? " " + e.location : ""} (expect ${e.expect}) robots=${e.robotsMeta} canonical=${e.canonical}`);
