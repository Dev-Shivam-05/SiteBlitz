import Link from "next/link";
import { Shell } from "@/components/site/Shell";
import { PageHero } from "@/components/site/PageHero";
import { JsonLd } from "@/components/site/JsonLd";
import { Close } from "@/components/site/sections/Home";
import { PAGES } from "@/lib/pages";
import { STUDY, num, pct } from "@/lib/research";
import { breadcrumbNode, graph, pageMeta, webPageNode, type Crumb } from "@/lib/seo";

const PATH = PAGES.research.path;
const TITLE = "Research: Business Websites in Gujarat";
const DESCRIPTION = "Original SiteBlitz studies of how local businesses in Gujarat show up online, built from open data, with the method and the numbers to download.";
const CRUMBS: Crumb[] = [{ name: "Research", path: PATH }];

export const metadata = pageMeta({ title: TITLE, description: DESCRIPTION, path: PATH });

const ld = graph(
  webPageNode({ path: PATH, name: TITLE, description: DESCRIPTION, type: "CollectionPage", crumbs: CRUMBS, dateModified: PAGES.research.updated }),
  breadcrumbNode(CRUMBS)
);

/** /research: the index of studies. One study today; each new one adds a card here and a row in pages.ts. */
export default function ResearchIndex() {
  const T = STUDY.total;
  return (
    <Shell>
      <JsonLd data={ld} />
      <PageHero
        crumbs={CRUMBS}
        kicker="Research"
        lines={["Gujarat business", <span key="o">websites, <span className="serif text-volt">in numbers.</span></span>]}
        lead={<p>Studies we run on open data about how local businesses in Gujarat show up online. Every study states its method and limits, and its counts are free to reuse with credit.</p>}
      />
      <section aria-label="Studies" className="bg-void pb-[14vh]">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <Link
            href={STUDY.path}
            className="group grid gap-6 rounded-3xl border border-line bg-surface p-7 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-volt/50 md:grid-cols-[1fr_auto] md:items-end md:p-10"
          >
            <div>
              <p className="kicker text-volt">Study · version {STUDY.version} · {STUDY.published}</p>
              <h2 className="display mt-4 text-[clamp(28px,7vw,40px)] md:text-[clamp(40px,3.4vw,60px)]">How often do Gujarat business listings include a website?</h2>
              <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-muted md:text-lg">
                {num(T.n)} independent listing records in 17 local trades and {STUDY.cities.length} cities: {pct(T.own, T.n)} link to a
                website of their own. City and trade tables, method, limits and a CSV.
              </p>
            </div>
            <span aria-hidden className="flex h-14 w-14 items-center justify-center rounded-full border border-line text-xl transition-all duration-300 group-hover:-rotate-45 group-hover:border-volt group-hover:bg-volt group-hover:text-void">
              →
            </span>
          </Link>
        </div>
      </section>
      <Close />
    </Shell>
  );
}
