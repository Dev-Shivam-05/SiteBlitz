#!/usr/bin/env node
// Lighthouse 12 (cached npx copy) over many URLs. Mobile = Lighthouse default (Moto G Power, 4x CPU, slow 4G, simulated).
//   node lh-run.mjs --base http://localhost:3100 --pages /,/pricing | --sitemap  [--runs 3] [--desktop] --out <dir>
// Writes one JSON report per run and prints per page: median category scores, LCP/FCP/TBT/CLS/SI, and the failing audits.
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";

const args = process.argv.slice(2);
const opt = (n, d) => (args.includes(`--${n}`) ? args[args.indexOf(`--${n}`) + 1] : d);
const flag = (n) => args.includes(`--${n}`);
const base = opt("base", "http://localhost:3100").replace(/\/$/, "");
const runs = Number(opt("runs", "1"));
const out = opt("out", "lh");
const desktop = flag("desktop");
mkdirSync(out, { recursive: true });
const LH = join(homedir(), "AppData/Local/npm-cache/_npx/8003d8991b0d346b/node_modules/lighthouse/cli/index.js");
if (!existsSync(LH)) throw new Error("cached lighthouse not found: " + LH);

let pages = opt("pages", "/").split(",");
if (flag("sitemap")) {
  const sm = await (await fetch(`${base}/sitemap.xml`)).text();
  pages = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1].replace(/&amp;/g, "&")).pathname);
}
const med = (a) => { const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };
const slug = (p) => (p === "/" ? "home" : p.slice(1).replace(/[\/]/g, "__"));

for (const p of pages) {
  const reps = [];
  for (let r = 0; r < runs; r++) {
    const file = join(out, `${slug(p)}${desktop ? "-desk" : ""}-${r + 1}.json`);
    const a = [LH, base + p, "--quiet", "--output=json", `--output-path=${file}`, "--chrome-flags=--headless=new --no-first-run --disable-extensions",
      "--only-categories=performance,accessibility,best-practices,seo", "--max-wait-for-load=45000"];
    if (desktop) a.push("--preset=desktop");
    // Windows sometimes fails Lighthouse's temp-profile cleanup with EPERM after the report is written: keep the
    // report if it exists, otherwise retry once.
    let ok = false;
    for (let attempt = 0; attempt < 2 && !ok; attempt++) {
      try { execFileSync(process.execPath, a, { stdio: ["ignore", "ignore", "pipe"], timeout: 180000 }); ok = true; }
      catch (e) { if (existsSync(file)) ok = true; else if (attempt === 1) console.log(`${p} run ${r + 1}: lighthouse failed ${String(e.stderr || e).slice(0, 160)}`); }
    }
    if (!ok) continue;
    reps.push(JSON.parse(readFileSync(file, "utf8")));
  }
  if (!reps.length) continue;
  const cat = (k) => med(reps.map((j) => Math.round((j.categories[k]?.score ?? 0) * 100)));
  const num = (id) => med(reps.map((j) => j.audits[id]?.numericValue ?? NaN));
  const last = reps[reps.length - 1];
  const failing = Object.values(last.audits)
    .filter((a) => a.score !== null && a.score < 0.9 && !["informative", "notApplicable", "manual"].includes(a.scoreDisplayMode))
    .map((a) => `${a.id}${a.displayValue ? `(${a.displayValue})` : ""}`);
  console.log(`${p}  perf ${cat("performance")} a11y ${cat("accessibility")} bp ${cat("best-practices")} seo ${cat("seo")} | ` +
    `FCP ${(num("first-contentful-paint") / 1000).toFixed(2)}s LCP ${(num("largest-contentful-paint") / 1000).toFixed(2)}s TBT ${Math.round(num("total-blocking-time"))}ms ` +
    `CLS ${num("cumulative-layout-shift").toFixed(3)} SI ${(num("speed-index") / 1000).toFixed(2)}s bytes ${Math.round(num("total-byte-weight") / 1024)}KB`);
  if (failing.length) console.log(`   failing: ${failing.join(", ")}`);
}
