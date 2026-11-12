# Review - siteblitz.in domain + business email + aliases - 2026-11-12 - 1 round - prompt: none (project brief only)

Round 1 was sent twice: the first ChatGPT tab froze mid-answer and a temporary chat cannot be reopened, so the reply was
lost; the resend answered in about 15 minutes (`01_chatgpt.md`). Claude's independent research is in `claude-research.md`.
Every disputed fact below was re-checked against the primary source. No second round: the points still open need a real
checkout or sign-up, which neither side can do.

All INR figures include 18 % GST (the founder is not GST-registered). Workspace "per year" = 12 paid months.

| # | Point | Proposed by | Evidence | Claude's verdict | Status |
|---|---|---|---|---|---|
| 1 | siteblitz.in availability is "unverified" | ChatGPT r1 | `.IN` registry RDAP `rdap.nixiregistry.in/rdap/domain/siteblitz.in` (server from IANA bootstrap) answered "Domain siteblitz.in is available for registration" on 2026-11-12 | rejected - verified available at the registry (a registrar checkout can still differ if someone registers it first) | closed |
| 2 | Hostinger .in registration is 549 INR (year 1 = 647.82 incl. GST) | ChatGPT r1 | Hostinger India table (`hostinger.com/in/domain-name-search`, raw HTML): ".in ... ₹899 /1st yr, ₹1 With 3-year term, renews ₹899/yr, Transfer ₹549" | rejected - 549 is the TRANSFER price. One year = 899 + GST = **1,060.82**; ChatGPT's year-1 and 3-year totals built on 549 are too low by 413 INR | closed |
| 3 | 3-year promo: 1 + 899 + 899 + GST = 2,122.82 upfront (GoDaddy; Hostinger has the same 1-INR-with-3-year offer) | ChatGPT r1 + Claude | Hostinger table (above); GoDaddy page blocks automated reads | agreed for Hostinger's structure; GoDaddy figure unverified; confirm the cart total | closed |
| 4 | Porkbun 7.83 USD reg/renew/transfer | both | Porkbun pricing API | agreed | closed |
| 5 | Spaceship 5.97 USD, Namecheap 9.98/11.98 USD, BigRock 549/729 or 579/899 INR | ChatGPT r1 | pages return 403 to Claude's reads | open - unverified by Claude; BigRock contradicts itself | open |
| 6 | No exact INR for USD registrars without the real card rate and fee | ChatGPT r1 | rate 93.69-93.85 INR/USD (ECB / open.er-api, 11-12 Nov); card mark-up varies by card | agreed in part - estimate only, not a quote | closed |
| 7 | Cloudflare Registrar cannot register .in; Cloudflare DNS still works | both | `cloudflare.com/tld-policies/` | agreed | closed |
| 8 | **.in forbids privacy/proxy registration; e-KYC is mandatory** | ChatGPT r1 | `registry.in/kyc-mandatory` ("KYC is mandatory - as per guidelines by CERT-IN under Section 70B, IT Act 2000"); registry terms for registrants (proxy not allowed, via search extract); registry RDAP for google.in / hostinger.in redacts Registrant Name, Email, Street, City, Postal Code publicly | agreed - this voids Claude's "Porkbun for free privacy" reason; the public lookup already hides name and address. Buy from an Indian registrar that runs the NIXI e-KYC | closed |
| 9 | Workspace **Business Base**, not Starter | both | Google India pricing page: Base 99, Starter 270 INR/user/month (annual), "does not include tax"; Base max 20 users, 20 GB pooled, custom business email | agreed: Base = 1,401.84/yr; Starter = 3,823.20/yr | closed |
| 10 | Base intro: 14-day trial, then 50 % off for 3 months (49.50) | Claude | Google India pricing page HTML: "Base 50% off for 3 months ... 25 Nov 2026 - 25 Feb 2027 ₹49.50, then ₹99" | agreed with ChatGPT's caveat that promos are not lifetime: year 1 = 1,226.61 if the promo applies at sign-up, else 1,401.84 | closed |
| 11 | Flexible plan: Base 120, Starter 325 INR/user/month | ChatGPT r1 | not present in the page HTML Claude retrieved (annual view only, "Save 16%") | open - plausible (99/120 matches the advertised saving), unverified | open |
| 12 | Gmail "Send as" for non-Google addresses ends January 2027; new setups may be restricted now | both | `support.google.com/mail/answer/22370` and `/answer/17101213` | agreed - the popular free "Cloudflare forwarding + Gmail Send as" setup is a dead end | closed |
| 13 | Personal smtp.gmail.com + app password does not give DMARC alignment for siteblitz.in | ChatGPT r1 | DMARC needs aligned SPF or DKIM; Gmail signs as gmail.com | agreed | closed |
| 14 | DIY free design: Cloudflare Email Routing in, Resend SMTP out (100/day, 3,000/month free) via Thunderbird | ChatGPT r1 | Resend pricing page; Cloudflare routing limits | agreed it works technically; rejected as the founder's main option - two systems, a desktop client, easy to reply from the personal address | closed |
| 15 | Zoho Forever Free is the cleanest domain-only option, if offered at sign-up | ChatGPT r1 | Zoho page: 1 domain, 5 users, 5 GB/user, no IMAP/POP/ActiveSync, "available only in select data centers" | agreed; eligibility for a new India account unverified | open |
| 16 | Zoho Mail Lite 59 INR/user/month | Claude (partner pages) | Zoho's page loads prices by script | open - Claude's figure is partner-sourced, not verified on Zoho's page | open |
| 17 | Aliases: Workspace 30 per user free; Zoho 30 addresses per mailbox; Cloudflare 200 rules + catch-all | both | Google alias help ("up to 30 email aliases for each user at no extra cost"); Cloudflare limits page; Zoho limit per ChatGPT | agreed (Zoho count not checked by Claude) | closed |
| 18 | DNS: registrar, DNS, website host and mail provider can be different companies; one MX set only | ChatGPT r1 | Cloudflare/Netlify external DNS docs (per ChatGPT) | agreed; with Workspace the registrar's own DNS is enough | closed |

## Corrected cost comparison (1 user, incl. 18 % GST)
| Way | Year 1 | Each later year | 3 years | Gives |
|---|---|---|---|---|
| Normal: domain 1 yr at a time + Workspace Starter | 4,884.02 | 4,884.02 | 14,652.06 | Gmail on @siteblitz.in, 30 GB, Gemini |
| **Recommended: Hostinger 3-year .in + Workspace Base (annual)** | 3,524.66 upfront (2,122.82 domain for 3 yrs + 1,401.84) | 1,401.84 | **6,328.34** | Same Gmail inbox and apps, 20 GB, 30 free aliases |
| Same, domain bought 1 year at a time | 2,462.66 | 2,462.66 | 7,387.98 | as above, no 3-year lock |
| Domain only + Zoho Forever Free (if offered) | 1,060.82 (or 2,122.82 for 3 yrs) | 1,060.82 | 2,122.82-3,182.46 | Zoho web/app mailbox, 5 GB, not the Gmail app |
Google's 3-month half-price offer, if it applies at sign-up, takes 175.23 off year 1.

## Recommended next steps (not started - waiting for your go)
1. Buy siteblitz.in at Hostinger India (3-year term, ~2,123 INR; pay by UPI/card in INR); complete the NIXI e-KYC within the
   registrar's window; real name and address (the registry hides them from public lookup; privacy services are not allowed).
2. Start Google Workspace Business Base (14-day trial) with the existing domain; create hello@siteblitz.in.
3. Add Google's verification, MX, SPF, DKIM and DMARC (p=none to start) records at the registrar DNS.
4. Add aliases support@, billing@ (ads@ when an ad account needs it) - Admin console, Directory, Users, Add Alternate Emails.
5. Send and receive a real test with a Gmail and an Outlook recipient; then flip `emailLive` in `src/lib/site.ts`.

## Points still open
- Exact checkout totals (Hostinger 3-year cart, GoDaddy, BigRock, Spaceship, Namecheap).
- Workspace flexible INR price; whether the half-price intro applies to this account.
- Zoho Forever Free availability for a new India account; Zoho Mail Lite INR price.
