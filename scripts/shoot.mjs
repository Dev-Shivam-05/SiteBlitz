#!/usr/bin/env node
// Screenshot tool for visual verification (phase T0). Drives headless Chrome over CDP with explicit device
// metrics, because `chrome --headless --window-size` includes browser insets and silently crops (see CLAUDE.md).
// No dependencies: Node >= 22 ships a global WebSocket.
//
//   node scripts/shoot.mjs [--base http://localhost:3000] [--pages /,/work] [--widths 375,1440]
//                          [--rm] [--full] [--out .shots] [--chrome <path>]
//
// --rm    emulate prefers-reduced-motion: reduce. Every section renders static and visible, which makes it the
//         fastest whole-page audit.
// --full  capture the full page height instead of the first viewport.
// Prints one line per shot plus any console errors and horizontal overflow (scrollWidth > viewport width).

import { spawn } from "node:child_process";
import { mkdirSync, existsSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const args = process.argv.slice(2);
const opt = (name, dflt) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? dflt : args[i + 1];
};
const flag = (name) => args.includes(`--${name}`);

const BASE = opt("base", "http://localhost:3000").replace(/\/$/, "");
const PAGES = opt("pages", "/").split(",");
const WIDTHS = opt("widths", "375,1440").split(",").map(Number);
const OUT = opt("out", ".shots");
const RM = flag("rm");
const FULL = flag("full");
const CHROME =
  opt("chrome") ||
  [
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
  ].find((p) => existsSync(p));
// Device heights per width; a phone-shaped viewport for small widths.
const HEIGHT = (w) => (w < 600 ? 812 : w < 1100 ? 1024 : 900);

if (!CHROME) {
  console.error("Chrome not found; pass --chrome <path>");
  process.exit(2);
}
mkdirSync(OUT, { recursive: true });

const port = 9300 + Math.floor(Math.random() * 500);
const profile = join(tmpdir(), `shoot-${port}`);
const chrome = spawn(CHROME, [
  "--headless=new",
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`,
  "--no-first-run",
  "--hide-scrollbars",
  "about:blank",
]);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function target() {
  for (let i = 0; i < 50; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      const page = list.find((t) => t.type === "page");
      if (page) return page.webSocketDebuggerUrl;
    } catch {}
    await sleep(200);
  }
  throw new Error("Chrome did not expose a page target");
}

function client(url) {
  const ws = new WebSocket(url);
  let id = 0;
  const pending = new Map();
  const listeners = [];
  ws.onmessage = (m) => {
    const msg = JSON.parse(m.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
    } else if (msg.method) listeners.forEach((fn) => fn(msg));
  };
  return new Promise((resolve) => {
    ws.onopen = () =>
      resolve({
        send: (method, params = {}) =>
          new Promise((res, rej) => {
            pending.set(++id, { resolve: res, reject: rej });
            ws.send(JSON.stringify({ id, method, params }));
          }),
        on: (fn) => listeners.push(fn),
        close: () => ws.close(),
      });
  });
}

let failed = false;
try {
  const cdp = await client(await target());
  const errors = [];
  cdp.on((m) => {
    if (m.method === "Runtime.exceptionThrown") errors.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text);
    if (m.method === "Runtime.consoleAPICalled" && m.params.type === "error")
      errors.push(m.params.args.map((a) => a.value ?? a.description).join(" "));
  });
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");
  await cdp.send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: RM ? "reduce" : "no-preference" }],
  });

  for (const path of PAGES) {
    for (const w of WIDTHS) {
      errors.length = 0;
      const h = HEIGHT(w);
      await cdp.send("Emulation.setDeviceMetricsOverride", {
        width: w,
        height: h,
        deviceScaleFactor: 1,
        mobile: w < 768,
      });
      await cdp.send("Emulation.setTouchEmulationEnabled", { enabled: w < 768 });
      await cdp.send("Page.navigate", { url: BASE + path });
      await sleep(3500); // preloader + hydration + deferred layers
      const { result } = await cdp.send("Runtime.evaluate", {
        expression:
          "JSON.stringify({sw: document.documentElement.scrollWidth, sh: document.documentElement.scrollHeight, title: document.title})",
        returnByValue: true,
      });
      const info = JSON.parse(result.value);
      let clip;
      if (FULL) {
        // Walk the page once so scroll-triggered content mounts, then return to the top.
        for (let y = 0; y < info.sh; y += h) {
          await cdp.send("Runtime.evaluate", { expression: `window.scrollTo(0, ${y})` });
          await sleep(120);
        }
        await cdp.send("Runtime.evaluate", { expression: "window.scrollTo(0, 0)" });
        await sleep(400);
        clip = { x: 0, y: 0, width: w, height: Math.min(info.sh, 16000), scale: 1 };
      }
      const shot = await cdp.send("Page.captureScreenshot", {
        format: "png",
        captureBeyondViewport: FULL,
        ...(clip ? { clip } : {}),
      });
      const name = `${(path.replace(/[\/?=&]+/g, "_").replace(/^_|_$/g, "") || "home")}-${w}${RM ? "-rm" : ""}${FULL ? "-full" : ""}.png`;
      writeFileSync(join(OUT, name), Buffer.from(shot.data, "base64"));
      let overflow = "";
      if (info.sw > w) {
        // Name the widest offenders so the defect is reproducible without opening the image.
        const { result: o } = await cdp.send("Runtime.evaluate", {
          expression: `JSON.stringify([...document.querySelectorAll("body *")].map(e => [e, e.getBoundingClientRect()])
            .filter(([e, r]) => r.right > ${w} + 1 && r.width > 0 && getComputedStyle(e).position !== "fixed")
            .sort((a, b) => b[1].right - a[1].right).slice(0, 4)
            .map(([e, r]) => e.tagName.toLowerCase() + (e.className && typeof e.className === "string" ? "." + e.className.trim().split(/\\s+/).slice(0, 3).join(".") : "") + "@" + Math.round(r.right)))`,
          returnByValue: true,
        });
        overflow = ` OVERFLOW scrollWidth=${info.sw} widest: ${JSON.parse(o.value).join(", ")}`;
      }
      if (overflow || errors.length) failed = true;
      console.log(`${join(OUT, name)}  ${w}x${h}${overflow}${errors.length ? `  console errors: ${errors.slice(0, 3).join(" | ")}` : ""}`);
    }
  }
  cdp.close();
} catch (e) {
  console.error(e.message);
  failed = true;
} finally {
  chrome.kill();
}
process.exit(failed ? 1 : 0);
