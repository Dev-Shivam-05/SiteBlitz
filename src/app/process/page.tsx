import Link from "next/link";
import { Shell } from "@/components/site/Shell";
import { HeroFigure, PageHero } from "@/components/site/PageHero";
import { JsonLd } from "@/components/site/JsonLd";
import { Close, Process } from "@/components/site/sections/Home";
import { PACKAGES, READY_TO_BUILD, inr } from "@/lib/offer";
import { PROCESS_STEPS } from "@/lib/site";
import { PAGES } from "@/lib/pages";
import { absUrl, breadcrumbNode, graph, pageMeta, webPageNode, type Crumb } from "@/lib/seo";

const PATH = PAGES.process.path;
const TITLE = "Website Design & Build Process";
const DESCRIPTION =
  "How a SiteBlitz website goes from first WhatsApp message to launch: four steps, what you provide and what starts the delivery clock.";
const CRUMBS: Crumb[] = [{ name: "Process", path: PATH }];

export const metadata = pageMeta({ title: TITLE, description: DESCRIPTION, path: PATH });

const ld = graph(
  webPageNode({ path: PATH, name: TITLE, description: DESCRIPTION, crumbs: CRUMBS, dateModified: PAGES.process.updated, about: { "@id": `${absUrl(PATH)}#steps` } }),
  breadcrumbNode(CRUMBS),
  {
    "@type": "ItemList",
    "@id": `${absUrl(PATH)}#steps`,
    name: "From first message to launch",
    itemListElement: PROCESS_STEPS.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.title, description: s.text })),
  }
);

const YOU = [
  "Your business details: services, prices you want shown, area, hours",
  "The text for each page, your logo and your photographs",
  "Written approval of the pages, features and price",
  "Access to your domain, or a decision on which one to buy",
  "The first payment, after you approve the scope",
] as const;

const US = [
  "The design and the build of the agreed pages, phone first",
  "WhatsApp and call buttons, and the enquiry route",
  "Basic technical SEO and a Google Search Console submission",
  "A staging link to review, and one consolidated revision round",
  "Launch and handover as written in the agreement",
] as const;

/** /process (SEO-3): the four steps on the drawn path shared with the home page (the moment), then what starts the
 *  delivery clock and who does what. Replaces an hour-stamped "48 hours" page that promised a dashboard and copywriting
 *  the offer does not include. */
export default function ProcessPage() {
  return (
    <Shell>
      <JsonLd data={ld} />
      <PageHero
        crumbs={CRUMBS}
        kicker="Process"
        lines={["From first message", <span key="l" className="serif text-volt">to launch.</span>]}
        lead={
          <p>
            Four steps, the same for every project. You see the direction before you pay, approve the scope in writing,
            and the delivery clock starts only when the project is ready to build.
          </p>
        }
        aside={
          <HeroFigure
            rows={PACKAGES.filter((p) => p.priceInr).map((p) => ({
              value: p.delivery.split(" ")[0],
              label: `${p.name}: working days`,
            }))}
            caption="Counted from ready-to-build. Custom projects follow the schedule in their quote."
          />
        }
      />

      <Process />

      <section aria-labelledby="clock-title" className="border-t border-line bg-void py-[12vh]">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-4 md:grid-cols-[4fr_8fr] md:gap-16 md:px-8 [&>*]:min-w-0">
          <div>
            <p className="kicker text-volt">The delivery clock</p>
            <h2 id="clock-title" className="display mt-4 text-[clamp(32px,8vw,44px)] md:text-[clamp(44px,3.8vw,68px)]">
              When the <span className="serif text-volt">clock starts.</span>
            </h2>
          </div>
          <div>
            <ol className="space-y-4">
              {READY_TO_BUILD.map((r, i) => (
                <li key={r} className="flex items-baseline gap-5 border-b border-line pb-4 text-lg text-ink/90 md:text-xl">
                  <span className="display shrink-0 text-sm text-volt">{String(i + 1).padStart(2, "0")}</span>
                  {r}
                </li>
              ))}
            </ol>
            <dl className="mt-10 grid gap-4 sm:grid-cols-3 [&>*]:min-w-0">
              {PACKAGES.map((p) => (
                <div key={p.id} className="rounded-2xl border border-line bg-surface p-6">
                  <dt className="kicker text-faint">
                    {p.name} · {p.priceInr ? inr(p.priceInr) : "quote"}
                  </dt>
                  <dd className="mt-3 text-lg font-semibold text-ink">{p.delivery}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-base text-muted">
              Late content or approvals move the date. We tell you before a delivery date changes. For the one-page
              site, see the{" "}
              <Link href={PAGES.in48.path} className="text-ink underline underline-offset-4 hover:text-volt">
                48-hour delivery conditions
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="who-title" className="border-t border-line bg-void py-[12vh]">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <p className="kicker text-volt">Who does what</p>
          <h2 id="who-title" className="display mt-4 text-[clamp(32px,8vw,44px)] md:text-[clamp(44px,3.8vw,68px)]">
            Your part, <span className="serif text-volt">our part.</span>
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 [&>*]:min-w-0">
            {[
              { title: "You provide", items: YOU },
              { title: "We do", items: US },
            ].map((col) => (
              <div key={col.title} className="rounded-3xl border border-line bg-surface p-7 md:p-9">
                <h3 className="text-xl font-semibold">{col.title}</h3>
                <ul className="mt-6 space-y-3">
                  {col.items.map((it) => (
                    <li key={it} className="flex gap-3 text-base leading-relaxed text-muted">
                      <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-volt" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-[70ch] text-base text-muted">
            Writing your content from scratch, extra pages and ongoing maintenance are not in the packages; each can be
            quoted. The full list is on{" "}
            <Link href={`${PAGES.pricing.path}#exclusions`} className="text-ink underline underline-offset-4 hover:text-volt">
              prices &amp; terms
            </Link>
            .
          </p>
        </div>
      </section>

      <Close />
    </Shell>
  );
}
