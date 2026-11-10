import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

const PRIVATE = ["/admin", "/api/"];

/** Search engines and AI crawlers, named on purpose. SiteBlitz wants to be found and cited by ChatGPT search, Claude,
 *  Perplexity, Gemini and Copilot. The training crawlers (GPTBot, ClaudeBot, Google-Extended, Applebot-Extended) are
 *  allowed too, chosen for the owner's stated goal of the widest AI visibility: this is public marketing copy, and models
 *  that have read it can name the studio.
 *  That is a business decision, reversible here (docs/DECISIONS.md D17); search inclusion does not depend on it.
 *  A crawler that has its own group ignores the "*" group, so each named group repeats the private paths. Robots
 *  rules only ask crawlers to stay out: /admin and /api/admin are protected by authentication (src/middleware.ts). */
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
