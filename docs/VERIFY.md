# Manual Verification Checklist — SiteBlitz

There are no automated tests. Until Phase 1 adds them, **this checklist is the safety net.**
Run the sections touched by your change before you call anything done.

Setup: `npm run dev` → http://localhost:3000 (needs `.env.local` with `MONGODB_URI` for anything DB-backed).

## A. Public site renders (run for any change under `src/app` or `src/components/site`)

| Route | Expect |
|---|---|
| `/` | Preloader curtain plays once, hero headline animates in, no layout jump |
| `/work` `/services` `/pricing` `/proof` `/about` `/contact` | Load, Navbar + Footer present |
| `/services/business-websites` | Deep service page renders from JSON |
| `/blog` → any post | List renders, post body blocks render |
| `/for/restaurants` | Industry lander renders |
| `/tools/grader` | Grader form present |
| `/book` | Booking form present |
| `/nonexistent` | 404 page inside `Shell` |

Also check on each: **no console errors**, and with DevTools → Rendering → "Emulate prefers-reduced-motion: reduce" the page is still fully readable with content visible.

## B. Animation engine (run for any change to `Motion.tsx`, `Shell.tsx`, `ExperienceLayer.tsx`, `Deferred.tsx`, or `data-anim` markup)

1. Load `/` — text reveals fire on scroll, not all at once.
2. Client-navigate `/` → `/work` → back. Reveals still fire; no duplicated/stuck elements.
3. Smooth scroll (Lenis) is active on desktop.
4. `?motion=force` forces full motion even under reduced-motion emulation.
5. Disable JS entirely → all `.reveal` content is visible (the `<noscript>` rule in `layout.tsx`).

## C. Lead capture (run for any change to `LeadForm`, `BookingForm`, `/api/leads`, `Lead` model)

1. Submit `/contact` with name + phone → success state.
2. Submit with name only, no phone and no email → 400 with the "share a phone number or email" message.
3. Fill the hidden `website` honeypot field via DevTools → response is `{ok:true, queued:true}` and **no** row is written.
4. Confirm the lead appears at `/admin/leads`.
5. With `MONGODB_URI` unset → form falls back to the WhatsApp CTA instead of erroring.

## D. Analytics (run for any change to `Tracker.tsx`, `/api/track`, or the Session/Pageview/Event models)

1. Load `/`, open DevTools → Network → a `POST /api/track` fires with `type:"pageview"` and returns **204**.
2. Client-navigate to another route → a `leave` beacon for the old path, then a `pageview` for the new one.
3. Click any button → an `event` post (`data-track` name, or generic `click`).
4. `/admin/live` shows the session within ~10s.
5. Switch tab away → `leave` fires with a non-zero `duration` and a `scrollDepth`.

## E. Admin auth (run for ANY change to `middleware.ts`, `lib/auth.ts`, or anything under `/admin` or `/api/admin`)

**This is the one section to never skip.**

1. Logged out, visit `/admin` → redirected to `/admin/login?next=/admin`.
2. Logged out, `curl -i http://localhost:3000/api/admin/stats` → **401**.
3. Repeat step 2 for **every** route under `/api/admin/` except `login`/`logout` → all 401.
4. Log in with the wrong password → 401, generic message, no hint about which field was wrong.
5. Log in correctly → lands on `/admin`, `sb_admin` cookie is set `HttpOnly`.
6. Logged in, visit `/admin/login` → redirected to `/admin`.
7. Log out → `/admin` redirects to login again.

## F. Grader (run for any change to `lib/grader.ts` or `/api/grade`)

1. Grade a real public site → score + findings render.
2. Grade `http://localhost:3000` → rejected (422), not fetched.
3. Grade `http://169.254.169.254/` → rejected (422).
4. Grade `http://127.0.0.1/` and `http://10.0.0.1/` → rejected (422).
5. Grade garbage (`not-a-url`) → 422 with a readable message.
6. Six graders in one minute from the same IP → the 6th returns 429.
7. The run appears at `/admin/grader`.

## G. Before every push

- [ ] `npm run build` completes.
- [ ] Sections above relevant to the change all pass.
- [ ] Screenshots taken for any UI change (both normal and reduced-motion if animation was touched).
