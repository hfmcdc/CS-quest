/** Physics Quest types. Question data lives in lib/physics/chapters/<slug>.ts; nothing here is chapter-specific. */

export type PhysFeature = "flashcards" | "practice" | "equations" | "advanced";
export type PhysLevel = "board" | "hots" | "jee";

export interface PhysSymbol { sym: string; meaning: string; unit: string } // sym and unit are TeX

export interface PhysCard {
  id: string;
  tag: string;
  front: string;      // Rich text (plain words with optional $math$)
  eq: string;         // TeX, shown in display style
  symbols: PhysSymbol[];
  note?: string;      // Rich text
}

export interface PhysMcq { kind: "mcq"; id: string; tag: string; text: string; options: string[]; answer: number; why: string; hint: string }
export interface PhysWritten { kind: "written"; id: string; tag: string; marks: number; text: string; model: string[]; points: string[]; hint: string }
export type PhysConcept = PhysMcq | PhysWritten;

export interface PhysNumerical {
  id: string;
  tag: string;
  text: string;                 // Rich text
  vars: string[];               // canonical symbol names the student may use in the equation
  formulas: string[];           // accepted equations (any equivalent rearrangement is also accepted)
  formulaTex: string;           // the main equation, as TeX, for the solution
  given: Record<string, number>; // numbers used to re-verify `formulas[0]` independently (see scripts/verify-physics.ts)
  target: string;               // the symbol `answer` is the value of
  /** For comparison problems: answer = scale * solve(given) / solve(ratio.given2). */
  ratio?: { given2: Record<string, number>; scale?: number };
  answer: number;               // SI value
  unit: string;                 // SI unit string for checking, e.g. "N m^-1"
  answerTex: string;            // displayed final answer
  tol?: number;                 // relative tolerance, default 3 %
  hints: string[];
  steps: string[];              // Rich text, worked solution
  traps?: { value: number; msg: string }[];
}

export interface PhysEquationQ { id: string; tag: string; text: string; options: string[]; answer: number; why: string }

export interface PhysChapterContent {
  cards: PhysCard[];
  concepts: PhysConcept[];
  numericals: PhysNumerical[];
  equations: PhysEquationQ[];
  advanced: Record<PhysLevel, PhysNumerical[]>;
}

export interface PhysChapterMeta {
  slug: string;
  number: number;
  title: string;
  short: string;
  desc: string;
  weightage: string;
  topics: string[];
  load: () => Promise<PhysChapterContent>;
}
