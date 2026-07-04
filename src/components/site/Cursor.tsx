"use client";

import { useEffect, useRef } from "react";

/** Custom cursor: instant dot + eased ring. Fine pointers only. */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    document.body.classList.add("cursor-active");
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let x = -100, y = -100, rx = -100, ry = -100;
    let hovering = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target as HTMLElement;
      hovering = Boolean(t.closest?.("a, button, [data-cursor], input, textarea, select, label"));
    };

    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      dot.style.transform = `translate(${x - 3}px, ${y - 3}px)`;
      const s = hovering ? 2.2 : 1;
      ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px) scale(${s})`;
      ring.style.borderColor = hovering ? "rgba(204,255,0,0.9)" : "rgba(245,245,240,0.35)";
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      document.body.classList.remove("cursor-active");
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[99] hidden h-1.5 w-1.5 rounded-full bg-volt md:block"
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[99] hidden h-9 w-9 rounded-full border transition-[border-color] duration-200 md:block"
        style={{ borderColor: "rgba(245,245,240,0.35)" }}
      />
    </>
  );
}
