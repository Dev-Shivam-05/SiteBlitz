#!/usr/bin/env node
// Interleaved before/after Lighthouse mobile (fix verification). The pre-fix commit runs on --before, the fixed build on
// --after; runs alternate B, A, B, A ... so machine drift (battery, AnyDesk, other sessions) hits both equally.
//   node ab-lh.mjs --before http://localhost:3200 --after http://localhost:3100 --pages /,/pricing --runs 3 --out <dir>
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";

const args = process.argv.slice(2);
const opt = (n, d) => (args.includes(`--${n}`) ? args[args.indexOf(`--${n}`) + 1] : d);
const B = opt("before", "http://localhost:3200"), A = opt("after", "http://localhost:3100");
const PAGES = opt("pages", "/").split(",");
const RUNS = Number(opt("runs", "3"));
const OUT = opt("out", "ab");
mkdirSync(OUT, { recursive: true });
const LH = join(homedir(), "AppData/Local/npm-cache/_npx/8003d8991b0d346b/node_modules/lighthouse/cli/index.js");
const med = (a) => { const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };
const slug = (p) => (p === "/" ? "home" : p.slice(1).replace(/\//g, "__"));

function run(base, p, tag, r) {
  const file = join(OUT, `${slug(p)}-${tag}-${r}.json`);
  const a = [LH, base + p, "--quiet", "--output=json", `--output-path=${file}`, "--chrome-flags=--headless=new --no-first-run --disable-extensions",
    "--only-categories=performance,accessibility,best-practices,seo", "--max-wait-for-load=45000"];
  for (let k = 0; k < 2; k++) { try { execFileSync(process.execPath, a, { stdio: ["ignore", "ignore", "pipe"], timeout: 180000 }); break; } catch { if (existsSync(file)) break; } }
  return existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : null;
}
const sum = (rs) => {
  const ok = rs.filter(Boolean);
  const c = (k) => med(ok.map((j) => Math.round(j.categories[k].score * 100)));
  const n = (id) => med(ok.map((j) => j.audits[id].numericValue));
  return { perf: c("performance"), a11y: c("accessibility"), bp: c("best-practices"), seo: c("seo"), fcp: n("first-contentful-paint"), lcp: n("largest-contentful-paint"), tbt: n("total-blocking-time"), cls: n("cumulative-layout-shift"), si: n("speed-index"), kb: n("total-byte-weight") / 1024 };
};
const fmt = (s) => `perf ${s.perf} a11y ${s.a11y} bp ${s.bp} seo ${s.seo} | FCP ${(s.fcp / 1000).toFixed(2)} LCP ${(s.lcp / 1000).toFixed(2)} TBT ${Math.round(s.tbt)} CLS ${s.cls.toFixed(3)} SI ${(s.si / 1000).toFixed(2)} ${Math.round(s.kb)}KB`;
for (const p of PAGES) {
  const before = [], after = [];
  for (let r = 1; r <= RUNS; r++) { before.push(run(B, p, "before", r)); after.push(run(A, p, "after", r)); }
  console.log(`${p}\n   before: ${fmt(sum(before))}\n   after : ${fmt(sum(after))}`);
}
