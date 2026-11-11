import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Shell } from "@/components/site/Shell";
import { ConceptFrame } from "@/components/site/ConceptFrame";
import { PageHero } from "@/components/site/PageHero";
import { JsonLd } from "@/components/site/JsonLd";
import { Magnetic } from "@/components/site/Magnetic";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { Close, Stroke } from "@/components/site/sections/Home";
import { DEEP_SERVICES, getService } from "@/content";
import { SITE, WORK_ITEMS } from "@/lib/site";
import { fromPrice, inr } from "@/lib/offer";
import { PAGES } from "@/lib/pages";
import { breadcrumbNode, faqNode, graph, pageMeta, serviceNode, webPageNode, type Crumb } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return DEEP_SERVICES.map((s) => ({ slug: s.slug }));
}

const pathOf = (slug: string) => `/services/${slug}`;
const metaDescription = (promise: string) => (promise.length <= 155 ? promise : `${promise.slice(0, 152).replace(/\s+\S*$/, "")}…`);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return pageMeta({ title: s.metaTitle ?? s.name, description: metaDescription(s.promise), path: pathOf(s.slug) });
}

/** "*phrase*" in a service headline becomes the Instrument Serif volt accent of the v4 display type. */
function AccentV4({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*(.+?)\*/).map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="serif text-volt">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

/** /services/[slug] (SEO-3): one service on the v4 layout. Hero with the price drawn in, what is included, the four
 *  steps on a drawn line (the scroll moment), concept studies, questions and the volt close. */
export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const path = pathOf(s.slug);
  const crumbs: Crumb[] = [
    { name: "Services", path: PAGES.services.path },
    { name: s.name, path },
  ];
  const related = WORK_ITEMS.filter((w) => s.relatedWorkSlugs.includes(w.slug));
  const others = DEEP_SERVICES.filter((d) => d.slug !== s.slug).slice(0, 3);
  const priced = s.startingPriceINR > 0;

  const ld = graph(
    webPageNode({ path, name: s.metaTitle ?? s.name, description: metaDescription(s.promise), crumbs, dateModified: PAGES.services.updated, about: { "@id": `${SITE.url}${path}#service` } }),
    breadcrumbNode(crumbs),
    serviceNode({ path, name: s.name, serviceType: s.name, description: s.promise, priceInr: s.startingPriceINR }),
    faqNode(path, s.faqs)
  );

  return (
    <Shell>
      <JsonLd data={ld} />
      <PageHero
        size="lg"
        crumbs={crumbs}
        kicker={s.eyebrow}
        lines={[<AccentV4 key="h" text={s.headline} />]}
        lead={<p>{s.promise}</p>}
        actions={
          <>
            <Magnetic strength={0.3}>
              <a
                href={SITE.whatsapp(`Hi SiteBlitz, I'm interested in ${s.name}. My business is: `)}
                target="_blank"
                rel="noopener noreferrer"
                data-track={`service_hero_wa_${s.slug}`}
                className="btn-volt inline-flex h-[52px] items-center gap-2 rounded-full px-7 text-base font-semibold"
              >
                <WhatsAppIcon className="h-5 w-5" color="currentColor" /> Ask about {s.name}
              </a>
            </Magnetic>
            <Link href={PAGES.pricing.path} className="btn-line inline-flex h-[52px] items-center rounded-full px-7 text-base font-semibold">
              Prices &amp; terms
            </Link>
          </>
        }
        aside={
          <div className="relative w-fit">
            <p className="kicker text-muted">{priced ? "From" : "Price"}</p>
            <p className="display relative mt-3 text-[clamp(56px,16vw,96px)] leading-none md:text-[clamp(80px,7vw,128px)]">
              {priced ? inr(s.startingPriceINR) : "Quote"}
              <Stroke
                now
                viewBox="0 0 300 24"
                d="M4 15 C 60 5, 120 3, 182 9 S 268 21, 296 7"
                className="absolute -bottom-[0.18em] left-0 h-[0.2em] w-full text-volt"
              />
            </p>
            <p className="kicker mt-8 max-w-[28ch] text-volt">{s.timeline}</p>
          </div>
        }
      />

      <section aria-labelledby="included-title" className="border-t border-line bg-void py-[12vh]">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <p className="kicker text-volt">What you get</p>
          <h2 id="included-title" className="display mt-4 text-[clamp(32px,8vw,44px)] md:text-[clamp(44px,3.8vw,68px)]">
            Included, <span className="serif text-volt">in writing.</span>
          </h2>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 [&>*]:min-w-0">
            {s.included.map((inc, i) => (
              <li key={inc.title} className="rounded-2xl border border-line bg-surface p-7 transition-colors duration-300 hover:border-volt/40">
                <p className="display text-sm text-volt">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 text-xl font-semibold">{inc.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted">{inc.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="steps-title" className="border-t border-line bg-void py-[12vh]">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <p className="kicker text-volt">How it runs</p>
          <h2 id="steps-title" className="display mt-4 text-[clamp(32px,8vw,44px)] md:text-[clamp(44px,3.8vw,68px)]">
            Four steps, <span className="serif text-volt">start to launch.</span>
          </h2>
          <div className="relative mt-14">
            <Stroke
              viewBox="0 0 1000 40"
              d="M 0 20 C 120 4, 250 36, 375 20 S 625 4, 750 20 S 900 36, 1000 20"
              className="absolute inset-x-0 top-0 hidden h-10 w-full text-volt md:block"
            />
            <ol className="grid gap-10 md:grid-cols-4 md:gap-8 md:pt-16 [&>*]:min-w-0">
              {s.process.map((p, i) => (
                <li key={p.step}>
                  {/* the <ol> already numbers the steps for assistive tech; ink/40 keeps the big numeral at 3.5:1 (large-text AA) */}
                  <p aria-hidden className="display text-[56px] leading-none text-ink/40 md:text-[80px]">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-4 text-xl font-semibold">{p.step}</h3>
                  <p className="kicker mt-2 text-volt">{p.time}</p>
                  <p className="mt-3 text-base leading-relaxed text-muted">{p.text}</p>
                </li>
              ))}
            </ol>
          </div>
          <ul className="mt-12 flex flex-wrap gap-2">
            {s.stack.map((t) => (
              <li key={t} className="rounded-full border border-line px-4 py-2 text-sm text-ink/80">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="work-title" className="border-t border-line bg-void py-[12vh]">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8">
            <p className="kicker text-volt">Concept studies</p>
            <h2 id="work-title" className="display mt-4 text-[clamp(32px,8vw,44px)] md:text-[clamp(44px,3.8vw,68px)]">
              What this <span className="serif text-volt">looks like.</span>
            </h2>
            <p className="mt-5 max-w-[60ch] text-base text-muted">
              Concept studies, not client projects. We publish a case study only with a client&rsquo;s permission and
              numbers we can show.
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-2 [&>*]:min-w-0">
              {related.map((w) => (
                <Link
                  key={w.slug}
                  href={`${PAGES.work.path}#${w.slug}`}
                  data-track={`service_work_${w.slug}`}
                  className="group overflow-hidden rounded-2xl border border-line bg-void transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-volt/40"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <ConceptFrame title={w.title} goal={w.goal} />
                  </div>
                  <div className="flex items-center justify-between p-5">
                    <div>
                      <h3 className="font-semibold">{w.title}</h3>
                      <p className="text-sm text-faint">{w.category}</p>
                    </div>
                    <span aria-hidden className="text-faint transition-all group-hover:translate-x-1 group-hover:text-volt">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section aria-labelledby="faq-title" className="border-t border-line bg-void py-[12vh]">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-4 md:grid-cols-[4fr_8fr] md:gap-16 md:px-8 [&>*]:min-w-0">
          <div>
            <p className="kicker text-volt">Questions</p>
            <h2 id="faq-title" className="display mt-4 text-[clamp(32px,8vw,44px)] md:text-[clamp(44px,3.8vw,68px)]">
              Straight <span className="serif text-volt">answers.</span>
            </h2>
            <p className="mt-6 text-base text-muted">
              More on{" "}
              <Link href={PAGES.faq.path} className="text-ink underline underline-offset-4 hover:text-volt">
                the FAQ page
              </Link>{" "}
              and{" "}
              <Link href={PAGES.pricing.path} className="text-ink underline underline-offset-4 hover:text-volt">
                prices &amp; terms
              </Link>
              .
            </p>
          </div>
          <div className="border-t border-ink/15">
            {s.faqs.map((f) => (
              <details key={f.q} className="faq-item group border-b border-ink/15">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-lg font-semibold">
                  <h3 className="font-semibold">{f.q}</h3>
                  <span
                    aria-hidden
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-xl text-volt transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-[62ch] pb-6 text-base leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <nav aria-label="Other services" className="border-t border-line bg-void py-12">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-3 px-4 md:px-8">
          <span className="kicker mr-2 text-faint">Other services</span>
          {others.map((o) => (
            <Link key={o.slug} href={pathOf(o.slug)} className="pill inline-flex min-h-11 items-center px-5 text-sm font-semibold">
              {o.name} <span className="ml-2 text-faint">{o.startingPriceINR > 0 ? fromPrice(o.startingPriceINR) : "quote"}</span>
            </Link>
          ))}
        </div>
      </nav>

      <Close />
    </Shell>
  );
}
