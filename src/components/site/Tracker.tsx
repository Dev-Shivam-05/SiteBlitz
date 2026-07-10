"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    sbTrack?: (name: string, meta?: Record<string, unknown>) => void;
  }
}

function send(payload: Record<string, unknown>, useBeacon = false) {
  const body = JSON.stringify(payload);
  if (useBeacon && navigator.sendBeacon) {
    navigator.sendBeacon("/api/track", body);
    return;
  }
  fetch("/api/track", {
    method: "POST",
    body,
    keepalive: true,
    headers: { "content-type": "text/plain" },
  }).catch(() => {});
}

function utmParams(): Record<string, string> {
  const utm: Record<string, string> = {};
  try {
    const sp = new URLSearchParams(window.location.search);
    for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) {
      const v = sp.get(k);
      if (v) utm[k] = v.slice(0, 120);
    }
  } catch {}
  return utm;
}

/** Real-user Core Web Vitals, page-load scoped (initial route only). */
const vitals: { lcp?: number; cls?: number; inp?: number; sent?: boolean } = {};
const vitalObservers: PerformanceObserver[] = [];

function observeVitals() {
  const watch = (fn: (list: PerformanceObserverEntryList) => void, init: PerformanceObserverInit) => {
    try {
      const ob = new PerformanceObserver(fn);
      ob.observe(init);
      vitalObservers.push(ob);
    } catch {}
  };
  watch((list) => {
    const entries = list.getEntries();
    const last = entries[entries.length - 1] as PerformanceEntry & { startTime: number };
    if (last) vitals.lcp = last.startTime;
  }, { type: "largest-contentful-paint", buffered: true });
  let cls = 0;
  watch((list) => {
    for (const e of list.getEntries() as (PerformanceEntry & {
      value: number;
      hadRecentInput: boolean;
    })[]) {
      if (!e.hadRecentInput) cls += e.value;
    }
    vitals.cls = cls;
  }, { type: "layout-shift", buffered: true });
  watch((list) => {
    for (const e of list.getEntries() as (PerformanceEntry & { duration: number })[]) {
      if (!vitals.inp || e.duration > vitals.inp) vitals.inp = e.duration;
    }
  }, { type: "event", buffered: true, durationThreshold: 40 } as PerformanceObserverInit);
}

/** Stop measuring once reported — SPA navigations must not keep inflating
 *  the initial page's CLS/INP. */
function stopVitals() {
  for (const ob of vitalObservers.splice(0)) {
    try {
      ob.disconnect();
    } catch {}
  }
}

export function Tracker() {
  const pathname = usePathname();
  const pageStart = useRef(Date.now());
  const maxScroll = useRef(0);
  const currentPath = useRef(pathname);

  // Global event API + delegated [data-track] clicks
  useEffect(() => {
    window.sbTrack = (name, meta) =>
      send({ type: "event", name, meta, path: window.location.pathname });

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const tagged = target?.closest?.("[data-track]");
      if (tagged) {
        const name = tagged.getAttribute("data-track");
        if (name) {
          send({
            type: "event",
            name,
            path: window.location.pathname,
            meta: { text: (tagged.textContent || "").trim().slice(0, 80) },
          });
          return;
        }
      }
      // Untagged interactions: capture every link/button click so the admin
      // activity feed shows the complete picture.
      const generic = target?.closest?.("a, button") as HTMLElement | null;
      if (generic) {
        const href = generic.getAttribute("href") || undefined;
        send({
          type: "event",
          name: "click",
          path: window.location.pathname,
          meta: {
            text: (generic.textContent || generic.getAttribute("aria-label") || "")
              .trim()
              .slice(0, 80),
            tag: generic.tagName.toLowerCase(),
            ...(href ? { href: href.slice(0, 200) } : {}),
          },
        });
      }
    };
    document.addEventListener("click", onClick, { capture: true });

    const onScroll = () => {
      const h = document.documentElement;
      const depth = Math.round(
        ((h.scrollTop + window.innerHeight) / Math.max(h.scrollHeight, 1)) * 100
      );
      if (depth > maxScroll.current) maxScroll.current = Math.min(depth, 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    observeVitals();

    const flush = () => {
      send(
        {
          type: "leave",
          path: currentPath.current,
          duration: Math.round((Date.now() - pageStart.current) / 1000),
          scrollDepth: maxScroll.current,
          // vitals belong to the initial load — send once, with its first flush
          ...(vitals.sent
            ? {}
            : { vitals: { lcp: vitals.lcp, cls: vitals.cls, inp: vitals.inp } }),
        },
        true
      );
      if (!vitals.sent) {
        vitals.sent = true;
        stopVitals();
      }
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        flush();
        // reset the clock so a re-focused tab doesn't double-count time
        pageStart.current = Date.now();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // Pageview on route change (+ leave for the previous route)
  useEffect(() => {
    if (currentPath.current !== pathname) {
      send(
        {
          type: "leave",
          path: currentPath.current,
          duration: Math.round((Date.now() - pageStart.current) / 1000),
          scrollDepth: maxScroll.current,
        },
        true
      );
    }
    currentPath.current = pathname;
    pageStart.current = Date.now();
    maxScroll.current = 0;

    send({
      type: "pageview",
      path: pathname,
      title: document.title,
      referrer: document.referrer || undefined,
      screen: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language,
      utm: utmParams(),
    });
  }, [pathname]);

  return null;
}
