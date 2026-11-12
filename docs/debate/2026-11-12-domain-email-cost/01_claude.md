You are reviewing this developer's project.

<project_context>
<file path="E:/Temp/SiteBlitz/docs/debate/2026-11-12-domain-email-cost/brief.md">
# Brief - SiteBlitz founder constraints relevant to domain and email (2026-11-12)

- SiteBlitz is a two-person web-design studio in Gujarat, India (founder + one friend). No paying client yet.
- The founder is **not GST-registered** - any 18 % GST paid is a real cost (no input tax credit).
- Budget stated on 2026-11-01: "pay for the domain only - no mailbox and no paid tools". The founder now asks for an honest
  comparison of the normal (paid) way vs an optimised way, so paid options may be shown, with exact cost.
- Website: Next.js 15 marketing site + admin panel. Deployed on Vercel today (Hobby plan, which is non-commercial); the agreed
  move is Netlify Free. No custom domain is connected yet; the site uses https://siteblitz.vercel.app.
- The site code shows the address `[REDACTED]`, but only after a flag `emailLive` is flipped following a real
  send/receive test (src/lib/site.ts). The site itself sends NO email (no mail library); lead alerts go to Telegram.
- The founder has a personal Gmail account and wants a "business Gmail" feel (e.g. [REDACTED]) plus extra
  addresses (aliases) such as support@ / billing@ / ads@.
- A DNS lookup on 2026-11-12 returned NXDOMAIN for siteblitz.in (no nameservers) - availability still to be confirmed at
  the registry/registrar.
- Payment: Indian debit/credit card or UPI. USD billing means an international-enabled card and forex mark-up.
- Wanted output: a comparison table "normal way: costs X, gives these features" vs "optimised way: reliable, effective,
  costs Y", with exact INR (incl. GST) per year, and how many aliases each gives and whether they cost extra.

</file>
</project_context>

<topic>
# Topic

The owner's words (2026-11-12, Hinglish, lightly cleaned): "If I am buying the siteblitz.in domain, what will be the cost,
and how do I buy a business Gmail for it? Can I make aliases on that business domain - if yes, how many, and does it
cost? Research this autonomously - both of you - and give a perfect, accurate output: a comparison that the normal way
costs X and gives these features, and the alternative way that is well optimised, reliable and effective."

Research independently first. Use current (November 2026) official pricing pages where you can, give the source URL for
every price and limit, and say "unverified" where you could not open an official page. Prices in INR including 18 % GST
(the buyer is not GST-registered). Do not guess numbers.

## Agenda

1. Domain: is siteblitz.in still free to register, and what is the real total cost (year 1, then 3 years) at the main
   registrars (Indian: GoDaddy, Hostinger, BigRock; foreign: Porkbun, Namecheap, Spaceship, Cloudflare if it supports .in),
   including 18 % GST for a buyer who is NOT GST-registered and the card forex charges on USD billing? Which one to buy?
2. Business email "normal way": Google Workspace in India - which plan (Base / Starter), exact INR per user per month
   (annual vs flexible), GST, what you actually get (custom-domain Gmail, storage, apps), trial terms.
3. Business email "optimised way" (free or near-free): receive with Cloudflare Email Routing (or ImprovMX / Forward Email)
   into the existing personal Gmail, and send as [REDACTED] from Gmail via SMTP. Which SMTP (Gmail's own
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

Answer each agenda point by number: agree / disagree because ... / need data: ... . End with the list of points still open.
</topic>
