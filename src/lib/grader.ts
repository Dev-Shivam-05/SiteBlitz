/** The SiteBlitz Website Grader — server-side heuristic audit of a public URL.
 *  Honest by design: every finding names exactly what was checked. No external
 *  APIs, no invented scores — just measurable signals from the page itself. */

export interface Finding {
  check: string;
  ok: boolean;
  note: string;
  weight: number;
  category: "seo" | "performance" | "trust" | "ux";
}

export interface GradeResult {
  url: string;
  finalUrl: string;
  score: number;
  categories: { seo: number; performance: number; trust: number; ux: number };
  findings: Finding[];
  fetchMs: number;
  htmlKB: number;
}

import { lookup } from "node:dns/promises";
import { request as httpRequest, type IncomingMessage } from "node:http";
import { request as httpsRequest } from "node:https";
import { isIP, type LookupFunction } from "node:net";
import { Readable, pipeline } from "node:stream";
import { constants as zc, createBrotliDecompress, createGunzip, createInflate } from "node:zlib";

const UA =
  "Mozilla/5.0 (compatible; SiteBlitzGrader/1.0; +https://siteblitz.vercel.app/tools/grader)";

/** True if an IP (v4 or v6) is loopback, private, link-local (incl. cloud
 *  metadata 169.254.169.254), CGNAT, or otherwise non-public. */
/** @internal — exported for tests; not part of the module's public surface. */
export function isPrivateIp(ip: string): boolean {
  // unwrap IPv4-mapped IPv6 (::ffff:a.b.c.d)
  const v4 = /^::ffff:(\d+\.\d+\.\d+\.\d+)$/i.exec(ip)?.[1] || (isIP(ip) === 4 ? ip : null);
  if (v4) {
    const parts = v4.split(".").map(Number);
    if (parts.length !== 4 || parts.some((p) => Number.isNaN(p) || p > 255)) return true;
    const [a, b] = parts;
    if (a === 0 || a === 10 || a === 127) return true; // this-net, private, loopback
    if (a === 100 && b >= 64 && b <= 127) return true; // CGNAT
    if (a === 169 && b === 254) return true; // link-local + cloud metadata
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    if (a === 192 && b === 0) return true; // 192.0.0.0/24 special
    if (a === 198 && (b === 18 || b === 19)) return true; // benchmarking
    if (a >= 224) return true; // multicast + reserved
    return false;
  }
  const low = ip.toLowerCase();
  if (low === "::" || low === "::1") return true;
  if (low.startsWith("fe8") || low.startsWith("fe9") || low.startsWith("fea") || low.startsWith("feb")) return true; // link-local
  if (low.startsWith("fc") || low.startsWith("fd")) return true; // unique local
  if (low.startsWith("ff")) return true; // multicast
  return false;
}

/** Validates one URL: public scheme, public host (every resolved address must
 *  be public). Returns the parsed URL or null. */
/** @internal — exported for tests. */
export async function validatePublicUrl(raw: string): Promise<URL | null> {
  let u: URL;
  try {
    u = new URL(raw);
  } catch {
    return null;
  }
  if (u.protocol !== "http:" && u.protocol !== "https:") return null;
  const host = u.hostname.replace(/^\[|\]$/g, "");
  if (!host) return null;
  if (isIP(host)) {
    return isPrivateIp(host) ? null : u;
  }
  if (!host.includes(".") || host === "localhost" || host.endsWith(".local") || host.endsWith(".internal")) return null;
  try {
    const addrs = await lookup(host, { all: true, verbatim: true });
    if (!addrs.length || addrs.some((a) => isPrivateIp(a.address))) return null;
  } catch {
    return null; // unresolvable — treat as unreachable
  }
  return u;
}

/** @internal — exported for tests. */
export function normalizeInput(input: string): string | null {
  let raw = input.trim();
  if (!raw) return null;
  if (!/^https?:\/\//i.test(raw)) raw = `https://${raw}`;
  return raw;
}

/** Connect-time resolver for every outbound socket. validatePublicUrl() checks
 *  DNS once, but a rebinding host can answer public for that check and private
 *  for the real connection — so the addresses the socket actually dials are
 *  re-checked here, and this is the only resolution the connection uses. */
/** @internal — exported for tests. */
export const guardedLookup: LookupFunction = (hostname, options, callback) => {
  lookup(hostname, { all: true, verbatim: true })
    .then((addrs) => {
      // same rule as validatePublicUrl: one private answer taints the host
      if (!addrs.length || addrs.some((a) => isPrivateIp(a.address))) {
        const err: NodeJS.ErrnoException = new Error(`Refusing non-public address for ${hostname}`);
        err.code = "ENOTFOUND";
        return callback(err, "");
      }
      const usable = options.family === 4 || options.family === 6
        ? addrs.filter((a) => a.family === options.family)
        : addrs;
      if (!usable.length) {
        const err: NodeJS.ErrnoException = new Error(`No usable address for ${hostname}`);
        err.code = "ENOTFOUND";
        return callback(err, "");
      }
      if (options.all) return callback(null, usable);
      callback(null, usable[0].address, usable[0].family);
    })
    .catch((e: NodeJS.ErrnoException) => callback(e, ""));
};

/** One GET over node:http(s) pinned to guardedLookup, adapted to a WHATWG
 *  Response so callers keep the fetch() shape. global fetch can't take a
 *  custom resolver without adding undici as a dependency. */
function requestPinned(url: URL, signal: AbortSignal): Promise<Response> {
  return new Promise((resolve, reject) => {
    const req = (url.protocol === "https:" ? httpsRequest : httpRequest)(
      url,
      {
        method: "GET",
        headers: { "user-agent": UA, accept: "text/html,*/*", "accept-encoding": "gzip, deflate, br" },
        lookup: guardedLookup,
        agent: false, // no pooled socket can outlive the check that admitted it
        signal,
      },
      (res) => {
        try {
          resolve(toResponse(res));
        } catch (e) {
          res.destroy();
          reject(e);
        }
      }
    );
    req.on("error", reject);
    req.end();
  });
}

function toResponse(res: IncomingMessage): Response {
  const status = res.statusCode ?? 0;
  if (status < 200 || status > 599) throw new Error(`Unsupported HTTP status ${status}`);
  const headers = new Headers();
  for (const [k, v] of Object.entries(res.headers)) {
    if (v === undefined) continue;
    for (const one of Array.isArray(v) ? v : [v]) headers.append(k, one);
  }
  if (status === 204 || status === 205 || status === 304) {
    res.resume();
    return new Response(null, { status, headers });
  }
  // fetch() decoded bodies for us; keep that so the HTML checks see text.
  // SYNC_FLUSH mirrors undici's leniency toward truncated streams.
  const enc = (res.headers["content-encoding"] || "").trim().toLowerCase();
  const decoder =
    enc === "gzip" || enc === "x-gzip" ? createGunzip({ flush: zc.Z_SYNC_FLUSH, finishFlush: zc.Z_SYNC_FLUSH })
    : enc === "deflate" ? createInflate({ flush: zc.Z_SYNC_FLUSH, finishFlush: zc.Z_SYNC_FLUSH })
    : enc === "br" ? createBrotliDecompress({ flush: zc.BROTLI_OPERATION_FLUSH, finishFlush: zc.BROTLI_OPERATION_FLUSH })
    : null;
  const body: Readable = decoder ? pipeline(res, decoder, () => {}) : res;
  // node:stream/web and lib.dom ReadableStream are the same object at runtime
  return new Response(Readable.toWeb(body) as unknown as ReadableStream<Uint8Array>, { status, headers });
}

/** Fetch with manual redirect handling — every hop is re-validated against
 *  the private-network rules, so a public host cannot 302 us internally. */
async function fetchPublic(
  startUrl: string,
  deadlineMs: number
): Promise<{ res: Response; finalUrl: string } | { error: string }> {
  const started = Date.now();
  let current = startUrl;
  for (let hop = 0; hop < 5; hop++) {
    const valid = await validatePublicUrl(current);
    if (!valid) {
      return { error: hop === 0
        ? "That doesn't look like a public website address."
        : "The site redirected somewhere we won't follow (non-public destination)." };
    }
    const remaining = deadlineMs - (Date.now() - started);
    if (remaining < 500) return { error: "The site took too long to respond." };
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), remaining);
    let res: Response;
    try {
      res = await requestPinned(valid, ctrl.signal);
    } catch {
      clearTimeout(t);
      return { error: "We couldn't reach that site (timeout or connection refused). Is it online?" };
    }
    clearTimeout(t);
    if (res.status >= 300 && res.status < 400) {
      const loc = res.headers.get("location");
      res.body?.cancel().catch(() => {});
      if (!loc) return { error: `The site responded with HTTP ${res.status} and no destination.` };
      current = new URL(loc, valid).toString();
      continue;
    }
    return { res, finalUrl: valid.toString() };
  }
  return { error: "Too many redirects (5+) — that's a finding in itself." };
}

export async function gradeWebsite(input: string): Promise<GradeResult | { error: string }> {
  const url = normalizeInput(input);
  if (!url) return { error: "That doesn't look like a public website address." };

  const started = Date.now();
  const DEADLINE = 12000;
  const fetched = await fetchPublic(url, DEADLINE);
  if ("error" in fetched) return { error: fetched.error };
  const { res, finalUrl } = fetched;

  let html: string;
  try {
    const reader = res.body?.getReader();
    // read at most ~2.5MB, and never past the overall deadline — a slow
    // streaming response can't hang the audit
    let received = 0;
    const chunks: Uint8Array[] = [];
    if (reader) {
      while (received < 2_500_000 && Date.now() - started < DEADLINE) {
        const chunk = await Promise.race([
          reader.read(),
          new Promise<{ done: true; value: undefined }>((r) =>
            setTimeout(() => r({ done: true, value: undefined }), Math.max(DEADLINE - (Date.now() - started), 100))
          ),
        ]);
        if (chunk.done) break;
        chunks.push(chunk.value);
        received += chunk.value.length;
      }
      reader.cancel().catch(() => {});
    }
    html = Buffer.concat(chunks).toString("utf8");
  } catch {
    return { error: "The site started responding but the connection broke mid-read." };
  }
  const fetchMs = Date.now() - started;
  const htmlKB = Math.round(html.length / 1024);
  const lower = html.toLowerCase();

  if (!res.ok) {
    return { error: `The site responded with HTTP ${res.status} — that's the first thing to fix.` };
  }

  const f: Finding[] = [];
  const add = (
    category: Finding["category"],
    check: string,
    ok: boolean,
    note: string,
    weight = 1
  ) => f.push({ category, check, ok, note, weight });

  /* ---------- SEO ---------- */
  const title = /<title[^>]*>([^<]*)<\/title>/i.exec(html)?.[1]?.trim() || "";
  add("seo", "Page title", title.length >= 15 && title.length <= 70,
    title ? (title.length < 15 ? `Title is only ${title.length} characters — too thin for Google.` : title.length > 70 ? `Title is ${title.length} characters — Google truncates after ~60.` : `"${title.slice(0, 60)}${title.length > 60 ? "…" : ""}" — good length.`) : "No <title> tag found — Google has nothing to show.", 2);

  // match "..." and '...' separately so an apostrophe inside a double-quoted
  // description doesn't truncate the captured value
  const metaDesc =
    /<meta[^>]+name=["']description["'][^>]+content="([^"]*)"/i.exec(html)?.[1] ||
    /<meta[^>]+name=["']description["'][^>]+content='([^']*)'/i.exec(html)?.[1] ||
    /<meta[^>]+content="([^"]*)"[^>]+name=["']description["']/i.exec(html)?.[1] ||
    /<meta[^>]+content='([^']*)'[^>]+name=["']description["']/i.exec(html)?.[1] ||
    "";
  add("seo", "Meta description", metaDesc.length >= 50 && metaDesc.length <= 165,
    metaDesc ? (metaDesc.length < 50 ? "Description exists but is too short to sell the click." : metaDesc.length > 165 ? "Description gets cut off in search results." : "Present and well-sized.") : "Missing — Google writes its own (usually worse) snippet.", 2);

  const h1s = (html.match(/<h1[\s>]/gi) || []).length;
  add("seo", "H1 heading", h1s === 1,
    h1s === 0 ? "No H1 found — the page never tells Google its main topic." : h1s > 1 ? `${h1s} H1 tags — should be exactly one.` : "Exactly one H1. Correct.", 1.5);

  const canonical = /<link[^>]+rel=["']canonical["']/i.test(html);
  add("seo", "Canonical URL", canonical, canonical ? "Set — protects against duplicate-content dilution." : "Missing — duplicate URLs can split your ranking signals.", 1);

  const jsonLd = /application\/ld\+json/i.test(html);
  add("seo", "Structured data (schema.org)", jsonLd, jsonLd ? "Present — eligible for rich results and AI citation." : "None found — invisible to rich results and harder for AI search to cite.", 1.5);

  const ogTags = /<meta[^>]+property=["']og:title["']/i.test(html);
  add("seo", "Social preview tags", ogTags, ogTags ? "Open Graph present — links look right on WhatsApp/LinkedIn." : "Missing — shared links show as bare URLs on WhatsApp and social.", 1);

  const textOnly = html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  const wordCount = textOnly.split(" ").filter((w) => w.length > 2).length;
  add("seo", "Crawlable content", wordCount >= 150,
    wordCount >= 150 ? `~${wordCount} words visible to crawlers.` : `Only ~${wordCount} words render without JavaScript — search engines may see a nearly empty page.`, 2);

  /* ---------- Performance ---------- */
  add("performance", "Server response", fetchMs < 1500,
    `First response in ${(fetchMs / 1000).toFixed(1)}s ${fetchMs < 800 ? "— fast." : fetchMs < 1500 ? "— acceptable." : "— slow; visitors on mobile feel this immediately."}`, 2);

  add("performance", "HTML size", htmlKB < 300,
    `${htmlKB} KB of HTML ${htmlKB < 100 ? "— lean." : htmlKB < 300 ? "— reasonable." : "— bloated (page-builder symptom); slows every visit."}`, 1.5);

  const imgCount = (html.match(/<img/gi) || []).length;
  const lazyCount = (html.match(/loading=["']lazy["']/gi) || []).length;
  add("performance", "Image lazy-loading", imgCount === 0 || lazyCount / Math.max(imgCount, 1) > 0.3,
    imgCount === 0 ? "No images in initial HTML." : `${lazyCount} of ${imgCount} images lazy-load${lazyCount / imgCount > 0.3 ? " — good." : " — most images load upfront, hurting mobile speed."}`, 1);

  const modernImg = /\.(webp|avif)/i.test(html);
  add("performance", "Modern image formats", modernImg || imgCount === 0,
    modernImg ? "WebP/AVIF detected — smaller, faster images." : "No WebP/AVIF found — images are likely 2–4× heavier than needed.", 1);

  const scriptCount = (html.match(/<script/gi) || []).length;
  add("performance", "Script count", scriptCount < 25,
    `${scriptCount} script tags ${scriptCount < 15 ? "— disciplined." : scriptCount < 25 ? "— borderline." : "— heavy; each one delays interactivity."}`, 1.5);

  const compression = res.headers.get("content-encoding");
  add("performance", "Compression", Boolean(compression),
    compression ? `${compression} enabled.` : "No compression header detected — text assets ship uncompressed.", 1);

  /* ---------- Trust ---------- */
  add("trust", "HTTPS", finalUrl.startsWith("https://"),
    finalUrl.startsWith("https://") ? "Secure connection." : "Not on HTTPS — browsers mark the site 'Not secure'.", 2);

  const hasContact = /contact|phone|tel:|mailto:|whatsapp|wa\.me/i.test(lower);
  add("trust", "Contact path", hasContact, hasContact ? "Contact route found." : "No phone, email or contact link detectable — visitors can't reach you.", 1.5);

  const hasPrivacy = /privacy/i.test(lower);
  add("trust", "Privacy policy", hasPrivacy, hasPrivacy ? "Privacy page referenced." : "No privacy policy found — required by ad platforms and expected by users.", 1);

  const favicon = /<link[^>]+rel=["'][^"']*icon[^"']*["']/i.test(html);
  add("trust", "Favicon", favicon, favicon ? "Present." : "Missing — the browser tab shows a blank page icon.", 0.5);

  /* ---------- UX ---------- */
  const viewport = /<meta[^>]+name=["']viewport["']/i.test(html);
  add("ux", "Mobile viewport", viewport, viewport ? "Configured." : "Missing — the site renders as a shrunken desktop page on phones.", 2);

  const langAttr = /<html[^>]+lang=/i.test(html);
  add("ux", "Language attribute", langAttr, langAttr ? "Set." : "Missing — hurts accessibility and translation.", 0.5);

  const altMissing = (html.match(/<img(?![^>]*alt=)[^>]*>/gi) || []).length;
  add("ux", "Image alt text", imgCount === 0 || altMissing === 0,
    imgCount === 0 ? "No images to check." : altMissing === 0 ? "All images carry alt text." : `${altMissing} of ${imgCount} images have no alt text — invisible to screen readers and image search.`, 1);

  const hasForm = /<form|wa\.me|tel:/i.test(lower);
  add("ux", "Action for the visitor", hasForm, hasForm ? "A form or direct-action link exists." : "No form, call or WhatsApp action found — the page has no way to convert a visitor.", 1.5);

  /* ---------- scoring ---------- */
  const byCat = (cat: Finding["category"]) => {
    const items = f.filter((x) => x.category === cat);
    const total = items.reduce((s, x) => s + x.weight, 0);
    const got = items.reduce((s, x) => s + (x.ok ? x.weight : 0), 0);
    return Math.round((got / Math.max(total, 0.001)) * 100);
  };
  const categories = {
    seo: byCat("seo"),
    performance: byCat("performance"),
    trust: byCat("trust"),
    ux: byCat("ux"),
  };
  const score = Math.round(
    categories.seo * 0.35 + categories.performance * 0.3 + categories.trust * 0.2 + categories.ux * 0.15
  );

  return { url, finalUrl, score, categories, findings: f, fetchMs, htmlKB };
}
