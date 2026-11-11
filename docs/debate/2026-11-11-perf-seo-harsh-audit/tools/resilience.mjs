#!/usr/bin/env node
// Keyboard, failure-resilience and mobile/desktop parity checks (2026-11-11 audit). No CPU throttling.
//   node resilience.mjs --base http://localhost:3100 --pages /,/pricing --out-dir results/shots
// 1. Keyboard (390x844): 30 Tab presses - focused element, visible focus indicator, obscured by fixed UI?
//    Menu: focus the menu button, Enter opens, Escape closes, focus returns.
// 2. JS disabled: is the H1 and main text visible (opacity/visibility), any stranded overlay? screenshot.
// 3. Fonts blocked (*.woff2): horizontal overflow and clipped H1. screenshot.
// 4. Parity: visible text characters in <main> at 390 vs 1440.
import { spawn } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const args = process.argv.slice(2);
const opt = (n, d) => (args.includes(`--${n}`) ? args[args.indexOf(`--${n}`) + 1] : d);
const BASE = opt("base", "http://localhost:3100").replace(/\/$/, "");
const PAGES = opt("pages", "/").split(",");
const OUT = opt("out-dir", "shots-res");
mkdirSync(OUT, { recursive: true });
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function session(fn) {
  const port = 9300 + Math.floor(Math.random() * 90);
  const profile = join(tmpdir(), `rs-${port}-${Date.now()}`);
  const chrome = spawn(CHROME, ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "--no-first-run", "about:blank"]);
  let c;
  for (let i = 0; i < 60 && !c; i++) {
    try {
      const t = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((x) => x.type === "page");
      if (t) {
        const ws = new WebSocket(t.webSocketDebuggerUrl);
        await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
        let id = 0; const pend = new Map();
        ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pend.has(d.id)) { pend.get(d.id)(d.result ?? d); pend.delete(d.id); } };
        c = { send: (method, params = {}) => new Promise((r) => { const i2 = ++id; pend.set(i2, r); ws.send(JSON.stringify({ id: i2, method, params })); }), close: () => ws.close() };
      }
    } catch {}
    if (!c) await sleep(200);
  }
  try { return await fn(c); } finally { c?.close(); chrome.kill(); await sleep(400); try { rmSync(profile, { recursive: true, force: true }); } catch {} }
}
const ev = async (c, expr) => { const r = await c.send("Runtime.evaluate", { expression: `JSON.stringify((()=>{${expr}})())`, returnByValue: true }); return r.result?.value ? JSON.parse(r.result.value) : r; };
const shot = async (c, file) => { const { data } = await c.send("Page.captureScreenshot", { format: "png" }); writeFileSync(join(OUT, file), Buffer.from(data, "base64")); };
const metrics = (c, w, h, mobile) => c.send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 1, mobile });
const slug = (p) => (p === "/" ? "home" : p.slice(1).replace(/\//g, "_"));

const VIS_TEXT = `const vis=(el)=>{for(let e=el;e&&e!==document.body;e=e.parentElement){const cs=getComputedStyle(e);if(cs.display==='none'||cs.visibility==='hidden'||+cs.opacity<0.05)return false;}return true;};
  const w=document.createTreeWalker(document.querySelector('main')||document.body,NodeFilter.SHOW_TEXT);let n,shown=0,hidden=0;while((n=w.nextNode())){const t=n.textContent.trim().length;if(!t||!n.parentElement)continue;if(n.parentElement.closest('[aria-hidden=true],.sr-only'))continue;vis(n.parentElement)?shown+=t:hidden+=t;}`;

for (const path of PAGES) {
  const url = BASE + path;
  // 1. Keyboard
  const kb = await session(async (c) => {
    await c.send("Page.enable"); await metrics(c, 390, 844, true);
    await c.send("Page.navigate", { url }); await sleep(5000);
    const stops = [];
    for (let i = 0; i < 30; i++) {
      await c.send("Input.dispatchKeyEvent", { type: "keyDown", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
      await c.send("Input.dispatchKeyEvent", { type: "keyUp", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
      await sleep(250);
      stops.push(await ev(c, `const el=document.activeElement;if(!el||el===document.body)return {tag:'body'};const r=el.getBoundingClientRect();const cs=getComputedStyle(el);
        const ring=(cs.outlineStyle!=='none'&&parseFloat(cs.outlineWidth)>0)||cs.boxShadow!=='none';const cx=Math.min(innerWidth-1,Math.max(0,r.left+r.width/2)),cy=Math.min(innerHeight-1,Math.max(0,r.top+r.height/2));
        const top=document.elementFromPoint(cx,cy);const covered=top&&!(el===top||el.contains(top)||top.contains(el));
        return {tag:el.tagName.toLowerCase(),label:(el.getAttribute('aria-label')||el.textContent||'').trim().replace(/\\s+/g,' ').slice(0,28),ring,covered:!!covered,coveredBy:covered?(top.className+'').slice(0,30):'',inView:r.bottom>0&&r.top<innerHeight}`));
    }
    // Menu: focus the toggle, Enter, Escape
    const menu = await ev(c, `const b=document.querySelector('button[aria-expanded]');if(!b)return null;b.focus();return {exp:b.getAttribute('aria-expanded')}`);
    await c.send("Input.dispatchKeyEvent", { type: "keyDown", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
    await c.send("Input.dispatchKeyEvent", { type: "keyUp", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
    await sleep(600);
    const opened = await ev(c, `const b=document.querySelector('button[aria-expanded]');return {exp:b.getAttribute('aria-expanded'),focusInMenu:!!document.activeElement.closest('#mobile-nav'),active:document.activeElement.tagName}`);
    await c.send("Input.dispatchKeyEvent", { type: "keyDown", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
    await c.send("Input.dispatchKeyEvent", { type: "keyUp", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
    await sleep(600);
    const closed = await ev(c, `const b=document.querySelector('button[aria-expanded]');return {exp:b.getAttribute('aria-expanded'),focusBack:document.activeElement===b}`);
    return { stops, menu: { before: menu, opened, closed } };
  });
  const real = kb.stops.filter((s) => s.tag !== "body");
  console.log(`${path} KEYBOARD: ${real.length}/30 stops on elements | no visible focus ring: ${real.filter((s) => !s.ring).length} | covered: ${real.filter((s) => s.covered).length} ${[...new Set(real.filter((s) => s.covered).map((s) => s.label + "<-" + s.coveredBy))].slice(0, 3).join(" ; ")} | first stops: ${real.slice(0, 4).map((s) => s.label || s.tag).join(" > ")}`);
  console.log(`   menu: Enter -> expanded=${kb.menu.opened.exp} focusInMenu=${kb.menu.opened.focusInMenu}; Escape -> expanded=${kb.menu.closed.exp} focusBack=${kb.menu.closed.focusBack}`);

  // 2. JS disabled
  const nojs = await session(async (c) => {
    await c.send("Page.enable"); await metrics(c, 390, 844, true);
    await c.send("Emulation.setScriptExecutionDisabled", { value: true });
    await c.send("Page.navigate", { url }); await sleep(4000);
    await shot(c, `nojs-${slug(path)}.png`);
    await c.send("Emulation.setScriptExecutionDisabled", { value: false });
    return ev(c, `${VIS_TEXT} const h1=document.querySelector('h1');const pl=document.querySelector('.preloader');const plcs=pl&&getComputedStyle(pl);
      return {shown,hidden,h1:h1?vis(h1):null,overlay:pl?(plcs.display!=='none'&&plcs.visibility!=='hidden'&&pl.getBoundingClientRect().bottom>0):false}`);
  });
  console.log(`   JS OFF: main text visible ${nojs.shown} chars, hidden ${nojs.hidden} (${((100 * nojs.hidden) / (nojs.shown + nojs.hidden)).toFixed(0)}%) | h1 visible ${nojs.h1} | preloader still covering ${nojs.overlay}`);

  // 3. Fonts blocked
  const nof = await session(async (c) => {
    await c.send("Page.enable"); await c.send("Network.enable"); await metrics(c, 360, 800, true);
    await c.send("Network.setBlockedURLs", { urls: ["*.woff2", "*.woff"] });
    await c.send("Page.navigate", { url }); await sleep(5000);
    await shot(c, `nofonts-${slug(path)}.png`);
    return ev(c, `const h1=document.querySelector('h1');const clipped=[...document.querySelectorAll('h1,h2')].filter(e=>e.scrollWidth>e.clientWidth+1).length;return {overflow:document.documentElement.scrollWidth-innerWidth,clippedHeadings:clipped}`);
  });
  console.log(`   FONTS BLOCKED @360: overflow ${nof.overflow}px, headings wider than their box ${nof.clippedHeadings}`);

  // 4. Parity 390 vs 1440 (after 6 s, reduced motion so reveals are visible)
  const par = {};
  for (const [w, h, m] of [[390, 844, true], [1440, 900, false]]) {
    par[w] = await session(async (c) => {
      await c.send("Page.enable"); await metrics(c, w, h, m);
      await c.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
      await c.send("Page.navigate", { url }); await sleep(5000);
      return ev(c, `${VIS_TEXT} return {shown,hidden,links:[...document.querySelectorAll('main a[href]')].filter(a=>a.getClientRects().length).length}`);
    });
  }
  console.log(`   PARITY (reduced motion): 390px shows ${par[390].shown} chars / ${par[390].links} links, 1440px shows ${par[1440].shown} chars / ${par[1440].links} links (diff ${par[1440].shown - par[390].shown})`);
}
