import { ogCard, OG_SIZE } from "@/lib/og";
import { getPost } from "@/content";

export const runtime = "edge";
export const alt = "A SiteBlitz guide";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPost((await params).slug);
  return ogCard({ kicker: "Guide", title: p ? p.title : "Website guides", sub: p ? `${p.readingMinutes} min read` : undefined });
}
