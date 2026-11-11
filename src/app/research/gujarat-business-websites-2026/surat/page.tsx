import Link from "next/link";
import { notFound } from "next/navigation";
import { Shell } from "@/components/site/Shell";
import { PageHero } from "@/components/site/PageHero";
import { JsonLd } from "@/components/site/JsonLd";
import { Close, Stroke } from "@/components/site/sections/Home";
import { Legend, MethodList, SplitBar, TradeCategories, splitLabel } from "@/components/site/ResearchParts";
import { PAGES } from "@/lib/pages";
import { absUrl, breadcrumbNode, graph, ORG_ID, pageMeta, webPageNode, type Crumb } from "@/lib/seo";
import { STUDY, getCity, num, pct, restOfGujarat, share, cityPath } from "@/lib/research";

const CITY = "Surat";
const PATH = cityPath(CITY);
const TITLE = "Surat Business Website Data 2026";
const DESCRIPTION =
  "Website URL records across 17 selected Surat trades, using October 2026 Overture data. Explore trade tables, methods, limitations and aggregate CSV.";
const CRUMBS: Crumb[] = [
  { name: "Research", path: PAGES.research.path },
  { name: "Gujarat business websites 2026", path: STUDY.path },
  { name: CITY, path: PATH },
];

export const metadata = pageMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: "article",
  publishedTime: STUDY.published,
  modifiedTime: STUDY.updated,
});

/** Signed percentage-point difference, one decimal ("+3.2 pts", "−1.0 pts"). */
const pts = (a: number, b: number) => {
  const d = Math.round((a - b) * 10) / 10;
  return `${d > 0 ? "+" : d < 0 ? "−" : "±"}${Math.abs(d).toFixed(1)} pts`;
};

/** /research/gujarat-business-websites-2026/surat (debate round 3, D2 approved as a format): Surat's 17 trades against
 *  the rest of Gujarat, counted with the same rules, counts subtracted before shares are computed. Useful with the
 *  closing service note removed; no business is named. */
export default function SuratStudy() {
  const city = getCity(CITY);
  if (!city) notFound();
  const rest = restOfGujarat(city);
  const rows = STUDY.trades
    .map((t) => ({ t, s: city.groups[t.id], r: rest.groups[t.id] }))
    .filter((x) => x.s && x.s.n > 0)
    .sort((a, b) => share(a.s.own, a.s.n) - share(b.s.own, b.s.n));
  const diffs = rows.map((x) => ({ ...x, d: share(x.s.own, x.s.n) - share(x.r.own, x.r.n) })).sort((a, b) => a.d - b.d);
  const below = diffs[0];
  const above = diffs[diffs.length - 1];

  const ld = graph(
    webPageNode({ path: PATH, name: TITLE, description: DESCRIPTION, crumbs: CRUMBS, dateModified: STUDY.updated, about: { "@id": `${absUrl(PATH)}#dataset` } }),
    breadcrumbNode(CRUMBS),
    {
      "@type": "Dataset",
      "@id": `${absUrl(PATH)}#dataset`,
      name: "Surat business-listing website study 2026",
      description: `Website URLs in ${num(city.n)} Surat listing records with no brand recorded, across 17 selected trades, compared with the rest of Gujarat. From the Overture Maps Places release ${STUDY.sourceRelease}.`,
      url: absUrl(PATH),
      isPartOf: { "@id": `${absUrl(STUDY.path)}#dataset` },
      creator: { "@id": ORG_ID },
      publisher: { "@id": ORG_ID },
      version: STUDY.version,
      datePublished: STUDY.published,
      dateModified: STUDY.updated,
      temporalCoverage: STUDY.sourceRelease,
      spatialCoverage: { "@type": "Place", name: "Surat, Gujarat, India" },
      variableMeasured: ["Listing records", "URL retained after filtering", "Retained URL: low-reuse host", "Retained URL: shared host or locator pattern", "Retained URL: directory or marketplace", "No URL retained after filtering"],
      license: "https://creativecommons.org/licenses/by/4.0/",
      isAccessibleForFree: true,
      distribution: { "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: absUrl(STUDY.csvPath) },
    }
  );

  return (
    <Shell>
      <JsonLd data={ld} />
      <PageHero
        size="lg"
        crumbs={CRUMBS}
        kicker={`Research · ${CITY} · version ${STUDY.version}`}
        // Lines of at most 16 characters: they never re-wrap when the display font replaces its fallback (lab CLS 0.17 -> see HANDOFF).
        lines={["Website links", "recorded across", "17 trades", <span key="c" className="serif text-volt">in {CITY}.</span>]}
        lead={
          <p>
            Of {num(city.n)} {CITY} listing records with no brand recorded, across 17 selected trades, {pct(city.own, city.n)} carry
            a retained URL with a low-reuse host, {pct(city.shared, city.n)} one with a shared host or locator pattern, {pct(city.directory, city.n)} a
            directory page, and {pct(city.none, city.n)} no URL retained after filtering. The rest of Gujarat, counted the same way, is at{" "}
            {pct(rest.total.own, rest.total.n)} low-reuse. These are listing records, not a census of businesses.
          </p>
        }
        aside={
          <div className="relative w-fit">
            <p className="display relative text-[clamp(84px,24vw,128px)] leading-none md:text-[clamp(120px,11vw,200px)]">
              {pct(city.own, city.n)}
              <Stroke
                now
                viewBox="0 0 400 160"
                d="M 30 92 C 18 30, 150 8, 250 14 S 398 52, 384 96 S 250 156, 150 150 S 8 132, 40 70"
                className="pointer-events-none absolute -inset-x-[8%] -inset-y-[22%] h-[144%] w-[116%] text-volt"
              />
            </p>
            <p className="mt-6 max-w-[30ch] text-base text-muted">
              retained low-reuse-host URLs in {CITY} listing records, against {pct(rest.total.own, rest.total.n)} in the rest of Gujarat.
            </p>
          </div>
        }
      />

      <section aria-labelledby="trades-title" className="bg-void py-[12vh]">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <p className="kicker text-volt">Trade by trade</p>
          <h2 id="trades-title" className="display mt-4 max-w-[20ch] text-[clamp(32px,8vw,44px)] md:text-[clamp(44px,3.8vw,68px)]">
            {CITY} against <span className="serif text-volt">the rest of Gujarat.</span>
          </h2>
          <p className="mt-6 max-w-[72ch] text-base leading-relaxed text-muted">
            The widest gap below the rest of the state is {below.t.label.toLowerCase()} ({pts(share(below.s.own, below.s.n), share(below.r.own, below.r.n))}
            ); the widest above is {above.t.label.toLowerCase()} ({pts(share(above.s.own, above.s.n), share(above.r.own, above.r.n))}). Differences
            are in percentage points of records whose retained URL has a low-reuse host, calculated from the counts before rounding, so a
            difference may not equal the two rounded shares subtracted. These are descriptive differences within the selected
            source records, not estimates of differences among all businesses, and they are not tested for statistical
            significance.
          </p>
          <div data-anim="mask" className="relative mt-10 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[820px] text-sm md:text-base">
              <caption className="sr-only">
                {CITY} and the rest of Gujarat: retained low-reuse-host URLs in listing records by trade
              </caption>
              <thead className="border-b border-line bg-surface">
                <tr>
                  <th scope="col" className="px-3 py-3 text-left font-semibold md:px-4">Trade</th>
                  <th scope="col" className="px-3 py-3 text-right font-semibold md:px-4">{CITY} records</th>
                  <th scope="col" className="px-3 py-3 text-right font-semibold md:px-4">{CITY} low-reuse</th>
                  <th scope="col" className="px-3 py-3 text-right font-semibold md:px-4">Rest of Gujarat low-reuse</th>
                  <th scope="col" className="px-3 py-3 text-right font-semibold md:px-4">Difference</th>
                  <th scope="col" className="px-3 py-3 text-right font-semibold md:px-4">{CITY} no URL</th>
                  <th scope="col" className="w-[22%] px-3 py-3 md:px-4">
                    <span className="sr-only">Split</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map(({ t, s, r }) => (
                  <tr key={t.id} className="border-b border-line last:border-0">
                    <th scope="row" className="px-3 py-3 text-left font-semibold md:px-4">{t.label}</th>
                    <td className="px-3 py-3 text-right tabular-nums text-muted md:px-4">{num(s.n)}</td>
                    <td className="px-3 py-3 text-right font-semibold tabular-nums text-ink md:px-4">{pct(s.own, s.n)}</td>
                    <td className="px-3 py-3 text-right tabular-nums text-muted md:px-4">
                      {pct(r.own, r.n)} <span className="text-faint">of {num(r.n)}</span>
                    </td>
                    <td className="px-3 py-3 text-right tabular-nums text-ink/85 md:px-4">{pts(share(s.own, s.n), share(r.own, r.n))}</td>
                    <td className="px-3 py-3 text-right tabular-nums text-muted md:px-4">{pct(s.none, s.n)}</td>
                    <td className="px-3 py-3 md:px-4">
                      <SplitBar s={s} label={splitLabel(`${CITY}, ${t.label}`, s)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-5">
            <Legend />
          </div>
        </div>
      </section>

      <section id="method" aria-labelledby="method-title" className="scroll-mt-24 border-t border-line bg-void py-[12vh]">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-4 md:grid-cols-[4fr_8fr] md:gap-16 md:px-8 [&>*]:min-w-0">
          <div>
            <p className="kicker text-volt">Method</p>
            <h2 id="method-title" className="display mt-4 text-[clamp(32px,8vw,44px)] md:text-[clamp(44px,3.8vw,68px)]">
              Same rules <span className="serif text-volt">as the Gujarat study.</span>
            </h2>
            <p className="mt-6 max-w-[40ch] text-base text-muted">
              &ldquo;Rest of Gujarat&rdquo; is the Gujarat count minus the {CITY} count for each trade; shares are computed after
              subtracting. Every city is in the{" "}
              <Link href={STUDY.path} className="text-ink underline underline-offset-4 hover:text-volt">
                full Gujarat business website study
              </Link>
              .
            </p>
          </div>
          <MethodList />
        </div>
        <div className="mx-auto mt-12 max-w-[1440px] px-4 md:px-8">
          <TradeCategories />
          <p className="mt-8 text-base text-muted">
            <a href={STUDY.csvPath} download className="btn-line inline-flex h-[52px] items-center rounded-full px-7 text-base font-semibold text-ink">
              Download the CSV ({CITY} rows and every other city)
            </a>
          </p>
        </div>
      </section>

      <section aria-labelledby="owners-title" className="border-t border-line bg-void py-[12vh]">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <h2 id="owners-title" className="display max-w-[22ch] text-[clamp(32px,8vw,44px)] md:text-[clamp(44px,3.8vw,68px)]">
            If you run a business <span className="serif text-volt">in {CITY}.</span>
          </h2>
          <ul className="mt-8 grid gap-8 text-base leading-relaxed text-muted md:grid-cols-3 md:text-lg [&>*]:min-w-0">
            <li>A missing website link in a listing is a reason to check the listing, not proof that the business has no website.</li>
            <li>Check whether customers can find your current services, contact details and website link where they search.</li>
            <li>
              For a new website or an update, see the{" "}
              <Link href="/services/business-websites" className="text-ink underline underline-offset-4 hover:text-volt">
                business website service
              </Link>{" "}
              and its agreed scope.
            </li>
          </ul>
        </div>
      </section>

      <Close />
    </Shell>
  );
}
