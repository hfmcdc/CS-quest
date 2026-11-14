/**
 * A small, safe expression parser used to check maths answers.
 * It never uses eval(). Supported input examples:
 *   2pi/3, sqrt(61)/2, 5sqrt(3), x^3/3 + 2sin(x), ln|x|, e^(x^2)/2,
 *   asin((2x-3)/sqrt(41)), sin^-1(x), 1/2 tan^-1((x-3)/2), sin2x
 * "log" means the natural logarithm (as in CBSE integration answers).
 */

export class ParseError extends Error {}

export type Node =
  | { t: "num"; v: number }
  | { t: "var"; name: string }
  | { t: "neg"; a: Node }
  | { t: "bin"; op: "+" | "-" | "*" | "/" | "^"; a: Node; b: Node }
  | { t: "fn"; name: string; a: Node };

type Tok = { t: "num"; v: number } | { t: "id"; v: string } | { t: "fn"; v: string } | { t: "op"; v: string };

const FN_NAMES = [
  "arccosec", "arcsin", "arccos", "arctan", "arccot", "arcsec", "arccsc", "acosec",
  "asin", "acos", "atan", "acot", "asec", "acsc",
  "cosec", "sin", "cos", "tan", "cot", "sec", "csc",
  "sqrt", "exp", "abs", "ln", "log",
].sort((a, b) => b.length - a.length);

const FN_ALIAS: Record<string, string> = {
  arcsin: "asin", arccos: "acos", arctan: "atan", arccot: "acot", arcsec: "asec", arccsc: "acsc",
  arccosec: "acsc", acosec: "acsc", cosec: "csc", log: "ln",
};

export function normalize(src: string): string {
  let s = src.toLowerCase();
  s = s
    .replace(/[\u2212\u2013\u2014]/g, "-")
    .replace(/[\u00d7\u00b7\u22c5]/g, "*")
    .replace(/\u00f7/g, "/")
    .replace(/\u03c0/g, "pi")
    .replace(/\u221a/g, "sqrt")
    .replace(/\u00b0/g, "")
    .replace(/\u00b2/g, "^2")
    .replace(/\u00b3/g, "^3")
    .replace(/\u00bd/g, "(1/2)")
    .replace(/\u00bc/g, "(1/4)")
    .replace(/\u00be/g, "(3/4)")
    .replace(/\*\*/g, "^");
  // sin^-1 / sin⁻¹ -> asin (inverse function, not a reciprocal)
  s = s.replace(/(sin|cos|tan|cot|sec|cosec|csc)\s*(?:\u207b\u00b9|\^\s*\(?\s*-\s*1\s*\)?)/g, "a$1");
  s = s.replace(/[{[]/g, "(").replace(/[}\]]/g, ")");
  s = s.replace(/degrees?|deg\b/g, "");
  return s;
}

function tokenize(s: string): Tok[] {
  const toks: Tok[] = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (/\s/.test(c)) { i++; continue; }
    const num = /^(\d+\.?\d*|\.\d+)/.exec(s.slice(i));
    if (num) { toks.push({ t: "num", v: parseFloat(num[0]) }); i += num[0].length; continue; }
    const fn = FN_NAMES.find((f) => s.startsWith(f, i));
    if (fn) { toks.push({ t: "fn", v: FN_ALIAS[fn] ?? fn }); i += fn.length; continue; }
    if (s.startsWith("pi", i)) { toks.push({ t: "id", v: "pi" }); i += 2; continue; }
    if (/[a-z]/.test(c)) { toks.push({ t: "id", v: c }); i++; continue; }
    if ("+-*/^()|".includes(c)) { toks.push({ t: "op", v: c }); i++; continue; }
    throw new ParseError(`Unexpected character "${c}"`);
  }
  return toks;
}

class Parser {
  pos = 0;
  constructor(private toks: Tok[]) {}

  private peek(): Tok | undefined { return this.toks[this.pos]; }
  private isOp(v: string): boolean { const t = this.peek(); return !!t && t.t === "op" && t.v === v; }
  private expectOp(v: string): void {
    if (!this.isOp(v)) throw new ParseError(`Expected "${v}"`);
    this.pos++;
  }

  parseAll(): Node {
    if (!this.toks.length) throw new ParseError("Empty expression");
    const n = this.expr();
    if (this.pos < this.toks.length) throw new ParseError("Unexpected input");
    return n;
  }

  private expr(): Node {
    let a = this.term();
    while (this.isOp("+") || this.isOp("-")) {
      const op = (this.toks[this.pos++] as { v: string }).v as "+" | "-";
      a = { t: "bin", op, a, b: this.term() };
    }
    return a;
  }

  private startsImplicit(): boolean {
    const t = this.peek();
    if (!t) return false;
    return t.t === "id" || t.t === "fn" || (t.t === "op" && t.v === "(");
  }

  private term(): Node {
    let a = this.unary();
    for (;;) {
      if (this.isOp("*") || this.isOp("/")) {
        const op = (this.toks[this.pos++] as { v: string }).v as "*" | "/";
        a = { t: "bin", op, a, b: this.unary() };
      } else if (this.startsImplicit()) {
        a = { t: "bin", op: "*", a, b: this.power() };
      } else break;
    }
    return a;
  }

  private unary(): Node {
    if (this.isOp("-")) { this.pos++; return { t: "neg", a: this.unary() }; }
    if (this.isOp("+")) { this.pos++; return this.unary(); }
    return this.power();
  }

  private power(): Node {
    const base = this.primary();
    if (this.isOp("^")) {
      this.pos++;
      return { t: "bin", op: "^", a: base, b: this.unary() };
    }
    return base;
  }

  private primary(): Node {
    const t = this.toks[this.pos++];
    if (!t) throw new ParseError("Unexpected end of input");
    if (t.t === "num") return { t: "num", v: t.v };
    if (t.t === "id") {
      if (t.v === "x" || t.v === "e" || t.v === "pi") return { t: "var", name: t.v };
      throw new ParseError(`Unknown symbol "${t.v}"`);
    }
    if (t.t === "fn") return this.fnApply(t.v);
    if (t.v === "(") { const e = this.expr(); this.expectOp(")"); return e; }
    if (t.v === "|") { const e = this.expr(); this.expectOp("|"); return { t: "fn", name: "abs", a: e }; }
    throw new ParseError(`Unexpected "${t.v}"`);
  }

  private fnApply(name: string): Node {
    if (this.isOp("^")) { // sin^2(x)
      this.pos++;
      let neg = false;
      if (this.isOp("-")) { neg = true; this.pos++; }
      let e = this.primary();
      if (neg) e = { t: "neg", a: e };
      const arg = this.fnArg();
      return { t: "bin", op: "^", a: { t: "fn", name, a: arg }, b: e };
    }
    return { t: "fn", name, a: this.fnArg() };
  }

  private fnArg(): Node {
    if (this.isOp("(")) { this.pos++; const e = this.expr(); this.expectOp(")"); return e; }
    if (this.isOp("|")) { this.pos++; const e = this.expr(); this.expectOp("|"); return { t: "fn", name: "abs", a: e }; }
    // bracket-free argument such as sin2x, ln x, sqrt61: [number] [symbol] [^power]
    let n: Node | null = null;
    const t = this.peek();
    if (t && t.t === "num") { this.pos++; n = { t: "num", v: t.v }; }
    const u = this.peek();
    if (u && u.t === "id") {
      const atom = this.primary();
      n = n ? { t: "bin", op: "*", a: n, b: atom } : atom;
    }
    if (!n) throw new ParseError("A function is missing its argument");
    if (this.isOp("^")) { this.pos++; n = { t: "bin", op: "^", a: n, b: this.unary() }; }
    return n;
  }
}

export function parseExpr(src: string): Node {
  return new Parser(tokenize(normalize(src))).parseAll();
}

export function usesX(n: Node): boolean {
  switch (n.t) {
    case "num": return false;
    case "var": return n.name === "x";
    case "neg": return usesX(n.a);
    case "fn": return usesX(n.a);
    case "bin": return usesX(n.a) || usesX(n.b);
  }
}

export type Fn1 = (x: number) => number;

export function compile(n: Node): Fn1 {
  switch (n.t) {
    case "num": { const v = n.v; return () => v; }
    case "var":
      if (n.name === "x") return (x) => x;
      if (n.name === "e") return () => Math.E;
      return () => Math.PI;
    case "neg": { const a = compile(n.a); return (x) => -a(x); }
    case "bin": {
      const a = compile(n.a);
      const b = compile(n.b);
      switch (n.op) {
        case "+": return (x) => a(x) + b(x);
        case "-": return (x) => a(x) - b(x);
        case "*": return (x) => a(x) * b(x);
        case "/": return (x) => a(x) / b(x);
        default: return (x) => Math.pow(a(x), b(x));
      }
    }
    case "fn": {
      const a = compile(n.a);
      const f = FUNCS[n.name];
      if (!f) throw new ParseError(`Unknown function ${n.name}`);
      return (x) => f(a(x));
    }
  }
}

const FUNCS: Record<string, Fn1> = {
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  cot: (v) => 1 / Math.tan(v),
  sec: (v) => 1 / Math.cos(v),
  csc: (v) => 1 / Math.sin(v),
  asin: Math.asin,
  acos: Math.acos,
  atan: Math.atan,
  acot: (v) => Math.PI / 2 - Math.atan(v),
  asec: (v) => Math.acos(1 / v),
  acsc: (v) => Math.asin(1 / v),
  ln: (v) => (v > 0 ? Math.log(v) : NaN),
  exp: Math.exp,
  sqrt: (v) => (v >= 0 ? Math.sqrt(v) : NaN),
  abs: Math.abs,
};

/** Evaluate an expression that must not contain x (e.g. "2pi/3", "sqrt(61)/2"). */
export function evalConst(src: string): number {
  const node = parseExpr(src);
  if (usesX(node)) throw new ParseError("Expected a number, not an expression in x");
  const v = compile(node)(0);
  if (!Number.isFinite(v)) throw new ParseError("That value is not a finite number");
  return v;
}

/** Sample points across [lo, hi] (deterministic, well spread, avoids the exact end-points). */
export function samplePoints(domain: [number, number], n = 14): number[] {
  const [lo, hi] = domain;
  const pts: number[] = [];
  for (let i = 0; i < n; i++) {
    const t = ((i + 1) * 0.6180339887498949) % 1;
    pts.push(lo + (hi - lo) * (0.03 + 0.94 * t));
  }
  return pts;
}

export type EquivResult = "equal" | "different" | "unknown";

/**
 * Compare two expressions in x numerically over a domain.
 * mode "constant": the expressions may differ by an additive constant (antiderivatives).
 */
export function compareExpr(student: Node, model: Node, domain: [number, number], mode: "exact" | "constant"): EquivResult {
  const fs = compile(student);
  const fm = compile(model);
  let valid = 0;
  let base: number | undefined;
  for (const x of samplePoints(domain)) {
    const a = fs(x);
    const b = fm(x);
    if (!Number.isFinite(a) || !Number.isFinite(b)) continue;
    valid++;
    const tol = 1e-7 * (1 + Math.abs(a) + Math.abs(b));
    if (mode === "exact") {
      if (Math.abs(a - b) > tol) return "different";
    } else {
      const d = a - b;
      if (base === undefined) base = d;
      else if (Math.abs(d - base) > tol) return "different";
    }
  }
  return valid >= 6 ? "equal" : "unknown";
}

/** Split on commas / semicolons / colons that are not inside brackets. */
function splitTop(s: string, seps: string): string[] {
  const out: string[] = [];
  let depth = 0;
  let cur = "";
  for (const ch of s) {
    if (ch === "(" || ch === "[" || ch === "<") depth++;
    if (ch === ")" || ch === "]" || ch === ">") depth--;
    if (depth === 0 && seps.includes(ch)) { out.push(cur); cur = ""; } else cur += ch;
  }
  out.push(cur);
  return out;
}

/** Parse "(a, b, c)", "a, b, c" or "a i + b j + c k" into numbers. */
export function parseNumberList(src: string, expected?: number): number[] {
  let s = src.trim();
  const wrapped = /^[([<].*[)\]>]$/.test(s) && splitTop(s.slice(1, -1), ",;:").length > 1;
  if (wrapped) s = s.slice(1, -1);
  const parts = splitTop(s, ",;:").map((p) => p.trim());
  if (parts.some((p) => p === "")) throw new ParseError("Empty entry in list");
  const vals = parts.map((p) => evalConst(p));
  if (expected !== undefined && vals.length !== expected) throw new ParseError(`Expected ${expected} values`);
  return vals;
}

/** Parse a vector typed as components or as i, j, k terms. */
export function parseVectorInput(src: string): number[] {
  let s = src.trim().toLowerCase();
  s = s.replace(/\u00ee/g, "i").replace(/\u0135/g, "j").replace(/[\u0302\u0307]/g, "");
  s = s.replace(/[\u2212\u2013\u2014]/g, "-").replace(/\u03c0/g, "pi");
  if (/[,;:]/.test(s)) return parseNumberList(s, 3);
  if (!/[ijk]/.test(s)) throw new ParseError("Could not read the vector");
  // split into signed terms at top-level + or -
  const terms: string[] = [];
  let depth = 0;
  let cur = "";
  for (let idx = 0; idx < s.length; idx++) {
    const ch = s[idx];
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    const prev = cur.trim().slice(-1);
    const isBoundary = depth === 0 && (ch === "+" || ch === "-") && cur.trim() !== "" && !"+-*/^(".includes(prev);
    if (isBoundary) { terms.push(cur); cur = ch; } else cur += ch;
  }
  if (cur.trim()) terms.push(cur);
  const out = [0, 0, 0];
  for (const raw of terms) {
    const term = raw.replace(/\s+/g, "").replace(/\*$/, "");
    const basis = term.slice(-1);
    const idx = "ijk".indexOf(basis);
    if (idx < 0) throw new ParseError("Each term needs i, j or k");
    let coef = term.slice(0, -1);
    if (coef === "" || coef === "+") coef = "1";
    else if (coef === "-") coef = "-1";
    out[idx] += evalConst(coef);
  }
  return out;
}
