import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { DEEP_SERVICES, BLOG_POSTS, INDUSTRY_LANDERS } from "@/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (
    path: string,
    priority: number,
    changeFrequency: "daily" | "weekly" | "monthly" = "weekly"
  ) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    page("", 1.0),
    page("/work", 0.9),
    page("/services", 0.9),
    ...DEEP_SERVICES.map((s) => page(`/services/${s.slug}`, 0.85)),
    page("/pricing", 0.9),
    page("/process", 0.8),
    page("/tools/grader", 0.8),
    ...INDUSTRY_LANDERS.map((l) => page(`/for/${l.slug}`, 0.75)),
    page("/blog", 0.7),
    ...BLOG_POSTS.map((p) => page(`/blog/${p.slug}`, 0.65, "monthly")),
    page("/contact", 0.8),
    page("/book", 0.8),
    page("/about", 0.7),
    page("/proof", 0.6, "daily"),
    page("/privacy", 0.3, "monthly"),
    page("/terms", 0.3, "monthly"),
    page("/refunds", 0.3, "monthly"),
  ];
}
