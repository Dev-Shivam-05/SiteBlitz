# Admin panel inventory — 2026-11-10 (before the admin redesign)

Source: read-only sweep of `src/app/admin/**`, `src/components/admin/*`, `src/app/api/admin/**`, `src/middleware.ts`.
Purpose: a visual redesign must keep every item below. Tick each one off against the new UI.

## Shell and auth (do not change behaviour)
- `src/app/admin/layout.tsx`: `data-theme="dark"` scope (login included), metadata "Admin — SiteBlitz", noindex/nofollow.
- `src/middleware.ts` is the gate (`sb_admin` JWT, role admin); logged-in visit to `/admin/login` → `/admin`; logged-out
  → `/admin/login?next=<path>` (query lost). Every `/api/admin/*` route also calls `requireAdmin()` (`src/lib/auth.ts:56`).
- Deep links that must keep working: `/admin/leads?q=<ref>` (Telegram, `src/lib/telegram.ts:72`), `/admin/today` (brief).
- Sidebar (`src/components/admin/AdminShell.tsx`): 12 items in order — Today, Quick add, Overview, Live, Visitors, Leads,
  Grader, Funnel, Pages, Campaigns, Audience, Activity (lucide icons); "View site" (new tab); "Sign out" (POST logout).
  Collapsed 64 px icon-only below `lg` (icon links have no accessible name today), 224 px with labels from `lg`.
- `PageHeader` (title, sub, right slot), `Card` (min-w-0), `DbNotice` (db_not_configured).
- `useApi(url, pollMs)` / `sendJson` / `fmtDuration` / `fmtDate` (IST) / `flagEmoji` in `src/components/admin/useApi.ts`.
- Polling: Live 8 s · Activity 20 s · Overview, Leads, Visitors, Grader 30 s · Today, Audience, Funnel, Pages, Campaigns 60 s.
- Only recharts chart: Overview area chart. No maps (flag + code). Hard-coded colours: recharts (`admin/page.tsx:143-161`),
  heatmap (`audience/page.tsx:124-126`), Tailwind red/yellow/blue/emerald.
- Known gaps today: no mobile menu, no keyboard shortcuts, Visitors drawer has no Esc/focus trap/role=dialog,
  no aria-current, admin pageviews are tracked by `Tracker`, themeColor is the light value.

## Per page — features to keep
- **Overview `/admin`**: live-now pill; range 24h/7d/30d/90d; CapacityControl (slots 0–20, note ≤ 60 chars, Publish →
  POST /api/admin/settings, Saving/Live ✓/Save failed); 5 KPIs (visitors, sessions, pageviews with Δ vs previous period;
  avg session; bounce); traffic area chart (pageviews + sessions); 6 bar lists (top pages + avg time, sources, countries,
  devices, browsers, top actions); lead pipeline counts (new, contacted, qualified, won, lost); leads CSV (90 d);
  Manage → Leads; latest 5 leads. API also returns `cities`, `topPages.avgScroll` (unused).
- **Today**: IST date; + Quick add; 4 buckets (Overdue red, Due today, New, No next action) with hint + empty text; lead
  row → `/admin/leads?q=`, ref · source · owner · next action · due label, WhatsApp button; "first 500" note; concepts
  this week (x / 3, meter, cap reached, new-yesterday by source); ad spend (x / ₹800, meter, ≈ incl. 18% GST, cap
  reached, add form date + ₹, 7 latest with delete); alerts card (failed/pending, yellow border, Retry with spinner,
  Telegram-not-configured hint, last error); inline load error.
- **Quick add**: phone (autoFocus, +91 normalisation, invalid message); live duplicate check with links; name; source
  pills (SB-R1, SB-S1, walk-in, referral, website, SB-H1, SB-G1, SB-E1, other; remembered in localStorage
  `sb_quickadd_source`); business type; status; next action (default "Reply on WhatsApp"); due (today); note;
  validation; Save; 409 → "Save anyway (new lead)"; success banner with ref + links; reset + refocus.
- **Leads**: status pills (all + 8 statuses); debounced search (name, phone, ref, business) reading `?q=`; count
  sub-line; card: name, ref, status badge, score, plan, meta line, Next line (late, owner, ₹ value, closed/none set),
  lost reason, message, last 2 notes, WhatsApp/Call/Email; status select (optimistic PATCH); inline Edit (next action,
  due, owner, value whole ₹, lost reason); + Note (Enter saves); per-card error; empty states; 25 per page.
- **Live**: on-site count pill; active visitors (last 5 min: flag, city, device, browser, source, current page, pages,
  duration, last seen); 30-min activity stream (pageviews volt, events violet with text); empty states.
- **Visitors**: range 24h/7d/30d/90d; count sub-line; 7-column table (When, Location, Device icon, Source, Entry, Pages,
  Time); row opens drawer; 25 per page; drawer: 4 tiles, "became a lead" banner, merged timeline with duration + scroll %.
- **Audience**: range 7d/30d/90d; sessions CSV; KPIs new / returning / bots filtered; 7×24 IST heatmap with tooltips;
  7 breakdowns (devices, OS, browsers, countries, cities, languages, screen sizes).
- **Activity `/admin/events`**: table When, Event pill, Page, Details JSON; 50 per page.
- **Funnel**: range; 6 stages (visited, engaged, pricing/contact, started form, lead, won) with count, % of previous
  (≥ 50 volt, ≥ 15 yellow, else red), proportional animated bars; "Reading it" help.
- **Pages**: range; pageviews CSV; table Page, Views, Unique, Avg time, Avg scroll (mini bar), Entries, Exits.
- **Campaigns**: range; UTM table (Source, Medium, Campaign, Sessions, Avg time) + helper example; referring sites;
  leads by source; three empty states.
- **Grader**: range; accordion rows (score colour ≥ 80/≥ 55, URL, issues, SEO·Perf·Trust·UX, date); failed checks;
  "Draft outreach message →" wa.me link.
- **Login**: email + password, server errors incl. 429 rate limit, "Checking…", `?next=` redirect, "Command Center".

## API routes (unchanged by a visual redesign)
stats · today · leads (GET/POST/PATCH) · live · visitors · visitors/[sid] · audience · events · funnel · pages ·
campaigns · grader · settings (GET/POST) · export (leads/sessions/pageviews, days ≤ 365) · adspend (POST/DELETE) ·
notifications/retry · login · logout — all under `src/app/api/admin/`.
