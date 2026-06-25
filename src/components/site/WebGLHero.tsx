"use client";

import { useEffect, useRef } from "react";

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

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = rot * p * 2.05;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  vec2 p = uv * vec2(uRes.x / uRes.y, 1.0) * 2.2;
  float t = uTime * 0.06;

  vec2 m = uMouse * vec2(uRes.x / uRes.y, 1.0) * 2.2;
  float md = length(p - m);
  vec2 pull = normalize(p - m + 0.0001) * (-0.35) * exp(-md * 1.6);

  vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p + 3.0 * q + vec2(1.7, 9.2) + t * 1.4),
                fbm(p + 3.0 * q + vec2(8.3, 2.8) - t));
  float f = fbm(p + 3.5 * r + pull * 3.0);

  // base: near-black
  vec3 col = vec3(0.043, 0.043, 0.055);
  // violet undercurrent
  col = mix(col, vec3(0.18, 0.12, 0.42) * 0.55, smoothstep(0.25, 0.75, f) * 0.5);
  // volt energy veins
  float vein = smoothstep(0.42, 0.52, f) - smoothstep(0.52, 0.72, f);
  col += vec3(0.8, 1.0, 0.0) * vein * 0.22;
  // bright volt filaments
  float fil = smoothstep(0.495, 0.505, f);
  col += vec3(0.8, 1.0, 0.0) * fil * (1.0 - smoothstep(0.505, 0.53, f)) * 0.32;

  // cursor glow well
  col += vec3(0.75, 0.95, 0.05) * exp(-md * 2.6) * 0.14;

  // click shockwave
  if (uClick < 3.0) {
    float ring = abs(md - uClick * 1.15);
    col += vec3(0.8, 1.0, 0.1) * exp(-ring * 14.0) * exp(-uClick * 1.4) * 0.7;
  }

  // vignette
  float vig = smoothstep(1.35, 0.35, length(uv - 0.5));
  col *= mix(0.75, 1.0, vig);

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
    const scale = 0.72; // render below native res — indistinguishable for this content
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

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onClick);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
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
