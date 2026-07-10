import { NextRequest, NextResponse } from "next/server";
import { gradeWebsite } from "@/lib/grader";
import { dbConnect, dbConfigured } from "@/lib/db";
import { GraderRun } from "@/lib/models";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

// naive per-instance rate limit — the grader fetches third-party sites
const hits = new Map<string, { n: number; at: number }>();

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-real-ip") ||
    (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
    "unknown";
  const rec = hits.get(ip);
  const now = Date.now();
  if (rec && now - rec.at < 60_000 && rec.n >= 5) {
    return NextResponse.json(
      { ok: false, error: "Easy! Five audits per minute max. Try again shortly." },
      { status: 429 }
    );
  }
  hits.set(ip, { n: rec && now - rec.at < 60_000 ? rec.n + 1 : 1, at: rec && now - rec.at < 60_000 ? rec.at : now });
  if (hits.size > 5000) hits.clear();

  let url = "";
  try {
    const body = await req.json();
    url = String(body.url || "");
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }

  const result = await gradeWebsite(url);
  if ("error" in result) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 422 });
  }

  // store the run BEFORE responding — serverless kills pending promises
  // after the response is sent, which would silently empty the admin inbox
  if (dbConfigured()) {
    try {
      const sid = req.cookies.get("sb_sid")?.value;
      await dbConnect();
      await GraderRun.create({
        url: result.finalUrl,
        score: result.score,
        categories: result.categories,
        findings: result.findings.map(({ check, ok, note }) => ({ check, ok, note })),
        sid,
        ts: new Date(),
      });
    } catch {
      // storage failure must never block the visitor's report
    }
  }

  return NextResponse.json({ ok: true, result });
}
