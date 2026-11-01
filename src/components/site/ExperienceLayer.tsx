"use client";

import { Component, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { Deferred } from "@/components/site/Deferred";

/** The experience layer is decoration — if any of its chunks fail to load or
 *  crash, the site must keep working. Swallow, never propagate. */
class QuietBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {}
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/* The animation stack (GSAP, SplitText, Lenis) loads as a
 * separate chunk and only after the browser is idle — first paint and first
 * interaction never wait for it. */
const MotionProvider = dynamic(
  () => import("@/components/site/Motion").then((m) => m.MotionProvider),
  { ssr: false }
);

export function ExperienceLayer() {
  return (
    <QuietBoundary>
      <Deferred>
        {/* The custom cursor and scroll HUD were removed in the light redesign (FD-24/36): decoration that
            hid the native cursor and added nothing a buyer needs. */}
        <MotionProvider />
      </Deferred>
    </QuietBoundary>
  );
}
