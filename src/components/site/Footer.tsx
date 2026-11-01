import Link from "next/link";
import { SITE } from "@/lib/site";
import { FROM_PRICE, inr } from "@/lib/offer";

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

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <p className="font-display text-xl font-extrabold tracking-tight">
              Site<span className="text-volt">Blitz</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              Professional business websites with upfront prices from {inr(FROM_PRICE)}, written scope and clear
              ownership.
            </p>
            <p className="mt-4 text-sm text-muted">{SITE.locationLine}</p>
            <a
              href={SITE.whatsapp("Hi SiteBlitz, I want to discuss a website for my business.")}
              target="_blank"
              rel="noopener noreferrer"
              data-track="footer_whatsapp"
              className="mt-4 inline-block text-sm font-semibold text-volt underline-offset-4 hover:underline"
            >
              WhatsApp {SITE.phone}
            </a>
            {SITE.emailLive && (
              <a href={`mailto:${SITE.email}`} className="mt-1 block text-sm text-muted hover:text-ink" data-track="footer_email">
                {SITE.email}
              </a>
            )}
            <p className="mt-1 text-xs text-faint">Replies {SITE.replyHours}</p>
          </div>
          {COLUMNS.map((c) => (
            <div key={c.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-faint">{c.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-muted transition-colors hover:text-ink">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-faint md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} SiteBlitz. All rights reserved.</p>
          <p>Demo websites are SiteBlitz concept demonstrations, not completed client projects.</p>
        </div>
      </div>
    </footer>
  );
}
