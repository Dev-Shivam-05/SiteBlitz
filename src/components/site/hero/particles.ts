/* WebGL particle engine for the v4 hero (docs/spec/redesign-v4-showcase.md, row 4).
 *
 * The particles start exactly on the pixels of the static HTML wordmark (same font, size and place, read from the
 * DOM), so the hand-over from text to canvas is invisible. A pointer or finger pushes them away and springs pull
 * them back (CPU, a few ms a frame). As the hero scrolls, each particle flies on its own arc to one cell of the
 * phone screen, taking that cell's colour from the real showroom capture, so the cloud becomes the screenshot;
 * the page then fades the real <img> in on top. Plain WebGL 1, no library: about 4 KB gzipped.
 *
 * Loaded with import() by ParticleHero.tsx only after the browser is idle, never for reduced motion or on
 * low-power devices (the static poster stays). */

const VERT = `
attribute vec2 aA;
attribute vec2 aB;
attribute vec3 aCol;
attribute vec4 aRnd;
attribute vec2 aOff;
attribute float aKind;
uniform vec2 uRes;
uniform float uP;
uniform float uT;
uniform float uDpr;
uniform float uSizeA;
uniform float uSizeB;
uniform float uSwirl;
uniform vec2 uTilt;
varying vec3 vCol;
varying float vShade;
void main() {
  // each particle leaves at its own moment (stagger) and travels for 65% of the morph
  float t = clamp((uP - aRnd.x * 0.35) / 0.65, 0.0, 1.0);
  float e = t * t * (3.0 - 2.0 * t);
  vec2 p = mix(aA, aB, e);
  float arc = sin(e * 3.14159);
  vec2 dir = aB - aA;
  vec2 nrm = normalize(vec2(-dir.y, dir.x) + 0.0001);
  p += nrm * arc * (aRnd.y - 0.5) * uSwirl;
  float z = arc * (aRnd.z - 0.5) * 620.0;
  // a faint shimmer while the particles hold the wordmark
  p += vec2(sin(uT * 1.3 + aRnd.z * 6.283), cos(uT * 1.1 + aRnd.w * 6.283)) * 0.9 * (1.0 - e);
  p += aOff;
  vec2 c = uRes * 0.5;
  vec3 q = vec3(p - c, z);
  float ay = uTilt.x * 0.14;
  float ax = uTilt.y * 0.09;
  q = vec3(q.x * cos(ay) + q.z * sin(ay), q.y, -q.x * sin(ay) + q.z * cos(ay));
  q = vec3(q.x, q.y * cos(ax) - q.z * sin(ax), q.y * sin(ax) + q.z * cos(ax));
  float s = 900.0 / (900.0 - q.z);
  vec2 sp = c + q.xy * s;
  vec2 clip = sp / uRes * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
  float jitter = 0.75 + aRnd.w * 0.5;
  gl_PointSize = mix(uSizeA * jitter, uSizeB, e) * s * uDpr;
  vec3 ink = vec3(0.96, 0.96, 0.94);
  vec3 volt = vec3(0.8, 1.0, 0.0);
  vec3 colA = mix(ink, volt, aKind);
  vCol = mix(colA, aCol, e);
  vShade = mix(0.72 + 0.28 * aRnd.z, 1.0, e) + 0.6 * arc;
}`;

const FRAG = `
precision mediump float;
varying vec3 vCol;
varying float vShade;
uniform float uAlpha;
uniform float uSquare;
void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float r = length(uv);
  float a = mix(smoothstep(0.5, 0.32, r), 1.0, uSquare);
  if (a < 0.02) discard;
  gl_FragColor = vec4(vCol * min(vShade, 1.15), a * uAlpha);
}`;

export interface HeroEngine {
  count: number;
  frame(now: number, raw: number): void;
  resize(): void;
  dispose(): void;
}

export interface HeroEngineOptions {
  canvas: HTMLCanvasElement;
  stage: HTMLElement;
  mark: HTMLElement;
  shot: HTMLImageElement;
  count: number;
  onLost: () => void;
}

/** deterministic random, so a resize rebuilds the same cloud */
function mulberry(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

const STRETCH: Record<string, string> = {
  "50%": "ultra-condensed",
  "62.5%": "extra-condensed",
  "75%": "condensed",
  "87.5%": "semi-condensed",
  "100%": "normal",
  "112.5%": "semi-expanded",
  "125%": "expanded",
  "150%": "extra-expanded",
  "200%": "ultra-expanded",
};

function shader(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || "shader");
  return s;
}

export async function createHeroEngine(o: HeroEngineOptions): Promise<HeroEngine | null> {
  const { canvas, stage, mark, shot, count: N } = o;
  const gl = canvas.getContext("webgl", {
    alpha: true,
    antialias: false,
    depth: false,
    premultipliedAlpha: false,
    powerPreference: "high-performance",
  }) as WebGLRenderingContext | null;
  if (!gl) return null;

  await document.fonts.ready;
  if (!shot.complete || !shot.naturalWidth) {
    await new Promise<void>((res) => {
      shot.addEventListener("load", () => res(), { once: true });
      shot.addEventListener("error", () => res(), { once: true });
      // a lazy image far from the viewport may never start: ask for it
      shot.loading = "eager";
    });
  }
  if (!shot.naturalWidth) return null;

  const prog = gl.createProgram()!;
  gl.attachShader(prog, shader(gl, gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, shader(gl, gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  gl.useProgram(prog);

  const U = (n: string) => gl.getUniformLocation(prog, n);
  const u = {
    res: U("uRes"), p: U("uP"), t: U("uT"), dpr: U("uDpr"), sizeA: U("uSizeA"), sizeB: U("uSizeB"),
    swirl: U("uSwirl"), tilt: U("uTilt"), alpha: U("uAlpha"), square: U("uSquare"),
  };

  const aA = new Float32Array(N * 2);
  const aB = new Float32Array(N * 2);
  const aCol = new Float32Array(N * 3);
  const aRnd = new Float32Array(N * 4);
  const aKind = new Float32Array(N);
  const off = new Float32Array(N * 2);
  const vel = new Float32Array(N * 2);
  const delay = new Float32Array(N);
  const rand = mulberry(7);
  for (let i = 0; i < N * 4; i++) aRnd[i] = rand();
  for (let i = 0; i < N; i++) delay[i] = aRnd[i * 4] * 0.35;

  const buf = (data: Float32Array, name: string, size: number, usage: number) => {
    const b = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, b);
    gl.bufferData(gl.ARRAY_BUFFER, data, usage);
    const loc = gl.getAttribLocation(prog, name);
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
    return b;
  };
  const bA = buf(aA, "aA", 2, gl.STATIC_DRAW);
  const bB = buf(aB, "aB", 2, gl.STATIC_DRAW);
  const bCol = buf(aCol, "aCol", 3, gl.STATIC_DRAW);
  buf(aRnd, "aRnd", 4, gl.STATIC_DRAW);
  const bKind = buf(aKind, "aKind", 1, gl.STATIC_DRAW);
  const bOff = buf(off, "aOff", 2, gl.DYNAMIC_DRAW);

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  let W = 1;
  let H = 1;
  let dpr = 1;
  let sizeA = 2;
  let sizeB = 3;
  // the wordmark's box in stage coordinates, for the idle sweep and the opening breath
  const box = { x: 0, y: 0, w: 1, h: 1 };

  /* A: every inked pixel of the wordmark, drawn with the DOM's own font, size and letter spacing */
  const sampleMark = (sr: DOMRect) => {
    const cs = getComputedStyle(mark);
    const fs = parseFloat(cs.fontSize);
    const range = document.createRange();
    range.selectNodeContents(mark);
    const tr = range.getBoundingClientRect();
    const text = (mark.textContent || "").toUpperCase();
    const pad = Math.ceil(fs * 0.25);
    const c = document.createElement("canvas");
    c.width = Math.ceil(tr.width + pad * 2);
    c.height = Math.ceil(tr.height + pad * 2);
    const ctx = c.getContext("2d", { willReadFrequently: true })!;
    const stretch = STRETCH[cs.fontStretch] || cs.fontStretch || "normal";
    ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${stretch} ${fs}px ${cs.fontFamily}`;
    const c2 = ctx as unknown as { fontStretch?: string; letterSpacing?: string };
    try {
      c2.fontStretch = stretch;
      if (cs.letterSpacing && cs.letterSpacing !== "normal") c2.letterSpacing = cs.letterSpacing;
    } catch {
      /* older canvases: the horizontal scale below absorbs the difference */
    }
    ctx.textBaseline = "alphabetic";
    const m = ctx.measureText(text);
    const asc = m.fontBoundingBoxAscent || fs * 0.9;
    const sx = m.width > 0 ? tr.width / m.width : 1;
    const splitX = ctx.measureText(text.slice(0, 4)).width * sx; // "SITE" | "BLITZ"
    ctx.setTransform(sx, 0, 0, 1, pad, 0);
    ctx.fillStyle = "#fff";
    ctx.fillText(text, 0, pad + asc);
    const data = ctx.getImageData(0, 0, c.width, c.height).data;
    const ox = tr.left - sr.left - pad;
    const oy = tr.top - sr.top - pad;
    const pts: number[] = [];
    for (let y = 0; y < c.height; y++)
      for (let x = 0; x < c.width; x++) if (data[(y * c.width + x) * 4 + 3] > 128) pts.push(x, y);
    const n = pts.length / 2;
    box.x = tr.left - sr.left;
    box.y = tr.top - sr.top;
    box.w = tr.width;
    box.h = tr.height;
    if (!n) return false;
    const r = mulberry(11);
    for (let i = 0; i < N; i++) {
      const k = Math.floor(r() * n) * 2;
      aA[i * 2] = ox + pts[k] + r() - 0.5;
      aA[i * 2 + 1] = oy + pts[k + 1] + r() - 0.5;
      aKind[i] = pts[k] - pad >= splitX ? 1 : 0;
    }
    sizeA = Math.min(3.2, Math.max(1.3, Math.sqrt(n / N) * 1.5));
    return true;
  };

  /* B: one cell of the phone screen per particle, coloured from the real capture */
  const samplePhone = (sr: DOMRect) => {
    const pr = shot.getBoundingClientRect();
    const w = pr.width;
    const h = pr.height;
    const cols = Math.max(8, Math.round(Math.sqrt((N * w) / h)));
    const rows = Math.ceil(N / cols);
    const c = document.createElement("canvas");
    c.width = cols;
    c.height = rows;
    const ctx = c.getContext("2d", { willReadFrequently: true })!;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(shot, 0, 0, cols, rows);
    const data = ctx.getImageData(0, 0, cols, rows).data;
    const cw = w / cols;
    const ch = h / rows;
    // a shuffled cell order sends neighbours on different paths, so the cloud swirls instead of sliding
    const order = new Uint32Array(cols * rows);
    for (let i = 0; i < order.length; i++) order[i] = i;
    const r = mulberry(23);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(r() * (i + 1));
      const t = order[i];
      order[i] = order[j];
      order[j] = t;
    }
    for (let i = 0; i < N; i++) {
      const cell = order[i % order.length];
      const cx = cell % cols;
      const cy = Math.floor(cell / cols);
      aB[i * 2] = pr.left - sr.left + (cx + 0.5) * cw;
      aB[i * 2 + 1] = pr.top - sr.top + (cy + 0.5) * ch;
      aCol[i * 3] = data[cell * 4] / 255;
      aCol[i * 3 + 1] = data[cell * 4 + 1] / 255;
      aCol[i * 3 + 2] = data[cell * 4 + 2] / 255;
    }
    sizeB = Math.max(cw, ch) * 1.3;
  };

  const upload = (b: WebGLBuffer, data: Float32Array) => {
    gl.bindBuffer(gl.ARRAY_BUFFER, b);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  };

  // yields to the browser between the heavy steps of the first build, so none of them is a long task
  const nextTask = () => new Promise<void>((r) => setTimeout(r, 0));
  const layout = async (pause = false) => {
    const sr = stage.getBoundingClientRect();
    W = Math.max(1, sr.width);
    H = Math.max(1, sr.height);
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    if (pause) await nextTask();
    if (!sampleMark(sr)) return false;
    if (pause) await nextTask();
    samplePhone(sr);
    if (pause) await nextTask();
    upload(bA, aA);
    upload(bB, aB);
    upload(bCol, aCol);
    upload(bKind, aKind);
    off.fill(0);
    vel.fill(0);
    upload(bOff, off);
    return true;
  };
  await nextTask();
  if (!(await layout(true))) return null;

  /* pointer and finger */
  let mx = -1e5;
  let my = -1e5;
  let speed = 0;
  let lastMove = -1e5;
  let tiltX = 0;
  let tiltY = 0;
  let tx = 0;
  let ty = 0;
  let simOn = false;
  const setPointer = (cx: number, cy: number) => {
    const sr = stage.getBoundingClientRect();
    const x = cx - sr.left;
    const y = cy - sr.top;
    if (mx > -1e4) speed = Math.min(60, Math.hypot(x - mx, y - my));
    mx = x;
    my = y;
    lastMove = performance.now();
    // The tilt is an angle, so its target must stay within -1..1. The listeners are on window and the stage is
    // sticky: a pointer moved while the hero is scrolled far away sits thousands of pixels below the stage's top,
    // and the unclamped target once rotated the wordmark past 90 degrees (upside down after scrolling back up).
    // A pointer off the stage aims for a level wordmark instead.
    const over = x >= 0 && x <= sr.width && y >= 0 && y <= sr.height;
    tx = over ? Math.min(1, Math.max(-1, (x / W) * 2 - 1)) : 0;
    ty = over ? Math.min(1, Math.max(-1, (y / H) * 2 - 1)) : 0;
    simOn = true;
  };
  const onPointer = (e: PointerEvent) => setPointer(e.clientX, e.clientY);
  const onTouch = (e: TouchEvent) => {
    const t = e.touches[0];
    if (t) setPointer(t.clientX, t.clientY);
  };
  const onEnd = () => {
    mx = my = -1e5;
    // a lifted finger (mostly a scroll gesture on phones) or a mouse that left the window levels the wordmark again
    tx = ty = 0;
  };
  window.addEventListener("pointermove", onPointer, { passive: true });
  window.addEventListener("touchstart", onTouch, { passive: true });
  window.addEventListener("touchmove", onTouch, { passive: true });
  window.addEventListener("touchend", onEnd, { passive: true });
  document.addEventListener("mouseleave", onEnd);

  let lost = false;
  const onLost = (e: Event) => {
    e.preventDefault();
    lost = true;
    o.onLost();
  };
  canvas.addEventListener("webglcontextlost", onLost);

  const R = W < 768 ? 70 : 120;
  const start = performance.now();
  let breathed = false;
  let lastRaw = -1;
  let hidden = false;

  const sweeping = (now: number, morph: number) =>
    now - lastMove > 3000 && morph < 0.02 && (now - start) % 6000 < 2600;

  const simulate = (now: number, morph: number) => {
    // an idle hero is swept by a slow invisible pointer every 6 s, so it stays alive on phones too
    let px = mx;
    let py = my;
    let push = 2 + speed * 0.12;
    if (sweeping(now, morph)) {
      const ph = ((now - start) % 6000) / 2600;
      px = box.x - 80 + ph * (box.w + 160);
      py = box.y + box.h * (0.5 + Math.sin(ph * Math.PI * 2) * 0.22);
      push = 1.1;
    }
    speed *= 0.9;
    const R2 = R * R;
    let energy = 0;
    for (let i = 0; i < N; i++) {
      const j = i * 2;
      const t = Math.min(1, Math.max(0, (morph - delay[i]) / 0.65));
      const e = t * t * (3 - 2 * t);
      const bx = aA[j] + (aB[j] - aA[j]) * e + off[j];
      const by = aA[j + 1] + (aB[j + 1] - aA[j + 1]) * e + off[j + 1];
      const dx = bx - px;
      const dy = by - py;
      const d2 = dx * dx + dy * dy;
      let vx = vel[j];
      let vy = vel[j + 1];
      if (d2 < R2) {
        const d = Math.sqrt(d2) + 0.001;
        const f = (1 - d / R) * (1 - d / R) * push;
        vx += (dx / d) * f;
        vy += (dy / d) * f;
      }
      vx = (vx - off[j] * 0.055) * 0.87;
      vy = (vy - off[j + 1] * 0.055) * 0.87;
      off[j] += vx;
      off[j + 1] += vy;
      vel[j] = vx;
      vel[j + 1] = vy;
      energy += Math.abs(vx) + Math.abs(vy) + Math.abs(off[j]) * 0.05;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, bOff);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, off);
    if (energy < N * 0.002 && now - lastMove > 400) {
      // settled: stop simulating until the pointer moves again
      off.fill(0);
      vel.fill(0);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, off);
      simOn = false;
    }
  };

  return {
    count: N,
    frame(now, raw) {
      if (lost) return;
      // morph runs from 10% to 72% of the hero's scroll; the canvas fades once the real capture is on top
      const morph = Math.min(1, Math.max(0, (raw - 0.1) / 0.62));
      const alpha = 1 - smooth(0.88, 0.97, raw);
      if (alpha <= 0) {
        if (!hidden) {
          gl.viewport(0, 0, canvas.width, canvas.height);
          gl.clearColor(0, 0, 0, 0);
          gl.clear(gl.COLOR_BUFFER_BIT);
          hidden = true;
        }
        lastRaw = raw;
        return;
      }
      hidden = false;
      if (!breathed && now - start > 450) {
        // the opening breath: one soft outward push from the wordmark's centre, then the springs pull it back
        breathed = true;
        const cx = box.x + box.w / 2;
        const cy = box.y + box.h / 2;
        const r = mulberry(5);
        for (let i = 0; i < N; i++) {
          const dx = aA[i * 2] - cx;
          const dy = aA[i * 2 + 1] - cy;
          const d = Math.hypot(dx, dy) + 1;
          const k = (1.5 + r() * 4) * (W < 768 ? 0.6 : 1);
          vel[i * 2] += (dx / d) * k;
          vel[i * 2 + 1] += (dy / d) * k * 1.6;
        }
        simOn = true;
      }
      if (simOn || raw !== lastRaw || sweeping(now, morph)) simulate(now, morph);
      lastRaw = raw;
      // the tilt follows the pointer while the wordmark holds and flattens as the phone forms
      const flat = 1 - smooth(0.0, 0.6, morph);
      tiltX += (tx * flat - tiltX) * 0.06;
      tiltY += (ty * flat - tiltY) * 0.06;

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(u.res, W, H);
      gl.uniform1f(u.p, morph);
      gl.uniform1f(u.t, (now - start) / 1000);
      gl.uniform1f(u.dpr, dpr);
      gl.uniform1f(u.sizeA, sizeA);
      gl.uniform1f(u.sizeB, sizeB);
      gl.uniform1f(u.swirl, 380 * Math.min(1, W / 1200));
      gl.uniform2f(u.tilt, tiltX, tiltY);
      gl.uniform1f(u.alpha, alpha);
      gl.uniform1f(u.square, smooth(0.82, 1, morph));
      gl.drawArrays(gl.POINTS, 0, N);
    },
    resize() {
      if (!lost) void layout();
    },
    dispose() {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onEnd);
      document.removeEventListener("mouseleave", onEnd);
      canvas.removeEventListener("webglcontextlost", onLost);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    },
  };
}
