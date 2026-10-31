"use client";

import { useEffect, useState } from "react";

/** The honest-urgency switch: sets how many build slots the site advertises.
 *  0 / empty turns the badge back to the default "taking new projects". */
export function CapacityControl() {
  const [slots, setSlots] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((j) => {
        const cap = j?.settings?.capacity;
        if (cap?.slots) setSlots(String(cap.slots));
        if (cap?.note) setNote(cap.note);
      })
      .catch(() => {});
  }, []);

  const save = async () => {
    setState("saving");
    const n = parseInt(slots, 10);
    const value = n > 0 ? { slots: Math.min(n, 20), ...(note ? { note: note.slice(0, 60) } : {}) } : null;
    const r = await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ key: "capacity", value }),
    }).catch(() => null);
    if (r?.ok) {
      setState("saved");
      setTimeout(() => setState("idle"), 1800);
    } else setState("error");
  };

  return (
    <div className="mb-4 flex flex-wrap items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3">
      <span className="font-display text-xs font-bold uppercase tracking-widest text-volt">
        Capacity badge
      </span>
      <label className="flex items-center gap-2 text-xs text-muted">
        slots this week
        <input
          type="number"
          min={0}
          max={20}
          value={slots}
          onChange={(e) => setSlots(e.target.value)}
          className="w-16 rounded-lg border border-line bg-void px-2 py-1.5 text-sm text-ink outline-none focus:border-volt"
        />
      </label>
      <input
        type="text"
        placeholder="optional note (e.g. next start Monday)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full max-w-56 rounded-lg border border-line bg-void px-3 py-1.5 text-sm text-ink outline-none focus:border-volt"
      />
      <button
        onClick={save}
        disabled={state === "saving"}
        className="rounded-full bg-volt px-4 py-1.5 text-xs font-bold text-void disabled:opacity-50"
      >
        {state === "saving" ? "Saving…" : state === "saved" ? "Live ✓" : "Publish"}
      </button>
      <span className="text-[11px] text-faint">
        Shown in the site hero. Set 0 to switch back to “taking new projects”.
        {state === "error" && <b className="ml-2 text-red-300">Save failed</b>}
      </span>
    </div>
  );
}
