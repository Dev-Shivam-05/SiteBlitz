import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — SiteBlitz",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Since v4 the site and the admin share one dark token set; data-theme stays as the admin scope hook.
  return (
    <div data-theme="dark" className="min-h-screen bg-void">
      {children}
    </div>
  );
}
