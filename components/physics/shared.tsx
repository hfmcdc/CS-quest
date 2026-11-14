"use client";

import type { ReactNode } from "react";
import { Rich } from "@/components/maths/MathText";

export function shuffle<T>(a: T[]): T[] {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; }
  return r;
}

export const chipCls = (on: boolean) => `chip min-h-[2.4rem] px-4 text-sm ${on ? "chip-ac" : ""}`;

/** Thin animated progress bar with an accessible label. */
export function Progress({ done, total, label }: { done: number; total: number; label: string }) {
  return (
    <div className="mb-5">
      <div className="mb-1.5 flex items-center justify-between text-xs text-slate-400"><span>{label}</span><span>{done} of {total} done</span></div>
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-800" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={total} aria-valuenow={done}>
        <div className="h-full rounded-full bg-[rgb(var(--ac))] transition-all duration-500" style={{ width: `${total ? (done / total) * 100 : 0}%` }} />
      </div>
    </div>
  );
}

/** End-of-set card. */
export function FinishCard({ title, children, actions }: { title: string; children: ReactNode; actions: ReactNode }) {
  return (
    <div className="a-rise card p-6 text-center">
      <p className="a-pop mb-2 text-2xl font-semibold text-[rgb(var(--ac))]">{title}</p>
      <div className="mb-5 text-slate-300">{children}</div>
      <div className="flex flex-wrap justify-center gap-3">{actions}</div>
    </div>
  );
}

/** Coloured feedback panel shown after an answer. */
export function Feedback({ ok, title, children }: { ok: boolean; title: string; children?: ReactNode }) {
  return (
    <div role="status" className={`${ok ? "a-pop border-emerald-400/40 bg-emerald-400/10" : "a-shake border-rose-400/40 bg-rose-400/10"} mt-4 rounded-2xl border p-4 text-sm leading-relaxed`}>
      <p className={`mb-1 font-semibold ${ok ? "text-emerald-300" : "text-rose-300"}`}>{title}</p>
      {children && <div className="text-slate-200">{children}</div>}
    </div>
  );
}

export function RichBlock({ text, className = "" }: { text: string; className?: string }) {
  return <div className={`leading-relaxed ${className}`}><Rich text={text} /></div>;
}
