import {
  Activity, CalendarCheck, FileText, Filter, Gauge, Inbox, LayoutDashboard, Megaphone, PieChart, Radio, UserPlus, Users,
} from "lucide-react";

/** The 12 admin pages, in the order the panel has always listed them (docs/audit/admin-inventory-2026-11-10.md).
 *  `group` only draws the sidebar's section labels; `keys` is the shortcut shown in the command bar. */
export const ADMIN_NAV = [
  { href: "/admin/today", label: "Today", icon: CalendarCheck, group: "Daily", keys: "G T" },
  { href: "/admin/quick-add", label: "Quick add", icon: UserPlus, group: "Daily", keys: "N" },
  { href: "/admin", label: "Overview", icon: LayoutDashboard, group: "Insight", keys: "G O" },
  { href: "/admin/live", label: "Live", icon: Radio, group: "Insight", keys: undefined },
  { href: "/admin/visitors", label: "Visitors", icon: Users, group: "Insight", keys: undefined },
  { href: "/admin/leads", label: "Leads", icon: Inbox, group: "Insight", keys: "G L" },
  { href: "/admin/grader", label: "Grader", icon: Gauge, group: "Insight", keys: undefined },
  { href: "/admin/funnel", label: "Funnel", icon: Filter, group: "Analytics", keys: undefined },
  { href: "/admin/pages", label: "Pages", icon: FileText, group: "Analytics", keys: undefined },
  { href: "/admin/campaigns", label: "Campaigns", icon: Megaphone, group: "Analytics", keys: undefined },
  { href: "/admin/audience", label: "Audience", icon: PieChart, group: "Analytics", keys: undefined },
  { href: "/admin/events", label: "Activity", icon: Activity, group: "Analytics", keys: undefined },
] as const;

/** Phone tab bar (spec v4 row 16): four destinations and "More" (the full list). */
export const TAB_HREFS = ["/admin/today", "/admin/leads", "/admin/quick-add", "/admin/live"] as const;
