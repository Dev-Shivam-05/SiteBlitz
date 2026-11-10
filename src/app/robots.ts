import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

const PRIVATE = ["/admin", "/api/"];

/** AI answer engines and their search crawlers, named on purpose: SiteBlitz wants to be cited by ChatGPT search,
 *  Claude, Perplexity, Gemini and Copilot. A crawler that has its own group ignores the "*" group, so each named
 *  group repeats the private paths. */
const AI_AND_SEARCH_BOTS = [
  "Googlebot",
  "Bingbot",
  "Google-Extended",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Applebot",
  "Applebot-Extended",
  "DuckDuckBot",
  "YandexBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: AI_AND_SEARCH_BOTS, allow: "/", disallow: PRIVATE },
      { userAgent: "*", allow: "/", disallow: PRIVATE },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
