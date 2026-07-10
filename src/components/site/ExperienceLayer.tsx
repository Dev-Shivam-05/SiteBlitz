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

/* The whole animation stack (GSAP, SplitText, Lenis, cursor, HUD) loads as a
 * separate chunk and only after the browser is idle — first paint and first
 * interaction never wait for it. */
const MotionProvider = dynamic(
  () => import("@/components/site/Motion").then((m) => m.MotionProvider),
  { ssr: false }
);
const Cursor = dynamic(
  () => import("@/components/site/Cursor").then((m) => m.Cursor),
  { ssr: false }
);
const ScrollHUD = dynamic(
  () => import("@/components/site/ScrollHUD").then((m) => m.ScrollHUD),
  { ssr: false }
);

export function ExperienceLayer() {
  return (
    <QuietBoundary>
      <Deferred>
        <MotionProvider />
        <Cursor />
        <ScrollHUD />
      </Deferred>
    </QuietBoundary>
  );
}
