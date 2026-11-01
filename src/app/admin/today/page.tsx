"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, RefreshCw, Trash2 } from "lucide-react";
import { AdminShell, PageHeader, Card, DbNotice } from "@/components/admin/AdminShell";
import { useApi, sendJson } from "@/components/admin/useApi";
import { istDayStart, istYmd } from "@/lib/today";
import { formatInr } from "@/lib/leadops";

interface TodayLead {
  _id: string;
  name: string;
  phone?: string;
  ref?: string;
  owner?: string;
  status: string;
  nextAction?: string;
  nextActionAt?: string;
  businessType?: string;
  source?: { code?: string; channel?: string };
  createdAt?: string;
}

interface TodayResp {
  ok: boolean;
  error?: string;
  now: string;
  buckets: { overdue: TodayLead[]; dueToday: TodayLead[]; new: TodayLead[]; noNextAction: TodayLead[] };
  openTruncated: boolean;
  concepts: { thisWeek: number; cap: number; weekStart: string };
  newYesterday: { total: number; bySource: Record<string, number> };
  adSpend: {
    mediaTotal: number;
    cap: number;
    estimatedWithGst: number;
    recent: { _id: string; day: string; amountInr: number; note?: string }[];
  };
  alerts: { failed: number; pending: number; lastError: string | null };
}

const DAY_MS = 24 * 60 * 60 * 1000;

function dueLabel(iso: string | undefined, now: Date): string {
  if (!iso) return "no date";
  const days = Math.round((istDayStart(now).getTime() - istDayStart(new Date(iso)).getTime()) / DAY_MS);
  if (days === 0) return "today";
  if (days > 0) return `${days}d late`;
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", timeZone: "Asia/Kolkata" }).format(new Date(iso));
}

function Meter({ value, cap }: { value: number; cap: number }) {
  const pct = cap > 0 ? Math.min(100, Math.round((value / cap) * 100)) : 0;
  const over = value >= cap;
  return (
    <div className="mt-3 h-2 overflow-hidden rounded-full bg-raised" role="meter" aria-valuenow={value} aria-valuemin={0} aria-valuemax={cap}>
      <div className={`h-full rounded-full ${over ? "bg-red-400" : "bg-volt"}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

function LeadLine({ l, now, tone }: { l: TodayLead; now: Date; tone?: "late" }) {
  const wa = l.phone ? l.phone.replace(/[^\d]/g, "") : "";
  return (
    <li className="flex items-center justify-between gap-2 rounded-xl bg-raised px-3 py-2.5">
      {/* Plain <a>: the Leads page reads ?q= from window.location on mount. */}
      <a href={`/admin/leads?q=${encodeURIComponent(l.ref || l.phone || l.name)}`} className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-ink">{l.name}</p>
        <p className="mt-0.5 break-words text-xs text-faint">
          {[l.ref, l.source?.code, l.owner].filter(Boolean).join(" · ")}
          {l.nextAction ? ` — ${l.nextAction}` : ""}
          {l.nextActionAt && (
            <span className={tone === "late" ? " font-semibold text-red-300" : " text-muted"}> ({dueLabel(l.nextActionAt, now)})</span>
          )}
        </p>
      </a>
      {wa && (
        <a
          href={`https://wa.me/${wa}`}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-xl border border-line p-2.5 text-muted transition-colors hover:border-volt/50 hover:text-volt"
          title="WhatsApp"
          aria-label={`WhatsApp ${l.name}`}
        >
          <MessageCircle size={16} />
        </a>
      )}
    </li>
  );
}

function Bucket({ title, hint, leads, now, tone, empty }: {
  title: string; hint: string; leads: TodayLead[]; now: Date; tone?: "late"; empty: string;
}) {
  return (
    <Card>
      <div className="flex items-baseline justify-between gap-2">
        <h2 className={`font-display text-base font-bold ${tone === "late" && leads.length ? "text-red-300" : ""}`}>{title}</h2>
        <span className="font-display text-xl font-bold tabular-nums">{leads.length}</span>
      </div>
      <p className="mt-0.5 text-xs text-faint">{hint}</p>
      {leads.length ? (
        <ul className="mt-3 space-y-2">
          {leads.map((l) => <LeadLine key={l._id} l={l} now={now} tone={tone} />)}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-faint">{empty}</p>
      )}
    </Card>
  );
}

function AlertsCard({ alerts, onDone }: { alerts: TodayResp["alerts"]; onDone: () => void }) {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ text: string; bad: boolean } | null>(null);
  const stuck = alerts.failed + alerts.pending;

  const retry = async () => {
    setBusy(true);
    setMsg(null);
    const r = await sendJson<{ result: { configured: boolean; sent: number; failed: number; candidates: number } }>(
      "/api/admin/notifications/retry",
      "POST"
    );
    setBusy(false);
    if (!r.ok) return setMsg({ text: `Retry failed: ${r.error}`, bad: true });
    const x = r.data.result;
    if (!x.configured) setMsg({ text: "Telegram is not set up yet — nothing was sent.", bad: true });
    else setMsg({ text: `Retried ${x.candidates}: ${x.sent} sent, ${x.failed} failed.`, bad: x.failed > 0 });
    onDone();
  };

  return (
    <Card className={stuck ? "border-yellow-500/30" : ""}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-display text-base font-bold">Alerts</h2>
          <p className="mt-0.5 text-xs text-faint">Telegram new-lead alerts</p>
        </div>
        <button
          onClick={retry}
          disabled={busy || stuck === 0}
          className="flex items-center gap-2 rounded-xl border border-line px-3 py-2 text-xs text-muted hover:text-ink disabled:opacity-40"
        >
          <RefreshCw size={14} className={busy ? "animate-spin" : ""} /> Retry
        </button>
      </div>
      <p className="mt-3 text-sm">
        <span className={alerts.failed ? "font-semibold text-red-300" : "text-muted"}>{alerts.failed} failed</span>
        <span className="text-faint"> · </span>
        <span className={alerts.pending ? "font-semibold text-yellow-300" : "text-muted"}>{alerts.pending} pending</span>
      </p>
      {alerts.lastError === "telegram_not_configured" && (
        <p className="mt-2 text-xs text-yellow-200/80">
          Telegram is not configured. Set <code>TELEGRAM_BOT_TOKEN</code> and <code>TELEGRAM_CHAT_IDS</code>, then press Retry.
        </p>
      )}
      {alerts.lastError && alerts.lastError !== "telegram_not_configured" && (
        <p className="mt-2 break-words text-xs text-faint">Last error: {alerts.lastError}</p>
      )}
      {msg && <p className={`mt-2 text-xs font-semibold ${msg.bad ? "text-red-300" : "text-volt"}`} role="status">{msg.text}</p>}
    </Card>
  );
}

function AdSpendCard({ spend, onDone }: { spend: TodayResp["adSpend"]; onDone: () => void }) {
  const [day, setDay] = useState(() => istYmd(new Date()));
  const [amount, setAmount] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const add = async () => {
    const n = Number(amount);
    if (!amount || !Number.isFinite(n) || n < 0) return setErr("Enter the media spend in ₹ (ex-GST).");
    setBusy(true);
    setErr(null);
    const r = await sendJson("/api/admin/adspend", "POST", { day, amountInr: n });
    setBusy(false);
    if (!r.ok) return setErr(`Not saved: ${r.error}`);
    setAmount("");
    onDone();
  };

  const remove = async (id: string) => {
    setErr(null);
    const r = await sendJson(`/api/admin/adspend?id=${encodeURIComponent(id)}`, "DELETE");
    if (!r.ok) return setErr(`Not deleted: ${r.error}`);
    onDone();
  };

  const cls = "w-full min-w-0 rounded-xl border border-line bg-void px-3 py-2 text-sm text-ink outline-none focus:border-volt";
  return (
    <Card>
      <h2 className="font-display text-base font-bold">Ad spend</h2>
      <p className="mt-0.5 text-xs text-faint">Media spend from Ads Manager, before GST</p>
      <p className="mt-3 font-display text-2xl font-bold tabular-nums">
        {formatInr(spend.mediaTotal)} <span className="text-sm font-normal text-muted">/ {formatInr(spend.cap)}</span>
      </p>
      <Meter value={spend.mediaTotal} cap={spend.cap} />
      <p className="mt-2 text-xs text-muted">≈ {formatInr(spend.estimatedWithGst)} incl. 18% GST</p>
      {spend.mediaTotal >= spend.cap && <p className="mt-1 text-xs font-semibold text-red-300">Media cap reached</p>}

      <form onSubmit={(e) => { e.preventDefault(); add(); }} className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-[auto_1fr_auto]">
        <input type="date" aria-label="Spend date" value={day} onChange={(e) => setDay(e.target.value)} className={cls} />
        <input
          type="number"
          inputMode="decimal"
          min={0}
          step="0.01"
          aria-label="Media spend in rupees"
          placeholder="₹ spent"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={cls}
        />
        <button type="submit" disabled={busy} className="btn-volt rounded-xl px-4 py-2 text-xs font-semibold disabled:opacity-50">
          {busy ? "Saving…" : "Add"}
        </button>
      </form>
      {err && <p className="mt-2 text-xs font-semibold text-red-300" role="alert">{err}</p>}

      {spend.recent.length > 0 && (
        <ul className="mt-3 space-y-1">
          {spend.recent.map((e) => (
            <li key={e._id} className="flex items-center justify-between gap-2 text-xs text-muted">
              <span className="tabular-nums">{e.day}</span>
              <span className="flex items-center gap-2">
                <span className="tabular-nums text-ink">{formatInr(e.amountInr)}</span>
                <button onClick={() => remove(e._id)} className="rounded-lg p-1 text-faint hover:text-red-300" aria-label={`Delete ${e.day} entry`}>
                  <Trash2 size={13} />
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

export default function TodayPage() {
  const { data, error, reload } = useApi<TodayResp>("/api/admin/today", 60_000);
  const d = data && data.ok ? data : null;
  const now = d ? new Date(d.now) : new Date();
  const dateLabel = new Intl.DateTimeFormat("en-IN", {
    weekday: "long", day: "numeric", month: "short", timeZone: "Asia/Kolkata",
  }).format(now);

  return (
    <AdminShell>
      <PageHeader
        title="Today"
        sub={dateLabel}
        right={
          <Link href="/admin/quick-add" className="btn-volt rounded-xl px-4 py-2.5 text-xs font-semibold">
            + Quick add
          </Link>
        }
      />
      <DbNotice error={error} />
      {error && error !== "db_not_configured" && (
        <p className="mb-4 text-sm font-semibold text-red-300" role="alert">Could not load Today: {error}</p>
      )}

      {d && (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Bucket title="Overdue" hint="Next action was due before today" leads={d.buckets.overdue} now={now} tone="late" empty="Nothing overdue." />
            <Bucket title="Due today" hint="Next action due today" leads={d.buckets.dueToday} now={now} empty="Nothing due today." />
            <Bucket title="New" hint="Not yet contacted" leads={d.buckets.new} now={now} empty="No new leads waiting." />
            <Bucket title="No next action" hint="Open leads with no follow-up date" leads={d.buckets.noNextAction} now={now} empty="Every open lead has a next step." />
          </div>
          {d.openTruncated && <p className="text-xs text-faint">Showing the first 500 open leads.</p>}

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <h2 className="font-display text-base font-bold">Concepts this week</h2>
              <p className="mt-0.5 text-xs text-faint">Free homepage concepts, Mon–Sun</p>
              <p className="mt-3 font-display text-2xl font-bold tabular-nums">
                {d.concepts.thisWeek} <span className="text-sm font-normal text-muted">/ {d.concepts.cap}</span>
              </p>
              <Meter value={d.concepts.thisWeek} cap={d.concepts.cap} />
              {d.concepts.thisWeek >= d.concepts.cap && <p className="mt-2 text-xs font-semibold text-red-300">Weekly cap reached</p>}
              <p className="mt-3 text-xs text-muted">
                New yesterday: <b className="text-ink">{d.newYesterday.total}</b>
                {Object.entries(d.newYesterday.bySource).map(([k, v]) => ` · ${k} ${v}`).join("")}
              </p>
            </Card>
            <AdSpendCard spend={d.adSpend} onDone={() => reload(true)} />
            <AlertsCard alerts={d.alerts} onDone={() => reload(true)} />
          </div>
        </div>
      )}
    </AdminShell>
  );
}
