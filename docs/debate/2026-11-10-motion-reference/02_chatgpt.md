ChatGPT said:
SiteBlitz — Round 2 Independent Verdict

Decision: Accept Claude Code's direction with two modifications. Mobile motion should be much closer to Horeca than my first proposal, and pricing should use PX PUSH-style active-package choreography instead of generic fade-ups.

The final architecture will have two primary sticky spectacles, additional lightweight scroll choreography, and a fully readable, server-rendered conversion flow.

A. Mobile motion — AGREE

Claude is right. Removing the stack and typography wipe from mobile would undermine the owner's central requirement. Horeca's own implementation demonstrates that CSS sticky can support these experiences without using GSAP pins. Its technical case study also confirms why CSS sticky was preferred on mobile. 
Codrops

I accept the proposed 72px sticky offset, 0.92 previous-card scale and 2.2 typography-wipe scale.

Final mobile values

Property

	

390 px specification




Demo card width

	

calc(100% - 32px) = 358 px




Sticky offset

	

top: 72px




Card height

	

min(560px, calc(100svh - 160px))




Card spacing in scroll flow

	

Each wrapper approximately 90svh




Previous-card scale

	

1 → 0.92




Rotation

	

0deg — no unnecessary tilting




Trigger

	

Next card reaches 65% viewport height




End

	

Next card reaches the 72 px sticky line




Scrub

	

0.3, ease: none




GSAP pin

	

false




Stack mechanism

	

CSS position: sticky




Type wipe scale

	

1 → 2.2




Type wipe hold

	

40svh additional scroll




Type wipe wrapper

	

140svh with a 100svh sticky child




Reduced motion

	

No stacking or scaling; normal vertical layout

Implement one coordinated ScrollTrigger for the demo-stack progression rather than separate pinning timelines. Keep cards in natural document order, with semantic links outside clipped media areas.

The card height cap leaves room for the persistent WhatsApp pill. On short-height devices, including 320 px layouts, reduce the card's imagery before reducing the readability of its title, description or live-demo link.

Acceptance constraint: If the device is in landscape orientation or its viewport height is below 540 px, switch to the normal card flow. That is a usability fallback, not a general ban on mobile motion.

This gives phones genuinely scroll-responsive design without forcing Lenis or GSAP pinning onto touch devices.

B. Pricing choreography — DISAGREE with automatic accordion collapse; AGREE with the PX PUSH-inspired package rail

The generic fade-up must go.

I would not automatically compress non-active packages into single-line rows that hide their inclusions. The customer is comparing ₹7,999 against ₹17,999. Making them scroll repeatedly to inspect the differences adds unnecessary friction.

PX PUSH's valuable principle is making package selection the visual focus, not copying its 3D object or hiding decision-critical information. Its current site makes package pricing and included features explicit. 
Design subscription service

Final desktop mechanism: sticky pricing rail

SCHEMATIC · DESKTOP LAYOUT

LAUNCH

₹7,999

BUSINESS

₹17,999

Active package

CUSTOM

By quote

MATCHING DETAILS PANEL

Business · 3 pages

7 working days after ready-to-build.

 Mobile-first design

 Enquiry options

 Basic technical SEO

Discuss Business on WhatsApp

Active-plan example only. The production UI contains full details for all three packages in document order.

Exact behaviour:

Property

	

Value




Layout

	

Sticky left rail 38%, scrolling details 62%




Sticky offset

	

top: 104px




Package-row slot height

	

112 px, fixed




Active row visual scale

	

1 → 1.035 horizontally




Active border

	

4 px orange indicator




Active background

	

Ink #121A1D




Activation trigger

	

Corresponding detail panel crosses 55% of the viewport




Animation

	

280 ms, power2.out




Scroll scrub

	

None; discrete active-state change




Right-hand detail panels

	

Minimum 65svh each




Additional pin distance

	

0




Default without JS

	

All package prices and inclusions visible

The visually enlarged row stays inside a fixed-size slot, so activating it does not push surrounding packages down. The detailed content sits in the adjacent scrolling panel.

On 390 px mobile, use three full-width vertically scrolling pricing cards. The active card changes its border and background over 280 ms when its midpoint enters the central 40% of the viewport. Keep all prices, payment splits, delivery terms and inclusions visible; no automatic collapse and no fade-up.

For reduced motion, all packages remain visible without active-row scaling; interactive focus states remain.

Reason: Pricing should look designed, but comparison must remain effortless.

C. Giant price and scattered letters — AGREE

Both moments should be added. Neither requires an additional pin, so they do not break the two-major-sticky-scenes rule.

C1. The giant ₹7,999 price

THE LAUNCH PACKAGE

₹7,999

1-page website · 2 working days after ready-to-build

Use the actual starting price rather than inventing a client count or animated performance statistic.

Property

	

Desktop

	

Mobile




Price font size

	

clamp(120px, 22vw, 320px)

	

20vw




Initial transform

	

translateY(40%)

	

translateY(24%)




Final transform

	

translateY(0)

	

translateY(0)




Trigger

	

Section top reaches 82% viewport

	

Same




End

	

Section top reaches 35% viewport

	

40% viewport




Scrub

	

0.3, ease: none

	

0.3, ease: none




Pin / hold

	

0

	

0




Reduced motion

	

Static price and description

	

Static price and description

Do not animate the digits counting up from zero. ₹7,999 is a package price, not a business achievement.

Make sure the rupee sign has a working font fallback and the complete number fits without horizontal clipping at 320 px.

C2. The scattered-letter promise

The single use of Horeca's scattered-letter language should be:

SEE IT BEFORE YOU PAY

Qualified businesses can review a personalised homepage concept before the first payment, subject to weekly availability.

Concept preview only, not a completed website.

The qualifier must appear alongside the headline from the first rendered frame, not arrive later in the animation.

Exact effect: characters begin offset ±50px vertically and ±24px horizontally, with rotation between −7deg and +7deg; they assemble to x:0, y:0, rotation:0, opacity:1. Desktop trigger top 80% to top 32%, scrub 0.35, no pin. On mobile, offsets halve to ±24px and ±12px, rotations to ±4deg, scrub 0.3.

For reduced motion, render the complete phrase in its final position. Keep a single accessible text string and mark animated visual duplicates as decorative.

This is the third distinctive visual effect, but not a third heavy sticky scene. I approve it.

D. Font — AGREE: Antonio wins
Antonio 600

Tall, narrow, assertive without looking excessively heavy.

View Antonio
DM Sans 400/600

Readable body copy, supporting text, navigation and package descriptions.

View DM Sans

Final selection: Antonio 600, not Barlow Condensed 900.

Antonio is closer to Horeca's tall, condensed visual rhythm while remaining distinctive enough to build an original identity. Google Fonts lists Antonio as an OFL-licensed variable display family supporting weights 100–700. 
GitHub
+1

Exact tokens:

Token

	

Value




Display family

	

Antonio, sans-serif




Display weight

	

600




Desktop headline tracking

	

-0.025em




Mobile headline tracking

	

-0.015em




Display line-height

	

0.92




Main desktop display size

	

clamp(96px, 12vw, 180px)




Main phone display size

	

clamp(58px, 15vw, 86px)




Body family

	

DM Sans, sans-serif




Body weights

	

400, 600




Body line-height

	

1.5

Use a verified DM Sans fallback for ₹ where Antonio's loaded subset lacks the currency glyph. Test mixed-font baselines in the price scene instead of assuming the glyph is available.

E. Lenis — AGREE with desktop-only, lerp: 0.1

Change the existing every-device Lenis initialization in Motion.tsx.

Exact configuration:

TypeScript
const desktopMotion =
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (desktopMotion) {
  const lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
    syncTouch: false,
    wheelMultiplier: 1,
    autoRaf: false,
  });

  lenis.on("scroll", ScrollTrigger.update);

  const tick = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);

  // Register cleanup on unmount:
  // gsap.ticker.remove(tick);
  // lenis.destroy();
}

This follows the established Lenis/GSAP synchronization model. 
GitHub
+1

Use native touch scrolling, no duplicated animation-frame loops, and clean up on unmount or motion-preference changes. Preserve anchor navigation and test keyboard/Page Down behaviour.

Acceptance condition: If Lenis worsens desktop responsiveness, sticky alignment or keyboard navigation, disable it. A smooth sensation is desirable; reliable navigation is mandatory.

F. Hero composition — AGREE with real photography first

The current demo screenshots are not suitable for the new hero until the placeholder imagery is replaced. That is a prerequisite, not a post-launch improvement.

Final photo selection: an independent shop/showroom counter

I choose a warm, cinematic photograph of an independent retail showroom, rather than a salon chair or coaching classroom.

Why? A showroom counter and visible product shelving communicate a real small business without making SiteBlitz appear specialised in only salons or education.

homegoods.co.in
Visual direction only. The final asset must be licensed, and the photograph must not be presented as an actual SiteBlitz client or as a verified location in Gujarat.
Exact desktop composition

Element

	

Specification




Hero dimensions

	

Full viewport width, min-height: 100svh




Photograph

	

Real licensed shop interior, empty of people, natural morning light




Image focal point

	

Shop counter and products in centre-right




Image positioning

	

object-position: 56% center initially




Dark overlay

	

Left-to-right gradient, strongest behind the headline




Headline

	

Large Antonio 600, lower-left, maximum 60% of viewport width




Headline left margin

	

clamp(24px, 6vw, 96px)




Phone mockup

	

Right side, width clamp(260px, 26vw, 360px)




Phone position

	

right: 8vw; bottom: 10vh




Phone content

	

Genuine /demo/showroom screenshot with “CONCEPT DEMO” disclosure




WhatsApp CTA

	

Visible in the hero immediately; persistent pill independent of photo frame

The photo occupies the entire opening canvas. The phone displays an actual SiteBlitz concept website, making the connection between the physical business and its digital presence unmistakable.

Scroll transformation:

Desktop: photographic frame scales 1 → 0.88, border radius 0 → 28px; image and phone composite shrink together.

Headline moves translateY(0) → translateY(-8vh) separately so it remains legible rather than shrinking with the photograph.

Trigger: first scroll, top top to +=75vh, scrub 0.3, ease:none; no GSAP pin.

Warm-ivory ground appears around the retreating frame, setting up the enormous ₹7,999 price scene.

Exact 390 px composition
Mobile photographic crop reference. Production headline, live concept screen and controls sit in separate accessible overlay layers.

On mobile, place the headline in the upper-left portion of the photograph, with the concept-demo phone at right:16px; bottom:96px; width:150px. Use the phone image as a decorative preview while keeping a separate, accessible demo link.

Mobile frame scales 1 → 0.93, border radius 0 → 20px, and headline moves upward by 24 px across the first 55svh of scrolling. This makes the experience react immediately to the first swipe.

Reduced motion shows the same fully composed static hero. No loading animation, skeleton replacement or delayed headline.

G. Final headline — THREE OPTIONS

All three stay within the 32-character limit.

OPTION 1 · 22 CHARACTERS

Ship this
WEBSITES. FROM ₹7,999.

Immediate service identification and real starting price. Works across every target business category.

OPTION 2 · 28 CHARACTERS

SALONS TO SHOWROOMS. ONLINE.

More expressive and sector-specific, but needs stronger supporting copy to clarify that the service is website development.

OPTION 3 · 29 CHARACTERS

LOCAL BUSINESS. BETTER SITES.

Friendly and relevant, but “better” is subjective and the headline provides less commercial clarity.

Ship option 1. The visual drama should come from the typography and composition, while the headline remains commercially direct.

Exact hero copy:

WEBSITES. FROM ₹7,999.

Mobile-first websites for salons, coaching classes and showrooms.

Launch: 1 page · 2 working days after ready-to-build.

Chat on WhatsApp · View live concepts

The enormous price reveal after the hero reinforces the starting price while introducing the package details; it should not feel like an unrelated second advertisement.

FINAL Extraction Sheet — Ready for Claude Code

Specification v1.0 · Desktop baseline 1440 × 900 · Mobile baseline 390 px · All scenes progressively enhanced over readable server-rendered content.

Global motion rules: ease:none for scrubbed scroll progress, power2.out for discrete entrances or state changes, native scrolling on touch, Lenis lerp:0.1 on eligible desktops. Only the demo stack and typographic wipe receive extended sticky treatment. CSS sticky is preferred to GSAP pinning.

Scene-by-scene implementation

# / Section

	

Reference extraction → SiteBlitz adaptation

	

Desktop motion and trigger

	

390 px mobile

	

Reduced motion




01. Hero

	

Horeca: photographic hero shrinks on scroll → Showroom photograph + concept-demo phone + starting offer

	

top top to +=75vh; image/phone scale 1→0.88, radius 0→28px, headline y:0→-8vh; scrub 0.3; no pin

	

Scale 1→0.93, radius 20px, headline y:-24px; first 55svh; no pin

	

Static full-bleed composition




02. Giant price

	

Horeca: giant influencer count → Actual ₹7,999 starting price and Launch scope

	

Section top 82%→35%; price y:40%→0, size 22vw, maximum 320 px; scrub 0.3; hold 0

	

20vw, y:24%→0, end at 40%; hold 0

	

Static number, terms visible




03. Statement bridge

	

1820: hairline + concise statement → “YOUR WEBSITE SHOULD MAKE ENQUIRIES EASY.”

	

Trigger top 75%; hairline scaleX:0→1, 450 ms power2.out; hold 0

	

Hairline 280 ms; no horizontal text overflow

	

Full static line and copy




04. Demo stack

	

Horeca: stacked sticky services → Real Salon, Coaching and Showroom concept demos

	

top:96px sticky cards; three 90svh wrappers; previous card scale:1→0.94 between next card entering 65% and reaching sticky offset; scrub 0.3; CSS sticky, no JS pin

	

top:72px, width 358px, height capped at 560 px; previous card 1→0.92; same triggers; native touch scroll

	

All three demo cards in normal vertical flow




05. Signature type wipe

	

Horeca: giant word becomes colour field → “SEE IT. THEN DECIDE.” transforms into vermilion transition

	

Sticky wrapper 155svh, child 100svh; text scale 1→3, scroll top top to bottom bottom; scrub 0.3; 55svh hold

	

Wrapper 140svh, text 1→2.2; 40svh hold; CSS sticky

	

Static orange separator and readable phrase




06. Packages

	

PX PUSH: package reveal → Three transparent packages with sticky active-plan rail

	

Left rail sticky top:104px, rows 112 px; active row scaleX:1.035/colour switch 280 ms; corresponding details cross 55% viewport; no extra scroll hold

	

All three prices and inclusions visible in stacked cards; active-card border/background transition 280 ms; no pin

	

All packages static and fully readable




07. Four-step process

	

1820 statement-line rhythm + Horeca workflow clarity → Actual SiteBlitz steps

	

Active step changes when it enters 70% viewport; line scaleX:0→1, 350 ms power2.out; no pin

	

Vertical steps; active connecting line 250 ms; no pin

	

Static numbered steps




08. Concept promise

	

Horeca: scattered letters assemble → “SEE IT BEFORE YOU PAY” with visible qualified-buyer terms

	

Start top 80%, end top 32%; characters translate up to ±50px vertically/±24px horizontally, rotate ±7deg to zero; scrub 0.35; no pin

	

Offsets ±24px/±12px, rotation ±4deg; scrub 0.3; no pin

	

Fully assembled text and qualifier




09. FAQs

	

Original SiteBlitz conversion requirement, not an award-site imitation → Honest terms, payments and exclusions

	

Native <details>; user-triggered, no scroll animation; hold 0

	

Same structure, no additional effects

	

Instant native disclosure




10. WhatsApp close

	

Horeca: dramatic contact close + Telha Clarke contact restraint → Final “LET'S BUILD YOUR WEBSITE.”

	

Ground changes ivory→ink over 350 ms when section reaches 60%; main CTA static; hold 0

	

Static heading and large WhatsApp CTA; no pin

	

Static heading and CTA

Persistent elements and implementation invariants

The following apply to every scene, not only the section where they first appear.

Component

	

Final behaviour




WhatsApp pill

	

Identical visible label: Chat on WhatsApp. Prefilled enquiry message changes contextually by section; destination remains the verified SiteBlitz contact.




Accessibility

	

WCAG 2.2 AA. Readable semantic HTML underneath all effects. No information solely available through motion.




Content integrity

	

Three examples remain explicitly labelled fictional concept demos; no invented testimonials, results, customers or business photographs.




Motion architecture

	

Extend the existing data-anim registry in Motion.tsx; preserve Deferred/ExperienceLayer and the server-component-first approach.




Scroll engines

	

Desktop eligible pointer: Lenis 0.1. Touch: native. Reduced motion: native with scroll effects removed.




Performance gates

	

Mobile initial transfer ≤500 KB; initial compressed JS ≤180 KB; deferred motion JS ≤55 KB; zero WebGL.




Core Web Vitals

	

Real-user p75 LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1.




Hero requirements

	

Headline, price, offer terms, first WhatsApp action and image frame are present without requiring GSAP to initialise.




Verification

	

npm test, npm run build, screenshot QA at 320/390/1440 px, reduced-motion capture, live-demo link checks, Android scroll tests and production performance measurements.

Final implementation priority

The logical build order is:

Replace the demo-image placeholders with licensed visual assets, capture real concept screenshots and build the hero.

Establish Antonio/DM Sans and the final colour tokens, preserving the admin's independent dark theme.

Implement the mobile-compatible hero, giant price, demo stack and type wipe.

Build the pricing rail and truthful conversion content.

Add the lightweight statement, process, promise and final-contact scenes.

Integrate desktop-only Lenis, reduced motion, responsive fallbacks and run the full verification suite.

These are implementation priorities, not separate design concepts to be debated again.

Points still open

The A–G design decisions are resolved at recommendation level. The remaining items are approvals or verification gates:

Owner approval: Final hero headline and the proposed showroom-photography direction.

Commercial approval: Confirmation of the ₹7,999 and ₹17,999 package prices and the exact terms for qualifying for a free concept.

Assets: A licensed hero photograph and completed, placeholder-free screenshots of all three concept demos.

Mobile QA: Actual captures and interaction tests at 320 px and 390 px, particularly sticky-card accessibility, type-wipe transitions and the fixed WhatsApp pill.

Performance QA: Measured JavaScript/asset weights and real-device scroll smoothness. Animation effects must be simplified if the agreed performance gates fail.

Final recommendation to Claude Code: Proceed with the Horeca-derived architecture, Antonio 600, vermilion/ivory identity, two major sticky scenes, mobile-preserved motion and PX PUSH-inspired pricing. Do not introduce further visual references unless implementation testing reveals a specific design problem.
