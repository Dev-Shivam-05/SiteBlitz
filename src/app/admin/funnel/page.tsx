"use client";

import { useState } from "react";
import { AdminShell, PageHeader, Card, DbNotice } from "@/components/admin/AdminShell";
import { useApi } from "@/components/admin/useApi";

interface FunnelResp {
  ok: boolean;
  stages: { key: string; label: string; count: number }[];
}

export default function FunnelPage() {
  const [days, setDays] = useState(30);
  const { data, error } = useApi<FunnelResp>(`/api/admin/funnel?days=${days}`, 60_000);
  const d = data && data.ok ? data : null;
  const max = Math.max(...(d?.stages.map((s) => s.count) || [1]), 1);

  return (
    <AdminShell>
      <PageHeader
        title="Conversion funnel"
        sub="Where visitors drop off on the way to becoming clients"
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

      {d && (
        <Card className="p-8">
          <div className="space-y-5">
            {d.stages.map((s, i) => {
              const pct = max ? (s.count / max) * 100 : 0;
              const prev = i > 0 ? d.stages[i - 1].count : s.count;
              const stepRate = prev > 0 ? Math.round((s.count / prev) * 100) : 0;
              return (
                <div key={s.key}>
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="text-ink">{s.label}</span>
                    <span className="tabular-nums text-muted">
                      {s.count}
                      {i > 0 && (
                        <span className={`ml-2 text-xs ${stepRate >= 50 ? "text-volt" : stepRate >= 15 ? "text-yellow-300" : "text-red-300"}`}>
                          {stepRate}% of previous
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="mt-2 h-9 overflow-hidden rounded-xl bg-raised">
                    <div
                      className="flex h-full items-center rounded-xl bg-gradient-to-r from-volt/70 to-volt px-3 text-xs font-bold text-void transition-[width] duration-700"
                      style={{ width: `${Math.max(pct, s.count > 0 ? 4 : 0)}%` }}
                    >
                      {s.count > 0 && pct > 12 ? s.count : ""}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-8 text-xs leading-relaxed text-faint">
            💡 Reading it: each bar shows how many sessions reached that stage in the selected
            period. Big drop between “Viewed pricing” and “Started the form”? Sharpen the pricing
            page. Lots of form starts but few leads? The form&apos;s last step needs work.
          </p>
        </Card>
      )}
    </AdminShell>
  );
}
