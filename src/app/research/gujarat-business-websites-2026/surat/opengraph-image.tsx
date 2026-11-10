import { ogCard, OG_SIZE } from "@/lib/og";
import { getCity, num, pct, restOfGujarat } from "@/lib/research";

export const runtime = "edge";
export const alt = "Surat business website data 2026, a SiteBlitz study";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  const c = getCity("Surat")!;
  const rest = restOfGujarat(c).total;
  return ogCard({
    kicker: "Research · Surat",
    title: `Website links in ${num(c.n)} Surat listing records, trade by trade.`,
    sub: `${pct(c.own, c.n)} retained a low-reuse-host URL; the rest of Gujarat ${pct(rest.own, rest.n)}.`,
  });
}
