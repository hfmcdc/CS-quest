import type { AnswerSpec, Level, MathCard, MathQuestion, MathTopicId, QKind, Trap } from "./types";

/** Shared builders for question banks (kept separate so chapter files can import them without cycles). */
export type Extra = { challenge?: boolean; input?: string; mistake?: string; traps?: Trap[] };

export const mk =
  (topic: MathTopicId) =>
  (id: string, tag: string, kind: QKind, level: Level, text: string, spec: AnswerSpec, answer: string, steps: string[], hint: string, x: Extra = {}): MathQuestion => ({
    id, topic, tag, kind, level, text, spec, answer, steps, hint, ...x,
  });

export const mcq = (options: string[], correct: number): AnswerSpec => ({ kind: "mcq", options, correct });
export const num = (value: number, tol?: number): AnswerSpec => ({ kind: "numeric", value, tol });
export const expr = (model: string, domain: [number, number]): AnswerSpec => ({ kind: "expr", model, domain });
export const anti = (model: string, domain: [number, number]): AnswerSpec => ({ kind: "antiderivative", model, domain });
export const vec = (value: [number, number, number]): AnswerSpec => ({ kind: "vector", value });
export const tup = (value: number[], proportional = false): AnswerSpec => ({ kind: "tuple", value, proportional });
export const manual = (): AnswerSpec => ({ kind: "manual" });

export const HELP = {
  num: "Type a number or exact value, e.g. 2pi/3, sqrt(3)/2, 5/2 or 0.866.",
  vec: "Type as 2i - 3j + 6k, or as (2, -3, 6). Fractions such as 2/7 are fine.",
  tup: "Type numbers separated by commas, e.g. 3, -2, 8.",
  expr: "Type an expression in x, e.g. x/2 or 3sin(x). Use pi, sqrt(), ^ for powers.",
  anti: "Type the antiderivative, e.g. x^3/3 + 2sin(x). Use ln|x|, e^x, tan^-1(x), sqrt(). + C is optional.",
  manual: "Write your answer on paper or type it here, then compare it with the model answer.",
  mat: "Type the entries row by row, separated by commas, e.g. 1, 2, 3, 4 for a 2×2 matrix with rows (1, 2) and (3, 4).",
  prob: "Type a fraction or decimal, e.g. 3/8 or 0.375.",
  sol: "Type y as an expression in x (just the right-hand side), e.g. x^2 + 1 or e^(2x)/2.",
} as const;


/** Flashcard builder: ids are `${prefix}${n}`. */
export const cardMk = (topic: MathTopicId, prefix: string) => {
  let n = 0;
  return (tag: string, front: string, back: string): MathCard => ({ id: `${prefix}${++n}`, topic, tag, front, back });
};
