import data from "@/content/generated/research-gujarat-websites-2026.json";
import { SITE } from "./site";

/**
 * Gujarat business-listing website study (SEO-4, 2026-11-11). Counts only, built offline from the Overture Maps Places
 * release 2026-10-21.0 by E:\tmp\_sb_research\gujarat_final.py (scratch, not in the repo); no business names, phones or
 * URLs are stored. The page and the CSV both read this module, so a number can only change in the JSON.
 *
 * Wording rules (debate rounds 2-3): these are listing RECORDS with no brand recorded in the source, not "independent
 * businesses". "No URL recorded" is not "the business has no website". Trades are defined by activity, never by how
 * many of their records carry a website.
 */

/** One record falls in exactly one class (study v1.0 method, debate round 3):
 *  own - a URL on a host that no other two trade records use; shared - a host used by 3+ records or a chain store
 *  locator (branches, franchises or duplicate listings: a flag, not proof); directory - a listing or marketplace page
 *  about the business; none - no URL recorded. */
export interface Split {
  n: number;
  own: number;
  shared: number;
  directory: number;
  none: number;
}

export interface TradeRow extends Split {
  id: string;
  label: string;
}

export interface CityRow extends Split {
  name: string;
  groups: Record<string, Split>;
}

export const STUDY = {
  slug: "gujarat-business-websites-2026",
  path: "/research/gujarat-business-websites-2026",
  csvPath: "/research/gujarat-business-websites-2026/data.csv",
  published: "2026-11-11",
  updated: "2026-11-11",
  version: "1.0",
  liveCheck: data.validation.liveCheck as {
    ranAt: string;
    frame: string;
    unit: string;
    sample: number;
    seed: number;
    outcomes: Record<string, number>;
  },
  source: data.source,
  sourceRelease: data.sourceRelease,
  sharedHostMin: data.rules.sharedHostMin,
  tradeRules: data.rules.trades as { id: string; label: string; categories: string[] }[],
  total: data.trades.total as Split,
  trades: data.trades.groups as TradeRow[],
  cities: data.trades.cities as CityRow[],
  allRecords: data.allRecords,
  validation: data.validation,
} as const;

/** One decimal, the way the page prints it (the CSV keeps raw counts). */
export const pct = (part: number, whole: number) => (whole ? `${((100 * part) / whole).toFixed(1)}%` : "-");
export const share = (part: number, whole: number) => (whole ? (100 * part) / whole : 0);
export const num = (n: number) => n.toLocaleString("en-IN");

/** Trades sorted from the lowest to the highest own-website share: the order the chart reads in. */
export const tradesByOwnShare = () => [...STUDY.trades].sort((a, b) => share(a.own, a.n) - share(b.own, b.n));

/** City rows with enough trade records for a per-trade table (each shown trade needs MIN_CELL records). */
export const MIN_CELL = 30;
export const DETAIL_CITY_MIN = 750;
export const detailCities = () => STUDY.cities.filter((c) => c.n >= DETAIL_CITY_MIN);

export const cityAnchor = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const minus = (a: Split, b: Split): Split => ({
  n: a.n - b.n,
  own: a.own - b.own,
  shared: a.shared - b.shared,
  directory: a.directory - b.directory,
  none: a.none - b.none,
});

/** The rest of Gujarat for a city: Gujarat counts minus the city's counts, per trade (debate round 3: compare a city
 *  with the rest of the state, subtracting counts before computing shares, so the city is not in its own benchmark). */
export function restOfGujarat(city: CityRow): { total: Split; groups: Record<string, Split> } {
  const groups: Record<string, Split> = {};
  for (const t of STUDY.trades) {
    const c = city.groups[t.id] ?? { n: 0, own: 0, shared: 0, directory: 0, none: 0 };
    groups[t.id] = minus(t, c);
  }
  return { total: minus(STUDY.total, city), groups };
}

/** City pages that exist as their own study page (approved: Surat, debate round 3). */
export const CITY_PAGES = ["Surat"] as const;
export const cityPath = (name: string) => `${STUDY.path}/${cityAnchor(name)}`;
export const getCity = (name: string) => STUDY.cities.find((c) => c.name === name);

export function csv(): string {
  const head = ["city", "trade", "records", "retained_url_low_reuse_host", "retained_url_shared_host_or_locator_pattern", "retained_url_directory_or_marketplace", "no_url_retained_after_filtering"];
  const rows: (string | number)[][] = [];
  for (const c of STUDY.cities) {
    rows.push([c.name, "all 17 trades", c.n, c.own, c.shared, c.directory, c.none]);
    for (const t of STUDY.trades) {
      const g = c.groups[t.id];
      if (g && g.n) rows.push([c.name, t.label, g.n, g.own, g.shared, g.directory, g.none]);
    }
  }
  rows.push(["Gujarat (all cities)", "all 17 trades", STUDY.total.n, STUDY.total.own, STUDY.total.shared, STUDY.total.directory, STUDY.total.none]);
  for (const t of STUDY.trades) rows.push(["Gujarat (all cities)", t.label, t.n, t.own, t.shared, t.directory, t.none]);
  const q = (v: string | number) => (typeof v === "number" ? String(v) : `"${v.replace(/"/g, '""')}"`);
  const preamble = [
    `# SiteBlitz - Gujarat business-listing website study, version ${STUDY.version}, published ${STUDY.published}`,
    `# Source: ${STUDY.source}. Listing records with no brand recorded, 17 selected trades. City rows: Gujarat cities with 1,500+ place records; "Gujarat (all cities)" rows: the whole state.`,
    `# Classes describe the one URL our extract retains per record after filtering, not verified ownership: low-reuse host = host in 1-2 of the ${STUDY.total.n} study records; shared host or locator pattern = host in ${STUDY.sharedHostMin}+ records or a published locator pattern. CC BY 4.0 applies to these SiteBlitz aggregates, not to the Overture source.`,
    `# Counts describe listing records, not every business in a city. Method: ${SITE.url}${STUDY.path}#method`,
    "# Attribution: Overture Maps Foundation (overturemaps.org); CDLA-Permissive-2.0, Apache-2.0 (Foursquare), CC0 (AllThePlaces).",
  ];
  return [...preamble, head.join(","), ...rows.map((r) => r.map(q).join(","))].join("\n") + "\n";
}
