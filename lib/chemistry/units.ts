import { checkAnswer, parseQuantity, type AnsResult } from "../physics/engine/answer";
import { isDimensionless, parseUnit } from "../physics/engine/units";
import type { AnsSpec } from "../physics/types";

/**
 * Chemistry unit shim over the Physics unit parser, which does not know litre (L), molarity (M), dm, atm, bar or mmHg
 * (and would silently misread "mmHg" as m·m·H·g). Each such token is rewritten into units the parser understands,
 * with the numeric factor tracked separately: "mol L^-1 s^-1" -> "mol m^-3 s^-1" with a factor of 1000.
 */
const TOKEN = /(?<![A-Za-z])(mmHg|torr|atm|bar|dm|L|M)(?:\^?\s*(-?\d+))?(?![A-Za-z])/g;
const PRESSURE: Record<string, number> = { atm: 101325, bar: 1e5, mmHg: 133.322368, torr: 133.322368 };

export function normaliseUnit(unit: string): { text: string; scale: number } {
  let scale = 1;
  const src = unit.replace(/[−–]/g, "-").replace(/mm\s+Hg/g, "mmHg").replace(/\^\s*\(\s*(-?\d+)\s*\)/g, "^$1").replace(/\^\s*\{\s*(-?\d+)\s*\}/g, "^$1");
  const text = src.replace(TOKEN, (m, tok: string, exp: string | undefined, off: number) => {
    const e = exp ? parseInt(exp, 10) : 1;
    const inDen = src.slice(0, off).includes("/");
    const eff = inDen ? -e : e;
    if (tok === "L") { scale *= Math.pow(1e-3, eff); return `m^${3 * e}`; }
    if (tok === "dm") { scale *= Math.pow(0.1, eff); return `m^${e}`; }
    if (tok === "M") { scale *= Math.pow(1000, eff); return `mol^${e} m^${-3 * e}`; }
    scale *= Math.pow(PRESSURE[tok], eff);
    return e === 1 ? "Pa" : `Pa^${e}`;
  });
  return { text, scale };
}

/** Number + unit answer check for chemistry. Rounding to 2-4 significant figures is accepted (see the Physics checker). */
export function checkChemAnswer(input: string, spec: AnsSpec): AnsResult {
  const q = parseQuantity(input);
  if (!q) return { status: "unreadable", message: "I couldn't find a number in your answer. Write it like 3.46 × 10^-2 s^-1 or 0.0346 min^-1." };
  const norm = normaliseUnit(q.unitText);
  const prefScale = spec.unit ? normaliseUnit(spec.unit).scale * (parseUnit(normaliseUnit(spec.unit).text)?.scale ?? 1) : 1;
  const needsUnit = spec.needUnit || !isDimensionless(spec.dim);

  if (!q.unitText && needsUnit) {
    const near = (x: number) => Math.abs(x - spec.value) <= spec.tol * Math.abs(spec.value);
    if (near(q.value) || near(q.value * prefScale)) return { status: "unit-missing", message: `The number is right, but the unit is part of the answer. Add it${spec.unit ? ` (for example ${spec.unit})` : ""}.` };
    return { status: "wrong", message: "That is not the value I expected, and the unit is missing." };
  }
  const value = q.value * norm.scale;
  const rebuilt = `${value.toExponential(12)} ${norm.text}`.trim();
  return checkAnswer(rebuilt, spec);
}
