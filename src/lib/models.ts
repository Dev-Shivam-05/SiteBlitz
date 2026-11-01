import mongoose, { Schema, type Model, type Types } from "mongoose";
import { LEAD_STATUSES, SOURCE_CHANNELS, type LeadStatus, type SourceChannel } from "./leadops";

/* ------------------------------------------------------------------ */
/* Session — one anonymous visitor session (sid cookie, 30 min idle)  */
/* ------------------------------------------------------------------ */
const SessionSchema = new Schema<SessionDoc>(
  {
    sid: { type: String, required: true, unique: true, index: true },
    visitorId: { type: String, index: true }, // long-lived anonymous id
    firstSeen: { type: Date, default: Date.now, index: true },
    lastSeen: { type: Date, default: Date.now, index: true },
    pageviewCount: { type: Number, default: 0 },
    eventCount: { type: Number, default: 0 },
    totalDuration: { type: Number, default: 0 }, // seconds
    entryPath: String,
    exitPath: String,
    device: {
      type: { type: String, default: "desktop" }, // desktop | mobile | tablet | bot
      browser: String,
      browserVersion: String,
      os: String,
      osVersion: String,
      screen: String,
    },
    geo: {
      country: String,
      countryCode: String,
      region: String,
      city: String,
      timezone: String,
    },
    attribution: {
      referrer: String,
      referrerHost: String,
      source: String, // google | direct | instagram | ...
      medium: String, // organic | social | referral | cpc | direct
      utmSource: String,
      utmMedium: String,
      utmCampaign: String,
      utmTerm: String,
      utmContent: String,
      landingPage: String,
    },
    language: String,
    isBot: { type: Boolean, default: false, index: true },
    ip: String, // stored hashed-prefix for privacy
  },
  { timestamps: true }
);
SessionSchema.index({ lastSeen: -1, isBot: 1 });

/* ------------------------------------------------------------------ */
/* Pageview                                                            */
/* ------------------------------------------------------------------ */
const PageviewSchema = new Schema<PageviewDoc>(
  {
    sid: { type: String, required: true, index: true },
    path: { type: String, required: true, index: true },
    title: String,
    ts: { type: Date, default: Date.now, index: true },
    duration: { type: Number, default: 0 }, // seconds on page
    scrollDepth: { type: Number, default: 0 }, // 0-100
    referrerPath: String,
    vitals: {
      lcp: Number, // ms — real-user Largest Contentful Paint
      cls: Number, // unitless ×1000 for storage precision
      inp: Number, // ms — worst interaction latency observed
    },
  },
  { versionKey: false }
);
PageviewSchema.index({ ts: -1, path: 1 });

/* ------------------------------------------------------------------ */
/* Event — CTA clicks, form steps, pricing toggles, wa clicks...      */
/* ------------------------------------------------------------------ */
const EventSchema = new Schema<EventDoc>(
  {
    sid: { type: String, required: true, index: true },
    name: { type: String, required: true, index: true },
    path: String,
    meta: Schema.Types.Mixed,
    ts: { type: Date, default: Date.now, index: true },
  },
  { versionKey: false }
);
EventSchema.index({ ts: -1, name: 1 });

/* ------------------------------------------------------------------ */
/* Lead                                                                */
/* ------------------------------------------------------------------ */
const LeadSchema = new Schema<LeadDoc>(
  {
    name: { type: String, required: true },
    phone: String,
    email: String,
    businessType: String,
    budget: String,
    goal: String,
    message: String,
    plan: String,
    status: {
      type: String,
      enum: [...LEAD_STATUSES],
      default: "new",
      index: true,
    },
    // Lead-ops fields (2026-11-01). All optional: older leads lack them and every reader must cope.
    ref: { type: String, unique: true, sparse: true }, // public "SB-7K2Q", see lib/ref.ts
    owner: String, // free text: "Founder" / "Partner"
    nextAction: String,
    nextActionAt: { type: Date, index: true }, // 00:00 IST of the due day
    lastContactAt: Date,
    valueInr: { type: Number, min: 0 },
    lostReason: String,
    conceptAt: Date, // set when status becomes "concept"; counts against the weekly cap
    score: { type: Number, default: 0 },
    notes: [
      {
        text: String,
        at: { type: Date, default: Date.now },
      },
    ],
    sid: String,
    source: {
      path: String,
      utmSource: String,
      utmCampaign: String,
      country: String,
      device: String,
      code: String, // SOURCE_CODES in lib/leadops.ts (SB-R1, SB-S1, walk-in, referral, website, ...)
      channel: { type: String, enum: [...SOURCE_CHANNELS] },
    },
  },
  { timestamps: true }
);
LeadSchema.index({ createdAt: -1, status: 1 });

export interface SessionDoc {
  sid: string;
  visitorId?: string;
  firstSeen: Date;
  lastSeen: Date;
  pageviewCount: number;
  eventCount: number;
  totalDuration: number;
  entryPath?: string;
  exitPath?: string;
  device?: {
    type?: string;
    browser?: string;
    browserVersion?: string;
    os?: string;
    osVersion?: string;
    screen?: string;
  };
  geo?: {
    country?: string;
    countryCode?: string;
    region?: string;
    city?: string;
    timezone?: string;
  };
  attribution?: {
    referrer?: string;
    referrerHost?: string;
    source?: string;
    medium?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    utmTerm?: string;
    utmContent?: string;
    landingPage?: string;
  };
  language?: string;
  isBot?: boolean;
  ip?: string;
}

export interface PageviewDoc {
  sid: string;
  path: string;
  title?: string;
  ts: Date;
  duration?: number;
  scrollDepth?: number;
  referrerPath?: string;
  vitals?: { lcp?: number; cls?: number; inp?: number };
}

export interface EventDoc {
  sid: string;
  name: string;
  path?: string;
  meta?: unknown;
  ts: Date;
}

export interface LeadDoc {
  name: string;
  phone?: string;
  email?: string;
  businessType?: string;
  budget?: string;
  goal?: string;
  message?: string;
  plan?: string;
  status: LeadStatus;
  ref?: string;
  owner?: string;
  nextAction?: string;
  nextActionAt?: Date;
  lastContactAt?: Date;
  valueInr?: number;
  lostReason?: string;
  conceptAt?: Date;
  score: number;
  notes?: { text: string; at: Date }[];
  sid?: string;
  source?: {
    path?: string;
    utmSource?: string;
    utmCampaign?: string;
    country?: string;
    device?: string;
    code?: string;
    channel?: SourceChannel;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

/* ------------------------------------------------------------------ */
/* Setting — key/value site configuration (capacity switch, etc.)      */
/* ------------------------------------------------------------------ */
const SettingSchema = new Schema<SettingDoc>(
  {
    key: { type: String, required: true, unique: true },
    value: Schema.Types.Mixed,
    updatedAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

/* ------------------------------------------------------------------ */
/* GraderRun — one /tools/grader audit of an external site             */
/* ------------------------------------------------------------------ */
const GraderRunSchema = new Schema<GraderRunDoc>(
  {
    url: { type: String, required: true },
    score: Number,
    categories: Schema.Types.Mixed, // { seo, performance, trust, ux } sub-scores
    findings: Schema.Types.Mixed, // array of { check, ok, note }
    email: String, // captured when they ask for the full report
    sid: String,
    ts: { type: Date, default: Date.now, index: true },
  },
  { versionKey: false }
);

export interface SettingDoc {
  key: string;
  value: unknown;
  updatedAt: Date;
}

export interface GraderRunDoc {
  url: string;
  score?: number;
  categories?: Record<string, number>;
  findings?: { check: string; ok: boolean; note: string }[];
  email?: string;
  sid?: string;
  ts: Date;
}

/* ------------------------------------------------------------------ */
/* Notification — one outbound new-lead alert to one recipient         */
/* ------------------------------------------------------------------ */
const NotificationSchema = new Schema<NotificationDoc>(
  {
    leadId: { type: Schema.Types.ObjectId, required: true, index: true },
    channel: { type: String, enum: ["telegram"], default: "telegram" },
    // Telegram chat id. "" while TELEGRAM_CHAT_IDS is unset; filled in by the first retry after.
    recipient: { type: String, default: "" },
    status: { type: String, enum: ["pending", "sent", "failed"], default: "pending", index: true },
    attempts: { type: Number, default: 0 },
    lastError: String,
    sentAt: Date,
    providerMessageId: String,
  },
  { timestamps: true } // updatedAt doubles as the in-flight marker for retries (lib/notify.ts)
);

export interface NotificationDoc {
  leadId: Types.ObjectId;
  channel: "telegram";
  recipient: string;
  status: "pending" | "sent" | "failed";
  attempts: number;
  lastError?: string;
  sentAt?: Date;
  providerMessageId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/* ------------------------------------------------------------------ */
/* AdSpend — one line of the manual ad-spend ledger (media ₹, ex-GST)  */
/* ------------------------------------------------------------------ */
// Its own collection rather than an array inside Setting.value: entries are appended from a phone
// and occasionally deleted, so separate documents avoid read-modify-write races on one Mixed blob,
// get schema validation, and sum with a plain aggregate.
const AdSpendSchema = new Schema<AdSpendDoc>(
  {
    day: { type: String, required: true, index: true }, // "YYYY-MM-DD", IST calendar day
    amountInr: { type: Number, required: true, min: 0 },
    note: String,
  },
  { timestamps: true }
);

export interface AdSpendDoc {
  day: string;
  amountInr: number;
  note?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Typecheck OOM fix (P5): `schema: Schema` made TS structurally compare Schema<XDoc> against
// Schema<any, ...> defaults, which exhausted 6 GB. Keep the doc type on both the schema and here.
function model<T>(name: string, schema: Schema<T>): Model<T> {
  return (mongoose.models[name] as Model<T>) || mongoose.model<T>(name, schema);
}

export const Setting = model<SettingDoc>("Setting", SettingSchema);
export const GraderRun = model<GraderRunDoc>("GraderRun", GraderRunSchema);

export const Session = model<SessionDoc>("Session", SessionSchema);
export const Pageview = model<PageviewDoc>("Pageview", PageviewSchema);
export const AnalyticsEvent = model<EventDoc>("AnalyticsEvent", EventSchema);
export const Lead = model<LeadDoc>("Lead", LeadSchema);
export const Notification = model<NotificationDoc>("Notification", NotificationSchema);
export const AdSpend = model<AdSpendDoc>("AdSpend", AdSpendSchema);
