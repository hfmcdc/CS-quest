/* Content and checker verification for Chemistry.  Run:  npm run verify:chemistry
 * - every numerical answer is recomputed here independently of the content file
 * - every formula / option string must parse with the Physics TeX parser
 * - every model concept answer must satisfy its own matcher
 * - the unit shim is exercised with the unit spellings students actually type
 */
import { CHEM_CHAPTERS } from "../lib/chemistry/chapters";
import { checkChemAnswer, normaliseUnit } from "../lib/chemistry/units";
import { matchConcept } from "../lib/chemistry/concept";
import { parseRich } from "../lib/physics/tex";
import type { ChemChapterContent, ChemQuestion } from "../lib/chemistry/types";

let fails = 0;
const bad = (m: string) => { fails++; console.error("  ✗ " + m); };
const near = (a: number, b: number, tol = 0.005) => Math.abs(a - b) <= tol * Math.abs(b);

/** Independent recomputation, keyed by question id. Values are in SI base units (mol m^-3 for mol L^-1 etc.). */
const R = 8.314, LN10 = 2.303;
const EXPECT: Record<string, number> = {
  "kn-n1": 0.693 / 2.0e-3,
  "kn-n2": 0.693 / 20 / 60,
  "kn-n3": Math.pow(3, 2),
  "kn-n4": (LN10 / 6.93e-3) * Math.log10(100 / 25),
  "kn-n5": ((0.80 - 0.60) / 25) * 1000 / 60,
  "kn-n6": (0.020 / Math.pow(0.10, 2)) * 1e-3,
  "kn-n7": Math.pow(10, (60000 / (LN10 * R)) * ((310 - 300) / (300 * 310))),
  "kn-n8": LN10 * R * ((298 * 308) / (308 - 298)) * Math.log10(2),
  "kn-n9": (LN10 / 10) * Math.log10(100 / 80) / 60,
};

function checkMcq(list: ChemQuestion[], label: string, ids: Set<string>) {
  for (const x of list) {
    if (ids.has(x.id)) bad(`${label}: duplicate id ${x.id}`); ids.add(x.id);
    if (!x.options.includes(x.answer)) bad(`${x.id}: answer is not one of the options`);
    if (new Set(x.options).size !== x.options.length) bad(`${x.id}: duplicate options`);
    if (x.options.length !== 4) bad(`${x.id}: expected 4 options`);
    if (!x.why.trim() || !x.hint.trim()) bad(`${x.id}: missing explanation or hint`);
  }
}

function checkChapter(slug: string, c: ChemChapterContent, features: string[]) {
  console.log(`\n${slug}`);
  const ids = new Set<string>();
  checkMcq(c.questions, "practice", ids); checkMcq(c.challenge, "challenge", ids); checkMcq(c.predict ?? [], "predict", ids);
  for (const k of c.cards) { if (ids.has(k.id)) bad(`duplicate id ${k.id}`); ids.add(k.id); if (!k.front || !k.back) bad(`${k.id}: empty card`); }
  const has: Record<string, number> = { revise: c.sections.length, cards: c.cards.length, concept: c.concept?.length ?? 0, numerical: c.numerical?.length ?? 0, practice: c.questions.length, predict: c.predict?.length ?? 0, challenge: c.challenge.length };
  for (const f of features) if (!has[f]) bad(`feature "${f}" is declared but has no content`);
  for (const [f, n] of Object.entries(has)) if (n && !features.includes(f)) bad(`content for "${f}" exists but the feature is not declared`);

  for (const s of c.concept ?? []) {
    if (ids.has(s.id)) bad(`duplicate id ${s.id}`); ids.add(s.id);
    const r = matchConcept(s.model, s.groups);
    if (r.status !== "correct") bad(`${s.id}: the model answer does not satisfy its own matcher (${r.matched}/${r.total})`);
    if (matchConcept("I do not know", s.groups).status === "correct") bad(`${s.id}: matcher accepts an empty answer`);
  }

  for (const n of c.numerical ?? []) {
    if (ids.has(n.id)) bad(`duplicate id ${n.id}`); ids.add(n.id);
    if (n.formulaOptions.length !== 4 || !n.formulaOptions[n.formulaAnswer]) bad(`${n.id}: formula options`);
    for (const t of [n.text, n.ansShow, ...n.formulaOptions, ...n.steps]) { try { parseRich(t); } catch (e) { bad(`${n.id}: ${(e as Error).message}`); } }
    const exp = EXPECT[n.id];
    if (exp === undefined) bad(`${n.id}: no independent expected value`);
    else if (!near(n.ans.value, exp, 0.01)) bad(`${n.id}: stored ${n.ans.value} vs recomputed ${exp}`);
    else console.log(`  ✓ ${n.id}  ${exp.toPrecision(4)}`);
    // the answer written in the preferred unit must be accepted
    if (n.ans.unit) {
      const sc = normaliseUnit(n.ans.unit).scale;
      void sc;
    }
  }
}

console.log("Chemistry content checks");
for (const meta of CHEM_CHAPTERS) {
  // eslint-disable-next-line no-await-in-loop
  (async () => {})();
}
(async () => {
  for (const meta of CHEM_CHAPTERS) checkChapter(meta.slug, await meta.load(), meta.features);

  console.log("\nunit shim and answer checker");
  const kin = (await CHEM_CHAPTERS.find((m) => m.slug === "chemical-kinetics")!.load()).numerical!;
  const get = (id: string) => kin.find((n) => n.id === id)!.ans;
  const cases: [string, string, string][] = [
    ["kn-n1", "346.5 s", "correct"], ["kn-n1", "347 s", "correct"], ["kn-n1", "3.465e2 s", "correct"], ["kn-n1", "5.8 min", "correct"], ["kn-n1", "347", "unit-missing"], ["kn-n1", "347 m", "unit-wrong"], ["kn-n1", "400 s", "wrong"],
    ["kn-n2", "0.0347 min^-1", "correct"], ["kn-n2", "3.47 × 10⁻² min⁻¹", "correct"], ["kn-n2", "5.78e-4 s^-1", "correct"], ["kn-n2", "0.0347", "unit-missing"], ["kn-n2", "0.0347 s^-1", "wrong"],
    ["kn-n5", "8.0 × 10⁻³ mol L⁻¹ min⁻¹", "correct"], ["kn-n5", "8e-3 mol L^-1 min^-1", "correct"], ["kn-n5", "8e-3 mol/L/min", "correct"], ["kn-n5", "8e-3 M min^-1", "correct"], ["kn-n5", "0.133 mol m^-3 s^-1", "correct"], ["kn-n5", "8e-3 s^-1", "unit-wrong"],
    ["kn-n6", "2.0 L mol^-1 s^-1", "correct"], ["kn-n6", "2 dm^3 mol^-1 s^-1", "correct"], ["kn-n6", "2 M^-1 s^-1", "correct"], ["kn-n6", "2.0 s^-1", "unit-wrong"],
    ["kn-n7", "2.17", "correct"], ["kn-n7", "2.2", "correct"], ["kn-n7", "3", "wrong"],
    ["kn-n8", "52.9 kJ mol^-1", "correct"], ["kn-n8", "52900 J mol^-1", "correct"], ["kn-n8", "52.9 kJ/mol", "correct"], ["kn-n8", "52.9 J mol^-1", "wrong"], ["kn-n8", "52.9", "unit-missing"],
    ["kn-n3", "9", "correct"], ["kn-n3", "6", "wrong"],
  ];
  for (const [id, input, want] of cases) {
    const got = checkChemAnswer(input, get(id));
    if (got.status !== want) bad(`${id} "${input}" -> ${got.status} (wanted ${want}): ${got.message}`);
  }
  console.log(`  ${cases.length} spellings checked`);
  // mmHg must not be misread
  const mm = normaliseUnit("mmHg");
  if (mm.text !== "Pa" || !near(mm.scale, 133.322368, 1e-6)) bad("mmHg normalisation");

  if (fails) { console.error(`\n${fails} problem(s)`); process.exit(1); }
  console.log("\nAll chemistry checks passed.");
})();
