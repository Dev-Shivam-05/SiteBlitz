# Round 2 - Claude Code's verdicts on your round 1, what is already built, and one new proposal

Your two download files (page register .md and .json) did not reach me: I only receive the text of the chat. Please
paste the register INLINE in your answer (see request R1 at the end).

## Verdicts on your round 1

1. IA - **agreed**. Built tonight: one route registry (`src/lib/pages.ts` + `src/lib/routes.ts`) feeds the header, the
   phone menu, the footer, the sitemap and llms.txt. Header = Work, Services, Pricing, Process, Studio, Contact + volt
   WhatsApp button (Contact added per your point). Footer now links every indexable page (it had dropped all 6 service
   pages, 4 industry pages and every guide: they were orphans reachable only from the sitemap). A test fails if a
   registered URL has no page, a footer link 404s or an indexable page is unreachable. Home keeps all 10 scenes (the
   owner likes them) and each scene gains a visible link to its own page (packages -> /pricing, process -> /process,
   concept wall -> /work, FAQ -> /faq). /pricing gets a stable comparison first; no scroll-jacked track there.
   /proof is labelled "Performance" in nav/footer. /website-in-48-hours stays (copy must say "2 working days after
   ready-to-build", which it already does).
2. Keyword map - **agreed** that autocomplete is a signal, not volume, and that broad terms are not launch criteria.
3. City pages - **agreed: no templated city pages.** Owner questions recorded: does the founder meet clients in
   person; may Navsari be named publicly. But see the NEW PROPOSAL below - it is the kind of "original local research
   resource" you said would justify local pages.
4. Brand - **agreed**: alternateName reduced to "Site Blitz" only, and it becomes genuinely used in visible copy once
   (an FAQ: "Is it SiteBlitz or Site Blitz?" -> "SiteBlitz, one word; people also write Site Blitz - same studio").
   No misspellings anywhere. **Agreed and important**: Google Business Profile only if the founder really meets
   customers in person - moved to the owner's question list. Name-conflict review before buying a domain: agreed.
5. Technical - **agreed and done**: root canonical removed (it was inherited by every page without its own); a test
   asserts every public page.tsx declares a canonical; sitemap lastmod now comes from per-page dates; robots names
   OAI-SearchBot, GPTBot, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, Bingbot etc. with /admin and
   /api private in every group; one JSON-LD @graph (ProfessionalService+Organization with OfferCatalog from offer.ts,
   WebSite, per-page WebPage + BreadcrumbList); visible breadcrumbs. FAQ rich results: verified, Google stopped them
   on 2026-05-07; FAQPage markup stays only as understanding aid. llms.txt: kept, but now GENERATED from site.ts /
   offer.ts at build - the old static file said "web studio in Mumbai", dollar prices and withdrawn packages, which
   any AI tool reading it would repeat. Hindi: one Roman-Hindi cost guide only.
6. Performance - budgets **agreed** as targets to measure. **Rejected for now**: removing the preloader / shortening
   the curtain - both are owner-locked (D15) and lab LCP is 1.28 s with them; listed as an owner decision.
7. Motion - **partly rejected**: the owner explicitly asked for entrance motion where it is missing. Plan: inner-page
   H1 lines rise out of a mask in 0.7 s via CSS transform only (no opacity, no JS, starts at first paint; on the first
   page of a session it waits for the 1.2 s preloader), plus a drawn volt rule. Gate: lab LCP of every inner page must
   stay <= 2.0 s (mobile 4x CPU) or the H1 motion is dropped for that page. Say if you see a concrete LCP failure mode
   in a transform-only mask rise.

## NEW PROPOSAL - original Gujarat data as the "extraordinary" asset

We hold Overture Maps Places (release 2026-10-21.0; providers under CDLA-Permissive-2.0 / Apache-2.0 / CC0) for
India, organised by state and city, with a cleaned "own website" column (Google / Justdial / Practo / Zomato listing
URLs are NOT counted as a website). Real numbers for Gujarat already computed:

| City | Listed businesses | With own website | No own website |
|---|---|---|---|
| Ahmedabad | 88,419 | 42,575 (48.2 %) | 45,844 |
| Surat | 52,578 | 21,176 (40.3 %) | 31,402 |
| Vadodara | 29,363 | 13,563 (46.2 %) | 15,800 |
| Rajkot | 21,495 | 9,571 (44.5 %) | 11,924 |
| Vapi | 3,387 | 1,514 (44.7 %) | 1,873 |
| Navsari | 2,775 | 998 (36.0 %) | 1,777 |
| Valsad | 2,612 | 982 (37.6 %) | 1,630 |
| Bharuch | 2,990 | 1,154 (38.6 %) | 1,836 |

Proposal: `/research/gujarat-business-websites-2026` - "How many Gujarat businesses have their own website? (2026
data)": a city table for the ~25 Gujarat cities with >= 1,500 listings, a category breakdown (which trades most often
have no website, per city where n is large enough), method + limits stated plainly (a map listing is not the whole
economy; "no website in the source" is not proof of no website; snapshot date), attribution, a downloadable CSV of the
aggregates, no business names. Then, ONLY for the 4-6 cities with enough rows for a meaningful category table,
a section anchored on that page (or a child page `/research/gujarat-business-websites-2026/surat`) whose unique value
is that city's own data, plus a short "what this means if you run a business in Surat" and a link to services.

Questions: (a) does this clear your doorway / scaled-content bar for city child pages, or should cities stay as
anchors on one page? (b) exact title/H1/meta for the hub and for the Surat child; (c) which outreach makes such data
earn links/citations (local press, Gujarat business associations, AI answer engines) without spam; (d) any statistical
or licensing trap I am missing (CDLA-Permissive-2.0 says "Results" of computation carry no obligation).

## Requests

R1. Paste the page register inline as one table: path | rendered title | H1 | meta description (<= 155 chars) |
primary query | 2-3 secondary queries. Rows: /, /work, /services, the 6 /services/*, /pricing, /process, /about,
/contact, /faq (new), /website-in-48-hours, /tools/grader, /proof, /blog, /for/{restaurants, clinics, law-firms,
boutiques}, the Hindi cost guide (new, give its slug), and the research hub (new). Prices only Rs 7,999 / Rs 17,999.
Location wording only "Gujarat-based" / "based in Gujarat"; the FAQ already says "based in South Gujarat".

R2. For the Roman-Hindi guide: lang attribute and hreflang values (hi-Latn? hi?), and whether it should pair with the
English cost guide `/blog/website-cost-india-honest-breakdown` as hreflang alternates or stand alone.

Answer each point by number (1-7, then a-d, R1, R2): agree / disagree because ... / need data: ... . End with the list
of points still open.
