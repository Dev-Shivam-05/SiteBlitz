import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Shell } from "@/components/site/Shell";
import { ConceptFrame } from "@/components/site/ConceptFrame";
import { PageHero } from "@/components/site/PageHero";
import { JsonLd } from "@/components/site/JsonLd";
import { FROM_PRICE, inr } from "@/lib/offer";
import { absUrl, breadcrumbNode, faqNode, graph, pageMeta, serviceNode, webPageNode, type Crumb } from "@/lib/seo";
import { Magnetic } from "@/components/site/Magnetic";
import { INDUSTRY_LANDERS, getLander } from "@/content";
import { SITE, WORK_ITEMS } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return INDUSTRY_LANDERS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const l = getLander(slug);
  if (!l) return {};
  return pageMeta({ title: l.metaTitle, description: l.metaDescription, path: `/for/${l.slug}` });
}

export default async function LanderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const l = getLander(slug);
  if (!l) notFound();
  const anchor = WORK_ITEMS.find((w) => w.slug === l.anchorWorkSlug);

  const path = `/for/${l.slug}`;
  const crumbs: Crumb[] = [{ name: `Websites for ${l.industry}`, path }];
  const jsonLd = graph(
    webPageNode({ path, name: l.metaTitle, description: l.metaDescription, crumbs, about: { "@id": `${absUrl(path)}#service` } }),
    breadcrumbNode(crumbs),
    serviceNode({
      path,
      name: `Website design for ${l.industry.toLowerCase()}`,
      serviceType: "Website design",
      description: l.metaDescription,
      priceInr: FROM_PRICE,
    }),
    faqNode(path, l.faqs)
  );

  return (
    <Shell>
      <JsonLd data={jsonLd} />
      <PageHero
        size="lg"
        crumbs={crumbs}
        kicker={`Websites for ${l.industry}`}
        lines={[
          <span key="h">
            {l.headline.split(/\*(.+?)\*/).map((part, i) =>
              i % 2 === 1 ? (
                <span key={i} className="serif text-volt">
                  {part}
                </span>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </span>,
        ]}
        lead={<p>{l.sub}</p>}
        actions={
          <Link href="/pricing" className="btn-line inline-flex h-[52px] items-center rounded-full px-7 text-base font-semibold">
            Prices from {inr(FROM_PRICE)}
          </Link>
        }
      />

      <section className="border-y border-line bg-surface/40">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            Why most {l.industry.toLowerCase()} websites don&rsquo;t work
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {l.painPoints.map((p, i) => (
              <div key={p.title} className="rounded-2xl border border-line bg-void p-6">
                <span className="text-2xl text-volt">✕</span>
                <h3 className="font-display mt-3 text-lg font-bold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
          What yours will do instead
        </h2>
        <div className="mt-8 space-y-3">
          {l.mustHaves.map((m, i) => (
            <div key={m.title} className="flex gap-5 rounded-2xl border border-line bg-surface p-5 md:items-center">
              <span className="font-display shrink-0 text-sm font-bold tabular-nums text-volt">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display font-bold">{m.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{m.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {anchor && (
        <section className="border-y border-line bg-surface/40">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
            <p className="text-xs uppercase tracking-[0.25em] text-volt">How we would build yours</p>
            <div className="mt-6 grid items-center gap-8 md:grid-cols-2">
              <Link href={`/work#${anchor.slug}`} data-cursor-label="View" className="group relative block aspect-[16/10] overflow-hidden rounded-2xl border border-line">
                <ConceptFrame title={anchor.title} goal={anchor.goal} />
              </Link>
              <div>
                <h2 className="font-display text-3xl font-bold md:text-4xl">{anchor.title}</h2>
                <p className="mt-1 text-sm text-faint">{anchor.category}</p>
                <p className="font-display mt-4 inline-block rounded-full border border-volt/40 bg-volt/10 px-4 py-2 text-sm font-bold text-volt">
                  {anchor.goal}
                </p>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">{anchor.story}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-20">
        <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
          Questions {l.industry.toLowerCase()} ask us
        </h2>
        <div className="mt-8 divide-y divide-line border-y border-line">
          {l.faqs.map((f) => (
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

      <section className="border-t border-line">
        <div className="mx-auto max-w-5xl px-5 py-20 text-center md:px-8 md:py-28">
          <p className="font-accent text-xl italic text-muted">{l.cta}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <Link href="/contact" data-track={`lander_cta_${l.slug}`} className="btn-volt block rounded-full px-8 py-4 text-base font-semibold">
                Start your build →
              </Link>
            </Magnetic>
            <a
              href={SITE.whatsapp(`Hi SiteBlitz! I run a business in ${l.industry} and need a website.`)}
              target="_blank"
              rel="noopener noreferrer"
              data-track={`lander_wa_${l.slug}`}
              className="btn-ghost rounded-full px-8 py-4 text-base text-ink"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      </section>
    </Shell>
  );
}
