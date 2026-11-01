"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DEMO_LIST, type DemoId } from "@/lib/demos";

/** The live website switcher (FD-40): one phone, three business types, each a link to a working demo.
 *  No auto-cycling, so nothing moves unless the visitor asks it to. Screenshots are real captures of
 *  /demo/* (scripts/shoot.mjs), so the preview never shows something the demo doesn't have. */
export function DemoSwitcher() {
  const [active, setActive] = useState<DemoId>("salon");
  const demo = DEMO_LIST.find((d) => d.id === active)!;

  return (
    <div className="mx-auto w-full max-w-[340px]">
      <div role="tablist" aria-label="Choose a business type" className="flex gap-1 rounded-full border border-line bg-surface p-1">
        {DEMO_LIST.map((d) => (
          <button
            key={d.id}
            role="tab"
            id={`demo-tab-${d.id}`}
            aria-selected={active === d.id}
            aria-controls="demo-panel"
            onClick={() => {
              setActive(d.id);
              window.sbTrack?.("hero_demo_switch", { demo: d.id });
            }}
            className={`flex-1 rounded-full px-2 py-2 text-xs font-semibold transition-colors ${
              active === d.id ? "bg-ink text-void" : "text-muted hover:text-ink"
            }`}
          >
            {d.vertical.split(" ")[0]}
          </button>
        ))}
      </div>

      <div id="demo-panel" role="tabpanel" aria-labelledby={`demo-tab-${active}`} className="mt-4">
        <Link
          href={`/demo/${demo.id}`}
          data-track={`hero_demo_open_${demo.id}`}
          className="phone-frame relative block aspect-[9/18.5] overflow-hidden"
          aria-label={`Open the working ${demo.vertical.toLowerCase()} demo`}
        >
          <Image
            src={`/demos/${demo.id}.png`}
            alt={`${demo.vertical} concept demo website on a phone`}
            fill
            sizes="320px"
            className="object-cover object-top"
            priority={demo.id === "salon"}
          />
        </Link>
        <p className="mt-4 text-center text-sm text-muted">
          {demo.vertical} · <span className="font-semibold text-ink">concept demo</span>, not a client.{" "}
          <Link href={`/demo/${demo.id}`} className="font-semibold text-volt underline-offset-4 hover:underline">
            Try it live →
          </Link>
        </p>
      </div>
    </div>
  );
}
