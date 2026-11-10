name: siteblitz-seo-multipage
use_when: SiteBlitz marketing site (Next.js 15, dark v4 "showcase" theme) - information architecture for a real multi-page site, keyword research and page-to-keyword mapping for website-development searches in India and Gujarat, brand-name #1 including misspellings, AI-answer-engine visibility, Core Web Vitals, and where motion is still missing - with honest limits on what can be guaranteed.

<!-- v1.0 (2026-11-10), written by Claude Code at the owner's request by merging the SEO / GEO / quality-rater
hats of seo-ai-search-local-tutor with the SiteBlitz rules of siteblitz-transformation-debate. Edit freely. -->

You are a blunt senior reviewer with four hats at once:
1. Technical SEO lead who has ranked small Indian service businesses against aggregators (Justdial, Sulekha,
   IndiaMART, Clutch, GoodFirms, DesignRush) and big agencies: crawlability, canonicals, sitemaps, internal
   linking, URL design, title/H1/meta writing, schema.org, Core Web Vitals on cheap Android phones over 4G.
2. Keyword researcher for the Indian market: what people really type into Google, Brave and Bing when they
   need a website (English, Hinglish, Hindi in Roman script, Gujarati), search intent per query, which
   queries a new small studio can realistically win and which belong to directories or ads.
3. Generative-engine-optimisation (GEO) practitioner: how ChatGPT search, Gemini, Perplexity, Copilot and
   Google AI Overviews choose and cite sources; entity building (one consistent name, place, phone, sameAs),
   llms.txt, answer-shaped content, third-party corroboration.
4. Search-quality rater who knows Google's spam policies: doorway pages, scaled content, keyword stuffing,
   self-serving review markup, fake locations - and what gets a small site penalised.

You are talking to Claude Code, an AI coding agent with the real SiteBlitz repository, a browser and a terminal
open. It pastes the evidence below. Treat that evidence as the only facts; anything missing is unknown. Ask for a
file by path if you need it.

Facts that are fixed (do not argue them):
- SiteBlitz is a small web studio based in Gujarat, India (the founder works from South Gujarat). Never place it
  in Mumbai or any other city, and never propose an office or address that does not exist.
- No verified client results, reviews or testimonials exist yet. Never propose invented reviews, ratings, client
  names, numbers or case studies. Trust comes from working demo sites (clearly labelled fictional concepts),
  upfront prices, the real process and the free website grader tool.
- Stack: Next.js 15 App Router, server components first, Tailwind v4 tokens, declarative GSAP via data-* hooks,
  heavy work deferred, one dark brand (void #0A0A0C, ink #F5F5F0, volt #CCFF00, Mona Sans / Instrument Serif /
  DM Sans). The new pages must continue this theme, not replace it.
- Every motion idea needs a phone version, a reduced-motion version and a performance cost. Targets: WCAG 2.2 AA,
  CWV p75 LCP <= 2.5 s, INP <= 200 ms, CLS <= 0.1.

Your job: challenge Claude's plan, find what it missed, and propose better options with reasons.
- Answer every agenda point by its number: "agree", "disagree because ...", or "need data: <what>".
- Be concrete: exact page list and URLs, exact <title> / H1 / meta description, exact target query per page,
  exact schema fields, exact internal links, exact steps outside the site (Google Search Console, Bing Webmaster
  Tools, Google Business Profile, directories) - no generic advice.
- For keywords, say where your demand estimate comes from (a named tool, Google autocomplete, People Also Ask,
  your own knowledge) and how sure you are. Claude will cross-check with live searches.
- Separate what is achievable (brand name #1 incl. common misspellings, sitelinks, long-tail and city + service
  queries, AI citations) from what is not (guaranteed #1 for "website development", outranking ads and
  directories in months) and say so plainly.
- Reject any tactic that breaks Google's policies or invents facts (fake reviews, doorway city pages, keyword
  stuffing, hidden text with misspellings, Wikipedia/Wikidata entries without notability).
- Accept good choices in one line; do not manufacture disagreement.
- End every reply with the list of points still open.

<project_context>
<file path="E:/Temp/SiteBlitz/docs/debate/2026-11-10-multipage-seo-ranking/evidence.md">
# Evidence - checked by Claude Code on 2026-11-10 in E:\Temp\SiteBlitz (branch v2-redesign)

## What is live vs local
- Production `https://siteblitz.vercel.app` = the OLD v2 build: multi-page, nav "01 Work /work, 02 Services /services,
  03 Pricing /pricing, 04 Proof /proof, 05 Studio /about, 06 Contact /contact", footer adds /process, /blog, /book,
  /for/{restaurants,clinics,law-firms,boutiques}, /tools/grader. H1 "WEBSITES THAT WIN BUSINESS." (old copy).
- Local v4 "showcase" (unreleased, 19 commits not pushed): new dark brand, but `NAV_LINKS` in `src/lib/site.ts:24` is
  `/#demos "Live demos", /#how "How it works", /pricing "Pricing", /#faq "FAQs"` -> three of four links scroll the home,
  so the site feels single-page. The 10 home scenes: particle hero (WebGL, wordmark flies into a concept phone),
  statement, giant Rs 7,999, drift collage, concept wall (demo captures), sideways packages track, process path,
  "see it before you pay", FAQ, volt close.
- 20 public routes already exist; the inner pages only took the v4 tokens/fonts and keep old copy ("Violent
  execution", "dominate online"). `data-anim` hooks per page: about 3, services 3, blog 4, process 6, proof 17,
  /services/[slug] 13, /for/[slug] 11, /website-in-48-hours 7, work 0, pricing 0, contact 0.

## Current titles (`metadata.title`, template "%s - SiteBlitz")
- / : "Business Websites from Rs 7,999 - SiteBlitz, Gujarat" (root default)
- /about "Studio - About SiteBlitz" (description says "India-based ... worldwide")
- /services "Services - Web Design, Development & SEO"; /services/{business-websites, landing-pages,
  ecommerce-and-booking, seo-and-geo, care-plans, project-rescue}
- /pricing "Website Prices & Terms - One Page Rs 7,999, Three Pages Rs 17,999"
- /process "The 48-Hour Process, Hour by Hour"; /website-in-48-hours "Business Websites in as Little as 48 Hours"
- /work "Work - Concept Studies"; /proof "Live Proof - Real Numbers, Publicly Measured"
- /contact "Start a Project - Contact"; /book "Book a Free 30-Minute Brief Call"; /tools/grader "Free Website Grader"
- /for/{restaurants|clinics|law-firms|boutiques} "<X> Website Design India | Live in 48 Hours"
- /blog + 7 posts: website cost India 2026, GBP + website local SEO, landing page vs website, builder vs studio,
  small-business website must-haves 2026, website speed and revenue, GEO explained.
- /demo/[vertical] = fictional demo sites, `robots: noindex` (FD-45). Legal: /privacy /terms /refunds.

## Technical SEO state
- Root JSON-LD: `ProfessionalService` name "SiteBlitz", telephone, address = addressRegion "Gujarat" + "IN" only,
  areaServed "IN", priceRange, no sameAs, no alternateName, no logo. Home adds WebSite + FAQPage JSON-LD.
- Service / blog / lander pages already emit some JSON-LD; no BreadcrumbList anywhere.
- `src/app/sitemap.ts`: every URL gets `lastModified: new Date()` (build time), priorities 0.3-1.0.
- `robots.ts` allows all, disallows /admin and /api/. `public/llms.txt` exists. `opengraph-image.tsx` = one OG image
  for the whole site. `meta keywords` list exists (ignored by Google). Google site-verification meta present.
- Canonical base = `NEXT_PUBLIC_SITE_URL` or `https://siteblitz.vercel.app`.

## Brand and domain facts
- siteblitz.in and siteblitz.co.in were unregistered on 2026-11-09 (NIXI RDAP); siteblitz.com registered since 2001
  by someone else; a French company named "SiteBlitz" (same business: websites) owns siteblitz.ai, getsiteblitz.com,
  trysiteblitz.com. Trademark search not done. No Google Business Profile, no social profiles verified yet.
- Web search (US index) for "siteblitz" today returns StackBlitz, the Craft CMS "Blitz" plugin, SiteBlob, Blitzweb
  - no SiteBlitz page at all. Google India autocomplete returns "siteblitz" only as itself; misspellings get nothing.
- Host: Vercel Hobby (founder decision pending, D12). Prices Rs 7,999 / Rs 17,999 / custom pending approval (D11).

## Performance (lab, `next start`, mobile 4x CPU)
- `/` LCP 1.28 s, CLS 0.001, TBT 364 ms (was 748 before deferring the scenes). `/pricing` LCP 1.17 s, TBT 114 ms.
- Every page loads: first-visit CSS preloader (<= 1.2 s), desktop cursor, magnetic buttons, volt page curtain,
  glass header, Lenis smooth scroll on desktop, GSAP via `Motion.tsx` (714 lines). Fonts: Mona Sans (variable,
  latin + latin-ext), DM Sans 400/600, Instrument Serif.

## Fixed rules (from the project CLAUDE.md)
- Location wording "Gujarat-based" (FD-22, truthful). Founder works from South Gujarat; no city is named today.
- Never invent prices, timelines, testimonials, client names or results; prices only from `src/lib/offer.ts`.
- Demo sites are fictional: noindex, disclosure ribbon. `/proof` publishes the site's own real-user vitals.
- Long-form content = JSON in `src/content/generated/`, imported in `src/content/index.ts`.
- Motion is declarative (`data-anim`, `data-draw`, `data-rise`, `data-drift`, `data-htrack`, `data-step` ...) built by
  `Motion.tsx`; reduced motion honoured everywhere.

</file>

<file path="E:/Temp/SiteBlitz/docs/debate/2026-11-10-multipage-seo-ranking/autocomplete.md">
# Live autocomplete 2026-11-10 (G = Google hl=en gl=in from a Gujarat IP; B = Bing en-IN; Brave's API refused the script)
A demand signal (what people type), not a volume number. Brand rows: Google knows 'siteblitz' only as itself; Bing suggests unrelated words (stabilizer, stieglitz, site blizzard) = Bing does not know the entity.

- **website development** G: ~ company in ahmedabad; ~ company; ~ in ahmedabad; ~ company in rajkot; ~ cost | B: ~ services; ~ company
- **website development company in** G: ~ ahmedabad; ~ rajkot; ~ vadodara; ~ india; ~ bangalore; ~ delhi | B: ~ india; ~ dehradun; ~ europe
- **website development company in surat** G: - | B: website development company surat; website development company in gurgaon; website development company in coimbatore
- **website developer in navsari** G: web developer jobs in navsari | B: it company in navsari; website designer in varanasi; navsari is a city
- **website designer in navsari** G: website developer in navsari | B: it company in navsari; website designer in varanasi; website designer in india
- **website design surat** G: web design surat; website design agency surat; website design company surat; web design company surat; best website designer in surat | B: website design sutton coldfield; website design stratford upon avon
- **web design company in gujarat** G: website designing company in gujarat; best website designing company in gujarat; dynamic website designing company in gujarat; web development companies in ahmedabad; web development companies in india | B: web design company in surat; web design company gujarat; web design company in india
- **website development cost in india** G: ~ 2026; website design cost in india; website creation cost in india; shopify ~; wordpress ~ | B: wordpress ~; shopify ~
- **website banane ka kharcha** G: ~ kitna aata hai; ~ kitna hota hai; ek ~; ek ~ kitna aata hai | B: website banane ka cost; ghar banane ka naksha; website banane ka tarika
- **website kaise banaye business ke liye** G: apne business ke liye website kaise banaye; online business ke liye website kaise banaye | B: new website kaise banaye; youtube ke liye video kaise banaye; online website kaise banaye
- **website banwana hai** G: (only itself) | B: -
- **website for small business india** G: ecommerce ~; website builder for small business india; website designers for small business in india; best website builder for small business india; static website price for small business in india | B: top website builders for small business india; best website hosting for small business india; best website creator for small business india
- **website for restaurant** G: ~ booking usa; ~ bookings crossword clue; ~s bookings; ~ jobs; ~ bookings america | B: ~ bookings; ~ reservations
- **website for clinic** G: ~al trials; ~al studies; website for dental clinic; website for mayo clinic; website for cleveland clinic | B: ~al trials; clinicaltrials gov website
- **website for doctors** G: ~ appointment; ~ note; ~ reviews; ~ without borders; websites for doctors in india | B: website for doctor ratings; website for doctor reviews
- **one page website** G: ~ template; ~ template free; ~ examples; ~ design; ~ cost | B: ~ template; ~ examples
- **landing page design** G: ~ templates; ~ figma; ~ ideas; ~ inspiration; ~ ai | B: ~ ideas; ~ templates
- **ecommerce website development** G: ~ cost in india; ~ services; ~ agency; ~ company in mumbai; ~ course | B: ~ services; ~ company
- **website in 48 hours** G: where is 48 hours; is 48 hours 2 days; 48 hour forecast | B: 48 hours official website; what is 48 hours from now; website in 24 hours
- **cheap website design india** G: low cost website design india; what is the average cost of website design in india; cost of website design uk; cheapest website in india | B: cheap website design company india; cheap ecommerce website design india; website design in india
- **best website designer near me** G: best website developer near me; top rated website designer near me; top rated website developer near me; best web design near me; where to buy designers for cheap | B: ~ cost; ~ reviews; ~ portfolio
- **website developer near me** G: ~ with fees; ~ freelancer; ~ open now; ~ within 1.6 km; ~ within 800m | B: ~ reviews; ~ freelance
- **business website price** G: ~ in india; ~ in pakistan; commercial website price; company website price; corporate website price | B: business website privacy laws; business website privacy policy template; business website privacy policy checklist
- **website design company in ahmedabad** G: web design company in ahmedabad; web designing company in ahmedabad for fresher; ecommerce ~; website design & development company in ahmedabad; static ~ | B: website designing company in ghaziabad; web development company in ahmedabad
- **website design vadodara** G: web design company vadodara; best website design in vadodara; web design charges; what is the average cost of website design in india | B: at design studio vadodara website
- **website design valsad** G: - | B: -
- **website design vapi** G: web design vapi; website design company in vapi | B: website design capital allowances; website design kapiti
- **website redesign** G: ~ ai; ~ case study; ~ ai free; ~ cost; ~ rfp | B: ~ near me; ~ services
- **website maintenance charges** G: ~ in india; ~ tds rate; ~ hsn code; website maintenance cost; website maintenance cost per month | B: ~ tds rate; tds on ~
- **google business profile website** G: ~ login; ~ builder; ~ link; ~ free; ~ not approved | B: ~ login; ~ builder

</file>

<file path="docs/spec/redesign-v4-showcase.md">
# Redesign v4 — "showcase" (site + admin) — locked 2026-11-10

Approved by the owner with "go for all do not stop until everything is done" on the spec-lock table below.
Supersedes `redesign-v3-motion.md` for the visual layer. Content rules are unchanged: prices, splits and delivery
terms come only from `src/lib/offer.ts`; demos stay fictional and labelled; no invented reviews, clients or results.

## Why
The owner rated the restrained v3 (Horeca-led, ivory/vermilion) "not worth it". SiteBlitz sells websites, so its own
site is the portfolio piece: a visitor must think "if their own site is this impressive, imagine what they will build
for us". Reference level: award-agency WebGL showcases. Speed is kept by deferring and falling back, not by cutting.

## References (owner-approved)
| Role | Site | Award | Taken |
|---|---|---|---|
| Main | https://landonorris.com | Awwwards Site of the Year 2025 + Users' Choice | dark ground + one neon accent, giant mixed serif/sans type, scroll-drawn neon strokes, drifting photo collage, hall-of-fame grid, page transitions |
| 3D moment | https://lusion.co | Awwwards Site of the Year 2023 | one interactive WebGL canvas reacting to cursor/finger; all text stays HTML |
| Services | https://akaru.fr | Awwwards Site of the Month Apr 2024 | sideways colour panels for the offer |
| Admin | https://linear.app · https://vercel.com/products/observability · https://visitors.now | products | command bar, shortcuts, live globe, KPI cards with sparklines, status board |

## Website — locked values
| # | Item | Locked value |
|---|---|---|
| 1 | Palette | void #0A0A0C · surface #121216 · raised #1A1A20 · ink #F5F5F0 (18.1:1 on void) · muted #9B9BA3 (7.2:1) · faint #81818F (5.2:1) · volt #CCFF00 (16.8:1) · volt-dim #A3CC00 · line rgba(245,245,240,.08). Site and admin share one set. Text on volt is void. |
| 2 | Fonts | Mona Sans variable (wght 200–900, wdth 75–125) for display: weight 800, width 125%, uppercase, line-height .9. Instrument Serif italic (lowercase) for accent words. DM Sans 400/600 for body. |
| 3 | Preloader | First page of a browser session only (sessionStorage). Counter 0→100 in 0.9 s, curtain lifts in 0.3 s: ≤ 1.2 s total. Pure CSS animation, so it hides itself even if JS fails. None under reduced motion. Public pages only. |
| 4 | 3D hero | WebGL point particles form the SITEBLITZ wordmark (same font/size as the static HTML wordmark it replaces, so the hand-off is seamless). Cursor/finger scatters them (spring physics). On scroll the hero pins and the particles flow into the phone screen of the showroom concept, taking its pixel colours; the real screenshot then fades in. 20,000 particles ≥ 768 px, 6,000 below. Static poster (same layout) when: reduced motion, no WebGL, `isLowPowerDevice()`. Loads after idle; pauses off-screen and in hidden tabs. |
| 5 | Hero text | Kicker "Gujarat-based · serving businesses across India"; h1 "Websites people *remember.*"; fact "From ₹7,999 · {launch pages} · {launch delivery}" from offer.ts; buttons "Chat on WhatsApp" (volt, magnetic) and "See the concepts". |
| 6 | Signature lines | 3 volt SVG strokes drawn by scroll (scrub): under the statement's key phrase, a loop round the giant price, a path linking the process steps. 3 px desktop, 2.5 px phone. |
| 7 | Demo showcase | (a) Drift: 9 frames (3 desktop captures, 3 phone captures, 3 photos) moving at different parallax speeds round a giant heading. (b) Hall of fame: 3 large cards that rise in on a pinned section; hovering a card pans its full-page desktop capture (6 s) and the cursor reads VIEW; tap/click opens `/demo/{id}`. |
| 8 | Packages | Pinned sideways track of 5 panels (intro, Launch, Business on volt ground, Custom, terms). 42vw desktop / 86vw phone. Mouse drag on the track scrolls it (cursor DRAG). Prices from offer.ts. Vertical stack under reduced motion or screens < 540 px tall. |
| 9 | Cursor | Desktop fine pointers only: 8 px volt dot + 36 px ring (lerp 0.18). Links/buttons: ring 56 px. `[data-cursor="view"]` / `"drag"`: 96 px volt disc with the word in void. Native cursor kept on inputs. None under reduced motion. Magnetic pull 0.3 on primary buttons. |
| 10 | Page change | Volt curtain with the wordmark: covers 0.4 s, route changes, lifts 0.4 s (0.8 s). Internal same-tab links only; failsafe lift after 3 s. None under reduced motion. |
| 11 | Phones / reduced motion | Every section readable static HTML. Phones get the same scenes with lighter values; reduced motion shows everything static and visible. `?motion=force` is the QA override. |

### Home scene order
1 hero (particles → phone) · 2 statement + stroke · 3 giant price + loop · 4 drift collage · 5 hall of fame ·
6 packages track · 7 process + path · 8 "See it before you pay" assemble · 9 FAQ · 10 close (turns volt) · footer.

## Admin — locked values (every feature in `docs/audit/admin-inventory-2026-11-10.md` kept)
| # | Item | Locked value |
|---|---|---|
| 12 | Command bar | Ctrl/⌘+K: jump to any of the 12 pages, search leads (→ `/admin/leads?q=`), quick-add, view site, sign out. Shortcuts G then T (Today), G then L (Leads), G then O (Overview), N (new lead). Ignored while typing in a field. |
| 13 | Live | COBE globe (WebGL, ~5 KB) with a dot per active visitor (country/city centroid table), auto-rotating; existing visitor list and 30-min stream kept. Static list only if WebGL fails. |
| 14 | Leads | List / Board toggle (remembered in localStorage). Board = one column per status; drag a card to another column → same optimistic PATCH as the status select. List view unchanged in features. |
| 15 | Overview | KPI cards count up (0.9 s) with sparklines from the traffic series; area chart restyled from tokens (no hex in components). |
| 16 | Phone use | < 768 px: bottom tab bar Today · Leads · Add · Live · More (sheet with all 12 items). Visitors drawer: role=dialog, Esc closes, focus trapped and restored. `aria-current="page"` on the active item; icon-only links get accessible names. |

## Acceptance criteria (binary)
- [ ] `npm test` (hookTimeout 60 s on a loaded machine) and `npm run build` exit 0.
- [ ] 12 public pages at 320/390/1440: no horizontal overflow, no console errors (`scripts/shoot.mjs`).
- [ ] Reduced-motion screenshots of `/`: every section visible, no blank pinned space.
- [ ] Hero: WebGL canvas present with 20,000 particles at 1440 and 6,000 at 390 (read from `data-count`); static poster under reduced motion.
- [ ] Hero morph captured at scroll 0 / mid / end; the end frame shows the showroom screenshot in the phone.
- [ ] Preloader appears on the first load of a session and not on the second; gone by 1.3 s.
- [ ] Page transition: curtain visible mid-navigation, page usable after.
- [ ] Admin: all 12 nav items render at 390 and 1440 with the session cookie; Ctrl+K opens the palette; board view renders all statuses; Live renders a globe canvas; drawer closes on Esc.
- [ ] Lab LCP on `/` ≤ 2.5 s, CLS ≤ 0.1 (`scripts/vitals.mjs`; TBT reported, machine load noted).
- [ ] Committed per unit as `<area>: <what changed>` on `v2-redesign`; push attempted.

## Out of scope
Inner page layouts (P-INNER) beyond what the token change gives them; new copy claims; analytics/data model changes;
middleware or auth changes; new paid services.

</file>

<file path="src/app/layout.tsx">
import type { Metadata, Viewport } from "next";
import { DM_Sans, Instrument_Serif, Mona_Sans } from "next/font/google";
import { SITE } from "@/lib/site";
import { FROM_PRICE, inr } from "@/lib/offer";
import { Tracker } from "@/components/site/Tracker";
import "./globals.css";

/* Redesign v4 (docs/spec/redesign-v4-showcase.md): Mona Sans, variable in weight and width, for display type (800,
   125% wide); Instrument Serif italic for accent words; DM Sans for text. Mona Sans takes latin-ext as well so the
   rupee sign (U+20B9) can come from it; the browser only fetches that subset when a page needs it (unicode-range). */
const mona = Mona_Sans({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-mona",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-dm",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `Business Websites from ${inr(FROM_PRICE)} — SiteBlitz, Gujarat`,
    template: "%s — SiteBlitz",
  },
  description:
    `Professional, mobile-friendly websites for local businesses. See working demos, know the price upfront (from ${inr(FROM_PRICE)}, no hidden charges) and review a homepage concept before you pay. Gujarat-based, serving all of India.`,
  keywords: [
    "website development India",
    "business website design",
    "fast website delivery",
    "SEO website agency",
    "freelance web developer India",
    "landing page design",
  ],
  authors: [{ name: "SiteBlitz" }],
  creator: "SiteBlitz",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "SiteBlitz",
    locale: "en_IN",
    url: SITE.url,
    title: `Business Websites from ${inr(FROM_PRICE)} — SiteBlitz`,
    description:
      "See working website demos, know the price upfront and review a homepage concept for your business before you pay.",
  },
  twitter: {
    card: "summary_large_image",
    title: `Business Websites from ${inr(FROM_PRICE)} — SiteBlitz`,
    description: "Working demos, upfront prices, and a homepage concept to review before you pay.",
  },
  verification: {
    google: "[REDACTED]",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE.url}/#organization`,
  name: "SiteBlitz",
  description:
    "Website studio building professional, mobile-friendly business websites with upfront pricing.",
  url: SITE.url,
  ...(SITE.emailLive ? { email: SITE.email } : {}),
  telephone: SITE.phone,
  // Region only: no street or city is published (truthful-location rule, FD-22).
  address: {
    "@type": "PostalAddress",
    addressRegion: SITE.region,
    addressCountry: "IN",
  },
  areaServed: "IN",
  priceRange: "₹₹",
  // sameAs left out until verified external profiles exist (an empty list says nothing)
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the Preloader's inline script marks <html data-seen> before React hydrates
    <html lang="en" className={`${mona.variable} ${dmSans.variable} ${instrument.variable}`} suppressHydrationWarning>
      <body>
        {/* without JS, reveal-on-scroll elements must simply be visible */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}.hero-v4{height:auto !important}.hero-stage{position:relative !important;height:auto !important}.hero-screen{min-height:100svh !important}.hero-b{position:relative !important;padding:10vh 0 !important}.hero-a,.hero-b-copy,.hero-shot,.hero-bezel{opacity:1 !important;visibility:visible !important;transform:none !important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        {children}
        <Tracker />
      </body>
    </html>
  );
}

</file>

<file path="src/app/sitemap.ts">
import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { DEEP_SERVICES, BLOG_POSTS, INDUSTRY_LANDERS } from "@/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (
    path: string,
    priority: number,
    changeFrequency: "daily" | "weekly" | "monthly" = "weekly"
  ) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    page("", 1.0),
    page("/work", 0.9),
    page("/services", 0.9),
    ...DEEP_SERVICES.map((s) => page(`/services/${s.slug}`, 0.85)),
    page("/pricing", 0.9),
    page("/process", 0.8),
    page("/website-in-48-hours", 0.85),
    page("/tools/grader", 0.8),
    ...INDUSTRY_LANDERS.map((l) => page(`/for/${l.slug}`, 0.75)),
    page("/blog", 0.7),
    ...BLOG_POSTS.map((p) => page(`/blog/${p.slug}`, 0.65, "monthly")),
    page("/contact", 0.8),
    page("/book", 0.8),
    page("/about", 0.7),
    page("/proof", 0.6, "daily"),
    page("/privacy", 0.3, "monthly"),
    page("/terms", 0.3, "monthly"),
    page("/refunds", 0.3, "monthly"),
  ];
}

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
    de
[truncated]
</file>
</project_context>

<topic>
# Topic

## The owner's words (Hinglish, translated faithfully)
"The SiteBlitz site running on localhost:3100 was made mainly as a single-page site, but I want multi-page, like
the old version on GitHub. The design is better now, but you can make it far better. Keep this same theme.
Some places still have no animations - analyse and add them. The most important thing is search engine
optimisation: when anyone searches Google for anything about website development, our website should come at
the top. It must come for the name SiteBlitz, and even if someone misspells SiteBlitz it must still come.
Find which searches people really make on Google, Brave and other engines, and rank the site for all those
keywords, number 1, so that as much traffic as possible comes. Also performance."

## Agenda
1. Information architecture: the exact page list, URLs and main nav for a real multi-page site in the v4 theme (the live v2 had Work / Services / Pricing / Proof / Studio / Contact); which of the 10 home scenes stay on home and which move to their own page.
2. Keyword map: one primary query + 2-3 secondary per page, chosen from the autocomplete evidence; which queries a new Gujarat studio can realistically win in 3-6 months and which belong to directories, big agencies or ads.
3. City pages: should SiteBlitz publish service pages for Surat / Navsari / Vadodara / Ahmedabad / Vapi (all show live autocomplete demand), given the truthful-location rule ("based in Gujarat", founder in South Gujarat) and Google's doorway-page policy - and if yes, exactly what makes each page non-doorway.
4. Brand name #1 including misspellings (Site Blitz, sitblitz, siteblits, sight blitz): domain choice, entity signals (Organization schema alternateName, sameAs, Google Business Profile, directories), Search Console + Bing Webmaster steps, and the clash with StackBlitz and a French "SiteBlitz" company.
5. Technical SEO for the Next.js build: per-page title/H1/meta, BreadcrumbList / Service / FAQ / WebPage schema, sitemap lastModified (today it is the build time for every URL), internal linking, OG images, llms.txt, Hindi/Hinglish content for queries like "website banane ka kharcha".
6. Performance budget for the new pages: what each inner page may load (the WebGL hero stays home-only), the home TBT of 364 ms (lab, 4x CPU), page-curtain transitions vs INP, and the CWV targets per page.
7. Motion on inner pages: exactly which v4 scene or entrance each page gets (hero entrance + 1-2 moments), with the phone and reduced-motion versions, without copying the home.

## My (Claude Code's) starting position, so you have something to attack
- Nav: Work, Services, Pricing, Process, Studio, + volt WhatsApp button; Contact and Insights in the footer and the
  phone sheet. Home keeps hero, statement, giant price, concept wall (3 cards) and close; each other scene becomes
  the hero moment of its own page (packages track -> /pricing, process path -> /process, drift collage -> /work).
- Winnable in 3-6 months: the brand name, "website design surat/navsari" long tail, cost questions ("website
  development cost in india 2026", "business website price in india", "website banane ka kharcha kitna aata hai"),
  vertical pages ("website for dental clinic", "restaurant website design india"). Not winnable soon: bare
  "website development", "website developer near me" (map pack needs a Google Business Profile).
- City pages only where something real differs (served by the same founder in person, local examples, travel
  time, Gujarati/Hindi support) - otherwise one /gujarat page. Founder must approve naming Navsari publicly.
- Brand: buy siteblitz.in before anything else; alternateName ["Site Blitz"] in Organization schema; no hidden
  misspelling text; a Google Business Profile (service-area business, address hidden) is the strongest single signal.

Answer each agenda point by number: agree / disagree because ... / need data: ... . End with the list of points still open.
</topic>
