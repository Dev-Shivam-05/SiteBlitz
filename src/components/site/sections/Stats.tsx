"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 48, suffix: "h", label: "Fastest full delivery" },
  { value: 90, suffix: "+", label: "Lighthouse performance" },
  // "100% on-time launches" removed in C1: no delivery records back it. Ownership is in the terms.
  { value: 100, suffix: "%", label: "Code & domain you own" },
  { value: 24, suffix: "/7", label: "WhatsApp support" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const step = (t: number) => {
            const p = Math.min((t - t0) / 1200, 1);
            setN(Math.round((1 - Math.pow(1 - p, 3)) * value));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="font-display text-5xl font-bold tracking-tight md:text-6xl">
      {n}
      <span className="text-volt">{suffix}</span>
    </span>
  );
}

export function Stats() {
  return (
    <section className="border-y border-line">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-line md:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="bg-void p-8 text-center md:p-12">
            <Counter value={s.value} suffix={s.suffix} />
            <p className="mt-2 text-xs uppercase tracking-widest text-faint">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
