import { createHash, createHmac, timingSafeEqual } from "node:crypto";

/**
 * Unsubscribe tokens for the email engine (docs/spec/outreach-contract.md, "Token"). The lead generator signs them; this
 * website only verifies them at /u/{token}. Both sides must produce byte-identical tokens, so the rules are exact:
 *
 *   payload = compact JSON with sorted keys: {"h":"<sha256 hex of the address>","m":"<send record id>","v":1}
 *             (Python: json.dumps(p, sort_keys=True, separators=(",", ":")); all values ASCII)
 *   p       = base64url(payload UTF-8 bytes), no "=" padding
 *   sig     = base64url(HMAC-SHA256(key = the secret's UTF-8 bytes, message = p as ASCII)), no padding
 *   token   = p + "." + sig
 *
 * The secret is OUTREACH_SIGNING_SECRET with surrounding whitespace removed (src/lib/outreach.ts).
 * tests/outreach-token.test.ts holds a fixed known-answer vector that the Python side tests against too.
 */

export const TOKEN_VERSION = 1;
/** Longer input is rejected before any work; a real token is about 170 characters. */
export const MAX_TOKEN_LENGTH = 1024;

const HASH_RE = /^[0-9a-f]{64}$/;
const B64URL_RE = /^[A-Za-z0-9_-]+$/;
/** A 32-byte HMAC-SHA256 digest is 43 base64url characters without padding. */
const SIG_LENGTH = 43;

export type TokenCheck =
  | { ok: true; hash: string; sendId: string }
  | { ok: false; reason: "malformed" | "signature" | "payload" };

/** The address hash both repos use: sha256_hex(email.strip().lower()). The website never stores a plain address;
 *  this exists for tests and the known-answer vector. */
export function emailHash(email: string): string {
  return createHash("sha256").update(email.trim().toLowerCase(), "utf8").digest("hex");
}

export function isEmailHash(value: unknown): value is string {
  return typeof value === "string" && HASH_RE.test(value);
}

function sign(p: string, secret: string): string {
  return createHmac("sha256", Buffer.from(secret, "utf8")).update(p, "ascii").digest("base64url");
}

/** Builds a token. Production tokens come from the lead generator; this is the reference implementation for tests. */
export function signToken(hash: string, sendId: string, secret: string): string {
  if (!secret) throw new Error("signing secret is empty");
  if (!isEmailHash(hash)) throw new Error("hash must be 64 lowercase hex characters");
  // Keys written in sorted order (h, m, v); JSON.stringify keeps insertion order and adds no spaces.
  const payload = JSON.stringify({ h: hash, m: sendId, v: TOKEN_VERSION });
  const p = Buffer.from(payload, "utf8").toString("base64url");
  return `${p}.${sign(p, secret)}`;
}

/** Verifies a token in constant time. Never throws on bad input; throws only when called without a secret, so a
 *  missing configuration can never turn into "every token is valid". */
export function verifyToken(token: unknown, secret: string): TokenCheck {
  if (!secret) throw new Error("signing secret is empty");
  if (typeof token !== "string" || token.length === 0 || token.length > MAX_TOKEN_LENGTH) {
    return { ok: false, reason: "malformed" };
  }
  const parts = token.split(".");
  if (parts.length !== 2) return { ok: false, reason: "malformed" };
  const [p, given] = parts;
  if (!B64URL_RE.test(p) || given.length !== SIG_LENGTH || !B64URL_RE.test(given)) {
    return { ok: false, reason: "malformed" };
  }

  // Both strings are exactly 43 ASCII characters here, so timingSafeEqual compares equal lengths. Comparing the
  // canonical encodings (not decoded bytes) also rejects the alternative spellings base64url allows in the last
  // character, so one signature has exactly one valid token.
  const want = sign(p, secret);
  if (!timingSafeEqual(Buffer.from(given, "ascii"), Buffer.from(want, "ascii"))) {
    return { ok: false, reason: "signature" };
  }

  let payload: unknown;
  try {
    payload = JSON.parse(Buffer.from(p, "base64url").toString("utf8"));
  } catch {
    return { ok: false, reason: "payload" };
  }
  if (!payload || typeof payload !== "object") return { ok: false, reason: "payload" };
  const { h, m, v } = payload as Record<string, unknown>;
  if (v !== TOKEN_VERSION || !isEmailHash(h)) return { ok: false, reason: "payload" };
  // The contract writes m as a string. A signed numeric id is accepted too: the signature already proves the lead
  // generator issued it, and refusing an authentic unsubscribe would be the worse failure.
  const sendId = typeof m === "string" ? m : typeof m === "number" && Number.isFinite(m) ? String(m) : "";
  if (!sendId) return { ok: false, reason: "payload" };
  return { ok: true, hash: h, sendId };
}
