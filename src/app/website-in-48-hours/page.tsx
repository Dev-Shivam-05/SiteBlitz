import Link from "next/link";
import { Shell } from "@/components/site/Shell";
import { Magnetic } from "@/components/site/Magnetic";
import { FAQS, PROCESS_STEPS, SITE } from "@/lib/site";
import { PACKAGES, READY_TO_BUILD, inr, launchPkg } from "@/lib/offer";
import { PAGES } from "@/lib/pages";
import { absUrl, breadcrumbNode, faqNode, graph, pageMeta, serviceNode, webPageNode, type Crumb } from "@/lib/seo";
import { JsonLd } from "@/components/site/JsonLd";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";

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

const PATH = PAGES.in48.path;
const TITLE = "One-Page Website in 48 Hours (2 Working Days)";
const DESCRIPTION = `A one-page business website for ${inr(
  launchPkg.priceInr as number
)}, live 2 working days after ready-to-build. What is included, what you provide and what starts the clock.`;
const CRUMBS: Crumb[] = [{ name: "Website in 48 hours", path: PATH }];

export const metadata = pageMeta({ title: TITLE, description: DESCRIPTION, path: PATH });

const jsonLd = graph(
  webPageNode({ path: PATH, name: TITLE, description: DESCRIPTION, crumbs: CRUMBS, dateModified: PAGES.in48.updated, about: { "@id": `${absUrl(PATH)}#service` } }),
  breadcrumbNode(CRUMBS),
  serviceNode({
    path: PATH,
    name: "One-page business website, 2 working days after ready-to-build (Launch)",
    serviceType: "Website design and development",
    description: DESCRIPTION,
    priceInr: launchPkg.priceInr,
  }),
  faqNode(PATH, PAGE_FAQS)
);

export default function WebsiteIn48HoursPage() {
  return (
    <Shell>
      <JsonLd data={jsonLd} />

      <section className="mx-auto max-w-7xl px-5 pb-12 pt-32 md:px-8 md:pt-44">
        <Breadcrumbs crumbs={CRUMBS} className="ph-soft mb-8" />
        <p className="kicker text-volt">Launch plan · one page</p>
        <h1 className="display mt-4 max-w-5xl text-[clamp(40px,11vw,60px)] md:text-[clamp(64px,7vw,120px)]">
          A one-page website in <span className="serif text-volt">48 hours.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          {launch.tagline} {inr(launch.priceInr as number)}, one-time, no GST added. Live 2 working days
          after ready-to-build: your content, approvals, access and first payment are in. You see the design direction
          before you pay.
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
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
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
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
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
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            What do we need from you? (&ldquo;ready to build&rdquo;)
          </h2>
          <ol className="mt-5 list-decimal space-y-1 pl-5 text-base leading-relaxed text-muted">
            {READY_TO_BUILD.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
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
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
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
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
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
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
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
