/**
 * Typed data model for the Physics subject.
 * Everything here is plain, serialisable data so question banks stay easy to extend:
 * add items to a chapter's content files (see lib/physics/content/<slug>/) and run `npm run verify:physics`.
 */

export type PhysFeature = "flashcards" | "practice" | "equations" | "advanced";
export type Level = 1 | 2 | 3;
export type AdvLevel = "board" | "hots" | "jee";

/** Dimension exponents in the order [m, kg, s, A, K, mol, cd]. */
export type Dim = [number, number, number, number, number, number, number];

/* ------------------------------------------------------------------ registry (light, imported everywhere) */

export interface WeightGroup {
  id: string;
  /** Official combined marks for the whole group. CBSE does not publish per-chapter marks. */
  marks: number;
  chapters: number[];
  unitLabel: string;
}

export interface PhysChapterMeta {
  slug: string;
  number: number;
  title: string;
  short: string;
  /** One-sentence description shown on the chapter card. */
  desc: string;
  /** Prescribed topics (kept to the CBSE 2026-27 scope). */
  topics: string[];
}

/* ------------------------------------------------------------------ Feature 1: flashcards */

export interface PhysCard {
  id: string;
  tag: string;
  /** Formula name, concept or question (rich text). */
  front: string;
  /** The equation (LaTeX subset, rendered as a display equation). */
  eq: string;
  /** Symbol, meaning, SI unit. */
  symbols: { s: string; m: string; u?: string }[];
  note?: string;
}

/* ------------------------------------------------------------------ Feature 2A: conceptual questions */

interface ConceptBase { id: string; tag: string; level: Level; hint?: string }
export interface ConceptMcq extends ConceptBase {
  kind: "mcq"; q: string; options: string[]; answer: number; why: string;
  /** Keep the option order (assertion–reason items). Otherwise options are shuffled on display. */
  ordered?: boolean;
}
export interface ConceptWritten extends ConceptBase { kind: "written"; q: string; model: string; points: string[]; marks: number }
export type ConceptQ = ConceptMcq | ConceptWritten;

/* ------------------------------------------------------------------ numerical questions (Feature 2B and Feature 4) */

/** How the main equation is checked. See lib/physics/engine/equation.ts. */
export interface EqSpec {
  /** The quantity the question asks for (must be the subject of the last relation). */
  target: string;
  /** Model relations in evaluation order: [subject, right-hand side expression]. Independent variables are the ones never used as a subject. */
  rels: [string, string][];
  /** Every symbol the student may use (variables), in display order. */
  symbols: string[];
  /** Constants this question allows, with the exact values used in the problem. */
  consts: Record<string, number>;
  /** Optional sampling ranges for independent variables (defaults to [0.5, 4]). */
  ranges?: Record<string, [number, number]>;
  /** Extra spellings a student might use, keyed by canonical symbol. */
  aka?: Record<string, string[]>;
  /** The student's equation must involve at least one of these symbols (default: [target]). */
  mustInclude?: string[];
  /** The question's actual values, used to accept an equation written with the numbers substituted. */
  actual: Record<string, number>;
  /** Known wrong relations with a targeted message, e.g. a missing square. */
  traps?: { rel: [string, string]; msg: string }[];
}

export interface AnsSpec {
  /** Model answer in SI base units. */
  value: number;
  dim: Dim;
  /** Preferred display unit, e.g. "µC", "N m". Empty for a dimensionless answer. */
  unit: string;
  /** Relative tolerance. */
  tol: number;
  /** Require a unit even if the quantity could be written bare (angles, etc). */
  needUnit: boolean;
  /** Common wrong numeric answers with a targeted explanation. */
  traps?: { value: number; msg: string }[];
}

export interface PhysNumQ {
  id: string;
  tag: string;
  /** 1-3 for Practice; Advanced uses 1 = Board, 2 = HOTS, 3 = JEE Main. */
  level: Level;
  text: string;
  /** Symbol → short description, shown as insertable chips. */
  sym: Record<string, string>;
  eq: EqSpec;
  /** The model equation, rendered after the attempt (LaTeX subset). */
  eqShow: string;
  ans: AnsSpec;
  /** Model answer as rich text, e.g. "$0.15\ \text{N}$". */
  ansShow: string;
  hint: string;
  steps: string[];
}

/* ------------------------------------------------------------------ Feature 3: equation identification */

export interface PhysEqQ {
  id: string;
  tag: string;
  q: string;
  /** Equations only. No names, no labels. */
  options: string[];
  answer: number;
  why: string;
}

/* ------------------------------------------------------------------ chapter content modules (one lazy chunk each) */

export interface FlashcardsContent { cards: PhysCard[] }
export interface PracticeContent { concept: ConceptQ[]; numerical: PhysNumQ[] }
export interface EquationsContent { questions: PhysEqQ[] }
export interface AdvancedContent { problems: PhysNumQ[] }

export interface FeatureContentMap {
  flashcards: FlashcardsContent;
  practice: PracticeContent;
  equations: EquationsContent;
  advanced: AdvancedContent;
}
