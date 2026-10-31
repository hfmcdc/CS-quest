"use client";

import { useEffect, useState } from "react";
import { readNav, writeNav } from "@/lib/navState";
import { MATH_TOPICS, topicMeta } from "@/lib/maths/topics";
import { EXAMPLES } from "@/lib/maths/examples";
import { topicCounts } from "@/lib/maths/session";
import { MATH_CARDS } from "@/lib/maths/flashcards";
import type { MathTopicId } from "@/lib/maths/types";
import PracticeView from "@/components/maths/PracticeView";
import { LearnView, RevisionView } from "@/components/maths/StudyViews";
import MathFlashcards from "@/components/maths/MathFlashcards";

type ModeId = "revision" | "learn" | "practice" | "challenge";
type Screen = { name: "home" } | { name: "topic"; topic: MathTopicId; mode: ModeId } | { name: "cards"; topic: MathTopicId | "all" };

const MODES: { id: ModeId; label: string; icon: string; blurb: string }[] = [
  { id: "revision", label: "Quick Revision", icon: "📘", blurb: "Formulas, key conditions and common mistakes" },
  { id: "learn", label: "Learn with Examples", icon: "🧭", blurb: "Step-by-step methods with the reason for each step" },
  { id: "practice", label: "Practice", icon: "🎯", blurb: "Adaptive questions with hints and a retry" },
  { id: "challenge", label: "Challenge", icon: "🔥", blurb: "Harder exam-style problems from the same syllabus" },
];

const cardCount = (id: MathTopicId) => MATH_CARDS.filter((c) => c.topic === id).length;

export default function MathsQuest({ onExit }: { onExit: () => void }) {
  const [screen, setScreen] = useState<Screen>(() => readNav<Screen>("maths:screen", { name: "home" }));
  useEffect(() => { writeNav("maths:screen", screen); }, [screen]);

  const navBtn = "rounded-lg border border-slate-700 px-3 py-2 text-sm hover:border-emerald-400";

  if (screen.name === "cards") {
    return <MathFlashcards key={screen.topic} initial={screen.topic} onBack={() => setScreen({ name: "home" })} onMain={onExit} />;
  }

  if (screen.name === "home") {
    return (
      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
          <button onClick={onExit} className={navBtn}>← Main dashboard</button>
          <button onClick={() => setScreen({ name: "cards", topic: "all" })} className="rounded-lg border border-emerald-400/60 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-200 hover:bg-emerald-400/20"><span aria-hidden="true">🃏 </span>Formula Flashcards</button>
        </div>
        <header className="mb-6">
          <h1 className="mono text-3xl font-bold text-emerald-300 sm:text-4xl"><span aria-hidden="true">∑ </span>Maths Quest</h1>
          <p className="mt-2 max-w-xl text-slate-400">Practice for the CBSE Class XII Second Mid-Term Maths exam. Pick a chapter, revise, learn the method, then practise.</p>
        </header>
        <section className="grid gap-4 md:grid-cols-2" aria-label="Maths topics">
          {MATH_TOPICS.map((t) => {
            const c = topicCounts(t.id);
            return (
              <article key={t.id} className="flex min-w-0 flex-col rounded-2xl border border-slate-700/80 bg-gradient-to-b from-slate-900 to-slate-900/40 p-5 transition hover:border-emerald-400 hover:shadow-[0_0_40px_-15px_#34d399]">
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-2xl" aria-hidden="true">{t.icon}</span>
                  <div className="min-w-0">
                    <p className="mono text-xs text-violet-300">{t.chapter}</p>
                    <h2 className="text-lg font-semibold leading-snug">{t.title}</h2>
                  </div>
                </div>
                <p className="mb-3 text-sm text-slate-400">{t.desc}</p>
                <ul className="mb-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400" aria-label="Available activities">
                  <li><span aria-hidden="true">📘 </span>Revision notes</li>
                  <li><span aria-hidden="true">🧭 </span>{EXAMPLES[t.id].length} worked examples</li>
                  <li><span aria-hidden="true">🎯 </span>{c.practice} questions + {c.variations} random variations</li>
                  <li><span aria-hidden="true">🔥 </span>{c.challenge} challenge</li>
                  <li><span aria-hidden="true">🃏 </span>{cardCount(t.id)} flashcards</li>
                </ul>
                <div className="mt-auto flex flex-wrap items-center gap-2">
                  <button onClick={() => setScreen({ name: "topic", topic: t.id, mode: "practice" })} className="rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:brightness-110">
                    Start Practice
                  </button>
                  <button onClick={() => setScreen({ name: "topic", topic: t.id, mode: "revision" })} className="rounded-xl border border-slate-600 px-3 py-3 text-sm hover:border-emerald-400">Revise</button>
                  <button onClick={() => setScreen({ name: "topic", topic: t.id, mode: "learn" })} className="rounded-xl border border-slate-600 px-3 py-3 text-sm hover:border-emerald-400">Examples</button>
                  <button onClick={() => setScreen({ name: "topic", topic: t.id, mode: "challenge" })} className="rounded-xl border border-slate-600 px-3 py-3 text-sm hover:border-emerald-400">Challenge</button>
                  <button onClick={() => setScreen({ name: "cards", topic: t.id })} className="rounded-xl border border-slate-600 px-3 py-3 text-sm hover:border-emerald-400">Flashcards</button>
                </div>
              </article>
            );
          })}
        </section>
        <p className="mt-8 text-center text-xs text-slate-500">
          Coverage follows standard NCERT/CBSE Class XII topics for the chapters above. Questions are written for practice and are not copied from the textbook exercises. Nothing is saved.
        </p>
      </main>
    );
  }

  const { topic, mode } = screen;
  const meta = topicMeta(topic);
  const current = MODES.find((m) => m.id === mode)!;

  return (
    <main className="mx-auto max-w-3xl px-4 py-6">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <button onClick={() => setScreen({ name: "home" })} className={navBtn}>← Maths dashboard</button>
        <button onClick={onExit} className={navBtn}><span aria-hidden="true">🏠 </span>Main dashboard</button>
      </div>

      <header className="mb-4">
        <p className="mono text-xs text-violet-300">{meta.chapter}</p>
        <h1 className="text-xl font-bold text-emerald-300 sm:text-2xl"><span aria-hidden="true">{meta.icon} </span>{meta.title}</h1>
      </header>

      <nav aria-label="Study mode" className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => setScreen({ name: "topic", topic, mode: m.id })}
            aria-current={m.id === mode ? "page" : undefined}
            className={`rounded-xl border px-3 py-2.5 text-left text-sm transition ${m.id === mode ? "border-emerald-400 bg-emerald-400/10 text-emerald-200" : "border-slate-700 text-slate-300 hover:border-slate-500"}`}
          >
            <span aria-hidden="true">{m.icon} </span>{m.label}
          </button>
        ))}
        <button
          onClick={() => setScreen({ name: "cards", topic })}
          className="rounded-xl border border-slate-700 px-3 py-2.5 text-left text-sm text-slate-300 transition hover:border-slate-500"
        >
          <span aria-hidden="true">🃏 </span>Flashcards
        </button>
      </nav>
      <p className="mb-4 text-xs text-slate-500">{current.blurb}</p>

      {mode === "revision" && <RevisionView topic={topic} />}
      {mode === "learn" && <LearnView key={topic} topic={topic} />}
      {(mode === "practice" || mode === "challenge") && <PracticeView key={`${topic}-${mode}`} topic={topic} mode={mode} />}
    </main>
  );
}
