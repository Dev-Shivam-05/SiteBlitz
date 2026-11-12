import { NextRequest } from "next/server";
import { dbConfigured } from "@/lib/db";
import { SLUG_RE, outreachDb, removeSnapshot } from "@/lib/outreach";
import { snapshotPages } from "@/lib/outreachPages";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** The removal button on a snapshot page. POST only (a GET answers 405, so link scanners cannot remove a page).
 *  Sets removed_at once; removal is final and repeating it still shows the "removed" page. */
export async function POST(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!SLUG_RE.test(slug)) return snapshotPages.missing();
  if (!dbConfigured()) return snapshotPages.unavailable();
  try {
    await outreachDb();
    return (await removeSnapshot(slug)) === "removed" ? snapshotPages.removed() : snapshotPages.missing();
  } catch {
    return snapshotPages.unavailable();
  }
}
