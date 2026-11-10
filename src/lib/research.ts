import data from "@/content/generated/research-gujarat-websites-2026.json";
import { SITE } from "./site";

/**
 * Gujarat business-listing website study (SEO-4, 2026-11-11). Counts only, built offline from the Overture Maps Places
 * release 2026-10-21.0 by E:\tmp\_sb_research\gujarat_final.py (scratch, not in the repo); no business names, phones or
 * URLs are stored. The page and the CSV both read this module, so a number can only change in the JSON.
 *
 * Wording rule (debate round 2): these are listing RECORDS. "No website recorded" is not "the business has no website".
 */

export interface Split {
  n: number;
  own: number;
  shared: number;
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

export function csv(): string {
  const head = ["city", "trade", "records", "own_website", "chain_or_marketplace_page_only", "no_website_recorded"];
  const rows: (string | number)[][] = [];
  for (const c of STUDY.cities) {
    rows.push([c.name, "all 17 trades", c.n, c.own, c.shared, c.none]);
    for (const t of STUDY.trades) {
      const g = c.groups[t.id];
      if (g && g.n) rows.push([c.name, t.label, g.n, g.own, g.shared, g.none]);
    }
  }
  rows.push(["Gujarat (all cities)", "all 17 trades", STUDY.total.n, STUDY.total.own, STUDY.total.shared, STUDY.total.none]);
  for (const t of STUDY.trades) rows.push(["Gujarat (all cities)", t.label, t.n, t.own, t.shared, t.none]);
  const q = (v: string | number) => (typeof v === "number" ? String(v) : `"${v.replace(/"/g, '""')}"`);
  const preamble = [
    `# SiteBlitz - Gujarat business-listing website study, version ${STUDY.version}, published ${STUDY.published}`,
    `# Source: ${STUDY.source}. Independent (no brand) listing records in 17 local trades. City rows: Gujarat cities with 1,500+ place records; "Gujarat (all cities)" rows: the whole state.`,
    `# own_website: a website URL whose host is not shared by ${STUDY.sharedHostMin}+ records and is not a marketplace or listing site.`,
    `# Counts describe listing records, not every business in a city. Method: ${SITE.url}${STUDY.path}#method`,
    "# Attribution: Overture Maps Foundation (overturemaps.org); CDLA-Permissive-2.0, Apache-2.0 (Foursquare), CC0 (AllThePlaces).",
  ];
  return [...preamble, head.join(","), ...rows.map((r) => r.map(q).join(","))].join("\n") + "\n";
}
