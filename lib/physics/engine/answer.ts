import type { AnsSpec } from "../types";
import { isDimensionless, parseUnit, sameDim } from "./units";

/**
 * Check "number + unit" answers. Accepts 4.5e-7, 4.5 × 10^-7, 4.5x10⁻⁷, 0.45 µN, "9 mN" for 0.009 N, 2/3 …
 * Rounding to 2 or more significant figures is accepted, as are results within the question's tolerance.
 */

export type AnsStatus = "correct" | "wrong" | "unit-missing" | "unit-wrong" | "unreadable";
export interface AnsResult { status: AnsStatus; message: string }

const SUP: Record<string, string> = { "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9", "⁻": "-", "⁺": "+" };

export interface ParsedQty { value: number; unitText: string }

/** Split an answer like "4.5 × 10^-7 N m" into its number and unit text. */
export function parseQuantity(src: string): ParsedQty | null {
  let s = src.trim();
  s = s.replace(/^[≈~=]\s*/, "");
  s = s.replace(/[−–—]/g, "-");
  s = s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]+/g, (m) => "^" + [...m].map((c) => SUP[c] ?? c).join(""));
  s = s.replace(/(\d),(\d{3})(?!\d)/g, "$1$2");
  s = s.replace(/\^\s*\{\s*([+-]?\d+)\s*\}/g, "^$1").replace(/\^\s*\(\s*([+-]?\d+)\s*\)/g, "^$1");

  let m = /^([+-]?)\s*(\d+)\s*\/\s*(\d+)(?!\d|\.)/.exec(s);
  if (m) {
    const den = parseInt(m[3], 10);
    if (den === 0) return null;
    const v = (parseInt(m[2], 10) / den) * (m[1] === "-" ? -1 : 1);
    return { value: v, unitText: s.slice(m[0].length).trim() };
  }
  // a bare power of ten: 10^-4 N m  (also 10⁻⁴, 10^(−4))
  const pw = /^([+-]?)\s*10\s*\^\s*([+-]?\d+)(?!\d)/.exec(s);
  if (pw) return { value: (pw[1] === "-" ? -1 : 1) * Math.pow(10, parseInt(pw[2], 10)), unitText: s.slice(pw[0].length).trim() };

  m = /^([+-]?)\s*(\d+\.?\d*|\.\d+)/.exec(s);
  if (!m) return null;
  let v = parseFloat(m[2]) * (m[1] === "-" ? -1 : 1);
  let rest = s.slice(m[0].length);

  // scientific notation: 4.5e-7  or  4.5 × 10^-7  or  4.5 x 10^-7  or  4.5*10^-7
  const e = /^\s*[eE]\s*([+-]?\d+)/.exec(rest);
  const x = /^\s*(?:[×xX*·⋅])\s*10\s*(?:\^|\*\*)?\s*\(?\s*([+-]?\d+)\s*\)?/.exec(rest);
  if (e) { v *= Math.pow(10, parseInt(e[1], 10)); rest = rest.slice(e[0].length); }
  else if (x) { v *= Math.pow(10, parseInt(x[1], 10)); rest = rest.slice(x[0].length); }
  if (!Number.isFinite(v)) return null;
  return { value: v, unitText: rest.trim() };
}

/** Is `given` the model value rounded to 2-4 significant figures? */
function isRounding(given: number, model: number): boolean {
  if (model === 0) return given === 0;
  for (let sig = 2; sig <= 4; sig++) {
    const r = Number(model.toPrecision(sig));
    if (Math.abs(given - r) <= Math.abs(r) * 1e-9) return true;
  }
  return false;
}

function matches(given: number, model: number, tol: number): boolean {
  if (!Number.isFinite(given)) return false;
  return Math.abs(given - model) <= tol * Math.abs(model) || isRounding(given, model);
}

function slipHint(given: number, model: number): string {
  if (model === 0 || given === 0) return "";
  if (Math.abs(given + model) <= 0.02 * Math.abs(model)) return " The magnitude is right but the sign is opposite.";
  const ratio = Math.abs(given / model);
  const lg = Math.log10(ratio);
  if (Math.abs(lg - Math.round(lg)) < 0.02 && Math.round(lg) !== 0) return " Your number is off by a power of ten, so check unit prefixes (µ, m, k, M) and your exponent.";
  if (Math.abs(ratio - 2) < 0.03 || Math.abs(ratio - 0.5) < 0.015) return " Your answer is off by a factor of 2. Check for a missing or extra ½ or 2.";
  if (Math.abs(ratio - Math.PI) < 0.02 || Math.abs(ratio - 1 / Math.PI) < 0.006) return " Your answer is off by a factor of π.";
  if (Math.abs(ratio - 4 * Math.PI) < 0.1 || Math.abs(ratio - 1 / (4 * Math.PI)) < 0.01) return " Your answer is off by a factor of 4π.";
  return "";
}

export function checkAnswer(input: string, spec: AnsSpec): AnsResult {
  const q = parseQuantity(input);
  if (!q) return { status: "unreadable", message: "I couldn't find a number in your answer. Write it like 4.5 × 10^-7 N or 0.45 µN." };

  const unitRequired = spec.needUnit || !isDimensionless(spec.dim);
  const prefUnit = spec.unit ? parseUnit(spec.unit) : null;
  const prefScale = prefUnit ? prefUnit.scale : 1;

  // targeted wrong-answer explanations
  const trapMsg = (siValue: number): string => {
    const t = spec.traps?.find((tr) => matches(siValue, tr.value, spec.tol));
    return t ? ` ${t.msg}` : "";
  };

  if (!q.unitText) {
    if (!unitRequired) {
      return matches(q.value, spec.value, spec.tol)
        ? { status: "correct", message: "Matches the model answer." }
        : { status: "wrong", message: `That is not the value I expected.${trapMsg(q.value)}${slipHint(q.value, spec.value)}` };
    }
    // number only: say whether the number is right, but the unit is part of the answer
    const inSi = matches(q.value, spec.value, spec.tol);
    const inPref = matches(q.value * prefScale, spec.value, spec.tol);
    if (inSi || inPref) return { status: "unit-missing", message: `The number is right, but a physical quantity needs its unit. Add the unit${spec.unit ? ` (for example ${spec.unit})` : ""}.` };
    return { status: "wrong", message: `That is not the value I expected, and the unit is missing.${trapMsg(q.value)}` };
  }

  const unit = parseUnit(q.unitText);
  if (!unit) return { status: "unreadable", message: `I couldn't read the unit “${q.unitText}”. Check the spelling and capital letters (for example mV vs MV), or compare with the model answer.` };

  if (!sameDim(unit.dim, spec.dim)) {
    return { status: "unit-wrong", message: `The unit “${q.unitText}” is not a unit of this quantity. The answer should be in ${spec.unit || "no unit (a pure number)"}${spec.unit ? " (or an equivalent unit)" : ""}.` };
  }

  const si = q.value * unit.scale;
  if (matches(si, spec.value, spec.tol)) {
    return { status: "correct", message: "Value and unit match the model answer." };
  }
  return { status: "wrong", message: `The unit is fine, but the value is not what I expected.${trapMsg(si)}${slipHint(si, spec.value)}` };
}
