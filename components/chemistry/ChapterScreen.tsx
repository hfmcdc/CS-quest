"use client";

import { useEffect, useState } from "react";
import { cachedChemContent, chemChapter, loadChemContent } from "@/lib/chemistry/chapters";
import type { ChemChapterContent, ChemFeature } from "@/lib/chemistry/types";
import { readNav, writeNav } from "@/lib/navState";
import ChemNotes from "@/components/chemistry/ChemNotes";
import ChemPractice from "@/components/chemistry/ChemPractice";
import ChemFlashcards from "@/components/chemistry/ChemFlashcards";
import ChemConcept from "@/components/chemistry/ChemConcept";
import ChemNumerical from "@/components/chemistry/ChemNumerical";
import ChemReactions from "@/components/chemistry/ChemReactions";
import ModeTabs from "@/components/ModeTabs";
import BetaBanner from "@/components/BetaBanner";
import { BackLink } from "@/components/ui";
import type { IconName } from "@/components/Icon";

type Mode = ChemFeature;
const ALL_MODES: Record<ChemFeature, { label: string; icon: IconName; blurb: string }> = {
  revise: { label: "Revise", icon: "book", blurb: "Key ideas, reactions and common mistakes" },
  cards: { label: "Flashcards", icon: "cards", blurb: "Flip cards for formulas, definitions and reactions" },
  concept: { label: "Concept", icon: "bulb", blurb: "Short-answer questions with a hint and one retry" },
  numerical: { label: "Numericals", icon: "sigma", blurb: "Pick the equation, then calculate with units" },
  equations: { label: "Equations", icon: "sigma", blurb: "Complete the equation: type the product or reagent" },
  reactions: { label: "Reactions", icon: "compass", blurb: "Named reactions and conversions, one decision at a time" },
  practice: { label: "MCQ", icon: "target", blurb: "Adaptive multiple choice with a hint and one retry" },
  predict: { label: "Predict", icon: "flask", blurb: "Predict what happens, with step-by-step reasoning" },
  challenge: { label: "Challenge", icon: "flame", blurb: "Harder conceptual and assertion–reason questions" },
};

function Skeleton() {
  return (
    <div className="space-y-4" role="status" aria-label="Loading chapter">
      {[0, 1, 2].map((i) => <div key={i} className="h-28 animate-pulse rounded-2xl border border-white/5 bg-white/[0.03]" style={{ animationDelay: `${i * 120}ms` }} />)}
    </div>
  );
}

export default function ChapterScreen({ slug }: { slug: string }) {
  const meta = chemChapter(slug)!;
  const modeKey = `chem:mode:${slug}`;
  const MODES = meta.features.map((id) => ({ id, ...ALL_MODES[id], ...(id === "predict" && meta.branch === "organic" ? { label: "Identify product", blurb: "Predict the major product, with step-by-step reasoning" } : {}) }));
  const [mode, setModeState] = useState<Mode>(() => { const m = readNav<Mode>(modeKey, meta.features[0]); return meta.features.includes(m) ? m : meta.features[0]; });
  // Synchronous cache hit means no spinner when returning to a chapter that was already opened or prefetched.
  const [content, setContent] = useState<ChemChapterContent | undefined>(() => cachedChemContent(slug));
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (content) return;
    let live = true;
    loadChemContent(slug).then((c) => live && setContent(c)).catch(() => live && setFailed(true));
    return () => { live = false; };
  }, [slug, content]);

  const setMode = (m: Mode) => { setModeState(m); writeNav(modeKey, m); };
  const current = MODES.find((m) => m.id === mode)!;

  return (
    <>
    <BetaBanner />
    <main className="theme-chem mx-auto max-w-3xl px-4 py-6 sm:py-10">
      <div className="mb-6"><BackLink href="/chemistry">Chemistry</BackLink></div>

      <header className="mb-7">
        <p className="mb-1 text-sm text-slate-500">Chapter {meta.number}</p>
        <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white">{meta.title}</h1>
      </header>

      <ModeTabs
        blurb={current.blurb}
        tabs={MODES.map((m) => ({ key: m.id, label: m.label, icon: m.icon, active: m.id === mode, onClick: () => setMode(m.id) }))}
      />

      {failed && <p className="rounded-xl border border-rose-400/30 bg-rose-400/10 p-4 text-sm text-rose-200" role="alert">Could not load this chapter. Check your connection and refresh the page.</p>}
      {!content && !failed && <Skeleton />}
      <div key={mode} className="a-fade">
        {content && mode === "revise" && <ChemNotes sections={content.sections} />}
        {content && mode === "cards" && <ChemFlashcards chapterKey={slug} cards={content.cards} />}
        {content && mode === "challenge" && <ChemPractice chapterKey={slug} bank={content.challenge} title={meta.short} challenge />}
        {content && mode === "practice" && <ChemPractice chapterKey={slug} bank={content.questions} title={meta.short} />}
        {content && mode === "concept" && content.concept && <ChemConcept chapterKey={slug} bank={content.concept} title={meta.short} />}
        {content && mode === "numerical" && content.numerical && <ChemNumerical chapterKey={slug} bank={content.numerical} title={meta.short} />}
        {content && mode === "equations" && content.equations && <ChemConcept chapterKey={slug} bank={content.equations} title={meta.short} variant="equations" />}
        {content && mode === "reactions" && content.reactions && <ChemReactions chapterKey={slug} bank={content.reactions} title={meta.short} />}
        {content && mode === "predict" && content.predict && <ChemPractice chapterKey={slug} bank={content.predict} title={meta.short} predict />}
      </div>
    </main>
    </>
  );
}
