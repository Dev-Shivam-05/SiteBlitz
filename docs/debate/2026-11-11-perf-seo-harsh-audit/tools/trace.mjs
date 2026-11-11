#!/usr/bin/env node
// Main-thread attribution from a real Chrome trace (2026-11-11 audit), cold load under profile A for 10 s.
//   node trace.mjs --base http://localhost:3100 --pages /,/pricing [--seen] [--out-dir results/traces]
// For every main-thread task over 100 ms: start, duration and its direct children grouped by kind
// (style recalc, layout, HTML parse, script per file, paint), plus the 3 heaviest script call sites (file:function).
import { spawn } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const args = process.argv.slice(2);
const opt = (n, d) => (args.includes(`--${n}`) ? args[args.indexOf(`--${n}`) + 1] : d);
const BASE = opt("base", "http://localhost:3100").replace(/\/$/, "");
const PAGES = opt("pages", "/").split(",");
const OUT = opt("out-dir", "");
const SEEN = args.includes("--seen");
if (OUT) mkdirSync(OUT, { recursive: true });
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

for (const path of PAGES) {
  const port = 9600 + Math.floor(Math.random() * 90);
  const profile = join(tmpdir(), `tr-${port}-${Date.now()}`);
  const chrome = spawn(CHROME, ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "--no-first-run", "about:blank"]);
  try {
    let c; const events = []; let done;
    const finished = new Promise((r) => (done = r));
    for (let i = 0; i < 60 && !c; i++) {
      try {
        const t = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((x) => x.type === "page");
        if (t) {
          const ws = new WebSocket(t.webSocketDebuggerUrl);
          await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
          let id = 0; const pend = new Map();
          ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pend.has(d.id)) { pend.get(d.id)(d.result ?? d); pend.delete(d.id); }
            else if (d.method === "Tracing.dataCollected") events.push(...d.params.value); else if (d.method === "Tracing.tracingComplete") done(); };
          c = { send: (method, params = {}) => new Promise((r) => { const i2 = ++id; pend.set(i2, r); ws.send(JSON.stringify({ id: i2, method, params })); }), close: () => ws.close() };
        }
      } catch {}
      if (!c) await sleep(200);
    }
    await c.send("Page.enable"); await c.send("Network.enable");
    await c.send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
    await c.send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
    await c.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    await c.send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: (1600 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });
    if (SEEN) await c.send("Page.addScriptToEvaluateOnNewDocument", { source: "try{sessionStorage.setItem('sb_seen','1')}catch(e){}" });
    await c.send("Tracing.start", { traceConfig: { includedCategories: ["devtools.timeline", "disabled-by-default-devtools.timeline", "v8.execute", "blink.user_timing", "loading"] }, transferMode: "ReportEvents" });
    await c.send("Page.navigate", { url: BASE + path });
    await sleep(10000);
    await c.send("Tracing.end");
    await finished;
    if (OUT) writeFileSync(join(OUT, `trace-${path === "/" ? "home" : path.slice(1).replace(/\//g, "_")}${SEEN ? "-seen" : ""}.json`), JSON.stringify({ traceEvents: events }));
    // Main renderer thread = the thread with CrRendererMain name.
    const main = events.find((e) => e.name === "thread_name" && e.args?.name === "CrRendererMain");
    const onMain = events.filter((e) => main && e.pid === main.pid && e.tid === main.tid && e.ph === "X" && e.dur);
    const nav = events.find((e) => e.name === "navigationStart" && main && e.pid === main.pid) || onMain[0];
    const t0 = nav.ts;
    const tasks = onMain.filter((e) => e.name === "RunTask" && e.dur > 100000).sort((a, b) => a.ts - b.ts);
    const kind = (e) => {
      const d = e.args?.data || e.args?.beginData || {};
      if (e.name === "UpdateLayoutTree" || e.name === "RecalculateStyles") return "style";
      if (e.name === "Layout") return "layout";
      if (e.name === "ParseHTML") return "parseHTML";
      if (["EvaluateScript", "FunctionCall", "TimerFire", "FireAnimationFrame", "EventDispatch", "v8.compile", "v8.compileModule", "RunMicrotasks", "v8.evaluateModule", "FireIdleCallback"].includes(e.name))
        return "script " + String(d.url || d.frame && "" || "").split("/").pop().slice(0, 34);
      if (["Paint", "PrePaint", "Layerize", "UpdateLayer", "Commit", "CompositeLayers"].includes(e.name)) return "paint/commit";
      return "other:" + e.name;
    };
    console.log(`${path}${SEEN ? " (seen)" : ""}: ${tasks.length} tasks > 100 ms`);
    for (const t of tasks) {
      const end = t.ts + t.dur;
      const inside = onMain.filter((e) => e !== t && e.ts >= t.ts && e.ts + e.dur <= end).sort((a, b) => a.ts - b.ts || b.dur - a.dur);
      // direct children: not contained in an earlier, longer event inside the task
      const direct = []; let cover = 0;
      for (const e of inside) if (e.ts >= cover) { direct.push(e); cover = e.ts + e.dur; }
      const agg = {};
      for (const e of direct) agg[kind(e)] = (agg[kind(e)] || 0) + e.dur;
      // forced/nested style+layout inside script
      const nestedSL = inside.filter((e) => (e.name === "Layout" || e.name === "UpdateLayoutTree") && !direct.includes(e)).reduce((s, e) => s + e.dur, 0);
      const parts = Object.entries(agg).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([k, v]) => `${k} ${Math.round(v / 1000)}`).join(", ");
      const fns = inside.filter((e) => e.name === "FunctionCall" || e.name === "EvaluateScript").map((e) => ({ d: e.dur, s: `${String(e.args?.data?.url || "").split("/").pop().slice(0, 30)}:${e.args?.data?.functionName || ""}` })).sort((a, b) => b.d - a.d).slice(0, 3);
      console.log(`   t=${Math.round((t.ts - t0) / 1000)}ms dur ${Math.round(t.dur / 1000)}ms | ${parts}${nestedSL ? ` | forced style/layout inside script ${Math.round(nestedSL / 1000)}` : ""} | top calls: ${fns.map((f) => `${f.s} ${Math.round(f.d / 1000)}`).join("; ")}`);
    }
    c.close();
  } catch (e) { console.log(`${path}: ERROR ${e.stack}`); }
  chrome.kill(); await sleep(500); try { rmSync(profile, { recursive: true, force: true }); } catch {}
}
