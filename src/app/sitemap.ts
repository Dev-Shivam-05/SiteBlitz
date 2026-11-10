import type { MetadataRoute } from "next";
import { absUrl } from "@/lib/seo";
import { allIndexable } from "@/lib/routes";

/** Built from the route registry (src/lib/routes.ts): real per-page lastmod dates, never the build time. */
export default function sitemap(): MetadataRoute.Sitemap {
  return allIndexable().map((e) => ({
    url: absUrl(e.path),
    lastModified: new Date(`${e.updated}T00:00:00+05:30`),
    changeFrequency: e.freq,
    priority: e.priority,
  }));
}
