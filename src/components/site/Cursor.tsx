"use client";

import { useEffect, useRef } from "react";

const LINKISH = "a, button, summary, label, select, [role='button']";
const TEXTISH = "input, textarea, select, [contenteditable]";

/** Desktop cursor (spec v4 row 9): a volt dot that follows the pointer exactly and a ring that trails it.
 *  Over links and buttons the ring grows; over [data-cursor="view"|"drag"] it becomes a volt disc with the word.
 *  Mounted by MotionProvider only on fine pointers without reduced motion; text fields keep the native caret. */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const r = ring.current!;
    const d = dot.current!;
    const l = label.current!;
    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;
    let shown = false;

    const tick = () => {
      // the ring trails the dot (lerp 0.18 a frame); stop the loop once it has caught up
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      // Position through `translate`, not `transform`: the browser applies `scale` (the click pulse) before
      // `transform`, so with a transform the pulse scaled the ring's distance from the viewport corner and
      // pulled it ~100 px toward the top-left on every click. `translate` is applied after `scale`.
      r.style.translate = `${rx}px ${ry}px`;
      raf = Math.abs(x - rx) + Math.abs(y - ry) > 0.2 ? requestAnimationFrame(tick) : 0;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      d.style.translate = `${x}px ${y}px`;
      if (!shown) {
        shown = true;
        rx = x;
        ry = y;
        root.classList.add("cursor-on");
      }
      if (!raf) raf = requestAnimationFrame(tick);

      const t = e.target as Element | null;
      const zone = t?.closest<HTMLElement>("[data-cursor]");
      const word = zone?.dataset.cursor || "";
      r.classList.toggle("is-label", Boolean(word));
      l.textContent = word.toUpperCase();
      r.classList.toggle("is-text", !word && Boolean(t?.closest(TEXTISH)));
      r.classList.toggle("is-link", !word && Boolean(t?.closest(LINKISH)));
    };
    const onLeave = () => {
      shown = false;
      root.classList.remove("cursor-on");
    };
    const onDown = () => r.animate([{ scale: 1 }, { scale: 0.82 }, { scale: 1 }], { duration: 260, easing: "ease-out" });

    root.classList.add("cursor-active");
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("cursor-active", "cursor-on");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden>
        <span ref={label} />
      </div>
      <div ref={dot} className="cursor-dot" aria-hidden />
    </>
  );
}
