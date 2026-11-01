# Claude Code: Round 2 verdicts, then Round 3

## Round 2 verdicts

- **FD-25 to FD-35: agreed.** The scripts, objection map and Option A (concept-first assurance) are adopted as
  drafts for the founder.
- **Two small fixes:**
  - **Payment split:** ₹8,999.50 is awkward on UPI. Use ₹9,000 + ₹8,999.
  - **Objection 6:** "based in Navsari" vs "based in South Gujarat" is the founder's call. Both are true.
- **Netlify credit model: agreed, and it changes the deploy process.** Production deploys happen only deliberately
  (about 15 credits each, 300 a month). Branch and preview deploys must be checked against the credit rules; they may
  also cost credits. Bandwidth matters too: pages are about 190 KB of JS each. I will measure this on staging.
  FD-34 is agreed as a staging-first migration.

## The insight that reshapes the redesign

With click-to-WhatsApp ads, **the ad does not land on the website at all.** It opens WhatsApp. So in the paid funnel
the website does three jobs:
1. A credibility check. The buyer opens the link from the chat, or googles "SiteBlitz".
2. The demos we send.
3. The written pricing and ownership terms.

So the first redesign must perfect three things: the **demo pages**, the **home page as a trust check**, and the
**pricing/terms page**. The other ~25 long-form pages get the new styling later.

## Round 3: total redesign and psychology-based content (agenda 4)

Claude's positions:

**R1. What "extraordinary" means, as testable criteria.** Not spectacle. Measured as:
- 4 of 5 owners pass the 5-second test (what is sold, for whom, starting price);
- the offer, price and WhatsApp CTA are visible in the first mobile screen at 360 px;
- every demo is usable and fast on a mid-range Android phone over 4G (field LCP ≤ 2.5 s);
- one signature interaction (below), plus a visual quality bar that is clearly above local competitors' sites.

**R2. Home page order (psychology-led):**
1. **Hero:** the outcome headline, the "₹7,999 / ₹17,999, final prices" anchor, the CTAs (WhatsApp us · See demos),
   and a phone mockup that cycles the demo sites.
2. **"See it working":** 3 live, labelled demo micro-sites, one per vertical.
3. **How it works in 4 steps,** with the "review your concept before you pay" assurance.
4. **Pricing, 2 packages + custom:** what's included, what's NOT included, renewals and ownership. No hidden charges.
5. **An honest comparison:** a DIY builder vs a freelancer vs SiteBlitz, on qualitative criteria only (effort, design,
   ownership, support, speed). No invented competitor prices.
6. **Objection FAQ,** drawn from your 14-item map.
7. **A final WhatsApp CTA.**

Removed: the WebGL smoke hero, marquees, preloader, outline type, the "MENU"-only desktop nav, and the public traffic
counter. `/proof` stays as a technical page, out of the main nav.

**R3. Signature interaction:** a "before / after" slider on a phone frame. The left side shows a typical Instagram-only
presence, the right side the demo website. It is clearly labelled as illustrative, built with CSS and a range input
(no WebGL), with a reduced-motion version. Challenge it, or propose a better one.

**R4. Visual system:** the light tokens agreed earlier (canvas #FAF9F5, ink #182B36, teal #006B60, muted #58656D;
the warm accent only as a fill). Fonts: one sans for headings and one for body.

**R5. Demo micro-sites** at `/demo/<vertical>`: real pages inside the same app, each with a permanent "Concept demo by
SiteBlitz, not a client" ribbon and a working, simulated enquiry flow. Which 3 verticals fit South Gujarat best?
Candidates: coaching or tuition classes, clinics (dental, physio, skin), salon or beauty, restaurant or sweet shop,
local retail or showroom, real-estate broker. Pick 3 and justify them.

**R6. Language:** the site stays in English with Hinglish-friendly plain words; only the ad creatives and WhatsApp
scripts are Gujarati/Hinglish. A Gujarati site version waits until chats show demand. Disagree if you think the
Gujarati home page is worth doing now.

**Please write in full:**
- (a) home page copy for every section, in English;
- (b) the hero headline in 3 variants, picking one;
- (c) the pricing page copy, including the included/excluded/renewals table;
- (d) the **final Meta ad**: primary text, headline, description, image/video concept, and the pre-filled WhatsApp
  message. Give it in Gujarati, Hinglish and English, picking the one to run first, with the reason. Check that it
  meets Meta ad policy, especially the personal-attributes and unrealistic-claims rules;
- (e) the demo-page structure for your top vertical.

End with FD-36 onward and OPEN POINTS.
