"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CornerDownLeft, ExternalLink, LogOut, Search, UserPlus } from "lucide-react";
import { ADMIN_NAV } from "./nav";
import { useDialog } from "./useDialog";

interface Item {
  id: string;
  label: string;
  hint?: string;
  group: "Search" | "Go to" | "Actions";
  icon: React.ComponentType<{ size?: number; className?: string }>;
  run: () => void;
}

/** Ctrl/⌘+K command bar (spec v4 row 12): jump to any of the 12 admin pages, search leads by name, phone or ref
 *  (→ /admin/leads?q=…), add a lead, open the site or sign out. Arrow keys move, Enter runs, Esc closes. */
export function CommandPalette({ open, onClose, onLogout }: { open: boolean; onClose: () => void; onLogout: () => void }) {
  const router = useRouter();
  const panel = useRef<HTMLDivElement>(null);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  useDialog(panel, open, onClose);

  const items = useMemo<Item[]>(() => {
    const go = (href: string) => () => {
      onClose();
      router.push(href);
    };
    const query = q.trim();
    const all: Item[] = [
      ...ADMIN_NAV.map((n) => ({
        id: n.href,
        label: n.label,
        hint: n.keys,
        group: "Go to" as const,
        icon: n.icon,
        run: go(n.href),
      })),
      { id: "add", label: "Add a lead", hint: "N", group: "Actions", icon: UserPlus, run: go("/admin/quick-add") },
      {
        id: "site",
        label: "View the public site",
        group: "Actions",
        icon: ExternalLink,
        run: () => {
          onClose();
          window.open("/", "_blank", "noopener");
        },
      },
      {
        id: "logout",
        label: "Sign out",
        group: "Actions",
        icon: LogOut,
        run: () => {
          onClose();
          onLogout();
        },
      },
    ];
    const lower = query.toLowerCase();
    const matched = lower ? all.filter((i) => i.label.toLowerCase().includes(lower)) : all;
    return query
      ? [
          {
            id: "search",
            label: `Search leads for “${query}”`,
            group: "Search" as const,
            icon: Search,
            run: go(`/admin/leads?q=${encodeURIComponent(query)}`),
          },
          ...matched,
        ]
      : matched;
  }, [q, router, onClose, onLogout]);

  if (!open) return null;
  const current = Math.min(active, items.length - 1);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % items.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + items.length) % items.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      items[current]?.run();
    }
  };

  let lastGroup = "";
  return (
    <div className="cmdk-backdrop fixed inset-0 z-[120] flex items-start justify-center px-3 pt-[12vh]" onMouseDown={onClose}>
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label="Command bar"
        tabIndex={-1}
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={onKey}
        className="cmdk-panel w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl outline-none"
      >
        <label className="flex items-center gap-3 border-b border-line px-4">
          <Search size={18} className="shrink-0 text-volt" />
          <input
            data-autofocus
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setActive(0);
            }}
            placeholder="Jump to a page, or search leads…"
            aria-label="Command"
            aria-controls="cmdk-list"
            aria-activedescendant={items[current] ? `cmdk-${items[current].id}` : undefined}
            className="h-14 w-full min-w-0 bg-transparent text-base text-ink outline-none placeholder:text-faint"
          />
          <kbd className="hidden rounded-md border border-line px-1.5 py-0.5 text-[10px] text-faint sm:block">ESC</kbd>
        </label>
        <ul id="cmdk-list" role="listbox" aria-label="Results" className="admin-scroll max-h-[min(60vh,420px)] overflow-y-auto p-2">
          {items.map((it, i) => {
            const head = it.group !== lastGroup ? it.group : null;
            lastGroup = it.group;
            const Icon = it.icon;
            return (
              <li key={it.id} role="presentation">
                {head && <p className="px-3 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-faint">{head}</p>}
                <button
                  id={`cmdk-${it.id}`}
                  role="option"
                  aria-selected={i === current}
                  tabIndex={-1}
                  onMouseMove={() => setActive(i)}
                  onClick={it.run}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                    i === current ? "bg-volt text-void" : "text-ink"
                  }`}
                >
                  <Icon size={16} className={i === current ? "text-void" : "text-muted"} />
                  <span className="min-w-0 flex-1 truncate">{it.label}</span>
                  {it.hint && (
                    <kbd className={`rounded-md border px-1.5 py-0.5 text-[10px] ${i === current ? "border-void/30" : "border-line text-faint"}`}>
                      {it.hint}
                    </kbd>
                  )}
                  {i === current && (it.group === "Search" ? <CornerDownLeft size={14} /> : <ArrowRight size={14} />)}
                </button>
              </li>
            );
          })}
          {items.length === 0 && <li className="px-3 py-8 text-center text-sm text-faint">Nothing matches “{q}”.</li>}
        </ul>
        <p className="flex items-center gap-4 border-t border-line px-4 py-2.5 text-[11px] text-faint">
          <span>↑↓ move</span>
          <span>↵ open</span>
          <span className="ml-auto hidden sm:inline">G then T · L · O jumps · N adds a lead</span>
        </p>
      </div>
    </div>
  );
}
