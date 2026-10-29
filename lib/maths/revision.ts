import type { MathTopicId, RevisionSection } from "./types";

const t = String.raw;

export const REVISION: Record<MathTopicId, RevisionSection[]> = {
  // ------------------------------------------------------------------ Inverse trigonometric functions
  itf: [
    {
      title: "Principal value branches",
      kind: "formulas",
      items: [
        { label: "sin⁻¹ x", body: t`$$\text{Domain } [-1,1],\quad \text{Range } \left[-\frac{\pi}{2},\frac{\pi}{2}\right]$$` },
        { label: "cos⁻¹ x", body: t`$$\text{Domain } [-1,1],\quad \text{Range } [0,\pi]$$` },
        { label: "tan⁻¹ x", body: t`$$\text{Domain } (-\infty,\infty),\quad \text{Range } \left(-\frac{\pi}{2},\frac{\pi}{2}\right)$$` },
        { label: "cot⁻¹ x", body: t`$$\text{Domain } (-\infty,\infty),\quad \text{Range } (0,\pi)$$` },
        { label: "sec⁻¹ x", body: t`$$\text{Domain } |x|\ge 1,\quad \text{Range } [0,\pi]-\left\{\frac{\pi}{2}\right\}$$` },
        { label: "cosec⁻¹ x", body: t`$$\text{Domain } |x|\ge 1,\quad \text{Range } \left[-\frac{\pi}{2},\frac{\pi}{2}\right]-\{0\}$$` },
      ],
    },
    {
      title: "Important formulas and identities",
      kind: "formulas",
      items: [
        { label: "Negative arguments", body: t`$$\sin^{-1}(-x)=-\sin^{-1}x,\quad \tan^{-1}(-x)=-\tan^{-1}x,\quad \text{cosec}^{-1}(-x)=-\text{cosec}^{-1}x$$` },
        { label: "Negative arguments (π − form)", body: t`$$\cos^{-1}(-x)=\pi-\cos^{-1}x,\quad \cot^{-1}(-x)=\pi-\cot^{-1}x,\quad \sec^{-1}(-x)=\pi-\sec^{-1}x$$` },
        { label: "Complementary pairs", body: t`$$\sin^{-1}x+\cos^{-1}x=\frac{\pi}{2}\ (|x|\le 1),\qquad \tan^{-1}x+\cot^{-1}x=\frac{\pi}{2}\ (\text{all real } x)$$` },
        { label: "Reciprocal forms", body: t`$$\sin^{-1}\frac{1}{x}=\text{cosec}^{-1}x,\quad \cos^{-1}\frac{1}{x}=\sec^{-1}x,\quad \tan^{-1}\frac{1}{x}=\cot^{-1}x\ (x>0)$$` },
        { label: "Sum and difference of tan⁻¹", body: t`$$\tan^{-1}x+\tan^{-1}y=\tan^{-1}\frac{x+y}{1-xy}\ (xy<1),\qquad \tan^{-1}x-\tan^{-1}y=\tan^{-1}\frac{x-y}{1+xy}\ (xy>-1)$$` },
        { label: "Double angle forms (Exercise 2.2 type)", body: t`$$2\tan^{-1}x=\tan^{-1}\frac{2x}{1-x^2}\ (|x|<1)=\sin^{-1}\frac{2x}{1+x^2}\ (|x|\le 1)=\cos^{-1}\frac{1-x^2}{1+x^2}\ (x\ge 0)$$` },
      ],
    },
    {
      title: "Key concepts and conditions",
      kind: "concepts",
      items: [
        { body: t`$\sin^{-1}x$ means "the angle whose sine is $x$". It is **not** $\frac{1}{\sin x}$.` },
        { body: t`$\sin^{-1}(\sin\theta)=\theta$ only when $\theta\in\left[-\frac{\pi}{2},\frac{\pi}{2}\right]$. Likewise $\cos^{-1}(\cos\theta)=\theta$ only for $\theta\in[0,\pi]$ and $\tan^{-1}(\tan\theta)=\theta$ only for $\theta\in\left(-\frac{\pi}{2},\frac{\pi}{2}\right)$.` },
        { body: t`$\sin(\sin^{-1}x)=x$ is always true for $x\in[-1,1]$, because $x$ is then in the domain.` },
        { body: t`To evaluate $f(g^{-1}(x))$, draw a right triangle: if $\sin\theta=\frac35$ then the adjacent side is $4$, so $\cos\theta=\frac45$.` },
        { body: t`In $\tan^{-1}x\pm\tan^{-1}y$ always check the condition on $xy$. If it fails, $\pi$ is added or subtracted.` },
      ],
    },
    {
      title: "Common mistakes",
      kind: "mistakes",
      items: [
        { body: t`Writing $\sin^{-1}\left(\sin\frac{2\pi}{3}\right)=\frac{2\pi}{3}$. The angle is outside the principal range; reduce it first: $\sin\frac{2\pi}{3}=\sin\frac{\pi}{3}$, so the answer is $\frac{\pi}{3}$.` },
        { body: t`Using $\cos^{-1}(-x)=-\cos^{-1}x$. The correct rule is $\cos^{-1}(-x)=\pi-\cos^{-1}x$.` },
        { body: t`Giving a negative value for $\cos^{-1}$ or $\cot^{-1}$. Their ranges start at $0$.` },
        { body: t`Applying the $\tan^{-1}$ sum formula without checking $xy<1$.` },
        { body: t`Rejecting or keeping a solution without checking it in the original equation (extraneous roots are common).` },
      ],
    },
    {
      title: "Quick worked example",
      kind: "example",
      items: [
        { label: "Problem", body: t`Find $\cos^{-1}\left(-\frac{1}{2}\right)$.` },
        { label: "Step 1", body: t`Use $\cos^{-1}(-x)=\pi-\cos^{-1}x$: the value is $\pi-\cos^{-1}\frac12$.` },
        { label: "Step 2", body: t`$\cos\frac{\pi}{3}=\frac12$ and $\frac{\pi}{3}\in[0,\pi]$, so $\cos^{-1}\frac12=\frac{\pi}{3}$.` },
        { label: "Answer", body: t`$\pi-\frac{\pi}{3}=\frac{2\pi}{3}$, which lies in $[0,\pi]$.` },
      ],
    },
  ],

  // ------------------------------------------------------------------ Vector algebra
  vectors: [
    {
      title: "Magnitude, unit vectors and direction cosines",
      kind: "formulas",
      items: [
        { label: "Magnitude", body: t`$$|\vec{a}|=\sqrt{x^2+y^2+z^2}\quad\text{for }\vec{a}=x\hat{i}+y\hat{j}+z\hat{k}$$` },
        { label: "Unit vector", body: t`$$\hat{a}=\frac{\vec{a}}{|\vec{a}|}$$` },
        { label: "Direction cosines", body: t`$$l=\frac{x}{|\vec{a}|},\ m=\frac{y}{|\vec{a}|},\ n=\frac{z}{|\vec{a}|},\qquad l^2+m^2+n^2=1$$` },
        { label: "Vector joining two points", body: t`$$\overrightarrow{AB}=\overrightarrow{OB}-\overrightarrow{OA}=(x_2-x_1)\hat{i}+(y_2-y_1)\hat{j}+(z_2-z_1)\hat{k}$$` },
        { label: "Section formula (internal, m : n)", body: t`$$\frac{m\vec{b}+n\vec{a}}{m+n}\qquad\text{Mid-point: }\frac{\vec{a}+\vec{b}}{2}$$` },
      ],
    },
    {
      title: "Dot product (scalar product)",
      kind: "formulas",
      items: [
        { label: "Definition", body: t`$$\vec{a}\cdot\vec{b}=|\vec{a}||\vec{b}|\cos\theta=a_1b_1+a_2b_2+a_3b_3$$` },
        { label: "Angle between vectors", body: t`$$\cos\theta=\frac{\vec{a}\cdot\vec{b}}{|\vec{a}||\vec{b}|}$$` },
        { label: "Perpendicular vectors", body: t`$$\vec{a}\perp\vec{b}\Leftrightarrow\vec{a}\cdot\vec{b}=0\quad(\text{non-zero vectors})$$` },
        { label: "Projection of a on b", body: t`$$\text{Scalar projection}=\frac{\vec{a}\cdot\vec{b}}{|\vec{b}|},\qquad \text{Vector projection}=\frac{\vec{a}\cdot\vec{b}}{|\vec{b}|^2}\,\vec{b}$$` },
        { label: "Useful expansion", body: t`$$|\vec{a}+\vec{b}|^2=|\vec{a}|^2+2\,\vec{a}\cdot\vec{b}+|\vec{b}|^2$$` },
      ],
    },
    {
      title: "Cross product (vector product)",
      kind: "formulas",
      items: [
        { label: "Definition", body: t`$$\vec{a}\times\vec{b}=|\vec{a}||\vec{b}|\sin\theta\ \hat{n},\qquad |\vec{a}\times\vec{b}|=|\vec{a}||\vec{b}|\sin\theta$$` },
        { label: "Component form", body: t`$$\vec{a}\times\vec{b}=(a_2b_3-a_3b_2)\hat{i}-(a_1b_3-a_3b_1)\hat{j}+(a_1b_2-a_2b_1)\hat{k}$$` },
        { label: "Parallel vectors", body: t`$$\vec{a}\parallel\vec{b}\Leftrightarrow\vec{a}\times\vec{b}=\vec{0}$$` },
        { label: "Areas", body: t`$$\text{Triangle }ABC=\frac12|\overrightarrow{AB}\times\overrightarrow{AC}|,\qquad \text{Parallelogram}=|\vec{a}\times\vec{b}|$$` },
        { label: "Parallelogram from diagonals", body: t`$$\text{Area}=\frac12|\vec{d_1}\times\vec{d_2}|$$` },
        { label: "Relation between dot and cross", body: t`$$|\vec{a}\times\vec{b}|^2+(\vec{a}\cdot\vec{b})^2=|\vec{a}|^2|\vec{b}|^2$$` },
      ],
    },
    {
      title: "Key concepts",
      kind: "concepts",
      items: [
        { body: t`Types of vectors: zero, unit, equal, negative, collinear (parallel), coinitial, and free vectors.` },
        { body: t`Triangle law: $\overrightarrow{AB}+\overrightarrow{BC}=\overrightarrow{AC}$. Scalar multiplication changes the magnitude by $|\lambda|$ and reverses direction if $\lambda<0$.` },
        { body: t`The dot product is a **scalar**; the cross product is a **vector** perpendicular to both $\vec{a}$ and $\vec{b}$.` },
        { body: t`Dot product is commutative: $\vec{a}\cdot\vec{b}=\vec{b}\cdot\vec{a}$. Cross product is **not**: $\vec{a}\times\vec{b}=-\vec{b}\times\vec{a}$.` },
        { body: t`Direction cosines of $\hat{i},\hat{j},\hat{k}$ are $(1,0,0)$, $(0,1,0)$ and $(0,0,1)$.` },
      ],
    },
    {
      title: "Common mistakes",
      kind: "mistakes",
      items: [
        { body: t`Forgetting the **minus sign** on the $\hat{j}$ component when expanding the cross-product determinant.` },
        { body: t`Not dividing by $|\vec{a}|$ when asked for a **unit** vector.` },
        { body: t`Mixing up the order: $\overrightarrow{AB}=\vec{B}-\vec{A}$ (head minus tail).` },
        { body: t`Using $\vec{a}\cdot\vec{b}=0$ to test for parallel vectors (it tests for perpendicular ones).` },
        { body: t`Forgetting the factor $\frac12$ for the area of a triangle.` },
      ],
    },
    {
      title: "Quick worked example",
      kind: "example",
      items: [
        { label: "Problem", body: t`Find $\vec{a}\times\vec{b}$ for $\vec{a}=2\hat{i}+\hat{j}+3\hat{k}$, $\vec{b}=3\hat{i}+5\hat{j}-2\hat{k}$.` },
        { label: "Step 1", body: t`$\hat{i}$: $(1)(-2)-(3)(5)=-17$.` },
        { label: "Step 2", body: t`$\hat{j}$: $-\big[(2)(-2)-(3)(3)\big]=-(-13)=13$.` },
        { label: "Step 3", body: t`$\hat{k}$: $(2)(5)-(1)(3)=7$.` },
        { label: "Answer", body: t`$\vec{a}\times\vec{b}=-17\hat{i}+13\hat{j}+7\hat{k}$.` },
      ],
    },
  ],

  // ------------------------------------------------------------------ 3D geometry
  geometry3d: [
    {
      title: "Direction cosines and direction ratios",
      kind: "formulas",
      items: [
        { label: "Direction cosines", body: t`$$l=\cos\alpha,\ m=\cos\beta,\ n=\cos\gamma,\qquad l^2+m^2+n^2=1$$` },
        { label: "From direction ratios a, b, c", body: t`$$l=\frac{a}{\sqrt{a^2+b^2+c^2}},\ m=\frac{b}{\sqrt{a^2+b^2+c^2}},\ n=\frac{c}{\sqrt{a^2+b^2+c^2}}$$` },
        { label: "Line through P(x₁, y₁, z₁) and Q(x₂, y₂, z₂)", body: t`$$\text{Direction ratios: } x_2-x_1,\ y_2-y_1,\ z_2-z_1$$` },
        { label: "Coordinate axes", body: t`$$x\text{-axis: }(1,0,0),\quad y\text{-axis: }(0,1,0),\quad z\text{-axis: }(0,0,1)$$` },
      ],
    },
    {
      title: "Equations of a line in space",
      kind: "formulas",
      items: [
        { label: "Vector form (point and direction)", body: t`$$\vec{r}=\vec{a}+\lambda\vec{b}$$` },
        { label: "Cartesian form (point and direction ratios)", body: t`$$\frac{x-x_1}{a}=\frac{y-y_1}{b}=\frac{z-z_1}{c}$$` },
        { label: "Through two points", body: t`$$\frac{x-x_1}{x_2-x_1}=\frac{y-y_1}{y_2-y_1}=\frac{z-z_1}{z_2-z_1}$$` },
        { label: "Vector form through two points", body: t`$$\vec{r}=\vec{a}+\lambda(\vec{b}-\vec{a})$$` },
      ],
    },
    {
      title: "Angle between lines and shortest distance",
      kind: "formulas",
      items: [
        { label: "Angle (direction ratios)", body: t`$$\cos\theta=\frac{|a_1a_2+b_1b_2+c_1c_2|}{\sqrt{a_1^2+b_1^2+c_1^2}\ \sqrt{a_2^2+b_2^2+c_2^2}}$$` },
        { label: "Angle (vector form)", body: t`$$\cos\theta=\frac{|\vec{b_1}\cdot\vec{b_2}|}{|\vec{b_1}||\vec{b_2}|}$$` },
        { label: "Perpendicular / parallel", body: t`$$\perp:\ a_1a_2+b_1b_2+c_1c_2=0,\qquad \parallel:\ \frac{a_1}{a_2}=\frac{b_1}{b_2}=\frac{c_1}{c_2}$$` },
        { label: "Shortest distance between skew lines", body: t`$$d=\frac{\big|(\vec{a_2}-\vec{a_1})\cdot(\vec{b_1}\times\vec{b_2})\big|}{|\vec{b_1}\times\vec{b_2}|}$$` },
      ],
    },
    {
      title: "Key concepts",
      kind: "concepts",
      items: [
        { body: t`Direction **cosines** are unique up to sign; direction **ratios** are any set proportional to them. A line has two sets of direction cosines, one for each direction.` },
        { body: t`Before reading direction ratios from a Cartesian equation, write each fraction as $\frac{x-x_1}{a}$ with the **coefficients of $x,y,z$ equal to 1**.` },
        { body: t`Lines that are neither parallel nor intersecting are **skew lines**.` },
        { body: t`The angle between two lines is taken as the acute angle, which is why the numerator uses an absolute value.` },
      ],
    },
    {
      title: "Common mistakes",
      kind: "mistakes",
      items: [
        { body: t`Treating direction ratios as direction cosines. Divide by $\sqrt{a^2+b^2+c^2}$ to normalise.` },
        { body: t`Not rewriting $\frac{2x-3}{4}$ as $\frac{x-\frac32}{2}$ first, which gives wrong direction ratios.` },
        { body: t`Sign errors: $\frac{z+4}{-8}$ means the point has $z_1=-4$.` },
        { body: t`Forgetting the absolute value in the angle formula.` },
        { body: t`Mixing up the point $(x_1,y_1,z_1)$ with the direction ratios $(a,b,c)$ in the line equation.` },
      ],
    },
    {
      title: "Quick worked example",
      kind: "example",
      items: [
        { label: "Problem", body: t`Find the direction cosines of the line joining $P(-2,4,-5)$ and $Q(1,2,3)$.` },
        { label: "Step 1", body: t`Direction ratios: $1-(-2),\ 2-4,\ 3-(-5)=3,-2,8$.` },
        { label: "Step 2", body: t`$\sqrt{3^2+(-2)^2+8^2}=\sqrt{77}$.` },
        { label: "Answer", body: t`$\left(\frac{3}{\sqrt{77}},\ \frac{-2}{\sqrt{77}},\ \frac{8}{\sqrt{77}}\right)$.` },
      ],
    },
  ],

  // ------------------------------------------------------------------ Maxima and minima
  maxmin: [
    {
      title: "Tests for local maxima and minima",
      kind: "formulas",
      items: [
        { label: "Critical point", body: t`$$f'(c)=0\quad(\text{or } f'(c)\text{ does not exist})$$` },
        { label: "First derivative test", body: t`$$f'\text{ changes } + \to -\Rightarrow\text{local max};\quad f'\text{ changes } - \to +\Rightarrow\text{local min};\quad\text{no sign change}\Rightarrow\text{neither}$$` },
        { label: "Second derivative test", body: t`$$f'(c)=0,\ f''(c)<0\Rightarrow\text{local max};\qquad f'(c)=0,\ f''(c)>0\Rightarrow\text{local min}$$` },
        { label: "When f″(c) = 0", body: t`$$\text{The test fails: use the first derivative test instead.}$$` },
        { label: "Absolute extrema on [a, b]", body: t`$$\text{Compare } f(a),\ f(b)\text{ and } f(c)\text{ at critical points } c\in(a,b)$$` },
      ],
    },
    {
      title: "Key concepts",
      kind: "concepts",
      items: [
        { body: t`$f$ is **increasing** where $f'(x)>0$ and **decreasing** where $f'(x)<0$. A local maximum is where $f$ switches from increasing to decreasing.` },
        { body: t`Local maxima and minima are **values** of the function; the critical point is the **x-coordinate**. Read the question to see which is wanted.` },
        { body: t`For a word problem: define variables, write the quantity to optimise, use the constraint to reduce to **one** variable, differentiate, solve, then verify with $f''$ and check the domain.` },
        { body: t`A function can have several local maxima or minima, and a local maximum need not be the absolute maximum.` },
      ],
    },
    {
      title: "Common mistakes",
      kind: "mistakes",
      items: [
        { body: t`Not verifying that the critical point is a maximum or minimum.` },
        { body: t`Ignoring the end-points when finding absolute maximum and minimum on a closed interval.` },
        { body: t`Using the second derivative test when $f''(c)=0$ (it is inconclusive; $f(x)=x^3$ at $x=0$ has neither).` },
        { body: t`Keeping a critical point that lies outside the allowed domain (for example a negative length).` },
        { body: t`Giving $x$ when the question asks for the maximum **value**, or the other way round.` },
      ],
    },
    {
      title: "Quick worked example",
      kind: "example",
      items: [
        { label: "Problem", body: t`Find the local maximum value of $f(x)=x^3-12x+5$.` },
        { label: "Step 1", body: t`$f'(x)=3x^2-12=3(x-2)(x+2)$, so the critical points are $x=\pm2$.` },
        { label: "Step 2", body: t`$f''(x)=6x$. At $x=-2$: $f''(-2)=-12<0$, so it is a local maximum.` },
        { label: "Answer", body: t`$f(-2)=-8+24+5=21$.` },
      ],
    },
  ],

  // ------------------------------------------------------------------ Integrals
  integrals: [
    {
      title: "Standard integrals",
      kind: "formulas",
      items: [
        { label: "Power rule", body: t`$$\int x^n\,dx=\frac{x^{n+1}}{n+1}+C\ (n\ne-1),\qquad \int\frac{dx}{x}=\ln|x|+C$$` },
        { label: "Exponentials", body: t`$$\int e^x\,dx=e^x+C,\qquad \int a^x\,dx=\frac{a^x}{\ln a}+C$$` },
        { label: "Trigonometric", body: t`$$\int\sin x\,dx=-\cos x+C,\qquad \int\cos x\,dx=\sin x+C$$` },
        { label: "Squares", body: t`$$\int\sec^2x\,dx=\tan x+C,\qquad \int\text{cosec}^2x\,dx=-\cot x+C$$` },
        { label: "Products", body: t`$$\int\sec x\tan x\,dx=\sec x+C,\qquad \int\text{cosec}\,x\cot x\,dx=-\text{cosec}\,x+C$$` },
        { label: "Inverse trigonometric", body: t`$$\int\frac{dx}{\sqrt{1-x^2}}=\sin^{-1}x+C,\qquad \int\frac{dx}{1+x^2}=\tan^{-1}x+C,\qquad \int\frac{dx}{x\sqrt{x^2-1}}=\sec^{-1}x+C$$` },
        { label: "Linear argument", body: t`$$\int f(ax+b)\,dx=\frac{1}{a}F(ax+b)+C\qquad\text{e.g. }\int\cos 5x\,dx=\frac{\sin 5x}{5}+C$$` },
      ],
    },
    {
      title: "Integrals of some particular functions (Exercise 7.4 type)",
      kind: "formulas",
      items: [
        { label: "Difference of squares", body: t`$$\int\frac{dx}{x^2-a^2}=\frac{1}{2a}\ln\left|\frac{x-a}{x+a}\right|+C,\qquad \int\frac{dx}{a^2-x^2}=\frac{1}{2a}\ln\left|\frac{a+x}{a-x}\right|+C$$` },
        { label: "Sum of squares", body: t`$$\int\frac{dx}{x^2+a^2}=\frac{1}{a}\tan^{-1}\frac{x}{a}+C$$` },
        { label: "Square roots", body: t`$$\int\frac{dx}{\sqrt{a^2-x^2}}=\sin^{-1}\frac{x}{a}+C,\quad \int\frac{dx}{\sqrt{x^2-a^2}}=\ln\left|x+\sqrt{x^2-a^2}\right|+C,\quad \int\frac{dx}{\sqrt{x^2+a^2}}=\ln\left|x+\sqrt{x^2+a^2}\right|+C$$` },
        { label: "Quadratic denominators", body: t`$$\int\frac{dx}{ax^2+bx+c},\quad \int\frac{dx}{\sqrt{ax^2+bx+c}}:\ \text{complete the square, then use a standard form}$$` },
        { label: "Linear numerator", body: t`$$\int\frac{px+q}{ax^2+bx+c}\,dx,\ \int\frac{px+q}{\sqrt{ax^2+bx+c}}\,dx:\quad px+q=A\frac{d}{dx}(ax^2+bx+c)+B$$` },
      ],
    },
    {
      title: "Methods and useful identities",
      kind: "formulas",
      items: [
        { label: "Substitution", body: t`$$\int f(g(x))\,g'(x)\,dx:\ \text{put } t=g(x),\ dt=g'(x)\,dx$$` },
        { label: "Standard results", body: t`$$\int\tan x\,dx=\ln|\sec x|+C,\quad \int\cot x\,dx=\ln|\sin x|+C,\quad \int\sec x\,dx=\ln|\sec x+\tan x|+C$$` },
        { label: "Power-reducing identities", body: t`$$\sin^2x=\frac{1-\cos2x}{2},\qquad \cos^2x=\frac{1+\cos2x}{2}$$` },
        { label: "Product to sum", body: t`$$\sin A\cos B=\frac{1}{2}\left[\sin(A+B)+\sin(A-B)\right]$$` },
      ],
    },
    {
      title: "Key concepts",
      kind: "concepts",
      items: [
        { body: t`Integration is the **reverse of differentiation**. Always add the constant $C$ for an indefinite integral.` },
        { body: t`Check any answer by differentiating it: you must get back the original integrand.` },
        { body: t`For $\int\frac{px+q}{ax^2+bx+c}dx$, split the numerator into a multiple of the derivative of the denominator plus a constant: the first part gives a logarithm, the second a standard form.` },
        { body: t`Equivalent answers can look different (for example $\ln|\sec x|$ and $-\ln|\cos x|$). They differ only by a constant.` },
      ],
    },
    {
      title: "Common mistakes",
      kind: "mistakes",
      items: [
        { body: t`Forgetting $+C$.` },
        { body: t`Applying the power rule to $\int\frac{dx}{x}$ (it gives $\ln|x|$, not $\frac{x^0}{0}$).` },
        { body: t`Forgetting the factor $\frac1a$ in $\int\cos(ax)\,dx$.` },
        { body: t`Not completing the square, or taking the wrong sign when it produces $a^2-x^2$ instead of $x^2-a^2$.` },
        { body: t`Dropping the absolute value in logarithmic answers.` },
      ],
    },
    {
      title: "Quick worked example",
      kind: "example",
      items: [
        { label: "Problem", body: t`Evaluate $\int\frac{dx}{x^2-6x+13}$.` },
        { label: "Step 1", body: t`Complete the square: $x^2-6x+13=(x-3)^2+4$.` },
        { label: "Step 2", body: t`Put $t=x-3$ to get $\int\frac{dt}{t^2+2^2}$.` },
        { label: "Answer", body: t`$\frac12\tan^{-1}\frac{x-3}{2}+C$.` },
      ],
    },
  ],
};
