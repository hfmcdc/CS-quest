import type { AnswerSpec, Level, MathQuestion, MathTopicId, QKind, Trap } from "./types";

const t = String.raw;
const PI = Math.PI;

type Extra = { challenge?: boolean; input?: string; mistake?: string; traps?: Trap[] };

const mk =
  (topic: MathTopicId) =>
  (id: string, tag: string, kind: QKind, level: Level, text: string, spec: AnswerSpec, answer: string, steps: string[], hint: string, x: Extra = {}): MathQuestion => ({
    id, topic, tag, kind, level, text, spec, answer, steps, hint, ...x,
  });

export const mcq = (options: string[], correct: number): AnswerSpec => ({ kind: "mcq", options, correct });
export const num = (value: number, tol?: number): AnswerSpec => ({ kind: "numeric", value, tol });
export const expr = (model: string, domain: [number, number]): AnswerSpec => ({ kind: "expr", model, domain });
export const anti = (model: string, domain: [number, number]): AnswerSpec => ({ kind: "antiderivative", model, domain });
export const vec = (value: [number, number, number]): AnswerSpec => ({ kind: "vector", value });
export const tup = (value: number[], proportional = false): AnswerSpec => ({ kind: "tuple", value, proportional });
export const manual = (): AnswerSpec => ({ kind: "manual" });

export const HELP = {
  num: "Type a number or exact value, e.g. 2pi/3, sqrt(3)/2, 5/2 or 0.866.",
  vec: "Type as 2i - 3j + 6k, or as (2, -3, 6). Fractions such as 2/7 are fine.",
  tup: "Type numbers separated by commas, e.g. 3, -2, 8.",
  expr: "Type an expression in x, e.g. x/2 or 3sin(x). Use pi, sqrt(), ^ for powers.",
  anti: "Type the antiderivative, e.g. x^3/3 + 2sin(x). Use ln|x|, e^x, tan^-1(x), sqrt(). + C is optional.",
  manual: "Write your answer on paper or type it here, then compare it with the model answer.",
} as const;

const itf = mk("itf");
const vc = mk("vectors");
const g3 = mk("geometry3d");
const mm = mk("maxmin");
const ig = mk("integrals");

export const QUESTIONS: MathQuestion[] = [
  // =====================================================================
  // INVERSE TRIGONOMETRIC FUNCTIONS
  // =====================================================================
  itf("ITF-1", "Principal values", "direct", 1,
    t`Find the principal value of $\sin^{-1}\left(-\frac{1}{2}\right)$.`,
    num(-PI / 6), t`$-\frac{\pi}{6}$`,
    [
      t`Use $\sin^{-1}(-x)=-\sin^{-1}x$, so the value is $-\sin^{-1}\frac12$.`,
      t`$\sin\frac{\pi}{6}=\frac12$ and $\frac{\pi}{6}\in\left[-\frac{\pi}{2},\frac{\pi}{2}\right]$, so $\sin^{-1}\frac12=\frac{\pi}{6}$.`,
      t`Hence the principal value is $-\frac{\pi}{6}$.`,
    ],
    t`Take the minus sign outside first, then find the angle in $\left[-\frac{\pi}{2},\frac{\pi}{2}\right]$ whose sine is $\frac12$.`,
    { input: HELP.num, traps: [{ value: PI / 6, msg: t`The sign is lost: $\sin^{-1}$ is an odd function, so $\sin^{-1}(-x)=-\sin^{-1}x$ and the answer is negative.` }] }),

  itf("ITF-2", "Domain and range", "direct", 1,
    t`Which interval is the principal value branch (range) of $\cos^{-1}x$?`,
    mcq([t`$[0,\pi]$`, t`$\left[-\frac{\pi}{2},\frac{\pi}{2}\right]$`, t`$(0,\pi)$`, t`$[0,2\pi]$`], 0),
    t`$[0,\pi]$`,
    [
      t`The principal branch of $\cos^{-1}$ is the interval $[0,\pi]$, on which cosine decreases from $1$ to $-1$.`,
      t`$\left[-\frac{\pi}{2},\frac{\pi}{2}\right]$ is the branch for $\sin^{-1}$, and the open interval $(0,\pi)$ is the range of $\cot^{-1}$.`,
    ],
    t`As the angle goes from $0$ to $\pi$, cosine takes every value from $1$ down to $-1$ exactly once.`),

  itf("ITF-3", "Principal values", "direct", 1,
    t`Find $\cos^{-1}\left(-\frac{1}{2}\right)$.`,
    num((2 * PI) / 3), t`$\frac{2\pi}{3}$`,
    [
      t`Use $\cos^{-1}(-x)=\pi-\cos^{-1}x$, so the value is $\pi-\cos^{-1}\frac12$.`,
      t`$\cos^{-1}\frac12=\frac{\pi}{3}$ since $\cos\frac{\pi}{3}=\frac12$ and $\frac{\pi}{3}\in[0,\pi]$.`,
      t`So the value is $\pi-\frac{\pi}{3}=\frac{2\pi}{3}$, which lies in $[0,\pi]$.`,
    ],
    t`For $\cos^{-1}$, a negative argument gives $\pi$ minus the positive case, not the negative of it.`,
    { input: HELP.num, traps: [{ value: -PI / 3, msg: t`$\cos^{-1}$ takes values in $[0,\pi]$, so the answer cannot be negative. The rule is $\cos^{-1}(-x)=\pi-\cos^{-1}x$.` }] }),

  itf("ITF-4", "sin⁻¹(sin x)", "short", 2,
    t`Find $\sin^{-1}\left(\sin\frac{2\pi}{3}\right)$.`,
    num(PI / 3), t`$\frac{\pi}{3}$`,
    [
      t`$\frac{2\pi}{3}$ is not in the principal branch $\left[-\frac{\pi}{2},\frac{\pi}{2}\right]$, so $\sin^{-1}(\sin x)=x$ cannot be used directly.`,
      t`Rewrite: $\sin\frac{2\pi}{3}=\sin\left(\pi-\frac{2\pi}{3}\right)=\sin\frac{\pi}{3}$.`,
      t`Now $\frac{\pi}{3}$ is in the range, so $\sin^{-1}\left(\sin\frac{\pi}{3}\right)=\frac{\pi}{3}$.`,
    ],
    t`Is $\frac{2\pi}{3}$ inside $\left[-\frac{\pi}{2},\frac{\pi}{2}\right]$? If not, use $\sin(\pi-\theta)=\sin\theta$ first.`,
    { input: HELP.num, traps: [{ value: (2 * PI) / 3, msg: t`$\sin^{-1}(\sin x)=x$ only when $x\in\left[-\frac{\pi}{2},\frac{\pi}{2}\right]$, and $\frac{2\pi}{3}$ is outside that range.` }] }),

  itf("ITF-5", "Sum of tan⁻¹", "steps", 2,
    t`Evaluate $\tan^{-1}\frac12+\tan^{-1}\frac13$.`,
    num(PI / 4), t`$\frac{\pi}{4}$`,
    [
      t`Check the condition: $xy=\frac12\cdot\frac13=\frac16<1$, so $\tan^{-1}x+\tan^{-1}y=\tan^{-1}\frac{x+y}{1-xy}$ applies.`,
      t`$\frac{\frac12+\frac13}{1-\frac16}=\frac{\frac56}{\frac56}=1$.`,
      t`So the sum is $\tan^{-1}1=\frac{\pi}{4}$.`,
    ],
    t`Use $\tan^{-1}x+\tan^{-1}y=\tan^{-1}\frac{x+y}{1-xy}$ once you have checked $xy<1$.`,
    { input: HELP.num }),

  itf("ITF-6", "Exercise 2.2 style", "short", 2,
    t`Find the value of $\tan^{-1}\sqrt{3}-\sec^{-1}(-2)$.`,
    num(-PI / 3), t`$-\frac{\pi}{3}$`,
    [
      t`$\tan^{-1}\sqrt3=\frac{\pi}{3}$, because $\tan\frac{\pi}{3}=\sqrt3$ and $\frac{\pi}{3}$ is in the principal branch.`,
      t`$\sec^{-1}(-2)=\pi-\sec^{-1}2=\pi-\frac{\pi}{3}=\frac{2\pi}{3}$.`,
      t`Therefore the value is $\frac{\pi}{3}-\frac{2\pi}{3}=-\frac{\pi}{3}$.`,
    ],
    t`Use $\sec^{-1}(-x)=\pi-\sec^{-1}x$ and remember $\sec\frac{\pi}{3}=2$.`,
    { input: HELP.num }),

  itf("ITF-7", "Domain and range", "short", 2,
    t`What is the domain of $\sin^{-1}(2x-1)$?`,
    mcq([t`$[0,1]$`, t`$[-1,1]$`, t`$[-1,0]$`, t`$\left[0,\frac12\right]$`], 0),
    t`$[0,1]$`,
    [
      t`$\sin^{-1}u$ is defined only for $-1\le u\le1$.`,
      t`So we need $-1\le2x-1\le1$.`,
      t`Add $1$: $0\le2x\le2$. Divide by $2$: $0\le x\le1$.`,
    ],
    t`Set $-1\le 2x-1\le 1$ and solve for $x$.`),

  itf("ITF-8", "Evaluation", "short", 2,
    t`Find $\sin\left(\tan^{-1}\frac34\right)$.`,
    num(0.6), t`$\frac35$`,
    [
      t`Let $\theta=\tan^{-1}\frac34$, so $\tan\theta=\frac34$ with $\theta\in\left(0,\frac{\pi}{2}\right)$.`,
      t`Draw a right triangle: opposite $=3$, adjacent $=4$, hypotenuse $=\sqrt{9+16}=5$.`,
      t`Then $\sin\theta=\frac{\text{opposite}}{\text{hypotenuse}}=\frac35$.`,
    ],
    t`Let $\theta=\tan^{-1}\frac34$ and draw a right triangle with sides $3$ and $4$.`,
    { input: HELP.num }),

  itf("ITF-9", "Exam style", "exam", 3,
    t`Evaluate $\sin\left(2\sin^{-1}\frac35\right)$.`,
    num(24 / 25), t`$\frac{24}{25}$`,
    [
      t`Let $\theta=\sin^{-1}\frac35$, so $\sin\theta=\frac35$ and $\theta\in\left[-\frac{\pi}{2},\frac{\pi}{2}\right]$; since the sine is positive, $\cos\theta\ge0$.`,
      t`$\cos\theta=\sqrt{1-\frac{9}{25}}=\frac45$.`,
      t`$\sin2\theta=2\sin\theta\cos\theta=2\cdot\frac35\cdot\frac45=\frac{24}{25}$.`,
    ],
    t`Put $\theta=\sin^{-1}\frac35$, find $\cos\theta$, then use $\sin2\theta=2\sin\theta\cos\theta$.`,
    { input: HELP.num }),

  itf("ITF-10", "Simplification", "exam", 3,
    t`Write $\tan^{-1}\sqrt{\dfrac{1-\cos x}{1+\cos x}}$, where $0<x<\pi$, in simplest form.`,
    expr("x/2", [0.3, 3.0]), t`$\frac{x}{2}$`,
    [
      t`Use $1-\cos x=2\sin^2\frac{x}{2}$ and $1+\cos x=2\cos^2\frac{x}{2}$.`,
      t`$\sqrt{\frac{1-\cos x}{1+\cos x}}=\sqrt{\tan^2\frac{x}{2}}=\left|\tan\frac{x}{2}\right|=\tan\frac{x}{2}$, because $0<\frac{x}{2}<\frac{\pi}{2}$.`,
      t`So the expression is $\tan^{-1}\left(\tan\frac{x}{2}\right)=\frac{x}{2}$, as $\frac{x}{2}\in\left(-\frac{\pi}{2},\frac{\pi}{2}\right)$.`,
    ],
    t`Write $1-\cos x$ and $1+\cos x$ using half-angle identities.`,
    { input: HELP.expr }),

  itf("ITF-C1", "Miscellaneous style", "exam", 3,
    t`Evaluate $2\tan^{-1}\frac13+\tan^{-1}\frac17$.`,
    num(PI / 4), t`$\frac{\pi}{4}$`,
    [
      t`Since $\left|\frac13\right|<1$: $2\tan^{-1}\frac13=\tan^{-1}\frac{2\cdot\frac13}{1-\frac19}=\tan^{-1}\frac34$.`,
      t`Now add $\tan^{-1}\frac34+\tan^{-1}\frac17$. The product $\frac34\cdot\frac17=\frac{3}{28}<1$, so the sum formula applies.`,
      t`$\frac{\frac34+\frac17}{1-\frac{3}{28}}=\frac{\frac{25}{28}}{\frac{25}{28}}=1$.`,
      t`Therefore the value is $\tan^{-1}1=\frac{\pi}{4}$.`,
    ],
    t`First convert $2\tan^{-1}\frac13$ to a single $\tan^{-1}$, then use the sum formula.`,
    { challenge: true, input: HELP.num }),

  itf("ITF-C2", "Miscellaneous style", "exam", 3,
    t`Solve for $x$: $\tan^{-1}2x+\tan^{-1}3x=\dfrac{\pi}{4}$.`,
    num(1 / 6), t`$x=\frac16$`,
    [
      t`Take the tangent of both sides using $\tan^{-1}a+\tan^{-1}b=\tan^{-1}\frac{a+b}{1-ab}$: $\frac{5x}{1-6x^2}=\tan\frac{\pi}{4}=1$.`,
      t`$5x=1-6x^2\Rightarrow6x^2+5x-1=0\Rightarrow(6x-1)(x+1)=0$, so $x=\frac16$ or $x=-1$.`,
      t`Check $x=-1$: the left side is $\tan^{-1}(-2)+\tan^{-1}(-3)$, which is negative, so it cannot equal $\frac{\pi}{4}$. Reject it.`,
      t`Check $x=\frac16$: $\tan^{-1}\frac13+\tan^{-1}\frac12=\frac{\pi}{4}$ ✓ (here $xy=\frac16<1$).`,
    ],
    t`After forming the quadratic, test both roots in the original equation.`,
    { challenge: true, input: HELP.num, traps: [{ value: -1, msg: t`$x=-1$ is an extraneous root: the left side is negative there. Always test roots in the original equation.` }] }),

  itf("ITF-C3", "Miscellaneous style", "exam", 3,
    t`Solve for $x$: $\sin^{-1}(1-x)-2\sin^{-1}x=\dfrac{\pi}{2}$.`,
    num(0), t`$x=0$`,
    [
      t`Rewrite: $\sin^{-1}(1-x)=\frac{\pi}{2}+2\sin^{-1}x$. Let $\theta=\sin^{-1}x$.`,
      t`Take the sine of both sides: $1-x=\sin\left(\frac{\pi}{2}+2\theta\right)=\cos2\theta=1-2\sin^2\theta=1-2x^2$.`,
      t`So $2x^2-x=0$, i.e. $x(2x-1)=0$, giving $x=0$ or $x=\frac12$.`,
      t`Test $x=\frac12$: $\sin^{-1}\frac12-2\sin^{-1}\frac12=-\frac{\pi}{6}\ne\frac{\pi}{2}$. Reject it.`,
      t`Test $x=0$: $\sin^{-1}1-0=\frac{\pi}{2}$ ✓.`,
    ],
    t`Take the sine of both sides, simplify with $\cos 2\theta$, then verify each root.`,
    { challenge: true, input: HELP.num, traps: [{ value: 0.5, msg: t`$x=\frac12$ is extraneous: substituting gives $-\frac{\pi}{6}$, not $\frac{\pi}{2}$.` }] }),

  // =====================================================================
  // VECTOR ALGEBRA
  // =====================================================================
  vc("VEC-1", "Magnitude", "direct", 1,
    t`Find the magnitude of $\vec{a}=2\hat{i}-3\hat{j}+6\hat{k}$.`,
    num(7), t`$7$`,
    [t`$|\vec{a}|=\sqrt{2^2+(-3)^2+6^2}=\sqrt{4+9+36}=\sqrt{49}=7$.`],
    t`Add the squares of the components and take the square root.`, { input: HELP.num }),

  vc("VEC-2", "Unit vector", "direct", 1,
    t`Find the unit vector in the direction of $\vec{a}=2\hat{i}-3\hat{j}+6\hat{k}$.`,
    vec([2 / 7, -3 / 7, 6 / 7]), t`$\frac27\hat{i}-\frac37\hat{j}+\frac67\hat{k}$`,
    [
      t`$|\vec{a}|=\sqrt{4+9+36}=7$.`,
      t`$\hat{a}=\frac{\vec{a}}{|\vec{a}|}=\frac{2\hat{i}-3\hat{j}+6\hat{k}}{7}=\frac27\hat{i}-\frac37\hat{j}+\frac67\hat{k}$.`,
    ],
    t`Divide each component by the magnitude of $\vec{a}$.`,
    { input: HELP.vec, mistake: t`A unit vector must have magnitude $1$. Divide **every** component by $|\vec{a}|=7$.` }),

  vc("VEC-3", "Perpendicular vectors", "direct", 1,
    t`Two non-zero vectors $\vec{a}$ and $\vec{b}$ are perpendicular. Which statement must be true?`,
    mcq([t`$\vec{a}\cdot\vec{b}=0$`, t`$\vec{a}\times\vec{b}=\vec{0}$`, t`$|\vec{a}\cdot\vec{b}|=|\vec{a}||\vec{b}|$`, t`$\vec{a}=\lambda\vec{b}$ for some scalar $\lambda$`], 0),
    t`$\vec{a}\cdot\vec{b}=0$`,
    [
      t`$\vec{a}\cdot\vec{b}=|\vec{a}||\vec{b}|\cos90^\circ=0$.`,
      t`The other three statements describe **parallel** vectors: their cross product is $\vec{0}$, $|\cos\theta|=1$, and one is a scalar multiple of the other.`,
    ],
    t`What is $\cos 90^\circ$?`),

  vc("VEC-4", "Dot product", "short", 2,
    t`Find $\vec{a}\cdot\vec{b}$ if $\vec{a}=2\hat{i}+3\hat{j}+\hat{k}$ and $\vec{b}=\hat{i}-\hat{j}+2\hat{k}$.`,
    num(1), t`$1$`,
    [t`$\vec{a}\cdot\vec{b}=(2)(1)+(3)(-1)+(1)(2)=2-3+2=1$.`],
    t`Multiply matching components and add the three products.`, { input: HELP.num }),

  vc("VEC-5", "Perpendicular vectors", "short", 2,
    t`Find $\lambda$ if $\vec{a}=2\hat{i}+\lambda\hat{j}+\hat{k}$ and $\vec{b}=\hat{i}-2\hat{j}+3\hat{k}$ are perpendicular.`,
    num(2.5), t`$\lambda=\frac52$`,
    [
      t`Perpendicular vectors have $\vec{a}\cdot\vec{b}=0$.`,
      t`$(2)(1)+(\lambda)(-2)+(1)(3)=5-2\lambda=0$.`,
      t`So $\lambda=\frac52$.`,
    ],
    t`Set the dot product equal to zero and solve for $\lambda$.`, { input: HELP.num }),

  vc("VEC-6", "Projection", "steps", 2,
    t`Find the projection of $\vec{a}=2\hat{i}+3\hat{j}+2\hat{k}$ on $\vec{b}=\hat{i}+2\hat{j}+\hat{k}$.`,
    num(10 / Math.sqrt(6)), t`$\frac{10}{\sqrt{6}}$`,
    [
      t`Projection of $\vec{a}$ on $\vec{b}$ is $\frac{\vec{a}\cdot\vec{b}}{|\vec{b}|}$.`,
      t`$\vec{a}\cdot\vec{b}=2+6+2=10$ and $|\vec{b}|=\sqrt{1+4+1}=\sqrt6$.`,
      t`Projection $=\frac{10}{\sqrt6}\approx4.08$.`,
    ],
    t`Divide $\vec{a}\cdot\vec{b}$ by the magnitude of $\vec{b}$ (not of $\vec{a}$).`,
    { input: HELP.num, mistake: t`The projection **on** $\vec{b}$ divides by $|\vec{b}|$, not $|\vec{a}|$.` }),

  vc("VEC-7", "Section formula", "short", 2,
    t`The position vector of the point dividing the join of $P(\vec{a})$ and $Q(\vec{b})$ internally in the ratio $2:1$ is`,
    mcq([t`$\frac{\vec{a}+2\vec{b}}{3}$`, t`$\frac{2\vec{a}+\vec{b}}{3}$`, t`$\frac{2\vec{b}-\vec{a}}{1}$`, t`$\frac{\vec{a}+\vec{b}}{2}$`], 0),
    t`$\frac{\vec{a}+2\vec{b}}{3}$`,
    [
      t`Internal division in ratio $m:n$ gives $\frac{m\vec{b}+n\vec{a}}{m+n}$.`,
      t`With $m=2$, $n=1$: $\frac{2\vec{b}+\vec{a}}{3}$.`,
      t`The point is closer to $Q$, so $\vec{b}$ carries the larger weight $2$.`,
    ],
    t`The weight $m$ multiplies the **far** point $\vec{b}$ in $\frac{m\vec{b}+n\vec{a}}{m+n}$.`),

  vc("VEC-8", "Cross product", "steps", 2,
    t`Find $\vec{a}\times\vec{b}$ if $\vec{a}=2\hat{i}+\hat{j}+3\hat{k}$ and $\vec{b}=3\hat{i}+5\hat{j}-2\hat{k}$.`,
    vec([-17, 13, 7]), t`$-17\hat{i}+13\hat{j}+7\hat{k}$`,
    [
      t`$\hat{i}$ component: $(1)(-2)-(3)(5)=-2-15=-17$.`,
      t`$\hat{j}$ component: $-\big[(2)(-2)-(3)(3)\big]=-(-4-9)=13$.`,
      t`$\hat{k}$ component: $(2)(5)-(1)(3)=10-3=7$.`,
      t`So $\vec{a}\times\vec{b}=-17\hat{i}+13\hat{j}+7\hat{k}$.`,
    ],
    t`Expand the determinant with rows $(\hat{i},\hat{j},\hat{k})$, $(2,1,3)$, $(3,5,-2)$. Remember the minus on the $\hat{j}$ term.`,
    { input: HELP.vec, mistake: t`The $\hat{j}$ component of a cross product carries a minus sign: $-(a_1b_3-a_3b_1)$.` }),

  vc("VEC-9", "Area of a triangle", "exam", 3,
    t`Find the area of the triangle with vertices $A(1,1,2)$, $B(2,3,5)$ and $C(1,5,5)$.`,
    num(Math.sqrt(61) / 2), t`$\frac{\sqrt{61}}{2}$ square units`,
    [
      t`$\overrightarrow{AB}=\hat{i}+2\hat{j}+3\hat{k}$ and $\overrightarrow{AC}=4\hat{j}+3\hat{k}$.`,
      t`$\overrightarrow{AB}\times\overrightarrow{AC}=(6-12)\hat{i}-(3-0)\hat{j}+(4-0)\hat{k}=-6\hat{i}-3\hat{j}+4\hat{k}$.`,
      t`$|\overrightarrow{AB}\times\overrightarrow{AC}|=\sqrt{36+9+16}=\sqrt{61}$.`,
      t`Area $=\frac12\sqrt{61}$ square units.`,
    ],
    t`Area of a triangle $=\frac12|\overrightarrow{AB}\times\overrightarrow{AC}|$.`,
    { input: HELP.num, mistake: t`Remember the factor $\frac12$: $|\overrightarrow{AB}\times\overrightarrow{AC}|$ is the area of the **parallelogram**.` }),

  vc("VEC-10", "Angle between vectors", "application", 3,
    t`Find the angle (in degrees) between $\vec{a}=\hat{i}+\hat{j}$ and $\vec{b}=\hat{j}+\hat{k}$.`,
    num(60), t`$60^\circ$`,
    [
      t`$\vec{a}\cdot\vec{b}=(1)(0)+(1)(1)+(0)(1)=1$.`,
      t`$|\vec{a}|=\sqrt2$ and $|\vec{b}|=\sqrt2$.`,
      t`$\cos\theta=\frac{1}{\sqrt2\cdot\sqrt2}=\frac12$, so $\theta=60^\circ$.`,
    ],
    t`Use $\cos\theta=\frac{\vec{a}\cdot\vec{b}}{|\vec{a}||\vec{b}|}$.`, { input: "Type the angle in degrees, e.g. 45." }),

  vc("VEC-11", "Dot and cross product", "exam", 3,
    t`If $|\vec{a}|=10$, $|\vec{b}|=2$ and $\vec{a}\cdot\vec{b}=12$, find $|\vec{a}\times\vec{b}|$.`,
    num(16), t`$16$`,
    [
      t`$\vec{a}\cdot\vec{b}=|\vec{a}||\vec{b}|\cos\theta\Rightarrow12=20\cos\theta$, so $\cos\theta=\frac35$.`,
      t`$\sin\theta=\sqrt{1-\frac{9}{25}}=\frac45$ (taking $0\le\theta\le\pi$, so $\sin\theta\ge0$).`,
      t`$|\vec{a}\times\vec{b}|=|\vec{a}||\vec{b}|\sin\theta=20\cdot\frac45=16$.`,
    ],
    t`Find $\cos\theta$ from the dot product, then $\sin\theta$, then use the cross-product magnitude.`, { input: HELP.num }),

  vc("VEC-12", "Perpendicular direction", "exam", 3,
    t`Find the unit vector in the direction of $\vec{a}\times\vec{b}$, where $\vec{a}=\hat{i}+\hat{j}+\hat{k}$ and $\vec{b}=\hat{i}+2\hat{j}+3\hat{k}$.`,
    vec([1 / Math.sqrt(6), -2 / Math.sqrt(6), 1 / Math.sqrt(6)]),
    t`$\frac{1}{\sqrt6}\hat{i}-\frac{2}{\sqrt6}\hat{j}+\frac{1}{\sqrt6}\hat{k}$`,
    [
      t`$\vec{a}\times\vec{b}=(3-2)\hat{i}-(3-1)\hat{j}+(2-1)\hat{k}=\hat{i}-2\hat{j}+\hat{k}$.`,
      t`$|\vec{a}\times\vec{b}|=\sqrt{1+4+1}=\sqrt6$.`,
      t`Unit vector $=\frac{\hat{i}-2\hat{j}+\hat{k}}{\sqrt6}$.`,
    ],
    t`Find $\vec{a}\times\vec{b}$ first, then divide by its magnitude.`,
    { input: HELP.vec }),

  vc("VEC-C1", "Unit vectors", "exam", 3,
    t`If $\vec{a},\vec{b},\vec{c}$ are unit vectors such that $\vec{a}+\vec{b}+\vec{c}=\vec{0}$, find $\vec{a}\cdot\vec{b}+\vec{b}\cdot\vec{c}+\vec{c}\cdot\vec{a}$.`,
    num(-1.5), t`$-\frac32$`,
    [
      t`Since $\vec{a}+\vec{b}+\vec{c}=\vec{0}$, we have $|\vec{a}+\vec{b}+\vec{c}|^2=0$.`,
      t`Expanding: $|\vec{a}|^2+|\vec{b}|^2+|\vec{c}|^2+2(\vec{a}\cdot\vec{b}+\vec{b}\cdot\vec{c}+\vec{c}\cdot\vec{a})=0$.`,
      t`Each vector is a unit vector, so $1+1+1+2S=0$, where $S$ is the required sum.`,
      t`Therefore $S=-\frac32$.`,
    ],
    t`Square the magnitude of $\vec{a}+\vec{b}+\vec{c}$ and expand.`,
    { challenge: true, input: HELP.num }),

  vc("VEC-C2", "Parallelogram from diagonals", "exam", 3,
    t`The diagonals of a parallelogram are $\vec{d_1}=3\hat{i}+\hat{j}-2\hat{k}$ and $\vec{d_2}=\hat{i}-3\hat{j}+4\hat{k}$. Find its area.`,
    num(5 * Math.sqrt(3)), t`$5\sqrt3$ square units`,
    [
      t`Area of a parallelogram with diagonals $\vec{d_1},\vec{d_2}$ is $\frac12|\vec{d_1}\times\vec{d_2}|$.`,
      t`$\vec{d_1}\times\vec{d_2}=(4-6)\hat{i}-(12+2)\hat{j}+(-9-1)\hat{k}=-2\hat{i}-14\hat{j}-10\hat{k}$.`,
      t`$|\vec{d_1}\times\vec{d_2}|=\sqrt{4+196+100}=\sqrt{300}=10\sqrt3$.`,
      t`Area $=\frac12\cdot10\sqrt3=5\sqrt3$ square units.`,
    ],
    t`With the **diagonals** given, the area is $\frac12|\vec{d_1}\times\vec{d_2}|$.`, { challenge: true, input: HELP.num }),

  vc("VEC-C3", "Perpendicular vector with condition", "exam", 3,
    t`Let $\vec{a}=\hat{i}+4\hat{j}+2\hat{k}$, $\vec{b}=3\hat{i}-2\hat{j}+7\hat{k}$ and $\vec{c}=2\hat{i}-\hat{j}+4\hat{k}$. Find a vector $\vec{d}$ perpendicular to both $\vec{a}$ and $\vec{b}$ with $\vec{c}\cdot\vec{d}=15$.`,
    vec([160 / 3, -5 / 3, -70 / 3]),
    t`$\frac{160}{3}\hat{i}-\frac53\hat{j}-\frac{70}{3}\hat{k}$`,
    [
      t`$\vec{d}$ is parallel to $\vec{a}\times\vec{b}$, so write $\vec{d}=\lambda(\vec{a}\times\vec{b})$.`,
      t`$\vec{a}\times\vec{b}=(28+4)\hat{i}-(7-6)\hat{j}+(-2-12)\hat{k}=32\hat{i}-\hat{j}-14\hat{k}$.`,
      t`$\vec{c}\cdot\vec{d}=\lambda(64+1-56)=9\lambda=15$, so $\lambda=\frac53$.`,
      t`$\vec{d}=\frac53(32\hat{i}-\hat{j}-14\hat{k})=\frac{160}{3}\hat{i}-\frac53\hat{j}-\frac{70}{3}\hat{k}$.`,
    ],
    t`A vector perpendicular to both is a scalar multiple of $\vec{a}\times\vec{b}$; use $\vec{c}\cdot\vec{d}=15$ to find the scalar.`,
    { challenge: true, input: HELP.vec }),

  // =====================================================================
  // THREE-DIMENSIONAL GEOMETRY
  // =====================================================================
  g3("GEO-1", "Direction cosines", "direct", 1,
    t`The direction cosines of the $x$-axis are`,
    mcq([t`$1,\ 0,\ 0$`, t`$0,\ 1,\ 0$`, t`$0,\ 0,\ 1$`, t`$1,\ 1,\ 1$`], 0),
    t`$1,\ 0,\ 0$`,
    [
      t`The $x$-axis makes angles $0^\circ,90^\circ,90^\circ$ with the three axes.`,
      t`So $(l,m,n)=(\cos0^\circ,\cos90^\circ,\cos90^\circ)=(1,0,0)$.`,
    ],
    t`Which angle does the $x$-axis make with itself?`),

  g3("GEO-2", "Direction ratios", "direct", 1,
    t`Find a set of direction ratios of the line joining $P(-2,4,-5)$ and $Q(1,2,3)$.`,
    tup([3, -2, 8], true), t`$3,\ -2,\ 8$ (any proportional set)`,
    [t`Subtract the coordinates of $P$ from those of $Q$: $(1+2,\ 2-4,\ 3+5)=(3,-2,8)$.`],
    t`Direction ratios are $x_2-x_1,\ y_2-y_1,\ z_2-z_1$.`,
    { input: "Type three numbers separated by commas. Any proportional set is accepted, e.g. 3, -2, 8." }),

  g3("GEO-3", "Direction cosines", "short", 2,
    t`Find the direction cosines of the line joining $P(-2,4,-5)$ and $Q(1,2,3)$ (in the direction from $P$ to $Q$).`,
    tup([3 / Math.sqrt(77), -2 / Math.sqrt(77), 8 / Math.sqrt(77)]),
    t`$\left(\frac{3}{\sqrt{77}},\ \frac{-2}{\sqrt{77}},\ \frac{8}{\sqrt{77}}\right)$`,
    [
      t`Direction ratios are $(3,-2,8)$.`,
      t`$\sqrt{3^2+(-2)^2+8^2}=\sqrt{9+4+64}=\sqrt{77}$.`,
      t`Divide each ratio by $\sqrt{77}$ to get the direction cosines.`,
    ],
    t`Divide each direction ratio by $\sqrt{a^2+b^2+c^2}$.`,
    { input: "Type three values separated by commas, e.g. 3/sqrt(77), -2/sqrt(77), 8/sqrt(77).", mistake: t`Direction ratios must be divided by $\sqrt{a^2+b^2+c^2}$, so that $l^2+m^2+n^2=1$.` }),

  g3("GEO-4", "Direction cosines", "short", 2,
    t`A line has direction ratios $2,-1,-2$. Find its direction cosines (take the positive sign for the first).`,
    tup([2 / 3, -1 / 3, -2 / 3]), t`$\left(\frac23,\ -\frac13,\ -\frac23\right)$`,
    [
      t`$\sqrt{2^2+(-1)^2+(-2)^2}=\sqrt9=3$.`,
      t`Divide each ratio by $3$: $\left(\frac23,-\frac13,-\frac23\right)$.`,
      t`Check: $\frac49+\frac19+\frac49=1$ ✓.`,
    ],
    t`The normalising factor is $\sqrt{4+1+4}$.`, { input: HELP.tup }),

  g3("GEO-5", "Angle between lines", "short", 2,
    t`Find $\cos\theta$, where $\theta$ is the acute angle between two lines with direction ratios $1,2,2$ and $2,3,6$.`,
    num(20 / 21), t`$\frac{20}{21}$`,
    [
      t`$a_1a_2+b_1b_2+c_1c_2=2+6+12=20$.`,
      t`$\sqrt{1+4+4}=3$ and $\sqrt{4+9+36}=7$.`,
      t`$\cos\theta=\frac{20}{3\cdot7}=\frac{20}{21}$.`,
    ],
    t`Divide the (absolute) dot product of the ratios by the product of the two magnitudes.`, { input: HELP.num }),

  g3("GEO-6", "Perpendicular lines", "short", 2,
    t`Find $k$ so that lines with direction ratios $2,-1,3$ and $k,2,1$ are perpendicular.`,
    num(-0.5), t`$k=-\frac12$`,
    [
      t`Perpendicular lines satisfy $a_1a_2+b_1b_2+c_1c_2=0$.`,
      t`$2k-2+3=0\Rightarrow2k=-1$.`,
      t`So $k=-\frac12$.`,
    ],
    t`Set $a_1a_2+b_1b_2+c_1c_2=0$.`, { input: HELP.num }),

  g3("GEO-7", "Equation of a line", "short", 2,
    t`The Cartesian equation of the line through $(5,2,-4)$ parallel to $3\hat{i}+2\hat{j}-8\hat{k}$ is`,
    mcq([
      t`$\frac{x-5}{3}=\frac{y-2}{2}=\frac{z+4}{-8}$`,
      t`$\frac{x+5}{3}=\frac{y+2}{2}=\frac{z-4}{-8}$`,
      t`$\frac{x-3}{5}=\frac{y-2}{2}=\frac{z+8}{-4}$`,
      t`$\frac{x-5}{3}=\frac{y-2}{2}=\frac{z-4}{-8}$`,
    ], 0),
    t`$\frac{x-5}{3}=\frac{y-2}{2}=\frac{z+4}{-8}$`,
    [
      t`Use $\frac{x-x_1}{a}=\frac{y-y_1}{b}=\frac{z-z_1}{c}$ with $(x_1,y_1,z_1)=(5,2,-4)$ and $(a,b,c)=(3,2,-8)$.`,
      t`$z-z_1=z-(-4)=z+4$, so the third fraction is $\frac{z+4}{-8}$.`,
    ],
    t`The point supplies the numerators (with signs flipped), the direction supplies the denominators.`),

  g3("GEO-8", "Sum of squares", "short", 2,
    t`A line makes angles $\alpha,\beta,\gamma$ with the coordinate axes. Find $\sin^2\alpha+\sin^2\beta+\sin^2\gamma$.`,
    num(2), t`$2$`,
    [
      t`The direction cosines satisfy $\cos^2\alpha+\cos^2\beta+\cos^2\gamma=1$.`,
      t`So $\sin^2\alpha+\sin^2\beta+\sin^2\gamma=3-(\cos^2\alpha+\cos^2\beta+\cos^2\gamma)=3-1=2$.`,
    ],
    t`Use $\sin^2\theta=1-\cos^2\theta$ for each angle.`, { input: HELP.num }),

  g3("GEO-9", "Angle between lines", "exam", 3,
    t`Find $\cos\theta$ for the acute angle $\theta$ between the lines $\dfrac{x+3}{3}=\dfrac{y-1}{5}=\dfrac{z+3}{4}$ and $\dfrac{x+1}{1}=\dfrac{y-4}{1}=\dfrac{z-5}{2}$.`,
    num(8 / (5 * Math.sqrt(3))), t`$\frac{8}{5\sqrt3}$`,
    [
      t`Direction ratios are $(3,5,4)$ and $(1,1,2)$.`,
      t`$a_1a_2+b_1b_2+c_1c_2=3+5+8=16$.`,
      t`$\sqrt{9+25+16}=\sqrt{50}=5\sqrt2$ and $\sqrt{1+1+4}=\sqrt6$.`,
      t`$\cos\theta=\frac{16}{5\sqrt2\cdot\sqrt6}=\frac{16}{5\sqrt{12}}=\frac{16}{10\sqrt3}=\frac{8}{5\sqrt3}$.`,
    ],
    t`Read the direction ratios from the denominators, then use the angle formula.`, { input: HELP.num }),

  g3("GEO-10", "Equation of a line", "exam", 3,
    t`Find the Cartesian and vector equations of the line passing through the points $(3,-2,-5)$ and $(3,-2,6)$.`,
    manual(),
    t`Cartesian: $\frac{x-3}{0}=\frac{y+2}{0}=\frac{z+5}{11}$. Vector: $\vec{r}=3\hat{i}-2\hat{j}-5\hat{k}+\lambda(11\hat{k})$.`,
    [
      t`Direction ratios: $(3-3,\ -2+2,\ 6+5)=(0,0,11)$.`,
      t`Using the first point, the Cartesian form is $\frac{x-3}{0}=\frac{y+2}{0}=\frac{z+5}{11}$.`,
      t`The vector form is $\vec{r}=3\hat{i}-2\hat{j}-5\hat{k}+\lambda(0\hat{i}+0\hat{j}+11\hat{k})$.`,
      t`A zero denominator is just notation: it means $x$ and $y$ stay constant ($x=3$, $y=-2$) while $z$ varies.`,
    ],
    t`Subtract the two points to get the direction ratios, then use either point.`,
    { input: HELP.manual }),

  g3("GEO-C1", "Shortest distance", "exam", 3,
    t`Find the shortest distance between the lines $\vec{r}=(\hat{i}+2\hat{j}+\hat{k})+\lambda(\hat{i}-\hat{j}+\hat{k})$ and $\vec{r}=(2\hat{i}-\hat{j}-\hat{k})+\mu(2\hat{i}+\hat{j}+2\hat{k})$.`,
    num(3 / Math.sqrt(2)), t`$\frac{3}{\sqrt2}$`,
    [
      t`$\vec{a_2}-\vec{a_1}=\hat{i}-3\hat{j}-2\hat{k}$.`,
      t`$\vec{b_1}\times\vec{b_2}=(-2-1)\hat{i}-(2-2)\hat{j}+(1+2)\hat{k}=-3\hat{i}+3\hat{k}$, so $|\vec{b_1}\times\vec{b_2}|=3\sqrt2$.`,
      t`$(\vec{a_2}-\vec{a_1})\cdot(\vec{b_1}\times\vec{b_2})=-3+0-6=-9$.`,
      t`$d=\frac{|-9|}{3\sqrt2}=\frac{3}{\sqrt2}$.`,
    ],
    t`Use $d=\frac{|(\vec{a_2}-\vec{a_1})\cdot(\vec{b_1}\times\vec{b_2})|}{|\vec{b_1}\times\vec{b_2}|}$.`,
    { challenge: true, input: HELP.num }),

  g3("GEO-C2", "Direction ratios", "exam", 3,
    t`Find the angle (in degrees) between the lines with direction ratios $a,b,c$ and $b-c,\ c-a,\ a-b$.`,
    num(90), t`$90^\circ$`,
    [
      t`Compute the dot product of the two sets of ratios: $a(b-c)+b(c-a)+c(a-b)$.`,
      t`$=ab-ac+bc-ab+ac-bc=0$.`,
      t`Since $\cos\theta=0$, $\theta=90^\circ$: the lines are perpendicular.`,
    ],
    t`Expand $a(b-c)+b(c-a)+c(a-b)$.`, { challenge: true, input: "Type the angle in degrees." }),

  g3("GEO-C3", "Perpendicular lines", "exam", 3,
    t`Find $p$ so that the lines $\dfrac{1-x}{3}=\dfrac{7y-14}{2p}=\dfrac{z-3}{2}$ and $\dfrac{7-7x}{3p}=\dfrac{y-5}{1}=\dfrac{6-z}{5}$ are at right angles.`,
    num(70 / 11), t`$p=\frac{70}{11}$`,
    [
      t`Rewrite each fraction with coefficient $1$ on $x,y,z$. First line: $\frac{x-1}{-3}=\frac{y-2}{2p/7}=\frac{z-3}{2}$, so the direction ratios are $\left(-3,\frac{2p}{7},2\right)$.`,
      t`Second line: $\frac{x-1}{-3p/7}=\frac{y-5}{1}=\frac{z-6}{-5}$, so the direction ratios are $\left(-\frac{3p}{7},1,-5\right)$.`,
      t`Perpendicular: $(-3)\left(-\frac{3p}{7}\right)+\frac{2p}{7}\cdot1+2(-5)=0$.`,
      t`$\frac{9p}{7}+\frac{2p}{7}-10=0\Rightarrow\frac{11p}{7}=10\Rightarrow p=\frac{70}{11}$.`,
    ],
    t`First rewrite both lines so that $x$, $y$ and $z$ each have coefficient $1$ in the numerators.`,
    { challenge: true, input: HELP.num }),

  // =====================================================================
  // APPLICATIONS OF DERIVATIVES: MAXIMA AND MINIMA
  // =====================================================================
  mm("MM-1", "Critical points", "direct", 1,
    t`At which value of $x$ does $f(x)=x^2-4x+7$ attain its minimum?`,
    num(2), t`$x=2$`,
    [
      t`$f'(x)=2x-4=0\Rightarrow x=2$.`,
      t`$f''(x)=2>0$, so $x=2$ is a point of local (and absolute) minimum.`,
    ],
    t`Differentiate and set $f'(x)=0$.`, { input: HELP.num }),

  mm("MM-2", "Second derivative test", "direct", 1,
    t`If $f'(c)=0$ and $f''(c)>0$, then at $x=c$ the function $f$ has`,
    mcq([t`a local minimum`, t`a local maximum`, t`a point of inflection only`, t`no conclusion can be drawn`], 0),
    t`a local minimum`,
    [
      t`By the second derivative test, $f'(c)=0$ and $f''(c)>0$ means the graph is concave up at $c$, giving a **local minimum**.`,
      t`No conclusion is possible only when $f''(c)=0$.`,
    ],
    t`Think of the shape of $y=x^2$ at $x=0$.`),

  mm("MM-3", "Minimum value", "direct", 1,
    t`Find the minimum value of $f(x)=3x^2-12x+5$.`,
    num(-7), t`$-7$`,
    [
      t`$f'(x)=6x-12=0\Rightarrow x=2$, and $f''(x)=6>0$, so this is a minimum.`,
      t`$f(2)=3(4)-24+5=12-24+5=-7$.`,
    ],
    t`Find the critical point first, then evaluate $f$ there.`, { input: HELP.num }),

  mm("MM-4", "Local maximum", "steps", 2,
    t`Find the local maximum value of $f(x)=x^3-12x+5$.`,
    num(21), t`$21$`,
    [
      t`$f'(x)=3x^2-12=3(x-2)(x+2)$, so the critical points are $x=\pm2$.`,
      t`$f''(x)=6x$. At $x=-2$: $f''(-2)=-12<0$, so $x=-2$ gives a local maximum.`,
      t`$f(-2)=-8+24+5=21$.`,
    ],
    t`Use the second derivative test to decide which critical point gives the maximum.`,
    { input: HELP.num, mistake: t`The question asks for the **value** of the function, not the value of $x$.` }),

  mm("MM-5", "Inconclusive test", "short", 2,
    t`For $f(x)=x^3$, the point $x=0$ is`,
    mcq([t`neither a local maximum nor a local minimum`, t`a local minimum`, t`a local maximum`, t`both a local maximum and minimum`], 0),
    t`neither a local maximum nor a local minimum`,
    [
      t`$f'(x)=3x^2$, so $f'(0)=0$; also $f''(0)=0$, so the second derivative test fails.`,
      t`Use the first derivative test: $f'(x)=3x^2\ge0$ on both sides of $0$, so $f'$ does **not** change sign.`,
      t`No sign change means $x=0$ is neither a maximum nor a minimum (it is a point of inflection).`,
    ],
    t`When $f''(c)=0$, look at the sign of $f'$ on both sides of $c$.`),

  mm("MM-6", "Absolute extrema", "steps", 2,
    t`Find the absolute maximum value of $f(x)=x^3-6x^2+9x+1$ on $[0,4]$.`,
    num(5), t`$5$`,
    [
      t`$f'(x)=3x^2-12x+9=3(x-1)(x-3)$, so the critical points are $x=1,3$ (both inside $[0,4]$).`,
      t`Evaluate: $f(0)=1,\ f(1)=5,\ f(3)=1,\ f(4)=64-96+36+1=5$.`,
      t`The largest value is $5$ (attained at $x=1$ and $x=4$).`,
    ],
    t`Compare $f$ at the critical points **and** at both end-points.`,
    { input: HELP.num, mistake: t`Check the end-points too: $f(4)=5$ also equals the maximum.` }),

  mm("MM-7", "Optimisation", "application", 2,
    t`Two positive numbers have sum $24$. Find the maximum possible value of their product.`,
    num(144), t`$144$`,
    [
      t`Let the numbers be $x$ and $24-x$. Product $P(x)=x(24-x)=24x-x^2$.`,
      t`$P'(x)=24-2x=0\Rightarrow x=12$.`,
      t`$P''(x)=-2<0$, so this is a maximum.`,
      t`$P(12)=12\cdot12=144$.`,
    ],
    t`Write the product as a function of one variable using the sum condition.`,
    { input: HELP.num }),

  mm("MM-8", "Optimisation", "application", 3,
    t`A square tin sheet of side $18$ cm has a square of side $x$ cm cut from each corner, and the flaps are folded to make an open box. Find the maximum volume of the box (in cm³).`,
    num(432), t`$432\ \text{cm}^3$`,
    [
      t`Base side $=18-2x$, height $=x$, so $V=x(18-2x)^2$ with $0<x<9$.`,
      t`$V'=(18-2x)^2-4x(18-2x)=(18-2x)(18-6x)$.`,
      t`$V'=0\Rightarrow x=3$ (the value $x=9$ is outside the domain).`,
      t`$V''=24x-144$, and $V''(3)=-72<0$, so $x=3$ gives a maximum.`,
      t`$V(3)=3\cdot12^2=432$.`,
    ],
    t`Form $V(x)=x(18-2x)^2$, differentiate, and reject any critical point outside $0<x<9$.`,
    { input: HELP.num }),

  mm("MM-9", "Optimisation (exam style)", "exam", 3,
    t`Find the maximum volume of a right circular cylinder that can be inscribed in a sphere of radius $3$.`,
    num(12 * Math.sqrt(3) * PI), t`$12\sqrt3\,\pi$ cubic units`,
    [
      t`Let the cylinder have half-height $h$ and radius $r$, so $r^2=9-h^2$.`,
      t`Volume $V=\pi r^2(2h)=2\pi h(9-h^2)=2\pi(9h-h^3)$.`,
      t`$\frac{dV}{dh}=2\pi(9-3h^2)=0\Rightarrow h=\sqrt3$. Also $\frac{d^2V}{dh^2}=-12\pi h<0$, so it is a maximum.`,
      t`$V=2\pi\sqrt3(9-3)=12\sqrt3\,\pi\approx65.3$.`,
    ],
    t`Use the sphere condition $r^2+h^2=R^2$ to write the volume in terms of $h$ only.`,
    { input: "Type an exact value such as 12*sqrt(3)*pi, or a decimal." }),

  mm("MM-10", "Trigonometric maximum", "exam", 3,
    t`Find the maximum value of $f(x)=\sin x+\cos x$ on $\left[0,\frac{\pi}{2}\right]$.`,
    num(Math.SQRT2), t`$\sqrt2$`,
    [
      t`$f'(x)=\cos x-\sin x=0\Rightarrow\tan x=1\Rightarrow x=\frac{\pi}{4}$ in the interval.`,
      t`$f''(x)=-\sin x-\cos x$, and $f''\left(\frac{\pi}{4}\right)=-\sqrt2<0$, so it is a maximum.`,
      t`$f\left(\frac{\pi}{4}\right)=\frac{1}{\sqrt2}+\frac{1}{\sqrt2}=\sqrt2$. The end-points give $f(0)=f\left(\frac{\pi}{2}\right)=1$, which are smaller.`,
    ],
    t`Set $\cos x=\sin x$.`, { input: HELP.num }),

  mm("MM-C1", "Optimisation (challenge)", "application", 3,
    t`A wire $28$ m long is cut into two pieces. One is bent into a square and the other into a circle. Find the length of the piece bent into a square when the combined area is minimum (in metres).`,
    num(112 / (PI + 4)), t`$\frac{112}{\pi+4}$ m $\approx15.68$ m`,
    [
      t`Let the square have side $x$ (using wire $4x$). The circle uses $28-4x$, so its radius is $r=\frac{28-4x}{2\pi}$.`,
      t`Area $A=x^2+\pi r^2=x^2+\frac{(28-4x)^2}{4\pi}$.`,
      t`$A'=2x-\frac{2(28-4x)}{\pi}=0\Rightarrow\pi x=28-4x\Rightarrow x=\frac{28}{\pi+4}$.`,
      t`$A''=2+\frac{8}{\pi}>0$, so the area is minimum.`,
      t`Length of the square piece $=4x=\frac{112}{\pi+4}\approx15.68$ m.`,
    ],
    t`Express the total area in terms of the side $x$ of the square, using the wire length for the circle's circumference.`,
    { challenge: true, input: "Type an exact value such as 112/(pi+4), or a decimal." }),

  mm("MM-C2", "Distance optimisation", "exam", 3,
    t`Find the point on the curve $y^2=2x$ that is nearest to the point $(1,4)$.`,
    tup([2, 2]), t`$(2,\ 2)$`,
    [
      t`A point on the curve is $\left(\frac{y^2}{2},\,y\right)$. Minimise $D=\left(\frac{y^2}{2}-1\right)^2+(y-4)^2$ (the square of the distance).`,
      t`$\frac{dD}{dy}=2\left(\frac{y^2}{2}-1\right)y+2(y-4)=y^3-2y+2y-8=y^3-8$.`,
      t`$\frac{dD}{dy}=0\Rightarrow y=2$. For $y<2$, $\frac{dD}{dy}<0$ and for $y>2$ it is $>0$, so $D$ is minimum at $y=2$.`,
      t`Then $x=\frac{y^2}{2}=2$, so the nearest point is $(2,2)$.`,
    ],
    t`Minimise the **square** of the distance; it has the same minimum point and is easier to differentiate.`,
    { challenge: true, input: "Type the point as x, y, e.g. 2, 2." }),

  mm("MM-C3", "Local minimum (first derivative test)", "exam", 3,
    t`Find the local minimum value of $f(x)=\sin x+\cos x$ on $(0,2\pi)$.`,
    num(-Math.SQRT2), t`$-\sqrt2$`,
    [
      t`$f'(x)=\cos x-\sin x=0\Rightarrow\tan x=1\Rightarrow x=\frac{\pi}{4}$ or $\frac{5\pi}{4}$ in $(0,2\pi)$.`,
      t`$f''(x)=-(\sin x+\cos x)$. At $x=\frac{\pi}{4}$: $f''=-\sqrt2<0$ (local maximum). At $x=\frac{5\pi}{4}$: $f''=+\sqrt2>0$ (local minimum).`,
      t`$f\left(\frac{5\pi}{4}\right)=-\frac{1}{\sqrt2}-\frac{1}{\sqrt2}=-\sqrt2$.`,
    ],
    t`There are two critical points in $(0,2\pi)$; decide which one is the minimum.`,
    { challenge: true, input: HELP.num }),

  // =====================================================================
  // INTEGRALS (up to Exercise 7.4: no definite integrals, no partial fractions)
  // =====================================================================
  ig("INT-1", "Basic integration", "direct", 1,
    t`Find $\int\left(3x^2-\frac{4}{x}+e^x\right)dx$.`,
    anti("x^3-4*ln|x|+e^x", [0.5, 3]), t`$x^3-4\ln|x|+e^x+C$`,
    [
      t`Integrate term by term: $\int3x^2dx=x^3$, $\int\frac{4}{x}dx=4\ln|x|$, $\int e^xdx=e^x$.`,
      t`So the result is $x^3-4\ln|x|+e^x+C$.`,
      t`Check by differentiating: $3x^2-\frac4x+e^x$ ✓.`,
    ],
    t`$\int\frac{1}{x}dx=\ln|x|$ (not a power-rule case).`, { input: HELP.anti }),

  ig("INT-2", "Basic integration", "direct", 1,
    t`Find $\int\left(2\sec^2x-3\sin x\right)dx$.`,
    anti("2tan(x)+3cos(x)", [-1, 1]), t`$2\tan x+3\cos x+C$`,
    [
      t`$\int2\sec^2x\,dx=2\tan x$.`,
      t`$\int-3\sin x\,dx=-3(-\cos x)=3\cos x$.`,
      t`So the result is $2\tan x+3\cos x+C$.`,
    ],
    t`$\int\sin x\,dx=-\cos x$, so watch the signs.`,
    { input: HELP.anti, mistake: t`Watch the signs: $\int\sin x\,dx=-\cos x$, so $-3\sin x$ integrates to $+3\cos x$.` }),

  ig("INT-3", "Standard forms", "direct", 1,
    t`$\int\dfrac{dx}{1+x^2}$ equals`,
    mcq([t`$\tan^{-1}x+C$`, t`$\ln(1+x^2)+C$`, t`$\frac{1}{1+x}+C$`, t`$\sin^{-1}x+C$`], 0),
    t`$\tan^{-1}x+C$`,
    [
      t`Recall that $\frac{d}{dx}\tan^{-1}x=\frac{1}{1+x^2}$.`,
      t`Hence $\int\frac{dx}{1+x^2}=\tan^{-1}x+C$.`,
    ],
    t`Which inverse trigonometric function has derivative $\frac{1}{1+x^2}$?`),

  ig("INT-4", "Linear argument", "short", 2,
    t`Find $\int\cos5x\,dx$.`,
    anti("sin(5x)/5", [-2, 2]), t`$\frac{\sin5x}{5}+C$`,
    [
      t`Put $t=5x$, so $dx=\frac{dt}{5}$.`,
      t`$\int\cos t\cdot\frac{dt}{5}=\frac{\sin t}{5}=\frac{\sin5x}{5}$.`,
      t`Check: $\frac{d}{dx}\frac{\sin5x}{5}=\cos5x$ ✓.`,
    ],
    t`A linear argument $ax$ introduces a factor $\frac{1}{a}$.`,
    { input: HELP.anti, mistake: t`Don't forget the factor $\frac15$: differentiating $\sin5x$ gives $5\cos5x$, so divide by $5$.` }),

  ig("INT-5", "Trigonometric identity", "short", 2,
    t`Find $\int\sec x\,(\sec x+\tan x)\,dx$.`,
    anti("tan(x)+sec(x)", [-1, 1]), t`$\tan x+\sec x+C$`,
    [
      t`Expand: $\sec x(\sec x+\tan x)=\sec^2x+\sec x\tan x$.`,
      t`$\int\sec^2x\,dx=\tan x$ and $\int\sec x\tan x\,dx=\sec x$.`,
      t`So the result is $\tan x+\sec x+C$.`,
    ],
    t`Multiply out the bracket first.`, { input: HELP.anti }),

  ig("INT-6", "Substitution", "steps", 2,
    t`Find $\int\dfrac{2x}{1+x^2}\,dx$.`,
    anti("ln(1+x^2)", [-2, 2]), t`$\ln(1+x^2)+C$`,
    [
      t`Put $t=1+x^2$, so $dt=2x\,dx$.`,
      t`The integral becomes $\int\frac{dt}{t}=\ln|t|$.`,
      t`Substitute back: $\ln|1+x^2|=\ln(1+x^2)$ since $1+x^2>0$.`,
    ],
    t`The numerator is the derivative of the denominator.`, { input: HELP.anti }),

  ig("INT-7", "Substitution", "steps", 2,
    t`Find $\int xe^{x^2}\,dx$.`,
    anti("e^(x^2)/2", [-1.5, 1.5]), t`$\frac12e^{x^2}+C$`,
    [
      t`Put $t=x^2$, so $dt=2x\,dx$ and $x\,dx=\frac{dt}{2}$.`,
      t`$\int e^t\cdot\frac{dt}{2}=\frac{e^t}{2}$.`,
      t`Substitute back: $\frac12e^{x^2}+C$.`,
    ],
    t`The derivative of $x^2$ is $2x$, which is almost present in the integrand.`, { input: HELP.anti }),

  ig("INT-8", "Standard results", "short", 2,
    t`Find $\int\tan x\,dx$.`,
    anti("ln|sec(x)|", [-1, 1]), t`$\ln|\sec x|+C$ (equivalently $-\ln|\cos x|+C$)`,
    [
      t`Write $\tan x=\frac{\sin x}{\cos x}$ and put $t=\cos x$, so $dt=-\sin x\,dx$.`,
      t`$\int\frac{\sin x}{\cos x}dx=-\int\frac{dt}{t}=-\ln|t|=-\ln|\cos x|$.`,
      t`Since $-\ln|\cos x|=\ln|\sec x|$, both forms are correct.`,
    ],
    t`Write $\tan x$ as $\frac{\sin x}{\cos x}$ and substitute $t=\cos x$.`,
    { input: HELP.anti + " Equivalent forms are accepted." }),

  ig("INT-9", "Trigonometric identity", "steps", 2,
    t`Find $\int\sin^2x\,dx$.`,
    anti("x/2-sin(2x)/4", [-2, 2]), t`$\frac{x}{2}-\frac{\sin2x}{4}+C$`,
    [
      t`Use $\sin^2x=\frac{1-\cos2x}{2}$.`,
      t`$\int\frac{1-\cos2x}{2}dx=\frac{x}{2}-\frac12\cdot\frac{\sin2x}{2}$.`,
      t`So the result is $\frac{x}{2}-\frac{\sin2x}{4}+C$.`,
    ],
    t`Use the power-reducing identity $\sin^2x=\frac{1-\cos2x}{2}$.`,
    { input: HELP.anti + " Equivalent forms such as (2x - sin 2x)/4 are accepted." }),

  ig("INT-10", "Exercise 7.4 type", "steps", 3,
    t`Find $\int\dfrac{dx}{x^2-6x+13}$.`,
    anti("atan((x-3)/2)/2", [-3, 9]), t`$\frac12\tan^{-1}\frac{x-3}{2}+C$`,
    [
      t`Complete the square: $x^2-6x+13=(x-3)^2+4=(x-3)^2+2^2$.`,
      t`Put $u=x-3$, $du=dx$: $\int\frac{du}{u^2+2^2}$.`,
      t`Use $\int\frac{du}{u^2+a^2}=\frac1a\tan^{-1}\frac{u}{a}$ with $a=2$.`,
      t`The result is $\frac12\tan^{-1}\frac{x-3}{2}+C$.`,
    ],
    t`Complete the square in the denominator.`, { input: HELP.anti }),

  ig("INT-11", "Exercise 7.4 type", "steps", 3,
    t`Find $\int\dfrac{dx}{\sqrt{8+3x-x^2}}$.`,
    anti("asin((2x-3)/sqrt(41))", [-1, 4]), t`$\sin^{-1}\frac{2x-3}{\sqrt{41}}+C$`,
    [
      t`$8+3x-x^2=8+\frac94-\left(x-\frac32\right)^2=\left(\frac{\sqrt{41}}{2}\right)^2-\left(x-\frac32\right)^2$.`,
      t`Use $\int\frac{du}{\sqrt{a^2-u^2}}=\sin^{-1}\frac{u}{a}$ with $u=x-\frac32$ and $a=\frac{\sqrt{41}}{2}$.`,
      t`$\sin^{-1}\frac{x-\frac32}{\frac{\sqrt{41}}{2}}=\sin^{-1}\frac{2x-3}{\sqrt{41}}$.`,
    ],
    t`Complete the square to reach the form $a^2-u^2$.`, { input: HELP.anti }),

  ig("INT-12", "Exercise 7.4 type", "short", 3,
    t`Find $\int\dfrac{dx}{x^2-16}$ for $x>4$.`,
    anti("ln|(x-4)/(x+4)|/8", [5, 9]), t`$\frac18\ln\left|\frac{x-4}{x+4}\right|+C$`,
    [
      t`Here $a=4$. Use $\int\frac{dx}{x^2-a^2}=\frac{1}{2a}\ln\left|\frac{x-a}{x+a}\right|$.`,
      t`With $2a=8$ the result is $\frac18\ln\left|\frac{x-4}{x+4}\right|+C$.`,
    ],
    t`Recognise $x^2-16=x^2-4^2$.`, { input: HELP.anti }),

  ig("INT-13", "Product to sum", "steps", 3,
    t`Find $\int\sin3x\cos4x\,dx$.`,
    anti("-cos(7x)/14+cos(x)/2", [-2, 2]), t`$-\frac{\cos7x}{14}+\frac{\cos x}{2}+C$`,
    [
      t`Use $\sin A\cos B=\frac12\left[\sin(A+B)+\sin(A-B)\right]$ with $A=3x$, $B=4x$.`,
      t`$\sin3x\cos4x=\frac12\left[\sin7x+\sin(-x)\right]=\frac12(\sin7x-\sin x)$.`,
      t`$\int\frac12(\sin7x-\sin x)dx=\frac12\left(-\frac{\cos7x}{7}+\cos x\right)$.`,
      t`So the result is $-\frac{\cos7x}{14}+\frac{\cos x}{2}+C$.`,
    ],
    t`Convert the product into a sum of sines.`, { input: HELP.anti }),

  ig("INT-14", "Substitution", "exam", 3,
    t`Find $\int\dfrac{\sin x}{1+\cos^2x}\,dx$.`,
    anti("-atan(cos(x))", [-3, 3]), t`$-\tan^{-1}(\cos x)+C$`,
    [
      t`Put $t=\cos x$, so $dt=-\sin x\,dx$.`,
      t`$\int\frac{\sin x}{1+\cos^2x}dx=-\int\frac{dt}{1+t^2}$.`,
      t`$=-\tan^{-1}t=-\tan^{-1}(\cos x)+C$.`,
    ],
    t`The numerator $\sin x\,dx$ is $-d(\cos x)$.`, { input: HELP.anti }),

  ig("INT-C1", "Linear numerator over a square root", "exam", 3,
    t`Find $\int\dfrac{x+2}{\sqrt{x^2+2x+3}}\,dx$.`,
    anti("sqrt(x^2+2x+3)+ln|x+1+sqrt(x^2+2x+3)|", [-3, 3]),
    t`$\sqrt{x^2+2x+3}+\ln\left|x+1+\sqrt{x^2+2x+3}\right|+C$`,
    [
      t`The derivative of $x^2+2x+3$ is $2x+2$. Write $x+2=\frac12(2x+2)+1$.`,
      t`$\int\frac{x+2}{\sqrt{x^2+2x+3}}dx=\frac12\int\frac{2x+2}{\sqrt{x^2+2x+3}}dx+\int\frac{dx}{\sqrt{x^2+2x+3}}$.`,
      t`First integral: put $t=x^2+2x+3$ to get $\frac12\cdot2\sqrt{t}=\sqrt{x^2+2x+3}$.`,
      t`Second: $x^2+2x+3=(x+1)^2+(\sqrt2)^2$, so $\int\frac{dx}{\sqrt{(x+1)^2+2}}=\ln\left|x+1+\sqrt{x^2+2x+3}\right|$.`,
    ],
    t`Split the numerator as $A\cdot(\text{derivative of the radicand})+B$.`,
    { challenge: true, input: HELP.anti }),

  ig("INT-C2", "Linear numerator over a quadratic", "exam", 3,
    t`Find $\int\dfrac{x+3}{x^2-2x-5}\,dx$ for $x>1+\sqrt6$.`,
    anti("0.5*ln(x^2-2x-5)+(2/sqrt(6))*ln((x-1-sqrt(6))/(x-1+sqrt(6)))", [4, 8]),
    t`$\frac12\ln\left|x^2-2x-5\right|+\frac{2}{\sqrt6}\ln\left|\frac{x-1-\sqrt6}{x-1+\sqrt6}\right|+C$`,
    [
      t`The derivative of the denominator is $2x-2$. Write $x+3=\frac12(2x-2)+4$.`,
      t`The integral is $\frac12\int\frac{2x-2}{x^2-2x-5}dx+4\int\frac{dx}{x^2-2x-5}$.`,
      t`First part: $\frac12\ln\left|x^2-2x-5\right|$.`,
      t`Second part: $x^2-2x-5=(x-1)^2-(\sqrt6)^2$, so $\int\frac{dx}{(x-1)^2-6}=\frac{1}{2\sqrt6}\ln\left|\frac{x-1-\sqrt6}{x-1+\sqrt6}\right|$. Multiply by $4$ to get $\frac{2}{\sqrt6}\ln\left|\cdots\right|$.`,
    ],
    t`Write $x+3=A(2x-2)+B$ and find $A$ and $B$.`,
    { challenge: true, input: HELP.anti }),

  ig("INT-C3", "Linear numerator over a quadratic", "exam", 3,
    t`Find $\int\dfrac{5x-2}{1+2x+3x^2}\,dx$.`,
    anti("5/6*ln(3x^2+2x+1)-11/(3*sqrt(2))*atan((3x+1)/sqrt(2))", [-3, 3]),
    t`$\frac56\ln\left(3x^2+2x+1\right)-\frac{11}{3\sqrt2}\tan^{-1}\frac{3x+1}{\sqrt2}+C$`,
    [
      t`The derivative of $3x^2+2x+1$ is $6x+2$. Write $5x-2=\frac56(6x+2)-\frac{11}{3}$.`,
      t`$\int\frac{5x-2}{3x^2+2x+1}dx=\frac56\ln\left(3x^2+2x+1\right)-\frac{11}{3}\int\frac{dx}{3x^2+2x+1}$ (the quadratic is always positive).`,
      t`$3x^2+2x+1=3\left[\left(x+\frac13\right)^2+\frac29\right]$, so $\int\frac{dx}{3x^2+2x+1}=\frac13\cdot\frac{3}{\sqrt2}\tan^{-1}\frac{3x+1}{\sqrt2}=\frac{1}{\sqrt2}\tan^{-1}\frac{3x+1}{\sqrt2}$.`,
      t`Hence the result is $\frac56\ln\left(3x^2+2x+1\right)-\frac{11}{3\sqrt2}\tan^{-1}\frac{3x+1}{\sqrt2}+C$.`,
    ],
    t`Split $5x-2=A(6x+2)+B$, then complete the square for the remaining part.`,
    { challenge: true, input: HELP.anti }),
];

export const QUESTION_BY_ID: Record<string, MathQuestion> = Object.fromEntries(QUESTIONS.map((q) => [q.id, q]));
