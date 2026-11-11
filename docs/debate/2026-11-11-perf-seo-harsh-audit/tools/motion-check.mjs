#!/usr/bin/env node
// Motion correctness after content-visibility (fix Q4): load a page, scroll it top to bottom with real wheel events
// (Lenis on desktop, native on phones), then report scenes that never revealed (opacity < 0.5 or still translated),
// whether the packages track and concept wall engaged, and screenshots at fixed scroll fractions.
//   node motion-check.mjs --base http://localhost:3100 --pages /,/process --w 1440 --h 900 [--out dir]
import { spawn } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const args = process.argv.slice(2);
const opt = (n, d) => (args.includes(`--${n}`) ? args[args.indexOf(`--${n}`) + 1] : d);
const BASE = opt("base", "http://localhost:3100").replace(/\/$/, "");
const PAGES = opt("pages", "/").split(",");
const W = Number(opt("w", "1440")), H = Number(opt("h", "900"));
const OUT = opt("out", "");
if (OUT) mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const mobile = W < 768;

for (const path of PAGES) {
  const port = 9380 + Math.floor(Math.random() * 30);
  const profile = join(tmpdir(), `mc-${port}-${Date.now()}`);
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
  const ev = async (e) => (await c("Runtime.evaluate", { expression: e, returnByValue: true, awaitPromise: true })).result?.value;
  await c("Page.enable");
  await c("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 1, mobile });
  if (mobile) await c("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
  await c("Page.navigate", { url: BASE + path });
  await sleep(7000);
  const total = await ev("document.documentElement.scrollHeight");
  const shots = [0.15, 0.3, 0.45, 0.6, 0.75, 0.9];
  let k = 0;
  for (let i = 0; i < 400; i++) {
    await c("Input.dispatchMouseEvent", { type: "mouseWheel", x: W / 2, y: H / 2, deltaX: 0, deltaY: 240 });
    await sleep(70);
    const y = await ev("scrollY"); const h = await ev("document.documentElement.scrollHeight");
    if (OUT && k < shots.length && y >= shots[k] * (h - H)) {
      await sleep(500);
      const { data } = await c("Page.captureScreenshot", { format: "png" });
      writeFileSync(join(OUT, `${path === "/" ? "home" : path.slice(1).replace(/\//g, "_")}-${W}-${Math.round(shots[k] * 100)}.png`), Buffer.from(data, "base64"));
      k++;
    }
    if (y + H >= h - 4) break;
  }
  await sleep(1500);
  const r = await ev(`(() => {
    const bad = [];
    for (const el of document.querySelectorAll('[data-anim]:not([data-anim=parallax]):not([data-anim=words-scrub])')) {
      if (el.closest('[aria-hidden=true]') && !el.matches('[data-anim]')) continue;
      const cs = getComputedStyle(el); const o = +cs.opacity;
      const kids = el.querySelectorAll('div,span'); let hiddenKids = 0; for (const k of kids) if (+getComputedStyle(k).opacity < 0.5) hiddenKids++;
      if (o < 0.5 || hiddenKids > kids.length / 2) bad.push((el.textContent || '').trim().slice(0, 30) + ' (' + el.dataset.anim + ')');
    }
    const pk = document.querySelector('[data-htrack]');
    return { bad, track: pk ? pk.classList.contains('is-track') : null, cvSections: [...document.querySelectorAll('main > section')].filter(s => getComputedStyle(s).contentVisibility === 'auto').length,
      sections: document.querySelectorAll('main > section').length, scrollH: document.documentElement.scrollHeight };
  })()`);
  console.log(`${path} @${W}x${H}: page ${total}px -> ${r.scrollH}px after scroll | content-visibility sections ${r.cvSections}/${r.sections} | packages track ${r.track} | unrevealed scenes: ${r.bad.length ? r.bad.join("; ") : "none"}`);
  chrome.kill(); await sleep(300); try { rmSync(profile, { recursive: true, force: true }); } catch {}
}
