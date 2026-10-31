# D1 — Claims-provenance and tracking audit

Date: 2026-10-31 · Branch `v2-redesign` · Read-only phase · Labels: VERIFIED · OWNER-STATED · INFERRED · UNKNOWN

## Headline findings

1. **The four "case studies" are not evidenced as client work, and their images are AI-generated mockups that show
   different brands.** VERIFIED by opening each image:
   - `portfolio-1.png` (shown as "Spice Route Kitchen") shows a site for "NOCTURNE BISTRO" with garbled menu text.
   - `portfolio-2.png` (shown as "Meadow Health Clinic") shows "Sprenahn Medical Clinic" with *lorem ipsum* body text.
   - `portfolio-4.png` (shown as "Verma & Associates") shows "LOGO LAW FRMD" and garbled text.
   No client brief, contract, analytics export, permission or URL exists anywhere in the repo. The results attached to them
   (2.4×, page 1 for 8 keywords, 38%, 3×, "11 seconds") have no recorded source.
2. **The same client stories are repeated in 15 long-form JSON files**, often in the first person ("When we rebuilt …",
   "a fashion label we work with"), and several sit next to "every claim we make … is public at /proof".
3. **`/proof` claims more than it shows.** `src/app/proof/page.tsx:15` says "Every claim on this site is verifiable here."
   `/proof` shows this site's own traffic, real-user Core Web Vitals and deploy time — nothing about client results.
4. **Five named testimonials have no provenance.** They name people tied to the four unevidenced clients
   (e.g. "Adv. Nikhil Verma, Managing Partner, Delhi" ↔ "Verma & Associates").
5. **`/privacy` does not match runtime behaviour** (see Tracking below).

Owner disposition is pending for every row. Under the owner's "go for all" (2026-10-31), the agreed rule applies:
unsupported claims are withheld from publication (C1) until evidence is supplied. Nothing is deleted from history;
every removed sentence is recoverable from git.

## Register

| # | Claim (published wording) | Where | Evidence | Status | C1 action |
|---|---|---|---|---|---|
| 1 | "Spice Route Kitchen … 2.4× more table bookings in 60 days" | `site.ts:136-145`; lander-restaurants; post-google-business-profile…; post-what-a-small-business…; post-why-website-speed…; service-ecommerce-and-booking | none; image shows another brand | UNSUPPORTED | withhold |
| 2 | "Meadow Health Clinic … first page of Google for 8 local keywords" | `site.ts:146-155`; lander-clinics; post-generative-engine…; post-google-business-profile…; post-landing-page-vs-website…; post-what-a-small-business…; service-seo-and-geo | none; image shows lorem ipsum | UNSUPPORTED | withhold |
| 3 | "Noir Atelier … 11 seconds → 38% lift in catalogue enquiries" | `site.ts:156-165`; lander-boutiques; post-landing-page-vs-website…; post-website-cost-india…; post-what-a-small-business…; post-why-website-speed…; service-ecommerce-and-booking; service-landing-pages; service-project-rescue | none | UNSUPPORTED | withhold |
| 4 | "Verma & Associates … consultation requests up 3× in one quarter" | `site.ts:166-175`; lander-law-firms; post-landing-page-vs-website…; post-what-a-small-business…; service-business-websites | none; image shows "LOGO LAW FRMD" | UNSUPPORTED | withhold |
| 5 | Portfolio images 1-4 presented as "website by SiteBlitz" | `WorkGallery.tsx`, `work/page.tsx`, landers, services | AI-generated mockups with garbled / lorem text | VERIFIED not client work | remove from display |
| 6 | Five named testimonials | `site.ts:212-238`, `sections/Testimonials.tsx` | none | UNSUPPORTED | withhold |
| 7 | "100% On-time launches" | `sections/Stats.tsx:8` | no delivery records | UNSUPPORTED | replace |
| 8 | "Every claim on this site is verifiable here." | `proof/page.tsx:15` | `/proof` shows own analytics only | INACCURATE | reword |
| 9 | "Real business websites by SiteBlitz … with measurable results" (meta) | `work/page.tsx:9-11` | — | UNSUPPORTED | reword |
| 10 | "48-hour delivery" / "Fastest full delivery 48h" | `site.ts:3, 33`; `Stats.tsx:6` | the owner's offer | OWNER-STATED commitment | keep |
| 11 | "Mobile-first, blazing fast (90+ Lighthouse)" / "90+ Lighthouse performance" | `site.ts` plans; `Stats.tsx:7` | a build target the owner sells | OWNER-STATED commitment | keep (owner to confirm) |
| 12 | "24/7 WhatsApp support" | `Stats.tsx:9` | — | OWNER-STATED commitment | keep (owner to confirm) |
| 13 | "indexing and a healthy foundation are guaranteed" | `site.ts:120` | — | OWNER-STATED commitment | keep (owner to confirm) |
| 14 | Live visitor count, weekly visitors, real-user LCP/CLS, last deploy | `ProofStrip.tsx`, `/proof` | first-party data from `/api/proof` | VERIFIED mechanism | keep |

## Tracking vs disclosure

| Item | Runtime behaviour (VERIFIED) | `/privacy` says | Gap |
|---|---|---|---|
| `sb_sid` | httpOnly, 30-min idle session id (`api/track/route.ts:61`) | "a short-lived session cookie" | none |
| `sb_vid` | httpOnly, **1-year** visitor id (`api/track/route.ts:68`) | "an anonymous visitor cookie" | duration not disclosed |
| Geography | city, region, country, timezone from Vercel headers stored per session (`route.ts:83-86`); IP truncated to /24 before storage (`route.ts:33-35`) | "approximate location (country/city derived from IP)", "IP addresses are truncated" | none (corrected 2026-10-31: first draft wrongly said undisclosed) |
| Retention | no TTL index in `src/lib/models.ts` or anywhere in `src/`; raw per-session/pageview rows kept indefinitely (production Atlas indexes not checked) | "Analytics data is kept in aggregate" | **inaccurate** |
| Content | random ids + page paths + referrer/UTM + device + vitals | "random identifiers only — no personal information" | partly inaccurate: a persistent id + city is pseudonymous personal data under most regimes (check with counsel) |
| User control | no opt-out, no Do-Not-Track / Global Privacy Control handling | "You may request deletion" | no self-serve control |

C1 corrects the wording; PR1 adds the behaviour (retention + honouring a browser opt-out signal).

## Not checked (and why)

- Production MongoDB indexes and env vars — no production credentials used in this audit.
- Whether the current **production** deployment (2026-07-10) carries the same claims — it predates `v2-redesign`
  but was built from the same lineage; the C1 patch reaches production only at release (L1).
