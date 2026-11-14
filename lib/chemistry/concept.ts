const SUPER: Record<string, string> = { "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9", "⁻": "-", "⁺": "+" };

/** Lower-case, unify minus signs and super/subscripts, drop ^ { } and punctuation that never carries meaning. */
export function normaliseText(s: string): string {
  return s
    .toLowerCase()
    .replace(/[−–—]/g, "-")
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]/g, (c) => SUPER[c] ?? c)
    .replace(/[₀-₉]/g, (c) => String(c.charCodeAt(0) - 0x2080))
    .replace(/(?<=[a-zα-ω])-(?=[a-zα-ω])/g, " ")
    .replace(/[\^{}$\\]/g, "")
    .replace(/[,;:()"'`!?]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export interface ConceptResult { status: "correct" | "partial" | "wrong"; matched: number; total: number }

/** Structured keyword matching. This is not an AI evaluator: it checks that each required idea appears in some accepted wording. */
export function matchConcept(input: string, groups: string[][]): ConceptResult {
  const t = normaliseText(input);
  const compact = t.replace(/ /g, "");
  const hit = (p: string) => {
    const n = normaliseText(p);
    return t.includes(n) || compact.includes(n.replace(/ /g, ""));
  };
  const matched = groups.filter((g) => g.some(hit)).length;
  const status = matched === groups.length ? "correct" : matched > 0 && matched * 2 >= groups.length ? "partial" : "wrong";
  return { status, matched, total: groups.length };
}
