# Round 3 - what is built since round 2, four decisions to challenge, and a Roman-Hindi text to review

Built and committed tonight (verified with `next build` + tests, local only, nothing deployed):
- Organization replaces ProfessionalService (same @id). Rendered canonicals checked with curl on /, /pricing, /faq,
  /research, the study, a service detail: one canonical each, absolute, self-referencing; titles rendered once with
  the " — SiteBlitz" suffix.
- Content truth pass on all 6 service pages, 4 industry pages, 7 guides (an audit found: "live, indexed and measurable
  by hour 48", client "first-party analytics dashboards" that are not offered, "90+ Lighthouse" promises, withdrawn
  Growth/Scale plans, the founder's name as author, unsourced market price tiers). All rewritten from offer.ts.
- Research hub live at /research/gujarat-business-websites-2026 with your title/H1, city anchors, no child pages yet.

## Decisions to challenge (answer agree / disagree because ... / need data)

D1. Research denominator and classification (final): Gujarat records, brand field empty, in 17 trade groups (e.g.
restaurants = restaurant, indian_restaurant, fast_food_restaurant, cafe, vegetarian_restaurant, chinese_restaurant,
bakery; pizza_restaurant and two grocery sub-categories were dropped because nearly every record linked a website,
i.e. unbranded chains). 92,579 records. Each record = own website (URL host not shared by 3+ trade records and not a
marketplace/listing host such as indiamart, justdial, oyorooms, g.page, singleinterface store locators) / chain or
marketplace page only / no website recorded. Result: 22.6 % own, 6.9 % chain/marketplace, 70.5 % none.
596 hosts were shared by 3+ records (6,289 records: apollopharmacy.in, samsungexclusivestores.in, cuemath.com ...).
Live check: 60 seeded random own-website URLs, one GET each on 11 Nov: 34 answered, 21 no DNS, 3 4xx, 2 refused.
Worded on the page as "one small sample from one connection, not a measured rate; own-website share is an upper
bound for working sites". Builder subdomains (Wix, Blogger: 0.4 % of URLs) count as own. Is anything here still
misleading, and is "upper bound" fair?

D2. Surat child page now? Surat has 16,494 trade records and all 17 trade cells are >= 117 records (clothing 4,232
32.9 %, health 2,044 26.0 %, restaurants 1,953 13.2 %, beauty 1,158 18.6 %, mobile 932 11.4 %, coaching 430 41.2 % ...).
It passes your ">= 6 categories with >= 100 records" rule. Proposal: publish /research/gujarat-business-websites-2026/surat
with the 17-trade table, Surat vs Gujarat per trade (same trade compared, never city vs city), method link, CSV rows
for Surat, and a 3-line "if you run a business in Surat" note. Approve or block, and give exact title/H1/meta.

D3. Prices on service pages: SEO & GEO said "from Rs 9,999", Care plans "Rs 2,499/month", Project rescue "from
Rs 17,999". None exists in offer.ts (pricing says maintenance is "optional, separate, quoted"). I set all three to
"priced by written quote" (and their Offer schema disappears), recorded for the owner. Landing pages keep Rs 7,999
because a landing page IS the one-page Launch package. Agree?

D4. Titles: I kept two titles that differ from your register, for brand-first and query match:
"/" -> "SiteBlitz — Website Design & Development Studio in Gujarat" (60 chars) and
"/pricing" -> "Website Price in India: Rs 7,999 & Rs 17,999 Plans — SiteBlitz". The rest follow your register.
Object only if you see a concrete problem.

## Roman-Hindi guide (the hi-Latn counterpart of the English cost guide) - full text below
Review it as a native Hindi-speaking business owner in Gujarat would read it: unnatural phrasing, English words that
should stay English (people say "website", "domain", "hosting"), anything that reads machine-translated, anything
that is not equivalent to the English guide (it drops the English guide's hypothetical vendor numbers and keeps one
Rs 3,000 FAQ). Give exact replacement sentences.

```text
# Website banane ka kharcha kitna aata hai? Seedha hisaab (2026)
meta: Website Banane Ka Kharcha Kitna Aata Hai? (2026) | Business website ka kharcha kuch hazaar se lakhs tak kyon jaata hai, paisa kin paanch cheezon ka lagta hai, aur quote lene se pehle kaunse sawaal poochhein.

Teen logon se website ka quote maangiye aur teen alag number milenge. Instagram wale freelancer se kuch hazaar, local agency se das-bees hazaar se upar, aur badi firm se lakh ke paar. Brief wahi, pages wahi. Lagta hai koi jhooth bol raha hai. Aksar koi nahi bol raha: teeno alag cheez bech rahe hain jinka naam ek hi hai, 'website'.
## Ek naam, teen alag cheezein
Sabse sasti website, kuch hazaar rupaye wali, aksar ek template hoti hai: theme khareeda, aapka logo aur text daala, domain joda, kaam khatam. Kaam kuch ghanton ka. Isme dhokha nahi hai, bas design ki ek parat ke saath data entry hai. Beech wali website, das hazaar se upar, aksar semi-custom hoti hai: kuch asli design ke faisle, ek CMS, aur aapke business par thoda dhyan. Lakhs wali website ek process hoti hai: meetings, workshops, custom engineering, aur project manager ki salary bhi aapke bill mein.
Inme se koi bhi apne aap mein loot nahi hai. Loot tab hai jab aap teesre level ka paisa dete hain aur kaam pehle level ka milta hai. Aisa isliye hota hai kyunki zyada tar log andar ka kaam dekh hi nahi paate.
## Paisa asal mein paanch cheezon ka lagta hai
Har quote, chahe kitna bhi ho, in paanch cheezon ka mix hota hai. Zyada tar quote ye aapko alag se dikhate nahi.
- Design: layout, font, rang aur wo chhote faisle jo pehle paanch second mein bharosa banate hain. Sasti site mein ye faisle template ke hote hain, aapke business ke nahi.
- Engineering: wo code jo tay karta hai ki site ek second mein khulegi ya gyarah mein, sasta Android phone par chalegi ya nahi, aur Google use theek se padh paayega ya nahi.
- Content: aapke business ke shabd aur photos, sahi jagah aur sahi kram mein, taaki customer ko jawab jaldi mile.
- Hosting aur domain: site kahan rahegi, kitni tez chalegi, aur har saal ka kharcha kitna hoga.
- Maintenance: launch ke baad ke badlav, updates aur backups.
Sasta quote ye paanchon cheezein chhoti nahi karta, inme se teen ko gayab kar deta hai: engineering, content ka kaam aur maintenance. Tab tak sab theek lagta hai jab tak kuch toot na jaaye.
## Sasti website kahan fail hoti hai
- Aisa code jo browser mein banta hai aur Google ko theek se dikhta nahi, to site hote hue bhi search mein nahi aati
- Har page par phone se seedhi daali hui bhaari photos
- Shared hosting jo traffic aate hi dheemi pad jaaye
- Koi hisaab nahi ki site se enquiry aa rahi hai ya nahi
- Template ka licence developer ke naam par, to unhe chhodte hi sab shuru se banana pade
## Mehngi website kahan paisa barbaad karti hai
- Paanch page ki site ke liye kai workshops. Dental clinic ko ye batane ke liye teen meeting nahi chahiye ki dental clinic kya karta hai.
- Bada CMS, jabki content saal mein do baar badalta hai.
- Animations jo demo mein sundar lagti hain par har page ko do second dheema kar deti hain.
- Har mahine ka retainer, jabki kaam teen mahine mein ek update ka.
- 'SEO package' jo report bhejta hai par site ki asli kami theek nahi karta.
> Website ka quote website ki keemat nahi, process ki keemat hai. Process poochhiye, aadhe quote khud samajh aa jaayenge.
## Hamara seedha hisaab: SiteBlitz kitna leta hai
SiteBlitz is range mein bas ek point hai, to ye rahe hamare number. Launch ₹7,999 hai: ek page ki website, ready-to-build hone ke 2 working days baad live. Business ₹17,999 hai: teen tay kiye hue pages, ready-to-build ke 7 working days baad. Online store, booking ya zyada pages ka likhit quote milta hai. Ye ek baar ka daam hai, isme GST nahi joda jaata. Domain aur hosting ka kharcha alag hai aur pay karne se pehle quote mein likha hota hai.
Ready-to-build ka matlab: pages aur features likhit mein tay ho gaye, aapka content, photos aur business details hamare paas aa gaye, zaroori access mil gaya, aur pehla payment ho gaya. Ghadi wahin se chalti hai.
Kya hum hi har kisi ke liye sahi jawab hain? Nahi. Agar aapko custom web app, chaalis pages ya inventory system se gehra jod chahiye, to aapko hamare daam se zyada dena chahiye. Wo asli engineering hai aur uska asli kharcha hai.
## Quote lene se pehle ye 6 sawaal poochhiye
- Domain, hosting account aur code kiske naam par hoga? Sahi jawab ek hi hai: aapke.
- Kya site server-rendered hai? Agar vendor ko iska matlab nahi pata, to ho sakta hai Google aapke pages theek se na padhe.
- Doosre saal ka kharcha kitna hai? Hosting, domain aur maintenance ka number likhit mein lijiye.
- Saath kaam band hua to kya hoga? Aapko apni files aur accounts milne chahiye, bina kisi jhagde ke.
- Kitne revision milenge, aur kis badlav ko revision maana jaayega?
- Kya wo Google ranking ki guarantee de rahe hain? Agar haan, to saavdhaan rahiye: ranking ki guarantee koi bhi imaandari se nahi de sakta.
Aap jitna bhi kharch karein, vendor se poochhiye ki ye paanch cheezein unke number mein kahan hain. Achhe vendor ko ye sawaal pasand aayega.
FAQ:
Q: Kya ₹3,000 wali website kabhi theek hai? / A: Kabhi kabhi, agar aapko sirf ek digital visiting card chahiye aur aap jaante hain ki andar koi engineering nahi hai. Usse Google ranking, phone par tez speed ya enquiries ki ummeed mat rakhiye.
Q: SiteBlitz kitna leta hai aur usme kya milta hai? / A: Launch ₹7,999 (ek page, ready-to-build ke 2 working days baad) aur Business ₹17,999 (teen pages, 7 working days baad). Dono mein mobile-first design, WhatsApp aur call buttons, basic technical SEO aur ek revision round shaamil hai. Online store aur booking ka likhit quote milta hai.
Q: Website banne mein kitna time lagta hai? / A: Hamare yahan ek page ready-to-build ke 2 working days baad aur teen pages 7 working days baad live hote hain. Bade kaam ka schedule quote mein likha hota hai.
Q: Kya GST alag se lagega? / A: Nahi. SiteBlitz ke ye daam final hain, inme GST nahi joda jaata.
```

## Off-site plan request
R3. Give the founder a numbered off-site checklist for the first 30 days after the domain is live, in order, with
the exact console steps and what NOT to do: Google Search Console (Domain property via DNS), Bing Webmaster Tools
(import from GSC), IndexNow (a key file + a script that submits only changed URLs), Brave (search.brave.com/submit-url),
a Google Business Profile only if in-person service is real, LinkedIn company page, and which Indian directories or
citations are worth it for a new studio with no clients yet (and which to skip). Also how to pitch the Gujarat data
to SGCCI / local business reporters in one message.

Answer D1-D4, the Hindi review, then R3. End with the list of points still open.
