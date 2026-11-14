/**
 * A small dependency-free parser for the LaTeX subset used in the Physics question banks.
 * It produces a tree (no React here) so the same parser powers the renderer and `npm run verify:physics`.
 * Unknown commands throw, so a typo in a question fails verification instead of rendering wrongly.
 */

export type TexNode =
  | { t: "i"; s: string } // italic variable letters
  | { t: "g"; s: string } // italic Greek letter
  | { t: "n"; s: string } // upright number or punctuation
  | { t: "rm"; s: string; bold?: boolean } // upright text
  | { t: "fn"; s: string } // function name: sin, cos, ln …
  | { t: "op"; s: string; unary?: boolean } // spaced operator or relation
  | { t: "sym"; s: string } // upright symbol
  | { t: "big"; s: string } // ∫ ∮ ∑
  | { t: "sp"; w: number } // space in em
  | { t: "br" }
  | { t: "frac"; a: TexNode[]; b: TexNode[] }
  | { t: "sqrt"; a: TexNode[]; idx?: TexNode[] }
  | { t: "scr"; base: TexNode | null; sup?: TexNode[]; sub?: TexNode[] }
  | { t: "acc"; kind: "vec" | "hat" | "bar" | "dot" | "ddot"; a: TexNode[] };

const GREEK_LOWER: Record<string, string> = {
  alpha: "α", beta: "β", gamma: "γ", delta: "δ", epsilon: "ϵ", varepsilon: "ε", zeta: "ζ", eta: "η", theta: "θ", vartheta: "ϑ", iota: "ι",
  kappa: "κ", lambda: "λ", mu: "μ", nu: "ν", xi: "ξ", pi: "π", rho: "ρ", sigma: "σ", tau: "τ", phi: "ϕ", varphi: "φ", chi: "χ", psi: "ψ", omega: "ω",
};
const GREEK_UPPER: Record<string, string> = {
  Gamma: "Γ", Delta: "Δ", Theta: "Θ", Lambda: "Λ", Xi: "Ξ", Pi: "Π", Sigma: "Σ", Phi: "Φ", Psi: "Ψ", Omega: "Ω",
};
const OPS: Record<string, string> = {
  pm: "±", mp: "∓", times: "×", cdot: "·", div: "÷", approx: "≈", sim: "∼", propto: "∝", neq: "≠", ne: "≠", leq: "≤", le: "≤", geq: "≥", ge: "≥",
  ll: "≪", gg: "≫", to: "→", rightarrow: "→", leftarrow: "←", Rightarrow: "⇒", Leftrightarrow: "⇔", equiv: "≡", cong: "≅", rightleftharpoons: "⇌",
};
const SYMS: Record<string, string> = {
  infty: "∞", circ: "°", degree: "°", ldots: "…", cdots: "⋯", partial: "∂", nabla: "∇", hbar: "ħ", ell: "ℓ", therefore: "∴", because: "∵",
  perp: "⊥", parallel: "∥", angle: "∠", mid: "|", uparrow: "↑", downarrow: "↓", prime: "′", Delta: "Δ", dagger: "†", AA: "Å",
};
const BIG: Record<string, string> = { oint: "∮", int: "∫", sum: "∑", prod: "∏" };
const FUNCS = new Set(["sin", "cos", "tan", "cot", "sec", "csc", "log", "ln", "exp", "min", "max", "lim", "sinh", "cosh", "tanh", "arcsin", "arccos", "arctan"]);
const SPACES: Record<string, number> = { ",": 0.17, ":": 0.22, ";": 0.28, " ": 0.3, quad: 1, qquad: 2, "!": 0 };
const IGNORED = new Set(["left", "right", "displaystyle", "limits", "nolimits", "big", "Big", "bigg", "Bigg", "textstyle"]);

class P {
  i = 0;
  constructor(public s: string) {}

  fail(msg: string): never { throw new Error(`${msg} in "${this.s.slice(0, 80)}"`); }

  seq(closing: boolean): TexNode[] {
    const out: TexNode[] = [];
    for (;;) {
      if (this.i >= this.s.length) { if (closing) this.fail("Missing }"); return out; }
      const c = this.s[this.i];
      if (c === "}") { if (!closing) this.fail("Unexpected }"); this.i++; return out; }
      this.item(out);
    }
  }

  /** one token or group, as a node list (for ^ and _ arguments, \frac arguments …) */
  arg(): TexNode[] {
    while (this.s[this.i] === " ") this.i++;
    if (this.i >= this.s.length) this.fail("Missing argument");
    if (this.s[this.i] === "{") { this.i++; return this.seq(true); }
    const tmp: TexNode[] = [];
    // single letter / digit / command
    const c = this.s[this.i];
    if (/[A-Za-z]/.test(c)) { this.i++; return [{ t: "i", s: c }]; }
    if (/\d/.test(c)) { this.i++; return [{ t: "n", s: c }]; }
    this.item(tmp);
    return tmp;
  }

  item(out: TexNode[]): void {
    const c = this.s[this.i];
    if (c === "{") { this.i++; out.push(...this.seq(true)); return; }
    if (c === "^" || c === "_") {
      this.i++;
      const a = this.arg();
      let base = out.length ? out.pop()! : null;
      if (base && base.t === "scr" && ((c === "^" && base.sup) || (c === "_" && base.sub))) { out.push(base); base = null; }
      const node: TexNode = base && base.t === "scr" ? base : { t: "scr", base };
      if (c === "^") (node as { sup?: TexNode[] }).sup = a; else (node as { sub?: TexNode[] }).sub = a;
      out.push(node);
      return;
    }
    if (c === "\\") { this.command(out); return; }
    if (c === "$") this.fail("Stray $");
    if (/[A-Za-z]/.test(c)) {
      let j = this.i;
      while (j < this.s.length && /[A-Za-z]/.test(this.s[j])) j++;
      out.push({ t: "i", s: this.s.slice(this.i, j) });
      this.i = j; return;
    }
    if (/[0-9.]/.test(c)) {
      let j = this.i;
      while (j < this.s.length && /[0-9.]/.test(this.s[j])) j++;
      out.push({ t: "n", s: this.s.slice(this.i, j) });
      this.i = j; return;
    }
    if (c === " " || c === "\n") { this.i++; return; }
    if (c === "~") { this.i++; out.push({ t: "sp", w: 0.3 }); return; }
    if (c === "'") { this.i++; out.push({ t: "sym", s: "′" }); return; }
    if ("+-=<>".includes(c)) {
      this.i++;
      const prev = out[out.length - 1];
      const unary = (c === "-" || c === "+") && (!prev || prev.t === "op" || (prev.t === "n" && /^[(\[,]$/.test(prev.s)) || (prev.t === "rm" && prev.s === "("));
      out.push({ t: "op", s: c === "-" ? "−" : c, unary });
      return;
    }
    if ("()[]|,;:!?/*".includes(c)) { this.i++; out.push({ t: "n", s: c }); return; }
    this.i++;
    out.push({ t: "n", s: c }); // any other character (Unicode etc.) is shown as typed
  }

  /** raw text of the next {group} (or single character), spaces preserved, for \\text{…} */
  raw(): string {
    while (this.s[this.i] === " ") this.i++;
    if (this.s[this.i] !== "{") { const ch = this.s[this.i]; if (ch === undefined) this.fail("Missing argument"); this.i++; return ch; }
    let depth = 0;
    const start = this.i + 1;
    for (let j = this.i; j < this.s.length; j++) {
      if (this.s[j] === "{") depth++;
      else if (this.s[j] === "}") { depth--; if (depth === 0) { this.i = j + 1; return this.s.slice(start, j).replace(/\\([ ,;])/g, " "); } }
    }
    return this.fail("Missing }");
  }

  name(): string {
    let j = this.i;
    while (j < this.s.length && /[A-Za-z]/.test(this.s[j])) j++;
    const n = this.s.slice(this.i, j);
    this.i = j;
    return n;
  }

  command(out: TexNode[]): void {
    this.i++; // backslash
    const first = this.s[this.i];
    if (first === undefined) this.fail("Dangling backslash");
    if (!/[A-Za-z]/.test(first)) {
      this.i++;
      if (first === "\\") { out.push({ t: "br" }); return; }
      if (first in SPACES) { if (SPACES[first]) out.push({ t: "sp", w: SPACES[first] }); return; }
      if ("{}%$&_#".includes(first)) { out.push({ t: "n", s: first }); return; }
      if (first === "|") { out.push({ t: "sym", s: "‖" }); return; }
      this.fail(`Unknown command \\${first}`);
    }
    const name = this.name();
    if (IGNORED.has(name)) { if (this.s[this.i] === "." && (name === "left" || name === "right")) this.i++; return; }
    if (name in SPACES) { out.push({ t: "sp", w: SPACES[name] }); return; }
    if (name in GREEK_LOWER) { out.push({ t: "g", s: GREEK_LOWER[name] }); return; }
    if (name in GREEK_UPPER) { out.push({ t: "rm", s: GREEK_UPPER[name] }); return; }
    if (name in OPS) { out.push({ t: "op", s: OPS[name] }); return; }
    if (name in SYMS) { out.push({ t: "sym", s: SYMS[name] }); return; }
    if (name in BIG) { out.push({ t: "big", s: BIG[name] }); return; }
    if (FUNCS.has(name)) { out.push({ t: "fn", s: name }); return; }
    switch (name) {
      case "frac": case "dfrac": case "tfrac": { const a = this.arg(); const b = this.arg(); out.push({ t: "frac", a, b }); return; }
      case "sqrt": {
        let idx: TexNode[] | undefined;
        if (this.s[this.i] === "[") { const e = this.s.indexOf("]", this.i); if (e < 0) this.fail("Missing ]"); idx = new P(this.s.slice(this.i + 1, e)).seq(false); this.i = e + 1; }
        out.push({ t: "sqrt", a: this.arg(), idx }); return;
      }
      case "vec": case "overrightarrow": out.push({ t: "acc", kind: "vec", a: this.arg() }); return;
      case "hat": out.push({ t: "acc", kind: "hat", a: this.arg() }); return;
      case "dot": out.push({ t: "acc", kind: "dot", a: this.arg() }); return;
      case "ddot": out.push({ t: "acc", kind: "ddot", a: this.arg() }); return;
      case "overline": case "bar": out.push({ t: "acc", kind: "bar", a: this.arg() }); return;
      case "text": case "mathrm": case "operatorname": case "textrm": case "mathbf": case "textbf": case "boldsymbol": {
        const bold = name === "mathbf" || name === "textbf" || name === "boldsymbol";
        out.push({ t: "rm", s: this.raw(), bold });
        return;
      }
      default: this.fail(`Unknown command \\${name}`);
    }
  }
}

/** Flatten nodes to their plain characters (used for \text{…} and aria labels). */
export function plain(nodes: TexNode[]): string {
  return nodes.map((n): string => {
    switch (n.t) {
      case "i": case "g": case "n": case "rm": case "fn": case "op": case "sym": case "big": return n.s;
      case "sp": return " ";
      case "br": return " ";
      case "frac": return `(${plain(n.a)})/(${plain(n.b)})`;
      case "sqrt": return `√(${plain(n.a)})`;
      case "scr": return (n.base ? plain([n.base]) : "") + (n.sub ? `_${plain(n.sub)}` : "") + (n.sup ? `^${plain(n.sup)}` : "");
      case "acc": return plain(n.a);
    }
  }).join("");
}

export function parseTex(src: string): TexNode[] {
  const p = new P(src);
  return p.seq(false);
}

/* ------------------------------------------------------------------ rich text: prose with $inline$, $$display$$, **bold**, line breaks */

export type RichSeg =
  | { t: "text"; s: string; bold?: boolean }
  | { t: "math"; nodes: TexNode[]; display: boolean; src: string }
  | { t: "br" };

export function parseRich(src: string): RichSeg[] {
  const segs: RichSeg[] = [];
  let i = 0;
  let buf = "";
  let bold = false;
  const flush = () => { if (buf) { segs.push({ t: "text", s: buf, bold }); buf = ""; } };
  while (i < src.length) {
    const c = src[i];
    if (c === "\\" && src[i + 1] === "$") { buf += "$"; i += 2; continue; }
    if (c === "$") {
      const display = src[i + 1] === "$";
      const open = display ? i + 2 : i + 1;
      const close = src.indexOf(display ? "$$" : "$", open);
      if (close < 0) throw new Error(`Unclosed $ in "${src.slice(0, 80)}"`);
      flush();
      const body = src.slice(open, close);
      segs.push({ t: "math", nodes: parseTex(body), display, src: body });
      i = close + (display ? 2 : 1);
      continue;
    }
    if (c === "*" && src[i + 1] === "*") { flush(); bold = !bold; i += 2; continue; }
    if (c === "\n") { flush(); segs.push({ t: "br" }); i++; continue; }
    buf += c; i++;
  }
  flush();
  if (bold) throw new Error(`Unclosed ** in "${src.slice(0, 80)}"`);
  return segs;
}
