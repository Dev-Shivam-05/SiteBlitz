import type { Metadata } from "next";
import Link from "next/link";
import { Shell } from "@/components/site/Shell";
import { Magnetic } from "@/components/site/Magnetic";
import { FAQS, PLANS, PROCESS_STEPS, SITE } from "@/lib/site";

/* Commercial page for "website in 48 hours" searches (SEO phase, agreed in
   docs/debate/2026-10-31-redesign-seo-direction). Every scope, price and timing statement comes from
   PLANS / FAQS / PROCESS_STEPS in site.ts or the terms — nothing here is new copy about the offer.
   /process holds the hour-by-hour timeline; this page answers "is the 48-hour plan right for me?". */

const launch = PLANS[0];
const growth = PLANS[1];
const scale = PLANS[2];
const faq = (q: string) => FAQS.find((f) => f.q === q);
const inputsFaq = faq("What do I need to provide?");
const speedFaq = faq("How can you deliver a real website in 48 hours?");
const PAGE_FAQS = [
  speedFaq,
  inputsFaq,
  faq("What if I don't like the design?"),
  faq("What happens after launch?"),
  faq("Will my website show up on Google?"),
].filter((f): f is (typeof FAQS)[number] => Boolean(f));

export const metadata: Metadata = {
  title: { absolute: "Business Websites in As Little As 48 Hours | SiteBlitz" },
  description:
    "Launch plan websites from ₹7,999 / $99, delivered in as little as 48 hours. See what's included, what you provide, the process and ownership terms.",
  alternates: { canonical: "/website-in-48-hours" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Business website in as little as 48 hours (Launch plan)",
      serviceType: "Website design and development",
      provider: { "@type": "ProfessionalService", name: SITE.name, url: SITE.url },
      areaServed: ["India", "Worldwide"],
      offers: {
        "@type": "Offer",
        priceCurrency: "INR",
        price: String(launch.priceINR),
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

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export default function WebsiteIn48HoursPage() {
  return (
    <Shell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="mx-auto max-w-7xl px-5 pb-12 pt-32 md:px-8 md:pt-44">
        <p className="text-xs uppercase tracking-[0.25em] text-volt">Launch plan</p>
        <h1 className="font-display mt-3 max-w-5xl text-5xl font-bold leading-[1.02] tracking-tight md:text-8xl">
          A business website in as little as <span className="font-accent italic text-volt">48 hours</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          {launch.blurb} {inr(launch.priceINR)} / ${launch.priceUSD}, one-time — and the code, content and
          domain are yours after full payment.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Magnetic>
            <Link href="/contact" data-track="w48_cta_start" className="btn-volt block rounded-full px-7 py-4 text-sm font-semibold md:text-base">
              Start a project →
            </Link>
          </Magnetic>
          <a
            href={SITE.whatsapp("Hi SiteBlitz! I'm interested in the 48-hour Launch plan.")}
            target="_blank"
            rel="noopener noreferrer"
            data-track="w48_cta_whatsapp"
            className="btn-ghost block rounded-full px-7 py-4 text-sm text-ink md:text-base"
          >
            Ask on WhatsApp
          </a>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-20 px-5 pb-24 md:px-8 md:pb-32">
        <section>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl" data-anim="fade-up">
            Is the 48-hour Launch plan right for you?
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted">
            The 48-hour delivery applies to the <strong className="text-ink">Launch</strong> plan: a single,
            conversion-focused page. It fits a business that needs to look established and start getting
            calls and WhatsApp enquiries quickly — one clear offer, one main action. If you need several
            pages, a store or bookings, see the larger plans below.
          </p>
        </section>

        <section>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl" data-anim="fade-up">
            What&apos;s included in the Launch plan?
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {launch.features.map((f) => (
              <li key={f} className="flex gap-3 rounded-2xl border border-line bg-surface p-5 text-sm text-ink">
                <span className="text-volt" aria-hidden>✦</span>
                {f}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-faint">
            &ldquo;90+ Lighthouse&rdquo; is the performance target every build is engineered to; you can see
            how this site itself measures on <Link href="/proof" className="text-volt hover:underline">/proof</Link>.
          </p>
        </section>

        {inputsFaq && (
          <section>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl" data-anim="fade-up">
              What do we need from you?
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted">{inputsFaq.a}</p>
          </section>
        )}

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
          <p className="mt-4 text-sm text-muted">
            Want it hour by hour?{" "}
            <Link href="/process" className="text-volt hover:underline">See the full 48-hour timeline →</Link>
          </p>
        </section>

        <section>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl" data-anim="fade-up">
            What if your website needs more time?
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {[growth, scale].map((p) => (
              <div key={p.id} className="rounded-2xl border border-line bg-surface p-6">
                <p className="font-display text-xl font-bold">
                  {p.name} <span className="text-faint">· {p.delivery}</span>
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.blurb}</p>
                <p className="font-display mt-4 text-2xl font-bold">
                  {inr(p.priceINR)} <span className="text-sm font-normal text-faint">/ ${p.priceUSD} one-time</span>
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
            The Launch plan is {inr(launch.priceINR)} (${launch.priceUSD}) as a one-time price. Payment terms
            are in our <Link href="/terms" className="text-volt hover:underline">terms</Link>: on full payment,
            you own the delivered website, its code, content and your domain. Every plan and what it
            includes is on the <Link href="/pricing" className="text-volt hover:underline">pricing page</Link>.
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
