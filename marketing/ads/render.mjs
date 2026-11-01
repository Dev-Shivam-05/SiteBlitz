#!/usr/bin/env node
// Renders the November ad creatives from HTML (spec: docs/debate/2026-11-01-ad-campaign/02_chatgpt.md).
//   node marketing/ads/render.mjs static   -> out/static-receipt-1080x1350.png
//   node marketing/ads/render.mjs reel     -> out/reel-salon-1080x1920.mp4 (+ cover PNG)
// Frames are rendered deterministically: the page exposes window.renderAt(seconds) and we screenshot each
// frame, so timing never depends on machine speed. Needs Chrome and ffmpeg on PATH. No dependencies.

import { spawn, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "out");
const MODE = process.argv[2] || "static";
const CHROME = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
].find((p) => existsSync(p));
if (!CHROME) throw new Error("Chrome not found");
mkdirSync(OUT, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const port = 9800 + Math.floor(Math.random() * 150);
const chrome = spawn(CHROME, [
  "--headless=new",
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${join(tmpdir(), `adrender-${port}`)}`,
  "--no-first-run",
  "--hide-scrollbars",
  "--allow-file-access-from-files",
  "about:blank",
]);

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
  ws.onmessage = (m) => {
    const msg = JSON.parse(m.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
    }
  };
  return new Promise((resolve) => {
    ws.onopen = () =>
      resolve({
        send: (method, params = {}) =>
          new Promise((res, rej) => {
            pending.set(++id, { resolve: res, reject: rej });
            ws.send(JSON.stringify({ id, method, params }));
          }),
        close: () => ws.close(),
      });
  });
}

async function open(cdp, file, width, height) {
  await cdp.send("Page.enable");
  await cdp.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: false });
  await cdp.send("Page.navigate", { url: pathToFileURL(join(HERE, file)).href });
  await sleep(1500);
  // Gujarati glyphs come from a web font; never capture a fallback-font frame.
  await cdp.send("Runtime.evaluate", { expression: "document.fonts.ready.then(() => true)", awaitPromise: true });
  await sleep(300);
}

async function shot(cdp, path) {
  const { data } = await cdp.send("Page.captureScreenshot", { format: "png" });
  writeFileSync(path, Buffer.from(data, "base64"));
}

try {
  const cdp = await client(await target());
  if (MODE === "static") {
    await open(cdp, "static.html", 1080, 1350);
    await shot(cdp, join(OUT, "static-receipt-1080x1350.png"));
    console.log("wrote out/static-receipt-1080x1350.png");
  } else {
    const FPS = 30;
    const SECONDS = 18;
    const frames = join(tmpdir(), `reel-frames-${port}`);
    mkdirSync(frames, { recursive: true });
    await open(cdp, "reel.html", 1080, 1920);
    for (let f = 0; f < FPS * SECONDS; f++) {
      await cdp.send("Runtime.evaluate", { expression: `window.renderAt(${(f / FPS).toFixed(4)})` });
      await shot(cdp, join(frames, `f${String(f).padStart(4, "0")}.png`));
    }
    await cdp.send("Runtime.evaluate", { expression: "window.renderAt(14.6)" });
    await shot(cdp, join(OUT, "reel-salon-cover-1080x1920.png"));
    // Original, generated sound only (no licensed music): a notification blip at 0 s, taps at 1 s and 9 s,
    // a soft chime at 16 s. The ad must still make sense muted.
    const audio =
      "sine=f=1320:d=0.09,volume=0.35[a0];sine=f=880:d=0.05,volume=0.25,adelay=1000|1000[a1];" +
      "sine=f=990:d=0.05,volume=0.3,adelay=9000|9000[a2];sine=f=660:d=0.6,volume=0.25,afade=t=out:st=0.1:d=0.5,adelay=16000|16000[a3];" +
      `[a0][a1][a2][a3]amix=inputs=4:normalize=0,apad=whole_dur=${SECONDS}[aout]`;
    const out = join(OUT, "reel-salon-1080x1920.mp4");
    const r = spawnSync(
      "ffmpeg",
      ["-y", "-framerate", String(FPS), "-i", join(frames, "f%04d.png"), "-filter_complex", audio, "-map", "0:v", "-map", "[aout]",
       "-c:v", "libx264", "-pix_fmt", "yuv420p", "-profile:v", "high", "-crf", "18", "-r", String(FPS),
       "-c:a", "aac", "-b:a", "128k", "-t", String(SECONDS), "-movflags", "+faststart", out],
      { stdio: "inherit" }
    );
    rmSync(frames, { recursive: true, force: true });
    if (r.status !== 0) throw new Error("ffmpeg failed");
    console.log("wrote out/reel-salon-1080x1920.mp4 and cover");
  }
  cdp.close();
} finally {
  chrome.kill();
}
