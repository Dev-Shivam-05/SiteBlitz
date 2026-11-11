ChatGPT said:
SiteBlitz — Round 3 audit closure

The first-frame layout investigation now takes priority over font tuning and the preloader. The scoring can also close—but as an evidence-backed acceptance score, not a statistically reliable estimate of real-world performance.

The new information closes the favicon-error diagnosis, the contextual-link interpretation, mobile content parity for the compared pages, and the contact page’s JavaScript-off text difference. It does not establish the cause of the expensive layout or resolve the remaining untested journeys.

1. Final scores — Agree: close this evidence set, with the scoring ledger made explicit

One correction to my own process: Round 1 fixed the test weights but did not preregister every subcase or partial-credit allocation. Therefore, there is no uniquely determined “original case-ledger total” to recover. To close this round without inventing test results, I am freezing the following closure ledger now.

These are confirmed-evidence scores for the submitted build and test scope. They are not percentages of website quality, probabilities of ranking, or claims that every untested feature is broken.

Final area scores
Area	Final score	Locally available component	Owner-facing verdict
Performance	20.5/100	20.5/80	The submitted tests do not support a fast-mobile claim: first-frame rendering and interaction blocking need correction, and stable production-equivalent and field measurements are absent.
SEO readiness and effectiveness	30.5/100	30.5/60	The technical foundation is promising, but content/research verification and launch checks remain incomplete, with no demonstrated v4 search outcomes.
Mobile usability	24.3/100	24.3/92	There are confirmed focus, obstruction and readability defects, while important interaction and accessibility checks remain unverified.

The reduction from the earlier 28/36/48 is principally a correction to generous, unsupported partial credit—not evidence that the website deteriorated. In particular, the earlier mobile score awarded points to target-size compliance, typography and overlay behavior without sufficient passing evidence.

Ledger rules

Within each checklist test, the listed acceptance checks receive equal credit. Where a reported case count exists, I use that count and explicitly add the missing completion cases. P4’s three distinct budgets are equally weighted so that 38 Lighthouse runs cannot overwhelm failed main-thread budgets.

An untested check earns zero but remains untested, not failed. Scores are summed before rounding. Favicon, security prerequisites and environmental uncertainty receive no extra, unannounced score deductions.

Performance ledger

The starting measurements are those in the Round-2 performance table, supplemented by your Round-3 traces and controlled comparisons. 
Pasted text

Test	Frozen acceptance ledger	Earned / weight
P1	All 20 reported route/profile cases miss their applicable loading threshold. This is a failure in the submitted environments, not proof of performance on an idle production-equivalent machine.	0 / 12
P2	5 passing / 48 cases: 18 reported A cases; 18 matching B cases; package selection, enquiry validation, grader submission and navigation in both profiles; pending/error feedback in both profiles. The additional 30 cases are untested.	1.46 / 14
P3	26 passing / 33 cases: retain the reported 26/27, then add menu, grader and navigation stability in A and B—six untested cases.	6.30 / 8
P4	Three equally weighted budgets: Lighthouse TBT 14/38 pass; A maximum-task budget fails; B maximum-task budget fails. Formula: 8 × (14/38 + 0 + 0) ÷ 3.	0.98 / 8
P5	3/4 checks pass: 10-second JS, full-journey JS and public-bundle separation. First-useful-paint JS remains untested. RSC traffic is not counted as JavaScript.	4.50 / 6
P6	2/5 pass: CSS bytes and blocked-font usability. Font-byte limits and preload-count limit fail.	2.00 / 5
P7	1/4 complete checks passes: 10-second transfer. Initial-useful-viewport transfer is untested; full-scroll coverage is incomplete beyond the reported homepage; unnecessary below-fold high-priority loading fails. Text LCP makes the LCP-image-size check inapplicable.	1.25 / 5
P8	0/6 verified passes: A and B frame budgets fail. Motion-attributed stall isolation, offscreen shutdown, hidden-tab shutdown and absence of all continuous reduced-motion work remain unverified. Particle suppression alone does not establish the last condition.	0 / 7
P9	0/4 verified passes: listener/trigger cleanup, heap stability, warm navigation timing and actual bfcache restoration with correct state remain untested. Reported eligibility is not demonstrated restoration.	0 / 5
P10	2/4 pass: fingerprinted-asset cache policy and HTML not being marked immutable. Warm-response behavior and replacement/freshness tests remain untested.	2.00 / 4
P11	2/6 pass: essential JS-off content/navigation and blocked-font usability. Zero imposed obstruction fails; blocked motion, WebGL failure and denied-storage behavior remain untested.	2.00 / 6
P12	Production delivery untested.	0 / 8
P13	Real-user performance untested.	0 / 12
Total	Rounded only after summing.	20.5 / 100

For P2, the 48-case completion matrix is the explicit scope adopted for closure; I am not claiming those 30 missing cases were executed or preregistered earlier.

For P7, the homepage’s approximately 1.2 MB full scroll remains an individual passing observation. It does not establish completion of the full-scroll budget across the required representative templates.

SEO ledger

The technical findings below come from the Round-2 SEO table, with your new clarifications applied. 
Pasted text

Test	Frozen acceptance ledger	Earned / weight
S1	Accept the reported status/crawl suite: intended pages and links succeed; missing routes return actual 404s.	6 / 6
S2	4/6 pass: source content, source links, essential JS-off availability and Googlebot parity. Bing and social-fetcher checks remain untested. The absent business-type picker does not remove the essential WhatsApp contact route.	4 / 6
S3	3/5 pass: singular canonicals, clean tracking-parameter canonicals and internally consistent origin output. The approved production-origin decision is unresolved; rejecting an unset production origin fails.	3 / 5
S4	2/4 pass: slash normalization and case-variant handling. Host/protocol behavior and migration mappings remain unverified.	2 / 4
S5	4/5 pass: public crawling, named-group consistency, crawlable noindexed demos and required public-resource access. Preview protection remains unverified.	4 / 5
S6	2/3 pass: intended sitemap set and honest modification dates. Approved production origin remains unresolved.	2 / 3
S7	2/3 pass: reciprocal/self annotations and language declaration. Actual translation/content equivalence remains unreviewed.	2 / 3
S8	3/5 pass: metadata uniqueness, primary H1 and image alternatives. Heading hierarchy fails; complete metadata-to-content accuracy remains unreviewed. No deduction for favicon or preview-width warnings.	3 / 5
S9	2/4 pass: crawlable links and overall depth. Contextual incoming-link coverage and descriptive-anchor checks fail. Blog-hub links count; legal pages require no manufactured links.	2.5 / 5
S10	0/4 verified passes: distinct intent, useful differentiation, offer consistency and commercial-claim accuracy require the actual content review. Low shingle similarity does not prove these.	0 / 8
S11	2/4 pass: parsing/reference integrity and reported entity truthfulness. Full visible-content correspondence and applicable validator checks remain unverified. Missing BlogPosting.image is not treated as a required-property failure.	2 / 4
S12	Research reproduction and publication-rights verification remain untested.	0 / 6
S13–S20	Public launch, indexing and demonstrated outcomes remain unverified for v4.	0 / 40
Total		30.5 / 100

Your S9 clarification is sufficient. /services, /about, /book, /website-in-48-hours and /research have genuine contextual incoming-link gaps under the agreed rule. Blog posts have a relevant incoming hub link and should not be reported as contextual orphans.

The favicon finding is also closed as a diagnosis: it explains the submitted Best Practices failures. Correcting it and rerunning Lighthouse remain implementation and verification steps, not additional SEO-scoring criteria.

Mobile ledger

The following ledger removes credit previously given without enough evidence, while preserving the confirmed mobile-parity pass. 
Pasted text

Test	Frozen acceptance ledger	Earned / weight
M1	1/5 complete checks passes: normal portrait-width layout. Fallback-fit resolution, landscape, zoom/reflow and expanded/error-state coverage remain incomplete. A heading exceeding its box is not automatically proof of clipped text, but it requires resolution.	2.40 / 12
M2	0/2 verified passes: primary-control 44 px targets and other targets’ minimum-size/spacing exceptions have not been classified correctly. This is untested compliance, not blanket failure of every small link.	0 / 10
M3	0/4 passes: body/input and secondary-label house-size checks fail; enlargement and spacing checks are untested. These are not assertions that every sub-16 px text element violates WCAG.	0 / 10
M4	3/7 pass: visible focus, keyboard menu opening and Escape closing. Skip link, modal focus containment and focus restoration fail; the complete keyboard journey is untested.	5.14 / 12
M5	0/4 verified passes: focused-control obstruction and preloader obstruction fail. Complete primary/footer usability and keyboard/safe-area behavior remain unverified.	0 / 10
M6	PASS for the reported comparison scope. The desktop hover hint is the only difference; substantive content and links match.	10 / 10
M7	1/5 verified passes: image alternatives. Meaningful-text contrast and valid ARIA fail; complete control-name/label and table/caption checks remain unverified.	2 / 10
M8	Form journeys untested.	0 / 10
M9	3/5 pass: reduced-motion content visibility, native phone scrolling and reduced-motion particle suppression. Blocked-motion resilience and the persistent-animation assessment remain incomplete.	4.8 / 8
M10	Physical-device and assistive-technology journeys untested.	0 / 8
Total		24.3 / 100

Scoring is closed for this evidence set. Subsequent changes or completed tests should produce a new ledger version, rather than retroactively altering these observations.

2. Does the trace change the fix ranking? — Agree: first-frame layout investigation moves to the top

Your trace separates four costs that were previously conflated:

Work	Evidence from Round 3	Consequence
Initial rendering	Approximately 1.0–2.0 seconds of layout inside the reported first-render tasks, with substantial additional style work.	Highest-priority performance investigation.
Font-associated relayout	Home has another task containing roughly 1,025 ms of layout as fonts arrive.	Font work remains important, but is not the sole loading problem.
Hydration-associated execution	Approximately 724–805 ms inside the reported React work-loop tasks.	A separate responsiveness workstream; inspect component and effect work inside the task.
Deferred motion initialization	Later GSAP/scene/particle tasks, including forced layout.	Deferral has moved work later, but has not made it sufficiently small.
Revised order
Priority	Work	Required outcome
Prerequisite	Establish a stable, production-equivalent benchmark environment.	Reproducible baseline before accepting precise improvement claims.
1	Find and remove avoidable first-frame style/layout cost.	Identify the responsible CSS/DOM operations through controlled isolation—not property counts.
2	Break down the hydration-associated task.	Attribute expensive component/effect work and prevent it from blocking essential interactions.
3	Reduce font transfer and font-induced relayout.	Preserve the approved typography while avoiding unnecessary files, preloads and expensive swaps.
4	Remove preloader/entrance obstruction.	Available content becomes visible and usable without an imposed wait.
5	Reduce and isolate motion initialization.	Smaller initialization tasks, fewer forced layouts and verified lifecycle shutdown.
6	Remove unnecessary prefetch and resource priority.	Less speculative traffic and no below-fold image competing unnecessarily with initial content.

The confirmed menu-focus and fixed-overlay defects remain release-blocking usability work in parallel, not items to postpone until performance is solved. Favicon and contextual-link corrections are also small, independent changes; they need not wait for the layout investigation.

What the controlled experiment actually establishes

These are differences between the supplied p75 values, not statistically established causal effect sizes:

Route	Visible-ready improvement: base → seen	LCP improvement: seen → seen+nofonts
/	0.51 s	0.17 s
/pricing	0.19 s	0.78 s
/services/business-websites	0.20 s	0.54 s
Blog post	0.11 s	0.20 s

Three interpretation corrections matter.

First, seen is not a preloader-only experiment. It removes both the sheet and the delayed hero entrance. It demonstrates the benefit of bypassing that combined entrance behavior, but does not isolate the sheet’s contribution.

Second, blocking every font is a diagnostic extreme, not a mathematical upper bound on every possible font optimization. It changes font metrics, wrapping and potentially the LCP candidate. It supports investigating fonts, but does not establish exactly what a production font plan will save.

Third, environmental drift is not a measured “±50%” uncertainty interval. The identical home baseline rose from 2.44 to 4.07 seconds—approximately 67%. Interleaving improves the comparison, but it does not establish statistical confidence or make the absolute values production-representative.

Accordingly, the defensible conclusion is:

The submitted sessions fail the agreed loading targets, and first-frame rendering is the largest reported task. We have not yet established whether its magnitude comes primarily from the site, the test machine, the browser/build configuration, or an interaction among them.

The next layout investigation

Start with an idle baseline and the unmodified deployment build. Your proposed Vercel Preview comparison is a useful way to close the Linux font-manifest question: compare emitted preload tags, requested font assets and configuration. Matching preload tags alone will not establish equivalent performance.

Then isolate the expensive rendering while retaining the same substantive content and viewport. Begin with the shared shell and typography because the cost appears on home, pricing and a blog page; compare a minimal shell, the complete static page without decorative initialization, and the unchanged baseline.

Do not remove @property, clamp(), svh, variable-font settings or SVGs merely because their counts look suspicious. Their presence is a candidate-selection aid, not causal evidence. The missing V1 and V4 experiments should distinguish decorative initialization from client-component work, while the CSS/DOM bisect identifies the first-frame rendering cause.

Cheap, well-understood fixes can proceed alongside that investigation. Moving layout to priority one does not mean delaying the favicon correction, prefetch change or menu-focus repair until the investigation finishes.

3. The owner’s “100/100 in everything” request — Disagree with a universal guarantee

“We can target 100/100 against a fixed, reproducible acceptance matrix, but we cannot promise perfect results on every device, network or search outcome. This build has documented rendering, responsiveness and mobile-usability problems, and its absolute performance still needs a stable production-equivalent measurement. Deployment, real-user performance, indexing and rankings must be verified separately rather than represented as guaranteed consequences of a green Lighthouse report.”

4. Points still open — final list

Production-equivalent baseline: unmodified Linux/deployment build, font-manifest comparison, recorded configuration, controlled machine load and hardware-GPU measurements. The shim’s explanation is credible but not yet independently confirmed by that build.

Root-cause and improvement evidence: first-frame CSS/DOM isolation, hydration attribution, V1/V4 experiments and isolated before/after measurements. The trace identifies expensive tasks; it does not yet identify the responsible implementation decisions.

Remaining performance cases: B-profile interactions, package/form/grader/navigation journeys, feedback timing, interaction-related shifts, full-template transfer coverage, motion shutdown, navigation cleanup, warm caching, actual bfcache restoration and failure-mode tests.

Remaining mobile cases and repairs: modal focus/return behavior, fixed-control obstruction, correct target-size classification, fallback typography, landscape, zoom/text spacing, forms, persistent-animation behavior and physical-device/assistive-technology journeys.

Remaining SEO/content verification: approved-origin enforcement, preview protection, migration mappings, contextual-link repairs, language-content equivalence, full copy/offer review, structured-data validation and research reproduction/publication rights.

Release and external evidence: the previously identified dependency/security work and regression checks; actual favicon correction and Best Practices rerun; public deployment, production measurements, indexing, real-user vitals and subsequent search outcomes.
