#!/usr/bin/env node
// Cold-load lab vitals, N runs per page, fresh browser profile each run (preloader session flag included).
//   node vitals7.mjs --base http://localhost:3100 --pages /,/pricing --runs 7 --profile A|B [--out file.json]
// Profile A: 390x844 DPR2, 4x CPU, 1.6 Mbps / 750 kbps, 150 ms.  Profile B: 360x800 DPR2, 6x CPU, 750 / 250 kbps, 300 ms.
// Per run: FCP, LCP (+ element), load CLS, TBT, longest task, time the preloader stops covering >= 50 % of the screen,
// "visible readiness" = max(LCP, preloader end), and transferred bytes by type at 10 s (CDP Network, incl. prefetches).
// Prints p75 (6th of 7 sorted) and max.
import { spawn } from "node:child_process";
import { rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const args = process.argv.slice(2);
const opt = (n, d) => (args.includes(`--${n}`) ? args[args.indexOf(`--${n}`) + 1] : d);
const BASE = opt("base", "http://localhost:3100").replace(/\/$/, "");
const PAGES = opt("pages", "/").split(",");
const RUNS = Number(opt("runs", "7"));
const P = opt("profile", "A") === "B"
  ? { name: "B", w: 360, h: 800, cpu: 6, down: 750, up: 250, lat: 300 }
  : { name: "A", w: 390, h: 844, cpu: 4, down: 1600, up: 750, lat: 150 };
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
// What-if options: --block "pat1,pat2" blocks matching requests. --css is BROKEN (the style is added before
// documentElement exists and never applies; see results/whatif-INVALID-css-not-applied.txt) - use --seen instead.
const CSS = opt("css", "");
const BLOCK = opt("block", "") ? opt("block").split(",") : [];
// --seen: mark the session as already seen, so the first-visit preloader and the delayed hero entrance are skipped.
const SEEN = args.includes("--seen");
// --inject "<html>": inserted right after <head> in the document response (CDP Fetch), e.g. a style override for an A/B test.
const INJECT = opt("inject", "");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function open(port) {
  for (let i = 0; i < 60; i++) {
    try {
      const t = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((x) => x.type === "page");
      if (t) {
        const ws = new WebSocket(t.webSocketDebuggerUrl);
        await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
        let id = 0; const pend = new Map(); const ls = [];
        ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pend.has(d.id)) { pend.get(d.id)(d.result ?? d); pend.delete(d.id); } else ls.forEach((f) => f(d)); };
        return { send: (method, params = {}) => new Promise((r) => { const i2 = ++id; pend.set(i2, r); ws.send(JSON.stringify({ id: i2, method, params })); }), on: (f) => ls.push(f), close: () => ws.close() };
      }
    } catch {}
    await sleep(200);
  }
  throw new Error("no CDP");
}
const PROBE = `(() => { const v = window.__v = { fcp: 0, lcp: 0, lcpEl: '', cls: 0, tbt: 0, tbtAll: 0, maxTask: 0, plEnd: 0 };
  new PerformanceObserver((l) => { for (const e of l.getEntries()) if (e.name === 'first-contentful-paint') v.fcp = e.startTime; }).observe({ type: 'paint', buffered: true });
  new PerformanceObserver((l) => { for (const e of l.getEntries()) { v.lcp = e.startTime; const el = e.element; v.lcpEl = el ? el.tagName.toLowerCase() + '.' + String(el.className || '').split(' ')[0] : ''; } }).observe({ type: 'largest-contentful-paint', buffered: true });
  new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) v.cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
  new PerformanceObserver((l) => { for (const e of l.getEntries()) { v.tbtAll += Math.max(0, e.duration - 50); if (v.fcp && e.startTime > v.fcp) v.tbt += Math.max(0, e.duration - 50); v.maxTask = Math.max(v.maxTask, e.duration); } }).observe({ type: 'longtask', buffered: true });
  const tick = () => { const el = document.querySelector('.preloader'); if (el) { const cs = getComputedStyle(el); const r = el.getBoundingClientRect();
    const cover = cs.display === 'none' || cs.visibility === 'hidden' ? 0 : Math.max(0, Math.min(innerHeight, r.bottom) - Math.max(0, r.top)) / innerHeight; if (cover >= 0.5) v.plEnd = performance.now(); }
    if (performance.now() < 8000) requestAnimationFrame(tick); }; requestAnimationFrame(tick); })()`;

const q = (a, p) => { const s = [...a].sort((x, y) => x - y); return s[Math.min(s.length - 1, Math.ceil(p * s.length) - 1)]; };
const all = [];
for (const path of PAGES) {
  const runs = [];
  for (let r = 0; r < RUNS; r++) {
    const port = 9500 + Math.floor(Math.random() * 300);
    const profile = join(tmpdir(), `v7-${port}-${Date.now()}`);
    const chrome = spawn(CHROME, ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "--no-first-run", "about:blank"]);
    try {
      const c = await open(port);
      const bytes = {}; const types = new Map();
      c.on((d) => {
        if (d.method === "Network.responseReceived") types.set(d.params.requestId, d.params.type);
        if (d.method === "Network.loadingFinished") { const t = types.get(d.params.requestId) || "Other"; bytes[t] = (bytes[t] || 0) + d.params.encodedDataLength; }
      });
      await c.send("Page.enable"); await c.send("Network.enable");
      await c.send("Network.setCacheDisabled", { cacheDisabled: true });
      await c.send("Emulation.setDeviceMetricsOverride", { width: P.w, height: P.h, deviceScaleFactor: 2, mobile: true });
      await c.send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
      await c.send("Emulation.setCPUThrottlingRate", { rate: P.cpu });
      await c.send("Network.emulateNetworkConditions", { offline: false, latency: P.lat, downloadThroughput: (P.down * 1024) / 8, uploadThroughput: (P.up * 1024) / 8 });
      await c.send("Page.addScriptToEvaluateOnNewDocument", { source: PROBE });
      if (CSS) await c.send("Page.addScriptToEvaluateOnNewDocument", { source: `(() => { const s = document.createElement("style"); s.textContent = ${JSON.stringify(CSS)}; (document.head || document.documentElement).appendChild(s); })()` });
      if (SEEN) await c.send("Page.addScriptToEvaluateOnNewDocument", { source: "try{sessionStorage.setItem('sb_seen','1')}catch(e){}" });
      if (BLOCK.length) await c.send("Network.setBlockedURLs", { urls: BLOCK });
      if (INJECT) {
        await c.send("Fetch.enable", { patterns: [{ urlPattern: BASE + path, resourceType: "Document", requestStage: "Response" }] });
        c.on(async (d) => {
          if (d.method !== "Fetch.requestPaused") return;
          const b = await c.send("Fetch.getResponseBody", { requestId: d.params.requestId });
          const html = (b.base64Encoded ? Buffer.from(b.body, "base64").toString("utf8") : b.body).replace("<head>", "<head>" + INJECT);
          await c.send("Fetch.fulfillRequest", { requestId: d.params.requestId, responseCode: 200, responseHeaders: [{ name: "content-type", value: "text/html; charset=utf-8" }], body: Buffer.from(html).toString("base64") });
        });
      }
      await c.send("Page.navigate", { url: BASE + path });
      await sleep(10000);
      const v = JSON.parse((await c.send("Runtime.evaluate", { expression: "JSON.stringify(window.__v)", returnByValue: true })).result.value);
      const kb = Object.fromEntries(Object.entries(bytes).map(([k, n]) => [k, Math.round(n / 1024)]));
      kb.total = Object.values(kb).reduce((a, b) => a + b, 0);
      runs.push({ ...v, ready: Math.max(v.lcp, v.plEnd), kb });
      c.close();
    } catch (e) { console.log(`${path} run ${r + 1}: ${e.message}`); }
    chrome.kill(); await sleep(400); try { rmSync(profile, { recursive: true, force: true }); } catch {}
  }
  const col = (k) => runs.map((x) => x[k]);
  const kbcol = (k) => runs.map((x) => x.kb[k] || 0);
  const s = { path, profile: P.name, n: runs.length,
    fcp: [q(col("fcp"), 0.75), Math.max(...col("fcp"))], lcp: [q(col("lcp"), 0.75), Math.max(...col("lcp"))], ready: [q(col("ready"), 0.75), Math.max(...col("ready"))],
    plEnd: q(col("plEnd"), 0.75), cls: [q(col("cls"), 0.75), Math.max(...col("cls"))], tbt: [q(col("tbt"), 0.75), Math.max(...col("tbt"))], tbtAll: [q(col("tbtAll"), 0.75), Math.max(...col("tbtAll"))], maxTask: Math.max(...col("maxTask")),
    lcpEl: runs.map((x) => x.lcpEl).sort().find((e, i, a) => a.filter((y) => y === e).length > a.length / 2) || runs[0]?.lcpEl,
    kb10s: { js: q(kbcol("Script"), 0.75), font: q(kbcol("Font"), 0.75), img: q(kbcol("Image"), 0.75), css: q(kbcol("Stylesheet"), 0.75), doc: q(kbcol("Document"), 0.75), fetch: q(kbcol("Fetch"), 0.75), total: q(kbcol("total"), 0.75) } };
  all.push({ ...s, runs });
  const f = (a) => `${Math.round(a[0])}/${Math.round(a[1])}ms`;
  console.log(`${path} [${P.name} x${s.n}] p75/max FCP ${f(s.fcp)} LCP ${f(s.lcp)} READY ${f(s.ready)} (preloader ${Math.round(s.plEnd)}ms) CLS ${s.cls[0].toFixed(3)}/${s.cls[1].toFixed(3)} TBT ${f(s.tbt)} allBlocking ${f(s.tbtAll)} maxTask ${Math.round(s.maxTask)}ms | LCP el ${s.lcpEl} | 10s KB js ${s.kb10s.js} font ${s.kb10s.font} img ${s.kb10s.img} css ${s.kb10s.css} doc ${s.kb10s.doc} fetch ${s.kb10s.fetch} total ${s.kb10s.total}`);
}
if (opt("out")) writeFileSync(opt("out"), JSON.stringify(all, null, 2));
