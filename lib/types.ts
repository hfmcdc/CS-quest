export type Topic = "files" | "sql" | "pysql";
/** Original question style. Every question is now answered as multiple choice; mode only drives the label. */
export type Mode = "complete" | "predict" | "write" | "debug" | "type" | "mcq";
export type Outcome = "correct" | "incorrect";

export interface Question {
  id: string;
  topic: Topic;
  tag: string;
  mode: Mode;
  level: 1 | 2 | 3;
  text: string;
  show?: string; // code shown to the student
  table?: string; // sample table data
  options: string[]; // always present: every question is MCQ
  code?: boolean; // render options as monospaced code
  answer: string; // the correct option (equals one entry of options)
  result?: string; // expected query result (SQL)
  why: string; // explanation
  hint: string;
}
