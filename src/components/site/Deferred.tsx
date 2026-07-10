"use client";

import { useEffect, useState } from "react";

/** Mounts children only after the browser goes idle post-hydration.
 *  Keeps the animation/experience layer off the critical path so first
 *  paint and interactivity land before any GSAP/WebGL work begins. */
export function Deferred({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const arm = () => {
      timeoutId = setTimeout(() => setReady(true), delay);
    };
    if ("requestIdleCallback" in window) {
      idleId = (window as Window & typeof globalThis).requestIdleCallback(arm, {
        timeout: 1500,
      });
    } else {
      timeoutId = setTimeout(arm, 300);
    }
    return () => {
      if (idleId !== undefined) cancelIdleCallback(idleId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, [delay]);

  return ready ? <>{children}</> : null;
}

/** True when this device should skip expensive ambient rendering (WebGL,
 *  heavy scenes). Overridable with ?motion=force for QA. */
export function isLowPowerDevice(): boolean {
  if (window.location.search.includes("motion=force")) return false;
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
    deviceMemory?: number;
  };
  if (nav.connection?.saveData) return true;
  if (nav.connection?.effectiveType && /(^|\b)(slow-2g|2g|3g)\b/.test(nav.connection.effectiveType)) return true;
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory < 4) return true;
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) return true;
  return false;
}
