import { NextRequest, NextResponse } from "next/server";
import { dbConnect, dbConfigured } from "@/lib/db";
import { Session, Pageview, AnalyticsEvent } from "@/lib/models";
import { parseUA } from "@/lib/ua";
import { classifyReferrer } from "@/lib/referrer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SID_COOKIE = "sb_sid";
const VID_COOKIE = "sb_vid";
const SESSION_IDLE_MIN = 30;

interface TrackPayload {
  type: "pageview" | "event" | "leave";
  path?: string;
  title?: string;
  referrer?: string;
  screen?: string;
  language?: string;
  name?: string;
  meta?: Record<string, unknown>;
  duration?: number;
  scrollDepth?: number;
  utm?: Record<string, string>;
  vitals?: { lcp?: number; cls?: number; inp?: number };
}

function newId(): string {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 24);
}

function anonymizeIp(ip: string): string {
  if (ip.includes(".")) return ip.split(".").slice(0, 3).join(".") + ".0";
  if (ip.includes(":")) return ip.split(":").slice(0, 4).join(":") + "::";
  return "";
}

function optedOut(req: NextRequest): boolean {
  return req.headers.get("sec-gpc") === "1" || req.headers.get("dnt") === "1";
}

export async function POST(req: NextRequest) {
  // Always answer fast and never break the site because of analytics.
  const res = new NextResponse(null, { status: 204 });

  let body: TrackPayload;
  try {
    // sendBeacon may post text/plain
    body = JSON.parse(await req.text());
  } catch {
    return res;
  }
  if (!body || typeof body !== "object" || !body.type) return res;

  // Browser opt-out signals (Global Privacy Control, Do Not Track): record nothing and set no
  // cookies (PR1). Checked before the cookies below, which are otherwise set even without a DB.
  if (optedOut(req)) return res;

  const now = new Date();
  let sid = req.cookies.get(SID_COOKIE)?.value;
  let vid = req.cookies.get(VID_COOKIE)?.value;
  const isNewSession = !sid;
  if (!sid) sid = newId();
  if (!vid) vid = newId();

  // Rolling cookies
  res.cookies.set(SID_COOKIE, sid, {
    maxAge: SESSION_IDLE_MIN * 60,
    path: "/",
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  res.cookies.set(VID_COOKIE, vid, {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  if (!dbConfigured()) return res;

  try {
    await dbConnect();

    const ua = parseUA(req.headers.get("user-agent"));
    const h = req.headers;
    const geo = {
      countryCode: h.get("x-vercel-ip-country") || undefined,
      region: h.get("x-vercel-ip-country-region") || undefined,
      city: h.get("x-vercel-ip-city") ? decodeURIComponent(h.get("x-vercel-ip-city")!) : undefined,
      timezone: h.get("x-vercel-ip-timezone") || undefined,
    };
    const ipRaw =
      h.get("x-real-ip") ||
      (h.get("x-forwarded-for") || "").split(",")[0].trim();

    if (isNewSession || body.type === "pageview") {
      const attribution = isNewSession
        ? (() => {
            const utm = body.utm || {};
            const cls = classifyReferrer(
              body.referrer,
              utm.utm_source,
              utm.utm_medium,
              req.nextUrl.hostname
            );
            return {
              referrer: body.referrer || "",
              referrerHost: cls.referrerHost,
              source: cls.source,
              medium: cls.medium,
              utmSource: utm.utm_source,
              utmMedium: utm.utm_medium,
              utmCampaign: utm.utm_campaign,
              utmTerm: utm.utm_term,
              utmContent: utm.utm_content,
              landingPage: body.path,
            };
          })()
        : undefined;

      await Session.updateOne(
        { sid },
        {
          $set: {
            lastSeen: now,
            ...(body.type === "pageview" ? { exitPath: body.path } : {}),
            "device.type": ua.deviceType,
            "device.browser": ua.browser,
            "device.browserVersion": ua.browserVersion,
            "device.os": ua.os,
            "device.osVersion": ua.osVersion,
            ...(body.screen ? { "device.screen": body.screen } : {}),
            ...(geo.countryCode ? { "geo.countryCode": geo.countryCode } : {}),
            ...(geo.city ? { "geo.city": geo.city } : {}),
            ...(geo.region ? { "geo.region": geo.region } : {}),
            ...(geo.timezone ? { "geo.timezone": geo.timezone } : {}),
            ...(body.language ? { language: body.language } : {}),
            isBot: ua.isBot,
          },
          $setOnInsert: {
            sid,
            visitorId: vid,
            firstSeen: now,
            entryPath: body.path || "/",
            ...(attribution ? { attribution } : {}),
            ip: anonymizeIp(ipRaw),
          },
          ...(body.type === "pageview" ? { $inc: { pageviewCount: 1 } } : {}),
        },
        { upsert: true }
      );
    }

    if (body.type === "pageview" && body.path && !ua.isBot) {
      await Pageview.create({
        sid,
        path: body.path.slice(0, 300),
        title: (body.title || "").slice(0, 300),
        ts: now,
        referrerPath: body.referrer ? body.referrer.slice(0, 300) : undefined,
      });
    }

    if (body.type === "event" && body.name && !ua.isBot) {
      await AnalyticsEvent.create({
        sid,
        name: body.name.slice(0, 80),
        path: (body.path || "").slice(0, 300),
        meta: body.meta,
        ts: now,
      });
      await Session.updateOne({ sid }, { $inc: { eventCount: 1 }, $set: { lastSeen: now } });
    }

    if (body.type === "leave" && body.path && !ua.isBot) {
      const duration = Math.min(Math.max(Number(body.duration) || 0, 0), 3600);
      const scrollDepth = Math.min(Math.max(Number(body.scrollDepth) || 0, 0), 100);
      const v = body.vitals;
      const vitals =
        v && (v.lcp || v.cls !== undefined || v.inp)
          ? {
              ...(v.lcp ? { "vitals.lcp": Math.min(Math.round(v.lcp), 120000) } : {}),
              ...(v.cls !== undefined
                ? { "vitals.cls": Math.min(Math.round(v.cls * 1000), 10000) }
                : {}),
              ...(v.inp ? { "vitals.inp": Math.min(Math.round(v.inp), 60000) } : {}),
            }
          : {};
      // Attach duration/scroll (+ real-user vitals) to the most recent pageview
      await Pageview.findOneAndUpdate(
        { sid, path: body.path },
        { $set: { duration, scrollDepth, ...vitals } },
        { sort: { ts: -1 } }
      );
      await Session.updateOne(
        { sid },
        { $inc: { totalDuration: duration }, $set: { lastSeen: now, exitPath: body.path } }
      );
    }
  } catch {
    // Analytics must never surface errors to visitors.
  }

  return res;
}
