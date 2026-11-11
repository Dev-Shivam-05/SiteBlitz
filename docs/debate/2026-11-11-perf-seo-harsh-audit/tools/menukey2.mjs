// Keyboard check of the phone menu modal + skip link (fix Q5).
import { spawn } from "node:child_process"; import { tmpdir } from "node:os"; import { join } from "node:path";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const port = 9779; const chrome = spawn("C:/Program Files/Google/Chrome/Application/chrome.exe", ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${join(tmpdir(), "mk2-" + Date.now())}`, "--no-first-run", "about:blank"]);
let c; for (let i = 0; i < 200 && !c; i++) { try { const t = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((x) => x.type === "page"); if (t) { const ws = new WebSocket(t.webSocketDebuggerUrl); await new Promise((r) => (ws.onopen = r)); let id = 0; const p = new Map(); ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && p.has(d.id)) { p.get(d.id)(d.result); p.delete(d.id); } }; c = (method, params = {}) => new Promise((r) => { const i2 = ++id; p.set(i2, r); ws.send(JSON.stringify({ id: i2, method, params })); }); } } catch {} if (!c) await sleep(150); }
const ev = async (e) => (await c("Runtime.evaluate", { expression: e, returnByValue: true })).result.value;
const key = async (k, code, vk, text, mods = 0) => { await c("Input.dispatchKeyEvent", { type: "keyDown", key: k, code, windowsVirtualKeyCode: vk, text, modifiers: mods }); await c("Input.dispatchKeyEvent", { type: "keyUp", key: k, code, windowsVirtualKeyCode: vk, modifiers: mods }); };
const who = "(document.activeElement.closest('#mobile-nav')?'IN:':document.activeElement.closest('header')?'HDR:':'OUT:') + (document.activeElement.getAttribute('aria-label')||document.activeElement.textContent||document.activeElement.tagName).trim().slice(0,16)";
await c("Page.enable"); await c("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
await c("Page.navigate", { url: "http://localhost:3100/pricing" }); await sleep(5000);
await key("Tab", "Tab", 9); await sleep(200);
console.log("first Tab stop:", await ev(who), "| skip link visible:", await ev("(() => { const r = document.querySelector('.skip-link').getBoundingClientRect(); return r.top >= 0 && r.bottom > 0; })()"));
await key("Enter", "Enter", 13, "\r"); await sleep(400);
console.log("after Enter on skip link: focus", await ev("document.activeElement.id || document.activeElement.tagName"), "| scrollY", await ev("Math.round(scrollY)"));
await ev("document.querySelector('button[aria-expanded]').focus()");
await key("Enter", "Enter", 13, "\r"); await sleep(700);
console.log("menu open:", await ev("document.querySelector('button[aria-expanded]').getAttribute('aria-expanded')"), "| focus:", await ev(who), "| main inert:", await ev("document.querySelector('main').inert"));
const stops = []; for (let i = 0; i < 16; i++) { await key("Tab", "Tab", 9); await sleep(120); stops.push(await ev(who)); }
console.log("Tab x16:", stops.join(" | "));
const back = []; for (let i = 0; i < 4; i++) { await key("Tab", "Tab", 9, undefined, 8); await sleep(120); back.push(await ev(who)); }
console.log("Shift+Tab x4:", back.join(" | "));
await key("Escape", "Escape", 27); await sleep(600);
console.log("after Escape: expanded", await ev("document.querySelector('button[aria-expanded]').getAttribute('aria-expanded')"), "| focus on toggle", await ev("document.activeElement === document.querySelector('button[aria-expanded]')"), "| main inert", await ev("document.querySelector('main').inert"));
chrome.kill(); process.exit(0);
