# SiteBlitz — Round 2 Response to Claude Code

Overall verdict: Accepted. Your Round 2 decisions respect the owner's established design direction, preserve completed work, and avoid unnecessary engineering changes. I would proceed with your proposed homepage sequence.

## 1. Decisions on your four rejections

| Item                                       | Verdict      | Reason                                                                                                                                             |
| ------------------------------------------ | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Keep H1: "WEBSITES / THAT WIN / BUSINESS." | &#x20;Accept | It is an aspirational brand statement, not a numerical performance guarantee. Preserve Hero v4.                                                    |
| Keep primary CTA: "Start a project"        | &#x20;Accept | No conversion evidence supports replacing it. Add an accessible pricing link in the sub-line; measure CTA performance after launch.                |
| Keep Scene B as the concept-study gallery  | &#x20;Accept | Correct distinction: Process demonstrates how SiteBlitz works; the concept gallery demonstrates what it can design. Both serve different purposes. |
| Defer `/website-designer-mumbai`           | &#x20;Accept | Do not publish a location-targeted page until local business facts and sufficiently useful original content are verified.                          |

No additional homepage redesign is required beyond the agreed changes.

## 2. Exact homepage copy

### A. Answers strip — four cells

# ₹7,999 / $99

Launch plan starting price

# As little as 48 hours

Launch plan delivery

# Yours after full payment

Code, content & domain

# Live speed data

Our website's performance at /proof

These are the exact value/label pairs. Render them as HTML text, not animation-generated text or images. Link the first to `/pricing` and the fourth to `/proof`. If the 48-hour delivery promise has exclusions in the plan, make them accessible from that cell.

### B. Evidence section

## Proof you can inspect.

See how our own website performs, explore our published prices, and try our free 20-check website grader. These are practical ways to evaluate our work and approach—not claims about client results.

**Links:** View live performance · Check your website · Explore pricing

Keep `/proof` visually prominent, but describe the metrics as SiteBlitz's own measurements. Do not use illustrative concept studies as client performance evidence.

## 3. `/website-in-48-hours` — exact SEO structure

Verdict: Approve as a focused commercial page, provided all scope and timing statements come from existing published terms.

**URL:** `/website-in-48-hours`

**Meta title (54 characters):**

Business Websites in As Little As 48 Hours | SiteBlitz

**Meta description (147 characters):**

Launch plan websites from ₹7,999 / $99, delivered in as little as 48 hours. See what's included, what you provide, the process and ownership terms.

# A business website in as little as 48 hours

## 1. Is the 48-hour Launch plan right for you?

Explain the eligible project scope using only existing plan details.

## 2. What's included in the Launch plan?

List the actual deliverables, inclusions and published limitations from `site.ts`.

## 3. What do we need from you?

Use the existing FAQ's requirements for customer inputs. Do not invent new prerequisites.

## 4. How our four-step process works

Explain Brief → Blueprint → Build → Launch, using the published process and timeline.

## 5. What if your website needs more time?

Explain the existing Growth plan and other applicable options, without inventing delivery guarantees.

## 6. Pricing, payment and ownership

Show the published Launch price and applicable terms. State that code, content and domain become the client's after full payment.

## 7. Frequently asked questions

Reuse relevant, verified FAQs covering eligibility, timing, scope, revisions and ownership, where documented.

Implementation requirements: Use one H1, server-rendered text, internal links to `/pricing`, `/process` and `/contact`, a canonical URL, and appropriate existing `Service`/`Offer` structured-data conventions. Keep it distinct from the general business-websites service page to avoid duplicating nearly identical content.

## 4. Preloader decision

Remove the first-visit Preloader on all devices if measurements confirm it causes LCP above 2.5 seconds; immediate visibility of the hero is more valuable than a branded curtain, even if the H1 is rendered underneath.

Lab LCP should guide the change; field p75 Core Web Vitals remain the final performance acceptance criteria.

## 5. Verification of the two Google SEO claims

I also verified the two claims you could not check offline:

- FAQ rich results: Google discontinued the FAQ rich-result feature effective 7 May 2026, and removed its documentation in June 2026. Existing `FAQPage` JSON-LD does not need to be removed automatically, but it should not be prioritized as a Google rich-result opportunity.&#x20;

  [image](https://www.google.com/s2/favicons?domain=https://developers.google.com\&sz=32)

  Google for Developers

- `llms.txt`: Google explicitly clarified on 15 June 2026 that `llms.txt` neither improves nor harms visibility or rankings in Google Search, including its generative AI features. Maintain it for other systems where useful, not as a Google ranking tactic.&#x20;

  [image](https://www.google.com/s2/favicons?domain=https://developers.google.com\&sz=32)

  Google for Developers



## Points still open

1. Preloader: Actual throttled lab LCP results and evidence that the curtain is the cause, followed by retesting.
2. 48-hour scope: Confirm that every eligibility condition and customer prerequisite shown on the new page is supported by `site.ts`, the FAQ or published terms.
3. Search Console: Connect and establish the baseline before making keyword-demand or ranking claims.
4. Production identity: Confirm the permanent domain and Mumbai business details before publishing local SEO pages.
5. Release verification: Complete accessibility, reduced-motion, responsive, performance, schema, test and production-deployment checks.
6. Documentation: Correct the stale upstream statement in `CLAUDE.md`.

Round 2 conclusion: All four proposed rejections are accepted. The homepage direction is settled; proceed with implementation and validation rather than reopening creative decisions without new evidence.
