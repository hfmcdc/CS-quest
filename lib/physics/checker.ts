/**
 * Physics answer checking. Pure TypeScript, no eval(), no dependencies.
 *
 *  1. checkEquation(): decides whether a typed equation is mathematically equivalent to any accepted form.
 *     Two equations are equivalent when they have the same solutions: for random values of every symbol but one
 *     ("the pivot"), the pivot is solved from one equation and substituted into the other, in both directions.
 *     So F = qvB sin(theta), B = F/(q v sin(theta)) and "F/(qB sin(theta)) = v" are all accepted.
 *  2. checkAnswer(): reads "4.8e-14 N", "4.8 x 10^-14 N", "0.314 mT" ... and compares the value in SI units, so
 *     "mT" and "T" are both fine as long as the dimensions and magnitude agree.
 */

// ------------------------------------------------------------------ equation parsing
export class PhysParseError extends Error {}

type Node =
  | { t: "num"; v: number }
  | { t: "var"; n: string }
  | { t: "neg"; a: Node }
  | { t: "bin"; op: "+" | "-" | "*" | "/" | "^"; a: Node; b: Node }
  | { t: "fn"; f: "sin" | "cos" | "tan" | "sqrt"; a: Node };

/** Typed aliases for symbols whose canonical name is not what a student would type. */
const ALIASES: Record<string, string[]> = {
  theta: ["theta", "θ"],
  phi: ["phi", "φ", "ϕ"],
  mu0: ["mu0", "μ0"],
  omega: ["omega", "ω"],
  tau: ["tau", "τ"],
  nu: ["nu", "ν"],
  alpha: ["alpha", "α"],
  l: ["l", "L", "ℓ"],
};

/** What the student sees as the list of allowed symbols, e.g. "F, q, v, B, θ". */
export const SYMBOL_LABEL: Record<string, string> = { theta: "θ", phi: "φ", mu0: "μ₀", omega: "ω", tau: "τ", nu: "ν", l: "l (or L)", alpha: "α" };

export function symbolHelp(vars: string[]): string {
  return vars.map((v) => SYMBOL_LABEL[v] ?? v.replace(/(\d)$/, (d) => "₀₁₂₃₄₅₆₇₈₉"[Number(d)])).join(", ");
}

function normalise(src: string): string {
  let s = src.trim();
  s = s
    .replace(/[\u2212\u2013\u2014]/g, "-")
    .replace(/[\u00d7\u00b7\u22c5\u2219]/g, "*")
    .replace(/\u00f7/g, "/")
    .replace(/\u00b5/g, "\u03bc")
    .replace(/\u221a/g, "sqrt")
    .replace(/\u03c0/g, "pi")
    .replace(/\u00b2/g, "^2")
    .replace(/\u00b3/g, "^3")
    .replace(/[\u2080-\u2089]/g, (d) => String(d.charCodeAt(0) - 0x2080))
    .replace(/\\(sin|cos|tan|sqrt|theta|pi|mu|omega|tau|phi|cdot|times)/g, "$1");
  // subscripts first, so a closing bracket after one is never swallowed: I_g -> Ig, mu_0 -> mu0, I_{1} -> I1
  s = s.replace(/_\{\s*([A-Za-z0-9]+)\s*\}/g, "$1").replace(/_([A-Za-z0-9]+)/g, "$1");
  return s.replace(/[{[]/g, "(").replace(/[}\]]/g, ")");
}

interface Tok { k: "num" | "var" | "fn" | "op"; v: string }

function tokenise(s: string, names: string[]): Tok[] {
  const table: { alias: string; name: string }[] = [];
  for (const n of names) for (const a of ALIASES[n] ?? [n]) table.push({ alias: a, name: n });
  table.sort((a, b) => b.alias.length - a.alias.length);
  const out: Tok[] = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (/\s/.test(c)) { i++; continue; }
    const num = /^(\d+\.?\d*|\.\d+)/.exec(s.slice(i));
    if (num) { out.push({ k: "num", v: num[0] }); i += num[0].length; continue; }
    const fn = (["sqrt", "sin", "cos", "tan"] as const).find((f) => s.startsWith(f, i));
    if (fn && !table.some((t) => t.alias.length > fn.length && s.startsWith(t.alias, i))) { out.push({ k: "fn", v: fn }); i += fn.length; continue; }
    if (s.startsWith("pi", i)) { out.push({ k: "num", v: String(Math.PI) }); i += 2; continue; }
    const hit = table.find((t) => s.startsWith(t.alias, i));
    if (hit) { out.push({ k: "var", v: hit.name }); i += hit.alias.length; continue; }
    if ("+-*/^()=".includes(c)) { out.push({ k: "op", v: c }); i++; continue; }
    throw new PhysParseError(`I don't recognise “${c}”.`);
  }
  return out;
}

class Parser {
  p = 0;
  /** tight: juxtaposition (mv, qB) binds tighter than / and *, so mv/qB = (mv)/(qB).
   *  loose: everything is left to right, so mv/qB = ((mv)/q)B. A student's equation is accepted if either reading matches. */
  constructor(private t: Tok[], private tight = true) {}
  private peek() { return this.t[this.p]; }
  private isOp(v: string) { const x = this.peek(); return !!x && x.k === "op" && x.v === v; }
  private expectOp(v: string) { if (!this.isOp(v)) throw new PhysParseError(`Expected “${v}”.`); this.p++; }
  private startsAtom() { const x = this.peek(); return !!x && (x.k === "num" || x.k === "var" || x.k === "fn" || (x.k === "op" && x.v === "(")); }

  all(): Node {
    if (!this.t.length) throw new PhysParseError("One side of the equation is empty.");
    const n = this.expr();
    if (this.p < this.t.length) throw new PhysParseError("I couldn't read part of that expression.");
    return n;
  }
  private expr(): Node {
    let a = this.term();
    while (this.isOp("+") || this.isOp("-")) {
      const op = (this.t[this.p++] as Tok).v as "+" | "-";
      a = { t: "bin", op, a, b: this.term() };
    }
    return a;
  }
  /** Explicit * and /. Juxtaposition (mv, qB, 2πr) binds tighter, so "mv/qB" means (mv)/(qB). */
  private term(): Node {
    let a = this.unary();
    for (;;) {
      if (!this.tight && this.startsAtom()) a = { t: "bin", op: "*", a, b: this.power() };
      else if (this.isOp("*")) { this.p++; a = { t: "bin", op: "*", a, b: this.unary() }; }
      else if (this.isOp("/")) {
        this.p++;
        // "1/2 mv^2" is one half times mv^2, not 1/(2mv^2): a bare number over a bare number stops there.
        if (a.t === "num" && this.peek()?.k === "num") {
          const d = this.power();
          a = { t: "bin", op: "/", a, b: d };
          while (this.startsAtom()) a = { t: "bin", op: "*", a, b: this.power() };
        } else a = { t: "bin", op: "/", a, b: this.unary() };
      } else break;
    }
    return a;
  }
  private unary(): Node {
    if (this.isOp("-")) { this.p++; return { t: "neg", a: this.unary() }; }
    if (this.isOp("+")) { this.p++; return this.unary(); }
    return this.implicit();
  }
  private implicit(): Node {
    let a = this.power();
    while (this.tight && this.startsAtom()) a = { t: "bin", op: "*", a, b: this.power() };
    return a;
  }
  private power(): Node {
    const base = this.atom();
    if (this.isOp("^")) { this.p++; return { t: "bin", op: "^", a: base, b: this.expUnary() }; }
    return base;
  }
  private expUnary(): Node {
    if (this.isOp("-")) { this.p++; return { t: "neg", a: this.expUnary() }; }
    return this.power();
  }
  private atom(): Node {
    const x = this.t[this.p++];
    if (!x) throw new PhysParseError("The expression ends too early.");
    if (x.k === "num") return { t: "num", v: parseFloat(x.v) };
    if (x.k === "var") return { t: "var", n: x.v };
    if (x.k === "fn") {
      const f = x.v as "sin" | "cos" | "tan" | "sqrt";
      if (this.isOp("(")) { this.p++; const e = this.expr(); this.expectOp(")"); return this.maybePow({ t: "fn", f, a: e }); }
      if (this.isOp("^")) { // sin^2(theta)
        this.p++; const ex = this.expUnary(); this.expectOp("("); const e = this.expr(); this.expectOp(")");
        return { t: "bin", op: "^", a: { t: "fn", f, a: e }, b: ex };
      }
      return { t: "fn", f, a: this.power() };
    }
    if (x.v === "(") { const e = this.expr(); this.expectOp(")"); return e; }
    throw new PhysParseError(`Unexpected “${x.v}”.`);
  }
  private maybePow(n: Node): Node { return n; }
}

export interface Eq { l: Node; r: Node }

export function parseEquation(src: string, names: string[], tight = true): Eq {
  const s = normalise(src);
  const parts = s.split("=");
  if (parts.length < 2 || parts[0].trim() === "") throw new PhysParseError("Write a full equation with an “=” sign, for example  F = …");
  if (parts.length > 2) throw new PhysParseError("Use a single “=” sign: one equation, not a chain.");
  const l = new Parser(tokenise(parts[0], names), tight).all();
  const r = new Parser(tokenise(parts[1], names), tight).all();
  return { l, r };
}

function ev(n: Node, env: Record<string, number>): number {
  switch (n.t) {
    case "num": return n.v;
    case "var": return env[n.n] ?? NaN;
    case "neg": return -ev(n.a, env);
    case "fn": { const a = ev(n.a, env); return n.f === "sin" ? Math.sin(a) : n.f === "cos" ? Math.cos(a) : n.f === "tan" ? Math.tan(a) : a >= 0 ? Math.sqrt(a) : NaN; }
    case "bin": {
      const a = ev(n.a, env), b = ev(n.b, env);
      return n.op === "+" ? a + b : n.op === "-" ? a - b : n.op === "*" ? a * b : n.op === "/" ? a / b : Math.pow(a, b);
    }
  }
}

function usedVars(n: Node, out = new Set<string>()): Set<string> {
  if (n.t === "var") out.add(n.n);
  else if (n.t === "neg" || n.t === "fn") usedVars(n.a, out);
  else if (n.t === "bin") { usedVars(n.a, out); usedVars(n.b, out); }
  return out;
}

const g = (e: Eq, env: Record<string, number>) => ev(e.l, env) - ev(e.r, env);
const scale = (e: Eq, env: Record<string, number>) => Math.abs(ev(e.l, env)) + Math.abs(ev(e.r, env)) + 1e-300;

/** Find a positive root of eq in `pivot`, scanning a log grid for a sign change and bisecting. */
function solvePivot(e: Eq, env: Record<string, number>, pivot: string, lo = 1e-3, hi = 1e3): number | null {
  const N = 240;
  let prevX = lo, prevG = g(e, { ...env, [pivot]: lo });
  for (let i = 1; i <= N; i++) {
    const x = lo * Math.pow(hi / lo, i / N);
    const gx = g(e, { ...env, [pivot]: x });
    if (Number.isFinite(prevG) && Number.isFinite(gx) && (prevG === 0 || prevG * gx < 0)) {
      let a = prevX, b = x, ga = prevG;
      for (let k = 0; k < 100; k++) {
        const m = (a + b) / 2;
        const gm = g(e, { ...env, [pivot]: m });
        if (!Number.isFinite(gm)) break;
        if (ga * gm <= 0) b = m; else { a = m; ga = gm; }
      }
      const root = (a + b) / 2;
      const gr = g(e, { ...env, [pivot]: root });
      if (Number.isFinite(gr) && Math.abs(gr) <= 1e-6 * scale(e, { ...env, [pivot]: root })) return root; // a pole is not a root
    }
    prevX = x; prevG = gx;
  }
  return null;
}

/** Deterministic pseudo-random sequence so a verdict never changes between clicks. */
function rng(seed: number) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }

const near = (e: Eq, env: Record<string, number>) => Math.abs(g(e, env)) <= 1e-7 * scale(e, env);

/** true / false when decided, null when the two equations could not be compared. */
export function equivalent(a: Eq, b: Eq, names: string[]): boolean | null {
  const rand = rng(12345);
  let decided = 0;
  let nondegenerate = false;
  for (let trial = 0; trial < 60 && decided < 8; trial++) {
    const env: Record<string, number> = {};
    for (const n of names) env[n] = n === "theta" || n === "phi" ? 0.3 + rand() * 1.0 : 0.5 + rand() * 3;
    const pivot = names[trial % names.length];
    if (Math.abs(g(b, env)) > 1e-4 * scale(b, env)) nondegenerate = true;
    const ra = solvePivot(a, env, pivot);
    if (ra === null) continue;
    decided++;
    if (!near(b, { ...env, [pivot]: ra })) return false;
    const rb = solvePivot(b, env, pivot);
    if (rb !== null && !near(a, { ...env, [pivot]: rb })) return false;
  }
  if (decided < 4) return null;
  return nondegenerate;
}

export interface EqCheck { status: "correct" | "incorrect" | "unreadable"; message?: string }

export function checkEquation(input: string, accepted: string[], names: string[]): EqCheck {
  let readings: Eq[];
  try { readings = [parseEquation(input, names, true), parseEquation(input, names, false)]; } catch (e) {
    if (e instanceof PhysParseError) return { status: "unreadable", message: `${e.message} Symbols you can use: ${symbolHelp(names)}.` };
    throw e;
  }
  const used = usedVars(readings[0].l); usedVars(readings[0].r, used);
  if (used.size === 0) return { status: "incorrect", message: "Write the formula using symbols first, then substitute the numbers." };
  for (const m of accepted) {
    const model = parseEquation(m, names);
    if (readings.some((student) => equivalent(model, student, names) === true)) return { status: "correct" };
  }
  return { status: "incorrect" };
}

/** Solve `target` from an equation given numeric values for the other symbols (used by the verification script). */
export function solveFor(eqSrc: string, target: string, given: Record<string, number>, names: string[]): number | null {
  const e = parseEquation(eqSrc, names);
  return solvePivot(e, given, target, 1e-15, 1e15);
}
export function missingSymbols(eqSrc: string, names: string[], given: Record<string, number>, target: string): string[] {
  const e = parseEquation(eqSrc, names);
  const u = usedVars(e.l); usedVars(e.r, u);
  return [...u].filter((n) => n !== target && !(n in given));
}

// ------------------------------------------------------------------ units
type Dim = [number, number, number, number]; // kg, m, s, A
interface Unit { f: number; d: Dim }
const U = (f: number, d: Dim): Unit => ({ f, d });
const BASE: Record<string, Unit> = {
  m: U(1, [0, 1, 0, 0]), kg: U(1, [1, 0, 0, 0]), g: U(1e-3, [1, 0, 0, 0]), s: U(1, [0, 0, 1, 0]), A: U(1, [0, 0, 0, 1]),
  N: U(1, [1, 1, -2, 0]), T: U(1, [1, 0, -2, -1]), V: U(1, [1, 2, -3, -1]), "Ω": U(1, [1, 2, -3, -2]),
  J: U(1, [1, 2, -2, 0]), W: U(1, [1, 2, -3, 0]), Hz: U(1, [0, 0, -1, 0]), C: U(1, [0, 0, 1, 1]), Wb: U(1, [1, 2, -2, -1]),
  rad: U(1, [0, 0, 0, 0]),
};
const PREFIX: Record<string, number> = { p: 1e-12, n: 1e-9, "μ": 1e-6, m: 1e-3, c: 1e-2, k: 1e3, M: 1e6, G: 1e9 };

const ZERO: Unit = U(1, [0, 0, 0, 0]);
const mul = (a: Unit, b: Unit): Unit => U(a.f * b.f, a.d.map((x, i) => x + b.d[i]) as Dim);
const pow = (a: Unit, n: number): Unit => U(Math.pow(a.f, n), a.d.map((x) => x * n) as Dim);
const inv = (a: Unit) => pow(a, -1);

function lookup(sym: string): Unit | null {
  if (BASE[sym]) return BASE[sym];
  if (sym.length > 1 && PREFIX[sym[0]] !== undefined && BASE[sym.slice(1)]) return U(PREFIX[sym[0]] * BASE[sym.slice(1)].f, BASE[sym.slice(1)].d);
  return null;
}
/** Split a run of letters such as "Nm", "Am" or "mT" into unit symbols (prefixed symbols are preferred). */
function splitRun(run: string): Unit[] | null {
  if (!run) return [];
  for (let i = run.length; i >= 1; i--) {
    const head = lookup(run.slice(0, i));
    if (!head) continue;
    const rest = splitRun(run.slice(i));
    if (rest) return [head, ...rest];
  }
  return null;
}

function normUnit(s: string): string {
  return s
    .replace(/[\u2212\u2013\u2014]/g, "-")
    .replace(/[\u00b7\u22c5\u00d7*]/g, " ")
    .replace(/\u00b5|(?<![A-Za-z])u(?=[A-Za-z])/g, "μ")
    .replace(/\u2126|\bohms?\b/gi, "Ω")
    .replace(/[\u207b]?[\u00b9\u00b2\u00b3\u2070-\u2079]+/g, (m) => "^" + m.replace(/\u207b/g, "-").replace(/\u00b9/g, "1").replace(/\u00b2/g, "2").replace(/\u00b3/g, "3").replace(/[\u2070-\u2079]/g, (d) => String(d.charCodeAt(0) - 0x2070)))
    .replace(/\u207b/g, "-")
    .replace(/\btesla\b/gi, "T").replace(/\bnewtons?\b/gi, "N").replace(/\bamperes?\b|\bamps?\b/gi, "A")
    .replace(/\bvolts?\b/gi, "V").replace(/\bmetres?\b|\bmeters?\b/gi, "m").replace(/\bseconds?\b/gi, "s")
    .replace(/\bradians?\b/gi, "rad").replace(/\bhertz\b/gi, "Hz").replace(/\bjoules?\b/gi, "J").replace(/\bweber\b/gi, "Wb")
    .replace(/\bcoulombs?\b/gi, "C").replace(/[{}]/g, (c) => (c === "{" ? "(" : ")"))
    .trim();
}

type UTok = { k: "id" | "num" | "op"; v: string };
function utokens(s: string): UTok[] {
  const out: UTok[] = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (/\s/.test(c)) { i++; continue; }
    const n = /^[+-]?\d+/.exec(s.slice(i));
    if (n && out.length && out[out.length - 1].v === "^") { out.push({ k: "num", v: n[0] }); i += n[0].length; continue; }
    if ("/^()".includes(c)) { out.push({ k: "op", v: c }); i++; continue; }
    const id = /^[A-Za-zΩμ]+/.exec(s.slice(i));
    if (id) { out.push({ k: "id", v: id[0] }); i += id[0].length; continue; }
    return [];
  }
  return out;
}

/** mode "single": "/" divides only the next factor. mode "rest": "/" divides everything that follows. */
function parseUnit(src: string, mode: "single" | "rest"): Unit | null {
  const t = utokens(normUnit(src));
  if (!t.length && normUnit(src) !== "") return null;
  let p = 0;
  const isOp = (v: string) => t[p]?.k === "op" && t[p].v === v;
  function factor(): Unit | null {
    let base: Unit[] | null;
    if (isOp("(")) { p++; const e = seq(); if (!e || !isOp(")")) return null; p++; base = [e]; }
    else if (t[p]?.k === "id") base = splitRun(t[p++].v); else return null;
    if (!base) return null;
    let exp = 1;
    if (isOp("^")) { p++; if (t[p]?.k !== "num") return null; exp = parseInt(t[p++].v, 10); }
    const last = base[base.length - 1];
    let r = ZERO;
    base.forEach((b, i) => { r = mul(r, i === base.length - 1 ? pow(last, exp) : b); });
    return r;
  }
  function seq(): Unit | null {
    let acc = ZERO;
    let first = true;
    while (p < t.length && !isOp(")")) {
      if (isOp("/")) {
        p++;
        if (mode === "single") { const f = factor(); if (!f) return null; acc = mul(acc, inv(f)); }
        else { const rest = seqNoSlash(); if (!rest) return null; acc = mul(acc, inv(rest)); }
        first = false; continue;
      }
      const f = factor(); if (!f) return null; acc = mul(acc, f); first = false;
    }
    return first ? null : acc;
  }
  function seqNoSlash(): Unit | null {
    let acc = ZERO; let any = false;
    while (p < t.length && !isOp(")") && !isOp("/")) { const f = factor(); if (!f) return null; acc = mul(acc, f); any = true; }
    return any ? acc : null;
  }
  if (!t.length) return ZERO;
  const r = seq();
  return r && p === t.length ? r : null;
}

// ------------------------------------------------------------------ numeric answers
export interface AnsCheck { status: "correct" | "incorrect" | "unreadable"; message?: string }

const SUP: Record<string, string> = { "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9", "⁻": "-", "⁺": "+" };

/** Split "4.8 x 10^-14 N" into its value and the unit text. */
export function splitAnswer(raw: string): { value: number; unit: string } | null {
  let s = raw.trim().replace(/[\u2212\u2013\u2014]/g, "-").replace(/,/g, "");
  s = s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]+/g, (m) => {
    // a superscript directly after "10" is an exponent; after a unit letter it is handled by normUnit later
    return "^" + [...m].map((c) => SUP[c]).join("");
  });
  const m = /^([+-]?\s*(?:\d+\.?\d*|\.\d+))?\s*(?:(?:[eE]\s*([+-]?\d+)(?![A-Za-z]))|(?:(?:[x×*·⋅]|\\times)\s*10\s*(?:\^|\*\*)?\s*[({]?\s*([+-]?\s*\d+)\s*[)}]?))?/.exec(s);
  if (!m) return null;
  let mant: number;
  if (m[1] === undefined || m[1].trim() === "") {
    const only10 = /^10\s*\^\s*[({]?\s*([+-]?\s*\d+)\s*[)}]?/.exec(s);
    if (!only10) return null;
    return { value: Math.pow(10, parseInt(only10[1].replace(/\s/g, ""), 10)), unit: s.slice(only10[0].length).trim() };
  } else mant = parseFloat(m[1].replace(/\s/g, ""));
  const ex = m[2] ?? m[3];
  const value = ex !== undefined ? mant * Math.pow(10, parseInt(ex.replace(/\s/g, ""), 10)) : mant;
  let rest = s.slice(m[0].length).trim();
  if (rest.startsWith("^")) rest = rest.slice(1); // stray "^" from a superscript glued to the number
  return Number.isFinite(value) ? { value, unit: rest } : null;
}

export function formatPrompt(unit: string): string { return unit === "" ? "a pure number (no unit)" : "a number with its unit"; }

/**
 * expectedValue is in SI, expectedUnit is any equivalent unit string (e.g. "N m^-1"). tol is relative.
 * traps: wrong values that come from a known mistake, used to give a pointed message.
 */
export function checkAnswer(input: string, expectedValue: number, expectedUnit: string, tol = 0.03, traps: { value: number; msg: string }[] = []): AnsCheck {
  const sp = splitAnswer(input);
  if (!sp) return { status: "unreadable", message: "I couldn't read a number there. Try something like 4.8e-14 N or 4.8 × 10^-14 N." };
  const exp = parseUnit(expectedUnit, "single") ?? ZERO;
  let have: Unit | null = null;
  if (sp.unit === "") {
    if (expectedUnit !== "" && expectedUnit !== "rad") return { status: "incorrect", message: "Your answer needs a unit." };
    have = ZERO;
  } else {
    const dims = [parseUnit(sp.unit, "single"), parseUnit(sp.unit, "rest")].filter((x): x is Unit => !!x);
    if (!dims.length) return { status: "unreadable", message: "I couldn't read that unit. Use symbols like N, T, A, m, s, Ω, N/m or A m^2." };
    have = dims.find((u) => u.d.every((x, i) => x === exp.d[i])) ?? dims[0];
  }
  if (!have.d.every((x, i) => x === exp.d[i])) return { status: "incorrect", message: "The unit does not have the right dimensions for this quantity." };
  const si = sp.value * have.f;
  const target = expectedValue;
  if (Math.abs(si - target) <= tol * Math.abs(target)) return { status: "correct" };
  const trap = traps.find((t) => Math.abs(si - t.value) <= tol * Math.abs(t.value));
  if (trap) return { status: "incorrect", message: trap.msg };
  const ratio = si / target;
  const k = Math.round(Math.log10(Math.abs(ratio)));
  if (k !== 0 && Math.abs(Math.abs(ratio) / Math.pow(10, k) - 1) < 0.05) return { status: "incorrect", message: "The digits look right but the power of ten (or unit prefix) is off." };
  return { status: "incorrect" };
}
