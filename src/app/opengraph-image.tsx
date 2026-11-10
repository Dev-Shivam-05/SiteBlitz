import { ogCard, OG_SIZE } from "@/lib/og";
import { FROM_PRICE } from "@/lib/offer";

export const runtime = "edge";
export const alt = "SiteBlitz - website design and development studio based in Gujarat, India";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return ogCard({
    kicker: "Websites",
    title: "Business websites with the price upfront.",
    sub: `From Rs ${FROM_PRICE.toLocaleString("en-IN")}. See a working demo and review a homepage concept before you pay.`,
  });
}
