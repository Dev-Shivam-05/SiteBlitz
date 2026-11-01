import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — SiteBlitz",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // The public site is light; the operator panel keeps its dark token set (globals.css [data-theme]).
  return (
    <div data-theme="dark" className="min-h-screen bg-void">
      {children}
    </div>
  );
}
