"use client";

import { useState } from "react";
import { AdminShell, PageHeader, Card, DbNotice } from "@/components/admin/AdminShell";
import { useApi, fmtDuration } from "@/components/admin/useApi";

interface CampaignsResp {
  ok: boolean;
  campaigns: { source: string; medium: string; campaign: string; sessions: number; avgDuration: number }[];
  referrers: { host: string; sessions: number }[];
  leadsBySource: { source: string; n: number }[];
}

export default function CampaignsPage() {
  const [days, setDays] = useState(30);
  const { data, error } = useApi<CampaignsResp>(`/api/admin/campaigns?days=${days}`, 60_000);
  const d = data && data.ok ? data : null;

  return (
    <AdminShell>
      <PageHeader
        title="Campaigns & referrers"
        sub="UTM-tagged traffic, referring websites, and which sources produce actual leads"
        right={
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
        }
      />
      <DbNotice error={error} />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="lg:col-span-2">
          <h3 className="text-sm font-semibold">UTM campaigns</h3>
          <p className="mt-1 text-xs text-faint">
            Tag your ads & posts like{" "}
            <code className="rounded bg-raised px-1.5 py-0.5 text-volt">
              ?utm_source=instagram&utm_campaign=july_offer
            </code>{" "}
            and they show up here automatically.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-line text-[11px] uppercase tracking-wider text-faint">
                  <th className="py-2.5 pr-4">Source</th>
                  <th className="py-2.5 pr-4">Medium</th>
                  <th className="py-2.5 pr-4">Campaign</th>
                  <th className="py-2.5 pr-4 text-right">Sessions</th>
                  <th className="py-2.5 text-right">Avg time</th>
                </tr>
              </thead>
              <tbody>
                {(d?.campaigns || []).map((c, i) => (
                  <tr key={i} className="border-b border-line/50">
                    <td className="py-2.5 pr-4 text-ink">{c.source}</td>
                    <td className="py-2.5 pr-4 text-muted">{c.medium}</td>
                    <td className="py-2.5 pr-4 text-muted">{c.campaign}</td>
                    <td className="py-2.5 pr-4 text-right tabular-nums">{c.sessions}</td>
                    <td className="py-2.5 text-right tabular-nums text-muted">{fmtDuration(c.avgDuration)}</td>
                  </tr>
                ))}
                {d && d.campaigns.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-faint">
                      No UTM-tagged visits yet — start tagging your links.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-semibold">Referring websites</h3>
          <div className="mt-4 space-y-2.5">
            {(d?.referrers || []).map((r) => (
              <div key={r.host} className="flex items-center justify-between rounded-xl bg-raised px-4 py-2.5 text-sm">
                <span className="truncate text-ink">{r.host}</span>
                <span className="ml-3 tabular-nums text-muted">{r.sessions}</span>
              </div>
            ))}
            {d && d.referrers.length === 0 && (
              <p className="py-6 text-center text-sm text-faint">No referral traffic yet.</p>
            )}
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-semibold">Leads by source</h3>
          <div className="mt-4 space-y-2.5">
            {(d?.leadsBySource || []).map((l) => (
              <div key={l.source} className="flex items-center justify-between rounded-xl bg-raised px-4 py-2.5 text-sm">
                <span className="text-ink">{l.source}</span>
                <span className="tabular-nums text-volt">{l.n} lead{l.n === 1 ? "" : "s"}</span>
              </div>
            ))}
            {d && d.leadsBySource.length === 0 && (
              <p className="py-6 text-center text-sm text-faint">No leads in this range yet.</p>
            )}
          </div>
        </Card>
      </div>
    </AdminShell>
  );
}
