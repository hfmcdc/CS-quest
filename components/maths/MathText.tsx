import type { ReactNode } from "react";

/**
 * A small dependency-free renderer for the LaTeX subset used by Maths Quest.
 * Text may mix plain words with $inline$ and $$display$$ math, and **bold**.
 * Supported: \frac \sqrt \vec \hat \overline \text \left \right, ^ _ , Greek letters,
 * \int, trig/log function names, relations and arrows. Unknown commands are shown literally.
 */

const SYMBOLS: Record<string, string> = {
  pi: "π", theta: "θ", alpha: "α", beta: "β", gamma: "γ", lambda: "λ", mu: "μ", phi: "φ", delta: "δ", omega: "ω",
  infty: "∞", cdot: "·", times: "×", div: "÷", pm: "±", mp: "∓", le: "≤", leq: "≤", ge: "≥", geq: "≥", ne: "≠", neq: "≠",
  to: "→", rightarrow: "→", Rightarrow: "⇒", Leftrightarrow: "⇔", int: "∫", circ: "°", degree: "°", approx: "≈",
  parallel: "∥", perp: "⊥", ldots: "…", cdots: "⋯", notin: "∉", in: "∈", angle: "∠", therefore: "∴", because: "∵", prime: "′", sum: "Σ",
};
const FUNCS = new Set(["sin", "cos", "tan", "cot", "sec", "csc", "cosec", "log", "ln", "exp", "max", "min", "lim"]);
const BINARY = new Set(["+", "-", "=", "<", ">", "≤", "≥", "≠", "×", "±", "→", "⇒", "⇔", "≈", "∥", "⊥", "∈", "∉"]);

interface Ctx {
  s: string;
  i: number;
  key: number;
  report?: (msg: string) => void;
}

type Kind = "start" | "op" | "open" | "atom";

function nk(c: Ctx): number { return c.key++; }

function skipSpaces(c: Ctx) { while (c.i < c.s.length && /\s/.test(c.s[c.i])) c.i++; }

/** One argument: a {group} or a single token (letter, digit run, or \command). */
function parseArg(c: Ctx): ReactNode {
  skipSpaces(c);
  if (c.s[c.i] === "{") {
    c.i++;
    const inner = parseSeq(c, true);
    return <span key={nk(c)}>{inner}</span>;
  }
  if (c.s[c.i] === "\\") {
    const node = parseCommand(c);
    return node.node;
  }
  const ch = c.s[c.i++] ?? "";
  return <span key={nk(c)}>{ch === "-" ? "−" : ch}</span>;
}

function parseCommand(c: Ctx): { node: ReactNode; kind: Kind } {
  c.i++; // backslash
  const first = c.s[c.i] ?? "";
  if (!/[A-Za-z]/.test(first)) {
    c.i++;
    switch (first) {
      case ",": return { node: <span key={nk(c)} className="inline-block w-[0.17em]" />, kind: "op" };
      case ";": return { node: <span key={nk(c)} className="inline-block w-[0.28em]" />, kind: "op" };
      case " ": return { node: <span key={nk(c)} className="inline-block w-[0.3em]" />, kind: "op" };
      case "!": return { node: null, kind: "op" };
      case "{": case "}": case "|": case "%": case "$": case "&": case "_": case "#":
        return { node: <span key={nk(c)}>{first === "|" ? "‖" : first}</span>, kind: "atom" };
      default: return { node: <span key={nk(c)}>{first}</span>, kind: "atom" };
    }
  }
  let name = "";
  while (c.i < c.s.length && /[A-Za-z]/.test(c.s[c.i])) name += c.s[c.i++];

  switch (name) {
    case "frac": case "dfrac": case "tfrac": {
      const a = parseArg(c);
      const b = parseArg(c);
      return {
        kind: "atom",
        node: (
          <span key={nk(c)} className="mx-[0.12em] inline-flex flex-col items-center align-middle text-[0.92em] leading-[1.25]">
            <span className="border-b border-current px-[0.2em]">{a}</span>
            <span className="px-[0.2em]">{b}</span>
          </span>
        ),
      };
    }
    case "sqrt": {
      let idx: ReactNode = null;
      skipSpaces(c);
      if (c.s[c.i] === "[") {
        const end = c.s.indexOf("]", c.i);
        idx = <sup className="mr-[-0.1em] text-[0.6em]">{c.s.slice(c.i + 1, end)}</sup>;
        c.i = end + 1;
      }
      const a = parseArg(c);
      return {
        kind: "atom",
        node: (
          <span key={nk(c)} className="whitespace-nowrap">
            {idx}√<span className="border-t border-current px-[0.15em]">{a}</span>
          </span>
        ),
      };
    }
    case "vec": case "overrightarrow": {
      const a = parseArg(c);
      return {
        kind: "atom",
        node: (
          <span key={nk(c)} className="relative inline-block">
            {a}
            <span className="pointer-events-none absolute inset-x-0 top-[-0.55em] text-center text-[0.65em] leading-none" aria-hidden="true">→</span>
          </span>
        ),
      };
    }
    case "hat": {
      const a = parseArg(c);
      return {
        kind: "atom",
        node: (
          <span key={nk(c)} className="relative inline-block">
            {a}
            <span className="pointer-events-none absolute inset-x-0 top-[-0.32em] text-center text-[0.8em] leading-none" aria-hidden="true">^</span>
          </span>
        ),
      };
    }
    case "overline": {
      const a = parseArg(c);
      return { kind: "atom", node: <span key={nk(c)} className="border-t border-current">{a}</span> };
    }
    case "text": case "mathrm": case "operatorname": {
      skipSpaces(c);
      let t = "";
      if (c.s[c.i] === "{") {
        const end = c.s.indexOf("}", c.i);
        t = c.s.slice(c.i + 1, end);
        c.i = end + 1;
      }
      return { kind: "atom", node: <span key={nk(c)} className="whitespace-pre-wrap font-sans not-italic">{t}</span> };
    }
    case "mathbf": case "boldsymbol": case "bf": {
      const a = parseArg(c);
      return { kind: "atom", node: <b key={nk(c)}>{a}</b> };
    }
    case "left": case "right": {
      const ch = c.s[c.i] ?? "";
      c.i++;
      if (ch === ".") return { node: null, kind: name === "left" ? "open" : "atom" };
      let out = ch;
      if (ch === "\\") { out = c.s[c.i] ?? ""; c.i++; if (out === "|") out = "‖"; }
      return { node: <span key={nk(c)}>{out}</span>, kind: name === "left" ? "open" : "atom" };
    }
    case "displaystyle": case "big": case "Big": case "bigg": case "Bigg": case "limits":
      return { node: null, kind: "op" };
    case "quad": return { node: <span key={nk(c)} className="inline-block w-[1em]" />, kind: "op" };
    case "qquad": return { node: <span key={nk(c)} className="inline-block w-[2em]" />, kind: "op" };
    case "int":
      return { node: <span key={nk(c)} className="mr-[0.1em] text-[1.25em] leading-none">∫</span>, kind: "op" };
    default:
      if (FUNCS.has(name)) return { node: <span key={nk(c)} className="mr-[0.14em] font-serif not-italic">{name === "cosec" ? "cosec" : name}</span>, kind: "atom" };
      if (SYMBOLS[name]) {
        const sym = SYMBOLS[name];
        return { node: <span key={nk(c)}>{sym}</span>, kind: BINARY.has(sym) ? "op" : "atom" };
      }
      c.report?.(`Unknown command \\${name}`);
      return { node: <span key={nk(c)}>{"\\" + name}</span>, kind: "atom" };
  }
}

function withScripts(c: Ctx, atom: ReactNode): ReactNode {
  let sup: ReactNode = null;
  let sub: ReactNode = null;
  for (;;) {
    skipSpaces(c);
    const ch = c.s[c.i];
    if (ch === "^" && sup === null) { c.i++; sup = parseArg(c); }
    else if (ch === "_" && sub === null) { c.i++; sub = parseArg(c); }
    else break;
  }
  if (sup === null && sub === null) return atom;
  if (sup !== null && sub !== null) {
    return (
      <span key={nk(c)}>
        {atom}
        <span className="inline-flex flex-col align-middle text-[0.7em] leading-[1.1]">
          <span>{sup}</span>
          <span>{sub}</span>
        </span>
      </span>
    );
  }
  return (
    <span key={nk(c)}>
      {atom}
      {sup !== null ? <sup className="text-[0.7em] leading-none">{sup}</sup> : <sub className="text-[0.7em] leading-none">{sub}</sub>}
    </span>
  );
}

function parseSeq(c: Ctx, untilBrace: boolean): ReactNode[] {
  const out: ReactNode[] = [];
  let last: Kind = "start";
  while (c.i < c.s.length) {
    const ch = c.s[c.i];
    if (ch === "}") {
      if (untilBrace) { c.i++; return out; }
      c.report?.("Unbalanced }");
      c.i++;
      continue;
    }
    if (/\s/.test(ch)) { c.i++; continue; }

    let node: ReactNode;
    let kind: Kind = "atom";

    if (ch === "{") {
      c.i++;
      node = <span key={nk(c)}>{parseSeq(c, true)}</span>;
    } else if (ch === "\\") {
      const r = parseCommand(c);
      node = r.node;
      kind = r.kind;
    } else if (ch === "^" || ch === "_") {
      node = <span key={nk(c)} />; // script with no base, e.g. {}^{-1}
    } else if (/[A-Za-z]/.test(ch)) {
      c.i++;
      node = <i key={nk(c)} className="font-serif">{ch}</i>;
    } else if (/[0-9.]/.test(ch)) {
      let run = "";
      while (c.i < c.s.length && /[0-9.]/.test(c.s[c.i])) run += c.s[c.i++];
      node = <span key={nk(c)}>{run}</span>;
    } else {
      c.i++;
      const glyph = ch === "-" ? "−" : ch === "*" ? "·" : ch;
      if (BINARY.has(glyph)) {
        const unary = last === "start" || last === "op" || last === "open";
        node = <span key={nk(c)} className={unary ? "" : "mx-[0.22em]"}>{glyph}</span>;
        kind = "op";
      } else if (glyph === "(" || glyph === "[") {
        node = <span key={nk(c)}>{glyph}</span>;
        kind = "open";
      } else if (glyph === ",") {
        node = <span key={nk(c)} className="mr-[0.2em]">,</span>;
        kind = "op";
      } else {
        node = <span key={nk(c)}>{glyph}</span>;
      }
    }

    const scripted = withScripts(c, node);
    out.push(<span key={nk(c)}>{scripted}</span>);
    // a script makes the node a finished atom
    if (scripted !== node) kind = "atom";
    last = kind;
  }
  if (untilBrace) c.report?.("Missing }");
  return out;
}

export function renderMath(src: string, report?: (msg: string) => void): ReactNode {
  const c: Ctx = { s: src, i: 0, key: 0, report };
  return <>{parseSeq(c, false)}</>;
}


/** Plain-language reading of a TeX string for screen readers. */
export function speak(tex: string): string {
  let s = tex;
  for (let n = 0; n < 4; n++) {
    s = s
      .replace(/\\(?:d|t)?frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, " ($1) over ($2) ")
      .replace(/\\sqrt\s*\{([^{}]*)\}/g, " square root of ($1) ")
      .replace(/\\(?:vec|overrightarrow)\s*\{([^{}]*)\}/g, " vector $1 ")
      .replace(/\\hat\s*\{([^{}]*)\}/g, " $1 hat ")
      .replace(/\\(sin|cos|tan|cot|sec|csc|cosec)\s*\^\s*\{-1\}/g, " inverse $1 ")
      .replace(/\^\s*\{([^{}]*)\}/g, " to the power $1 ")
      .replace(/_\s*\{([^{}]*)\}/g, " sub $1 ");
  }
  return s
    .replace(/\^2\b/g, " squared ")
    .replace(/\^(\w)/g, " to the power $1 ")
    .replace(/_(\w)/g, " sub $1 ")
    .replace(/\\(?:left|right|displaystyle|quad|qquad|big|Big)\b/g, " ")
    .replace(/\\int/g, " integral of ")
    .replace(/\\([A-Za-z]+)/g, (_m, n: string) => (SYMBOLS[n] ? " " + n + " " : " " + n + " "))
    .replace(/[{}]/g, " ")
    .replace(/-/g, " minus ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Inline or display math. */
export function Tex({ children, display = false }: { children: string; display?: boolean }) {
  const body = renderMath(children);
  if (display) {
    return (
      <span role="math" aria-label={speak(children)} className="my-2 block max-w-full overflow-x-auto overflow-y-hidden py-1 text-center font-serif text-[1.05em]">
        <span className="inline-block min-w-min whitespace-nowrap px-1">{body}</span>
      </span>
    );
  }
  return <span role="math" aria-label={speak(children)} className="font-serif">{body}</span>;
}

const TOKEN = /(\$\$[\s\S]+?\$\$|\$[^$]+?\$|\*\*[\s\S]+?\*\*)/g;

/** Rich text: plain text with $inline$ / $$display$$ math and **bold**. Newlines are preserved. */
export function Rich({ text, className }: { text: string; className?: string }) {
  const parts = text.split(TOKEN);
  return (
    <span className={`whitespace-pre-line break-words ${className ?? ""}`}>
      {parts.map((p, i) => {
        if (!p) return null;
        if (p.startsWith("$$")) return <Tex key={i} display>{p.slice(2, -2)}</Tex>;
        if (p.startsWith("$")) return <Tex key={i}>{p.slice(1, -1)}</Tex>;
        if (p.startsWith("**")) return <b key={i}>{p.slice(2, -2)}</b>;
        return <span key={i}>{p}</span>;
      })}
    </span>
  );
}

/** Used by tests: collect rendering problems for a rich-text string. */
export function mathProblems(text: string): string[] {
  const problems: string[] = [];
  for (const p of text.split(TOKEN)) {
    if (p.startsWith("$$")) renderMath(p.slice(2, -2), (m) => problems.push(m));
    else if (p.startsWith("$")) renderMath(p.slice(1, -1), (m) => problems.push(m));
  }
  const dollars = (text.match(/\$/g) ?? []).length;
  if (dollars % 2 !== 0) problems.push("Odd number of $ signs");
  return problems;
}
