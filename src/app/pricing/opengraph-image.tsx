import { ogCard, OG_SIZE } from "@/lib/og";
import { businessPkg, launchPkg } from "@/lib/offer";

export const runtime = "edge";
export const alt = "SiteBlitz website prices and terms";
export const size = OG_SIZE;
export const contentType = "image/png";

const rs = (n: number | null) => `Rs ${(n ?? 0).toLocaleString("en-IN")}`;

export default function Image() {
  return ogCard({
    kicker: "Pricing",
    title: `One page ${rs(launchPkg.priceInr)}. Three pages ${rs(businessPkg.priceInr)}.`,
    sub: "One-time build prices, no GST added. Scope, payments and exclusions written upfront.",
  });
}
