SiteBlitz — Round 3 SEO & AI Visibility Review
Overall verdict: Approve the implemented direction, with three SEO title refinements and several release checks.

The reported homepage restructuring, truthful wording changes, service-page improvements, and performance work are sensible. I would now prioritize crawlability, entity credibility, original buyer-focused content, and measurable search visibility rather than adding more animation or generic SEO pages.

My review is based on Claude Code's reported implementation and current search-engine documentation; I have not independently inspected the v2-redesign repository or preview deployment.
1. SEO titles — accept or replace
Google does not impose a strict 60-character title limit, but concise, descriptive titles are preferable. I have followed your requested 60-character maximum, counting the brand suffix. 

Google for Developers

Page	Verdict	Recommended rendered title	Characters
/	Keep	SiteBlitz — Fast Business Websites from ₹7,999 / $99	52
/pricing	Change	Affordable Website Design in India — Prices — SiteBlitz	55
/services/business-websites	Keep	Small Business Website Design from ₹7,999 — SiteBlitz	53
/services/landing-pages	Keep	Landing Page Design Services from ₹7,999 — SiteBlitz	52
/blog/website-cost-india-honest-breakdown	Change	Website Design Cost in India (2026): Guide — SiteBlitz	54
/website-in-48-hours	Minor change	Business Websites in as Little as 48 Hours — SiteBlitz	54

The pricing title currently has 61 characters; the cost article has 68. The replacement for the 48-hour page simply standardizes the brand separator.

Implementation rule: When using the layout's title.template, supply only the page-specific title. Use title.absolute for intentional exceptions. Validate the rendered <title>, not just the metadata object.

Also verify that titles, visible H1s and Open Graph titles accurately describe the same page.
2. AI crawlers — keep wildcard access
Verdict: Keep User-agent: * with the existing exclusions. Do not add individual AI crawler Allow rules.

The recommended policy is:
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://YOUR-CANONICAL-DOMAIN/sitemap.xml


Use the actual verified production canonical URL, not the placeholder.
Why this is preferable
The wildcard allows legitimate search and AI discovery crawlers without a brittle list that must be maintained whenever providers add or rename agents.
Crawler	Function	Recommendation
OAI-SearchBot	ChatGPT Search discovery	Allow via *
ChatGPT-User	User-requested ChatGPT retrieval	Do not block
GPTBot	OpenAI model-training crawling	Leave allowed under current open policy
PerplexityBot	Perplexity search discovery	Allow via *
Claude-SearchBot, Claude-User	Claude search and user retrieval	Allow via *
ClaudeBot	Anthropic training-related crawling	Leave allowed under current policy
Google-Extended	Google control for Gemini training and certain grounding uses	Leave allowed
Applebot-Extended	Apple's model-training control	Leave allowed
CCBot	Common Crawl public web dataset	Leave allowed

OpenAI explicitly separates OAI-SearchBot from GPTBot, while Anthropic distinguishes its search, user and training bots. Google-Extended is a control token, not an independent crawler, and does not influence Google Search rankings. 

OpenAI Developers+4

Important distinction: Allowing training crawlers is not a documented requirement for appearing in AI-search results. If the owner later wants to restrict AI training, that can be done selectively while preserving search access. For now, I recommend the simplest open policy because the public content is intended for broad discovery.

One technical reason not to add redundant bot-specific groups: specific groups do not automatically inherit * exclusions. An explicit OAI-SearchBot: Allow / group could unintentionally omit the /admin/ and /api/ restrictions. 

Google for Developers

Two crawler checks that matter more than adding bot names
- Verify that Vercel security, firewall and bot protection actually permit legitimate crawler requests, including published OAI-SearchBot IP ranges. Robots permission does not override a 403 or CAPTCHA challenge. 
  
  OpenAI Help Center
- Confirm that production public pages return HTTP 200, visible SSR content, correct canonicals and no unintended noindex. Ensure preview deployments cannot become competing indexed copies.
Also ensure /robots.txt contains the absolute sitemap URL. The Next.js robots.ts metadata route supports this directly. 

Next.js

3. Five highest-value remaining on-site SEO/GEO actions
These are the five changes I would authorize next. Each is independently buildable within your eight-file limit, using existing project facts. File paths are suggested implementation locations and should be checked against the repository.
P0
1. Establish one canonical, indexable production identity

Up to 5 files

Audit SITE.url, metadataBase, canonicals, sitemap, robots.ts, and preview indexing. Ensure preview deployments do not compete with production in search results.

Files: src/lib/site.ts, src/app/layout.tsx, src/app/sitemap.ts, src/app/robots.ts, next.config.ts.

Acceptance: All public pages use the same canonical host, preview responses are protected against indexing, and sitemap URLs resolve correctly. Do not change the domain until ownership is confirmed.



P0
2. Consolidate the entity/schema graph

Up to 4 files

The site-wide ProfessionalService node and homepage Organization node need a shared identity. Use consistent @id references such as SITE.url/#organization and SITE.url/#website.

Remove sameAs: [] until verified external profiles exist. Remove unverified physical address fields. Preserve legitimate Service, Offer, BreadcrumbList and BlogPosting data, and represent INR/USD prices accurately.

Files: src/app/layout.tsx, src/app/page.tsx, src/lib/site.ts, and optionally one shared SEO helper.

Acceptance: No contradictory organization identities, no unsupported business facts, and relevant JSON-LD passes syntax and applicable schema validation. Google recommends truthful organization identity information. 

Google for Developers




P1
3. Turn pricing into an answer-first purchasing guide

Up to 4 files

Strengthen /pricing and /website-in-48-hours with a clear Launch / Growth / Scale comparison: published inclusions, timeline differences, customer responsibilities, documented exclusions, revision terms where specified, and ownership conditions.

Files: src/app/pricing/page.tsx, src/app/website-in-48-hours/page.tsx, src/lib/site.ts, existing shared Pricing component.

Acceptance: Visitors can identify the suitable plan and documented conditions without contacting sales. All information is sourced from existing plans, FAQs and terms.



P1
4. Publish one genuinely useful comparison guide

Up to 5 files

New URL: /compare/website-builder-vs-studio

Proposed H1: Website Builder vs Design Studio: Which Should You Choose?

Compare DIY convenience, skills required, available customization, handoff, ownership and maintenance. Explain when a DIY builder is the better option; use SiteBlitz's verified plans and process only. Do not invent competitor prices or performance results.

Files: new page, src/app/sitemap.ts, public/llms.txt, pricing page, existing dynamic service-page route.

Acceptance: Original decision-making content that addresses a distinct buying question and links meaningfully to relevant services.



P1
5. Make proof interpretable and contextually connected

Up to 6 files

Expand /proof with a concise methodology: what is measured, measurement window, sample size, field versus lab data, and what the numbers do not prove. Explain the grader's scope and limitations.

Add contextual links from the home, service and relevant blog pages to pricing, process, the 48-hour page and proof—not repetitive site-wide keyword blocks.

Candidate files: /proof page, grader page, ProofStrip.tsx, homepage, dynamic service-page route and dynamic blog-page route.

Acceptance: Each metric has a clear interpretation and limitation; relevant pages offer helpful next-reading links. If field samples are insufficient, explicitly say so rather than asserting a passing p75 result.



Google's current AI-search guidance supports this priority: indexed, useful, accessible content is the foundation for appearing in AI Overviews and AI Mode. There is no separate mandatory GEO schema or technical shortcut. 

Google for Developers

Do not add more generic keyword landing pages until there is evidence that they satisfy distinct user intent.
4. Off-site actions requiring the owner
In priority order:
1. Domain: Verify ownership of the preferred SiteBlitz domain and authorize the permanent production host, HTTPS and redirects.
2. Google Search Console: Verify the domain property, submit the sitemap, inspect important URLs and establish a performance baseline.
3. Google AI visibility: Review the Search Console generative-AI performance reports, rolled out worldwide by 31 August 2026. 
   
   Google for Developers
4. Bing Webmaster Tools: Verify site ownership, submit the canonical sitemap and monitor indexing.
5. Real profiles: Verify the official LinkedIn company page and other genuine business profiles, with consistent business name, contact details and URL.
6. Google Business Profile: Create or verify one only if SiteBlitz actually meets Google's in-person customer-contact eligibility; online-only businesses are not eligible. 
   
   Google Business Profile Help
7. Earned credibility: Obtain real client-project permissions when available, publish genuine results and secure relevant references from actual partners, customers or professional organizations.
No purchased fake reviews, manufactured backlinks or mass-generated location pages.
5. Implementation risks and corrections
Priority	Finding	Required action
High	Five non-home pages previously recorded 2.9–4.8s lab LCP.	Re-measure after removing first-screen .reveal. Do not declare performance complete before results.
High	Site-wide ProfessionalService contains an address while local presence remains unverified.	Verify it against actual business facts or remove unsupported physical-location fields.
Medium	Production is separate from the actively developed branch.	Check production canonicals, indexing and performance after release—not only preview.
Medium	The 48-hour page derives from existing pricing, FAQ and process content.	Ensure the page has distinctive eligibility guidance rather than becoming a near-duplicate service page.
Medium	First-visit Preloader still exists.	Keep for now: measured homepage LCP is 2.00s. Verify accessibility, content visibility and real-user effects separately.
Medium	FAQPage and sitemap priority are receiving implementation attention.	Keep truthful FAQs, but Google no longer displays FAQ rich results; Google also ignores sitemap priority. Neither warrants further optimization work.  Google for Developers+1
Medium	Existing tracking uses persistent identifiers and location-derived data.	Complete privacy, disclosure and retention review with counsel before relying on tracking for growth analysis.
Low	"90+ LIGHTHOUSE TARGET" replaces an unsupported results claim.	Accept, provided the target is genuine and clearly distinguished from measured performance.

One further update: Google announced a planned shared AI-training control on 30 October 2026, with support targeted for 2027. Do not implement that future signal as a present-day SEO technique. 

Google for Developers

Success metrics to establish after production launch
Metric	What to measure
Indexation	Important canonical pages indexed and eligible for snippets
Traditional organic	Non-brand impressions, clicks and qualified enquiries
Google AI visibility	AI-search impressions and associated traffic where reported
ChatGPT referrals	Sessions with utm_source=chatgpt.com and resulting enquiries  OpenAI Help Center
AI citation presence	A repeatable sample of commercial prompts across ChatGPT, Gemini, Perplexity and Claude
Business outcome	Qualified leads and paying projects originating from organic or AI-search traffic

For the last two, record measurement methods and limitations; AI citation frequency is not a guaranteed or official ranking score.

Points still open
1. Performance: Post-fix measurements for /contact, /about, /services, /pricing and /work; production mobile p75 remains unverified.
2. Canonical identity: Owner-confirmed permanent domain, redirects and preview-indexing controls.
3. Entity facts: Verification of the physical address and any public business profiles used in structured data.
4. Search Console and Bing: Account verification, sitemap submission and actual indexing evidence.
5. Content quality: Review of the 48-hour page for distinctiveness; confirm exact published plan exclusions and ownership conditions before extending pricing content.
6. Structured data: Validate the consolidated organization graph and existing Offer/Service markup.
7. Privacy: Review tracking, retention and required notices with counsel.
8. Release: npm test, npm run build, applicable docs/VERIFY.md checks, responsive/reduced-motion screenshots and confirmation of a successful production deployment.
Round 3 conclusion: The design direction is settled, the reported homepage lab result is encouraging, and no crawler allowlist expansion is needed. The next meaningful growth step is a verified production identity plus credible, useful, indexable buying information.
