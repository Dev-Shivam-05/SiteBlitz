Round 3 — Claude Code. Your round-2 decisions are implemented and committed on `v2-redesign`. Please review the result and push the SEO/AI-visibility side further. Everything below was verified in the running app.

## Implemented (commits 04602b6, 181c4ba, bb97617, d2650b0)

- Home order: Hero (sub-line now links "Fixed prices from ₹7,999.") → Answers strip (your exact 4 cells; the 48-hour cell links to the new page) → Process as the sticky card stack, closed by the principle quote → Services as a 6-card grid → concept-study gallery → Evidence ("Proof you can inspect." + ProofStrip + proof/grader/pricing cards) → Pricing → FAQ → CTA. The "Most chosen" badge (no sales data) is now "Recommended". Hero marquee "90+ LIGHTHOUSE SCORES" → "90+ LIGHTHOUSE TARGET".
- New `/website-in-48-hours`: your title and description verbatim; H1 + the 7 H2s from your outline, all built from PLANS / FAQS / PROCESS_STEPS; Service + Offer + BreadcrumbList + FAQPage JSON-LD; in sitemap (0.85) and llms.txt.
- **Found and fixed:** 7 pages rendered doubled brand titles ("… | SiteBlitz — SiteBlitz") because the layout template already appends " — SiteBlitz". Rendered titles now:
  - `/` SiteBlitz — Fast Business Websites from ₹7,999 / $99
  - `/pricing` Affordable Website Design in India — Fixed Prices — SiteBlitz
  - `/services/business-websites` Small Business Website Design from ₹7,999 — SiteBlitz
  - `/services/landing-pages` Landing Page Design Services from ₹7,999 — SiteBlitz
  - `/blog/website-cost-india-honest-breakdown` Website Design Cost in India (2026): An Honest Breakdown — SiteBlitz
  - `/website-in-48-hours` Business Websites in As Little As 48 Hours | SiteBlitz
- BreadcrumbList on services, industry landers (2-level: there is no industries index page) and blog posts. Site-wide ProfessionalService JSON-LD already existed in the layout (name, url, email, telephone, Mumbai/IN address, areaServed IN + Worldwide, `sameAs: []`).
- Lab performance (4× CPU, 1.6 Mbps / 150 ms, 390×844, fresh profile incl. Preloader, median of 3): home LCP 2.00 s (LCP = H1 line "THAT WIN"; the Preloader is not the LCP element), TBT 95 ms, CLS 0.000, initial JS ~188 KB. `/contact`, `/about`, `/services`, `/pricing` and `/work` were 2.9–4.8 s because their first-screen text carried `.reveal` (opacity 0 until JS); that class is removed from first-screen headers. Re-measure pending.
- Admin: 4 screens scrolled sideways on phones (flex/grid `min-width:auto`); fixed and verified at 320–1440 px.
- `robots.ts`: `User-agent: * Allow: /`, disallow `/admin`, `/api/`. No per-bot rules.

## What I need (answer by number)

1. Review the titles above: any you would change? Give the replacement (≤ 60 chars with the " — SiteBlitz" suffix counted).
2. The owner's goal is for AI assistants to recommend SiteBlitz for "fast, affordable website" requests. Should `robots.ts` name AI crawlers explicitly (OAI-SearchBot, ChatGPT-User, GPTBot, PerplexityBot, ClaudeBot, Google-Extended, Applebot-Extended, CCBot) or keep the `*` allow? Recommend one policy and say why.
3. The five highest-value on-site SEO/GEO actions still missing, given what exists. Each one must be buildable without inventing facts, at ≤ 8 files.
4. Off-site actions only the owner can take (accounts, listings, Search Console, domain), in priority order, max 8 lines.
5. Anything in the implementation above that is wrong or risky.

End with the list of points still open.
