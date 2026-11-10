"use client";

import { useEffect, useState } from "react";

/** Reads design tokens at runtime, so charts (SVG attributes, where CSS variables do not resolve) take the
 *  colours from globals.css instead of hex copies in components. */
export function useTokens<K extends string>(names: readonly K[]): Record<K, string> {
  const [values, setValues] = useState<Record<K, string>>(() => Object.fromEntries(names.map((n) => [n, ""])) as Record<K, string>);
  useEffect(() => {
    const cs = getComputedStyle(document.documentElement);
    setValues(Object.fromEntries(names.map((n) => [n, cs.getPropertyValue(`--color-${n}`).trim()])) as Record<K, string>);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [names.join(",")]);
  return values;
}

/** A number that counts up from 0 to its value (0.9 s, ease-out) the first time it appears, then follows the value
 *  without replaying. Reduced motion shows the value at once. */
export function CountUp({ value, format = (n) => String(Math.round(n)) }: { value: number; format?: (n: number) => string }) {
  const [shown, setShown] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (done || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(value);
      setDone(true);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / 900);
      setShown(value * (1 - Math.pow(1 - k, 3)));
      if (k < 1) raf = requestAnimationFrame(tick);
      else setDone(true);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return <>{format(shown)}</>;
}

/** Sparkline for a KPI card: the series as a volt line with a soft fill, drawn in once. Decorative (the number
 *  beside it is the fact), so it is hidden from assistive tech. */
export function Sparkline({ values }: { values: number[] }) {
  if (values.length < 2) return null;
  const max = Math.max(...values, 1);
  const pts = values.map((v, i) => [(i / (values.length - 1)) * 100, 26 - (v / max) * 22] as const);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(2)} ${y.toFixed(2)}`).join(" ");
  return (
    <svg aria-hidden viewBox="0 0 100 28" preserveAspectRatio="none" className="mt-4 h-10 w-full overflow-visible text-volt">
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line} L100 28 L0 28 Z`} fill="url(#spark-fill)" />
      <path d={line} pathLength={100} className="spark-line" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
