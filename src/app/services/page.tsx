import Link from "next/link";
import { Shell } from "@/components/site/Shell";
import { HeroFigure, PageHero } from "@/components/site/PageHero";
import { JsonLd } from "@/components/site/JsonLd";
import { Close, Process } from "@/components/site/sections/Home";
import { DEEP_SERVICES } from "@/content";
import { businessPkg, fromPrice, inr, launchPkg } from "@/lib/offer";
import { SERVICE_FIT, SERVICE_LINES } from "@/lib/site";
import { PAGES } from "@/lib/pages";
import { absUrl, breadcrumbNode, graph, pageMeta, serviceNode, webPageNode, type Crumb } from "@/lib/seo";

const PATH = PAGES.services.path;
const TITLE = "Website Design & Development Services";
const DESCRIPTION = `Business websites (${inr(launchPkg.priceInr as number)} one page, ${inr(
  businessPkg.priceInr as number
)} three pages), landing pages, online stores and booking, SEO, maintenance and rescue work, scoped in writing.`;
const CRUMBS: Crumb[] = [{ name: "Services", path: PATH }];

export const metadata = pageMeta({ title: TITLE, description: DESCRIPTION, path: PATH });

const ld = graph(
  webPageNode({ path: PATH, name: TITLE, description: DESCRIPTION, type: "CollectionPage", crumbs: CRUMBS, dateModified: PAGES.services.updated, about: { "@id": `${absUrl(PATH)}#services` } }),
  breadcrumbNode(CRUMBS),
  {
    "@type": "ItemList",
    "@id": `${absUrl(PATH)}#services`,
    name: "SiteBlitz services",
    itemListElement: DEEP_SERVICES.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: serviceNode({
        path: `/services/${s.slug}`,
        name: s.name,
        serviceType: s.name,
        description: SERVICE_LINES[s.slug] ?? s.promise,
        priceInr: s.startingPriceINR,
      }),
    })),
  }
);

/** /services (SEO-3): the six services as one index. The moment is the row that fills with volt under the pointer;
 *  the second is the drawn process path shared with the home page. */
export default function ServicesPage() {
  return (
    <Shell>
      <JsonLd data={ld} />
      <PageHero
        crumbs={CRUMBS}
        kicker="Services"
        lines={["Website services,", <span key="s" className="serif text-volt">scoped in writing.</span>]}
        lead={
          <p>
            Two fixed prices for business websites: {inr(launchPkg.priceInr as number)} for one page and{" "}
            {inr(businessPkg.priceInr as number)} for three. Online stores, booking, SEO work, maintenance and rescues are
            quoted in writing before any work starts.
          </p>
        }
        aside={
          <HeroFigure
            rows={[
              { value: inr(launchPkg.priceInr as number), label: "1 page" },
              { value: inr(businessPkg.priceInr as number), label: "3 pages" },
            ]}
            caption="One-time build prices, no GST added. Everything else by written quote."
          />
        }
      />

      <section aria-labelledby="index-title" className="bg-void pb-[12vh]">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <h2 id="index-title" className="sr-only">
            All services
          </h2>
          <ol className="border-t border-ink/15">
            {DEEP_SERVICES.map((s, i) => (
              <li key={s.slug} className="border-b border-ink/15">
                <Link
                  href={`/services/${s.slug}`}
                  data-track={`services_row_${s.slug}`}
                  className="svc-row grid items-center gap-x-6 gap-y-2 px-2 py-7 md:grid-cols-[4rem_minmax(0,1.1fr)_minmax(0,1.3fr)_12rem_3.5rem] md:px-4 md:py-9 [&>*]:min-w-0"
                >
                  <span className="display svc-muted text-sm text-volt">{String(i + 1).padStart(2, "0")}</span>
                  <span className="display text-[clamp(28px,7.4vw,40px)] md:text-[clamp(32px,2.8vw,52px)]">{s.name}</span>
                  <span className="svc-muted text-base leading-relaxed text-muted">{SERVICE_LINES[s.slug]}</span>
                  <span className="svc-muted text-sm font-semibold text-ink/85 md:text-right">
                    {s.startingPriceINR > 0 ? fromPrice(s.startingPriceINR) : "Written quote"}
                  </span>
                  <span
                    aria-hidden
                    className="svc-arrow hidden h-12 w-12 items-center justify-center justify-self-end rounded-full border border-line text-lg transition-all duration-300 md:flex"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="fit-title" className="border-t border-line bg-void py-[12vh]">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-4 md:grid-cols-[4fr_8fr] md:gap-16 md:px-8 [&>*]:min-w-0">
          <div>
            <p className="kicker text-volt">Not sure?</p>
            <h2 id="fit-title" className="display mt-4 text-[clamp(32px,8vw,44px)] md:text-[clamp(44px,3.8vw,68px)]">
              Which one <span className="serif text-volt">do I need?</span>
            </h2>
            <p className="mt-6 max-w-[40ch] text-base leading-relaxed text-muted">
              Find your situation. If two fit, send us both on WhatsApp and we will say which one to start with.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 [&>*]:min-w-0">
            {SERVICE_FIT.map((f) => {
              const s = DEEP_SERVICES.find((d) => d.slug === f.slug);
              if (!s) return null;
              return (
                <li key={f.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group flex h-full flex-col justify-between gap-6 rounded-2xl border border-line bg-surface p-6 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-volt/50"
                  >
                    <span className="text-lg font-semibold text-ink">{f.when}</span>
                    <span className="flex items-center justify-between text-sm font-semibold text-volt">
                      {s.name}
                      <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <Process />
      <Close />
    </Shell>
  );
}
