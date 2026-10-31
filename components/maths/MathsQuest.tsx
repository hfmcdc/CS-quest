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
import Icon, { type IconName } from "@/components/Icon";
import ModeTabs from "@/components/ModeTabs";
import { BackLink, PageHeader } from "@/components/ui";

type ModeId = "revision" | "learn" | "practice" | "challenge";
type Screen = { name: "home" } | { name: "topic"; topic: MathTopicId; mode: ModeId } | { name: "cards"; topic: MathTopicId | "all" };

const MODES: { id: ModeId; label: string; icon: IconName; blurb: string }[] = [
  { id: "revision", label: "Quick Revision", icon: "book", blurb: "Formulas, key conditions and common mistakes" },
  { id: "learn", label: "Learn with Examples", icon: "compass", blurb: "Step-by-step methods with the reason for each step" },
  { id: "practice", label: "Practice", icon: "target", blurb: "Adaptive questions with hints and a retry" },
  { id: "challenge", label: "Challenge", icon: "flame", blurb: "Harder exam-style problems from the same syllabus" },
];

const cardCount = (id: MathTopicId) => MATH_CARDS.filter((c) => c.topic === id).length;

export default function MathsQuest({ onExit }: { onExit: () => void }) {
  const [screen, setScreen] = useState<Screen>(() => readNav<Screen>("maths:screen", { name: "home" }));
  useEffect(() => { writeNav("maths:screen", screen); }, [screen]);

  if (screen.name === "cards") {
    return <MathFlashcards key={screen.topic} initial={screen.topic} onBack={() => setScreen({ name: "home" })} onMain={onExit} />;
  }

  if (screen.name === "home") {
    return (
      <main className="theme-maths mx-auto max-w-5xl px-4 py-8 sm:py-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-2">
          <BackLink onClick={onExit}>Home</BackLink>
          <button type="button" onClick={() => setScreen({ name: "cards", topic: "all" })} className="btn-ghost !border-[rgb(var(--ac)/.4)] !text-[rgb(var(--ac))]"><Icon name="cards" size={16} />Formula flashcards</button>
        </div>
        <PageHeader title="Maths" icon={<Icon name="sigma" size={24} />}>Second Mid-Term practice for CBSE Class XII. Pick a chapter, revise, learn the method, then practise.</PageHeader>
        <section className="stagger grid gap-4 md:grid-cols-2" aria-label="Maths topics">
          {MATH_TOPICS.map((t) => {
            const c = topicCounts(t.id);
            return (
              <article key={t.id} className="card flex flex-col gap-4 p-6">
                <div className="flex items-center gap-3">
                  <span className="tile text-2xl" aria-hidden="true">{t.icon}</span>
                  <div className="min-w-0">
                    <p className="text-sm text-slate-500">{t.chapter}</p>
                    <h2 className="text-lg font-semibold leading-snug text-white">{t.title}</h2>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-slate-400">{t.desc}</p>
                <p className="text-xs text-slate-500" aria-label="Available activities">
                  {EXAMPLES[t.id].length} worked examples · {c.practice} questions + {c.variations} random variations · {c.challenge} challenge · {cardCount(t.id)} flashcards
                </p>
                <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
                  <button type="button" onClick={() => setScreen({ name: "topic", topic: t.id, mode: "practice" })} className="btn-primary">Start practice</button>
                  <button type="button" onClick={() => setScreen({ name: "topic", topic: t.id, mode: "revision" })} className="btn-ghost">Revise</button>
                  <button type="button" onClick={() => setScreen({ name: "topic", topic: t.id, mode: "learn" })} className="btn-ghost">Examples</button>
                  <button type="button" onClick={() => setScreen({ name: "topic", topic: t.id, mode: "challenge" })} className="btn-ghost">Challenge</button>
                  <button type="button" onClick={() => setScreen({ name: "cards", topic: t.id })} className="btn-ghost">Flashcards</button>
                </div>
              </article>
            );
          })}
        </section>
        <p className="mt-10 text-center text-xs text-slate-500">
          Coverage follows standard NCERT/CBSE Class XII topics for the chapters above. Questions are written for practice and are not copied from the textbook exercises. Nothing is saved.
        </p>
      </main>
    );
  }

  const { topic, mode } = screen;
  const meta = topicMeta(topic);
  const current = MODES.find((m) => m.id === mode)!;

  return (
    <main className="theme-maths mx-auto max-w-3xl px-4 py-6 sm:py-10">
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <BackLink onClick={() => setScreen({ name: "home" })}>Maths</BackLink>
        <BackLink onClick={onExit}>Home</BackLink>
      </div>

      <header className="mb-7">
        <p className="mb-1 text-sm text-slate-500">{meta.chapter}</p>
        <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white">{meta.title}</h1>
      </header>

      <ModeTabs
        blurb={current.blurb}
        tabs={[
          ...MODES.map((m) => ({ key: m.id, label: m.label, icon: m.icon, active: m.id === mode, onClick: () => setScreen({ name: "topic", topic, mode: m.id }) })),
          { key: "cards", label: "Flashcards", icon: "cards" as IconName, onClick: () => setScreen({ name: "cards", topic }) },
        ]}
      />

      <div key={mode} className="a-fade">
        {mode === "revision" && <RevisionView topic={topic} />}
        {mode === "learn" && <LearnView key={topic} topic={topic} />}
        {(mode === "practice" || mode === "challenge") && <PracticeView key={`${topic}-${mode}`} topic={topic} mode={mode} />}
      </div>
    </main>
  );
}
