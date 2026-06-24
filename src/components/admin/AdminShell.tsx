"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Users, Inbox, Activity, LogOut, ExternalLink,
  Radio, Filter, Megaphone, FileText, PieChart,
} from "lucide-react";

const NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/live", label: "Live", icon: Radio },
  { href: "/admin/visitors", label: "Visitors", icon: Users },
  { href: "/admin/leads", label: "Leads", icon: Inbox },
  { href: "/admin/funnel", label: "Funnel", icon: Filter },
  { href: "/admin/pages", label: "Pages", icon: FileText },
  { href: "/admin/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/admin/audience", label: "Audience", icon: PieChart },
  { href: "/admin/events", label: "Activity", icon: Activity },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen">
      <aside className="fixed inset-y-0 left-0 z-40 flex w-16 flex-col border-r border-line bg-surface/60 backdrop-blur lg:w-56">
        <Link href="/admin" className="flex h-16 items-center justify-center border-b border-line lg:justify-start lg:px-5">
          <span className="font-display text-lg font-bold">
            <span className="lg:hidden">S<span className="text-volt">B</span></span>
            <span className="hidden lg:inline">SITE<span className="text-volt">BLITZ</span></span>
          </span>
        </Link>
        <nav className="flex flex-1 flex-col gap-1 p-2 lg:p-3">
          {NAV.map((n) => {
            const active = pathname === n.href;
            const Icon = n.icon;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                  active ? "bg-volt/10 text-volt" : "text-muted hover:bg-raised hover:text-ink"
                }`}
              >
                <Icon size={17} strokeWidth={2} />
                <span className="hidden lg:inline">{n.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="flex flex-col gap-1 border-t border-line p-2 lg:p-3">
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted transition-colors hover:bg-raised hover:text-ink"
          >
            <ExternalLink size={17} />
            <span className="hidden lg:inline">View site</span>
          </a>
          <button
            onClick={logout}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-muted transition-colors hover:bg-raised hover:text-red-400"
          >
            <LogOut size={17} />
            <span className="hidden lg:inline">Sign out</span>
          </button>
        </div>
      </aside>
      <main className="ml-16 min-h-screen flex-1 p-5 md:p-8 lg:ml-56">{children}</main>
    </div>
  );
}

export function PageHeader({ title, sub, right }: { title: string; sub?: string; right?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-bold md:text-3xl">{title}</h1>
        {sub && <p className="mt-1 text-sm text-muted">{sub}</p>}
      </div>
      {right}
    </div>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-line bg-surface p-5 ${className}`}>{children}</div>
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
