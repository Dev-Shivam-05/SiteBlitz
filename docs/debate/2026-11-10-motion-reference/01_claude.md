name: siteblitz-transformation-debate
use_when: SiteBlitz website / admin transformation decisions after the D1 audit — creative direction, motion storyboard, conversion flow, admin priorities — debated with Claude Code through the /debate skill.

<!-- v1.1 (2026-10-31): replaces v1.0's fixed 3-round protocol and 7-part output with per-point verdicts that match the
/debate skill (≤7 agenda points, 25 KB context, ≤10 rounds). v1.0 is kept unchanged next to this file. -->

You are an independent, demanding reviewer for SiteBlitz, a Mumbai web studio that sells conversion-focused websites
delivered in 48 hours to 4 days. You combine brand strategy, interaction and motion design, UX and conversion, analytics,
privacy/security and senior Next.js architecture. Your job is to improve decisions, not to agree.

You are talking to Claude Code, which has the real repository open and pastes the evidence below. Treat that evidence as
the only facts; anything missing is unknown. Ask for a file by path if you need it.

Hard rules:
- Truthful marketing: SiteBlitz has no verified client results or testimonials yet. Never propose invented reviews, client
  names, numbers or case studies. Trust comes from the live /proof page, the real process, commitments the owner can meet,
  the free grader tool and clearly labelled concept studies.
- Stack-native: Next.js App Router, Tailwind v4 tokens, declarative GSAP via data-anim, server components first, heavy work
  deferred. Every motion idea needs a mobile version, a reduced-motion version and a performance cost.
- Privacy: no covert tracking, fingerprinting or "browsing history" ideas; legal points are "check with counsel".
- Accessibility WCAG 2.2 AA; CWV p75 LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1.

How to answer:
- Answer every agenda point by number: "agree", "disagree because …", or "need data: …".
- Be concrete: exact copy, exact section order, exact motion (what moves, trigger, duration, easing, pin length), exact
  token values. Name real reference sites by URL and say what to take from each and what not to copy.
- Accept good choices in one line; do not manufacture disagreement.
- End every reply with the list of points still open.

<project_context>
<file path="docs/debate/2026-11-10-motion-reference/agenda.md">
# Agenda — SiteBlitz motion-led redesign: final reference (2026-11-10)

1. **Main reference.** Which ONE award site should be the final main reference for SiteBlitz's redesign? Claude's lead:
   Horeca Social (horeca-social.com/en). Judge every candidate in `evidence.md` against: sells a service, heavy
   scroll-driven motion, a WhatsApp lead as the goal, small Indian business owners as buyers, mid-range Android on 4G.
2. **What to take, what never to copy.** Exact list of the reference's motion moments and layout ideas to extract,
   and what is theirs alone (brand colour, display font, copy, partner-logo wall, testimonials SiteBlitz does not have).
3. **The SiteBlitz storyboard.** Map the reference's moments onto SiteBlitz's real content (offer, 3 concept demos,
   4-step process, prices, FAQs, WhatsApp close): section order, what moves, trigger, duration/easing, pin length.
4. **Brand system.** A display face in the reference's condensed spirit that is free (Google Fonts / OFL, no paid
   licence), a body face, one saturated brand colour + grounds (no pink copy of Horeca, no violet), photography
   source when there are no client photographs and the founder's face never appears.
5. **Motion budget.** Heavy motion without losing speed or trust: JS/asset budget, LCP/INP/CLS targets, Lenis on
   desktop only or not, the mobile version of each scene, the prefers-reduced-motion version, first screen must not
   wait for JS.
6. **Secondary references.** Is it worth adding PX PUSH's packages-revealed-on-scroll for pricing, and Telha Clarke's
   single persistent CTA that changes per section (as a WhatsApp pill)? Anything better from the list?
7. **Rule conflict.** Claude's design skill keeps pinned/heavy scroll scenes for tech sites only; the owner explicitly
   wants heavy scroll motion. Where is the line so it still sells and does not look like an AI template?

</file>

<file path="docs/debate/2026-11-10-motion-reference/evidence.md">
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

</file>

<file path="docs/debate/2026-11-01-ads-psychology-redesign/founder-facts.md">
# Founder answers: 2026-11-01 (OWNER-STATED, supersede earlier UNKNOWNs)

- **Capacity:** 50+ hours a week. The founder checks the admin panel at least once a day, usually 2-3 times, and more
  while ads are running.
- **Builders:** the founder plus one friend build client sites. The timing claims (48 h / 4 days / 7 days) are
  achievable *once the project is fully in hand*, meaning content and approvals received.
- **Location:** the founder actually works from **Navsari, Gujarat**. The site says "Mumbai" because "clients will see
  an urban location and trust it more".
  - Claude flags this: the site's schema and copy assert a Mumbai LocalBusiness, which is false.
  - The truth rule in the prompt outranks growth, so a truthful alternative is needed.
- **GST:** not registered. Prices are final, with no GST charged. Claude adds: confirm the turnover threshold with an
  accountant.
- **Hosting:** Vercel **Hobby**, whose terms are non-commercial.
- **Domain:** the founder will buy **the domain only**: no paid mailbox, no other paid tools.
- **Identity:** the founder's **name and photo must NOT appear** on the site, so Direction B (founder-led) is out.
- **Ads budget:** **₹1,000 total for November 2026.** The goal: **one paying client from that ₹1,000.** The founder
  is "definitely ready" to scale ads if they produce responses or clients.
- **Mandate:** a total redesign is allowed. Regenerate all content based on buyer psychology. Selling is "our weakest
  part, we literally don't know how to sell": cover psychology, what the buyer thinks and needs, price comparison,
  delivery time, visuals and trust. The founder wants it "extraordinary" but results-driven. "Fight it out, but I need
  the client."
- **References:** 5 re-structure.ai articles on AI marketing teams (see `references.md`). Use them as a reference, not
  a copy. Set up APIs where they are worth it.

</file>

<file path="src/lib/offer.ts">
/**
 * The commercial offer: the single source of truth for prices, payment milestones, delivery terms and
 * scope. Every page, the pricing table, JSON-LD and the WhatsApp scripts in knowledge/ must read from
 * here, so a price change cannot leave a stale number somewhere else (tests/offer.test.ts enforces it).
 *
 * Agreed in docs/debate/2026-11-01-ads-psychology-redesign/RESULT.md. SiteBlitz is not GST-registered,
 * so prices are final: no GST is added (re-check with an accountant before registering).
 */

export type PackageId = "launch" | "business" | "custom";

export interface OfferPackage {
  id: PackageId;
  name: string;
  /** null = quoted per project */
  priceInr: number | null;
  pages: string;
  tagline: string;
  /** deposit + balance; they must add up to priceInr */
  payments: readonly [number, number] | null;
  delivery: string;
  includes: readonly string[];
  recommended: boolean;
}

export const PACKAGES: readonly OfferPackage[] = [
  {
    id: "launch",
    name: "Launch",
    priceInr: 7999,
    pages: "1 page",
    tagline: "One focused page for a professional business presence.",
    payments: [4000, 3999],
    delivery: "2 working days after ready-to-build",
    includes: [
      "One responsive page",
      "Services and business information",
      "WhatsApp and call buttons",
      "Basic technical SEO setup",
      "One consolidated revision round",
    ],
    recommended: false,
  },
  {
    id: "business",
    name: "Business",
    priceInr: 17999,
    pages: "3 pages",
    tagline: "Three pages for businesses that need room to explain their services.",
    payments: [9000, 8999],
    delivery: "7 working days after ready-to-build",
    includes: [
      "Three agreed pages",
      "Mobile-first design",
      "Service information and enquiry journey",
      "WhatsApp, call and enquiry options",
      "Basic technical SEO setup",
      "One consolidated revision round",
    ],
    recommended: true,
  },
  {
    id: "custom",
    name: "Custom",
    priceInr: null,
    pages: "Quoted",
    tagline: "E-commerce, larger catalogues, bookings, more pages or integrations.",
    payments: null,
    delivery: "Written schedule in the quotation",
    includes: [
      "Scope agreed in writing first",
      "Milestones and payments in the quotation",
      "Integrations quoted before work begins",
    ],
    recommended: false,
  },
] as const;

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/** "from ₹X" for a service starting price; 0 means custom work priced by quote. */
export const fromPrice = (n: number) => (n > 0 ? `from ${inr(n)}` : "custom quote");

export const launchPkg = PACKAGES[0];
export const businessPkg = PACKAGES[1];

/** Lowest fixed price, for "from ₹X" copy and JSON-LD. */
export const FROM_PRICE = launchPkg.priceInr as number;

/** Weekly cap on free personalised homepage concepts (FD-26): 3 concepts or 9 hours, whichever first. */
export const CONCEPT_CAP_PER_WEEK = 3;

/** What every package price does NOT include (pricing page + FAQ). */
export const EXCLUSIONS = [
  "Domain registration and its yearly renewal",
  "Third-party hosting or subscription charges",
  "Paid plugins, premium fonts, stock photos or software licences",
  "E-commerce, online payments or advanced booking systems",
  "New pages or features beyond the agreed scope",
  "Advertising spend or ongoing marketing",
  "Guaranteed Google rankings, traffic, enquiries or sales",
  "Unlimited redesigns, content writing or ongoing edits",
] as const;

/** When the delivery clock starts (the "ready-to-build" definition). */
export const READY_TO_BUILD = [
  "The pages and features are confirmed in writing",
  "Your content, images and business details are with us",
  "Any access we need (domain, accounts) is shared",
  "The first payment is received",
  "A start date is agreed",
] as const;

</file>

<file path="CLAUDE.md">
# SiteBlitz — Project Rules

Next.js 15 App Router marketing site + first-party analytics + single-operator admin panel.
Map: [docs/PROJECT_MAP.md](docs/PROJECT_MAP.md) · Risks: [docs/RISK.md](docs/RISK.md) · Verification: [docs/VERIFY.md](docs/VERIFY.md)

## Commands
- dev `npm run dev` → http://localhost:3000 · build `npm run build`
- `npm run typecheck` works again (P5, 2026-10-31: ~4 s, ~500 MB) and `npm run build` now fails on type errors.
  The old >2.9 GB OOM came from an untyped `model()` helper in `src/lib/models.ts` — keep schemas typed `new Schema<XDoc>`.
- `npm test` → vitest tests over the SSRF guard and the admin auth gate. No linter exists.
- **Never `npm run build` while `next dev` is live** — shared `.next` gives a bogus
  `TypeError: a[d] is not a function` prerender failure. Kill dev first; check for orphan children.
- On Windows, stopping the background `npm run dev` / `npm start` shell **leaves the `next` child alive on :3000**
  (bit three times on 2026-10-31: a stale server answered every check, a new dev silently took :3001).
  After stopping, list `node.exe` processes whose command line contains `E:TempSiteBlitz
ode_modules` and stop those PIDs.
- Visual QA: `node scripts/shoot.mjs --pages /,/work --widths 320,375,1440 [--rm] [--full] [--cookie sb_admin=<jwt>]`
  (flags horizontal overflow + console errors). Lab perf: `node scripts/vitals.mjs --pages / --runs 3` against `npm start`.
  Git Bash needs `MSYS_NO_PATHCONV=1` or `/` page args get rewritten to Windows paths.
- PowerShell 5.1 has no `&&`. Separate commands, or `;`.
- `shoot.mjs --full` prints the viewport size, but the PNG is full height; `--dpr 2` for crisp assets,
  `--eval "<js>"` (async allowed) to inspect or click in the real browser. Native `loading="lazy"` images
  never loaded in headless shots; images that are the proof (demo cards) use `loading="eager"`.
- Start/stop servers as background tasks and stop them with TaskStop; broad `Stop-Process` patterns are blocked.
  A stale `.next` can fail the build with `ENOENT edge-runtime-webpack.js`: re-run `npm run build` (deleting `.next` is blocked).
- E2E without touching production: run the cached `~/.cache/mongodb-binaries/mongod-x64-win32-8.2.6.exe` on a
  scratch dbpath and port, then `next start` with `MONGODB_URI` and test-only `ADMIN_*`, `JWT_SECRET`, `CRON_SECRET` env.

## Conventions — follow these, don't improve them
1. API routes return `{ ok: boolean, ... }`; errors `{ ok:false, error }` with a real status code.
   `/api/track` is the deliberate exception: always 204, never throws.
2. Every route file: `export const runtime = "nodejs"`, plus `dynamic = "force-dynamic"` if DB-backed.
3. Guard DB work with `dbConfigured()` before `dbConnect()`. A missing database degrades the
   feature (503 / WhatsApp fallback), never crashes the page.
4. Server components by default; `"use client"` only for interaction. Decorative or heavy work
   mounts via `Deferred` / `ExperienceLayer` + `next/dynamic`, never on the critical path —
   `/proof` publishes the real-user vitals, so first paint is a product feature here.
5. Animation is declarative: put `data-anim="chars|words|fade-up|mask|scale-in|words-scrub|parallax"`
   (+ `data-delay`, `data-stagger`, `data-now`, `data-speed`) on the markup and let `Motion.tsx`
   build the GSAP scene. Never hand-write GSAP inside a component.
6. Colours come from the `@theme` tokens in `globals.css` — `void, surface, raised, ink, muted,
   faint, volt, violet, warm, line`. No inline hex. Reusable effects are classes in `globals.css`.
   Since 2026-11-01 the public site is **light** (void = canvas #faf9f5, volt = teal action #006b60);
   the admin keeps the dark set via `[data-theme="dark"]` on `src/app/admin/layout.tsx`.
   `--color-warm` fails text contrast: fills and decoration only.
   Tailwind v4 is CSS-first: there is no `tailwind.config.js` and there should not be one.
7. Honour `prefers-reduced-motion` everywhere; `?motion=force` is the QA override.

## Danger zones
- `src/middleware.ts` — the **only** auth gate for `/admin` and `/api/admin`; no route re-checks.
  Any change here means running section E of `docs/VERIFY.md` against every admin route.
- `src/lib/grader.ts` `isPrivateIp()` / `validatePublicUrl()` — hand-rolled SSRF guard on a
  user-supplied-URL fetcher. Do not weaken. Do not touch before tests exist.
- `src/components/site/Motion.tsx` — 384-line engine; a bad selector kills reveals site-wide, silently.
- `src/app/api/track/route.ts` — swallows every error by design, so bugs here are invisible.
- `ignoreBuildErrors` was removed in P5 — a green build now includes a type check.

## Content rules
- **Prices, payment splits, delivery terms, inclusions/exclusions → `src/lib/offer.ts` only.** Every page
  reads from it; `tests/offer.test.ts` fails if a withdrawn price ($ prices, ₹14,999/₹24,999), "Mumbai",
  an indexing guarantee or an unguarded `SITE.email` reappears in public copy.
- Short copy, FAQs, process steps, work items → `src/lib/site.ts`. Location is "Gujarat-based" (truthful);
  the founder's name/photo never appear. `SITE.emailLive` stays false until the mailbox is send/receive tested.
- Demo sites (`src/lib/demos.ts`, `/demo/*`) are FICTIONAL: noindex, permanent disclosure ribbon, enquiry is
  simulated and collects nothing. Never add a real address, phone, review or result to a demo.
- Ads live in `marketing/ads/` (sources + `render.mjs`); re-render, never hand-edit exports.
- Long-form (deep services, blog posts, industry landers) → JSON in `src/content/generated/`,
  imported explicitly by `src/content/index.ts`. That barrel is hand-maintained on purpose:
  a new file needs a new import line or it silently won't ship.
- Never invent a price, timeline, testimonial, client name or result. If it is not already in
  `site.ts` or the JSON, ask. `/proof` claims every number on this site is verifiable.

## Done means
1. `npm test` and `npm run build` both exit 0.
2. The sections of `docs/VERIFY.md` that cover the change were actually run — not assumed.
3. UI change → a screenshot of each state, incl. reduced-motion — which is also the fastest way to
   *audit* a page (every section renders static and visible). Screenshot over CDP with device
   metrics set; `chrome --headless --window-size` includes browser insets and silently crops.
4. Committed as `<area>: <what changed>`, and pushed.

## Git
- `v2-redesign` is the working branch. `main` is 101 commits behind and is not the deploy source.
  Never push to `main`.
- `v2-redesign` tracks `origin/v2-redesign`. Pushes create Vercel **Preview** deployments only; production is a
  separate step (`docs/DEPLOY.md`).

</file>
</project_context>

<topic>
# Topic — choose the final award-level motion reference for the SiteBlitz redesign

## The owner's words (Hinglish, translated faithfully)
"For the redesign, you [Claude] and ChatGPT have to take references from award websites, especially the nominations
for motion-based design — the kind where heavy motions come the moment you scroll. Analyse designs of that type.
SiteBlitz is a selling platform — it sells a service — so analyse according to that and finalise one totally
extraordinary version or reference, and extract everything according to that reference. Give me the reference links
so I can tell you whether the reference is final. If I don't like it I'll give another reference; you both analyse
that one and finalise."

Context: the owner rated the current site (light cream + teal, Manrope ExtraBold, no photographs) 1 out of 10.

## Important correction to your system prompt
SiteBlitz is **Gujarat-based** (the founder works from Navsari). It is no longer presented as a Mumbai studio, and the
"48 hours" promise was replaced by the offer below. The facts in `evidence.md` win over the system prompt.

## Agenda
1. Main reference — which ONE (Claude's lead: Horeca Social). Use the criteria in the agenda file.
2. What to take vs what never to copy.
3. The SiteBlitz storyboard: section order, what moves, trigger, duration/easing, pin length, mobile version.
4. Brand system: free display + body fonts, one saturated colour + grounds (not pink, not violet), photography source.
5. Motion budget: JS/asset weight, LCP/INP/CLS, Lenis desktop-only?, mobile + reduced-motion version of each scene.
6. Secondary references: PX PUSH pricing-on-scroll, Telha Clarke persistent CTA → WhatsApp pill — worth it? Better ones?
7. Where heavy scroll motion stops selling and starts looking like an AI template.

You can open every URL in `evidence.md` yourself — please do, and say if you see something the capture missed.
If you know an award site (2025–2026, Awwwards / FWA / CSSDA, with its URL) that beats Horeca for this brief, name it
with its award and say why.

Answer each agenda point by number: agree / disagree because ... / need data: ... . End with the list of points
still open.
</topic>
