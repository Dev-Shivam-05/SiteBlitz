// Visible text of <main> as lines: 390 vs 1440 (reduced motion) and JS on vs JS off at 390, printed as a diff.
import { spawn } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const VIS = `(() => { const vis=(el)=>{for(let e=el;e&&e!==document.body;e=e.parentElement){const cs=getComputedStyle(e);if(cs.display==='none'||cs.visibility==='hidden'||+cs.opacity<0.05)return false;}return true;};
  const out=[]; const w=document.createTreeWalker(document.querySelector('main'),NodeFilter.SHOW_TEXT); let n; while((n=w.nextNode())){const t=n.textContent.trim(); if(!t||!n.parentElement||n.parentElement.closest('[aria-hidden=true],.sr-only'))continue; if(vis(n.parentElement)) out.push(t);} return out; })()`;
async function grab(url, w, h, mobile, js) {
  const port = 9700 + Math.floor(Math.random() * 90);
  const chrome = spawn("C:/Program Files/Google/Chrome/Application/chrome.exe", ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${join(tmpdir(), "td-" + port + "-" + Date.now())}`, "--no-first-run", "about:blank"]); chrome.on("exit", (code) => console.log("chrome exited", code));
  let c; for (let i = 0; i < 200 && !c; i++) { try { const t = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((x) => x.type === "page"); if (t) { const ws = new WebSocket(t.webSocketDebuggerUrl); await new Promise((r) => (ws.onopen = r)); let id = 0; const p = new Map(); ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && p.has(d.id)) { p.get(d.id)(d.result); p.delete(d.id); } }; c = (method, params = {}) => new Promise((r) => { const i2 = ++id; p.set(i2, r); ws.send(JSON.stringify({ id: i2, method, params })); }); } } catch (e) { if (i === 199) console.log("cdp err", e.message); } if (!c) await sleep(200); }
  await c("Page.enable"); await c("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 1, mobile });
  await c("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  if (!js) await c("Emulation.setScriptExecutionDisabled", { value: true });
  await c("Page.navigate", { url }); await sleep(5000);
  if (!js) await c("Emulation.setScriptExecutionDisabled", { value: false });
  const r = (await c("Runtime.evaluate", { expression: `JSON.stringify(${VIS})`, returnByValue: true })).result.value;
  chrome.kill(); return JSON.parse(r);
}
const diff = (a, b) => ({ onlyA: a.filter((x) => !b.includes(x)), onlyB: b.filter((x) => !a.includes(x)) });
for (const p of ["/", "/work"]) { const d = diff(await grab("http://localhost:3100" + p, 390, 844, true, true), await grab("http://localhost:3100" + p, 1440, 900, false, true)); console.log(`${p} only at 390: ${JSON.stringify(d.onlyA)} | only at 1440: ${JSON.stringify(d.onlyB)}`); }
{ const d = diff(await grab("http://localhost:3100/contact", 390, 844, true, true), await grab("http://localhost:3100/contact", 390, 844, true, false)); console.log(`/contact only with JS: ${JSON.stringify(d.onlyA).slice(0, 600)} | only without JS: ${JSON.stringify(d.onlyB).slice(0, 300)}`); }
process.exit(0);
