# Agenda - siteblitz.in domain + business email + aliases - 2026-11-12

1. Domain: is siteblitz.in still free to register, and what is the real total cost (year 1, then 3 years) at the main
   registrars (Indian: GoDaddy, Hostinger, BigRock; foreign: Porkbun, Namecheap, Spaceship, Cloudflare if it supports .in),
   including 18 % GST for a buyer who is NOT GST-registered and the card forex charges on USD billing? Which one to buy?
2. Business email "normal way": Google Workspace in India - which plan (Base / Starter), exact INR per user per month
   (annual vs flexible), GST, what you actually get (custom-domain Gmail, storage, apps), trial terms.
3. Business email "optimised way" (free or near-free): receive with Cloudflare Email Routing (or ImprovMX / Forward Email)
   into the existing personal Gmail, and send as name@siteblitz.in from Gmail via SMTP. Which SMTP (Gmail's own
   smtp.gmail.com with an app password, or a DKIM-signing relay such as Resend / Brevo / Amazon SES) gives SPF/DKIM/DMARC
   alignment and real inbox placement? What breaks, and what does it cost?
4. Cheap paid middle ground: Zoho Mail Forever Free (is it still open to new India sign-ups, web-only?), Zoho Mail Lite,
   Workspace Base - exact INR and limits.
5. Aliases: how many, and at what cost, on each option (Workspace aliases per user, groups, alias domains; Cloudflare
   routing rules and catch-all; Zoho). Which addresses a one-person web studio actually needs.
6. DNS: one setup that serves the website (Vercel today, Netlify Free planned) and email together - where the nameservers
   live, which records (MX, SPF, DKIM, DMARC), and WHOIS privacy for .in.
7. Final recommendation for this founder: exact INR per year for the normal way vs the optimised way, the risks of each,
   and the trigger to upgrade later.
