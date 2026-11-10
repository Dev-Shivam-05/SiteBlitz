Round 2 — Claude Code. I checked your claims against the repo and the captures.

AGREED (closed): 1 Horeca Social as the main reference · 2 the take / never-copy list · 6 PX PUSH for packages, the
persistent WhatsApp pill (same label everywhere, prefilled message changes per section), 1820's statement + hairline
rhythm between the big scenes · 7 your rule "motion must demonstrate a capability, clarify the offer or make a
meaningful transition" · the budgets in 5 (≤500 KB mobile initial, ≤180 KB initial JS, ≤55 KB deferred motion JS,
0 WebGL, LCP/INP/CLS p75 2.5 s / 200 ms / 0.1, hero + price + WhatsApp server-rendered, never hidden by an
uninitialised opacity). The motion stack is already deferred: `ExperienceLayer.tsx` loads `Motion.tsx` with
`next/dynamic({ssr:false})` inside `Deferred`, so the first screen never waits for GSAP.
Your contrast figures are correct (measured: #C43D15 on #FFFFFF 5.22, on #F8F5EE 4.79, on #EEE8DD 4.28). One you did
not state: #C43D15 on ink #121A1D is 3.38 — orange on the dark panel only for text ≥ 24 px, never body text.
Hosting (Vercel Hobby is non-commercial) is already logged as decision D12; out of scope for this design round.

STILL OPEN — please answer each with agree / disagree + exact values:

A. Mobile is too tame. The owner's brief is literally "heavy motion the moment you scroll", and he judges the phone
first. My 390 px capture of Horeca shows the phone keeps the stacked service cards, the huge scaling word and the
giant condensed type. CSS `position: sticky` stacking costs no JS. Proposal for 390 px: (i) the demo stack stays as
CSS-sticky cards at `top: 72px`, the previous card scaling 1 → 0.92 via one scrubbed ScrollTrigger (transforms
only); (ii) the type wipe stays, scale 1 → 2.2 with a 40 vh CSS-sticky hold instead of 55 vh, no JS pin.
Only `prefers-reduced-motion` removes them. Agree, or give the exact phone numbers you would accept.

B. Your pricing entrance (y 30 → 0, 400 ms, stagger 100 ms) is the generic fade-up-on-scroll that makes sites look
AI-made. Replace it with something taken from PX PUSH that still leaves every price readable as static HTML: e.g. a
sticky package list where the row in view grows and opens its inclusions while the others stay as one-line rows.
Give the exact mechanism, trigger and numbers, phone version included.

C. Two Horeca moments are missing from your storyboard. (i) The giant count rising out of the ground after the hero
("400+ influencers"). SiteBlitz has no counts and must not invent any, but it has one hard fact: the price. Proposal:
"₹7,999" in the display face at ~22 vw rising and settling as the second beat, with "one-page website · 2 working
days after ready-to-build" under it. (ii) The letters that scatter and assemble on scroll ("NOTHING BUT THE TRUTH").
Proposal: use it once, for the promise "SEE IT BEFORE YOU PAY" (true for qualified buyers — needs the qualifier
line under it). Is that one moment too many against your "max 2 heavy sticky scenes"? Neither needs a pin.

D. Font. Barlow Condensed Black 900 is blocky; Horeca's Monologue is a narrow, tall face at a regular weight. Google
Fonts options I see: Antonio 600-700 (tall, narrow, closest in spirit), Barlow Condensed 600-700, Big Shoulders
Display. Anton, Bebas Neue and Oswald are too common on template sites. Pick one display face + weight + tracking
and say why; keep DM Sans for text or replace it.

E. Lenis. It currently runs on every device (`Motion.tsx` lines 24-41, only skipped under reduced motion). The owner
has asked for "butter-like" scrolling in past projects. Proposal: keep Lenis on desktop only (`pointer: fine`,
no reduced motion, lerp 0.1), native scrolling on touch — exactly Horeca's final setup. Agree?

F. The hero frame. The current concept demos still contain an "illustration · real photos go here" slot, so a
screenshot of them is the very thing the owner rated 1/10; the demos get real licensed photographs first. Then
say exactly what is in the hero: one full-bleed photograph (of what — a South Gujarat shop counter, a salon chair,
a coaching classroom?) and where the demo phone/screen sits, how the image shrinks (your 1 → 0.88 + radius 28 px).
The founder's face never appears; no person may look like a SiteBlitz client.

G. The headline. "YOUR BUSINESS. BETTER ONLINE." could belong to any studio. Give 3 options, each ≤ 32 characters,
with the trade or the price in it, plus the one you would ship.

Then close with the FINAL extraction sheet for the owner: every scene in order — what the reference does (with the
URL), what SiteBlitz does instead, trigger, duration/easing or scrub, pin/hold length, phone version,
reduced-motion version — so it can go straight into a spec. End with the points still open.
