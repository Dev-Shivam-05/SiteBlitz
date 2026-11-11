#!/usr/bin/env node
// Scroll smoothness under CPU throttling (2026-11-11 audit). Fresh headless Chrome, phone metrics, real touch scroll
// gestures (Input.synthesizeScrollGesture) from top to bottom; records rAF frame gaps and long animation frames.
//   node scroll-jank.mjs --base http://localhost:3100 --pages /,/work --cpu 4 [--w 390 --h 844]
// Note: headless Chrome has no real GPU (SwiftShader), so WebGL cost is overstated; read with that caveat.
import { spawn } from "node:child_process";
import { rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const args = process.argv.slice(2);
const opt = (n, d) => (args.includes(`--${n}`) ? args[args.indexOf(`--${n}`) + 1] : d);
const BASE = opt("base", "http://localhost:3100").replace(/\/$/, "");
const PAGES = opt("pages", "/").split(",");
const CPU = Number(opt("cpu", "4"));
const W = Number(opt("w", "390")), H = Number(opt("h", "844"));
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
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
const PROBE = `(() => { window.__f = { gaps: [], loaf: [], on: false, cls: 0, clsLoad: 0, shifts: [] }; new PerformanceObserver((l) => { for (const e of l.getEntries()) { if (e.hadRecentInput) continue; if (window.__f.on) { window.__f.cls += e.value; if (e.value > 0.005) window.__f.shifts.push(+e.value.toFixed(3) + '@' + Math.round(scrollY) + ':' + ((e.sources||[])[0]?.node?.className || (e.sources||[])[0]?.node?.nodeName || '?').toString().slice(0,40)); } else window.__f.clsLoad += e.value; } }).observe({ type: 'layout-shift', buffered: true }); let last = 0; const tick = (t) => { if (window.__f.on && last) window.__f.gaps.push(t - last); last = t; requestAnimationFrame(tick); }; requestAnimationFrame(tick);
  try { new PerformanceObserver((l) => { for (const e of l.getEntries()) if (window.__f.on) window.__f.loaf.push(Math.round(e.duration)); }).observe({ type: 'long-animation-frame' }); } catch {} })()`;

for (const path of PAGES) {
  const port = 9800 + Math.floor(Math.random() * 150);
  const profile = join(tmpdir(), `sj-${port}-${Date.now()}`);
  const chrome = spawn(CHROME, ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "--no-first-run", "about:blank"]);
  try {
    const c = await open(port);
    const bytes = {}; const types = new Map(); let scrolling = false; const sb = {};
    c.on((d) => { if (d.method === "Network.responseReceived") types.set(d.params.requestId, d.params.type); if (d.method === "Network.loadingFinished") { const t = types.get(d.params.requestId) || "Other"; bytes[t] = (bytes[t] || 0) + d.params.encodedDataLength; if (scrolling) sb[t] = (sb[t] || 0) + d.params.encodedDataLength; } });
    await c.send("Page.enable"); await c.send("Network.enable");
    await c.send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 2, mobile: true });
    await c.send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
    await c.send("Emulation.setCPUThrottlingRate", { rate: CPU });
    await c.send("Page.addScriptToEvaluateOnNewDocument", { source: PROBE });
    await c.send("Page.navigate", { url: BASE + path });
    await sleep(8000);
    const total = (await c.send("Runtime.evaluate", { expression: "document.documentElement.scrollHeight", returnByValue: true })).result.value;
    await c.send("Runtime.evaluate", { expression: "window.__f.on = true" }); scrolling = true;
    const t0 = Date.now();
    // 600 px swipes at a brisk thumb speed until the bottom (or 60 swipes).
    for (let i = 0; i < 60; i++) {
      await c.send("Input.synthesizeScrollGesture", { x: W / 2, y: H * 0.7, yDistance: -600, speed: 1600, gestureSourceType: "mouse", repeatCount: 1 });
      const y = (await c.send("Runtime.evaluate", { expression: "scrollY + innerHeight", returnByValue: true })).result.value;
      if (y >= total - 5) break;
    }
    await sleep(1000);
    const f = JSON.parse((await c.send("Runtime.evaluate", { expression: "JSON.stringify(window.__f)", returnByValue: true })).result.value);
    const g = f.gaps.filter((x) => x < 1000);
    const over33 = g.filter((x) => x > 33.4).length, over50 = g.filter((x) => x > 50).length;
    const sorted = [...g].sort((a, b) => a - b);
    const p95 = sorted[Math.floor(sorted.length * 0.95)] ?? 0;
    const KB = (o) => Object.entries(o).map(([k, n]) => k + ' ' + Math.round(n / 1024)).join(', ');
    console.log(`   CLS load ${f.clsLoad.toFixed(3)} during-scroll ${f.cls.toFixed(3)} ${f.shifts.slice(0, 5).join(' ')} | KB at 8s+scroll: ${KB(bytes)} | fetched during scroll: ${KB(sb)}`);
    console.log(`${path} cpu${CPU} ${W}x${H}: ${g.length} frames in ${((Date.now() - t0) / 1000).toFixed(1)}s, page ${total}px | frames >33ms ${((100 * over33) / g.length).toFixed(1)}% >50ms ${((100 * over50) / g.length).toFixed(1)}% | p95 gap ${p95.toFixed(1)}ms | LoAF ${f.loaf.length} (max ${f.loaf.length ? Math.max(...f.loaf) : 0}ms, total ${f.loaf.reduce((a, b) => a + b, 0)}ms)`);
    c.close();
  } catch (e) { console.log(`${path}: ERROR ${e.message}`); }
  chrome.kill(); await sleep(500); try { rmSync(profile, { recursive: true, force: true }); } catch {}
}
