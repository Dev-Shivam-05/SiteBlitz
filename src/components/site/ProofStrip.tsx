"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ProofData {
  ok: boolean;
  db?: boolean;
  liveNow?: number;
  visitors7d?: number;
  builtAt?: string | null;
  vitals?: { samples: number; lcpMs: number | null; cls: string | null; inpMs: number | null };
  capacity?: { slots?: number; note?: string } | null;
}

function ago(iso: string): string {
  const s = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 3600) return `${Math.max(1, Math.round(s / 60))} min ago`;
  if (s < 86400) return `${Math.round(s / 3600)} h ago`;
  return `${Math.round(s / 86400)} d ago`;
}

/** The anti-"1%" strip: live, first-party, verifiable numbers — measured by
 *  the same analytics engine we sell. Links to /proof for the methodology. */
export function ProofStrip() {
  const [d, setD] = useState<ProofData | null>(null);

  useEffect(() => {
    let stop = false;
    const load = () =>
      fetch("/api/proof")
        .then((r) => r.json())
        .then((j) => !stop && setD(j))
        .catch(() => {});
    const t = setTimeout(load, 1200); // stays off the critical path
    const iv = setInterval(load, 30_000);
    return () => {
      stop = true;
      clearTimeout(t);
      clearInterval(iv);
    };
  }, []);

  const items: { label: string; value: string; live?: boolean }[] = [];
  if (d?.db) {
    items.push({
      label: "viewing this site now",
      value: String(Math.max(d.liveNow ?? 0, 1)),
      live: true,
    });
    if (d.visitors7d) items.push({ label: "visitors this week", value: String(d.visitors7d) });
    if (d.vitals?.lcpMs)
      items.push({
        label: `real-visitor LCP (${d.vitals.samples} loads)`,
        value: `${(d.vitals.lcpMs / 1000).toFixed(1)}s`,
      });
    if (d.vitals?.cls) items.push({ label: "layout shift", value: d.vitals.cls });
  }
  if (d?.builtAt) items.push({ label: "last deployed", value: ago(d.builtAt) });

  return (
    <div className="border-b border-line bg-surface/40">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-2 px-5 py-3 md:px-8">
        <Link
          href="/proof"
          data-track="proof_strip"
          className="font-display text-[10px] font-bold uppercase tracking-[0.25em] text-volt hover:underline"
        >
          Live proof ↗
        </Link>
        {items.length === 0 ? (
          <span className="text-xs text-faint">measuring…</span>
        ) : (
          items.map((it) => (
            <span key={it.label} className="flex items-baseline gap-2 text-xs text-muted">
              {it.live && <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-volt" />}
              <span className="font-display text-sm font-bold tabular-nums text-ink">{it.value}</span>
              {it.label}
            </span>
          ))
        )}
        <span className="hidden text-[10px] uppercase tracking-widest text-faint lg:inline">
          measured by our own analytics — no estimates
        </span>
      </div>
    </div>
  );
}

/** Hero badge that upgrades to the honest capacity counter when set in admin. */
export function LiveBadge() {
  const [cap, setCap] = useState<{ slots?: number; note?: string } | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      fetch("/api/proof")
        .then((r) => r.json())
        .then((j) => j?.capacity && setCap(j.capacity))
        .catch(() => {});
    }, 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-2 backdrop-blur">
      <span className="h-2 w-2 animate-pulse-soft rounded-full bg-volt" />
      <span className="text-xs tracking-wide text-muted">
        {cap?.slots ? (
          <>
            <b className="text-volt">{cap.slots} build slot{cap.slots === 1 ? "" : "s"}</b> left this
            week{cap.note ? ` · ${cap.note}` : " · set live from our admin panel"}
          </>
        ) : (
          "Taking new projects · replies within hours"
        )}
      </span>
    </div>
  );
}
