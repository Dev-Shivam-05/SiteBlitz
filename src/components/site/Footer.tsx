"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/site";

function ISTClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
      }).format(new Date());
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time || "--:--:--"}</span>;
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div>
          <p className="font-accent text-lg italic text-muted" data-anim="fade-up">
            Have something to build?
          </p>
          <Link
            href="/contact"
            data-track="footer_cta"
            data-cursor-label="Say hi"
            className="font-display sweep-link group mt-2 block overflow-hidden text-[13vw] font-bold leading-[0.95] tracking-tight md:text-8xl lg:text-9xl"
          >
            <span data-anim="chars" data-stagger="0.03" className="block">
              Let&apos;s <span className="text-volt transition-colors group-hover:text-ink">blitz</span> it.
              <span className="ml-4 inline-block transition-transform duration-300 group-hover:translate-x-4">
                →
              </span>
            </span>
            <span className="sweep-fill" />
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-10 md:mt-24 md:grid-cols-4">
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-faint">Studio</h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted transition-colors hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-faint">Contact</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-sm text-muted transition-colors hover:text-ink"
                  data-track="footer_email"
                >
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE.whatsapp("Hi SiteBlitz! I want to discuss a website project.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-ink"
                  data-track="footer_whatsapp"
                >
                  WhatsApp {SITE.phone}
                </a>
              </li>
              <li className="text-sm text-muted">
                {SITE.city}, {SITE.country}
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-faint">Legal</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/privacy" className="text-sm text-muted transition-colors hover:text-ink">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted transition-colors hover:text-ink">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refunds" className="text-sm text-muted transition-colors hover:text-ink">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-faint">Local time</h3>
            <p className="mt-4 font-display text-2xl font-bold text-ink">
              <ISTClock />
            </p>
            <p className="mt-1 text-xs text-faint">IST · usually replying</p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5">
              <span className="h-2 w-2 animate-pulse-soft rounded-full bg-volt" />
              <span className="text-xs text-muted">Taking new projects</span>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 md:flex-row md:items-center">
          <p className="text-xs text-faint">
            © {new Date().getFullYear()} SiteBlitz. Built by SiteBlitz — obviously.
          </p>
          <p className="text-xs text-faint">
            Made in India <span className="text-volt">⚡</span> Shipped worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
