"use client";

import { useEffect, useRef, useState } from "react";
import type { ChemNumQ } from "@/lib/chemistry/types";
import { checkChemAnswer } from "@/lib/chemistry/units";
import { readNav, writeNav } from "@/lib/navState";
import Rich from "@/components/physics/PhysMath";
import Icon from "@/components/Icon";
import { celebrate, playSound } from "@/lib/fx";
import { LEVELS } from "@/components/ui";

type Stage = "formula" | "answer" | "done";
interface NState { order: string[]; i: number; stage: Stage; pick: number; fTries: number; fOk: boolean | null; input: string; aTries: number; ok: boolean | null; msg: string; hint: boolean; shown: boolean }

const shuffle = <T,>(a: T[]) => { const r = [...a]; for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };
const blank = (): Omit<NState, "order" | "i"> => ({ stage: "formula", pick: -1, fTries: 0, fOk: null, input: "", aTries: 0, ok: null, msg: "", hint: false, shown: false });

/** Formula selection, then a number with its unit. The unit-aware checker accepts equivalent spellings and prefixes. */
export default function ChemNumerical({ chapterKey, bank, title }: { chapterKey: string; bank: ChemNumQ[]; title: string }) {
  const navKey = `chem:num:${chapterKey}`;
  const [s, setS] = useState<NState>(() => readNav<NState | null>(navKey, null) ?? { order: shuffle(bank.map((b) => b.id)), i: 0, ...blank() });
  const ref = useRef(s);
  ref.current = s;
  useEffect(() => () => writeNav(navKey, ref.current), [navKey]);
  const upd = (p: Partial<NState>) => setS((c) => ({ ...c, ...p }));

  const q = bank.find((b) => b.id === s.order[s.i % s.order.length]);
  if (!q) return <p className="p-8 text-center">No numerical problems available for this chapter yet.</p>;

  const checkFormula = () => {
    if (s.pick < 0) return;
    if (s.pick === q.formulaAnswer) { upd({ stage: "answer", fOk: s.fTries === 0 }); celebrate(); }
    else if (s.fTries === 0) { upd({ fTries: 1, hint: true }); playSound("wrong"); }
    else { upd({ stage: "answer", fOk: false, pick: q.formulaAnswer }); playSound("wrong"); }
  };
  const checkAnswer = () => {
    if (!s.input.trim()) return;
    const r = checkChemAnswer(s.input, q.ans);
    if (r.status === "correct") { upd({ stage: "done", ok: true, msg: r.message }); celebrate(); return; }
    // Unit or format problems do not use up the retry.
    if (r.status === "unit-missing" || r.status === "unit-wrong" || r.status === "unreadable") { upd({ msg: r.message }); playSound("wrong"); return; }
    if (s.aTries === 0) { upd({ aTries: 1, hint: true, msg: r.message }); playSound("wrong"); }
    else { upd({ stage: "done", ok: false, msg: r.message }); playSound("wrong"); }
  };
  const showModel = () => upd({ stage: "done", ok: null, shown: true, msg: "" });
  const next = () => setS((c) => ({ ...c, i: c.i + 1, ...blank() }));

  const done = s.stage === "done";
  const retryMsg = s.stage === "answer" && s.msg;

  return (
    <div>
      <article key={`${q.id}-${s.i}`} className="card a-rise max-w-full p-5 sm:p-7">
        <div className="mb-4 flex flex-wrap gap-2"><span className="chip chip-ac">{title} · {q.tag}</span><span className="chip">{LEVELS[q.level - 1]}</span></div>
        <p className="mb-5 text-lg font-medium leading-relaxed text-white"><Rich text={q.text} /></p>

        <p className="mb-2 text-sm text-slate-400">Step 1 · Choose the equation to use</p>
        <fieldset disabled={s.stage !== "formula"} className="min-w-0 max-w-full space-y-2.5">
          <legend className="sr-only">Choose one equation</legend>
          {q.formulaOptions.map((o, idx) => (
            <label key={idx} className={`flex w-full min-w-0 max-w-full cursor-pointer items-center gap-3 overflow-x-auto rounded-xl border p-3.5 text-sm ${s.stage !== "formula" && idx === q.formulaAnswer ? "opt-correct" : s.stage !== "formula" && s.pick === idx ? "opt-wrong" : ""}`}>
              <input type="radio" name="formula" className="shrink-0" checked={s.pick === idx} onChange={() => upd({ pick: idx })} />
              <span className="min-w-0 flex-1"><Rich text={o} /></span>
            </label>
          ))}
        </fieldset>
        {s.stage === "formula" && (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button onClick={checkFormula} disabled={s.pick < 0} className="btn-primary">{s.fTries ? "Check retry" : "Check equation"}</button>
          </div>
        )}
        {s.fTries === 1 && s.stage === "formula" && <p className="a-rise mt-3 rounded-xl border border-rose-400/30 bg-rose-400/10 p-3.5 text-sm text-rose-200">Not that one. Try once more. Hint: {q.hint}</p>}
        {s.stage !== "formula" && <p className={`a-rise mt-3 text-sm ${s.fOk ? "text-emerald-300" : "text-amber-200"}`}>{s.fOk ? "Right equation." : "The highlighted equation is the one to use."}</p>}

        {s.stage !== "formula" && (
          <div className="a-rise mt-6">
            <p className="mb-2 text-sm text-slate-400">Step 2 · Calculate. Give the value with its unit</p>
            <label className="sr-only" htmlFor="num-answer">Final answer with unit</label>
            <input id="num-answer" value={s.input} disabled={done} onChange={(e) => upd({ input: e.target.value })} onKeyDown={(e) => e.key === "Enter" && !done && checkAnswer()}
              inputMode="text" autoComplete="off" autoCapitalize="off" spellCheck={false} placeholder="e.g. 3.47 × 10^-2 min^-1"
              className="w-full rounded-xl border border-white/10 bg-black/30 p-3 text-base text-slate-100 placeholder:text-slate-500" />
            <p className="mt-2 text-xs text-slate-500">Write powers like s^-1 or s⁻¹. Prefixes and equivalent units (for example L and dm³) are accepted.</p>
            {!done && (
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button onClick={checkAnswer} disabled={!s.input.trim()} className="btn-primary">{s.aTries ? "Submit retry" : "Submit Answer"}</button>
                <button onClick={showModel} className="btn-ghost min-h-[2.9rem]">Show model answer</button>
              </div>
            )}
          </div>
        )}

        <div role="status" aria-live="polite" className="mt-4 space-y-3">
          {retryMsg && !done && <p className="a-rise rounded-xl border border-rose-400/30 bg-rose-400/10 p-3.5 text-sm text-rose-200">{s.msg}{s.aTries === 1 ? " You have one retry." : ""}</p>}
          {s.hint && s.stage === "answer" && !done && <p className="a-rise flex gap-2 rounded-xl border border-amber-300/30 bg-amber-300/10 p-3.5 text-sm text-amber-100"><Icon name="bulb" size={18} className="mt-0.5 text-amber-300" /><span>{q.hint}</span></p>}
          {done && (
            <div className="a-rise rounded-xl border border-white/10 bg-black/25 p-4 text-sm">
              {s.ok ? <p className="a-pop mb-3 flex items-center gap-2 text-lg font-semibold text-emerald-300"><Icon name="check" size={22} />Correct</p> : s.shown ? <p className="mb-3 text-lg font-semibold text-slate-200">Model answer</p> : <p className="mb-3 text-lg font-semibold text-rose-300">Not this time</p>}
              {s.msg && !s.ok && <p className="mb-3 text-slate-300">{s.msg}</p>}
              <p className="mb-1 text-slate-400">Answer</p>
              <p className="mb-3 text-base"><Rich text={q.ansShow} /></p>
              <p className="mb-1 text-slate-400">Working</p>
              <ol className="mb-1 list-decimal space-y-1.5 pl-5 leading-relaxed">{q.steps.map((st, k) => <li key={k}><Rich text={st} /></li>)}</ol>
            </div>
          )}
        </div>
        {done && <button onClick={next} className="btn-primary mt-5">Next problem<Icon name="forward" size={18} /></button>}
      </article>
      <p className="mt-6 text-center text-xs text-slate-500">Answers are checked as numbers with units, within 1% or when correctly rounded. If your answer looks right but is marked wrong, compare it with the model answer. Nothing is saved.</p>
    </div>
  );
}
