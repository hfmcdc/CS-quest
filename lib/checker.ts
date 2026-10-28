import type { Outcome, Question } from "./types";

/** Every question is multiple choice, so checking is an exact match against the answer key. */
export function evaluate(q: Question, choice: string): Outcome {
  return choice === q.answer ? "correct" : "incorrect";
}
