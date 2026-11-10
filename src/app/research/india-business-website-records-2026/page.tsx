import Link from "next/link";
import { Shell } from "@/components/site/Shell";
import { PageHero } from "@/components/site/PageHero";
import { JsonLd } from "@/components/site/JsonLd";
import { Close, Stroke } from "@/components/site/sections/Home";
import { Legend, SplitBar, TradeCategories, splitLabel } from "@/components/site/ResearchParts";
import { PAGES } from "@/lib/pages";
import { SITE } from "@/lib/site";
import { STUDY, num, pct, share } from "@/lib/research";
import { INDIA, NAMED_STATE_MIN, SMALL_STATE, anyUrl, stateAnchor } from "@/lib/researchIndia";
import { absUrl, breadcrumbNode, graph, ORG_ID, pageMeta, webPageNode, type Crumb } from "@/lib/seo";

const PATH = INDIA.path;
const T = INDIA.total;
const TITLE = "India Business Website Records by State, 2026";
const DESCRIPTION = `Website links in ${num(T.n)} Indian listing records across 17 trades, state by state, from Overture's October 2026 data. Method, limits and CSV.`;
const CRUMBS: Crumb[] = [
  { name: "Research", path: PAGES.research.path },
  { name: "India business website records 2026", path: PATH },
];

export const metadata = pageMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: "article",
  publishedTime: INDIA.published,
  modifiedTime: INDIA.updated,
});

const ld = graph(
  webPageNode({ path: PATH, name: TITLE, description: DESCRIPTION, crumbs: CRUMBS, dateModified: INDIA.updated, about: { "@id": `${absUrl(PATH)}#dataset` } }),
  breadcrumbNode(CRUMBS),
  {
    "@type": "Dataset",
    "@id": `${absUrl(PATH)}#dataset`,
    name: "India business-listing website records by state 2026",
    description: `How often listing records in 17 selected trades in India carry a website URL, by state and union territory. ${num(
      T.n
    )} records with no brand recorded, from the Overture Maps Places release ${INDIA.sourceRelease}; aggregates only.`,
    url: absUrl(PATH),
    creator: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    version: INDIA.version,
    datePublished: INDIA.published,
    dateModified: INDIA.updated,
    temporalCoverage: INDIA.sourceRelease,
    spatialCoverage: { "@type": "Place", name: "India" },
    variableMeasured: ["Listing records", "Any website URL", "Low-reuse website URL", "Shared-host or locator-pattern URL", "Directory/marketplace URL only", "No URL recorded in the website field"],
    isBasedOn: "https://docs.overturemaps.org/guides/places/",
    license: "https://creativecommons.org/licenses/by/4.0/",
    isAccessibleForFree: true,
    keywords: ["India", "states", "small business", "websites", "Overture Maps"],
    distribution: { "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: absUrl(INDIA.csvPath) },
  }
);

const th = "px-3 py-3 text-left font-semibold text-ink md:px-4";
const td = "px-3 py-3 tabular-nums md:px-4";

/** /research/india-business-website-records-2026 (SEO-8): one national reference page, states as rows and anchors, never
 *  a page per state. Principal measure: any website URL recorded (debate round 4). The moment is the trade chart. */
export default function IndiaStudy() {
  const named = INDIA.states.filter((s) => s.n >= NAMED_STATE_MIN).sort((a, b) => share(anyUrl(b), b.n) - share(anyUrl(a), a.n));
  const top = named.slice(0, 2);
  const bottom = named.slice(-2).reverse();
  const trades = [...INDIA.trades].sort((a, b) => share(anyUrl(a), a.n) - share(anyUrl(b), b.n));
  const gujarat = INDIA.states.find((s) => s.name === "Gujarat");
  return (
    <Shell>
      <JsonLd data={ld} />
      <PageHero
        size="lg"
        crumbs={CRUMBS}
        kicker={`Research · India · version ${INDIA.version}, 11 November 2026`}
        // Lines of at most 17 characters, so they never re-wrap when the display font loads (lab CLS check).
        lines={["How often do", "business listings", "in India carry", <span key="w" className="serif text-volt">a website link?</span>]}
        lead={
          <p>
            Across {num(T.n)} listing records with no brand recorded, in the same 17 trades as our Gujarat study,{" "}
            {pct(anyUrl(T), T.n)} carry a website URL and {pct(T.none, T.n)} carry none. Among states with at least{" "}
            {num(NAMED_STATE_MIN)} records, {top.map((s) => s.name).join(" and ")} records carry one most often,{" "}
            {bottom.map((s) => s.name).join(" and ")} least. These are listing records, not a census of businesses.
          </p>
        }
        actions={
          <>
            <a href="#states" className="btn-volt inline-flex h-[52px] items-center rounded-full px-7 text-base font-semibold">
              See your state
            </a>
            <a href={INDIA.csvPath} download className="btn-line inline-flex h-[52px] items-center rounded-full px-7 text-base font-semibold">
              Download the CSV
            </a>
          </>
        }
        aside={
          <div className="relative w-fit">
            <p className="display relative text-[clamp(84px,24vw,128px)] leading-none md:text-[clamp(120px,11vw,200px)]">
              {pct(anyUrl(T), T.n)}
              <Stroke
                now
                viewBox="0 0 400 160"
                d="M 30 92 C 18 30, 150 8, 250 14 S 398 52, 384 96 S 250 156, 150 150 S 8 132, 40 70"
                className="pointer-events-none absolute -inset-x-[8%] -inset-y-[22%] h-[144%] w-[116%] text-volt"
              />
            </p>
            <p className="mt-6 max-w-[20rem] text-base text-muted">of {num(T.n)} listing records in India carry any website URL.</p>
          </div>
        }
      />

      <section id="states" aria-labelledby="states-title" className="scroll-mt-24 bg-void py-[12vh]">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <p className="kicker text-volt">By state and union territory</p>
          <h2 id="states-title" className="display mt-4 max-w-[18ch] text-[clamp(32px,8vw,44px)] md:text-[clamp(44px,3.8vw,68px)]">
            {INDIA.states.length} states and UTs, <span className="serif text-volt">one method.</span>
          </h2>
          <p className="mt-6 max-w-[70ch] text-base leading-relaxed text-muted">
            Sorted by number of records. Rows marked &ldquo;few records&rdquo; have fewer than {num(SMALL_STATE)}; their shares
            swing too much to compare. Differences between states partly reflect their mix of trades and how completely each
            was mapped.
          </p>
          <div className="relative mt-10 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[880px] text-sm md:text-base">
              <caption className="sr-only">Website URLs in listing records by Indian state and union territory, 17 selected trades</caption>
              <thead className="border-b border-line bg-surface">
                <tr>
                  <th scope="col" className={th}>State / UT</th>
                  <th scope="col" className={`${th} text-right`}>Records</th>
                  <th scope="col" className={`${th} text-right`}>Any URL</th>
                  <th scope="col" className={`${th} text-right`}>Low-reuse</th>
                  <th scope="col" className={`${th} text-right`}>Shared host / locator</th>
                  <th scope="col" className={`${th} text-right`}>Directory only</th>
                  <th scope="col" className={`${th} w-[20%]`}>
                    <span className="sr-only">Split</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {INDIA.states.map((s) => {
                  const small = s.n < SMALL_STATE;
                  return (
                    <tr key={s.name} id={stateAnchor(s.name)} className={`scroll-mt-28 border-b border-line last:border-0 ${small ? "text-faint" : ""}`}>
                      <th scope="row" className={`${th} ${small ? "font-normal text-faint" : ""}`}>
                        {s.name === "Gujarat" ? (
                          <Link href={STUDY.path} className="underline-offset-4 hover:text-volt hover:underline">
                            {s.name}
                          </Link>
                        ) : (
                          s.name
                        )}
                        {small && <span className="ml-2 text-xs">few records</span>}
                      </th>
                      <td className={`${td} text-right`}>{num(s.n)}</td>
                      <td className={`${td} text-right font-semibold ${small ? "" : "text-ink"}`}>{pct(anyUrl(s), s.n)}</td>
                      <td className={`${td} text-right`}>{pct(s.own, s.n)}</td>
                      <td className={`${td} text-right`}>{pct(s.shared, s.n)}</td>
                      <td className={`${td} text-right`}>{pct(s.directory, s.n)}</td>
                      <td className={td}>
                        <SplitBar s={s} label={splitLabel(s.name, s)} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="border-t border-line bg-surface">
                <tr>
                  <th scope="row" className={th}>All India</th>
                  <td className={`${td} text-right text-muted`}>{num(T.n)}</td>
                  <td className={`${td} text-right font-semibold text-volt`}>{pct(anyUrl(T), T.n)}</td>
                  <td className={`${td} text-right text-muted`}>{pct(T.own, T.n)}</td>
                  <td className={`${td} text-right text-muted`}>{pct(T.shared, T.n)}</td>
                  <td className={`${td} text-right text-muted`}>{pct(T.directory, T.n)}</td>
                  <td className={td}>
                    <SplitBar s={T} label={splitLabel("All India", T)} />
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="mt-4 text-sm text-faint">
            &ldquo;All India&rdquo; includes {num(INDIA.unclear.n)} records whose state in the source is a district, a typo,
            another country or missing.
          </p>
          <div className="mt-5">
            <Legend />
          </div>
        </div>
      </section>

      <section aria-labelledby="trades-title" className="border-t border-line bg-void py-[12vh]">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <div className="grid gap-6 md:grid-cols-[4fr_8fr] md:gap-16 [&>*]:min-w-0">
            <div>
              <p className="kicker text-volt">By trade, all India</p>
              <h2 id="trades-title" className="display mt-4 text-[clamp(32px,8vw,44px)] md:text-[clamp(44px,3.8vw,68px)]">
                Which trades <span className="serif text-volt">list a website.</span>
              </h2>
              <p className="mt-6 max-w-[44ch] text-base leading-relaxed text-muted">
                Share of each trade&rsquo;s records that carry any website URL, lowest first. The bar shows the four classes.
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
                    <span className="font-semibold text-volt">{pct(anyUrl(t), t.n)}</span> any
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

      <section id="method" aria-labelledby="method-title" className="scroll-mt-24 border-t border-line bg-void py-[12vh]">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-4 md:grid-cols-[4fr_8fr] md:gap-16 md:px-8 [&>*]:min-w-0">
          <div>
            <p className="kicker text-volt">Method</p>
            <h2 id="method-title" className="display mt-4 text-[clamp(32px,8vw,44px)] md:text-[clamp(44px,3.8vw,68px)]">
              How we counted, <span className="serif text-volt">and what it misses.</span>
            </h2>
          </div>
          <ol className="list-decimal space-y-5 pl-5 text-base leading-relaxed text-muted marker:text-volt md:text-lg">
            <li>
              <strong className="text-ink">Source.</strong> {INDIA.source}, India extract ({num(INDIA.allPlaceRecords)} place
              records), with places marked permanently closed removed. A place record is a map listing, not a registered
              business, and one business can have more than one record.
            </li>
            <li>
              <strong className="text-ink">Which records.</strong> The same 17 activity-defined trades and the same
              no-brand-recorded rule as the{" "}
              <Link href={STUDY.path} className="text-ink underline underline-offset-4 hover:text-volt">Gujarat study</Link>:{" "}
              {num(T.n)} records. Each record belongs to one trade through its main source category.
            </li>
            <li>
              <strong className="text-ink">States.</strong> The state as the source gives it, folded into the 36 states and
              union territories: old or variant names are merged (Orissa, Uttaranchal, Pondicherry, &ldquo;Jammu and Kashmir
              (State)&rdquo;, Daman and Diu with Dadra and Nagar Haveli, spelling variants). {num(INDIA.unclear.n)} records
              from {num(INDIA.unclear.rawValues)} other values (districts, typos, other countries, missing) are counted in
              the India total but in no state. Because variants are merged here, Gujarat has {gujarat ? num(gujarat.n - STUDY.total.n) : "a few"}{" "}
              more records than in the Gujarat study.
            </li>
            <li>
              <strong className="text-ink">The main measure.</strong> Any website URL recorded in the website field (our
              extract drops social profiles and common listing pages such as Google, Justdial, Practo and Zomato). The four
              classes split those URLs as in the Gujarat study, but host frequency is counted once across all{" "}
              {num(T.n)} India records ({num(INDIA.validation.hostsSharedBy3Plus)} hosts appear in 3 or more), so a
              state&rsquo;s low-reuse share here is not the same number as in a single-state study.
            </li>
            <li>
              <strong className="text-ink">What the numbers are.</strong> A recorded URL does not establish that a website is
              live, usable or correctly linked to the business, and &ldquo;no URL&rdquo; does not mean a business has no
              website. These figures describe listing records in one source release, not all businesses, and no margin of
              error applies to them. Percentages are calculated from the counts before rounding.
            </li>
          </ol>
        </div>
        <div className="mx-auto mt-12 max-w-[1440px] px-4 md:px-8">
          <TradeCategories />
        </div>
      </section>

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
              The state and trade counts are free to reuse under CC BY 4.0. Please credit &ldquo;SiteBlitz analysis of Overture
              Maps Places data (release {INDIA.sourceRelease})&rdquo; and link to this page.
            </p>
            <p>
              <a href={INDIA.csvPath} download className="btn-line inline-flex h-[52px] items-center rounded-full px-7 text-base font-semibold text-ink">
                Download the CSV (state × trade counts)
              </a>
            </p>
            <p>
              Source data: Overture Maps Foundation, overturemaps.org; providers publish under CDLA-Permissive-2.0,
              Apache-2.0 (Foursquare) and CC0 (AllThePlaces). This page shares counts only.
            </p>
            <p>
              Found a mistake? Message us on{" "}
              <a href={SITE.whatsapp("Hi SiteBlitz, about the India website records study: ")} target="_blank" rel="noopener noreferrer" className="text-ink underline underline-offset-4 hover:text-volt">
                WhatsApp
              </a>
              . We correct the page, raise the version number and say what changed. Version {INDIA.version}, published {INDIA.published}.
            </p>
          </div>
        </div>
      </section>

      <Close />
    </Shell>
  );
}
