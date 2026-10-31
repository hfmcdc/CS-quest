"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cachedChemContent, chemChapter, loadChemContent } from "@/lib/chemistry/chapters";
import type { ChemChapterContent } from "@/lib/chemistry/types";
import { readNav, writeNav } from "@/lib/navState";
import ChemNotes from "@/components/chemistry/ChemNotes";
import ChemPractice from "@/components/chemistry/ChemPractice";

type Mode = "revise" | "practice";
const MODES: { id: Mode; label: string; icon: string; blurb: string }[] = [
  { id: "revise", label: "Quick Revision", icon: "📘", blurb: "Key ideas, reactions and common mistakes" },
  { id: "practice", label: "Practice", icon: "🎯", blurb: "Adaptive MCQs with a hint and one retry" },
];

function Skeleton() {
  return (
    <div className="space-y-4" role="status" aria-label="Loading chapter">
      {[0, 1, 2].map((i) => <div key={i} className="h-28 animate-pulse rounded-2xl border border-slate-800 bg-slate-900/60" />)}
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
  const nav = "rounded-lg border border-slate-700 px-3 py-2 text-sm hover:border-amber-400";

  return (
    <main className="mx-auto max-w-3xl px-4 py-6">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Link href="/chemistry" className={nav}>← Chemistry</Link>
        <Link href="/" className={nav}><span aria-hidden="true">🏠 </span>Main dashboard</Link>
      </div>

      <header className="mb-4">
        <p className="mono text-xs text-violet-300">Chapter {meta.number}</p>
        <h1 className="text-xl font-bold text-amber-300 sm:text-2xl"><span aria-hidden="true">{meta.icon} </span>{meta.title}</h1>
      </header>

      <nav aria-label="Study mode" className="mb-2 grid grid-cols-2 gap-2">
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            aria-current={m.id === mode ? "page" : undefined}
            className={`rounded-xl border px-3 py-2.5 text-left text-sm transition ${m.id === mode ? "border-amber-400 bg-amber-400/10 text-amber-200" : "border-slate-700 text-slate-300 hover:border-slate-500"}`}
          >
            <span aria-hidden="true">{m.icon} </span>{m.label}
          </button>
        ))}
      </nav>
      <p className="mb-4 text-xs text-slate-500">{current.blurb}</p>

      {failed && <p className="rounded-xl border border-rose-400/40 bg-rose-400/10 p-4 text-sm text-rose-200" role="alert">Could not load this chapter. Check your connection and refresh the page.</p>}
      {!content && !failed && <Skeleton />}
      {content && mode === "revise" && <ChemNotes sections={content.sections} />}
      {content && mode === "practice" && <ChemPractice chapterKey={slug} bank={content.questions} title={meta.short} />}
    </main>
  );
}
