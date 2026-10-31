"use client";

import { useEffect, useRef, useState } from "react";
import type { ChemQuestion } from "@/lib/chemistry/types";
import { readNav, writeNav } from "@/lib/navState";

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
  const q: ChemQuestion = { ...b, options: [...b.options].sort(() => Math.random() - 0.5) };
  return { q, seen: fresh.length ? [...seen, q.id] : [q.id], restarted: !fresh.length && seen.length > 0 };
}

export default function ChemPractice({ chapterKey, bank, title }: { chapterKey: string; bank: ChemQuestion[]; title: string }) {
  const navKey = `chem:practice:${chapterKey}`;
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
  if (!q) return <p className="p-8 text-center text-slate-400" role="status">Loading question…</p>;

  const move = (n: number) => {
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
  const box = "max-w-full overflow-x-auto whitespace-pre-wrap rounded-xl border border-slate-700 bg-slate-950/70 p-3 text-[13px] leading-relaxed text-slate-200";

  return (
    <div>
      <div className="mb-3 text-right text-sm" aria-label={`Current difficulty ${LEVELS[diff - 1]}`}>
        <span className="text-slate-400">Difficulty </span>
        <span className="mono text-amber-300">{"●".repeat(diff)}{"○".repeat(3 - diff)} {LEVELS[diff - 1]}</span>
      </div>
      <article key={s.n} className={`a-rise relative min-w-0 max-w-full rounded-2xl border border-slate-700/80 bg-slate-900/70 p-4 shadow-[0_0_40px_-20px_#fbbf24] sm:p-6 ${phase === "retry" ? "a-shake" : ""}`}>
        <div className="mb-3 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-amber-400/10 px-3 py-1 text-amber-300">{title} · {q.tag}</span>
          <span className="rounded-full bg-slate-700/50 px-3 py-1 text-slate-300">{LEVELS[q.level - 1]}</span>
        </div>
        {restarted && <p className="mb-3 rounded-lg bg-slate-800 p-2 text-xs text-slate-300">You have seen every question in this chapter, so the bank is repeating. More questions are on the way.</p>}
        <p className="mb-3 text-base font-medium leading-relaxed">{q.text}</p>

        <fieldset disabled={done} className="min-w-0 max-w-full space-y-2">
          <legend className="sr-only">Choose one answer</legend>
          {q.options.map((o) => (
            <label key={o} className={`flex w-full min-w-0 max-w-full cursor-pointer items-start gap-3 rounded-xl border p-3 text-sm ${input === o ? "border-amber-400 bg-amber-400/10" : "border-slate-700"}`}>
              <input type="radio" name="opt" className="mt-1 shrink-0" checked={input === o} onChange={() => upd({ input: o })} />
              <span className="min-w-0 flex-1 break-words">{o}</span>
            </label>
          ))}
        </fieldset>

        {!done && (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button onClick={submit} disabled={input === ""} className="rounded-xl bg-gradient-to-r from-amber-300 to-orange-400 px-5 py-3 font-semibold text-slate-950 transition hover:brightness-110 disabled:opacity-40">
              {phase === "retry" ? "Submit retry" : "Submit Answer"}
            </button>
            {!hint && <button onClick={() => upd({ hint: true })} className="rounded-xl border border-slate-600 px-4 py-3 text-sm hover:border-amber-400">Show hint</button>}
          </div>
        )}

        <div role="status" aria-live="polite" className="mt-4 space-y-3">
          {hint && !done && <p className="a-rise rounded-xl border border-amber-400/40 bg-amber-400/10 p-3 text-sm text-amber-200">💡 Hint: {q.hint}</p>}
          {phase === "retry" && <p className="a-rise rounded-xl border border-rose-400/40 bg-rose-400/10 p-3 text-sm text-rose-200">Not quite. You have one retry. Choose again and resubmit.</p>}
          {done && correct !== null && (
            <div className="a-rise rounded-xl border border-slate-700 bg-slate-950/60 p-4 text-sm">
              {correct ? <p className="a-pop mb-2 text-lg font-semibold text-emerald-300">✅ Correct</p> : <p className="mb-2 text-lg font-semibold text-rose-300">❌ Not this time</p>}
              <p className="mb-1 text-slate-400">Correct option</p>
              <pre className={`${box} mb-3 font-sans`}>{q.answer}</pre>
              <p className="mb-1 text-slate-400">Explanation</p>
              <p className="mb-3 leading-relaxed">{q.why}</p>
              <p className="text-xs text-amber-300">{change}</p>
            </div>
          )}
        </div>

        {done && (
          <button onClick={() => load(diff, s.seen)} className="mt-4 rounded-xl bg-amber-300 px-5 py-3 font-semibold text-slate-950 hover:brightness-110">Next Question</button>
        )}
      </article>
      <p className="mt-4 text-center text-xs text-slate-500">All questions are multiple choice. Nothing is saved after a refresh.</p>
    </div>
  );
}
