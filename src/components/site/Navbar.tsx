"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, SITE } from "@/lib/site";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#@$%&*+=/";

/** Scramble a link's label through random glyphs, then settle. */
function scramble(el: HTMLElement) {
  const original = el.dataset.label || el.textContent || "";
  el.dataset.label = original;
  let frame = 0;
  const total = Math.max(original.length * 2, 10);
  const tick = () => {
    frame++;
    const settled = Math.floor((frame / total) * original.length);
    el.textContent = original
      .split("")
      .map((c, i) =>
        c === " " ? " " : i < settled ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      )
      .join("");
    if (settled < original.length) requestAnimationFrame(tick);
    else el.textContent = original;
  };
  requestAnimationFrame(tick);
}

function ISTClock() {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour12: false,
      });
    setTime(fmt());
    const t = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(t);
  }, []);
  return <span className="tabular-nums">{time} IST</span>;
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    // pause smooth scroll while the menu owns the screen
    window.__lenis?.[open ? "stop" : "start"]?.();
    return () => {
      document.documentElement.style.overflow = "";
      window.__lenis?.start?.();
    };
  }, [open]);

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[80] transition-all duration-300 ${
          scrolled && !open ? "border-b border-line bg-void/80 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
          <Link
            href="/"
            className="font-display text-lg font-bold tracking-tight md:text-xl"
            data-track="nav_logo"
            aria-label="SiteBlitz home"
            onClick={() => setOpen(false)}
          >
            SITE<span className="text-volt">BLITZ</span>
            <span className="ml-1 inline-block h-2 w-2 animate-pulse-soft rounded-full bg-volt align-middle" />
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              data-track="nav_cta"
              className={`btn-volt hidden rounded-full px-5 py-2.5 text-sm font-semibold transition-opacity duration-300 md:block ${
                open ? "pointer-events-none opacity-0" : "opacity-100"
              }`}
            >
              Start a project
            </Link>

            <button
              className="group flex h-11 items-center gap-3 rounded-full border border-line bg-surface/60 px-4 backdrop-blur transition-colors hover:border-volt/40"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              data-track={open ? "menu_close" : "menu_open"}
            >
              <span className="font-display hidden text-[11px] font-bold tracking-[0.2em] text-muted transition-colors group-hover:text-ink sm:block">
                {open ? "CLOSE" : "MENU"}
              </span>
              <span className="relative flex h-3 w-6 flex-col justify-between">
                <span
                  className={`h-px w-full bg-ink transition-all duration-300 ${
                    open ? "translate-y-[5.5px] rotate-45" : "group-hover:w-4"
                  }`}
                />
                <span
                  className={`h-px w-full bg-ink transition-all duration-300 ${
                    open ? "-translate-y-[5.5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen experience menu */}
      <div
        className="fixed inset-0 z-[70] bg-void"
        style={{
          clipPath: open ? "circle(150% at calc(100% - 60px) 40px)" : "circle(0% at calc(100% - 60px) 40px)",
          transition: "clip-path 0.9s cubic-bezier(0.76, 0, 0.24, 1)",
          pointerEvents: open ? "auto" : "none",
        }}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_80%_10%,rgba(204,255,0,0.07),transparent)]" />
        <div className="noise-layer pointer-events-none absolute inset-0 opacity-30" />

        <div className="mx-auto flex h-full max-w-7xl flex-col justify-between px-6 pb-8 pt-24 md:flex-row md:items-center md:px-8 md:pb-0 md:pt-20">
          <nav className="flex flex-col" aria-label="Menu">
            {NAV_LINKS.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                className={`group flex items-baseline gap-4 border-b border-line/60 py-3 md:gap-6 md:py-4 ${
                  open ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{
                  transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1), opacity 0.7s",
                  transitionDelay: open ? `${i * 70 + 250}ms` : "0ms",
                }}
                onMouseEnter={(e) => {
                  const label = e.currentTarget.querySelector<HTMLElement>("[data-menu-label]");
                  if (label) scramble(label);
                }}
              >
                <span className="font-display text-xs font-bold tabular-nums text-faint transition-colors group-hover:text-volt">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  data-menu-label
                  className={`font-display text-5xl font-bold leading-tight tracking-tight transition-colors duration-200 md:text-7xl ${
                    pathname === l.href ? "text-volt" : "text-ink group-hover:text-volt"
                  }`}
                >
                  {l.label.toUpperCase()}
                </span>
                <span className="ml-auto hidden -translate-x-3 text-2xl text-volt opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:block">
                  ⟶
                </span>
              </Link>
            ))}
          </nav>

          <div
            className={`flex flex-col gap-6 md:w-72 ${open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
            style={{
              transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1), opacity 0.7s",
              transitionDelay: open ? "620ms" : "0ms",
            }}
          >
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-faint">New business</p>
              <a href={`mailto:${SITE.email}`} className="mt-2 block text-lg text-ink underline-offset-4 hover:text-volt hover:underline">
                {SITE.email}
              </a>
              <a
                href={SITE.whatsapp("Hi SiteBlitz! Let's talk about my website.")}
                target="_blank"
                rel="noopener noreferrer"
                data-track="menu_whatsapp"
                className="mt-1 block text-lg text-ink underline-offset-4 hover:text-volt hover:underline"
              >
                WhatsApp ↗
              </a>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-faint">Studio</p>
              <p className="mt-2 text-sm text-muted">
                Mumbai, India · working worldwide
                <br />
                <ISTClock />
              </p>
            </div>
            <Link
              href="/contact"
              data-track="menu_cta"
              className="btn-volt rounded-full px-6 py-4 text-center text-base font-semibold md:mt-2"
            >
              Start a project →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
