"use client";

import { useCallback, useEffect, useState, type KeyboardEvent } from "react";
import Icon from "@/components/Icon";
import { readNav, writeNav } from "@/lib/navState";
import { playSound } from "@/lib/fx";
import { range, shuffled } from "@/lib/physics/shuffle";
import type { PhysCard } from "@/lib/physics/types";
import Rich, { Tex } from "./PhysMath";
import { LoadError, SegProgress, Skeleton, type SegState } from "./shared";
import { usePhysContent } from "./usePhysContent";

/** Feature 1 — Formula flashcards: tap to flip, previous / next / shuffle, with the equation, symbols and SI units on the back. */
export default function Flashcards({ slug }: { slug: string }) {
  const { data, error, retry } = usePhysContent(slug, "flashcards");
  if (error) return <LoadError onRetry={retry} />;
  if (!data) return <Skeleton />;
  return <Deck key={slug} cards={data.cards} slug={slug} />;
}

interface Saved { order: number[]; i: number }

function Deck({ cards, slug }: { cards: PhysCard[]; slug: string }) {
  const key = `phys:${slug}:flash`;
  const [saved] = useState<Saved>(() => {
    const s = readNav<Saved | null>(key, null);
    return s && s.order.length === cards.length ? s : { order: range(cards.length), i: 0 };
  });
  const [order, setOrder] = useState(saved.order);
  const [i, setI] = useState(saved.i);
  const [flipped, setFlipped] = useState(false);
  const [seen, setSeen] = useState<Set<number>>(() => new Set([saved.i]));

  useEffect(() => { writeNav<Saved>(key, { order, i }); }, [key, order, i]);

  const go = useCallback((n: number) => {
    const next = (n + cards.length) % cards.length;
    setFlipped(false);
    setI(next);
    setSeen((s) => new Set(s).add(next));
    playSound("tap");
  }, [cards.length]);

  const shuffle = () => { setOrder(shuffled(range(cards.length))); setI(0); setFlipped(false); setSeen(new Set([0])); playSound("tap"); };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(i + 1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); go(i - 1); }
  };

  const card = cards[order[i]];
  const states: SegState[] = order.map((_, idx) => (seen.has(idx) && idx !== i ? "seen" : ""));

  return (
    <div onKeyDown={onKey}>
      <SegProgress states={states} current={i} label={`Card ${i + 1} of ${cards.length}`} />

      <div className={`ph-flip ${flipped ? "on" : ""}`} data-qid={card.id}>
        <button type="button" className="ph-flip-btn" aria-pressed={flipped} aria-label={flipped ? "Showing the answer. Tap to see the question." : "Tap to reveal the formula"} onClick={() => setFlipped((f) => !f)}>
          <div className="ph-flip-inner">
            <div className="card ph-face ph-front" aria-hidden={flipped}>
              <span className="chip chip-ac">{card.tag}</span>
              <div className="ph-qtext"><Rich text={card.front} /></div>
              <span className="ph-tap"><Icon name="spark" size={14} />Tap to reveal</span>
            </div>
            <div className="card ph-face ph-back" aria-hidden={!flipped}>
              <span className="chip chip-ac" style={{ alignSelf: "flex-start" }}>{card.tag}</span>
              <div className="ph-eq"><Tex src={card.eq} display /></div>
              <ul className="ph-symtab" aria-label="Symbols and units">
                {card.symbols.map((s, k) => (
                  <li key={k}>
                    <span className="s">{s.s}</span>
                    <span>{s.m}</span>
                    {s.u && <span className="u">SI unit: {s.u}</span>}
                  </li>
                ))}
              </ul>
              {card.note && <p className="ph-note">{card.note}</p>}
            </div>
          </div>
        </button>
      </div>

      <div className="ph-deck-nav">
        <button type="button" className="btn-ghost prev" onClick={() => go(i - 1)}><Icon name="back" size={16} />Previous</button>
        <button type="button" className="btn-primary next" onClick={() => go(i + 1)}>Next<Icon name="forward" size={16} /></button>
        <button type="button" className="btn-ghost shuf" onClick={shuffle}>Shuffle</button>
      </div>
      <p className="ph-tips" style={{ textAlign: "center", marginTop: ".9rem" }}>Tap the card to flip it. On a keyboard, use ← and → to move between cards.</p>
    </div>
  );
}
