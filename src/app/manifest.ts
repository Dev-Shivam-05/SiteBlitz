import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { FROM_PRICE, inr } from "@/lib/offer";

/** Web app manifest. The copy comes from site.ts / offer.ts like every other page (the old text still promised
 *  "shipped in 48 hours" and "SEO-first" after the truth pass removed both; audit 2026-11-11). */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — Gujarat-based website studio`,
    short_name: SITE.name,
    description: `Business websites with upfront prices from ${inr(FROM_PRICE)}, working demos and a homepage concept to review before you pay.`,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0c",
    theme_color: "#0a0a0c",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
