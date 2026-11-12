import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { bearerMatches } from "./cron";
import { dbConfigured, dbConnect } from "./db";
import {
  CONCEPT_DEMOS,
  OBSERVATION_TYPES,
  OutreachSnapshot,
  OutreachSuppression,
  SNAPSHOT_VERTICALS,
  type OutreachSnapshotDoc,
  type SuppressionReason,
} from "./models";
import { isEmailHash } from "./outreachToken";
import { SITE } from "./site";

/**
 * Email engine v2, website side (docs/spec/outreach-contract.md). The lead generator on the founders' laptop sends the
 * emails; this website keeps the parts that must answer while the laptop is off: the unsubscribe endpoint (/u/), the
 * authoritative suppression list and the snapshot pages (/s/). Nothing is ever sent from here.
 */

/* ------------------------------------------------------------------ */
/* Configuration                                                       */
/* ------------------------------------------------------------------ */

/** The contract asks for random secrets of 32+ bytes; anything shorter is treated as not configured. */
export const MIN_SECRET_LENGTH = 32;

export interface OutreachConfig {
  apiKey: string;
  signingSecret: string;
  publicBaseUrl: string;
  /** /u/ needs only the signing secret, so unsubscribes keep working even when the API key is missing */
  signingSecretOk: boolean;
  /** null when both secrets are usable; otherwise why the API routes answer 503 */
  problem: string | null;
}

/** Read per request (not at import), so a changed env var takes effect on the next cold start without code changes
 *  and tests can set it. There is deliberately no default secret: missing or short values disable the routes. */
export function outreachConfig(env: Record<string, string | undefined> = process.env): OutreachConfig {
  const apiKey = (env.OUTREACH_API_KEY || "").trim();
  const signingSecret = (env.OUTREACH_SIGNING_SECRET || "").trim();
  const publicBaseUrl = ((env.OUTREACH_PUBLIC_BASE_URL || "").trim() || SITE.url).replace(/\/+$/, "");
  const signingSecretOk = signingSecret.length >= MIN_SECRET_LENGTH;
  // The API also needs the signing secret: if unsubscribe links cannot be verified, the lead generator must not send,
  // and every send starts with a suppression check that then answers 503.
  let problem: string | null = null;
  if (apiKey.length < MIN_SECRET_LENGTH) problem = "OUTREACH_API_KEY is missing or shorter than 32 characters";
  else if (!signingSecretOk) problem = "OUTREACH_SIGNING_SECRET is missing or shorter than 32 characters";
  return { apiKey, signingSecret, publicBaseUrl, signingSecretOk, problem };
}

/* ------------------------------------------------------------------ */
/* Database                                                            */
/* ------------------------------------------------------------------ */

let indexesReady: Promise<void> | null = null;

/** Connects and makes sure the unique indexes exist before the first write (createIndexes is idempotent). A failed
 *  attempt is forgotten, so the next request tries again instead of failing until the next cold start. */
export async function outreachDb(): Promise<void> {
  if (!dbConfigured()) throw new Error("MONGODB_URI is not configured");
  await dbConnect();
  if (!indexesReady) {
    indexesReady = Promise.all([OutreachSuppression.createIndexes(), OutreachSnapshot.createIndexes()]).then(() => {});
    indexesReady.catch(() => {
      indexesReady = null;
    });
  }
  await indexesReady;
}

/** Later events kept per suppressed address. Bounds the document: a valid unsubscribe link can be POSTed any number
 *  of times, and an unbounded array would eventually hit MongoDB's 16 MB document limit and make writes fail. */
export const SUPPRESSION_HISTORY_MAX = 100;

const isDuplicateKey = (e: unknown) => (e as { code?: number })?.code === 11000;

/** Upserts a suppression. The first reason, source and time stay on the document; every later one is appended to
 *  history. Resolves only after MongoDB acknowledged the write. */
export async function addSuppression(
  hash: string,
  reason: SuppressionReason,
  source: string,
  now = new Date()
): Promise<{ created: boolean }> {
  for (let attempt = 0; ; attempt++) {
    try {
      const res = await OutreachSuppression.updateOne(
        { hash },
        { $setOnInsert: { hash, reason, source, created_at: now, history: [] } },
        { upsert: true }
      );
      if (res.upsertedCount === 1) return { created: true };
      await OutreachSuppression.updateOne(
        { hash },
        { $push: { history: { $each: [{ reason, source, at: now }], $slice: -SUPPRESSION_HISTORY_MAX } } }
      );
      return { created: false };
    } catch (e) {
      // two first-time requests for the same address at once: the loser hits the unique index; retry once as "exists"
      if (isDuplicateKey(e) && attempt === 0) continue;
      throw e;
    }
  }
}

export async function suppressedAmong(hashes: readonly string[]): Promise<string[]> {
  if (hashes.length === 0) return [];
  const docs = await OutreachSuppression.find({ hash: { $in: [...new Set(hashes)] } }, { hash: 1, _id: 0 }).lean();
  return docs.map((d) => d.hash);
}

export const SUPPRESSION_PAGE_SIZE = 1000;

/** Suppressions created at or after `since`, oldest first. `since` is inclusive so a page boundary can never skip an
 *  item that shares the boundary millisecond; the caller de-duplicates by hash. */
export async function listSuppressions(since: Date | null) {
  const docs = await OutreachSuppression.find(since ? { created_at: { $gte: since } } : {}, {
    hash: 1,
    reason: 1,
    created_at: 1,
  })
    .sort({ created_at: 1, _id: 1 })
    .limit(SUPPRESSION_PAGE_SIZE)
    .lean();
  const items = docs.map((d) => ({ hash: d.hash, reason: d.reason, created_at: d.created_at.toISOString() }));
  const next = docs.length === SUPPRESSION_PAGE_SIZE ? items[items.length - 1].created_at : null;
  return { items, next };
}

/* ------------------------------------------------------------------ */
/* Snapshots                                                           */
/* ------------------------------------------------------------------ */

/** Upper bound for the decoded evidence image. The contract says "max 400 KB"; 400 x 1024 bytes is accepted so a
 *  sender that counts 400 x 1000 never gets refused. */
export const EVIDENCE_MAX_BYTES = 400 * 1024;
/** Snapshot pages expire after 30 days (spec row 7); a shorter life may be requested, never a longer one. */
export const SNAPSHOT_MAX_DAYS = 30;

const isoDate = z
  .string()
  .max(40)
  .refine((s) => /^\d{4}-\d{2}-\d{2}/.test(s) && !Number.isNaN(Date.parse(s)), "ISO date expected");

const httpsUrl = z
  .string()
  .max(2000)
  .refine((s) => {
    try {
      return new URL(s).protocol === "https:";
    } catch {
      return false;
    }
  }, "https URL expected");

const text = (max: number) => z.string().trim().min(1).max(max);

export const SnapshotInput = z
  .object({
    business_name: text(120),
    city: text(80),
    vertical: z.enum(SNAPSHOT_VERTICALS),
    observation: z.object({
      type: z.enum(OBSERVATION_TYPES),
      text: text(300),
      checked_at: isoDate,
    }),
    evidence_image_base64: z.string().max(Math.ceil((EVIDENCE_MAX_BYTES * 4) / 3) + 8).optional(),
    concept_demo: z.enum(CONCEPT_DEMOS),
    offer: z.object({
      price_inr: z.number().int().positive(),
      scope_lines: z.array(text(120)).min(1).max(6),
      yearly_costs_note: text(200),
    }),
    recording: z
      .object({
        url: httpsUrl.optional().or(z.literal("")),
        transcript: z.string().trim().max(2000).optional(),
      })
      .optional(),
    reply_email: z.string().trim().email().max(200),
    expires_in_days: z.number().int().min(1).max(SNAPSHOT_MAX_DAYS).default(SNAPSHOT_MAX_DAYS),
  })
  .refine((d) => !d.recording?.url || Boolean(d.recording.transcript), {
    message: "recording.transcript is required when recording.url is set",
    path: ["recording", "transcript"],
  });
export type SnapshotInputT = z.infer<typeof SnapshotInput>;

/** Decodes the optional evidence image and checks it really is a PNG or JPEG within the size limit. */
export function decodeEvidence(b64: string | undefined): { ok: true; image?: Buffer; mime?: "image/png" | "image/jpeg" } | { ok: false; error: string } {
  if (!b64) return { ok: true };
  const clean = b64.replace(/\s+/g, "");
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(clean)) return { ok: false, error: "evidence_image_base64 is not base64" };
  const buf = Buffer.from(clean, "base64");
  if (buf.length === 0 || buf.length > EVIDENCE_MAX_BYTES) return { ok: false, error: "evidence image is empty or over 400 KB" };
  const png = buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  const jpeg = buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
  if (!png && !jpeg) return { ok: false, error: "evidence image must be PNG or JPEG" };
  return { ok: true, image: buf, mime: png ? "image/png" : "image/jpeg" };
}

const BASE32 = "abcdefghijklmnopqrstuvwxyz234567";

/** Business-name words, ASCII only, at most 40 characters ("Shree Ganesh Salon" -> "shree-ganesh-salon"). */
export function slugWords(name: string): string {
  const words = name
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean);
  let out = "";
  for (const w of words) {
    const next = out ? `${out}-${w}` : w;
    if (next.length > 40) break;
    out = next;
  }
  if (!out && words.length) out = words[0].slice(0, 40);
  // a name with no ASCII letters or digits (e.g. written only in Gujarati) still gets a readable prefix
  return out || "snapshot";
}

/** 10 random base32 characters (50 bits). 256 is a multiple of 32, so `byte & 31` is uniform. */
export function randomSlugPart(): string {
  return Array.from(randomBytes(10), (b) => BASE32[b & 31]).join("");
}

export const SLUG_RE = /^[a-z0-9-]{1,40}-[a-z2-7]{10}$/;

export async function createSnapshot(input: SnapshotInputT, evidence: { image?: Buffer; mime?: string }, now = new Date()) {
  const expires = new Date(now.getTime() + input.expires_in_days * 86_400_000);
  const recording = input.recording?.url ? { url: input.recording.url, transcript: input.recording.transcript } : undefined;
  for (let attempt = 0; ; attempt++) {
    const slug = `${slugWords(input.business_name)}-${randomSlugPart()}`;
    try {
      await OutreachSnapshot.create({
        slug,
        business_name: input.business_name,
        city: input.city,
        vertical: input.vertical,
        observation: {
          type: input.observation.type,
          text: input.observation.text,
          checked_at: new Date(input.observation.checked_at),
        },
        evidence_image: evidence.image,
        evidence_mime: evidence.mime,
        concept_demo: input.concept_demo,
        offer: input.offer,
        recording,
        reply_email: input.reply_email,
        created_at: now,
        expires_at: expires,
        removed_at: null,
        raw_view_count: 0,
      });
      return { slug, expires_at: expires };
    } catch (e) {
      // 50 random bits make a collision practically impossible; one retry covers it anyway
      if (isDuplicateKey(e) && attempt < 2) continue;
      throw e;
    }
  }
}

export type SnapshotView =
  | { state: "live"; doc: OutreachSnapshotDoc }
  | { state: "gone" }
  | { state: "missing" };

/** Loads a live snapshot and counts the request (server-side, raw). Expired or removed pages are "gone" (410). */
export async function viewSnapshot(slug: string, now = new Date()): Promise<SnapshotView> {
  if (!SLUG_RE.test(slug)) return { state: "missing" };
  const doc = await OutreachSnapshot.findOneAndUpdate(
    { slug, removed_at: null, expires_at: { $gt: now } },
    { $inc: { raw_view_count: 1 } },
    { new: true }
  ).lean<OutreachSnapshotDoc>();
  if (doc) return { state: "live", doc };
  const exists = await OutreachSnapshot.exists({ slug });
  return exists ? { state: "gone" } : { state: "missing" };
}

/** Sets removed_at once; removal is final. Removing an already removed or expired page is still a success. */
export async function removeSnapshot(slug: string, now = new Date()): Promise<"removed" | "missing"> {
  if (!SLUG_RE.test(slug)) return "missing";
  const res = await OutreachSnapshot.updateOne({ slug, removed_at: null }, { $set: { removed_at: now } });
  if (res.matchedCount === 1) return "removed";
  return (await OutreachSnapshot.exists({ slug })) ? "removed" : "missing";
}

/* ------------------------------------------------------------------ */
/* API helpers (Bearer routes under /api/outreach)                     */
/* ------------------------------------------------------------------ */

/** JSON with Cache-Control: no-store (contract: suppression answers must never come from a cache). */
export function apiJson(body: unknown, status = 200): NextResponse {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

/** Order: configuration (503), then the key (401). Each route then validates (400) and only then touches the
 *  database; outreachDb() throws when MONGODB_URI is unset or the server is unreachable, and the route answers 503. */
export function apiGuard(req: Request): NextResponse | null {
  const cfg = outreachConfig();
  if (cfg.problem) return apiJson({ ok: false, error: "outreach_not_configured" }, 503);
  if (!bearerMatches(req.headers.get("authorization"), cfg.apiKey)) {
    return apiJson({ ok: false, error: "Unauthorized" }, 401);
  }
  return null;
}

/** Largest accepted request body: a 400 KB image is about 546,000 base64 characters. */
export const MAX_BODY_CHARS = 1_000_000;

/** Parses a JSON body; null when it is too large or not JSON (the caller answers 400). */
export async function readJson(req: Request): Promise<unknown | null> {
  const raw = await req.text().catch(() => "");
  if (!raw || raw.length > MAX_BODY_CHARS) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export const HashList = z.object({ hashes: z.array(z.string().refine(isEmailHash)).max(500) });

export const SuppressionInput = z.object({
  hash: z.string().refine(isEmailHash),
  reason: z.enum(["reply_stop", "hard_bounce", "complaint", "manual"]),
  source: z.string().max(200).default(""),
});

export const dbUnavailable = () => apiJson({ ok: false, error: "db_unavailable" }, 503);

/** 400 with the first few field problems, so the lead generator's log says what to fix. */
export const invalidInput = (err: z.ZodError) =>
  apiJson(
    {
      ok: false,
      error: "Invalid input",
      issues: err.issues.slice(0, 10).map((i) => `${i.path.join(".") || "body"}: ${i.message}`),
    },
    400
  );
