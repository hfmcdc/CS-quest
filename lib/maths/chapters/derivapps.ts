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

    q("DAP-5", "Rate of change of volume", "direct", 1,
      t`The edge of a cube increases at $3$ cm/s. How fast is its volume increasing when the edge is $2$ cm? (cm³/s)`,
      num(36), t`$36$ cm³/s`,
      [
        t`$V=x^3$, so $\dfrac{dV}{dt}=3x^2\dfrac{dx}{dt}$.`,
        t`At $x=2$: $3(4)(3)=36$ cm³/s.`,
      ],
      t`Differentiate $V=x^3$ with respect to time.`,
      { input: HELP.num }),
    q("DAP-6", "Increasing and decreasing", "direct", 1,
      t`The function $f(x)=e^{-x}$ is:`,
      mcq([t`Strictly decreasing on $\mathbb{R}$`, t`Strictly increasing on $\mathbb{R}$`, t`Increasing for $x>0$ only`, t`Neither increasing nor decreasing`], 0),
      t`Strictly decreasing on $\mathbb{R}$`,
      [
        t`$f'(x)=-e^{-x}$.`,
        t`Since $e^{-x}>0$ for every $x$, $f'(x)<0$ everywhere, so $f$ is strictly decreasing on $\mathbb{R}$.`,
      ],
      t`Find the sign of $f'(x)$.`),
    q("DAP-7", "Intervals of monotonicity", "short", 2,
      t`The function $f(x)=x^3-3x$ is strictly increasing on:`,
      mcq([
        t`$(-\infty,-1)\cup(1,\infty)$`,
        t`$(-1,1)$`,
        t`$(-\infty,\infty)$`,
        t`$(0,\infty)$`,
      ], 0),
      t`$(-\infty,-1)\cup(1,\infty)$`,
      [
        t`$f'(x)=3x^2-3=3(x-1)(x+1)$.`,
        t`$f'(x)>0$ for $x<-1$ and for $x>1$, and $f'(x)<0$ for $-1<x<1$.`,
      ],
      t`Factorise $f'(x)$ and check its sign in each interval.`),
    q("DAP-8", "Rate of change of the radius", "short", 2,
      t`The volume of a spherical balloon increases at $900$ cm³/s. How fast is the radius increasing when $r=15$ cm? Give a decimal (cm/s).`,
      num(1 / Math.PI), t`$\dfrac1\pi\approx0.318$ cm/s`,
      [
        t`$V=\frac43\pi r^3$, so $\dfrac{dV}{dt}=4\pi r^2\dfrac{dr}{dt}$.`,
        t`$900=4\pi(225)\dfrac{dr}{dt}=900\pi\dfrac{dr}{dt}$.`,
        t`$\dfrac{dr}{dt}=\dfrac1\pi\approx0.318$ cm/s.`,
      ],
      t`Substitute $\frac{dV}{dt}=900$ and $r=15$ into $\frac{dV}{dt}=4\pi r^2\frac{dr}{dt}$.`,
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

    q("DAP-11", "Point where one coordinate changes faster", "exam", 3,
      t`A point moves on the curve $y=x^3$. At which point with positive $x$-coordinate is the $y$-coordinate changing $12$ times as fast as the $x$-coordinate? Give $x$.`,
      num(2), t`$x=2$ (the point is $(2,8)$)`,
      [
        t`$\dfrac{dy}{dt}=3x^2\dfrac{dx}{dt}$.`,
        t`Given $\dfrac{dy}{dt}=12\dfrac{dx}{dt}$: $3x^2=12$, so $x=\pm2$.`,
        t`The positive value is $x=2$, giving the point $(2,8)$.`,
      ],
      t`Write $\frac{dy}{dt}$ in terms of $\frac{dx}{dt}$ using the chain rule.`,
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

    q("DAP-C2", "Rate of change of surface area", "exam", 3,
      t`The radius of a sphere increases at $0.5$ cm/s. How fast is its surface area increasing when $r=10$ cm? Give the coefficient of $\pi$ (cm²/s).`,
      num(40), t`$40\pi$ cm²/s (coefficient $40$)`,
      [
        t`$S=4\pi r^2$, so $\dfrac{dS}{dt}=8\pi r\dfrac{dr}{dt}$.`,
        t`At $r=10$: $8\pi(10)(0.5)=40\pi$ cm²/s.`,
      ],
      t`Differentiate $S=4\pi r^2$ with respect to time.`,
      { challenge: true, input: t`Type the coefficient of $\pi$ only, for example 40 for $40\pi$.` }),
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
      title: "Key concepts",
      kind: "concepts",
      items: [
        { body: t`For related-rates problems: draw the figure, name the changing quantities, write one equation linking them, differentiate with respect to **time**, **then** substitute the numbers.` },
        { body: t`Substitute numerical values only **after** differentiating, otherwise quantities that are changing are treated as constants.` },
        { body: t`A negative rate means the quantity is decreasing.` },
        { body: t`If $y$ changes $k$ times as fast as $x$, then $\frac{dy}{dt}=k\frac{dx}{dt}$, i.e. $\frac{dy}{dx}=k$.` },
      ],
    },
    {
      title: "Common mistakes",
      kind: "mistakes",
      items: [
        { body: t`Substituting the given value (such as $r=4$) **before** differentiating.` },
        { body: t`Dropping the sign: a negative rate means the quantity is decreasing.` },
        { body: t`Forgetting $\frac{dr}{dt}$: $\frac{d}{dt}\left(r^2\right)=2r\frac{dr}{dt}$, not $2r$.` },
        { body: t`Reading monotonicity from the sign of $f(x)$ instead of $f'(x)$.` },
      ],
    },
    {
      title: "Quick worked example",
      kind: "example",
      items: [
        { label: "Problem", body: t`A cube's edge grows at $3$ cm/s. Find $\frac{dV}{dt}$ when the edge is $2$ cm.` },
        { label: "Equation", body: t`$V=x^3\Rightarrow\frac{dV}{dt}=3x^2\frac{dx}{dt}$.` },
        { label: "Substitute", body: t`$3(4)(3)$.` },
        { label: "Answer", body: t`$36$ cm³/s.` },
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
      title: "A related-rates problem (ladder)",
      problem: t`A $5$ m ladder leans on a wall. Its foot slides away at $2$ m/s. How fast is the top sliding down when the foot is $3$ m from the wall?`,
      steps: [
        { doit: t`$x^2+y^2=25$`, why: t`Let $x$ and $y$ be the foot's and top's distances from the corner; the ladder's length is fixed.` },
        { doit: t`$2x\dfrac{dx}{dt}+2y\dfrac{dy}{dt}=0\Rightarrow\dfrac{dy}{dt}=-\dfrac xy\dfrac{dx}{dt}$`, why: t`Differentiate with respect to time **before** substituting numbers.` },
        { doit: t`When $x=3$: $y=4$, so $\dfrac{dy}{dt}=-\dfrac34(2)=-\dfrac32$`, why: t`The negative sign means $y$ is decreasing: the top slides down.` },
      ],
      answer: t`The top slides down at $1.5$ m/s.`,
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
    c("Rate of change", t`If $y$ changes $k$ times as fast as $x$, what is $\dfrac{dy}{dx}$?`, t`$k$, because $\dfrac{dy}{dt}=k\dfrac{dx}{dt}$.`),
    c("Monotonicity", t`Is $f(x)=x^3$ increasing even though $f'(0)=0$?`, t`Yes. $f'(x)=3x^2\ge0$ and is zero only at an isolated point, so $f$ is strictly increasing.`),
    c("Rate of change", t`Rate of change of the surface area of a sphere`, t`$\dfrac{dS}{dt}=8\pi r\dfrac{dr}{dt}$`),
    c("Common mistake", t`$\dfrac{d}{dt}\left(r^2\right)$ when $r$ depends on $t$`, t`$2r\dfrac{dr}{dt}$, not $2r$.`),
  ],
};
