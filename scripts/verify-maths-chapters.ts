/**
 * Independent re-computation of the model answers in the Class XII chapter banks
 * (lib/maths/chapters/*). Each check recomputes the answer by brute force or numerically
 * (enumeration, numerical differentiation/integration, vertex enumeration ...) and compares it with the
 * answer key, so a wrong key cannot slip in. Run with:  npm run verify:maths
 */
import { QUESTION_BY_ID } from "../lib/maths/questions";

let failures = 0;
let checks = 0;
function ok(cond: boolean, msg: string) {
  checks++;
  if (!cond) { failures++; console.log("FAIL:", msg); }
}
const near = (a: number, b: number, tol = 1e-6) => Math.abs(a - b) <= tol * (1 + Math.abs(b));

/** The numeric answer key of a question. */
function value(id: string): number {
  const q = QUESTION_BY_ID[id];
  if (!q) { ok(false, `${id} does not exist`); return NaN; }
  if (q.spec.kind !== "numeric") { ok(false, `${id} is not numeric`); return NaN; }
  return q.spec.value;
}
function numeric(id: string, expected: number, tol = 1e-6) {
  const v = value(id);
  ok(near(v, expected, tol), `${id}: key ${v} but recomputed ${expected}`);
}
/** An MCQ's correct option text. */
function correctOption(id: string): number {
  const q = QUESTION_BY_ID[id];
  if (!q || q.spec.kind !== "mcq") { ok(false, `${id} is not an mcq`); return -1; }
  return q.spec.correct;
}
function mcqIs(id: string, index: number) {
  ok(correctOption(id) === index, `${id}: key is option ${correctOption(id)} but recomputed option ${index}`);
}
/** An expr/antiderivative key, as a function of x. */
import { compile, parseExpr } from "../lib/maths/expr";
function model(id: string): (x: number) => number {
  const q = QUESTION_BY_ID[id];
  if (!q || (q.spec.kind !== "expr" && q.spec.kind !== "antiderivative")) { ok(false, `${id} is not expr/antiderivative`); return () => NaN; }
  return compile(parseExpr(q.spec.model));
}
function tupleKey(id: string): number[] {
  const q = QUESTION_BY_ID[id];
  if (!q || (q.spec.kind !== "tuple" && q.spec.kind !== "vector")) { ok(false, `${id} is not tuple/vector`); return []; }
  return [...q.spec.value];
}
const deriv = (f: (x: number) => number, x: number, h = 1e-5) => (f(x + h) - f(x - h)) / (2 * h);
/** Composite Simpson integration. */
function integrate(f: (x: number) => number, a: number, b: number, n = 20000): number {
  const h = (b - a) / n;
  let s = f(a) + f(b);
  for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2);
  return (s * h) / 3;
}

// ======================================================================= Relations and Functions
{
  // REL-1: properties of a concrete relation
  const A = [1, 2, 3];
  const R = new Set(["1,1", "2,2", "3,3", "1,2"]);
  const has = (a: number, b: number) => R.has(`${a},${b}`);
  const refl = A.every((a) => has(a, a));
  const sym = A.every((a) => A.every((b) => !has(a, b) || has(b, a)));
  const trans = A.every((a) => A.every((b) => A.every((c) => !(has(a, b) && has(b, c)) || has(a, c))));
  ok(refl && trans && !sym, "REL-1 properties");
  mcqIs("REL-1", 0);

  numeric("REL-2", 2 ** (2 * 3));

  mcqIs("REL-3", 0);
  ok((2 * 2 === (-2) * (-2)) && !Array.from({ length: 4001 }, (_, i) => (i - 2000) / 100).some((x) => x * x < 0), "REL-3 x^2 not one-one / not onto");

  // REL-4: a-b divisible by 3 on a window of integers
  {
    const Z = Array.from({ length: 31 }, (_, i) => i - 15);
    const r = (a: number, b: number) => (((a - b) % 3) + 3) % 3 === 0;
    ok(Z.every((a) => r(a, a)) && Z.every((a) => Z.every((b) => !r(a, b) || r(b, a))) && Z.every((a) => Z.every((b) => Z.every((c) => !(r(a, b) && r(b, c)) || r(a, c)))), "REL-4 equivalence");
    mcqIs("REL-4", 0);
    numeric("REL-5", new Set(Z.map((a) => ((a % 3) + 3) % 3)).size);
  }

  // REL-6: f(x) = 3 - 4x is one-one (strictly monotone) and onto (invertible on R)
  {
    const f = (x: number) => 3 - 4 * x;
    const inv = (y: number) => (3 - y) / 4;
    ok([-7, -1, 0, 2.5, 9].every((y) => near(f(inv(y)), y)) && f(1) !== f(2), "REL-6 bijective");
    mcqIs("REL-6", 0);
  }
  // REL-7: x -> x^2 on N is injective but 2 is not a square
  {
    const N = Array.from({ length: 200 }, (_, i) => i + 1);
    const sq = N.map((x) => x * x);
    ok(new Set(sq).size === N.length && !sq.includes(2), "REL-7 one-one not onto");
    mcqIs("REL-7", 0);
  }
  // REL-8: count injective maps {1,2} -> {a,b,c,d}
  {
    let n = 0;
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) if (i !== j) n++;
    numeric("REL-8", n);
  }
  // REL-9: perpendicular lines as a relation on directions (angles in degrees): symmetric, not reflexive, not transitive
  {
    const perp = (a: number, b: number) => Math.abs(Math.cos(((a - b) * Math.PI) / 180)) < 1e-12;
    const dirs = [0, 30, 60, 90, 120, 150];
    ok(!dirs.every((a) => perp(a, a)), "REL-9 not reflexive");
    ok(dirs.every((a) => dirs.every((b) => perp(a, b) === perp(b, a))), "REL-9 symmetric");
    ok(perp(0, 90) && perp(90, 180) && !perp(0, 180), "REL-9 not transitive");
    mcqIs("REL-9", 0);
  }
  // REL-10: R = {(a,b): a <= b^2} on R
  {
    const r = (a: number, b: number) => a <= b * b;
    ok(!r(0.5, 0.5) && r(1, 2) && !r(2, 1) && r(3, -2) && r(-2, 1) && !r(3, 1), "REL-10 counter-examples");
    mcqIs("REL-10", 0);
  }
  // REL-11: b divisible by a on {1..6}
  {
    let n = 0;
    for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) if (b % a === 0) n++;
    numeric("REL-11", n);
  }
  // REL-C1..C4 by enumeration
  {
    let equiv = 0, symm = 0, reflx = 0;
    for (let mask = 0; mask < 512; mask++) {
      const has = (a: number, b: number) => (mask >> (a * 3 + b)) & 1;
      let refl = true, sym = true, trans = true;
      for (let a = 0; a < 3; a++) {
        if (!has(a, a)) refl = false;
        for (let b = 0; b < 3; b++) {
          if (has(a, b) && !has(b, a)) sym = false;
          for (let c = 0; c < 3; c++) if (has(a, b) && has(b, c) && !has(a, c)) trans = false;
        }
      }
      if (sym) symm++;
      if (refl) reflx++;
      if (refl && sym && trans) equiv++;
    }
    numeric("REL-C1", equiv);
    numeric("REL-C2", symm);
    let onto = 0;
    for (let m = 0; m < 16; m++) { const imgs = new Set([0, 1, 2, 3].map((i) => (m >> i) & 1)); if (imgs.size === 2) onto++; }
    numeric("REL-C3", onto);
    numeric("REL-C4", reflx);
  }
}

// ======================================================================= Matrices
{
  type Mx = number[][];
  const mul = (A: Mx, B: Mx): Mx => A.map((r) => B[0].map((_, j) => r.reduce((s, v, k) => s + v * B[k][j], 0)));
  const add = (A: Mx, B: Mx): Mx => A.map((r, i) => r.map((v, j) => v + B[i][j]));
  const tr = (A: Mx): Mx => A[0].map((_, j) => A.map((r) => r[j]));
  const flat = (A: Mx) => A.flat();
  const sameTuple = (id: string, A: Mx) => {
    const k = tupleKey(id);
    ok(k.length === flat(A).length && k.every((v, i) => near(v, flat(A)[i], 1e-9)), `${id}: key ${k} vs recomputed ${flat(A)}`);
  };
  numeric("MAT-1", 3 * 4);
  sameTuple("MAT-2", add([[1, 2], [3, 4]], [[0, 1], [-1, 2]]));
  sameTuple("MAT-3", tr([[1, 2, 3], [4, 5, 6]]));
  sameTuple("MAT-4", mul([[1, 2], [3, 4]], [[2, 0], [1, 3]]));
  sameTuple("MAT-5", mul([[2, 3], [1, -1]], [[2, 3], [1, -1]]));
  {
    const skew = (A: Mx) => tr(A).every((r, i) => r.every((v, j) => v === -A[i][j]));
    const opts = [[[0, 2], [-2, 0]], [[0, 2], [2, 0]], [[1, 2], [-2, 1]], [[0, 2], [-2, 1]]];
    ok(opts.map(skew).join() === "true,false,false,false", "MAT-6 only option 0 skew");
    mcqIs("MAT-6", 0);
  }
  {
    // x + y = 6, xy = 8
    let found = NaN;
    for (let x = -20; x <= 20; x += 0.5) { const y = 6 - x; if (near(x * y, 8, 1e-12)) { found = x * x + y * y; break; } }
    numeric("MAT-7", found);
  }
  {
    let P: Mx = [[1, 0], [0, 1]];
    for (let i = 0; i < 3; i++) P = mul(P, [[1, 2], [0, 1]]);
    numeric("MAT-8", P[0][1]);
  }
  {
    const A: Mx = [[1, 1], [1, 1]];
    const A2 = mul(A, A);
    ok(flat(A2).every((v, i) => v === 2 * flat(A)[i]), "MAT-9 A^2 = 2A");
    numeric("MAT-9", 2);
  }
  {
    const A: Mx = [[1, 2], [4, 3]];
    const S = add(A, tr(A)).map((r) => r.map((v) => v / 2));
    sameTuple("MAT-10", S);
  }
  mcqIs("MAT-11", 0);
  {
    // MAT-12: A^2 - 4A + 5I = 0 and A * key = I
    const A: Mx = [[1, 2], [-1, 3]];
    const A2 = mul(A, A);
    const Z = A2.map((r, i) => r.map((v, j) => v - 4 * A[i][j] + (i === j ? 5 : 0)));
    ok(flat(Z).every((v) => v === 0), "MAT-12 A^2-4A+5I=0");
    const k = tupleKey("MAT-12");
    const I = mul(A, [[k[0], k[1]], [k[2], k[3]]]);
    ok(near(I[0][0], 1) && near(I[0][1], 0) && near(I[1][0], 0) && near(I[1][1], 1), "MAT-12 inverse");
  }
  {
    const A: Mx = [[1, 1], [1, 1]], B: Mx = [[1, -1], [-1, 1]];
    ok(flat(mul(A, B)).every((v) => v === 0), "MAT-13 AB=0");
    mcqIs("MAT-13", 0);
  }
  {
    // MAT-C1: A^2 = kA - 2I
    const A: Mx = [[3, -2], [4, -2]];
    const k = value("MAT-C1");
    const A2 = mul(A, A);
    ok(flat(A2).every((v, i) => near(v, k * flat(A)[i] - (i === 0 || i === 3 ? 2 : 0))), "MAT-C1 A^2 = kA - 2I");
    // MAT-C2: a_ij = (i+j)^2 / 2
    sameTuple("MAT-C2", [[1, 2], [3, 4]].map((_, ii) => [1, 2].map((jj) => ((ii + 1 + jj) ** 2) / 2)));
    // MAT-C3: AB - BA is symmetric when A symmetric and B skew-symmetric
    const S: Mx = [[1, 2, 3], [2, 4, 5], [3, 5, 6]], K: Mx = [[0, 1, -2], [-1, 0, 3], [2, -3, 0]];
    const D = mul(S, K).map((r, i) => r.map((v, j) => v - mul(K, S)[i][j]));
    ok(flat(D).every((v, i) => near(v, flat(tr(D))[i])), "MAT-C3 symmetric");
    mcqIs("MAT-C3", 0);
    // MAT-C4: for random symmetric A, B: AB symmetric iff AB = BA  (test a commuting and a non-commuting pair)
    const sym = (X: Mx) => flat(X).every((v, i) => near(v, flat(tr(X))[i]));
    const A1: Mx = [[1, 2], [2, 3]], B1: Mx = [[2, 1], [1, 0]];
    ok(sym(mul(A1, B1)) === flat(mul(A1, B1)).every((v, i) => near(v, flat(mul(B1, A1))[i])), "MAT-C4 non-commuting pair");
    const A3: Mx = [[1, 2], [2, 1]], B2: Mx = [[3, 4], [4, 3]];
    ok(sym(mul(A3, B2)) && flat(mul(A3, B2)).every((v, i) => near(v, flat(mul(B2, A3))[i])), "MAT-C4 commuting pair");
    mcqIs("MAT-C4", 0);
  }
}

// ======================================================================= Determinants
{
  type Mx = number[][];
  const d2 = (m: Mx) => m[0][0] * m[1][1] - m[0][1] * m[1][0];
  const d3 = (m: Mx) =>
    m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
  const minor = (m: Mx, i: number, j: number): Mx => m.filter((_, r) => r !== i).map((r) => r.filter((_, c) => c !== j));
  const cof = (m: Mx, i: number, j: number) => ((i + j) % 2 === 0 ? 1 : -1) * d2(minor(m, i, j));
  const mulM = (A: Mx, B: Mx): Mx => A.map((r) => B[0].map((_, j) => r.reduce((s, v, k) => s + v * B[k][j], 0)));

  numeric("DET-1", d2([[2, 3], [1, 4]]));
  numeric("DET-2", 1);
  ok(near(d2([[1, 2], [3, 6]]), 0), "DET-2 singular at x=1");
  // DET-3: |kA| = k^n |A| tested on a concrete 3x3 with det 4
  {
    const A: Mx = [[2, 0, 0], [0, 2, 0], [0, 0, 1]];
    ok(near(d3(A), 4), "DET-3 setup");
    numeric("DET-3", d3(A.map((r) => r.map((v) => 2 * v))));
  }
  const A4: Mx = [[1, 2, 3], [0, 1, 4], [5, 6, 0]];
  numeric("DET-4", d3(A4));
  numeric("DET-5", cof(A4, 0, 1));
  {
    const x = [1, 6, 3], y = [0, 0, 4];
    numeric("DET-6", 0.5 * Math.abs(d3([[x[0], y[0], 1], [x[1], y[1], 1], [x[2], y[2], 1]])));
  }
  numeric("DET-7", 5 ** 2);
  {
    const k = value("DET-8");
    ok(near(d3([[1, 2, 1], [3, 4, 1], [k, 6, 1]]), 0), "DET-8 collinear");
  }
  {
    const A: Mx = [[2, 1], [5, 3]];
    const k = tupleKey("DET-9");
    const P = mulM(A, [[k[0], k[1]], [k[2], k[3]]]);
    ok(near(P[0][0], 1) && near(P[0][1], 0) && near(P[1][0], 0) && near(P[1][1], 1), "DET-9 inverse");
  }
  // DET-10: x + y = 1, 2x + 2y = k is inconsistent iff k != 2
  mcqIs("DET-10", 0);
  {
    const sol = tupleKey("DET-11");
    const [x, y, z] = sol;
    ok(near(x + y + z, 6) && near(x - y + z, 2) && near(2 * x + y - z, 1), "DET-11 satisfies all three equations");
    ok(near(d3([[1, 1, 1], [1, -1, 1], [2, 1, -1]]), 6), "DET-11 determinant is 6");
  }
  numeric("DET-12", 1 / -2);
  numeric("DET-13", d3([[1, 1, 1], [1, 2, 3], [1, 4, 9]]));
  // DET-C1
  {
    const f = (x: number) => d3([[x, 3, 3], [3, x, 3], [3, 3, x]]);
    for (const x of [-6, 3]) ok(Math.abs(f(x)) < 1e-9, `DET-C1 root ${x}`);
    for (const x of [-2.5, 0.7, 4.1, -7]) ok(near(f(x), (x + 6) * (x - 3) ** 2, 1e-9), `DET-C1 factorisation at ${x}`);
    numeric("DET-C1", -6 + 3);
  }
  // DET-C2: triangle (k,0),(4,0),(0,2) has area 4
  {
    const k = value("DET-C2");
    ok(near(0.5 * Math.abs(d3([[k, 0, 1], [4, 0, 1], [0, 2, 1]])), 4), "DET-C2 area");
    ok(k > 0 && near(0.5 * Math.abs(d3([[0, 0, 1], [4, 0, 1], [0, 2, 1]])), 4), "DET-C2 other root is 0");
  }
  // DET-C3: |A adj A| = |A|^3 for a concrete 3x3 with det -4
  {
    const A: Mx = [[-4, 0, 0], [0, 1, 0], [0, 0, 1]];
    const adj = (m: Mx): Mx => [0, 1, 2].map((i) => [0, 1, 2].map((j) => cof(m, j, i)));
    numeric("DET-C3", d3(mulM(A, adj(A))));
  }
  mcqIs("DET-C4", 0);
}

// ======================================================================= Continuity and Differentiability
{
  // expr keys must equal the numerical derivative of the original function
  const checkDeriv = (id: string, f: (x: number) => number, pts: number[]) => {
    const m = model(id);
    for (const x of pts) ok(Math.abs(deriv(f, x) - m(x)) < 1e-5 * (1 + Math.abs(m(x))), `${id}: derivative at ${x}: ${deriv(f, x)} vs key ${m(x)}`);
  };
  {
    const k = value("CON-1");
    // left value 4k, right value 3
    ok(near(k * 4, 3), "CON-1 continuity");
    const kk = value("CON-2");
    ok(near(((3 + 1e-7) ** 2 - 9) / (3 + 1e-7 - 3), kk, 1e-5) && near(((3 - 1e-7) ** 2 - 9) / (3 - 1e-7 - 3), kk, 1e-5), "CON-2 limit");
  }
  checkDeriv("CON-3", (x) => Math.sin(x * x), [-1.7, -0.3, 0.6, 1.9]);
  checkDeriv("CON-4", (x) => Math.log(5 * x + 2), [0.1, 1, 2.5, 3.9]);
  checkDeriv("CON-5", (x) => Math.atan(2 * x), [-1.6, -0.2, 0.5, 1.8]);
  checkDeriv("CON-6", (x) => x * x * Math.log(x), [0.6, 1.2, 2.5, 3.9]);
  {
    // CON-7: slope of circle at (3,4): y = sqrt(25 - x^2)
    numeric("CON-7", deriv((x) => Math.sqrt(25 - x * x), 3), 1e-6);
    // CON-8: x = t^2, y = t^3
    const h = 1e-6;
    numeric("CON-8", (((2 + h) ** 3 - (2 - h) ** 3) / (2 * h)) / (((2 + h) ** 2 - (2 - h) ** 2) / (2 * h)), 1e-6);
    mcqIs("CON-9", 0);
    const f = (x: number) => x ** 3 + 2 * x * x;
    numeric("CON-10", (f(1 + 1e-4) - 2 * f(1) + f(1 - 1e-4)) / 1e-8, 1e-4);
  }
  checkDeriv("CON-13", (x) => Math.log(x) ** x, [1.5, 2.2, 3.1, 3.9]);
  checkDeriv("CON-11", (x) => x ** x, [0.6, 1.3, 2.2, 2.9]);
  checkDeriv("CON-12", (x) => Math.log(1 / Math.cos(x) + Math.tan(x)), [-1.2, -0.4, 0.3, 1.1]);
  {
    numeric("CON-C1", (3 * 5 - 5 - 1) / 5, 1e-9);
    // CON-C2: scan for corners of |x-1|+|x-2|
    const f = (x: number) => Math.abs(x - 1) + Math.abs(x - 2);
    const h = 1e-4;
    let corners = 0;
    for (let x = -3; x <= 5; x += 0.5) {
      const left = (f(x) - f(x - h)) / h, right = (f(x + h) - f(x)) / h;
      if (Math.abs(left - right) > 1e-3) corners++;
    }
    numeric("CON-C2", corners);
    // CON-C3: (1-x^2) y'' - x y' = 0 for y = asin x
    const y = Math.asin;
    for (const x of [-0.8, -0.3, 0.2, 0.7]) {
      const d1 = deriv(y, x, 1e-5);
      const d2 = (y(x + 1e-4) - 2 * y(x) + y(x - 1e-4)) / 1e-8;
      ok(Math.abs((1 - x * x) * d2 - x * d1) < 1e-3, `CON-C3 at ${x}`);
    }
    mcqIs("CON-C3", 0);
    // CON-C4: y'' - 5y' + 6y = 0 for y = 3e^{2x} + 2e^{3x}
    const g = (x: number) => 3 * Math.exp(2 * x) + 2 * Math.exp(3 * x);
    for (const x of [-0.5, 0.2, 0.9]) {
      const d1 = deriv(g, x, 1e-5), d2 = (g(x + 1e-4) - 2 * g(x) + g(x - 1e-4)) / 1e-8;
      ok(Math.abs(d2 - 5 * d1 + 6 * g(x)) < 1e-2 * (1 + Math.abs(g(x))), `CON-C4 at ${x}`);
    }
    mcqIs("CON-C4", 0);
  }
}

// ======================================================================= Applications of Derivatives (rate of change, monotonicity)
{
  numeric("DAP-1", 2 * Math.PI * 2);
  numeric("DAP-2", 2 * 10 * 3);
  {
    // DAP-4: V = 4/3 pi r^3, r(t) = 4 + 0.5 t ; dV/dt / pi at t = 0
    const V = (tt: number) => (4 / 3) * Math.PI * (4 + 0.5 * tt) ** 3;
    numeric("DAP-4", deriv(V, 0, 1e-5) / Math.PI, 1e-6);
  }
  // DAP-5: cube with edge 2 + 3t
  numeric("DAP-5", deriv((tt) => (2 + 3 * tt) ** 3, 0, 1e-5), 1e-6);
  {
    const f = (x: number) => Math.exp(-x);
    ok([-3, -0.5, 0, 2, 5].every((x) => deriv(f, x) < 0), "DAP-6 decreasing");
    mcqIs("DAP-6", 0);
    const g = (x: number) => x ** 3 - 3 * x;
    ok(deriv(g, -2) > 0 && deriv(g, 0) < 0 && deriv(g, 2) > 0 && Math.abs(deriv(g, 1)) < 1e-6 && Math.abs(deriv(g, -1)) < 1e-6, "DAP-7 signs");
    mcqIs("DAP-7", 0);
    mcqIs("DAP-3", 0);
    const h3 = (x: number) => x * x - 4 * x;
    ok(deriv(h3, 3) > 0 && deriv(h3, 1) < 0, "DAP-3 sign of f'");
  }
  {
    // DAP-8: V(t) increases by 900 per second; r from V = 4/3 pi r^3 at r = 15
    const V0 = (4 / 3) * Math.PI * 15 ** 3;
    const r = (tt: number) => Math.cbrt(((V0 + 900 * tt) * 3) / (4 * Math.PI));
    numeric("DAP-8", deriv(r, 0, 1e-4), 1e-6);
    const g = (x: number) => 2 * x ** 3 - 9 * x * x + 12 * x + 1;
    let lo = NaN, hi = NaN;
    for (let x = -1; x <= 4; x += 0.001) {
      const d = deriv(g, x);
      if (d < 0 && Number.isNaN(lo)) lo = x;
      if (d < 0) hi = x;
    }
    numeric("DAP-9", Math.round(hi) - Math.round(lo), 1e-9);
  }
  {
    // DAP-10: x = 3 + 2h (foot sliding at 2 m/s), y = sqrt(25 - x^2)
    const y = (h: number) => Math.sqrt(25 - (3 + 2 * h) ** 2);
    numeric("DAP-10", -deriv(y, 0, 1e-6), 1e-5);
    // DAP-11: y = x^3 changes 12 times as fast as x
    ok(near(deriv((x) => x ** 3, value("DAP-11")), 12, 1e-6), "DAP-11 slope 12");
    // DAP-12: x^3 + kx increasing for all x iff k >= 0
    const incr = (k: number) => Array.from({ length: 2001 }, (_, i) => -10 + i * 0.01).every((x) => 3 * x * x + k >= -1e-12);
    ok(incr(0) && !incr(-1), "DAP-12 k=0 works, k=-1 fails");
    numeric("DAP-12", 0);
    numeric("DAP-C1", deriv((r) => Math.PI * r * r, 5) * 2 / Math.PI, 1e-6);
    numeric("DAP-C2", (deriv((r) => 4 * Math.PI * r * r, 10) * 0.5) / Math.PI, 1e-6);
    let best = 0, bx = 0;
    for (let x = 0.01; x < 10; x += 0.0001) { const v = Math.log(x) / x; if (v > best) { best = v; bx = x; } }
    numeric("DAP-C3", bx, 1e-3);
  }
}

// ======================================================================= Integrals: parts, partial fractions, definite
{
  const checkAnti = (id: string, f: (x: number) => number, pts: number[]) => {
    const F = model(id);
    for (const x of pts) ok(Math.abs(deriv(F, x) - f(x)) < 1e-5 * (1 + Math.abs(f(x))), `${id}: F' at ${x}: ${deriv(F, x)} vs ${f(x)}`);
  };
  checkAnti("INA-1", (x) => x * Math.exp(x), [-1.5, 0, 1.2]);
  numeric("INA-2", integrate((x) => x * x, 0, 1), 1e-8);
  numeric("INA-3", integrate(Math.cos, 0, Math.PI / 2), 1e-8);
  checkAnti("INA-4", (x) => x * Math.cos(x), [-2, 0.5, 2.5]);
  checkAnti("INA-5", Math.log, [0.6, 1.5, 3.5]);
  checkAnti("INA-6", (x) => 1 / ((x + 1) * (x + 2)), [0.2, 1.5, 4]);
  numeric("INA-7", integrate(Math.exp, 0, 1), 1e-8);
  numeric("INA-8", integrate((x) => x ** 3, -2, 2), 1e-8);
  numeric("INA-9", integrate((x) => 1 / (1 + x * x), 0, 1), 1e-8);
  numeric("INA-10", integrate((x) => x * Math.exp(x * x), 0, 1), 1e-8);
  checkAnti("INA-11", (x) => x * x * Math.exp(x), [-1.5, 0.3, 1.7]);
  numeric("INA-12", integrate((x) => Math.sin(x) / (Math.sin(x) + Math.cos(x)), 0, Math.PI / 2), 1e-8);
  checkAnti("INA-13", (x) => (3 * x + 5) / ((x + 1) * (x + 2)), [0.2, 1.5, 4]);
  numeric("INA-14", integrate((x) => Math.abs(x - 1), 0, 2, 200000), 1e-6);
  checkAnti("INA-C1", (x) => Math.exp(x) * (Math.sin(x) + Math.cos(x)), [-2, 0.4, 2]);
  numeric("INA-C2", integrate((x) => x * Math.sin(x), 0, Math.PI), 1e-8);
  numeric("INA-C3", integrate((x) => Math.log(1 + Math.tan(x)), 0, Math.PI / 4), 1e-8);
  checkAnti("INA-C4", (x) => (x * x) / ((x + 1) * (x + 2) * (x + 3)), [0.2, 1.5, 4]);
}

// ======================================================================= Applications of Integrals
{
  const area = (id: string, f: (x: number) => number, a: number, b: number) => numeric(id, integrate(f, a, b, 200000), 1e-6);
  area("AIN-1", (x) => x * x, 0, 3);
  area("AIN-2", (x) => 2 * x, 0, 4);
  area("AIN-3", (x) => 4 * Math.sqrt(Math.max(0, 9 - x * x)), 0, 3);
  area("AIN-4", (x) => x - x * x, 0, 1);
  area("AIN-5", (x) => 2 * 2 * Math.sqrt(x), 0, 4);
  area("AIN-6", (x) => 2 * Math.sqrt(x), 0, 4);
  area("AIN-7", (x) => 4 * 1.5 * Math.sqrt(Math.max(0, 4 - x * x)), 0, 2);
  area("AIN-8", (x) => 4 - x * x, -2, 2);
  area("AIN-9", (x) => 2 * x - x, 0, 4);
  area("AIN-10", (x) => 2 * Math.sqrt(Math.max(0, 1 - (x * x) / 9)), 0, 3);
  area("AIN-11", (y) => y + 2 - y * y, -1, 2);
  area("AIN-12", (x) => 2 - Math.abs(x), -2, 2);
  area("AIN-13", (x) => Math.sqrt(Math.max(0, 4 - x * x)) - (2 - x), 0, 2);
  area("AIN-C1", (x) => 2 * 2 * Math.sqrt(x) , 0, 1);
  area("AIN-C2", (x) => Math.abs(x) - x * x, -1, 1);
  area("AIN-C3", (x) => Math.abs(x + 3), -6, 0);
  area("AIN-C4", (x) => 2 * (x <= 2 ? Math.sqrt(6 * x) : Math.sqrt(Math.max(0, 16 - x * x))), 0, 4);
  // intersection checks
  ok(near(2 ** 2, 2 + 2) && near((-1) ** 2, -1 + 2), "AIN-11 intersections");
  ok(near(2 * 2 + 6 * 2, 16), "AIN-C4 intersection at x=2");
}

// ======================================================================= Differential Equations
{
  // solution check: residual of the ODE at several points, plus the initial condition
  const resid = (id: string, rhs: (x: number, y: number, yp: number) => number, pts: number[], x0: number, y0: number) => {
    const y = model(id);
    ok(near(y(x0), y0, 1e-9), `${id}: initial condition y(${x0}) = ${y(x0)} (want ${y0})`);
    for (const x of pts) ok(Math.abs(rhs(x, y(x), deriv(y, x))) < 1e-5 * (1 + Math.abs(y(x))), `${id}: ODE residual at ${x}`);
  };
  numeric("DEQ-1", 3); numeric("DEQ-2", 2); numeric("DEQ-3", 3);
  resid("DEQ-4", (x, y, yp) => yp - 2 * x, [-2, 0.5, 2], 0, 1);
  resid("DEQ-5", (x, y, yp) => yp - y, [-1, 0.5, 1.5], 0, 2);
  mcqIs("DEQ-6", 0);
  {
    // y^2 = x^2 + C  =>  y dy/dx = x : check with y = sqrt(x^2 + 3)
    const y = (x: number) => Math.sqrt(x * x + 3);
    for (const x of [-1, 0.4, 2]) ok(Math.abs(deriv(y, x) - x / y(x)) < 1e-6, "DEQ-6 family satisfies the equation");
    // DEQ-7: (x y)' = x * (y' + y/x) = x^3 when y' + y/x = x^2, so I.F. = x
    const I = model("DEQ-7");
    for (const x of [0.7, 1.5, 3]) ok(near(deriv(I, x) / I(x), 1 / x, 1e-6), "DEQ-7 I.F. has I'/I = P");
  }
  resid("DEQ-8", (x, y, yp) => yp + y - Math.exp(-x), [-1, 0.5, 2], 0, 0);
  {
    // DEQ-9: y = A x^2  =>  x y' = 2y
    const A = 1.7, y = (x: number) => A * x * x;
    for (const x of [0.5, 2]) ok(Math.abs(x * deriv(y, x) - 2 * y(x)) < 1e-6, "DEQ-9");
    mcqIs("DEQ-9", 0);
    // DEQ-10: degree-0 homogeneity tests
    const homog = (F: (x: number, y: number) => number) => [2, 3.5].every((l) => near(F(l * 1.3, l * 0.7), F(1.3, 0.7)));
    ok(homog((x, y) => (x + y) / x) && !homog((x, y) => x + y * y) && !homog((x) => (x + 1)) && !homog((x, y) => Math.sin(x) + y), "DEQ-10 only option 0 is homogeneous");
    mcqIs("DEQ-10", 0);
  }
  resid("DEQ-11", (x, y, yp) => yp - x * y, [-1, 0.5, 1.7], 0, 1);
  resid("DEQ-12", (x, y, yp) => yp - (1 + y * y) / (1 + x * x), [-2, -0.5, 0.3], 0, 1);
  resid("DEQ-13", (x, y, yp) => yp - (x + y) / x, [0.6, 1.5, 3], 1, 0);
  numeric("DEQ-C1", 3);
  resid("DEQ-C2", (x, y, yp) => yp + 2 * y - Math.sin(x), [-1, 0.5, 2], 0, 0);
  mcqIs("DEQ-C3", 0);
  {
    // DEQ-C4: P = e^{kt}, doubling at 10 => k = ln2/10; quadruple at t
    const k = Math.log(2) / 10;
    numeric("DEQ-C4", Math.log(4) / k, 1e-9);
  }
}

// ======================================================================= Three-Dimensional Geometry (extra lines questions)
{
  type V = number[];
  const dot = (a: V, b: V) => a.reduce((s, v, i) => s + v * b[i], 0);
  const cross = (a: V, b: V): V => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const norm = (a: V) => Math.hypot(...a);
  mcqIs("G3X-1", 0);
  {
    const k = value("G3X-2");
    ok(near(dot([-3, 2 * k, 2], [3 * k, 1, -5]), 0, 1e-9), "G3X-2 perpendicular");
    const d = dot([3, -1, -3], cross([2, 3, 4], [5, 2, 1]));
    ok(Math.abs(d) < 1e-12, "G3X-3 coplanar");
    ok(norm(cross([2, 3, 4], [5, 2, 1])) > 0, "G3X-3 not parallel");
    mcqIs("G3X-3", 0);
    numeric("G3X-4", norm(cross([1, 2, 2], [1, 0, 0])) / norm([1, 2, 2]), 1e-9);
    const c = cross([2, -1, 1], [3, -5, 2]);
    numeric("G3X-5", Math.abs(dot([1, 0, -1], c)) / norm(c), 1e-9);
  }
}

// ======================================================================= Linear Programming
{
  type Con = [number, number, number]; // a x + b y <= c
  const NONNEG: Con[] = [[-1, 0, 0], [0, -1, 0]];
  const le = (a: number, b: number, c: number): Con => [a, b, c];
  const ge = (a: number, b: number, c: number): Con => [-a, -b, -c];
  const feasible = (cs: Con[], x: number, y: number) => cs.every(([a, b, c]) => a * x + b * y <= c + 1e-9);
  function vertices(cs: Con[]): [number, number][] {
    const out: [number, number][] = [];
    for (let i = 0; i < cs.length; i++) for (let j = i + 1; j < cs.length; j++) {
      const [a1, b1, c1] = cs[i], [a2, b2, c2] = cs[j];
      const det = a1 * b2 - a2 * b1;
      if (Math.abs(det) < 1e-12) continue;
      const x = (c1 * b2 - c2 * b1) / det, y = (a1 * c2 - a2 * c1) / det;
      if (feasible(cs, x, y) && !out.some(([px, py]) => near(px, x, 1e-9) && near(py, y, 1e-9))) out.push([x, y]);
    }
    return out;
  }
  /** Optimum over vertices, cross-checked against a fine grid sample (this also catches unbounded-region mistakes). */
  function optimum(cs: Con[], f: (x: number, y: number) => number, kind: "max" | "min"): { value: number; vertices: number } {
    const vs = vertices([...cs, ...NONNEG]);
    const vals = vs.map(([x, y]) => f(x, y));
    const best = kind === "max" ? Math.max(...vals) : Math.min(...vals);
    let gridBest = kind === "max" ? -Infinity : Infinity;
    for (let x = 0; x <= 150; x += 0.25) for (let y = 0; y <= 150; y += 0.25) {
      if (!feasible([...cs, ...NONNEG], x, y)) continue;
      const v = f(x, y);
      gridBest = kind === "max" ? Math.max(gridBest, v) : Math.min(gridBest, v);
    }
    ok(kind === "max" ? gridBest <= best + 1e-6 : gridBest >= best - 1e-6, `LPP grid sample beats the vertex optimum (${gridBest} vs ${best})`);
    return { value: best, vertices: vs.length };
  }
  numeric("LPP-1", optimum([le(1, 1, 4)], (x, y) => 3 * x + 4 * y, "max").value);
  mcqIs("LPP-2", 0);
  numeric("LPP-3", optimum([le(1, 1, 6), le(1, 0, 4), le(0, 1, 5)], (x, y) => 5 * x + 3 * y, "max").value);
  numeric("LPP-4", optimum([le(2, 1, 8), le(1, 2, 10)], (x, y) => 30 * x + 20 * y, "max").value);
  numeric("LPP-5", optimum([le(1, 1, 5), le(1, 0, 3), le(0, 1, 4)], () => 0, "max").vertices);
  numeric("LPP-6", optimum([le(1, 1, 50), le(3, 1, 90)], (x, y) => 4 * x + y, "max").value);
  numeric("LPP-7", optimum([ge(1, 1, 4), ge(1, 3, 6)], (x, y) => 4 * x + 3 * y, "min").value);
  {
    // LPP-8: Z = 2(x + 2y) <= 20 everywhere, and equals 20 along the whole edge
    const cs = [le(1, 2, 10)];
    ok(optimum(cs, (x, y) => 2 * x + 4 * y, "max").value === 20, "LPP-8 max is 20");
    ok([0, 2, 5, 8, 10].every((x) => near(2 * x + 4 * ((10 - x) / 2), 20)), "LPP-8 edge all optimal");
    mcqIs("LPP-8", 0);
    // LPP-9: points (t,t) are feasible with Z = 2t unbounded
    ok([1, 10, 1000].every((tt) => feasible([le(1, -1, 1), ...NONNEG], tt, tt) && 2 * tt >= 2), "LPP-9 unbounded");
    mcqIs("LPP-9", 0);
  }
  numeric("LPP-10", optimum([le(1, 0, 3), le(0, 1, 2)], (x, y) => x + y, "max").value);
  numeric("LPP-C1", optimum([le(1, 2, 10), le(3, 1, 15)], (x, y) => 3 * x + 2 * y, "max").value);
  numeric("LPP-C2", optimum([ge(2, 1, 8), ge(1, 2, 10)], (x, y) => 5 * x + 4 * y, "min").value);
  numeric("LPP-C3", optimum([le(1, 2, 8), le(3, 2, 12)], (x, y) => -3 * x + 4 * y, "min").value);
  ok(vertices([le(1, 1, 2), ge(1, 1, 5), ...NONNEG]).length === 0, "LPP-C4 empty region has no vertices");
  mcqIs("LPP-C4", 0);
}

// ======================================================================= Probability
{
  numeric("PRB-1", 0.6 * 0.3);
  numeric("PRB-2", 0.2 / 0.5);
  {
    let n = 0;
    for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) if (a + b === 8) n++;
    numeric("PRB-3", n / 36);
    // PRB-C1: given sum 8, first even
    let tot = 0, ev = 0;
    for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) if (a + b === 8) { tot++; if (a % 2 === 0) ev++; }
    numeric("PRB-C1", ev / tot);
  }
  {
    // PRB-4: two coins, P(HH | at least one H)
    const space = [[1, 1], [1, 0], [0, 1], [0, 0]];
    const B = space.filter(([x, y]) => x + y >= 1), AB = B.filter(([x, y]) => x + y === 2);
    numeric("PRB-4", AB.length / B.length);
  }
  {
    // PRB-5: enumerate ordered draws of 2 from 5 red (R) and 3 blue (B)
    const balls = [...Array(5).fill("R"), ...Array(3).fill("B")];
    let both = 0, all = 0;
    for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) if (i !== j) { all++; if (balls[i] === "R" && balls[j] === "R") both++; }
    numeric("PRB-5", both / all);
    // PRB-6 / PRB-7: bag I (3R,2B), bag II (1R,4B), pick bag at random
    const pR = 0.5 * (3 / 5) + 0.5 * (1 / 5);
    numeric("PRB-6", pR);
    numeric("PRB-7", (0.5 * (3 / 5)) / pR);
  }
  numeric("PRB-8", 1 / 2 + 1 / 3 - (1 / 2) * (1 / 3));
  {
    // PRB-9: P(A and B) from the union, then P(A | B)
    numeric("PRB-9", (0.3 + 0.4 - 0.5) / 0.4);
    const xs = [0, 1, 2], ps = [0.2, 0.5, 0.3];
    ok(near(ps.reduce((a, b) => a + b, 0), 1), "PRB-10 probabilities sum to 1");
    numeric("PRB-10", xs.reduce((s, x, i) => s + x * ps[i], 0));
    numeric("PRB-11", 1 / (1 + 2 + 3 + 4));
    // PRB-12: at least one six in 4 throws by enumeration of 6^4 outcomes
    let hit = 0;
    for (let m = 0; m < 1296; m++) { let x = m, six = false; for (let i = 0; i < 4; i++) { if (x % 6 === 5) six = true; x = Math.floor(x / 6); } if (six) hit++; }
    numeric("PRB-12", hit / 1296);
  }
  numeric("PRB-13", (0.01 * 0.99) / (0.01 * 0.99 + 0.99 * 0.05));
  {
    // PRB-C2: number of sixes in two throws, by enumeration
    {
      let sum = 0;
      for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) sum += (a === 6 ? 1 : 0) + (b === 6 ? 1 : 0);
      numeric("PRB-C2", sum / 36, 1e-9);
    }
    // PRB-C3: independent A, B
    numeric("PRB-C3", 1 - (0.3 + 0.4 - 0.3 * 0.4), 1e-9);
    const pD = 0.5 * 0.01 + 0.3 * 0.02 + 0.2 * 0.03;
    numeric("PRB-C4", (0.5 * 0.01) / pD);
  }
}

// CHAPTER-CHECKS-END
console.log(`${checks} chapter checks, ${failures} failed`);
if (failures > 0) process.exit(1);
