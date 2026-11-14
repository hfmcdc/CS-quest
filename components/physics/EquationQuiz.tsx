"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Icon from "@/components/Icon";
import { celebrate, playSound } from "@/lib/fx";
import { range, shuffled } from "@/lib/physics/shuffle";
import type { PhysEqQ } from "@/lib/physics/types";
import Rich, { Tex } from "./PhysMath";
import { EndCard, Feedback, LoadError, SegProgress, Skeleton, type SegState } from "./shared";
import { usePhysContent } from "./usePhysContent";

/** Feature 3 — Equation identification: a situation, four equations (no names), tap one, get instant feedback and an explanation. */
export default function EquationQuiz({ slug }: { slug: string }) {
  const { data, error, retry } = usePhysContent(slug, "equations");
  if (error) return <LoadError onRetry={retry} />;
  if (!data) return <Skeleton />;
  return <Quiz key={slug} slug={slug} questions={data.questions} />;
}

const LETTERS = ["A", "B", "C", "D"];

function Quiz({ slug, questions }: { slug: string; questions: PhysEqQ[] }) {
  const build = () => shuffled(questions).map((q) => ({ q, order: shuffled(range(q.options.length)) }));
  const [deck, setDeck] = useState(build);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [results, setResults] = useState<SegState[]>(() => deck.map(() => ""));
  const [done, setDone] = useState(false);

  const score = useMemo(() => results.filter((r) => r === "ok").length, [results]);
  const back = `/physics/${slug}`;

  const restart = () => { const d = build(); setDeck(d); setResults(d.map(() => "")); setI(0); setPicked(null); setDone(false); };
  const choose = (shownIdx: number) => {
    if (picked !== null) return;
    const { q, order } = deck[i];
    const correct = order[shownIdx] === q.answer;
    setPicked(shownIdx);
    setResults((r) => r.map((x, k) => (k === i ? (correct ? "ok" : "bad") : x)));
    if (correct) celebrate(); else playSound("wrong");
  };
  const next = () => {
    if (i + 1 >= deck.length) { setDone(true); celebrate(true); return; }
    setI(i + 1); setPicked(null);
  };

  if (done) {
    return <EndCard title="Round complete" score={score} outOf={deck.length} note={score === deck.length ? "Every equation identified correctly." : "Review the explanations, then try again to lock in the formulas."} onAgain={restart} backHref={back} />;
  }

  const { q, order } = deck[i];
  const answered = picked !== null;
  const rightShown = order.indexOf(q.answer);

  return (
    <div>
      <SegProgress states={results.map((r, k) => (k === i && !r ? "" : r))} current={i} label={`Question ${i + 1} of ${deck.length}`} />
      <div className="card ph-q a-rise" key={q.id} data-qid={q.id}>
        <div className="ph-qmeta"><span className="chip chip-ac">{q.tag}</span><span className="ph-muted" style={{ fontSize: ".78rem" }}>Choose the correct equation</span></div>
        <div className="ph-qtext"><Rich text={q.q} /></div>

        <fieldset className="ph-opts eq" disabled={answered} aria-label="Equation options">
          <legend className="sr-only" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>Options</legend>
          {order.map((optIdx, shown) => {
            const cls = answered ? (shown === rightShown ? "opt-correct" : shown === picked ? "opt-wrong" : "") : "";
            return (
              <label key={optIdx} className={cls}>
                <input type="radio" name={`eq-${q.id}`} checked={picked === shown} onChange={() => choose(shown)} />
                <span className="ph-key" aria-hidden="true">{LETTERS[shown]}</span>
                <span className="ph-optbody"><Tex src={q.options[optIdx]} display /></span>
              </label>
            );
          })}
        </fieldset>

        {answered && (
          <>
            <Feedback kind={picked === rightShown ? "ok" : "bad"} title={picked === rightShown ? "Correct" : `Not quite. The answer is option ${LETTERS[rightShown]}.`}>
              <Rich text={q.why} />
            </Feedback>
            <div className="ph-actions">
              <span className="grow" />
              <button type="button" className="btn-primary" onClick={next}>{i + 1 >= deck.length ? "Finish" : "Next question"}<Icon name="forward" size={16} /></button>
            </div>
          </>
        )}
      </div>
      <p className="ph-tips" style={{ textAlign: "center", marginTop: ".9rem" }}>Tap an equation to answer. <Link href={back} className="ph-link">Back to chapter</Link></p>
    </div>
  );
}
