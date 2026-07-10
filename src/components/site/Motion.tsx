"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

function prefersReduced(): boolean {
  // ?motion=force lets QA verify the full experience on reduced-motion setups
  if (window.location.search.includes("motion=force")) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Lenis smooth scrolling wired into GSAP's ticker + ScrollTrigger. */
function useLenis() {
  useEffect(() => {
    if (prefersReduced()) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);
}

/** Declarative animation engine — scans [data-anim] and builds GSAP scenes.
 *
 *  data-anim values:
 *   chars       — SplitText chars rise in (on scroll or immediately with data-now)
 *   words       — SplitText words rise in
 *   fade-up     — simple fade+rise
 *   mask        — clip-path wipe reveal
 *   scale-in    — subtle zoom settle
 *   words-scrub — words tint from faint to ink as you scroll (manifesto)
 *   parallax    — translateY at data-speed (e.g. 0.2 / -0.15)
 *  modifiers: data-delay (s), data-stagger (s), data-now (animate on mount, not scroll)
 */
function useAnimEngine(pathname: string) {
  useEffect(() => {
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      // Yielding scheduler: above-the-fold (data-now) scenes build immediately;
      // everything else is spread across idle frames so no single long task
      // blocks the main thread (keeps Total Blocking Time low).
      const queue: (() => void)[] = [];
      const schedule = (fn: () => void) => queue.push(fn);
      const drain = () => {
        const start = performance.now();
        while (queue.length && performance.now() - start < 6) queue.shift()!();
        if (queue.length) {
          if ("requestIdleCallback" in window)
            window.requestIdleCallback(drain, { timeout: 400 });
          else setTimeout(drain, 16);
        } else {
          ScrollTrigger.refresh();
        }
      };

      const buildAnim = (el: HTMLElement) => {
        const type = el.dataset.anim!;
        const delay = parseFloat(el.dataset.delay || "0");
        const stagger = parseFloat(el.dataset.stagger || "0.03");
        const now = el.dataset.now !== undefined;
        const trig = now
          ? undefined
          : { trigger: el, start: "top 85%", once: true };

        if (type === "chars" || type === "words") {
          const split = new SplitText(el, {
            type: type === "chars" ? "chars,words" : "words",
            mask: type === "chars" ? "words" : "words",
          });
          const targets = type === "chars" ? split.chars : split.words;
          gsap.from(targets, {
            yPercent: 115,
            rotate: type === "chars" ? 4 : 2,
            opacity: type === "words" ? 0 : 1,
            duration: 0.9,
            ease: "power4.out",
            stagger,
            delay,
            scrollTrigger: trig,
          });
        } else if (type === "fade-up") {
          gsap.from(el, {
            y: 44,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            delay,
            scrollTrigger: trig,
          });
        } else if (type === "mask") {
          gsap.fromTo(
            el,
            { clipPath: "inset(0 100% 0 0)" },
            {
              clipPath: "inset(0 0% 0 0)",
              duration: 1.1,
              ease: "power4.inOut",
              delay,
              scrollTrigger: trig,
            }
          );
        } else if (type === "scale-in") {
          gsap.from(el, {
            scale: 0.92,
            y: 30,
            opacity: 0,
            duration: 1.1,
            ease: "power3.out",
            delay,
            scrollTrigger: trig,
          });
        } else if (type === "words-scrub") {
          const split = new SplitText(el, { type: "words" });
          gsap.fromTo(
            split.words,
            { opacity: 0.14 },
            {
              opacity: 1,
              stagger: 0.06,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top 78%",
                end: "bottom 45%",
                scrub: 0.6,
              },
            }
          );
        } else if (type === "parallax") {
          const speed = parseFloat(el.dataset.speed || "0.2");
          gsap.to(el, {
            yPercent: speed * 100,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement || el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      };

      const els = gsap.utils.toArray<HTMLElement>("[data-anim]");
      for (const el of els) {
        if (el.dataset.now !== undefined) buildAnim(el); // above the fold — now
        else schedule(() => buildAnim(el)); // deferred, yielded
      }

      schedule(() => {
      /* Hero: content zooms away and dims as you leave it (cinema hand-off) */
      const heroPin = document.querySelector<HTMLElement>("[data-hero-pin]");
      const heroContent = document.querySelector<HTMLElement>("[data-hero-content]");
      if (heroPin && heroContent) {
        gsap.to(heroContent, {
          scale: 0.92,
          yPercent: -6,
          opacity: 0.15,
          ease: "none",
          transformOrigin: "center bottom",
          scrollTrigger: {
            trigger: heroPin,
            start: "bottom bottom",
            end: "bottom 25%",
            scrub: 0.4,
          },
        });
      }

      /* Horizontal work gallery (desktop only; matchMedia re-evaluates on resize)
         + velocity skew so cards lean into fast scrolls */
      const hwrap = document.querySelector<HTMLElement>("[data-hscroll]");
      const htrack = document.querySelector<HTMLElement>("[data-hscroll-track]");
      if (hwrap && htrack) {
        const mm = gsap.matchMedia();
        mm.add("(min-width: 1024px)", () => {
          const getDist = () => Math.max(htrack.scrollWidth - window.innerWidth, 0);
          if (getDist() <= 0) return;
          const skewSet = gsap.quickTo(htrack, "skewX", { duration: 0.35, ease: "power2.out" });
          gsap.to(htrack, {
            x: () => -getDist(),
            ease: "none",
            scrollTrigger: {
              trigger: hwrap,
              start: "top top",
              end: () => `+=${getDist()}`,
              pin: true,
              scrub: 0.7,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                skewSet(gsap.utils.clamp(-6, 6, self.getVelocity() / -350));
              },
            },
          });
        });
      }

      /* Sticky card stack: each card pins, then compresses + dims under the next */
      const stacks = gsap.utils.toArray<HTMLElement>("[data-stack]");
      for (const stack of stacks) {
        const cards = Array.from(stack.querySelectorAll<HTMLElement>("[data-stack-item]"));
        cards.forEach((card, i) => {
          if (i === cards.length - 1) return;
          const nextCard = cards[i + 1];
          gsap.to(card, {
            scale: 0.9,
            opacity: 0.35,
            filter: "blur(3px)",
            ease: "none",
            transformOrigin: "center top",
            scrollTrigger: {
              trigger: nextCard,
              start: "top bottom",
              end: "top 12%",
              scrub: 0.4,
            },
          });
        });
      }

      /* Section background morph: main canvas tints as chapters change */
      const shifts = gsap.utils.toArray<HTMLElement>("[data-bgshift]");
      const mainEl = document.querySelector<HTMLElement>("main");
      if (mainEl && shifts.length) {
        for (const s of shifts) {
          const color = s.dataset.bgshift || "#0B0B0E";
          ScrollTrigger.create({
            trigger: s,
            start: "top 55%",
            end: "bottom 45%",
            onToggle: (self) => {
              if (self.isActive) {
                gsap.to(mainEl, { backgroundColor: color, duration: 0.8, ease: "power2.out", overwrite: "auto" });
              }
            },
          });
        }
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: () => {
            if (!shifts.some((s) => {
              const r = s.getBoundingClientRect();
              return r.top < innerHeight * 0.55 && r.bottom > innerHeight * 0.45;
            })) {
              gsap.to(mainEl, { backgroundColor: "#0B0B0E", duration: 0.8, ease: "power2.out", overwrite: "auto" });
            }
          },
        });
      }

      /* Process progress line */
      const pline = document.querySelector<HTMLElement>("[data-progress-line]");
      if (pline) {
        gsap.fromTo(
          pline,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: pline.closest("section"),
              start: "top 70%",
              end: "bottom 60%",
              scrub: 0.5,
            },
          }
        );
      }

      /* Marquees: GSAP-driven so scroll velocity can bend their speed */
      const marquees = gsap.utils.toArray<HTMLElement>("[data-marquee-inner]");
      if (marquees.length) {
        const tweens = marquees.map((m) => {
          m.style.animation = "none"; // take over from the CSS fallback
          const dur = parseFloat(m.dataset.duration || "28");
          const dir = m.dataset.reverse !== undefined ? 1 : -1;
          return gsap.fromTo(
            m,
            { xPercent: dir === -1 ? 0 : -50 },
            { xPercent: dir === -1 ? -50 : 0, duration: dur, ease: "none", repeat: -1 }
          );
        });
        ScrollTrigger.create({
          onUpdate: (self) => {
            const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 800, 3);
            for (const t of tweens) {
              gsap.to(t, {
                timeScale: boost,
                duration: 0.2,
                overwrite: true,
                onComplete: () =>
                  gsap.to(t, { timeScale: 1, duration: 1.6, ease: "power2.out" }),
              });
            }
          },
        });
      }
      }); // end scheduled scene setup

      // Start draining the deferred queue once the browser is idle.
      if ("requestIdleCallback" in window)
        window.requestIdleCallback(drain, { timeout: 600 });
      else setTimeout(drain, 32);
    });

    return () => {
      ctx.revert();
    };
  }, [pathname]);
}

/** Curtain that sweeps away when a new route mounts. */
function PageCurtain({ pathname }: { pathname: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (prefersReduced()) return;
    if (first.current) {
      first.current = false;
      return; // preloader owns the very first entrance
    }
    const el = ref.current!;
    gsap.fromTo(
      el,
      { yPercent: 0, display: "block" },
      {
        yPercent: -101,
        duration: 0.85,
        ease: "power4.inOut",
        delay: 0.05,
        onComplete: () => gsap.set(el, { display: "none" }),
      }
    );
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-0 z-[95] hidden bg-surface"
      style={{ display: "none" }}
    >
      <div className="flex h-full items-center justify-center">
        <span className="font-display text-2xl font-bold text-ink/20">
          SITE<span className="text-volt/40">BLITZ</span>
        </span>
      </div>
    </div>
  );
}

export function MotionProvider() {
  const pathname = usePathname();
  useLenis();
  useAnimEngine(pathname);
  return <PageCurtain pathname={pathname} />;
}
