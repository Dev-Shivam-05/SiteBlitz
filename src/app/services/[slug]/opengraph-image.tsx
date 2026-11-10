import { ogCard, OG_SIZE } from "@/lib/og";
import { getService } from "@/content";

export const runtime = "edge";
export const alt = "A SiteBlitz website service";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const s = getService((await params).slug);
  return ogCard({
    kicker: "Service",
    title: s ? s.headline.replace(/\*/g, "") : "Website services",
    sub: s ? (s.startingPriceINR > 0 ? `From Rs ${s.startingPriceINR.toLocaleString("en-IN")}` : "Priced by written quote") : undefined,
  });
}
