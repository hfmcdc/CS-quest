import type { ChapterContent } from "../types";
import { HELP, cardMk, expr, mcq, mk, num } from "../qhelpers";

const t = String.raw;
const q = mk("cont");
const c = cardMk("cont", "CD");

export const cont: ChapterContent = {
  id: "cont",
  questions: [
    q("CON-1", "Continuity of a piecewise function", "direct", 1,
      t`The function $f(x)=\begin{cases}kx^2,&x\le2\\3,&x>2\end{cases}$ is continuous at $x=2$. Find $k$.`,
      num(0.75), t`$k=\dfrac34$`,
      [
        t`Continuity at $2$ needs $\lim_{x\to2^-}f(x)=\lim_{x\to2^+}f(x)=f(2)$.`,
        t`Left limit and $f(2)$: $k(2)^2=4k$. Right limit: $3$.`,
        t`$4k=3\Rightarrow k=\dfrac34$.`,
      ],
      t`Equate the left-hand value $4k$ with the right-hand value $3$.`,
      { input: HELP.num }),

    q("CON-2", "Removable discontinuity", "direct", 1,
      t`$f(x)=\dfrac{x^2-9}{x-3}$ for $x\ne3$, and $f(3)=k$. For what $k$ is $f$ continuous at $x=3$?`,
      num(6), t`$k=6$`,
      [
        t`For $x\ne3$, $\dfrac{x^2-9}{x-3}=\dfrac{(x-3)(x+3)}{x-3}=x+3$.`,
        t`$\lim_{x\to3}f(x)=3+3=6$.`,
        t`Continuity requires $f(3)=k=6$.`,
      ],
      t`Cancel the common factor $x-3$ and then let $x\to3$.`,
      { input: HELP.num }),

    q("CON-3", "Chain rule", "direct", 1,
      t`Find $\dfrac{dy}{dx}$ if $y=\sin\left(x^2\right)$.`,
      expr("2x*cos(x^2)", [-2, 2]), t`$2x\cos\left(x^2\right)$`,
      [
        t`Chain rule: $\dfrac{d}{dx}\sin u=\cos u\cdot\dfrac{du}{dx}$ with $u=x^2$.`,
        t`$\dfrac{dy}{dx}=\cos\left(x^2\right)\cdot2x$.`,
      ],
      t`Differentiate the outer function, keep the inside, then multiply by the derivative of the inside.`,
      { input: HELP.expr }),

    q("CON-4", "Chain rule", "direct", 1,
      t`Find $\dfrac{dy}{dx}$ if $y=\ln(5x+2)$.`,
      expr("5/(5x+2)", [0, 4]), t`$\dfrac{5}{5x+2}$`,
      [
        t`$\dfrac{d}{dx}\ln u=\dfrac{1}{u}\dfrac{du}{dx}$ with $u=5x+2$.`,
        t`$\dfrac{dy}{dx}=\dfrac{1}{5x+2}\cdot5$.`,
      ],
      t`The derivative of $\ln u$ is $\frac{1}{u}\cdot u'$.`,
      { input: HELP.expr }),

    q("CON-5", "Inverse trigonometric derivative", "short", 2,
      t`Find $\dfrac{dy}{dx}$ if $y=\tan^{-1}(2x)$.`,
      expr("2/(1+4x^2)", [-2, 2]), t`$\dfrac{2}{1+4x^2}$`,
      [
        t`$\dfrac{d}{dx}\tan^{-1}u=\dfrac{1}{1+u^2}\dfrac{du}{dx}$.`,
        t`With $u=2x$: $\dfrac{1}{1+4x^2}\cdot2=\dfrac{2}{1+4x^2}$.`,
      ],
      t`Use $\frac{d}{dx}\tan^{-1}u=\frac{u'}{1+u^2}$ with $u=2x$.`,
      { input: HELP.expr }),

    q("CON-6", "Product rule", "short", 2,
      t`Find $\dfrac{dy}{dx}$ if $y=x^2\ln x$ for $x>0$.`,
      expr("2x*ln(x)+x", [0.5, 4]), t`$2x\ln x+x$`,
      [
        t`Product rule: $(uv)'=u'v+uv'$ with $u=x^2$, $v=\ln x$.`,
        t`$\dfrac{dy}{dx}=2x\ln x+x^2\cdot\dfrac1x=2x\ln x+x$.`,
      ],
      t`Differentiate each factor in turn: $(x^2)'=2x$ and $(\ln x)'=\frac1x$.`,
      { input: HELP.expr }),

    q("CON-7", "Implicit differentiation", "short", 2,
      t`If $x^2+y^2=25$, find $\dfrac{dy}{dx}$ at the point $(3,4)$.`,
      num(-0.75), t`$-\dfrac34$`,
      [
        t`Differentiate both sides with respect to $x$: $2x+2y\dfrac{dy}{dx}=0$.`,
        t`So $\dfrac{dy}{dx}=-\dfrac{x}{y}$.`,
        t`At $(3,4)$: $-\dfrac34$.`,
      ],
      t`Treat $y$ as a function of $x$, so $\frac{d}{dx}y^2=2y\frac{dy}{dx}$.`,
      { input: HELP.num }),

    q("CON-8", "Parametric differentiation", "short", 2,
      t`If $x=t^2$ and $y=t^3$, find $\dfrac{dy}{dx}$ at $t=2$.`,
      num(3), t`$3$`,
      [
        t`$\dfrac{dx}{dt}=2t$ and $\dfrac{dy}{dt}=3t^2$.`,
        t`$\dfrac{dy}{dx}=\dfrac{dy/dt}{dx/dt}=\dfrac{3t^2}{2t}=\dfrac{3t}{2}$.`,
        t`At $t=2$ this is $3$.`,
      ],
      t`Divide $\frac{dy}{dt}$ by $\frac{dx}{dt}$, then substitute $t=2$.`,
      { input: HELP.num }),

    q("CON-9", "Continuity and differentiability", "short", 2,
      t`Consider $f(x)=|x|$ at $x=0$. Which statement is correct?`,
      mcq([
        t`Continuous but not differentiable`,
        t`Differentiable but not continuous`,
        t`Both continuous and differentiable`,
        t`Neither continuous nor differentiable`,
      ], 0),
      t`Continuous but not differentiable`,
      [
        t`$\lim_{x\to0}|x|=0=f(0)$, so $f$ is continuous at $0$.`,
        t`Left derivative: $\lim_{h\to0^-}\dfrac{|h|}{h}=-1$. Right derivative: $\lim_{h\to0^+}\dfrac{|h|}{h}=1$.`,
        t`The one-sided derivatives differ, so $f$ is not differentiable at $0$ (a corner).`,
      ],
      t`Compare the slope of the graph just to the left and just to the right of $0$.`),

    q("CON-10", "Second derivative", "short", 2,
      t`If $y=x^3+2x^2$, find $\dfrac{d^2y}{dx^2}$ at $x=1$.`,
      num(10), t`$10$`,
      [
        t`$\dfrac{dy}{dx}=3x^2+4x$.`,
        t`$\dfrac{d^2y}{dx^2}=6x+4$.`,
        t`At $x=1$: $6+4=10$.`,
      ],
      t`Differentiate twice, then substitute $x=1$.`,
      { input: HELP.num }),

    q("CON-11", "Logarithmic differentiation", "exam", 3,
      t`Find $\dfrac{dy}{dx}$ if $y=x^x$ for $x>0$.`,
      expr("x^x*(1+ln(x))", [0.5, 3]), t`$x^x\,(1+\ln x)$`,
      [
        t`Take logarithms: $\ln y=x\ln x$.`,
        t`Differentiate: $\dfrac1y\dfrac{dy}{dx}=\ln x+x\cdot\dfrac1x=\ln x+1$.`,
        t`$\dfrac{dy}{dx}=y\,(1+\ln x)=x^x(1+\ln x)$.`,
      ],
      t`A variable exponent calls for logarithmic differentiation: take $\ln$ of both sides first.`,
      { input: HELP.expr }),

    q("CON-12", "Simplifying before differentiating", "exam", 3,
      t`Find $\dfrac{dy}{dx}$ if $y=\ln(\sec x+\tan x)$ for $-\frac{\pi}{2}<x<\frac{\pi}{2}$.`,
      expr("1/cos(x)", [-1, 1]), t`$\sec x$`,
      [
        t`Chain rule: $\dfrac{dy}{dx}=\dfrac{1}{\sec x+\tan x}\cdot\left(\sec x\tan x+\sec^2x\right)$.`,
        t`Factor the second bracket: $\sec x(\tan x+\sec x)$.`,
        t`The factor $\sec x+\tan x$ cancels, leaving $\sec x$.`,
      ],
      t`After the chain rule, factor $\sec x$ out of the derivative of $\sec x+\tan x$.`,
      { input: HELP.expr }),

    q("CON-13", "Mean Value Theorem", "exam", 3,
      t`For $f(x)=x^3$ on $[0,2]$, find the value of $c\in(0,2)$ given by the Mean Value Theorem. Give a decimal.`,
      num(2 / Math.sqrt(3)), t`$c=\dfrac{2}{\sqrt3}\approx1.155$`,
      [
        t`MVT: $f'(c)=\dfrac{f(2)-f(0)}{2-0}=\dfrac{8-0}{2}=4$.`,
        t`$f'(x)=3x^2$, so $3c^2=4$ and $c^2=\dfrac43$.`,
        t`$c=\dfrac{2}{\sqrt3}\approx1.155$, which lies in $(0,2)$. (The negative root is rejected.)`,
      ],
      t`Set $f'(c)$ equal to the average slope $\frac{f(2)-f(0)}{2}$ and keep the root inside $(0,2)$.`,
      { input: HELP.num }),

    q("CON-C1", "Limit and continuity", "exam", 3,
      t`Let $f(x)=\dfrac{\sin3x}{x}$ for $x\ne0$ and $f(0)=k$. For what $k$ is $f$ continuous at $0$?`,
      num(3), t`$k=3$`,
      [
        t`$\lim_{x\to0}\dfrac{\sin3x}{x}=3\lim_{x\to0}\dfrac{\sin3x}{3x}$.`,
        t`Using $\lim_{u\to0}\dfrac{\sin u}{u}=1$, the limit is $3\cdot1=3$.`,
        t`Continuity needs $f(0)=3$, so $k=3$.`,
      ],
      t`Multiply and divide by $3$ to match the standard limit $\frac{\sin u}{u}\to1$.`,
      { challenge: true, input: HELP.num }),

    q("CON-C2", "Points of non-differentiability", "exam", 3,
      t`At how many points is $f(x)=|x-1|+|x-2|$ not differentiable?`,
      num(2), t`$2$`,
      [
        t`Each modulus has a corner where its inside is zero: at $x=1$ and $x=2$.`,
        t`At $x=1$ the slope jumps from $-2$ to $0$; at $x=2$ it jumps from $0$ to $2$. Away from these points $f$ is linear.`,
        t`So $f$ is not differentiable at exactly $2$ points.`,
      ],
      t`Write $f$ piece by piece on $x<1$, $1\le x<2$ and $x\ge2$ and compare the slopes at the joins.`,
      { challenge: true, input: HELP.num }),

    q("CON-C3", "Differential identity", "exam", 3,
      t`If $y=\sin^{-1}x$, then $\left(1-x^2\right)\dfrac{d^2y}{dx^2}-x\dfrac{dy}{dx}$ equals:`,
      mcq([t`$0$`, t`$1$`, t`$y$`, t`$-y$`], 0),
      t`$0$`,
      [
        t`$y'=\dfrac{1}{\sqrt{1-x^2}}=\left(1-x^2\right)^{-1/2}$.`,
        t`$y''=-\frac12\left(1-x^2\right)^{-3/2}(-2x)=\dfrac{x}{\left(1-x^2\right)^{3/2}}$.`,
        t`$\left(1-x^2\right)y''=\dfrac{x}{\sqrt{1-x^2}}=x\,y'$, so the expression is $0$.`,
      ],
      t`Find $y'$ and $y''$ explicitly and substitute.`,
      { challenge: true }),

    q("CON-C4", "Second derivative of a parametric curve", "exam", 3,
      t`If $x=\cos t$ and $y=\sin t$, find $\dfrac{d^2y}{dx^2}$ at $t=\dfrac{\pi}{4}$. Give a decimal.`,
      num(-2 * Math.SQRT2), t`$-2\sqrt2\approx-2.828$`,
      [
        t`$\dfrac{dy}{dx}=\dfrac{\cos t}{-\sin t}=-\cot t$.`,
        t`$\dfrac{d^2y}{dx^2}=\dfrac{d}{dt}(-\cot t)\Big/\dfrac{dx}{dt}=\dfrac{\text{cosec}^2t}{-\sin t}=-\dfrac{1}{\sin^3t}$.`,
        t`At $t=\frac{\pi}{4}$: $\sin^3t=\left(\frac{1}{\sqrt2}\right)^3=\frac{1}{2\sqrt2}$, so the value is $-2\sqrt2$.`,
      ],
      t`Differentiate $\frac{dy}{dx}$ with respect to $t$ and divide by $\frac{dx}{dt}$ again.`,
      { challenge: true, input: HELP.num }),
  ],

  revision: [
    {
      title: "Continuity and differentiability",
      kind: "formulas",
      items: [
        { label: "Continuity at x = a", body: t`$$\lim_{x\to a^-}f(x)=\lim_{x\to a^+}f(x)=f(a)$$` },
        { label: "Differentiability", body: t`$$f'(a)=\lim_{h\to0}\frac{f(a+h)-f(a)}{h}$$ exists iff the left and right derivatives are equal.` },
        { label: "Relation", body: t`Differentiable $\Rightarrow$ continuous. The converse is false: $|x|$ is continuous at $0$ but not differentiable there.` },
        { label: "Algebra of continuous functions", body: t`Sums, differences, products, quotients (denominator $\ne0$) and compositions of continuous functions are continuous. Polynomials, $\sin$, $\cos$, $e^x$ are continuous everywhere.` },
      ],
    },
    {
      title: "Derivative rules and standard derivatives",
      kind: "formulas",
      items: [
        { label: "Chain rule", body: t`$$\frac{dy}{dx}=\frac{dy}{du}\cdot\frac{du}{dx}$$` },
        { label: "Product and quotient", body: t`$$(uv)'=u'v+uv',\qquad\left(\frac{u}{v}\right)'=\frac{u'v-uv'}{v^2}$$` },
        { label: "Inverse trigonometric", body: t`$$\frac{d}{dx}\sin^{-1}x=\frac{1}{\sqrt{1-x^2}},\quad\frac{d}{dx}\cos^{-1}x=-\frac{1}{\sqrt{1-x^2}},\quad\frac{d}{dx}\tan^{-1}x=\frac{1}{1+x^2}$$` },
        { label: "Exponential and logarithmic", body: t`$$\frac{d}{dx}e^x=e^x,\quad\frac{d}{dx}a^x=a^x\ln a,\quad\frac{d}{dx}\ln x=\frac1x$$` },
        { label: "Trigonometric", body: t`$$(\sin x)'=\cos x,\ (\cos x)'=-\sin x,\ (\tan x)'=\sec^2x,\ (\sec x)'=\sec x\tan x$$` },
      ],
    },
    {
      title: "Special techniques",
      kind: "formulas",
      items: [
        { label: "Logarithmic differentiation", body: t`For $y=u^v$ or long products/quotients: take $\ln$ of both sides, differentiate, then multiply by $y$.` },
        { label: "Implicit", body: t`Differentiate both sides with respect to $x$, using $\frac{d}{dx}f(y)=f'(y)\frac{dy}{dx}$, then solve for $\frac{dy}{dx}$.` },
        { label: "Parametric", body: t`$$\frac{dy}{dx}=\frac{dy/dt}{dx/dt},\qquad\frac{d^2y}{dx^2}=\frac{\frac{d}{dt}\left(\frac{dy}{dx}\right)}{dx/dt}$$` },
        { label: "Second derivative", body: t`$f''(x)$ is the derivative of $f'(x)$. Differentiate twice in sequence.` },
      ],
    },
    {
      title: "Rolle's theorem and the Mean Value Theorem",
      kind: "formulas",
      items: [
        { label: "Rolle's theorem", body: t`If $f$ is continuous on $[a,b]$, differentiable on $(a,b)$ and $f(a)=f(b)$, then $f'(c)=0$ for some $c\in(a,b)$.` },
        { label: "Mean Value Theorem", body: t`If $f$ is continuous on $[a,b]$ and differentiable on $(a,b)$, then there is $c\in(a,b)$ with $$f'(c)=\frac{f(b)-f(a)}{b-a}$$` },
      ],
    },
    {
      title: "Common mistakes",
      kind: "mistakes",
      items: [
        { body: t`Forgetting the inner derivative in the chain rule: $\frac{d}{dx}\sin(x^2)=2x\cos(x^2)$, not $\cos(x^2)$.` },
        { body: t`Differentiating $x^x$ with the power rule. A variable exponent needs logarithmic differentiation.` },
        { body: t`Dropping $\frac{dy}{dx}$ when differentiating a term in $y$ implicitly.` },
        { body: t`Testing continuity using only one side's limit; both limits must equal $f(a)$.` },
        { body: t`Giving a value of $c$ outside the open interval in Rolle's theorem or the MVT.` },
      ],
    },
    {
      title: "Quick worked example",
      kind: "example",
      items: [
        { label: "Problem", body: t`Find $k$ so that $f(x)=\begin{cases}kx^2,&x\le2\\3,&x>2\end{cases}$ is continuous at $x=2$.` },
        { label: "Step 1", body: t`Left value: $f(2)=4k$. Right limit: $3$.` },
        { label: "Step 2", body: t`Continuity needs $4k=3$.` },
        { label: "Answer", body: t`$k=\dfrac34$.` },
      ],
    },
  ],

  examples: [
    {
      title: "Continuity of a piecewise function",
      problem: t`Find $k$ if $f(x)=\begin{cases}\dfrac{x^2-9}{x-3},&x\ne3\\k,&x=3\end{cases}$ is continuous at $x=3$.`,
      steps: [
        { doit: t`For $x\ne3$: $\dfrac{x^2-9}{x-3}=x+3$`, why: t`Cancel the common factor $x-3$, which is allowed because $x\ne3$ in the limit.` },
        { doit: t`$\lim_{x\to3}f(x)=3+3=6$`, why: t`The limit depends only on values near $3$, not at $3$.` },
        { doit: t`$f(3)=k$ must equal $6$`, why: t`Continuity: the limit must equal the value of the function at the point.` },
      ],
      answer: t`$k=6$`,
    },
    {
      title: "Logarithmic differentiation",
      problem: t`Differentiate $y=x^x$ with respect to $x$ (for $x>0$).`,
      steps: [
        { doit: t`$\ln y=x\ln x$`, why: t`The variable exponent is brought down by taking logarithms of both sides.` },
        { doit: t`$\dfrac1y\dfrac{dy}{dx}=1\cdot\ln x+x\cdot\dfrac1x=\ln x+1$`, why: t`Differentiate both sides: the left uses the chain rule, the right uses the product rule.` },
        { doit: t`$\dfrac{dy}{dx}=y(\ln x+1)=x^x(1+\ln x)$`, why: t`Multiply by $y$ and substitute back $y=x^x$.` },
      ],
      answer: t`$\dfrac{dy}{dx}=x^x(1+\ln x)$`,
    },
    {
      title: "Parametric differentiation",
      problem: t`If $x=a\cos\theta$ and $y=a\sin\theta$, find $\dfrac{dy}{dx}$.`,
      steps: [
        { doit: t`$\dfrac{dx}{d\theta}=-a\sin\theta,\quad\dfrac{dy}{d\theta}=a\cos\theta$`, why: t`Differentiate each coordinate with respect to the parameter.` },
        { doit: t`$\dfrac{dy}{dx}=\dfrac{dy/d\theta}{dx/d\theta}=\dfrac{a\cos\theta}{-a\sin\theta}$`, why: t`Divide the two derivatives; the parameter cancels in the ratio.` },
        { doit: t`$=-\cot\theta$`, why: t`Simplify $\frac{\cos\theta}{\sin\theta}$ to $\cot\theta$.` },
      ],
      answer: t`$\dfrac{dy}{dx}=-\cot\theta$`,
    },
  ],

  cards: [
    c("Continuity", t`Condition for continuity of $f$ at $x=a$`, t`$\lim_{x\to a^-}f(x)=\lim_{x\to a^+}f(x)=f(a)$.`),
    c("Differentiability", t`Does differentiability imply continuity? Does continuity imply differentiability?`, t`Differentiable $\Rightarrow$ continuous, but not conversely. Example: $|x|$ at $0$.`),
    c("Rules", t`Chain rule`, t`$$\frac{dy}{dx}=\frac{dy}{du}\cdot\frac{du}{dx}$$`),
    c("Rules", t`Quotient rule`, t`$$\left(\frac{u}{v}\right)'=\frac{u'v-uv'}{v^2}$$`),
    c("Standard", t`Derivatives of $\sin^{-1}x$, $\cos^{-1}x$, $\tan^{-1}x$`, t`$\dfrac{1}{\sqrt{1-x^2}}$, $\ -\dfrac{1}{\sqrt{1-x^2}}$, $\ \dfrac{1}{1+x^2}$.`),
    c("Standard", t`Derivatives of $e^x$, $a^x$, $\ln x$`, t`$e^x$, $\ a^x\ln a$, $\ \dfrac1x$.`),
    c("Standard", t`Derivatives of $\tan x$, $\sec x$, $\cot x$, $\text{cosec}\,x$`, t`$\sec^2x$, $\ \sec x\tan x$, $\ -\text{cosec}^2x$, $\ -\text{cosec}\,x\cot x$.`),
    c("Techniques", t`When do you use logarithmic differentiation?`, t`For variable exponents such as $x^x$ or $(\sin x)^x$, and for long products/quotients.`),
    c("Techniques", t`$\dfrac{dy}{dx}$ for parametric equations $x=f(t)$, $y=g(t)$`, t`$\dfrac{dy}{dx}=\dfrac{dy/dt}{dx/dt}$.`),
    c("Techniques", t`$\dfrac{d^2y}{dx^2}$ for parametric equations`, t`$\dfrac{d}{dt}\left(\dfrac{dy}{dx}\right)\Big/\dfrac{dx}{dt}$.`),
    c("Theorems", t`Rolle's theorem (statement)`, t`$f$ continuous on $[a,b]$, differentiable on $(a,b)$, $f(a)=f(b)$ $\Rightarrow$ $f'(c)=0$ for some $c\in(a,b)$.`),
    c("Theorems", t`Mean Value Theorem (statement)`, t`$f$ continuous on $[a,b]$, differentiable on $(a,b)$ $\Rightarrow$ $f'(c)=\dfrac{f(b)-f(a)}{b-a}$ for some $c\in(a,b)$.`),
    c("Limits", t`$\lim_{x\to0}\dfrac{\sin x}{x}$ and $\lim_{x\to0}\dfrac{e^x-1}{x}$`, t`Both equal $1$.`),
  ],
};
