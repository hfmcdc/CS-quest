"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { CARD_KINDS, FLASHCARDS } from "@/lib/flashcards";
import type { CardKind, Flashcard } from "@/lib/flashcards";
import { TOPICS } from "@/lib/questions";
import type { Topic } from "@/lib/types";

type TopicFilter = Topic | "all";

function shuffle<T>(a: T[]): T[] {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

export default function Flashcards({ onExit }: { onExit: () => void }) {
  const [kind, setKind] = useState<CardKind>("theory");
  const [topic, setTopic] = useState<TopicFilter>("all");
  const [deck, setDeck] = useState<Flashcard[]>([]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<string[]>([]);
  const [missed, setMissed] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);

  const pool = useMemo(
    () => FLASHCARDS.filter((c) => c.kind === kind && (topic === "all" || c.topic === topic)),
    [kind, topic]
  );

  const start = useCallback((cards: Flashcard[]) => {
    setDeck(shuffle(cards));
    setIdx(0); setFlipped(false); setKnown([]); setMissed([]); setFinished(false);
  }, []);

  useEffect(() => { start(pool); }, [pool, start]);

  const card = deck[idx];
  const isCommand = kind === "commands";

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
    `rounded-full border px-3 py-1.5 text-sm transition ${active ? "border-cyan-400 bg-cyan-400/10 text-cyan-200" : "border-slate-700 text-slate-300 hover:border-slate-500"}`;
  const box = "mono overflow-x-auto whitespace-pre rounded-xl border border-slate-700 bg-slate-950/70 p-4 text-[13px] leading-relaxed text-slate-200";

  return (
    <main className="mx-auto max-w-3xl px-4 py-6">
      <div className="mb-4 flex items-center justify-between gap-2">
        <button onClick={onExit} className="rounded-lg border border-slate-700 px-3 py-2 text-sm hover:border-cyan-400">← Dashboard</button>
        <h1 className="mono text-lg font-bold text-cyan-300">🃏 Flashcards</h1>
      </div>

      <section className="mb-4 space-y-3 rounded-2xl border border-slate-700/80 bg-slate-900/70 p-4" aria-label="Deck options">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Card type">
          {CARD_KINDS.map((k) => (
            <button key={k.id} onClick={() => setKind(k.id)} aria-pressed={kind === k.id} className={chip(kind === k.id)}>
              {k.icon} {k.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Topic">
          <button onClick={() => setTopic("all")} aria-pressed={topic === "all"} className={chip(topic === "all")}>All topics</button>
          {TOPICS.map((t) => (
            <button key={t.id} onClick={() => setTopic(t.id)} aria-pressed={topic === t.id} className={chip(topic === t.id)}>
              {t.icon} {t.title}
            </button>
          ))}
        </div>
        <p className="text-xs text-slate-500">{CARD_KINDS.find((k) => k.id === kind)!.desc} · {pool.length} cards</p>
      </section>

      {pool.length === 0 && <p className="p-8 text-center text-slate-400">No cards in this selection yet.</p>}

      {card && !finished && (
        <>
          <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
            <span>Card {idx + 1} of {deck.length}</span>
            <span>✅ {known.length} · 🔁 {missed.length}</span>
          </div>
          <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-slate-800" role="progressbar" aria-valuemin={0} aria-valuemax={deck.length} aria-valuenow={idx + 1}>
            <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 transition-all" style={{ width: `${((idx + 1) / deck.length) * 100}%` }} />
          </div>

          <button
            key={`${card.id}-${flipped}`}
            onClick={() => setFlipped((f) => !f)}
            aria-label={flipped ? "Showing answer. Tap to show the question" : "Showing question. Tap to reveal the answer"}
            className={`a-rise flex min-h-[18rem] w-full flex-col rounded-2xl border p-5 text-left shadow-[0_0_40px_-20px_#22d3ee] sm:p-7 ${flipped ? "border-violet-400/60 bg-violet-400/5" : "border-slate-700/80 bg-slate-900/70"}`}
          >
            <div className="mb-4 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-cyan-300">{TOPICS.find((t) => t.id === card.topic)!.title} · {card.tag}</span>
              <span className="rounded-full bg-violet-400/10 px-3 py-1 text-violet-300">{flipped ? (isCommand ? "Command" : "Answer") : (isCommand ? "Task" : "Question")}</span>
            </div>
            <div className="flex flex-1 items-center">
              {flipped ? (
                isCommand ? <pre className={`${box} w-full`}>{card.back}</pre> : <p className="whitespace-pre-line text-base leading-relaxed">{card.back}</p>
              ) : (
                <p className="w-full text-center text-lg font-medium leading-relaxed">{card.front}</p>
              )}
            </div>
            <p className="mt-4 text-center text-xs text-slate-500">{flipped ? "Tap to flip back" : "Tap to reveal"}</p>
          </button>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2">
              <button onClick={() => go(-1)} disabled={idx === 0} className="rounded-xl border border-slate-600 px-4 py-3 text-sm hover:border-cyan-400 disabled:opacity-40">← Prev</button>
              <button onClick={() => go(1)} disabled={idx === deck.length - 1} className="rounded-xl border border-slate-600 px-4 py-3 text-sm hover:border-cyan-400 disabled:opacity-40">Next →</button>
            </div>
            <div className="flex gap-2">
              <button onClick={() => mark(false)} className="rounded-xl border border-rose-400/50 bg-rose-400/10 px-4 py-3 text-sm font-semibold text-rose-200 hover:bg-rose-400/20">🔁 Review again</button>
              <button onClick={() => mark(true)} className="rounded-xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950 hover:brightness-110">✅ Got it</button>
            </div>
          </div>
          <div className="mt-3 text-center">
            <button onClick={() => start(pool)} className="text-xs text-slate-500 underline hover:text-slate-300">Shuffle &amp; restart</button>
          </div>
        </>
      )}

      {finished && (
        <div className="a-rise rounded-2xl border border-slate-700/80 bg-slate-900/70 p-6 text-center">
          <p className="a-pop mb-2 text-2xl font-semibold text-emerald-300">Deck complete 🎉</p>
          <p className="mb-5 text-slate-300">You knew <b>{known.length}</b> of {deck.length} cards{missed.length > 0 && <>, and marked <b>{missed.length}</b> to review</>}.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {missed.length > 0 && (
              <button onClick={() => start(deck.filter((c) => missed.includes(c.id)))} className="rounded-xl bg-gradient-to-r from-cyan-400 to-violet-400 px-5 py-3 font-semibold text-slate-950 hover:brightness-110">
                Review {missed.length} missed
              </button>
            )}
            <button onClick={() => start(pool)} className="rounded-xl border border-slate-600 px-5 py-3 hover:border-cyan-400">Restart deck</button>
          </div>
        </div>
      )}
    </main>
  );
}
