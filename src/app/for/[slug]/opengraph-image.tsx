import { ogCard, OG_SIZE } from "@/lib/og";
import { getLander } from "@/content";

export const runtime = "edge";
export const alt = "SiteBlitz websites for a trade";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const l = getLander((await params).slug);
  return ogCard({
    kicker: l ? `For ${l.industry.toLowerCase()}` : "Industries",
    title: l ? l.headline.replace(/\*/g, "") : "Websites by trade",
    sub: "See a working demo and the price before you pay.",
  });
}
