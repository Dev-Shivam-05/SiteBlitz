import { NextRequest, NextResponse } from "next/server";
import { dbConnect, dbConfigured } from "@/lib/db";
import { Session, Pageview, AnalyticsEvent, Lead } from "@/lib/models";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ sid: string }> }
) {
  if (!dbConfigured()) {
    return NextResponse.json({ ok: false, error: "db_not_configured" }, { status: 503 });
  }
  const { sid } = await params;
  try {
    await dbConnect();
    const [session, pageviews, events, lead] = await Promise.all([
      Session.findOne({ sid }).lean(),
      Pageview.find({ sid }).sort({ ts: 1 }).limit(200).lean(),
      AnalyticsEvent.find({ sid }).sort({ ts: 1 }).limit(200).lean(),
      Lead.findOne({ sid }).lean(),
    ]);
    if (!session) {
      return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, session, pageviews, events, lead });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "failed" },
      { status: 500 }
    );
  }
}
