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
