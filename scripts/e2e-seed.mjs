// Admin E2E against a SCRATCH database only (CLAUDE.md, "E2E without touching production"):
//   1. run the cached mongod on a scratch dbpath/port, 2. `next start -p 3100` with MONGODB_URI pointing at it and
//   test-only ADMIN_EMAIL / ADMIN_PASSWORD / JWT_SECRET / CRON_SECRET, 3. `node scripts/e2e-seed.mjs`.
// It runs docs/VERIFY.md section E steps 1-6, seeds 12 "QA" leads and 8 visits through the real API, and prints
// the admin cookie on its last line (for scripts/shoot.mjs or scripts/frames.mjs --cookie). Never point it at a
// real deployment: it writes test leads.
const BASE = process.env.E2E_BASE || "http://localhost:3100";
const EMAIL = process.env.E2E_ADMIN_EMAIL || "qa@example.com";
const PASS = process.env.E2E_ADMIN_PASSWORD || "qa-pass-2026-only-local";
if (!/^http:\/\/(localhost|127\.0\.0\.1)/.test(BASE)) {
  console.error("e2e-seed only runs against a local server");
  process.exit(2);
}

const ADMIN_ROUTES = [
  "stats", "today", "leads", "live", "visitors", "visitors/abc123abc123", "audience", "events", "funnel", "pages",
  "campaigns", "grader", "settings", "export?type=leads&days=30", "adspend", "notifications/retry",
];

// Section E (docs/VERIFY.md): logged out
const r0 = await fetch(`${BASE}/admin`, { redirect: "manual" });
console.log("E1 logged-out /admin ->", r0.status, r0.headers.get("location"));
const codes = [];
for (const r of ADMIN_ROUTES) codes.push(`${r}:${(await fetch(`${BASE}/api/admin/${r}`)).status}`);
console.log("E2/E3 logged-out api ->", codes.join(" "));
const bad = await fetch(`${BASE}/api/admin/login`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: EMAIL, password: "wrong" }) });
console.log("E4 wrong password ->", bad.status, JSON.stringify(await bad.json()));

const login = await fetch(`${BASE}/api/admin/login`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: EMAIL, password: PASS }) });
const setCookie = login.headers.get("set-cookie") || "";
const cookie = setCookie.split(";")[0];
console.log("E5 login ->", login.status, /HttpOnly/i.test(setCookie) ? "HttpOnly" : "NOT HttpOnly");
const r6 = await fetch(`${BASE}/admin/login`, { redirect: "manual", headers: { cookie } });
console.log("E6 logged-in /admin/login ->", r6.status, r6.headers.get("location"));

const LEADS = [
  ["QA Rose Salon", "9876500001", "SB-R1", "salon", "new"],
  ["QA BrightPath", "9876500002", "SB-S1", "coaching", "new"],
  ["QA Oak Studio", "9876500003", "website", "showroom", "contacted"],
  ["QA Glow Clinic", "9876500004", "referral", "clinic", "contacted"],
  ["QA Spice Hub", "9876500005", "walk-in", "restaurant", "qualified"],
  ["QA Thread Co", "9876500006", "SB-H1", "boutique", "demo"],
  ["QA Mehta Law", "9876500007", "SB-G1", "law firm", "concept"],
  ["QA Prime Tutors", "9876500008", "SB-S1", "coaching", "quoted"],
  ["QA Lotus Spa", "9876500009", "SB-R1", "salon", "won"],
  ["QA Urban Decor", "9876500010", "website", "showroom", "lost"],
  ["QA Navsari Bakes", "9876500011", "walk-in", "other", "new"],
  ["QA Shine Coaching", "9876500012", "SB-E1", "coaching", "qualified"],
];
for (const [name, phone, sourceCode, businessType, status] of LEADS) {
  const r = await fetch(`${BASE}/api/admin/leads`, {
    method: "POST",
    headers: { "content-type": "application/json", cookie },
    body: JSON.stringify({ name, phone, sourceCode, businessType, status, nextAction: "Reply on WhatsApp", allowDuplicate: true }),
  });
  if (r.status !== 201) console.log("lead", name, r.status, await r.text());
}
console.log("seeded leads:", LEADS.length);

const VISITS = [
  ["IN", "Navsari", ["/", "/pricing", "/demo/salon"]],
  ["IN", "Surat", ["/", "/demo/showroom"]],
  ["IN", "Ahmedabad", ["/", "/pricing", "/contact"]],
  ["IN", "Mumbai", ["/"]],
  ["IN", "Delhi", ["/", "/demo/coaching"]],
  ["AE", "Dubai", ["/", "/pricing"]],
  ["GB", "London", ["/"]],
  ["US", "", ["/", "/about"]],
];
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";
for (const [cc, city, paths] of VISITS) {
  let sid = "";
  for (const path of paths) {
    const r = await fetch(`${BASE}/api/track`, {
      method: "POST",
      headers: { "content-type": "text/plain", "user-agent": UA, "x-vercel-ip-country": cc, ...(city ? { "x-vercel-ip-city": city } : {}), ...(sid ? { cookie: sid } : {}) },
      body: JSON.stringify({ type: "pageview", path, title: "SiteBlitz", screen: "1440x900", language: "en-IN", referrer: "https://www.google.com/" }),
    });
    const sc = r.headers.get("set-cookie") || "";
    const m = sc.match(/sb_sid=[^;]+/);
    const v = sc.match(/sb_vid=[^;]+/);
    if (!sid && m) sid = [m[0], v?.[0]].filter(Boolean).join("; ");
  }
  await fetch(`${BASE}/api/track`, {
    method: "POST",
    headers: { "content-type": "text/plain", "user-agent": UA, "x-vercel-ip-country": cc, cookie: sid },
    body: JSON.stringify({ type: "event", name: "hero_whatsapp", path: "/", meta: { text: "Chat on WhatsApp" } }),
  });
}
console.log("seeded visits:", VISITS.length);
console.log(cookie);
