# Brief - SiteBlitz founder constraints relevant to domain and email (2026-11-12)

- SiteBlitz is a two-person web-design studio in Gujarat, India (founder + one friend). No paying client yet.
- The founder is **not GST-registered** - any 18 % GST paid is a real cost (no input tax credit).
- Budget stated on 2026-11-01: "pay for the domain only - no mailbox and no paid tools". The founder now asks for an honest
  comparison of the normal (paid) way vs an optimised way, so paid options may be shown, with exact cost.
- Website: Next.js 15 marketing site + admin panel. Deployed on Vercel today (Hobby plan, which is non-commercial); the agreed
  move is Netlify Free. No custom domain is connected yet; the site uses https://siteblitz.vercel.app.
- The site code shows the address `hello@siteblitz.in`, but only after a flag `emailLive` is flipped following a real
  send/receive test (src/lib/site.ts). The site itself sends NO email (no mail library); lead alerts go to Telegram.
- The founder has a personal Gmail account and wants a "business Gmail" feel (e.g. hello@siteblitz.in) plus extra
  addresses (aliases) such as support@ / billing@ / ads@.
- A DNS lookup on 2026-11-12 returned NXDOMAIN for siteblitz.in (no nameservers) - availability still to be confirmed at
  the registry/registrar.
- Payment: Indian debit/credit card or UPI. USD billing means an international-enabled card and forex mark-up.
- Wanted output: a comparison table "normal way: costs X, gives these features" vs "optimised way: reliable, effective,
  costs Y", with exact INR (incl. GST) per year, and how many aliases each gives and whether they cost extra.
