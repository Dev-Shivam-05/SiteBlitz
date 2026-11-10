// Scroll-frame capture: one Chrome session, one page, many scroll positions. Proves scroll scenes (pinned stages,
// sticky tracks, scrubbed strokes) at the moments that matter, which a full-page shot cannot show.
//
//   node scripts/frames.mjs --page / --width 1440 --at "[data-hall]:0.5,#pricing:0.3" [--rm] [--out .shots/frames]
//                           [--base http://localhost:3000] [--wait 900] [--cookie name=value] [--eval "<js>"]
//                           [--hover "<selector>" --hover-wait 3000]
//
// Each --at item is <selector>:<fraction>: scroll so the element's top is at the page top, plus <fraction> of the
// element's scrollable length (height minus one viewport; tall pinned sections) or of its height if it is short.
// A plain number ("0", "2400") scrolls to that y. --eval runs after every scroll and its JSON is printed.
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const args = process.argv.slice(2);
const opt = (name, dflt) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? dflt : args[i + 1];
};
const flag = (name) => args.includes(`--${name}`);

const BASE = opt("base", "http://localhost:3000").replace(/\/$/, "");
const PAGE = opt("page", "/");
const W = Number(opt("width", "1440"));
const H = Number(opt("height", W < 600 ? "812" : W < 1100 ? "1024" : "900"));
const AT = opt("at", "0").split(",");
const OUT = opt("out", ".shots/frames");
const WAIT = Number(opt("wait", "900"));
const RM = flag("rm");
const EVAL = opt("eval");
// --hover: move the real mouse to the centre of the first matching element before each shot (hover states, cursor)
const HOVER = opt("hover");
const HOVER_WAIT = Number(opt("hover-wait", "3000"));
const CHROME = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
].find((p) => existsSync(p));
if (!CHROME) {
  console.error("Chrome not found");
  process.exit(2);
}
mkdirSync(OUT, { recursive: true });

const port = 9300 + Math.floor(Math.random() * 500);
const chrome = spawn(CHROME, [
  "--headless=new",
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${join(tmpdir(), `frames-${port}`)}`,
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
  throw new Error("no page target");
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
    if (m.method === "Runtime.consoleAPICalled" && m.params.type === "error") errors.push(m.params.args.map((a) => a.value ?? a.description).join(" "));
  });
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");
  const cookie = opt("cookie");
  if (cookie) {
    const [name, ...rest] = cookie.split("=");
    await cdp.send("Network.enable");
    await cdp.send("Network.setCookie", { name, value: rest.join("="), url: BASE });
  }
  await cdp.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: RM ? "reduce" : "no-preference" }] });
  await cdp.send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 1, mobile: W < 768 });
  await cdp.send("Emulation.setTouchEmulationEnabled", { enabled: W < 768 });
  await cdp.send("Page.navigate", { url: BASE + PAGE });
  await sleep(4000);
  const ev = async (expression) => {
    const { result } = await cdp.send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    return result.value;
  };
  // Walk the page once so lazy images and once-only reveals have fired, then work through the frames.
  const sh = await ev("document.documentElement.scrollHeight");
  for (let y = 0; y < sh; y += Math.round(H * 0.8)) {
    await ev(`(window.__lenis ? window.__lenis.scrollTo(${y}, {immediate: true}) : scrollTo(0, ${y}), 0)`);
    await sleep(140);
  }
  for (const at of AT) {
    const y = await ev(`(() => {
      const spec = ${JSON.stringify(at)};
      if (/^\\d+$/.test(spec)) return Number(spec);
      const i = spec.lastIndexOf(":");
      const el = document.querySelector(spec.slice(0, i));
      if (!el) return -1;
      const f = Number(spec.slice(i + 1));
      const top = el.getBoundingClientRect().top + scrollY;
      const len = el.offsetHeight > innerHeight * 1.2 ? el.offsetHeight - innerHeight : el.offsetHeight;
      return Math.round(top + f * len);
    })()`);
    if (y < 0) {
      console.log(`  ${at}: selector not found`);
      failed = true;
      continue;
    }
    await ev(`(window.__lenis ? window.__lenis.scrollTo(${y}, {immediate: true}) : scrollTo(0, ${y}), 0)`);
    await sleep(WAIT);
    if (HOVER) {
      const pt = await ev(`(() => { const r = document.querySelector(${JSON.stringify(HOVER)})?.getBoundingClientRect(); return r ? [r.left + r.width / 2, r.top + r.height / 2] : null; })()`);
      if (pt) {
        for (const k of [0.2, 0.5, 0.8, 1]) {
          await cdp.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: pt[0] * k, y: pt[1] * k, pointerType: "mouse" });
          await sleep(60);
        }
        await sleep(HOVER_WAIT);
      }
    }
    let extra = "";
    if (EVAL) extra = "  " + JSON.stringify(await ev(`(async () => (${EVAL}))()`));
    const shot = await cdp.send("Page.captureScreenshot", { format: "png" });
    const name = `${(PAGE.replace(/[\/?=&]+/g, "_").replace(/^_|_$/g, "") || "home")}-${W}${RM ? "-rm" : ""}-${at.replace(/[^a-z0-9.]+/gi, "_")}.png`;
    writeFileSync(join(OUT, name), Buffer.from(shot.data, "base64"));
    console.log(`${join(OUT, name)}  y=${y}${extra}`);
  }
  const sw = await ev("document.documentElement.scrollWidth");
  if (sw > W) {
    console.log(`OVERFLOW scrollWidth=${sw}`);
    failed = true;
  }
  if (errors.length) {
    console.log(`console errors: ${errors.slice(0, 3).join(" | ")}`);
    failed = true;
  }
  cdp.close();
} catch (e) {
  console.error(e.message);
  failed = true;
} finally {
  chrome.kill();
}
process.exit(failed ? 1 : 0);
