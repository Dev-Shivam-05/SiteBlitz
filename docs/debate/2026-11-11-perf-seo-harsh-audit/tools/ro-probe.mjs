// Counts ResizeObserver callbacks on <body> (Motion.tsx refresh trigger) and scrollHeight changes, no scrolling.
import { spawn } from "node:child_process"; import { tmpdir } from "node:os"; import { join } from "node:path";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const [, , url = "http://localhost:3100/", w = "390"] = process.argv;
const port = 9782; const chrome = spawn("C:/Program Files/Google/Chrome/Application/chrome.exe", ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${join(tmpdir(), "ro-" + Date.now())}`, "--no-first-run", "about:blank"]);
let c; for (let i = 0; i < 200 && !c; i++) { try { const t = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((x) => x.type === "page"); if (t) { const ws = new WebSocket(t.webSocketDebuggerUrl); await new Promise((r) => (ws.onopen = r)); let id = 0; const p = new Map(); ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && p.has(d.id)) { p.get(d.id)(d.result); p.delete(d.id); } }; c = (method, params = {}) => new Promise((r) => { const i2 = ++id; p.set(i2, r); ws.send(JSON.stringify({ id: i2, method, params })); }); } } catch {} if (!c) await sleep(150); }
await c("Page.enable");
await c("Page.addScriptToEvaluateOnNewDocument", { source: `window.__ro=[]; const O=window.ResizeObserver; window.ResizeObserver=class extends O{ constructor(cb){ super((e,o)=>{ if(e.some(x=>x.target===document.body)) window.__ro.push([Math.round(performance.now()), document.documentElement.scrollHeight]); return cb(e,o); }); } };` });
const mob = Number(w) < 768;
await c("Emulation.setDeviceMetricsOverride", { width: Number(w), height: mob ? 844 : 900, deviceScaleFactor: 1, mobile: mob });
await c("Emulation.setCPUThrottlingRate", { rate: 4 });
await c("Page.navigate", { url }); await sleep(14000);
const ro = (await c("Runtime.evaluate", { expression: "JSON.stringify(window.__ro)", returnByValue: true })).result.value;
console.log(url, w, "body RO callbacks [t, scrollHeight]:", ro);
chrome.kill(); process.exit(0);
