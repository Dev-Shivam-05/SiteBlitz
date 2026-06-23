import { NextRequest, NextResponse } from "next/server";
import { createAdminToken, safeEqual, ADMIN_COOKIE } from "@/lib/auth";

export const runtime = "nodejs";

// naive in-memory throttle (per lambda instance) — good enough to slow brute force
const attempts = new Map<string, { n: number; at: number }>();

export async function POST(req: NextRequest) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) {
    return NextResponse.json(
      { ok: false, error: "Admin credentials are not configured on the server." },
      { status: 500 }
    );
  }

  const ip =
    req.headers.get("x-real-ip") ||
    (req.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
  const rec = attempts.get(ip);
  const now = Date.now();
  if (rec && rec.n >= 8 && now - rec.at < 15 * 60_000) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Try again in 15 minutes." },
      { status: 429 }
    );
  }

  let body: { email?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const emailOk = safeEqual((body.email || "").trim().toLowerCase(), adminEmail.toLowerCase());
  const passOk = safeEqual(body.password || "", adminPassword);

  if (!emailOk || !passOk) {
    attempts.set(ip, { n: (rec && now - rec.at < 15 * 60_000 ? rec.n : 0) + 1, at: now });
    return NextResponse.json({ ok: false, error: "Invalid email or password." }, { status: 401 });
  }

  attempts.delete(ip);
  const token = await createAdminToken(adminEmail);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
