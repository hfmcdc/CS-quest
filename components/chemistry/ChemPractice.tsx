"use client";

import { useEffect, useRef, useState } from "react";
import type { ChemQuestion } from "@/lib/chemistry/types";
import { readNav, writeNav } from "@/lib/navState";
import Icon from "@/components/Icon";
import { DifficultyMeter } from "@/components/ui";

const LEVELS = ["Easy", "Medium", "Hard"];

interface PState {
  q: ChemQuestion | null;
  seen: string[];
  diff: number;
  input: string;
  phase: "ask" | "retry" | "done";
  correct: boolean | null;
  hint: boolean;
  change: string;
  restarted: boolean;
  n: number;
}

const INITIAL: PState = { q: null, seen: [], diff: 1, input: "", phase: "ask", correct: null, hint: false, change: "", restarted: false, n: 0 };

/** Same adaptive rule as the CS practice: nearest unseen level, options shuffled. */
function pick(bank: ChemQuestion[], diff: number, seen: string[]) {
  const fresh = bank.filter((x) => !seen.includes(x.id));
  const base = fresh.length ? fresh : bank;
  const d = Math.min(...base.map((x) => Math.abs(x.level - diff)));
  const near = base.filter((x) => Math.abs(x.level - diff) === d);
  const b = near[Math.floor(Math.random() * near.length)];
  // Assertion–Reason items keep their conventional option order; everything else is shuffled.
  const keepOrder = b.text.startsWith("Assertion");
  const q: ChemQuestion = { ...b, options: keepOrder ? [...b.options] : [...b.options].sort(() => Math.random() - 0.5) };
  return { q, seen: fresh.length ? [...seen, q.id] : [q.id], restarted: !fresh.length && seen.length > 0 };
}

export default function ChemPractice({ chapterKey, bank, title, challenge = false }: { chapterKey: string; bank: ChemQuestion[]; title: string; challenge?: boolean }) {
  const navKey = `chem:${challenge ? "challenge" : "practice"}:${chapterKey}`;
  // Resume exactly where the student left off if they navigated away and came back.
  const [s, setS] = useState<PState>(() => readNav<PState>(navKey, INITIAL));
  const ref = useRef(s);
  ref.current = s;
  useEffect(() => () => writeNav(navKey, ref.current), [navKey]);

  const upd = (p: Partial<PState>) => setS((cur) => ({ ...cur, ...p }));

  const load = (diff: number, seen: string[]) => {
    const r = pick(bank, diff, seen);
    setS((cur) => ({ ...cur, q: r.q, seen: r.seen, restarted: r.restarted, input: "", phase: "ask", correct: null, hint: false, change: "", n: cur.n + 1 }));
  };
  useEffect(() => { if (!s.q && bank.length) load(s.diff, s.seen); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, []);

  const { q, diff, input, phase, hint, change, correct, restarted } = s;
  if (!bank.length) return <p className="p-8 text-center">No questions available for this chapter yet.</p>;
  if (!q) return <div className="flex justify-center p-12" role="status" aria-label="Loading question"><span className="h-6 w-6 animate-spin rounded-full border-2 border-white/10 border-t-amber-300" /></div>;

  const move = (n: number) => {
    if (challenge) return { nd: diff, msg: "" };
    const nd = Math.min(3, Math.max(1, diff + n));
    const msg = n > 0 ? (nd === diff ? "Already at the hardest level." : "Next question will be harder.") : nd === diff ? "Already at the easiest level." : "Next question will be easier.";
    return { nd, msg };
  };

  const submit = () => {
    if (input === "") return;
    if (input === q.answer) {
      const m = move(1);
      upd({ correct: true, phase: "done", diff: m.nd, change: m.msg });
    } else if (phase === "ask") {
      upd({ phase: "retry", hint: true });
    } else {
      const m = move(-1);
      upd({ correct: false, phase: "done", diff: m.nd, change: m.msg });
    }
  };

  const done = phase === "done";
  const box = "max-w-full overflow-x-auto whitespace-pre-wrap rounded-xl border border-white/10 bg-black/30 p-3 text-[13px] leading-relaxed text-slate-200";

  return (
    <div>
      {challenge ? (
        <p className="mb-4 flex items-center justify-end gap-2 text-sm text-[rgb(var(--ac))]"><Icon name="flame" size={16} />Challenge · conceptual</p>
      ) : (
        <div className="mb-4 flex justify-end"><DifficultyMeter level={diff} /></div>
      )}
      <article key={s.n} className={`card a-rise max-w-full p-5 sm:p-7 ${phase === "retry" ? "a-shake" : ""}`}>
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="chip chip-ac">{title} · {q.tag}</span>
          <span className="chip">{challenge ? "Challenge" : LEVELS[q.level - 1]}</span>
        </div>
        {restarted && <p className="mb-3 rounded-xl bg-white/5 p-3 text-xs text-slate-300">You have seen every question in this chapter, so the bank is repeating. More questions are on the way.</p>}
        <p className="mb-4 whitespace-pre-line text-lg font-medium leading-relaxed text-white">{q.text}</p>

        <fieldset disabled={done} className="min-w-0 max-w-full space-y-2.5">
          <legend className="sr-only">Choose one answer</legend>
          {q.options.map((o) => (
            <label key={o} className={`flex w-full min-w-0 max-w-full cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-sm ${done && o === q.answer ? "opt-correct" : done && input === o ? "opt-wrong" : ""}`}>
              <input type="radio" name="opt" className="mt-1 shrink-0" checked={input === o} onChange={() => upd({ input: o })} />
              <span className="min-w-0 flex-1 break-words">{o}</span>
            </label>
          ))}
        </fieldset>

        {!done && (
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button onClick={submit} disabled={input === ""} className="btn-primary">
              {phase === "retry" ? "Submit retry" : "Submit Answer"}
            </button>
            {!hint && <button onClick={() => upd({ hint: true })} className="btn-ghost min-h-[2.9rem]"><Icon name="bulb" size={16} />Show hint</button>}
          </div>
        )}

        <div role="status" aria-live="polite" className="mt-4 space-y-3">
          {hint && !done && <p className="a-rise flex gap-2 rounded-xl border border-amber-300/30 bg-amber-300/10 p-3.5 text-sm text-amber-100"><Icon name="bulb" size={18} className="mt-0.5 text-amber-300" /><span>{q.hint}</span></p>}
          {phase === "retry" && <p className="a-rise rounded-xl border border-rose-400/30 bg-rose-400/10 p-3.5 text-sm text-rose-200">Not quite. You have one retry. Choose again and resubmit.</p>}
          {done && correct !== null && (
            <div className="a-rise rounded-xl border border-white/10 bg-black/25 p-4 text-sm">
              {correct ? <p className="a-pop mb-3 flex items-center gap-2 text-lg font-semibold text-emerald-300"><Icon name="check" size={22} />Correct</p> : <p className="mb-3 text-lg font-semibold text-rose-300">Not this time</p>}
              <p className="mb-1 text-slate-400">Correct option</p>
              <pre className={`${box} mb-3 font-sans`}>{q.answer}</pre>
              <p className="mb-1 text-slate-400">Explanation</p>
              <p className="mb-3 leading-relaxed">{q.why}</p>
              {change && <p className="text-xs text-[rgb(var(--ac))]">{change}</p>}
            </div>
          )}
        </div>

        {done && (
          <button onClick={() => load(diff, s.seen)} className="btn-primary mt-5">Next question<Icon name="forward" size={18} /></button>
        )}
      </article>
      <p className="mt-6 text-center text-xs text-slate-500">All questions are multiple choice. Nothing is saved after a refresh.</p>
    </div>
  );
}
