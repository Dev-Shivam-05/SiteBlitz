import type { Metadata } from "next";
import Link from "next/link";
import { Shell } from "@/components/site/Shell";
import { Magnetic } from "@/components/site/Magnetic";
import { FAQS, PROCESS_STEPS, SITE } from "@/lib/site";
import { PACKAGES, READY_TO_BUILD, inr, launchPkg } from "@/lib/offer";

/* Commercial page for "website in 48 hours" searches (SEO phase, agreed in
   docs/debate/2026-10-31-redesign-seo-direction). Every scope, price and timing statement comes from
   src/lib/offer.ts and FAQS / PROCESS_STEPS in site.ts — nothing here is new copy about the offer.
   /process holds the hour-by-hour timeline; this page answers "is the 48-hour plan right for me?". */

const launch = launchPkg;
const others = PACKAGES.filter((p) => p.id !== "launch");
const faq = (q: string) => FAQS.find((f) => f.q === q);
const PAGE_FAQS = [
  faq("How fast can you deliver?"),
  faq("What if I don't like the concept?"),
  faq("Are there monthly charges or hidden costs?"),
  faq("Who owns the website and the domain?"),
  faq("Will my website show up on Google?"),
].filter((f): f is (typeof FAQS)[number] => Boolean(f));

export const metadata: Metadata = {
  title: "Business Websites in as Little as 48 Hours",
  description:
    "A one-page business website for ₹7,999, delivered in 2 working days (48 hours) once your content is ready. See what's included, what you provide and the terms.",
  alternates: { canonical: "/website-in-48-hours" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Business website in as little as 48 hours (Launch plan)",
      serviceType: "Website design and development",
      provider: { "@id": `${SITE.url}/#organization` },
      areaServed: "India",
      offers: {
        "@type": "Offer",
        priceCurrency: "INR",
        price: String(launch.priceInr),
        url: `${SITE.url}/website-in-48-hours`,
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Website in 48 hours", item: `${SITE.url}/website-in-48-hours` },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: PAGE_FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function WebsiteIn48HoursPage() {
  return (
    <Shell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="mx-auto max-w-7xl px-5 pb-12 pt-32 md:px-8 md:pt-44">
        <p className="text-xs uppercase tracking-[0.25em] text-volt">Launch plan</p>
        <h1 className="font-display mt-3 max-w-5xl text-5xl font-bold leading-[1.02] tracking-tight md:text-8xl">
          A business website in <span className="text-volt">48 hours</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          {launch.tagline} {inr(launch.priceInr as number)}, one-time, no GST added. Delivered in 2 working days
          once your content and approvals are in, and you review the design before paying.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Magnetic>
            <a
              href={SITE.whatsapp("Hi SiteBlitz, I'm interested in the one-page Launch website. My business is: ")}
              target="_blank"
              rel="noopener noreferrer"
              data-track="w48_cta_whatsapp_primary"
              className="btn-volt block rounded-full px-7 py-4 text-sm font-semibold md:text-base"
            >
              Ask about Launch on WhatsApp
            </a>
          </Magnetic>
          <Link href="/demo/salon" data-track="w48_cta_demo" className="btn-ghost block rounded-full px-7 py-4 text-sm text-ink md:text-base">
            See a working demo
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-20 px-5 pb-24 md:px-8 md:pb-32">
        <section>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl" data-anim="fade-up">
            Is the 48-hour Launch plan right for you?
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted">
            The 48-hour (2 working day) delivery applies to the <strong className="text-ink">Launch</strong> package:
            a single, focused page. It fits a business that needs a professional link to share and an easy way
            for customers to call or WhatsApp. The clock starts once the project is ready to build. If you need
            several pages, a store or bookings, see the larger packages below.
          </p>
        </section>

        <section>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl" data-anim="fade-up">
            What&apos;s included in the Launch plan?
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {launch.includes.map((f) => (
              <li key={f} className="flex gap-3 rounded-2xl border border-line bg-surface p-5 text-sm text-ink">
                <span className="text-volt" aria-hidden>✦</span>
                {f}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-faint">
            Every site is built mobile-first and tested for speed on a phone before handover.
          </p>
        </section>

        <section>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl" data-anim="fade-up">
            What do we need from you? (&ldquo;ready to build&rdquo;)
          </h2>
          <ol className="mt-5 list-decimal space-y-1 pl-5 text-base leading-relaxed text-muted">
            {READY_TO_BUILD.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl" data-anim="fade-up">
            How our four-step process works
          </h2>
          <ol className="mt-6 divide-y divide-line border-y border-line">
            {PROCESS_STEPS.map((s) => (
              <li key={s.n} className="grid gap-2 py-5 sm:grid-cols-[4rem_1fr_auto] sm:items-baseline sm:gap-6">
                <span className="font-display text-2xl font-bold text-volt">{s.n}</span>
                <div>
                  <h3 className="font-display text-lg font-bold">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{s.text}</p>
                </div>
                <span className="text-xs uppercase tracking-widest text-faint">{s.time}</span>
              </li>
            ))}
          </ol>

        </section>

        <section>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl" data-anim="fade-up">
            What if your website needs more time?
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {others.map((p) => (
              <div key={p.id} className="rounded-2xl border border-line bg-surface p-6">
                <p className="font-display text-xl font-bold">
                  {p.name} <span className="text-faint">· {p.delivery}</span>
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.tagline}</p>
                <p className="font-display mt-4 text-2xl font-bold">
                  {p.priceInr ? `${inr(p.priceInr)} one-time` : "By quote"}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl" data-anim="fade-up">
            Pricing, payment and ownership
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted">
            Launch is {inr(launch.priceInr as number)} one-time, paid in two parts: {inr(launch.payments![0])} after
            you approve the design and scope, {inr(launch.payments![1])} after you approve the finished site. Domain
            and hosting costs are written in your quote. Full terms are on the{" "}
            <Link href="/pricing#terms" className="text-volt hover:underline">pricing page</Link>.
          </p>
        </section>

        <section>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl" data-anim="fade-up">
            Frequently asked questions
          </h2>
          <div className="mt-6 divide-y divide-line border-y border-line">
            {PAGE_FAQS.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="shrink-0 text-volt transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </Shell>
  );
}
