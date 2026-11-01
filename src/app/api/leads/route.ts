import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { dbConnect, dbConfigured } from "@/lib/db";
import { createLeadWithRef } from "@/lib/leads";
import { notifyNewLead } from "@/lib/notify";
import { normalizeIndianPhone } from "@/lib/phone";
import { parseUA } from "@/lib/ua";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LeadInput = z.object({
  name: z.string().min(2).max(120),
  phone: z.string().max(30).optional().or(z.literal("")),
  email: z.string().email().max(200).optional().or(z.literal("")),
  businessType: z.string().max(120).optional(),
  budget: z.string().max(60).optional(),
  goal: z.string().max(120).optional(),
  message: z.string().max(3000).optional(),
  plan: z.string().max(40).optional(),
  path: z.string().max(300).optional(),
  utmSource: z.string().max(120).optional(),
  utmCampaign: z.string().max(120).optional(),
  // honeypot: real users never fill this. Accept any value here so the branch below can answer with a
  // quiet fake success; rejecting it with 400 told bots exactly which field gave them away.
  website: z.string().max(500).optional(),
});

function scoreLead(d: z.infer<typeof LeadInput>): number {
  let s = 20;
  if (d.phone) s += 25;
  if (d.email) s += 15;
  if (d.budget && /15|25|50|\+|high|scale/i.test(d.budget)) s += 20;
  if (d.message && d.message.length > 40) s += 10;
  if (d.plan) s += 10;
  return Math.min(s, 100);
}

export async function POST(req: NextRequest) {
  let parsed: z.infer<typeof LeadInput>;
  try {
    parsed = LeadInput.parse(await req.json());
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 });
  }

  // Honeypot tripped → pretend success, store nothing.
  if (parsed.website) return NextResponse.json({ ok: true, queued: true });

  if (!parsed.phone && !parsed.email) {
    return NextResponse.json(
      { ok: false, error: "Please share a phone number or email so we can reach you." },
      { status: 400 }
    );
  }

  if (!dbConfigured()) {
    // Database not yet provisioned — tell the client to fall back to WhatsApp.
    return NextResponse.json({ ok: false, fallback: "whatsapp" }, { status: 503 });
  }

  try {
    await dbConnect();
    const ua = parseUA(req.headers.get("user-agent"));
    const sid = req.cookies.get("sb_sid")?.value;
    const lead = await createLeadWithRef({
      name: parsed.name,
      // Store Indian numbers normalised (+91XXXXXXXXXX) so Quick-add can spot duplicates; keep any
      // other format (e.g. an overseas visitor) exactly as typed.
      phone: parsed.phone ? normalizeIndianPhone(parsed.phone) || parsed.phone : undefined,
      email: parsed.email || undefined,
      businessType: parsed.businessType,
      budget: parsed.budget,
      goal: parsed.goal,
      message: parsed.message,
      plan: parsed.plan,
      score: scoreLead(parsed),
      sid,
      source: {
        path: parsed.path,
        utmSource: parsed.utmSource,
        utmCampaign: parsed.utmCampaign,
        country: req.headers.get("x-vercel-ip-country") || undefined,
        device: ua.deviceType,
        code: "website",
        channel: "web",
      },
    });
    // The lead is already saved. Alerting never throws and is capped at ~3 s (lib/notify.ts).
    await notifyNewLead(lead);
    // ref is the public, unpredictable reference the visitor sees on the thank-you screen.
    return NextResponse.json({ ok: true, id: String(lead._id), ref: lead.ref });
  } catch {
    return NextResponse.json({ ok: false, fallback: "whatsapp" }, { status: 503 });
  }
}
