import Link from "next/link";
import { Shell } from "@/components/site/Shell";
import { PageHero } from "@/components/site/PageHero";
import { JsonLd } from "@/components/site/JsonLd";
import { Close, Stroke } from "@/components/site/sections/Home";
import { PAGES } from "@/lib/pages";
import { SITE } from "@/lib/site";
import { absUrl, breadcrumbNode, graph, ORG_ID, pageMeta, webPageNode, type Crumb } from "@/lib/seo";
import {
  STUDY,
  cityAnchor,
  detailCities,
  DETAIL_CITY_MIN,
  MIN_CELL,
  num,
  pct,
  share,
  tradesByOwnShare,
  type Split,
} from "@/lib/research";

const PATH = STUDY.path;
const T = STUDY.total;
const TITLE = "Gujarat Business Website Data 2026";
const DESCRIPTION = `${pct(T.own, T.n)} of ${num(T.n)} local-trade listing records in Gujarat link to a website of their own. City and trade tables, method and CSV, from Overture's October 2026 data.`;
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

const live = STUDY.validation.liveCheck;
const answered = live.outcomes.answered ?? 0;

const ld = graph(
  webPageNode({
    path: PATH,
    name: TITLE,
    description: DESCRIPTION,
    crumbs: CRUMBS,
    dateModified: STUDY.updated,
    about: { "@id": `${absUrl(PATH)}#dataset` },
  }),
  breadcrumbNode(CRUMBS),
  {
    "@type": "Dataset",
    "@id": `${absUrl(PATH)}#dataset`,
    name: "Gujarat business-listing website study 2026",
    description: `How often independent listing records in 17 local trades in Gujarat, India link to a website of their own, a chain or marketplace page, or no website. ${num(
      T.n
    )} records from the Overture Maps Places release ${STUDY.sourceRelease}; city and trade aggregates.`,
    url: absUrl(PATH),
    creator: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    version: STUDY.version,
    datePublished: STUDY.published,
    dateModified: STUDY.updated,
    temporalCoverage: STUDY.sourceRelease,
    spatialCoverage: { "@type": "Place", name: "Gujarat, India" },
    measurementTechnique: "Classification of the website field of Overture Maps Places listing records by host",
    variableMeasured: [
      "Listing records",
      "Records linking to an own website",
      "Records linking only to a chain or marketplace page",
      "Records with no website recorded",
    ],
    isBasedOn: "https://docs.overturemaps.org/guides/places/",
    license: "https://creativecommons.org/licenses/by/4.0/",
    isAccessibleForFree: true,
    keywords: ["Gujarat", "small business", "websites", "Surat", "Ahmedabad", "Vadodara", "Rajkot", "Overture Maps"],
    distribution: { "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: absUrl(STUDY.csvPath) },
  }
);

/** A record split drawn as one bar: own website in volt, chain/marketplace page in ink, none recorded as the track. */
function SplitBar({ s, label }: { s: Split; label: string }) {
  return (
    <div className="flex h-3 w-full overflow-hidden rounded-full bg-raised" role="img" aria-label={label}>
      <span className="h-full bg-volt" style={{ width: `${share(s.own, s.n)}%` }} />
      <span className="h-full bg-ink/45" style={{ width: `${share(s.shared, s.n)}%` }} />
    </div>
  );
}

const Legend = () => (
  <p className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
    <span className="inline-flex items-center gap-2">
      <span aria-hidden className="h-3 w-3 rounded-full bg-volt" /> Own website
    </span>
    <span className="inline-flex items-center gap-2">
      <span aria-hidden className="h-3 w-3 rounded-full bg-ink/45" /> Chain or marketplace page only
    </span>
    <span className="inline-flex items-center gap-2">
      <span aria-hidden className="h-3 w-3 rounded-full bg-raised ring-1 ring-line" /> No website recorded
    </span>
  </p>
);

const th = "px-3 py-3 text-left font-semibold text-ink md:px-4";
const td = "px-3 py-3 tabular-nums md:px-4";

/** /research/gujarat-business-websites-2026 (SEO-4): original data the studio can stand behind, built from open map
 *  data and worded as listing records throughout (debate round 2). The one moment is the trade chart wiping in. */
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
            We looked at {num(T.n)} listing records of independent local businesses in 17 trades across Gujarat, from the
            open Overture Maps data released on 21 October 2026. {pct(T.own, T.n)} link to a website of their own,{" "}
            {pct(T.shared, T.n)} link only to a chain or marketplace page, and {pct(T.none, T.n)} have no website recorded.
            These are listing records, not a census of every business.
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
            <p className="mt-6 max-w-[30ch] text-base text-muted">of local-trade listing records in Gujarat link to a website of their own.</p>
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
                Restaurants and phone shops <span className="serif text-volt">trail.</span>
              </h2>
              <p className="mt-6 max-w-[44ch] text-base leading-relaxed text-muted">
                {lowest.label} have the lowest share of records with an own website ({pct(lowest.own, lowest.n)} of{" "}
                {num(lowest.n)}); {highest.label.toLowerCase()} the highest ({pct(highest.own, highest.n)} of{" "}
                {num(highest.n)}). Trades whose shops are often franchise branches, such as phone shops, car dealers and
                pharmacies, show the largest share of chain pages.
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
                    <span className="font-semibold text-volt">{pct(t.own, t.n)}</span> own
                  </span>
                  <span className="col-span-2 md:order-2 md:col-span-1">
                    <SplitBar
                      s={t}
                      label={`${t.label}: ${pct(t.own, t.n)} own website, ${pct(t.shared, t.n)} chain or marketplace page, ${pct(t.none, t.n)} none recorded, of ${num(t.n)} records`}
                    />
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
          <div className="mt-10 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[720px] text-sm md:text-base">
              <caption className="sr-only">Website records by Gujarat city, 17 local trades, independent listing records</caption>
              <thead className="border-b border-line bg-surface">
                <tr>
                  <th scope="col" className={th}>City</th>
                  <th scope="col" className={`${th} text-right`}>Trade records</th>
                  <th scope="col" className={`${th} text-right`}>Own website</th>
                  <th scope="col" className={`${th} text-right`}>Chain / marketplace page</th>
                  <th scope="col" className={`${th} text-right`}>None recorded</th>
                  <th scope="col" className={`${th} w-[28%]`}>
                    <span className="sr-only">Split</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {STUDY.cities.map((c) => {
                  const detail = c.n >= DETAIL_CITY_MIN;
                  return (
                    <tr key={c.name} className="border-b border-line last:border-0">
                      <th scope="row" className={`${th} whitespace-nowrap`}>
                        {detail ? (
                          <a href={`#${cityAnchor(c.name)}`} className="underline-offset-4 hover:text-volt hover:underline">
                            {c.name}
                          </a>
                        ) : (
                          c.name
                        )}
                      </th>
                      <td className={`${td} text-right text-muted`}>{num(c.n)}</td>
                      <td className={`${td} text-right font-semibold text-ink`}>{pct(c.own, c.n)}</td>
                      <td className={`${td} text-right text-muted`}>{pct(c.shared, c.n)}</td>
                      <td className={`${td} text-right text-muted`}>{pct(c.none, c.n)}</td>
                      <td className={td}>
                        <SplitBar s={c} label={`${c.name}: ${pct(c.own, c.n)} own website`} />
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
                  <td className={`${td} text-right text-muted`}>{pct(T.none, T.n)}</td>
                  <td className={td}>
                    <SplitBar s={T} label={`All Gujarat: ${pct(T.own, T.n)} own website`} />
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
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
              Cities with at least {num(DETAIL_CITY_MIN)} trade records. A trade is shown when the city has {MIN_CELL} or more records for it;
              smaller counts swing too much to compare.
            </p>
          </div>
          <div className="border-t border-ink/15">
            {detailCities().map((c) => (
              <details key={c.name} id={cityAnchor(c.name)} className="faq-item group scroll-mt-28 border-b border-ink/15">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5">
                  <span>
                    <span className="block text-lg font-semibold md:text-xl">{c.name}</span>
                    <span className="mt-1 block text-sm text-muted">
                      {num(c.n)} records · {pct(c.own, c.n)} own website · {pct(c.none, c.n)} none recorded
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-xl text-volt transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <div className="overflow-x-auto pb-6">
                  <table className="w-full min-w-[520px] text-sm">
                    <caption className="sr-only">{c.name}: website records by trade</caption>
                    <thead>
                      <tr className="border-b border-line text-faint">
                        <th scope="col" className="py-2 pr-3 text-left font-semibold">Trade</th>
                        <th scope="col" className="px-3 py-2 text-right font-semibold">Records</th>
                        <th scope="col" className="px-3 py-2 text-right font-semibold">Own website</th>
                        <th scope="col" className="px-3 py-2 text-right font-semibold">Chain / marketplace</th>
                        <th scope="col" className="py-2 pl-3 text-right font-semibold">None recorded</th>
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
          <ol className="list-decimal space-y-5 pl-5 text-base leading-relaxed text-muted marker:text-volt md:text-lg">
            <li>
              <strong className="text-ink">Source.</strong> {STUDY.source}, the India extract with places marked permanently
              closed removed. Overture combines data from several providers; a place record is a map listing, not a
              registered business.
            </li>
            <li>
              <strong className="text-ink">Which records.</strong> Records in Gujarat in 17 local trades (the category lists
              are below), and only independent ones: records that carry a brand name were left out, so chain branches with
              a known brand do not count. Places of worship, schools, banks, ATMs, landmarks and transport were never in
              the trades.
            </li>
            <li>
              <strong className="text-ink">Own website.</strong> The record lists a website URL whose host is not shared by{" "}
              {STUDY.sharedHostMin} or more trade records in Gujarat and is not a marketplace or listing site (for example
              IndiaMART, JustDial, OYO, Google profile links or store-locator pages). Social media profiles never count. A
              website on a builder subdomain (Wix, Blogger and similar) counts as own.
            </li>
            <li>
              <strong className="text-ink">Chain or marketplace page.</strong> A URL on a host shared by{" "}
              {STUDY.sharedHostMin} or more records, or on a marketplace or listing site. Of{" "}
              {num(STUDY.validation.tradeRecordsWithUrl)} trade records with a URL, {num(STUDY.validation.hostsSharedBy3Plus)}{" "}
              hosts were shared this way; the largest are pharmacy, phone and store-locator networks whose brand field was
              empty.
            </li>
            <li>
              <strong className="text-ink">City.</strong> The city as the source gives it in the address. A record without
              a state took the state most other records of the same city carry. City boundaries are not municipal limits.
            </li>
            <li>
              <strong className="text-ink">Does a recorded website still work?</strong> On {live.date.split("-").reverse().join(".")} we
              requested {live.sample} randomly chosen own-website URLs once each. {answered} answered;{" "}
              {live.outcomes["no dns"] ?? 0} had no DNS record any more, {live.outcomes["http 4xx"] ?? 0} returned a 4xx
              error and {live.outcomes["connection failed"] ?? 0} refused the connection. A recorded website is not always a
              working one, so the own-website share is an upper bound for working sites. It is one small sample from one
              connection, not a measured rate.
            </li>
            <li>
              <strong className="text-ink">What it cannot tell you.</strong> &ldquo;No website recorded&rdquo; does not mean a
              business has no website: the map listing may simply not carry it. Listings miss many businesses and duplicate
              some. The numbers describe the records, and no margin of error applies to them.
            </li>
          </ol>
        </div>
        <div className="mx-auto mt-12 max-w-[1440px] px-4 md:px-8">
          <details className="faq-item group border-y border-ink/15">
            <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold">
              The categories in each trade
              <span aria-hidden className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-xl text-volt transition-transform duration-200 group-open:rotate-45">
                +
              </span>
            </summary>
            <dl className="grid gap-x-10 gap-y-4 pb-8 text-sm md:grid-cols-2 [&>*]:min-w-0">
              {STUDY.tradeRules.map((t) => (
                <div key={t.id}>
                  <dt className="font-semibold text-ink">{t.label}</dt>
                  <dd className="mt-1 text-muted">{t.categories.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </details>
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
              The city and trade counts are free to reuse under CC BY 4.0. Please credit &ldquo;SiteBlitz analysis of
              Overture Maps Places data (release {STUDY.sourceRelease})&rdquo; and link to this page.
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
              Check what Google and map apps show for your business, and add your website address to your Google Business
              Profile if you have one.
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
