import { C, CONSTS, type ConstName } from "./constants";
import { fmtNum } from "./engine/format";
import { parseQuantity } from "./engine/answer";
import { parseUnit, unitTex } from "./engine/units";
import type { ConceptMcq, ConceptWritten, Dim, Level, PhysCard, PhysEqQ, PhysNumQ } from "./types";

/**
 * Authoring helpers. Question banks are written with these so that every number in the question text,
 * the model answer and the worked steps comes from one place (the `given` values and `calc`).
 * `npm run verify:physics` cross-checks the stated equation against `calc` for every numerical.
 */

const ZERO: Dim = [0, 0, 0, 0, 0, 0, 0];

/** Ids are "<prefix>-<kind><nn>", assigned in order, e.g. c01-f03. */
export function ids(prefix: string) {
  const n: Record<string, number> = {};
  return (kind: string): string => {
    n[kind] = (n[kind] ?? 0) + 1;
    return `${prefix}-${kind}${String(n[kind]).padStart(2, "0")}`;
  };
}

/* ------------------------------------------------------------------ flashcards */

export const card = (
  id: string, tag: string, front: string, eq: string,
  symbols: [string, string, string?][], note?: string,
): PhysCard => ({ id, tag, front, eq, symbols: symbols.map(([s, m, u]) => ({ s, m, u })), note });

/* ------------------------------------------------------------------ conceptual */

export const mcq = (id: string, tag: string, level: Level, q: string, options: string[], answer: number, why: string, hint?: string): ConceptMcq =>
  ({ kind: "mcq", id, tag, level, q, options, answer, why, hint });

const AR_OPTIONS = [
  "Both A and R are true, and R is the correct explanation of A.",
  "Both A and R are true, but R is not the correct explanation of A.",
  "A is true, but R is false.",
  "A is false, but R is true.",
];
export const ar = (id: string, tag: string, level: Level, a: string, r: string, answer: "A" | "B" | "C" | "D", why: string): ConceptMcq =>
  ({ kind: "mcq", id, tag, level, q: `**Assertion (A):** ${a}\n**Reason (R):** ${r}`, options: AR_OPTIONS, answer: "ABCD".indexOf(answer), why, ordered: true });

export const written = (id: string, tag: string, level: Level, q: string, model: string, points: string[], marks = 2): ConceptWritten =>
  ({ kind: "written", id, tag, level, q, model, points, marks });

/* ------------------------------------------------------------------ equation identification */

export const eqq = (id: string, tag: string, q: string, options: [string, string, string, string], answer: number, why: string): PhysEqQ =>
  ({ id, tag, q, options, answer, why });

/* ------------------------------------------------------------------ numericals */

export interface NQSpec {
  id: string;
  tag: string;
  level: Level;
  /** Given quantities as the student would read them: "3 µC", "30 cm", "5 × 10^4 V/m". */
  g: Record<string, string>;
  /** Question text. {name} inserts a given (with its unit). Constants used are appended automatically. */
  q: string;
  /** Symbol → short description. These are the symbols the student may use in their equation. */
  sym: Record<string, string>;
  /** Model relations in order, [subject, expression]. The last subject is the answer unless `target` is set. */
  rels: [string, string][];
  target?: string;
  consts?: ConstName[];
  /** Independent calculation of the answer from SI values (kept separate from `rels` on purpose). */
  calc: (s: Record<string, number>) => number;
  /** Intermediate values to show in the steps as {m.name}. */
  mid?: (s: Record<string, number>) => Record<string, number>;
  /** Unit the answer is displayed in, e.g. "µC". Empty for a pure number. */
  unit: string;
  /** The model equation in LaTeX. */
  show: string;
  hint: string;
  /** Worked solution. Placeholders: {g.name} given with unit, {v.name} SI number, {m.name} intermediate, {c.k} constant, {ans} answer with unit, {ansn} answer number. In plain text (outside $…$) a bare {name} also works. */
  steps: string[];
  tol?: number;
  needUnit?: boolean;
  ranges?: Record<string, [number, number]>;
  aka?: Record<string, string[]>;
  mustInclude?: string[];
  eqTraps?: { rel: [string, string]; msg: string }[];
  numTraps?: { value: number; msg: string }[];
  /** Do not append the "Take k = …" sentence. */
  noConstNote?: boolean;
}

interface Given { si: number; num: string; tex: string }

function numTex(raw: string): string {
  return raw
    .replace(/\s*[×xX*]\s*10\s*\^\s*\(?\s*(-?\d+)\s*\)?/g, "\\times10^{$1}")
    .replace(/(\d)\s*[eE]\s*(-?\d+)/g, "$1\\times10^{$2}")
    .replace(/-/g, "-");
}

function parseGiven(name: string, text: string): Given {
  const q = parseQuantity(text);
  if (!q) throw new Error(`Cannot read given ${name} = "${text}"`);
  const unit = q.unitText ? parseUnit(q.unitText) : { dim: ZERO, scale: 1 };
  if (!unit) throw new Error(`Cannot read unit of given ${name} = "${text}"`);
  const numPart = text.slice(0, text.length - q.unitText.length).trim();
  const num = numTex(numPart);
  const si = q.value * unit.scale;
  return { si, num, tex: q.unitText ? `${num}\\ ${unitTex(q.unitText)}` : num };
}

/** Replace {placeholders}. Inside $…$ they are raw LaTeX; outside they are wrapped in $…$. */
function fill(tpl: string, lookup: (key: string) => string | undefined, ctxName: string): string {
  let math = false;
  let out = "";
  for (let i = 0; i < tpl.length; i++) {
    const ch = tpl[i];
    if (ch === "$") { math = !math; out += ch; continue; }
    if (ch === "{" && !math) {
      const j = tpl.indexOf("}", i);
      const key = tpl.slice(i + 1, j);
      const v = lookup(key);
      if (v === undefined) {
        // not a placeholder: plain braces are not used in prose, so this is a typo
        throw new Error(`Unknown placeholder {${key}} in ${ctxName}`);
      }
      out += `$${v}$`;
      i = j;
      continue;
    }
    if (ch === "{" && math) {
      // inside math only explicit placeholders are replaced; ordinary LaTeX groups such as \frac{q}{r} pass through
      const j = tpl.indexOf("}", i);
      const key = tpl.slice(i + 1, j);
      if (/^((g|v|m|c)\.[A-Za-z0-9_]+|ans|ansn)$/.test(key)) {
        const v = lookup(key);
        if (v === undefined) throw new Error(`Unknown placeholder {${key}} in ${ctxName}`);
        out += v; i = j; continue;
      }
    }
    out += ch;
  }
  return out;
}

export function nq(spec: NQSpec): PhysNumQ {
  const gv: Record<string, Given> = {};
  for (const [k, v] of Object.entries(spec.g)) gv[k] = parseGiven(k, v);
  const s: Record<string, number> = {};
  for (const [k, v] of Object.entries(gv)) s[k] = v.si;

  const value = spec.calc(s);
  if (!Number.isFinite(value)) throw new Error(`${spec.id}: calc() is not finite`);
  const mid = spec.mid ? spec.mid(s) : {};
  const target = spec.target ?? spec.rels[spec.rels.length - 1][0];

  const unit = spec.unit ? parseUnit(spec.unit) : null;
  if (spec.unit && !unit) throw new Error(`${spec.id}: unreadable answer unit "${spec.unit}"`);
  const dim: Dim = unit ? unit.dim : ZERO;
  const inUnit = unit ? value / unit.scale : value;
  const an = fmtNum(inUnit);
  const a = spec.unit ? `${an}\\ ${unitTex(spec.unit)}` : an;

  const consts = Object.fromEntries((spec.consts ?? []).map((c) => [c, CONSTS[c].value]));
  const lookup = (key: string): string | undefined => {
    if (key === "ans") return a;
    if (key === "ansn") return an;
    if (key.startsWith("g.")) return gv[key.slice(2)]?.tex;
    if (key.startsWith("v.")) return gv[key.slice(2)] ? fmtNum(gv[key.slice(2)].si) : undefined;
    if (key.startsWith("m.")) return key.slice(2) in mid ? fmtNum(mid[key.slice(2)]) : undefined;
    if (key.startsWith("c.")) return key.slice(2) in CONSTS ? CONSTS[key.slice(2) as ConstName].tex : undefined;
    return gv[key]?.tex;
  };

  let text = fill(spec.q, lookup, `${spec.id} text`);
  if (spec.consts?.length && !spec.noConstNote) {
    const parts = spec.consts.map((c) => `$${CONSTS[c].label} = ${CONSTS[c].tex}\\ ${unitTex(CONSTS[c].unit)}$`);
    text += ` Take ${parts.join(", ")}.`;
  }
  const steps = spec.steps.map((st, i) => fill(st, lookup, `${spec.id} step ${i + 1}`));

  const symbols = Object.keys(spec.sym);
  return {
    id: spec.id,
    tag: spec.tag,
    level: spec.level,
    text,
    sym: spec.sym,
    eq: {
      target,
      rels: spec.rels,
      symbols,
      consts,
      ranges: spec.ranges,
      aka: spec.aka,
      mustInclude: spec.mustInclude,
      actual: { ...s, ...(spec.rels.length ? { [target]: value } : {}) },
      traps: spec.eqTraps,
    },
    eqShow: spec.show,
    ans: { value, dim, unit: spec.unit, tol: spec.tol ?? 0.03, needUnit: spec.needUnit ?? false, traps: spec.numTraps },
    ansShow: `$${a}$`,
    hint: spec.hint,
    steps,
  };
}

export { C };
