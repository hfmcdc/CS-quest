/**
 * Safe, symbol-aware expression parser for physics equations (never uses eval).
 *
 * The tokenizer is driven by the symbols a question allows, so "kq1q2/r^2", "k q_1 q_2 / r²" and
 * "1/(4πε0) q1 q2/r^2" all read correctly. Anything that cannot be read raises an EqParseError,
 * which the UI reports as "cannot verify automatically" rather than marking the student wrong.
 */

export class EqParseError extends Error {
  constructor(message: string, public kind: "unknown-symbol" | "syntax" = "syntax", public token = "") {
    super(message);
  }
}

export type Node =
  | { t: "num"; v: number }
  | { t: "var"; name: string }
  | { t: "neg"; a: Node }
  | { t: "bin"; op: "+" | "-" | "*" | "/" | "^"; a: Node; b: Node }
  | { t: "fn"; name: string; a: Node };

export interface SymbolTable {
  /** normalised alias → canonical name */
  aliases: Map<string, string>;
  /** aliases sorted longest first */
  sorted: string[];
  fns: Set<string>;
}

const GREEK: Record<string, string> = {
  "\u03b1": "alpha", "\u03b2": "beta", "\u03b3": "gamma", "\u03b4": "delta", "\u03b5": "eps", "\u03f5": "eps", "\u03b6": "zeta", "\u03b7": "eta",
  "\u03b8": "theta", "\u03d1": "theta", "\u03b9": "iota", "\u03ba": "kappa", "\u03bb": "lambda", "\u03bc": "mu", "\u00b5": "mu", "\u03bd": "nu",
  "\u03be": "xi", "\u03c1": "rho", "\u03c3": "sigma", "\u03c4": "tau", "\u03c6": "phi", "\u03d5": "phi", "\u03c7": "chi", "\u03c8": "psi", "\u03c9": "omega",
  "\u0394": "D", "\u03a6": "Phi", "\u03a9": "Omega", "\u2126": "Omega", "\u0398": "Theta", "\u039b": "Lambda",
};
const SUP: Record<string, string> = { "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9", "⁻": "-", "⁺": "+" };
const SUB: Record<string, string> = { "₀": "0", "₁": "1", "₂": "2", "₃": "3", "₄": "4", "₅": "5", "₆": "6", "₇": "7", "₈": "8", "₉": "9" };

/** Turn what a student typed (Unicode, LaTeX-ish, subscripts, superscripts) into plain ASCII the tokenizer understands. */
export function normaliseInput(src: string): string {
  let s = src;
  // LaTeX-ish input
  for (let guard = 0; guard < 8; guard++) {
    const before = s;
    s = s.replace(/\\[dt]?frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, "(($1)/($2))");
    s = s.replace(/\\sqrt\s*\{([^{}]*)\}/g, "sqrt($1)");
    if (s === before) break;
  }
  s = s.replace(/\\(?:left|right)/g, "").replace(/\\[,;! ]/g, " ").replace(/\\(?:cdot|times)/g, "*");
  s = s.replace(/\\([A-Za-z]+)/g, "$1");
  s = s.replace(/\^\s*\{([^{}]*)\}/g, "^($1)").replace(/_\s*\{([^{}]*)\}/g, "_$1");
  s = s.replace(/[{[]/g, "(").replace(/[}\]]/g, ")");
  // Unicode
  s = s.replace(/[−–—‐]/g, "-").replace(/[×·⋅∙]/g, "*").replace(/÷/g, "/").replace(/√/g, "sqrt").replace(/π/g, "pi");
  s = s.replace(/½/g, "(1/2)").replace(/¼/g, "(1/4)").replace(/¾/g, "(3/4)");
  s = s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]+/g, (m) => "^(" + [...m].map((c) => SUP[c] ?? c).join("") + ")");
  s = s.replace(/[₀₁₂₃₄₅₆₇₈₉]+/g, (m) => "_" + [...m].map((c) => SUB[c] ?? c).join(""));
  s = s.replace(/[\u03b1-\u03c9\u03d1\u03d5\u03f5\u00b5\u0394\u03a6\u03a9\u2126\u0398\u039b]/g, (c) => GREEK[c] ?? c);
  s = s.replace(/var(?:epsilon)|epsilon/gi, "eps").replace(/lamda/gi, "lambda");
  s = s.replace(/\*\*/g, "^");
  return s;
}

const FN_BASE = ["sin", "cos", "tan", "asin", "acos", "atan", "sqrt"];

/** Aliases a student may use for a canonical symbol name (all already in normalised form). */
export function aliasesFor(name: string, extra: string[] = []): string[] {
  const out = new Set<string>([name]);
  const dig = /^([A-Za-z]+?)(\d+)$/.exec(name);
  if (dig) out.add(`${dig[1]}_${dig[2]}`);
  const sub = /^([A-Z])([a-z]{1,6})$/.exec(name);
  if (sub) out.add(`${sub[1]}_${sub[2]}`);
  const both = /^([A-Z])([a-z]+)(\d+)$/.exec(name);
  if (both) out.add(`${both[1]}_${both[2]}${both[3]}`);
  for (const e of extra) out.add(normaliseInput(e));
  // "lam", "lam0" … are shorthand for λ, λ₀ …, so what a student types as λ must match
  if (/^lam(?!bda)/.test(name)) for (const a of aliasesFor(name.replace(/^lam/, "lambda"))) out.add(a);
  return [...out];
}

export function buildTable(names: string[], aka: Record<string, string[]> = {}, extraFns: string[] = []): SymbolTable {
  const aliases = new Map<string, string>();
  for (const n of names) for (const a of aliasesFor(n, aka[n])) if (!aliases.has(a)) aliases.set(a, n);
  return { aliases, sorted: [...aliases.keys()].sort((a, b) => b.length - a.length), fns: new Set([...FN_BASE, ...extraFns]) };
}

type Tok = { t: "num"; v: number } | { t: "var"; v: string } | { t: "fn"; v: string } | { t: "op"; v: string };

function tokenize(src: string, table: SymbolTable): Tok[] {
  const s = normaliseInput(src);
  const toks: Tok[] = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (/\s/.test(c)) { i++; continue; }
    const num = /^(\d+\.?\d*|\.\d+)(?:[eE]([+-]?\d+))?/.exec(s.slice(i));
    if (num) {
      toks.push({ t: "num", v: parseFloat(num[0]) });
      i += num[0].length;
      continue;
    }
    if ("+-*/^()=".includes(c)) { toks.push({ t: "op", v: c }); i++; continue; }
    if (c === "," ) { throw new EqParseError("Use only one equation per line.", "syntax", ","); }
    if (/[A-Za-z_]/.test(c)) {
      const rest = s.slice(i);
      // longest symbol alias
      let alias = "";
      for (const a of table.sorted) if (rest.startsWith(a)) { alias = a; break; }
      // "pi" is the number unless the question defines a longer symbol that starts with it
      if (rest.startsWith("pi") && alias.length < 3) { toks.push({ t: "num", v: Math.PI }); i += 2; continue; }
      // function names need an argument after them ("sin theta", "sin(theta)", "sqrt(LC)")
      let fn = "";
      for (const f of table.fns) {
        if (rest.startsWith(f) && f.length > fn.length) {
          const nxt = rest.slice(f.length).trimStart()[0];
          if (nxt !== undefined && /[A-Za-z0-9_.(^]/.test(nxt)) fn = f;
        }
      }
      if (fn && fn.length >= alias.length) { toks.push({ t: "fn", v: fn }); i += fn.length; continue; }
      if (alias) { toks.push({ t: "var", v: table.aliases.get(alias)! }); i += alias.length; continue; }
      const word = /^[A-Za-z_][A-Za-z0-9_]*/.exec(rest)![0];
      throw new EqParseError(`Unknown symbol "${word}"`, "unknown-symbol", word);
    }
    throw new EqParseError(`Unexpected character "${c}"`, "syntax", c);
  }
  return toks;
}

class Parser {
  pos = 0;
  constructor(private toks: Tok[], private tight: boolean) {}

  private peek(): Tok | undefined { return this.toks[this.pos]; }
  private isOp(v: string): boolean { const t = this.peek(); return !!t && t.t === "op" && t.v === v; }

  parseAll(): Node {
    if (!this.toks.length) throw new EqParseError("Empty expression");
    const n = this.expr();
    if (this.pos < this.toks.length) throw new EqParseError("Unexpected input", "syntax", String((this.toks[this.pos] as { v: unknown }).v));
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

  private startsFactor(): boolean {
    const t = this.peek();
    if (!t) return false;
    return t.t === "num" || t.t === "var" || t.t === "fn" || (t.t === "op" && t.v === "(");
  }

  /** a run of juxtaposed factors: "2 pi r", "k q1 q2" */
  private juxtaposed(): Node {
    let a = this.unary();
    while (this.startsFactor()) a = { t: "bin", op: "*", a, b: this.power() };
    return a;
  }

  private term(): Node {
    if (this.tight) {
      // implicit multiplication binds tighter than "/": 1/2pi sqrt(LC) = 1 / (2 pi sqrt(LC))
      let a = this.juxtaposed();
      while (this.isOp("*") || this.isOp("/")) {
        const op = (this.toks[this.pos++] as { v: string }).v as "*" | "/";
        a = { t: "bin", op, a, b: this.juxtaposed() };
      }
      return a;
    }
    let a = this.unary();
    for (;;) {
      if (this.isOp("*") || this.isOp("/")) {
        const op = (this.toks[this.pos++] as { v: string }).v as "*" | "/";
        a = { t: "bin", op, a, b: this.unary() };
      } else if (this.startsFactor()) {
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
      let neg = false;
      if (this.isOp("-")) { neg = true; this.pos++; } else if (this.isOp("+")) this.pos++;
      const e = this.power();
      return { t: "bin", op: "^", a: base, b: neg ? { t: "neg", a: e } : e };
    }
    return base;
  }

  private primary(): Node {
    const t = this.toks[this.pos++];
    if (!t) throw new EqParseError("Unexpected end of input");
    if (t.t === "num") return { t: "num", v: t.v };
    if (t.t === "var") return { t: "var", name: t.v };
    if (t.t === "fn") return this.fnApply(t.v);
    if (t.v === "(") {
      const e = this.expr();
      if (!this.isOp(")")) throw new EqParseError('Missing ")"', "syntax", "(");
      this.pos++;
      return e;
    }
    throw new EqParseError(`Unexpected "${t.v}"`, "syntax", t.v);
  }

  private fnApply(name: string): Node {
    let exp: Node | null = null;
    if (this.isOp("^")) { // sin^2(theta)
      this.pos++;
      let neg = false;
      if (this.isOp("-")) { neg = true; this.pos++; }
      let e = this.primary();
      if (neg) e = { t: "neg", a: e };
      exp = e;
    }
    const arg = this.isOp("(") ? this.primary() : this.power();
    const f: Node = { t: "fn", name, a: arg };
    return exp ? { t: "bin", op: "^", a: f, b: exp } : f;
  }
}

export function parseSide(src: string, table: SymbolTable, tight = false): Node {
  return new Parser(tokenize(src, table), tight).parseAll();
}

export type Env = Record<string, number>;
export type Fn = (env: Env) => number;

const FUNCS: Record<string, (x: number) => number> = {
  sin: Math.sin, cos: Math.cos, tan: Math.tan, asin: Math.asin, acos: Math.acos, atan: Math.atan,
  sqrt: (x) => (x >= 0 ? Math.sqrt(x) : NaN), exp: Math.exp, ln: (x) => (x > 0 ? Math.log(x) : NaN),
};

export function compile(n: Node): Fn {
  switch (n.t) {
    case "num": { const v = n.v; return () => v; }
    case "var": { const k = n.name; return (env) => env[k]; }
    case "neg": { const a = compile(n.a); return (env) => -a(env); }
    case "fn": { const a = compile(n.a); const f = FUNCS[n.name]; return (env) => f(a(env)); }
    case "bin": {
      const a = compile(n.a);
      const b = compile(n.b);
      switch (n.op) {
        case "+": return (e) => a(e) + b(e);
        case "-": return (e) => a(e) - b(e);
        case "*": return (e) => a(e) * b(e);
        case "/": return (e) => a(e) / b(e);
        default: return (e) => Math.pow(a(e), b(e));
      }
    }
  }
}

export function varsOf(n: Node, out = new Set<string>()): Set<string> {
  switch (n.t) {
    case "var": out.add(n.name); break;
    case "neg": varsOf(n.a, out); break;
    case "fn": varsOf(n.a, out); break;
    case "bin": varsOf(n.a, out); varsOf(n.b, out); break;
    default: break;
  }
  return out;
}

/** Numeric literals other than 0, 1, 2 and 3 (small integers are part of formulas, not substituted values). */
export function substitutedLiterals(n: Node): number {
  switch (n.t) {
    case "num": return Number.isInteger(n.v) && n.v >= 0 && n.v <= 4 ? 0 : Math.abs(n.v - Math.PI) < 1e-12 ? 0 : 1;
    case "neg": return substitutedLiterals(n.a);
    case "fn": return substitutedLiterals(n.a);
    case "bin": return substitutedLiterals(n.a) + substitutedLiterals(n.b);
    default: return 0;
  }
}
