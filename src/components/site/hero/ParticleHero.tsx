"use client";

import { useEffect, useRef } from "react";
import { isLowPowerDevice } from "../Deferred";
import type { HeroEngine } from "./particles";

/** Drives the v4 hero (spec row 4). It always writes the hero's scroll progress to `--p` on the section, which the
 *  CSS uses to fade the words out and the phone in, so the scene works without WebGL too. After the browser is idle
 *  it loads the particle engine (a separate chunk) unless motion is reduced or the device is low-power; the static
 *  wordmark then hands over to the canvas. Nothing runs while the hero is off-screen or the tab is hidden. */
export function ParticleHero({ desktopCount = 20000, phoneCount = 6000 }: { desktopCount?: number; phoneCount?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const section = canvas.closest<HTMLElement>("[data-hero]");
    const stage = canvas.parentElement;
    const mark = section?.querySelector<HTMLElement>("[data-hero-mark]");
    const shot = section?.querySelector<HTMLImageElement>("[data-hero-shot]");
    if (!section || !stage || !mark || !shot) return;
    const force = window.location.search.includes("motion=force");
    if (!force && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // The static layout (reduced motion, short landscape screens) has no sticky stage: nothing to drive.
    if (getComputedStyle(stage).position !== "sticky") return;

    let engine: HeroEngine | null = null;
    let raf = 0;
    let inView = true;
    let last = -1;
    let disposed = false;

    const loop = (now: number) => {
      raf = 0;
      if (!inView || document.hidden) return;
      const r = section.getBoundingClientRect();
      const total = r.height - stage.clientHeight;
      const raw = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      if (Math.abs(raw - last) > 0.0004) {
        last = raw;
        section.style.setProperty("--p", raw.toFixed(4));
        section.classList.toggle("a-off", raw > 0.14);
        section.classList.toggle("b-on", raw > 0.76);
      }
      engine?.frame(now, raw);
      raf = requestAnimationFrame(loop);
    };
    const kick = () => {
      if (!raf && inView && !document.hidden) raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      kick();
    });
    io.observe(section);
    document.addEventListener("visibilitychange", kick);
    kick();

    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    let lastW = window.innerWidth;
    let lastH = window.innerHeight;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        // phones resize when the address bar slides; only a real change of layout rebuilds the cloud
        if (window.innerWidth === lastW && Math.abs(window.innerHeight - lastH) < 120) return;
        lastW = window.innerWidth;
        lastH = window.innerHeight;
        engine?.resize();
      }, 200);
    };
    window.addEventListener("resize", onResize);

    const fallBack = () => {
      engine?.dispose();
      engine = null;
      section.classList.remove("is-gl", "is-drawn");
    };

    let idle: number | undefined;
    if (force || !isLowPowerDevice()) {
      const boot = () => {
        import("./particles")
          .then(async (m) => {
            if (disposed) return;
            section.classList.add("is-gl"); // CSS takes the motion off the wordmark and the phone before we measure
            const count = window.innerWidth >= 768 ? desktopCount : phoneCount;
            const e = await m.createHeroEngine({ canvas, stage, mark, shot, count, onLost: fallBack });
            if (disposed || !e) {
              e?.dispose();
              section.classList.remove("is-gl");
              return;
            }
            engine = e;
            canvas.dataset.count = String(e.count);
            last = -1;
            kick();
            requestAnimationFrame(() => section.classList.add("is-drawn"));
          })
          .catch(fallBack);
      };
      idle =
        "requestIdleCallback" in window
          ? window.requestIdleCallback(boot, { timeout: 1500 })
          : (setTimeout(boot, 400) as unknown as number);
    }

    return () => {
      disposed = true;
      if (idle !== undefined && "cancelIdleCallback" in window) window.cancelIdleCallback(idle);
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("visibilitychange", kick);
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      engine?.dispose();
      section.classList.remove("is-gl", "is-drawn", "a-off", "b-on");
    };
  }, [desktopCount, phoneCount]);

  return <canvas ref={ref} aria-hidden className="hero-canvas" />;
}
