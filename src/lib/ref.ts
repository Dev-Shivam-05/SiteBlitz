import { randomInt } from "node:crypto";

/** Public lead reference, e.g. "SB-7K2Q". It goes into Telegram alerts and gets read out on calls,
 *  so the alphabet drops look-alikes (0/O, 1/I/L). randomInt is crypto-backed: refs are not
 *  sequential and cannot be guessed from one another. 31^4 ≈ 923k combinations; collisions are
 *  handled by the unique index + retry in withUniqueRef(). */
export const REF_ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
export const REF_PATTERN = /^SB-[23456789ABCDEFGHJKMNPQRSTUVWXYZ]{4}$/;

export function generateRef(): string {
  let s = "";
  for (let i = 0; i < 4; i++) s += REF_ALPHABET[randomInt(REF_ALPHABET.length)];
  return `SB-${s}`;
}

/** True for a Mongo duplicate-key error on the `ref` index (and not on some other unique key). */
export function isDuplicateRefError(e: unknown): boolean {
  if (!e || typeof e !== "object") return false;
  const err = e as { code?: number; keyPattern?: Record<string, unknown>; message?: string };
  if (err.code !== 11000) return false;
  if (err.keyPattern) return "ref" in err.keyPattern;
  return /ref_1/.test(err.message || "");
}

/** Runs `create(ref)` with a fresh ref, retrying only when the ref collided. */
export async function withUniqueRef<T>(
  create: (ref: string) => Promise<T>,
  gen: () => string = generateRef,
  tries = 5
): Promise<T> {
  let last: unknown;
  for (let i = 0; i < tries; i++) {
    try {
      return await create(gen());
    } catch (e) {
      if (!isDuplicateRefError(e)) throw e;
      last = e;
    }
  }
  throw last instanceof Error ? last : new Error("ref_exhausted");
}
