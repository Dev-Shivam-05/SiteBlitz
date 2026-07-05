"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/** Experience HUD: scroll progress rail + current chapter index (01 / 06). */
export function ScrollHUD() {
  const fillRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const totalRef = useRef<HTMLSpanElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
        !window.location.search.includes("motion=force")) return;

    const chapters = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
    if (rootRef.current) rootRef.current.style.opacity = chapters.length ? "1" : "0";
    if (totalRef.current)
      totalRef.current.textContent = String(chapters.length).padStart(2, "0");

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? window.scrollY / max : 0;
        if (fillRef.current) fillRef.current.style.transform = `scaleY(${p})`;
        let idx = 0;
        for (let i = 0; i < chapters.length; i++) {
          if (chapters[i].getBoundingClientRect().top <= window.innerHeight * 0.5) idx = i;
        }
        if (numRef.current)
          numRef.current.textContent = String(idx + 1).padStart(2, "0");
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 opacity-0 transition-opacity duration-500 lg:flex"
    >
      <span ref={numRef} className="font-display text-[10px] font-bold tabular-nums text-volt">
        01
      </span>
      <div className="h-28 w-px overflow-hidden rounded bg-line">
        <div
          ref={fillRef}
          className="h-full w-full origin-top bg-volt"
          style={{ transform: "scaleY(0)" }}
        />
      </div>
      <span ref={totalRef} className="font-display text-[10px] font-bold tabular-nums text-faint">
        06
      </span>
    </div>
  );
}
