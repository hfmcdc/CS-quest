/**
 * Verifies the Physics question bank. Run:  npx tsx scripts/verify-physics.ts
 * Exits with code 1 on any failure.
 */
import { readFileSync } from "node:fs";
import { content } from "../lib/physics/chapters/moving-charges";
import { checkAnswer, checkEquation, solveFor, missingSymbols, parseEquation } from "../lib/physics/checker";
import type { PhysNumerical } from "../lib/physics/types";

let failures = 0;
let checks = 0;
const fail = (m: string) => { failures++; console.error("FAIL:", m); };
const ok = (c: boolean, m: string) => { checks++; if (!c) fail(m); };

const all: [string, PhysNumerical][] = [
  ...content.numericals.map((n) => ["practice", n] as [string, PhysNumerical]),
  ...(["board", "hots", "jee"] as const).flatMap((l) => content.advanced[l].map((n) => [l, n] as [string, PhysNumerical])),
];

// ---- 1. unique ids
const ids = [...content.cards.map((c) => c.id), ...content.concepts.map((c) => c.id), ...content.equations.map((c) => c.id), ...all.map(([, n]) => n.id)];
ok(new Set(ids).size === ids.length, "duplicate ids: " + ids.filter((x, i) => ids.indexOf(x) !== i).join(","));

// ---- 2. numericals
const rel = (a: number, b: number) => Math.abs(a - b) / Math.abs(b);
for (const [lvl, n] of all) {
  const tag = `${lvl}/${n.id}`;
  const names = n.vars;
  // formulas parse
  for (const f of n.formulas) { try { parseEquation(f, names); checks++; } catch (e) { fail(`${tag}: formula "${f}" does not parse: ${(e as Error).message}`); } }
  // independent recomputation of the answer from the accepted equation
  const v1 = solveFor(n.formulas[0], n.target, n.given, names);
  const miss = missingSymbols(n.formulas[0], names, n.given, n.target);
  ok(miss.length === 0, `${tag}: given is missing ${miss.join(",")}`);
  if (v1 === null) fail(`${tag}: could not solve ${n.target}`);
  else if (n.ratio) {
    const v2 = solveFor(n.formulas[0], n.target, n.ratio.given2, names);
    ok(v2 !== null && rel((n.ratio.scale ?? 1) * v1 / v2!, n.answer) < 1e-9, `${tag}: ratio answer ${n.answer} != ${(n.ratio.scale ?? 1) * v1 / (v2 ?? NaN)}`);
  } else ok(rel(v1, n.answer) < 1e-9, `${tag}: answer ${n.answer} != re-solved ${v1}`);
  // every other accepted equation gives the same number whenever it can be evaluated from `given`
  if (!n.ratio) n.formulas.slice(1).forEach((f) => {
    if (missingSymbols(f, names, n.given, n.target).length) return;
    const v = solveFor(f, n.target, n.given, names);
    ok(v !== null && rel(v, n.answer) < 1e-9, `${tag}: alternative "${f}" gives ${v}, expected ${n.answer}`);
  });
  // the checker accepts every canonical equation and rejects deliberate mistakes
  for (const f of n.formulas) ok(checkEquation(f, n.formulas, names).status === "correct", `${tag}: canonical "${f}" rejected`);
  const [lhs, rhs] = n.formulas[0].split("=");
  ok(checkEquation(`${lhs} = 2*(${rhs})`, n.formulas, names).status === "incorrect", `${tag}: factor-2 error accepted`);
  ok(checkEquation(`${lhs} = (${rhs}) + 1`, n.formulas, names).status !== "correct", `${tag}: +1 error accepted`);
  ok(checkEquation(`${lhs} = ${lhs}`, n.formulas, names).status !== "correct", `${tag}: identity accepted`);
  // answer checking
  const tol = n.tol ?? 0.03;
  const unitDisp = n.unit;
  const s = (x: number) => `${x.toExponential(6)} ${unitDisp}`.trim();
  ok(checkAnswer(s(n.answer), n.answer, n.unit, tol, n.traps).status === "correct", `${tag}: exact answer rejected`);
  ok(checkAnswer(s(n.answer * 1.02), n.answer, n.unit, tol, n.traps).status === "correct", `${tag}: 2% off should pass`);
  ok(checkAnswer(s(n.answer * 1.2), n.answer, n.unit, tol, n.traps).status === "incorrect", `${tag}: 20% off accepted`);
  ok(checkAnswer(s(n.answer * 10), n.answer, n.unit, tol, n.traps).status === "incorrect", `${tag}: x10 accepted`);
  if (n.unit !== "") {
    ok(checkAnswer(n.answer.toExponential(6), n.answer, n.unit, tol).status === "incorrect", `${tag}: missing unit accepted`);
    ok(checkAnswer(`${n.answer.toExponential(6)} kg`, n.answer, n.unit, tol).status === "incorrect" || n.unit === "kg", `${tag}: wrong unit accepted`);
  }
  for (const t of n.traps ?? []) ok(Math.abs(t.value - n.answer) / n.answer > 2 * tol, `${tag}: trap value too close to true answer`);
  ok(n.hints.length >= 2, `${tag}: needs two hints`);
  ok(n.steps.length >= 2, `${tag}: needs worked steps`);
  ok(!/NaN|undefined|Infinity/.test(JSON.stringify(n)), `${tag}: NaN/undefined leaked into text`);
}

// ---- 3. multiple choice integrity
for (const q of content.concepts) {
  if (q.kind === "mcq") { ok(q.options.length === 4 && q.answer >= 0 && q.answer < 4, `${q.id}: bad options`); ok(new Set(q.options).size === 4, `${q.id}: duplicate options`); }
  else ok(q.model.length > 0 && q.points.length >= 3, `${q.id}: written answer needs model and key points`);
}
for (const q of content.equations) {
  ok(q.options.length === 4 && q.answer >= 0 && q.answer < 4 && new Set(q.options).size === 4, `${q.id}: bad options`);
  // equation options must be equations only: no words, no names
  for (const o of q.options) ok(!/[a-z]{4,}/.test(o.replace(/\\[A-Za-z]+/g, "").replace(/\\text\{[^}]*\}/g, "")) && !o.includes("$"), `${q.id}: option contains words: ${o}`);
  // the text must not give the answer away through an option copy
  ok(!q.options.some((o) => q.text.includes(o)), `${q.id}: question text contains an option`);
}

// ---- 4. every TeX command used is supported by the renderer
const src = readFileSync(new URL("../components/maths/MathText.tsx", import.meta.url), "utf8");
const symKeys = [...(/const SYMBOLS[^=]*=\s*\{([\s\S]*?)\n\};/.exec(src)?.[1] ?? "").matchAll(/([A-Za-z]+):\s*"/g)].map((m) => m[1]);
const funcs = (/const FUNCS = new Set\(\[([^\]]*)\]/.exec(src)?.[1] ?? "").match(/[a-z]+/g) ?? [];
const handled = ["frac", "dfrac", "tfrac", "sqrt", "vec", "overrightarrow", "hat", "overline", "text", "mathrm", "operatorname", "mathbf", "boldsymbol", "bf", "left", "right", "displaystyle", "big", "Big", "bigg", "Bigg", "limits", "quad", "qquad", "int"];
const known = new Set([...symKeys, ...funcs, ...handled]);
const texAll = JSON.stringify(content).replace(/\\\\/g, "\\");
const used = new Set([...texAll.matchAll(/\\([A-Za-z]+)/g)].map((m) => m[1]));
const unknown = [...used].filter((u) => !known.has(u));
ok(unknown.length === 0, `unsupported TeX commands: ${unknown.join(", ")}`);

// ---- 5. dollar signs balanced in every Rich string
const richBad: string[] = [];
JSON.parse(JSON.stringify(content), (_k, v) => { if (typeof v === "string" && v.replace(/\\\$/g, "").split("$").length % 2 === 0) richBad.push(v.slice(0, 60)); return v; });
ok(richBad.length === 0, `unbalanced $ in: ${richBad.join(" | ")}`);

console.log(`\nChecks run: ${checks}. Failures: ${failures}.`);
console.log(`Cards ${content.cards.length}; concepts ${content.concepts.length} (MCQ ${content.concepts.filter((c) => c.kind === "mcq").length}, written ${content.concepts.filter((c) => c.kind === "written").length}); practice numericals ${content.numericals.length}; equation MCQs ${content.equations.length}; advanced board ${content.advanced.board.length}, HOTS ${content.advanced.hots.length}, JEE ${content.advanced.jee.length}.`);
process.exit(failures ? 1 : 0);
