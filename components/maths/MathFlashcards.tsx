"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { MATH_CARDS } from "@/lib/maths/flashcards";
import type { MathCard } from "@/lib/maths/flashcards";
import { MATH_TOPICS, topicMeta } from "@/lib/maths/topics";
import type { MathTopicId } from "@/lib/maths/types";
import { Rich } from "@/components/maths/MathText";
import Icon from "@/components/Icon";
import { BackLink } from "@/components/ui";
import { celebrate } from "@/lib/fx";

type Filter = MathTopicId | "all";

function shuffle<T>(a: T[]): T[] {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

/** Formula and principal-value flashcards for Maths Quest. State is in memory only. */
export default function MathFlashcards({ initial, onBack, onMain }: { initial: Filter; onBack: () => void; onMain: () => void }) {
  const [topic, setTopic] = useState<Filter>(initial);
  const [deck, setDeck] = useState<MathCard[]>([]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<string[]>([]);
  const [missed, setMissed] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);

  const pool = useMemo(() => MATH_CARDS.filter((c) => topic === "all" || c.topic === topic), [topic]);

  const start = useCallback((cards: MathCard[]) => {
    setDeck(shuffle(cards));
    setIdx(0); setFlipped(false); setKnown([]); setMissed([]); setFinished(false);
  }, []);

  useEffect(() => { start(pool); }, [pool, start]);

  const card = deck[idx];

  const go = useCallback((n: number) => {
    setFlipped(false);
    setIdx((i) => Math.min(deck.length - 1, Math.max(0, i + n)));
  }, [deck.length]);

  const mark = (gotIt: boolean) => {
    if (!card) return;
    setKnown((k) => (gotIt ? [...new Set([...k, card.id])] : k.filter((x) => x !== card.id)));
    setMissed((m) => (gotIt ? m.filter((x) => x !== card.id) : [...new Set([...m, card.id])]));
    if (idx === deck.length - 1) setFinished(true);
    else go(1);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (finished) return;
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, finished]);

  const chip = (active: boolean) =>
    `chip min-h-[2.4rem] px-4 text-sm ${active ? "chip-ac" : ""}`;

  useEffect(() => { if (finished) celebrate(true); }, [finished]);

  return (
    <main className="theme-maths mx-auto max-w-3xl px-4 py-6">
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <BackLink onClick={onBack}>Maths</BackLink>
        <BackLink onClick={onMain}>Home</BackLink>
      </div>
      <h1 className="mb-5 text-2xl font-semibold text-white">Formula flashcards</h1>

      <section className="card mb-5 space-y-3 p-4" aria-label="Deck options">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Topic">
          <button onClick={() => setTopic("all")} aria-pressed={topic === "all"} className={chip(topic === "all")}>All topics</button>
          {MATH_TOPICS.map((t) => (
            <button key={t.id} onClick={() => setTopic(t.id)} aria-pressed={topic === t.id} className={chip(topic === t.id)}>
              <span aria-hidden="true">{t.icon} </span>{t.short}
            </button>
          ))}
        </div>
        <p className="text-xs text-slate-500">Formulas, conditions and principal values · {pool.length} cards</p>
      </section>

      {card && !finished && (
        <>
          <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
            <span>Card {idx + 1} of {deck.length}</span>
            <span>{known.length} known · {missed.length} to review</span>
          </div>
          <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-slate-800" role="progressbar" aria-valuemin={0} aria-valuemax={deck.length} aria-valuenow={idx + 1}>
            <div className="h-full rounded-full bg-[rgb(var(--ac))] transition-all duration-500" style={{ width: `${((idx + 1) / deck.length) * 100}%` }} />
          </div>

          <div
            role="button"
            tabIndex={0}
            key={`${card.id}-${flipped}`}
            onClick={() => setFlipped((f) => !f)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setFlipped((f) => !f); } }}
            aria-label={flipped ? "Showing answer. Press to show the question" : "Showing question. Press to reveal the answer"}
            className={`a-flip card flex min-h-[16rem] w-full min-w-0 max-w-full cursor-pointer flex-col p-6 text-left sm:p-8 ${flipped ? "!border-violet-400/50 !bg-violet-400/5" : ""}`}
          >
            <div className="mb-4 flex flex-wrap gap-2 text-xs">
              <span className="chip chip-ac">{topicMeta(card.topic).short} · {card.tag}</span>
              <span className="chip">{flipped ? "Answer" : "Question"}</span>
            </div>
            <div className="flex min-w-0 flex-1 items-center">
              {flipped ? (
                <div className="w-full min-w-0 text-base leading-relaxed"><Rich text={card.back} /></div>
              ) : (
                <div className="w-full min-w-0 text-center text-lg font-medium leading-relaxed"><Rich text={card.front} /></div>
              )}
            </div>
            <p className="mt-4 text-center text-xs text-slate-500">{flipped ? "Tap to flip back" : "Tap to reveal"}</p>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2">
              <button onClick={() => go(-1)} disabled={idx === 0} className="btn-ghost disabled:opacity-40"><Icon name="back" size={16} />Prev</button>
              <button onClick={() => go(1)} disabled={idx === deck.length - 1} className="btn-ghost disabled:opacity-40">Next<Icon name="forward" size={16} /></button>
            </div>
            <div className="flex gap-2">
              <button onClick={() => mark(false)} className="btn-ghost !border-rose-400/40 !bg-rose-400/10 !text-rose-200 hover:!bg-rose-400/20">Review again</button>
              <button onClick={() => mark(true)} className="btn-primary">Got it</button>
            </div>
          </div>
          <div className="mt-3 text-center">
            <button onClick={() => start(pool)} className="text-xs text-slate-500 underline hover:text-slate-300">Shuffle &amp; restart</button>
          </div>
        </>
      )}

      {finished && (
        <div className="a-rise card p-6 text-center">
          <p className="a-pop mb-2 text-2xl font-semibold text-emerald-300">Deck complete</p>
          <p className="mb-5 text-slate-300">You knew <b>{known.length}</b> of {deck.length} cards{missed.length > 0 && <>, and marked <b>{missed.length}</b> to review</>}.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {missed.length > 0 && (
              <button onClick={() => start(deck.filter((c) => missed.includes(c.id)))} className="btn-primary">
                Review {missed.length} missed
              </button>
            )}
            <button onClick={() => start(pool)} className="btn-ghost min-h-[2.9rem]">Restart deck</button>
          </div>
        </div>
      )}
    </main>
  );
}
