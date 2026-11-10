"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/site";
import { MAIN_NAV, PAGES } from "@/lib/pages";
import { Magnetic } from "./Magnetic";
import { WhatsAppIcon } from "./WhatsAppIcon";

/** Redesign v4 header (docs/spec/redesign-v4-showcase.md): the wordmark, a glass pill of links and the volt
 *  WhatsApp button float over the page. The header slides away while you scroll down and returns on the way up.
 *  Phones get a full-screen sheet whose links rise in turn. WhatsApp stays the one primary action everywhere. */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const lastY = useRef(0);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        const dy = y - lastY.current;
        if (Math.abs(dy) > 6) setHidden(dy > 0 && y > 160);
        lastY.current = y;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    window.__lenis?.stop();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      window.__lenis?.start();
    };
  }, [open]);

  const wa = SITE.whatsapp("Hi SiteBlitz, I'd like to see a website demo and the package details.");
  const nav = MAIN_NAV.map((e) => ({ href: e.path, label: e.label }));
  // The phone sheet adds the pages a phone visitor looks for that the desktop pill keeps in the footer.
  const menuLinks = [...nav, { href: PAGES.faq.path, label: PAGES.faq.label }];
  // A section of the site counts as current for its children too (/services/landing-pages lights "Services").
  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className={`site-header fixed inset-x-0 top-0 z-[80] ${hidden && !open ? "is-hidden" : ""}`}>
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between gap-3 px-4 md:px-8">
        <Link
          href="/"
          className="pill display flex h-11 items-center px-5 text-[1.05rem] md:text-[1.15rem]"
          data-track="nav_logo"
          aria-label="SiteBlitz home"
        >
          Site<span className="text-volt">Blitz</span>
        </Link>

        <nav className="pill hidden h-11 items-center gap-1 px-1.5 md:flex" aria-label="Main">
          {nav.map((l) => {
            const current = isCurrent(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={current ? "page" : undefined}
                className={`group relative rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:text-ink ${
                  current ? "text-ink" : "text-ink/85"
                }`}
              >
                {l.label}
                <span
                  aria-hidden
                  className={`absolute inset-x-4 bottom-1 h-px origin-left bg-volt transition-transform duration-300 group-hover:scale-x-100 ${
                    current ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Magnetic strength={0.25}>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              data-track="nav_whatsapp"
              className="btn-volt flex h-11 w-[132px] items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold sm:w-[190px]"
            >
              <WhatsAppIcon className="h-[18px] w-[18px]" color="currentColor" />
              <span className="hidden sm:inline">Chat on WhatsApp</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>
          </Magnetic>
          <button
            className="pill flex h-11 w-11 items-center justify-center md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className="relative block h-3 w-4" aria-hidden>
              <span className={`absolute left-0 top-0 h-0.5 w-4 bg-ink transition-transform ${open ? "translate-y-[5px] rotate-45" : ""}`} />
              <span className={`absolute bottom-0 left-0 h-0.5 w-4 bg-ink transition-transform ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        inert={!open}
        className={`menu-sheet fixed inset-x-0 bottom-0 top-0 -z-10 flex flex-col overflow-y-auto bg-void px-5 pb-10 pt-[96px] md:hidden ${
          open ? "is-open" : ""
        }`}
      >
        {menuLinks.map((l, i) => (
          <Link
            key={l.href}
            href={l.href}
            aria-current={isCurrent(l.href) ? "page" : undefined}
            style={{ ["--i" as string]: i }}
            className="menu-item display flex items-baseline justify-between border-b border-line py-4 text-[2.5rem]"
            onClick={() => setOpen(false)}
          >
            {l.label}
            <span className="font-body text-sm font-semibold normal-case tracking-normal text-faint">0{i + 1}</span>
          </Link>
        ))}
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          data-track="menu_whatsapp"
          style={{ ["--i" as string]: menuLinks.length }}
          className="menu-item btn-volt mt-8 flex h-14 shrink-0 items-center justify-center gap-2 rounded-full text-base font-semibold"
        >
          <WhatsAppIcon className="h-5 w-5" color="currentColor" /> Chat on WhatsApp
        </a>
        <p className="menu-item mt-5 text-sm text-muted" style={{ ["--i" as string]: menuLinks.length + 1 }}>
          {SITE.locationLine}
        </p>
      </nav>
    </header>
  );
}
