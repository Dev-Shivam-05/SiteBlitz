#!/usr/bin/env node
// First-frame layout bisect (fix Q1). The document response is intercepted (CDP Fetch) and rewritten per variant, then
// a trace measures style/layout on the main thread for the first 5 s. 4x CPU, no network throttling, web fonts
// blocked so every variant lays out with the same fallback fonts. 3 runs per variant, medians printed.
//   node layout-bisect.mjs --base http://localhost:3100 --page /pricing [--variants base,noscripts,...] [--fonts]
import { spawn } from "node:child_process";
import { rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const args = process.argv.slice(2);
const opt = (n, d) => (args.includes(`--${n}`) ? args[args.indexOf(`--${n}`) + 1] : d);
const BASE = opt("base", "http://localhost:3100").replace(/\/$/, "");
const PAGE = opt("page", "/pricing");
const RUNS = Number(opt("runs", "3"));
const FONTS = args.includes("--fonts");
const NET = args.includes("--net"); // profile A network: 1.6 Mbps / 750 kbps, 150 ms
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const style = (css) => (h) => h.replace("</head>", `<style>${css}</style></head>`);
const VARIANTS = {
  base: (h) => h,
  trivial: () => "<!doctype html><html lang=en><head><meta name=viewport content=\"width=device-width\"></head><body><p>Hello world, a short paragraph.</p></body></html>",
  trivialfont: () => "<!doctype html><html lang=en><head><meta name=viewport content=\"width=device-width\"><style>body{font-family:Arial}</style></head><body><p>Hello world ₹ → a short paragraph.</p></body></html>",
  noscripts: (h) => h.replace(/<script\b[\s\S]*?<\/script>/g, ""),
  nocss: (h) => h.replace(/<link rel="stylesheet"[^>]*>/g, ""),
  nopreloader: style(".preloader{display:none!important}"),
  noanim: style("*,*::before,*::after{animation:none!important;transition:none!important}"),
  novarfont: style("*{font-variation-settings:normal!important;font-stretch:normal!important;font-feature-settings:normal!important}"),
  nofilters: style("*{filter:none!important;backdrop-filter:none!important;mask-image:none!important;-webkit-mask-image:none!important;box-shadow:none!important}"),
  nofixed: style(".site-header,.wa-pill,#mobile-nav,.preloader{display:none!important}"),
  nomain: (h) => h.replace(/<main[\s\S]*?<\/main>/, "<main></main>"),
  nofooter: (h) => h.replace(/<footer[\s\S]*?<\/footer>/, ""),
  noheader: (h) => h.replace(/<header[\s\S]*?<\/header>/, "").replace(/<nav id="mobile-nav"[\s\S]*?<\/nav>/, ""),
  nomobilenav: (h) => h.replace(/<nav id="mobile-nav"[\s\S]*?<\/nav>/, ""),
  nosvg: (h) => h.replace(/<svg[\s\S]*?<\/svg>/g, ""),
  ascii: (h) => h.replace(/>([^<]*)</g, (m, t) => ">" + t.replace(/[^\x00-\x7F]/g, "-") + "<"),
  preitalic: (h) => h.replace("<head>", '<head><link rel="preload" href="/_next/static/media/9cc5b37ab1350db7-s.woff2" as="font" crossorigin="" type="font/woff2"/>'),
  noro: (h) => h.replace("<head>", "<head><script>(()=>{const O=window.ResizeObserver;window.ResizeObserver=class extends O{observe(t,o){if(t===document.body)return;return super.observe(t,o)}}})()</script>"),
  nocv: style("main > section, main + footer { content-visibility: visible !important; contain-intrinsic-size: none !important; }"),
  textauto: style("body,*{text-rendering:auto!important}"),
  nocontain: style("main>*:not(:first-child){content-visibility:auto;contain-intrinsic-size:auto 800px}"),
  cvfooter: style("footer{content-visibility:auto;contain-intrinsic-size:auto 900px} #mobile-nav{content-visibility:hidden}"),
  cvall: style("main>*:not(:first-child),footer{content-visibility:auto;contain-intrinsic-size:auto 800px} #mobile-nav{content-visibility:hidden}"),
};
const LIST = opt("variants", Object.keys(VARIANTS).join(",")).split(",");
const med = (a) => { const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };

async function run(variant) {
  const port = 9450 + Math.floor(Math.random() * 40);
  const profile = join(tmpdir(), `lb-${port}-${Date.now()}`);
  const chrome = spawn(CHROME, ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "--no-first-run", "about:blank"]);
  let c; const events = []; let done; const fin = new Promise((r) => (done = r)); const pending = [];
  try {
    for (let i = 0; i < 200 && !c; i++) {
      try {
        const t = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((x) => x.type === "page");
        if (t) {
          const ws = new WebSocket(t.webSocketDebuggerUrl);
          await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
          let id = 0; const pend = new Map();
          ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pend.has(d.id)) { pend.get(d.id)(d.result ?? d); pend.delete(d.id); }
            else if (d.method === "Tracing.dataCollected") events.push(...d.params.value); else if (d.method === "Tracing.tracingComplete") done();
            else if (d.method === "Fetch.requestPaused") pending.push(d.params); };
          c = { send: (method, params = {}) => new Promise((r) => { const i2 = ++id; pend.set(i2, r); ws.send(JSON.stringify({ id: i2, method, params })); }) };
        }
      } catch {}
      if (!c) await sleep(150);
    }
    await c.send("Page.enable"); await c.send("Network.enable");
    if (!FONTS) await c.send("Network.setBlockedURLs", { urls: ["*.woff2"] });
    await c.send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
    await c.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    if (NET) await c.send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: (1600 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });
    await c.send("Fetch.enable", { patterns: [{ urlPattern: BASE + PAGE, resourceType: "Document", requestStage: "Response" }] });
    // Serve the rewritten document as soon as it is paused.
    const pump = (async () => { for (let k = 0; k < 400; k++) { const p = pending.shift(); if (p) {
      const body = await c.send("Fetch.getResponseBody", { requestId: p.requestId });
      const html = body.base64Encoded ? Buffer.from(body.body, "base64").toString("utf8") : body.body;
      const out = variant.split("+").reduce((h, v) => VARIANTS[v](h), html);
      await c.send("Fetch.fulfillRequest", { requestId: p.requestId, responseCode: 200, responseHeaders: [{ name: "content-type", value: "text/html; charset=utf-8" }], body: Buffer.from(out).toString("base64") });
      return; } await sleep(10); } })();
    await c.send("Tracing.start", { traceConfig: { includedCategories: ["devtools.timeline", "disabled-by-default-devtools.timeline"] }, transferMode: "ReportEvents" });
    await c.send("Page.navigate", { url: BASE + PAGE });
    await pump;
    await sleep(8000);
    await c.send("Tracing.end"); await fin;
    const main = events.find((e) => e.name === "thread_name" && e.args?.name === "CrRendererMain");
    const mine = events.filter((e) => main && e.pid === main.pid && e.tid === main.tid && e.ph === "X" && e.dur);
    const L = mine.filter((e) => e.name === "Layout").map((e) => e.dur / 1000);
    const S = mine.filter((e) => e.name === "UpdateLayoutTree").map((e) => e.dur / 1000);
    const P = mine.filter((e) => ["Paint", "PrePaint", "Layerize"].includes(e.name)).map((e) => e.dur / 1000);
    const T = mine.filter((e) => e.name === "RunTask" && e.dur > 50000).map((e) => e.dur / 1000);
    return { maxL: Math.max(0, ...L), sumL: L.reduce((a, b) => a + b, 0), nL: L.length, maxS: Math.max(0, ...S), sumS: S.reduce((a, b) => a + b, 0), sumP: P.reduce((a, b) => a + b, 0), block: T.reduce((a, b) => a + b - 50, 0), nT: T.length, maxT: Math.max(0, ...T) };
  } finally { chrome.kill(); await sleep(300); try { rmSync(profile, { recursive: true, force: true }); } catch {} }
}

console.log(`${PAGE} 4x CPU, fonts ${FONTS ? "loaded" : "blocked"}, ${RUNS} runs, medians (ms)`);
for (const v of LIST) {
  const r = [];
  for (let i = 0; i < RUNS; i++) { try { r.push(await run(v)); } catch (e) { console.log(`  ${v}: ERROR ${e.message}`); } }
  if (!r.length) continue;
  const m = (k) => Math.round(med(r.map((x) => x[k])));
  console.log(`  ${v.padEnd(12)} layout max ${String(m("maxL")).padStart(5)} sum ${String(m("sumL")).padStart(5)} (n ${m("nL")}) | style max ${String(m("maxS")).padStart(4)} sum ${String(m("sumS")).padStart(5)} | paint sum ${m("sumP")} | tasks>50ms ${m("nT")} blocking ${m("block")} max ${m("maxT")}`);
}
