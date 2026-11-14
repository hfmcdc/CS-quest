import type { MathGenerator, MathQuestion } from "./types";
import { HELP, anti, num, tup, vec } from "./questions";

const t = String.raw;
type Rng = () => number;

const ri = (rng: Rng, lo: number, hi: number) => lo + Math.floor(rng() * (hi - lo + 1));
const choice = <T,>(rng: Rng, xs: readonly T[]): T => xs[Math.floor(rng() * xs.length)];
/** TeX command for a function name, so it renders upright (\\cos, not italic c-o-s). */
const F = (fn: string) => "\\" + fn;
const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));

/** Reduced fraction as TeX, e.g. 6/4 -> \frac{3}{2}, -2/3 -> -\frac{2}{3}. */
export function fracTex(n: number, d: number): string {
  const g = gcd(n, d) || 1;
  let a = n / g;
  let b = d / g;
  if (b < 0) { a = -a; b = -b; }
  if (b === 1) return String(a);
  return `${a < 0 ? "-" : ""}\\frac{${Math.abs(a)}}{${b}}`;
}

/** Signed term for a polynomial/vector string: coef * body. */
function term(c: number, body: string, first: boolean): string {
  if (c === 0) return "";
  const sign = c < 0 ? "-" : first ? "" : "+";
  const mag = Math.abs(c);
  const coef = mag === 1 && body !== "" ? "" : String(mag);
  return `${sign}${coef}${body}`;
}

function vecTex(v: number[]): string {
  const parts = [term(v[0], "\\hat{i}", true), term(v[1], "\\hat{j}", !v[0]), term(v[2], "\\hat{k}", !v[0] && !v[1])];
  return parts.join("") || "0";
}

/** Multiples of pi as TeX for k/12 * pi (denominators 1,2,3,4,6). */
export function piTex(angle: number): string {
  const twelfths = Math.round((angle / Math.PI) * 12);
  if (twelfths === 0) return "0";
  const g = gcd(twelfths, 12);
  const n = twelfths / g;
  const d = 12 / g;
  const sign = n < 0 ? "-" : "";
  const an = Math.abs(n);
  if (d === 1) return `${sign}${an === 1 ? "" : an}\\pi`;
  return `${sign}\\frac{${an === 1 ? "" : an}\\pi}{${d}}`;
}

const PYTH: [number, number, number, number][] = [
  [1, 2, 2, 3], [2, 3, 6, 7], [2, 6, 9, 11], [4, 4, 7, 9], [1, 4, 8, 9], [2, 10, 11, 15], [4, 8, 8, 12], [6, 6, 7, 11],
];
function signed(rng: Rng, v: number[]): number[] {
  const p = [...v].sort(() => rng() - 0.5);
  return p.map((x) => (rng() < 0.5 ? -x : x));
}

// ----------------------------------------------------------------- Inverse trig
const SIN_ARGS: [string, number][] = [["0", 0], ["\\frac{1}{2}", 0.5], ["\\frac{\\sqrt{2}}{2}", Math.SQRT1_2], ["\\frac{\\sqrt{3}}{2}", Math.sqrt(3) / 2], ["1", 1]];
const TAN_ARGS: [string, number][] = [["0", 0], ["\\frac{1}{\\sqrt{3}}", 1 / Math.sqrt(3)], ["1", 1], ["\\sqrt{3}", Math.sqrt(3)]];

const genItfValue: MathGenerator = {
  id: "G-ITF-VALUE", topic: "itf", level: 1,
  make(rng) {
    const fn = choice(rng, ["sin", "cos", "tan"] as const);
    const [s, v] = fn === "tan" ? choice(rng, TAN_ARGS) : choice(rng, SIN_ARGS);
    const neg = v !== 0 && rng() < 0.5;
    const x = neg ? -v : v;
    const val = fn === "sin" ? Math.asin(x) : fn === "cos" ? Math.acos(x) : Math.atan(x);
    const argTex = neg ? `-${s}` : s;
    return {
      id: `G-ITF-VALUE#${fn}${neg ? "n" : "p"}${s}`, topic: "itf", tag: "Principal values", kind: "direct", level: 1,
      text: t`Find the principal value of $${F(fn)}^{-1}\left(${argTex}\right)$.`,
      spec: num(val), answer: `$${piTex(val)}$`,
      steps: [
        t`Find the angle in the principal branch of $${F(fn)}^{-1}$ whose ${fn} is $${argTex}$.`,
        t`The principal value is $${piTex(val)}$ (the range is ${fn === "sin" ? t`$\left[-\frac{\pi}{2},\frac{\pi}{2}\right]$` : fn === "cos" ? "$[0,\\pi]$" : t`$\left(-\frac{\pi}{2},\frac{\pi}{2}\right)$`}).`,
      ],
      hint: fn === "cos" ? t`The range of $\cos^{-1}$ is $[0,\pi]$; use $\cos^{-1}(-x)=\pi-\cos^{-1}x$ for negatives.` : t`The range is a symmetric interval about $0$; use $${F(fn)}^{-1}(-x)=-${F(fn)}^{-1}x$.`,
      input: HELP.num,
    };
  },
};

const genItfComposite: MathGenerator = {
  id: "G-ITF-COMPOSITE", topic: "itf", level: 2,
  make(rng) {
    const useSin = rng() < 0.5;
    const k = choice(rng, useSin ? [2, 3, 4, 5, 7, 8, 9, -5, -7, -4] : [-1, -2, 4, 5, 7, 8, -3, 9, 10]);
    const theta = (k * Math.PI) / 6;
    const val = useSin ? Math.asin(Math.sin(theta)) : Math.acos(Math.cos(theta));
    const th = piTex(theta);
    const fn = useSin ? "sin" : "cos";
    const range = useSin ? t`\left[-\frac{\pi}{2},\frac{\pi}{2}\right]` : t`[0,\pi]`;
    return {
      id: `G-ITF-COMPOSITE#${fn}${k}`, topic: "itf", tag: `${fn}⁻¹(${fn} x)`, kind: "short", level: 2,
      text: t`Find $${F(fn)}^{-1}\left(${F(fn)}\,${th}\right)$.`,
      spec: num(val), answer: `$${piTex(val)}$`,
      steps: [
        t`$${F(fn)}^{-1}(${F(fn)}\,x)=x$ only for $x\in${range}$. Check whether $${th}$ lies in this interval.`,
        t`Find the equivalent angle in the principal range with the same ${fn}: it is $${piTex(val)}$.`,
        t`Therefore $${F(fn)}^{-1}\left(${F(fn)}\,${th}\right)=${piTex(val)}$.`,
      ],
      hint: t`Replace $${th}$ by an angle in $${range}$ that has the same ${fn}.`,
      input: HELP.num,
    };
  },
};

// ----------------------------------------------------------------- Vectors
const genVecDot: MathGenerator = {
  id: "G-VEC-DOT", topic: "vectors", level: 1,
  make(rng) {
    const a = [ri(rng, -5, 5), ri(rng, -5, 5), ri(rng, -5, 5)];
    const b = [ri(rng, -5, 5), ri(rng, -5, 5), ri(rng, -5, 5)];
    const d = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    const parts = a.map((x, i) => `(${x})(${b[i]})`).join("+");
    return {
      id: `G-VEC-DOT#${a.join(",")}|${b.join(",")}`, topic: "vectors", tag: "Dot product", kind: "direct", level: 1,
      text: t`Find $\vec{a}\cdot\vec{b}$ if $\vec{a}=${vecTex(a)}$ and $\vec{b}=${vecTex(b)}$.`,
      spec: num(d), answer: `$${d}$`,
      steps: [t`$\vec{a}\cdot\vec{b}=${parts}=${d}$.`],
      hint: t`Multiply matching components and add.`, input: HELP.num,
    };
  },
};

const genVecMagnitude: MathGenerator = {
  id: "G-VEC-MAG", topic: "vectors", level: 1,
  make(rng) {
    const [p, q, r, m] = choice(rng, PYTH);
    const v = signed(rng, [p, q, r]);
    return {
      id: `G-VEC-MAG#${v.join(",")}`, topic: "vectors", tag: "Magnitude", kind: "direct", level: 1,
      text: t`Find the magnitude of $\vec{a}=${vecTex(v)}$.`,
      spec: num(m), answer: `$${m}$`,
      steps: [t`$|\vec{a}|=\sqrt{(${v[0]})^2+(${v[1]})^2+(${v[2]})^2}=\sqrt{${m * m}}=${m}$.`],
      hint: t`Add the squares of the components, then take the square root.`, input: HELP.num,
    };
  },
};

const genVecCross: MathGenerator = {
  id: "G-VEC-CROSS", topic: "vectors", level: 2,
  make(rng) {
    const a = [ri(rng, -4, 4), ri(rng, -4, 4), ri(rng, -4, 4)];
    const b = [ri(rng, -4, 4), ri(rng, -4, 4), ri(rng, -4, 4)];
    const c: [number, number, number] = [a[1] * b[2] - a[2] * b[1], -(a[0] * b[2] - a[2] * b[0]), a[0] * b[1] - a[1] * b[0]];
    return {
      id: `G-VEC-CROSS#${a.join(",")}|${b.join(",")}`, topic: "vectors", tag: "Cross product", kind: "steps", level: 2,
      text: t`Find $\vec{a}\times\vec{b}$ if $\vec{a}=${vecTex(a)}$ and $\vec{b}=${vecTex(b)}$.`,
      spec: vec(c), answer: `$${vecTex(c)}$`,
      steps: [
        t`$\hat{i}$: $(${a[1]})(${b[2]})-(${a[2]})(${b[1]})=${c[0]}$.`,
        t`$\hat{j}$: $-\big[(${a[0]})(${b[2]})-(${a[2]})(${b[0]})\big]=${c[1]}$.`,
        t`$\hat{k}$: $(${a[0]})(${b[1]})-(${a[1]})(${b[0]})=${c[2]}$.`,
        t`So $\vec{a}\times\vec{b}=${vecTex(c)}$.`,
      ],
      hint: t`Use the determinant with rows $(\hat{i},\hat{j},\hat{k})$, $\vec{a}$ and $\vec{b}$; the $\hat{j}$ term has a minus sign.`,
      input: HELP.vec,
    };
  },
};

const genVecUnit: MathGenerator = {
  id: "G-VEC-UNIT", topic: "vectors", level: 2,
  make(rng) {
    const [p, q, r, m] = choice(rng, PYTH);
    const v = signed(rng, [p, q, r]);
    return {
      id: `G-VEC-UNIT#${v.join(",")}`, topic: "vectors", tag: "Unit vector", kind: "short", level: 2,
      text: t`Find the unit vector in the direction of $\vec{a}=${vecTex(v)}$.`,
      spec: vec([v[0] / m, v[1] / m, v[2] / m]),
      answer: `$${fracTex(v[0], m)}\\hat{i}${v[1] < 0 ? "" : "+"}${fracTex(v[1], m)}\\hat{j}${v[2] < 0 ? "" : "+"}${fracTex(v[2], m)}\\hat{k}$`,
      steps: [t`$|\vec{a}|=\sqrt{${m * m}}=${m}$.`, t`Divide each component by $${m}$ to get the unit vector.`],
      hint: t`Divide the vector by its magnitude.`, input: HELP.vec,
    };
  },
};

// ----------------------------------------------------------------- 3D geometry
const genGeoDR: MathGenerator = {
  id: "G-GEO-DR", topic: "geometry3d", level: 1,
  make(rng) {
    const P = [ri(rng, -5, 5), ri(rng, -5, 5), ri(rng, -5, 5)];
    let Q = [ri(rng, -5, 5), ri(rng, -5, 5), ri(rng, -5, 5)];
    if (P.every((x, i) => x === Q[i])) Q = [Q[0] + 1, Q[1], Q[2]];
    const d = Q.map((x, i) => x - P[i]);
    return {
      id: `G-GEO-DR#${P.join(",")}|${Q.join(",")}`, topic: "geometry3d", tag: "Direction ratios", kind: "direct", level: 1,
      text: t`Find a set of direction ratios of the line through $P(${P.join(",")})$ and $Q(${Q.join(",")})$.`,
      spec: tup(d, true), answer: t`$${d.join(",\\ ")}$ (any proportional set)`,
      steps: [t`Subtract coordinates: $(${Q[0]}-(${P[0]}),\ ${Q[1]}-(${P[1]}),\ ${Q[2]}-(${P[2]}))=(${d.join(",")})$.`],
      hint: t`Direction ratios are $x_2-x_1,\ y_2-y_1,\ z_2-z_1$.`,
      input: "Type three numbers separated by commas. Any proportional set is accepted.",
    };
  },
};

const genGeoDC: MathGenerator = {
  id: "G-GEO-DC", topic: "geometry3d", level: 2,
  make(rng) {
    const [p, q, r, m] = choice(rng, PYTH);
    const d = signed(rng, [p, q, r]);
    return {
      id: `G-GEO-DC#${d.join(",")}`, topic: "geometry3d", tag: "Direction cosines", kind: "short", level: 2,
      text: t`A line has direction ratios $${d.join(",\\ ")}$. Find its direction cosines (using the signs as given).`,
      spec: tup(d.map((x) => x / m)),
      answer: t`$\left(${d.map((x) => fracTex(x, m)).join(",\\ ")}\right)$`,
      steps: [t`$\sqrt{(${d[0]})^2+(${d[1]})^2+(${d[2]})^2}=\sqrt{${m * m}}=${m}$.`, t`Divide each ratio by $${m}$.`],
      hint: t`Divide each direction ratio by $\sqrt{a^2+b^2+c^2}$.`, input: HELP.tup,
    };
  },
};

const genGeoAngle: MathGenerator = {
  id: "G-GEO-ANGLE", topic: "geometry3d", level: 2,
  make(rng) {
    const [p1, q1, r1, m1] = choice(rng, PYTH);
    const [p2, q2, r2, m2] = choice(rng, PYTH);
    const a = signed(rng, [p1, q1, r1]);
    const b = signed(rng, [p2, q2, r2]);
    const dot = Math.abs(a[0] * b[0] + a[1] * b[1] + a[2] * b[2]);
    return {
      id: `G-GEO-ANGLE#${a.join(",")}|${b.join(",")}`, topic: "geometry3d", tag: "Angle between lines", kind: "short", level: 2,
      text: t`Find $\cos\theta$ for the acute angle $\theta$ between lines with direction ratios $${a.join(",\\ ")}$ and $${b.join(",\\ ")}$.`,
      spec: num(dot / (m1 * m2)), answer: `$${fracTex(dot, m1 * m2)}$`,
      steps: [
        t`$|a_1a_2+b_1b_2+c_1c_2|=${dot}$.`,
        t`The magnitudes are $${m1}$ and $${m2}$.`,
        t`$\cos\theta=\frac{${dot}}{${m1}\cdot${m2}}=${fracTex(dot, m1 * m2)}$.`,
      ],
      hint: t`Divide the absolute dot product by the product of the two magnitudes.`, input: HELP.num,
    };
  },
};

// ----------------------------------------------------------------- Maxima and minima
const genMMQuadratic: MathGenerator = {
  id: "G-MM-QUAD", topic: "maxmin", level: 1,
  make(rng) {
    const a = ri(rng, 1, 4);
    const h = ri(rng, -4, 6);
    const c = ri(rng, -9, 9);
    const b = -2 * a * h;
    const f = (x: number) => a * x * x + b * x + c;
    const poly = `${term(a, "x^2", true)}${term(b, "x", false)}${c === 0 ? "" : (c < 0 ? "-" : "+") + Math.abs(c)}`;
    return {
      id: `G-MM-QUAD#${a},${b},${c}`, topic: "maxmin", tag: "Minimum value", kind: "direct", level: 1,
      text: t`Find the minimum value of $f(x)=${poly}$.`,
      spec: num(f(h)), answer: `$${f(h)}$`,
      steps: [
        t`$f'(x)=${2 * a}x${b < 0 ? "-" : "+"}${Math.abs(b)}=0\Rightarrow x=${h}$.`,
        t`$f''(x)=${2 * a}>0$, so this is a minimum.`,
        t`$f(${h})=${f(h)}$.`,
      ],
      hint: t`Set $f'(x)=0$, then substitute the critical point into $f$.`, input: HELP.num,
    };
  },
};

const genMMCubic: MathGenerator = {
  id: "G-MM-CUBIC", topic: "maxmin", level: 2,
  make(rng) {
    const a = ri(rng, 1, 4);
    const c = ri(rng, -9, 9);
    const wantMax = rng() < 0.5;
    const val = wantMax ? 2 * a ** 3 + c : -2 * a ** 3 + c; // f = x^3 - 3a^2 x + c, max at -a, min at a
    const body = `x^3-${3 * a * a}x${c === 0 ? "" : (c < 0 ? "-" : "+") + Math.abs(c)}`;
    const at = wantMax ? -a : a;
    return {
      id: `G-MM-CUBIC#${a},${c},${wantMax ? "max" : "min"}`, topic: "maxmin", tag: wantMax ? "Local maximum" : "Local minimum", kind: "steps", level: 2,
      text: t`Find the local ${wantMax ? "maximum" : "minimum"} value of $f(x)=${body}$.`,
      spec: num(val), answer: `$${val}$`,
      steps: [
        t`$f'(x)=3x^2-${3 * a * a}=3(x-${a})(x+${a})$, so $x=\pm${a}$.`,
        t`$f''(x)=6x$. $f''(${at})=${6 * at}${wantMax ? "<" : ">"}0$, so $x=${at}$ gives the local ${wantMax ? "maximum" : "minimum"}.`,
        t`$f(${at})=${val}$.`,
      ],
      hint: t`Use the second derivative test to choose between the two critical points.`, input: HELP.num,
    };
  },
};

const genMMProduct: MathGenerator = {
  id: "G-MM-PRODUCT", topic: "maxmin", level: 2,
  make(rng) {
    const s = 2 * ri(rng, 4, 20);
    const h = s / 2;
    return {
      id: `G-MM-PRODUCT#${s}`, topic: "maxmin", tag: "Optimisation", kind: "application", level: 2,
      text: t`Two positive numbers have sum $${s}$. Find the maximum possible value of their product.`,
      spec: num(h * h), answer: `$${h * h}$`,
      steps: [
        t`Let the numbers be $x$ and $${s}-x$; $P=x(${s}-x)$.`,
        t`$P'=${s}-2x=0\Rightarrow x=${h}$, and $P''=-2<0$ (maximum).`,
        t`$P(${h})=${h}\cdot${h}=${h * h}$.`,
      ],
      hint: t`Write the product in terms of one number using the sum.`, input: HELP.num,
    };
  },
};

const genMMRect: MathGenerator = {
  id: "G-MM-RECT", topic: "maxmin", level: 2,
  make(rng) {
    const p = 4 * ri(rng, 3, 15);
    const s = p / 4;
    return {
      id: `G-MM-RECT#${p}`, topic: "maxmin", tag: "Optimisation", kind: "application", level: 2,
      text: t`A rectangle has perimeter $${p}$ m. Find the maximum possible area (in m²).`,
      spec: num(s * s), answer: t`$${s * s}\ \text{m}^2$`,
      steps: [
        t`Sides $x$ and $${p / 2}-x$, so $A=x(${p / 2}-x)$.`,
        t`$A'=${p / 2}-2x=0\Rightarrow x=${s}$; $A''=-2<0$ (maximum).`,
        t`$A=${s}\cdot${s}=${s * s}$ m², a square.`,
      ],
      hint: t`Perimeter $=2(x+y)$, so $y=${p / 2}-x$.`, input: HELP.num,
    };
  },
};

// ----------------------------------------------------------------- Integrals
function polyTerms(coefs: [number, number][]): string {
  return coefs.map(([c, n], i) => term(c, n === 0 ? "" : n === 1 ? "x" : `x^${n}`, i === 0)).join("").replace(/^(-?)(\d+)$/, "$1$2");
}

const genIntPoly: MathGenerator = {
  id: "G-INT-POLY", topic: "integrals", level: 1,
  make(rng) {
    const a = 3 * ri(rng, 1, 4) * (rng() < 0.3 ? -1 : 1);
    const b = 2 * ri(rng, 1, 5) * (rng() < 0.5 ? -1 : 1);
    const c = ri(rng, 1, 9) * (rng() < 0.5 ? -1 : 1);
    const f = polyTerms([[a, 2], [b, 1], [c, 0]]);
    const F: [number, number][] = [[a / 3, 3], [b / 2, 2], [c, 1]];
    const Ftex = polyTerms(F);
    const model = F.map(([k, n], i) => `${i ? "+" : ""}(${k})*x^${n}`).join("");
    return {
      id: `G-INT-POLY#${a},${b},${c}`, topic: "integrals", tag: "Basic integration", kind: "direct", level: 1,
      text: t`Find $\int\left(${f}\right)dx$.`,
      spec: anti(model, [-3, 3]), answer: `$${Ftex}+C$`,
      steps: [t`Apply $\int x^n dx=\frac{x^{n+1}}{n+1}$ to each term.`, t`The result is $${Ftex}+C$.`],
      hint: t`Raise each power by $1$ and divide by the new power.`, input: HELP.anti,
    };
  },
};

const genIntTrigLinear: MathGenerator = {
  id: "G-INT-TRIGLIN", topic: "integrals", level: 2,
  make(rng) {
    const k = ri(rng, 2, 7);
    const kind = choice(rng, ["sin", "cos", "exp"] as const);
    const body = kind === "sin" ? `\\sin ${k}x` : kind === "cos" ? `\\cos ${k}x` : `e^{${k}x}`;
    const model = kind === "sin" ? `-cos(${k}x)/${k}` : kind === "cos" ? `sin(${k}x)/${k}` : `e^(${k}x)/${k}`;
    const resTex = kind === "sin" ? `-\\frac{\\cos ${k}x}{${k}}` : kind === "cos" ? `\\frac{\\sin ${k}x}{${k}}` : `\\frac{e^{${k}x}}{${k}}`;
    return {
      id: `G-INT-TRIGLIN#${kind}${k}`, topic: "integrals", tag: "Linear argument", kind: "short", level: 2,
      text: t`Find $\int ${body}\,dx$.`,
      spec: anti(model, [-1.5, 1.5]), answer: `$${resTex}+C$`,
      steps: [t`Put $t=${k}x$, so $dx=\frac{dt}{${k}}$.`, t`Integrate and substitute back: $${resTex}+C$.`, t`Differentiating the result returns the integrand ✓.`],
      hint: t`A linear argument $${k}x$ gives a factor $\frac{1}{${k}}$.`, input: HELP.anti,
    };
  },
};

const genIntStd74: MathGenerator = {
  id: "G-INT-STD74", topic: "integrals", level: 3,
  make(rng) {
    const a = ri(rng, 2, 6);
    const form = choice(rng, ["plus", "minus", "root"] as const);
    if (form === "plus") {
      return {
        id: `G-INT-STD74#plus${a}`, topic: "integrals", tag: "Exercise 7.4 type", kind: "direct", level: 3,
        text: t`Find $\int\frac{dx}{x^2+${a * a}}$.`,
        spec: anti(`atan(x/${a})/${a}`, [-4, 4]), answer: t`$\frac{1}{${a}}\tan^{-1}\frac{x}{${a}}+C$`,
        steps: [t`$x^2+${a * a}=x^2+${a}^2$, so use $\int\frac{dx}{x^2+a^2}=\frac1a\tan^{-1}\frac{x}{a}$ with $a=${a}$.`],
        hint: t`Recognise $${a * a}=${a}^2$.`, input: HELP.anti,
      };
    }
    if (form === "minus") {
      return {
        id: `G-INT-STD74#minus${a}`, topic: "integrals", tag: "Exercise 7.4 type", kind: "direct", level: 3,
        text: t`Find $\int\frac{dx}{x^2-${a * a}}$ for $x>${a}$.`,
        spec: anti(`ln|(x-${a})/(x+${a})|/${2 * a}`, [a + 1, a + 6]), answer: t`$\frac{1}{${2 * a}}\ln\left|\frac{x-${a}}{x+${a}}\right|+C$`,
        steps: [t`$x^2-${a * a}=x^2-${a}^2$; use $\int\frac{dx}{x^2-a^2}=\frac{1}{2a}\ln\left|\frac{x-a}{x+a}\right|$ with $a=${a}$.`],
        hint: t`Recognise $${a * a}=${a}^2$ and use the difference-of-squares form.`, input: HELP.anti,
      };
    }
    return {
      id: `G-INT-STD74#root${a}`, topic: "integrals", tag: "Exercise 7.4 type", kind: "direct", level: 3,
      text: t`Find $\int\frac{dx}{\sqrt{${a * a}-x^2}}$.`,
      spec: anti(`asin(x/${a})`, [-a + 0.2, a - 0.2]), answer: t`$\sin^{-1}\frac{x}{${a}}+C$`,
      steps: [t`$${a * a}-x^2=${a}^2-x^2$; use $\int\frac{dx}{\sqrt{a^2-x^2}}=\sin^{-1}\frac{x}{a}$ with $a=${a}$.`],
      hint: t`Recognise $${a * a}=${a}^2$.`, input: HELP.anti,
    };
  },
};

export const GENERATORS: MathGenerator[] = [
  genItfValue, genItfComposite,
  genVecDot, genVecMagnitude, genVecCross, genVecUnit,
  genGeoDR, genGeoDC, genGeoAngle,
  genMMQuadratic, genMMCubic, genMMProduct, genMMRect,
  genIntPoly, genIntTrigLinear, genIntStd74,
];

export type { MathQuestion };
