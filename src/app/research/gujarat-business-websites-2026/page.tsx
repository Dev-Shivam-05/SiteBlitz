import Link from "next/link";
import { Shell } from "@/components/site/Shell";
import { PageHero } from "@/components/site/PageHero";
import { JsonLd } from "@/components/site/JsonLd";
import { Close, Stroke } from "@/components/site/sections/Home";
import { Legend, MethodList, SplitBar, TradeCategories, splitLabel } from "@/components/site/ResearchParts";
import { PAGES } from "@/lib/pages";
import { SITE } from "@/lib/site";
import { absUrl, breadcrumbNode, graph, ORG_ID, pageMeta, webPageNode, type Crumb } from "@/lib/seo";
import {
  CITY_PAGES,
  DETAIL_CITY_MIN,
  MIN_CELL,
  STUDY,
  cityAnchor,
  cityPath,
  detailCities,
  num,
  pct,
  share,
  tradesByOwnShare,
} from "@/lib/research";

const PATH = STUDY.path;
const T = STUDY.total;
const TITLE = "Gujarat Business Website Data 2026";
const DESCRIPTION = `Website links in ${num(T.n)} Gujarat listing records across 17 selected trades, from Overture's October 2026 data: city and trade tables, method and CSV.`;
const CRUMBS: Crumb[] = [
  { name: "Research", path: PAGES.research.path },
  { name: "Gujarat business websites 2026", path: PATH },
];

export const metadata = pageMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: "article",
  publishedTime: STUDY.published,
  modifiedTime: STUDY.updated,
});

const ld = graph(
  webPageNode({ path: PATH, name: TITLE, description: DESCRIPTION, crumbs: CRUMBS, dateModified: STUDY.updated, about: { "@id": `${absUrl(PATH)}#dataset` } }),
  breadcrumbNode(CRUMBS),
  {
    "@type": "Dataset",
    "@id": `${absUrl(PATH)}#dataset`,
    name: "Gujarat business-listing website study 2026",
    description: `How often listing records in 17 selected trades in Gujarat, India carry a low-reuse website URL, a shared-host or locator-pattern URL, a directory or marketplace URL only, or no URL. ${num(
      T.n
    )} records with no brand recorded, from the Overture Maps Places release ${STUDY.sourceRelease}; city and trade aggregates.`,
    url: absUrl(PATH),
    creator: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    version: STUDY.version,
    datePublished: STUDY.published,
    dateModified: STUDY.updated,
    temporalCoverage: STUDY.sourceRelease,
    spatialCoverage: { "@type": "Place", name: "Gujarat, India" },
    measurementTechnique: "Classification of the website field of Overture Maps Places listing records by host",
    variableMeasured: ["Listing records", "Low-reuse website URL", "Shared-host or locator-pattern URL", "Directory/marketplace URL only", "No URL recorded in the website field"],
    isBasedOn: "https://docs.overturemaps.org/guides/places/",
    license: "https://creativecommons.org/licenses/by/4.0/",
    isAccessibleForFree: true,
    keywords: ["Gujarat", "small business", "websites", "Surat", "Ahmedabad", "Vadodara", "Rajkot", "Overture Maps"],
    distribution: { "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: absUrl(STUDY.csvPath) },
  }
);

const th = "px-3 py-3 text-left font-semibold text-ink md:px-4";
const td = "px-3 py-3 tabular-nums md:px-4";

/** /research/gujarat-business-websites-2026 (SEO-4): original data the studio can stand behind, worded as listing
 *  records throughout (debate rounds 2-3). The one moment is the trade chart wiping in. */
export default function GujaratWebsiteStudy() {
  const trades = tradesByOwnShare();
  const lowest = trades[0];
  const highest = trades[trades.length - 1];
  return (
    <Shell>
      <JsonLd data={ld} />
      <PageHero
        size="lg"
        crumbs={CRUMBS}
        kicker={`Research · Gujarat · version ${STUDY.version}, ${new Date(STUDY.published).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}`}
        lines={["How often do Gujarat", "business listings include", <span key="w" className="serif text-volt">a website?</span>]}
        lead={
          <p>
            We looked at {num(T.n)} listing records in 17 selected trades across Gujarat, all with no brand recorded, from the
            open Overture Maps data released on 21 October 2026. {pct(T.own, T.n)} carry a low-reuse website URL (a host that at most one other record uses),{" "}
            {pct(T.shared, T.n)} a shared-host or locator-pattern URL, {pct(T.directory, T.n)} a directory page only, and {pct(T.none, T.n)} no URL
            at all. These are listing records, not a census of businesses.
          </p>
        }
        actions={
          <>
            <a href="#cities" className="btn-volt inline-flex h-[52px] items-center rounded-full px-7 text-base font-semibold">
              See your city
            </a>
            <a href={STUDY.csvPath} download className="btn-line inline-flex h-[52px] items-center rounded-full px-7 text-base font-semibold">
              Download the CSV
            </a>
          </>
        }
        aside={
          <div className="relative mx-auto w-fit lg:ml-auto lg:mr-0">
            <p className="display relative text-[clamp(84px,24vw,128px)] leading-none md:text-[clamp(120px,11vw,200px)]">
              {pct(T.own, T.n)}
              <Stroke
                now
                viewBox="0 0 400 160"
                d="M 30 92 C 18 30, 150 8, 250 14 S 398 52, 384 96 S 250 156, 150 150 S 8 132, 40 70"
                className="pointer-events-none absolute -inset-x-[8%] -inset-y-[22%] h-[144%] w-[116%] text-volt"
              />
            </p>
            <p className="mt-6 max-w-[30ch] text-base text-muted">of listing records in 17 trades carry a low-reuse website URL. Not a verified ownership count.</p>
          </div>
        }
      />

      {/* By trade: the one dealt moment, the chart wiping in from the left; every value is also printed as text */}
      <section aria-labelledby="trades-title" className="bg-void py-[12vh]">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <div className="grid gap-6 md:grid-cols-[4fr_8fr] md:gap-16 [&>*]:min-w-0">
            <div>
              <p className="kicker text-volt">By trade</p>
              <h2 id="trades-title" className="display mt-4 text-[clamp(32px,8vw,44px)] md:text-[clamp(44px,3.8vw,68px)]">
                Phone shops and restaurants <span className="serif text-volt">trail.</span>
              </h2>
              <p className="mt-6 max-w-[44ch] text-base leading-relaxed text-muted">
                {lowest.label} have the lowest share of records with a low-reuse website URL ({pct(lowest.own, lowest.n)} of{" "}
                {num(lowest.n)}); {highest.label.toLowerCase()} the highest ({pct(highest.own, highest.n)} of {num(highest.n)}).
                Trades whose shops are often franchise branches, such as car and bike dealers, phone shops and pharmacies,
                show the largest share of shared-host or locator-pattern URLs.
              </p>
              <div className="mt-6">
                <Legend />
              </div>
            </div>
            <ol data-anim="mask" className="space-y-4">
              {trades.map((t) => (
                <li key={t.id} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 md:grid-cols-[minmax(0,15rem)_1fr_6.5rem] [&>*]:min-w-0">
                  <span className="text-sm font-semibold text-ink md:text-base">{t.label}</span>
                  <span className="text-right text-sm tabular-nums text-muted md:order-3">
                    <span className="font-semibold text-volt">{pct(t.own, t.n)}</span> low-reuse
                  </span>
                  <span className="col-span-2 md:order-2 md:col-span-1">
                    <SplitBar s={t} label={splitLabel(t.label, t)} />
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* By city */}
      <section id="cities" aria-labelledby="cities-title" className="scroll-mt-24 border-t border-line bg-void py-[12vh]">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <p className="kicker text-volt">By city</p>
          <h2 id="cities-title" className="display mt-4 max-w-[18ch] text-[clamp(32px,8vw,44px)] md:text-[clamp(44px,3.8vw,68px)]">
            {STUDY.cities.length} Gujarat cities, <span className="serif text-volt">side by side.</span>
          </h2>
          <p className="mt-6 max-w-[70ch] text-base leading-relaxed text-muted">
            Cities with at least 1,500 place records of any kind. Differences between cities partly reflect their mix of
            trades and how completely each was mapped, so compare a trade with the same trade, not a city with a city.
          </p>
          {CITY_PAGES.map((name) => (
            <Link
              key={name}
              href={cityPath(name)}
              className="group mt-8 flex items-center justify-between gap-6 rounded-2xl border border-volt/40 bg-surface p-6 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-volt"
            >
              <span>
                <span className="kicker block text-volt">City study</span>
                <span className="mt-2 block text-lg font-semibold">{name}: all 17 trades against the rest of Gujarat</span>
              </span>
              <span aria-hidden className="text-xl text-volt transition-transform group-hover:translate-x-1">→</span>
            </Link>
          ))}
          <div className="relative mt-10 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[760px] text-sm md:text-base">
              <caption className="sr-only">Website URLs in listing records by Gujarat city, 17 selected trades</caption>
              <thead className="border-b border-line bg-surface">
                <tr>
                  <th scope="col" className={th}>City</th>
                  <th scope="col" className={`${th} text-right`}>Records</th>
                  <th scope="col" className={`${th} text-right`}>Low-reuse URL</th>
                  <th scope="col" className={`${th} text-right`}>Shared host / locator</th>
                  <th scope="col" className={`${th} text-right`}>Directory only</th>
                  <th scope="col" className={`${th} text-right`}>No URL</th>
                  <th scope="col" className={`${th} w-[24%]`}>
                    <span className="sr-only">Split</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {STUDY.cities.map((c) => {
                  const own = (CITY_PAGES as readonly string[]).includes(c.name);
                  const detail = c.n >= DETAIL_CITY_MIN;
                  return (
                    <tr key={c.name} className="border-b border-line last:border-0">
                      <th scope="row" className={`${th} whitespace-nowrap`}>
                        {own || detail ? (
                          <a href={own ? cityPath(c.name) : `#${cityAnchor(c.name)}`} className="underline-offset-4 hover:text-volt hover:underline">
                            {c.name}
                          </a>
                        ) : (
                          c.name
                        )}
                      </th>
                      <td className={`${td} text-right text-muted`}>{num(c.n)}</td>
                      <td className={`${td} text-right font-semibold text-ink`}>{pct(c.own, c.n)}</td>
                      <td className={`${td} text-right text-muted`}>{pct(c.shared, c.n)}</td>
                      <td className={`${td} text-right text-muted`}>{pct(c.directory, c.n)}</td>
                      <td className={`${td} text-right text-muted`}>{pct(c.none, c.n)}</td>
                      <td className={td}>
                        <SplitBar s={c} label={splitLabel(c.name, c)} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="border-t border-line bg-surface">
                <tr>
                  <th scope="row" className={th}>All Gujarat</th>
                  <td className={`${td} text-right text-muted`}>{num(T.n)}</td>
                  <td className={`${td} text-right font-semibold text-volt`}>{pct(T.own, T.n)}</td>
                  <td className={`${td} text-right text-muted`}>{pct(T.shared, T.n)}</td>
                  <td className={`${td} text-right text-muted`}>{pct(T.directory, T.n)}</td>
                  <td className={`${td} text-right text-muted`}>{pct(T.none, T.n)}</td>
                  <td className={td}>
                    <SplitBar s={T} label={splitLabel("All Gujarat", T)} />
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="mt-4 text-sm text-faint">&ldquo;All Gujarat&rdquo; covers every city, including those below 1,500 records.</p>
          <div className="mt-5">
            <Legend />
          </div>
        </div>
      </section>

      {/* City detail: native <details>, so every number is in the HTML and a #city link opens its block */}
      <section aria-labelledby="detail-title" className="border-t border-line bg-void py-[12vh]">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-4 md:grid-cols-[4fr_8fr] md:gap-16 md:px-8 [&>*]:min-w-0">
          <div>
            <p className="kicker text-volt">Trade by trade</p>
            <h2 id="detail-title" className="display mt-4 text-[clamp(32px,8vw,44px)] md:text-[clamp(44px,3.8vw,68px)]">
              Inside each <span className="serif text-volt">city.</span>
            </h2>
            <p className="mt-6 max-w-[44ch] text-base leading-relaxed text-muted">
              Cities with at least {num(DETAIL_CITY_MIN)} trade records. A trade is shown when the city has {MIN_CELL} or more
              records for it; smaller counts swing too much to compare.
            </p>
          </div>
          <div className="border-t border-ink/15">
            {detailCities().map((c) => (
              <details key={c.name} id={cityAnchor(c.name)} className="faq-item group scroll-mt-28 border-b border-ink/15">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5">
                  <span>
                    <span className="block text-lg font-semibold md:text-xl">{c.name}</span>
                    <span className="mt-1 block text-sm text-muted">
                      {num(c.n)} records · {pct(c.own, c.n)} low-reuse URL · {pct(c.none, c.n)} no URL
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-xl text-volt transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <div className="relative overflow-x-auto pb-6">
                  <table className="w-full min-w-[560px] text-sm">
                    <caption className="sr-only">{c.name}: website URLs in listing records by trade</caption>
                    <thead>
                      <tr className="border-b border-line text-faint">
                        <th scope="col" className="py-2 pr-3 text-left font-semibold">Trade</th>
                        <th scope="col" className="px-3 py-2 text-right font-semibold">Records</th>
                        <th scope="col" className="px-3 py-2 text-right font-semibold">Low-reuse URL</th>
                        <th scope="col" className="px-3 py-2 text-right font-semibold">Shared host / locator</th>
                        <th scope="col" className="px-3 py-2 text-right font-semibold">Directory only</th>
                        <th scope="col" className="py-2 pl-3 text-right font-semibold">No URL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {STUDY.trades
                        .map((t) => ({ t, g: c.groups[t.id] }))
                        .filter(({ g }) => g && g.n >= MIN_CELL)
                        .sort((a, b) => share(a.g.own, a.g.n) - share(b.g.own, b.g.n))
                        .map(({ t, g }) => (
                          <tr key={t.id} className="border-b border-line/60 last:border-0">
                            <th scope="row" className="py-2.5 pr-3 text-left font-normal text-ink/85">{t.label}</th>
                            <td className="px-3 py-2.5 text-right tabular-nums text-muted">{num(g.n)}</td>
                            <td className="px-3 py-2.5 text-right font-semibold tabular-nums text-ink">{pct(g.own, g.n)}</td>
                            <td className="px-3 py-2.5 text-right tabular-nums text-muted">{pct(g.shared, g.n)}</td>
                            <td className="px-3 py-2.5 text-right tabular-nums text-muted">{pct(g.directory, g.n)}</td>
                            <td className="py-2.5 pl-3 text-right tabular-nums text-muted">{pct(g.none, g.n)}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Method and limits */}
      <section id="method" aria-labelledby="method-title" className="scroll-mt-24 border-t border-line bg-void py-[12vh]">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-4 md:grid-cols-[4fr_8fr] md:gap-16 md:px-8 [&>*]:min-w-0">
          <div>
            <p className="kicker text-volt">Method</p>
            <h2 id="method-title" className="display mt-4 text-[clamp(32px,8vw,44px)] md:text-[clamp(44px,3.8vw,68px)]">
              How we counted, <span className="serif text-volt">and what it misses.</span>
            </h2>
          </div>
          <MethodList />
        </div>
        <div className="mx-auto mt-12 max-w-[1440px] px-4 md:px-8">
          <TradeCategories />
        </div>
      </section>

      {/* Reuse and corrections */}
      <section aria-labelledby="reuse-title" className="border-t border-line bg-void py-[12vh]">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-4 md:grid-cols-[4fr_8fr] md:gap-16 md:px-8 [&>*]:min-w-0">
          <div>
            <p className="kicker text-volt">Use the data</p>
            <h2 id="reuse-title" className="display mt-4 text-[clamp(32px,8vw,44px)] md:text-[clamp(44px,3.8vw,68px)]">
              Free to reuse, <span className="serif text-volt">with credit.</span>
            </h2>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-muted md:text-lg">
            <p>
              The city and trade counts are free to reuse under CC BY 4.0. Please credit &ldquo;SiteBlitz analysis of Overture
              Maps Places data (release {STUDY.sourceRelease})&rdquo; and link to this page.
            </p>
            <p>
              <a href={STUDY.csvPath} download className="btn-line inline-flex h-[52px] items-center rounded-full px-7 text-base font-semibold text-ink">
                Download the CSV (city × trade counts)
              </a>
            </p>
            <p>
              Source data: Overture Maps Foundation, overturemaps.org. Overture&rsquo;s providers publish under
              CDLA-Permissive-2.0, Apache-2.0 (Foursquare) and CC0 (AllThePlaces); this page shares counts only, no records.
            </p>
            <p>
              Found a mistake? Message us on{" "}
              <a href={SITE.whatsapp("Hi SiteBlitz, about the Gujarat website study: ")} target="_blank" rel="noopener noreferrer" className="text-ink underline underline-offset-4 hover:text-volt">
                WhatsApp
              </a>
              . We correct the page, raise the version number and say what changed. Version {STUDY.version}, published{" "}
              {STUDY.published}.
            </p>
          </div>
        </div>
      </section>

      {/* What it means for an owner: restrained, the study stands without it */}
      <section aria-labelledby="owners-title" className="border-t border-line bg-void py-[12vh]">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <h2 id="owners-title" className="display max-w-[20ch] text-[clamp(32px,8vw,44px)] md:text-[clamp(44px,3.8vw,68px)]">
            If your listing shows <span className="serif text-volt">no website.</span>
          </h2>
          <div className="mt-8 grid gap-8 text-base leading-relaxed text-muted md:grid-cols-3 md:text-lg [&>*]:min-w-0">
            <p>
              A missing website link in a listing is a reason to check the listing, not proof that a business has no website.
              Add your website address to your Google Business Profile if you have one.
            </p>
            <p>
              If you have a website, check that it still opens on a phone. Our{" "}
              <Link href={PAGES.grader.path} className="text-ink underline underline-offset-4 hover:text-volt">free website check</Link> runs 20 checks in
              about ten seconds.
            </p>
            <p>
              If you need one, our <Link href={PAGES.pricing.path} className="text-ink underline underline-offset-4 hover:text-volt">prices are on one page</Link>,
              and you can see working demo sites before you decide.
            </p>
          </div>
        </div>
      </section>

      <Close />
    </Shell>
  );
}
