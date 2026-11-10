ChatGPT said:
SiteBlitz Redesign — Independent Design Review

10 November 2026 · Review of 9 reference websites · 7 agenda decisions

My decision is to build SiteBlitz around Horeca Social's motion language, but not its exact visual identity or page structure.

The objective is to create a website that feels like an award-winning digital experience while remaining effective at converting South Gujarat business owners into WhatsApp enquiries.

1. Main reference — AGREE: Horeca Social

Primary design reference

Recommended
Horeca Social — Live website

Awwwards Honorable Mention · 9 May 2026

adobe.com

Award entry: Awwwards design and motion showcase

Horeca is the strongest reference for this particular business, even though several competitors in the list won the higher Site of the Day award. Its bold scroll typography, sticky service cards, full-screen transitions and persistent contact actions create a useful starting point without relying on heavy WebGL. Its creators have also documented their performance and mobile implementation. 
Awwwards Honorable Mention
+1

It wins on five criteria:

Business relevance: It sells a service, not an art project or entertainment experience.

Motion quality: Scrolling changes the composition of the page, rather than merely fading cards upward.

Conversion: Contact actions are available during the experience.

Mobile adaptability: The supplied 390 px capture demonstrates that the core compositions can translate to phones.

Implementation: Its GSAP and CSS-sticky approach is a better fit for SiteBlitz's existing Next.js stack than a 3D-heavy rebuild.

Assessment of all nine candidates

Reference

	

Decision

	

Reason




Horeca Social

	

Main

	

Best balance of service selling, scroll storytelling and implementation cost




TRIONN

	

Reject as main

	

Exceptional agency presentation but costly WebGL treatment and a direct regional competitor




1820 Productions

	

Inspiration only

	

Strong cinematic pacing; depends on professional footage SiteBlitz lacks




Maxima Therapy

	

Reject

	

Friendly illustrated visual language, but artwork is central to the identity




Kononenko

	

Reject

	

Elegant editorial design, insufficient motion intensity for this brief




PX PUSH

	

Secondary

	

Excellent pricing and package-presentation inspiration; too heavy as the overall blueprint




Telha Clarke

	

Secondary

	

Useful inspiration for a persistent contact interaction and elegant restraint




Lama Lama

	

Reject as main

	

Sophisticated agency presentation; more portfolio-oriented than direct-response selling




Hubtown

	

Reject as main

	

Strong cinematic real-estate storytelling but far more elaborate than this business needs

Verdict: Horeca is the best of the nine for SiteBlitz's constraints. I have not identified a verified 2025–2026 award reference that clearly beats it on both motion intensity and practical conversion suitability.

However, the reference alone does not solve SiteBlitz's conversion problem. Horeca can lean on established customers, testimonials and partnerships. SiteBlitz cannot. Its redesign must put live demos, honest prices and a clear delivery promise where Horeca uses social proof.

2. What to take from Horeca — AGREE, with strict boundaries

The valuable part of Horeca is its visual storytelling system, not its colours or identity.

Reference element

	

SiteBlitz adaptation




Full-bleed photographic hero

	

One striking business-focused composition with a genuine SiteBlitz demo visible




Oversized condensed typography

	

Strong short headlines that communicate the offer immediately




Hero compresses during scrolling

	

Opening image shrinks into a framed panel as the next section emerges




Sticky stacked service cards

	

Three actual concept-demo screenshots, layering as the visitor scrolls




Huge scaling text transition

	

One dramatic typographic wipe connecting demos to pricing




Scroll-led section transitions

	

Alternating warm and dark surfaces with purposeful reveals




Repeated contact actions

	

One persistent WhatsApp CTA, supported by contextual CTAs




Four-step workflow

	

Turn the real SiteBlitz process into an easy-to-understand visual sequence

Additional findings beyond the supplied screenshot capture

The live Horeca page also has a four-step workflow and a project-request form; the screenshot summary emphasizes its visual effects more than these practical conversion elements. Its full site is considerably more than an animated portfolio. 
Social Media & Influencer Agentur
+1

Its developers' technical case study on Codrops reveals another important distinction: their card stack uses CSS sticky positioning rather than relying on many GSAP pins, and their mobile implementation explicitly disables Lenis. That architecture is worth adopting. 
Codrops

However, the case study also describes an elaborate depth-card feed that was eventually removed from the live project. We should not blindly implement every effect described in the article.

Never copy

Horeca's pink #DF0567, pale-pink surfaces, proprietary-style display typography or distinctive branded wording.

Its partner logos, real customer testimonials, influencer numbers or success metrics.

Its photographs, visual assets, exact compositions or animation timings as a one-to-one clone.

Its loading sequence or any effect that delays the first usable screen.

Its nearly 18,000 px desktop scrolling length.

Its complicated mobile scrolling workaround unless real device testing proves that SiteBlitz needs it.

Important: SiteBlitz's three fictional concepts must always be presented as concept demos, never as completed client projects.

3. SiteBlitz storyboard — AGREE, with a different conversion sequence

I would create a design direction called SiteBlitz / Make It Visible: large typography, business-focused imagery, powerful scroll transitions, and unusually transparent pricing.

The visual experience should have two major highlights:

The opening image transforming as the visitor first scrolls.

Three website demos stacking into a dramatic full-screen typography transition.

Everything else should support reading, comparison and contacting SiteBlitz.

Proposed first screen

SITEBLITZ.

MENU

WEB DESIGN FOR LOCAL BUSINESSES

YOUR BUSINESS. BETTER ONLINE.

Mobile-first websites for salons, coaching classes and showrooms. From ₹7,999.

Discuss on WhatsApp

Explore live demos ↓

mindtrip.ai
Illustrative layout direction, not a finished design or an actual SiteBlitz client photograph. The production hero should incorporate a real screenshot from one of the three concept demos.

The important commercial line belongs above the fold:

Launch: ₹7,999 · 1 page · 2 working days after ready-to-build.

That qualification matters. The Business package is three pages and seven working days, not a two-day offer.

Exact proposed scroll specification

These values are implementation targets, not measurements of the current SiteBlitz site.

Scene

	

Desktop motion specification

	

Mobile / reduced motion




01 — Hero

	

Image scale 1 → 0.88, border radius 0 → 28px; headline moves upward 8vh. Trigger top top, over 70vh of scroll. Scrub 0.3, ease none, no pin.

	

Mobile: static readable headline with a small image transition only. Reduced: entirely static.




02 — Business message

	

“SHOW YOUR SERVICES. MAKE IT EASY TO ENQUIRE.” Words reveal sequentially. Trigger section top 75% to top 30%. Scrub 0.3, ease none, no pin.

	

Mobile: natural paragraph layout, optional 250 ms fade. Reduced: static text.




03 — Three live demos

	

Salon → Coaching → Showroom. Three large position: sticky cards at top: 12vh; preceding card scales 1 → 0.94 as the next arrives. Each card occupies roughly 100vh of scroll. Scrub 0.3, ease none; no GSAP pin.

	

Mobile: normal vertical demo cards, no sticky stack. Reduced: all cards visible normally.




04 — Signature transition

	

“SEE IT. THEN DECIDE.” scales from 1 → 3, clipped inside its section, revealing a dark background. Trigger top top; sticky hold adds 55vh of scroll. Scrub 0.3, ease none.

	

Mobile: no hold or enlargement; one bold dark panel. Reduced: static panel.




05 — Pricing reveal

	

Launch, Business and Custom packages enter with y: 30px → 0, 400 ms, power2.out, 100 ms stagger when the section reaches 75% of the viewport. No pin.

	

Mobile: simple stacked packages. Reduced: fully visible.




06 — Four-step process

	

Large step numbers and connecting lines change active state as each step enters the viewport. 350 ms, power2.out, no pin.

	

Mobile: vertical numbered sequence. Reduced: static numbered sequence.




07 — FAQs

	

No scroll theatrics. Native disclosure interactions, maximum 180 ms transition, no pin.

	

Same layout. Reduced: instant open/close.




08 — WhatsApp close

	

Giant final headline rises by 24 px and fades in over 450 ms, power2.out, when 75% visible. No pin.

	

Simple final CTA; reduced-motion version static.

Section content, in order

Hero — What you sell

“YOUR BUSINESS. BETTER ONLINE.” Directly show the starting price, the kind of businesses served and the WhatsApp action.

The opportunity — Why a website matters

Explain that visitors should be able to understand services, see business details and contact the business easily. No inflated statistics.

Concept demos — Show, don't claim

The three real functioning demo links: /demo/salon, /demo/coaching, /demo/showroom, clearly labelled as fictional examples. Each must have its own working View live concept action.

Packages — Make the choice obvious

Launch ₹7,999 (₹4,000 + ₹3,999); Business ₹17,999 (₹9,000 + ₹8,999); Custom by quotation. Show the page counts, delivery terms, inclusions and exclusions.

How it works — Four truthful steps

Share your requirements → Confirm scope and concept eligibility → Provide agreed content, access and first payment → Build, review and launch. Explain that the delivery clock starts only when all ready-to-build conditions are met.

FAQs and assurances — Remove uncertainty

What is included? Are domain and hosting included? What starts the delivery clock? How does payment work? Can I review a homepage concept before paying? Explain qualification honestly.

Final close — Start the conversation

“TELL US ABOUT YOUR BUSINESS.” One clear WhatsApp CTA with a useful prefilled enquiry message.

For the homepage concept offer, display: “Qualified businesses may review a personalised homepage concept before making the first payment. Limited availability.” The current cap is three personalised concepts or nine hours per week, whichever is reached first. Do not suggest everyone is automatically eligible.

Technically, implement these interactions in the existing declarative data-anim architecture. Extend the central motion registry for demo-stack and type-wipe rather than inserting separate GSAP code inside individual React components. The normal HTML layout must remain usable if that motion layer never loads.

4. Brand system — AGREE with the condensed direction, DISAGREE with borrowing Horeca's colours

I would replace the existing light teal identity with warm ivory, near-black and saturated vermilion orange.

The goal is high contrast, energy and confident typography without making SiteBlitz look like a gaming, crypto or luxury-tech company.

Typography
BARLOW
CONDENSED
Display · Black 900
DM Sans

Clear, friendly and practical for every business owner.

Body · Regular 400 / Semibold 600

Barlow Condensed for the largest statements; DM Sans for prices, descriptions, menus and forms. Both are available with open font licences. 
filmfont.com
+1

Proposed typography tokens:

Display: clamp(4.5rem, 12vw, 11rem) desktop, clamp(3.25rem, 16vw, 6rem) mobile.

Display line-height: 0.88; letter spacing: -0.025em.

Body: 16–18 px, line-height 1.5.

Buttons: minimum 16 px, medium/semibold weight and 44 px preferred touch height.

Exact colour tokens

Token

	

Value

	

Purpose




volt

	

#C43D15

	

Primary orange, buttons, strong accents




void

	

#F8F5EE

	

Warm background




surface

	

#FFFFFF

	

Clean reading surfaces




raised

	

#EEE8DD

	

Secondary blocks




ink

	

#121A1D

	

Headlines, body text, dark panels




muted

	

#535B5B

	

Secondary text




faint

	

#606968

	

Accessible subdued text




warm

	

#FFE6CB

	

Decorative surfaces only




line

	

#D3C9BC

	

Dividers and borders

The proposed orange has approximately 5.22:1 contrast against white and 4.79:1 against the warm ivory ground. Avoid using it for normal-size text on the darker raised surface without an additional contrast check.

Keep the existing admin dark theme isolated; do not change its appearance merely because public-site tokens change.

Photography direction

Agree: Realistic photography is necessary to break the current repetitive, text-and-border-card design.

For ₹0 asset spend, use carefully selected images from Pexels or Unsplash, whose licences permit many commercial uses. Avoid any implication that a pictured business is an actual SiteBlitz customer or endorses SiteBlitz. 
Pexels
+1

My preferred content hierarchy is:

Genuine screenshots of SiteBlitz's own working concept demos.

One powerful editorial business photograph in the hero.

Limited contextual photography within the demos, with licensing checked.

No generic team photos, fake office photographs, founder imagery or made-up customer interactions.

The screenshots themselves should carry much of the visual interest. A buyer deciding whether to spend ₹7,999 needs to see the websites they could receive, not merely attractive stock images.

5. Motion budget — AGREE on heavy motion, DISAGREE with loading the entire experience upfront
Proposed performance budgets

These are engineering acceptance targets, not claims that the current repository already meets them.

Metric

	

Target




Mobile initial compressed transfer

	

≤500 KB




Initial JavaScript, including framework

	

≤180 KB compressed




Deferred animation JavaScript

	

≤55 KB compressed




Mobile hero image

	

≤130 KB




Desktop hero image

	

≤250 KB




WebGL contexts

	

0




Heavy sticky scenes

	

Maximum 2




Desktop extra pin/hold distance

	

Maximum 55–60vh for the signature scene




Mobile JS scroll pinning

	

0

LCP · p75

≤2.5s

INP · p75

≤200ms

CLS · p75

≤0.1

These are the recognised good Core Web Vitals thresholds, assessed at the 75th percentile of real page visits. 
web.dev

The 116 KB transfer measurement in the provided Horeca probe covers a particular nine-second capture. It should not be treated as Horeca's complete page weight or as proof that its entire experience is only 116 KB.

Lenis decision

Do not enable Lenis at initial launch. Native scrolling with GSAP ScrollTrigger is sufficient to create the planned experience.

If later testing demonstrates a genuine benefit, consider Lenis only as a desktop enhancement with a fine pointer, adequate performance and no reduced-motion preference. Do not add it to touch devices simply because Horeca uses it.

The Horeca developers specifically documented mobile problems with Lenis; their eventual decision was desktop-only usage. 
Codrops

Required implementation rules

Render the complete hero, price and first WhatsApp action on the server. Never wait for animation hydration before showing them.

Defer GSAP and ScrollTrigger work until needed; use the repository's existing Deferred and ExperienceLayer patterns.

Use CSS sticky for layering and transforms for movement. Avoid animating layout dimensions continuously.

Use one coordinated scroll trigger per major scene where possible.

Under prefers-reduced-motion, remove scroll holds, parallax, scaling, and spatial movement. Preserve all text, links and information in normal document flow.

Provide a static fallback if JavaScript fails. Never permanently hide content through an uninitialised opacity or transform.

Test on real or representative mid-range Android devices, 4G throttling, Chrome, Safari and social-media in-app browsers. Maintain keyboard access and visible focus states.

Important launch blocker

The project context says SiteBlitz is hosted on Vercel Hobby and intends to sell paid services.

Vercel's current terms restrict Hobby to personal or non-commercial use. SiteBlitz is commercial, so this must be resolved before paid-ad traffic is directed to the site. Choose an appropriately licensed hosting arrangement; do not assume a free plan permits commercial usage. 
Vercel
+1

This is a higher-priority release issue than any animation improvement.

6. Secondary references — PARTIAL AGREE

PX PUSH — Use the package presentation

Its transparent package descriptions and distinctive scroll reveal provide a good example of making service tiers feel important. 
Design subscription service

Use the staged entrance of pricing panels. Do not copy the WebGL floppy disk, 3D clouds or expensive visual environment. SiteBlitz's prices must remain readable even when motion fails.

Telha Clarke — Use the contact emphasis

The restrained interface and contact hierarchy are useful. I could confirm the site's contact pathways, but not independently verify the exact scroll-changing pill behaviour from its text-rendered page. 
Telha Clarke

Adapt the concept of a contextual persistent CTA without making navigation confusing.

Recommended persistent WhatsApp behaviour

Keep the main pill recognisably the same throughout the site: Chat on WhatsApp. A small supporting label and prefilled message can change by section.

Visitor's section

	

Supporting message




Hero

	

Discuss my website




Live demos

	

Ask about a demo




Pricing

	

Discuss the Launch or Business plan




Process

	

Ask about the next steps




Final section

	

Start my website enquiry

On mobile, a compact WhatsApp pill can be fixed near the bottom, respecting the device's safe area and never covering prices, FAQ controls or other important content.

Pre-filled messages should use the existing verified WhatsApp contact configuration. No invented number, forced registration, covert tracking or unnecessary lead form.

Better secondary idea: Borrow the short statement-and-divider rhythm from 1820 Productions to create calm between the two main motion sequences. That would be more valuable than adding a third complex animation.

7. Heavy motion vs conversion — DISAGREE with the blanket “tech sites only” rule

The type of business does not, by itself, determine whether scroll-driven motion is appropriate.

A web design studio can use highly expressive motion to demonstrate creative ability. The relevant question is whether the experience makes the buyer more confident and makes the next step easier.

For SiteBlitz, I would enforce this rule:

Motion should demonstrate a capability, clarify an offer or make a meaningful transition. If it does none of those, remove it.

Where the line should be drawn

Keep

	

Remove




Hero transformation that introduces the service

	

Long introductory loader




Three demo cards that reveal actual website examples

	

Decorative 3D objects unrelated to websites




One striking text-to-colour transition

	

Repeated full-screen word zooms




Carefully staged package presentation

	

Pricing hidden behind multiple scroll stages




Fixed, accessible WhatsApp action

	

Cursor-following buttons or scroll traps




Strong photographic composition

	

Fake reviews, awards, results or counters

The real danger is not that SiteBlitz looks too cinematic. It is that the design looks expensive and complicated while selling an inexpensive, practical website.

That mismatch can be prevented by keeping scope, starting price, demo proof and contact options easy to understand.

Conversion acceptance criteria

Before calling the redesign successful, I would require:

Visitors can understand the service, see a starting price and reach WhatsApp without scrolling or waiting for JavaScript.

All three fictional concept demos are accessible through working links and clearly disclosed as concepts.

Every package accurately reflects src/lib/offer.ts; the starting date of delivery is explicitly qualified.

On a mid-range phone, no scroll scene blocks access to the next section or creates unreadable overlapping content.

Reduced-motion, keyboard navigation, focus indicators and mobile layouts meet WCAG 2.2 AA requirements.

The verified /proof page reports actual measurements, not estimated performance.

Analytics distinguish homepage visits, demo views, pricing engagement, WhatsApp clicks, qualified conversations and paying customers without fingerprinting.

With only ₹1,000 in planned advertising, the initial campaign will not provide enough evidence for a confident statistical A/B-test winner. Track the actual enquiry-to-customer journey, identify obvious friction, and improve it before scaling.

Implementation should remain on v2-redesign, preserve the admin's appearance, run the repository's existing tests, and use mobile/desktop screenshots plus performance checks as release gates.

Final decision

Design direction recommended for approval

SITEBLITZ / MAKE IT VISIBLE

Horeca-inspired motion architecture · Original vermilion and ivory identity · Barlow Condensed typography · Real concept demos · Transparent pricing · WhatsApp-first conversion

The three reference links worth reviewing together:

Main: Horeca Social

Pricing: PX PUSH

Interaction restraint: Telha Clarke

Points still open

Owner approval: Confirm Horeca Social as the main motion reference and approve the proposed original visual direction.

Commercial approval: Confirm the Launch ₹7,999 and Business ₹17,999 prices, which the project notes say still require final founder approval.

Visual assets: Select and licence the final editorial hero image and capture production-ready screenshots of the three concept demos.

Operational: Verify the WhatsApp destination and the exact qualifying criteria for free homepage concepts.

Hosting: Resolve the Vercel Hobby commercial-use conflict before launch.

Verification: Produce actual 390 px mobile and 1440 px desktop scroll captures, reduced-motion screenshots and real-device performance results. I reviewed the available site content and supplied capture evidence, but did not independently perform a full interactive browser capture of all nine sites; the Kononenko live page was not retrievable here.

Final verdict to Claude Code: Agree with Horeca as the primary reference. Use its visual grammar, not its identity or social proof. Build one original, powerful motion-led experience in which the three concept demos are the central showcase and the commercial offer remains immediately understandable.
