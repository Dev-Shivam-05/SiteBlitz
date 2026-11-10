"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, SITE } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

/** Redesign v3 header (docs/spec/redesign-v3-motion.md): solid pills that read on top of the hero photograph,
 *  in the spirit of the reference's floating controls. Visible links on desktop; a full-screen sheet on phones.
 *  The one primary action everywhere is WhatsApp, because that is where every sale happens. */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const wa = SITE.whatsapp("Hi SiteBlitz, I'd like to see a website demo and the package details.");

  return (
    <header className="fixed inset-x-0 top-0 z-[80]">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-3 px-4 md:px-8">
        <Link
          href="/"
          className="pill display flex h-11 items-center px-5 text-[1.35rem] shadow-sm"
          data-track="nav_logo"
          aria-label="SiteBlitz home"
        >
          Site<span className="text-volt">Blitz</span>
        </Link>

        <nav className="pill hidden h-11 items-center gap-1 px-2 shadow-sm md:flex" aria-label="Main">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-raised"
            >
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
            className="btn-volt flex h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold shadow-sm"
          >
            <WhatsAppIcon className="h-[18px] w-[18px]" color="currentColor" />
            <span className="hidden sm:inline">Chat on WhatsApp</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>
          <button
            className="pill flex h-11 w-11 items-center justify-center shadow-sm md:hidden"
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
        className="fixed inset-x-0 bottom-0 top-[72px] overflow-y-auto bg-ink px-5 pb-10 pt-6 text-void md:hidden"
      >
        {[...NAV_LINKS, { href: "/contact", label: "Contact" }].map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="display block border-b border-void/15 py-4 text-[2.6rem]"
            onClick={() => setOpen(false)}
          >
            {l.label}
          </Link>
        ))}
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          data-track="menu_whatsapp"
          className="btn-volt mt-8 flex h-14 items-center justify-center gap-2 rounded-full text-base font-semibold"
        >
          <WhatsAppIcon className="h-5 w-5" color="currentColor" /> Chat on WhatsApp
        </a>
        <p className="mt-5 text-sm text-void/75">{SITE.locationLine}</p>
      </nav>
    </header>
  );
}
