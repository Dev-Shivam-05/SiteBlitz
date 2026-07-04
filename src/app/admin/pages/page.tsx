"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { AdminShell, PageHeader, Card, DbNotice } from "@/components/admin/AdminShell";
import { useApi, fmtDuration } from "@/components/admin/useApi";

interface PagesResp {
  ok: boolean;
  pages: {
    path: string;
    views: number;
    uniques: number;
    avgDuration: number;
    avgScroll: number;
    entries: number;
    exits: number;
  }[];
}

export default function PagesPage() {
  const [days, setDays] = useState(30);
  const { data, error } = useApi<PagesResp>(`/api/admin/pages?days=${days}`, 60_000);
  const d = data && data.ok ? data : null;

  return (
    <AdminShell>
      <PageHeader
        title="Pages"
        sub="Performance of every page — views, engagement, entries and exits"
        right={
          <div className="flex items-center gap-3">
            <a
              href={`/api/admin/export?type=pageviews&days=${days}`}
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

      <Card className="overflow-x-auto p-0">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead>
            <tr className="border-b border-line text-[11px] uppercase tracking-wider text-faint">
              <th className="px-5 py-3.5">Page</th>
              <th className="px-5 py-3.5 text-right">Views</th>
              <th className="px-5 py-3.5 text-right">Unique</th>
              <th className="px-5 py-3.5 text-right">Avg time</th>
              <th className="px-5 py-3.5 text-right">Avg scroll</th>
              <th className="px-5 py-3.5 text-right">Entries</th>
              <th className="px-5 py-3.5 text-right">Exits</th>
            </tr>
          </thead>
          <tbody>
            {(d?.pages || []).map((p) => (
              <tr key={p.path} className="border-b border-line/50">
                <td className="px-5 py-3 font-medium text-ink">{p.path}</td>
                <td className="px-5 py-3 text-right tabular-nums">{p.views}</td>
                <td className="px-5 py-3 text-right tabular-nums text-muted">{p.uniques}</td>
                <td className="px-5 py-3 text-right tabular-nums text-muted">{fmtDuration(p.avgDuration)}</td>
                <td className="px-5 py-3 text-right">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-1.5 w-14 overflow-hidden rounded-full bg-raised">
                      <span className="block h-full bg-volt" style={{ width: `${p.avgScroll}%` }} />
                    </span>
                    <span className="tabular-nums text-muted">{p.avgScroll}%</span>
                  </span>
                </td>
                <td className="px-5 py-3 text-right tabular-nums text-muted">{p.entries}</td>
                <td className="px-5 py-3 text-right tabular-nums text-muted">{p.exits}</td>
              </tr>
            ))}
            {d && d.pages.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-faint">No pageviews in this range.</td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </AdminShell>
  );
}
