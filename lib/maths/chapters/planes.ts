import type { ChapterContent } from "../types";
import { HELP, cardMk, mcq, mk, num, tup } from "../qhelpers";

const t = String.raw;
const q = mk("planes");
const c = cardMk("planes", "PL");

export const planes: ChapterContent = {
  id: "planes",
  questions: [
    q("PLN-1", "Normal to a plane", "direct", 1,
      t`Write the direction ratios of a normal to the plane $2x-3y+6z=7$.`,
      tup([2, -3, 6], true), t`$(2,-3,6)$`,
      [
        t`For a plane $ax+by+cz=d$, the vector $a\hat{i}+b\hat{j}+c\hat{k}$ is normal to it.`,
        t`So the direction ratios are $2,\,-3,\,6$ (any non-zero multiple also works).`,
      ],
      t`The coefficients of $x,y,z$ give a normal vector.`,
      { input: HELP.tup }),

    q("PLN-2", "Distance from the origin", "direct", 1,
      t`Find the distance of the plane $2x-3y+6z=14$ from the origin.`,
      num(2), t`$2$ units`,
      [
        t`Distance from the origin to $ax+by+cz=d$ is $\dfrac{|d|}{\sqrt{a^2+b^2+c^2}}$.`,
        t`$\sqrt{4+9+36}=7$, so the distance is $\dfrac{14}{7}=2$.`,
      ],
      t`Divide $|d|$ by the magnitude of the normal vector.`,
      { input: HELP.num }),

    q("PLN-3", "Intercept form", "direct", 1,
      t`A plane has intercepts $2,3,6$ on the $x,y,z$ axes. Its equation is:`,
      mcq([t`$3x+2y+z=6$`, t`$x+y+z=11$`, t`$6x+3y+2z=6$`, t`$3x+2y+z=1$`], 0),
      t`$3x+2y+z=6$`,
      [
        t`Intercept form: $\dfrac x2+\dfrac y3+\dfrac z6=1$.`,
        t`Multiply by $6$: $3x+2y+z=6$.`,
      ],
      t`Use $\frac xa+\frac yb+\frac zc=1$ and clear the denominators.`),

    q("PLN-4", "Distance of a point", "short", 2,
      t`Find the distance of the point $(1,2,3)$ from the plane $2x-y+2z=1$. Give a decimal.`,
      num(5 / 3), t`$\dfrac53\approx1.667$ units`,
      [
        t`Distance $=\dfrac{|ax_1+by_1+cz_1-d|}{\sqrt{a^2+b^2+c^2}}$.`,
        t`Numerator: $|2(1)-2+2(3)-1|=5$. Denominator: $\sqrt{4+1+4}=3$.`,
        t`Distance $=\dfrac53$.`,
      ],
      t`Substitute the point into $ax+by+cz-d$ and divide by $\sqrt{a^2+b^2+c^2}$.`,
      { input: HELP.num }),

    q("PLN-5", "Angle between planes", "short", 2,
      t`Find $\cos\theta$ for the acute angle between the planes $2x+y-2z=5$ and $3x-6y-2z=7$. Give a decimal.`,
      num(4 / 21), t`$\dfrac{4}{21}\approx0.190$`,
      [
        t`The angle between two planes equals the angle between their normals $\vec n_1=(2,1,-2)$ and $\vec n_2=(3,-6,-2)$.`,
        t`$\vec n_1\cdot\vec n_2=6-6+4=4$, $\ |\vec n_1|=3$, $\ |\vec n_2|=7$.`,
        t`$\cos\theta=\dfrac{|4|}{3\cdot7}=\dfrac{4}{21}$.`,
      ],
      t`Use the dot product of the two normal vectors.`,
      { input: HELP.num }),

    q("PLN-6", "Plane through a point", "short", 2,
      t`A plane passes through $(1,1,1)$ and has normal $\hat{i}+2\hat{j}+3\hat{k}$. Its equation is $x+2y+3z=d$. Find $d$.`,
      num(6), t`$d=6$`,
      [
        t`The plane is $1(x-1)+2(y-1)+3(z-1)=0$.`,
        t`That is $x+2y+3z=1+2+3=6$.`,
      ],
      t`Substitute the given point into $x+2y+3z$.`,
      { input: HELP.num }),

    q("PLN-7", "Line parallel to a plane", "short", 2,
      t`A line with direction vector $\vec b$ is parallel to a plane with normal $\vec n$ exactly when:`,
      mcq([t`$\vec b\cdot\vec n=0$`, t`$\vec b\times\vec n=\vec0$`, t`$\vec b=\vec n$`, t`$\vec b\cdot\vec n=1$`], 0),
      t`$\vec b\cdot\vec n=0$`,
      [
        t`A line is parallel to a plane when it is perpendicular to the plane's normal.`,
        t`That means $\vec b\cdot\vec n=0$. (If $\vec b\times\vec n=\vec0$, the line is perpendicular to the plane.)`,
      ],
      t`Parallel to the plane means perpendicular to the normal.`),

    q("PLN-8", "Angle between a line and a plane", "short", 2,
      t`Find $\sin\theta$, where $\theta$ is the angle between the line $\dfrac{x-1}{1}=\dfrac{y-2}{2}=\dfrac{z-3}{2}$ and the plane $2x+2y-z=5$. Give a decimal.`,
      num(4 / 9), t`$\dfrac49\approx0.444$`,
      [
        t`Line direction $\vec b=(1,2,2)$, $|\vec b|=3$. Plane normal $\vec n=(2,2,-1)$, $|\vec n|=3$.`,
        t`$\sin\theta=\dfrac{|\vec b\cdot\vec n|}{|\vec b||\vec n|}=\dfrac{|2+4-2|}{9}=\dfrac49$.`,
      ],
      t`The angle with the plane uses **sine** of the angle between $\vec b$ and the normal.`,
      { input: HELP.num, traps: [{ value: 0.8944, msg: t`That mixes sine and cosine. For a line and a plane, $\sin\theta=\frac{|\vec b\cdot\vec n|}{|\vec b||\vec n|}$.` }] }),

    q("PLN-9", "Plane through three points", "short", 2,
      t`Find a normal (as direction ratios) to the plane through $A(1,0,0)$, $B(0,2,0)$ and $C(0,0,3)$.`,
      tup([6, 3, 2], true), t`$(6,3,2)$, for the plane $6x+3y+2z=6$`,
      [
        t`Intercept form: $\dfrac x1+\dfrac y2+\dfrac z3=1$.`,
        t`Multiply by $6$: $6x+3y+2z=6$. A normal is $(6,3,2)$.`,
      ],
      t`The points lie on the axes, so use the intercept form.`,
      { input: HELP.tup }),

    q("PLN-10", "Parallel planes", "short", 2,
      t`Find the distance between the parallel planes $2x-y+2z=3$ and $2x-y+2z=9$.`,
      num(2), t`$2$ units`,
      [
        t`For $ax+by+cz=d_1$ and $ax+by+cz=d_2$ the distance is $\dfrac{|d_2-d_1|}{\sqrt{a^2+b^2+c^2}}$.`,
        t`$=\dfrac{6}{3}=2$.`,
      ],
      t`Take the difference of the constants and divide by the length of the normal.`,
      { input: HELP.num }),

    q("PLN-11", "Line meets plane", "exam", 3,
      t`Find the point where the line $\dfrac{x-1}{1}=\dfrac{y-2}{1}=\dfrac{z-3}{2}$ meets the plane $x+y+z=10$. Give $(x,y,z)$.`,
      tup([2, 3, 5]), t`$(2,3,5)$`,
      [
        t`A general point on the line is $(1+t,\,2+t,\,3+2t)$.`,
        t`Substitute in the plane: $(1+t)+(2+t)+(3+2t)=6+4t=10\Rightarrow t=1$.`,
        t`The point is $(2,3,5)$.`,
      ],
      t`Write the line with parameter $t$ and substitute into the plane's equation.`,
      { input: HELP.tup }),

    q("PLN-12", "Foot of the perpendicular", "exam", 3,
      t`Find the foot of the perpendicular from $P(1,1,1)$ to the plane $x+y+z=6$. Give $(x,y,z)$.`,
      tup([2, 2, 2]), t`$(2,2,2)$`,
      [
        t`The perpendicular from $P$ has direction equal to the normal $(1,1,1)$: points $(1+t,1+t,1+t)$.`,
        t`On the plane: $3+3t=6\Rightarrow t=1$.`,
        t`Foot $=(2,2,2)$.`,
      ],
      t`Move from $P$ along the normal direction and use the plane equation to find the parameter.`,
      { input: HELP.tup }),

    q("PLN-C1", "Plane perpendicular to a line", "exam", 3,
      t`Find the plane through $(2,1,-1)$ perpendicular to the line $\dfrac{x-1}{3}=\dfrac{y+2}{-1}=\dfrac{z}{2}$. It has the form $3x-y+2z=d$. Find $d$.`,
      num(3), t`$d=3$`,
      [
        t`A plane perpendicular to the line has the line's direction $(3,-1,2)$ as its normal: $3x-y+2z=d$.`,
        t`Substitute $(2,1,-1)$: $d=6-1-2=3$.`,
      ],
      t`The direction of the line is the normal of the plane.`,
      { challenge: true, input: HELP.num }),

    q("PLN-C2", "Family of planes", "exam", 3,
      t`Find the plane through the origin and the line of intersection of $x+y+z=1$ and $2x+3y+4z=5$. Give a normal as direction ratios.`,
      tup([3, 2, 1], true), t`$(3,2,1)$, plane $3x+2y+z=0$`,
      [
        t`Planes through the line of intersection: $(x+y+z-1)+\lambda(2x+3y+4z-5)=0$.`,
        t`Through the origin: $-1-5\lambda=0\Rightarrow\lambda=-\dfrac15$.`,
        t`$5(x+y+z-1)-(2x+3y+4z-5)=0\Rightarrow3x+2y+z=0$. A normal is $(3,2,1)$.`,
      ],
      t`Use $P_1+\lambda P_2=0$ and find $\lambda$ by putting the point $(0,0,0)$.`,
      { challenge: true, input: HELP.tup }),

    q("PLN-C3", "Distance from the origin (intercepts)", "exam", 3,
      t`A plane has equal intercepts $3$ on all three axes. Find its distance from the origin as a decimal.`,
      num(Math.sqrt(3)), t`$\sqrt3\approx1.732$`,
      [
        t`The plane is $\dfrac x3+\dfrac y3+\dfrac z3=1$, i.e. $x+y+z=3$.`,
        t`Distance from the origin $=\dfrac{3}{\sqrt{1+1+1}}=\sqrt3$.`,
      ],
      t`Write the plane as $x+y+z=3$ and use the distance formula.`,
      { challenge: true, input: HELP.num }),

    q("PLN-C4", "Parallel condition", "exam", 3,
      t`The line $\dfrac{x-1}{1}=\dfrac{y-2}{2}=\dfrac{z-3}{k}$ is parallel to the plane $2x+y-z=5$. Find $k$.`,
      num(4), t`$k=4$`,
      [
        t`Direction of the line $(1,2,k)$; normal of the plane $(2,1,-1)$.`,
        t`Parallel $\Rightarrow$ $\vec b\cdot\vec n=0$: $2+2-k=0$.`,
        t`$k=4$.`,
      ],
      t`Set $\vec b\cdot\vec n=0$.`,
      { challenge: true, input: HELP.num }),
  ],

  revision: [
    {
      title: "Equations of a plane",
      kind: "formulas",
      items: [
        { label: "Normal form (vector)", body: t`$$\vec r\cdot\hat n=d$$ $\hat n$ is the unit normal and $d>0$ the distance from the origin.` },
        { label: "Through a point $\vec a$, normal $\vec n$", body: t`$$(\vec r-\vec a)\cdot\vec n=0\qquad\text{i.e. } a(x-x_1)+b(y-y_1)+c(z-z_1)=0$$` },
        { label: "General (Cartesian)", body: t`$$ax+by+cz=d,\quad\text{normal }(a,b,c)$$` },
        { label: "Intercept form", body: t`$$\frac xa+\frac yb+\frac zc=1$$` },
        { label: "Through three points", body: t`$$\begin{vmatrix}x-x_1&y-y_1&z-z_1\\x_2-x_1&y_2-y_1&z_2-z_1\\x_3-x_1&y_3-y_1&z_3-z_1\end{vmatrix}=0$$` },
        { label: "Through the intersection of two planes", body: t`$$P_1+\lambda P_2=0$$` },
      ],
    },
    {
      title: "Angles and distances",
      kind: "formulas",
      items: [
        { label: "Angle between planes", body: t`$$\cos\theta=\frac{|\vec n_1\cdot\vec n_2|}{|\vec n_1||\vec n_2|}$$` },
        { label: "Angle between a line and a plane", body: t`$$\sin\theta=\frac{|\vec b\cdot\vec n|}{|\vec b||\vec n|}$$` },
        { label: "Distance of a point from a plane", body: t`$$d=\frac{|ax_1+by_1+cz_1-d_0|}{\sqrt{a^2+b^2+c^2}}$$` },
        { label: "Distance between parallel planes", body: t`$$\frac{|d_2-d_1|}{\sqrt{a^2+b^2+c^2}}$$` },
      ],
    },
    {
      title: "Conditions",
      kind: "concepts",
      items: [
        { body: t`Planes are **parallel** if their normals are proportional, **perpendicular** if $\vec n_1\cdot\vec n_2=0$.` },
        { body: t`A line is **parallel** to a plane if $\vec b\cdot\vec n=0$, and **perpendicular** to it if $\vec b\parallel\vec n$.` },
        { body: t`A line lies **in** a plane if it is parallel to it **and** a point of the line satisfies the plane's equation.` },
        { body: t`To find where a line meets a plane, write the line in parametric form and substitute into the plane's equation.` },
      ],
    },
    {
      title: "Common mistakes",
      kind: "mistakes",
      items: [
        { body: t`Using cosine instead of sine for the angle between a line and a plane.` },
        { body: t`Forgetting the absolute value in the distance formula, or not dividing by $\sqrt{a^2+b^2+c^2}$.` },
        { body: t`Using the same sign convention for $d$ in the two planes when finding the distance between parallel planes (the coefficients of $x,y,z$ must be identical first).` },
        { body: t`Taking a direction ratio of the line as the normal of the plane without checking.` },
      ],
    },
    {
      title: "Quick worked example",
      kind: "example",
      items: [
        { label: "Problem", body: t`Distance of $(1,2,3)$ from $2x-y+2z=1$.` },
        { label: "Numerator", body: t`$|2-2+6-1|=5$.` },
        { label: "Denominator", body: t`$\sqrt{4+1+4}=3$.` },
        { label: "Answer", body: t`$\dfrac53$ units.` },
      ],
    },
  ],

  examples: [
    {
      title: "Distance from a point to a plane",
      problem: t`Find the distance of $(1,2,3)$ from the plane $2x-y+2z=1$.`,
      steps: [
        { doit: t`Write the plane as $2x-y+2z-1=0$`, why: t`The formula needs the plane with everything on one side.` },
        { doit: t`$|2(1)-2+2(3)-1|=5$`, why: t`Substitute the point into the left-hand side and take the absolute value.` },
        { doit: t`$\sqrt{2^2+(-1)^2+2^2}=3$`, why: t`This is the length of the normal vector.` },
      ],
      answer: t`$\dfrac53$ units`,
    },
    {
      title: "Where a line meets a plane",
      problem: t`Find the point where $\dfrac{x-1}{1}=\dfrac{y-2}{1}=\dfrac{z-3}{2}$ meets $x+y+z=10$.`,
      steps: [
        { doit: t`Put each ratio equal to $t$: $(x,y,z)=(1+t,\,2+t,\,3+2t)$`, why: t`This is the parametric form of the line; every point on it has this shape.` },
        { doit: t`$(1+t)+(2+t)+(3+2t)=10\Rightarrow4t=4\Rightarrow t=1$`, why: t`The meeting point lies on the plane, so its coordinates satisfy the plane's equation.` },
        { doit: t`$t=1\Rightarrow(2,3,5)$`, why: t`Substitute the parameter back to get the coordinates.` },
      ],
      answer: t`$(2,3,5)$`,
    },
    {
      title: "Angle between two planes",
      problem: t`Find $\cos\theta$ between $2x+y-2z=5$ and $3x-6y-2z=7$.`,
      steps: [
        { doit: t`$\vec n_1=(2,1,-2),\ \vec n_2=(3,-6,-2)$`, why: t`The angle between planes is the angle between their normals.` },
        { doit: t`$\vec n_1\cdot\vec n_2=6-6+4=4$, $\ |\vec n_1|=3$, $\ |\vec n_2|=7$`, why: t`Compute the dot product and both magnitudes.` },
        { doit: t`$\cos\theta=\dfrac{|4|}{3\cdot7}$`, why: t`Apply $\cos\theta=\frac{|\vec n_1\cdot\vec n_2|}{|\vec n_1||\vec n_2|}$ (absolute value for the acute angle).` },
      ],
      answer: t`$\cos\theta=\dfrac{4}{21}$`,
    },
  ],

  cards: [
    c("Equation", t`General Cartesian equation of a plane and its normal`, t`$ax+by+cz=d$ with normal $(a,b,c)$.`),
    c("Equation", t`Vector equation of a plane through $\vec a$ with normal $\vec n$`, t`$(\vec r-\vec a)\cdot\vec n=0$, i.e. $\vec r\cdot\vec n=\vec a\cdot\vec n$.`),
    c("Equation", t`Intercept form of a plane`, t`$\dfrac xa+\dfrac yb+\dfrac zc=1$`),
    c("Equation", t`Plane through the intersection of planes $P_1=0$ and $P_2=0$`, t`$P_1+\lambda P_2=0$`),
    c("Distance", t`Distance of $(x_1,y_1,z_1)$ from $ax+by+cz=d$`, t`$\dfrac{|ax_1+by_1+cz_1-d|}{\sqrt{a^2+b^2+c^2}}$`),
    c("Distance", t`Distance of the plane $ax+by+cz=d$ from the origin`, t`$\dfrac{|d|}{\sqrt{a^2+b^2+c^2}}$`),
    c("Distance", t`Distance between parallel planes $ax+by+cz=d_1$ and $=d_2$`, t`$\dfrac{|d_2-d_1|}{\sqrt{a^2+b^2+c^2}}$`),
    c("Angle", t`Angle between two planes`, t`$\cos\theta=\dfrac{|\vec n_1\cdot\vec n_2|}{|\vec n_1||\vec n_2|}$`),
    c("Angle", t`Angle between a line (direction $\vec b$) and a plane (normal $\vec n$)`, t`$\sin\theta=\dfrac{|\vec b\cdot\vec n|}{|\vec b||\vec n|}$`),
    c("Conditions", t`Two planes: parallel; perpendicular`, t`Parallel: normals proportional. Perpendicular: $\vec n_1\cdot\vec n_2=0$.`),
    c("Conditions", t`A line and a plane: parallel; perpendicular`, t`Parallel: $\vec b\cdot\vec n=0$. Perpendicular: $\vec b\parallel\vec n$.`),
    c("Method", t`How do you find where a line meets a plane?`, t`Write the line as $(x_1+at,\,y_1+bt,\,z_1+ct)$, substitute into the plane to find $t$, then read the point.`),
    c("Common mistake", t`Which trig ratio gives the angle between a line and a plane?`, t`Sine (cosine gives the angle between the line and the normal).`),
  ],
};
