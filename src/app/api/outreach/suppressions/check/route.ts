import { NextRequest } from "next/server";
import { HashList, apiGuard, apiJson, dbUnavailable, invalidInput, outreachDb, readJson, suppressedAmong } from "@/lib/outreach";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Asked right before every SMTP submission (docs/spec/outreach-contract.md). Any non-200 means "do not send":
 *  401 without the key, 503 when the database or the configuration is not available. */
export async function POST(req: NextRequest) {
  const denied = apiGuard(req);
  if (denied) return denied;
  const parsed = HashList.safeParse(await readJson(req));
  if (!parsed.success) return invalidInput(parsed.error);
  try {
    await outreachDb();
    const suppressed = await suppressedAmong(parsed.data.hashes);
    return apiJson({ ok: true, suppressed, checked_at: new Date().toISOString() });
  } catch {
    return dbUnavailable();
  }
}
