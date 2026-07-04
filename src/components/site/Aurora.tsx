"use client";

import { useEffect, useRef } from "react";

/** Lightweight animated aurora backdrop — drifting radial gradients on canvas. */
export function Aurora({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, raf = 0, t = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const blobs = [
      { c: [204, 255, 0], r: 0.5, sx: 0.22, sy: 0.3, ax: 0.18, ay: 0.12, sp: 0.00021, o: 0.1 },
      { c: [124, 92, 255], r: 0.55, sx: 0.78, sy: 0.25, ax: 0.15, ay: 0.18, sp: 0.00017, o: 0.12 },
      { c: [0, 180, 255], r: 0.45, sx: 0.55, sy: 0.75, ax: 0.2, ay: 0.1, sp: 0.00013, o: 0.08 },
    ];

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      t = time;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (const b of blobs) {
        const cx = (b.sx + Math.sin(t * b.sp) * b.ax) * w;
        const cy = (b.sy + Math.cos(t * b.sp * 1.3) * b.ay) * h;
        const rad = b.r * Math.max(w, h) * 0.6;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        g.addColorStop(0, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},${b.o})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }
      if (!reduced) raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none ${className}`} />;
}
