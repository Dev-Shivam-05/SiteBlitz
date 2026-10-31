import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Shell } from "@/components/site/Shell";
import { ConceptFrame } from "@/components/site/ConceptFrame";
import { Accent } from "@/components/site/Accent";
import { Magnetic } from "@/components/site/Magnetic";
import { DEEP_SERVICES, getService } from "@/content";
import { SITE, WORK_ITEMS } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return DEEP_SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: `${s.name} — from ₹${s.startingPriceINR.toLocaleString("en-IN")} | SiteBlitz`,
    description: s.promise.slice(0, 155),
    alternates: { canonical: `/services/${s.slug}` },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const related = WORK_ITEMS.filter((w) => s.relatedWorkSlugs.includes(w.slug));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: s.name,
        serviceType: s.name,
        description: s.promise,
        provider: { "@type": "ProfessionalService", name: SITE.name, url: SITE.url },
        areaServed: ["India", "Worldwide"],
        offers: {
          "@type": "Offer",
          priceCurrency: "INR",
          price: String(s.startingPriceINR),
          url: `${SITE.url}/services/${s.slug}`,
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: s.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <Shell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* hero */}
      <section className="mx-auto max-w-7xl px-5 pb-14 pt-32 md:px-8 md:pt-44">
        <p className="text-xs uppercase tracking-[0.25em] text-volt" data-anim="fade-up" data-now>
          {s.eyebrow}
        </p>
        <h1
          className="font-display mt-3 max-w-4xl text-4xl font-bold leading-[1.02] tracking-tight md:text-7xl"
          data-anim="chars"
          data-now
        >
          <Accent text={s.headline} />
        </h1>
        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-xl text-base leading-relaxed text-muted md:text-lg" data-anim="fade-up" data-now data-delay="0.3">
            {s.promise}
          </p>
          <div className="flex shrink-0 flex-wrap items-center gap-6" data-anim="fade-up" data-now data-delay="0.4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-faint">from</p>
              <p className="font-display text-3xl font-bold tabular-nums">
                ₹{s.startingPriceINR.toLocaleString("en-IN")}
                <span className="ml-2 text-base text-muted">/ ${s.startingPriceUSD}</span>
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-faint">timeline</p>
              <p className="font-display text-3xl font-bold text-volt">{s.timeline}</p>
            </div>
          </div>
        </div>
      </section>

      {/* what's included */}
      <section className="border-y border-line bg-surface/40">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl" data-anim="fade-up">
            What&rsquo;s included<span className="text-volt">.</span> Exactly<span className="text-volt">.</span>
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {s.included.map((inc, i) => (
              <div
                key={inc.title}
                className="rounded-2xl border border-line bg-void p-6"
                data-anim="scale-in"
                data-delay={String((i % 3) * 0.08)}
              >
                <p className="font-display text-xs font-bold tabular-nums text-volt">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display mt-3 text-lg font-bold">{inc.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{inc.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* process */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl" data-anim="fade-up">
          How it runs
        </h2>
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
          {s.process.map((p) => (
            <div key={p.step} className="group bg-void p-7 transition-colors duration-300 hover:bg-surface">
              <p className="font-display text-xs font-bold uppercase tracking-widest text-volt">{p.time}</p>
              <h3 className="font-display mt-3 text-xl font-bold">{p.step}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{p.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-2" data-anim="fade-up">
          {s.stack.map((t) => (
            <span key={t} className="rounded-full border border-line px-3 py-1.5 text-xs tracking-wide text-faint">
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* related work */}
      {related.length > 0 && (
        <section className="border-y border-line bg-surface/40">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl" data-anim="fade-up">
              What this looks like
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted" data-anim="fade-up">
              Concept studies, not client projects — we publish case studies only with permission and numbers we can show.
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {related.map((w) => (
                <Link
                  key={w.slug}
                  href={`/work#${w.slug}`}
                  data-track={`service_work_${w.slug}`}
                  data-cursor-label="View"
                  className="group overflow-hidden rounded-2xl border border-line bg-void transition-colors hover:border-volt/30"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <ConceptFrame title={w.title} goal={w.goal} />
                  </div>
                  <div className="flex items-center justify-between p-5">
                    <div>
                      <h3 className="font-display font-bold">{w.title}</h3>
                      <p className="text-xs text-faint">{w.category}</p>
                    </div>
                    <span className="text-faint transition-all group-hover:translate-x-1 group-hover:text-volt">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* faqs */}
      <section className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-24">
        <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl" data-anim="fade-up">
          Straight answers
        </h2>
        <div className="mt-8 divide-y divide-line border-y border-line">
          {s.faqs.map((f) => (
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

      {/* cta */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-5xl px-5 py-20 text-center md:px-8 md:py-28">
          <p className="font-accent text-xl italic text-muted" data-anim="fade-up">
            {s.cta}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4" data-anim="fade-up">
            <Magnetic>
              <Link
                href="/contact"
                data-track={`service_cta_${s.slug}`}
                className="btn-volt block rounded-full px-8 py-4 text-base font-semibold"
              >
                Start with a free brief →
              </Link>
            </Magnetic>
            <a
              href={SITE.whatsapp(`Hi SiteBlitz! I'm interested in ${s.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              data-track={`service_wa_${s.slug}`}
              className="btn-ghost rounded-full px-8 py-4 text-base text-ink"
            >
              WhatsApp us
            </a>
          </div>
          <p className="mt-5 text-xs text-faint">
            From ₹{s.startingPriceINR.toLocaleString("en-IN")} / ${s.startingPriceUSD} · {s.timeline} · no advance until you approve the direction
          </p>
        </div>
      </section>
    </Shell>
  );
}
