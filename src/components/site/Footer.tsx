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

/** Redesign v3 footer: ink ground, the wordmark set large (the reference's giant closing type), and the one
 *  credit line for every photograph the site shows. */
export function Footer() {
  return (
    <footer className="bg-ink text-void">
      <div className="mx-auto max-w-[1440px] px-4 pb-10 pt-16 md:px-8 md:pt-24">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <p className="max-w-xs text-base leading-relaxed text-void/80">
              Business websites with upfront prices from {inr(FROM_PRICE)}, written scope and clear ownership.
            </p>
            <p className="mt-4 text-sm text-void/70">{SITE.locationLine}</p>
            <a
              href={SITE.whatsapp("Hi SiteBlitz, I want to discuss a website for my business.")}
              target="_blank"
              rel="noopener noreferrer"
              data-track="footer_whatsapp"
              className="mt-5 inline-flex min-h-11 items-center gap-2 text-base font-semibold text-void underline-offset-4 hover:underline"
            >
              <WhatsAppIcon className="h-5 w-5" /> WhatsApp {SITE.phone}
            </a>
            {SITE.emailLive && (
              <a href={`mailto:${SITE.email}`} className="mt-1 block text-sm text-void/75 hover:text-void" data-track="footer_email">
                {SITE.email}
              </a>
            )}
            <p className="mt-1 text-sm text-void/70">Replies {SITE.replyHours}</p>
          </div>
          {COLUMNS.map((c) => (
            <div key={c.title}>
              <h3 className="kicker text-void/60">{c.title}</h3>
              <ul className="mt-4 space-y-1">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="inline-flex min-h-11 items-center text-base text-void/85 transition-colors hover:text-void"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p aria-hidden className="display mt-16 select-none whitespace-nowrap text-[23vw] leading-[0.8] text-void md:text-[min(23vw,330px)]">
          Site<span className="text-volt">Blitz</span>
        </p>

        <div className="mt-8 flex flex-col gap-3 border-t border-void/15 pt-6 text-sm text-void/70 md:flex-row md:items-start md:justify-between">
          <p>© {new Date().getFullYear()} SiteBlitz. Demo websites are concept demonstrations, not client projects.</p>
          <PhotoCredits ids={SITE_PHOTO_IDS} className="max-w-[70ch] md:text-right" />
        </div>
      </div>
    </footer>
  );
}
