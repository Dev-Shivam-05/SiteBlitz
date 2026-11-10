"use client";

import { useEffect, useRef, useState } from "react";
import { locate } from "@/lib/geo-centroids";

export interface GlobeVisitor {
  city?: string;
  countryCode?: string;
}

/** Live globe (spec v4 row 13): a slowly turning dotted Earth (COBE, WebGL, ~7 KB, loaded with this page only)
 *  with a volt dot for each visitor on the site now. Drag turns it. If WebGL is unavailable the card simply shows
 *  its caption; the visitor list beside it carries the same facts. */
export function LiveGlobe({ visitors }: { visitors: GlobeVisitor[] }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const markers = useRef<{ location: [number, number]; size: number }[]>([]);
  const [on, setOn] = useState(false);
  const [failed, setFailed] = useState(false);

  // stack visitors from the same place into one bigger dot
  useEffect(() => {
    const counts = new Map<string, { loc: [number, number]; n: number }>();
    for (const v of visitors) {
      const loc = locate(v.city, v.countryCode);
      if (!loc) continue;
      const key = loc.join(",");
      counts.set(key, { loc, n: (counts.get(key)?.n || 0) + 1 });
    }
    markers.current = [...counts.values()].map(({ loc, n }) => ({ location: loc, size: Math.min(0.14, 0.05 + n * 0.02) }));
  }, [visitors]);

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    let globe: { destroy: () => void } | null = null;
    let cancelled = false;
    // COBE faces longitude L at phi = PI - (L - 90deg); India (79 E) is about 3.33
    let phi = 3.33;
    let drag: number | null = null;
    let dragOffset = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onDown = (e: PointerEvent) => {
      drag = e.clientX - dragOffset;
      el.style.cursor = "grabbing";
    };
    const onUp = () => {
      drag = null;
      el.style.cursor = "grab";
    };
    const onMove = (e: PointerEvent) => {
      if (drag !== null) dragOffset = e.clientX - drag;
    };
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointermove", onMove);

    import("cobe")
      .then(({ default: createGlobe }) => {
        if (cancelled) return;
        const size = el.offsetWidth || 400;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        globe = createGlobe(el, {
          devicePixelRatio: dpr,
          width: size * dpr,
          height: size * dpr,
          phi,
          theta: 0.32,
          dark: 1,
          diffuse: 1.4,
          mapSamples: 16000,
          mapBrightness: 5.5,
          mapBaseBrightness: 0.02,
          baseColor: [0.16, 0.16, 0.19],
          markerColor: [0.8, 1, 0],
          glowColor: [0.24, 0.3, 0.06],
          markers: markers.current,
          onRender: (state) => {
            if (!reduced && drag === null) phi += 0.0025;
            state.phi = phi + dragOffset / 160;
            state.markers = markers.current;
            const w = el.offsetWidth * dpr;
            state.width = w;
            state.height = w;
          },
        });
        setOn(true);
      })
      .catch(() => setFailed(true));

    return () => {
      cancelled = true;
      globe?.destroy();
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div className="globe-wrap relative">
      {!failed && <canvas ref={canvas} aria-hidden data-globe className={`cursor-grab ${on ? "is-on" : ""}`} />}
      <div aria-hidden className="pointer-events-none absolute inset-[18%] -z-10 rounded-full bg-volt/10 blur-3xl" />
    </div>
  );
}
