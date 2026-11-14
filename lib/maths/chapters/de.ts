import type { ChapterContent } from "../types";
import { HELP, cardMk, expr, mcq, mk, num } from "../qhelpers";

const t = String.raw;
const q = mk("de");
const c = cardMk("de", "DE");

export const de: ChapterContent = {
  id: "de",
  questions: [
    q("DEQ-1", "Order", "direct", 1,
      t`Find the order of $\dfrac{d^3y}{dx^3}+\left(\dfrac{dy}{dx}\right)^2=0$.`,
      num(3), t`$3$`,
      [
        t`The order is the order of the **highest derivative** present.`,
        t`The highest derivative is $\dfrac{d^3y}{dx^3}$, so the order is $3$.`,
      ],
      t`Look for the highest-order derivative; ignore the powers.`,
      { input: HELP.num }),

    q("DEQ-2", "Degree", "direct", 1,
      t`Find the degree of $\left(\dfrac{d^2y}{dx^2}\right)^2+\dfrac{dy}{dx}=0$.`,
      num(2), t`$2$`,
      [
        t`The equation is a polynomial in the derivatives.`,
        t`The degree is the power of the highest-order derivative: $\left(\dfrac{d^2y}{dx^2}\right)^2$, so the degree is $2$.`,
      ],
      t`The degree is the power of the highest-order derivative.`,
      { input: HELP.num }),

    q("DEQ-3", "Arbitrary constants", "direct", 1,
      t`How many arbitrary constants are there in the general solution of a third-order differential equation?`,
      num(3), t`$3$`,
      [
        t`The general solution of an $n$th order equation contains $n$ independent arbitrary constants.`,
        t`Here $n=3$.`,
      ],
      t`The number of constants equals the order.`,
      { input: HELP.num }),

    q("DEQ-4", "Variable separable", "short", 2,
      t`Solve $\dfrac{dy}{dx}=2x$ given $y=1$ when $x=0$. Type $y$ as an expression in $x$.`,
      expr("x^2+1", [-3, 3]), t`$y=x^2+1$`,
      [
        t`Separate: $dy=2x\,dx$. Integrate: $y=x^2+C$.`,
        t`Use $y(0)=1$: $1=0+C$, so $C=1$.`,
        t`$y=x^2+1$.`,
      ],
      t`Integrate both sides, then use the given point to find $C$.`,
      { input: HELP.sol }),

    q("DEQ-5", "Variable separable", "short", 2,
      t`Solve $\dfrac{dy}{dx}=y$ with $y(0)=2$. Type $y$ as an expression in $x$.`,
      expr("2e^x", [-2, 2]), t`$y=2e^x$`,
      [
        t`Separate: $\dfrac{dy}{y}=dx$. Integrate: $\ln|y|=x+C_1$, so $y=Ae^x$.`,
        t`$y(0)=2$ gives $A=2$.`,
        t`$y=2e^x$.`,
      ],
      t`Separate the variables to get $\frac{dy}{y}=dx$ and integrate.`,
      { input: HELP.sol }),

    q("DEQ-6", "General solution", "short", 2,
      t`The general solution of $\dfrac{dy}{dx}=\dfrac{x}{y}$ is:`,
      mcq([t`$y^2=x^2+C$`, t`$y=x^2+C$`, t`$y^2=x+C$`, t`$y=\dfrac{x^2}{2}+C$`], 0),
      t`$y^2=x^2+C$`,
      [
        t`Separate: $y\,dy=x\,dx$.`,
        t`Integrate: $\dfrac{y^2}{2}=\dfrac{x^2}{2}+C_1$, so $y^2=x^2+C$ (with $C=2C_1$).`,
      ],
      t`Move all $y$ terms to one side: $y\,dy=x\,dx$.`),

    q("DEQ-7", "Integrating factor", "short", 2,
      t`For $\dfrac{dy}{dx}+\dfrac1x\,y=x^2$ ($x>0$), type the integrating factor.`,
      expr("x", [0.5, 4]), t`$\text{I.F.}=x$`,
      [
        t`The equation has the form $\dfrac{dy}{dx}+Py=Q$ with $P=\dfrac1x$.`,
        t`$\text{I.F.}=e^{\int P\,dx}=e^{\ln x}=x$.`,
      ],
      t`Compute $e^{\int P\,dx}$ with $P=\frac1x$.`,
      { input: HELP.expr }),

    q("DEQ-8", "Linear equation", "short", 2,
      t`Solve $\dfrac{dy}{dx}+y=e^{-x}$ with $y(0)=0$. Type $y$ in terms of $x$.`,
      expr("x*e^(-x)", [-2, 3]), t`$y=xe^{-x}$`,
      [
        t`$P=1$, $\text{I.F.}=e^{\int1\,dx}=e^x$.`,
        t`Multiply: $\dfrac{d}{dx}\left(ye^x\right)=e^{-x}e^x=1$, so $ye^x=x+C$.`,
        t`$y(0)=0\Rightarrow C=0$. Hence $y=xe^{-x}$.`,
      ],
      t`Multiply by the integrating factor $e^x$; the left side becomes $\frac{d}{dx}(ye^x)$.`,
      { input: HELP.sol }),

    q("DEQ-9", "Formation", "short", 2,
      t`Eliminating the constant $A$ from $y=Ax^2$ gives the differential equation:`,
      mcq([t`$x\dfrac{dy}{dx}=2y$`, t`$\dfrac{dy}{dx}=2y$`, t`$x\dfrac{dy}{dx}=y$`, t`$y\dfrac{dy}{dx}=2x$`], 0),
      t`$x\dfrac{dy}{dx}=2y$`,
      [
        t`Differentiate: $\dfrac{dy}{dx}=2Ax$.`,
        t`From $y=Ax^2$, $A=\dfrac{y}{x^2}$. Substitute: $\dfrac{dy}{dx}=\dfrac{2y}{x}$.`,
        t`So $x\dfrac{dy}{dx}=2y$ (one constant removed, order $1$).`,
      ],
      t`Differentiate once, then replace $A$ using the original equation.`),

    q("DEQ-10", "Homogeneous equations", "short", 2,
      t`Which of these is a homogeneous differential equation?`,
      mcq([t`$\dfrac{dy}{dx}=\dfrac{x+y}{x}$`, t`$\dfrac{dy}{dx}=x+y^2$`, t`$\dfrac{dy}{dx}=\dfrac{x+1}{y}$`, t`$\dfrac{dy}{dx}=\sin x+y$`], 0),
      t`$\dfrac{dy}{dx}=\dfrac{x+y}{x}$`,
      [
        t`$\frac{dy}{dx}=F(x,y)$ is homogeneous when $F(\lambda x,\lambda y)=F(x,y)$ (degree $0$).`,
        t`For $F=\dfrac{x+y}{x}$: $F(\lambda x,\lambda y)=\dfrac{\lambda x+\lambda y}{\lambda x}=F(x,y)$. The others do not scale like this.`,
      ],
      t`Replace $x\to\lambda x$ and $y\to\lambda y$: does $\lambda$ cancel completely?`),

    q("DEQ-11", "Separable IVP", "exam", 3,
      t`Solve $\dfrac{dy}{dx}=xy$ with $y(0)=1$. Type $y$ in terms of $x$.`,
      expr("e^(x^2/2)", [-2, 2]), t`$y=e^{x^2/2}$`,
      [
        t`Separate: $\dfrac{dy}{y}=x\,dx$. Integrate: $\ln y=\dfrac{x^2}{2}+C$.`,
        t`$y(0)=1\Rightarrow\ln1=C\Rightarrow C=0$.`,
        t`$y=e^{x^2/2}$.`,
      ],
      t`Integrate $\frac{dy}{y}=x\,dx$ and then exponentiate.`,
      { input: HELP.sol }),

    q("DEQ-12", "Separable with inverse tangent", "exam", 3,
      t`Solve $\dfrac{dy}{dx}=\dfrac{1+y^2}{1+x^2}$ with $y(0)=1$ for $x<1$. Type $y$ in terms of $x$.`,
      expr("(1+x)/(1-x)", [-3, 0.5]), t`$y=\dfrac{1+x}{1-x}$`,
      [
        t`Separate: $\dfrac{dy}{1+y^2}=\dfrac{dx}{1+x^2}$. Integrate: $\tan^{-1}y=\tan^{-1}x+C$.`,
        t`$y(0)=1\Rightarrow\dfrac{\pi}{4}=0+C$.`,
        t`$y=\tan\left(\tan^{-1}x+\dfrac{\pi}{4}\right)=\dfrac{x+1}{1-x}$.`,
      ],
      t`Both sides integrate to inverse tangents; use $\tan(A+B)$ at the end.`,
      { input: HELP.sol }),

    q("DEQ-13", "Homogeneous IVP", "exam", 3,
      t`Solve $\dfrac{dy}{dx}=\dfrac{x+y}{x}$ for $x>0$ with $y(1)=0$. Type $y$ in terms of $x$.`,
      expr("x*ln(x)", [0.5, 4]), t`$y=x\ln x$`,
      [
        t`Put $y=vx$, so $\dfrac{dy}{dx}=v+x\dfrac{dv}{dx}$. Then $v+x\dfrac{dv}{dx}=1+v$.`,
        t`$x\dfrac{dv}{dx}=1\Rightarrow dv=\dfrac{dx}{x}\Rightarrow v=\ln x+C$.`,
        t`$y=x(\ln x+C)$. $y(1)=0\Rightarrow C=0$, so $y=x\ln x$.`,
      ],
      t`Substitute $y=vx$ to separate the variables.`,
      { input: HELP.sol }),

    q("DEQ-C1", "Order from constants", "exam", 3,
      t`The differential equation that represents the family $y=ax^2+bx+c$ (with $a,b,c$ arbitrary constants) has order:`,
      num(3), t`$3$`,
      [
        t`The order of the differential equation of a family equals the number of independent arbitrary constants.`,
        t`There are $3$ constants. (Indeed, differentiating three times gives $\frac{d^3y}{dx^3}=0$.)`,
      ],
      t`Count independent arbitrary constants.`,
      { challenge: true, input: HELP.num }),

    q("DEQ-C2", "Linear equation with a trigonometric term", "exam", 3,
      t`Solve $\dfrac{dy}{dx}+2y=\sin x$ with $y(0)=0$. Type $y$ in terms of $x$.`,
      expr("(2sin(x)-cos(x)+e^(-2x))/5", [-2, 3]), t`$y=\dfrac{2\sin x-\cos x+e^{-2x}}{5}$`,
      [
        t`$\text{I.F.}=e^{2x}$, so $\dfrac{d}{dx}\left(ye^{2x}\right)=e^{2x}\sin x$.`,
        t`Use $\int e^{2x}\sin x\,dx=\dfrac{e^{2x}(2\sin x-\cos x)}{5}$. Then $y=\dfrac{2\sin x-\cos x}{5}+Ce^{-2x}$.`,
        t`$y(0)=0\Rightarrow-\dfrac15+C=0$, so $C=\dfrac15$. Hence $y=\dfrac{2\sin x-\cos x+e^{-2x}}{5}$.`,
      ],
      t`Multiply by $e^{2x}$ and integrate $e^{2x}\sin x$ by parts twice.`,
      { challenge: true, input: HELP.sol }),

    q("DEQ-C3", "Identify the family", "exam", 3,
      t`The differential equation $x\,dy-y\,dx=0$ represents:`,
      mcq([t`Straight lines through the origin`, t`Circles centred at the origin`, t`Parabolas`, t`Rectangular hyperbolas`], 0),
      t`Straight lines through the origin`,
      [
        t`Rewrite: $\dfrac{dy}{y}=\dfrac{dx}{x}$. Integrate: $\ln|y|=\ln|x|+\ln|C|$.`,
        t`So $y=Cx$: straight lines through the origin.`,
      ],
      t`Separate the variables and integrate.`,
      { challenge: true }),

    q("DEQ-C4", "Growth model", "exam", 3,
      t`A population satisfies $\dfrac{dP}{dt}=kP$ and doubles in $10$ years. After how many years (from the start) is it $4$ times the original?`,
      num(20), t`$20$ years`,
      [
        t`Solving: $P=P_0e^{kt}$.`,
        t`Doubling in $10$ years: $e^{10k}=2$. Then $4=e^{kt}=\left(e^{10k}\right)^{t/10}=2^{t/10}$.`,
        t`$2^{t/10}=4=2^2$, so $t=20$ years.`,
      ],
      t`Use $P=P_0e^{kt}$ and $e^{10k}=2$.`,
      { challenge: true, input: HELP.num }),
  ],

  revision: [
    {
      title: "Basic definitions",
      kind: "formulas",
      items: [
        { label: "Order", body: t`The order of the **highest** derivative in the equation.` },
        { label: "Degree", body: t`The power of the highest-order derivative, **after** the equation is made a polynomial in the derivatives (defined only then).` },
        { label: "General solution", body: t`Contains as many independent arbitrary constants as the order. A **particular solution** has the constants fixed using given conditions.` },
        { label: "Forming an equation", body: t`For a family with $n$ constants: differentiate $n$ times and eliminate the constants.` },
      ],
    },
    {
      title: "Methods for first-order equations",
      kind: "formulas",
      items: [
        { label: "Variable separable", body: t`$$\frac{dy}{dx}=f(x)g(y)\ \Rightarrow\ \int\frac{dy}{g(y)}=\int f(x)\,dx+C$$` },
        { label: "Homogeneous", body: t`$\dfrac{dy}{dx}=F\left(\dfrac yx\right)$. Put $y=vx$: $\dfrac{dy}{dx}=v+x\dfrac{dv}{dx}$, then separate $v$ and $x$.` },
        { label: "Linear in y", body: t`$$\frac{dy}{dx}+Py=Q,\quad\text{I.F.}=e^{\int P\,dx},\quad y\cdot\text{I.F.}=\int Q\cdot\text{I.F.}\,dx+C$$` },
        { label: "Linear in x", body: t`$$\frac{dx}{dy}+P_1x=Q_1,\quad\text{I.F.}=e^{\int P_1\,dy},\quad x\cdot\text{I.F.}=\int Q_1\cdot\text{I.F.}\,dy+C$$` },
      ],
    },
    {
      title: "Key concepts",
      kind: "concepts",
      items: [
        { body: t`Check that the equation is in the right form before choosing a method: separable, homogeneous (degree $0$ in $x,y$) or linear.` },
        { body: t`When integrating $\frac{dy}{y}$ you may write the constant as $\ln C$ to combine logarithms neatly.` },
        { body: t`To find a **particular** solution, substitute the given condition **after** getting the general solution.` },
        { body: t`Exponential growth/decay: $\frac{dP}{dt}=kP\Rightarrow P=P_0e^{kt}$.` },
      ],
    },
    {
      title: "Common mistakes",
      kind: "mistakes",
      items: [
        { body: t`Confusing order and degree.` },
        { body: t`Forgetting the arbitrary constant, or adding it on only one side inconsistently.` },
        { body: t`In a linear equation, not writing it in the standard form $\frac{dy}{dx}+Py=Q$ before finding $P$.` },
        { body: t`Using an integrating factor of $e^{\int P\,dx}$ but dropping it from the right-hand side.` },
      ],
    },
    {
      title: "Quick worked example",
      kind: "example",
      items: [
        { label: "Problem", body: t`Solve $\frac{dy}{dx}=\frac{x}{y}$.` },
        { label: "Separate", body: t`$y\,dy=x\,dx$.` },
        { label: "Integrate", body: t`$\frac{y^2}{2}=\frac{x^2}{2}+C_1$.` },
        { label: "Answer", body: t`$y^2=x^2+C$.` },
      ],
    },
  ],

  examples: [
    {
      title: "Variable separable with a condition",
      problem: t`Solve $\dfrac{dy}{dx}=xy$ given $y(0)=1$.`,
      steps: [
        { doit: t`$\dfrac{dy}{y}=x\,dx$`, why: t`Collect all the $y$ terms with $dy$ and all the $x$ terms with $dx$.` },
        { doit: t`$\ln y=\dfrac{x^2}{2}+C$`, why: t`Integrate both sides; $\int\frac{dy}{y}=\ln|y|$.` },
        { doit: t`$y(0)=1\Rightarrow C=0$`, why: t`Use the given condition to fix the constant.` },
      ],
      answer: t`$y=e^{x^2/2}$`,
    },
    {
      title: "Linear equation with an integrating factor",
      problem: t`Solve $\dfrac{dy}{dx}+y=e^{-x}$ given $y(0)=0$.`,
      steps: [
        { doit: t`$P=1,\ Q=e^{-x}$, $\ \text{I.F.}=e^{\int1\,dx}=e^x$`, why: t`The equation is already in the form $y'+Py=Q$.` },
        { doit: t`$ye^x=\int e^{-x}e^x\,dx=\int1\,dx=x+C$`, why: t`Multiply by the I.F.; the left side becomes the derivative of $y\cdot\text{I.F.}$.` },
        { doit: t`$y(0)=0\Rightarrow C=0$`, why: t`Fix the constant from the condition.` },
      ],
      answer: t`$y=xe^{-x}$`,
    },
    {
      title: "Homogeneous equation",
      problem: t`Solve $\dfrac{dy}{dx}=\dfrac{x+y}{x}$ given $y(1)=0$.`,
      steps: [
        { doit: t`Put $y=vx$: $v+x\dfrac{dv}{dx}=1+v$`, why: t`The right side is a function of $\frac yx=v$ only, so this substitution separates the variables.` },
        { doit: t`$x\dfrac{dv}{dx}=1\Rightarrow dv=\dfrac{dx}{x}\Rightarrow v=\ln x+C$`, why: t`The $v$ terms cancel; integrate both sides.` },
        { doit: t`$y=x(\ln x+C)$ and $y(1)=0\Rightarrow C=0$`, why: t`Return to $y=vx$ and use the condition.` },
      ],
      answer: t`$y=x\ln x$`,
    },
  ],

  cards: [
    c("Basics", t`Order and degree of a differential equation`, t`Order: highest derivative. Degree: power of the highest-order derivative (when the equation is a polynomial in the derivatives).`),
    c("Basics", t`Number of arbitrary constants in the general solution of an $n$th order equation`, t`$n$`),
    c("Basics", t`General vs particular solution`, t`General: contains arbitrary constants. Particular: constants fixed by given conditions.`),
    c("Methods", t`Variable separable method`, t`Write $g(y)\,dy=f(x)\,dx$ and integrate both sides.`),
    c("Methods", t`How do you solve a homogeneous equation $\frac{dy}{dx}=F\left(\frac yx\right)$?`, t`Put $y=vx$, so $\frac{dy}{dx}=v+x\frac{dv}{dx}$, then separate variables.`),
    c("Methods", t`Standard form of a linear equation and its integrating factor`, t`$\dfrac{dy}{dx}+Py=Q$, $\ \text{I.F.}=e^{\int P\,dx}$.`),
    c("Methods", t`Solution of $\dfrac{dy}{dx}+Py=Q$`, t`$$y\cdot e^{\int P\,dx}=\int Q\,e^{\int P\,dx}\,dx+C$$`),
    c("Methods", t`Linear equation in $x$: standard form and solution`, t`$\dfrac{dx}{dy}+P_1x=Q_1$; $\ x\cdot e^{\int P_1dy}=\int Q_1e^{\int P_1dy}dy+C$.`),
    c("Test", t`When is $\frac{dy}{dx}=F(x,y)$ homogeneous?`, t`When $F(\lambda x,\lambda y)=F(x,y)$, i.e. $F$ has degree $0$.`),
    c("Models", t`Solution of $\dfrac{dP}{dt}=kP$`, t`$P=P_0e^{kt}$.`),
    c("Forming", t`How do you form the differential equation of a family with $n$ constants?`, t`Differentiate $n$ times and eliminate the constants.`),
    c("Common mistake", t`Which one is defined by a polynomial equation: order or degree?`, t`Degree is defined only when the equation is a polynomial in the derivatives.`),
  ],
};
