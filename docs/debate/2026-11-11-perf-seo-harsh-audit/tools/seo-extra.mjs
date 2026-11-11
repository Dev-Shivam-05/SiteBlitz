// Extra raw-HTML checks: body-only link graph (header/nav/footer removed), sibling similarity, skip link, UA parity.
const base = "http://localhost:3100";
const sm = await (await fetch(`${base}/sitemap.xml`)).text();
const origin = new URL(sm.match(/<loc>([^<]+)<\/loc>/)[1]).origin;
const paths = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const html = {};
for (const p of paths) html[p] = await (await fetch(base + p)).text();
const strip = (h) => h.replace(/<header[\s\S]*?<\/header>/g, "").replace(/<nav[\s\S]*?<\/nav>/g, "").replace(/<footer[\s\S]*?<\/footer>/g, "");
const links = (h) => new Set([...h.matchAll(/<a\b[^>]*href="(\/[^"#?]*)/g)].map((m) => m[1].replace(/\/$/, "") || "/"));
const g = Object.fromEntries(paths.map((p) => [p, [...links(strip(html[p]))]]));
const depth = new Map([["/", 0]]); const q = ["/"];
while (q.length) { const p = q.shift(); for (const n of g[p] || []) if (!depth.has(n) && g[n]) { depth.set(n, depth.get(p) + 1); q.push(n); } }
const inl = {}; for (const [f, ts] of Object.entries(g)) for (const t of ts) if (t !== f) (inl[t] ||= []).push(f);
console.log("BODY-ONLY GRAPH (header/nav/footer removed): depth from / and contextual inlinks");
for (const p of paths) console.log(`  ${p}: depth ${depth.get(p) ?? "UNREACHABLE"}, contextual inlinks ${(inl[p] || []).length}${(inl[p] || []).length ? " (" + inl[p].slice(0, 4).join(", ") + ")" : ""}`);
// Sibling similarity: word 5-shingle Jaccard on <main> text.
const text = (h) => (h.match(/<main[\s\S]*?<\/main>/)?.[0] ?? h).replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/g, " ").toLowerCase().split(/\W+/).filter(Boolean);
const sh = (w) => { const s = new Set(); for (let i = 0; i + 5 <= w.length; i++) s.add(w.slice(i, i + 5).join(" ")); return s; };
const J = (a, b) => { let i = 0; for (const x of a) if (b.has(x)) i++; return i / (a.size + b.size - i); };
for (const fam of ["/for/", "/services/", "/blog/"]) {
  const ps = paths.filter((p) => p.startsWith(fam)); const S = Object.fromEntries(ps.map((p) => [p, sh(text(html[p]))]));
  let max = [0]; for (let i = 0; i < ps.length; i++) for (let j = i + 1; j < ps.length; j++) { const v = J(S[ps[i]], S[ps[j]]); if (v > max[0]) max = [v, ps[i], ps[j]]; }
  console.log(`SIMILARITY ${fam}: max 5-shingle Jaccard ${(max[0] * 100).toFixed(1)}% (${max[1]} vs ${max[2]})`);
}
const home = html["/"];
console.log("skip link:", /href="#(main|content)[^"]*"[^>]*>[^<]*skip/i.test(home) || /skip to (main )?content/i.test(home));
console.log("html lang (hi page):", html["/blog/website-banane-ka-kharcha"].match(/<html[^>]*lang="([^"]+)"/)?.[1], "| main lang attr:", html["/blog/website-banane-ka-kharcha"].match(/<(main|article)[^>]*lang="([^"]+)"/)?.[2] ?? "none");
const gb = await (await fetch(base + "/", { headers: { "user-agent": "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" } })).text();
console.log("Googlebot UA html same length:", gb.length === home.length, gb.length, home.length);
for (const u of ["/demos/salon.png", "/photos/coaching-chairs.webp", "/brand/logo-icon.png", "/images/", "/_next/image?url=%2Fdemos%2Fsalon.png&w=256&q=75", "/favicon.svg", "/opengraph-image", "/llms.txt"]) {
  const r = await fetch(base + u, { headers: { accept: "image/avif,image/webp,*/*" } });
  console.log(`cache ${u}: ${r.status} ${r.headers.get("cache-control")} ${r.headers.get("content-type")}`);
}
