import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const COOKIE_NAME = "sb_admin";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function secret(): Uint8Array {
  const s = process.env.JWT_SECRET;
  if (!s) throw new Error("JWT_SECRET is not configured");
  return new TextEncoder().encode(s);
}

export async function createAdminToken(email: string): Promise<string> {
  return new SignJWT({ role: "admin", email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(secret());
}

export async function verifyAdminToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, secret());
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export async function setAdminCookie(token: string) {
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function clearAdminCookie() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function isAdminRequest(): Promise<boolean> {
  const store = await cookies();
  return verifyAdminToken(store.get(COOKIE_NAME)?.value);
}

/** Defence in depth (P3): every /api/admin data route calls this first, so a broken middleware
 *  matcher or a route added outside it no longer publishes admin data (RISK R4).
 *  Returns the 401 response to send, or null when the request is authorised. */
export async function requireAdmin(): Promise<NextResponse | null> {
  if (await isAdminRequest()) return null;
  return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
}

export const ADMIN_COOKIE = COOKIE_NAME;

/** Constant-time-ish string compare (both sides hashed first is overkill here;
 *  lengths are equalised to avoid trivial timing leaks). */
export function safeEqual(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const ab = enc.encode(a);
  const bb = enc.encode(b);
  if (ab.length !== bb.length) return false;
  let diff = 0;
  for (let i = 0; i < ab.length; i++) diff |= ab[i] ^ bb[i];
  return diff === 0;
}
