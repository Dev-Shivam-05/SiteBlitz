"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/** Cinematic entrance: brand chars slam in, counter charges, dual curtains split.
 *  Runs once per browser session; skipped for reduced-motion users. */
export function Preloader() {
  const [mounted, setMounted] = useState<boolean | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const force = window.location.search.includes("motion=force");
    if (
      (!force && sessionStorage.getItem("sb_seen")) ||
      (!force && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    ) {
      setMounted(false);
      return;
    }
    sessionStorage.setItem("sb_seen", "1");
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !rootRef.current) return;
    document.documentElement.style.overflow = "hidden";
    const root = rootRef.current;
    const counter = { v: 0 };

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

    return () => {
      ctx.revert();
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
            <span className="font-accent ml-3 text-base italic text-faint">charging the blitz</span>
          </p>
        </div>
      </div>
    </div>
  );
}
