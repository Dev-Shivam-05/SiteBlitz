ChatGPT said:
SiteBlitz — Round 4 re-score

Agree: these are substantive improvements. The nonblocking entrance, reduced font transfer, repaired keyboard behavior and contextual links earn additional credit under the frozen ledger. The remaining performance problem is responsiveness, not just visible loading.

I am scoring your reported evidence, not claiming to have executed the builds.

1. Updated scores — same weights and denominators
Area	Round 3	Round 4	Verdict
Performance	20.5/100	27.1/100*	Loading presentation and several resource/lifecycle checks improved; the strict loading and interaction requirements remain largely unmet or untested.
SEO readiness and effectiveness	30.5/100	35.0/100	The origin guard, heading repairs and contextual links close identified implementation gaps. Content/research verification and public search evidence remain outstanding.
Mobile usability	24.3/100	38.5/100	The menu, focus visibility, contrast and ARIA repairs materially improve usability. Full journeys, target classification, reflow and physical-device checks remain incomplete.

These remain acceptance-evidence scores, not Lighthouse scores or percentages of overall website quality. Their locally available components are respectively 27.1/80, 35.0/60 and 38.5/92.

*Performance bookkeeping limitation: 27.1 is the updated running ledger, retaining the last identifiable aggregate counts for P2 and P4. An exact replacement calculation for those two rows requires their original route-level pass identities. Under the corresponding-case interpretation of your new measurements, the fully reconciled Performance total lies between 26.7 and 27.9/100.

That ambiguity comes from my earlier ledger retaining aggregate counts without all case identities—not from a new requirement imposed on this round.

Performance: rows that gain points
Test	Frozen checks passed	Previous → new points	Evidence supporting the change
P6 — fonts/CSS	2/5 → 4/5	2.00 → 4.00 / 5	Two preloads now meet the preload limit. The reported 116 KB total meets the 160 KiB later-font budget. CSS and blocked-font usability retain their existing credit.
P7 — images/transfer	1/4 → 2/4	1.25 → 2.50 / 5	The identified below-fold phone capture no longer receives high-priority loading, and its requested size is reduced. The existing 10-second transfer pass is retained.
P8 — motion lifecycle	0/6 → 2/6	0 → 2.33 / 7	Accept the reported offscreen and hidden-tab particle-shutdown tests. These close the two shutdown checks, not the entire motion-performance test.
P11 — resilience/obstruction	2/6 → 3/6	2.00 → 3.00 / 6	The fullscreen obstruction and delayed entrance are removed. JS-off essential content and blocked-font usability retain their existing credit.

Verified additional credit: 6.58 points.

The following distinctions keep the remaining rows unchanged:

P1 stays at 0/12. The fast-minute homepage median of 1.50 seconds is encouraging, but it does not supply the required route/profile p75 and maximum results. The reported slow-minute Profile-A results still exceed the agreed threshold. I will not substitute Lighthouse scores or a selected fast-session median for that test.

P3 stays at 26/33, or 6.30/8. “CLS 0.000 throughout” supports the reported current measurements. It does not establish that the previously failing B-profile case or the missing menu/grader/navigation shift cases have been rerun.

P6 does not yet earn its fifth point. Total fonts of 116 KB, including on-demand italic, do not identify exactly how many bytes arrive in the initial font window. That window might now pass; its breakdown is not supplied.

P7 does not yet become a complete pass. The Lighthouse transfer reductions and lower RSC traffic are useful results, but they do not complete the frozen initial-useful-viewport and full-scroll checks across the required templates.

P8 does not yet earn the aggregate A-frame-budget check. Homepage p95 reaches the stated 33.3 ms threshold, and pricing improves. The earlier /work failure has no replacement result, B remains untested this round, and the remaining 138 ms homepage frame cannot be declared unrelated to motion without attribution.

P5 remains 4.50/6; P9 0/5; P10 2/4; P12 0/8; P13 0/12. The supplied evidence does not complete their remaining checks.

P2 and P4: why the exact replacement count is unresolved

The original report gives 5/18 passing interaction cases and 14/38 passing Lighthouse TBT cases, without the full route-keyed classification needed here. 
Pasted text

Test	Running ledger retained	What the new evidence establishes
P2	5/48 → 1.46/14	Of the eight newly reported early/settled cases, only settled FAQ and settled blog meet the A threshold. Matching these to the original settled-case classifications is necessary to replace—not duplicate—the old credit.
P4	8 × (14/38 + 0 + 0) / 3 → 0.98/8	Three of the four reported Lighthouse medians meet 100 ms; research does not. The 38-page category scores do not disclose the other pages’ TBT pass/fail values. A maximum-task requirements still fail; no replacement B pass is supplied.

Assuming the eight interaction measurements replace those corresponding old cases, P2 resolves to 4–7 passing cases out of 48. Replacing the four corresponding Lighthouse cases leaves 13–17 passing cases out of 38 for that P4 component. Those bounds produce the 26.7–27.9 Performance range above.

Do not interpret the paired pre-fix values from this session as the missing original classifications: the environment changed between sessions.

SEO: rows that gain points
Test	Frozen checks passed	Previous → new points	Reason
S3 — canonical/origin integrity	3/5 → 4/5	3.00 → 4.00 / 5	The production-origin guard now rejects an invalid/unset configuration, with a demonstrated failing build and tests. The approved production origin itself remains unresolved.
S8 — metadata/semantics	3/5 → 4/5	3.00 → 4.00 / 5	The identified heading-order defects are corrected. Full metadata-to-content accuracy is still unreviewed.
S9 — internal linking	2/4 → 4/4	2.50 → 5.00 / 5	The previously identified incoming-link gaps are addressed, and the ambiguous Surat anchor is replaced. Existing crawlability and depth credit remains.

SEO total: 35.0/100.

The other rows remain:

S1 6; S2 4; S4 2; S5 4; S6 2; S7 2; S10 0; S11 2; S12 0; S13–S20 0.

Two changes are worthwhile but do not earn invented points:

Favicon repair closes the diagnosed console/Best Practices issue. It was not an independent weighted SEO criterion.
Manifest sourcing and longer legal descriptions improve consistency, but do not substitute for S10’s complete content/offer review or S8’s accuracy review. Description length alone was never a pass criterion.

The 38/38 Lighthouse category-100 sweep applies to the tested snapshot before the final two commits. It is not evidence of a complete sweep of the final head.

Mobile: rows that gain points
Test	Frozen checks passed	Previous → new points	Reason
M4 — keyboard/focus	3/7 → 6/7	5.14 → 10.29 / 12	Skip link, modal focus containment and focus restoration now pass the reported tests. The complete keyboard journey remains outstanding.
M5 — obstruction	0/4 → 2/4	0 → 5.00 / 10	The reported focused-control coverage test passes, and the preloader no longer obstructs content. Complete primary/footer usability and keyboard-open/safe-area checks remain outstanding.
M7 — accessibility semantics/contrast	1/5 → 3/5	2.00 → 6.00 / 10	The identified meaningful-text contrast and prohibited-ARIA defects are corrected. Image-alternative credit remains; complete names/labels and table/caption checks remain unverified.

Mobile total, summed before rounding: 38.5/100.

The remaining rows retain their scores:

M1 2.40; M2 0; M3 0; M6 10; M8 0; M9 4.80; M10 0.

In particular:

M2 remains incomplete. The 24 px breadcrumb repair is useful, but does not establish the frozen primary-control 44 px check or resolve every other target’s size/spacing exception. WCAG’s minimum-target rule includes specific exceptions; neither “all small links fail” nor “breadcrumbs fixed, therefore targets pass” is valid. 
W3C

M3 remains incomplete. Guide text is now 16 px, but the report does not establish the requirement across other body/input text. “Nothing below 12 px” also does not meet our frozen 14 px secondary-label house standard. Enlargement and text-spacing tests remain absent.

Lighthouse accessibility 100 does not complete these manual checks. Manual audits do not contribute to that automated score. 
Chrome for Developers

2. TBT interpretation — Agree with the accounting mechanism; disagree that it establishes “no responsiveness regression”

Your explanation is plausible and partially supported:

Earlier FCP can bring work into the post-FCP measurement window, increasing TBT even when a fixed navigation-relative workload changes little.

TBT sums the blocking portions of long tasks after FCP within the tool’s measurement window. It does not measure all CPU work before and after paint. Lighthouse and a custom CDP script must also use explicitly identified endpoints before their totals can be compared. 
web.dev

However, the statement “the main thread does the same total work in shorter pieces” is stronger than your evidence supports.

What the measurements support

The fixed-window homepage aggregate changes from 4.34 to 4.11 seconds, approximately 5.3% lower, with overlapping run ranges. That supports “similar measured long-task burden in this sample,” not statistical equivalence or unchanged total CPU work.

Some maximum tasks shorten, but not all: pricing’s reported maximum is essentially unchanged, while contact’s increases. Hydration remains a substantial individual task.

Also, clarify what “all long-task time over 50 ms” means:

blocking contribution of a task
=
max
⁡
(
0
,
duration
−
50
 ms
)
blocking contribution of a task=max(0,duration−50 ms)

Summing entire durations of tasks exceeding 50 ms is a different statistic. Neither sum represents every unit of main-thread work. Preserve both useful measurements, but name them accurately. 
Chrome for Developers

Is it a regression?

For the reported post-FCP TBT metric: yes, in the pairs where it rises. I do not waive that result because the explanation is understandable.

For the complete user experience: mixed. Content becomes visible sooner and scrolling improves, but interaction responsiveness is not consistently better.

Your settled-tap results illustrate this directly:

Route	Before → after	Frozen A-threshold result
Home	472 → 520 ms	Still fails, including the 300 ms maximum-interaction limit.
Pricing	104 → 168 ms	Crosses from passing to failing the 150 ms target in this paired sample.
FAQ	144 → 144 ms	Passes unchanged.
Blog	208 → 136 ms	Improves to passing.

All four reported early taps still exceed 300 ms. FAQ and blog early taps get slower in the supplied pair, although the noisy environment prevents a confident claim about a persistent production regression.

The defensible summary is:

Visible loading and scrolling improved. Moving work after an earlier paint plausibly explains part of the higher post-FCP TBT, but the fixed-window measurements do not prove unchanged total CPU work, and the tap tests do not demonstrate a consistent responsiveness improvement.

Do not restore the blocking sheet or delay paint to improve TBT numerically. Keep the visible-loading gain and fix the blocking that remains.

3. Next highest-value work — Two items
3.1 Isolate and repair interaction blocking

The next experiment should target the 872 ms early homepage tap and 520 ms settled homepage tap, not another attempt to raise the overall Lighthouse score.

Run the final build against a variant with decorative motion and particles disabled but identical substantive HTML, fonts and content-visibility rules. Use trusted taps on separate runs, both at a fixed navigation-relative time and relative to the moment useful content becomes visible.

For each slow tap, record input delay, event processing and presentation delay. These identify whether the user is waiting for existing work, an expensive handler, or the next rendered frame. 
web.dev

Then act on the result:

If removing decoration materially reduces delay, break the relevant scene-building work into genuinely smaller tasks, limit it to necessary sections, and remove forced-layout cycles.
If delay remains, inspect the expensive work inside the hydration-associated task and the menu’s own update/render path. Thirteen small client components do not, by themselves, explain or eliminate an expensive task.

For application-controlled initialization, yield between sufficiently small work units; merely scheduling a 300 ms task “later” does not make it interruptible. Use scheduler.yield() where supported, with an appropriate task-based fallback. It can help split work you control; it does not automatically split React’s internal hydration task. 
web.dev

Keep the rejected broad Suspense change rejected. Losing the JS-off body is not an acceptable trade for this site’s current acceptance requirements.

3.2 Run one final-head, production-equivalent acceptance sweep

Use an actual production-equivalent build on an idle, powered machine and test the exact final commit. Preserve route/state/profile case IDs so P2 and P4 can be reconciled rather than estimated.

Prioritize enquiry/grader journeys and the consequences of content-visibility: keyboard navigation into deferred sections, direct fragment navigation, browser find, back/forward restoration, and the required responsive/reflow states.

This is not an argument against content-visibility: auto. It deliberately defers rendering of offscreen subtrees; scripts that force layout on those subtrees can undermine the saving. Your deferred scene-building approach is therefore sensible, but it still needs end-to-end verification beyond a successful full scroll. 
web.dev

The new evidence shows a better implementation. This sweep determines whether it is also a reliable final build.

4. Points still open

Exact Performance reconciliation: original and current route-keyed P2/P4 results. The running score is 27.1, with a supported reconciliation range of 26.7–27.9; SEO 35.0 and Mobile 38.5 are directly updateable from the supplied changes.

Remaining performance checks: initial-window JS/font/total bytes; required B-profile and interaction journeys; complete scroll coverage; remaining motion/frame attribution; cleanup, heap, cache replacement and actual bfcache restoration; blocked-motion/WebGL/storage failures.

Remaining mobile checks: complete target classification, typography coverage, fallback fit, landscape/reflow/text spacing, keyboard and form journeys, labels/table semantics, persistent-animation behavior, keyboard-open/safe-area states and physical-device testing.

Remaining SEO/content checks: approved canonical origin, preview protection, migration mappings, language equivalence, full metadata/offer review, applicable structured-data validation, and research reproduction/publication rights.

Final-release evidence: actual production-equivalent build and final-commit sweep, rather than only the earlier 38-page snapshot; public deployment, production delivery, real-user measurements, indexing and search outcomes.
