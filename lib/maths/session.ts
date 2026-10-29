import type { CheckResult, Level, MathGenerator, MathQuestion, MathTopicId } from "./types";
import { QUESTIONS } from "./questions";
import { GENERATORS } from "./generators";

export type Mode = "practice" | "challenge";
export type Phase = "ask" | "retry" | "correct" | "solved" | "uncertain";

export interface Pool {
  statics: MathQuestion[];
  gens: MathGenerator[];
}

export function poolFor(topic: MathTopicId, mode: Mode): Pool {
  const ch = mode === "challenge";
  return {
    statics: QUESTIONS.filter((q) => q.topic === topic && !!q.challenge === ch),
    gens: GENERATORS.filter((g) => g.topic === topic && !!g.challenge === ch),
  };
}

export function topicCounts(topic: MathTopicId) {
  const p = poolFor(topic, "practice");
  const c = poolFor(topic, "challenge");
  return { practice: p.statics.length, variations: p.gens.length, challenge: c.statics.length };
}

function shuffle<T>(a: T[], rng: () => number): T[] {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

/** Shuffle MCQ options while keeping track of the correct one. Never mutates the bank. */
export function prepare(q: MathQuestion, rng: () => number): MathQuestion {
  if (q.spec.kind !== "mcq") return q;
  const correctText = q.spec.options[q.spec.correct];
  const options = shuffle(q.spec.options, rng);
  return { ...q, spec: { kind: "mcq", options, correct: options.indexOf(correctText) } };
}

interface Candidate { id: string; level: number; build: () => MathQuestion }

export function pick(pool: Pool, diff: number, seen: string[], rng: () => number = Math.random) {
  const unseen = pool.statics.filter((q) => !seen.includes(q.id));
  // Once every fixed question has been seen the bank restarts (generated variations never run out).
  const repeated = unseen.length === 0 && pool.statics.length > 0;
  const fresh = repeated ? pool.statics : unseen;
  const cands: Candidate[] = [
    ...fresh.map((q) => ({ id: q.id, level: q.level, build: () => q })),
    ...pool.gens.map((g) => ({ id: g.id, level: g.level, build: () => g.make(rng) })),
  ];
  if (!cands.length) throw new Error("No questions available");
  const d = Math.min(...cands.map((c) => Math.abs(c.level - diff)));
  const near = cands.filter((c) => Math.abs(c.level - diff) === d);
  const chosen = near[Math.floor(rng() * near.length)];
  const q = prepare(chosen.build(), rng);
  const isStatic = fresh.some((f) => f.id === chosen.id);
  const base = repeated ? [] : seen;
  const nextSeen = isStatic ? [...base, chosen.id] : base;
  return { q, seen: nextSeen, repeated };
}

export interface Session {
  topic: MathTopicId;
  mode: Mode;
  q: MathQuestion;
  phase: Phase;
  diff: Level;
  hint: boolean;
  seen: string[];
  repeated: boolean;
  fx: number; // bumps on every submission so animations replay
  message: string; // checker note for the student
  change: string; // temporary difficulty message
  retryNote: string; // targeted feedback after a wrong attempt
  assessed: boolean; // student already self-assessed an uncertain answer
}

const clamp = (n: number): Level => Math.min(3, Math.max(1, n)) as Level;

export function startSession(topic: MathTopicId, mode: Mode, rng: () => number = Math.random): Session {
  const diff: Level = mode === "challenge" ? 3 : 1;
  const r = pick(poolFor(topic, mode), diff, [], rng);
  return { topic, mode, q: r.q, phase: "ask", diff, hint: false, seen: r.seen, repeated: r.repeated, fx: 0, message: "", change: "", retryNote: "", assessed: false };
}

export function nextQuestion(s: Session, rng: () => number = Math.random): Session {
  const r = pick(poolFor(s.topic, s.mode), s.diff, s.seen, rng);
  return { ...s, q: r.q, seen: r.seen, repeated: r.repeated, phase: "ask", hint: false, message: "", change: "", retryNote: "", assessed: false };
}

function move(s: Session, delta: 1 | -1): Pick<Session, "diff" | "change"> {
  if (s.mode === "challenge") return { diff: s.diff, change: "" };
  const nd = clamp(s.diff + delta);
  const change =
    delta > 0
      ? nd === s.diff ? "Already at the hardest level." : "Next question will be harder."
      : nd === s.diff ? "Already at the easiest level." : "Next question will be easier.";
  return { diff: nd, change };
}

export function showHint(s: Session): Session {
  return s.hint ? s : { ...s, hint: true };
}

/**
 * Apply a check result.
 *  correct   -> next question is harder
 *  incorrect -> first time: hint + one retry; on the retry: worked solution, next question easier
 *  uncertain -> model answer is shown for manual comparison; difficulty is unchanged
 */
export function submit(s: Session, r: CheckResult): Session {
  if (s.phase !== "ask" && s.phase !== "retry") return s;
  const base = { ...s, fx: s.fx + 1, message: r.message ?? "" };
  if (r.status === "correct") return { ...base, phase: "correct", retryNote: "", ...move(s, 1) };
  if (r.status === "uncertain") return { ...base, phase: "uncertain", change: "Difficulty unchanged." };
  if (s.phase === "ask") return { ...base, phase: "retry", hint: true, retryNote: r.message ?? "" };
  return { ...base, phase: "solved", retryNote: r.message ?? "", ...move(s, -1) };
}

/** After an uncertain answer the student may report whether their own working matched. */
export function selfAssess(s: Session, matched: boolean): Session {
  if (s.phase !== "uncertain" || s.assessed) return s;
  return { ...s, assessed: true, ...move(s, matched ? 1 : -1) };
}
