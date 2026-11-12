import { NextRequest } from "next/server";
import { dbConfigured } from "@/lib/db";
import { SLUG_RE, outreachDb, viewSnapshot } from "@/lib/outreach";
import { snapshotPage, snapshotPages } from "@/lib/outreachPages";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Opportunity Snapshot page (docs/spec/outreach-contract.md, spec row 7). 200 while live, 410 once expired or removed
 *  (no business data), 404 for an unknown slug. Each live request adds 1 to raw_view_count, server-side only. */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!SLUG_RE.test(slug)) return snapshotPages.missing();
  if (!dbConfigured()) return snapshotPages.unavailable();
  try {
    await outreachDb();
    const view = await viewSnapshot(slug);
    if (view.state === "live") return snapshotPage(view.doc);
    return view.state === "gone" ? snapshotPages.gone() : snapshotPages.missing();
  } catch {
    return snapshotPages.unavailable();
  }
}
