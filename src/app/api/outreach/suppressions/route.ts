import { NextRequest } from "next/server";
import {
  SuppressionInput,
  addSuppression,
  apiGuard,
  apiJson,
  dbUnavailable,
  invalidInput,
  listSuppressions,
  outreachDb,
  readJson,
} from "@/lib/outreach";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** "stop" replies, hard bounces, complaints and manual do-not-contact, written here first by the lead generator.
 *  Upsert: the first reason and time stay, later ones are appended to the history. */
export async function POST(req: NextRequest) {
  const denied = apiGuard(req);
  if (denied) return denied;
  const parsed = SuppressionInput.safeParse(await readJson(req));
  if (!parsed.success) return invalidInput(parsed.error);
  try {
    await outreachDb();
    await addSuppression(parsed.data.hash, parsed.data.reason, parsed.data.source);
    return apiJson({ ok: true });
  } catch {
    return dbUnavailable();
  }
}

/** Pages through the list for the lead generator's local display copy: `?since=<ISO>` (inclusive), 1,000 per page,
 *  `next` is the `since` for the following page or null on the last one. */
export async function GET(req: NextRequest) {
  const denied = apiGuard(req);
  if (denied) return denied;
  const sinceRaw = req.nextUrl.searchParams.get("since");
  let since: Date | null = null;
  if (sinceRaw) {
    since = /^\d{4}-\d{2}-\d{2}/.test(sinceRaw) ? new Date(sinceRaw) : new Date(NaN);
    if (Number.isNaN(since.getTime())) return apiJson({ ok: false, error: "Invalid input", issues: ["since: ISO date expected"] }, 400);
  }
  try {
    await outreachDb();
    return apiJson({ ok: true, ...(await listSuppressions(since)) });
  } catch {
    return dbUnavailable();
  }
}
