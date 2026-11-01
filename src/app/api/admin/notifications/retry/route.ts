import { NextResponse } from "next/server";
import { dbConnect, dbConfigured } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { notificationCounts, retryNotifications } from "@/lib/notify";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Retries failed (and stale pending) new-lead alerts. Safe to press twice: each notification is
 *  claimed atomically before it is sent (lib/notify.ts). */
export async function POST() {
  const denied = await requireAdmin();
  if (denied) return denied;
  if (!dbConfigured()) {
    return NextResponse.json({ ok: false, error: "db_not_configured" }, { status: 503 });
  }
  try {
    await dbConnect();
    const result = await retryNotifications();
    const counts = await notificationCounts();
    return NextResponse.json({ ok: true, result, counts });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "failed" },
      { status: 500 }
    );
  }
}
