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
  // Solutions (SI: mol m^-3, mol kg^-1, Pa, K, kg mol^-1)
  "sl-n1": (4.0 / 40) / 0.250 * 1000,
  "sl-n2": (5.0 / (5.0 + 95)) * 100,
  "sl-n3": (18 / 180) / 0.500,
  "sl-n4": (46 / 46) / (46 / 46 + 36 / 18),
  "sl-n5": 1.5e-3 * (3.0 / 1.0) * 1000,
  "sl-n6": 23.8 * (1 - 0.020) * 133.322368,
  "sl-n7": (0.40 * 450 + (1 - 0.40) * 700) * 133.322368,
  "sl-n8": 0.52 * ((1.8 / 180) / 0.100),
  "sl-n9": (5.12 * 1.0 * 1000 / (1.0 * 25)) / 1000,
  "sl-n10": ((0.60 / 60) / 0.200) * 0.0821 * 300 * 101325,
  "sl-n11": 2 * 1.86 * 0.10,
  "sl-n12": 3.4 / (5.12 * ((2.0 / 60) / 0.025)),
};


/** Atom-balance check for plain-ASCII equations such as "CH3COOH + NaHCO3 -> CH3COONa + CO2 + H2O". */
function countAtoms(formula: string): Record<string, number> | null {
  const f = formula.replace(/=/g, "");
  let pos = 0;
  const parse = (): Record<string, number> | null => {
    const out: Record<string, number> = {};
    while (pos < f.length && f[pos] !== ")") {
      if (f[pos] === "(") {
        pos++;
        const inner = parse();
        if (!inner || f[pos] !== ")") return null;
        pos++;
        const m = /^\d+/.exec(f.slice(pos));
        const mult = m ? parseInt(m[0], 10) : 1;
        if (m) pos += m[0].length;
        for (const [k, v] of Object.entries(inner)) out[k] = (out[k] ?? 0) + v * mult;
      } else {
        const m = /^([A-Z][a-z]?)(\d*)/.exec(f.slice(pos));
        if (!m) return null;
        pos += m[0].length;
        out[m[1]] = (out[m[1]] ?? 0) + (m[2] ? parseInt(m[2], 10) : 1);
      }
    }
    return out;
  };
  const r = parse();
  return r && pos === f.length ? r : null;
}
function side(expr: string): Record<string, number> | null {
  const total: Record<string, number> = {};
  for (const raw of expr.split(" + ")) {
    const t = raw.trim();
    const m = /^(\d+)(.*)$/.exec(t);
    const coef = m ? parseInt(m[1], 10) : 1;
    const atoms = countAtoms(m ? m[2] : t);
    if (!atoms) return null;
    for (const [k, v] of Object.entries(atoms)) total[k] = (total[k] ?? 0) + v * coef;
  }
  return total;
}
function checkBalance(id: string, eqs: string[] | undefined) {
  for (const e of eqs ?? []) {
    const [l, r] = e.split("->");
    const L = r === undefined ? null : side(l), R = r === undefined ? null : side(r);
    if (!L || !R) { bad(`${id}: cannot parse equation "${e}"`); continue; }
    const el = new Set([...Object.keys(L), ...Object.keys(R)]);
    const off = [...el].filter((k) => (L[k] ?? 0) !== (R[k] ?? 0)).map((k) => `${k} ${L[k] ?? 0}≠${R[k] ?? 0}`);
    if (off.length) bad(`${id}: not balanced (${off.join(", ")}) in "${e}"`);
  }
}

function checkMcq(list: ChemQuestion[], label: string, ids: Set<string>) {
  for (const x of list) {
    if (ids.has(x.id)) bad(`${label}: duplicate id ${x.id}`); ids.add(x.id);
    if (!x.options.includes(x.answer)) bad(`${x.id}: answer is not one of the options`);
    if (new Set(x.options).size !== x.options.length) bad(`${x.id}: duplicate options`);
    if (x.options.length !== 4) bad(`${x.id}: expected 4 options`);
    if (!x.why.trim() || !x.hint.trim()) bad(`${x.id}: missing explanation or hint`);
    if (label === "predict" && !(x.steps && x.steps.length >= 2)) bad(`${x.id}: predict items need step-by-step reasoning`);
    if (label === "challenge" && !x.challenge) bad(`${x.id}: challenge item is not flagged`);
    checkBalance(x.id, x.balance);
  }
}

function checkChapter(slug: string, c: ChemChapterContent, features: string[]) {
  console.log(`\n${slug}`);
  const ids = new Set<string>();
  checkMcq(c.questions, "practice", ids); checkMcq(c.challenge, "challenge", ids); checkMcq(c.predict ?? [], "predict", ids);
  for (const k of c.cards) { if (ids.has(k.id)) bad(`duplicate id ${k.id}`); ids.add(k.id); if (!k.front || !k.back) bad(`${k.id}: empty card`); }
  const has: Record<string, number> = { revise: c.sections.length, cards: c.cards.length, concept: c.concept?.length ?? 0, numerical: c.numerical?.length ?? 0, practice: c.questions.length, predict: c.predict?.length ?? 0, challenge: c.challenge.length, equations: c.equations?.length ?? 0, reactions: c.reactions?.length ?? 0 };
  for (const f of features) if (!has[f]) bad(`feature "${f}" is declared but has no content`);
  for (const [f, n] of Object.entries(has)) if (n && !features.includes(f)) bad(`content for "${f}" exists but the feature is not declared`);

  for (const s of c.concept ?? []) {
    if (ids.has(s.id)) bad(`duplicate id ${s.id}`); ids.add(s.id);
    const r = matchConcept(s.model, s.groups, s.reject);
    if (r.status !== "correct") bad(`${s.id}: the model answer does not satisfy its own matcher (${r.matched}/${r.total})`);
    if (matchConcept("I do not know", s.groups, s.reject).status === "correct") bad(`${s.id}: matcher accepts an empty answer`);
  }

  for (const s of c.equations ?? []) {
    if (ids.has(s.id)) bad(`duplicate id ${s.id}`); ids.add(s.id);
    if (matchConcept(s.model, s.groups, s.reject).status !== "correct") bad(`${s.id}: the model answer does not satisfy its own matcher`);
    if (matchConcept("I do not know", s.groups, s.reject).status === "correct") bad(`${s.id}: matcher accepts an empty answer`);
    checkBalance(s.id, s.balance);
  }
  for (const r of c.reactions ?? []) {
    if (ids.has(r.id)) bad(`duplicate id ${r.id}`); ids.add(r.id);
    if (!r.stages.length) bad(`${r.id}: no stages`);
    r.stages.forEach((g, k) => {
      if (g.options.length !== 4) bad(`${r.id} step ${k + 1}: expected 4 options`);
      if (new Set(g.options).size !== g.options.length) bad(`${r.id} step ${k + 1}: duplicate options`);
      if (!g.options[g.answer]) bad(`${r.id} step ${k + 1}: answer index out of range`);
      if (!g.why.trim() || !g.hint.trim()) bad(`${r.id} step ${k + 1}: missing explanation or hint`);
    });
    checkBalance(r.id, r.balance);
  }
  for (const n of c.numerical ?? []) {
    if (ids.has(n.id)) bad(`duplicate id ${n.id}`); ids.add(n.id);
    if (n.formulaOptions.length !== 4 || !n.formulaOptions[n.formulaAnswer]) bad(`${n.id}: formula options`);
    for (const t of [n.text, n.ansShow, ...n.formulaOptions, ...n.steps]) { try { parseRich(t); } catch (e) { bad(`${n.id}: ${(e as Error).message}`); } }
    const exp = EXPECT[n.id];
    if (exp === undefined) bad(`${n.id}: no independent expected value`);
    else if (!near(n.ans.value, exp, 0.01)) bad(`${n.id}: stored ${n.ans.value} vs recomputed ${exp}`);
    else console.log(`  ✓ ${n.id}  ${exp.toPrecision(4)}`);
  }
}

console.log("Chemistry content checks");
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
  const sl = (await CHEM_CHAPTERS.find((m) => m.slug === "solutions")!.load()).numerical!;
  const sget = (id: string) => sl.find((n) => n.id === id)!.ans;
  const scases: [string, string, string][] = [
    ["sl-n1", "0.40 mol/L", "correct"], ["sl-n1", "0.4 M", "correct"], ["sl-n1", "0.4 mol dm^-3", "correct"], ["sl-n1", "400 mol m^-3", "correct"], ["sl-n1", "0.4", "unit-missing"], ["sl-n1", "0.4 mol/kg", "unit-wrong"], ["sl-n1", "1.6 M", "wrong"],
    ["sl-n2", "5", "correct"], ["sl-n2", "5%", "correct"], ["sl-n2", "5.0 % w/w", "correct"], ["sl-n2", "5.3", "wrong"],
    ["sl-n3", "0.20 mol kg^-1", "correct"], ["sl-n3", "0.2 m", "unit-wrong"], ["sl-n3", "0.2 mol/kg", "correct"], ["sl-n3", "0.2 mol/L", "unit-wrong"],
    ["sl-n4", "0.333", "correct"], ["sl-n4", "1/3", "correct"], ["sl-n4", "0.5", "wrong"],
    ["sl-n6", "23.3 mm Hg", "correct"], ["sl-n6", "23.324 mmHg", "correct"], ["sl-n6", "23.3 torr", "correct"], ["sl-n6", "3110 Pa", "correct"], ["sl-n6", "23.3", "unit-missing"], ["sl-n6", "0.98 mm Hg", "wrong"],
    ["sl-n7", "600 mm Hg", "correct"], ["sl-n7", "0.789 atm", "correct"], ["sl-n7", "1150 mm Hg", "wrong"],
    ["sl-n8", "0.052 K", "correct"], ["sl-n8", "0.052", "unit-missing"],
    ["sl-n9", "204.8 g/mol", "correct"], ["sl-n9", "205 g mol^-1", "correct"], ["sl-n9", "0.205 kg/mol", "correct"], ["sl-n9", "204.8", "unit-missing"],
    ["sl-n10", "1.23 atm", "correct"], ["sl-n10", "1.25 bar", "correct"], ["sl-n10", "124 kPa", "correct"], ["sl-n10", "1.23", "unit-missing"], ["sl-n10", "12.3 atm", "wrong"],
    ["sl-n11", "0.372 K", "correct"], ["sl-n11", "0.186 K", "wrong"],
    ["sl-n12", "0.50", "correct"], ["sl-n12", "0.498", "correct"], ["sl-n12", "2", "wrong"],
  ];
  for (const [id, input, want] of scases) {
    const got = checkChemAnswer(input, sget(id));
    if (got.status !== want) bad(`${id} "${input}" -> ${got.status} (wanted ${want}): ${got.message}`);
  }
  for (const [id, input, want] of cases) {
    const got = checkChemAnswer(input, get(id));
    if (got.status !== want) bad(`${id} "${input}" -> ${got.status} (wanted ${want}): ${got.message}`);
  }
  console.log(`  ${cases.length + scases.length} spellings checked`);

  console.log("\ntyped-answer matcher: accepted and rejected wordings");
  const bank = new Map<string, import("../lib/chemistry/types").ChemConceptQ>();
  for (const m of CHEM_CHAPTERS) { const c = await m.load(); for (const x of [...(c.concept ?? []), ...(c.equations ?? [])]) bank.set(x.id, x); }
  const M: [string, string, boolean][] = [
    ["ap-e2", "ethene", true], ["ap-e2", "CH2=CH2", true], ["ap-e2", "C2H4", true], ["ap-e2", "C2H4O", false], ["ap-e2", "ethanol", false], ["ap-e2", "ethane", false],
    ["ha-e1", "chloroethane", true], ["ha-e1", "CH3CH2Cl", true], ["ha-e1", "CH 3 CH 2 Cl", true], ["ha-e1", "CH3CH2OH", false], ["ha-e1", "dichloroethane", false], ["ha-e8", "2-bromopropane", true], ["ha-e8", "1-bromopropane", false], ["ap-e8", "propan-2-ol", true], ["ap-e8", "2-propanol", true], ["ap-e8", "propan-1-ol", false],
    ["ha-e7", "ethyl isocyanide", true], ["ha-e7", "ethyl cyanide", false], ["ha-e7", "CH3CH2CN", false],
    ["ak-e1", "acetaldehyde", true], ["ak-e1", "CH3CHO", true], ["ak-e1", "ethanoic acid", false], ["ak-e1", "CH3COOH", false],
    ["ak-e9", "methane", true], ["ak-e9", "CH4", true], ["ak-e9", "ethane", false],
    ["am-e3", "methanamine", true], ["am-e3", "CH3NH2", true], ["am-e3", "ethanamine", false], ["am-e3", "CH3CH2NH2", false],
    ["am-e10", "ethanol", true], ["am-e10", "ethylamine", false],
    ["kn-s5", "s^-1", true], ["kn-s5", "per second", true], ["kn-s5", "mol L^-1 s^-1", false], ["kn-s5", "L mol^-1 s^-1", false],
    ["kn-s6", "straight line of [R] against t with slope -k", true], ["kn-s6", "a straight line", false],
    ["ak-s7", "formaldehyde has no alpha hydrogen", true], ["ak-s7", "no", false],
    ["ap-s1", "phenoxide ion is stabilised by resonance", true], ["ap-s1", "phenol has an OH group", false],
    ["am-s1", "alkyl groups have +I effect and increase electron density on N", true], ["am-s1", "they are bigger", false],
    ["bm-e1", "gluconic acid", true], ["bm-e1", "saccharic acid", false], ["bm-e2", "saccharic acid", true], ["bm-e2", "gluconic acid", false],
    ["bm-e7", "glucose and fructose", true], ["bm-e7", "glucose", false], ["bm-e9", "galactose and glucose", true], ["bm-e9", "glucose and fructose", false],
    ["bm-e12", "TACG", true], ["bm-e12", "T-A-C-G", true], ["bm-e12", "UACG", false],
    ["bm-s10", "A pairs with T by 2 H bonds and G pairs with C by 3 H bonds", true], ["bm-s10", "A with T and G with C", false],
    ["bm-s9", "DNA has deoxyribose and thymine, RNA has uracil", true], ["bm-s9", "RNA has uracil", false],
    ["sl-s6", "they depend on the number of solute particles", true], ["sl-s6", "they depend on the nature of the solute", false],
    ["sl-s2", "partial pressure of a gas is proportional to its mole fraction in solution", true], ["sl-s2", "gas dissolves more at high temperature", false],
  ];
  for (const [id, input, want] of M) {
    const x = bank.get(id);
    if (!x) { bad(`matcher test: unknown id ${id}`); continue; }
    const got = matchConcept(input, x.groups, x.reject).status === "correct";
    if (got !== want) bad(`${id} "${input}" -> ${got ? "accepted" : "rejected"} (wanted ${want ? "accepted" : "rejected"})`);
  }
  console.log(`  ${M.length} wordings checked`);
  // mmHg must not be misread
  const mm = normaliseUnit("mmHg");
  if (mm.text !== "Pa" || !near(mm.scale, 133.322368, 1e-6)) bad("mmHg normalisation");

  if (fails) { console.error(`\n${fails} problem(s)`); process.exit(1); }
  console.log("\nAll chemistry checks passed.");
})();
