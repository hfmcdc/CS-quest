const SUPER: Record<string, string> = { "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9", "⁻": "-", "⁺": "+" };

/** Lower-case, unify minus signs and super/subscripts, drop ^ { } and punctuation that never carries meaning. */
export function normaliseText(s: string): string {
  return s
    .toLowerCase()
    .replace(/[−–—]/g, "-")
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]/g, (c) => SUPER[c] ?? c)
    .replace(/[₀-₉]/g, (c) => String(c.charCodeAt(0) - 0x2080))
    .replace(/(?<=[a-z0-9α-ω])-(?=[a-zα-ω])/g, " ")
    .replace(/[\^{}$\\]/g, "")
    .replace(/[,;:()"'`!?]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export interface ConceptResult { status: "correct" | "partial" | "wrong"; matched: number; total: number }

/**
 * Structured keyword matching. This is not an AI evaluator: it checks that each required idea appears in some accepted wording.
 * Keywords must start at a word edge (so "chloroethane" does not match inside "dichloroethane"); formulae must be whole tokens
 * (so "c2h4" does not match inside "c2h4o"). `reject` lists wordings that mark an answer wrong even if the keywords are present.
 */
export function matchConcept(input: string, groups: string[][], reject: string[] = []): ConceptResult {
  const t = normaliseText(input);
  const compact = t.replace(/ /g, "");
  const esc = (x: string) => x.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const edge = (hay: string, n: string, right: boolean) => new RegExp(`(?<![a-z0-9])${esc(n)}${right ? "(?![a-z0-9])" : ""}`).test(hay);
  const hit = (p: string) => {
    const n = normaliseText(p);
    const formula = /\d/.test(n) && !n.includes(" ");
    if (formula) return edge(t, n, true) || edge(compact, n, true);
    if (n.includes(" ")) return edge(t, n, false) || compact.includes(n.replace(/ /g, ""));
    return edge(t, n, false);
  };
  if (reject.some(hit)) return { status: "wrong", matched: 0, total: groups.length };
  const matched = groups.filter((g) => g.some(hit)).length;
  const status = matched === groups.length ? "correct" : matched > 0 && matched * 2 >= groups.length ? "partial" : "wrong";
  return { status, matched, total: groups.length };
}
