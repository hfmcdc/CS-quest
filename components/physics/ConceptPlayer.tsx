"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import { LEVELS } from "@/components/ui";
import { celebrate, playSound } from "@/lib/fx";
import { range, shuffled } from "@/lib/physics/shuffle";
import type { ConceptQ } from "@/lib/physics/types";
import Rich from "./PhysMath";
import { EndCard, Feedback, SegProgress, type SegState } from "./shared";

/** Feature 2A — Conceptual questions: MCQs and assertion–reason items are checked; written answers show a model answer and a self-check list. */

interface Item { q: ConceptQ; order: number[] }
const LETTERS = ["A", "B", "C", "D"];
const build = (qs: ConceptQ[], level: number): Item[] =>
  shuffled(qs.filter((q) => !level || q.level === level)).map((q) => ({ q, order: q.kind === "mcq" ? (q.ordered ? range(q.options.length) : shuffled(range(q.options.length))) : [] }));

export default function ConceptPlayer({ questions, slug }: { questions: ConceptQ[]; slug: string }) {
  const [level, setLevel] = useState(0);
  const [deck, setDeck] = useState<Item[]>(() => build(questions, 0));
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [hint, setHint] = useState(false);
  const [points, setPoints] = useState<boolean[]>([]);
  const [results, setResults] = useState<SegState[]>(() => deck.map(() => ""));
  const [done, setDone] = useState(false);

  const reset = (lv: number) => {
    const d = build(questions, lv);
    setLevel(lv); setDeck(d); setResults(d.map(() => "")); setI(0); setPicked(null); setRevealed(false); setHint(false); setPoints([]); setDone(false);
  };

  const mcqs = deck.filter((d) => d.q.kind === "mcq").length;
  const mcqOk = results.filter((r, k) => r === "ok" && deck[k].q.kind === "mcq").length;
  const back = `/physics/${slug}`;

  const levelChips = (
    <div className="ph-chips" role="group" aria-label="Difficulty filter">
      {[0, 1, 2, 3].map((lv) => (
        <button key={lv} type="button" className="ph-chipbtn" aria-pressed={level === lv} onClick={() => reset(lv)}>{lv === 0 ? "All levels" : LEVELS[lv - 1]}</button>
      ))}
    </div>
  );

  if (!deck.length) return <>{levelChips}<div className="card ph-empty">No questions at this level yet.</div></>;
  if (done) {
    return <EndCard title="Set complete" score={mcqOk} outOf={mcqs} note={mcqs === deck.length ? "Multiple-choice questions answered correctly." : "Multiple-choice questions answered correctly. Written answers are for self-checking."} onAgain={() => reset(level)} backHref={back} />;
  }

  const { q, order } = deck[i];
  const mark = (s: SegState) => setResults((r) => r.map((x, k) => (k === i ? s : x)));
  const next = () => {
    if (i + 1 >= deck.length) { setDone(true); celebrate(true); return; }
    setI(i + 1); setPicked(null); setRevealed(false); setHint(false); setPoints([]);
  };

  const choose = (shown: number) => {
    if (picked !== null || q.kind !== "mcq") return;
    const correct = order[shown] === q.answer;
    setPicked(shown);
    mark(correct ? "ok" : "bad");
    if (correct) celebrate(); else playSound("wrong");
  };

  const reveal = () => {
    if (q.kind !== "written") return;
    setRevealed(true); setPoints(q.points.map(() => false)); mark("seen"); playSound("tap");
  };
  const gotPoints = q.kind === "written" ? points.filter(Boolean).length : 0;

  return (
    <div>
      {levelChips}
      <SegProgress states={results} current={i} label={`Question ${i + 1} of ${deck.length}`} />
      <div className="card ph-q a-rise" key={q.id} data-qid={q.id}>
        <div className="ph-qmeta">
          <span className="chip chip-ac">{q.tag}</span>
          <span className="ph-muted" style={{ fontSize: ".78rem" }}>
            {LEVELS[q.level - 1]} · {q.kind === "mcq" ? "Multiple choice" : `Written, ${q.marks} marks`}
          </span>
        </div>
        <div className="ph-qtext"><Rich text={q.q} /></div>

        {q.kind === "mcq" ? (
          <>
            <fieldset className="ph-opts" disabled={picked !== null} aria-label="Answer options">
              {order.map((optIdx, shown) => {
                const right = order.indexOf(q.answer);
                const cls = picked !== null ? (shown === right ? "opt-correct" : shown === picked ? "opt-wrong" : "") : "";
                return (
                  <label key={optIdx} className={cls}>
                    <input type="radio" name={`c-${q.id}`} checked={picked === shown} onChange={() => choose(shown)} />
                    <span className="ph-key" aria-hidden="true">{LETTERS[shown]}</span>
                    <span className="ph-optbody"><Rich text={q.options[optIdx]} /></span>
                  </label>
                );
              })}
            </fieldset>
            {picked === null && q.hint && (
              <div className="ph-actions">
                <button type="button" className="ph-link" onClick={() => setHint((h) => !h)}>{hint ? "Hide hint" : "Show a hint"}</button>
              </div>
            )}
            {picked === null && hint && q.hint && <Feedback kind="hint" title="Hint"><Rich text={q.hint} /></Feedback>}
            {picked !== null && (
              <>
                <Feedback kind={order[picked] === q.answer ? "ok" : "bad"} title={order[picked] === q.answer ? "Correct" : `Not quite. The answer is option ${LETTERS[order.indexOf(q.answer)]}.`}><Rich text={q.why} /></Feedback>
                <div className="ph-actions"><span className="grow" /><button type="button" className="btn-primary" onClick={next}>{i + 1 >= deck.length ? "Finish" : "Next question"}<Icon name="forward" size={16} /></button></div>
              </>
            )}
          </>
        ) : (
          <>
            {!revealed ? (
              <>
                <div className="ph-field">
                  <label className="ph-label" htmlFor={`w-${q.id}`}>Your answer<span>Optional: writing it out helps you remember</span></label>
                  <textarea id={`w-${q.id}`} className="ph-input" placeholder="Write your answer here, then compare it with the model answer." />
                </div>
                <div className="ph-actions"><button type="button" className="btn-primary" onClick={reveal}>Show model answer</button></div>
              </>
            ) : (
              <>
                <Feedback kind="hint" title="Model answer"><Rich text={q.model} /></Feedback>
                <p className="ph-label" style={{ marginTop: "1rem" }}>Self-check: tick the key points your answer covered<span>{gotPoints} of {q.points.length}</span></p>
                <ul className="ph-pts">
                  {q.points.map((p, k) => (
                    <li key={k}><label><input type="checkbox" checked={!!points[k]} onChange={() => setPoints((arr) => arr.map((v, idx) => (idx === k ? !v : v)))} /><span>{p}</span></label></li>
                  ))}
                </ul>
                <div className="ph-actions"><span className="grow" /><button type="button" className="btn-primary" onClick={next}>{i + 1 >= deck.length ? "Finish" : "Next question"}<Icon name="forward" size={16} /></button></div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
