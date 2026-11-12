import { DEMOS, type DemoId } from "./demos";
import type { OutreachSnapshotDoc } from "./models";
import { inr } from "./offer";
import { SITE } from "./site";

/**
 * HTML for /u/ (unsubscribe) and /s/ (snapshot pages). These are route handlers, not React pages, for three reasons:
 *  - /u/{token} must answer GET (confirm page) and a raw RFC 8058 POST at the same URL, which only a route handler can;
 *  - an expired or removed snapshot must answer HTTP 410, and an App Router page cannot set that status;
 *  - the pages must carry no analytics and no scripts at all. A route handler skips the root layout (and with it the
 *    first-party Tracker and every framework script), and the Content-Security-Policy below forbids scripts outright.
 * Look: the site's v4 tokens and type (globals.css @theme, self-hosted Mona Sans + DM Sans served from /fonts) and the
 * demo palettes (globals.css "Concept demo websites"). tests/outreach-routes.test.ts fails if a colour appears here
 * that globals.css does not define, or if the font copies in public/fonts drift from src/fonts.
 */

/* ------------------------------------------------------------------ */
/* Escaping template                                                   */
/* ------------------------------------------------------------------ */

const ESC: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
export const escapeHtml = (v: unknown) => String(v).replace(/[&<>"']/g, (c) => ESC[c]);

/** Already-safe markup. Only `html` and `raw` create it. */
class Safe {
  constructor(readonly value: string) {}
  toString() {
    return this.value;
  }
}
const raw = (s: string) => new Safe(s);

function part(v: unknown): string {
  if (v instanceof Safe) return v.value;
  if (Array.isArray(v)) return v.map(part).join("");
  if (v === null || v === undefined || v === false) return "";
  return escapeHtml(v);
}

/** Tagged template that HTML-escapes every interpolated value unless it is itself `html` output. Business names,
 *  observations and transcripts come from the lead generator and are never trusted as markup. */
function html(strings: TemplateStringsArray, ...values: unknown[]): Safe {
  let out = strings[0];
  for (let i = 0; i < values.length; i++) out += part(values[i]) + strings[i + 1];
  return new Safe(out);
}

/* ------------------------------------------------------------------ */
/* Document shell                                                      */
/* ------------------------------------------------------------------ */

/** No script source at all (default-src 'none'); styles inline; fonts and the favicon from this origin; the evidence
 *  image as a data: URL; the recorded overview from any https host; forms post back to this origin only. */
export const PAGE_CSP =
  "default-src 'none'; style-src 'unsafe-inline'; font-src 'self'; img-src 'self' data:; media-src https:; " +
  "form-action 'self'; base-uri 'none'; frame-ancestors 'none'";

export const OUTREACH_CSS = `
@font-face{font-family:"Mona Sans";src:url(/fonts/mona-sans-600-800.woff2) format("woff2");font-weight:600 800;font-stretch:100% 125%;font-style:normal;font-display:swap}
@font-face{font-family:"DM Sans";src:url(/fonts/dm-sans-400-600.woff2) format("woff2");font-weight:400 600;font-style:normal;font-display:swap}
:root{--color-void:#0a0a0c;--color-surface:#121216;--color-raised:#1a1a20;--color-ink:#f5f5f0;--color-muted:#9b9ba3;--color-faint:#81818f;--color-volt:#ccff00;--color-line:rgba(245, 245, 240, 0.08);--font-display:"Mona Sans","DM Sans",system-ui,sans-serif;--font-body:"DM Sans",system-ui,sans-serif;--font-accent:"Instrument Serif",Georgia,serif;color-scheme:dark}
*,*::before,*::after{box-sizing:border-box}
html{background:var(--color-void)}
body{margin:0;background:var(--color-void);color:var(--color-ink);font-family:var(--font-body);font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;overflow-x:clip}
::selection{background:var(--color-volt);color:var(--color-void)}
a{color:inherit}
img{display:block;max-width:100%;height:auto}
p,h1,h2,h3,figure,ul{margin:0}
.wrap{max-width:1180px;margin:0 auto;padding:0 20px}
.top{border-bottom:1px solid var(--color-line)}
.bar{display:flex;align-items:center;justify-content:space-between;gap:16px;padding-top:18px;padding-bottom:18px}
.brand{font-family:var(--font-display);font-weight:800;font-stretch:125%;text-transform:uppercase;letter-spacing:-0.02em;font-size:18px;text-decoration:none}
.kicker{font-size:0.8125rem;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:var(--color-volt)}
.display{font-family:var(--font-display);font-weight:800;font-stretch:125%;text-transform:uppercase;line-height:0.95;letter-spacing:-0.02em;overflow-wrap:anywhere}
.serif{font-family:var(--font-accent);font-style:italic;font-weight:400;font-stretch:100%;text-transform:none;letter-spacing:-0.01em;font-size:1.08em;line-height:0.8}
.h-xl{font-size:clamp(34px,8.6vw,92px);margin-top:18px}
.h-lg{font-size:clamp(28px,5.6vw,60px);margin-top:14px}
.h-md{font-size:clamp(26px,4.4vw,44px);margin-top:14px;line-height:1.02}
.lead{margin-top:24px;max-width:60ch;font-size:clamp(17px,2vw,21px);line-height:1.55}
.muted{color:var(--color-muted)}
.small{font-size:14px}
.layer{padding:56px 0}
.layer+.layer{border-top:1px solid var(--color-line)}
.offer-line{margin-top:28px;display:inline-flex;flex-wrap:wrap;gap:6px 10px;align-items:baseline;border:1px solid rgba(245, 245, 240, 0.16);border-radius:999px;padding:10px 18px;font-size:15px}
.offer-line strong{color:var(--color-volt);font-weight:600}
.grid{display:grid;gap:28px;margin-top:36px}
.grid>*{min-width:0}
.panel{background:var(--color-surface);border:1px solid var(--color-line);border-radius:20px;padding:22px}
.label{font-size:0.8125rem;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:var(--color-faint)}
.shot{max-width:360px}
.shot img{border-radius:16px;border:1px solid rgba(245, 245, 240, 0.16);max-height:640px;width:auto;margin:0 auto}
.shot figcaption{margin-top:12px;font-size:14px;color:var(--color-muted)}
.concept-label{background:var(--color-void);color:var(--color-ink);border-bottom:1px solid var(--color-line);padding:10px 16px;font-size:13px;font-weight:600;line-height:1.45}
.concept{border:1px solid rgba(245, 245, 240, 0.16);border-radius:20px;overflow:hidden}
.scope{list-style:none;padding:0;display:grid;gap:12px}
.scope li{display:flex;gap:12px;align-items:baseline;border-bottom:1px solid var(--color-line);padding-bottom:12px}
.scope li::before{content:"";flex:none;width:8px;height:8px;border-radius:999px;background:var(--color-volt);transform:translateY(-2px)}
.price{font-size:clamp(40px,6vw,64px);margin-top:10px;line-height:1}
.panel .label+p,.panel p+.label{margin-top:12px}
.rec{margin-top:36px}
.mt-8{margin-top:8px}
.mt-18{margin-top:18px}
.rec audio{width:100%;max-width:520px;margin-top:16px;display:block}
.transcript{white-space:pre-line;margin-top:8px;max-width:70ch;color:var(--color-muted)}
.actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:36px}
.btn{display:inline-flex;align-items:center;justify-content:center;min-height:48px;border-radius:999px;padding:12px 24px;font:inherit;font-size:15px;font-weight:600;text-decoration:none;cursor:pointer;border:0}
.btn-volt{background:var(--color-volt);color:var(--color-void);transition:transform 0.25s cubic-bezier(0.22, 1, 0.36, 1),box-shadow 0.3s ease}
.btn-volt:hover{transform:translateY(-1px);box-shadow:0 0 0 6px rgba(204, 255, 0, 0.12),0 14px 40px -12px rgba(204, 255, 0, 0.55)}
.btn-line{background:transparent;border:1.5px solid rgba(245, 245, 240, 0.4);color:var(--color-ink);transition:border-color 0.25s ease,color 0.25s ease}
.btn-line:hover{border-color:var(--color-volt);color:var(--color-volt)}
.btn:focus-visible{outline:2px solid var(--color-ink);outline-offset:3px}
.remove{margin-top:40px;padding-top:28px;border-top:1px solid var(--color-line);display:grid;gap:14px;justify-items:start}
.foot{padding-top:28px;padding-bottom:40px;border-top:1px solid var(--color-line);font-size:14px;color:var(--color-muted)}
.center{min-height:72svh;display:flex;flex-direction:column;justify-content:center;padding-top:48px;padding-bottom:48px}
.center .lead{margin-top:20px}
.center form,.center .actions{margin-top:32px}
.demo-root{background:var(--demo-bg);color:var(--demo-ink);font-family:var(--font-body)}
.demo-salon{--demo-bg:#fbf4f1;--demo-ink:#3a1f2b;--demo-accent:#8e3b5c;--demo-soft:#f3e3df;--demo-card:#ffffff}
.demo-salon .demo-heading{font-family:var(--font-accent);font-weight:400;letter-spacing:-0.01em}
.demo-coaching{--demo-bg:#f4f7fc;--demo-ink:#12233f;--demo-accent:#1d4ed8;--demo-soft:#e4ebf8;--demo-card:#ffffff}
.demo-coaching .demo-heading{font-family:var(--font-body);font-weight:700;letter-spacing:-0.03em}
.demo-showroom{--demo-bg:#f6f2ec;--demo-ink:#2a2420;--demo-accent:#7a4e2d;--demo-soft:#ece3d7;--demo-card:#fffdf9}
.demo-showroom .demo-heading{font-family:var(--font-accent);font-weight:400}
.demo-kicker{color:var(--demo-accent)}
.demo-mark{background:var(--demo-accent);color:#ffffff}
.demo-band{background:var(--demo-soft)}
.demo-card{background:var(--demo-card);box-shadow:0 1px 0 rgba(0, 0, 0, 0.04),0 12px 30px -22px rgba(0, 0, 0, 0.35)}
.demo-btn{background:var(--demo-accent);color:#ffffff}
.demo-btn-outline{border:1.5px solid var(--demo-accent);color:var(--demo-accent)}
.cp-head{display:flex;align-items:center;gap:10px;padding:16px 20px}
.cp-mark{display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:999px;font-size:12px;font-weight:700;flex:none}
.cp-brand{font-size:19px;font-weight:600;line-height:1.2}
.cp-hero{padding:8px 20px 32px}
.cp-kick{font-size:11px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase}
.cp-title{font-size:clamp(30px,4vw,46px);line-height:1.05;margin-top:12px}
.cp-text{margin-top:14px;max-width:46ch;font-size:15px;line-height:1.6;opacity:0.85}
.cp-btns{display:flex;flex-wrap:wrap;gap:10px;margin-top:22px}
.cp-btn{display:inline-block;border-radius:999px;padding:11px 18px;font-size:13px;font-weight:600}
.cp-items{padding:28px 20px}
.cp-grid{display:grid;gap:12px;margin-top:14px}
.cp-card{border-radius:16px;padding:16px}
.cp-card-t{font-weight:700}
.cp-card-x{margin-top:6px;font-size:14px;line-height:1.55;opacity:0.85}
.cp-meta{margin-top:10px;font-size:12px;font-weight:600}
.cp-visit{padding:22px 20px 26px}
.cp-visit-t{font-size:22px}
.cp-visit p+p{margin-top:6px;font-size:14px;opacity:0.85}
@media (min-width:640px){.cp-grid{grid-template-columns:1fr 1fr}}
@media (min-width:768px){.wrap{padding:0 32px}.layer{padding:80px 0}.panel{padding:28px}}
@media (min-width:1000px){.grid.two{grid-template-columns:minmax(0,1fr) minmax(0,1.35fr);align-items:start}.grid.even{grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);align-items:start}}
@media (prefers-reduced-motion:reduce){*,*::before,*::after{transition-duration:0.01ms !important}}
`;

function documentHtml(title: string, body: Safe): string {
  return (
    "<!doctype html>" +
    html`<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex, nofollow">
<meta name="referrer" content="no-referrer">
<meta name="theme-color" content="#0a0a0c">
<title>${title}</title>
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="preload" href="/fonts/mona-sans-600-800.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/dm-sans-400-600.woff2" as="font" type="font/woff2" crossorigin>
<style>${raw(OUTREACH_CSS)}</style>
</head>
<body>
<header class="top"><div class="wrap bar"><a class="brand" href="/">SiteBlitz</a></div></header>
${body}
</body>
</html>`.value
  );
}

/** Every /u/ and /s/ response: never cached, never indexed, no scripts. */
export function htmlResponse(title: string, body: Safe, status: number): Response {
  return new Response(documentHtml(title, body), {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
      "Content-Security-Policy": PAGE_CSP,
    },
  });
}

function messagePage(kicker: string, heading: Safe | string, lead: string, extra: Safe | string = ""): Safe {
  return html`<main class="wrap center">
<p class="kicker">${kicker}</p>
<h1 class="display h-md">${heading}</h1>
<p class="lead muted">${lead}</p>
${extra}
</main>`;
}

/* ------------------------------------------------------------------ */
/* /u/{token}                                                          */
/* ------------------------------------------------------------------ */

const STOP_HINT = 'To stop emails, reply "stop" to any SiteBlitz email and the address will be removed.';

export const unsubscribePages = {
  /** GET with a valid token: a question and one button. Nothing is changed by opening the link. */
  confirm: () =>
    htmlResponse(
      "Stop emails from SiteBlitz",
      messagePage(
        "Unsubscribe",
        "Stop emails from SiteBlitz to this address?",
        "One click. No login, nothing to type.",
        // no action attribute: the form posts back to this exact URL, token included
        html`<form method="post"><input type="hidden" name="confirm" value="1"><button type="submit" class="btn btn-volt">Yes, stop emails</button></form>`
      ),
      200
    ),
  done: () =>
    htmlResponse(
      "Unsubscribed",
      messagePage(
        "Unsubscribed",
        html`Done. <span class="serif">No more</span> emails.`,
        "SiteBlitz will not email this address again. A message that was already on its way may still arrive."
      ),
      200
    ),
  invalid: () =>
    htmlResponse(
      "Link not valid",
      messagePage("Unsubscribe", "This link is not valid", `It may have been copied incompletely. ${STOP_HINT}`),
      400
    ),
  unavailable: () =>
    htmlResponse(
      "Unsubscribe unavailable",
      messagePage(
        "Unsubscribe",
        "Unsubscribe is unavailable right now",
        `Nothing was changed. Please try again in a few minutes. ${STOP_HINT}`
      ),
      503
    ),
};

/* ------------------------------------------------------------------ */
/* /s/{slug}                                                           */
/* ------------------------------------------------------------------ */

export const CONCEPT_LABEL =
  "Illustrative concept prepared by SiteBlitz. Not your current website and not an existing client project.";

const dateIn = (d: Date) =>
  new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" }).format(d);

const VERTICAL_WORDS: Record<OutreachSnapshotDoc["vertical"], string> = {
  salon_beauty: "salon and beauty",
  coaching_tuition: "coaching and tuition",
  retail_showroom: "retail and showroom",
  other: "local",
};

function initials(name: string): string {
  const letters = name
    .split(/\s+/)
    .map((w) => w.replace(/[^\p{L}\p{N}]/gu, "")[0])
    .filter(Boolean);
  return (letters.slice(0, 2).join("") || name.trim()[0] || "").toUpperCase();
}

/** The matching demo's look (src/lib/demos.ts) with only the business name and city put in. No photographs: the
 *  demos' licensed stand-ins could be mistaken for the business's own premises. */
function conceptPreview(s: OutreachSnapshotDoc): Safe {
  const d = DEMOS[s.concept_demo as DemoId];
  return html`<figure class="concept">
<figcaption class="concept-label">${CONCEPT_LABEL}</figcaption>
<div class="demo-root ${d.theme}">
  <div class="cp-head"><span class="cp-mark demo-mark">${initials(s.business_name)}</span><span class="cp-brand demo-heading">${s.business_name}</span></div>
  <div class="cp-hero">
    <p class="cp-kick demo-kicker">${d.heroKicker}</p>
    <p class="cp-title demo-heading">${d.heroTitle}</p>
    <p class="cp-text">${d.heroText}</p>
    <div class="cp-btns"><span class="cp-btn demo-btn">${d.primaryCta}</span><span class="cp-btn demo-btn-outline">Explore ${d.itemsKicker.toLowerCase()}</span></div>
  </div>
  <div class="cp-items demo-band">
    <p class="cp-kick demo-kicker">${d.itemsKicker}</p>
    <div class="cp-grid">${d.items.map(
      (it) => html`<div class="cp-card demo-card"><p class="cp-card-t">${it.title}</p><p class="cp-card-x">${it.text}</p><p class="cp-meta demo-kicker">${it.meta}</p></div>`
    )}</div>
  </div>
  <div class="cp-visit"><p class="cp-visit-t demo-heading">${d.visitTitle}</p><p>${s.business_name}, ${s.city}</p></div>
</div>
</figure>`;
}

/** A lean() read returns the stored image as a BSON Binary, a hydrated document as a Buffer. */
function imageBytes(v: unknown): Buffer | null {
  if (!v) return null;
  if (Buffer.isBuffer(v)) return v;
  const inner = (v as { buffer?: unknown }).buffer;
  return inner instanceof Uint8Array ? Buffer.from(inner) : null;
}

export function snapshotPage(s: OutreachSnapshotDoc): Response {
  const checked = dateIn(new Date(s.observation.checked_at));
  const subject = encodeURIComponent(`Website snapshot: ${s.business_name}`);
  const mailto = `mailto:${s.reply_email}?subject=${subject}`;
  const bytes = imageBytes(s.evidence_image);
  const image = bytes && s.evidence_mime ? `data:${s.evidence_mime};base64,${bytes.toString("base64")}` : null;
  const rec = s.recording?.url && s.recording.transcript ? s.recording : null;

  const body = html`<main>
<section class="layer wrap" aria-labelledby="name">
  <p class="kicker">Opportunity snapshot · ${s.city}</p>
  <h1 id="name" class="display h-xl">${s.business_name}</h1>
  <p class="lead">${s.observation.text}</p>
  <p class="offer-line">Website for ${s.business_name}: <strong>${inr(s.offer.price_inr)} one-time</strong> <span class="muted">Scope and costs below.</span></p>
</section>

<section class="layer" aria-labelledby="checked">
  <div class="wrap">
    <p class="kicker">What we checked</p>
    <h2 id="checked" class="display h-lg">Checked on <span class="serif">${checked}</span></h2>
    <div class="grid ${image ? "two" : ""}">
      ${image
        ? html`<figure class="shot"><img src="${image}" alt="${`Screenshot taken while checking ${s.business_name} on ${checked}`}" width="360"><figcaption>Screenshot taken while checking, ${checked}.</figcaption></figure>`
        : ""}
      ${conceptPreview(s)}
    </div>
  </div>
</section>

<section class="layer wrap" aria-labelledby="scope">
  <p class="kicker">Scope and price</p>
  <h2 id="scope" class="display h-lg">What is <span class="serif">included</span></h2>
  <div class="grid even">
    <ul class="scope">${s.offer.scope_lines.map((l) => html`<li>${l}</li>`)}</ul>
    <div class="panel">
      <p class="label">One-time price</p>
      <p class="display price">${inr(s.offer.price_inr)}</p>
      <p class="label">Yearly costs</p>
      <p>${s.offer.yearly_costs_note}</p>
    </div>
  </div>
  ${rec
    ? html`<div class="rec panel">
    <p class="kicker">General recorded overview</p>
    <p class="muted small mt-8">${`Recorded once for ${VERTICAL_WORDS[s.vertical]} businesses, not for this page alone.`}</p>
    <audio controls preload="none" src="${rec.url}"></audio>
    <p class="label mt-18">Transcript</p>
    <p class="transcript">${rec.transcript}</p>
  </div>`
    : ""}
  <div class="actions"><a class="btn btn-volt" href="${mailto}">Reply by email</a></div>
  <form class="remove" method="post" action="/s/${s.slug}/remove">
    <p class="muted small">Not interested? Remove this page and it will not be shown again, to anyone with the link.</p>
    <button type="submit" class="btn btn-line">Remove this page</button>
  </form>
</section>
</main>
<footer class="wrap foot">${SITE.name} · ${SITE.locationLine}. This page is not listed on search engines and is taken down on ${dateIn(new Date(s.expires_at))}. We only count how many times it is opened; nothing else is tracked.</footer>`;

  return htmlResponse(`Opportunity snapshot for ${s.business_name}`, body, 200);
}

const homeLink = html`<div class="actions"><a class="btn btn-line" href="/">Go to SiteBlitz</a></div>`;

export const snapshotPages = {
  /** Expired or removed: HTTP 410 and no business data. */
  gone: () =>
    htmlResponse(
      "Page no longer available",
      messagePage(
        "Opportunity snapshot",
        html`This page is <span class="serif">no longer</span> available`,
        "Snapshot pages are taken down after 30 days, or earlier when the business removes them.",
        homeLink
      ),
      410
    ),
  removed: () =>
    htmlResponse(
      "Page removed",
      messagePage("Opportunity snapshot", html`Page <span class="serif">removed</span>`, "It will not be shown again. Thank you for letting us know."),
      200
    ),
  missing: () => htmlResponse("Page not found", messagePage("Opportunity snapshot", "Page not found", "Check that the link was copied completely.", homeLink), 404),
  unavailable: () =>
    htmlResponse(
      "Temporarily unavailable",
      messagePage("Opportunity snapshot", "Temporarily unavailable", "Please try again in a few minutes."),
      503
    ),
};
