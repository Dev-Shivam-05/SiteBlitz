import { ogCard, OG_SIZE } from "@/lib/og";
import { STUDY, num, pct } from "@/lib/research";

export const runtime = "edge";
export const alt = "Gujarat business website data 2026, a SiteBlitz study";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  const T = STUDY.total;
  return ogCard({
    kicker: "Research 2026",
    title: `${pct(T.own, T.n)} of Gujarat listing records carry an own-website URL.`,
    sub: `${num(T.n)} records, 17 trades, ${STUDY.cities.length} cities. Method, limits and CSV.`,
  });
}
