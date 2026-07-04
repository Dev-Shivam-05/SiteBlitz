"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, SITE } from "@/lib/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "border-b border-line bg-void/80 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
          <Link
            href="/"
            className="font-display text-lg font-bold tracking-tight md:text-xl"
            data-track="nav_logo"
            aria-label="SiteBlitz home"
          >
            SITE<span className="text-volt">BLITZ</span>
            <span className="ml-1 inline-block h-2 w-2 animate-pulse-soft rounded-full bg-volt align-middle" />
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm transition-colors hover:text-ink ${
                  pathname === l.href ? "text-volt" : "text-muted"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              data-track="nav_cta"
              className="btn-volt rounded-full px-5 py-2.5 text-sm font-semibold"
            >
              Start a project
            </Link>
          </nav>

          <button
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span
              className={`h-px w-6 bg-ink transition-transform duration-300 ${
                open ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-6 bg-ink transition-transform duration-300 ${
                open ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-void px-6 pb-10 pt-28 transition-[opacity,visibility] duration-400 md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!open}
      >
        <nav className="flex flex-col gap-2" aria-label="Mobile">
          {NAV_LINKS.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              className={`font-display border-b border-line py-4 text-4xl font-bold transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              } ${pathname === l.href ? "text-volt" : "text-ink"}`}
              style={{ transitionDelay: open ? `${i * 60 + 100}ms` : "0ms" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-4">
          <Link
            href="/contact"
            data-track="mobile_menu_cta"
            className="btn-volt rounded-full px-6 py-4 text-center text-base font-semibold"
          >
            Start a project →
          </Link>
          <a href={`mailto:${SITE.email}`} className="text-center text-sm text-muted">
            {SITE.email}
          </a>
        </div>
      </div>
    </>
  );
}
