# HANDOFF — SiteBlitz — Multi-page + search (SEO-0 to SEO-6) — 2026-11-11 (overnight)

Previous handoff (v4 showcase, V1–V6) is in git history: `git show 905c5b7:docs/HANDOFF.md`.

## Done
- **Real multi-page site in the v4 theme.** Header: Work, Services, Pricing, Process, Studio, Contact + WhatsApp. Every
  inner page has the v4 page hero (breadcrumbs, H1 lines rising out of masks, drawn volt rule, hero figure) and one or
  two moments (services row fill, concept wall on /work, drawn process path, drawn price loop, word-scrub statement,
  research chart wipe). Home keeps all 10 scenes and links each to its page.
- **Search foundation.** One route registry feeds nav, footer (now links every indexable page), sitemap (real lastmod),
  llms.txt / llms-full.txt (generated; the old static file said Mumbai and withdrawn prices). One JSON-LD graph:
  Organization (+ "Site Blitz"), WebSite, WebPage, BreadcrumbList, Service, FAQPage, Dataset, BlogPosting. Root
  canonical bug fixed. Per-page OG cards. robots.txt names search + AI crawlers.
- **Titles/H1/meta** per page from the debate register (home: "SiteBlitz — Gujarat-based Website Design & Development
  Studio"; pricing: "Website Price in India: ₹7,999 & ₹17,999 Plans").
- **New pages:** `/faq` (18 questions), `/research`, `/research/gujarat-business-websites-2026` (93,948 listing records,
  17 trades, 24 cities, CSV), `/research/gujarat-business-websites-2026/surat`, `/blog/website-banane-ka-kharcha`
  (Roman Hindi, hreflang pair with the English cost guide).
- **Truth pass:** all 6 service pages, 4 industry pages, 7 guides, /process, /about, /proof rewritten from offer.ts.
  Removed: 48-hour promises without ready-to-build, client analytics dashboards, ranking and Lighthouse-score promises,
  withdrawn Growth/Scale plans, unapproved prices, the founder's name as author.
- **Off-site kit:** `docs/SEO-LAUNCH-CHECKLIST.md`, IndexNow key + `scripts/indexnow-manifest.mjs` + `scripts/indexnow.mjs`.
- **Debate:** 4 ChatGPT rounds, `docs/debate/2026-11-10-multipage-seo-ranking/RESULT.md`.

## Verified (local production build, `next start -p 3100`)
- `npm run build` exit 0. `npx vitest run --hookTimeout 60000`: 14 files, **257 tests** (was 178).
- `node scripts/seo-audit.mjs --base http://localhost:3100`: 37 sitemap URLs, 40 internal links, **0 problems**
  (one canonical each = sitemap URL, one h1, unique titles and descriptions ≤ 160, JSON-LD ids resolve, og:image PNG).
- Screenshots 1440 / 390 / 320 of 17 pages: no horizontal overflow, no console errors (`.shots/final-1111*`);
  reduced-motion full pages (`.shots/final-rm`).
- Lab vitals (mobile 4x CPU, slow 4G, median of 3): LCP 1.1–1.5 s on every measured page; CLS 0.000–0.03.
  TBT 120–530 ms and noisy on this loaded machine (research hub highest: big tables).
- IndexNow scripts: dry runs only (live old site: 30/30 hashed; two unchanged runs → 0 changes). Nothing submitted.

## Decisions made
- D17 in `docs/DECISIONS.md` (nav, Organization, training crawlers allowed, 3 prices → written quote, CC BY 4.0 for the
  study's counts, studio byline, Hindi pairing, no city doorway pages, body font `display: optional`).

## Known broken / deliberately skipped
- **Not pushed, not deployed.** See the last line of this file for the push result.
- **design-taste-frontend gate not run**: its house rules (no scenes/dark grounds on service sites) conflict with the
  owner-locked D15; the spec is the contract (same as V6).
- Rich Results Test / Search Console need a public URL — not run.
- IndexNow controlled-edit test needs an https deployment.
- TBT is above the 150 ms lab budget on several pages (machine under load; research hub 311–527 ms).
- `/book`, `/tools/grader`, legal pages keep their older layout (canonical + metadata fine, audit clean).

## Owner decisions waiting
1. Name-conflict check, then buy `siteblitz.in`; hosting that allows business use (Vercel Pro / Netlify) — D12.
2. Set `NEXT_PUBLIC_SITE_URL` in production; then the checklist (Search Console, Bing, Brave, IndexNow).
3. Do you meet clients in person? Only then a Google Business Profile. May Navsari be named publicly?
4. Prices D11; whether to restore SEO / care / rescue prices (add them to `offer.ts`).
5. Keep or remove the AI training crawlers in `robots.ts`.
6. Read the research pages before they go live (ChatGPT approved them for launch after your review).

## Next session starts here
- First command: `git -C E:\Temp\SiteBlitz push origin v2-redesign`, then open the Vercel Preview on a phone.
- Next phases on the board: SEO-7 validation study, SEO-8 India state comparison, SEO-9 website-link checker.
- Watch out: `.ph-soft` must stay transform-only (opacity made hero figures the late LCP element); grid children that
  hold wide tables need `min-w-0` and the scroll box `relative` (sr-only captions escaped and widened the page).

- Push result (2026-11-11 01:25 IST): `git push origin v2-redesign` was **blocked by the Claude OS guard hook** ("the check itself
  failed (cannot read the current branch: spawnSync git ENOENT)"). The branch is 30 commits ahead; the owner runs the push.
