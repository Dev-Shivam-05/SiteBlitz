# November 2026 Meta ad kit (first-client test)

Strategy, research and copy come from the ChatGPT debate in `docs/debate/2026-11-01-ad-campaign/`
(round 2 is the final spec). **Nothing here is live.** The founder approves the final preview, budget and launch
in Ads Manager.

## Files

| File | What it is |
|---|---|
| `out/reel-salon-1080x1920.mp4` | Paid Reel, 18 s, 9:16, H.264 + AAC. Original generated sounds only; works muted |
| `out/reel-salon-cover-1080x1920.png` | Reel cover frame (offer card) |
| `out/static-receipt-1080x1350.png` | Paid static, 4:5, the "sample plan" receipt |
| `reel.html`, `static.html` | Sources. Edit these, never the exports |
| `render.mjs` | `node marketing/ads/render.mjs static` / `reel` re-renders (needs Chrome and ffmpeg) |
| `assets/` | Real captures of `/demo/salon` (no fabricated screens) |

Every screen shown is the real, labelled concept demo. The opening chat bubble is marked "ઉદાહરણ ચેટ" (example
chat). No client, review, result or ranking is claimed.

## Ads Manager settings (proposed; verify in the live account)

| Setting | Value |
|---|---|
| Campaign | `SB-NOV26-SG-WA-FIRSTCLIENT` |
| Objective | Leads → WhatsApp destination → maximise leads (if eligible); otherwise WhatsApp conversations |
| Budget | **₹800 lifetime media** (+ about ₹144 GST, about ₹56 buffer = ₹1,000 all-in). Never a daily budget |
| Schedule | At least 7 consecutive days after approval |
| Structure | 1 campaign · 1 ad set · 2 ads (Reel + static) |
| Location | Navsari, Surat, Valsad, Vapi (one combined audience) |
| Age | 25+ · all genders · no language restriction |
| Audience | Broad geography; the creative itself says "business owner" |
| Placements | FB/IG Feed, Reels, Stories. Check Audience Network separately and turn it off if it brings junk |

## Copy

**Primary text (Gujarati-led, run first)**

> પહેલાં ડેમો જુઓ 👀 1-પેજ વેબસાઇટ ₹7,999થી.
> આ SiteBlitzનો કામ કરતો કન્સેપ્ટ ડેમો છે; ક્લાયન્ટનું કામ નથી.
> તમારા બિઝનેસનો પ્રકાર અને શહેર WhatsApp પર જણાવો. અમે યોગ્ય ડેમો, સ્કોપ અને ડિલિવરીની વિગતો શેર કરીશું.

**Primary text (Hinglish, alternative)**

> Pehle working demo dekho 👀 1-page business website from ₹7,999.
> See SiteBlitz's interactive concept demo — not a client project.
> Apna business type + city WhatsApp par bhejo. We'll share the relevant demo, scope and delivery details.

- **Headlines:** `ડેમો જુઓ · ₹7,999થી` / `Demo First · From ₹7,999`
- **Description:** `1-page website. Working concept demo. Terms confirmed in quote.`
- **CTA:** Send WhatsApp Message

**Pre-filled WhatsApp messages (the source codes match the admin Quick-add):**
- Reel: `Hi SiteBlitz, SB-R1. Business: ___. City: ___. I'm considering a ₹7,999 one-page website. Please share the working demo and package details.`
- Static: same text with `SB-S1`.

**WhatsApp Business greeting**

> Hi 👋 Welcome to SiteBlitz!
> તમારો બિઝનેસ કયો છે અને તમે કયા શહેરમાં છો?
> જવાબ આપો, અમે યોગ્ય ડેમો અને ₹7,999 પેકેજની વિગતો શેર કરીશું.

The full sales scripts (EN, Hinglish, Gujarati), the 14 objection replies and the follow-up cadence are in
`docs/debate/2026-11-01-ads-psychology-redesign/02_chatgpt.md`.

## Daily decision rules (media spend)

| Spend | Action |
|---|---|
| ₹0 | Links, WhatsApp, demo, lifetime cap and billing verified |
| ₹150-200 | Technical health only; no winner yet |
| ₹350-400 | Read the actual chats; why are they qualified or not? |
| ₹550-600 | No qualified chat at all → consider stopping and keeping the balance |
| ₹800 | Stop. Review: chats → qualified → quotes → deposits |

Log every chat in Admin → Quick add with its source code. Log spend daily in Admin → Today → Ad spend.

## Release checklist (all must be true before launch)

- [ ] Founder approved: ₹7,999 / ₹17,999 prices, the one-page scope, the delivery trigger and payment split
- [ ] The corrected website is live (no fake testimonials, no Mumbai, no dead email) on a commercially permitted host
- [ ] WhatsApp Business is set up on the number and linked to the Facebook Page; a test chat reaches the founder
- [ ] SB-R1 / SB-S1 pre-fill shows in the Ads Manager preview (otherwise map the source per ad by hand)
- [ ] Ads Manager previews checked for Reels, Feed and Stories; no cropping of the price or labels
- [ ] Gujarati text proofread by the founder
- [ ] ₹800 lifetime media budget, one ad set, South Gujarat locations confirmed; the billing method works
- [ ] The founder personally clicks Publish
