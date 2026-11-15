import type { MathQuestion } from "../types";
import { HELP, mcq, mk, num } from "../qhelpers";

const t = String.raw;
const q = mk("geometry3d");

/** Extra in-syllabus questions for Three-Dimensional Geometry: coplanar/skew lines, shortest distance, perpendicular lines. */
export const GEOMETRY3D_EXTRA: MathQuestion[] = [
  q("G3X-1", "Vector to Cartesian form", "direct", 1,
    t`The line $\vec r=(\hat i+2\hat j+3\hat k)+\lambda(2\hat i-\hat j+4\hat k)$ has the Cartesian form:`,
    mcq([
      t`$\dfrac{x-1}{2}=\dfrac{y-2}{-1}=\dfrac{z-3}{4}$`,
      t`$\dfrac{x-2}{1}=\dfrac{y+1}{2}=\dfrac{z-4}{3}$`,
      t`$\dfrac{x+1}{2}=\dfrac{y+2}{-1}=\dfrac{z+3}{4}$`,
      t`$\dfrac{x-1}{1}=\dfrac{y-2}{2}=\dfrac{z-3}{3}$`,
    ], 0),
    t`$\dfrac{x-1}{2}=\dfrac{y-2}{-1}=\dfrac{z-3}{4}$`,
    [
      t`$\vec r=\vec a+\lambda\vec b$ passes through $(1,2,3)$ with direction ratios $(2,-1,4)$.`,
      t`Cartesian form: $\dfrac{x-x_1}{a}=\dfrac{y-y_1}{b}=\dfrac{z-z_1}{c}$.`,
    ],
    t`Read off a point and the direction ratios.`),

  q("G3X-2", "Perpendicular lines", "short", 2,
    t`Find $k$ if the lines $\dfrac{x-1}{-3}=\dfrac{y-2}{2k}=\dfrac{z-3}{2}$ and $\dfrac{x-1}{3k}=\dfrac{y-1}{1}=\dfrac{z-6}{-5}$ are perpendicular. Give a decimal.`,
    num(-10 / 7), t`$k=-\dfrac{10}{7}$`,
    [
      t`Direction ratios: $(-3,2k,2)$ and $(3k,1,-5)$.`,
      t`Perpendicular: $(-3)(3k)+(2k)(1)+(2)(-5)=-9k+2k-10=0$.`,
      t`$-7k=10\Rightarrow k=-\dfrac{10}{7}\approx-1.43$.`,
    ],
    t`Set the dot product of the direction ratios equal to $0$.`,
    { input: HELP.num }),

  q("G3X-3", "Intersecting or skew?", "short", 2,
    t`The lines $\dfrac{x-1}{2}=\dfrac{y-2}{3}=\dfrac{z-3}{4}$ and $\dfrac{x-4}{5}=\dfrac{y-1}{2}=\dfrac{z}{1}$ are:`,
    mcq([t`Coplanar and intersecting`, t`Parallel`, t`Skew`, t`Coincident`], 0),
    t`Coplanar and intersecting`,
    [
      t`$\vec a_2-\vec a_1=(3,-1,-3)$, $\vec b_1=(2,3,4)$, $\vec b_2=(5,2,1)$.`,
      t`$\begin{vmatrix}3&-1&-3\\2&3&4\\5&2&1\end{vmatrix}=3(3-8)+1(2-20)-3(4-15)=-15-18+33=0$, so the lines are coplanar.`,
      t`$\vec b_1,\vec b_2$ are not proportional, so they are not parallel: they intersect.`,
    ],
    t`Lines are coplanar iff $(\vec a_2-\vec a_1)\cdot(\vec b_1\times\vec b_2)=0$.`),

  q("G3X-4", "Distance between parallel lines", "short", 2,
    t`Find the distance between the parallel lines $\vec r=(\hat i+2\hat j+3\hat k)+\lambda(\hat i+2\hat j+2\hat k)$ and $\vec r=(2\hat i+2\hat j+3\hat k)+\mu(\hat i+2\hat j+2\hat k)$. Give a decimal.`,
    num((2 * Math.SQRT2) / 3), t`$\dfrac{2\sqrt2}{3}\approx0.943$`,
    [
      t`$\vec b=(1,2,2)$, $|\vec b|=3$, and $\vec a_2-\vec a_1=(1,0,0)$.`,
      t`$\vec b\times(\vec a_2-\vec a_1)=(0,2,-2)$, magnitude $2\sqrt2$.`,
      t`Distance $=\dfrac{|\vec b\times(\vec a_2-\vec a_1)|}{|\vec b|}=\dfrac{2\sqrt2}{3}$.`,
    ],
    t`Use $d=\dfrac{|\vec b\times(\vec a_2-\vec a_1)|}{|\vec b|}$.`,
    { input: HELP.num }),

  q("G3X-5", "Shortest distance between skew lines", "exam", 3,
    t`Find the shortest distance between $\vec r=(\hat i+\hat j)+\lambda(2\hat i-\hat j+\hat k)$ and $\vec r=(2\hat i+\hat j-\hat k)+\mu(3\hat i-5\hat j+2\hat k)$. Give a decimal.`,
    num(10 / Math.sqrt(59)), t`$\dfrac{10}{\sqrt{59}}\approx1.302$`,
    [
      t`$\vec b_1\times\vec b_2=(3,-1,-7)$, with magnitude $\sqrt{9+1+49}=\sqrt{59}$.`,
      t`$\vec a_2-\vec a_1=(1,0,-1)$, and $(\vec a_2-\vec a_1)\cdot(\vec b_1\times\vec b_2)=3+0+7=10$.`,
      t`$d=\dfrac{|(\vec a_2-\vec a_1)\cdot(\vec b_1\times\vec b_2)|}{|\vec b_1\times\vec b_2|}=\dfrac{10}{\sqrt{59}}$.`,
    ],
    t`Use $d=\frac{|(\vec a_2-\vec a_1)\cdot(\vec b_1\times\vec b_2)|}{|\vec b_1\times\vec b_2|}$.`,
    { challenge: true, input: HELP.num }),
];
