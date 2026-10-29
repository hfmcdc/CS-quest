import type { CheckResult, MathQuestion } from "./types";
import { ParseError, compareExpr, evalConst, parseExpr, parseNumberList, parseVectorInput, usesX } from "./expr";

/** Default tolerance for typed numeric answers: a decimal rounded to ~3 significant figures is accepted. */
const ABS_TOL = 0.005;
const REL_TOL = 0.002;

export function numbersClose(a: number, b: number, tol?: number): boolean {
  const t = tol ?? Math.max(ABS_TOL, REL_TOL * Math.abs(b));
  return Math.abs(a - b) <= t;
}

function proportional(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false;
  const na = Math.hypot(...a);
  const nb = Math.hypot(...b);
  if (na < 1e-9 || nb < 1e-9) return false;
  for (let i = 0; i < a.length; i++) {
    for (let j = i + 1; j < a.length; j++) {
      if (Math.abs(a[i] * b[j] - a[j] * b[i]) > 0.003 * na * nb) return false;
    }
  }
  return true;
}

const CANNOT_READ =
  "I couldn't read that as a mathematical answer, so I can't check it automatically. Compare it with the model answer below.";

/**
 * Check a response. Returns "uncertain" (never "incorrect") whenever the input cannot be
 * interpreted or the question cannot be checked reliably by the app.
 */
export function checkAnswer(q: MathQuestion, response: string): CheckResult {
  const spec = q.spec;
  const r = response.trim();

  if (spec.kind === "manual") {
    return { status: "uncertain", message: "This answer cannot be checked automatically. Compare your working with the model answer." };
  }
  if (spec.kind === "mcq") {
    return { status: Number(r) === spec.correct ? "correct" : "incorrect" };
  }

  try {
    if (spec.kind === "numeric") {
      const v = evalConst(r);
      if (numbersClose(v, spec.value, spec.tol)) return { status: "correct", message: "Matches the model answer (numeric check)." };
      const trap = q.traps?.find((t) => numbersClose(v, t.value, spec.tol));
      return { status: "incorrect", message: trap?.msg };
    }

    if (spec.kind === "tuple") {
      const v = parseNumberList(r, spec.value.length);
      const ok = spec.proportional
        ? proportional(v, spec.value)
        : v.every((c, i) => numbersClose(c, spec.value[i]));
      return ok ? { status: "correct", message: "Matches the model answer (numeric check)." } : { status: "incorrect" };
    }

    if (spec.kind === "vector") {
      const v = parseVectorInput(r);
      const ok = v.every((c, i) => numbersClose(c, spec.value[i]));
      return ok ? { status: "correct", message: "Matches the model answer (component check)." } : { status: "incorrect" };
    }

    // expr / antiderivative
    const isAnti = spec.kind === "antiderivative";
    const cleaned = isAnti ? r.replace(/\s*\+\s*[cC]\s*$/, "") : r;
    const node = parseExpr(cleaned);
    if (!usesX(node)) {
      return { status: "uncertain", message: "Your answer doesn't contain x, so I can't compare it automatically. Compare it with the model answer below." };
    }
    const verdict = compareExpr(node, parseExpr(spec.model), spec.domain, isAnti ? "constant" : "exact");
    if (verdict === "equal") {
      return {
        status: "correct",
        message: isAnti
          ? "Equivalent to the model answer (checked numerically, up to the constant of integration)."
          : "Equivalent to the model answer (checked numerically).",
      };
    }
    if (verdict === "different") return { status: "incorrect" };
    return { status: "uncertain", message: "I couldn't compare that automatically. Compare it with the model answer below." };
  } catch (e) {
    if (e instanceof ParseError) return { status: "uncertain", message: CANNOT_READ };
    throw e;
  }
}
