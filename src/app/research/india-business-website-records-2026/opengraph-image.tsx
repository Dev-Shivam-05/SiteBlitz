import { ogCard, OG_SIZE } from "@/lib/og";
import { INDIA, anyUrl } from "@/lib/researchIndia";
import { pct } from "@/lib/research";

export const runtime = "edge";
export const alt = "India business website records by state, 2026, a SiteBlitz study";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  const T = INDIA.total;
  return ogCard({
    kicker: "Research · India",
    title: `${pct(anyUrl(T), T.n)} of 1.3 million Indian listing records carry a website link.`,
    sub: `${INDIA.states.length} states and union territories, 17 trades. Method, limits and CSV.`,
  });
}
