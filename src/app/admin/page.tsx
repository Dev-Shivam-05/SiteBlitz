"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { AdminShell, PageHeader, Card, DbNotice } from "@/components/admin/AdminShell";
import { CapacityControl } from "@/components/admin/CapacityControl";
import { useApi, fmtDuration, flagEmoji, fmtDate } from "@/components/admin/useApi";
import { CountUp, Sparkline, useTokens } from "@/components/admin/Spark";

interface Stats {
  ok: boolean;
  totals: { sessions: number; visitors: number; pageviews: number; avgDuration: number; bounceRate: number };
  prevTotals: { sessions: number; visitors: number; pageviews: number };
  liveNow: number;
  series: { date: string; views: number; sessions: number }[];
  topPages: { path: string; views: number; avgDuration: number; avgScroll: number }[];
  sources: { source: string; medium: string; sessions: number }[];
  devices: { type: string; sessions: number }[];
  countries: { code: string; sessions: number }[];
  cities: { city: string; sessions: number }[];
  browsers: { browser: string; sessions: number }[];
  topEvents: { name: string; count: number }[];
  leads: { byStatus: Record<string, number>; recent: { _id: string; name: string; status: string; createdAt: string; businessType?: string }[] };
}

const RANGES = [
  { label: "24h", days: 1 },
  { label: "7d", days: 7 },
  { label: "30d", days: 30 },
  { label: "90d", days: 90 },
];

/** KPI card (spec v4 row 15): the number counts up, the change vs the previous period sits beside it, and a
 *  sparkline from the traffic series runs underneath where the series has that measure. */
function Kpi({
  label, value, format, hint, prev, curr, series,
}: { label: string; value: number; format?: (n: number) => string; hint?: string; prev?: number; curr?: number; series?: number[] }) {
  let delta: number | null = null;
  if (prev !== undefined && curr !== undefined && prev > 0) {
    delta = Math.round(((curr - prev) / prev) * 100);
  }
  return (
    <Card className="group relative overflow-hidden">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-faint">{label}</p>
      <div className="mt-3 flex items-baseline gap-2">
        <p className="admin-title text-[2.1rem] tabular-nums">
          <CountUp value={value} format={format} />
        </p>
        {delta !== null && (
          <span
            className={`rounded-full px-2 py-0.5 text-[11px] font-semibold tabular-nums ${
              delta > 0 ? "bg-volt/10 text-volt" : delta < 0 ? "bg-red-400/10 text-red-300" : "text-faint"
            }`}
            title="vs previous period"
          >
            {delta > 0 ? "▲" : delta < 0 ? "▼" : "•"} {Math.abs(delta)}%
          </span>
        )}
      </div>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
      {series && <Sparkline values={series} />}
    </Card>
  );
}

function BarList({ title, rows }: { title: string; rows: { label: string; value: number; extra?: string }[] }) {
  const max = Math.max(...rows.map((r) => r.value), 1);
  return (
    <Card>
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      <div className="mt-4 space-y-2.5">
        {rows.length === 0 && <p className="text-sm text-faint">No data yet</p>}
        {rows.map((r) => (
          <div key={r.label} className="relative overflow-hidden rounded-lg">
            <div
              className="absolute inset-y-0 left-0 rounded-lg bg-volt/10"
              style={{ width: `${(r.value / max) * 100}%` }}
            />
            <div className="relative flex items-center justify-between px-3 py-2 text-sm">
              <span className="truncate text-ink">{r.label}</span>
              <span className="ml-3 shrink-0 tabular-nums text-muted">
                {r.extra ? `${r.extra} · ` : ""}{r.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default function AdminDashboard() {
  const [days, setDays] = useState(7);
  const { data, loading, error } = useApi<Stats>(`/api/admin/stats?days=${days}`, 30_000);
  const s = data && data.ok ? data : null;
  const c = useTokens(["volt", "violet", "faint", "raised", "muted"] as const);

  return (
    <AdminShell>
      <PageHeader
        title="Overview"
        sub="Your website, measured to the click."
        right={
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2">
              <span className="h-2 w-2 animate-pulse-soft rounded-full bg-volt" />
              <span className="text-sm tabular-nums text-ink">{s?.liveNow ?? 0}</span>
              <span className="text-xs text-faint">live now</span>
            </div>
            <div className="flex rounded-full border border-line p-1">
              {RANGES.map((r) => (
                <button
                  key={r.days}
                  onClick={() => setDays(r.days)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    days === r.days ? "bg-volt text-void" : "text-muted hover:text-ink"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        }
      />

      <DbNotice error={error} />
      <CapacityControl />

      {loading && !s && <p className="text-sm text-faint">Loading…</p>}

      {s && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <Kpi label="Unique visitors" value={s.totals.visitors} prev={s.prevTotals?.visitors} curr={s.totals.visitors} />
            <Kpi label="Sessions" value={s.totals.sessions} prev={s.prevTotals?.sessions} curr={s.totals.sessions} series={s.series.map((x) => x.sessions)} />
            <Kpi label="Pageviews" value={s.totals.pageviews} prev={s.prevTotals?.pageviews} curr={s.totals.pageviews} series={s.series.map((x) => x.views)} />
            <Kpi label="Avg. session" value={s.totals.avgDuration} format={fmtDuration} />
            <Kpi label="Bounce rate" value={s.totals.bounceRate} format={(n) => `${Math.round(n)}%`} />
          </div>

          <Card className="mt-4">
            <h3 className="text-sm font-semibold">Traffic</h3>
            <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={s.series} margin={{ left: -18, right: 8, top: 4 }}>
                  <defs>
                    <linearGradient id="views" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={c.volt} stopOpacity={0.35} />
                      <stop offset="100%" stopColor={c.volt} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="sess" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={c.violet} stopOpacity={0.3} />
                      <stop offset="100%" stopColor={c.violet} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(245,245,240,0.06)" vertical={false} />
                  <XAxis dataKey="date" stroke={c.faint} fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke={c.faint} fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      background: c.raised,
                      border: "1px solid rgba(245,245,240,0.1)",
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                    labelStyle={{ color: c.muted }}
                  />
                  <Area type="monotone" dataKey="views" stroke={c.volt} strokeWidth={2} fill="url(#views)" name="Pageviews" />
                  <Area type="monotone" dataKey="sessions" stroke={c.violet} strokeWidth={2} fill="url(#sess)" name="Sessions" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="mt-4 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            <BarList
              title="Top pages"
              rows={s.topPages.map((p) => ({
                label: p.path,
                value: p.views,
                extra: fmtDuration(p.avgDuration),
              }))}
            />
            <BarList
              title="Traffic sources"
              rows={s.sources.map((x) => ({
                label: `${x.source} · ${x.medium}`,
                value: x.sessions,
              }))}
            />
            <BarList
              title="Countries"
              rows={s.countries.map((c) => ({
                label: `${flagEmoji(c.code)} ${c.code}`,
                value: c.sessions,
              }))}
            />
            <BarList
              title="Devices"
              rows={s.devices.map((d) => ({ label: d.type, value: d.sessions }))}
            />
            <BarList
              title="Browsers"
              rows={s.browsers.map((b) => ({ label: b.browser, value: b.sessions }))}
            />
            <BarList
              title="Top actions"
              rows={s.topEvents.map((e) => ({ label: e.name, value: e.count }))}
            />
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <Card>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Lead pipeline</h3>
                <div className="flex items-center gap-3">
                  <a href="/api/admin/export?type=leads&days=90" className="text-xs text-muted hover:text-ink">
                    ⤓ CSV
                  </a>
                  <Link href="/admin/leads" className="text-xs text-volt hover:underline">
                    Manage →
                  </Link>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-5 gap-2 text-center">
                {(["new", "contacted", "qualified", "won", "lost"] as const).map((st) => (
                  <div key={st} className="rounded-xl bg-raised p-3">
                    <p className="font-display text-2xl font-bold tabular-nums">
                      {s.leads.byStatus[st] || 0}
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-wider text-faint">{st}</p>
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <h3 className="text-sm font-semibold">Latest leads</h3>
              <div className="mt-3 space-y-2">
                {s.leads.recent.length === 0 && <p className="text-sm text-faint">No leads yet</p>}
                {s.leads.recent.map((l) => (
                  <div key={l._id} className="flex items-center justify-between rounded-xl bg-raised px-4 py-2.5 text-sm">
                    <div>
                      <span className="text-ink">{l.name}</span>
                      <span className="ml-2 text-xs text-faint">{l.businessType || ""}</span>
                    </div>
                    <span className="text-xs text-muted">{fmtDate(l.createdAt)}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </>
      )}
    </AdminShell>
  );
}
