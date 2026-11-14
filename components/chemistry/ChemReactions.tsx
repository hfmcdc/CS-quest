"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ChemReactionQ } from "@/lib/chemistry/types";
import { readNav, writeNav } from "@/lib/navState";
import Icon from "@/components/Icon";
import { celebrate, playSound } from "@/lib/fx";
import { LEVELS } from "@/components/ui";

interface RState { order: string[]; i: number; stage: number; pick: number; tries: number; log: { chosen: string; right: boolean }[]; fin: boolean; hint: boolean; settled: boolean }

const shuffle = <T,>(a: T[]) => { const r = [...a]; for (let k = r.length - 1; k > 0; k--) { const j = Math.floor(Math.random() * (k + 1)); [r[k], r[j]] = [r[j], r[k]]; } return r; };
const blank = { stage: 0, pick: -1, tries: 0, log: [] as RState["log"], fin: false, hint: false, settled: false };

/** Reaction trainer: reactant → reagent → conditions → product, one decision at a time, each with a hint and one retry. */
export default function ChemReactions({ chapterKey, bank, title }: { chapterKey: string; bank: ChemReactionQ[]; title: string }) {
  const navKey = `chem:reactions:${chapterKey}`;
  const [s, setS] = useState<RState>(() => readNav<RState | null>(navKey, null) ?? { order: shuffle(bank.map((b) => b.id)), i: 0, ...blank });
  const ref = useRef(s);
  ref.current = s;
  useEffect(() => () => writeNav(navKey, ref.current), [navKey]);
  const upd = (p: Partial<RState>) => setS((c) => ({ ...c, ...p }));

  const q = bank.find((b) => b.id === s.order[s.i % s.order.length]);
  const st = q?.stages[Math.min(s.stage, (q?.stages.length ?? 1) - 1)];
  // Option order is reshuffled for every stage, so the position of the right answer cannot be memorised.
  const perm = useMemo(() => (st ? shuffle(st.options.map((_, k) => k)) : []), [q?.id, s.stage, s.i]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!q || !st) return <p className="p-8 text-center">No reactions available for this chapter yet.</p>;

  const check = () => {
    if (s.pick < 0) return;
    if (s.pick === st.answer) { upd({ settled: true, log: [...s.log, { chosen: st.options[st.answer], right: s.tries === 0 }] }); celebrate(); }
    else if (s.tries === 0) { upd({ tries: 1, hint: true }); playSound("wrong"); }
    else { upd({ settled: true, pick: st.answer, log: [...s.log, { chosen: st.options[st.answer], right: false }] }); playSound("wrong"); }
  };
  const advance = () => {
    if (s.stage + 1 < q.stages.length) upd({ stage: s.stage + 1, pick: -1, tries: 0, hint: false, settled: false });
    else upd({ fin: true });
  };
  const next = () => setS((c) => ({ ...c, i: c.i + 1, ...blank, log: [] }));
  const score = s.log.filter((l) => l.right).length;

  return (
    <div>
      <article key={`${q.id}-${s.i}`} className={`card a-rise max-w-full p-5 sm:p-7 ${s.tries === 1 && !s.settled ? "a-shake" : ""}`}>
        <div className="mb-4 flex flex-wrap gap-2"><span className="chip chip-ac">{title} · {q.tag}</span><span className="chip">{LEVELS[q.level - 1]}</span>{q.stages.length > 1 && <span className="chip">Step {Math.min(s.stage + 1, q.stages.length)} of {q.stages.length}</span>}</div>
        <p className="mb-1 text-sm text-slate-400">{q.title}</p>
        <p className="mb-5 overflow-x-auto whitespace-pre-line rounded-xl border border-white/10 bg-black/30 p-3 text-base leading-relaxed text-white">{q.prompt}</p>

        {s.log.length > 0 && (
          <ul className="mb-4 space-y-1.5 text-sm text-slate-400" aria-label="Steps completed">
            {s.log.map((l, k) => <li key={k} className="flex gap-2"><Icon name="check" size={16} className={l.right ? "mt-0.5 text-emerald-300" : "mt-0.5 text-amber-300"} /><span><span className="text-slate-500">{q.stages[k].ask} </span>{l.chosen}</span></li>)}
          </ul>
        )}

        {!s.fin && (
          <>
            <p className="mb-3 whitespace-pre-line text-lg font-medium leading-relaxed text-white">{st.ask}</p>
            <fieldset disabled={s.settled} className="min-w-0 max-w-full space-y-2.5">
              <legend className="sr-only">Choose one answer</legend>
              {perm.map((k) => (
                <label key={k} className={`flex w-full min-w-0 max-w-full cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-sm ${s.settled && k === st.answer ? "opt-correct" : s.settled && s.pick === k && k !== st.answer ? "opt-wrong" : ""}`}>
                  <input type="radio" name="rx" className="mt-1 shrink-0" checked={s.pick === k} onChange={() => upd({ pick: k })} />
                  <span className="min-w-0 flex-1 break-words">{st.options[k]}</span>
                </label>
              ))}
            </fieldset>
            {!s.settled && (
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button onClick={check} disabled={s.pick < 0} className="btn-primary">{s.tries ? "Submit retry" : "Submit Answer"}</button>
                {!s.hint && <button onClick={() => upd({ hint: true })} className="btn-ghost min-h-[2.9rem]"><Icon name="bulb" size={16} />Show hint</button>}
              </div>
            )}
            <div role="status" aria-live="polite" className="mt-4 space-y-3">
              {s.hint && !s.settled && <p className="a-rise flex gap-2 rounded-xl border border-amber-300/30 bg-amber-300/10 p-3.5 text-sm text-amber-100"><Icon name="bulb" size={18} className="mt-0.5 text-amber-300" /><span>{st.hint}</span></p>}
              {s.tries === 1 && !s.settled && <p className="a-rise rounded-xl border border-rose-400/30 bg-rose-400/10 p-3.5 text-sm text-rose-200">Not quite. You have one retry.</p>}
              {s.settled && <div className="a-rise rounded-xl border border-white/10 bg-black/25 p-4 text-sm"><p className={`mb-2 text-lg font-semibold ${s.log[s.log.length - 1]?.right ? "a-pop text-emerald-300" : "text-rose-300"}`}>{s.log[s.log.length - 1]?.right ? "Correct" : "Not this time"}</p><p className="leading-relaxed">{st.why}</p></div>}
            </div>
            {s.settled && <button onClick={advance} className="btn-primary mt-5">{s.stage + 1 < q.stages.length ? "Next step" : "See the full reaction"}<Icon name="forward" size={18} /></button>}
          </>
        )}

        {s.fin && (
          <div className="a-rise">
            <p className="mb-3 text-lg font-semibold text-white">{score} of {q.stages.length} step{q.stages.length > 1 ? "s" : ""} right first time</p>
            <p className="mb-1 text-sm text-slate-400">Full reaction</p>
            <pre className="mb-3 max-w-full overflow-x-auto whitespace-pre-wrap rounded-xl border border-white/10 bg-black/30 p-3 font-sans text-sm leading-relaxed text-slate-100">{q.equation}</pre>
            {q.note && <p className="mb-3 text-sm leading-relaxed text-slate-300">{q.note}</p>}
            <button onClick={next} className="btn-primary">Next reaction<Icon name="forward" size={18} /></button>
          </div>
        )}
      </article>
      <p className="mt-6 text-center text-xs text-slate-500">Each step has a hint and one retry. Nothing is saved after a refresh.</p>
    </div>
  );
}
