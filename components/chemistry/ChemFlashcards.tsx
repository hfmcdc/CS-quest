"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ChemCard } from "@/lib/chemistry/types";
import { readNav, writeNav } from "@/lib/navState";

interface DeckState { ids: string[]; idx: number; known: string[]; missed: string[]; finished: boolean; tag: string }

function shuffle<T>(a: T[]): T[] {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; }
  return r;
}

/** Flip-card revision deck. Resumes where the student left off while the tab stays open. */
export default function ChemFlashcards({ chapterKey, cards }: { chapterKey: string; cards: ChemCard[] }) {
  const navKey = `chem:cards:${chapterKey}`;
  const tags = useMemo(() => Array.from(new Set(cards.map((c) => c.tag))), [cards]);
  const byId = useMemo(() => new Map(cards.map((c) => [c.id, c])), [cards]);

  const fresh = (tag: string, only?: string[]): DeckState => {
    const pool = cards.filter((c) => (tag === "all" || c.tag === tag) && (!only || only.includes(c.id)));
    return { ids: shuffle(pool.map((c) => c.id)), idx: 0, known: [], missed: [], finished: false, tag };
  };
  const [s, setS] = useState<DeckState>(() => readNav<DeckState | null>(navKey, null) ?? fresh("all"));
  const [flipped, setFlipped] = useState(false);
  const ref = useRef(s);
  ref.current = s;
  useEffect(() => () => writeNav(navKey, ref.current), [navKey]);

  const total = s.ids.length;
  const card = byId.get(s.ids[s.idx]);

  const go = (n: number) => { setFlipped(false); setS((c) => ({ ...c, idx: Math.min(c.ids.length - 1, Math.max(0, c.idx + n)) })); };
  const mark = (gotIt: boolean) => {
    if (!card) return;
    setFlipped(false);
    setS((c) => {
      const known = gotIt ? Array.from(new Set([...c.known, card.id])) : c.known.filter((x) => x !== card.id);
      const missed = gotIt ? c.missed.filter((x) => x !== card.id) : Array.from(new Set([...c.missed, card.id]));
      const last = c.idx === c.ids.length - 1;
      return { ...c, known, missed, finished: last, idx: last ? c.idx : c.idx + 1 };
    });
  };
  const restart = (tag: string, only?: string[]) => { setFlipped(false); setS(fresh(tag, only)); };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (s.finished) return;
      if (e.key === "ArrowRight") go(1); else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [s.finished]); // eslint-disable-line react-hooks/exhaustive-deps

  const chip = (on: boolean) => `rounded-full border px-3 py-1.5 text-sm transition ${on ? "border-amber-400 bg-amber-400/10 text-amber-200" : "border-slate-700 text-slate-300 hover:border-slate-500"}`;

  return (
    <div>
      <section className="mb-4 space-y-2 rounded-2xl border border-slate-700/80 bg-slate-900/70 p-4" aria-label="Deck options">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Topic">
          <button onClick={() => restart("all")} aria-pressed={s.tag === "all"} className={chip(s.tag === "all")}>All</button>
          {tags.map((t) => <button key={t} onClick={() => restart(t)} aria-pressed={s.tag === t} className={chip(s.tag === t)}>{t}</button>)}
        </div>
        <p className="text-xs text-slate-500">{total} cards in this deck · tap a card to flip it</p>
      </section>

      {card && !s.finished && (
        <>
          <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
            <span>Card {s.idx + 1} of {total}</span>
            <span>✅ {s.known.length} · 🔁 {s.missed.length}</span>
          </div>
          <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-slate-800" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={s.idx + 1}>
            <div className="h-full rounded-full bg-gradient-to-r from-amber-300 to-orange-400 transition-all" style={{ width: `${((s.idx + 1) / total) * 100}%` }} />
          </div>

          <div
            role="button"
            tabIndex={0}
            key={`${card.id}-${flipped}`}
            onClick={() => setFlipped((f) => !f)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setFlipped((f) => !f); } }}
            aria-label={flipped ? "Showing answer. Press to show the question" : "Showing question. Press to reveal the answer"}
            className={`a-rise flex min-h-[16rem] w-full min-w-0 max-w-full cursor-pointer flex-col rounded-2xl border p-5 text-left shadow-[0_0_40px_-20px_#fbbf24] sm:p-7 ${flipped ? "border-violet-400/60 bg-violet-400/5" : "border-slate-700/80 bg-slate-900/70"}`}
          >
            <div className="mb-4 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-amber-400/10 px-3 py-1 text-amber-300">{card.tag}</span>
              <span className="rounded-full bg-violet-400/10 px-3 py-1 text-violet-300">{flipped ? "Answer" : "Question"}</span>
            </div>
            <div className="flex min-w-0 flex-1 items-center">
              {flipped
                ? <p className="w-full min-w-0 whitespace-pre-line break-words text-base leading-relaxed">{card.back}</p>
                : <p className="w-full min-w-0 break-words text-center text-lg font-medium leading-relaxed">{card.front}</p>}
            </div>
            <p className="mt-4 text-center text-xs text-slate-500">{flipped ? "Tap to flip back" : "Tap to reveal"}</p>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2">
              <button onClick={() => go(-1)} disabled={s.idx === 0} className="rounded-xl border border-slate-600 px-4 py-3 text-sm hover:border-amber-400 disabled:opacity-40">← Prev</button>
              <button onClick={() => go(1)} disabled={s.idx === total - 1} className="rounded-xl border border-slate-600 px-4 py-3 text-sm hover:border-amber-400 disabled:opacity-40">Next →</button>
            </div>
            <div className="flex gap-2">
              <button onClick={() => mark(false)} className="rounded-xl border border-rose-400/50 bg-rose-400/10 px-4 py-3 text-sm font-semibold text-rose-200 hover:bg-rose-400/20">🔁 Review again</button>
              <button onClick={() => mark(true)} className="rounded-xl bg-amber-300 px-4 py-3 text-sm font-semibold text-slate-950 hover:brightness-110">✅ Got it</button>
            </div>
          </div>
          <div className="mt-3 text-center">
            <button onClick={() => restart(s.tag)} className="text-xs text-slate-500 underline hover:text-slate-300">Shuffle &amp; restart</button>
          </div>
        </>
      )}

      {s.finished && (
        <div className="a-rise rounded-2xl border border-slate-700/80 bg-slate-900/70 p-6 text-center">
          <p className="a-pop mb-2 text-2xl font-semibold text-amber-300">Deck complete 🎉</p>
          <p className="mb-5 text-slate-300">You knew <b>{s.known.length}</b> of {total} cards{s.missed.length > 0 && <>, and marked <b>{s.missed.length}</b> to review</>}.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {s.missed.length > 0 && <button onClick={() => restart(s.tag, s.missed)} className="rounded-xl bg-gradient-to-r from-amber-300 to-orange-400 px-5 py-3 font-semibold text-slate-950 hover:brightness-110">Review {s.missed.length} missed</button>}
            <button onClick={() => restart(s.tag)} className="rounded-xl border border-slate-600 px-5 py-3 hover:border-amber-400">Restart deck</button>
          </div>
        </div>
      )}
    </div>
  );
}
