import type { MathTopicId, WorkedExample } from "./types";

const t = String.raw;

export const EXAMPLES: Record<MathTopicId, WorkedExample[]> = {
  itf: [
    {
      title: "Principal value of a negative argument",
      problem: t`Find the principal value of $\sin^{-1}\left(-\frac{1}{2}\right)$.`,
      steps: [
        { doit: t`$\sin^{-1}\left(-\frac12\right)=-\sin^{-1}\frac12$`, why: t`$\sin^{-1}$ is an odd function, so the minus sign can be taken outside.` },
        { doit: t`$\sin\frac{\pi}{6}=\frac12$`, why: t`Recall the standard value and look for the angle whose sine is $\frac12$.` },
        { doit: t`$\frac{\pi}{6}\in\left[-\frac{\pi}{2},\frac{\pi}{2}\right]$, so $\sin^{-1}\frac12=\frac{\pi}{6}$`, why: t`The principal value must lie in the principal branch $\left[-\frac{\pi}{2},\frac{\pi}{2}\right]$.` },
      ],
      answer: t`$-\dfrac{\pi}{6}$`,
    },
    {
      title: "sin⁻¹(sin x) when x is outside the principal range",
      problem: t`Evaluate $\sin^{-1}\left(\sin\frac{2\pi}{3}\right)$.`,
      steps: [
        { doit: t`$\frac{2\pi}{3}\notin\left[-\frac{\pi}{2},\frac{\pi}{2}\right]$`, why: t`$\sin^{-1}(\sin\theta)=\theta$ only inside the principal range, so we cannot answer $\frac{2\pi}{3}$ directly.` },
        { doit: t`$\sin\frac{2\pi}{3}=\sin\left(\pi-\frac{2\pi}{3}\right)=\sin\frac{\pi}{3}$`, why: t`Use $\sin(\pi-\theta)=\sin\theta$ to find an equivalent angle inside the range.` },
        { doit: t`$\sin^{-1}\left(\sin\frac{\pi}{3}\right)=\frac{\pi}{3}$`, why: t`$\frac{\pi}{3}$ is inside $\left[-\frac{\pi}{2},\frac{\pi}{2}\right]$, so the identity now applies.` },
      ],
      answer: t`$\frac{\pi}{3}$`,
    },
    {
      title: "Adding two inverse tangents",
      problem: t`Show that $\tan^{-1}\frac12+\tan^{-1}\frac13=\frac{\pi}{4}$.`,
      steps: [
        { doit: t`$xy=\frac12\cdot\frac13=\frac16<1$`, why: t`The formula $\tan^{-1}x+\tan^{-1}y=\tan^{-1}\frac{x+y}{1-xy}$ is valid only when $xy<1$.` },
        { doit: t`$\dfrac{\frac12+\frac13}{1-\frac16}=\dfrac{\frac56}{\frac56}=1$`, why: t`Substitute $x=\frac12$ and $y=\frac13$ into the formula.` },
        { doit: t`$\tan^{-1}1=\frac{\pi}{4}$`, why: t`$\tan\frac{\pi}{4}=1$ and $\frac{\pi}{4}$ lies in the principal range $\left(-\frac{\pi}{2},\frac{\pi}{2}\right)$.` },
      ],
      answer: t`The left side equals $\frac{\pi}{4}$, as required.`,
    },
  ],

  vectors: [
    {
      title: "Magnitude and unit vector",
      problem: t`Find the magnitude and the unit vector of $\vec{a}=2\hat{i}-3\hat{j}+6\hat{k}$.`,
      steps: [
        { doit: t`$|\vec{a}|=\sqrt{2^2+(-3)^2+6^2}=\sqrt{4+9+36}=\sqrt{49}=7$`, why: t`Magnitude is the square root of the sum of the squares of the components.` },
        { doit: t`$\hat{a}=\dfrac{\vec{a}}{|\vec{a}|}=\dfrac{2\hat{i}-3\hat{j}+6\hat{k}}{7}$`, why: t`A unit vector is the vector divided by its own magnitude.` },
      ],
      answer: t`$|\vec{a}|=7$ and $\hat{a}=\frac27\hat{i}-\frac37\hat{j}+\frac67\hat{k}$`,
    },
    {
      title: "Cross product and area of a triangle",
      problem: t`Find the area of the triangle with vertices $A(1,1,2)$, $B(2,3,5)$, $C(1,5,5)$.`,
      steps: [
        { doit: t`$\overrightarrow{AB}=\hat{i}+2\hat{j}+3\hat{k},\quad \overrightarrow{AC}=0\hat{i}+4\hat{j}+3\hat{k}$`, why: t`Two sides from the same vertex give the vectors whose cross product we need.` },
        { doit: t`$\overrightarrow{AB}\times\overrightarrow{AC}=(6-12)\hat{i}-(3-0)\hat{j}+(4-0)\hat{k}=-6\hat{i}-3\hat{j}+4\hat{k}$`, why: t`Expand the determinant; the $\hat{j}$ term carries a minus sign.` },
        { doit: t`$|\overrightarrow{AB}\times\overrightarrow{AC}|=\sqrt{36+9+16}=\sqrt{61}$`, why: t`The magnitude of the cross product is the area of the parallelogram on the two sides.` },
        { doit: t`$\text{Area}=\frac12\sqrt{61}$`, why: t`The triangle is half the parallelogram.` },
      ],
      answer: t`$\frac{\sqrt{61}}{2}$ square units`,
    },
    {
      title: "Perpendicular vectors and the value of λ",
      problem: t`Find $\lambda$ if $\vec{a}=2\hat{i}+\lambda\hat{j}+\hat{k}$ and $\vec{b}=\hat{i}-2\hat{j}+3\hat{k}$ are perpendicular.`,
      steps: [
        { doit: t`$\vec{a}\cdot\vec{b}=0$`, why: t`Two non-zero vectors are perpendicular exactly when their dot product is zero.` },
        { doit: t`$(2)(1)+(\lambda)(-2)+(1)(3)=5-2\lambda$`, why: t`Multiply corresponding components and add.` },
        { doit: t`$5-2\lambda=0\Rightarrow\lambda=\frac52$`, why: t`Solve the linear equation for $\lambda$.` },
      ],
      answer: t`$\lambda=\frac52$`,
    },
  ],

  geometry3d: [
    {
      title: "Direction cosines of a line through two points",
      problem: t`Find the direction cosines of the line passing through $P(-2,4,-5)$ and $Q(1,2,3)$.`,
      steps: [
        { doit: t`$(1+2,\ 2-4,\ 3+5)=(3,-2,8)$`, why: t`Differences of coordinates give direction ratios.` },
        { doit: t`$\sqrt{3^2+(-2)^2+8^2}=\sqrt{77}$`, why: t`This is the normalising factor that turns ratios into cosines.` },
        { doit: t`$l=\frac{3}{\sqrt{77}},\ m=\frac{-2}{\sqrt{77}},\ n=\frac{8}{\sqrt{77}}$`, why: t`Divide each direction ratio by the normalising factor. Check: $l^2+m^2+n^2=\frac{9+4+64}{77}=1$.` },
      ],
      answer: t`$\left(\frac{3}{\sqrt{77}},\ \frac{-2}{\sqrt{77}},\ \frac{8}{\sqrt{77}}\right)$`,
    },
    {
      title: "Angle between two lines",
      problem: t`Find the angle between the lines $\dfrac{x+3}{3}=\dfrac{y-1}{5}=\dfrac{z+3}{4}$ and $\dfrac{x+1}{1}=\dfrac{y-4}{1}=\dfrac{z-5}{2}$.`,
      steps: [
        { doit: t`Direction ratios: $(3,5,4)$ and $(1,1,2)$`, why: t`Read them from the denominators; the coefficients of $x,y,z$ are already $1$.` },
        { doit: t`$a_1a_2+b_1b_2+c_1c_2=3+5+8=16$`, why: t`This is the dot product of the two direction vectors.` },
        { doit: t`$\sqrt{9+25+16}=5\sqrt2,\quad \sqrt{1+1+4}=\sqrt6$`, why: t`Magnitudes of the two direction vectors.` },
        { doit: t`$\cos\theta=\dfrac{16}{5\sqrt2\cdot\sqrt6}=\dfrac{16}{10\sqrt3}=\dfrac{8}{5\sqrt3}$`, why: t`Apply the angle formula; $\sqrt2\cdot\sqrt6=\sqrt{12}=2\sqrt3$.` },
      ],
      answer: t`$\theta=\cos^{-1}\left(\frac{8}{5\sqrt3}\right)$`,
    },
    {
      title: "Equation of a line through a point, parallel to a vector",
      problem: t`Find the vector and Cartesian equations of the line through $A(5,2,-4)$ that is parallel to $3\hat{i}+2\hat{j}-8\hat{k}$.`,
      steps: [
        { doit: t`$\vec{a}=5\hat{i}+2\hat{j}-4\hat{k},\quad \vec{b}=3\hat{i}+2\hat{j}-8\hat{k}$`, why: t`A line needs a point on it and a direction vector.` },
        { doit: t`$\vec{r}=5\hat{i}+2\hat{j}-4\hat{k}+\lambda(3\hat{i}+2\hat{j}-8\hat{k})$`, why: t`Substitute into $\vec{r}=\vec{a}+\lambda\vec{b}$.` },
        { doit: t`$\dfrac{x-5}{3}=\dfrac{y-2}{2}=\dfrac{z+4}{-8}$`, why: t`Eliminate $\lambda$ using the components. Note $z-(-4)=z+4$.` },
      ],
      answer: t`$\vec{r}=5\hat{i}+2\hat{j}-4\hat{k}+\lambda(3\hat{i}+2\hat{j}-8\hat{k})$; $\ \frac{x-5}{3}=\frac{y-2}{2}=\frac{z+4}{-8}$`,
    },
  ],

  maxmin: [
    {
      title: "Local maximum and minimum by the second derivative test",
      problem: t`Find the local maximum and local minimum values of $f(x)=x^3-6x^2+9x+15$.`,
      steps: [
        { doit: t`$f'(x)=3x^2-12x+9=3(x-1)(x-3)$`, why: t`Critical points are where $f'(x)=0$.` },
        { doit: t`$x=1$ or $x=3$`, why: t`Solve $f'(x)=0$.` },
        { doit: t`$f''(x)=6x-12$`, why: t`The second derivative decides the nature of each critical point.` },
        { doit: t`$f''(1)=-6<0$ (local max), $\quad f''(3)=6>0$ (local min)`, why: t`$f''<0$ means the graph bends downwards (maximum); $f''>0$ means upwards (minimum).` },
        { doit: t`$f(1)=1-6+9+15=19,\quad f(3)=27-54+27+15=15$`, why: t`The question asks for the **values**, so substitute back into $f$.` },
      ],
      answer: t`Local maximum value $19$ (at $x=1$); local minimum value $15$ (at $x=3$).`,
    },
    {
      title: "Absolute maximum and minimum on a closed interval",
      problem: t`Find the absolute maximum and minimum of $f(x)=2x^3-15x^2+36x+1$ on $[1,5]$.`,
      steps: [
        { doit: t`$f'(x)=6x^2-30x+36=6(x-2)(x-3)$`, why: t`Find the critical points inside the interval.` },
        { doit: t`Critical points $x=2,\ 3$ (both lie in $[1,5]$)`, why: t`Only critical points inside the interval are candidates.` },
        { doit: t`$f(1)=24,\ f(2)=29,\ f(3)=28,\ f(5)=56$`, why: t`Evaluate $f$ at the critical points **and** at both end-points.` },
        { doit: t`Largest is $56$, smallest is $24$`, why: t`Compare the values; the extremes can occur at an end-point.` },
      ],
      answer: t`Absolute maximum $56$ (at $x=5$); absolute minimum $24$ (at $x=1$).`,
    },
    {
      title: "An optimisation word problem",
      problem: t`A square sheet of side $18$ cm has a square of side $x$ cm cut from each corner, and the flaps are folded up to form an open box. Find the maximum volume of the box.`,
      steps: [
        { doit: t`$V=x(18-2x)^2,\quad 0<x<9$`, why: t`Base side is $18-2x$ and height is $x$. The domain keeps all lengths positive.` },
        { doit: t`$V'=(18-2x)^2-4x(18-2x)=(18-2x)(18-6x)$`, why: t`Product rule, then factorise to solve $V'=0$ easily.` },
        { doit: t`$V'=0\Rightarrow x=3$ (since $x=9$ is outside the domain)`, why: t`Reject the critical point that is not allowed by the problem.` },
        { doit: t`$V''=24x-144,\quad V''(3)=-72<0$`, why: t`A negative second derivative confirms a maximum.` },
        { doit: t`$V(3)=3\cdot12^2=432$`, why: t`Substitute back to get the maximum **volume**.` },
      ],
      answer: t`Maximum volume $=432\ \text{cm}^3$, when $x=3$ cm.`,
    },
  ],

  integrals: [
    {
      title: "Substitution",
      problem: t`Evaluate $\int\frac{\sin\sqrt{x}}{\sqrt{x}}\,dx$.`,
      steps: [
        { doit: t`Put $t=\sqrt{x}$, so $dt=\frac{dx}{2\sqrt{x}}$ and $\frac{dx}{\sqrt{x}}=2\,dt$`, why: t`The derivative of the inner function $\sqrt{x}$ is present in the integrand, which signals substitution.` },
        { doit: t`$\int\sin t\cdot2\,dt=-2\cos t+C$`, why: t`The integral is now a standard one.` },
        { doit: t`$=-2\cos\sqrt{x}+C$`, why: t`Return to the original variable.` },
      ],
      answer: t`$-2\cos\sqrt{x}+C$. Check: $\frac{d}{dx}(-2\cos\sqrt{x})=2\sin\sqrt{x}\cdot\frac{1}{2\sqrt{x}}=\frac{\sin\sqrt{x}}{\sqrt{x}}$ ✓`,
    },
    {
      title: "Using a trigonometric identity",
      problem: t`Evaluate $\int\sin^2x\,dx$.`,
      steps: [
        { doit: t`$\sin^2x=\frac{1-\cos2x}{2}$`, why: t`$\sin^2x$ has no direct antiderivative, so rewrite it with a power-reducing identity.` },
        { doit: t`$\int\frac{1-\cos2x}{2}\,dx=\frac{x}{2}-\frac12\int\cos2x\,dx$`, why: t`Integrate term by term.` },
        { doit: t`$=\frac{x}{2}-\frac{\sin2x}{4}+C$`, why: t`$\int\cos2x\,dx=\frac{\sin2x}{2}$, using the linear-argument rule.` },
      ],
      answer: t`$\frac{x}{2}-\frac{\sin2x}{4}+C$`,
    },
    {
      title: "Completing the square (Exercise 7.4 type)",
      problem: t`Evaluate $\int\frac{dx}{\sqrt{8+3x-x^2}}$.`,
      steps: [
        { doit: t`$8+3x-x^2=8-\left(x^2-3x\right)=8+\frac94-\left(x-\frac32\right)^2$`, why: t`Complete the square so the expression becomes $a^2-u^2$.` },
        { doit: t`$=\frac{41}{4}-\left(x-\frac32\right)^2=\left(\frac{\sqrt{41}}{2}\right)^2-\left(x-\frac32\right)^2$`, why: t`Now it matches $a^2-x^2$ with $a=\frac{\sqrt{41}}{2}$.` },
        { doit: t`$\int\frac{dx}{\sqrt{a^2-u^2}}=\sin^{-1}\frac{u}{a}$ with $u=x-\frac32$`, why: t`Use the standard form; the substitution $u=x-\frac32$ has $du=dx$.` },
        { doit: t`$\sin^{-1}\frac{x-\frac32}{\frac{\sqrt{41}}{2}}=\sin^{-1}\frac{2x-3}{\sqrt{41}}$`, why: t`Multiply numerator and denominator by $2$ to simplify.` },
      ],
      answer: t`$\sin^{-1}\left(\frac{2x-3}{\sqrt{41}}\right)+C$`,
    },
  ],
};
