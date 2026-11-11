#!/usr/bin/env node
// CPU profile of a cold load (fix Q4: what is inside the ~0.7 s react-dom task?). Profile A CPU (4x), no network
// throttling, sampling every 100 us for 8 s. Prints self time by function (name, file:line) for the top entries and
// self time per script file.
//   node cpu-profile.mjs --base http://localhost:3100 --page /pricing
import { spawn } from "node:child_process";
import { rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const args = process.argv.slice(2);
const opt = (n, d) => (args.includes(`--${n}`) ? args[args.indexOf(`--${n}`) + 1] : d);
const BASE = opt("base", "http://localhost:3100").replace(/\/$/, "");
const PAGE = opt("page", "/pricing");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const port = 9420;
const profile = join(tmpdir(), `cp-${Date.now()}`);
const chrome = spawn("C:/Program Files/Google/Chrome/Application/chrome.exe", ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "--no-first-run", "about:blank"]);
let c;
for (let i = 0; i < 200 && !c; i++) {
  try {
    const t = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((x) => x.type === "page");
    if (t) {
      const ws = new WebSocket(t.webSocketDebuggerUrl);
      await new Promise((r) => (ws.onopen = r));
      let id = 0; const pend = new Map();
      ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pend.has(d.id)) { pend.get(d.id)(d.result ?? d); pend.delete(d.id); } };
      c = (method, params = {}) => new Promise((r) => { const i2 = ++id; pend.set(i2, r); ws.send(JSON.stringify({ id: i2, method, params })); });
    }
  } catch {}
  if (!c) await sleep(150);
}
await c("Page.enable"); await c("Profiler.enable");
await c("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
await c("Emulation.setCPUThrottlingRate", { rate: 4 });
await c("Profiler.setSamplingInterval", { interval: 100 });
await c("Profiler.start");
await c("Page.navigate", { url: BASE + PAGE });
await sleep(8000);
const { profile: p } = await c("Profiler.stop");
chrome.kill();
await sleep(300);
try { rmSync(profile, { recursive: true, force: true }); } catch {}

const dt = new Map(); // node id -> self microseconds
for (let i = 0; i < p.samples.length; i++) dt.set(p.samples[i], (dt.get(p.samples[i]) || 0) + (p.timeDeltas[i] || 0));
const byFn = new Map(); const byFile = new Map();
for (const n of p.nodes) {
  const us = dt.get(n.id) || 0;
  if (!us) continue;
  const f = n.callFrame; const file = (f.url || "(native)").split("/").pop();
  const key = `${f.functionName || "(anon)"} ${file}:${f.lineNumber + 1}:${f.columnNumber + 1}`;
  byFn.set(key, (byFn.get(key) || 0) + us);
  byFile.set(file, (byFile.get(file) || 0) + us);
}
const top = (m, k) => [...m].sort((a, b) => b[1] - a[1]).slice(0, k).map(([n, us]) => `   ${String(Math.round(us / 1000)).padStart(5)} ms  ${n}`).join("\n");
console.log(`${PAGE}: self time by file (4x CPU, 8 s)\n${top(byFile, 12)}\nTop functions:\n${top(byFn, 25)}`);
