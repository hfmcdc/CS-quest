"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { PhysCard } from "@/lib/physics/types";
import { readNav, writeNav } from "@/lib/navState";
import { Rich, Tex } from "@/components/maths/MathText";
import Icon from "@/components/Icon";
import { playSound } from "@/lib/fx";
import { chipCls, shuffle } from "./shared";

interface Deck { ids: string[]; idx: number; tag: string }

/** Tap-to-flip formula cards: front = name or question, back = equation, symbols and SI units. */
export default function Flashcards({ chapterKey, cards }: { chapterKey: string; cards: PhysCard[] }) {
  const navKey = `phys:cards:${chapterKey}`;
  const tags = useMemo(() => Array.from(new Set(cards.map((c) => c.tag))), [cards]);
  const byId = useMemo(() => new Map(cards.map((c) => [c.id, c])), [cards]);
  const build = (tag: string, mix: boolean): Deck => {
    const ids = cards.filter((c) => tag === "all" || c.tag === tag).map((c) => c.id);
    return { ids: mix ? shuffle(ids) : ids, idx: 0, tag };
  };
  const [d, setD] = useState<Deck>(() => readNav<Deck | null>(navKey, null) ?? build("all", false));
  const [flipped, setFlipped] = useState(false);
  const [seen, setSeen] = useState<Set<string>>(() => new Set());
  const ref = useRef(d); ref.current = d;
  useEffect(() => () => writeNav(navKey, ref.current), [navKey]);

  const total = d.ids.length;
  const card = byId.get(d.ids[d.idx]);

  const go = (n: number) => { setFlipped(false); setD((c) => ({ ...c, idx: Math.min(c.ids.length - 1, Math.max(0, c.idx + n)) })); };
  const reveal = () => { setFlipped((f) => !f); if (card) setSeen((s) => new Set(s).add(card.id)); playSound("tap"); };
  const reset = (tag: string, mix: boolean) => { setFlipped(false); setD(build(tag, mix)); };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && /INPUT|TEXTAREA/.test(e.target.tagName)) return;
      if (e.key === "ArrowRight") go(1); else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!card) return null;
  const seenInDeck = d.ids.filter((id) => seen.has(id)).length;

  return (
    <div>
      <section className="card mb-5 space-y-3 p-4" aria-label="Deck options">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Topic">
          <button onClick={() => reset("all", false)} aria-pressed={d.tag === "all"} className={chipCls(d.tag === "all")}>All</button>
          {tags.map((t) => <button key={t} onClick={() => reset(t, false)} aria-pressed={d.tag === t} className={chipCls(d.tag === t)}>{t}</button>)}
        </div>
        <p className="text-xs text-slate-500">{total} cards · tap a card to reveal the formula · arrow keys also work</p>
      </section>

      <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
        <span>Card {d.idx + 1} of {total}</span><span>{seenInDeck} revealed</span>
      </div>
      <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-slate-800" role="progressbar" aria-label="Deck position" aria-valuemin={1} aria-valuemax={total} aria-valuenow={d.idx + 1}>
        <div className="h-full rounded-full bg-[rgb(var(--ac))] transition-all duration-500" style={{ width: `${((d.idx + 1) / total) * 100}%` }} />
      </div>

      <div key={card.id} className="a-flip phys-flip">
        <div
          role="button" tabIndex={0} onClick={reveal}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); reveal(); } }}
          aria-label={flipped ? "Showing the formula. Press to flip back to the question" : "Showing the question. Press to reveal the formula"}
          className={`phys-flip-inner cursor-pointer text-left ${flipped ? "is-flipped" : ""}`}
        >
          {/* front */}
          <div aria-hidden={flipped} className="phys-face card flex min-h-[18rem] flex-col p-6 sm:p-8">
            <div className="mb-4 flex flex-wrap gap-2 text-xs"><span className="chip chip-ac">{card.tag}</span><span className="chip">Question</span></div>
            <div className="flex min-w-0 flex-1 items-center justify-center text-center text-lg font-medium leading-relaxed"><Rich text={card.front} /></div>
            <p className="mt-4 text-center text-xs text-slate-500">Tap to reveal</p>
          </div>
          {/* back */}
          <div aria-hidden={!flipped} className="phys-face phys-face-back card flex min-h-[18rem] flex-col !border-violet-400/50 !bg-violet-400/5 p-5 sm:p-8">
            <div className="mb-2 flex flex-wrap gap-2 text-xs"><span className="chip chip-ac">{card.tag}</span><span className="chip">Formula</span></div>
            <div className="rounded-xl border border-white/10 bg-black/20 px-2 py-3 text-lg"><Tex display>{card.eq}</Tex></div>
            <ul className="mt-3 space-y-1.5 text-sm" aria-label="Symbols and SI units">
              {card.symbols.map((s, i) => (
                <li key={i} className="grid grid-cols-[3.2rem_1fr] items-baseline gap-x-2 sm:grid-cols-[4.5rem_1fr]">
                  <span className="text-right text-base"><Tex>{s.sym}</Tex></span>
                  <span className="min-w-0 text-slate-300"><Rich text={s.meaning} /> <span className="whitespace-nowrap text-slate-500">· <Tex>{s.unit}</Tex></span></span>
                </li>
              ))}
            </ul>
            {card.note && <p className="mt-3 border-t border-white/10 pt-3 text-sm leading-relaxed text-slate-400"><Rich text={card.note} /></p>}
            <p className="mt-3 text-center text-xs text-slate-500">Tap to flip back</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          <button onClick={() => go(-1)} disabled={d.idx === 0} className="btn-ghost disabled:opacity-40"><Icon name="back" size={16} />Previous</button>
          <button onClick={() => go(1)} disabled={d.idx === total - 1} className="btn-primary disabled:opacity-40">Next<Icon name="forward" size={16} /></button>
        </div>
        <button onClick={() => reset(d.tag, true)} className="btn-ghost"><Icon name="spark" size={16} />Shuffle</button>
      </div>
      {d.idx === total - 1 && <p className="a-fade mt-4 text-center text-sm text-slate-400">That is the last card. Use Shuffle to go again in a new order.</p>}
    </div>
  );
}
