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
      className="w-full max-w-sm rounded-2xl border border-line bg-surface p-8"
    >
      <p className="font-display text-xl font-bold">
        SITE<span className="text-volt">BLITZ</span>
      </p>
      <p className="mt-1 text-xs uppercase tracking-widest text-faint">Command Center</p>

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
        className="mt-2 w-full rounded-xl border border-line bg-void px-4 py-3 text-sm outline-none focus:border-volt"
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
        className="mt-2 w-full rounded-xl border border-line bg-void px-4 py-3 text-sm outline-none focus:border-volt"
      />
      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
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
    <div className="flex min-h-screen items-center justify-center px-5">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
