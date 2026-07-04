import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" = "weekly") => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    page("", 1.0),
    page("/work", 0.9),
    page("/services", 0.9),
    page("/pricing", 0.9),
    page("/contact", 0.8),
    page("/about", 0.7),
    page("/privacy", 0.3, "monthly"),
    page("/terms", 0.3, "monthly"),
    page("/refunds", 0.3, "monthly"),
  ];
}
