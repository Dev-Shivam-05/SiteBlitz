import { NextRequest } from "next/server";
import {
  SnapshotInput,
  apiGuard,
  apiJson,
  createSnapshot,
  dbUnavailable,
  decodeEvidence,
  invalidInput,
  outreachConfig,
  outreachDb,
  readJson,
} from "@/lib/outreach";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Creates an Opportunity Snapshot page after a business asked for a sample (docs/spec/outreach-contract.md).
 *  Answers the public URL; the lead generator puts it in a reply draft that waits for the founder's approval. */
export async function POST(req: NextRequest) {
  const denied = apiGuard(req);
  if (denied) return denied;
  const parsed = SnapshotInput.safeParse(await readJson(req));
  if (!parsed.success) return invalidInput(parsed.error);
  const evidence = decodeEvidence(parsed.data.evidence_image_base64);
  if (!evidence.ok) return apiJson({ ok: false, error: "Invalid input", issues: [evidence.error] }, 400);
  try {
    await outreachDb();
    const { slug, expires_at } = await createSnapshot(parsed.data, evidence);
    return apiJson({
      ok: true,
      slug,
      url: `${outreachConfig().publicBaseUrl}/s/${slug}`,
      expires_at: expires_at.toISOString(),
    });
  } catch {
    return dbUnavailable();
  }
}
