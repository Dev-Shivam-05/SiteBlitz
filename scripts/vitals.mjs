#!/usr/bin/env node
// Lab Core Web Vitals over CDP (phase L1 perf work). Mobile-ish profile: 4x CPU slowdown, ~1.6 Mbps / 150 ms RTT,
// 390x844 viewport — close to Lighthouse's mobile defaults. LAB numbers only: they are not the real-user (field)
// p75 figures that /proof publishes, and must be reported separately. Run against `npm run build && npm start`.
//
//   node scripts/vitals.mjs [--base http://localhost:3000] [--pages /,/pricing] [--runs 3] [--desktop]
//
// Every run uses a fresh browser profile and no cache, so first-visit-only UI (the Preloader) is included.
// Prints per page: median LCP (+ the LCP element), CLS, TBT (sum of long-task time over 50 ms), JS bytes transferred.

import { spawn } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const args = process.argv.slice(2);
const opt = (n, d) => (args.includes(`--${n}`) ? args[args.indexOf(`--${n}`) + 1] : d);
const flag = (n) => args.includes(`--${n}`);
const BASE = opt("base", "http://localhost:3000").replace(/\/$/, "");
const PAGES = opt("pages", "/").split(",");
const RUNS = Number(opt("runs", "3"));
const DESKTOP = flag("desktop");
const CHROME = ["C:/Program Files/Google/Chrome/Application/chrome.exe", "/usr/bin/google-chrome"].find(existsSync);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const OBSERVE = `(() => {
  window.__v = { lcp: 0, lcpEl: "", cls: 0, tbt: 0 };
  new PerformanceObserver((l) => { for (const e of l.getEntries()) { window.__v.lcp = e.startTime;
    const el = e.element; window.__v.lcpEl = el ? el.tagName.toLowerCase() + (el.className && typeof el.className === "string" ? "." + el.className.trim().split(/\\s+/).slice(0,2).join(".") : "") + " \\"" + (el.textContent || "").trim().slice(0, 30) + "\\"" : ""; } })
    .observe({ type: "largest-contentful-paint", buffered: true });
  new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__v.cls += e.value; })
    .observe({ type: "layout-shift", buffered: true });
  new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__v.tbt += Math.max(0, e.duration - 50); })
    .observe({ type: "longtask", buffered: true });
})()`;

async function cdpConnect(port) {
  for (let i = 0; i < 50; i++) {
    try {
      const page = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((t) => t.type === "page");
      if (page) {
        const ws = new WebSocket(page.webSocketDebuggerUrl);
        let id = 0;
        const pending = new Map();
        const events = [];
        ws.onmessage = (m) => {
          const msg = JSON.parse(m.data);
          if (msg.id && pending.has(msg.id)) {
            pending.get(msg.id)(msg.result);
            pending.delete(msg.id);
          } else if (msg.method) events.push(msg);
        };
        await new Promise((r) => (ws.onopen = r));
        const send = (method, params = {}) =>
          new Promise((res) => {
            pending.set(++id, res);
            ws.send(JSON.stringify({ id, method, params }));
          });
        return { send, events, close: () => ws.close() };
      }
    } catch {}
    await sleep(200);
  }
  throw new Error("no CDP target");
}

async function measure(path) {
  const port = 9800 + Math.floor(Math.random() * 150);
  const profile = join(tmpdir(), `vitals-${port}-${Date.now()}`);
  const chrome = spawn(CHROME, ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "--no-first-run", "about:blank"]);
  try {
    const c = await cdpConnect(port);
    await c.send("Page.enable");
    await c.send("Network.enable");
    await c.send("Network.setCacheDisabled", { cacheDisabled: true });
    const w = DESKTOP ? 1350 : 390, h = DESKTOP ? 940 : 844;
    await c.send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: DESKTOP ? 1 : 2, mobile: !DESKTOP });
    if (!DESKTOP) {
      await c.send("Emulation.setCPUThrottlingRate", { rate: 4 });
      await c.send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });
    }
    await c.send("Page.addScriptToEvaluateOnNewDocument", { source: OBSERVE });
    await c.send("Page.navigate", { url: BASE + path });
    await sleep(DESKTOP ? 6000 : 12000);
    const { result } = await c.send("Runtime.evaluate", { expression: "JSON.stringify(window.__v)", returnByValue: true });
    const v = JSON.parse(result.value);
    let js = 0;
    for (const e of c.events) if (e.method === "Network.loadingFinished") {
      const resp = c.events.find((r) => r.method === "Network.responseReceived" && r.params.requestId === e.params.requestId);
      if (resp && /javascript/.test(resp.params.response.mimeType)) js += e.params.encodedDataLength;
    }
    c.close();
    return { ...v, js };
  } finally {
    chrome.kill();
    await sleep(300);
    try { rmSync(profile, { recursive: true, force: true }); } catch {}
  }
}

const median = (a) => [...a].sort((x, y) => x - y)[Math.floor(a.length / 2)];
for (const path of PAGES) {
  const runs = [];
  for (let i = 0; i < RUNS; i++) runs.push(await measure(path));
  const lcp = median(runs.map((r) => r.lcp));
  const pick = runs.find((r) => r.lcp === lcp);
  console.log(
    `${path}  ${DESKTOP ? "desktop" : "mobile 4xCPU slow-4G"}  LCP ${(lcp / 1000).toFixed(2)}s [${pick.lcpEl}]  ` +
      `CLS ${median(runs.map((r) => r.cls)).toFixed(3)}  TBT ${Math.round(median(runs.map((r) => r.tbt)))}ms  JS ${Math.round(median(runs.map((r) => r.js)) / 1024)}KB  (median of ${RUNS})`
  );
}
