"use client";

import { useEffect, useRef, useState } from "react";

/** Cinematic entrance: brand chars slam in, counter charges, dual curtains split.
 *  Runs once per browser session; skipped for reduced-motion users. */
export function Preloader() {
  const [mounted, setMounted] = useState<boolean | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const phraseRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const force = window.location.search.includes("motion=force");
    let seen = false;
    try {
      seen = Boolean(sessionStorage.getItem("sb_seen"));
      sessionStorage.setItem("sb_seen", "1");
    } catch {
      // storage blocked (private mode/policies) — treat as already seen so
      // the entrance can never trap the visitor
      seen = true;
    }
    if (
      (!force && seen) ||
      (!force && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    ) {
      setMounted(false);
      return;
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !rootRef.current) return;
    document.documentElement.style.overflow = "hidden";
    const root = rootRef.current;
    const counter = { v: 0 };
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    // If the gsap chunk fails to load (flaky network, blocked CDN), the
    // full-screen preloader must never trap the page — dismiss it hard.
    const bail = () => {
      document.documentElement.style.overflow = "";
      if (rootRef.current) rootRef.current.style.display = "none";
    };
    const failSafe = setTimeout(bail, 6000);

    // gsap loads from its own chunk — the preloader shell paints instantly
    // and the choreography starts the moment the library lands (~1 frame).
    import("gsap").catch(() => {
      bail();
      return null;
    }).then((mod) => {
      if (!mod) return;
      const gsap = mod.default;
      clearTimeout(failSafe);
      if (cancelled || !rootRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.documentElement.style.overflow = "";
          root.style.display = "none";
        },
      });

      tl.from("[data-pre-char]", {
        yPercent: 120,
        rotate: 6,
        duration: 0.7,
        ease: "power4.out",
        stagger: 0.045,
      })
        .to(
          counter,
          {
            v: 100,
            duration: 1.4,
            ease: "expo.inOut",
            onUpdate: () => {
              if (countRef.current)
                countRef.current.textContent = String(Math.round(counter.v));
              if (barRef.current)
                barRef.current.style.width = `${counter.v}%`;
              if (phraseRef.current) {
                const phrases = ["warming shaders", "splitting letters", "charging the blitz"];
                const next = phrases[Math.min(Math.floor(counter.v / 34), 2)];
                if (phraseRef.current.textContent !== next)
                  phraseRef.current.textContent = next;
              }
            },
          },
          "-=0.3"
        )
        .to("[data-pre-fade]", { opacity: 0, y: -18, duration: 0.35, ease: "power2.in" })
        .to("[data-pre-panel-top]", {
          yPercent: -101,
          duration: 0.9,
          ease: "power4.inOut",
        }, "split")
        .to("[data-pre-panel-bottom]", {
          yPercent: 101,
          duration: 0.9,
          ease: "power4.inOut",
        }, "split+=0.06");
    }, root);

      cleanup = () => ctx.revert();
    });

    return () => {
      cancelled = true;
      clearTimeout(failSafe);
      cleanup?.();
      document.documentElement.style.overflow = "";
    };
  }, [mounted]);

  if (!mounted) return null;

  const brand = "SITEBLITZ";

  return (
    <div ref={rootRef} aria-hidden className="fixed inset-0 z-[100]">
      <div data-pre-panel-top className="absolute inset-x-0 top-0 h-1/2 bg-void">
        <div className="absolute inset-x-0 bottom-0 flex translate-y-1/2 flex-col items-center">
          <div data-pre-fade className="flex overflow-hidden">
            {brand.split("").map((c, i) => (
              <span
                key={i}
                data-pre-char
                className={`font-display inline-block text-5xl font-bold tracking-tight md:text-7xl ${
                  i >= 4 ? "text-volt" : "text-ink"
                }`}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div data-pre-panel-bottom className="absolute inset-x-0 bottom-0 h-1/2 bg-void">
        <div data-pre-fade className="absolute inset-x-0 top-0 flex -translate-y-0 flex-col items-center pt-16">
          <div className="h-px w-64 overflow-hidden bg-line md:w-96">
            <div ref={barRef} className="h-full bg-volt" style={{ width: "0%" }} />
          </div>
          <p className="mt-5 font-display text-sm font-bold tabular-nums text-muted">
            <span ref={countRef}>0</span>
            <span className="text-volt">%</span>
            <span ref={phraseRef} className="font-accent ml-3 text-base italic text-faint">warming shaders</span>
          </p>
        </div>
      </div>
    </div>
  );
}
