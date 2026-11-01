"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, SITE } from "@/lib/site";

/** Visible links on desktop (no MENU-only nav, FD-36); a simple sheet on phones. The one primary action
 *  everywhere is WhatsApp, because that is where every sale happens. */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const wa = SITE.whatsapp("Hi SiteBlitz, I'd like to see a website demo and the package details.");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[80] transition-[background,border-color] duration-300 ${
        scrolled || open ? "border-b border-line bg-void/90 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
        <Link href="/" className="font-display text-lg font-extrabold tracking-tight" data-track="nav_logo" aria-label="SiteBlitz home">
          Site<span className="text-volt">Blitz</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium text-muted transition-colors hover:text-ink">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            data-track="nav_whatsapp"
            className="btn-volt rounded-full px-4 py-2.5 text-sm font-semibold"
          >
            Chat on WhatsApp
          </a>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line md:hidden"
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
        hidden={!open}
        className="border-t border-line bg-void px-5 pb-6 pt-2 md:hidden"
      >
        {NAV_LINKS.map((l) => (
          <Link key={l.href} href={l.href} className="block border-b border-line py-3.5 text-base font-semibold text-ink" onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
        <Link href="/contact" className="block border-b border-line py-3.5 text-base font-semibold text-ink" onClick={() => setOpen(false)}>
          Contact
        </Link>
        <p className="mt-4 text-sm text-muted">{SITE.locationLine}</p>
      </nav>
    </header>
  );
}
