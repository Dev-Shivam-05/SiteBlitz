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
      const el = (e.target as HTMLElement)?.closest?.("[data-track]");
      if (el) {
        const name = el.getAttribute("data-track");
        if (name) {
          send({
            type: "event",
            name,
            path: window.location.pathname,
            meta: { text: (el.textContent || "").trim().slice(0, 80) },
          });
        }
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

    const flush = () => {
      send(
        {
          type: "leave",
          path: currentPath.current,
          duration: Math.round((Date.now() - pageStart.current) / 1000),
          scrollDepth: maxScroll.current,
        },
        true
      );
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") flush();
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
