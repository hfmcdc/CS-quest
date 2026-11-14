import type { AnsSpec } from "../physics/types";

export type ChemLevel = 1 | 2 | 3;

/** Learning modes a chapter can offer. A chapter lists only the modes it really has content for. */
export type ChemFeature = "revise" | "cards" | "concept" | "numerical" | "practice" | "predict" | "challenge";
export type ChemBranch = "physical" | "inorganic" | "organic";

export interface ChemQuestion {
  id: string;
  tag: string;
  level: ChemLevel;
  text: string;
  options: string[];
  answer: string; // equals one entry of options
  why: string;
  hint: string;
  /** Harder conceptual / assertion–reason items. Shown only in Challenge mode. */
  challenge?: boolean;
  /** Optional worked reasoning, shown after the attempt (used by "Predict the outcome"). */
  steps?: string[];
}

/** Feature 2: typed short answer, matched against groups of acceptable phrasings. */
export interface ChemConceptQ {
  id: string;
  tag: string;
  level: ChemLevel;
  q: string;
  /** Every group must be satisfied; within a group any one phrase is enough. Matching is case/punctuation-insensitive. */
  groups: string[][];
  model: string;
  hint: string;
}

/** Feature 3: pick the right equation, then give a number with its unit. */
export interface ChemNumQ {
  id: string;
  tag: string;
  level: ChemLevel;
  text: string;
  /** Rich text ($…$ maths) options for the formula-identification step. */
  formulaOptions: string[];
  formulaAnswer: number;
  ans: AnsSpec;
  /** Model answer shown after the attempt (rich text). */
  ansShow: string;
  steps: string[];
  hint: string;
}

export interface ChemCard {
  id: string;
  tag: string;
  front: string;
  back: string;
}

export interface ChemItem {
  label?: string;
  body: string;
}

export type ChemSection =
  | { kind: "concepts" | "reactions" | "mistakes"; title: string; items: ChemItem[] }
  | { kind: "table"; title: string; head: string[]; rows: string[][]; note?: string };

/** Heavy content (notes + question bank) lives in its own module and is loaded on demand. */
export interface ChemChapterContent {
  sections: ChemSection[];
  questions: ChemQuestion[];
  cards: ChemCard[];
  challenge: ChemQuestion[];
  concept?: ChemConceptQ[];
  numerical?: ChemNumQ[];
  /** Adapted "Identify the Product" for physical/inorganic chapters: predict the outcome. */
  predict?: ChemQuestion[];
}

/** Light metadata: safe to import anywhere (home screen, routing, prefetching). */
export interface ChemChapterMeta {
  slug: string;
  number: number;
  title: string;
  short: string;
  icon: string;
  desc: string;
  topics: string[];
  branch: ChemBranch;
  /** Official CBSE 2026-27 theory marks for the chapter. */
  marks: number;
  /** Modes offered on the chapter screen, in display order. Must match the content module. */
  features: ChemFeature[];
  load: () => Promise<ChemChapterContent>;
}
