"use client";

import { useState } from "react";
import type { PhysWritten } from "@/lib/physics/types";
import { Rich } from "@/components/maths/MathText";
import Icon from "@/components/Icon";
import { playSound } from "@/lib/fx";

/** Written-answer question. These cannot be auto-checked fairly, so the student compares with a verified model answer and key-point list. */
export default function WrittenCard({ q, onDone, onNext, last }: { q: PhysWritten; onDone: (ok: boolean) => void; onNext: () => void; last: boolean }) {
  const [draft, setDraft] = useState("");
  const [shown, setShown] = useState(false);
  const [hint, setHint] = useState(false);
  const [ticked, setTicked] = useState<boolean[]>(() => q.points.map(() => false));
  const [rated, setRated] = useState(false);
  const all = ticked.every(Boolean);

  return (
    <div className="a-rise">
      <div className="card p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap gap-2 text-xs"><span className="chip chip-ac">{q.tag}</span><span className="chip">{q.marks} marks · written answer</span></div>
        <div className="text-base leading-relaxed text-slate-100"><Rich text={q.text} /></div>
      </div>

      {!shown && (
        <div className="card mt-4 p-5 sm:p-6">
          <label htmlFor={`w-${q.id}`} className="mb-1.5 block text-sm font-medium text-slate-200">Write your answer (only you can see this)</label>
          <textarea id={`w-${q.id}`} value={draft} onChange={(e) => setDraft(e.target.value)} rows={5} placeholder="Write your answer here, then compare it with the model answer."
            className="w-full min-w-0 rounded-xl border border-white/15 bg-black/30 px-3.5 py-3 text-base text-white outline-none placeholder:text-slate-600 focus:border-[rgb(var(--ac))]" />
          <p className="mt-2 text-xs text-slate-500">Written answers are not marked automatically. You compare your answer with a verified model answer.</p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => { setShown(true); playSound("tap"); }} className="btn-primary">Show model answer</button>
            <button type="button" onClick={() => setHint(true)} disabled={hint} className="btn-ghost disabled:opacity-40"><Icon name="bulb" size={16} />Hint</button>
          </div>
          {hint && <p className="a-fade mt-3 rounded-xl border border-amber-300/25 bg-amber-300/5 px-4 py-3 text-sm leading-relaxed text-amber-100"><b className="mr-1.5">Hint.</b><Rich text={q.hint} /></p>}
        </div>
      )}

      {shown && (
        <section className="a-rise card mt-4 p-5 sm:p-6" aria-label="Model answer">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[rgb(var(--ac))]">Model answer</h3>
          <div className="space-y-2 text-sm leading-relaxed text-slate-200">{q.model.map((m, i) => <div key={i}><Rich text={m} /></div>)}</div>
          <h3 className="mb-2 mt-5 text-sm font-semibold uppercase tracking-wide text-slate-400">Did your answer include these key points?</h3>
          <ul className="space-y-2">
            {q.points.map((p, i) => (
              <li key={i}>
                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 px-3 py-2.5 text-sm text-slate-200 hover:border-white/25">
                  <input type="checkbox" checked={ticked[i]} disabled={rated} onChange={() => setTicked((t) => t.map((v, j) => (j === i ? !v : v)))} className="mt-0.5 h-4 w-4 accent-violet-400" />
                  <span><Rich text={p} /></span>
                </label>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-400">{ticked.filter(Boolean).length} of {q.points.length} points covered</p>
            <button type="button" onClick={() => { if (!rated) { setRated(true); onDone(all); } onNext(); }} className="btn-primary">{last ? "See results" : "Next question"}<Icon name="forward" size={16} /></button>
          </div>
          {!all && <p className="mt-2 text-xs text-slate-500">Tick every point you covered. Anything unticked counts as one to revise.</p>}
        </section>
      )}
    </div>
  );
}
