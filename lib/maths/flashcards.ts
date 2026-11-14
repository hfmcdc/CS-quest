import type { MathTopicId } from "./types";
import { piTex } from "./generators";

/** Formula and principal-value flashcards. front/back are rich text ($inline$, $$display$$). */
export interface MathCard {
  id: string;
  topic: MathTopicId;
  tag: string;
  front: string;
  back: string;
}

const t = String.raw;
const mk = (topic: MathTopicId, prefix: string) => {
  let n = 0;
  return (tag: string, front: string, back: string): MathCard => ({ id: `${prefix}${++n}`, topic, tag, front, back });
};

// ---------------------------------------------------------------- principal value tables (generated, then checked in tests)
type Fn = "sin" | "cos" | "tan" | "cot" | "sec" | "csc";
export interface PvRow { fn: Fn; tex: string; arg: number; value: number }

const S2 = Math.SQRT2;
const S3 = Math.sqrt(3);
const inv: Record<Fn, (x: number) => number> = {
  sin: Math.asin,
  cos: Math.acos,
  tan: Math.atan,
  cot: (x) => Math.PI / 2 - Math.atan(x),
  sec: (x) => Math.acos(1 / x),
  csc: (x) => Math.asin(1 / x),
};
const NAME: Record<Fn, string> = { sin: "\\sin^{-1}", cos: "\\cos^{-1}", tan: "\\tan^{-1}", cot: "\\cot^{-1}", sec: "\\sec^{-1}", csc: "\\text{cosec}^{-1}" };

const half = { tex: "\\frac{1}{2}", v: 0.5 };
const r2 = { tex: "\\frac{\\sqrt{2}}{2}", v: S2 / 2 };
const r3 = { tex: "\\frac{\\sqrt{3}}{2}", v: S3 / 2 };
const ARGS: Record<Fn, { tex: string; v: number }[]> = {
  sin: [{ tex: "0", v: 0 }, half, r2, r3, { tex: "1", v: 1 }],
  cos: [{ tex: "0", v: 0 }, half, r2, r3, { tex: "1", v: 1 }],
  tan: [{ tex: "0", v: 0 }, { tex: "\\frac{1}{\\sqrt{3}}", v: 1 / S3 }, { tex: "1", v: 1 }, { tex: "\\sqrt{3}", v: S3 }],
  cot: [{ tex: "\\sqrt{3}", v: S3 }, { tex: "1", v: 1 }, { tex: "\\frac{1}{\\sqrt{3}}", v: 1 / S3 }, { tex: "0", v: 0 }],
  sec: [{ tex: "1", v: 1 }, { tex: "\\frac{2}{\\sqrt{3}}", v: 2 / S3 }, { tex: "\\sqrt{2}", v: S2 }, { tex: "2", v: 2 }],
  csc: [{ tex: "1", v: 1 }, { tex: "\\frac{2}{\\sqrt{3}}", v: 2 / S3 }, { tex: "\\sqrt{2}", v: S2 }, { tex: "2", v: 2 }],
};

function rows(fn: Fn, negative: boolean): PvRow[] {
  return ARGS[fn]
    .filter((a) => !negative || a.v !== 0)
    .map((a) => {
      const arg = negative ? -a.v : a.v;
      return { fn, tex: negative ? `-${a.tex}` : a.tex, arg, value: inv[fn](arg) };
    });
}

export const PV_ROWS: PvRow[] = (["sin", "cos", "tan", "cot", "sec", "csc"] as Fn[]).flatMap((fn) => [...rows(fn, false), ...rows(fn, true)]);

function table(rs: PvRow[]): string {
  return rs.map((r) => `$${NAME[r.fn]}\\left(${r.tex}\\right)=${piTex(r.value)}$`).join("\n");
}
function args(rs: PvRow[]): string {
  return `$${rs.map((r) => r.tex).join(",\\ ")}$`;
}

const pv = mk("itf", "PV");
const pvCards: MathCard[] = [];
for (const fn of ["sin", "cos", "tan", "cot", "sec", "csc"] as Fn[]) {
  const pos = rows(fn, false);
  const neg = rows(fn, true);
  const range = { sin: "[-\\frac{\\pi}{2},\\frac{\\pi}{2}]", cos: "[0,\\pi]", tan: "(-\\frac{\\pi}{2},\\frac{\\pi}{2})", cot: "(0,\\pi)", sec: "[0,\\pi]-\\{\\frac{\\pi}{2}\\}", csc: "[-\\frac{\\pi}{2},\\frac{\\pi}{2}]-\\{0\\}" }[fn];
  pvCards.push(pv("Principal values", `Principal values of $${NAME[fn]}x$ for $x=$ ${args(pos)}`, `${table(pos)}\n\nRange: $${range}$`));
  pvCards.push(pv("Principal values", `Principal values of $${NAME[fn]}x$ for $x=$ ${args(neg)}`, `${table(neg)}\n\nRange: $${range}$`));
}
pvCards.push(
  pv("Tricky values", t`Find $\cos^{-1}\left(-\frac{1}{2}\right)$ and say which rule you used.`, t`$\frac{2\pi}{3}$, using $\cos^{-1}(-x)=\pi-\cos^{-1}x$.`),
  pv("Tricky values", t`Find $\sec^{-1}(-2)$.`, t`$\pi-\sec^{-1}2=\pi-\frac{\pi}{3}=\frac{2\pi}{3}$.`),
  pv("Tricky values", t`Find $\text{cosec}^{-1}\left(-\sqrt{2}\right)$.`, t`$-\text{cosec}^{-1}\sqrt{2}=-\frac{\pi}{4}$ (cosec⁻¹ is odd).`),
  pv("Tricky values", t`Find $\cot^{-1}(-1)$.`, t`$\pi-\cot^{-1}1=\pi-\frac{\pi}{4}=\frac{3\pi}{4}$.`),
  pv("Tricky values", t`Find $\sin^{-1}\left(\sin\frac{2\pi}{3}\right)$.`, t`$\frac{\pi}{3}$. Since $\frac{2\pi}{3}\notin\left[-\frac{\pi}{2},\frac{\pi}{2}\right]$, first use $\sin\frac{2\pi}{3}=\sin\frac{\pi}{3}$.`),
  pv("Tricky values", t`Find $\cos^{-1}\left(\cos\frac{7\pi}{6}\right)$.`, t`$\frac{5\pi}{6}$. Since $\cos\frac{7\pi}{6}=\cos\frac{5\pi}{6}$ and $\frac{5\pi}{6}\in[0,\pi]$.`),
);

// ---------------------------------------------------------------- formulas
const it = mk("itf", "IF");
const vc = mk("vectors", "VF");
const g3 = mk("geometry3d", "GF");
const mm = mk("maxmin", "MF");
const ig = mk("integrals", "NF");

export const MATH_CARDS: MathCard[] = [
  ...pvCards,

  // ---- inverse trigonometric functions
  it("Domain and range", t`Domain and principal range of $\sin^{-1}x$`, t`Domain $[-1,1]$; range $\left[-\frac{\pi}{2},\frac{\pi}{2}\right]$.`),
  it("Domain and range", t`Domain and principal range of $\cos^{-1}x$`, t`Domain $[-1,1]$; range $[0,\pi]$.`),
  it("Domain and range", t`Domain and principal range of $\tan^{-1}x$`, t`Domain: all real $x$; range $\left(-\frac{\pi}{2},\frac{\pi}{2}\right)$.`),
  it("Domain and range", t`Domain and principal range of $\cot^{-1}x$`, t`Domain: all real $x$; range $(0,\pi)$.`),
  it("Domain and range", t`Domain and principal range of $\sec^{-1}x$`, t`Domain $|x|\ge1$; range $[0,\pi]-\left\{\frac{\pi}{2}\right\}$.`),
  it("Domain and range", t`Domain and principal range of $\text{cosec}^{-1}x$`, t`Domain $|x|\ge1$; range $\left[-\frac{\pi}{2},\frac{\pi}{2}\right]-\{0\}$.`),
  it("Negative arguments", t`$\sin^{-1}(-x)$, $\tan^{-1}(-x)$ and $\text{cosec}^{-1}(-x)$ in terms of positive $x$`, t`$$\sin^{-1}(-x)=-\sin^{-1}x,\quad\tan^{-1}(-x)=-\tan^{-1}x,\quad\text{cosec}^{-1}(-x)=-\text{cosec}^{-1}x$$`),
  it("Negative arguments", t`$\cos^{-1}(-x)$, $\cot^{-1}(-x)$ and $\sec^{-1}(-x)$ in terms of positive $x$`, t`$$\cos^{-1}(-x)=\pi-\cos^{-1}x,\quad\cot^{-1}(-x)=\pi-\cot^{-1}x,\quad\sec^{-1}(-x)=\pi-\sec^{-1}x$$`),
  it("Complementary pairs", t`$\sin^{-1}x+\cos^{-1}x=\ ?$ and when is it valid?`, t`$\frac{\pi}{2}$, for $x\in[-1,1]$.`),
  it("Complementary pairs", t`$\tan^{-1}x+\cot^{-1}x=\ ?$ and when is it valid?`, t`$\frac{\pi}{2}$, for every real $x$.`),
  it("Complementary pairs", t`$\sec^{-1}x+\text{cosec}^{-1}x=\ ?$ and when is it valid?`, t`$\frac{\pi}{2}$, for $|x|\ge1$.`),
  it("Reciprocal forms", t`Write $\sin^{-1}\frac{1}{x}$, $\cos^{-1}\frac{1}{x}$ and $\tan^{-1}\frac{1}{x}\ (x>0)$ using the other inverse functions`, t`$$\sin^{-1}\frac{1}{x}=\text{cosec}^{-1}x,\quad\cos^{-1}\frac{1}{x}=\sec^{-1}x,\quad\tan^{-1}\frac{1}{x}=\cot^{-1}x$$`),
  it("Composition", t`When is $\sin^{-1}(\sin x)=x$? Same for $\cos^{-1}(\cos x)$ and $\tan^{-1}(\tan x)$.`, t`$\sin^{-1}(\sin x)=x$ for $x\in\left[-\frac{\pi}{2},\frac{\pi}{2}\right]$\n$\cos^{-1}(\cos x)=x$ for $x\in[0,\pi]$\n$\tan^{-1}(\tan x)=x$ for $x\in\left(-\frac{\pi}{2},\frac{\pi}{2}\right)$`),
  it("Composition", t`When is $\sin(\sin^{-1}x)=x$?`, t`For $x\in[-1,1]$ (the domain of $\sin^{-1}$).`),
  it("Sum of tan⁻¹", t`$\tan^{-1}x+\tan^{-1}y$ and its condition`, t`$$\tan^{-1}x+\tan^{-1}y=\tan^{-1}\frac{x+y}{1-xy},\quad xy<1$$`),
  it("Sum of tan⁻¹", t`$\tan^{-1}x+\tan^{-1}y$ when $x,y>0$ and $xy>1$`, t`$$\tan^{-1}x+\tan^{-1}y=\pi+\tan^{-1}\frac{x+y}{1-xy}$$`),
  it("Difference of tan⁻¹", t`$\tan^{-1}x-\tan^{-1}y$ and its condition`, t`$$\tan^{-1}x-\tan^{-1}y=\tan^{-1}\frac{x-y}{1+xy},\quad xy>-1$$`),
  it("Double angle", t`Three forms of $2\tan^{-1}x$ with their conditions`, t`$$2\tan^{-1}x=\tan^{-1}\frac{2x}{1-x^2}\ (|x|<1)$$$$2\tan^{-1}x=\sin^{-1}\frac{2x}{1+x^2}\ (|x|\le1)$$$$2\tan^{-1}x=\cos^{-1}\frac{1-x^2}{1+x^2}\ (x\ge0)$$`),
  it("Double angle", t`$2\sin^{-1}x$ as a single $\sin^{-1}$, with its condition`, t`$$2\sin^{-1}x=\sin^{-1}\left(2x\sqrt{1-x^2}\right),\quad-\frac{1}{\sqrt2}\le x\le\frac{1}{\sqrt2}$$`),
  it("Double angle", t`$2\cos^{-1}x$ as a single $\cos^{-1}$, with its condition`, t`$$2\cos^{-1}x=\cos^{-1}\left(2x^2-1\right),\quad0\le x\le1$$`),
  it("Common mistake", t`Is $\sin^{-1}x$ the same as $\frac{1}{\sin x}$?`, t`No. $\sin^{-1}x$ is the inverse function (an angle). $\frac{1}{\sin x}=\text{cosec}\,x$.`),

  // ---- vector algebra
  vc("Magnitude", t`Magnitude of $\vec{a}=x\hat{i}+y\hat{j}+z\hat{k}$`, t`$$|\vec{a}|=\sqrt{x^2+y^2+z^2}$$`),
  vc("Unit vector", t`Unit vector in the direction of $\vec{a}$`, t`$$\hat{a}=\frac{\vec{a}}{|\vec{a}|}$$`),
  vc("Direction cosines", t`Direction cosines of $\vec{a}=x\hat{i}+y\hat{j}+z\hat{k}$ and the identity they satisfy`, t`$$l=\frac{x}{|\vec{a}|},\ m=\frac{y}{|\vec{a}|},\ n=\frac{z}{|\vec{a}|},\qquad l^2+m^2+n^2=1$$`),
  vc("Position vectors", t`$\overrightarrow{AB}$ in terms of position vectors of $A$ and $B$`, t`$\overrightarrow{AB}=\overrightarrow{OB}-\overrightarrow{OA}$ (head minus tail).`),
  vc("Types of vectors", t`Condition for two vectors to be collinear (parallel)`, t`$\vec{a}=\lambda\vec{b}$ for some scalar $\lambda$, equivalently $\vec{a}\times\vec{b}=\vec{0}$.`),
  vc("Section formula", t`Position vector of the point dividing $P(\vec{a})$ and $Q(\vec{b})$ internally in the ratio $m:n$`, t`$$\frac{m\vec{b}+n\vec{a}}{m+n}$$`),
  vc("Section formula", t`Position vector of the point dividing $P(\vec{a})$ and $Q(\vec{b})$ externally in the ratio $m:n$`, t`$$\frac{m\vec{b}-n\vec{a}}{m-n}$$`),
  vc("Section formula", t`Mid-point of $P(\vec{a})$ and $Q(\vec{b})$`, t`$$\frac{\vec{a}+\vec{b}}{2}$$`),
  vc("Dot product", t`Two forms of $\vec{a}\cdot\vec{b}$`, t`$$\vec{a}\cdot\vec{b}=|\vec{a}||\vec{b}|\cos\theta=a_1b_1+a_2b_2+a_3b_3$$`),
  vc("Dot product", t`Angle between two vectors`, t`$$\cos\theta=\frac{\vec{a}\cdot\vec{b}}{|\vec{a}||\vec{b}|}$$`),
  vc("Dot product", t`Condition for $\vec{a}\perp\vec{b}$ (non-zero vectors)`, t`$\vec{a}\cdot\vec{b}=0$`),
  vc("Dot product", t`Values of $\hat{i}\cdot\hat{i}$, $\hat{i}\cdot\hat{j}$ and $\hat{j}\cdot\hat{k}$`, t`$\hat{i}\cdot\hat{i}=1$ (likewise $\hat{j}\cdot\hat{j}=\hat{k}\cdot\hat{k}=1$); $\hat{i}\cdot\hat{j}=\hat{j}\cdot\hat{k}=\hat{k}\cdot\hat{i}=0$.`),
  vc("Projection", t`Scalar projection and vector projection of $\vec{a}$ on $\vec{b}$`, t`$$\frac{\vec{a}\cdot\vec{b}}{|\vec{b}|}\qquad\text{and}\qquad\frac{\vec{a}\cdot\vec{b}}{|\vec{b}|^2}\,\vec{b}$$`),
  vc("Expansion", t`Expand $|\vec{a}+\vec{b}|^2$`, t`$$|\vec{a}|^2+2\,\vec{a}\cdot\vec{b}+|\vec{b}|^2$$`),
  vc("Cross product", t`Definition of $\vec{a}\times\vec{b}$ (magnitude and direction)`, t`$\vec{a}\times\vec{b}=|\vec{a}||\vec{b}|\sin\theta\,\hat{n}$, where $\hat{n}$ is the unit vector perpendicular to both (right-hand rule).`),
  vc("Cross product", t`$\vec{a}\times\vec{b}$ in components`, t`$$(a_2b_3-a_3b_2)\hat{i}-(a_1b_3-a_3b_1)\hat{j}+(a_1b_2-a_2b_1)\hat{k}$$ The $\hat{j}$ term has a minus sign.`),
  vc("Cross product", t`Values of $\hat{i}\times\hat{j}$, $\hat{j}\times\hat{k}$, $\hat{k}\times\hat{i}$ and $\hat{i}\times\hat{i}$`, t`$\hat{i}\times\hat{j}=\hat{k}$, $\hat{j}\times\hat{k}=\hat{i}$, $\hat{k}\times\hat{i}=\hat{j}$, and $\hat{i}\times\hat{i}=\vec{0}$.`),
  vc("Cross product", t`Is $\vec{a}\times\vec{b}$ commutative?`, t`No. $\vec{a}\times\vec{b}=-\left(\vec{b}\times\vec{a}\right)$.`),
  vc("Cross product", t`Condition for $\vec{a}\parallel\vec{b}$ using the cross product`, t`$\vec{a}\times\vec{b}=\vec{0}$.`),
  vc("Area", t`Area of a triangle with sides $\overrightarrow{AB}$ and $\overrightarrow{AC}$`, t`$$\frac12\left|\overrightarrow{AB}\times\overrightarrow{AC}\right|$$`),
  vc("Area", t`Area of a parallelogram with adjacent sides $\vec{a},\vec{b}$; and with diagonals $\vec{d_1},\vec{d_2}$`, t`$$|\vec{a}\times\vec{b}|\qquad\text{and}\qquad\frac12|\vec{d_1}\times\vec{d_2}|$$`),
  vc("Perpendicular vector", t`Unit vector perpendicular to both $\vec{a}$ and $\vec{b}$`, t`$$\pm\frac{\vec{a}\times\vec{b}}{|\vec{a}\times\vec{b}|}$$`),
  vc("Identity", t`Relation between $|\vec{a}\times\vec{b}|^2$, $(\vec{a}\cdot\vec{b})^2$ and the magnitudes`, t`$$|\vec{a}\times\vec{b}|^2+(\vec{a}\cdot\vec{b})^2=|\vec{a}|^2|\vec{b}|^2$$`),
  vc("Triangle law", t`Triangle law of vector addition`, t`$\overrightarrow{AB}+\overrightarrow{BC}=\overrightarrow{AC}$`),

  // ---- three-dimensional geometry
  g3("Direction cosines", t`Direction cosines of a line and the identity they satisfy`, t`$l=\cos\alpha,\ m=\cos\beta,\ n=\cos\gamma$ and $l^2+m^2+n^2=1$.`),
  g3("Direction cosines", t`Direction cosines of the $x$-, $y$- and $z$-axes`, t`$x$-axis: $(1,0,0)$\n$y$-axis: $(0,1,0)$\n$z$-axis: $(0,0,1)$`),
  g3("Direction ratios", t`Convert direction ratios $a,b,c$ to direction cosines`, t`$$l=\frac{a}{\sqrt{a^2+b^2+c^2}},\ m=\frac{b}{\sqrt{a^2+b^2+c^2}},\ n=\frac{c}{\sqrt{a^2+b^2+c^2}}$$`),
  g3("Direction ratios", t`Direction ratios of the line through $P(x_1,y_1,z_1)$ and $Q(x_2,y_2,z_2)$`, t`$x_2-x_1,\ \ y_2-y_1,\ \ z_2-z_1$`),
  g3("Direction cosines", t`Direction cosines of the line through $P$ and $Q$`, t`$$\frac{x_2-x_1}{PQ},\ \frac{y_2-y_1}{PQ},\ \frac{z_2-z_1}{PQ},\qquad PQ=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2+(z_2-z_1)^2}$$`),
  g3("Equation of a line", t`Vector equation of a line through $\vec{a}$ parallel to $\vec{b}$`, t`$$\vec{r}=\vec{a}+\lambda\vec{b}$$`),
  g3("Equation of a line", t`Cartesian equation of the line through $(x_1,y_1,z_1)$ with direction ratios $a,b,c$`, t`$$\frac{x-x_1}{a}=\frac{y-y_1}{b}=\frac{z-z_1}{c}$$`),
  g3("Equation of a line", t`Equation of the line through two points $(x_1,y_1,z_1)$ and $(x_2,y_2,z_2)$`, t`$$\frac{x-x_1}{x_2-x_1}=\frac{y-y_1}{y_2-y_1}=\frac{z-z_1}{z_2-z_1}$$`),
  g3("Equation of a line", t`Vector equation of the line through the points with position vectors $\vec{a}$ and $\vec{b}$`, t`$$\vec{r}=\vec{a}+\lambda(\vec{b}-\vec{a})$$`),
  g3("Angle between lines", t`Angle between lines with direction ratios $a_1,b_1,c_1$ and $a_2,b_2,c_2$`, t`$$\cos\theta=\frac{|a_1a_2+b_1b_2+c_1c_2|}{\sqrt{a_1^2+b_1^2+c_1^2}\ \sqrt{a_2^2+b_2^2+c_2^2}}$$`),
  g3("Angle between lines", t`Angle between $\vec{r}=\vec{a_1}+\lambda\vec{b_1}$ and $\vec{r}=\vec{a_2}+\mu\vec{b_2}$`, t`$$\cos\theta=\frac{|\vec{b_1}\cdot\vec{b_2}|}{|\vec{b_1}||\vec{b_2}|}$$`),
  g3("Conditions", t`Conditions for two lines to be perpendicular, and to be parallel`, t`Perpendicular: $a_1a_2+b_1b_2+c_1c_2=0$.\nParallel: $\frac{a_1}{a_2}=\frac{b_1}{b_2}=\frac{c_1}{c_2}$.`),
  g3("Skew lines", t`What are skew lines?`, t`Lines in space that are neither parallel nor intersecting.`),
  g3("Shortest distance", t`Shortest distance between skew lines $\vec{r}=\vec{a_1}+\lambda\vec{b_1}$ and $\vec{r}=\vec{a_2}+\mu\vec{b_2}$`, t`$$d=\frac{\left|(\vec{a_2}-\vec{a_1})\cdot(\vec{b_1}\times\vec{b_2})\right|}{|\vec{b_1}\times\vec{b_2}|}$$`),
  g3("Shortest distance", t`Distance between parallel lines $\vec{r}=\vec{a_1}+\lambda\vec{b}$ and $\vec{r}=\vec{a_2}+\mu\vec{b}$`, t`$$d=\frac{\left|\vec{b}\times(\vec{a_2}-\vec{a_1})\right|}{|\vec{b}|}$$`),
  g3("Common mistake", t`Before reading direction ratios from $\frac{2x-3}{4}=\frac{y+1}{3}=\frac{z}{5}$, what must you do?`, t`Make the coefficient of $x$, $y$, $z$ equal to $1$: $\frac{x-\frac32}{2}=\frac{y+1}{3}=\frac{z}{5}$, so the ratios are $2,3,5$.`),

  // ---- maxima and minima
  mm("Critical points", t`What is a critical point of $f$?`, t`A point $c$ in the domain where $f'(c)=0$ or $f'(c)$ does not exist.`),
  mm("Monotonicity", t`When is $f$ increasing and when decreasing on an interval?`, t`Increasing where $f'(x)>0$; decreasing where $f'(x)<0$.`),
  mm("First derivative test", t`First derivative test: what does each sign change of $f'$ at $c$ mean?`, t`$f'$ changes $+$ to $-$: local **maximum**.\n$f'$ changes $-$ to $+$: local **minimum**.\n$f'$ does not change sign: neither.`),
  mm("Second derivative test", t`Second derivative test at a point where $f'(c)=0$`, t`$f''(c)<0$: local maximum.\n$f''(c)>0$: local minimum.\n$f''(c)=0$: test fails (use the first derivative test).`),
  mm("Absolute extrema", t`Procedure for the absolute maximum and minimum of $f$ on $[a,b]$`, t`Find the critical points in $(a,b)$, then compare $f(a)$, $f(b)$ and $f(c)$ for every such $c$. The largest is the absolute maximum, the smallest the absolute minimum.`),
  mm("Word problems", t`Steps for an optimisation word problem`, t`1. Define variables and write the quantity to optimise.\n2. Use the constraint to get **one** variable (and its domain).\n3. Differentiate and solve $f'=0$.\n4. Verify max or min (second derivative or sign change).\n5. Check the domain, then answer the question asked, with units.`),
  mm("Useful results", t`Where does $ax^2+bx+c$ have its extreme value, and is it a maximum or minimum?`, t`At $x=-\frac{b}{2a}$. Minimum if $a>0$, maximum if $a<0$.`),
  mm("Useful results", t`Two positive numbers with a fixed sum $s$: when is their product maximum?`, t`When they are equal, $x=y=\frac{s}{2}$; the maximum product is $\frac{s^2}{4}$.`),
  mm("Useful results", t`Rectangles of fixed perimeter: which has the maximum area?`, t`The square.`),
  mm("Common mistake", t`$f(x)=x^3$ has $f'(0)=0$. Is $x=0$ a maximum or minimum?`, t`Neither. $f''(0)=0$ so the second derivative test fails, and $f'(x)=3x^2$ does not change sign.`),

  // ---- integrals (up to Exercise 7.4)
  ig("Basic integrals", t`$\int x^n\,dx$ and $\int\frac{dx}{x}$`, t`$$\int x^n\,dx=\frac{x^{n+1}}{n+1}+C\ (n\ne-1),\qquad\int\frac{dx}{x}=\ln|x|+C$$`),
  ig("Basic integrals", t`$\int e^x\,dx$ and $\int a^x\,dx$`, t`$$\int e^x\,dx=e^x+C,\qquad\int a^x\,dx=\frac{a^x}{\ln a}+C$$`),
  ig("Basic integrals", t`$\int\sin x\,dx$ and $\int\cos x\,dx$`, t`$$\int\sin x\,dx=-\cos x+C,\qquad\int\cos x\,dx=\sin x+C$$`),
  ig("Basic integrals", t`$\int\sec^2x\,dx$ and $\int\text{cosec}^2x\,dx$`, t`$$\int\sec^2x\,dx=\tan x+C,\qquad\int\text{cosec}^2x\,dx=-\cot x+C$$`),
  ig("Basic integrals", t`$\int\sec x\tan x\,dx$ and $\int\text{cosec}\,x\cot x\,dx$`, t`$$\int\sec x\tan x\,dx=\sec x+C,\qquad\int\text{cosec}\,x\cot x\,dx=-\text{cosec}\,x+C$$`),
  ig("Inverse trigonometric", t`$\int\frac{dx}{\sqrt{1-x^2}}$, $\int\frac{dx}{1+x^2}$ and $\int\frac{dx}{x\sqrt{x^2-1}}$`, t`$$\sin^{-1}x+C,\qquad\tan^{-1}x+C,\qquad\sec^{-1}x+C$$`),
  ig("Linear argument", t`$\int f(ax+b)\,dx$ in terms of an antiderivative $F$ of $f$`, t`$$\frac{1}{a}F(ax+b)+C$$`),
  ig("Standard results", t`$\int\tan x\,dx$ and $\int\cot x\,dx$`, t`$$\int\tan x\,dx=\ln|\sec x|+C=-\ln|\cos x|+C$$$$\int\cot x\,dx=\ln|\sin x|+C$$`),
  ig("Standard results", t`$\int\sec x\,dx$ and $\int\text{cosec}\,x\,dx$`, t`$$\int\sec x\,dx=\ln|\sec x+\tan x|+C$$$$\int\text{cosec}\,x\,dx=\ln|\text{cosec}\,x-\cot x|+C$$`),
  ig("Substitution", t`$\int\frac{f'(x)}{f(x)}\,dx$`, t`$$\ln|f(x)|+C$$ (put $t=f(x)$).`),
  ig("Substitution", t`How do you recognise a substitution $t=g(x)$?`, t`The integrand contains $g'(x)\,dx$ (up to a constant) next to a function of $g(x)$. Then $\int f(g(x))g'(x)\,dx=\int f(t)\,dt$.`),
  ig("Trigonometric identities", t`Power-reducing identities for $\sin^2x$ and $\cos^2x$`, t`$$\sin^2x=\frac{1-\cos2x}{2},\qquad\cos^2x=\frac{1+\cos2x}{2}$$`),
  ig("Trigonometric identities", t`Product-to-sum for $\sin A\cos B$, $\cos A\cos B$, $\sin A\sin B$`, t`$$\sin A\cos B=\frac{1}{2}[\sin(A+B)+\sin(A-B)]$$$$\cos A\cos B=\frac{1}{2}[\cos(A+B)+\cos(A-B)]$$$$\sin A\sin B=\frac{1}{2}[\cos(A-B)-\cos(A+B)]$$`),
  ig("Exercise 7.4 forms", t`$\int\frac{dx}{x^2+a^2}$`, t`$$\frac{1}{a}\tan^{-1}\frac{x}{a}+C$$`),
  ig("Exercise 7.4 forms", t`$\int\frac{dx}{x^2-a^2}$`, t`$$\frac{1}{2a}\ln\left|\frac{x-a}{x+a}\right|+C$$`),
  ig("Exercise 7.4 forms", t`$\int\frac{dx}{a^2-x^2}$`, t`$$\frac{1}{2a}\ln\left|\frac{a+x}{a-x}\right|+C$$`),
  ig("Exercise 7.4 forms", t`$\int\frac{dx}{\sqrt{a^2-x^2}}$`, t`$$\sin^{-1}\frac{x}{a}+C$$`),
  ig("Exercise 7.4 forms", t`$\int\frac{dx}{\sqrt{x^2-a^2}}$`, t`$$\ln\left|x+\sqrt{x^2-a^2}\right|+C$$`),
  ig("Exercise 7.4 forms", t`$\int\frac{dx}{\sqrt{x^2+a^2}}$`, t`$$\ln\left|x+\sqrt{x^2+a^2}\right|+C$$`),
  ig("Exercise 7.4 method", t`How do you integrate $\frac{1}{ax^2+bx+c}$ or $\frac{1}{\sqrt{ax^2+bx+c}}$?`, t`Complete the square to reach $x^2\pm a^2$ or $a^2-x^2$ form, then use the matching standard integral.`),
  ig("Exercise 7.4 method", t`How do you integrate $\frac{px+q}{ax^2+bx+c}$ or $\frac{px+q}{\sqrt{ax^2+bx+c}}$?`, t`Write $px+q=A\,\frac{d}{dx}(ax^2+bx+c)+B$. The $A$ part gives $\ln|\cdot|$ (or a square root); the $B$ part is done by completing the square.`),
  ig("Common mistake", t`Two things students forget in indefinite integrals`, t`The constant $+C$, and the factor $\frac{1}{a}$ when the argument is $ax+b$.`),
];

export const MATH_CARD_BY_ID: Record<string, MathCard> = Object.fromEntries(MATH_CARDS.map((c) => [c.id, c]));
