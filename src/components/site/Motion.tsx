"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import { Cursor } from "./Cursor";

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

/** Lenis smooth scrolling wired into GSAP's ticker + ScrollTrigger. Desktop pointers only (spec v3): on touch
 *  the native scroll is smoother and Lenis broke the reference site's mobile build; reduced motion skips it. */
function useLenis() {
  useEffect(() => {
    if (prefersReduced()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
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
    let alive = true;
    const ctx = gsap.context(() => {
      // Yielding scheduler: above-the-fold (data-now) scenes build immediately;
      // everything else is spread across idle frames so no single long task
      // blocks the main thread (keeps Total Blocking Time low). Each queued scene runs through ctx.add, so the
      // context records it and reverts it on the next route; a queue left over from a previous page stops.
      const queue: (() => void)[] = [];
      const schedule = (fn: () => void) => queue.push(fn);
      const drain = () => {
        if (!alive) return;
        const start = performance.now();
        while (queue.length && performance.now() - start < 6) ctx.add(queue.shift()!);
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

      /* ===== Redesign v4 scenes (docs/spec/redesign-v4-showcase.md). Phone and desktop values differ, so each
         scene is built inside one matchMedia; content is server-rendered and only transformed here. The hero is
         driven by hero/ParticleHero.tsx (its own rAF loop and WebGL), not from here. Every scene is its own
         scheduled task, so building them never adds up to one long task. */
      const v4 = gsap.matchMedia();
      const BP = { desk: "(min-width: 768px)", phone: "(max-width: 767px)" };

      schedule(() => {

      /* Signature strokes: each volt path (pathLength=100) draws itself while its block crosses the screen.
         autoRound off: GSAP rounds px values by default, which made the stroke jump from hidden to whole. */
      for (const path of gsap.utils.toArray<SVGPathElement>("[data-draw]")) {
        gsap.fromTo(
          path,
          { strokeDasharray: "100 100", strokeDashoffset: 100 },
          {
            strokeDashoffset: 0,
            ease: "none",
            autoRound: false,
            scrollTrigger: { trigger: path.ownerSVGElement || path, start: "top 85%", end: "bottom 50%", scrub: 0.6 },
          }
        );
      }

      });

      schedule(() => {
      /* Giant price: rises out of its clipped section */
      for (const el of gsap.utils.toArray<HTMLElement>("[data-rise]")) {
        v4.add(BP, (c) => {
          const desk = Boolean(c.conditions?.desk);
          gsap.fromTo(
            el,
            { yPercent: desk ? 40 : 24 },
            {
              yPercent: 0,
              ease: "none",
              scrollTrigger: { trigger: el.closest("section") || el, start: "top 82%", end: desk ? "top 30%" : "top 40%", scrub: 0.3 },
            }
          );
        });
      }

      });

      schedule(() => {
      /* Drift collage: every frame travels at its own speed (data-drift, ±) through the whole section, with a
         slight turn, so the captures float past the sticky heading at different depths. */
      for (const el of gsap.utils.toArray<HTMLElement>("[data-drift]")) {
        const speed = parseFloat(el.dataset.drift || "0");
        const sec = el.closest("section") || el;
        v4.add(BP, (c) => {
          const amp = (c.conditions?.desk ? 0.7 : 0.45) * window.innerHeight;
          gsap.fromTo(
            el,
            { y: speed * amp, rotate: speed * 4 },
            {
              y: -speed * amp,
              rotate: -speed * 4,
              ease: "none",
              scrollTrigger: { trigger: sec, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        });
      }

      });

      schedule(() => {
      /* Concept wall: on tall desktops the section holds (CSS sticky) while the three cards rise and straighten in
         turn; elsewhere each card rises once as it arrives. */
      const hall = document.querySelector<HTMLElement>("[data-hall]");
      if (hall) {
        const cards = gsap.utils.toArray<HTMLElement>("[data-hall-card]", hall);
        v4.add({ pin: "(min-width: 768px) and (min-height: 700px)", flow: "(max-width: 767px), (max-height: 699px)" }, (c) => {
          if (c.conditions?.pin) {
            gsap.fromTo(
              cards,
              { yPercent: 70, rotate: (i: number) => (i - 1) * 5, opacity: 0 },
              {
                yPercent: 0,
                rotate: 0,
                opacity: 1,
                ease: "power2.out",
                stagger: 0.12,
                scrollTrigger: { trigger: hall, start: "top 70%", end: "top -35%", scrub: 0.6 },
              }
            );
          } else {
            for (const card of cards)
              gsap.from(card, { y: 60, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 88%", once: true } });
          }
        });
      }

      });

      schedule(() => {
      /* Packages track: when every panel fits the screen, the section holds while the rail slides sideways by
         exactly the scroll distance; a mouse drag on the rail scrolls the page by the same amount. Otherwise
         (short screens, a panel too tall) the panels stay stacked. */
      const pk = document.querySelector<HTMLElement>("[data-htrack]");
      const rail = pk?.querySelector<HTMLElement>("[data-htrack-rail]");
      const stage = pk?.querySelector<HTMLElement>(".pk-stage");
      if (pk && rail && stage) {
        v4.add({ desk: "(min-width: 768px) and (min-height: 640px)", phone: "(max-width: 767px) and (min-height: 700px)" }, () => {
          pk.classList.add("is-track");
          const panels = Array.from(rail.querySelectorAll<HTMLElement>(".pk-panel"));
          if (panels.some((p) => p.scrollHeight > p.clientHeight + 2)) {
            pk.classList.remove("is-track");
            return;
          }
          const dist = () => Math.max(0, rail.scrollWidth - window.innerWidth);
          const setHeight = () => {
            pk.style.height = `${stage.clientHeight + dist()}px`;
          };
          setHeight();
          const tween = gsap.to(rail, {
            x: () => -dist(),
            ease: "none",
            scrollTrigger: {
              trigger: pk,
              start: "top top",
              end: () => `+=${dist()}`,
              scrub: 0.6,
              invalidateOnRefresh: true,
              onRefreshInit: setHeight,
            },
          });

          let startX = 0;
          let startY = 0;
          let moved = 0;
          let dragging = false;
          const down = (e: PointerEvent) => {
            if (e.pointerType !== "mouse" || e.button !== 0) return;
            dragging = true;
            moved = 0;
            startX = e.clientX;
            startY = window.scrollY;
            rail.classList.add("is-dragging");
          };
          const move = (e: PointerEvent) => {
            if (!dragging) return;
            const dx = e.clientX - startX;
            moved = Math.max(moved, Math.abs(dx));
            const y = startY - dx;
            if (window.__lenis) window.__lenis.scrollTo(y, { immediate: true });
            else window.scrollTo(0, y);
          };
          const up = () => {
            dragging = false;
            rail.classList.remove("is-dragging");
          };
          // a drag must not end as a click on a WhatsApp button
          const click = (e: MouseEvent) => {
            if (moved > 6) {
              e.preventDefault();
              e.stopPropagation();
            }
            moved = 0;
          };
          const noDrag = (e: Event) => e.preventDefault();
          rail.addEventListener("pointerdown", down);
          window.addEventListener("pointermove", move);
          window.addEventListener("pointerup", up);
          rail.addEventListener("click", click, true);
          rail.addEventListener("dragstart", noDrag);
          return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
            gsap.set(rail, { x: 0 });
            pk.classList.remove("is-track");
            pk.style.height = "";
            rail.removeEventListener("pointerdown", down);
            window.removeEventListener("pointermove", move);
            window.removeEventListener("pointerup", up);
            rail.removeEventListener("click", click, true);
            rail.removeEventListener("dragstart", noDrag);
          };
        });
      }

      });

      schedule(() => {
      /* Process: a step's number fills volt once it reaches 70% of the screen */
      for (const step of gsap.utils.toArray<HTMLElement>("[data-step]")) {
        ScrollTrigger.create({
          trigger: step,
          start: "top 70%",
          once: true,
          onEnter: () => step.classList.add("is-active"),
        });
      }

      });

      schedule(() => {
      /* Promise: letters start scattered and assemble as the section scrolls in (scrubbed, reversible).
         SplitText keeps an aria-label with the whole phrase. Offsets are deterministic, not random per load. */
      for (const el of gsap.utils.toArray<HTMLElement>("[data-scatter]")) {
        v4.add(BP, (c) => {
          const desk = Boolean(c.conditions?.desk);
          const split = new SplitText(el, { type: "chars,words" });
          const k = desk ? 1 : 0.5;
          const rotMax = desk ? 9 : 5;
          gsap.fromTo(
            split.chars,
            {
              x: (i: number) => (((i * 37) % 11) / 5 - 1) * 40 * k,
              y: (i: number) => (((i * 53) % 13) / 6 - 1) * 80 * k,
              rotation: (i: number) => (((i * 29) % 9) / 4 - 1) * rotMax,
              opacity: 0.15,
            },
            {
              x: 0,
              y: 0,
              rotation: 0,
              opacity: 1,
              ease: "none",
              stagger: 0.01,
              scrollTrigger: { trigger: el, start: "top 85%", end: "top 35%", scrub: desk ? 0.4 : 0.3 },
            }
          );
          return () => split.revert();
        });
      }

      });

      schedule(() => {
      /* Close: the ground turns volt when the section is 60% up the screen (and back when you return) */
      const close = document.querySelector<HTMLElement>("[data-close]");
      if (close) {
        ScrollTrigger.create({
          trigger: close,
          start: "top 60%",
          toggleClass: { targets: close, className: "is-lit" },
        });
      }

      });

      schedule(() => {
      /* Hairlines draw once as their section arrives */
      for (const el of gsap.utils.toArray<HTMLElement>("[data-line]")) {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: window.innerWidth < 768 ? 0.28 : 0.45,
            ease: "power2.out",
            transformOrigin: "left center",
            scrollTrigger: { trigger: el, start: "top 75%", once: true },
          }
        );
      }

      });

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

      });

      schedule(() => {
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

      });

      schedule(() => {
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

      });

      schedule(() => {
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

      });

      schedule(() => {
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

      });

      schedule(() => {
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

      // Mona Sans is far wider than its fallback: once it has swapped in, every heading may wrap differently, so
      // the trigger positions are measured again.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      // Start draining the deferred queue once the browser is idle.
      if ("requestIdleCallback" in window)
        window.requestIdleCallback(drain, { timeout: 600 });
      else setTimeout(drain, 32);
    });

    return () => {
      alive = false;
      ctx.revert();
    };
  }, [pathname]);
}

/** Page change (spec v4 row 10): a same-tab internal link click drops the volt curtain (0.4 s), the route changes
 *  under it, and it lifts on the new page (0.4 s). The click is caught in the capture phase on document, before
 *  React's root listener, so next/link sees defaultPrevented and leaves the navigation to us. Anything unusual
 *  (modifier keys, new tab, download, hash on the same page, other origin) keeps the browser's own behaviour.
 *  If the route never changes, the curtain lifts after 3 s anyway. */
function PageCurtain({ pathname }: { pathname: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const covering = useRef(false);
  const failsafe = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const lift = () => {
    const el = ref.current;
    if (!el) return;
    clearTimeout(failsafe.current);
    covering.current = false;
    gsap.to(el, {
      yPercent: -100,
      duration: 0.4,
      ease: "power3.inOut",
      delay: 0.05,
      onComplete: () => {
        gsap.set(el, { display: "none" });
      },
    });
  };

  useEffect(() => {
    if (prefersReduced()) return;
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || !a.href || a.target === "_blank" || a.hasAttribute("download") || a.dataset.noCurtain !== undefined) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname.startsWith("/admin") || url.pathname.startsWith("/api")) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return; // same page / hash
      e.preventDefault();
      if (covering.current) return;
      covering.current = true;
      const el = ref.current!;
      gsap.killTweensOf(el);
      gsap.fromTo(
        el,
        { yPercent: 100, display: "flex" },
        {
          yPercent: 0,
          duration: 0.4,
          ease: "power3.inOut",
          onComplete: () => router.push(url.pathname + url.search + url.hash),
        }
      );
      failsafe.current = setTimeout(lift, 3000);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    if (!covering.current) return;
    if (!window.location.hash) window.scrollTo(0, 0);
    window.__lenis?.scrollTo(window.scrollY, { immediate: true });
    lift();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div ref={ref} aria-hidden className="page-curtain">
      <span className="display text-[clamp(40px,9vw,140px)]">SiteBlitz</span>
    </div>
  );
}

export function MotionProvider() {
  const pathname = usePathname();
  const [cursor, setCursor] = useState(false);
  useLenis();
  useAnimEngine(pathname);
  useEffect(() => {
    setCursor(!prefersReduced() && window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);
  return (
    <>
      <PageCurtain pathname={pathname} />
      {cursor && <Cursor />}
    </>
  );
}
