"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        router.replace(params.get("next") || "/admin");
        router.refresh();
      } else {
        setError(data.error || "Login failed");
      }
    } catch {
      setError("Network error — try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="admin-card relative w-full max-w-sm rounded-3xl border border-line p-8 shadow-[0_40px_120px_-40px_rgba(204,255,0,0.25)]"
    >
      <p className="admin-title text-2xl">
        Site<span className="text-volt">Blitz</span>
      </p>
      <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-faint">Command Center</p>

      <label className="mt-8 block text-xs text-muted" htmlFor="email">
        Email
      </label>
      <input
        id="email"
        type="email"
        required
        autoComplete="username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-2 w-full rounded-xl border border-line bg-void px-4 py-3 text-sm outline-none transition-colors focus:border-volt"
      />
      <label className="mt-4 block text-xs text-muted" htmlFor="password">
        Password
      </label>
      <input
        id="password"
        type="password"
        required
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mt-2 w-full rounded-xl border border-line bg-void px-4 py-3 text-sm outline-none transition-colors focus:border-volt"
      />
      {error && (
        <p className="mt-4 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={busy}
        className="btn-volt mt-6 w-full rounded-xl py-3.5 text-sm font-semibold disabled:opacity-60"
      >
        {busy ? "Checking…" : "Enter →"}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="relative isolate flex min-h-screen items-center justify-center overflow-hidden px-5">
      {/* the same volt haze and grid as the panel behind it */}
      <div aria-hidden className="admin-aura" />
      <p aria-hidden className="admin-title pointer-events-none absolute bottom-[-0.12em] left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[22vw] text-ink/[0.03]">
        SiteBlitz
      </p>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
