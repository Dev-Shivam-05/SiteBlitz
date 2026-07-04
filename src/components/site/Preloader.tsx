"use client";

import { useEffect, useState } from "react";

/** Cinematic entrance: brand counter 0→100, then curtain lift.
 *  Shows once per browser session; skipped for reduced-motion users. */
export function Preloader() {
  const [state, setState] = useState<"idle" | "counting" | "exiting" | "done">("idle");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (
      sessionStorage.getItem("sb_seen") ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setState("done");
      return;
    }
    sessionStorage.setItem("sb_seen", "1");
    setState("counting");
    document.documentElement.style.overflow = "hidden";

    const start = performance.now();
    const DURATION = 1500;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / DURATION, 1);
      // ease-out expo for a "charging up" feel
      const eased = 1 - Math.pow(2, -10 * p);
      setCount(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setState("exiting");
        setTimeout(() => {
          setState("done");
          document.documentElement.style.overflow = "";
        }, 950);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (state === "done" || state === "idle") return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void ${
        state === "exiting" ? "preloader-exit" : ""
      }`}
    >
      <div className="flex items-baseline gap-3">
        <span className="font-display text-2xl font-bold tracking-tight text-ink">
          SITE<span className="text-volt">BLITZ</span>
        </span>
      </div>
      <div className="mt-8 h-px w-56 overflow-hidden bg-line">
        <div
          className="h-full bg-volt transition-[width] duration-100 ease-out"
          style={{ width: `${count}%` }}
        />
      </div>
      <div className="mt-4 font-display text-6xl font-bold tabular-nums text-ink/90">
        {count}
        <span className="text-volt">%</span>
      </div>
      <p className="font-accent mt-3 text-lg italic text-muted">charging the blitz…</p>
    </div>
  );
}
