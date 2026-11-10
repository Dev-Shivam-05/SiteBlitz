#!/usr/bin/env node
// Reference-site scroll capture for the 2026-11-10 motion-reference debate.
// Opens a live site in headless Chrome over CDP, scrolls it with real wheel events (Lenis/GSAP sites ignore
// window.scrollTo), saves a JPEG frame after every step, and prints what the page is built from
// (GSAP / ScrollTrigger / Lenis / WebGL / fonts / colours / pinned sections) so the analysis is measured, not guessed.
//
//   node ref-scroll.mjs --url https://example.com --name ex [--w 1440] [--h 900] [--steps 14] [--delta 700] [--out .shots/refs]

import { spawn } from "node:child_process";
import { mkdirSync, existsSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf(`--${n}`); return i === -1 ? d : args[i + 1]; };
const URL_ = opt("url");
const NAME = opt("name", "ref");
const W = Number(opt("w", "1440"));
const H = Number(opt("h", W < 600 ? "844" : "900"));
const STEPS = Number(opt("steps", "14"));
const DELTA = Number(opt("delta", "700"));
const OUT = opt("out", ".shots/refs");
const MOBILE = W < 768;
const CHROME = ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"].find((p) => existsSync(p));
if (!URL_ || !CHROME) { console.error("need --url and Chrome"); process.exit(2); }
mkdirSync(OUT, { recursive: true });

const port = 9800 + Math.floor(Math.random() * 150);
const chrome = spawn(CHROME, ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${join(tmpdir(), `refscroll-${port}`)}`,
  "--no-first-run", "--hide-scrollbars", "--mute-audio", "--autoplay-policy=no-user-gesture-required", "about:blank"]);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function target() {
  for (let i = 0; i < 60; i++) {
    try { const l = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); const p = l.find((t) => t.type === "page"); if (p) return p.webSocketDebuggerUrl; } catch {}
    await sleep(200);
  }
  throw new Error("no page target");
}
function client(url) {
  const ws = new WebSocket(url); let id = 0; const pending = new Map();
  ws.onmessage = (m) => { const msg = JSON.parse(m.data); if (msg.id && pending.has(msg.id)) { const { res, rej } = pending.get(msg.id); pending.delete(msg.id); msg.error ? rej(new Error(msg.error.message)) : res(msg.result); } };
  return new Promise((r) => { ws.onopen = () => r({ send: (method, params = {}) => new Promise((res, rej) => { pending.set(++id, { res, rej }); ws.send(JSON.stringify({ id, method, params })); }), close: () => ws.close() }); });
}

// Everything measured in the page itself.
const PROBE = `(() => {
  const cs = (e) => e ? getComputedStyle(e) : null;
  const h1 = document.querySelector("h1"); const h = cs(h1);
  const fams = new Set(); document.fonts.forEach((f) => { if (f.status === "loaded") fams.add(f.family.replace(/["']/g, "") + " " + f.weight); });
  const canv = [...document.querySelectorAll("canvas")]; let gl = 0;
  canv.forEach((c) => { try { if (c.getContext("webgl2") || c.getContext("webgl")) gl++; } catch {} });
  const scripts = [...document.scripts].map((s) => s.src).filter(Boolean).join(" ");
  const sticky = [...document.querySelectorAll("body *")].filter((e) => cs(e).position === "sticky").length;
  return {
    title: document.title, scrollH: document.documentElement.scrollHeight,
    gsap: !!window.gsap || /gsap/i.test(scripts), scrollTrigger: !!window.ScrollTrigger || /ScrollTrigger/i.test(scripts),
    lenis: !!window.lenis || !!window.Lenis || document.documentElement.classList.contains("lenis") || /lenis/i.test(scripts),
    locomotive: document.documentElement.classList.contains("has-scroll-smooth") || /locomotive/i.test(scripts),
    three: !!window.THREE || /three/i.test(scripts), webflow: !!window.Webflow, next: !!window.__NEXT_DATA__ || !!document.querySelector("script[src*='_next']"),
    framer: !!document.querySelector("[data-framer-name], #__framer-badge-container") , canvases: canv.length, webgl: gl,
    pinSpacers: document.querySelectorAll(".pin-spacer").length, sticky, videos: document.querySelectorAll("video").length,
    imgs: document.images.length, bodyBg: cs(document.body).backgroundColor, htmlBg: cs(document.documentElement).backgroundColor,
    text: cs(document.body).color, h1: h1 ? { text: h1.innerText.slice(0, 120), font: h.fontFamily, size: h.fontSize, weight: h.fontWeight, lh: h.lineHeight, ls: h.letterSpacing, color: h.color } : null,
    fonts: [...fams].slice(0, 12), bodyFont: cs(document.body).fontFamily, bytes: performance.getEntriesByType("resource").reduce((a, r) => a + (r.transferSize || 0), 0)
  };
})()`;

let code = 0;
try {
  const cdp = await client(await target());
  await cdp.send("Page.enable");
  await cdp.send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 1, mobile: MOBILE });
  if (MOBILE) await cdp.send("Emulation.setTouchEmulationEnabled", { enabled: true });
  await cdp.send("Page.navigate", { url: URL_ });
  await sleep(9000); // preloaders and intro sequences
  const shot = async (i) => {
    const s = await cdp.send("Page.captureScreenshot", { format: "jpeg", quality: 62 });
    writeFileSync(join(OUT, `${NAME}-${W}-${String(i).padStart(2, "0")}.jpg`), Buffer.from(s.data, "base64"));
  };
  await shot(0);
  const { result: p } = await cdp.send("Runtime.evaluate", { expression: `JSON.stringify(${PROBE})`, returnByValue: true });
  console.log(`PROBE ${NAME}@${W}: ${p.value}`);
  const ys = [];
  for (let i = 1; i <= STEPS; i++) {
    if (MOBILE) {
      await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: W / 2, y: H * 0.75 }] });
      for (let k = 1; k <= 6; k++) { await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: W / 2, y: H * 0.75 - (k * DELTA) / 6 }] }); await sleep(16); }
      await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    } else {
      // Several smaller wheel ticks read like a real hand and keep scrubbed timelines in step.
      for (let k = 0; k < 5; k++) { await cdp.send("Input.dispatchMouseEvent", { type: "mouseWheel", x: W / 2, y: H / 2, deltaX: 0, deltaY: DELTA / 5 }); await sleep(40); }
    }
    await sleep(1100);
    const { result: y } = await cdp.send("Runtime.evaluate", { expression: "Math.round(window.scrollY)", returnByValue: true });
    ys.push(y.value);
    await shot(i);
  }
  console.log(`SCROLL ${NAME}@${W}: ${ys.join(",")}`);
  cdp.close();
} catch (e) { console.error(`ERROR ${NAME}: ${e.message}`); code = 1; } finally { chrome.kill(); }
process.exit(code);
