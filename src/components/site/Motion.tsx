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
      const els = gsap.utils.toArray<HTMLElement>("[data-anim]");
      for (const el of els) {
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
      }

      /* Horizontal work gallery (desktop only; matchMedia re-evaluates on resize) */
      const hwrap = document.querySelector<HTMLElement>("[data-hscroll]");
      const htrack = document.querySelector<HTMLElement>("[data-hscroll-track]");
      if (hwrap && htrack) {
        const mm = gsap.matchMedia();
        mm.add("(min-width: 1024px)", () => {
          const getDist = () => Math.max(htrack.scrollWidth - window.innerWidth, 0);
          if (getDist() <= 0) return;
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
            },
          });
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
    });

    // Re-measure after fonts/images settle
    const t = setTimeout(() => ScrollTrigger.refresh(), 350);
    return () => {
      clearTimeout(t);
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
