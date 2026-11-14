import type { Dim } from "../types";

/**
 * Unit parsing with dimensional analysis. No eval, no dependencies.
 * "N m", "J", "kg m^2 s^-2", "µC", "MeV", "V/m", "N·C⁻¹" all parse to { dim, scale } where
 *   value_in_SI = value_in_this_unit * scale
 * so "9 mN" and "0.009 N" compare equal, and "N m" and "J" have the same dimension.
 */

export interface UnitVal { dim: Dim; scale: number }

const d = (m = 0, kg = 0, s = 0, A = 0, K = 0, mol = 0, cd = 0): Dim => [m, kg, s, A, K, mol, cd];
const ZERO: Dim = d();
const u = (dim: Dim, scale = 1): UnitVal => ({ dim, scale });

const EV = 1.602176634e-19;

/** Symbols (case-sensitive). Mass is built on the gram so that "kg" is prefix + g. */
const BASE: Record<string, UnitVal> = {
  m: u(d(1)), g: u(d(0, 1), 1e-3), s: u(d(0, 0, 1)), A: u(d(0, 0, 0, 1)), K: u(d(0, 0, 0, 0, 1)), mol: u(d(0, 0, 0, 0, 0, 1)), cd: u(d(0, 0, 0, 0, 0, 0, 1)),
  N: u(d(1, 1, -2)), J: u(d(2, 1, -2)), W: u(d(2, 1, -3)), Pa: u(d(-1, 1, -2)), Hz: u(d(0, 0, -1)),
  C: u(d(0, 0, 1, 1)), V: u(d(2, 1, -3, -1)), F: u(d(-2, -1, 4, 2)), "\u03a9": u(d(2, 1, -3, -2)), S: u(d(-2, -1, 3, 2)),
  Wb: u(d(2, 1, -2, -1)), T: u(d(0, 1, -2, -1)), H: u(d(2, 1, -2, -2)),
  eV: u(d(2, 1, -2), EV), u: u(d(0, 1), 1.66053906660e-27),
  min: u(d(0, 0, 1), 60), h: u(d(0, 0, 1), 3600),
  "Å": u(d(1), 1e-10),
  D: u(d(-1)), // dioptre
  rad: u(ZERO), deg: u(ZERO, Math.PI / 180),
};

/** Words and alternative spellings → symbol. Matched case-insensitively. */
const WORDS: Record<string, string> = {
  ohm: "\u03a9", ohms: "\u03a9", volt: "V", volts: "V", amp: "A", amps: "A", ampere: "A", amperes: "A",
  metre: "m", metres: "m", meter: "m", meters: "m", second: "s", seconds: "s", sec: "s", secs: "s",
  joule: "J", joules: "J", watt: "W", watts: "W", newton: "N", newtons: "N", coulomb: "C", coulombs: "C",
  tesla: "T", henry: "H", henries: "H", farad: "F", farads: "F", weber: "Wb", webers: "Wb", hertz: "Hz",
  degree: "deg", degrees: "deg", radian: "rad", radians: "rad", kilogram: "kg", kilograms: "kg", gram: "g", grams: "g",
  dioptre: "D", dioptres: "D", diopter: "D", diopters: "D", angstrom: "Å", angstroms: "Å", kelvin: "K", mole: "mol", moles: "mol",
  siemens: "S", pascal: "Pa", pascals: "Pa", minute: "min", minutes: "min", hour: "h", hours: "h", electronvolt: "eV", electronvolts: "eV",
  ev: "eV", hz: "Hz", wb: "Wb", pa: "Pa",
};

const PREFIX: Record<string, number> = { T: 1e12, G: 1e9, M: 1e6, k: 1e3, c: 1e-2, m: 1e-3, "µ": 1e-6, "μ": 1e-6, u: 1e-6, n: 1e-9, p: 1e-12, f: 1e-15 };

const SUP: Record<string, string> = { "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9", "⁻": "-", "⁺": "+" };

const mulDim = (a: Dim, b: Dim, sign = 1): Dim => a.map((x, i) => x + sign * b[i]) as Dim;
const powDim = (a: Dim, n: number): Dim => a.map((x) => x * n) as Dim;
export const sameDim = (a: Dim, b: Dim): boolean => a.every((x, i) => Math.abs(x - b[i]) < 1e-9);
export const isDimensionless = (a: Dim): boolean => a.every((x) => Math.abs(x) < 1e-9);

/** A single symbol, possibly with an SI prefix: "m", "kg", "mN", "MeV", "µC", "Pa", "min". */
function simple(tok: string): UnitVal | null {
  if (BASE[tok]) return BASE[tok];
  const w = WORDS[tok.toLowerCase()];
  if (w) return simple(w);
  if (tok === "Ohm" || tok === "OHM" || tok === "\u03a9" || tok === "\u2126") return BASE["\u03a9"];
  if (tok === "°") return BASE.deg;
  if (tok === "A°" || tok === "Å") return BASE["Å"];
  if (tok.length >= 2) {
    const p = PREFIX[tok[0]];
    if (p !== undefined) {
      const rest = tok.slice(1);
      const b = BASE[rest] ?? (WORDS[rest.toLowerCase()] ? BASE[WORDS[rest.toLowerCase()]] : undefined);
      // a prefix on min / h / u / deg / rad / D / mol / cd / Pa-style names is not meaningful
      if (b && !["min", "h", "deg", "rad", "D", "cd"].includes(rest)) return { dim: b.dim, scale: b.scale * p };
    }
  }
  return null;
}

/** A run of letters such as "Nm", "kgm", "Vm" split into units (longest head first). */
function segment(tok: string): UnitVal[] | null {
  if (!tok) return [];
  for (let i = tok.length; i >= 1; i--) {
    const head = simple(tok.slice(0, i));
    if (!head) continue;
    const rest = segment(tok.slice(i));
    if (rest) return [head, ...rest];
  }
  return null;
}

function normalise(src: string): string {
  let s = src.trim();
  s = s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]+/g, (m) => "^" + [...m].map((c) => SUP[c] ?? c).join(""));
  s = s.replace(/[−–—]/g, "-").replace(/[·⋅∙×*]/g, " ").replace(/\*\*/g, "^");
  s = s.replace(/\^\s*\{\s*([+-]?\d+)\s*\}/g, "^$1").replace(/\^\s*\(\s*([+-]?\d+)\s*\)/g, "^$1");
  s = s.replace(/\bper\b/gi, "/");
  return s;
}

type Tok = { t: "id"; v: string } | { t: "num"; v: number } | { t: "op"; v: string };

function tokenize(s: string): Tok[] | null {
  const out: Tok[] = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (/\s/.test(c)) { i++; continue; }
    const id = /^[A-Za-z\u00b5\u03bc\u03a9\u2126\u00c5\u00b0]+/.exec(s.slice(i));
    if (id) { out.push({ t: "id", v: id[0] }); i += id[0].length; continue; }
    const num = /^[+-]?\d+(?:\.\d+)?/.exec(s.slice(i));
    if (num) { out.push({ t: "num", v: parseFloat(num[0]) }); i += num[0].length; continue; }
    if ("^/()".includes(c)) { out.push({ t: "op", v: c }); i++; continue; }
    return null;
  }
  return out;
}

/**
 * Parse a unit expression. After a "/", every following factor in the same bracket group is in the denominator
 * ("J/mol K" = J mol⁻¹ K⁻¹), which matches how students write units by hand.
 */
export function parseUnit(src: string): UnitVal | null {
  const toks = tokenize(normalise(src));
  if (!toks || !toks.length) return null;
  let pos = 0;

  const group = (): UnitVal | null => {
    let dim: Dim = ZERO;
    let scale = 1;
    let denom = false;
    while (pos < toks.length) {
      const t = toks[pos];
      if (t.t === "op" && t.v === ")") return { dim, scale };
      if (t.t === "op" && t.v === "/") { denom = true; pos++; continue; }
      let factor: UnitVal | null = null;
      if (t.t === "op" && t.v === "(") {
        pos++;
        factor = group();
        if (!factor || !(toks[pos] && toks[pos].t === "op" && toks[pos].v === ")")) return null;
        pos++;
      } else if (t.t === "id") {
        pos++;
        const parts = segment(t.v);
        if (!parts) return null;
        factor = parts.reduce((a, b) => ({ dim: mulDim(a.dim, b.dim), scale: a.scale * b.scale }), { dim: ZERO, scale: 1 });
        // "m s^-1": an exponent binds to the last unit of a run; for a fused run like "ms^-1" we apply it to the whole token, which is the usual reading.
      } else return null;
      let exp = 1;
      const nx = toks[pos];
      if (nx && nx.t === "op" && nx.v === "^") {
        pos++;
        const e = toks[pos];
        if (!e || e.t !== "num") return null;
        exp = e.v; pos++;
      }
      const f = { dim: powDim(factor.dim, exp), scale: Math.pow(factor.scale, exp) };
      dim = mulDim(dim, f.dim, denom ? -1 : 1);
      scale = denom ? scale / f.scale : scale * f.scale;
    }
    return { dim, scale };
  };

  const r = group();
  if (!r || pos !== toks.length) return null;
  return r;
}

/** LaTeX for a unit string, e.g. "µC" → \\mu\\text{C}, "N/C" → \\text{N}\\,\\text{C}^{-1}. */
export function unitTex(src: string): string {
  const toks = tokenize(normalise(src));
  if (!toks) return `\\text{${src}}`;
  const out: string[] = [];
  // each bracket level remembers whether it is (already) in a denominator
  const stack: boolean[] = [];
  let denom = false;
  for (let i = 0; i < toks.length; i++) {
    const t = toks[i];
    if (t.t === "op" && t.v === "/") { denom = true; continue; }
    if (t.t === "op" && t.v === "(") { stack.push(denom); continue; }
    if (t.t === "op" && t.v === ")") { denom = stack.pop() ?? false; continue; }
    if (t.t !== "id") continue;
    let exp = 1;
    const nx = toks[i + 1];
    const ex = toks[i + 2];
    if (nx && nx.t === "op" && nx.v === "^" && ex && ex.t === "num") { exp = ex.v; i += 2; }
    if (denom) exp = -exp;
    out.push(unitWordTex(t.v) + (exp !== 1 ? `^{${exp}}` : ""));
  }
  return out.join("\\,");
}

function unitWordTex(w: string): string {
  if (w === "\u03a9" || w === "\u2126" || /^ohms?$/i.test(w)) return "\\Omega";
  if (w === "\u00b0" || /^deg(rees?)?$/i.test(w)) return "^\\circ";
  if (w === "\u00c5") return "\\text{\u00c5}";
  if (w[0] === "\u00b5" || w[0] === "\u03bc") return `\\mu\\text{${w.slice(1)}}`;
  if (w.length > 1 && (w.endsWith("\u03a9") || w.endsWith("\u2126"))) return `\\text{${w.slice(0, -1)}}\\Omega`;
  // ASCII "u" used for micro ("uC", "uF"): only when what follows is a real unit and the whole token is not one
  if (w.length > 1 && w[0] === "u" && !BASE[w] && simple(w.slice(1))) return `\\mu\\text{${w.slice(1)}}`;
  return `\\text{${w}}`;
}
