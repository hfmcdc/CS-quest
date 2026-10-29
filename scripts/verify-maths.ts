/**
 * Self-checks for Maths Quest. Run with:  npm run verify:maths
 * (uses `npx tsx`, which is downloaded on demand and is NOT added as a dependency).
 * Checks content structure, renders every string through the math renderer, re-computes
 * generated questions independently, and exercises the adaptive hint -> retry -> solution flow.
 */
import { QUESTIONS } from "../lib/maths/questions";
import { GENERATORS } from "../lib/maths/generators";
import { REVISION } from "../lib/maths/revision";
import { EXAMPLES } from "../lib/maths/examples";
import { MATH_TOPICS } from "../lib/maths/topics";
import { MATH_CARDS, PV_ROWS } from "../lib/maths/flashcards";
import { piTex } from "../lib/maths/generators";
import { checkAnswer } from "../lib/maths/checker";
import { compile, parseExpr } from "../lib/maths/expr";
import { mathProblems } from "../components/maths/MathText";
import { nextQuestion, poolFor, selfAssess, showHint, startSession, submit } from "../lib/maths/session";
import type { MathQuestion } from "../lib/maths/types";

let failures = 0;
let checks = 0;
function ok(cond: boolean, msg: string) {
  checks++;
  if (!cond) { failures++; console.log("FAIL:", msg); }
}
function seeded(seed: number) {
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}
const near = (a: number, b: number, tol = 1e-9) => Math.abs(a - b) <= tol * (1 + Math.abs(b));

// ---------------------------------------------------------------- 1. structure
const ids = new Set<string>();
for (const q of QUESTIONS) {
  ok(!ids.has(q.id), `duplicate id ${q.id}`);
  ids.add(q.id);
  ok(q.steps.length > 0 && q.hint.length > 0 && q.answer.length > 0, `${q.id} missing steps/hint/answer`);
  if (q.spec.kind === "mcq") {
    ok(q.spec.options.length === 4 && new Set(q.spec.options).size === 4, `${q.id} needs 4 distinct options`);
    ok(q.spec.correct >= 0 && q.spec.correct < q.spec.options.length, `${q.id} bad correct index`);
  }
}
for (const topic of MATH_TOPICS) {
  const p = poolFor(topic.id, "practice");
  const c = poolFor(topic.id, "challenge");
  for (const lvl of [1, 2, 3] as const) {
    ok(p.statics.some((q) => q.level === lvl) || p.gens.some((g) => g.level === lvl), `${topic.id}: no level ${lvl} practice question`);
  }
  ok(c.statics.length >= 3, `${topic.id}: needs >= 3 challenge questions`);
  ok((REVISION[topic.id] ?? []).length >= 4, `${topic.id}: revision notes missing`);
  ok((EXAMPLES[topic.id] ?? []).length >= 3, `${topic.id}: worked examples missing`);
}

// ---------------------------------------------------------------- 2. every string renders cleanly
function lint(label: string, text: string) {
  const problems = mathProblems(text);
  // function names inside math must use \\sin, \\cos, ... (otherwise they render as italic letters)
  for (const m of text.matchAll(/\$([^$]+)\$/g)) {
    if (/(^|[^\\A-Za-z])(sin|cos|tan|cot|sec|csc|cosec|log|ln)(?![A-Za-z])/.test(m[1].replace(/\\text\{[^}]*\}/g, ""))) problems.push("bare function name in math: " + m[1].slice(0, 40));
  }
  ok(problems.length === 0, `${label}: ${problems.join("; ")} in "${text.slice(0, 70)}"`);
}
function lintQuestion(q: MathQuestion) {
  lint(`${q.id} text`, q.text);
  lint(`${q.id} answer`, q.answer);
  q.steps.forEach((s, i) => lint(`${q.id} step ${i + 1}`, s));
  lint(`${q.id} hint`, q.hint);
  if (q.mistake) lint(`${q.id} mistake`, q.mistake);
  q.traps?.forEach((t) => lint(`${q.id} trap`, t.msg));
  if (q.spec.kind === "mcq") q.spec.options.forEach((o, i) => lint(`${q.id} option ${i}`, o));
}
QUESTIONS.forEach(lintQuestion);
for (const topic of MATH_TOPICS) {
  REVISION[topic.id].forEach((sec) => sec.items.forEach((it) => lint(`revision ${topic.id}/${sec.title}`, it.body)));
  EXAMPLES[topic.id].forEach((ex) => {
    lint(`example ${ex.title}`, ex.problem);
    lint(`example ${ex.title} answer`, ex.answer);
    ex.steps.forEach((s) => { lint(`example ${ex.title} doit`, s.doit); lint(`example ${ex.title} why`, s.why); });
  });
}

// ---------------------------------------------------------------- 3. model answers are accepted by the checker
for (const q of QUESTIONS) {
  const s = q.spec;
  if (s.kind === "mcq") {
    ok(checkAnswer(q, String(s.correct)).status === "correct", `${q.id} correct option rejected`);
    ok(checkAnswer(q, String((s.correct + 1) % 4)).status === "incorrect", `${q.id} wrong option accepted`);
  } else if (s.kind === "numeric") {
    ok(checkAnswer(q, String(s.value)).status === "correct", `${q.id} own value rejected`);
    ok(checkAnswer(q, String(s.value + 1)).status === "incorrect", `${q.id} off-by-one accepted`);
  } else if (s.kind === "tuple") {
    ok(checkAnswer(q, s.value.join(", ")).status === "correct", `${q.id} own tuple rejected`);
  } else if (s.kind === "vector") {
    ok(checkAnswer(q, `(${s.value.join(", ")})`).status === "correct", `${q.id} own vector rejected`);
    ok(checkAnswer(q, `${s.value[0]}i+${s.value[1]}j+${s.value[2]}k`.replace(/\+-/g, "-")).status === "correct", `${q.id} ijk form rejected`);
  } else if (s.kind === "expr" || s.kind === "antiderivative") {
    ok(checkAnswer(q, s.model).status === "correct", `${q.id} own model rejected`);
    ok(checkAnswer(q, `(${s.model}) + 3`).status === (s.kind === "antiderivative" ? "correct" : "incorrect"), `${q.id} +const handling`);
    ok(checkAnswer(q, `(${s.model}) * 2`).status === "incorrect", `${q.id} doubled answer accepted`);
  } else {
    ok(checkAnswer(q, "anything").status === "uncertain", `${q.id} manual should be uncertain`);
  }
}

// ---------------------------------------------------------------- 4. generators: many seeds, independent recomputation
const NORM = (v: number[]) => Math.hypot(...v);
const nums = (s: string) => s.split(/[,|]/).map(Number);
function numericDeriv(f: (x: number) => number, x: number) { const h = 1e-5; return (f(x + h) - f(x - h)) / (2 * h); }
const TEX_VAL: Record<string, number> = {
  "0": 0, "\\frac{1}{2}": 0.5, "\\frac{\\sqrt{2}}{2}": Math.SQRT1_2, "\\frac{\\sqrt{3}}{2}": Math.sqrt(3) / 2, "1": 1,
  "\\frac{1}{\\sqrt{3}}": 1 / Math.sqrt(3), "\\sqrt{3}": Math.sqrt(3),
};

for (const g of GENERATORS) {
  const rng = seeded(g.id.length * 7919);
  for (let i = 0; i < 250; i++) {
    const q = g.make(rng);
    lintQuestion(q);
    const [fam, params = ""] = q.id.split("#");
    ok(fam === g.id && q.topic === g.topic && q.level === g.level, `${q.id} metadata mismatch`);
    const spec = q.spec;

    // the checker must accept the generator's own answer
    if (spec.kind === "numeric") ok(checkAnswer(q, String(spec.value)).status === "correct", `${q.id} own value rejected`);
    if (spec.kind === "tuple") ok(checkAnswer(q, spec.value.join(",")).status === "correct", `${q.id} own tuple rejected`);
    if (spec.kind === "vector") ok(checkAnswer(q, spec.value.join(",")).status === "correct", `${q.id} own vector rejected`);
    if (spec.kind === "antiderivative") ok(checkAnswer(q, spec.model).status === "correct", `${q.id} own model rejected`);

    switch (fam) {
      case "G-VEC-DOT": {
        const [a, b] = params.split("|").map(nums);
        ok(spec.kind === "numeric" && near(spec.value, a.reduce((s, v, k) => s + v * b[k], 0)), `${q.id} dot`);
        break;
      }
      case "G-VEC-MAG": {
        const a = nums(params);
        ok(spec.kind === "numeric" && near(spec.value, NORM(a)) && Number.isInteger(spec.value), `${q.id} magnitude`);
        break;
      }
      case "G-VEC-CROSS": {
        const [a, b] = params.split("|").map(nums);
        const c = [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
        ok(spec.kind === "vector" && spec.value.every((v, k) => near(v, c[k])), `${q.id} cross`);
        if (spec.kind === "vector") {
          const dotA = spec.value.reduce((s, v, k) => s + v * a[k], 0);
          const dotB = spec.value.reduce((s, v, k) => s + v * b[k], 0);
          ok(dotA === 0 && dotB === 0, `${q.id} cross not perpendicular to inputs`);
        }
        break;
      }
      case "G-VEC-UNIT": {
        const a = nums(params);
        ok(spec.kind === "vector" && near(NORM(spec.value), 1) && spec.value.every((v, k) => near(v * NORM(a), a[k])), `${q.id} unit`);
        break;
      }
      case "G-GEO-DR": {
        const [P, Q] = params.split("|").map(nums);
        ok(spec.kind === "tuple" && spec.value.every((v, k) => v === Q[k] - P[k]), `${q.id} DR`);
        break;
      }
      case "G-GEO-DC": {
        const d = nums(params);
        ok(spec.kind === "tuple" && near(NORM(spec.value), 1) && spec.value.every((v, k) => near(v * NORM(d), d[k])), `${q.id} DC`);
        break;
      }
      case "G-GEO-ANGLE": {
        const [a, b] = params.split("|").map(nums);
        const cos = Math.abs(a.reduce((s, v, k) => s + v * b[k], 0)) / (NORM(a) * NORM(b));
        ok(spec.kind === "numeric" && near(spec.value, cos) && spec.value <= 1, `${q.id} angle`);
        break;
      }
      case "G-MM-QUAD": {
        const [a, b, c] = nums(params);
        let best = Infinity;
        for (let x = -50; x <= 50; x += 0.001) best = Math.min(best, a * x * x + b * x + c);
        ok(spec.kind === "numeric" && Math.abs(spec.value - best) < 1e-4, `${q.id} quad min (${spec.kind === "numeric" ? spec.value : "?"} vs ${best})`);
        break;
      }
      case "G-MM-CUBIC": {
        const [a, c, which] = params.split(",");
        const A = Number(a), C = Number(c);
        const f = (x: number) => x ** 3 - 3 * A * A * x + C;
        // local extremum values: scan for sign changes of f'
        let want = which === "max" ? -Infinity : Infinity;
        for (let x = -A - 0.5; x <= A + 0.5; x += 0.0005) {
          const d0 = numericDeriv(f, x), d1 = numericDeriv(f, x + 0.0005);
          if (which === "max" && d0 > 0 && d1 <= 0) want = f(x);
          if (which === "min" && d0 < 0 && d1 >= 0) want = f(x);
        }
        ok(spec.kind === "numeric" && Math.abs(spec.value - want) < 0.01, `${q.id} cubic ${which} (${spec.kind === "numeric" ? spec.value : "?"} vs ${want})`);
        break;
      }
      case "G-MM-PRODUCT":
      case "G-MM-RECT": {
        const total = Number(params);
        const s = fam === "G-MM-PRODUCT" ? total : total / 2; // x + y = s
        let best = 0;
        for (let x = 0; x <= s; x += 0.01) best = Math.max(best, x * (s - x));
        ok(spec.kind === "numeric" && Math.abs(spec.value - best) < 1e-3, `${q.id} product/area`);
        break;
      }
      case "G-INT-POLY": {
        const [a, b, c] = nums(params);
        if (spec.kind === "antiderivative") {
          const F = compile(parseExpr(spec.model));
          for (const x of [-2.1, -0.4, 0.7, 1.9]) ok(Math.abs(numericDeriv(F, x) - (a * x * x + b * x + c)) < 1e-4, `${q.id} derivative`);
        }
        break;
      }
      case "G-INT-TRIGLIN": {
        const m = /^(sin|cos|exp)(\d+)$/.exec(params);
        const k = Number(m?.[2]);
        const f = (x: number) => (m?.[1] === "sin" ? Math.sin(k * x) : m?.[1] === "cos" ? Math.cos(k * x) : Math.exp(k * x));
        if (spec.kind === "antiderivative") {
          const F = compile(parseExpr(spec.model));
          for (const x of [-1, -0.3, 0.5, 1.1]) ok(Math.abs(numericDeriv(F, x) - f(x)) < 1e-3 * (1 + Math.abs(f(x))), `${q.id} derivative`);
        }
        break;
      }
      case "G-INT-STD74": {
        const m = /^(plus|minus|root)(\d+)$/.exec(params);
        const a = Number(m?.[2]);
        const f = m?.[1] === "plus" ? (x: number) => 1 / (x * x + a * a) : m?.[1] === "minus" ? (x: number) => 1 / (x * x - a * a) : (x: number) => 1 / Math.sqrt(a * a - x * x);
        if (spec.kind === "antiderivative") {
          const F = compile(parseExpr(spec.model));
          const [lo, hi] = spec.domain;
          for (let j = 1; j <= 6; j++) {
            const x = lo + ((hi - lo) * j) / 7;
            ok(Math.abs(numericDeriv(F, x) - f(x)) < 1e-4 * (1 + Math.abs(f(x))), `${q.id} derivative at ${x}`);
          }
        }
        break;
      }
      case "G-ITF-VALUE": {
        const m = /^(sin|cos|tan)([np])(.*)$/.exec(params);
        const base = TEX_VAL[m?.[3] ?? ""];
        const x = m?.[2] === "n" ? -base : base;
        const inv = m?.[1] === "sin" ? Math.asin(x) : m?.[1] === "cos" ? Math.acos(x) : Math.atan(x);
        const fwd = m?.[1] === "sin" ? Math.sin : m?.[1] === "cos" ? Math.cos : Math.tan;
        ok(base !== undefined && spec.kind === "numeric" && near(spec.value, inv) && near(fwd(spec.value), x, 1e-9), `${q.id} value`);
        break;
      }
      case "G-ITF-COMPOSITE": {
        const m = /^(sin|cos)(-?\d+)$/.exec(params);
        const theta = (Number(m?.[2]) * Math.PI) / 6;
        const TWO = 2 * Math.PI;
        let want: number;
        if (m?.[1] === "sin") {
          let t = ((theta % TWO) + TWO) % TWO; if (t > Math.PI) t -= TWO; // (-pi, pi]
          want = t > Math.PI / 2 ? Math.PI - t : t < -Math.PI / 2 ? -Math.PI - t : t;
        } else {
          const t = ((theta % TWO) + TWO) % TWO; // [0, 2pi)
          want = t > Math.PI ? TWO - t : t;
        }
        ok(spec.kind === "numeric" && near(spec.value, want), `${q.id} composite (${spec.kind === "numeric" ? spec.value : "?"} vs ${want})`);
        break;
      }
      default:
        ok(false, `no independent oracle for generator ${fam}`);
    }
  }
}

// ---------------------------------------------------------------- 5. adaptive session flow
{
  const rng = seeded(42);
  // find a numeric question to drive the flow
  let s = startSession("vectors", "practice", rng);
  const wrong = { status: "incorrect" as const };
  const right = { status: "correct" as const };
  const unsure = { status: "uncertain" as const, message: "?" };

  // correct -> harder
  ok(s.phase === "ask" && s.diff === 1, "session starts at easy");
  let s2 = submit(s, right);
  ok(s2.phase === "correct" && s2.diff === 2, "correct raises difficulty");
  ok(submit(s2, wrong).phase === "correct", "cannot resubmit after finishing");

  // incorrect -> hint + retry (no difficulty change yet)
  s2 = submit(s, wrong);
  ok(s2.phase === "retry" && s2.hint && s2.diff === 1, "first wrong answer gives hint and one retry");
  // incorrect again -> worked solution + easier
  const s3 = submit({ ...s2, diff: 2 }, wrong);
  ok(s3.phase === "solved" && s3.diff === 1, "second wrong answer reveals solution and lowers difficulty");
  // retry correct -> still counts as correct, harder
  ok(submit({ ...s2, diff: 2 }, right).phase === "correct" && submit({ ...s2, diff: 2 }, right).diff === 3, "correct retry accepted");
  // difficulty is clamped
  ok(submit({ ...s, diff: 3 }, right).diff === 3 && submit({ ...s2, diff: 1 }, wrong).diff === 1, "difficulty clamped to 1..3");

  // uncertain -> model answer shown, difficulty unchanged, never marked wrong
  const u = submit(s, unsure);
  ok(u.phase === "uncertain" && u.diff === s.diff, "uncertain keeps difficulty");
  ok(selfAssess(u, true).diff === 2 && selfAssess(selfAssess(u, true), false).diff === 2, "self-assessment applies once");
  ok(selfAssess(u, false).diff === 1, "self-assess differing lowers (clamped)");
  ok(showHint(s).hint === true, "hint available without penalty");

  // challenge mode does not adapt
  const c = startSession("integrals", "challenge", rng);
  ok(c.q.challenge === true && c.diff === 3, "challenge starts with a challenge question");
  ok(submit(c, right).diff === 3 && submit(c, wrong).phase === "retry", "challenge difficulty is fixed");

  // all topics/modes can load a long run of questions without throwing or repeating statics early
  for (const topic of MATH_TOPICS) {
    for (const mode of ["practice", "challenge"] as const) {
      let cur = startSession(topic.id, mode, rng);
      const seenStatic = new Set<string>();
      for (let i = 0; i < 60; i++) {
        ok(cur.q.topic === topic.id, `${topic.id}/${mode} wrong topic`);
        ok(!!cur.q.text, `${topic.id}/${mode} empty question`);
        if (!cur.q.id.includes("#") && !cur.repeated) ok(!seenStatic.has(cur.q.id), `${topic.id}/${mode} repeated ${cur.q.id} before exhausting the bank`);
        if (!cur.q.id.includes("#")) seenStatic.add(cur.q.id);
        if (cur.repeated) seenStatic.clear();
        cur = nextQuestion(submit(cur, i % 3 === 0 ? wrong : right), rng);
        if (cur.phase !== "ask") cur = nextQuestion(cur, rng);
      }
    }
  }
  // MCQ option shuffling keeps the right answer right
  for (let i = 0; i < 100; i++) {
    const m = startSession("itf", "practice", rng);
    if (m.q.spec.kind === "mcq") ok(checkAnswer(m.q, String(m.q.spec.correct)).status === "correct", "shuffled MCQ lost its answer");
  }
}


// ---------------------------------------------------------------- 7. flashcards
{
  const cardIds = new Set<string>();
  for (const c of MATH_CARDS) {
    ok(!cardIds.has(c.id), `duplicate card id ${c.id}`);
    cardIds.add(c.id);
    ok(c.front.length > 0 && c.back.length > 0, `${c.id} empty card`);
    lint(`${c.id} front`, c.front);
    lint(`${c.id} back`, c.back);
  }
  for (const topic of MATH_TOPICS) ok(MATH_CARDS.filter((c) => c.topic === topic.id).length >= 10, `${topic.id}: fewer than 10 flashcards`);
  // principal values: forward function recovers the argument, and the value lies in the principal branch
  const fwd: Record<string, (v: number) => number> = { sin: Math.sin, cos: Math.cos, tan: Math.tan, cot: (v) => 1 / Math.tan(v), sec: (v) => 1 / Math.cos(v), csc: (v) => 1 / Math.sin(v) };
  const P = Math.PI;
  const inRange: Record<string, (v: number) => boolean> = {
    sin: (v) => v >= -P / 2 - 1e-9 && v <= P / 2 + 1e-9,
    cos: (v) => v >= -1e-9 && v <= P + 1e-9,
    tan: (v) => v > -P / 2 && v < P / 2,
    cot: (v) => v > 0 && v < P,
    sec: (v) => v >= -1e-9 && v <= P + 1e-9 && Math.abs(v - P / 2) > 1e-9,
    csc: (v) => v >= -P / 2 - 1e-9 && v <= P / 2 + 1e-9 && Math.abs(v) > 1e-9,
  };
  ok(PV_ROWS.length === 48, "principal-value table too small");
  for (const r of PV_ROWS) {
    ok(near(fwd[r.fn](r.value), r.arg, 1e-9), `PV ${r.fn}(${r.tex}) forward check`);
    ok(inRange[r.fn](r.value), `PV ${r.fn}(${r.tex}) outside principal branch`);
    const twelfths = (r.value / P) * 12;
    ok(Math.abs(twelfths - Math.round(twelfths)) < 1e-9, `PV ${r.fn}(${r.tex}) is not a multiple of pi/12`);
    ok(piTex(r.value).length > 0, `PV ${r.fn}(${r.tex}) cannot be written`);
  }
}

// ---------------------------------------------------------------- 6. scope guard: no out-of-syllabus phrases in content
const banned = [/(?<!in)definite integral/i, /partial fraction/i, /integration by parts/i, /\bplane\b/i, /\\int_/, /area under/i, /rolle/i, /mean value/i, /rate of change/i, /tangent and normal/i, /approximation/i, /triple product/i];
const everything: string[] = [];
MATH_CARDS.forEach((c) => everything.push(c.front, c.back));
QUESTIONS.forEach((q) => everything.push(q.text, q.answer, q.hint, ...q.steps));
for (const topic of MATH_TOPICS) {
  REVISION[topic.id].forEach((s) => everything.push(s.title, ...s.items.map((i) => i.body)));
  EXAMPLES[topic.id].forEach((e) => everything.push(e.title, e.problem, e.answer, ...e.steps.flatMap((s) => [s.doit, s.why])));
}
for (const text of everything) for (const re of banned) ok(!re.test(text), `out-of-scope phrase ${re} in "${text.slice(0, 60)}"`);

console.log(`${checks} checks, ${failures} failed`);
if (failures > 0) process.exit(1);
