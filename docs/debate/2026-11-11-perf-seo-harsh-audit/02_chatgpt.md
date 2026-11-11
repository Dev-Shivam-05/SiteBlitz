ChatGPT said:
SiteBlitz audit — Round 2

Claude: I accept that the new measurements overturn the earlier optimistic performance assessment. I do not accept every PASS/FAIL interpretation or every point allocation.

The strongest findings are delayed first interactions, unnecessary font loading and prefetch traffic, content obscured by the preloader, and broken mobile focus behavior. These are more important than obtaining a perfect Lighthouse category score. Your report records a 544 ms early menu interaction, 214 KB of fonts per page, and preloader obstruction continuing after first paint. 
Pasted text

I am reviewing the submitted measurements, not claiming to have rerun the repository.

1. Do I accept your points per test?
1.1 Overall scores — Accept as provisional bookkeeping, not as audited final scores

Your totals add up correctly:

Area	Submitted overall score	Submitted local subtotal	Local subtotal normalized to 100
Performance	28/100	28/80	35/100
SEO	36/100	36/60	60/100
Mobile	48/100	48/92	52.2/100

These are the report’s scores, not independently verified results. 
Pasted text
 
Pasted text
 
Pasted text

I would not publish a more precise replacement total yet. Several partial scores cannot be reconstructed from the submitted case counts.

This is partly a weakness in my Round-1 specification: I fixed the test weights, but did not fully specify subweights for partially completed tests. We must not fill that gap with discretionary half-points.

For the next calculation, each test needs its registered cases, pass count, fail count and untested count. Untested cases remain in the denominator. Do not let numerous easy route checks outweigh a missing interaction or failure-state test.

Also, 36/100 here does not mean “36% chance of ranking.” This rubric combines implementation, launch readiness and demonstrated outcomes.

1.2 Environment and font-manifest caveat — Need data

The Windows/Linux discrepancy is important. However, a shimmed Windows build is not yet proven equivalent to the actual deployment build. The report also says the machine was not fully idle. Both limitations belong beside the results. 
Pasted text

Produce an unmodified Linux production build with the same dependency lockfile and configuration. Compare generated preload links, font files and network requests against the shimmed build.

Retain the old measurements as superseded evidence; do not silently replace them. After the security update, establish a new baseline and attribute subsequent improvements against that baseline.

1.3 Performance: P1–P13

The following decisions refer to the submitted performance table. 
Pasted text

Test	Decision	Correction to verdict or points
P1	Agree: FAIL, 0/12.	The reported A and B p75 ranges fail the agreed thresholds. Keep LCP and unobscured readiness separate; neither passes.
P2	Agree: serious failure; disagree with reproducibility of 3/14.	Five passing cases out of 18 would produce 3.89/14 for that completed-case subset, not 3. But that is not the full P2 score: B-profile interactions, grader/form journeys and pending/error feedback are missing.
P3	Agree: partial, not complete PASS.	B-home CLS 0.042 fails our stricter 0.03 budget, although it is not evidence of failing Google’s 0.1 threshold. 26/27 alone would yield 7.70/8, not 6. Missing interaction/navigation states must explain the denominator rather than an arbitrary deduction.
P4	Agree that blocking needs attention; need trace evidence for attribution and 2/8.	Separate actual long tasks, long animation frames, layout work and simulated Lighthouse TBT. The figures are not interchangeable.
P5	Disagree with automatically counting RSC responses as JavaScript.	Reported JS passes the later JS limits: approximately 182–188 KB at 10 seconds and 196–201 KB after scrolling. The 351–389 KB of RSC prefetch belongs in total transfer and speculative-transfer accounting. My earlier wording was ambiguous; do not retroactively invent a combined 300 KiB cap. First-useful-paint JS remains unreported.
P6	Agree: 2/5 is supportable.	Of the five listed checks, CSS size and blocked-font usability pass; initial font bytes, later font bytes and preload count fail, assuming the measured font timing matches those windows.
P7	Agree: partial; need data for 3.5/5.	The reported 10-second totals pass 750 KiB; the reported home full-scroll total passes 1.5 MiB. Initial-useful-viewport totals and other route journeys remain incomplete. An LCP-image budget is inapplicable where LCP is text.
P8	Agree: observed scrolling problems; do not certify 1/7.	Provide per-route frame distributions and stall attribution. SwiftShader limits conclusions about actual phone GPU performance; it does not erase non-WebGL scrolling problems. Offscreen/hidden-tab shutdown remains untested.
P9	Agree: partial; 1.5/5 needs its underlying artifact.	Inspect the Lighthouse bfcache audit details. Credit a demonstrated restoration, not merely the word “eligible.” No cleanup, heap or twenty-navigation credit yet.
P10	Mostly agree; 3/4 remains provisional.	A long shared-cache lifetime is not automatically wrong for generated static HTML. Verify freshness across deployments. Unreferenced PNGs are repository/deployment housekeeping, not measured page-transfer cost.
P11	Agree: preloader failure; partial resilience only.	JS-off and blocked-font checks are useful. Resolve the missing 125 contact-page characters and test blocked motion. A dismissed overlay is not the same as an overlay that never unnecessarily obstructs content.
P12	Agree: 0/8 unearned.	No production-delivery evidence. This is untested, not an observed hosting failure.
P13	Agree: 0/12 unearned.	No real-user evidence. Do not label lab interactions as field INP.

P4 requires particular care. A long pre-FCP layout can coexist with modest TBT because Lighthouse TBT measures blocking within its defined post-FCP window. Also, one long animation frame can contain multiple tasks and rendering work. Ask the trace which operation was expensive; do not conclude “React hydration takes 724 ms” merely because react-dom appears in a parent stack. 
Chrome for Developers
+1

For P2, preserve Event Timing attribution: input delay, processing and presentation delay. A fast settled FAQ interaction does not compensate for an early menu tap that waits half a second. INP concerns responsiveness across the interaction lifecycle. 
web.dev

1.4 SEO: S1–S20

These decisions refer to the submitted SEO findings. 
Pasted text

Test	Decision	Correction to verdict or points
S1	Agree: 6/6 on the reported scope.	Real missing-route 404s are good. Close the streamed-soft-404 concern for the tested implementation.
S2	Agree: partial; 5/6 provisional.	Raw HTML and Googlebot parity are positive. Bing/social fetchers and the meaningfulness of the contact-page difference remain open.
S3	Agree on the missing production guard; qualify the origin failure.	A vercel.app canonical is not inherently invalid. It is wrong when it is not the approved production origin. The definite defect is silently accepting a fallback without an explicit release decision.
S4	Agree: partial; 2/4 provisional.	Slash normalization and case-variant 404s are acceptable. The migration map can be written and locally tested before deployment; host/protocol behavior needs the actual host.
S5	Agree: 4/5 provisional.	The named-bot override concern was checked and is closed. Preview indexation protection remains open.
S6	Agree on sitemap mechanics; origin decision pending.	Do not call the sitemap intrinsically broken merely because its current host is a platform subdomain. It must match the approved release origin.
S7	Agree with the reported technical checks.	Keep 3/3 only after confirming that the linked pages genuinely correspond. Multiple language annotations are not, by themselves, a defect.
S8	Disagree with the combined failure interpretation.	Heading structure deserves correction. Four preview-width warnings are not automatic failures. Missing favicon is a real implementation issue, but it was not an independent weighted S8 criterion.
S9	Agree there may be contextual-link gaps; need the graph definition.	Does “0 in-content links” mean incoming or outgoing? A blog post linked from its relevant hub satisfies the earlier contextual-link requirement. Legal pages do not need manufactured editorial backlinks.
S10	Need data; 4/8 is optimistic without the content review.	Low shingle similarity does not establish distinct user value or truthful offers. Review the manifest’s 48-hour claim against the actual offer conditions.
S11	Agree: partial; qualify the deductions.	Parsing and resolving IDs are positive. Missing BlogPosting.image is not automatically invalid Article markup. Complete the validators and visible-content checks.
S12	Agree: 0/6 unearned.	The research has not been reproduced this round. This does not establish that it is false; it establishes that the evidence is incomplete.
S13–S20	Agree: 0/40 unearned for this release.	No deployment/search-outcome credit can be inferred from localhost.

Three important corrections:

Missing favicon does not prove “blank icon in Google mobile results.” The v4 release is not deployed. You have established missing local icon declarations and a failed favicon request—not a Google search appearance. Google also does not guarantee favicon display even when implementation requirements are met. 
Google for Developers

A missing Article image is not a required-property failure. Google’s current Article documentation lists recommended properties and explicitly states that there are no required properties. Add a relevant article image where one genuinely exists; do not insert an irrelevant logo simply to suppress a warning. 
Google for Developers

“Under 300 words” is not a thin-content verdict. A contact page, booking page or functional grader should be judged by whether it completes its job. Google rejects the idea of a preferred word count. Do not pad these pages. 
Google for Developers

The FAQ-rich-result statement is independently confirmed in Google’s own changelog: the feature stopped appearing from May 7, 2026. That removes an expected rich-result benefit; it does not turn accurate FAQ markup into a syntax error. 
Google for Developers

1.5 Mobile: M1–M10

These decisions refer to the submitted mobile findings. 
Pasted text

Test	Decision	Correction to verdict or points
M1	Disagree with unconditional PASS.	A heading wider than its box is a real fallback-font defect even if document overflow is zero. Landscape, zoom and reflow remain incomplete. Treat 10/12 as provisional.
M2	Disagree with the blanket target-size failure.	The original house target was 44 px, not 48 px. Sub-24 px links require spacing/inline-exception analysis and actual hit-area measurement. Do not score text-height alone.
M3	Agree: fails our house typography standard.	The 15 px body text and 10–11 px labels need review. But “below 16 px” is not automatically a WCAG failure. Enlargement and text-spacing tests remain missing.
M4	Agree: FAIL and release blocker.	Focus escapes into obscured background content, and Escape does not return focus. Visible focus rings do not compensate.
M5	Agree: FAIL.	Covered focused controls are a genuine defect. Header height occupying 8–12% of the screen is not itself a failure; obstruction is.
M6	Need the actual text diff before accepting 10/10.	A 40-character difference could be harmless UI text—or a crucial price/condition. Compare meaning, not only length.
M7	Agree there are defects; reclassify individual findings.	Meaningful unreadable text and prohibited ARIA require fixes. Pure decoration may be exempt from text contrast requirements. Do not treat every automated finding as the same kind of violation.
M8	Agree: 0/10 unearned.	Forms are a substantial untested part of the mobile experience.
M9	Mostly agree; 6/8 provisional.	Native mobile scrolling and reduced-motion behavior are confirmed positives. An infinite animation declaration alone is not a complete accessibility assessment; inspect its behavior and applicable pause requirements.
M10	Agree: 0/8 unearned.	Desktop emulation does not establish physical-device usability.

WCAG’s minimum-target criterion includes inline and spacing exceptions. A 20 px-high breadcrumb can be compliant depending on its actual target and surrounding space. Likewise, genuinely decorative text has a contrast exception; meaningful step numbers and explanatory words cannot be relabeled “decoration” to evade it. 
W3C
+1

1.6 Independent C-tests — Useful diagnostics; no extra scoring weight
Tests	My reading
C-P1, C-P2, C-P3, C-P6, C-P7	Keep as stretch diagnostics. Lighthouse 100, LCP 1.2 seconds and JS 100 KB are not additional release requirements unless explicitly adopted. Do not count their failures twice.
C-P4	A useful stricter CLS diagnostic; it does not replace P3’s full-journey coverage.
C-P8	Static rendering is positive, not proof that the delivered experience has little hydration work.
C-S1	Correct: 37/38 Lighthouse SEO scores of 100 do not establish search effectiveness.
C-S13	Same approved-origin decision as S3; no additional deduction.
C-S14	Inspect the exact Best Practices audit failure. Do not assume the favicon is the sole cause until the report and rerun demonstrate it.
C-S15	No demonstrated off-page presence for this release; not a code defect.

Your security finding is valid: the official 15.5.29 release includes security fixes. Upgrade to a currently patched compatible release and rerun auth/SSRF/build checks before release. The particular advisories that affect this application still depend on its configuration. 
Pasted text
 
GitHub

2. Ranked fix list — Ten changes, with evidence-backed priorities

No score gain has been verified yet; only defects have been measured. The ranking below reflects breadth of impact, confidence and likely effort. Affected-test weights are not additive predicted gains.

The security update and reproducible Linux baseline are prerequisites, not cosmetic score improvements.

Rank	Exact change	Tests affected	Expected effect and visual cost
1	Rebuild the font-loading plan: eliminate unused faces/preloads; evaluate an exact static Mona display instance; retain DM Sans fallback behavior.	P1, P3, P6, P7; M1	Lower critical transfer and contention. P6 has three currently failed points available if its remaining criteria pass. No intended brand change.
2	Disable speculative prefetch on global footer, legal and low-probability editorial links with prefetch={false}; remove high-priority loading from the below-fold phone capture.	P5 accounting, P7, P2	Remove avoidable requests competing with useful work. Visual appearance unchanged; uncached destination navigation may start later.
3	Replace the blocking preloader sheet with a nonblocking branded entrance. Remove artificial percentage/progress behavior.	P1 readiness, P11, M5	Stop hiding available content. The visual cost is losing the compulsory fullscreen opening ceremony.
4	Correct the fullscreen menu’s focus model and prevent the WhatsApp pill from covering interactive content. Include primary-control hit areas.	M2, M4, M5; P2	Fix verified usability failures. Preserve styling; adjust positioning and interaction behavior.
5	Attribute and reduce initial layout/hydration work; isolate essential interactions from scene initialization.	P1, P2, P4	Highest potential CPU improvement, but attribution is not yet proven. No intended appearance change; decorative initialization may happen later.
6	Fix readable-text tokens, meaningful text contrast and SplitText semantics; repair heading hierarchy.	M1, M3, M7; S8	Remove confirmed readability/semantic defects. Some text becomes larger or less dim; the palette remains unchanged.
7	Require an explicit approved production origin and explicit deployment mode; add preview-indexation protection tests.	S3, S5, S6	Eliminate silent wrong-origin release risk. No visual cost.
8	Add specific contextual links where the incoming-link graph shows genuine gaps.	S9	Improve relevant discovery and navigation without adding new pages or keyword-stuffed blocks.
9	Add declared, working favicon assets through Next’s metadata conventions.	Branding; relevant Best Practices audit	Remove missing-icon behavior. No promised ranking gain and no invented SEO points.
10	Scope ongoing motion to visible scenes; verify shutdown/cleanup; reduce mobile particle/rendering work only where measured.	P8, P9, M9	Improve scrolling and prevent unnecessary work. Phone animation may be simpler; reduced-motion remains static.

The measured font, prefetch, image-priority and preloader problems support ranks 1–3. The menu, obstruction and text/ARIA findings support ranks 4 and 6. 
Pasted text
 
Pasted text

2(a). Font plan — Preserve the typography; stop shipping unused flexibility

First audit actual usage. Record which public elements use each family, weight, style and width. Check admin separately so a marketing optimization does not break its typography.

For Mona Sans, a static 800 / 125% face is my preferred experiment only if those are the exclusively required public display coordinates. Inspect the actual font axes, instantiate the required coordinates and pin unused axes appropriately. FontTools supports both full static instances and restricted variable fonts. 
fontTools Documentation

Then:

Generate WOFF2 subsets from the licensed source, retaining required glyphs and layout features.
Include ordinary editorial punctuation, currency symbols such as ₹, and the characters actually needed across routes—not just the homepage’s current letters.
Preserve the original face’s width and weight in CSS matching. Do not imitate 125% width with scaleX().
Compare wrapping, kerning and fallback behavior at every tested width.

FontTools supports character-based subsetting and preserving the relevant OpenType functionality. The resulting size must be measured; “static is always smaller” is not an acceptable assumption. 
fontTools Documentation

For DM Sans, retain 400/600 and display: optional initially. Compare two static faces against a restricted variable file; select the smaller correct result. Do not substitute synthetic bold.

For Instrument Serif, remove the normal face only if usage inspection confirms it is unused. Retain the actual italic treatment.

Use no more than two justified preloads. Test the display face and body face as candidates. Route-scope fonts where feasible. Crucially, preload: false changes early fetching; it does not guarantee that a font referenced by visible content will never download. Next’s subsets setting also selects preload subsets rather than providing a universal “remove every other glyph” switch. 
nextjs.org

Acceptance: satisfy P6’s existing byte limits, maintain fallback readability, and introduce no new CLS or missing glyphs. Do not promise an exact kilobyte reduction before producing the files.

2(b). Preloader — The blocking behavior must change to pass

The report establishes 0.2–0.9 seconds of additional obstruction after FCP, not merely an abstract objection to preloaders. 
Pasted text

Keep the brand motif as a short, nonblocking entrance accent. It must not cover the proposition, navigation or primary action. Avoid a fabricated loading percentage.

Phone: no fullscreen blocking sheet.
Reduced motion: static or absent entrance treatment.
Performance budget: no new dependency, continuous timer or animation loop.

Changing only pointer-events is insufficient: the sheet can remain visually obstructive.

If the owner insists on retaining a fullscreen sheet after content is usable, P11 and the obstruction component of M5 must remain failed. That is an explicit design trade-off, not something to disguise with a better Lighthouse score.

2(c). Hydration and first layout — Investigate before prescribing a framework rewrite

The reported 580–724 ms hydration-associated block and 1.4–1.9-second initial rendering work require raw traces. 
Pasted text

Run controlled variants on the same otherwise-idle machine:

Variant	Change from baseline	Question answered
V0	Patched, unmodified Linux build	What is the reproducible baseline?
V1	Disable motion/particles without changing substantive HTML	How much startup cost is decorative initialization?
V2	Apply only the font change	How much comes from font loading and resulting rendering?
V3	Apply only the nonblocking entrance	How much visible delay is deliberate obstruction?
V4	Narrow identified client boundaries/effects	Which interaction components or effects create the CPU stall?

Do not attribute differences between a loaded Windows machine and an idle Linux machine to one code change.

Then make targeted changes:

Hydration: keep layout/content server-rendered and client boundaries focused on actual interaction. Inspect imported module graphs and effect self-time. A client wrapper receiving server-rendered children does not automatically mean all those children became client components. 
nextjs.org

Motion: initialize nearby scenes separately, split only text that needs splitting, and avoid a single “idle” callback doing hundreds of milliseconds of synchronous work. Moving a long task later does not make it shorter.

Layout: inspect DOM size and forced layout stacks; batch reads before writes. Test containment or deferred rendering only on suitable below-fold sections, preserving anchor navigation, accessibility and ScrollTrigger correctness. Layout cost depends on both the number of affected elements and layout complexity. 
web.dev

Do not “fix” this by hiding the real content until JavaScript finishes.

2(d). RSC prefetch — Fix the traffic, but classify it honestly

Use:

TypeScript
<Link href={destination} prefetch={false}>
  {label}
</Link>

Apply it first to the global footer, legal links and low-probability destinations. Preserve normal <a href> behavior and selective prefetch for genuinely likely next steps.

In Next.js 15 App Router, prefetch={false} disables both viewport and hover prefetch. 
nextjs.org

Maintain separate counters for JavaScript, RSC/navigation payloads, images/fonts/CSS, and total transferred bytes. Normalize KB/KiB and document whether the measurement is encoded body size or full transfer size.

The measurable opportunity is some portion of the reported 351–389 KB of speculative traffic. Do not promise all of it disappears until requests are attributed to their initiating links. 
Pasted text

2(e). Favicon — A small, worthwhile fix, not a major SEO intervention

Proposed files:

Plain text
src/app/favicon.ico
src/app/icon.png
src/app/apple-icon.png

Use the existing approved mark, with suitable square raster sizes; do not redesign the logo. Next’s file conventions generate the corresponding icon declarations. Verify emitted HTML, content types, successful responses and absence of conflicting declarations. 
nextjs.org

A larger-than-48-pixel PNG is consistent with Google’s current favicon recommendation. Crawlability and a stable URL matter; appearance in search remains unguaranteed. 
Google for Developers

2(f). Contextual links — Add the missing relationships, not a second footer

Use these known routes and anchors where the surrounding content supports them:

Source	Destination	Anchor
Home service introduction	/services	Website development services
Home tool introduction	/tools/grader	Check your current website
Home studio introduction	/about	About the Gujarat-based studio
/pricing booking explanation	/book	Book a project discussion
/process delivery explanation	/website-in-48-hours	48-hour delivery conditions
Relevant home or guide passage	/research	Explore our research and methodology
/pricing terms explanation	/refunds	Refund conditions

Use the 48-hour link only where the actual conditions are accurately explained.

Each guide should link to the relevant service, tool or pricing explanation—not automatically to every commercial destination. Replace the Surat page’s “here” with a phrase describing its actual destination.

Accessibility details for fixes 4 and 6

Treat the fullscreen menu as a modal when it obscures and disables the page: move focus inside, contain focus, make the background inert, support Escape and restore focus to the opener. This follows the modal-dialog interaction pattern. 
W3C

Reserve space for the WhatsApp control or move it out of the overlay position on constrained screens. Adding a higher z-index does not solve obstruction.

For meaningful scrubbed text, retain readable contrast throughout. Use movement or emphasis—not near-invisible words—to show progression.

For SplitText, do not merely remove aria-label while leaving all split children aria-hidden. That could remove the text from the accessibility tree. Prefer unsplit paragraphs; where splitting is essential, implement and test a valid accessible representation. GSAP documents its automatic ARIA behavior and alternative strategies. 
gsap.com

3. What local score is realistically reachable?
3.1 Planning targets — Conditional estimates, not measured outcomes

After the fixes and completion of the missing tests, these are reasonable targets:

Area	Planning target on original local scale	Normalized local score
Performance	60–70 / 80	75–87.5 / 100
SEO	52–58 / 60	86.7–96.7 / 100
Mobile, excluding physical-device checks	78–86 / 92	84.8–93.5 / 100

These ranges are engineering judgment, not a prediction derived from measured before/after changes.

Performance is the least certain. The initial CPU attribution and actual-device particle behavior remain unresolved.

SEO’s upper range requires more than the ten code changes: full offer/content review, schema validation and research reproduction must pass. Without S12, the local SEO ceiling is 54/60, even with everything else perfect.

Mobile’s upper range requires forms to pass. M8 is worth ten points and is currently completely untested.

3.2 What remains capped?

Performance: local evidence can earn at most 80/100 under the agreed rubric. Verified production delivery can raise that to 88/100. The remaining twelve points require real-user evidence—not necessarily a public CrUX report, but credible field measurements.

SEO: local implementation can earn 60/100. Deployment/readiness/indexation checks account for the next twenty; demonstrated search outcomes account for the final twenty. Buying a domain or submitting a sitemap does not automatically earn all those points.

Mobile: the eight M10 points require physical-device testing, not public deployment. Actual phones can test a locally served build. Therefore, 92 is an emulation-only ceiling, not a predeployment ceiling.

Owner constraints matter: preserving the palette, typography and particle concept is compatible with substantial improvement. Preserving deliberate fullscreen obstruction after usable content appears is incompatible with the agreed zero-obstruction requirement.

4. Points still open
Reproducible baseline: patched dependency versions, an unmodified Linux build, the font-manifest shim diff, emitted preload links and otherwise-idle reruns.
Scoring ledger: registered case denominators and subchecks for every partial P/S/M score. The current 28/36/48 totals remain provisional.
Performance attribution: raw P2/P4 traces, actual long-task versus long-frame classification, exact byte accounting, hardware-GPU results, shutdown and navigation-cleanup tests.
Content and SEO evidence: incoming versus outgoing contextual-link graphs, the actual mobile/desktop and JS-off text diffs, offer/manifest consistency, language equivalence, validators and research reproduction.
Mobile completion: menu/focus repair, target-spacing classification, zoom/landscape/text-spacing checks, full form journeys and physical-device tests.
Release and outcomes: approved origin, preview protection, v1 migration mappings, commercially appropriate hosting, production measurements, indexing and subsequent real-user/search evidence.
