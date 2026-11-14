"use client";

import { useRef, useState } from "react";
import type { PhysNumerical } from "@/lib/physics/types";
import { checkAnswer, checkEquation, symbolHelp, SYMBOL_LABEL } from "@/lib/physics/checker";
import { Rich, Tex } from "@/components/maths/MathText";
import Icon from "@/components/Icon";
import { celebrate, playSound } from "@/lib/fx";
import { Feedback } from "./shared";

export type NumResult = "solved" | "revealed";
const MAX_ATTEMPTS = 3;

type Part = { status: "idle" | "ok" | "bad"; msg?: string };

/** One numerical: the student types the main equation and the final answer with its unit. Both are checked. */
export default function NumericalCard({ problem, onDone, onNext, last }: { problem: PhysNumerical; onDone: (r: NumResult) => void; onNext: () => void; last: boolean }) {
  const [eq, setEq] = useState("");
  const [ans, setAns] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [hints, setHints] = useState(0);
  const [eqP, setEqP] = useState<Part>({ status: "idle" });
  const [ansP, setAnsP] = useState<Part>({ status: "idle" });
  const [note, setNote] = useState<string | null>(null);
  const [phase, setPhase] = useState<"working" | "solved" | "revealed">("working");
  const eqRef = useRef<HTMLInputElement>(null);

  const done = phase !== "working";
  const tol = problem.tol ?? 0.03;

  const insert = (t: string) => {
    const el = eqRef.current;
    const a = el?.selectionStart ?? eq.length, b = el?.selectionEnd ?? eq.length;
    const next = eq.slice(0, a) + t + eq.slice(b);
    setEq(next);
    requestAnimationFrame(() => { el?.focus(); el?.setSelectionRange(a + t.length, a + t.length); });
  };

  const check = () => {
    if (done) return;
    // A part that is already correct is kept, so a retry only has to fix what is still wrong.
    const needEq = eqP.status !== "ok", needAns = ansP.status !== "ok";
    if ((needEq && !eq.trim()) || (needAns && !ans.trim())) { setNote("Enter both the main equation and the final answer with its unit."); return; }

    const e = needEq ? checkEquation(eq, problem.formulas, problem.vars) : { status: "correct" as const };
    const a = needAns ? checkAnswer(ans, problem.answer, problem.unit, tol, problem.traps) : { status: "correct" as const };
    if (e.status === "unreadable" || a.status === "unreadable") {
      if (e.status === "unreadable") setEqP({ status: "bad", msg: (e as { message?: string }).message });
      if (a.status === "unreadable") setAnsP({ status: "bad", msg: (a as { message?: string }).message });
      setNote("I couldn't read part of that, so this did not use up an attempt.");
      return;
    }
    const n = attempts + 1;
    setAttempts(n);
    setNote(null);
    const eqNext: Part = e.status === "correct" ? { status: "ok" } : { status: "bad", msg: (e as { message?: string }).message };
    const ansNext: Part = a.status === "correct" ? { status: "ok" } : { status: "bad", msg: (a as { message?: string }).message };
    setEqP(eqNext); setAnsP(ansNext);

    if (eqNext.status === "ok" && ansNext.status === "ok") { setPhase("solved"); onDone("solved"); playSound("correct"); celebrate(false); return; }
    playSound("wrong");
    if (n >= MAX_ATTEMPTS) { setPhase("revealed"); onDone("revealed"); }
    else if (hints === 0) setHints(1);
  };

  const reveal = () => { if (done) return; setPhase("revealed"); onDone("revealed"); };
  const inputCls = (p: Part) => `w-full min-w-0 rounded-xl border bg-black/30 px-3.5 py-3 text-base text-white outline-none transition-colors placeholder:text-slate-600 focus:border-[rgb(var(--ac))] ${p.status === "ok" ? "border-emerald-400/60" : p.status === "bad" ? "border-rose-400/60" : "border-white/15"}`;
  const badge = (p: Part) => p.status === "ok" ? <span className="a-pop inline-flex items-center gap-1 text-xs font-medium text-emerald-300"><Icon name="check" size={14} />Correct</span> : p.status === "bad" ? <span className="text-xs font-medium text-rose-300">Not yet</span> : null;
  const quick = Array.from(new Set([...problem.vars.map((v) => (SYMBOL_LABEL[v] ?? v.replace(/(\d)$/, (d) => "₀₁₂₃₄₅₆₇₈₉"[Number(d)])).split(" ")[0]), "π", "√(", "^", "/", "(", ")"]));

  return (
    <div className="a-rise">
      <div className="card p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap gap-2 text-xs"><span className="chip chip-ac">{problem.tag}</span></div>
        <div className="text-base leading-relaxed text-slate-100"><Rich text={problem.text} /></div>
      </div>

      <div className="card mt-4 space-y-5 p-5 sm:p-6">
        <div>
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <label htmlFor={`eq-${problem.id}`} className="text-sm font-medium text-slate-200">1. Main equation used</label>{badge(eqP)}
          </div>
          <input id={`eq-${problem.id}`} ref={eqRef} value={eq} onChange={(e) => setEq(e.target.value)} disabled={done || eqP.status === "ok"} autoComplete="off" autoCapitalize="off" autoCorrect="off" spellCheck={false}
            onKeyDown={(e) => { if (e.key === "Enter") check(); }} placeholder="e.g. F = q v B sin(theta)" className={inputCls(eqP)} />
          {!done && eqP.status !== "ok" && (
            <div className="mt-2 flex flex-wrap gap-1.5" role="group" aria-label="Insert a symbol">
              {quick.map((q) => <button key={q} type="button" onClick={() => insert(q === "√(" ? "sqrt(" : q)} className="chip min-h-[2.2rem] min-w-[2.2rem] justify-center !px-2.5 text-sm font-serif hover:!border-white/30 hover:!text-white" aria-label={`Insert ${q}`}>{q}</button>)}
            </div>
          )}
          <p className="mt-2 text-xs text-slate-500">Symbols: {symbolHelp(problem.vars)}. Any equivalent rearrangement is accepted.</p>
          {eqP.status === "bad" && <p className="a-fade mt-2 text-sm text-rose-300">{eqP.msg ?? "That equation is not equivalent to the one this problem needs."}{ansP.status === "ok" && !eqP.msg ? " Your final answer is right, but the equation you wrote does not match." : ""}</p>}
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <label htmlFor={`ans-${problem.id}`} className="text-sm font-medium text-slate-200">2. Final answer with unit</label>{badge(ansP)}
          </div>
          <input id={`ans-${problem.id}`} value={ans} onChange={(e) => setAns(e.target.value)} disabled={done || ansP.status === "ok"} autoComplete="off" autoCapitalize="off" autoCorrect="off" spellCheck={false}
            onKeyDown={(e) => { if (e.key === "Enter") check(); }} placeholder={problem.unit === "" ? "e.g. 42.8 (a pure number)" : "e.g. 2.4e-13 N"} className={inputCls(ansP)} />
          <p className="mt-2 text-xs text-slate-500">{problem.unit === "" ? "This answer has no unit." : "Include the unit."} Write powers of ten as 4.8e-14 or 4.8 × 10^-14. Prefixes such as mT or cm are fine.</p>
          {ansP.status === "bad" && <p className="a-fade mt-2 text-sm text-rose-300">{ansP.msg ? <Rich text={ansP.msg} /> : `Not quite. Your answer should agree within about ${Math.round(tol * 100)}%.`}</p>}
        </div>

        {note && <p className="a-fade text-sm text-amber-200" role="status">{note}</p>}

        {!done && (
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" onClick={check} className="btn-primary">Check answer</button>
            <button type="button" onClick={() => setHints((h) => Math.min(problem.hints.length, h + 1))} disabled={hints >= problem.hints.length} className="btn-ghost disabled:opacity-40"><Icon name="bulb" size={16} />Hint{hints > 0 ? ` (${hints}/${problem.hints.length})` : ""}</button>
            <button type="button" onClick={reveal} className="ml-auto text-xs text-slate-500 underline hover:text-slate-300">Show solution</button>
          </div>
        )}
        {!done && attempts > 0 && <p className="text-xs text-slate-500">Attempt {attempts} of {MAX_ATTEMPTS}. Parts you got right stay locked; fix the rest and check again.</p>}
      </div>

      {hints > 0 && !done && (
        <ol className="a-fade mt-4 space-y-2" aria-label="Hints">
          {problem.hints.slice(0, hints).map((h, i) => <li key={i} className="rounded-xl border border-amber-300/25 bg-amber-300/5 px-4 py-3 text-sm leading-relaxed text-amber-100"><b className="mr-1.5">Hint {i + 1}.</b><Rich text={h} /></li>)}
        </ol>
      )}

      {phase === "solved" && <Feedback ok title={attempts === 1 ? "Correct. Equation and answer both match." : `Correct after ${attempts} attempts.`} />}
      {phase === "revealed" && <Feedback ok={false} title={attempts >= MAX_ATTEMPTS ? "Out of attempts. Here is the verified solution." : "Here is the verified solution."} />}

      {done && (
        <section className="a-rise card mt-4 p-5 sm:p-6" aria-label="Worked solution">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[rgb(var(--ac))]">Worked solution</h3>
          <div className="rounded-xl border border-white/10 bg-black/20 px-2 py-2"><Tex display>{problem.formulaTex}</Tex></div>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-300 marker:text-slate-500">
            {problem.steps.map((s, i) => <li key={i}><Rich text={s} /></li>)}
          </ol>
          <div className="mt-4 rounded-xl border border-violet-400/40 bg-violet-400/10 px-4 py-3 text-center"><p className="mb-1 text-xs uppercase tracking-wide text-slate-400">Final answer</p><Tex display>{problem.answerTex}</Tex></div>
          <div className="mt-4 flex justify-end"><button type="button" onClick={onNext} className="btn-primary">{last ? "See results" : "Next question"}<Icon name="forward" size={16} /></button></div>
        </section>
      )}
    </div>
  );
}
