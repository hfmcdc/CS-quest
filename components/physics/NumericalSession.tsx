"use client";

import { useEffect, useRef, useState } from "react";
import type { PhysNumerical } from "@/lib/physics/types";
import { readNav, writeNav } from "@/lib/navState";
import NumericalCard, { type NumResult } from "./NumericalCard";
import { FinishCard, Progress } from "./shared";
import { celebrate } from "@/lib/fx";

interface S { idx: number; results: Record<string, NumResult>; finished: boolean }

/** Runs an ordered set of numericals with numbered pills for jumping, progress and a results screen. Progress is kept while the tab stays open. */
export default function NumericalSession({ navKey, problems, label }: { navKey: string; problems: PhysNumerical[]; label: string }) {
  const [s, setS] = useState<S>(() => readNav<S | null>(navKey, null) ?? { idx: 0, results: {}, finished: false });
  const ref = useRef(s); ref.current = s;
  useEffect(() => () => writeNav(navKey, ref.current), [navKey]);

  const p = problems[s.idx];
  const solved = problems.filter((x) => s.results[x.id] === "solved").length;
  const doneCount = problems.filter((x) => s.results[x.id]).length;
  useEffect(() => { if (s.finished && solved === problems.length) celebrate(true); }, [s.finished]); // eslint-disable-line react-hooks/exhaustive-deps

  const restart = () => setS({ idx: 0, results: {}, finished: false });
  const redo = () => { const keep: Record<string, NumResult> = {}; problems.forEach((x) => { if (s.results[x.id] === "solved") keep[x.id] = "solved"; }); const first = problems.findIndex((x) => !keep[x.id]); setS({ idx: Math.max(0, first), results: keep, finished: false }); };

  if (s.finished) {
    return (
      <FinishCard title="Set complete" actions={<>
        {solved < problems.length && <button onClick={redo} className="btn-primary">Retry {problems.length - solved} unsolved</button>}
        <button onClick={restart} className="btn-ghost min-h-[2.9rem]">Restart set</button>
      </>}>
        You solved <b>{solved}</b> of {problems.length} {label.toLowerCase()} problems with the equation and the answer both correct.
      </FinishCard>
    );
  }

  return (
    <div>
      <Progress done={doneCount} total={problems.length} label={label} />
      <div className="mb-4 flex flex-wrap gap-1.5" role="group" aria-label="Jump to a question">
        {problems.map((x, i) => {
          const r = s.results[x.id];
          return <button key={x.id} onClick={() => setS((c) => ({ ...c, idx: i }))} aria-current={i === s.idx ? "step" : undefined} aria-label={`Question ${i + 1}${r === "solved" ? ", solved" : r ? ", solution viewed" : ""}`}
            className={`h-9 w-9 rounded-lg border text-sm font-medium transition-colors ${i === s.idx ? "border-[rgb(var(--ac))] bg-[rgb(var(--ac)/.15)] text-[rgb(var(--ac))]" : r === "solved" ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300" : r ? "border-rose-400/30 bg-rose-400/10 text-rose-300" : "border-white/10 text-slate-400 hover:border-white/25 hover:text-white"}`}>{i + 1}</button>;
        })}
      </div>
      <NumericalCard key={p.id} problem={p} last={s.idx === problems.length - 1}
        onDone={(r) => setS((c) => ({ ...c, results: { ...c.results, [p.id]: r } }))}
        onNext={() => setS((c) => (c.idx === problems.length - 1 ? { ...c, finished: true } : { ...c, idx: c.idx + 1 }))} />
    </div>
  );
}
