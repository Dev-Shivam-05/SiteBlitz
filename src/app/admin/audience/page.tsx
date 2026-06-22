"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { AdminShell, PageHeader, Card, DbNotice } from "@/components/admin/AdminShell";
import { useApi, flagEmoji } from "@/components/admin/useApi";

interface AudienceResp {
  ok: boolean;
  os: { label: string; n: number }[];
  browsers: { label: string; n: number }[];
  devices: { label: string; n: number }[];
  languages: { label: string; n: number }[];
  screens: { label: string; n: number }[];
  cities: { label: string; n: number }[];
  countries: { label: string; n: number }[];
  visitors: { newVisitors: number; returningVisitors: number };
  heatmap: { dow: number; hour: number; n: number }[];
  botSessions: number;
}

const DOWS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function Breakdown({ title, rows, flag = false }: { title: string; rows: { label: string; n: number }[]; flag?: boolean }) {
  const max = Math.max(...rows.map((r) => r.n), 1);
  return (
    <Card>
      <h3 className="text-sm font-semibold">{title}</h3>
      <div className="mt-4 space-y-2.5">
        {rows.length === 0 && <p className="text-sm text-faint">No data yet</p>}
        {rows.map((r) => (
          <div key={r.label} className="relative overflow-hidden rounded-lg">
            <div className="absolute inset-y-0 left-0 rounded-lg bg-volt/10" style={{ width: `${(r.n / max) * 100}%` }} />
            <div className="relative flex items-center justify-between px-3 py-2 text-sm">
              <span className="truncate text-ink">{flag ? `${flagEmoji(r.label)} ${r.label}` : r.label}</span>
              <span className="ml-3 shrink-0 tabular-nums text-muted">{r.n}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default function AudiencePage() {
  const [days, setDays] = useState(30);
  const { data, error } = useApi<AudienceResp>(`/api/admin/audience?days=${days}`, 60_000);
  const d = data && data.ok ? data : null;

  const heatMax = Math.max(...(d?.heatmap.map((h) => h.n) || [1]), 1);
  const heatCell = (dow: number, hour: number) =>
    d?.heatmap.find((h) => h.dow === dow + 1 && h.hour === hour)?.n || 0;

  return (
    <AdminShell>
      <PageHeader
        title="Audience"
        sub="Who your visitors are — devices, platforms, places and patterns"
        right={
          <div className="flex items-center gap-3">
            <a
              href={`/api/admin/export?type=sessions&days=${days}`}
              className="btn-ghost flex items-center gap-2 rounded-full px-4 py-2 text-xs text-ink"
            >
              <Download size={14} /> CSV
            </a>
            <div className="flex rounded-full border border-line p-1">
              {[7, 30, 90].map((v) => (
                <button
                  key={v}
                  onClick={() => setDays(v)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    days === v ? "bg-volt text-void" : "text-muted hover:text-ink"
                  }`}
                >
                  {v}d
                </button>
              ))}
            </div>
          </div>
        }
      />
      <DbNotice error={error} />

      {d && (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <p className="text-xs uppercase tracking-widest text-faint">New visitors</p>
              <p className="font-display mt-2 text-3xl font-bold tabular-nums">{d.visitors.newVisitors}</p>
            </Card>
            <Card>
              <p className="text-xs uppercase tracking-widest text-faint">Returning visitors</p>
              <p className="font-display mt-2 text-3xl font-bold tabular-nums text-volt">
                {d.visitors.returningVisitors}
              </p>
            </Card>
            <Card>
              <p className="text-xs uppercase tracking-widest text-faint">Bot sessions filtered</p>
              <p className="font-display mt-2 text-3xl font-bold tabular-nums text-faint">{d.botSessions}</p>
            </Card>
          </div>

          <Card className="mt-4">
            <h3 className="text-sm font-semibold">When people visit (IST, sessions by hour × day)</h3>
            <div className="admin-scroll mt-4 overflow-x-auto">
              <div className="min-w-[720px]">
                <div className="grid grid-cols-[40px_repeat(24,1fr)] gap-1">
                  <div />
                  {Array.from({ length: 24 }, (_, h) => (
                    <div key={h} className="text-center text-[9px] text-faint">{h}</div>
                  ))}
                  {DOWS.map((day, di) => (
                    <div key={day} className="contents">
                      <div className="pr-2 text-right text-[10px] leading-4 text-faint">{day}</div>
                      {Array.from({ length: 24 }, (_, h) => {
                        const v = heatCell(di, h);
                        return (
                          <div
                            key={h}
                            title={`${day} ${h}:00 — ${v} sessions`}
                            className="h-4 rounded-[3px]"
                            style={{
                              background: v
                                ? `rgba(204,255,0,${0.15 + (v / heatMax) * 0.85})`
                                : "rgba(245,245,240,0.04)",
                            }}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <Breakdown title="Devices" rows={d.devices} />
            <Breakdown title="Operating systems" rows={d.os} />
            <Breakdown title="Browsers" rows={d.browsers} />
            <Breakdown title="Countries" rows={d.countries} flag />
            <Breakdown title="Cities" rows={d.cities} />
            <Breakdown title="Languages" rows={d.languages} />
            <Breakdown title="Screen sizes" rows={d.screens} />
          </div>
        </>
      )}
    </AdminShell>
  );
}
