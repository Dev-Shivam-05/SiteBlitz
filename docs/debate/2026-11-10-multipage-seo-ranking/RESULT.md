# Review - SiteBlitz multi-page site + SEO ranking - 2026-11-10/11 - 4 rounds - prompt: siteblitz-seo-multipage

The owner asked for a real multi-page site in the v4 theme, the brand name (and misspellings) on top, ranking for
website-development searches, performance and more animation, then went to sleep with "build whatever you can".
Rounds: `01`-`04` in this folder. Evidence: `evidence.md`, `autocomplete.md` (live Google/Bing suggestions).

| # | Point | Proposed by | Evidence (file:line / round) | Claude's verdict | Status |
|---|---|---|---|---|---|
| 1 | Real-page nav (Work, Services, Pricing, Process, Studio, Contact) from one route registry; footer links every indexable page | Claude r1, ChatGPT r1 (+Contact) | `src/lib/pages.ts`, `src/lib/routes.ts`; test "reaches every indexable page" | agreed | done `a53f286`, `7b5dd65` |
| 2 | Home keeps its 10 scenes, each links to its own page; H1 keeps the creative line with a visible keyword kicker | ChatGPT r1 | `src/components/site/sections/Home.tsx` | agreed | done |
| 3 | Root canonical inherited by every page | ChatGPT r1 | `src/app/layout.tsx` (removed); `scripts/seo-audit.mjs` checks rendered canonicals | agreed | done, 37 URLs 0 problems |
| 4 | One JSON-LD graph: Organization (ProfessionalService is deprecated), WebSite, WebPage, BreadcrumbList, Service, FAQPage, Dataset, BlogPosting | Claude r1, ChatGPT r2 | `src/lib/seo.ts` | agreed | done |
| 5 | alternateName only "Site Blitz", used visibly once; no misspellings anywhere | ChatGPT r1 | `/faq`, `/about` | agreed | done |
| 6 | Sitemap lastmod from real dates, not build time | Claude r1 | `src/app/sitemap.ts`, test | agreed | done |
| 7 | llms.txt generated from site.ts/offer.ts (the static one said Mumbai, $ prices, withdrawn plans); no ranking value claimed | Claude r1, ChatGPT r2 | `src/lib/llms.ts`, test | agreed | done |
| 8 | Robots names search + AI crawlers; training bots allowed by owner goal (reversible) | Claude r1; ChatGPT r2 disagreed on training bots | `src/app/robots.ts`, D17 | partly rejected (owner wants widest AI visibility) | done, owner may reverse |
| 9 | Templated city pages | Claude r1 proposed | ChatGPT r1: doorway risk | rejected | not built |
| 10 | Gujarat research study as the original asset (Overture data), with Surat page | Claude r2 | `/research/gujarat-business-websites-2026`, `/surat` | agreed after rounds 3-4 corrections (activity-based trades, four measured classes, defined live-check outcomes, no ownership or upper-bound claims) | done; ChatGPT approves publication after owner review |
| 11 | Roman-Hindi cost guide paired with the English one (hreflang en / hi-Latn / hi), neutral copy | ChatGPT r2-r3 | `/blog/website-banane-ka-kharcha`, test | agreed | done |
| 12 | Content truth pass (no 48-hour promise without ready-to-build, no client dashboards, no ranking/Lighthouse promises, no founder name) | Claude (audit) | all `src/content/generated/*.json`, `/process`, `/about`, `/proof` | agreed | done |
| 13 | SEO, care and rescue prices not in offer.ts -> written quote; landing page Rs 7,999 only within Launch scope | Claude r3, ChatGPT r3 | service JSON | agreed | done, owner may restore with approval |
| 14 | Inner-page motion: CSS mask-rise H1 + drawn rule, one or two moments per page, no per-block fades | Claude r2; ChatGPT r2 conditional (LCP gate) | `PageHero.tsx`, `globals.css` | agreed with LCP gate | done; LCP measured, see HANDOFF |
| 15 | Preloader / curtain shortening | ChatGPT r1 | D15 owner-locked | rejected for now | owner decision |
| 16 | IndexNow change-only submissions + founder off-site checklist | ChatGPT r3 | `scripts/indexnow*.mjs`, `docs/SEO-LAUNCH-CHECKLIST.md` | agreed | done (dry runs only) |
| 17 | Per-page OG cards | ChatGPT r1 | `src/lib/og.tsx` + 6 route cards + default | agreed | done |

## Recommended next steps (not started)
- SEO-7: validation study of what a missing or recorded website link means (structured review sample) - ChatGPT r4 Q3.1.
- SEO-8: one India state/UT comparison on the same method, national host frequency computed once, states as anchors.
- SEO-9: single-business website-link checker (Overture snapshot only, index the tool page only; record-level licence check first).

## Points still open
- Owner: name-conflict check + domain, commercially permitted hosting, NEXT_PUBLIC_SITE_URL, in-person service (decides Google Business Profile), whether to name Navsari publicly, prices D11, D15 preloader.
- Production verification after deploy (canonicals, sitemap, OG, Search Console) - nothing here is deployed.
- IndexNow controlled-edit test needs an https deployment.
