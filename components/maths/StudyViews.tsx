"use client";

import { useState } from "react";
import { EXAMPLES } from "@/lib/maths/examples";
import { REVISION } from "@/lib/maths/revision";
import type { MathTopicId, RevisionSection } from "@/lib/maths/types";
import { Rich } from "@/components/maths/MathText";

const SECTION_STYLE: Record<RevisionSection["kind"], { icon: string; ring: string; label: string }> = {
  formulas: { icon: "📌", ring: "border-cyan-400/30", label: "Formulas" },
  concepts: { icon: "💡", ring: "border-violet-400/30", label: "Key concepts" },
  mistakes: { icon: "⚠️", ring: "border-rose-400/30", label: "Common mistakes" },
  example: { icon: "✏️", ring: "border-emerald-400/30", label: "Worked example" },
};

export function RevisionView({ topic }: { topic: MathTopicId }) {
  const sections = REVISION[topic];
  return (
    <div className="space-y-4">
      {sections.map((sec) => {
        const st = SECTION_STYLE[sec.kind];
        return (
          <section key={sec.title} className={`a-rise min-w-0 rounded-2xl border ${st.ring} bg-slate-900/70 p-4 sm:p-5`} aria-label={sec.title}>
            <h3 className="mb-3 text-base font-semibold">
              <span aria-hidden="true">{st.icon} </span>
              {sec.title}
            </h3>
            {sec.kind === "formulas" && (
              <ul className="space-y-3">
                {sec.items.map((it, i) => (
                  <li key={i} className="min-w-0 rounded-xl border border-slate-700/70 bg-slate-950/50 p-3">
                    {it.label && <p className="mb-1 text-xs font-semibold text-cyan-300">{it.label}</p>}
                    <div className="min-w-0 text-sm"><Rich text={it.body} /></div>
                  </li>
                ))}
              </ul>
            )}
            {(sec.kind === "concepts" || sec.kind === "mistakes") && (
              <ul className="space-y-2 text-sm leading-relaxed">
                {sec.items.map((it, i) => (
                  <li key={i} className="flex min-w-0 gap-2">
                    <span aria-hidden="true" className={sec.kind === "mistakes" ? "text-rose-300" : "text-violet-300"}>{sec.kind === "mistakes" ? "✗" : "•"}</span>
                    <span className="min-w-0 flex-1"><Rich text={it.body} /></span>
                  </li>
                ))}
              </ul>
            )}
            {sec.kind === "example" && (
              <ol className="space-y-2 text-sm leading-relaxed">
                {sec.items.map((it, i) => (
                  <li key={i} className="flex min-w-0 gap-3">
                    <span className="mono w-16 shrink-0 text-xs text-emerald-300">{it.label}</span>
                    <span className="min-w-0 flex-1"><Rich text={it.body} /></span>
                  </li>
                ))}
              </ol>
            )}
          </section>
        );
      })}
    </div>
  );
}

export function LearnView({ topic }: { topic: MathTopicId }) {
  const examples = EXAMPLES[topic];
  const [idx, setIdx] = useState(0);
  const [shown, setShown] = useState(1); // how many steps are revealed
  const ex = examples[idx];
  const total = ex.steps.length;
  const all = shown >= total;

  const pickExample = (i: number) => { setIdx(i); setShown(1); };

  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-2" role="group" aria-label="Choose an example">
        {examples.map((e, i) => (
          <button
            key={e.title}
            onClick={() => pickExample(i)}
            aria-pressed={i === idx}
            className={`rounded-full border px-3 py-1.5 text-sm transition ${i === idx ? "border-cyan-400 bg-cyan-400/10 text-cyan-200" : "border-slate-700 text-slate-300 hover:border-slate-500"}`}
          >
            Example {i + 1}
          </button>
        ))}
      </div>

      <article key={`${topic}-${idx}`} className="a-rise min-w-0 rounded-2xl border border-slate-700/80 bg-slate-900/70 p-4 shadow-[0_0_40px_-20px_#22d3ee] sm:p-6">
        <p className="mb-1 text-xs text-violet-300">{ex.title}</p>
        <p className="mb-4 text-base font-medium leading-relaxed"><Rich text={ex.problem} /></p>

        <ol className="space-y-3" aria-live="polite">
          {ex.steps.slice(0, shown).map((s, i) => (
            <li key={i} className="a-rise min-w-0 rounded-xl border border-slate-700 bg-slate-950/60 p-3 text-sm">
              <p className="mb-1 text-xs font-semibold text-cyan-300">Step {i + 1} of {total}</p>
              <div className="min-w-0 leading-relaxed"><Rich text={s.doit} /></div>
              <p className="mt-2 border-t border-slate-800 pt-2 leading-relaxed text-slate-400">
                <span className="font-semibold text-amber-200">Why: </span>
                <Rich text={s.why} />
              </p>
            </li>
          ))}
        </ol>

        {all && (
          <div className="a-rise mt-4 min-w-0 rounded-xl border border-emerald-400/40 bg-emerald-400/10 p-3 text-sm">
            <p className="mb-1 text-xs font-semibold text-emerald-300">Final answer</p>
            <Rich text={ex.answer} />
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-3">
          {!all && (
            <>
              <button onClick={() => setShown((n) => n + 1)} className="rounded-xl bg-gradient-to-r from-cyan-400 to-violet-400 px-5 py-3 font-semibold text-slate-950 hover:brightness-110">
                Next step
              </button>
              <button onClick={() => setShown(total)} className="rounded-xl border border-slate-600 px-4 py-3 text-sm hover:border-cyan-400">Show all steps</button>
            </>
          )}
          {all && idx < examples.length - 1 && (
            <button onClick={() => pickExample(idx + 1)} className="rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 hover:brightness-110">Next example</button>
          )}
          {shown > 1 && (
            <button onClick={() => setShown(1)} className="rounded-xl border border-slate-600 px-4 py-3 text-sm hover:border-cyan-400">Restart example</button>
          )}
        </div>
      </article>
    </div>
  );
}
