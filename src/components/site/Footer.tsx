import Link from "next/link";
import { SITE } from "@/lib/site";
import { FROM_PRICE, inr } from "@/lib/offer";
import { SITE_PHOTO_IDS } from "@/lib/photos";
import { PhotoCredits } from "./PhotoCredits";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { footerColumns, LEGAL_LINKS } from "@/lib/routes";

/** Every indexable page is reachable from here (src/lib/routes.ts); the legal row sits under the wordmark.
 *  prefetch={false}: these are still plain crawlable <a href> links, but scrolling past ~40 of them made Next prefetch
 *  351-389 KB of route payloads per page view (performance audit 2026-11-11, fix Q3). The likely next steps keep
 *  their prefetch (header, in-page buttons). */
const COLUMNS = footerColumns();

/** Redesign v4 footer: the void ground runs on from the close, the wordmark set edge to edge with its volt half,
 *  and the one credit line for every photograph the site shows. */
export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-void text-ink">
      <div className="mx-auto max-w-[1440px] px-4 pb-10 pt-16 md:px-8 md:pt-24">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
          <div>
            <p className="max-w-xs text-base leading-relaxed text-ink/80">
              Business websites with upfront prices from {inr(FROM_PRICE)}, written scope and clear ownership.
            </p>
            <p className="mt-4 text-sm text-muted">{SITE.locationLine}</p>
            <a
              href={SITE.whatsapp("Hi SiteBlitz, I want to discuss a website for my business.")}
              target="_blank"
              rel="noopener noreferrer"
              data-track="footer_whatsapp"
              className="mt-5 inline-flex min-h-11 items-center gap-2 text-base font-semibold text-volt underline-offset-4 hover:underline"
            >
              <WhatsAppIcon className="h-5 w-5" color="currentColor" /> WhatsApp {SITE.phone}
            </a>
            {SITE.emailLive && (
              <a href={`mailto:${SITE.email}`} className="mt-1 block text-sm text-muted hover:text-ink" data-track="footer_email">
                {SITE.email}
              </a>
            )}
            <p className="mt-1 text-sm text-muted">Replies {SITE.replyHours}</p>
          </div>
          {COLUMNS.map((c) => (
            <div key={c.title}>
              {/* h2, not h3: pages without an h2 of their own (/book, /tools/grader) otherwise skipped a heading level */}
              <h2 className="kicker text-faint">{c.title}</h2>
              <ul className="mt-4 space-y-1">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      prefetch={false}
                      className="group inline-flex min-h-11 items-center text-base text-ink/85 transition-colors hover:text-volt"
                    >
                      <span aria-hidden className="h-px w-0 bg-volt transition-all duration-300 group-hover:mr-2 group-hover:w-4" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p
          aria-hidden
          data-anim="chars"
          data-stagger="0.04"
          className="display mt-16 select-none whitespace-nowrap text-[17vw] leading-[0.82] md:mt-24 md:text-[min(17.4vw,252px)]"
        >
          Site<span className="text-volt">Blitz</span>
        </p>

        <div className="mt-8 flex flex-col gap-3 border-t border-line pt-6 text-sm text-muted md:flex-row md:items-start md:justify-between">
          <div>
            <p>© {new Date().getFullYear()} SiteBlitz. Demo websites are concept demonstrations, not client projects.</p>
            <ul className="mt-2 flex flex-wrap gap-x-5">
              {LEGAL_LINKS.map((l) => (
                <li key={l.path}>
                  <Link href={l.path} prefetch={false} className="inline-flex min-h-11 items-center hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <PhotoCredits ids={SITE_PHOTO_IDS} className="max-w-[70ch] md:text-right" />
        </div>
      </div>
    </footer>
  );
}
