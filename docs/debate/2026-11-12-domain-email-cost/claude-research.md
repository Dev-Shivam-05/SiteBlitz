# Claude's independent research - 2026-11-12 (before reading ChatGPT round 1)

Every row: what was checked, how, result. "Unverified" = no official page could be read.

| # | Fact | Source / method | Result |
|---|---|---|---|
| R1 | siteblitz.in is free to register | .IN registry RDAP `https://rdap.nixiregistry.in/rdap/domain/siteblitz.in` (server from IANA bootstrap `data.iana.org/rdap/dns.json`); DNS NS lookup | RDAP 404 "Domain siteblitz.in is available for registration"; DNS NXDOMAIN |
| R2 | Porkbun .in price | Porkbun public pricing API `POST https://api.porkbun.com/api/json/v3/pricing/get` | registration 7.83 USD, renewal 7.83, transfer 7.83; coupon AWESOMENESS 1 USD off first year (once per user). Porkbun page: free WHOIS privacy; .IN needs verifiable registrant contact or NIXI may suspend |
| R3 | Cloudflare Registrar and .in | `cloudflare.com/tld-policies/` | .in not in the supported list -> cannot buy .in at Cloudflare (DNS on Cloudflare still works) |
| R4 | Hostinger India .in price | `hostinger.com/in/domain-name-search` | 899 INR first year, or 1 INR "with 3-year term"; renewal 899 INR/yr; transfer 549. GST not shown on the page |
| R5 | GoDaddy, BigRock, Namecheap, Spaceship .in | official pages return 403 to automated reads | unverified |
| R6 | USD->INR | api.frankfurter.dev (ECB, 2026-11-11) 93.69; open.er-api.com (2026-11-12) 93.85 | use 93.85 |
| R7 | Google Workspace India prices | `workspace.google.com/intl/en_in/pricing.html` (raw HTML text) | Base 99 INR/user/month (annual), Starter 270, Standard 1,080; "does not include tax"; 14-day no-cost trial; Base shows "50% off for 3 months": 49.50 INR for 25 Nov 2026 - 25 Feb 2027 then 99 (dates look computed from today + 14-day trial); Base max 20 users, 20 GB pooled/user, custom business email, Gmail/Calendar/Meet (100)/Drive/Docs; Starter adds Gemini, 30 GB, 300 users. Flexible INR price not in the HTML (annual toggle says "Save 16%") |
| R8 | Workspace aliases | Google help `knowledge.workspace.google.com/.../add-or-delete-an-alternate-email-address-email-alias` | "You can add up to 30 email aliases for each user at no extra cost." |
| R9 | Gmail "Send mail as" for non-Google addresses | Google help `support.google.com/mail/answer/22370` and `/answer/17101213` | "Starting January 2027, Gmail will no longer support the 'Send as' feature for third-party email addresses"; Q3-Q4 2026 transition, "Gmail may restrict new configurations"; Gmailify and POP also removed; Workspace aliases and Gmail-to-Gmail not affected |
| R10 | Cloudflare Email Routing | `developers.cloudflare.com/email-routing/` and `/limits/` | available on Free plan; 200 routing rules per domain, 200 destination addresses per account, 25 MiB inbound; inbound only - outbound "Email Sending" is beta and needs Workers Paid; requires Cloudflare DNS |
| R11 | Zoho Mail Forever Free | `zoho.com/en-in/mail/zohomail-pricing.html` (raw HTML) | "Email hosting for one domain for up to 5 users, 5 GB mail storage per user, IMAP/POP/Active Sync not included ... *Available only in select data centers" |
| R12 | Zoho Mail Lite INR price | Zoho page loads prices by script (not in HTML); Zoho partner pages | 59 INR/user/month billed annually + GST (partner-sourced, unverified on Zoho's own page) |
| R13 | Resend free | `resend.com/pricing` | 3,000/month, 100/day, 3 domains, SMTP relay included |
| R14 | The website itself sends no email | `grep -ri "resend|nodemailer|smtp|..." src/` | no matches |
