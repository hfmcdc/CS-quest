import type { Outcome, Question } from "./types";

const ws = (s: string) => s.replace(/\s+/g, " ").trim();

/** Normalise harmless differences (whitespace, case for SQL, trailing ;, quote style in SQL). */
export function normalise(q: Question, raw: string): string {
  if (q.check.output) {
    if (q.topic === "sql") return ws(raw.toLowerCase().replace(/[|,+]|-{2,}/g, " "));
    return raw.split("\n").map(ws).filter(Boolean).join("\n");
  }
  let t = ws(raw).replace(/;\s*$/, "");
  if (q.topic === "sql") {
    t = t.toLowerCase().replace(/"/g, "'").replace(/\s*([(),=<>+*])\s*/g, "$1");
  }
  return t;
}

/**
 * Conservative checker. It NEVER runs code or SQL.
 * correct   -> matches an accepted answer, or all required patterns are present
 * incorrect -> blank, hits a forbidden pattern, or (strict/output) fails to match
 * manual    -> cannot decide; the student compares with the model answer
 */
export function evaluate(q: Question, raw: string): Outcome {
  if (q.options) return raw === q.answer ? "correct" : "incorrect";
  const a = normalise(q, raw);
  if (!a) return "incorrect";
  const c = q.check;
  const hit = (p: string) => new RegExp(p, "i").test(a);
  if (c.forbid?.some(hit)) return "incorrect";
  if (c.accepted?.some((x) => normalise(q, x) === a)) return "correct";
  if (c.output || c.strict) return "incorrect";
  if (c.all || c.any) {
    const okAll = !c.all || c.all.every(hit);
    const okAny = !c.any || c.any.some(hit);
    if (okAll && okAny) return "correct";
  }
  return "manual";
}
