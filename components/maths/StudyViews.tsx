"use client";

import { useState } from "react";
import { EXAMPLES } from "@/lib/maths/examples";
import { REVISION } from "@/lib/maths/revision";
import type { MathTopicId, RevisionSection } from "@/lib/maths/types";
import { Rich } from "@/components/maths/MathText";
import Collapsible from "@/components/Collapsible";
import Icon, { type IconName } from "@/components/Icon";

const SECTION_STYLE: Record<RevisionSection["kind"], { icon: IconName; tone: string }> = {
  formulas: { icon: "spark", tone: "" },
  concepts: { icon: "bulb", tone: "" },
  mistakes: { icon: "warn", tone: "!border-rose-400/20" },
  example: { icon: "compass", tone: "" },
};

export function RevisionView({ topic }: { topic: MathTopicId }) {
  const sections = REVISION[topic];
  return (
    <div className="stagger space-y-3">
      {sections.map((sec, n) => {
        const st = SECTION_STYLE[sec.kind];
        return (
          <Collapsible key={sec.title} title={sec.title} icon={<Icon name={st.icon} size={20} />} defaultOpen={n < 2} tone={st.tone}>
            {sec.kind === "formulas" && (
              <ul className="space-y-3">
                {sec.items.map((it, i) => (
                  <li key={i} className="min-w-0 rounded-xl border border-white/10 bg-black/25 p-3">
                    {it.label && <p className="mb-1 text-xs font-semibold text-[rgb(var(--ac))]">{it.label}</p>}
                    <div className="min-w-0 text-sm"><Rich text={it.body} /></div>
                  </li>
                ))}
              </ul>
            )}
            {(sec.kind === "concepts" || sec.kind === "mistakes") && (
              <ul className="space-y-2 text-sm leading-relaxed">
                {sec.items.map((it, i) => (
                  <li key={i} className="flex min-w-0 gap-2">
                    <span aria-hidden="true" className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${sec.kind === "mistakes" ? "bg-rose-400" : "bg-[rgb(var(--ac))]"}`} />
                    <span className="min-w-0 flex-1"><Rich text={it.body} /></span>
                  </li>
                ))}
              </ul>
            )}
            {sec.kind === "example" && (
              <ol className="space-y-2 text-sm leading-relaxed">
                {sec.items.map((it, i) => (
                  <li key={i} className="flex min-w-0 gap-3">
                    <span className="mono w-16 shrink-0 text-xs text-[rgb(var(--ac))]">{it.label}</span>
                    <span className="min-w-0 flex-1"><Rich text={it.body} /></span>
                  </li>
                ))}
              </ol>
            )}
          </Collapsible>
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
            className={`chip min-h-[2.4rem] px-4 text-sm ${i === idx ? "chip-ac" : ""}`}
          >
            Example {i + 1}
          </button>
        ))}
      </div>

      <article key={`${topic}-${idx}`} className="a-rise min-w-0 card p-4 sm:p-6">
        <p className="mb-1 text-sm text-slate-500">{ex.title}</p>
        <p className="mb-5 text-lg font-medium leading-relaxed text-white"><Rich text={ex.problem} /></p>

        <ol className="space-y-3" aria-live="polite">
          {ex.steps.slice(0, shown).map((s, i) => (
            <li key={i} className="a-rise min-w-0 rounded-xl border border-white/10 bg-black/25 p-3 text-sm">
              <p className="mb-1 text-xs font-semibold text-[rgb(var(--ac))]">Step {i + 1} of {total}</p>
              <div className="min-w-0 leading-relaxed"><Rich text={s.doit} /></div>
              <p className="mt-2 border-t border-white/10 pt-2 leading-relaxed text-slate-400">
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
              <button onClick={() => setShown((n) => n + 1)} className="btn-primary">
                Next step<Icon name="forward" size={18} />
              </button>
              <button onClick={() => setShown(total)} className="btn-ghost min-h-[2.9rem]">Show all steps</button>
            </>
          )}
          {all && idx < examples.length - 1 && (
            <button onClick={() => pickExample(idx + 1)} className="btn-primary">Next example</button>
          )}
          {shown > 1 && (
            <button onClick={() => setShown(1)} className="btn-ghost min-h-[2.9rem]">Restart example</button>
          )}
        </div>
      </article>
    </div>
  );
}
