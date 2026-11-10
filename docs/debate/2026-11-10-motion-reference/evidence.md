# Evidence — reference candidates (collected 2026-11-10)

Awards were read on each site's own awwwards.com/sites/<slug> page. Motion notes come from the Codrops case studies
and from Claude's own capture: headless Chrome, 1440×900, real wheel events, 15 frames per site
(`tools/ref-scroll.mjs`). "Probe" = measured in the live page: libraries present, WebGL contexts, fonts loaded,
bytes transferred by the end of the first 9 s.

| # | Site (live) | Award (awwwards page) | Sells | Probe (measured) |
|---|---|---|---|---|
| 1 | Horeca Social — https://horeca-social.com/en | Honorable Mention, 2026-05-09 (awwwards.com/sites/horeca-social-made-viral) | Social/influencer marketing for hotels and restaurants | GSAP + ScrollTrigger + Lenis, Webflow, **0 WebGL**, 2 pin-spacers, 6 sticky, **116 KB** transferred, white ground, text #df0567, h1 "LET'S GO VIRAL" Monologue 400 at 164 px (90 px on 390), body Inter Variable, scroll height 17,985 px |
| 2 | TRIONN — https://trionn.com/ | SOTD 2026-07-27 (trionn-2) | Web design / branding studio, **Rajkot, Gujarat** (a local competitor) | Next.js + Lenis, **3 WebGL**, 4 pin-spacers, **4.9 MB**, dark #040508, h1 Familjen 90 px, Neue Haas body |
| 3 | 1820 Productions — https://1820productions.com/ | SOTD 2026-02-26 (1820-productions) | Video production, Dallas | Webflow + Lenis, 0 WebGL, 295 KB, near-black, Suisse Intl Condensed |
| 4 | Maxima Therapy — https://maximatherapy.com/ | SOTD 2026-04-07 (maxima-therapy) | Therapy for neurodivergent children | Lenis, 6 canvases (2D), 0 WebGL, 2.0 MB, yellow/orange, Robuck Rounded 214 px |
| 5 | Kononenko Arch. Bureau — https://kononenkogroup.com/ | SOTD 2026-08-23 (kononenko-architectural-bureau) | Architecture | Lenis, 1 WebGL, 3.3 MB, white, serif + grotesk; WhatsApp in contact |
| 6 | PX PUSH — https://pxpush.com/ | SOTD 2026-08-15 (px-push) | Design subscription with public prices | Lenis, **3 WebGL**, **7.6 MB**, dark grey + #03049C blue, SemiSqueezed 173 px + Graphik |
| 7 | Telha Clarke — https://telhaclarke.com.au/ | SOTD 2026-02-16 (telha-clarke) | Architecture & interiors | Lenis, 0 WebGL, 2.5 MB; did not scroll under synthetic wheel (custom scroller) |
| 8 | Lama Lama — https://lamalama.com/ | SOTD 2026-07-20 (lama-lama-2) | Branding/web agency, Amsterdam | 2 WebGL, 1.9 MB, #1A1C1C / cream #F9F4EB; did not scroll under synthetic wheel |
| 9 | Hubtown — https://hubtown.co.in/ | SOTD 2026-06-10 (hubtown) | Mumbai real-estate developer (by Unseen Studio) | WebGL + GSAP; WhatsApp "Chat with us" CTA (not captured) |

## What the capture shows, per frame strip

**Horeca Social (1440):** full-bleed drone photograph hero with giant condensed white "LET'S GO VIRAL" bottom-left,
small pill "Request project" + WhatsApp icon top-left → hero shrinks away to reveal a pale-pink field with a huge
"400+ influencers" count → "OUR SERVICES" in giant type sliding across the screen → services as **stacked sticky
cards** (Content Creation, Influencer Marketing, Social Media Marketing), each a colour block with photo + "Request
project" pill, the previous card scaling back under the next → a single word ("YOUNG… VIBE") **scales up while pinned
until it fills the screen with its colour**, which becomes the next section's ground (a colour wipe made of type) →
"OUR PARTNERS" logo grid on the brand colour → "REFERENCES" in giant black type, letters of "NOTHING BUT THE TRUTH"
**scatter and assemble** → testimonial columns. Codrops: CSS sticky + one ScrollTrigger per scene, scrub 0.3, Lenis
desktop only ("on mobile it was a disaster"), iOS custom scroll div, in-app browser fixes for Instagram/LinkedIn.
**Horeca (390):** same moments survive on a phone: condensed type fills the width, "Request project" + WhatsApp
icon in the hero, services as stacked colour cards, scaling word, partner grid, contact with WhatsApp icon.

**TRIONN:** blur-to-sharp letters, a 3D object hero, a manifesto that greys in word by word, "IMPACT + INSPIRE +
INNOVATE" giant marquee, dark→light ground change, key-fact cards, horizontal work rail, services as giant stacked
words with a 3D rock. Beautiful but 4.9 MB and WebGL; and it is a Gujarat studio selling the same service.

**PX PUSH:** giant marquee type over a WebGL cloud hero; features as a pinned list where the active row grows and
its photo appears; **pricing packages revealed one by one beside a 3D floppy disk that turns with scroll**; giant
wordmark footer. 7.6 MB.

**1820 Productions:** video-led; each section opens with a hairline + short condensed statement over full-bleed
footage; needs film SiteBlitz does not have.

**Maxima:** custom illustration everywhere, tilted service cards flying in, giant rounded type; depends on an
illustrator. **Kononenko:** quiet serif editorial, sketches drawing in; little "heavy" motion.

## SiteBlitz facts that bind the design (owner-stated, see founder-facts.md)
- Gujarat-based (works from Navsari) — the old prompt's "Mumbai" is wrong and removed from the site.
- No founder name or photo anywhere. No client yet: no testimonials, no client logos, no results, no case studies.
- Proof available today: 3 fictional, labelled concept demo sites (/demo/salon, /demo/coaching, /demo/showroom),
  public prices, a written process, "review your homepage concept before you pay" for qualified buyers.
- Offer (src/lib/offer.ts, prices still need the founder's final approval): Launch ₹7,999 (1 page, 2 working days
  after ready-to-build), Business ₹17,999 (3 pages, 7 working days), Custom by quote. No GST.
- Main action: WhatsApp chat. Buyers: owners of salons, coaching classes, shops/showrooms in South Gujarat, on phones.
- Stack: Next.js 15, Tailwind v4 tokens, GSAP 3.15 and Lenis 1.3 already installed, declarative `data-anim` engine.
- Budget: ₹0 for tools/fonts/photos (domain only).
- The current light teal design was rated 1/10 by the owner: zero photographs, a "real photos go here" placeholder in
  the hero, every section the same eyebrow + bold heading + bordered-card template, defensive copy, 13 phone screens.
