import type { ChapterContent } from "../types";
import { HELP, cardMk, mk, num } from "../qhelpers";

const t = String.raw;
const q = mk("areaint");
const c = cardMk("areaint", "AI");
const AREA = t`Give the area in square units as a number (type pi if needed, e.g. 9pi).`;

export const areaint: ChapterContent = {
  id: "areaint",
  questions: [
    q("AIN-1", "Area under a curve", "direct", 1,
      t`Find the area bounded by $y=x^2$, the $x$-axis and the lines $x=0$ and $x=3$.`,
      num(9), t`$9$ sq. units`,
      [
        t`Area $=\int_0^3x^2\,dx$ (the curve lies above the $x$-axis).`,
        t`$\left[\dfrac{x^3}{3}\right]_0^3=9$.`,
      ],
      t`Integrate $y$ with respect to $x$ between the given limits.`,
      { input: HELP.num }),

    q("AIN-2", "Area under a line", "direct", 1,
      t`Find the area bounded by $y=2x$, the $x$-axis and $x=4$.`,
      num(16), t`$16$ sq. units`,
      [
        t`Area $=\int_0^42x\,dx=\left[x^2\right]_0^4=16$.`,
        t`Check: a triangle with base $4$ and height $8$ has area $\frac12\cdot4\cdot8=16$.`,
      ],
      t`The region is a triangle; you can also check with $\frac12\times$ base $\times$ height.`,
      { input: HELP.num }),

    q("AIN-3", "Area of a circle", "direct", 1,
      t`Using integration, the area enclosed by $x^2+y^2=9$ is: ${AREA}`,
      num(9 * Math.PI), t`$9\pi$ sq. units`,
      [
        t`The circle has radius $3$. By symmetry, area $=4\int_0^3\sqrt{9-x^2}\,dx$.`,
        t`$\int_0^3\sqrt{9-x^2}dx=\left[\frac x2\sqrt{9-x^2}+\frac92\sin^{-1}\frac x3\right]_0^3=\frac92\cdot\frac{\pi}{2}=\frac{9\pi}{4}$.`,
        t`Area $=4\cdot\dfrac{9\pi}{4}=9\pi$.`,
      ],
      t`Find the area of the first quadrant part and multiply by $4$.`,
      { input: HELP.num }),

    q("AIN-4", "Area between two curves", "short", 2,
      t`Find the area enclosed between $y=x$ and $y=x^2$.`,
      num(1 / 6), t`$\dfrac16$ sq. units`,
      [
        t`They meet where $x=x^2$: $x=0$ and $x=1$. On $(0,1)$ the line is above the parabola.`,
        t`Area $=\int_0^1\left(x-x^2\right)dx=\left[\dfrac{x^2}{2}-\dfrac{x^3}{3}\right]_0^1=\dfrac12-\dfrac13=\dfrac16$.`,
      ],
      t`Find the intersection points, then integrate (upper curve $-$ lower curve).`,
      { input: HELP.num }),

    q("AIN-5", "Area bounded by a parabola", "short", 2,
      t`Find the area enclosed by $y^2=4x$ and the line $x=4$.`,
      num(64 / 3), t`$\dfrac{64}{3}$ sq. units`,
      [
        t`The region is symmetric about the $x$-axis: Area $=2\int_0^4y\,dx=2\int_0^42\sqrt x\,dx$.`,
        t`$=4\left[\dfrac23x^{3/2}\right]_0^4=4\cdot\dfrac23\cdot8=\dfrac{64}{3}$.`,
      ],
      t`Double the area of the upper half, where $y=2\sqrt x$.`,
      { input: HELP.num }),

    q("AIN-6", "Area under a sine curve", "short", 2,
      t`Find the area under $y=\sin x$ from $x=0$ to $x=\pi$.`,
      num(2), t`$2$ sq. units`,
      [
        t`Area $=\int_0^{\pi}\sin x\,dx=\left[-\cos x\right]_0^{\pi}$.`,
        t`$=-\cos\pi+\cos0=1+1=2$.`,
      ],
      t`$\sin x\ge0$ on $[0,\pi]$, so the integral is the area.`,
      { input: HELP.num }),

    q("AIN-7", "Area of an ellipse", "short", 2,
      t`Find the area enclosed by $\dfrac{x^2}{4}+\dfrac{y^2}{9}=1$. ${AREA}`,
      num(6 * Math.PI), t`$6\pi$ sq. units`,
      [
        t`For $\frac{x^2}{a^2}+\frac{y^2}{b^2}=1$ the area is $\pi ab$.`,
        t`Here $a=2$, $b=3$: $6\pi$. (Derivation: $4\int_0^2\frac32\sqrt{4-x^2}\,dx=6\cdot\frac{\pi\cdot2^2}{4}\cdot\frac{4}{4}=6\pi$, since $\int_0^2\sqrt{4-x^2}dx=\pi$.)`,
      ],
      t`Use $\pi ab$ with the semi-axes $a=2$ and $b=3$.`,
      { input: HELP.num }),

    q("AIN-8", "Area between a parabola and a line", "short", 2,
      t`Find the area between $y=x^2$ and the line $y=4$.`,
      num(32 / 3), t`$\dfrac{32}{3}$ sq. units`,
      [
        t`They meet at $x=\pm2$. The line is above the parabola in between.`,
        t`Area $=\int_{-2}^{2}\left(4-x^2\right)dx=2\int_0^2\left(4-x^2\right)dx=2\left[4x-\dfrac{x^3}{3}\right]_0^2=2\left(8-\dfrac83\right)=\dfrac{32}{3}$.`,
      ],
      t`Use symmetry about the $y$-axis to simplify the limits.`,
      { input: HELP.num }),

    q("AIN-9", "Area under a hyperbola", "short", 2,
      t`Find the area under $y=\dfrac1x$ from $x=1$ to $x=e$.`,
      num(1), t`$1$ sq. unit`,
      [
        t`Area $=\int_1^e\dfrac{dx}{x}=\left[\ln x\right]_1^e=1-0=1$.`,
      ],
      t`The antiderivative of $\frac1x$ is $\ln x$.`,
      { input: HELP.num }),

    q("AIN-10", "Area between two curves", "short", 2,
      t`Find the area enclosed between $y=x^2$ and $y=x^3$.`,
      num(1 / 12), t`$\dfrac1{12}$ sq. units`,
      [
        t`They meet at $x=0$ and $x=1$; on $(0,1)$, $x^2>x^3$.`,
        t`Area $=\int_0^1\left(x^2-x^3\right)dx=\dfrac13-\dfrac14=\dfrac1{12}$.`,
      ],
      t`On $(0,1)$ the larger value is $x^2$, so integrate $x^2-x^3$.`,
      { input: HELP.num }),

    q("AIN-11", "Parabola and line", "exam", 3,
      t`Find the area of the region bounded by $y^2=x$ and the line $y=x-2$.`,
      num(4.5), t`$\dfrac92$ sq. units`,
      [
        t`Intersections: $y^2=y+2\Rightarrow y=-1$ or $y=2$ (points $(1,-1)$ and $(4,2)$).`,
        t`Integrate with respect to $y$: the line $x=y+2$ lies to the right of the parabola $x=y^2$.`,
        t`Area $=\int_{-1}^{2}\left(y+2-y^2\right)dy=\left[\dfrac{y^2}{2}+2y-\dfrac{y^3}{3}\right]_{-1}^{2}=\dfrac{10}{3}-\left(-\dfrac76\right)=\dfrac92$.`,
      ],
      t`Integrating with respect to $y$ avoids splitting the region.`,
      { input: HELP.num }),

    q("AIN-12", "Region with a modulus", "exam", 3,
      t`Find the area bounded by $y=|x|$ and $y=2$.`,
      num(4), t`$4$ sq. units`,
      [
        t`The lines $y=x$ and $y=-x$ meet $y=2$ at $x=\pm2$.`,
        t`Area $=\int_{-2}^{2}\left(2-|x|\right)dx=2\int_0^2(2-x)dx=2\left[2x-\dfrac{x^2}{2}\right]_0^2=2(4-2)=4$.`,
        t`Check: a triangle of base $4$ and height $2$ has area $4$.`,
      ],
      t`Use the symmetry of $|x|$ and integrate on $[0,2]$.`,
      { input: HELP.num }),

    q("AIN-13", "Circle and line", "exam", 3,
      t`Find the area of the smaller region (in the first quadrant) cut from $x^2+y^2=4$ by the line $x+y=2$. Give a decimal.`,
      num(Math.PI - 2), t`$\pi-2\approx1.142$ sq. units`,
      [
        t`The line meets the circle at $(2,0)$ and $(0,2)$.`,
        t`Area $=\int_0^2\left(\sqrt{4-x^2}-(2-x)\right)dx=\pi-2$ (a quarter-disc of area $\pi$ minus a triangle of area $2$).`,
      ],
      t`Quarter circle minus the right triangle with legs $2$ and $2$.`,
      { input: HELP.num }),

    q("AIN-C1", "Latus rectum region", "exam", 3,
      t`Find the area bounded by $y^2=4x$ and its latus rectum $x=1$. Give a decimal.`,
      num(8 / 3), t`$\dfrac83\approx2.667$ sq. units`,
      [
        t`For $y^2=4ax$ with $a=1$ the latus rectum is $x=a=1$.`,
        t`Area $=2\int_0^12\sqrt x\,dx=4\cdot\dfrac23=\dfrac83$.`,
      ],
      t`Double the area of the upper half between $x=0$ and $x=1$.`,
      { challenge: true, input: HELP.num }),

    q("AIN-C2", "Modulus and parabola", "exam", 3,
      t`Find the area of the region $\{(x,y):x^2\le y\le|x|\}$.`,
      num(1 / 3), t`$\dfrac13$ sq. units`,
      [
        t`$|x|\ge x^2$ exactly on $-1\le x\le1$. The region is symmetric about the $y$-axis.`,
        t`Area $=2\int_0^1\left(x-x^2\right)dx=2\left(\dfrac12-\dfrac13\right)=\dfrac13$.`,
      ],
      t`Use symmetry, and note that for $x\ge0$ the modulus is just $x$.`,
      { challenge: true, input: HELP.num }),

    q("AIN-C3", "Between sine and cosine", "exam", 3,
      t`Find the area bounded by $y=\sin x$, $y=\cos x$ and the $y$-axis (for $0\le x\le\frac{\pi}{4}$). Give a decimal.`,
      num(Math.SQRT2 - 1), t`$\sqrt2-1\approx0.414$ sq. units`,
      [
        t`They meet at $x=\frac{\pi}{4}$; on $\left[0,\frac{\pi}{4}\right]$, $\cos x\ge\sin x$.`,
        t`Area $=\int_0^{\pi/4}(\cos x-\sin x)\,dx=\left[\sin x+\cos x\right]_0^{\pi/4}=\sqrt2-1$.`,
      ],
      t`Decide which curve is on top on $[0,\frac{\pi}{4}]$ and integrate the difference.`,
      { challenge: true, input: HELP.num }),

    q("AIN-C4", "Circle and parabola", "exam", 3,
      t`Find the area of the region common to the circle $x^2+y^2=16$ and the parabola $y^2=6x$. Give a decimal.`,
      num((4 * Math.sqrt(3)) / 3 + (16 * Math.PI) / 3), t`$\dfrac{4\sqrt3}{3}+\dfrac{16\pi}{3}\approx19.06$ sq. units`,
      [
        t`Intersection: $x^2+6x=16\Rightarrow x=2$ (and $y=\pm2\sqrt3$).`,
        t`Area $=2\left[\int_0^2\sqrt{6x}\,dx+\int_2^4\sqrt{16-x^2}\,dx\right]$.`,
        t`First integral $=\dfrac{8\sqrt3}{3}$. Second $=\left[\frac x2\sqrt{16-x^2}+8\sin^{-1}\frac x4\right]_2^4=\dfrac{8\pi}{3}-2\sqrt3$.`,
        t`Area $=2\left(\dfrac{2\sqrt3}{3}+\dfrac{8\pi}{3}\right)=\dfrac{4\sqrt3}{3}+\dfrac{16\pi}{3}\approx19.06$.`,
      ],
      t`Find where the curves meet, then add the parabola part and the circle part, and use symmetry.`,
      { challenge: true, input: HELP.num }),
  ],

  revision: [
    {
      title: "Area formulas",
      kind: "formulas",
      items: [
        { label: "Under a curve (x-axis)", body: t`$$A=\int_a^b|y|\,dx=\int_a^b|f(x)|\,dx$$ Take the positive area for each part above/below the axis.` },
        { label: "Along the y-axis", body: t`$$A=\int_c^d|x|\,dy=\int_c^d|g(y)|\,dy$$` },
        { label: "Between two curves", body: t`$$A=\int_a^b\left[f(x)-g(x)\right]dx,\quad f\ge g\text{ on }[a,b]$$` },
        { label: "Standard areas", body: t`Circle $x^2+y^2=a^2$: $\pi a^2$. Ellipse $\frac{x^2}{a^2}+\frac{y^2}{b^2}=1$: $\pi ab$. Parabola $y^2=4ax$ and latus rectum: $\frac83a^2$.` },
      ],
    },
    {
      title: "Method",
      kind: "concepts",
      items: [
        { body: t`**Sketch** the region first. Find the points where the curves meet by solving them simultaneously: these give the limits.` },
        { body: t`Decide which curve is **above** (or to the right) and integrate upper $-$ lower.` },
        { body: t`If the region is symmetric about an axis, compute half and double it.` },
        { body: t`If the upper/lower curve changes inside $[a,b]$, split the integral at the crossing point.` },
        { body: t`Choose $dx$ or $dy$ so that you need **one** integral rather than two.` },
      ],
    },
    {
      title: "Common mistakes",
      kind: "mistakes",
      items: [
        { body: t`Not sketching, so the wrong curve is subtracted and a negative area appears.` },
        { body: t`Integrating over a range where the curve crosses the axis without splitting (positive and negative parts cancel).` },
        { body: t`Using the wrong limits: always get them from the intersection points.` },
        { body: t`Forgetting to double (or quadruple) after using symmetry.` },
      ],
    },
    {
      title: "Quick worked example",
      kind: "example",
      items: [
        { label: "Problem", body: t`Area between $y=x$ and $y=x^2$.` },
        { label: "Limits", body: t`$x=x^2\Rightarrow x=0,1$.` },
        { label: "Integral", body: t`$\int_0^1(x-x^2)\,dx=\frac12-\frac13$.` },
        { label: "Answer", body: t`$\dfrac16$ sq. units.` },
      ],
    },
  ],

  examples: [
    {
      title: "Area between a line and a parabola",
      problem: t`Find the area enclosed between $y=x$ and $y=x^2$.`,
      steps: [
        { doit: t`$x=x^2\Rightarrow x=0$ or $x=1$`, why: t`Solving the two equations together gives the limits of integration.` },
        { doit: t`For $0<x<1$: $x>x^2$`, why: t`Test a point such as $x=\frac12$ ($\frac12>\frac14$) to see which curve is on top.` },
        { doit: t`$A=\int_0^1\left(x-x^2\right)dx=\left[\dfrac{x^2}{2}-\dfrac{x^3}{3}\right]_0^1=\dfrac16$`, why: t`Integrate upper minus lower.` },
      ],
      answer: t`$\dfrac16$ square units`,
    },
    {
      title: "Area of an ellipse",
      problem: t`Find the area enclosed by $\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}=1$.`,
      steps: [
        { doit: t`$y=\dfrac ba\sqrt{a^2-x^2}$ in the first quadrant`, why: t`Solve the equation for $y$ (positive root) on the part of the ellipse above the $x$-axis.` },
        { doit: t`$A=4\int_0^a\dfrac ba\sqrt{a^2-x^2}\,dx$`, why: t`The ellipse is symmetric about both axes, so multiply the first-quadrant area by $4$.` },
        { doit: t`$\int_0^a\sqrt{a^2-x^2}dx=\dfrac{\pi a^2}{4}$, so $A=4\cdot\dfrac ba\cdot\dfrac{\pi a^2}{4}$`, why: t`The integral is the area of a quarter of a circle of radius $a$.` },
      ],
      answer: t`$\pi ab$ square units`,
    },
    {
      title: "Integrating with respect to y",
      problem: t`Find the area bounded by $y^2=x$ and $y=x-2$.`,
      steps: [
        { doit: t`$y^2=y+2\Rightarrow y=-1,\ 2$`, why: t`Write $x=y+2$ for the line, substitute into $x=y^2$ and solve for the limits in $y$.` },
        { doit: t`The line $x=y+2$ is to the right of $x=y^2$ between these values`, why: t`Integrating along $y$ means subtracting the left curve from the right curve.` },
        { doit: t`$A=\int_{-1}^{2}\left(y+2-y^2\right)dy=\left[\dfrac{y^2}{2}+2y-\dfrac{y^3}{3}\right]_{-1}^{2}=\dfrac92$`, why: t`Evaluate at both limits and subtract.` },
      ],
      answer: t`$\dfrac92$ square units`,
    },
  ],

  cards: [
    c("Formula", t`Area under $y=f(x)$ from $x=a$ to $x=b$ (curve above the $x$-axis)`, t`$$\int_a^bf(x)\,dx$$`),
    c("Formula", t`Area between $y=f(x)$ and $y=g(x)$, with $f\ge g$ on $[a,b]$`, t`$$\int_a^b\left[f(x)-g(x)\right]dx$$`),
    c("Formula", t`Area between a curve $x=g(y)$ and the $y$-axis from $y=c$ to $y=d$`, t`$$\int_c^d|g(y)|\,dy$$`),
    c("Standard", t`Area of the circle $x^2+y^2=a^2$`, t`$\pi a^2$`),
    c("Standard", t`Area of the ellipse $\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}=1$`, t`$\pi ab$`),
    c("Standard", t`Area enclosed by $y^2=4ax$ and its latus rectum $x=a$`, t`$\dfrac83a^2$`),
    c("Method", t`How do you find the limits of integration for the area between two curves?`, t`Solve the two equations simultaneously to get the intersection points.`),
    c("Method", t`What if the curve crosses the $x$-axis within $[a,b]$?`, t`Split at the crossing points and add the absolute values of the parts.`),
    c("Method", t`Why sketch the region first?`, t`To see which curve is on top and to choose between $dx$ and $dy$.`),
    c("Method", t`How do you use symmetry?`, t`Find the area of one symmetric part (half or quarter) and multiply.`),
    c("Standard", t`$\int_0^a\sqrt{a^2-x^2}\,dx$`, t`$\dfrac{\pi a^2}{4}$ (a quarter of a disc).`),
    c("Common mistake", t`Why can $\int_0^{2\pi}\sin x\,dx$ not be used as the area under one full wave?`, t`It equals $0$ because the positive and negative parts cancel; the area is $4$.`),
  ],
};
