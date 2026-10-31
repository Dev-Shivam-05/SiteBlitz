# SiteBlitz — Independent Review of All 7 Decisions

Review date: 31 October 2026 · Based on the supplied D1 audit, project contract, page structure and code excerpts.

Overall verdict: The creative direction is promising, but SiteBlitz should compete on speed, price transparency, clear scope and verifiable engineering, not unproven conversion results or claims to be the cheapest website studio in the world.

The existing Next.js architecture is worth retaining. Priorities are a clearer purchasing journey, credible evidence, stronger search-intent pages and measurable mobile performance. The supplied evidence establishes the intended implementation, not that the redesigned site has already passed production tests.&#x20;

Pasted text.txt



## 1. Positioning and hero copy

Verdict: Disagree with keeping the current tagline unchanged. Agree with the direction of the proposed replacement.

"Websites that win business, shipped in 48 hours" is memorable but has two weaknesses:

- "Win business" can imply demonstrated outcomes. SiteBlitz currently has no verified client conversion results.
- "Shipped in 48 hours" implies every website qualifies, whereas the Growth plan lists four days and other scopes differ.

### Recommended final copy

SITEBLITZ · HERO COPY PROPOSAL

# WEBSITES

# BUILT FOR

# BUSINESS.

Conversion-focused business websites from ₹7,999, launched in as little as 48 hours for eligible projects. Fixed pricing, a clear process and performance you can inspect.

See plans & scope

Start on WhatsApp

Live site performance: View /proof

This is proposed copy, not a rendered implementation. The existing headline's large typography and volt accent can remain.

Implementation: Keep one server-rendered H1, put the price and timeframe in crawlable HTML, and link the primary CTA to `/pricing`. The qualification for 48-hour delivery must be documented in the actual Launch plan before publication.

## 2. Homepage narrative order

Verdict: Disagree with the current section order. It prioritizes the visual experience before giving customers sufficient clarity about the purchase.

Use exactly six narrative beats:

01

PROBLEM · Hero

I need a credible website without an unclear budget or timeline.

02

COMPLEXITY · New friction strip

What will it cost? How long? What exactly is included?

03

APPROACH · Process + 48-hour scene

Brief → Blueprint → Build → Launch, with scope and milestones explained.

04

SERVICES WORKING · Services + selected concept studies

Choose the right service and inspect illustrative design directions.

05

EVIDENCE · ProofStrip + grader + pricing

Inspect SiteBlitz's own performance, review public pricing and test a website.

06

NEXT STEP · Short FAQ + CTA

Select a plan, request a scoped quote or start a conversation.

### Specific section changes

- Remove standalone Stats unless each number is independently verified, useful to a buyer and clearly described.
- Merge Manifesto into Process as a short statement of working principles, not a separate large visual interruption.
- Compress Services from three large stacked decks to a compact, scannable service selection, with links to detailed service pages.
- Retain concept studies, but never present them as paying clients or verified business results.
- Move the full ProofStrip into evidence, while retaining a small `/proof` link near the hero.
- Keep Pricing visible on the homepage. Do not force visitors to WhatsApp to discover basic prices.

The desired experience is not merely scrolling through animations. Visitors should progressively resolve their purchasing questions.

## 3. Trust without testimonials

Verdict: Agree with using the three strongest existing assets. Do not replace missing testimonials with invented social proof.

A. Live performance — primary engineering proof

Exact heading: "Judge our website by real measurements."

Display LCP, INP, CLS, sample window, number of observations where available, and last deploy date. Label these explicitly as SiteBlitz's own site metrics, not client results.

Measured data

/proof

B. Public pricing — primary commercial proof

Exact heading: "Know the price before the first call."

Show the existing ₹7,999 Launch, ₹14,999 Growth and ₹24,999 Scale prices, and the verified scope and delivery differences. Explicitly identify exclusions and potential additional costs.

Fixed plans

/pricing

C. Free grader — interactive expertise proof

Exact heading: "Find out what your current website needs."

Link to the existing 20-check grader. Explain what the checks evaluate and what they cannot measure. Do not represent an automated score as a complete professional audit.

20 checks

/tools/grader

The ownership commitment belongs near the final CTA: "Your code, content and domain are yours after full payment," subject to the actual terms.

The direction-approval/nonpayment promise needs a precise written definition before becoming a prominent guarantee.

Important: The four portfolio entries must remain labelled "Concept study — illustrative work, not a client project." No fabricated client logo, testimonial, ROI or conversion percentage.

## 4. Signature motion: two scroll scenes

Verdict: Agree with two signature scenes. Disagree with stacking additional full-page effects on top of the existing hero pin, horizontal gallery and velocity skew.

Use motion to demonstrate the process instead of merely decorating it. These specifications are design targets; Claude must confirm how the existing `Motion.tsx` implements each primitive.

### Scene A — From brief to blueprint

SCENE 1 · STICKY CARD STACK

01

30-minute brief

Tell us your goals, pages, customers and main action.

02

Same-day blueprint

See the agreed direction, content structure and scope.

03

Build and launch

Eligible Launch-scope sites can be delivered in as little as 48 hours.

| Property         | Specification                                                                                  |
| ---------------- | ---------------------------------------------------------------------------------------------- |
| Placement        | Homepage beat 3, Process                                                                       |
| Desktop          | Existing sticky card stack, 3 overlapping cards                                                |
| Trigger          | Section reaches 70% of viewport height                                                         |
| Scroll length    | 220svh section, sticky stage at 10svh with 80svh height; approximately 130svh of sticky travel |
| Card entry       | 32px upward, opacity 0→1                                                                       |
| Timing           | 480ms, `power2.out`; cards introduced at roughly 5%, 40% and 75% scroll progress               |
| Primitives       | `words`, `fade-up`, existing sticky stack                                                      |
| Mobile           | Three vertical cards, no pinning; optional 240ms fade                                          |
| Reduced motion   | All cards static and immediately visible                                                       |
| Performance cost | No new animation dependency; transform/opacity only                                            |

### Scene B — From blueprint to live website

Use the existing pinned horizontal gallery, but change its meaning from a portfolio slideshow to a transparent illustration of the production process.

SCENE 2 · THREE-PANEL BUILD JOURNEY

01

Blueprint

Agreed scope

02

Build

Responsive site

03

Launch

Checks & deploy

Illustrative storyboard, not evidence of a completed client project.

| Property         | Specification                                                                      |
| ---------------- | ---------------------------------------------------------------------------------- |
| Placement        | Homepage beat 4, immediately after service selection                               |
| Desktop          | Existing horizontal gallery with 3 × 100vw panels                                  |
| Trigger          | Gallery reaches viewport top                                                       |
| Pin length       | 180svh scroll distance                                                             |
| Motion           | Track translates from 0 to −200vw as scroll progresses                             |
| Scrub            | Linear scroll-linked progress; approximately 0.5s smoothing if supported           |
| Child entry      | `mask` / `scale-in`, 480ms `power2.out`                                            |
| Mobile           | Ordinary vertical panels with natural scrolling                                    |
| Reduced motion   | All three panels visible in document order, no pin or scrub                        |
| Performance cost | Reuse existing GSAP controller; lazy-load visual panels and avoid additional WebGL |

Do not change `Motion.tsx` to accept new options unless its existing controller cannot express the scene. Any such modification needs regression testing across all `data-anim` consumers.

### Tokens to retain and add

Retain the existing Tailwind v4 color tokens:

| Token            | Value     |
| ---------------- | --------- |
| `--color-void`   | `#0a0a0c` |
| `--color-ink`    | `#f5f5f0` |
| `--color-volt`   | `#ccff00` |
| `--color-violet` | `#7c5cff` |

Proposed motion tokens in the CSS-first design system:

```
@theme {
  --ease-site: cubic-bezier(0.22, 1, 0.36, 1);
  --duration-reveal: 480ms;
  --duration-accent: 240ms;
}
```

Use only the approved color utilities in components, not inline hex colors. Test text and interactive contrast against WCAG 2.2 AA.

### Design references

- [Linear](https://linear.app/?utm_source=chatgpt.com) — take the restrained typography, hierarchy and section pacing; do not copy its customer testimonials or implied scale.&#x20;

  [image](https://www.google.com/s2/favicons?domain=https://linear.app\&sz=32)

  Linear

- [Framer animation references](https://www.framer.com/academy/topics/animations?utm_source=chatgpt.com) — take subtle reveal and scroll-state principles; do not introduce Framer or another motion framework into this repository.&#x20;

  [image](https://www.google.com/s2/favicons?domain=https://www.framer.com\&sz=32)

  Framer

- [Vercel Observability](https://vercel.com/products/observability?utm_source=chatgpt.com) — take the clarity of real-user performance reporting; never reproduce their metrics as SiteBlitz's own.&#x20;

  [image](https://www.google.com/s2/favicons?domain=https://vercel.com\&sz=32)

  Vercel



Motion acceptance test: the customer must understand the process without scrolling through the animation, with JavaScript disabled, and with reduced motion enabled.

## 5. SEO keyword targets — India and global

Verdict: Need data before calling any keyword "high-volume and winnable." Agree with prioritizing commercial intent over generic traffic volume.

No Google Search Console, Keyword Planner or measured competitor difficulty data was supplied. The following is therefore a proposed ranking and page strategy, not a verified keyword-volume analysis.

### Recommended keyword-to-page mapping

| Target query                 | Page                                   | SEO title                                              | H1 and intent                                                                        |
| ---------------------------- | -------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| Website design cost in India | Existing cost article                  | Website Design Cost in India (2026) \| SiteBlitz       | "How much does a website cost in India?" — informational, pricing research           |
| Website for small business   | Existing `/services/business-websites` | Small Business Website Design from ₹7,999 \| SiteBlitz | "Small business websites built for conversions" — commercial                         |
| Cheap website design India   | Existing `/pricing`                    | Affordable Website Design in India \| SiteBlitz        | "Affordable website design with transparent pricing" — price comparison              |
| Website in 48 hours          | New `/website-in-48-hours`             | 48-Hour Business Website Design \| SiteBlitz           | "Launch an eligible business website in as little as 48 hours" — high-intent service |
| Website designer Mumbai      | New `/website-designer-mumbai`         | Website Designer in Mumbai from ₹7,999 \| SiteBlitz    | "Website design for Mumbai businesses" — local commercial                            |
| Landing page design          | Existing `/services/landing-pages`     | Landing Page Design Services \| SiteBlitz              | "Landing pages built around one clear action" — commercial                           |
| Restaurant website design    | Existing `/for/restaurants`            | Restaurant Website Design \| SiteBlitz                 | "Restaurant websites for menus, bookings and enquiries" — industry-specific          |
| Doctor / clinic website      | Existing `/for/clinics`                | Clinic & Doctor Website Design \| SiteBlitz            | "Professional websites for clinics and doctors" — industry-specific                  |

The exact existing blog slug must be checked in the repository before implementation.

### Rollout priority

P0

Improve existing commercial pages

`/pricing`, `/services/business-websites` and `/services/landing-pages`. Strengthen scope information, real pricing, FAQs, examples, internal links and titles.

P1

Capture differentiating searches

Improve the cost article and create the 48-hour page, provided it explains qualifying scope, exclusions, inputs required from clients and delivery milestones. Add the Mumbai page after verifying the business's local presence.

P2

Expand industry relevance

Improve the restaurant and clinic pages with real domain-specific features, practical examples and clearly labelled concept studies.

For global acquisition, reuse strong service pages with the verified USD pricing where appropriate. Do not automatically create near-identical pages for every country or slight keyword variation.

Research gate before creating more pages: Collect search demand by country, ranking competition, intent, existing impressions and expected lead value. Use Search Console and Keyword Planner; verify the actual SERPs. Google explicitly discourages scaled pages created primarily to capture search variations.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://developers.google.com\&sz=32)

Google for Developers



Success measures: Non-brand qualified organic enquiries, search impressions and clicks, service-page enquiry rate, and actual projects attributable to organic search. Traffic alone is not success.

## 6. AI-assistant recommendability (GEO)

Verdict: Agree with building a machine-readable, evidence-rich brand presence. Disagree with treating `llms.txt`, FAQ schema or keyword repetition as a shortcut to AI recommendations.

Google's 2026 documentation explicitly says traditional SEO fundamentals remain important for generative search, and that `llms.txt` has no positive or negative effect on Google Search rankings. No method can guarantee recommendation by ChatGPT, Gemini, Claude or Perplexity.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://developers.google.com\&sz=32)

Google for Developers



### Recommended implementation

A. Fix factual inconsistencies immediately.

Update `public/llms.txt` and relevant public pages. In particular, replace the misleading work description with:

> SiteBlitz currently displays four clearly labelled concept studies. These are illustrative designs, not completed client case studies. No verified client testimonials or conversion results are currently published.

Replace broad assertions such as "every claim verifiable" with specific evidence links. Distinguish Lighthouse targets from measured results and the studio's own metrics from client outcomes.&#x20;

Pasted text.txt



B. Create strong, consistent entity information.

Use a verified business name, Mumbai location, website URL, contact channels, services, published prices and consistent social profile links.

Recommended structured data:

| Page type              | Schema                                                                                |
| ---------------------- | ------------------------------------------------------------------------------------- |
| Homepage               | `Organization` and `WebSite`                                                          |
| Service pages          | `Service`, with truthful `Offer` details where appropriate                            |
| Pricing                | `Offer` information matching visible prices and conditions                            |
| Blog posts             | `BlogPosting`, with genuine authorship                                                |
| Navigational hierarchy | `BreadcrumbList`                                                                      |
| Local business pages   | `LocalBusiness` / appropriate subtype only when eligibility and identity are verified |

Do not add invented `Review`, `AggregateRating` or customer statistics.

Google removed its FAQ rich-result feature in 2026. Retain useful visible FAQs for visitors, but do not treat `FAQPage` markup as a Google rich-result growth opportunity.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://developers.google.com\&sz=32)

Google for Developers



C. Publish answerable, citation-worthy material.

Build a small collection of pages that genuinely answer buyer questions:

- "What does a ₹7,999 website include?"
- "What can realistically be delivered in 48 hours?"
- "Website builder vs website design studio: who should choose which?"
- "How does a small business measure website performance?"
- "What exactly happens before a website launches?"

Each should feature specifics, limitations, links to supporting evidence and a natural next step. SiteBlitz sells a service, so distinguish it from a do-it-yourself website builder.

D. Make public content discoverable.

Confirm that search engines can crawl the actual production pages, that the XML sitemap contains canonical URLs, that preview deployments are excluded from indexing, and that service content is available in the initial HTML.

For ChatGPT search, OpenAI documents `OAI-SearchBot` as its search crawler. The owner can permit it without also permitting `GPTBot` for model training; these are separate controls.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://developers.openai.com\&sz=32)

OpenAI Developers



E. Earn genuine off-site references.

Verify and claim the business's real profiles, use Google Business Profile only where eligible, seek authentic directory listings and partnerships, and eventually publish real client work with permission. Paid fake reviews, manufactured citations and invented mentions are unacceptable.

### Important production dependency

The evidence identifies `siteblitz.vercel.app` as production and leaves ownership of `siteblitz.in` unverified. Do not change canonical URLs or initiate a migration until domain ownership, DNS, SSL, redirects and Search Console properties are confirmed.

### GEO success metrics

Track whether SiteBlitz is cited in a stable set of relevant AI-search prompts, which source pages are used, and whether those visits become qualified enquiries. Segment by region and platform. Treat observations as samples, not guaranteed rankings.

## 7. Performance budget and mobile experience

Verdict: Agree with keeping the visual identity and existing motion stack. Disagree with loading the full desktop experience on mobile or making first paint dependent on animation.

The required field targets are:

Mobile p75 LCP

# ≤2.5s

Loading

Mobile p75 INP

# ≤200ms

Responsiveness

Mobile p75 CLS

# ≤0.1

Stability

These are Google Core Web Vitals thresholds measured at the 75th percentile.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://web.dev\&sz=32)

web.dev



### Proposed internal engineering budgets

Proposed budgets — not measured SiteBlitz results.

| Resource / metric                  | Recommended budget                      |
| ---------------------------------- | --------------------------------------- |
| Lab mobile LCP                     | Under 2.0s                              |
| Lab total blocking time            | Under 150ms                             |
| Lab CLS                            | Under 0.05                              |
| Initial-route compressed JS        | Target ≤180 KB, subject to bundle audit |
| Critical compressed CSS            | Target ≤35 KB                           |
| Main-thread long tasks             | Avoid tasks over 50ms                   |
| WebGL on mobile                    | Disabled by default                     |
| Desktop shader                     | Cap at 30 FPS, DPR ≤1.25 initially      |
| New animation library dependencies | Zero                                    |

### Exact changes

Hero: Keep the large server-rendered typography and visual accent. Show a static CSS gradient or illustration immediately. Mount the WebGL effect only on eligible desktop devices after the critical content has rendered and the browser is idle.

Never hide the LCP headline behind an initial `opacity: 0` animation while waiting for JavaScript. Use `next/font`, appropriate font subsets and `font-display: swap`. Google specifically recommends eliminating rendering delays and unnecessary blocking of LCP content.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://web.dev\&sz=32)

web.dev



GSAP + Lenis: Retain the existing declarative controller. Restrict expensive scrolling effects to desktop where they provide useful storytelling. Disable velocity skew and unnecessary smooth-scroll interception on mobile. Ensure native keyboard and touch scrolling continue working.

Shader: Pause rendering when offscreen or the page is hidden; release GPU resources on unmount and provide a permanent static fallback when WebGL fails. Prefer a graceful downgrade to animation that damages responsiveness.

Scroll scenes: Animate transforms and opacity rather than layout-changing properties, and keep no more than the two proposed prominent scroll sequences.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://web.dev\&sz=32)

web.dev



Testing: Run mobile lab tests on the homepage, pricing, service pages and grader; test widths of 320, 375, 390, 768, 1024 and 1440px; capture screenshots with motion enabled and reduced motion; test keyboard focus, touch scrolling, contact paths and graceful failure.

Measure real-world performance separately for mobile and desktop. If the deployed site lacks enough observations, report insufficient field data, not a passing score.

### Release gates and execution order

I would give Claude Code this sequence:

1. P0 — Truth, security and privacy: Correct public claims, audit first-party analytics and persistent visitor identifiers, review disclosure/consent requirements with counsel, preserve SSRF and admin-auth protections.
2. P1 — Core website: Implement the six-beat homepage, scoped pricing and the two motion scenes on `v2-redesign`.
3. P2 — SEO and GEO: Correct metadata, structured data, sitemap, `llms.txt`, content hierarchy and priority service pages.
4. P3 — Verification and release: Run tests and production build, check the relevant `docs/VERIFY.md` sections, review mobile performance and accessibility, then deploy the verified release through the configured Vercel production workflow. Do not push to `main`.

The source contract also says the tracking state of `v2-redesign` is established, while `CLAUDE.md` says an upstream has not yet been set. Resolve this discrepancy before any Git release action.&#x20;

Pasted text.txt

Pasted text.txt



## Points still open

1. 48-hour eligibility: Exact Launch scope, customer-content dependencies, revision allowance, exclusions and the trigger that starts the delivery clock.
2. Business identity and domain: Verified Mumbai location, business profile eligibility, domain ownership and the permanent production URL.
3. SEO opportunity data: Keyword volumes, competition, country breakdown and baseline Search Console performance before claiming queries are winnable.
4. Motion implementation: Confirmation that the existing `Motion.tsx` and gallery support the proposed triggers, pin lengths and mobile fallbacks without a new animation system.
5. Performance baseline: Actual production and preview JS/CSS sizes, WebGL cost, representative lab tests and sufficient real-user Core Web Vitals samples.
6. Privacy and commercial promises: Counsel's review of analytics identifiers, IP-derived geography, retention, consent obligations and the nonpayment/direction-approval guarantee.
7. Production readiness: Verified upstream/branch strategy, completed acceptance tests, preview approval and evidence that the final release reached production successfully.
