import { NextRequest } from "next/server";
import { dbConfigured } from "@/lib/db";
import { addSuppression, outreachConfig, outreachDb } from "@/lib/outreach";
import { unsubscribePages } from "@/lib/outreachPages";
import { verifyToken } from "@/lib/outreachToken";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Unsubscribe link from the List-Unsubscribe header and the email body (docs/spec/outreach-contract.md, RFC 8058).
 * No login, no cookie, no CAPTCHA, no redirect. The admin middleware does not match /u/ (tests/outreach-routes.test.ts).
 */

type Ctx = { params: Promise<{ token: string }> };

/** GET never unsubscribes: mail security scanners open every link in a message. It only shows the question. */
export async function GET(_req: NextRequest, { params }: Ctx) {
  const cfg = outreachConfig();
  if (!cfg.signingSecretOk) return unsubscribePages.unavailable();
  const { token } = await params;
  return verifyToken(token, cfg.signingSecret).ok ? unsubscribePages.confirm() : unsubscribePages.invalid();
}

const plain = (body: string, status: number) =>
  new Response(body, {
    status,
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" },
  });

/** RFC 8058 one-click: the mail provider POSTs `List-Unsubscribe=One-Click`, form-encoded (urlencoded or multipart). */
async function isOneClick(req: NextRequest): Promise<boolean> {
  const type = req.headers.get("content-type") || "";
  try {
    if (type.includes("application/x-www-form-urlencoded") || type.includes("multipart/form-data")) {
      return (await req.formData()).get("List-Unsubscribe") === "One-Click";
    }
    const text = (await req.text()).slice(0, 2000).trim();
    return new URLSearchParams(text).get("List-Unsubscribe") === "One-Click";
  } catch {
    return false;
  }
}

/** Any POST with a valid token unsubscribes: the one-click body from a mail provider, or the button on the GET page.
 *  The answer is 200 only after MongoDB acknowledged the write; repeating it is harmless. */
export async function POST(req: NextRequest, { params }: Ctx) {
  const oneClick = await isOneClick(req);
  const cfg = outreachConfig();
  if (!cfg.signingSecretOk) return oneClick ? plain("unavailable", 503) : unsubscribePages.unavailable();

  const { token } = await params;
  const check = verifyToken(token, cfg.signingSecret);
  if (!check.ok) return oneClick ? plain("invalid link", 400) : unsubscribePages.invalid();
  if (!dbConfigured()) return oneClick ? plain("unavailable", 503) : unsubscribePages.unavailable();

  try {
    await outreachDb();
    await addSuppression(
      check.hash,
      oneClick ? "unsubscribe_one_click" : "unsubscribe_link",
      `send:${check.sendId}`.slice(0, 200)
    );
  } catch {
    return oneClick ? plain("unavailable", 503) : unsubscribePages.unavailable();
  }
  return oneClick ? plain("ok", 200) : unsubscribePages.done();
}
