// Screenshot of the skip link after a real Tab key press (headless pages have no window focus for element.focus()).
import { spawn } from "node:child_process"; import { tmpdir } from "node:os"; import { join } from "node:path"; import { writeFileSync } from "node:fs";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const port = 9783; const chrome = spawn("C:/Program Files/Google/Chrome/Application/chrome.exe", ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${join(tmpdir(), "ss-" + Date.now())}`, "--no-first-run", "about:blank"]);
let c; for (let i = 0; i < 200 && !c; i++) { try { const t = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((x) => x.type === "page"); if (t) { const ws = new WebSocket(t.webSocketDebuggerUrl); await new Promise((r) => (ws.onopen = r)); let id = 0; const p = new Map(); ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && p.has(d.id)) { p.get(d.id)(d.result); p.delete(d.id); } }; c = (method, params = {}) => new Promise((r) => { const i2 = ++id; p.set(i2, r); ws.send(JSON.stringify({ id: i2, method, params })); }); } } catch {} if (!c) await sleep(150); }
await c("Page.enable"); await c("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
await c("Emulation.setFocusEmulationEnabled", { enabled: true });
await c("Page.navigate", { url: "http://localhost:3100/pricing" }); await sleep(4000);
await c("Input.dispatchKeyEvent", { type: "keyDown", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 }); await c("Input.dispatchKeyEvent", { type: "keyUp", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
await sleep(400);
const { data } = await c("Page.captureScreenshot", { format: "png", clip: { x: 0, y: 0, width: 390, height: 200, scale: 1 } });
writeFileSync(process.argv[2], Buffer.from(data, "base64")); console.log("saved", process.argv[2]);
chrome.kill(); process.exit(0);
