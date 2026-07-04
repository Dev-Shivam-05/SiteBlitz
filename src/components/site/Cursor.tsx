"use client";

import { useEffect, useRef } from "react";

/** Custom cursor: blend-mode dot + eased ring that stretches with velocity
 *  and shows contextual labels from [data-cursor-label]. Fine pointers only. */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const force = window.location.search.includes("motion=force");
    const reduced = !force && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    document.body.classList.add("cursor-active");
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;
    let x = -100, y = -100, rx = -100, ry = -100, px = -100, py = -100;
    let hovering = false;
    let labelText = "";
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target as HTMLElement;
      const labelled = t.closest?.("[data-cursor-label]") as HTMLElement | null;
      labelText = labelled?.dataset.cursorLabel || "";
      hovering = Boolean(
        labelled || t.closest?.("a, button, [data-cursor], input, textarea, select, label")
      );
    };

    const loop = () => {
      rx += (x - rx) * 0.14;
      ry += (y - ry) * 0.14;
      const vx = rx - px, vy = ry - py;
      px = rx; py = ry;
      const speed = Math.min(Math.hypot(vx, vy), 30);
      const angle = (Math.atan2(vy, vx) * 180) / Math.PI;
      const stretch = 1 + speed * 0.012;

      dot.style.transform = `translate(${x - 3}px, ${y - 3}px)`;

      const hasLabel = Boolean(labelText);
      const scale = hasLabel ? 3.4 : hovering ? 2 : 1;
      ring.style.transform =
        `translate(${rx - 20}px, ${ry - 20}px) rotate(${angle}deg) ` +
        `scale(${scale * stretch}, ${scale * (2 - stretch > 0.6 ? 2 - stretch : 0.6)}) ` +
        `rotate(${-angle}deg)`;
      ring.style.background = hasLabel ? "rgba(204,255,0,0.95)" : "transparent";
      ring.style.borderColor = hasLabel
        ? "transparent"
        : hovering
          ? "rgba(204,255,0,0.9)"
          : "rgba(245,245,240,0.35)";
      dot.style.opacity = hasLabel ? "0" : "1";

      label.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      label.style.opacity = hasLabel ? "1" : "0";
      if (hasLabel && label.textContent !== labelText) label.textContent = labelText;

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
        className="pointer-events-none fixed left-0 top-0 z-[99] hidden h-1.5 w-1.5 rounded-full bg-volt mix-blend-difference md:block"
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[98] hidden h-10 w-10 rounded-full border md:block"
        style={{ borderColor: "rgba(245,245,240,0.35)" }}
      />
      <div
        ref={labelRef}
        aria-hidden
        className="font-display pointer-events-none fixed left-0 top-0 z-[99] hidden text-[10px] font-bold uppercase tracking-widest text-void opacity-0 md:block"
      />
    </>
  );
}
