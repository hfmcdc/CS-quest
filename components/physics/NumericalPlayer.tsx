"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import Icon from "@/components/Icon";
import { celebrate, playSound } from "@/lib/fx";
import { checkAnswer, type AnsResult } from "@/lib/physics/engine/answer";
import { checkEquation, type EqResult } from "@/lib/physics/engine/equation";
import { shuffled } from "@/lib/physics/shuffle";
import type { PhysNumQ } from "@/lib/physics/types";
import Rich, { Tex } from "./PhysMath";
import { EndCard, Feedback, SegProgress, type SegState } from "./shared";

/**
 * Numerical problems (Practice → Numerical, and Advanced Numericals).
 * The student enters the main equation and the final answer with its unit. Both are checked separately:
 *  - the equation by numerical equivalence (rearrangements accepted), the answer by value + unit with rounding tolerance;
 *  - anything the checker cannot read is reported as "can't verify, compare with the model", never as wrong;
 *  - one retry with a hint, then the full worked solution.
 */

type Phase = "ask" | "retry" | "solved" | "revealed";
interface Result { eq: EqResult; ans: AnsResult }

const CONST_NAMES: Record<string, string> = {
  k: "Coulomb constant", eps0: "permittivity of free space (ε₀)", e: "electron charge", me: "electron mass", mp: "proton mass",
  mu0: "permeability of free space (μ₀)", c: "speed of light", h: "Planck's constant", u: "atomic mass unit", Rinf: "Rydberg constant (R)",
};

interface Props { questions: PhysNumQ[]; slug: string; levelLabels: string[]; filterable?: boolean; unitHint?: boolean }

const build = (qs: PhysNumQ[], level: number) => shuffled(qs.filter((q) => !level || q.level === level));

export default function NumericalPlayer({ questions, slug, levelLabels, filterable = false }: Props) {
  const [level, setLevel] = useState(0);
  const [deck, setDeck] = useState<PhysNumQ[]>(() => build(questions, 0));
  const [i, setI] = useState(0);
  const [eqIn, setEqIn] = useState("");
  const [ansIn, setAnsIn] = useState("");
  const [res, setRes] = useState<Result | null>(null);
  const [phase, setPhase] = useState<Phase>("ask");
  const [attempts, setAttempts] = useState(0);
  const [hint, setHint] = useState(false);
  const [warn, setWarn] = useState("");
  const [results, setResults] = useState<SegState[]>(() => deck.map(() => ""));
  const [done, setDone] = useState(false);
  const eqRef = useRef<HTMLInputElement>(null);

  const back = `/physics/${slug}`;
  const clear = () => { setEqIn(""); setAnsIn(""); setRes(null); setPhase("ask"); setAttempts(0); setHint(false); setWarn(""); };
  const reset = (lv: number) => {
    const d = build(questions, lv);
    setLevel(lv); setDeck(d); setResults(d.map(() => "")); setI(0); setDone(false); clear();
  };

  const chips = filterable && (
    <div className="ph-chips" role="group" aria-label="Difficulty filter">
      {[0, 1, 2, 3].map((lv) => (
        <button key={lv} type="button" className="ph-chipbtn" aria-pressed={level === lv} onClick={() => reset(lv)}>{lv === 0 ? "All levels" : levelLabels[lv - 1]}</button>
      ))}
    </div>
  );

  if (!deck.length) return <>{chips}<div className="card ph-empty">No problems at this level yet.</div></>;
  if (done) {
    const ok = results.filter((r) => r === "ok").length;
    const part = results.filter((r) => r === "part").length;
    return <EndCard title="Set complete" score={ok} outOf={deck.length} note={part ? `${part} more had the right answer but not the equation. Review the worked solutions.` : "Solved with the correct equation and answer."} onAgain={() => reset(level)} backHref={back} />;
  }

  const q = deck[i];
  const locked = phase === "solved" || phase === "revealed";
  const mark = (s: SegState) => setResults((r) => r.map((x, k) => (k === i ? s : x)));

  const submit = (e?: FormEvent) => {
    e?.preventDefault();
    if (locked) return;
    if (!eqIn.trim() || !ansIn.trim()) { setWarn("Enter both the main equation and your final answer with its unit."); return; }
    setWarn("");
    const eq = checkEquation(eqIn, q.eq);
    const ans = checkAnswer(ansIn, q.ans);
    setRes({ eq, ans });
    if (ans.status === "unreadable") { playSound("tap"); return; } // a typo does not use up an attempt
    const n = attempts + 1;
    setAttempts(n);
    const ansOk = ans.status === "correct";
    const eqOk = eq.status !== "incorrect";
    if (ansOk && eqOk) { setPhase("solved"); mark("ok"); celebrate(); return; }
    playSound("wrong");
    if (n >= 2) { setPhase("revealed"); mark(ansOk || eqOk ? "part" : "bad"); } else { setPhase("retry"); setHint(true); }
  };

  const showSolution = () => { if (locked) return; setPhase("revealed"); mark("bad"); playSound("tap"); };
  const next = () => {
    if (i + 1 >= deck.length) { setDone(true); celebrate(true); return; }
    setI(i + 1); clear();
  };
  const insert = (sym: string) => {
    const el = eqRef.current;
    if (!el || locked) return;
    const a = el.selectionStart ?? eqIn.length;
    const b = el.selectionEnd ?? eqIn.length;
    const nextVal = eqIn.slice(0, a) + sym + eqIn.slice(b);
    setEqIn(nextVal);
    requestAnimationFrame(() => { el.focus(); el.setSelectionRange(a + sym.length, a + sym.length); });
  };

  const eqKind = !res ? null : res.eq.status === "correct" ? "ok" : res.eq.status === "uncertain" ? "warn" : "bad";
  const ansKind = !res ? null : res.ans.status === "correct" ? "ok" : res.ans.status === "unit-missing" || res.ans.status === "unreadable" ? "warn" : "bad";
  const constNames = Object.keys(q.eq.consts);

  return (
    <div>
      {chips}
      <SegProgress states={results} current={i} label={`Problem ${i + 1} of ${deck.length}`} />
      <form className="card ph-q a-rise" key={q.id} data-qid={q.id} data-phase={phase} onSubmit={submit} noValidate>
        <div className="ph-qmeta">
          <span className="chip chip-ac">{q.tag}</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", fontSize: ".8rem", color: "#c7cde2" }} aria-label={`Level: ${levelLabels[q.level - 1]}`}>
            <span className="meter" aria-hidden="true">{[1, 2, 3].map((n) => <i key={n} className={n <= q.level ? "on" : ""} />)}</span>
            {levelLabels[q.level - 1]}
          </span>
        </div>
        <div className="ph-qtext"><Rich text={q.text} /></div>

        <div className="ph-field">
          <label className="ph-label" htmlFor={`eq-${q.id}`}>1. Main equation<span>write it in symbols</span></label>
          <input ref={eqRef} id={`eq-${q.id}`} className={`ph-input ${eqKind ? `is-${eqKind}` : ""}`} value={eqIn} onChange={(e: ChangeEvent<HTMLInputElement>) => setEqIn(e.target.value)} disabled={locked}
            placeholder="e.g. F = k q1 q2 / r^2" autoComplete="off" autoCapitalize="off" autoCorrect="off" spellCheck={false} aria-describedby={`tips-${q.id}`} />
          <div className="ph-symrow" role="group" aria-label="Insert a symbol">
            {Object.entries(q.sym).map(([s, d]) => (
              <button key={s} type="button" className="ph-sym" disabled={locked} onClick={() => insert(s)} title={d}><b>{s}</b>{d}</button>
            ))}
            {constNames.map((c) => (
              <button key={c} type="button" className="ph-sym" disabled={locked} onClick={() => insert(c)} title={CONST_NAMES[c] ?? "constant"}><b>{c}</b>{CONST_NAMES[c] ?? "constant"}</button>
            ))}
          </div>
          <p className="ph-tips" id={`tips-${q.id}`}>Tap a symbol to insert it. Use * or a space for multiplication, / for division, ^ for powers, sqrt( ) for roots. You can also type Greek letters (θ, λ, π) or spell them (theta, lambda, pi).</p>
        </div>

        <div className="ph-field">
          <label className="ph-label" htmlFor={`ans-${q.id}`}>2. Final answer<span>number and unit</span></label>
          <input id={`ans-${q.id}`} className={`ph-input ${ansKind ? `is-${ansKind}` : ""}`} value={ansIn} onChange={(e: ChangeEvent<HTMLInputElement>) => setAnsIn(e.target.value)} disabled={locked}
            placeholder={q.ans.unit ? `e.g. 4.5 × 10^-7 ${q.ans.unit}` : "e.g. 0.25"} autoComplete="off" autoCapitalize="off" autoCorrect="off" spellCheck={false} enterKeyHint="go" />
          <p className="ph-tips">Scientific notation such as 3e-6 or 3 × 10^-6 is fine. Any equivalent unit or prefix is accepted (for example mN for 0.001 N). Rounding to 2 or more significant figures is accepted.</p>
        </div>

        {warn && <Feedback kind="warn">{warn}</Feedback>}

        {res && (
          <div className="ph-res" aria-live="polite">
            <Feedback kind={eqKind!} title={res.eq.status === "correct" ? "Equation: matches" : res.eq.status === "uncertain" ? "Equation: could not be checked automatically" : "Equation: does not match"}>
              {res.eq.message}
              {res.eq.status === "uncertain" && <Tex src={q.eqShow} display />}
            </Feedback>
            <Feedback kind={ansKind!} title={res.ans.status === "correct" ? "Answer: correct" : res.ans.status === "unit-missing" ? "Answer: add the unit" : res.ans.status === "unit-wrong" ? "Answer: wrong unit" : res.ans.status === "unreadable" ? "Answer: could not be read" : "Answer: not correct yet"}>{res.ans.message}</Feedback>
          </div>
        )}

        {phase === "solved" && <Feedback kind="ok" title="Solved">Both the equation and the answer are right. Open the worked solution to compare your method.</Feedback>}
        {phase === "retry" && <Feedback kind="hint" title="Try once more"><Rich text={q.hint} /></Feedback>}
        {phase === "revealed" && <Feedback kind="hint" title="Here is the worked solution">Compare each step with your own working below.</Feedback>}
        {phase === "ask" && hint && <Feedback kind="hint" title="Hint"><Rich text={q.hint} /></Feedback>}

        {locked ? (
          <>
            <details className="ph-sol" key={phase} open={phase === "revealed"}>
              <summary>Step-by-step solution<Icon name="chevron" size={18} /></summary>
              <div className="ph-sol-body">
                <div className="ph-model"><small>Model equation</small><Tex src={q.eqShow} display /></div>
                <ol className="ph-steps">{q.steps.map((s, k) => <li key={k}><Rich text={s} /></li>)}</ol>
                <div className="ph-model" style={{ marginTop: "1rem" }}><small>Answer</small><Rich text={q.ansShow} /></div>
              </div>
            </details>
            <div className="ph-actions"><span className="grow" /><button type="button" className="btn-primary" onClick={next}>{i + 1 >= deck.length ? "Finish" : "Next problem"}<Icon name="forward" size={16} /></button></div>
          </>
        ) : (
          <div className="ph-actions">
            <button type="submit" className="btn-primary">{attempts === 0 ? "Check answer" : "Check again"}</button>
            {phase === "ask" && !hint && <button type="button" className="ph-link" onClick={() => setHint(true)}>Show a hint</button>}
            <span className="grow" />
            <button type="button" className="ph-link" onClick={showSolution}>Show solution</button>
          </div>
        )}
      </form>
    </div>
  );
}
