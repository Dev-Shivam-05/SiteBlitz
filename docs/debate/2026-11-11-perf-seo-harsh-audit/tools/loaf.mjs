#!/usr/bin/env node
// Long-animation-frame attribution during a cold load under profile A (390x844, 4x CPU, 1.6 Mbps, 150 ms).
//   node loaf.mjs --base http://localhost:3100 --pages / --runs 2
// Prints the 4 longest frames per run with their top scripts (file:function, duration, forced style/layout).
import { spawn } from "node:child_process";
import { rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const args = process.argv.slice(2);
const opt = (n, d) => (args.includes(`--${n}`) ? args[args.indexOf(`--${n}`) + 1] : d);
const BASE = opt("base", "http://localhost:3100").replace(/\/$/, "");
const PAGES = opt("pages", "/").split(",");
const RUNS = Number(opt("runs", "2"));
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const PROBE = `(() => { window.__lo = []; new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lo.push({ t: Math.round(e.startTime), d: Math.round(e.duration),
  style: Math.round(e.styleAndLayoutStart ? e.startTime + e.duration - e.styleAndLayoutStart : 0),
  scripts: e.scripts.map((s) => ({ d: Math.round(s.duration), inv: String(s.invoker).slice(0, 40), src: String(s.sourceURL || '').split('/').pop() + ':' + (s.sourceFunctionName || ''), forced: Math.round(s.forcedStyleAndLayoutDuration) })) }); })
  .observe({ type: 'long-animation-frame', buffered: true }); })()`;

for (const path of PAGES) for (let r = 0; r < RUNS; r++) {
  const port = 9900 + Math.floor(Math.random() * 90);
  const profile = join(tmpdir(), `lo-${port}-${Date.now()}`);
  const chrome = spawn(CHROME, ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "--no-first-run", "about:blank"]);
  try {
    let c;
    for (let i = 0; i < 60 && !c; i++) {
      try {
        const t = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((x) => x.type === "page");
        if (t) {
          const ws = new WebSocket(t.webSocketDebuggerUrl);
          await new Promise((res, j) => { ws.onopen = res; ws.onerror = j; });
          let id = 0; const pend = new Map();
          ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pend.has(d.id)) { pend.get(d.id)(d.result ?? d); pend.delete(d.id); } };
          c = { send: (method, params = {}) => new Promise((res) => { const i2 = ++id; pend.set(i2, res); ws.send(JSON.stringify({ id: i2, method, params })); }), close: () => ws.close() };
        }
      } catch {}
      if (!c) await sleep(200);
    }
    await c.send("Page.enable"); await c.send("Network.enable");
    await c.send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
    await c.send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
    await c.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    await c.send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: (1600 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });
    await c.send("Page.addScriptToEvaluateOnNewDocument", { source: PROBE });
    await c.send("Page.navigate", { url: BASE + path });
    await sleep(10000);
    const lo = JSON.parse((await c.send("Runtime.evaluate", { expression: "JSON.stringify(window.__lo)", returnByValue: true })).result.value);
    lo.sort((a, b) => b.d - a.d);
    console.log(`${path} run ${r + 1}: ${lo.length} long frames`);
    for (const f of lo.slice(0, 4)) console.log(`   t=${f.t} ${f.d}ms (style+layout tail ${f.style}ms) | ${f.scripts.sort((a, b) => b.d - a.d).slice(0, 3).map((x) => `${x.src} ${x.d}ms forced ${x.forced} [${x.inv}]`).join(" ; ")}`);
    c.close();
  } catch (e) { console.log(`${path}: ERROR ${e.message}`); }
  chrome.kill(); await sleep(400); try { rmSync(profile, { recursive: true, force: true }); } catch {}
}
