/**
 * Verifies the Physics question banks and answer engines.   npm run verify:physics   (add --write to refresh lib/physics/counts.generated.ts)
 *
 * What it checks for every chapter:
 *  - registry: 14 chapters in order, weightage groups add to 70, labels never invent per-chapter marks
 *  - content: all four features exist and meet minimum sizes; unique ids; MCQ answers in range; distinct options
 *  - every string with maths parses with the same LaTeX parser the app uses (an unknown command fails here)
 *  - equation-identification options contain equations only (no names or words)
 *  - every numerical: the stated relations reproduce the independent calc() value; the model answer is accepted;
 *    a wrong answer is rejected; the model equation (and a rearrangement) is accepted; a perturbed one is rejected
 */
import { writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { PHYS_CHAPTERS, WEIGHT_GROUPS, loadPhysContent, weightLabel, weightNote } from "../lib/physics/chapters";
import { checkAnswer, parseQuantity } from "../lib/physics/engine/answer";
import { checkEquation, evalModel, modelHoldsItself } from "../lib/physics/engine/equation";
import { parseUnit, sameDim } from "../lib/physics/engine/units";
import { parseRich, parseTex } from "../lib/physics/tex";
import type { PhysNumQ } from "../lib/physics/types";

let failures = 0;
const fail = (where: string, msg: string) => { failures++; console.error(`  ✗ ${where}: ${msg}`); };
const ok = (cond: unknown, where: string, msg: string) => { if (!cond) fail(where, msg); };

const MIN = { cards: 10, mcq: 6, written: 2, numerical: 6, equations: 6, advancedPerLevel: 2 };

function checkRich(where: string, s: string | undefined) {
  if (s === undefined) return;
  try { parseRich(s); } catch (e) { fail(where, (e as Error).message); }
}
function checkTex(where: string, s: string) {
  try { parseTex(s); } catch (e) { fail(where, (e as Error).message); }
}

/** Walk any content object and validate every string that may carry maths. */
function walkStrings(where: string, v: unknown, key = "") {
  if (typeof v === "string") { if (key === "eq" || key === "eqShow") checkTex(`${where}.${key}`, v); else checkRich(`${where}.${key}`, v); return; }
  if (Array.isArray(v)) { v.forEach((x) => walkStrings(where, x, key)); return; }
  if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) { if (k === "eq" && typeof x === "object") continue; walkStrings(where, x, k); }
}

function verifyNumerical(q: PhysNumQ, where: string) {
  const w = `${where} ${q.id}`;
  ok(q.text.length > 20, w, "question text too short");
  ok(q.hint.length > 8, w, "missing hint");
  ok(q.steps.length >= 2, w, "needs at least two solution steps");
  ok(q.eqShow.length > 3, w, "missing model equation");
  ok(Object.keys(q.sym).length >= 1, w, "needs symbol descriptions");
  checkTex(`${w}.eqShow`, q.eqShow);
  if (!modelHoldsItself(q.eq)) { fail(w, "relation system is not evaluable at sample points (check ranges)"); return; }

  // 1. stated relations reproduce the independently computed answer
  const vals = { ...q.eq.actual } as Record<string, number>;
  delete vals[q.eq.target];
  let viaRels = NaN;
  try { viaRels = evalModel(q.eq, vals); } catch (e) { fail(w, `relations cannot be evaluated from the givens: ${(e as Error).message}`); }
  if (!(Math.abs(viaRels - q.ans.value) <= 0.003 * Math.abs(q.ans.value))) fail(w, `relations give ${viaRels} but calc() gives ${q.ans.value}`);

  // 2. the model answer is accepted, in its own unit and in SI base units
  const u = q.ans.unit ? parseUnit(q.ans.unit) : null;
  const scale = u ? u.scale : 1;
  if (u) ok(sameDim(u.dim, q.ans.dim), w, "answer unit dimension mismatch");
  const own = `${q.ans.value / scale} ${q.ans.unit}`.trim();
  const r1 = checkAnswer(own, q.ans);
  ok(r1.status === "correct", w, `model answer "${own}" not accepted: ${r1.status} ${r1.message}`);
  if (q.ans.unit) {
    const r2 = checkAnswer(`${(q.ans.value / scale).toExponential(6)} ${q.ans.unit}`, q.ans);
    ok(r2.status === "correct", w, `sci-notation answer not accepted: ${r2.message}`);
  }
  // the exact text shown to students as the model answer must also be accepted when typed back (e.g. "10^-4 N m")
  const shown = q.ansShow.replace(/\$/g, "").replace(/\\ /g, " ").replace(/\\,/g, " ").replace(/\\times10\^\{(-?\d+)\}/g, "e$1").replace(/\\text\{([^}]*)\}/g, "$1").replace(/\\mu/g, "µ").replace(/\\Omega/g, "Ω").replace(/\^\{(-?\d+)\}/g, "^$1").replace(/\^\\circ/g, "°");
  const rShown = checkAnswer(shown, q.ans);
  ok(rShown.status === "correct", w, `the displayed model answer "${shown}" is not accepted when typed back: ${rShown.message}`);
  // 3. a clearly wrong answer is rejected
  const wrong = checkAnswer(`${(q.ans.value / scale) * 1.25} ${q.ans.unit}`.trim(), q.ans);
  ok(wrong.status === "wrong", w, `+25% answer was not rejected (${wrong.status})`);
  if (q.ans.unit) ok(parseQuantity(own) !== null, w, "own answer not parseable");

  // 4. equations: each model relation is accepted; a perturbed relation is rejected; rearranged form is accepted
  for (const [subject, rhs] of q.eq.rels) {
    if (subject === q.eq.target) {
      const good = checkEquation(`${subject} = ${rhs}`, q.eq);
      ok(good.status === "correct", w, `model relation "${subject} = ${rhs}" rejected: ${good.message}`);
      const bad = checkEquation(`${subject} = (${rhs}) * 1.5`, q.eq);
      ok(bad.status === "incorrect", w, `perturbed relation accepted (${bad.status})`);
      const trivial = checkEquation(`${subject} = ${subject}`, q.eq);
      ok(trivial.status === "incorrect", w, `trivial identity accepted (${trivial.status})`);
    }
  }
  const targetRel = q.eq.rels.find((r) => r[0] === q.eq.target) ?? q.eq.rels[q.eq.rels.length - 1];
  const only = checkEquation(`${targetRel[1]}`, q.eq);
  ok(only.status === "correct", w, `bare expression form rejected: ${only.message}`);
  const sub = checkEquation(`${q.eq.target}`, q.eq);
  ok(sub.status !== "correct", w, "bare target symbol accepted");
}

(async () => {
  console.log("Registry");
  ok(PHYS_CHAPTERS.length === 14, "registry", `expected 14 chapters, found ${PHYS_CHAPTERS.length}`);
  PHYS_CHAPTERS.forEach((c, i) => ok(c.number === i + 1, "registry", `chapter ${c.slug} number ${c.number} != ${i + 1}`));
  ok(new Set(PHYS_CHAPTERS.map((c) => c.slug)).size === 14, "registry", "duplicate slugs");
  ok(WEIGHT_GROUPS.reduce((a, g) => a + g.marks, 0) === 70, "weightage", "groups do not add to 70");
  const covered = WEIGHT_GROUPS.flatMap((g) => g.chapters).sort((a, b) => a - b).join(",");
  ok(covered === "1,2,3,4,5,6,7,8,9,10,11,12,13,14", "weightage", `chapters not covered exactly once: ${covered}`);
  for (const c of PHYS_CHAPTERS) {
    const label = weightLabel(c.number);
    if (c.number === 14) ok(label === "7 marks · Unit IX", "weightage", `chapter 14 label "${label}"`);
    else ok(/^Part of (16|17|18|12)-mark unit group$/.test(label), "weightage", `chapter ${c.number} label "${label}"`);
    ok(!/^\d+ marks/.test(label) || c.number === 14, "weightage", "a chapter 1-13 label must never state a bare per-chapter mark count");
    ok(weightNote(c.number).length > 20, "weightage", "missing note");
  }
  ok(weightLabel(1) === "Part of 16-mark unit group" && weightLabel(3) === "Part of 16-mark unit group", "weightage", "chapters 1-3 should say 16");
  ok(weightLabel(4) === "Part of 17-mark unit group" && weightLabel(7) === "Part of 17-mark unit group", "weightage", "chapters 4-7 should say 17");
  ok(weightLabel(8) === "Part of 18-mark unit group" && weightLabel(10) === "Part of 18-mark unit group", "weightage", "chapters 8-10 should say 18");
  ok(weightLabel(11) === "Part of 12-mark unit group" && weightLabel(13) === "Part of 12-mark unit group", "weightage", "chapters 11-13 should say 12");

  const counts: Record<string, { cards: number; concept: number; numerical: number; equations: number; advanced: number }> = {};
  const seen = new Set<string>();
  const rows: string[] = [];

  for (const ch of PHYS_CHAPTERS) {
    if (process.env.PHYS_ONLY && !process.env.PHYS_ONLY.split(",").includes(ch.slug)) continue;
    console.log(`Chapter ${ch.number}: ${ch.title}`);
    const where = `ch${ch.number}`;
    let fc, pr, eq, ad;
    try {
      [fc, pr, eq, ad] = await Promise.all([loadPhysContent(ch.slug, "flashcards"), loadPhysContent(ch.slug, "practice"), loadPhysContent(ch.slug, "equations"), loadPhysContent(ch.slug, "advanced")]);
    } catch (e) { fail(where, `content failed to load: ${(e as Error).message}`); continue; }

    const uniq = (id: string) => { ok(!seen.has(id), where, `duplicate id ${id}`); seen.add(id); };

    // flashcards
    ok(fc.cards.length >= MIN.cards, where, `only ${fc.cards.length} flashcards (min ${MIN.cards})`);
    for (const c of fc.cards) {
      uniq(c.id);
      ok(c.front && c.eq && c.symbols.length >= 1, `${where} ${c.id}`, "incomplete card");
      c.symbols.forEach((s) => ok(s.s && s.m, `${where} ${c.id}`, "symbol needs a name and a meaning"));
      walkStrings(`${where} ${c.id}`, c);
    }

    // conceptual
    const mcqs = pr.concept.filter((q) => q.kind === "mcq");
    const writ = pr.concept.filter((q) => q.kind === "written");
    ok(mcqs.length >= MIN.mcq, where, `only ${mcqs.length} conceptual MCQs (min ${MIN.mcq})`);
    ok(writ.length >= MIN.written, where, `only ${writ.length} written questions (min ${MIN.written})`);
    for (const q of pr.concept) {
      uniq(q.id);
      walkStrings(`${where} ${q.id}`, q);
      if (q.kind === "mcq") {
        ok(q.options.length === 4, `${where} ${q.id}`, "MCQ needs 4 options");
        ok(q.answer >= 0 && q.answer < q.options.length, `${where} ${q.id}`, "answer index out of range");
        ok(new Set(q.options).size === q.options.length, `${where} ${q.id}`, "duplicate options");
        ok(q.why.length > 20, `${where} ${q.id}`, "needs an explanation");
      } else {
        ok(q.points.length >= 2 && q.model.length > 30, `${where} ${q.id}`, "written answer needs a model answer and key points");
      }
    }

    // numericals
    ok(pr.numerical.length >= MIN.numerical, where, `only ${pr.numerical.length} practice numericals (min ${MIN.numerical})`);
    for (const lv of [1, 2, 3]) ok(pr.numerical.some((q) => q.level === lv), where, `no practice numerical at level ${lv}`);
    for (const q of pr.numerical) { uniq(q.id); walkStrings(`${where} ${q.id}`, { text: q.text, hint: q.hint, steps: q.steps, ansShow: q.ansShow }); verifyNumerical(q, `${where} practice`); }

    // equation identification
    ok(eq.questions.length >= MIN.equations, where, `only ${eq.questions.length} equation questions (min ${MIN.equations})`);
    for (const q of eq.questions) {
      uniq(q.id);
      const w = `${where} ${q.id}`;
      ok(q.options.length === 4 && new Set(q.options).size === 4, w, "needs 4 distinct options");
      ok(q.answer >= 0 && q.answer < 4, w, "answer index out of range");
      checkRich(`${w}.q`, q.q); checkRich(`${w}.why`, q.why);
      q.options.forEach((o, i) => {
        checkTex(`${w}.option${i}`, o);
        const stripped = o.replace(/\\text\{[^}]*\}/g, "").replace(/\\[A-Za-z]+/g, "");
        ok(/=/.test(o), w, `option ${i} is not an equation`);
        ok(!/[A-Za-z]{4,}/.test(stripped), w, `option ${i} contains a word: "${o}"`);
      });
      ok(q.why.length > 30, w, "needs an explanation");
    }

    // advanced
    const lv = [0, 0, 0, 0];
    for (const q of ad.problems) { uniq(q.id); lv[q.level]++; walkStrings(`${where} ${q.id}`, { text: q.text, hint: q.hint, steps: q.steps, ansShow: q.ansShow }); verifyNumerical(q, `${where} advanced`); }
    for (const l of [1, 2, 3]) ok(lv[l] >= MIN.advancedPerLevel, where, `advanced level ${l} has ${lv[l]} problems (min ${MIN.advancedPerLevel})`);

    counts[ch.slug] = { cards: fc.cards.length, concept: pr.concept.length, numerical: pr.numerical.length, equations: eq.questions.length, advanced: ad.problems.length };
    rows.push(`  ${String(ch.number).padStart(2)}  ${ch.short.padEnd(24)} cards ${String(fc.cards.length).padStart(2)} | concept ${String(pr.concept.length).padStart(2)} | numerical ${String(pr.numerical.length).padStart(2)} | equations ${String(eq.questions.length).padStart(2)} | advanced ${String(ad.problems.length).padStart(2)} (B${lv[1]} H${lv[2]} J${lv[3]})`);
  }

  console.log("\nCoverage\n" + rows.join("\n"));

  // generated counts (so the chapter hub can show sizes without loading any question bank)
  const file = join(__dirname, "..", "lib", "physics", "counts.generated.ts");
  const body = `// Generated by \`npm run verify:physics -- --write\`. Do not edit by hand.\nexport const PHYS_COUNTS: Record<string, { cards: number; concept: number; numerical: number; equations: number; advanced: number }> = ${JSON.stringify(counts, null, 2)};\n`;
  if (process.argv.includes("--write")) { writeFileSync(file, body); console.log("\nWrote counts.generated.ts"); }
  else {
    let current = "";
    try { current = readFileSync(file, "utf8"); } catch { /* missing */ }
    if (current !== body) fail("counts", "lib/physics/counts.generated.ts is out of date. Run: npm run verify:physics -- --write");
  }

  if (failures) { console.error(`\n${failures} problem(s) found.`); process.exit(1); }
  console.log("\nAll Physics checks passed.");
})();
