export type Topic = "files" | "sql" | "pysql";
export type Mode = "complete" | "predict" | "write" | "debug" | "type" | "mcq";
export type Outcome = "correct" | "incorrect" | "manual";

/** Rules used by the checker. Patterns are regex sources tested (case-insensitively) on the normalised answer. */
export interface Check {
  accepted?: string[]; // exact answers (after normalisation)
  all?: string[]; // every pattern must match
  any?: string[]; // at least one must match
  forbid?: string[]; // any match => demonstrably wrong
  strict?: boolean; // short fill-ins: no match => incorrect (otherwise: manual)
  output?: boolean; // output questions: compare to accepted only
}

export interface Question {
  id: string;
  topic: Topic;
  tag: string;
  mode: Mode;
  level: 1 | 2 | 3;
  text: string;
  show?: string; // code shown to the student
  table?: string; // sample table data
  options?: string[]; // MCQ only
  answer: string; // model answer
  result?: string; // expected query result (SQL)
  why: string; // explanation / what a valid solution needs
  hint: string;
  check: Check;
}
