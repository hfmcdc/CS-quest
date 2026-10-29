export type MathTopicId = "itf" | "vectors" | "geometry3d" | "maxmin" | "integrals";
export type Level = 1 | 2 | 3;
export type QKind = "direct" | "short" | "steps" | "application" | "exam";

/**
 * How a question is answered and checked.
 * - mcq: choose an option (index is stored as text in the response)
 * - numeric: one number; fractions, pi, sqrt() etc. are evaluated
 * - expr: an expression in x, compared by sampling (domain = sampling interval)
 * - antiderivative: like expr but equal up to an additive constant
 * - vector: 3 components, typed as (a,b,c) or a i + b j + c k
 * - tuple: list of numbers; proportional=true accepts any non-zero multiple (direction ratios)
 * - manual: cannot be checked reliably; the model answer is shown for self-comparison
 */
export type AnswerSpec =
  | { kind: "mcq"; options: string[]; correct: number }
  | { kind: "numeric"; value: number; tol?: number }
  | { kind: "expr"; model: string; domain: [number, number] }
  | { kind: "antiderivative"; model: string; domain: [number, number] }
  | { kind: "vector"; value: [number, number, number] }
  | { kind: "tuple"; value: number[]; proportional?: boolean }
  | { kind: "manual" };

export interface Trap {
  value: number;
  msg: string;
}

export interface MathQuestion {
  id: string;
  topic: MathTopicId;
  tag: string;
  kind: QKind;
  level: Level;
  challenge?: boolean;
  text: string; // rich text: plain text with $inline$ and $$display$$ math
  spec: AnswerSpec;
  answer: string; // rich text shown as the model answer
  steps: string[]; // rich text, one entry per worked-solution step
  hint: string;
  mistake?: string; // shown when the student is wrong
  input?: string; // how to type the answer
  traps?: Trap[]; // common wrong numeric answers with a targeted explanation
}

export interface MathGenerator {
  id: string;
  topic: MathTopicId;
  level: Level;
  challenge?: boolean;
  make: (rng: () => number) => MathQuestion;
}

export type CheckStatus = "correct" | "incorrect" | "uncertain";
export interface CheckResult {
  status: CheckStatus;
  message?: string;
}

export interface MathTopicMeta {
  id: MathTopicId;
  title: string;
  short: string;
  desc: string;
  icon: string;
  chapter: string;
}

export interface RevisionItem {
  label?: string;
  body: string;
}
export interface RevisionSection {
  title: string;
  kind: "formulas" | "concepts" | "mistakes" | "example";
  items: RevisionItem[];
}

export interface WorkedStep {
  doit: string; // the calculation
  why: string; // why this step is used
}
export interface WorkedExample {
  title: string;
  problem: string;
  steps: WorkedStep[];
  answer: string;
}
