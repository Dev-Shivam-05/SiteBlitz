"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AdminShell, PageHeader, Card, DbNotice } from "@/components/admin/AdminShell";
import { sendJson, fmtDate } from "@/components/admin/useApi";
import { normalizeIndianPhone } from "@/lib/phone";
import { istYmd } from "@/lib/today";
import { BUSINESS_TYPES, DEFAULT_NEXT_ACTION, LEAD_STATUSES, SOURCE_CODES } from "@/lib/leadops";

interface Existing {
  _id: string;
  name: string;
  ref?: string;
  status: string;
  createdAt: string;
}

const SOURCE_KEY = "sb_quickadd_source"; // last-used source code, a per-device convenience
const input =
  "w-full min-w-0 rounded-xl border border-line bg-void px-4 py-2.5 text-sm text-ink outline-none focus:border-volt";
const label = "mb-1.5 block text-xs uppercase tracking-widest text-faint";

const leadLink = (e: { ref?: string }, phone: string) =>
  `/admin/leads?q=${encodeURIComponent(e.ref || phone)}`;

export default function QuickAddPage() {
  const phoneRef = useRef<HTMLInputElement>(null);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [sourceCode, setSourceCode] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [status, setStatus] = useState("new");
  const [nextAction, setNextAction] = useState(DEFAULT_NEXT_ACTION);
  const [nextActionAt, setNextActionAt] = useState(() => istYmd(new Date()));
  const [note, setNote] = useState("");
  const [existing, setExisting] = useState<Existing[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dbMissing, setDbMissing] = useState(false);
  const [saved, setSaved] = useState<{ ref?: string; name: string } | null>(null);

  const norm = normalizeIndianPhone(phone);
  const phoneInvalid = phone.replace(/\D/g, "").length >= 10 && !norm;

  useEffect(() => {
    try {
      const s = localStorage.getItem(SOURCE_KEY);
      if (s && (SOURCE_CODES as readonly string[]).includes(s)) setSourceCode(s);
    } catch {}
  }, []);

  // Duplicate check as soon as the number is valid — before the founder types anything else.
  useEffect(() => {
    setExisting([]);
    if (!norm) return;
    const ctrl = new AbortController();
    fetch(`/api/admin/leads?status=all&q=${encodeURIComponent(norm)}`, { signal: ctrl.signal, cache: "no-store" })
      .then((r) => r.json())
      .then((j) => { if (j?.ok && Array.isArray(j.leads)) setExisting(j.leads); })
      .catch(() => {});
    return () => ctrl.abort();
  }, [norm]);

  const reset = () => {
    setPhone(""); setName(""); setBusinessType(""); setStatus("new");
    setNextAction(DEFAULT_NEXT_ACTION); setNextActionAt(istYmd(new Date())); setNote("");
    setExisting([]);
    phoneRef.current?.focus();
  };

  const submit = async (allowDuplicate = false) => {
    setError(null);
    setSaved(null);
    if (!norm) return setError("Enter a valid Indian mobile number (10 digits, starts with 6–9).");
    if (name.trim().length < 2) return setError("Enter the person's or business name.");
    if (!sourceCode) return setError("Pick where the lead came from.");
    setBusy(true);
    const r = await sendJson<{ lead: { ref?: string; name: string }; existing?: Existing[] }>(
      "/api/admin/leads",
      "POST",
      {
        name: name.trim(),
        phone: norm,
        sourceCode,
        businessType,
        status,
        nextAction: nextAction.trim(),
        nextActionAt: nextActionAt || undefined,
        note: note.trim() || undefined,
        allowDuplicate,
      }
    );
    setBusy(false);
    if (!r.ok) {
      if (r.status === 409 && r.data?.existing) {
        setExisting(r.data.existing);
        return setError("This number is already a lead. Open it, or save a second lead anyway.");
      }
      setDbMissing(r.error === "db_not_configured");
      return setError(`Not saved: ${r.error}`);
    }
    try { localStorage.setItem(SOURCE_KEY, sourceCode); } catch {}
    setSaved({ ref: r.data.lead.ref, name: r.data.lead.name });
    reset();
  };

  return (
    <AdminShell>
      <PageHeader title="Quick add" sub="Log a WhatsApp or walk-in lead in under 10 seconds" />
      <DbNotice error={dbMissing ? "db_not_configured" : null} />

      {saved && (
        <div className="mb-4 rounded-2xl border border-volt/40 bg-volt/10 p-4 text-sm" role="status">
          <p className="font-semibold text-volt">Saved {saved.ref || ""}</p>
          <p className="mt-1 break-words text-muted">
            {saved.name} ·{" "}
            <a href={`/admin/leads?q=${encodeURIComponent(saved.ref || saved.name)}`} className="text-volt underline">
              open lead
            </a>{" "}
            · <Link href="/admin/today" className="text-volt underline">Today</Link>
          </p>
        </div>
      )}

      <Card className="max-w-xl">
        <form
          onSubmit={(e) => { e.preventDefault(); submit(false); }}
          className="space-y-4"
          noValidate
        >
          <div>
            <label htmlFor="qa-phone" className={label}>Phone *</label>
            <input
              id="qa-phone"
              ref={phoneRef}
              autoFocus
              type="tel"
              inputMode="tel"
              autoComplete="off"
              placeholder="98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`${input} font-display text-lg tabular-nums`}
              aria-invalid={phoneInvalid}
            />
            <p className="mt-1 text-xs text-faint">
              {norm ? <span className="text-volt">{norm}</span> : phoneInvalid ? <span className="text-red-300">Not a valid Indian mobile number</span> : "Spaces, dashes, 0 / 91 / +91 are fine"}
            </p>
          </div>

          {existing.length > 0 && (
            <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-3 text-sm text-yellow-200/90" role="alert">
              <p className="font-semibold">Already a lead with this number</p>
              <ul className="mt-1 space-y-1">
                {existing.map((e) => (
                  <li key={e._id} className="break-words">
                    <a href={leadLink(e, norm || phone)} className="underline">
                      {e.ref ? `${e.ref} · ` : ""}{e.name}
                    </a>{" "}
                    <span className="text-yellow-200/60">({e.status}, {fmtDate(e.createdAt)})</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <label htmlFor="qa-name" className={label}>Name or business *</label>
            <input
              id="qa-name"
              autoComplete="off"
              placeholder="e.g. Riya — Glow Salon"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={input}
            />
          </div>

          <fieldset>
            <legend className={label}>Source *</legend>
            <div className="flex flex-wrap gap-2">
              {SOURCE_CODES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSourceCode(c)}
                  aria-pressed={sourceCode === c}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                    sourceCode === c ? "border-volt bg-volt text-void" : "border-line text-muted hover:text-ink"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="min-w-0">
              <label htmlFor="qa-type" className={label}>Business type</label>
              <select id="qa-type" value={businessType} onChange={(e) => setBusinessType(e.target.value)} className={input}>
                <option value="">—</option>
                {BUSINESS_TYPES.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div className="min-w-0">
              <label htmlFor="qa-status" className={label}>Status</label>
              <select id="qa-status" value={status} onChange={(e) => setStatus(e.target.value)} className={`${input} capitalize`}>
                {LEAD_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
            <div className="min-w-0">
              <label htmlFor="qa-next" className={label}>Next action</label>
              <input id="qa-next" value={nextAction} onChange={(e) => setNextAction(e.target.value)} className={input} />
            </div>
            <div className="min-w-0">
              <label htmlFor="qa-date" className={label}>Due</label>
              <input id="qa-date" type="date" value={nextActionAt} onChange={(e) => setNextActionAt(e.target.value)} className={input} />
            </div>
          </div>

          <div>
            <label htmlFor="qa-note" className={label}>Note</label>
            <textarea
              id="qa-note"
              rows={2}
              placeholder="What they asked for (stays in admin, never sent to Telegram)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className={input}
            />
          </div>

          {error && <p className="text-sm font-semibold text-red-300" role="alert">{error}</p>}

          <div className="flex flex-wrap gap-2">
            <button type="submit" disabled={busy} className="btn-volt rounded-xl px-5 py-3 text-sm font-semibold disabled:opacity-50">
              {busy ? "Saving…" : "Save lead"}
            </button>
            {existing.length > 0 && (
              <button
                type="button"
                disabled={busy}
                onClick={() => submit(true)}
                className="rounded-xl border border-line px-4 py-3 text-xs text-muted hover:text-ink disabled:opacity-50"
              >
                Save anyway (new lead)
              </button>
            )}
          </div>
        </form>
      </Card>
    </AdminShell>
  );
}
