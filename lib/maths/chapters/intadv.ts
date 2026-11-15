import type { ChapterContent } from "../types";
import { HELP, anti, cardMk, mk, num } from "../qhelpers";

const t = String.raw;
const q = mk("integrals");
const c = cardMk("integrals", "IA");

export const integrals: ChapterContent = {
  id: "integrals",
  questions: [
    q("INA-1", "Integration by parts", "direct", 1,
      t`Find $\int xe^x\,dx$.`,
      anti("e^x*(x-1)", [-2, 2]), t`$e^x(x-1)+C$`,
      [
        t`Use $\int u\,dv=uv-\int v\,du$ with $u=x$ (it becomes simpler when differentiated) and $dv=e^x\,dx$.`,
        t`Then $du=dx$ and $v=e^x$, so $\int xe^x\,dx=xe^x-\int e^x\,dx$.`,
        t`$=xe^x-e^x+C=e^x(x-1)+C$.`,
      ],
      t`Choose $u=x$ and $dv=e^x\,dx$.`,
      { input: HELP.anti }),

    q("INA-2", "Definite integral", "direct", 1,
      t`Evaluate $\int_0^1x^2\,dx$.`,
      num(1 / 3), t`$\dfrac13$`,
      [
        t`An antiderivative of $x^2$ is $\dfrac{x^3}{3}$.`,
        t`$\left[\dfrac{x^3}{3}\right]_0^1=\dfrac13-0=\dfrac13$.`,
      ],
      t`Apply the Fundamental Theorem: $\int_a^bf=F(b)-F(a)$.`,
      { input: HELP.num }),

    q("INA-3", "Definite integral", "direct", 1,
      t`Evaluate $\int_0^{\pi/2}\cos x\,dx$.`,
      num(1), t`$1$`,
      [
        t`$\int\cos x\,dx=\sin x$.`,
        t`$\left[\sin x\right]_0^{\pi/2}=\sin\frac{\pi}{2}-\sin0=1-0=1$.`,
      ],
      t`Evaluate $\sin x$ at the two limits and subtract.`,
      { input: HELP.num }),

    q("INA-4", "Integration by parts", "short", 2,
      t`Find $\int x\cos x\,dx$.`,
      anti("x*sin(x)+cos(x)", [-3, 3]), t`$x\sin x+\cos x+C$`,
      [
        t`Take $u=x$, $dv=\cos x\,dx$, so $du=dx$ and $v=\sin x$.`,
        t`$\int x\cos x\,dx=x\sin x-\int\sin x\,dx$.`,
        t`$=x\sin x+\cos x+C$.`,
      ],
      t`Let $u=x$ and $dv=\cos x\,dx$.`,
      { input: HELP.anti }),

    q("INA-5", "Integration by parts", "short", 2,
      t`Find $\int\ln x\,dx$ for $x>0$.`,
      anti("x*ln(x)-x", [0.5, 4]), t`$x\ln x-x+C$`,
      [
        t`Write $\ln x=\ln x\cdot1$ and take $u=\ln x$, $dv=dx$.`,
        t`Then $du=\dfrac1x\,dx$ and $v=x$, so $\int\ln x\,dx=x\ln x-\int x\cdot\dfrac1x\,dx$.`,
        t`$=x\ln x-x+C$.`,
      ],
      t`Treat $\ln x$ as $\ln x\cdot1$ and integrate the $1$.`,
      { input: HELP.anti }),

    q("INA-6", "Partial fractions", "short", 2,
      t`Find $\int\dfrac{dx}{(x+1)(x+2)}$ for $x>-1$.`,
      anti("ln((x+1)/(x+2))", [0, 5]), t`$\ln\left|\dfrac{x+1}{x+2}\right|+C$`,
      [
        t`Write $\dfrac{1}{(x+1)(x+2)}=\dfrac{A}{x+1}+\dfrac{B}{x+2}$, so $1=A(x+2)+B(x+1)$.`,
        t`Put $x=-1$: $A=1$. Put $x=-2$: $B=-1$.`,
        t`$\int\left(\dfrac{1}{x+1}-\dfrac{1}{x+2}\right)dx=\ln|x+1|-\ln|x+2|+C=\ln\left|\dfrac{x+1}{x+2}\right|+C$.`,
      ],
      t`Split into $\frac{A}{x+1}+\frac{B}{x+2}$ and find $A,B$ by substituting the roots.`,
      { input: HELP.anti }),

    q("INA-7", "Definite integral", "short", 2,
      t`Evaluate $\int_0^1e^x\,dx$. Give a decimal.`,
      num(Math.E - 1), t`$e-1\approx1.718$`,
      [
        t`$\int e^x\,dx=e^x$.`,
        t`$\left[e^x\right]_0^1=e-1\approx1.718$.`,
      ],
      t`$e^x$ is its own antiderivative.`,
      { input: HELP.num }),

    q("INA-8", "Odd function property", "short", 2,
      t`Evaluate $\int_{-2}^{2}x^3\,dx$.`,
      num(0), t`$0$`,
      [
        t`$f(x)=x^3$ is an odd function: $f(-x)=-f(x)$.`,
        t`For an odd function, $\int_{-a}^{a}f(x)\,dx=0$ (the left and right areas cancel).`,
        t`Check: $\left[\dfrac{x^4}{4}\right]_{-2}^{2}=4-4=0$.`,
      ],
      t`Is $x^3$ even or odd? Use the symmetric-limits property.`,
      { input: HELP.num }),

    q("INA-9", "Definite integral", "short", 2,
      t`Evaluate $\int_0^1\dfrac{dx}{1+x^2}$. Give a decimal.`,
      num(Math.PI / 4), t`$\dfrac{\pi}{4}\approx0.785$`,
      [
        t`$\int\dfrac{dx}{1+x^2}=\tan^{-1}x$.`,
        t`$\left[\tan^{-1}x\right]_0^1=\dfrac{\pi}{4}-0=\dfrac{\pi}{4}$.`,
      ],
      t`Recall the standard integral giving an inverse tangent.`,
      { input: HELP.num }),

    q("INA-10", "Substitution in a definite integral", "short", 2,
      t`Evaluate $\int_0^1xe^{x^2}\,dx$. Give a decimal.`,
      num((Math.E - 1) / 2), t`$\dfrac{e-1}{2}\approx0.859$`,
      [
        t`Put $t=x^2$, so $dt=2x\,dx$. Limits: $x=0\to t=0$, $x=1\to t=1$.`,
        t`$\int_0^1xe^{x^2}dx=\dfrac12\int_0^1e^t\,dt=\dfrac12(e-1)$.`,
        t`$\approx0.859$.`,
      ],
      t`Substitute $t=x^2$ and change the limits at the same time.`,
      { input: HELP.num }),

    q("INA-11", "Repeated integration by parts", "exam", 3,
      t`Find $\int x^2e^x\,dx$.`,
      anti("e^x*(x^2-2x+2)", [-2, 2]), t`$e^x\left(x^2-2x+2\right)+C$`,
      [
        t`First: $u=x^2$, $dv=e^x\,dx$ gives $\int x^2e^x\,dx=x^2e^x-2\int xe^x\,dx$.`,
        t`Second: $\int xe^x\,dx=e^x(x-1)$ (by parts again).`,
        t`$=x^2e^x-2e^x(x-1)+C=e^x\left(x^2-2x+2\right)+C$.`,
      ],
      t`Integrate by parts twice; the power of $x$ drops by one each time.`,
      { input: HELP.anti }),

    q("INA-12", "King's property", "exam", 3,
      t`Evaluate $\int_0^{\pi/2}\dfrac{\sin x}{\sin x+\cos x}\,dx$. Give a decimal.`,
      num(Math.PI / 4), t`$\dfrac{\pi}{4}\approx0.785$`,
      [
        t`Let $I=\int_0^{\pi/2}\dfrac{\sin x}{\sin x+\cos x}dx$. Use $\int_0^af(x)dx=\int_0^af(a-x)dx$ with $a=\frac{\pi}{2}$: $I=\int_0^{\pi/2}\dfrac{\cos x}{\cos x+\sin x}dx$.`,
        t`Add the two forms: $2I=\int_0^{\pi/2}\dfrac{\sin x+\cos x}{\sin x+\cos x}dx=\int_0^{\pi/2}1\,dx=\dfrac{\pi}{2}$.`,
        t`$I=\dfrac{\pi}{4}$.`,
      ],
      t`Replace $x$ by $\frac{\pi}{2}-x$, then add the two expressions for $I$.`,
      { input: HELP.num }),

    q("INA-13", "Partial fractions with a linear numerator", "exam", 3,
      t`Find $\int\dfrac{3x+5}{(x+1)(x+2)}\,dx$ for $x>-1$.`,
      anti("2ln(x+1)+ln(x+2)", [0, 5]), t`$2\ln|x+1|+\ln|x+2|+C$`,
      [
        t`$\dfrac{3x+5}{(x+1)(x+2)}=\dfrac{A}{x+1}+\dfrac{B}{x+2}$, so $3x+5=A(x+2)+B(x+1)$.`,
        t`$x=-1$: $2=A$. $\ x=-2$: $-1=-B$, so $B=1$.`,
        t`$\int\left(\dfrac{2}{x+1}+\dfrac{1}{x+2}\right)dx=2\ln|x+1|+\ln|x+2|+C$.`,
      ],
      t`Put $x=-1$ and $x=-2$ into $3x+5=A(x+2)+B(x+1)$.`,
      { input: HELP.anti }),

    q("INA-14", "Modulus function", "exam", 3,
      t`Evaluate $\int_0^2|x-1|\,dx$.`,
      num(1), t`$1$`,
      [
        t`$|x-1|=1-x$ for $x<1$ and $x-1$ for $x\ge1$. Split the integral at $x=1$.`,
        t`$\int_0^1(1-x)dx=\left[x-\frac{x^2}{2}\right]_0^1=\dfrac12$.`,
        t`$\int_1^2(x-1)dx=\left[\frac{x^2}{2}-x\right]_1^2=0-\left(-\frac12\right)=\dfrac12$. Total $=1$.`,
      ],
      t`Split at the point where the expression inside the modulus changes sign.`,
      { input: HELP.num }),

    q("INA-C1", "e^x [f + f']", "exam", 3,
      t`Find $\int e^x\left(\sin x+\cos x\right)dx$.`,
      anti("e^x*sin(x)", [-3, 3]), t`$e^x\sin x+C$`,
      [
        t`Use $\int e^x\left[f(x)+f'(x)\right]dx=e^xf(x)+C$.`,
        t`Here $f(x)=\sin x$ and $f'(x)=\cos x$.`,
        t`So the integral is $e^x\sin x+C$.`,
      ],
      t`Spot the pattern $e^x[f+f']$ with $f=\sin x$.`,
      { challenge: true, input: HELP.anti }),

    q("INA-C2", "Parts in a definite integral", "exam", 3,
      t`Evaluate $\int_0^{\pi}x\sin x\,dx$. Give a decimal.`,
      num(Math.PI), t`$\pi\approx3.142$`,
      [
        t`By parts: $\int x\sin x\,dx=-x\cos x+\int\cos x\,dx=-x\cos x+\sin x$.`,
        t`$\left[-x\cos x+\sin x\right]_0^{\pi}=\left(-\pi\cos\pi+\sin\pi\right)-0=\pi$.`,
      ],
      t`Find the antiderivative by parts first, then use the limits.`,
      { challenge: true, input: HELP.num }),

    q("INA-C3", "King's property with a logarithm", "exam", 3,
      t`Evaluate $\int_0^{\pi/4}\ln(1+\tan x)\,dx$. Give a decimal.`,
      num((Math.PI / 8) * Math.log(2)), t`$\dfrac{\pi}{8}\ln2\approx0.272$`,
      [
        t`Let $I=\int_0^{\pi/4}\ln(1+\tan x)dx$. Replace $x$ by $\frac{\pi}{4}-x$: $\tan\left(\frac{\pi}{4}-x\right)=\dfrac{1-\tan x}{1+\tan x}$.`,
        t`$1+\dfrac{1-\tan x}{1+\tan x}=\dfrac{2}{1+\tan x}$, so $I=\int_0^{\pi/4}\left[\ln2-\ln(1+\tan x)\right]dx=\dfrac{\pi}{4}\ln2-I$.`,
        t`$2I=\dfrac{\pi}{4}\ln2$, so $I=\dfrac{\pi}{8}\ln2\approx0.272$.`,
      ],
      t`Use $x\to\frac{\pi}{4}-x$, simplify $1+\tan\left(\frac{\pi}{4}-x\right)$, and add the two forms of $I$.`,
      { challenge: true, input: HELP.num }),

    q("INA-C4", "Three linear factors", "exam", 3,
      t`Find $\int\dfrac{x^2}{(x+1)(x+2)(x+3)}\,dx$ for $x>-1$.`,
      anti("0.5*ln(x+1)-4*ln(x+2)+4.5*ln(x+3)", [0, 5]), t`$\dfrac12\ln|x+1|-4\ln|x+2|+\dfrac92\ln|x+3|+C$`,
      [
        t`Write $\dfrac{x^2}{(x+1)(x+2)(x+3)}=\dfrac{A}{x+1}+\dfrac{B}{x+2}+\dfrac{C}{x+3}$.`,
        t`$A=\dfrac{(-1)^2}{(1)(2)}=\dfrac12$, $\ B=\dfrac{(-2)^2}{(-1)(1)}=-4$, $\ C=\dfrac{(-3)^2}{(-2)(-1)}=\dfrac92$ (cover-up: cover the factor and put in its root).`,
        t`Integrate term by term to get $\frac12\ln|x+1|-4\ln|x+2|+\frac92\ln|x+3|+C$.`,
      ],
      t`Use the cover-up method: to find $A$, hide $(x+1)$ and put $x=-1$ in the rest.`,
      { challenge: true, input: HELP.anti }),
  ],

  revision: [
    {
      title: "Integration by parts",
      kind: "formulas",
      items: [
        { label: "Formula", body: t`$$\int u\,dv=uv-\int v\,du\qquad\text{i.e.}\qquad\int f\,g\,dx=f\int g\,dx-\int\left(f'\int g\,dx\right)dx$$` },
        { label: "Choosing u (ILATE)", body: t`Inverse trig, Logarithmic, Algebraic, Trigonometric, Exponential: take $u$ as the function that comes **first** in this order.` },
        { label: "Special forms", body: t`$$\int e^x\left[f(x)+f'(x)\right]dx=e^xf(x)+C$$ $$\int\ln x\,dx=x\ln x-x+C$$` },
        { label: "Standard results", body: t`$$\int\sqrt{a^2-x^2}\,dx=\frac x2\sqrt{a^2-x^2}+\frac{a^2}{2}\sin^{-1}\frac xa+C$$ $$\int\sqrt{x^2+a^2}\,dx=\frac x2\sqrt{x^2+a^2}+\frac{a^2}{2}\ln\left|x+\sqrt{x^2+a^2}\right|+C$$` },
      ],
    },
    {
      title: "Partial fractions",
      kind: "formulas",
      items: [
        { label: "Distinct linear factors", body: t`$$\frac{px+q}{(x-a)(x-b)}=\frac{A}{x-a}+\frac{B}{x-b}$$` },
        { label: "Repeated factor", body: t`$$\frac{px+q}{(x-a)^2}=\frac{A}{x-a}+\frac{B}{(x-a)^2}$$` },
        { label: "Irreducible quadratic", body: t`$$\frac{px^2+qx+r}{(x-a)(x^2+bx+c)}=\frac{A}{x-a}+\frac{Bx+C}{x^2+bx+c}$$` },
        { label: "Improper fraction", body: t`If the degree of the numerator is **at least** that of the denominator, divide first and split the remainder.` },
      ],
    },
    {
      title: "Definite integrals and properties",
      kind: "formulas",
      items: [
        { label: "Fundamental theorem", body: t`$$\int_a^bf(x)\,dx=F(b)-F(a),\qquad F'=f$$` },
        { label: "Basic properties", body: t`$\int_a^bf=-\int_b^af$, $\ \int_a^bf=\int_a^cf+\int_c^bf$, $\ \int_a^bf(x)dx=\int_a^bf(t)dt$.` },
        { label: "King property", body: t`$$\int_a^bf(x)\,dx=\int_a^bf(a+b-x)\,dx,\qquad\int_0^af(x)\,dx=\int_0^af(a-x)\,dx$$` },
        { label: "Even and odd", body: t`$$\int_{-a}^{a}f(x)\,dx=\begin{cases}2\int_0^af(x)\,dx,&f\text{ even}\\0,&f\text{ odd}\end{cases}$$` },
        { label: "Doubling", body: t`$$\int_0^{2a}f(x)\,dx=\begin{cases}2\int_0^af(x)\,dx,&f(2a-x)=f(x)\\0,&f(2a-x)=-f(x)\end{cases}$$` },
      ],
    },
    {
      title: "Key concepts: definite integrals",
      kind: "concepts",
      items: [
        { body: t`In a definite integral by substitution, **change the limits** with the variable (or go back to $x$ before using them).` },
        { body: t`For $|f(x)|$ in an integral, split at the points where $f(x)$ changes sign.` },
        { body: t`If an integrand does not simplify, try $x\to a+b-x$ and add the two forms: the denominator often cancels.` },
        { body: t`Check an indefinite integral by differentiating it.` },
      ],
    },
    {
      title: "Common mistakes: parts, fractions, definite integrals",
      kind: "mistakes",
      items: [
        { body: t`Choosing $u$ badly (for example $u=e^x$ in $\int xe^x\,dx$), which makes the integral harder.` },
        { body: t`Forgetting the minus sign in $\int u\,dv=uv-\int v\,du$.` },
        { body: t`Not changing the limits after a substitution.` },
        { body: t`Applying the odd/even property to limits that are not symmetric about $0$.` },
        { body: t`Dropping the absolute value in a modulus integral instead of splitting the range.` },
      ],
    },
    {
      title: "Quick worked example: integration by parts",
      kind: "example",
      items: [
        { label: "Problem", body: t`Find $\int x\cos x\,dx$.` },
        { label: "Step 1", body: t`$u=x$, $dv=\cos x\,dx$, so $du=dx$, $v=\sin x$.` },
        { label: "Step 2", body: t`$\int x\cos x\,dx=x\sin x-\int\sin x\,dx$.` },
        { label: "Answer", body: t`$x\sin x+\cos x+C$.` },
      ],
    },
  ],

  examples: [
    {
      title: "Integration by parts",
      problem: t`Find $\int x\sin x\,dx$.`,
      steps: [
        { doit: t`$u=x,\ dv=\sin x\,dx\Rightarrow du=dx,\ v=-\cos x$`, why: t`Pick $u$ so that it gets simpler on differentiation, and $dv$ so that it is easy to integrate.` },
        { doit: t`$\int x\sin x\,dx=-x\cos x-\int(-\cos x)\,dx$`, why: t`Apply $\int u\,dv=uv-\int v\,du$.` },
        { doit: t`$=-x\cos x+\sin x+C$`, why: t`The remaining integral $\int\cos x\,dx=\sin x$ is standard.` },
      ],
      answer: t`$-x\cos x+\sin x+C$`,
    },
    {
      title: "Partial fractions",
      problem: t`Find $\int\dfrac{3x+5}{(x+1)(x+2)}\,dx$.`,
      steps: [
        { doit: t`$\dfrac{3x+5}{(x+1)(x+2)}=\dfrac{A}{x+1}+\dfrac{B}{x+2}$`, why: t`Two distinct linear factors give two simple fractions.` },
        { doit: t`$3x+5=A(x+2)+B(x+1)$`, why: t`Multiply both sides by the denominator.` },
        { doit: t`$x=-1\Rightarrow A=2$; $\ x=-2\Rightarrow B=1$`, why: t`Substituting the root of each factor kills the other term.` },
        { doit: t`$\int\left(\dfrac{2}{x+1}+\dfrac{1}{x+2}\right)dx=2\ln|x+1|+\ln|x+2|+C$`, why: t`Each simple fraction integrates to a logarithm.` },
      ],
      answer: t`$2\ln|x+1|+\ln|x+2|+C$`,
    },
    {
      title: "A definite integral using symmetry",
      problem: t`Evaluate $\int_0^{\pi/2}\dfrac{\sin x}{\sin x+\cos x}\,dx$.`,
      steps: [
        { doit: t`$I=\int_0^{\pi/2}\dfrac{\sin x}{\sin x+\cos x}dx=\int_0^{\pi/2}\dfrac{\cos x}{\cos x+\sin x}dx$`, why: t`Replace $x$ by $\frac{\pi}{2}-x$ (the King property); $\sin$ and $\cos$ swap.` },
        { doit: t`$2I=\int_0^{\pi/2}\dfrac{\sin x+\cos x}{\sin x+\cos x}dx=\int_0^{\pi/2}1\,dx=\dfrac{\pi}{2}$`, why: t`Adding the two forms makes the denominator cancel completely.` },
        { doit: t`$I=\dfrac{\pi}{4}$`, why: t`Divide by $2$.` },
      ],
      answer: t`$\dfrac{\pi}{4}$`,
    },
  ],

  cards: [
    c("By parts", t`Integration by parts formula`, t`$$\int u\,dv=uv-\int v\,du$$`),
    c("By parts", t`What does ILATE stand for?`, t`Inverse trigonometric, Logarithmic, Algebraic, Trigonometric, Exponential: the order in which to choose $u$.`),
    c("By parts", t`$\int e^x\left[f(x)+f'(x)\right]dx$`, t`$e^xf(x)+C$`),
    c("By parts", t`$\int\ln x\,dx$`, t`$x\ln x-x+C$`),
    c("Standard", t`$\int\sqrt{a^2-x^2}\,dx$`, t`$\dfrac x2\sqrt{a^2-x^2}+\dfrac{a^2}{2}\sin^{-1}\dfrac xa+C$`),
    c("Partial fractions", t`Form of $\dfrac{px+q}{(x-a)(x-b)}$ in partial fractions`, t`$\dfrac{A}{x-a}+\dfrac{B}{x-b}$`),
    c("Partial fractions", t`Form for a repeated factor $(x-a)^2$ in the denominator`, t`$\dfrac{A}{x-a}+\dfrac{B}{(x-a)^2}$`),
    c("Partial fractions", t`What must you do if the numerator's degree is at least the denominator's?`, t`Divide first (long division), then split the proper fraction.`),
    c("Definite", t`Fundamental theorem of calculus (second form)`, t`$\int_a^bf(x)dx=F(b)-F(a)$ where $F'=f$.`),
    c("Definite", t`King property`, t`$\int_a^bf(x)dx=\int_a^bf(a+b-x)dx$`),
    c("Definite", t`$\int_{-a}^{a}f(x)dx$ for even and odd $f$`, t`Even: $2\int_0^af(x)dx$. Odd: $0$.`),
    c("Definite", t`$\int_0^{2a}f(x)dx$ when $f(2a-x)=f(x)$ and when $f(2a-x)=-f(x)$`, t`$2\int_0^af(x)dx$ and $0$ respectively.`),
    c("Common mistake", t`What must you do to the limits when you substitute in a definite integral?`, t`Change them to the new variable (or return to $x$ before substituting the limits).`),
  ],
};
