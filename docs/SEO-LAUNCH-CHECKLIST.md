# SEO launch checklist — the steps only the founder can do (SEO-5, 2026-11-11)

Source: debate round 3 (`docs/debate/2026-11-10-multipage-seo-ranking/03_chatgpt.md`, R3), checked by Claude Code.
Nothing here has been done yet. Each step needs your login, your money or your decision.

## Before day 1 (blocking)
1. **Name check, then domain.** Search the name at tmrsearch.ipindia.gov.in (a French company called SiteBlitz exists:
   siteblitz.ai). If clear, buy `siteblitz.in` (unregistered on 2026-11-09; check again) in your own name.
2. **Hosting that allows business use.** Vercel Hobby is for non-commercial use (D12). Pick Vercel Pro or Netlify.
3. **Set `NEXT_PUBLIC_SITE_URL=https://siteblitz.in`** in the host's production environment. Every canonical, the
   sitemap, robots.txt, llms.txt and the JSON-LD read it. Redeploy, then 301-redirect `siteblitz.vercel.app` to it.
4. Push the branch and review the Preview on a phone (`git -C E:\Temp\SiteBlitz push origin v2-redesign`).

## Days 1–2: Google Search Console (Domain property)
1. search.google.com/search-console → Add property → **Domain** → `siteblitz.in` → copy the TXT value.
2. At the domain's DNS: add a TXT record at the root (`@`) with that value. Keep every other record. Verify. Leave it.
3. Sitemaps → submit `https://siteblitz.in/sitemap.xml`.
4. URL Inspection → `/`, `/pricing`, `/research/gujarat-business-websites-2026` → Test live URL → Request indexing.
   Once each. Asking again does not speed anything up.
- The old `google-site-verification` meta tag stays in `layout.tsx` (it verifies the vercel.app property).

## Days 2–3: Bing Webmaster Tools
1. bing.com/webmasters → **Import from Google Search Console** → choose `siteblitz.in` only.
2. Sitemaps → check it says "Success", not just "Submitted". Bing feeds ChatGPT search and Copilot.

## Days 2–4: IndexNow (Bing, Yandex, Seznam, Naver — not Google, not Brave)
The key file is already in the site: `public/1f93564764360cbcd2221f16935413ca.txt` (public by design).
```
SITE_URL=https://siteblitz.in node scripts/indexnow-manifest.mjs > current-indexnow.json
echo {} > previous-indexnow.json          # first launch only, never again
SITE_URL=https://siteblitz.in INDEXNOW_KEY=1f93564764360cbcd2221f16935413ca node scripts/indexnow.mjs current-indexnow.json previous-indexnow.json          # dry run
SITE_URL=https://siteblitz.in INDEXNOW_KEY=1f93564764360cbcd2221f16935413ca node scripts/indexnow.mjs current-indexnow.json previous-indexnow.json --send   # submit
```
After every later release: run the same two commands; only pages whose text changed are sent.
Keep `previous-indexnow.json` (outside the repo). A 202 means "received", not "indexed".

## Days 3–5: Brave
search.brave.com/submit-url → submit the home page and the research page once. Brave has its own crawler and no
webmaster console; robots.txt already lets every search engine in.

## Days 3–7: Google Business Profile — only if eligible
Google requires in-person contact with customers. If SiteBlitz works only online, **skip this**. If you do meet
clients (for example in Navsari or Surat): business.google.com/add → real name "SiteBlitz" (no keywords), category
"Website designer", service-area business with the address hidden, only the areas you really visit. One profile.
Never a virtual office. Then add its URL to `sameAs` in `src/lib/seo.ts`.

## Days 3–7: LinkedIn company page
linkedin.com → For Business → Create a Company Page. Name SiteBlitz, website, industry "Design Services", tagline
"Gujarat-based website studio. Clear packages, working concepts and a defined build process." No invented staff,
clients or history. Then add its URL to `sameAs` in `src/lib/seo.ts`.

## Days 7–14: a few honest listings
| Where | Decision |
|---|---|
| Justdial (free listing) | Only if you accept the public location/contact fields it requires |
| Clutch (free profile) | Optional; never fill it with fictional clients |
| SGCCI / GCCI | A real membership or a research contribution, not a bought link |
| GoodFirms, DesignRush, IndiaMART / Sulekha lead packages | Later, and judged as lead channels, not SEO |
| Bulk citations, "high-DA links", paid badges | Never |

## Days 10–21: pitch the Gujarat data (after you have read the study yourself)
One message to SGCCI (info@sgcci.in, ask for the Samruddhi / Infozine editors) and a few Surat business reporters.
Template: debate round 3, R3 step 9. Lead with the method and the CSV, never with "X businesses have no website".
One follow-up at most.

## Days 21–30: read the evidence
Search Console Page indexing + Performance (split brand / non-brand queries), Bing reports, enquiries. Fix what is
broken before writing new pages. Nobody can guarantee a ranking; brand-name queries ("siteblitz", "site blitz") are
the realistic first win once the domain, Search Console and the profiles above exist.
