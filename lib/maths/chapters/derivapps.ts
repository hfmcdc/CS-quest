import type { ChapterContent } from "../types";
import { HELP, cardMk, mcq, mk, num } from "../qhelpers";

const t = String.raw;
const q = mk("derivapps");
const c = cardMk("derivapps", "DA");

export const derivapps: ChapterContent = {
  id: "derivapps",
  questions: [
    q("DAP-1", "Rate of change", "direct", 1,
      t`The radius of a circle increases at $2$ cm/s. At what rate is its circumference increasing, in cm/s? (Type it as a multiple of pi, e.g. 5pi.)`,
      num(4 * Math.PI), t`$4\pi$ cm/s`,
      [
        t`Circumference $C=2\pi r$.`,
        t`$\dfrac{dC}{dt}=2\pi\dfrac{dr}{dt}=2\pi(2)=4\pi$ cm/s.`,
      ],
      t`Differentiate $C=2\pi r$ with respect to time.`,
      { input: HELP.num }),

    q("DAP-2", "Rate of change", "direct", 1,
      t`The side of a square sheet increases at $3$ cm/min. How fast is the area increasing when the side is $10$ cm? (cm²/min)`,
      num(60), t`$60$ cm²/min`,
      [
        t`Area $A=x^2$, so $\dfrac{dA}{dt}=2x\dfrac{dx}{dt}$.`,
        t`At $x=10$: $2(10)(3)=60$ cm²/min.`,
      ],
      t`$\frac{dA}{dt}=2x\frac{dx}{dt}$.`,
      { input: HELP.num }),

    q("DAP-3", "Increasing functions", "direct", 1,
      t`The function $f(x)=x^2-4x$ is strictly increasing on:`,
      mcq([t`$(2,\infty)$`, t`$(-\infty,2)$`, t`$(-\infty,\infty)$`, t`$(0,4)$`], 0),
      t`$(2,\infty)$`,
      [
        t`$f'(x)=2x-4=2(x-2)$.`,
        t`$f'(x)>0$ exactly when $x>2$, so $f$ is strictly increasing on $(2,\infty)$ (and decreasing on $(-\infty,2)$).`,
      ],
      t`Find where $f'(x)>0$.`),

    q("DAP-4", "Rate of change of volume", "short", 2,
      t`The radius of a sphere increases at $0.5$ cm/s. How fast is its volume increasing when $r=4$ cm? Give the coefficient of $\pi$ (cm³/s).`,
      num(32), t`$32\pi$ cm³/s (coefficient $32$)`,
      [
        t`$V=\frac43\pi r^3$, so $\dfrac{dV}{dt}=4\pi r^2\dfrac{dr}{dt}$.`,
        t`At $r=4$: $4\pi(16)(0.5)=32\pi$ cm³/s.`,
      ],
      t`$\frac{dV}{dt}=4\pi r^2\frac{dr}{dt}$.`,
      { input: t`Type the coefficient of $\pi$ only, for example 32 for $32\pi$.`, traps: [{ value: 32 * Math.PI, msg: t`The question asks for the coefficient of $\pi$, so the answer is $32$ (not $32\pi\approx100.5$).` }] }),

    q("DAP-5", "Slope of a tangent", "short", 2,
      t`Find the slope of the tangent to $y=x^3-3x+2$ at $x=2$.`,
      num(9), t`$9$`,
      [
        t`The slope of the tangent is $\dfrac{dy}{dx}$ at the point.`,
        t`$\dfrac{dy}{dx}=3x^2-3$.`,
        t`At $x=2$: $3(4)-3=9$.`,
      ],
      t`Differentiate and substitute $x=2$.`,
      { input: HELP.num }),

    q("DAP-6", "Equation of a tangent", "short", 2,
      t`The tangent to $y=x^2$ at $(2,4)$ crosses the $y$-axis at $y=$ ?`,
      num(-4), t`$-4$`,
      [
        t`$\dfrac{dy}{dx}=2x=4$ at $x=2$.`,
        t`Tangent: $y-4=4(x-2)$, i.e. $y=4x-4$.`,
        t`At $x=0$: $y=-4$.`,
      ],
      t`Write $y-y_1=m(x-x_1)$ with $m=\frac{dy}{dx}$ at the point, then put $x=0$.`,
      { input: HELP.num }),

    q("DAP-7", "Normal", "short", 2,
      t`Find the slope of the normal to $y=x^2$ at the point where $x=2$.`,
      num(-0.25), t`$-\dfrac14$`,
      [
        t`Slope of the tangent: $2x=4$ at $x=2$.`,
        t`The normal is perpendicular to the tangent, so its slope is the negative reciprocal: $-\dfrac14$.`,
      ],
      t`The normal's slope is $-\frac{1}{m}$ where $m$ is the tangent's slope.`,
      { input: HELP.num, traps: [{ value: 4, msg: t`$4$ is the slope of the tangent. The normal is perpendicular, so its slope is $-\frac{1}{4}$.` }] }),

    q("DAP-8", "Parallel to the x-axis", "short", 2,
      t`At which point on $y=x^2-4x+5$ is the tangent parallel to the $x$-axis? Give the $x$-coordinate.`,
      num(2), t`$x=2$ (the point is $(2,1)$)`,
      [
        t`A tangent parallel to the $x$-axis has slope $0$.`,
        t`$\dfrac{dy}{dx}=2x-4=0\Rightarrow x=2$.`,
        t`Then $y=4-8+5=1$, so the point is $(2,1)$.`,
      ],
      t`Parallel to the $x$-axis means slope $=0$.`,
      { input: HELP.num }),

    q("DAP-9", "Intervals of monotonicity", "short", 2,
      t`The function $f(x)=2x^3-9x^2+12x+1$ is strictly decreasing on the interval $(a,b)$. Find $b-a$.`,
      num(1), t`$1$ (the interval is $(1,2)$)`,
      [
        t`$f'(x)=6x^2-18x+12=6(x^2-3x+2)=6(x-1)(x-2)$.`,
        t`$f'(x)<0$ for $1<x<2$ (the product of the factors is negative there).`,
        t`So $f$ is strictly decreasing on $(1,2)$ and $b-a=1$.`,
      ],
      t`Factorise $f'(x)$ and test its sign between the roots.`,
      { input: HELP.num }),

    q("DAP-10", "Related rates", "exam", 3,
      t`A $5$ m ladder leans against a wall. Its foot slides away at $2$ m/s. How fast (in m/s) is the top sliding down when the foot is $3$ m from the wall? (Give the speed as a positive number.)`,
      num(1.5), t`$\dfrac32$ m/s`,
      [
        t`Let the foot be $x$ and the top $y$ metres from the corner: $x^2+y^2=25$.`,
        t`Differentiate: $2x\dfrac{dx}{dt}+2y\dfrac{dy}{dt}=0$, so $\dfrac{dy}{dt}=-\dfrac{x}{y}\dfrac{dx}{dt}$.`,
        t`When $x=3$, $y=4$: $\dfrac{dy}{dt}=-\dfrac34(2)=-\dfrac32$. The top slides down at $1.5$ m/s.`,
      ],
      t`Use $x^2+y^2=25$, differentiate with respect to time, and find $y$ at $x=3$ first.`,
      { input: HELP.num, traps: [{ value: 2, msg: t`$2$ m/s is the speed of the foot. The top moves at $\frac{x}{y}\cdot2=\frac34\cdot2$.` }] }),

    q("DAP-11", "Tangent through a point on a curve", "exam", 3,
      t`A tangent to the curve $y=x^3$ is parallel to the line $y=3x+7$ and touches the curve at a point with positive $x$-coordinate. Find its $y$-intercept.`,
      num(-2), t`$-2$ (tangent $y=3x-2$ at $(1,1)$)`,
      [
        t`Parallel to $y=3x+7$ means slope $3$: $3x^2=3\Rightarrow x=\pm1$.`,
        t`For $x=1$ the point is $(1,1)$ and the tangent is $y-1=3(x-1)$, i.e. $y=3x-2$.`,
        t`Its $y$-intercept is $-2$. (For $x=-1$ the tangent is $y=3x+2$.)`,
      ],
      t`Set $\frac{dy}{dx}=3$, find the points of contact, then write each tangent.`,
      { input: HELP.num }),

    q("DAP-12", "Increasing function with a parameter", "exam", 3,
      t`$f(x)=x^3+kx$ is increasing on all of $\mathbb{R}$. What is the least possible integer value of $k$?`,
      num(0), t`$0$`,
      [
        t`$f'(x)=3x^2+k$ must be $\ge0$ for every $x$ (with equality only at isolated points).`,
        t`Since $3x^2\ge0$ with minimum $0$, we need $k\ge0$.`,
        t`The least integer is $k=0$. (For $k=0$, $f'(x)=3x^2$ vanishes only at $x=0$, so $f$ is still strictly increasing.)`,
      ],
      t`The smallest value of $3x^2+k$ is $k$.`,
      { input: HELP.num }),

    q("DAP-C1", "Rate of change of area", "exam", 3,
      t`A circular oil slick's radius grows at $2$ cm/s. How fast is the area increasing when $r=5$ cm? Give the coefficient of $\pi$ (cm²/s).`,
      num(20), t`$20\pi$ cm²/s (coefficient $20$)`,
      [
        t`$A=\pi r^2$, so $\dfrac{dA}{dt}=2\pi r\dfrac{dr}{dt}$.`,
        t`At $r=5$: $2\pi(5)(2)=20\pi$ cm²/s.`,
      ],
      t`Differentiate $A=\pi r^2$ with respect to time.`,
      { challenge: true, input: t`Type the coefficient of $\pi$ only, for example 20 for $20\pi$.` }),

    q("DAP-C2", "Angle between a tangent and an axis", "exam", 3,
      t`The tangent to the curve $y=\sqrt3\,x^2$ at $x=\frac12$ makes what angle, in degrees, with the positive $x$-axis?`,
      num(60), t`$60^\circ$`,
      [
        t`$\dfrac{dy}{dx}=2\sqrt3\,x$. At $x=\dfrac12$ the slope is $\sqrt3$.`,
        t`$\tan\theta=\sqrt3\Rightarrow\theta=60^\circ$.`,
      ],
      t`The slope equals $\tan\theta$ where $\theta$ is the angle with the positive $x$-axis.`,
      { challenge: true, input: HELP.num }),

    q("DAP-C3", "Monotonic with a log", "exam", 3,
      t`The function $f(x)=\dfrac{\ln x}{x}$ is increasing on $(0,a)$ for the largest possible $a$. Find $a$ as a decimal (use $e\approx2.718$).`,
      num(Math.E), t`$a=e$`,
      [
        t`$f'(x)=\dfrac{\frac1x\cdot x-\ln x\cdot1}{x^2}=\dfrac{1-\ln x}{x^2}$.`,
        t`$f'(x)>0$ iff $\ln x<1$, i.e. $0<x<e$.`,
        t`So $f$ increases on $(0,e)$ and decreases on $(e,\infty)$: $a=e\approx2.718$.`,
      ],
      t`Use the quotient rule and decide when the numerator $1-\ln x$ is positive.`,
      { challenge: true, input: HELP.num }),
  ],

  revision: [
    {
      title: "Rate of change",
      kind: "formulas",
      items: [
        { label: "Meaning", body: t`$\dfrac{dy}{dx}$ is the rate of change of $y$ with respect to $x$. If both vary with time: $\dfrac{dy}{dt}=\dfrac{dy}{dx}\cdot\dfrac{dx}{dt}$.` },
        { label: "Area and circumference of a circle", body: t`$A=\pi r^2\Rightarrow\dfrac{dA}{dt}=2\pi r\dfrac{dr}{dt}$, $\quad C=2\pi r\Rightarrow\dfrac{dC}{dt}=2\pi\dfrac{dr}{dt}$.` },
        { label: "Sphere", body: t`$V=\frac43\pi r^3\Rightarrow\dfrac{dV}{dt}=4\pi r^2\dfrac{dr}{dt}$, $\quad S=4\pi r^2\Rightarrow\dfrac{dS}{dt}=8\pi r\dfrac{dr}{dt}$.` },
        { label: "Cube and square", body: t`$V=x^3\Rightarrow\dfrac{dV}{dt}=3x^2\dfrac{dx}{dt}$, $\quad A=x^2\Rightarrow\dfrac{dA}{dt}=2x\dfrac{dx}{dt}$.` },
      ],
    },
    {
      title: "Increasing and decreasing functions",
      kind: "formulas",
      items: [
        { label: "Test", body: t`On an interval: $f'(x)>0$ $\Rightarrow$ strictly increasing; $f'(x)<0$ $\Rightarrow$ strictly decreasing; $f'(x)\ge0$ (zero only at isolated points) still gives increasing.` },
        { label: "Procedure", body: t`Find $f'(x)$, solve $f'(x)=0$, mark the roots on a number line, and test the sign of $f'$ in each interval.` },
      ],
    },
    {
      title: "Tangents and normals",
      kind: "formulas",
      items: [
        { label: "Slope of tangent", body: t`$m=\left.\dfrac{dy}{dx}\right|_{(x_1,y_1)}$` },
        { label: "Tangent", body: t`$$y-y_1=m\,(x-x_1)$$` },
        { label: "Normal", body: t`$$y-y_1=-\frac{1}{m}\,(x-x_1)\qquad(m\ne0)$$` },
        { label: "Special cases", body: t`Tangent parallel to the $x$-axis: $m=0$. Tangent parallel to the $y$-axis (normal horizontal): $\frac{dy}{dx}$ is undefined, i.e. $\frac{dx}{dy}=0$. Tangent making angle $\theta$ with the $x$-axis: $m=\tan\theta$.` },
      ],
    },
    {
      title: "Key concepts",
      kind: "concepts",
      items: [
        { body: t`For related-rates problems: draw the figure, name the changing quantities, write one equation linking them, differentiate with respect to **time**, **then** substitute the numbers.` },
        { body: t`Substitute numerical values only **after** differentiating, otherwise quantities that are changing are treated as constants.` },
        { body: t`A negative rate means the quantity is decreasing.` },
        { body: t`Two lines are perpendicular when the product of their slopes is $-1$; the normal at a point is perpendicular to the tangent there.` },
      ],
    },
    {
      title: "Common mistakes",
      kind: "mistakes",
      items: [
        { body: t`Substituting the given value (such as $r=4$) **before** differentiating.` },
        { body: t`Using the slope of the tangent in place of the slope of the normal (or forgetting the negative reciprocal).` },
        { body: t`Forgetting $\frac{dr}{dt}$: $\frac{d}{dt}\left(r^2\right)=2r\frac{dr}{dt}$, not $2r$.` },
        { body: t`Reading monotonicity from the sign of $f(x)$ instead of $f'(x)$.` },
      ],
    },
    {
      title: "Quick worked example",
      kind: "example",
      items: [
        { label: "Problem", body: t`Find the tangent to $y=x^2$ at $(2,4)$.` },
        { label: "Slope", body: t`$\frac{dy}{dx}=2x=4$ at $x=2$.` },
        { label: "Line", body: t`$y-4=4(x-2)$.` },
        { label: "Answer", body: t`$y=4x-4$.` },
      ],
    },
  ],

  examples: [
    {
      title: "Rate of change of the area of a circle",
      problem: t`The radius of a circle increases at $3$ cm/s. Find the rate at which its area increases when $r=10$ cm.`,
      steps: [
        { doit: t`$A=\pi r^2$`, why: t`Write one equation that links the changing quantity (area) with the one whose rate is known (radius).` },
        { doit: t`$\dfrac{dA}{dt}=2\pi r\dfrac{dr}{dt}$`, why: t`Differentiate with respect to time $t$ using the chain rule, **before** substituting numbers.` },
        { doit: t`$=2\pi(10)(3)=60\pi$`, why: t`Now substitute $r=10$ and $\frac{dr}{dt}=3$.` },
      ],
      answer: t`The area increases at $60\pi$ cm²/s.`,
    },
    {
      title: "Intervals of increase and decrease",
      problem: t`Find the intervals on which $f(x)=2x^3-9x^2+12x+1$ is increasing or decreasing.`,
      steps: [
        { doit: t`$f'(x)=6x^2-18x+12=6(x-1)(x-2)$`, why: t`The sign of $f'$ decides whether $f$ rises or falls.` },
        { doit: t`$f'(x)=0$ at $x=1$ and $x=2$`, why: t`These points split the number line into the intervals $(-\infty,1)$, $(1,2)$ and $(2,\infty)$.` },
        { doit: t`Signs of $f'$: $+$ on $(-\infty,1)$, $-$ on $(1,2)$, $+$ on $(2,\infty)$`, why: t`Test one point in each interval, for example $f'(0)=12>0$, $f'(1.5)=-4.5<0$, $f'(3)=12>0$.` },
      ],
      answer: t`Increasing on $(-\infty,1)$ and $(2,\infty)$; decreasing on $(1,2)$.`,
    },
    {
      title: "Tangent and normal at a point",
      problem: t`Find the equations of the tangent and the normal to $y=x^3$ at $(1,1)$.`,
      steps: [
        { doit: t`$\dfrac{dy}{dx}=3x^2=3$ at $x=1$`, why: t`The slope of the tangent is the derivative at the point.` },
        { doit: t`Tangent: $y-1=3(x-1)\Rightarrow y=3x-2$`, why: t`Use the point-slope form with the tangent's slope.` },
        { doit: t`Normal: $y-1=-\dfrac13(x-1)\Rightarrow x+3y=4$`, why: t`The normal is perpendicular to the tangent, so its slope is $-\frac13$.` },
      ],
      answer: t`Tangent: $y=3x-2$. Normal: $x+3y=4$.`,
    },
  ],

  cards: [
    c("Rate of change", t`Meaning of $\dfrac{dy}{dx}$ and the chain rule for rates`, t`$\frac{dy}{dx}$ is the rate of change of $y$ with respect to $x$.\n$$\frac{dy}{dt}=\frac{dy}{dx}\cdot\frac{dx}{dt}$$`),
    c("Rate of change", t`$\dfrac{dA}{dt}$ and $\dfrac{dC}{dt}$ for a circle`, t`$\dfrac{dA}{dt}=2\pi r\dfrac{dr}{dt}$ and $\dfrac{dC}{dt}=2\pi\dfrac{dr}{dt}$.`),
    c("Rate of change", t`$\dfrac{dV}{dt}$ for a sphere and for a cube of side $x$`, t`Sphere: $4\pi r^2\dfrac{dr}{dt}$. Cube: $3x^2\dfrac{dx}{dt}$.`),
    c("Rate of change", t`When do you substitute the numbers in a related-rates problem?`, t`After differentiating with respect to time, never before.`),
    c("Monotonicity", t`Test for a strictly increasing function`, t`$f'(x)>0$ on the interval.`),
    c("Monotonicity", t`Test for a strictly decreasing function`, t`$f'(x)<0$ on the interval.`),
    c("Monotonicity", t`Procedure to find intervals of increase/decrease`, t`Find $f'$, solve $f'=0$, mark the roots on a number line and test the sign of $f'$ in each interval.`),
    c("Tangent", t`Equation of the tangent at $(x_1,y_1)$`, t`$$y-y_1=\left.\frac{dy}{dx}\right|_{(x_1,y_1)}(x-x_1)$$`),
    c("Normal", t`Equation of the normal at $(x_1,y_1)$`, t`$$y-y_1=-\frac{1}{m}(x-x_1),\quad m=\left.\frac{dy}{dx}\right|_{(x_1,y_1)}$$`),
    c("Tangent", t`Condition for a tangent to be parallel to the $x$-axis; to the $y$-axis`, t`$x$-axis: $\frac{dy}{dx}=0$.\n$y$-axis: $\frac{dx}{dy}=0$ ($\frac{dy}{dx}$ undefined).`),
    c("Tangent", t`Slope of a tangent that makes an angle $\theta$ with the positive $x$-axis`, t`$m=\tan\theta$.`),
    c("Normal", t`Relation between the slopes of the tangent and the normal`, t`Their product is $-1$ (perpendicular lines).`),
    c("Common mistake", t`$\dfrac{d}{dt}\left(r^2\right)$ when $r$ depends on $t$`, t`$2r\dfrac{dr}{dt}$, not $2r$.`),
  ],
};
