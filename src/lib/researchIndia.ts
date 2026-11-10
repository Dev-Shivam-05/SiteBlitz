import data from "@/content/generated/research-india-websites-2026.json";
import { SITE } from "./site";
import type { Split } from "./research";

/**
 * India state/UT comparison (SEO-8, debate round 4 Q3.2). Same 17 activity-defined trades and URL classes as the
 * Gujarat study, but host frequency is computed ONCE over the national population, so a state's low-reuse share is not
 * comparable with the Gujarat study's. The principal measure is "any website URL recorded"; host reuse is secondary.
 * Built offline by E:\tmp\_sb_research\india_final.py + india_states.py (scratch); counts only.
 */

export interface StateRow extends Split {
  name: string;
  groups: Record<string, Split>;
}

export const INDIA = {
  slug: "india-business-website-records-2026",
  path: "/research/india-business-website-records-2026",
  csvPath: "/research/india-business-website-records-2026/data.csv",
  published: "2026-11-11",
  updated: "2026-11-11",
  version: "1.0",
  source: data.source,
  sourceRelease: data.sourceRelease,
  allPlaceRecords: data.allPlaceRecords,
  total: data.total as Split,
  trades: data.trades as (Split & { id: string; label: string })[],
  states: data.states as StateRow[],
  unclear: data.unclear as Split & { rawValues: number },
  validation: data.validation,
} as const;

/** States with fewer records than this are shown but marked: a few hundred records swing too much to compare. */
export const SMALL_STATE = 1000;
/** Only states with at least this many records are named as highest or lowest in the text. */
export const NAMED_STATE_MIN = 10000;

export const anyUrl = (s: Split) => s.n - s.none;
export const stateAnchor = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export function indiaCsv(): string {
  const head = ["state_or_ut", "trade", "records", "any_website_url", "low_reuse_website_url", "shared_host_or_locator_pattern_url", "directory_marketplace_url_only", "no_url_in_website_field"];
  const rows: (string | number)[][] = [];
  const push = (place: string, trade: string, s: Split) => rows.push([place, trade, s.n, anyUrl(s), s.own, s.shared, s.directory, s.none]);
  push("India", "all 17 trades", INDIA.total);
  for (const t of INDIA.trades) push("India", t.label, t);
  for (const s of INDIA.states) {
    push(s.name, "all 17 trades", s);
    for (const t of INDIA.trades) if (s.groups[t.id]?.n) push(s.name, t.label, s.groups[t.id]);
  }
  push("State not clear in the source", "all 17 trades", INDIA.unclear);
  const q = (v: string | number) => (typeof v === "number" ? String(v) : `"${v.replace(/"/g, '""')}"`);
  return [
    `# SiteBlitz - India business-listing website records by state, version ${INDIA.version}, published ${INDIA.published}`,
    `# Source: ${INDIA.source}. Listing records with no brand recorded, 17 selected trades. Host frequency computed once over all ${INDIA.total.n} India records.`,
    `# Classes describe recorded URLs, not verified ownership. Method: ${SITE.url}${INDIA.path}#method`,
    "# Attribution: Overture Maps Foundation (overturemaps.org); CDLA-Permissive-2.0, Apache-2.0 (Foursquare), CC0 (AllThePlaces).",
    head.join(","),
    ...rows.map((r) => r.map(q).join(",")),
  ].join("\n") + "\n";
}
