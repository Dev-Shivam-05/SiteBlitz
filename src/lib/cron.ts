import { createHash, timingSafeEqual } from "node:crypto";

/** Checks `Authorization: Bearer <secret>` in constant time. Both sides are SHA-256 hashed first so
 *  the comparison is fixed-length and leaks neither the secret's content nor its length.
 *  (lib/auth.ts safeEqual returns early on a length mismatch, which is fine for a password form
 *  but not for a machine endpoint that can be probed without rate limits.) */
export function bearerMatches(header: string | null | undefined, secret: string): boolean {
  if (!secret) return false;
  const m = /^Bearer (.+)$/.exec(header || "");
  const given = createHash("sha256").update(m ? m[1] : "").digest();
  const want = createHash("sha256").update(secret).digest();
  return timingSafeEqual(given, want) && Boolean(m);
}
