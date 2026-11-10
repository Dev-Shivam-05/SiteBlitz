"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CalendarCheck, ExternalLink, Inbox, LogOut, Menu, Plus, Radio, Search, X } from "lucide-react";
import { ADMIN_NAV } from "./nav";
import { CommandPalette } from "./CommandPalette";
import { useDialog } from "./useDialog";

/* Redesign v4 admin shell (docs/spec/redesign-v4-showcase.md rows 12 and 16). Same 12 pages in the same order,
   same View site and Sign out; new: a grouped sidebar with aria-current, a Ctrl/⌘+K command bar, keyboard
   shortcuts (G then T/L/O, N), and on phones a top bar plus a bottom tab bar with a "More" sheet. */

const isTyping = (t: EventTarget | null) => {
  const el = t as HTMLElement | null;
  return Boolean(el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)));
};

const GROUPS = ["Daily", "Insight", "Analytics"] as const;

function MoreSheet({ open, onClose, pathname, onLogout }: { open: boolean; onClose: () => void; pathname: string; onLogout: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  useDialog(panel, open, onClose);
  if (!open) return null;
  return (
    <div className="cmdk-backdrop fixed inset-0 z-[110] flex items-end md:hidden" onMouseDown={onClose}>
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label="All admin pages"
        tabIndex={-1}
        onMouseDown={(e) => e.stopPropagation()}
        className="admin-sheet w-full rounded-t-3xl border-t border-line bg-surface px-4 pb-[calc(16px+env(safe-area-inset-bottom))] pt-3 outline-none"
      >
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-line" aria-hidden />
        <div className="flex items-center justify-between px-1">
          <p className="admin-title text-xl">All pages</p>
          <button onClick={onClose} aria-label="Close" className="rounded-xl p-2.5 text-muted hover:bg-raised hover:text-ink">
            <X size={18} />
          </button>
        </div>
        <nav aria-label="All admin pages" className="mt-3 grid grid-cols-3 gap-2">
          {ADMIN_NAV.map((n) => {
            const Icon = n.icon;
            const active = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                onClick={onClose}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-[76px] flex-col items-center justify-center gap-1.5 rounded-2xl border text-xs font-semibold transition-colors ${
                  active ? "border-volt/50 bg-volt/10 text-volt" : "border-line bg-raised text-ink"
                }`}
              >
                <Icon size={19} />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <a href="/" target="_blank" rel="noopener noreferrer" className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-line text-sm text-muted">
            <ExternalLink size={16} /> View site
          </a>
          <button onClick={onLogout} className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-line text-sm text-muted hover:text-red-300">
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [palette, setPalette] = useState(false);
  const [paletteKey, setPaletteKey] = useState(0);
  const [more, setMore] = useState(false);

  const logout = useCallback(async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }, [router]);

  const openPalette = useCallback(() => {
    setPaletteKey((k) => k + 1);
    setPalette(true);
  }, []);
  const closePalette = useCallback(() => setPalette(false), []);
  const closeMore = useCallback(() => setMore(false), []);

  /* Shortcuts: Ctrl/⌘+K anywhere; G then T / L / O and N only when not typing in a field. */
  useEffect(() => {
    let g = 0;
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((open) => {
          if (!open) setPaletteKey((k) => k + 1);
          return !open;
        });
        return;
      }
      if (e.ctrlKey || e.metaKey || e.altKey || isTyping(e.target) || palette || more) return;
      const k = e.key.toLowerCase();
      if (Date.now() - g < 1200) {
        g = 0;
        const to = k === "t" ? "/admin/today" : k === "l" ? "/admin/leads" : k === "o" ? "/admin" : null;
        if (to) {
          e.preventDefault();
          router.push(to);
        }
        return;
      }
      if (k === "g") g = Date.now();
      else if (k === "n") {
        e.preventDefault();
        router.push("/admin/quick-add");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router, palette, more]);

  return (
    <div className="admin-root relative isolate min-h-screen">
      <div aria-hidden className="admin-aura" />

      {/* ---- sidebar: icon rail from md, labels from lg ---- */}
      <aside className="admin-side fixed inset-y-0 left-0 z-40 hidden w-[76px] flex-col md:flex lg:w-[248px]">
        <Link href="/admin" aria-label="SiteBlitz admin overview" className="flex h-[72px] shrink-0 items-center justify-center px-5 lg:justify-start">
          <span className="admin-title text-lg">
            <span className="lg:hidden">
              S<span className="text-volt">B</span>
            </span>
            <span className="hidden lg:inline">
              Site<span className="text-volt">Blitz</span>
            </span>
          </span>
          <span className="ml-2 hidden rounded-full border border-line px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-faint lg:inline">
            Command
          </span>
        </Link>

        <div className="px-3 lg:px-4">
          <button
            onClick={openPalette}
            aria-label="Open the command bar (Ctrl+K)"
            className="group flex h-11 w-full items-center justify-center gap-2.5 rounded-xl border border-line bg-void/60 px-3 text-sm text-faint transition-colors hover:border-volt/40 hover:text-ink lg:justify-start"
          >
            <Search size={16} className="text-volt" />
            <span className="hidden flex-1 whitespace-nowrap text-left lg:inline">Jump to…</span>
            <kbd className="hidden rounded-md border border-line px-1.5 text-[10px] lg:inline">Ctrl K</kbd>
          </button>
        </div>

        <nav aria-label="Admin" className="admin-scroll mt-3 flex min-h-0 flex-1 flex-col overflow-y-auto px-3 pb-3 lg:px-4">
          {GROUPS.map((group) => (
            <div key={group} className="mt-3 first:mt-1">
              <p className="mb-1.5 hidden px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-faint lg:block">{group}</p>
              <div className="flex flex-col gap-0.5">
                {ADMIN_NAV.filter((n) => n.group === group).map((n) => {
                  const active = pathname === n.href;
                  const Icon = n.icon;
                  return (
                    <Link
                      key={n.href}
                      href={n.href}
                      aria-current={active ? "page" : undefined}
                      aria-label={n.label}
                      title={n.label}
                      className="admin-link flex h-10 items-center justify-center gap-3 rounded-xl px-3 text-sm lg:justify-start"
                    >
                      <Icon size={17} strokeWidth={2} className="shrink-0" />
                      <span className="hidden flex-1 lg:inline">{n.label}</span>
                      {n.keys && <kbd className="hidden text-[10px] tracking-wider text-faint lg:inline">{n.keys}</kbd>}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="flex flex-col gap-0.5 border-t border-line p-3 lg:px-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View site"
            title="View site"
            className="admin-link flex h-10 items-center justify-center gap-3 rounded-xl px-3 text-sm lg:justify-start"
          >
            <ExternalLink size={17} />
            <span className="hidden lg:inline">View site</span>
          </a>
          <button
            onClick={logout}
            aria-label="Sign out"
            title="Sign out"
            className="admin-link flex h-10 items-center justify-center gap-3 rounded-xl px-3 text-left text-sm hover:!text-red-300 lg:justify-start"
          >
            <LogOut size={17} />
            <span className="hidden lg:inline">Sign out</span>
          </button>
        </div>
      </aside>

      {/* ---- phone top bar ---- */}
      <header className="admin-topbar sticky top-0 z-30 flex h-16 items-center gap-3 px-4 md:hidden">
        <Link href="/admin" aria-label="SiteBlitz admin overview" className="admin-title text-base">
          Site<span className="text-volt">Blitz</span>
        </Link>
        <button
          onClick={openPalette}
          aria-label="Open the command bar"
          className="ml-auto flex h-10 items-center gap-2 rounded-xl border border-line bg-surface/80 px-3 text-sm text-faint"
        >
          <Search size={16} className="text-volt" /> Search
        </button>
      </header>

      {/* min-w-0: as a flex child, main otherwise grows to its widest content (the 760px visitors table) */}
      <main className="min-h-screen min-w-0 px-4 pb-28 pt-4 md:ml-[76px] md:px-8 md:pb-12 md:pt-8 lg:ml-[248px]">
        <div className="admin-page mx-auto max-w-[1400px]">{children}</div>
      </main>

      {/* ---- phone tab bar ---- */}
      <nav aria-label="Admin tabs" className="admin-tabs fixed inset-x-0 bottom-0 z-40 md:hidden">
        <div className="grid h-[68px] grid-cols-5 items-center">
          {[
            { href: "/admin/today", label: "Today", icon: CalendarCheck },
            { href: "/admin/leads", label: "Leads", icon: Inbox },
          ].map((t) => (
            <TabLink key={t.href} {...t} active={pathname === t.href} />
          ))}
          <Link
            href="/admin/quick-add"
            aria-label="Quick add"
            aria-current={pathname === "/admin/quick-add" ? "page" : undefined}
            className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-volt text-void shadow-[0_0_30px_-6px_rgba(204,255,0,0.7)]"
          >
            <Plus size={22} strokeWidth={2.5} />
          </Link>
          <TabLink href="/admin/live" label="Live" icon={Radio} active={pathname === "/admin/live"} />
          <button
            onClick={() => setMore(true)}
            aria-expanded={more}
            className="flex h-full flex-col items-center justify-center gap-1 text-[11px] font-semibold text-muted"
          >
            <Menu size={19} /> More
          </button>
        </div>
      </nav>

      <MoreSheet open={more} onClose={closeMore} pathname={pathname} onLogout={logout} />
      <CommandPalette key={paletteKey} open={palette} onClose={closePalette} onLogout={logout} />
    </div>
  );
}

function TabLink({ href, label, icon: Icon, active }: { href: string; label: string; icon: React.ComponentType<{ size?: number }>; active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`flex h-full flex-col items-center justify-center gap-1 text-[11px] font-semibold ${active ? "text-volt" : "text-muted"}`}
    >
      <Icon size={19} />
      {label}
    </Link>
  );
}

export function PageHeader({ title, sub, right }: { title: string; sub?: string; right?: React.ReactNode }) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        <h1 className="admin-title text-[clamp(28px,3.2vw,44px)]">
          {title}
          <span className="text-volt">.</span>
        </h1>
        {sub && <p className="mt-2 text-sm text-muted">{sub}</p>}
      </div>
      {right}
    </div>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    // min-w-0: inside a grid, a card holding a wide table must scroll, not widen the column
    <div className={`admin-card min-w-0 rounded-2xl border border-line p-5 ${className}`}>{children}</div>
  );
}

export function DbNotice({ error }: { error: string | null }) {
  if (error !== "db_not_configured") return null;
  return (
    <div className="mb-6 rounded-2xl border border-yellow-500/30 bg-yellow-500/5 p-5 text-sm text-yellow-200/90">
      <p className="font-semibold">Database not connected yet</p>
      <p className="mt-1 text-yellow-200/70">
        MongoDB isn&apos;t provisioned for this deployment. Once <code>MONGODB_URI</code> is set,
        every visitor, pageview and lead appears here automatically — no code changes needed.
      </p>
    </div>
  );
}
