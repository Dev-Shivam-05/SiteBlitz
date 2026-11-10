import Link from "next/link";
import { SITE } from "@/lib/site";
import { FROM_PRICE, inr } from "@/lib/offer";
import { SITE_PHOTO_IDS } from "@/lib/photos";
import { PhotoCredits } from "./PhotoCredits";
import { WhatsAppIcon } from "./WhatsAppIcon";

const COLUMNS = [
  {
    title: "Website",
    links: [
      { href: "/#demos", label: "Live demos" },
      { href: "/#how", label: "How it works" },
      { href: "/pricing", label: "Pricing & terms" },
      { href: "/#faq", label: "FAQs" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Demos",
    links: [
      { href: "/demo/salon", label: "Salon & beauty" },
      { href: "/demo/coaching", label: "Coaching & tuition" },
      { href: "/demo/showroom", label: "Retail & showroom" },
      { href: "/tools/grader", label: "Free website check" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy policy" },
      { href: "/terms", label: "Terms of service" },
      { href: "/refunds", label: "Refund policy" },
    ],
  },
] as const;

/** Redesign v4 footer: the void ground runs on from the close, the wordmark set edge to edge with its volt half,
 *  and the one credit line for every photograph the site shows. */
export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-void text-ink">
      <div className="mx-auto max-w-[1440px] px-4 pb-10 pt-16 md:px-8 md:pt-24">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
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
              <h3 className="kicker text-faint">{c.title}</h3>
              <ul className="mt-4 space-y-1">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
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
          <p>© {new Date().getFullYear()} SiteBlitz. Demo websites are concept demonstrations, not client projects.</p>
          <PhotoCredits ids={SITE_PHOTO_IDS} className="max-w-[70ch] md:text-right" />
        </div>
      </div>
    </footer>
  );
}
