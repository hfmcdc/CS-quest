"use client";

import { useMemo, useState } from "react";
import { Rich, Tex } from "@/components/maths/MathText";
import Icon from "@/components/Icon";
import { playSound } from "@/lib/fx";
import { Feedback, shuffle } from "./shared";

/** One multiple-choice question. Options are rich text, or bare equations when `asEquations` is set (so no name can leak). */
export default function McqCard({ id, tag, text, options, answer, why, hint, retry = false, asEquations = false, onDone, onNext, last }: {
  id: string; tag: string; text: string; options: string[]; answer: number; why: string; hint?: string; retry?: boolean; asEquations?: boolean;
  onDone: (ok: boolean) => void; onNext: () => void; last: boolean;
}) {
  const order = useMemo(() => shuffle(options.map((_, i) => i)), [id]); // eslint-disable-line react-hooks/exhaustive-deps
  const [wrong, setWrong] = useState<number[]>([]);
  const [done, setDone] = useState<null | boolean>(null);
  const [showHint, setShowHint] = useState(false);

  const pick = (i: number) => {
    if (done !== null || wrong.includes(i)) return;
    if (i === answer) { setDone(true); onDone(wrong.length === 0); playSound("correct"); return; }
    playSound("wrong");
    if (retry && wrong.length === 0) { setWrong([i]); setShowHint(true); return; }
    setWrong((w) => [...w, i]); setDone(false); onDone(false);
  };

  return (
    <div className="a-rise">
      <div className="card p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap gap-2 text-xs"><span className="chip chip-ac">{tag}</span></div>
        <div className="text-base leading-relaxed text-slate-100"><Rich text={text} /></div>
      </div>

      <div className="mt-4 grid gap-2.5" role="group" aria-label="Answer options">
        {order.map((oi, pos) => {
          const isRight = done !== null && oi === answer;
          const isWrong = wrong.includes(oi);
          return (
            <button key={oi} type="button" onClick={() => pick(oi)} disabled={done !== null || isWrong}
              aria-label={`Option ${"ABCD"[pos]}`}
              className={`card flex min-h-[3.5rem] items-center gap-3 px-4 py-3 text-left disabled:cursor-default ${isRight ? "phys-ok a-pop" : isWrong ? "phys-bad a-shake opacity-80" : "hover:!border-[rgb(var(--ac)/.5)] hover:!bg-white/[0.06]"}`}>
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-sm font-semibold ${isRight ? "border-emerald-400/60 text-emerald-300" : isWrong ? "border-rose-400/60 text-rose-300" : "border-white/15 text-slate-400"}`}>
                {isRight ? <Icon name="check" size={16} /> : "ABCD"[pos]}
              </span>
              <span className="min-w-0 flex-1 overflow-x-auto text-base text-slate-100">{asEquations ? <Tex>{options[oi]}</Tex> : <Rich text={options[oi]} />}</span>
            </button>
          );
        })}
      </div>

      {hint && !done && done === null && (
        <div className="mt-4 flex items-center gap-3">
          <button type="button" onClick={() => setShowHint(true)} disabled={showHint} className="btn-ghost disabled:opacity-40"><Icon name="bulb" size={16} />Hint</button>
          {retry && wrong.length === 1 && <span className="a-fade text-sm text-amber-200">Not quite. Try once more.</span>}
        </div>
      )}
      {hint && showHint && done === null && <p className="a-fade mt-3 rounded-xl border border-amber-300/25 bg-amber-300/5 px-4 py-3 text-sm leading-relaxed text-amber-100"><b className="mr-1.5">Hint.</b><Rich text={hint} /></p>}

      {done !== null && (
        <>
          <Feedback ok={done === true} title={done ? (wrong.length === 0 ? "Correct" : "Correct on the second try") : "Not quite. The correct option is highlighted."}><Rich text={why} /></Feedback>
          <div className="mt-4 flex justify-end"><button type="button" onClick={onNext} className="btn-primary">{last ? "See results" : "Next question"}<Icon name="forward" size={16} /></button></div>
        </>
      )}
    </div>
  );
}
