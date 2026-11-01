"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useApi<T>(url: string, pollMs = 0) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const urlRef = useRef(url);
  urlRef.current = url;

  const load = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const res = await fetch(urlRef.current, { cache: "no-store" });
      const json = await res.json();
      if (!res.ok || json.ok === false) {
        setError(json.error || `HTTP ${res.status}`);
        setData(json);
      } else {
        setError(null);
        setData(json);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "network_error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load, url]);

  useEffect(() => {
    if (!pollMs) return;
    const id = setInterval(() => load(true), pollMs);
    return () => clearInterval(id);
  }, [pollMs, load]);

  return { data, loading, error, reload: load };
}

/** A write request whose outcome is always checked: resolves to `{ ok:false, error }` on a network
 *  failure, a non-2xx status or an `{ ok:false }` body, so callers can show the error and keep
 *  the old value instead of silently assuming success. */
export async function sendJson<T = Record<string, unknown>>(
  url: string,
  method: "POST" | "PATCH" | "DELETE",
  body?: unknown
): Promise<{ ok: true; data: T } | { ok: false; error: string; status: number; data: T | null }> {
  try {
    const res = await fetch(url, {
      method,
      headers: body === undefined ? undefined : { "content-type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    const json = (await res.json().catch(() => null)) as (T & { ok?: boolean; error?: string }) | null;
    if (!res.ok || !json || json.ok === false) {
      return { ok: false, error: json?.error || `HTTP ${res.status}`, status: res.status, data: json };
    }
    return { ok: true, data: json };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "network_error", status: 0, data: null };
  }
}

export function fmtDuration(sec: number): string {
  if (!sec || sec < 1) return "0s";
  const m = Math.floor(sec / 60);
  const s = Math.round(sec % 60);
  return m ? `${m}m ${s}s` : `${s}s`;
}

export function fmtDate(d: string | Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  }).format(new Date(d));
}

export function flagEmoji(code?: string): string {
  if (!code || code.length !== 2) return "🌐";
  return String.fromCodePoint(
    ...code.toUpperCase().split("").map((c) => 127397 + c.charCodeAt(0))
  );
}
