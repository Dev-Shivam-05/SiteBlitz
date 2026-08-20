"use client";

import { useEffect, useRef } from "react";
import { isLowPowerDevice } from "@/components/site/Deferred";

/** Custom GLSL energy field: domain-warped noise in brand colors that bends
 *  toward the cursor and pulses on click. Raw WebGL — no three.js payload. */

const VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uClick;

float hash(vec2 x) {
  return fract(sin(dot(x, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

// Octave count is a direct GPU cost multiplier, so each use gets only what it
// needs: the domain-warp inputs are low-frequency by nature and cannot show
// fine detail, while the final lookup is what produces the hairline filaments.
float fbm2(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 2; i++) { v += a * noise(p); p = rot * p * 2.05; a *= 0.5; }
  return v;
}

float fbm3(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 3; i++) { v += a * noise(p); p = rot * p * 2.05; a *= 0.5; }
  return v;
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = rot * p * 2.05; a *= 0.5; }
  return v;
}

/** Primary energy field: cheap warp, detailed final lookup. */
float field(vec2 p, float t, float dir, vec2 pull) {
  vec2 q = vec2(fbm3(p + t * dir), fbm3(p + vec2(5.2, 1.3) - t * dir));
  vec2 r = vec2(fbm3(p + 3.0 * q + vec2(1.7, 9.2) + t * 1.4 * dir),
                fbm3(p + 3.0 * q + vec2(8.3, 2.8) - t * dir));
  return fbm(p + 3.5 * r + pull * 3.0);
}

/** Secondary undercurrent — soft and out of focus by design, so it runs on the
 *  cheapest octaves available. */
float fieldSoft(vec2 p, float t, float s, float dir, vec2 pull) {
  vec2 q = vec2(fbm2(p * s + t * dir), fbm2(p * s + vec2(5.2, 1.3) - t * dir));
  vec2 r = vec2(fbm2(p * s + 3.0 * q + vec2(1.7, 9.2) + t * 1.4 * dir),
                fbm2(p * s + 3.0 * q + vec2(8.3, 2.8) - t * dir));
  return fbm3(p * s + 3.5 * r + pull * 3.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  float aspect = uRes.x / uRes.y;
  vec2 p = uv * vec2(aspect, 1.0) * 2.2;
  float t = uTime * 0.085;

  vec2 m = uMouse * vec2(aspect, 1.0) * 2.2;
  float md = length(p - m);
  vec2 pull = normalize(p - m + 0.0001) * (-0.35) * exp(-md * 1.6);

  // The composition has ONE light source, off to the right. Everything on the
  // left falls to void so the headline always sits on near-black — the text
  // scrim in CSS is a safety net, not the primary contrast mechanism.
  float side = smoothstep(0.02, 0.72, uv.x);
  vec2 focal = vec2(0.76, 0.52);
  float fd = length((uv - focal) * vec2(aspect, 1.0));
  float bloom = exp(-fd * 1.55);

  float f = field(p, t, 1.0, pull);                                     // primary
  float g = fieldSoft(p + vec2(11.3, 4.1), t, 0.45, -0.6, pull * 0.5);  // counter-layer

  // base: near-black
  vec3 col = vec3(0.027, 0.027, 0.035);

  // deep violet undercurrent — keeps the field from reading as only green
  col = mix(col, vec3(0.20, 0.13, 0.48) * 0.55,
            smoothstep(0.25, 0.75, g) * 0.55 * (0.25 + 0.75 * side));

  // volt energy veins
  float vein = smoothstep(0.42, 0.52, f) - smoothstep(0.52, 0.72, f);
  col += vec3(0.8, 1.0, 0.0) * vein * 0.26 * side * (0.35 + 0.9 * bloom);

  // hairline volt filaments — the narrow band is what gives the plasma edge
  float fil = smoothstep(0.4965, 0.5035, f) * (1.0 - smoothstep(0.5035, 0.515, f));
  col += vec3(0.85, 1.0, 0.15) * fil * 0.55 * side * (0.4 + 1.1 * bloom);

  // secondary layer filaments, dimmer and slower — parallax depth
  float fil2 = smoothstep(0.492, 0.5, g) * (1.0 - smoothstep(0.5, 0.516, g));
  col += vec3(0.55, 0.85, 0.25) * fil2 * 0.20 * side * bloom;

  // the light source itself
  col += vec3(0.70, 0.92, 0.10) * bloom * 0.16 * side;

  // cursor glow well
  col += vec3(0.75, 0.95, 0.05) * exp(-md * 2.6) * 0.16 * side;

  // click shockwave
  if (uClick < 3.0) {
    float ring = abs(md - uClick * 1.15);
    col += vec3(0.8, 1.0, 0.1) * exp(-ring * 14.0) * exp(-uClick * 1.4) * 0.7;
  }

  // vignette
  float vig = smoothstep(1.35, 0.35, length(uv - 0.5));
  col *= mix(0.68, 1.0, vig);

  gl_FragColor = vec4(col, 1.0);
}
`;

export function WebGLHero({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const force = window.location.search.includes("motion=force");
    const reduced =
      !force && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Perf gate: no GPU work on phones or low-power devices — the CSS
    // gradient fallback simply stays. QA override: ?motion=force.
    if (!force && (window.matchMedia("(max-width: 767px)").matches || isLowPowerDevice())) {
      return;
    }

    let disposed = false;
    let teardown: (() => void) | undefined;
    const boot = () => {
    if (disposed) return;
    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      powerPreference: "low-power",
    });
    if (!gl) return; // graceful: CSS gradient fallback stays visible

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.warn("shader:", gl.getShaderInfoLog(s));
        return null;
      }
      return s;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const uClick = gl.getUniformLocation(prog, "uClick");

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    // Render scale is quadratic in fragment cost. 0.82 keeps the filaments
    // readable while holding the whole shader near the pre-v4 GPU budget.
    const scale = 0.82;
    let w = 0, h = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width * dpr * scale));
      h = Math.max(1, Math.floor(rect.height * dpr * scale));
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    let mx = 0.5, my = 0.5, tx = 0.5, ty = 0.5;
    let clickAt = -10;
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      tx = (e.clientX - rect.left) / rect.width;
      ty = 1 - (e.clientY - rect.top) / rect.height;
    };
    const onClick = () => (clickAt = performance.now());
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onClick, { passive: true });

    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    const start = performance.now();
    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) return;
      const now = performance.now();
      mx += (tx - mx) * 0.06;
      my += (ty - my) * 0.06;
      gl.uniform2f(uRes, w, h);
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uMouse, mx, my);
      gl.uniform1f(uClick, (now - clickAt) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    if (reduced) {
      // single styled frame, no loop
      gl.uniform2f(uRes, w, h);
      gl.uniform1f(uTime, 12.0);
      gl.uniform2f(uMouse, 0.5, 0.5);
      gl.uniform1f(uClick, 10.0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    } else {
      raf = requestAnimationFrame(frame);
    }

    teardown = () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onClick);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
    };

    // Shader compile + first draw happen after the browser goes idle,
    // never in the critical path to first paint.
    const idleId =
      "requestIdleCallback" in window
        ? window.requestIdleCallback(boot, { timeout: 2500 })
        : (setTimeout(boot, 400) as unknown as number);

    return () => {
      disposed = true;
      if ("cancelIdleCallback" in window) window.cancelIdleCallback(idleId);
      else clearTimeout(idleId);
      teardown?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none ${className}`}
      style={{
        background:
          "radial-gradient(80% 60% at 70% 20%, rgba(124,92,255,0.10), transparent), #0B0B0E",
      }}
    />
  );
}
