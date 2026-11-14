"use client";

import { useEffect, useRef, useState } from "react";
import type { ChemConceptQ } from "@/lib/chemistry/types";
import { matchConcept } from "@/lib/chemistry/concept";
import { readNav, writeNav } from "@/lib/navState";
import Icon from "@/components/Icon";
import { celebrate, playSound } from "@/lib/fx";
import { LEVELS } from "@/components/ui";

interface CState { order: string[]; i: number; input: string; phase: "ask" | "retry" | "done"; ok: boolean | null; self: boolean; hint: boolean; note: string }

const shuffle = <T,>(a: T[]) => { const r = [...a]; for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };
const fresh = (bank: ChemConceptQ[]): CState => ({ order: shuffle(bank.map((b) => b.id)), i: 0, input: "", phase: "ask", ok: null, self: false, hint: false, note: "" });

/** Typed short-answer practice. Answers are matched against accepted phrasings (keyword groups), not by an AI evaluator. */
export default function ChemConcept({ chapterKey, bank, title, variant = "concept" }: { chapterKey: string; bank: ChemConceptQ[]; title: string; variant?: "concept" | "equations" }) {
  const navKey = `chem:${variant}:${chapterKey}`;
  const [s, setS] = useState<CState>(() => readNav<CState | null>(navKey, null) ?? fresh(bank));
  const ref = useRef(s);
  ref.current = s;
  useEffect(() => () => writeNav(navKey, ref.current), [navKey]);
  const upd = (p: Partial<CState>) => setS((c) => ({ ...c, ...p }));

  const q = bank.find((b) => b.id === s.order[s.i % s.order.length]);
  if (!q) return <p className="p-8 text-center">No questions available for this chapter yet.</p>;
  const done = s.phase === "done";

  const submit = () => {
    if (!s.input.trim()) return;
    const r = matchConcept(s.input, q.groups);
    if (r.status === "correct") { upd({ ok: true, phase: "done", note: "" }); celebrate(); return; }
    const note = r.status === "partial" ? "You have part of it, but an important idea is missing." : "That does not match what I was looking for.";
    if (s.phase === "ask") { upd({ phase: "retry", hint: true, note }); playSound("wrong"); }
    else { upd({ ok: false, phase: "done", note: "" }); playSound("wrong"); }
  };
  const next = () => setS((c) => ({ ...c, i: c.i + 1, input: "", phase: "ask", ok: null, self: false, hint: false, note: "" }));

  return (
    <div>
      <article key={`${q.id}-${s.i}`} className={`card a-rise max-w-full p-5 sm:p-7 ${s.phase === "retry" ? "a-shake" : ""}`}>
        <div className="mb-4 flex flex-wrap gap-2"><span className="chip chip-ac">{title} · {q.tag}</span><span className="chip">{LEVELS[q.level - 1]}</span></div>
        <p className="mb-4 whitespace-pre-line text-lg font-medium leading-relaxed text-white">{q.q}</p>
        <label className="sr-only" htmlFor="concept-answer">Your answer</label>
        <textarea id="concept-answer" value={s.input} disabled={done} onChange={(e) => upd({ input: e.target.value })} rows={variant === "equations" ? 2 : 4} placeholder={variant === "equations" ? "Type the product, e.g. CH3CH2Cl or chloroethane" : "Write your answer in your own words…"}
          className="w-full rounded-xl border border-white/10 bg-black/30 p-3 text-base leading-relaxed text-slate-100 placeholder:text-slate-500" />
        {!done && (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button onClick={submit} disabled={!s.input.trim()} className="btn-primary">{s.phase === "retry" ? "Submit retry" : "Submit Answer"}</button>
            {!s.hint && <button onClick={() => upd({ hint: true })} className="btn-ghost min-h-[2.9rem]"><Icon name="bulb" size={16} />Show hint</button>}
          </div>
        )}
        <div role="status" aria-live="polite" className="mt-4 space-y-3">
          {s.hint && !done && <p className="a-rise flex gap-2 rounded-xl border border-amber-300/30 bg-amber-300/10 p-3.5 text-sm text-amber-100"><Icon name="bulb" size={18} className="mt-0.5 text-amber-300" /><span>{q.hint}</span></p>}
          {s.phase === "retry" && <p className="a-rise rounded-xl border border-rose-400/30 bg-rose-400/10 p-3.5 text-sm text-rose-200">{s.note} You have one retry. Edit your answer and resubmit.</p>}
          {done && (
            <div className="a-rise rounded-xl border border-white/10 bg-black/25 p-4 text-sm">
              {s.ok || s.self ? <p className="a-pop mb-3 flex items-center gap-2 text-lg font-semibold text-emerald-300"><Icon name="check" size={22} />{s.self ? "Marked correct by you" : "Correct"}</p> : <p className="mb-3 text-lg font-semibold text-rose-300">Not matched</p>}
              <p className="mb-1 text-slate-400">Model answer</p>
              <p className="mb-3 leading-relaxed">{q.model}</p>
              {!s.ok && !s.self && (
                <div className="mb-1">
                  <p className="mb-2 text-xs text-slate-400">Answers are checked by keyword matching, so a correct answer in different words can be missed. Compare with the model answer.</p>
                  <button onClick={() => { upd({ self: true }); celebrate(); }} className="btn-ghost min-h-[2.75rem]">My answer says the same thing</button>
                </div>
              )}
            </div>
          )}
        </div>
        {done && <button onClick={next} className="btn-primary mt-5">Next question<Icon name="forward" size={18} /></button>}
      </article>
      <p className="mt-6 text-center text-xs text-slate-500">{variant === "equations" ? "Formulas and names are matched against accepted spellings (CH3CH2OH, C2H5OH, ethanol). Nothing is saved after a refresh." : "Typed answers are matched against accepted wordings. Nothing is saved after a refresh."}</p>
    </div>
  );
}
