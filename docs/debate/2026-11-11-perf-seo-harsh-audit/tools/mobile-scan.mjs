#!/usr/bin/env node
// Harsh mobile scan over CDP (2026-11-11 audit). One fresh headless Chrome per page.
//   node mobile-scan.mjs --base http://localhost:3100 --pages /,/pricing --widths 320,360,390,412 [--cpu 4] [--out file.json]
// Per page and width: horizontal overflow, tap targets under 24 px (WCAG 2.5.8 fail) and under 48 px (harsh bar),
// visible text under 12 px and under 16 px, share of the first screen covered by fixed/sticky UI, how long the
// first-visit preloader covers the screen, and INP-style interaction latency for real taps (menu, FAQ, link hover)
// under CPU throttling (Event Timing API, durationThreshold 16).
import { spawn } from "node:child_process";
import { existsSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const args = process.argv.slice(2);
const opt = (n, d) => (args.includes(`--${n}`) ? args[args.indexOf(`--${n}`) + 1] : d);
const BASE = opt("base", "http://localhost:3100").replace(/\/$/, "");
const PAGES = opt("pages", "/").split(",");
const WIDTHS = opt("widths", "360").split(",").map(Number);
const CPU = Number(opt("cpu", "4"));
const EARLY = Number(opt("early-ms", "0"));
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function open(port) {
  for (let i = 0; i < 60; i++) {
    try {
      const t = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((x) => x.type === "page");
      if (t) {
        const ws = new WebSocket(t.webSocketDebuggerUrl);
        await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
        let id = 0; const pend = new Map(); const listeners = [];
        ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pend.has(d.id)) { pend.get(d.id)(d); pend.delete(d.id); } else listeners.forEach((f) => f(d)); };
        const send = (method, params = {}) => new Promise((r) => { const i2 = ++id; pend.set(i2, (d) => r(d.result ?? d)); ws.send(JSON.stringify({ id: i2, method, params })); });
        return { send, on: (f) => listeners.push(f), close: () => ws.close() };
      }
    } catch {}
    await sleep(200);
  }
  throw new Error("no CDP");
}
const evalJs = async (c, expr) => (await c.send("Runtime.evaluate", { expression: `(async()=>JSON.stringify(await (${expr})))()`, awaitPromise: true, returnByValue: true })).result?.value;

// Records the preloader's cover (fraction of the viewport it hides) every animation frame from document start.
const PRELOAD_PROBE = `(() => { window.__pl = []; const t0 = performance.now(); const tick = () => { const el = document.querySelector('.preloader');
  if (el) { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); const vis = cs.display !== 'none' && cs.visibility !== 'hidden';
    const cover = vis ? Math.max(0, Math.min(innerHeight, r.bottom) - Math.max(0, r.top)) / innerHeight : 0; window.__pl.push([Math.round(performance.now()), +cover.toFixed(2)]); }
  if (performance.now() - t0 < 4000) requestAnimationFrame(tick); }; requestAnimationFrame(tick);
  window.__ev = []; try { new PerformanceObserver((l) => { for (const e of l.getEntries()) if (e.interactionId) window.__ev.push({ n: e.name, d: Math.round(e.duration), t: e.target?.tagName }); })
    .observe({ type: 'event', durationThreshold: 16, buffered: true }); } catch {} })()`;

const SCAN = `(() => { const W = innerWidth, H = innerHeight; const vis = (el) => { const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity === 0) return false; const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
  const targets = [...document.querySelectorAll('a[href], button, input, select, textarea, summary, [role=button]')].filter(vis).filter((el) => !el.closest('[aria-hidden=true]'));
  const small24 = [], small48 = [];
  for (const el of targets) { const r = el.getBoundingClientRect(); const label = (el.getAttribute('aria-label') || el.textContent || el.tagName).trim().replace(/\\s+/g,' ').slice(0, 30);
    if (r.width < 24 || r.height < 24) small24.push(label + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); else if (r.width < 48 || r.height < 48) small48.push(label + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); }
  const walker = document.createTreeWalker(document.querySelector('main') || document.body, NodeFilter.SHOW_TEXT); const fs = { lt12: 0, lt14: 0, lt16: 0, total: 0, lt12ex: [] };
  let n; while ((n = walker.nextNode())) { const t = n.textContent.trim(); if (!t || !n.parentElement || !vis(n.parentElement)) continue; const s = parseFloat(getComputedStyle(n.parentElement).fontSize); const c = t.length; fs.total += c;
    if (s < 12) { fs.lt12 += c; if (fs.lt12ex.length < 4) fs.lt12ex.push(t.slice(0, 20) + '@' + s); } if (s < 14) fs.lt14 += c; if (s < 16) fs.lt16 += c; }
  let fixedArea = 0; const fixed = []; for (const el of document.querySelectorAll('body *')) { const cs = getComputedStyle(el); if ((cs.position === 'fixed' || cs.position === 'sticky') && vis(el) && !el.classList.contains('preloader')) { const r = el.getBoundingClientRect();
    const a = Math.max(0, Math.min(W, r.right) - Math.max(0, r.left)) * Math.max(0, Math.min(H, r.bottom) - Math.max(0, r.top)); if (a > 0 && el.offsetParent !== null || cs.position==='fixed') { if (a/(W*H) > 0.005) { fixed.push((el.className+'').slice(0,30) + ' ' + Math.round(100*a/(W*H)) + '%'); fixedArea += a; } } } }
  return { overflow: document.documentElement.scrollWidth - W, targets: targets.length, small24: small24.length, small24ex: small24.slice(0, 6), small48: small48.length, small48ex: small48.slice(0, 6),
    textLt12pct: +(100 * fs.lt12 / fs.total).toFixed(1), textLt14pct: +(100 * fs.lt14 / fs.total).toFixed(1), textLt16pct: +(100 * fs.lt16 / fs.total).toFixed(1), lt12ex: fs.lt12ex, fixedPct: Math.round(100 * fixedArea / (W * H)), fixed }; })()`;

const results = [];
for (const path of PAGES) for (const w of WIDTHS) {
  const port = 9400 + Math.floor(Math.random() * 400);
  const profile = join(tmpdir(), `ms-${port}-${Date.now()}`);
  const chrome = spawn(CHROME, ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "--no-first-run", "about:blank"]);
  try {
    const c = await open(port);
    await c.send("Page.enable"); await c.send("Runtime.enable");
    const h = w <= 360 ? 640 : w <= 390 ? 844 : 915;
    await c.send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 2, mobile: true });
    await c.send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
    await c.send("Emulation.setCPUThrottlingRate", { rate: CPU });
    await c.send("Page.addScriptToEvaluateOnNewDocument", { source: PRELOAD_PROBE });
    await c.send("Page.navigate", { url: BASE + path });
    let early = null;
    if (EARLY) {
      // One tap on the menu button while the page is still hydrating / starting motion (the moment it becomes visible).
      await sleep(EARLY);
      const b = JSON.parse(await evalJs(c, `(()=>{const el=document.querySelector('button[aria-expanded]');if(!el)return null;const r=el.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2}})()`) || "null");
      if (b) { await c.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: b.x, y: b.y }] }); await sleep(40); await c.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] }); }
      await sleep(2500);
      const evs = JSON.parse(await evalJs(c, "window.__ev"));
      early = evs.length ? Math.max(...evs.map((e) => e.d)) : null;
      const st = JSON.parse(await evalJs(c, "document.querySelector('button[aria-expanded]')?.getAttribute('aria-expanded')"));
      console.log(`${path} @${w} EARLY TAP at ${EARLY}ms: event duration ${early}ms (${evs.map((e) => e.n + ':' + e.d).join(' ')}) menu expanded=${st}`);
      await evalJs(c, "(window.__ev = [], document.querySelector('button[aria-expanded]')?.getAttribute('aria-expanded') === 'true' && document.querySelector('button[aria-expanded]').click(), 1)");
      await sleep(Math.max(0, 6000 - EARLY - 2500));
    } else await sleep(6000);
    const pl = JSON.parse(await evalJs(c, "window.__pl"));
    const covered = pl.filter(([, v]) => v >= 0.5);
    const scan = JSON.parse(await evalJs(c, SCAN));
    // Real taps: open/close the menu, open two FAQ items, tap a link-like button. Each via CDP touch events.
    const taps = [];
    const tap = async (sel) => {
      const box = JSON.parse(await evalJs(c, `(()=>{const el=[...document.querySelectorAll(${JSON.stringify(sel)})].find(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0&&getComputedStyle(e).visibility!=='hidden'}); if(!el) return null; el.scrollIntoView({block:'center'}); const r=el.getBoundingClientRect(); return {x:r.left+r.width/2,y:r.top+r.height/2}})()`));
      if (!box) return taps.push(`${sel}: not found`);
      await sleep(400);
      const b2 = JSON.parse(await evalJs(c, `(()=>{const el=[...document.querySelectorAll(${JSON.stringify(sel)})].find(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0}); const r=el.getBoundingClientRect(); return {x:r.left+r.width/2,y:r.top+r.height/2}})()`));
      await c.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: b2.x, y: b2.y }] });
      await sleep(60);
      await c.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
      await sleep(900);
      taps.push(sel);
    };
    await tap("button[aria-expanded]");
    await tap("button[aria-expanded]");
    await tap("details summary");
    await tap("details:not([open]) summary");
    const ev = JSON.parse(await evalJs(c, "window.__ev"));
    const byInteraction = ev.length ? Math.max(...ev.map((e) => e.d)) : null;
    const r = { path, w, cpu: CPU, preloaderCoverMs: covered.length ? covered[covered.length - 1][0] : 0, ...scan, taps, maxInteractionMs: byInteraction, events: ev.slice(0, 12) };
    results.push(r);
    console.log(`${path} @${w}: overflow ${scan.overflow}px | preloader covers >=50% until ${r.preloaderCoverMs}ms | targets ${scan.targets}, <24px ${scan.small24}, <48px ${scan.small48} | text<12px ${scan.textLt12pct}% <16px ${scan.textLt16pct}% | fixed UI ${scan.fixedPct}% | max interaction ${byInteraction}ms (${ev.map((e) => e.n + ':' + e.d).join(' ')})`);
    if (scan.small24) console.log(`   <24px: ${scan.small24ex.join(" | ")}`);
    if (scan.lt12ex.length) console.log(`   <12px text: ${scan.lt12ex.join(" | ")}`);
    if (scan.fixed.length) console.log(`   fixed: ${scan.fixed.join(" | ")}`);
    c.close();
  } catch (e) { console.log(`${path} @${w}: ERROR ${e.message}`); }
  chrome.kill(); await sleep(500); try { rmSync(profile, { recursive: true, force: true }); } catch {}
}
if (opt("out")) writeFileSync(opt("out"), JSON.stringify(results, null, 2));
