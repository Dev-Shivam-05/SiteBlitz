// Verifies the particle hero stops drawing when it is off-screen or the tab is hidden (fix 5). Counts WebGL draw calls.
import { spawn } from "node:child_process"; import { tmpdir } from "node:os"; import { join } from "node:path";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const port = 9781; const chrome = spawn("C:/Program Files/Google/Chrome/Application/chrome.exe", ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${join(tmpdir(), "hi-" + Date.now())}`, "--no-first-run", "about:blank"]);
let c; for (let i = 0; i < 200 && !c; i++) { try { const t = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((x) => x.type === "page"); if (t) { const ws = new WebSocket(t.webSocketDebuggerUrl); await new Promise((r) => (ws.onopen = r)); let id = 0; const p = new Map(); ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && p.has(d.id)) { p.get(d.id)(d.result); p.delete(d.id); } }; c = (method, params = {}) => new Promise((r) => { const i2 = ++id; p.set(i2, r); ws.send(JSON.stringify({ id: i2, method, params })); }); } } catch {} if (!c) await sleep(150); }
const ev = async (e) => (await c("Runtime.evaluate", { expression: e, returnByValue: true })).result.value;
await c("Page.enable");
await c("Page.addScriptToEvaluateOnNewDocument", { source: `window.__draws=0; for (const P of [WebGLRenderingContext.prototype, window.WebGL2RenderingContext && WebGL2RenderingContext.prototype].filter(Boolean)) for (const m of ['drawArrays','drawElements']) { const o=P[m]; P[m]=function(){ window.__draws++; return o.apply(this, arguments); }; }` });
await c("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
await c("Page.navigate", { url: "http://localhost:3100/" }); await sleep(9000);
const rate = async (label) => { const a = await ev("window.__draws"); await sleep(2000); const b = await ev("window.__draws"); console.log(`${label}: ${b - a} draw calls in 2 s | is-gl ${await ev("document.querySelector('.hero-v4').classList.contains('is-gl')")}`); };
await c("Input.dispatchMouseEvent", { type: "mouseWheel", x: 700, y: 400, deltaX: 0, deltaY: 300 }); await sleep(600);
await rate("hero on screen, scrolled a little");
for (let i = 0; i < 40; i++) { await c("Input.dispatchMouseEvent", { type: "mouseWheel", x: 700, y: 400, deltaX: 0, deltaY: 400 }); await sleep(60); }
await sleep(1500); console.log("scrollY", await ev("Math.round(scrollY)"));
await rate("hero off screen");
await ev("window.__lenis ? window.__lenis.scrollTo(0, {immediate:true}) : scrollTo(0,0)"); await sleep(1500);
await rate("back at top");
await ev("Object.defineProperty(document, 'hidden', {configurable:true, get:()=>true}); Object.defineProperty(document, 'visibilityState', {configurable:true, get:()=>'hidden'}); document.dispatchEvent(new Event('visibilitychange'))");
await sleep(300); await rate("tab hidden (at top)");
chrome.kill(); process.exit(0);
