"use client";

import { useEffect, useState } from "react";
import { cachedChemContent, chemChapter, loadChemContent } from "@/lib/chemistry/chapters";
import type { ChemChapterContent } from "@/lib/chemistry/types";
import { readNav, writeNav } from "@/lib/navState";
import ChemNotes from "@/components/chemistry/ChemNotes";
import ChemPractice from "@/components/chemistry/ChemPractice";
import ChemFlashcards from "@/components/chemistry/ChemFlashcards";
import ModeTabs from "@/components/ModeTabs";
import { BackLink } from "@/components/ui";
import type { IconName } from "@/components/Icon";

type Mode = "revise" | "cards" | "practice" | "challenge";
const MODES: { id: Mode; label: string; icon: IconName; blurb: string }[] = [
  { id: "revise", label: "Quick Revision", icon: "book", blurb: "Key ideas, reactions and common mistakes" },
  { id: "cards", label: "Flashcards", icon: "cards", blurb: "Flip cards for definitions, reasons and reactions" },
  { id: "practice", label: "Practice", icon: "target", blurb: "Adaptive MCQs with a hint and one retry" },
  { id: "challenge", label: "Challenge", icon: "flame", blurb: "Harder conceptual and assertion–reason questions" },
];

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
  const [mode, setModeState] = useState<Mode>(() => readNav<Mode>(modeKey, "revise"));
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
      </div>
    </main>
  );
}
