ChatGPT said:
SiteBlitz audit — Round 1

My verdict: this is a promising engineering foundation, not yet a proven fast mobile experience or an established search asset. The evidence does not justify “90+ SEO power,” and certainly not “100/100 in everything.”

This review concerns the unreleased v4 build at 2997d46, not the older live v1. I have not executed the repository. Previous measurements remain unverified until Claude reruns them and supplies the artifacts.

1. Scoring rubric — Agree, but separate implementation quality from demonstrated results

A sitemap, structured data and unique titles are implementation work. They do not establish rankings, search demand, authority, or real-user performance. Google explicitly warns that excellent Core Web Vitals results do not guarantee top rankings. 
Google for Developers

Use these custom audit scores, not supposed “Google scores”:

Score	Locally testable component	Public/real-world component	Total
Performance	Loading, interactions, rendering, resource budgets, resilience: 80	Production delivery: 8; real-user CWV: 12	100
SEO readiness and effectiveness	Technical implementation, content differentiation and evidence: 60	Public launch/indexing readiness: 20; demonstrated search outcomes: 20	100
Mobile usability	Responsive layouts, accessibility and interaction checks: 92	Actual Android and iOS browser checks: 8	100
Scoring rules

For each test below, register the applicable routes/states before testing.

Earned points = test weight × passing cases / registered applicable cases

Record PASS, FAIL, and UNTESTED separately. Untested cases earn no verified credit, but must not be described as observed failures. A genuinely inapplicable test can be redistributed within its component, with a written reason—not because it was difficult to run.

Publish the overall score and the worst-performing route/state. An average must not conceal a broken pricing page or unusable mobile menu.

These are release blockers regardless of score: exposed private data, broken primary enquiry flow, production-wide accidental noindex, production canonicals pointing to the wrong site, or fabricated commercial/research claims.

How the undeployed state counts

For v4, public delivery and search-outcome points are currently unearned. That does not mean the implementation is worthless.

Conversely, do not pretend:

A missing custom domain itself is a Google penalty.
Search Console registration creates ranking power.
A new site cannot rank without backlinks.
The older v1’s existence proves anything about v4.

The meaningful distinction is “ready to be discovered” versus “actually discovered and useful to searchers.”

2. Harsh mobile performance tests — Agree, with reproducible conditions instead of impossible targets

“Make the test so harsh that no website can pass” is not a useful engineering requirement. A strict test must expose user harm and remain achievable.

Google’s established good CWV thresholds are p75 LCP ≤2.5 seconds, INP ≤200 milliseconds, CLS ≤0.1. The budgets below deliberately provide additional headroom; they are my proposed release gates, not extra Google ranking rules. 
web.dev

Test protocol

Stop development servers, verify the process listening on the chosen port, then build and run production. Follow the repository’s Windows process-cleanup rules.

Record commit, dirty-tree status, Node version, exact dependency versions, Chrome version and Lighthouse version. Run serially on an otherwise idle machine.

Profile	Viewport	CPU slowdown	Download / upload	Configured network latency
A: constrained mobile	390 × 844, DPR 2	4×	1.6 Mbps / 750 Kbps	150 ms
B: severe mobile	360 × 800, DPR 2	6×	750 Kbps / 250 Kbps	300 ms

These are repeatable simulations, not claims that a desktop with CPU throttling becomes a particular Android phone.

Run seven cold loads per route under A. Under B, run seven loads of the heaviest page from every distinct template. Use the sixth sorted result as the seven-run p75, and retain the maximum. Run three warm loads separately.

Cold means fresh browser storage/session state, including the preloader’s session flag. Do not run all repetitions in a session that has already bypassed it.

Keep loading tests separate from early-interaction tests: interaction can end the LCP observation window, making a prematurely clicked run unsuitable for assessing late-rendering hero content. 
web.dev

Performance test list
ID	Measure and exact method	Pass threshold	Weight
P1	LCP and actual visible readiness. CDP trace, PerformanceObserver, screenshot filmstrip. Identify the final LCP element; separately record when H1, service proposition and primary CTA are unobscured.	A: p75 LCP ≤1.8 s, worst ≤2.5 s. B: p75 ≤3.0 s, worst ≤4.0 s. Visible proposition/CTA must meet the same limits.	12
P2	Interaction responsiveness. Instrument web-vitals attribution; use CDP trusted tap/key events. Exercise menu, FAQ, package selection, enquiry validation, grader submission and navigation. Repeat while deferred motion initializes.	A: journey INP ≤150 ms; B: ≤200 ms. No scripted interaction >300 ms. Separately require visible pending/error feedback within 200 ms; do not confuse API completion time with INP.	14
P3	Whole-journey stability. Capture layout-shift entries during loading, full scrolling, font loading, menu use, grader results and navigation. Inspect attribution and filmstrips.	Session-window CLS ≤0.03 in A and B. No unexpected shift >0.01 attributable to fonts, images or deferred decoration. Also inspect shifts excluded from CLS after input.	8
P4	Main-thread blocking. Lighthouse diagnostic run plus a CDP trace covering the first 10 seconds and subsequent interaction journey. Attribute long tasks.	Lighthouse TBT ≤100 ms under its recorded configuration. In A, no individual task >100 ms; in B, none >150 ms. Deferred initialization receives no exemption.	8
P5	JavaScript and hidden prefetch cost. CDP Network accounting, coverage, production bundle inspection. Include framework code, motion, particles and prefetch responses in appropriate totals.	Compressed JS: ≤150 KiB through first useful paint, ≤250 KiB by 10 s, ≤300 KiB through the full journey. No admin/chart/database libraries in public client bundles.	6
P6	Fonts and CSS. Network waterfall and computed-font checks with normal, delayed and blocked fonts.	Initial fonts ≤100 KiB; all fonts requested by 10 s ≤160 KiB; render-blocking CSS ≤30 KiB compressed. No more than two justified font preloads. Text remains usable when every font request fails.	5
P7	Images and total transfer. CDP Network, actual currentSrc, rendered dimensions, image decode timings.	LCP image/poster ≤100 KiB. Initial useful viewport ≤500 KiB total; first 10 s ≤750 KiB; full mobile scroll ≤1.5 MiB, excluding an explicitly requested CSV download. No offscreen image unnecessarily competing with the LCP resource.	5
P8	Motion/GPU workload. Compare enabled versus disabled motion using traces and frame intervals; scroll all scenes for 30 seconds. Test hidden tab and offscreen hero.	p95 frame interval ≤33.3 ms in A, ≤50 ms in B; no motion-attributed stall >100 ms. Particle animation callbacks stop within 1 s after the hero is offscreen or document hidden. No continuous decorative animation work in reduced-motion mode.	7
P9	Navigation, cleanup and back/forward restoration. Repeat / → /pricing → /work → / twenty times. Record listeners, ScrollTriggers and post-GC heap. Separately perform full-document back/forward navigation.	No growing duplicate listeners/triggers; post-GC heap growth ≤10% after warm-up. Warm route content visible ≤300 ms. Eligible public-page back/forward test restores from bfcache, with correct scroll and UI state.	5
P10	Cache correctness. curl response headers plus cold/warm browser requests; replace an asset in a scratch build to test freshness.	Fingerprinted immutable assets receive long caching and no repeat body transfer while fresh. Unversioned replaceable images must not retain stale content for a year. HTML must not be accidentally immutable.	4
P11	Failure resilience and preloader delay. Block motion chunks, fonts and WebGL; reject storage access; test JS disabled. Compare loader-enabled and loader-disabled filmstrips.	Essential copy and normal navigation/contact links survive. Zero intentionally imposed blocking delay after usable content is ready. No permanently hidden reveal targets or stranded overlay.	6
P12	Production delivery—not localhost. After deployment, repeat browser runs and at least 20 document requests from an Indian network. Record DNS/TLS, TTFB, cache status and failures.	Public HTML p75 TTFB ≤600 ms for warm responses, ≤1,000 ms for evidenced cold responses; no unexplained 5xx or broken required resources. Re-run P1–P3 against production.	8
P13	Real-user CWV. First-party web-vitals RUM, checked against CrUX when available. Segment mobile/desktop and important templates.	Rolling 28-day p75: LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1. For this audit, require ≥200 eligible observations per reported metric/device cohort; smaller cohorts remain insufficient evidence. Exclude bots and QA traffic.	12
		Total	100

The observation minimum in P13 is our evidence policy, not Google’s CrUX eligibility rule.

Important distinctions: a scripted INP is diagnostic, not field INP; a navigation-only Lighthouse run does not exercise the user’s interactions. Likewise, an SPA route transition is not a bfcache test. For the latter, verify pageshow.persisted or use Chrome’s bfcache diagnostic. 
web.dev
+1

Run the existing vitals.mjs and Lighthouse as supporting tools, but do not treat their headline scores as substitutes for this matrix.

3. Technical SEO tests — Agree, but the existing audit checks only part of the problem

Agree: server-first content, route-specific canonicals, a central route registry, truthful modification dates, fictional-demo disclosure and one offer source are good choices.

Disagree: “38 URLs, zero script errors” does not establish content usefulness, correct production indexing, useful internal hierarchy, or demand.

Locally testable SEO: 60 points
ID	Measure and method	Exact pass criteria	Weight
S1	Crawl and status codes. Extend seo-audit.mjs; crawl every public link and test nonexistent routes under each route family using real GET requests.	Intended indexable pages return 200 with real content. Missing pages return 404/410, not a successful-looking placeholder or homepage redirect. Zero broken internal destinations or redirect loops.	6
S2	HTML and rendering independence. Save raw responses; disable JS; block motion; compare normal browser, Googlebot Smartphone, Bingbot and HTML-limited social fetcher responses.	H1, substantive copy, offers, disclosures, internal links and essential contact route are present without executing JS. Nothing important requires scrolling/clicking to be fetched. Required metadata is available to the relevant fetcher.	6
S3	Canonical/origin integrity. Parse final HTML, metadata, JSON-LD, sitemap and OG URLs. Test production configuration and tracking parameters.	One intended canonical per indexable document; approved absolute production origin throughout; no localhost/preview/v1 leakage. Tracking parameters resolve to the clean canonical. Production build/configuration rejects an unset origin.	5
S4	URL normalization and redirects. Test slash/no-slash, intended case policy, protocol/host variants and actual old-v1 mappings.	One canonical URL convention. Equivalent public variants use a permanent redirect with ≤1 hop where controllable; zero loops. Non-equivalent URLs are not indiscriminately redirected home.	4
S5	Robots and indexation controls. Parse the rendered robots file for each named agent; inspect meta and HTTP directives.	Every intended public route and required resource is allowed. Demos are crawlable enough for noindex to be seen. Preview deployments cannot become an indexable duplicate. No accidental blocking of OG images or intended research downloads.	5
S6	Sitemap integrity. Compare sitemap with route registry and crawl results.	Exact intended canonical/indexable set; no redirects, errors, private pages or noindexed demos. Honest lastmod. Correct origin and reachable sitemap response.	3
S7	Language pairing. Inspect both full documents and reciprocal alternate links.	Actual equivalent content; self-canonical URLs; reciprocal and self-referencing alternates; valid language/script codes. Roman Hindi is identified appropriately rather than silently inheriting English for its main content.	3
S8	Metadata and document semantics. DOM parser, accessible-name checks and a fixed-width search-preview harness.	Unique, accurate titles/descriptions; one clear primary H1 under this project’s convention; logical headings; meaningful image alternatives, or empty alt for decoration. No incomplete or misleading titles. Pixel overflow is a review warning, not an invented ranking failure.	5
S9	Internal graph and anchors. Breadth-first crawl, once with all links and once excluding global header/footer.	Important commercial pages within two clicks of home; every indexable editorial page within three. Every commercial/editorial destination has a relevant hub/body link, not only a footer link. Descriptive link purpose; no JS-only navigation.	5
S10	Intent, differentiation and truth. Review each service, industry and guide page against offer.ts, site.ts and its closest sibling.	Each indexed page has a distinct useful purpose. No pages differentiated only by place/industry substitutions. All prices, timelines, capabilities and disclosures match the source of truth. No invented proof or guarantees.	8
S11	Structured data correctness. Parse JSON-LD; use Schema Markup Validator and Rich Results Test Code input for supported types.	No syntax/required-property errors for claimed features; no contradictory entity IDs; schema matches visible content. Only applicable types. No fabricated reviews, ratings, customers, addresses or credentials.	4
S12	Research reproducibility. Inspect source provenance, extraction scripts, methodology, CSV output and displayed calculations.	Every statistic reproduces from the documented input/filter/deduplication process. Clear denominator, scope and dates. “URL retained after filtering” is not misrepresented as website ownership/adoption. Publication rights are established.	6
		Local subtotal	60
Three corrections Claude must incorporate

First: Next.js can return a streamed not-found UI with HTTP 200. Visually seeing a 404 page is insufficient. Test missing dynamic slugs before and after streaming boundaries; inspect the actual status and indexing directives. 
Next.js

Second: named robots groups can override the generic group. Google does not merge a specific user-agent group with User-agent: *. The long agent list therefore creates a possible policy mismatch unless tested. This is a risk to verify, not a confirmed bug in the unseen file. 
Google for Developers

Third: Rich Results Test does not require deployment for a code test. Paste the locally generated HTML into its Code mode now. That validates supported markup, not public crawlability. Also, Google discontinued FAQ rich results from May 7, 2026. Do not award expected FAQ-rich-result value to FAQPage. 
Google Support
+1

hi-Latn should not be rejected simply for having a script subtag: Google documents explicit ISO 15924 script annotations. The harder question is whether the two pages are genuine equivalents. 
Google for Developers

Title/description pixel checks

Use a repeatable preview—for example, title width 580 px at 20 px Arial and description width 920 px at 14 px Arial—to flag awkward truncation.

Those are editorial preview budgets, not Google limits. Do not fail SEO because a description has 161 characters or a title exceeds a particular pixel count. Google does not publish a universal maximum length; display varies and titles/snippets can be generated differently. 
Google for Developers
+1

Similarly, OG-image availability is worthwhile sharing QA, but “the image is a PNG” is not independent SEO power.

Public readiness and demonstrated outcomes: 40 points

These cannot honestly be marked passed against localhost.

ID	Test and evidence	Pass criteria	Weight
S13	Public deployment; external fetches and production crawl.	Approved release publicly reachable on the chosen canonical origin; no authentication challenge, accidental noindex, broken resources or wrong-origin metadata.	8
S14	Search Console and Bing Webmaster Tools ownership, sitemap processing and inspection records.	Correct properties verified; sitemap successfully processed; representative routes inspected; indexing issues recorded rather than assumed absent.	4
S15	Entity/contact/profile consistency.	Site and any submitted profiles use the same truthful name, location scope, tested contact details and official URL. GBP eligibility assessed honestly; no penalty for correctly not creating an ineligible profile.	4
S16	Index coverage of a preregistered core URL set.	Each intended core URL is demonstrably indexed with its intended canonical, or remains explicitly unresolved—not inferred from sitemap submission.	4
S17	Brand visibility, checked manually or through an authorized tool.	For the declared brand-query set, the official site is first organic result in the recorded engine/location checks on three separate dates. Report each query/engine separately.	6
S18	Nonbrand discovery and commercial usefulness.	4 points: genuine nonbrand clicks to intended landing pages for the preregistered query clusters. 4 points: at least one attributable, qualified organic enquiry. Use a stated 28-day window; no invented launch deadline.	8
S19	Independent corroboration.	At least one genuine, independently authored reference corroborates the studio’s work, expertise or research. A self-submitted directory description is not independent editorial proof.	3
S20	AI citation observation.	At least one accurate citation to a relevant canonical page in a fixed nonbranded-question test set; preserve question, engine, date, answer and cited passage. Feeding the answer engine your URL does not count as discovery.	3
		Public/outcome subtotal	40

These outcome thresholds are our assessment framework, not a formula search engines use.

Information architecture and exact priority mapping

Keep the following known routes as the core architecture:

Plain text
/
/services
/work
/pricing
/process
/about
/contact
/faq
/proof
/book
/website-in-48-hours
/tools/grader
/blog
/privacy
/terms
/refunds

Do not expand the site merely to increase its page count. Review the existing six service pages, eight guides, four industry pages and four research pages before approving their continued indexation or any consolidation.

Need data: the actual registry and content are required for a defensible complete 38-page keyword map. I will not invent the unnamed service offerings or their URLs.

Here is an exact priority draft, subject to source-of-truth validation:

URL / primary query	<title>	H1	Meta description
/ — SiteBlitz; secondary: website design Gujarat	SiteBlitz — Gujarat-based Website Design & Development Studio	Website design and development, based in Gujarat.	Meet SiteBlitz, a Gujarat-based web studio. Explore clearly labelled concept websites, compare published packages and see how a project is delivered.
/services — website development services Gujarat	Website Development Services in Gujarat | SiteBlitz	Website development services	Explore SiteBlitz’s website services, compare their scope and review the process, concept work and published packages before choosing an option.
/pricing — website price in India	Website Price in India: ₹7,999 & ₹17,999 Plans	Website prices: ₹7,999 and ₹17,999	Compare SiteBlitz’s ₹7,999 and ₹17,999 website packages. Review inclusions, exclusions, payment terms and delivery conditions before booking.
/work — SiteBlitz website demos	Website Design Concepts & Demos | SiteBlitz	Fictional concepts. Working websites.	Explore working website concepts by SiteBlitz. Every demo is clearly labelled fictional, not presented as a client project or proven business result.
/tools/grader — free website grader	Free Website Grader | SiteBlitz	Check your website with the free grader	Run SiteBlitz’s free website grader, review what it checks and what it cannot establish, then use the results to plan your next improvements.
/proof — SiteBlitz website performance	SiteBlitz Performance: Tests, Methods & Limits	What we have measured—and what we have not	Review SiteBlitz’s performance tests, test conditions and limitations. Lab measurements are identified separately from any available real-user data.

Prices must be interpolated from offer.ts, including metadata—not duplicated as new hard-coded commercial truth.

/website-in-48-hours needs the actual offer conditions before copy approval: when the clock starts, required inputs, scope, business/calendar hours, revisions and exclusions. A route name is not evidence that an unconditional promise is valid.

Demand source: the suggested queries are hypotheses from my query-intent knowledge, not measured Keyword Planner volumes, Google autocomplete or People Also Ask research. Confidence is high about the general intent; low about relative demand and attainable rankings.

Cross-check English seeds alongside website banwane ka kharcha, website banavvano kharch, and વેબસાઇટ બનાવવાનો ખર્ચ. Record location, language, date, tool and observed result types. Do not create a separate page for every spelling.

Exact internal-link requirements

Use these contextual links, not merely a universal footer:

Home → /services “Website development services”, /work “Explore fictional website concepts”, /pricing “Compare website packages”, /tools/grader “Grade your current website”.
Each verified service page → relevant concept work, /pricing, /process, and /contact; link back from /services.
/pricing → /process “How delivery works”, /refunds “Refund conditions”, /contact “Confirm your project scope”.
Each guide → the genuinely relevant service or pricing page; each research study → its methodology/download and research hub.
/proof → measurement methodology and dated results—not generic trust badges.
Exact schema requirements

Use the existing builders, with verified values:

Node	Fields to enforce
Organization	Stable @id; name: "SiteBlitz"; alternateName: "Site Blitz"; canonical url; real logo; truthful description; sameAs only for verified official profiles. Omit unverified email, phone, street address and credentials.
WebSite	Stable @id; canonical root url; name: "SiteBlitz"; alternateName: "Site Blitz"; publisher referencing Organization. Put the site-name fields on the homepage.
WebPage / BreadcrumbList	Canonical page @id and url; accurate name, description, inLanguage, isPartOf; breadcrumb items with truthful names, positions and URLs.
Service / Offer	Actual name, serviceType, description, url, provider; confirmed areaServed; offers sourced from offer.ts, with numeric price, priceCurrency: "INR" and matching visible conditions.
BlogPosting	headline, mainEntityOfPage, actual dates, appropriate image, accountable author/publisher. An Organization author is preferable to an invented person.
Dataset	Accurate name, description, creator, dates, spatialCoverage, variableMeasured, measurementTechnique; downloadable distribution with contentUrl and encodingFormat; license only where rights are established.

Google’s Organization guidance favors relevant accurate properties, not filling every possible field. Its site-name guidance specifically uses homepage WebSite markup. Service and Dataset fields should describe the actual service and dataset—not decorate unrelated pages. 
Google for Developers
+3

4. Mobile-view checks — Agree; screenshots alone are insufficient

Test 320×568, 360×800, 375×812, 390×844 and 414×896, plus landscape. Include cold fonts, fallback fonts, open navigation, expanded FAQ, validation errors, grader results and reduced motion.

Our larger control targets and fully unobscured focus requirement deliberately exceed WCAG AA’s minimum in some places. WCAG 2.2 AA’s target-size criterion is generally 24×24 CSS pixels with exceptions, not a universal 44×44 requirement. 
W3C

ID	Method	Pass criteria	Weight
M1	CDP geometry checks and screenshots; actual browser zoom/reflow checks.	Document overflow ≤1 CSS px at every width/state. At 400% zoom from a 1280 px viewport, no two-dimensional page scrolling except genuinely two-dimensional content such as a table. No clipped text.	12
M2	Measure interactive bounding boxes and actual hit areas.	Primary buttons, menu controls, FAQ toggles and WhatsApp control ≥44×44 CSS px. Other targets satisfy WCAG minimum/spacing exceptions. No overlapping hit areas.	10
M3	Computed typography, blocked fonts, 200% text enlargement and text-spacing override.	House standard: body/input text ≥16 px, secondary captions ≥14 px. No content/function loss with enlargement or increased spacing; no forced H1 breaks that truncate meaning.	10
M4	Keyboard-only journey, CDP accessibility tree and manual focus inspection.	Every control reachable and operable; visible focus; working skip link; menu opens/closes predictably; Escape works where appropriate; focus returns; no keyboard or scroll trap.	12
M5	Scroll screenshots, elementFromPoint, focus traversal, keyboard-open viewport and safe-area checks.	Zero covered controls or focused text from sticky UI. Primary CTA and footer remain usable. No decorative fullscreen loader blocking already available content.	10
M6	Compare mobile/desktop HTML, meaningful text, links and disclosures.	Same substantive offers, caveats, research methodology and primary content. No mobile-only omission of exclusions. No swipe/click required to fetch essential search content.	10
M7	Automated accessibility audit plus manual semantics/contrast review.	Zero confirmed A/AA violations in tested states; contrast ≥4.5:1 for normal text, ≥3:1 for large text and applicable UI graphics. Correct names, labels, table headers, captions and image alternatives.	10
M8	Exercise enquiry and grader flows with invalid input, pending response, timeout, failure and success.	Labels persist; errors identify the field/problem; state changes are announced; pending state appears ≤200 ms; user input survives recoverable errors; no false success or duplicate submission.	10
M9	prefers-reduced-motion, blocked motion chunks, JS-disabled view and persistent-animation inspection.	All essential content visible; native scrolling available; reduced-motion version has no decorative scrub/parallax/particles. Automatically moving content subject to WCAG’s pause requirement has a usable stop/pause mechanism.	8
M10	Actual lower-end Android Chrome with TalkBack, plus iPhone Safari with VoiceOver; record model/browser.	Core discovery → package → enquiry journey passes, including keyboard, orientation, browser bars, sticky UI, touch scrolling and back navigation. No substitution with desktop Chrome emulation.	8
		Total	100

The AA focus-obscuring rule permits partial visibility; this audit’s “fully visible” requirement is intentionally stricter. Google also explicitly warns against requiring interaction to load primary mobile content. 
W3C
+1

An automated accessibility score cannot establish full WCAG conformance. Apply the actual success criteria, including pause/stop behavior for qualifying automatically moving content lasting more than five seconds. 
W3C
+1

5. Specific build risks — Disagree with several defaults; need data before declaring visual gaps
First-visit preloader — Disagree with the imposed wait

“Pure CSS,” “only once” and aria-hidden do not establish user benefit.

A cosmetic 0–100 counter is not genuine progress unless it reflects actual loading. More importantly, painted content behind an overlay is not necessarily usable content.

Preferred change: remove the blocking sheet. Preserve a small nonblocking brand entrance only if it adds no delay and passes reduced-motion checks. Confirm with filmstrips rather than assuming the existing LCP number captures the experience.

WebGL hero — Need data

Six thousand mobile particles is an implementation parameter, not a performance argument.

Keep the static poster as the complete experience. My default for constrained phones would be no WebGL, with animation enabled only where measurements justify it. Test context loss and fallback, pause offscreen, and verify that deferred initialization does not collide with navigation taps.

CPU throttling does not provide reliable evidence about an actual phone’s GPU or thermal behavior. P8 and M10 both matter.

Lenis — Disagree with paying for it everywhere without evidence

Use native scrolling on phones and in reduced-motion mode. Desktop smooth scrolling must earn its cost through measured benefit, not aesthetic preference alone.

Test keyboard navigation, anchor links, browser find, restored positions, nested scroll containers and focus movement. The existing need for a special test-side window.__lenis.scrollTo() is a reason to investigate native behavior—not proof that ordinary browser navigation remains correct.

GSAP engine — Agree with declarative hooks; challenge the global import

The architecture is sensible. Its route scope and cleanup still need proof.

A legal page or straightforward guide should not automatically pay for every animation subsystem. Import only the capabilities required by that route. Failed imports must leave content visible. Verify that deferred initialization never briefly hides content the visitor has already started reading.

font-display: optional — Agree, with fallback QA

This is a legitimate stability trade-off, not a shortcut to reverse automatically. Some first visits may retain the fallback font when the webfont arrives late. Therefore, the fallback layout must be an intentionally supported design. 
web.dev

Do not replace proper typography testing with the brittle rule “every hero line must have 16–17 characters.”

Ten-scene homepage — Need data; scene count itself is not a defect

The service proposition, real location scope, pricing route and primary CTA should not require a cinematic journey to discover.

Retain the dark v4 identity. Test whether pinned sections delay access to practical information, whether the scene engine remains active offscreen, and whether the homepage’s full-scroll cost passes P7–P9.

Research tables — Disagree with a JS-heavy fix that hides the evidence

Start with server-rendered summaries and a useful accessible table. Use pagination or separately linked detail when justified. Do not virtualize away all meaningful rows or hide the methodology to improve a lab score.

The more serious risk is invalid inference: retained URL counts cannot establish how many businesses own websites.

Two additional risks the evidence pack underweights

Footer prefetch: Next.js 15 automatically prefetches eligible <Link> destinations when they enter the viewport. A footer linking every indexable page may create substantial incidental transfer during scrolling. Measure it; selectively disable low-value prefetch without removing crawlable links. 
Next.js

Eager demo images: “Native lazy images did not load in a headless screenshot” is a test-harness issue to investigate, not sufficient reason to eagerly fetch every below-fold capture. Scroll the browser and wait for image decoding in screenshot tests.

Security and hosting: release gates, not invented SEO bonuses

The exact installed patch is missing. The November 3, 2026 Next.js security release includes 15.5.29 for the 15.5 line. Inspect package-lock.json and applicable advisories; “Next.js 15.5” is insufficient to approve deployment. Do not blindly migrate the major version merely for this audit. 
nextjs.org

Re-run the existing admin-auth and SSRF suites. A 204 analytics response proves neither persistence nor successful vitals collection. Verify storage/aggregation separately.

Vercel’s Hobby terms restrict it to noncommercial personal use. Choose compliant commercial hosting before operating the studio site there. Missing CSP or HSTS in source code is not, by itself, evidence of the final response headers or an automatic SEO deduction. 
Vercel

Where motion is missing — Need screenshots, not imagination

I cannot identify actual missing visual transitions from this text pack. These are candidate improvements only after the existing motion passes:

Candidate	Desktop / phone	Reduced motion	Proposed incremental cost ceiling
Button/menu feedback	120–180 ms transform or color feedback; identical touch feedback	Immediate state change	No new dependency; ≤1 KiB CSS
Grader pending/result state	Visible local status; result remains in normal flow	Static status announcement	Existing state logic; ≤2 KiB JS
Process-step emphasis	Small declarative emphasis; no phone pinning	Static complete steps	Reuse engine; ≤1 KiB extra JS

Those are budgets, not measured costs. No new continuous animation loops are justified yet.

6. Provisional scores — Need data; these are review estimates, not measured results
Area	Provisional score	Reason
Performance	50/100	Good server-first/deferred architecture and promising reported loading numbers, offset by unverified interaction performance, potentially expensive animation startup, high reported TBT on some runs, and no production/field evidence.
SEO readiness and effectiveness	42/100	Solid implementation intentions, but content differentiation, research validity, bot behavior and production configuration are unverified. The v4 release has no demonstrated indexing or search outcomes.
Mobile usability	60/100	Multiple-width screenshot work is encouraging, but keyboard, assistive technology, sticky obstruction, failure states and physical-device journeys have not been demonstrated.

These numbers are qualitative Round 1 estimates. They are not fabricated sums of unrun tests. Round 2 replaces them with the weighted measurements above.

What moves them:

Performance upward: passing interaction-during-initialization tests, full-journey budgets, cleanup tests and production delivery. Field points require real observations.
Performance downward: reproducing 500 ms-class blocking, delayed taps, stalled phone scrolling, resource floods or loader obstruction.
SEO upward: correct public origin, differentiated content, reproducible research, actual indexing and qualified discovery.
SEO downward: wrong canonicals, bot-rule mistakes, streamed soft-404 behavior, doorway-like pages or overstated research.
Mobile upward/downward: the M tests, particularly focus, obstruction, forms and real devices—not more screenshots of an untouched first viewport.

For Round 2, return:

Plain text
test_id, route, state, profile, commit, tool_version,
run_count, measured_value, unit, threshold,
pass_fail_untested, artifact_path, diagnosis

Include raw Lighthouse JSON, traces, network records and failure screenshots. Claude’s independent tests should be labeled C1, C2…, not relabeled versions of this list.

7. “100/100 in everything” — Disagree as a universal promise; agree as a bounded acceptance target

A controlled Lighthouse run can reach 100. That does not prove every phone, interaction, network, accessibility requirement or search outcome is perfect. Lighthouse itself explains score variability and diminishing returns near 100. 
Chrome for Developers

What is achievable

Passing a declared technical acceptance matrix is achievable. So are truthful pages, reliable enquiry flows, correct crawl/index controls, efficient motion, useful research, and good real-user CWV.

Brand first-place rankings, relevant long-tail visibility and AI citations are reasonable objectives—not guarantees. Misspellings must first be observed or tested; do not assume a list is “common.” Sitelinks are selected automatically, not enabled by a magic schema field. 
Google for Developers

A promise to rank first for broad “website development”, outrank established competitors within a fixed number of months, or appear above every paid placement is not supportable from this evidence.

Exact outside-the-site sequence

1. Establish the production origin and release.
Have the owner approve/acquire the domain and commercially permitted hosting. Set the origin explicitly. Release the intended v2-redesign commit—not stale main. Map real old-v1 URLs to equivalent new URLs using permanent redirects; do not send every obsolete page to the homepage. Google recommends maintaining migration redirects generally for at least a year. 
Google for Developers

2. Configure Search Console.
Verify a Domain property through DNS for the owned domain. Separately verify the old hosted URL-prefix property where possible. Submit the production sitemap and inspect home, pricing, a service, a guide, a research page and the grader. A meta token in a local layout is not evidence that ownership verification succeeded. 
Google Support

Current Google documentation also provides Settings → Search generative AI. Verify the effective inclusion setting; inclusion is the default, not a separate paid optimization. The Generative AI performance report may remain absent until enough impressions exist. 
Google Support
+1

3. Configure Bing Webmaster Tools.
Verify the canonical site, submit its sitemap, inspect representative URLs and implement IndexNow for genuine additions, changes and deletions. Submission is notification, not an indexing guarantee. 
Search - Microsoft Bing
+1

4. Assess Google Business Profile eligibility before creating one.
A purely online studio is not automatically eligible. Google generally requires in-person customer contact. A genuine service-area business must follow the corresponding rules; do not invent an office or use a virtual address to manufacture eligibility. 
Google Support

5. Evaluate directories selectively.
Review Justdial, Sulekha and Clutch individually for a listing that can represent the real business without false location or client claims. Use the exact name SiteBlitz, approved URL, tested contact details and truthful service scope. Record the submitted profile and its status. Do not purchase bulk ranking links, invent reviews, or manufacture Wikipedia/Wikidata notability. Doorway pages, hidden keyword text, scaled low-value content and manipulative link schemes are expressly covered by Google’s spam policies. 
Google for Developers

AI visibility: retain the useful work, reject the mythology

Maintain accessible, useful, accurately attributed content and a consistent entity. The grader, transparent offers and reproducible original research are plausible citation assets.

However, llms.txt earns zero Google SEO points. Google’s current guidance says it does not use these files for ranking or visibility. It also rejects the premise that special AI writing patterns, excessive page splitting or special schema are required. 
Google for Developers

For ChatGPT search, distinguish OAI-SearchBot from GPTBot: search access and model-training permissions are separate. Allowing training is not a prerequisite for allowing search discovery. ChatGPT-User is not the switch controlling automatic search inclusion. 
OpenAI Developers

The priority is not another layer of animation or another 20 SEO pages. It is a correctly deployed, measurable site whose useful claims survive scrutiny.

Points still open
Production decision: approved domain, hosting plan, deployment source and v1 migration map.
Exact code/configuration: package.json, package-lock.json, next.config.ts, src/lib/site.ts, src/lib/seo.ts, src/lib/offer.ts, src/lib/pages.ts, src/lib/routes.ts, and the actual robots/sitemap implementations.
Motion/rendering evidence: src/components/site/Motion.tsx, the preloader/hero/ExperienceLayer implementations identified through docs/PROJECT_MAP.md, and representative normal/reduced-motion screenshots.
Content approval: actual service/industry/guide slugs and copy, 48-hour offer conditions, and the research methodology, source rights and reproduction artifacts.
Round 2 measurements: P/S/M results, Claude’s independent C tests, raw traces and failure evidence; real-device and field checks remain explicitly outstanding.
Search objectives: verified keyword demand, observed brand misspellings, realistic query benchmarks, business-profile eligibility and confirmed contact/profile details.
