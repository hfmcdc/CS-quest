import type { ChapterContent } from "../types";
import { HELP, cardMk, mcq, mk, num, tup } from "../qhelpers";

const t = String.raw;
const q = mk("det");
const c = cardMk("det", "DT");

const rowsOf = (rows: (string | number)[][]) => rows.map((r) => r.join("&")).join("\\\\");
/** TeX for a determinant (vertical bars) and a matrix (round brackets). */
const D = (...rows: (string | number)[][]) => "\\begin{vmatrix}" + rowsOf(rows) + "\\end{vmatrix}";
const M = (...rows: (string | number)[][]) => "\\begin{pmatrix}" + rowsOf(rows) + "\\end{pmatrix}";

export const det: ChapterContent = {
  id: "det",
  questions: [
    q("DET-1", "Value of a determinant", "direct", 1,
      t`Evaluate $${D([2, 3], [1, 4])}$.`,
      num(5), t`$5$`,
      [
        t`For a $2\times2$ determinant, $\begin{vmatrix}a&b\\c&d\end{vmatrix}=ad-bc$.`,
        t`$2(4)-3(1)=8-3=5$.`,
      ],
      t`Multiply along the main diagonal and subtract the product along the other diagonal.`,
      { input: HELP.num }),

    q("DET-2", "Singular matrix", "direct", 1,
      t`For what value of $x$ is the matrix $${M(["x", 2], [3, 6])}$ singular?`,
      num(1), t`$x=1$`,
      [
        t`A square matrix is singular when its determinant is $0$.`,
        t`$\begin{vmatrix}x&2\\3&6\end{vmatrix}=6x-6=0$, so $x=1$.`,
      ],
      t`Singular means $\det=0$. Set $6x-6=0$.`,
      { input: HELP.num }),

    q("DET-3", "Scalar multiple", "direct", 1,
      t`If $A$ is a $3\times3$ matrix with $|A|=4$, find $|2A|$.`,
      num(32), t`$32$`,
      [
        t`For an $n\times n$ matrix, $|kA|=k^n|A|$ (each of the $n$ rows contributes a factor $k$).`,
        t`Here $n=3$, $k=2$: $|2A|=2^3\cdot4=32$.`,
      ],
      t`Every row of $2A$ is twice a row of $A$. How many rows are there?`,
      { input: HELP.num, traps: [{ value: 8, msg: t`$8=2^3$ is only the factor. Multiply it by $|A|=4$.` }, { value: 16, msg: t`That is $2^2\cdot4$. The matrix is $3\times3$, so the factor is $2^3$, not $2^2$.` }] }),

    q("DET-4", "Expansion of a 3×3 determinant", "short", 2,
      t`Evaluate $${D([1, 2, 3], [0, 1, 4], [5, 6, 0])}$.`,
      num(1), t`$1$`,
      [
        t`Expand along the first row: $1\begin{vmatrix}1&4\\6&0\end{vmatrix}-2\begin{vmatrix}0&4\\5&0\end{vmatrix}+3\begin{vmatrix}0&1\\5&6\end{vmatrix}$.`,
        t`$=1(0-24)-2(0-20)+3(0-5)$.`,
        t`$=-24+40-15=1$.`,
      ],
      t`Use the sign pattern $+\,-\,+$ along the first row and a $2\times2$ minor for each entry.`,
      { input: HELP.num }),

    q("DET-5", "Cofactors", "short", 2,
      t`For $A=${M([1, 2, 3], [0, 1, 4], [5, 6, 0])}$, find the cofactor $A_{12}$.`,
      num(20), t`$20$`,
      [
        t`$A_{12}=(-1)^{1+2}M_{12}$, where $M_{12}$ is the minor obtained by deleting row $1$ and column $2$.`,
        t`$M_{12}=\begin{vmatrix}0&4\\5&0\end{vmatrix}=0-20=-20$.`,
        t`$A_{12}=(-1)^3(-20)=20$.`,
      ],
      t`Delete row $1$ and column $2$, take the $2\times2$ determinant, then apply the sign $(-1)^{1+2}$.`,
      { input: HELP.num, traps: [{ value: -20, msg: t`$-20$ is the minor $M_{12}$. The cofactor includes the sign $(-1)^{i+j}=(-1)^3=-1$.` }] }),

    q("DET-6", "Area of a triangle", "short", 2,
      t`Using determinants, find the area of the triangle with vertices $(1,0)$, $(6,0)$ and $(3,4)$.`,
      num(10), t`$10$ square units`,
      [
        t`Area $=\dfrac12\left|\begin{vmatrix}x_1&y_1&1\\x_2&y_2&1\\x_3&y_3&1\end{vmatrix}\right|$.`,
        t`$\begin{vmatrix}1&0&1\\6&0&1\\3&4&1\end{vmatrix}=1(0-4)-0+1(24-0)=20$.`,
        t`Area $=\frac12\times20=10$. (Check: base $5$, height $4$ gives $\frac12\cdot5\cdot4=10$.)`,
      ],
      t`Write the $3\times3$ determinant with a column of $1$s, expand, and halve the absolute value.`,
      { input: HELP.num }),

    q("DET-7", "Determinant of the adjoint", "short", 2,
      t`If $A$ is a $3\times3$ matrix and $|A|=5$, find $|\text{adj}\,A|$.`,
      num(25), t`$25$`,
      [
        t`For an $n\times n$ matrix, $|\text{adj}\,A|=|A|^{\,n-1}$.`,
        t`With $n=3$: $|\text{adj}\,A|=5^2=25$.`,
      ],
      t`Recall $|\text{adj}\,A|=|A|^{n-1}$.`,
      { input: HELP.num, traps: [{ value: 125, msg: t`The power is $n-1=2$, not $n=3$.` }] }),

    q("DET-8", "Collinearity", "short", 2,
      t`The points $(1,2)$, $(3,4)$ and $(k,6)$ are collinear. Find $k$.`,
      num(5), t`$k=5$`,
      [
        t`Three points are collinear iff the area of the triangle they form is $0$, i.e. $\begin{vmatrix}1&2&1\\3&4&1\\k&6&1\end{vmatrix}=0$.`,
        t`Expanding: $1(4-6)-2(3-k)+1(18-4k)=-2-6+2k+18-4k=10-2k$.`,
        t`$10-2k=0\Rightarrow k=5$.`,
      ],
      t`Set the area determinant equal to $0$ and solve for $k$.`,
      { input: HELP.num }),

    q("DET-9", "Inverse of a 2×2 matrix", "short", 2,
      t`Find $A^{-1}$ for $A=${M([2, 1], [5, 3])}$. Give its entries row by row.`,
      tup([3, -1, -5, 2]), t`$A^{-1}=${M([3, -1], [-5, 2])}$`,
      [
        t`$|A|=2(3)-1(5)=1\ne0$, so $A^{-1}$ exists.`,
        t`For $\begin{pmatrix}a&b\\c&d\end{pmatrix}$ the adjoint is $\begin{pmatrix}d&-b\\-c&a\end{pmatrix}$, so $\text{adj}\,A=${M([3, -1], [-5, 2])}$.`,
        t`$A^{-1}=\dfrac{1}{|A|}\text{adj}\,A=${M([3, -1], [-5, 2])}$.`,
      ],
      t`Swap the diagonal entries, change the signs of the other two, and divide by the determinant.`,
      { input: HELP.mat }),

    q("DET-10", "Consistency", "short", 2,
      t`The system $x+y=1$, $\ 2x+2y=k$ has no solution when:`,
      mcq([t`$k\ne2$`, t`$k=2$`, t`$k=1$`, t`for every $k$`], 0),
      t`$k\ne2$`,
      [
        t`The coefficient determinant $\begin{vmatrix}1&1\\2&2\end{vmatrix}=0$, so there is no unique solution.`,
        t`Doubling the first equation gives $2x+2y=2$. If $k=2$ the equations coincide (infinitely many solutions); if $k\ne2$ they contradict each other.`,
        t`So the system is inconsistent exactly when $k\ne2$.`,
      ],
      t`Compare the second equation with twice the first one.`),

    q("DET-11", "Solving a system by the inverse", "exam", 3,
      t`Solve $x+y+z=6$, $\ x-y+z=2$, $\ 2x+y-z=1$. Give $(x,y,z)$.`,
      tup([1, 2, 3]), t`$x=1,\ y=2,\ z=3$`,
      [
        t`Write $AX=B$ with $A=${M([1, 1, 1], [1, -1, 1], [2, 1, -1])}$, $X=${M(["x"], ["y"], ["z"])}$ and $B=${M([6], [2], [1])}$.`,
        t`$|A|=1(1-1)-1(-1-2)+1(1+2)=0+3+3=6\ne0$, so $X=A^{-1}B$ is the unique solution.`,
        t`Eliminate instead: adding the first two equations gives $x+z=4$, hence $y=2$. Then the third gives $2x-z=-1$, so $3x=3$.`,
        t`$x=1$, $z=3$, $y=2$. Check in the third equation: $2(1)+2-3=1$.`,
      ],
      t`$|A|\ne0$, so a unique solution exists. Adding the first two equations removes $y$.`,
      { input: HELP.tup }),

    q("DET-12", "Determinant of an inverse", "exam", 3,
      t`If $A$ is a non-singular matrix with $|A|=-2$, find $\left|A^{-1}\right|$.`,
      num(-0.5), t`$-\dfrac12$`,
      [
        t`$AA^{-1}=I$, so $|A|\,|A^{-1}|=|I|=1$.`,
        t`$|A^{-1}|=\dfrac{1}{|A|}=\dfrac{1}{-2}=-\dfrac12$.`,
      ],
      t`Take the determinant of both sides of $AA^{-1}=I$.`,
      { input: HELP.num }),

    q("DET-13", "Evaluating by properties", "exam", 3,
      t`Evaluate $${D([1, 1, 1], [1, 2, 3], [1, 4, 9])}$.`,
      num(2), t`$2$`,
      [
        t`This is $\begin{vmatrix}1&1&1\\a&b&c\\a^2&b^2&c^2\end{vmatrix}$ with $a=1,b=2,c=3$, whose value is $(a-b)(b-c)(c-a)$.`,
        t`$(1-2)(2-3)(3-1)=(-1)(-1)(2)=2$.`,
        t`Direct check: $1(18-12)-1(9-3)+1(4-2)=6-6+2=2$.`,
      ],
      t`Subtract column $1$ from columns $2$ and $3$ to get zeros in the first row, or expand directly.`,
      { input: HELP.num }),

    q("DET-C1", "Determinant equation", "exam", 3,
      t`The determinant $${D(["x", 3, 3], [3, "x", 3], [3, 3, "x"])}$ equals $(x+6)(x-3)^2$. Find the sum of all distinct values of $x$ for which it is $0$.`,
      num(-3), t`$-3$`,
      [
        t`Add columns $2$ and $3$ to column $1$: every entry of column $1$ becomes $x+6$. Factor out $(x+6)$.`,
        t`The remaining determinant, after row operations, equals $(x-3)^2$. So the determinant is $(x+6)(x-3)^2$.`,
        t`It vanishes for $x=-6$ and $x=3$ (a repeated root). The distinct values sum to $-6+3=-3$.`,
      ],
      t`Solve $(x+6)(x-3)^2=0$ and add the distinct roots.`,
      { challenge: true, input: HELP.num }),

    q("DET-C2", "Area and unknown vertex", "exam", 3,
      t`The area of the triangle with vertices $(k,0)$, $(4,0)$ and $(0,2)$ is $4$ square units. Find the positive value of $k$ for which this holds.`,
      num(8), t`$k=8$ (the other value is $k=0$)`,
      [
        t`Area $=\dfrac12\left|\begin{vmatrix}k&0&1\\4&0&1\\0&2&1\end{vmatrix}\right|$. Expanding along the second column: $-2\,(k-4)$, so the determinant is $-2(k-4)=8-2k$.`,
        t`$\dfrac12|8-2k|=4\Rightarrow|8-2k|=8$.`,
        t`$8-2k=8$ gives $k=0$; $8-2k=-8$ gives $k=8$. The positive value is $8$.`,
      ],
      t`Set the area formula equal to $4$ and remember the modulus gives two cases.`,
      { challenge: true, input: HELP.num }),
    q("DET-C3", "Determinant of A times its adjoint", "exam", 3,
      t`If $A$ is a $3\times3$ matrix with $|A|=-4$, find $\left|A\,(\text{adj}\,A)\right|$.`,
      num(-64), t`$-64$`,
      [
        t`$A\,(\text{adj}\,A)=|A|\,I=-4I$, a $3\times3$ scalar matrix.`,
        t`$\left|-4I\right|=(-4)^3=-64$.`,
        t`(Alternatively, $|A|\cdot|\text{adj}\,A|=|A|\cdot|A|^2=|A|^3=-64$.)`,
      ],
      t`Use $A(\text{adj}\,A)=|A|I$ and $|kI|=k^n$ for an $n\times n$ matrix.`,
      { challenge: true, input: HELP.num }),
    q("DET-C4", "Product of adjoint and matrix", "exam", 3,
      t`If $A$ is a singular square matrix, then $A\,(\text{adj}\,A)$ equals:`,
      mcq([t`The zero matrix $O$`, t`The identity matrix $I$`, t`$|A|\,A$`, t`$A^{-1}$`], 0),
      t`The zero matrix $O$`,
      [
        t`For every square matrix, $A\,(\text{adj}\,A)=(\text{adj}\,A)\,A=|A|\,I$.`,
        t`$A$ is singular, so $|A|=0$ and the product is $0\cdot I=O$.`,
      ],
      t`Recall $A(\text{adj}\,A)=|A|I$ and use $|A|=0$.`,
      { challenge: true }),
  ],

  revision: [
    {
      title: "Evaluating determinants",
      kind: "formulas",
      items: [
        { label: "Order 2", body: t`$$\begin{vmatrix}a&b\\c&d\end{vmatrix}=ad-bc$$` },
        { label: "Order 3 (first row)", body: t`$$\begin{vmatrix}a_1&b_1&c_1\\a_2&b_2&c_2\\a_3&b_3&c_3\end{vmatrix}=a_1\begin{vmatrix}b_2&c_2\\b_3&c_3\end{vmatrix}-b_1\begin{vmatrix}a_2&c_2\\a_3&c_3\end{vmatrix}+c_1\begin{vmatrix}a_2&b_2\\a_3&b_3\end{vmatrix}$$` },
        { label: "Minor and cofactor", body: t`$M_{ij}$ is the determinant left after deleting row $i$ and column $j$; the cofactor is $A_{ij}=(-1)^{i+j}M_{ij}$. Expanding along any row or column gives the same value.` },
        { label: "Area of a triangle", body: t`$$\Delta=\frac12\left|\begin{vmatrix}x_1&y_1&1\\x_2&y_2&1\\x_3&y_3&1\end{vmatrix}\right|$$ and the points are collinear iff this determinant is $0$.` },
      ],
    },
    {
      title: "Properties",
      kind: "formulas",
      items: [
        { label: "Transpose", body: t`$|A^T|=|A|$.` },
        { label: "Row swap", body: t`Interchanging two rows (or columns) changes the sign of the determinant.` },
        { label: "Zeros and repeats", body: t`If two rows (or columns) are identical or proportional, or a row is all zeros, the determinant is $0$.` },
        { label: "Scalar factor", body: t`Multiplying one row by $k$ multiplies the determinant by $k$. For an $n\times n$ matrix, $|kA|=k^n|A|$.` },
        { label: "Row operation", body: t`Adding a multiple of one row to another does not change the determinant.` },
        { label: "Product", body: t`$|AB|=|A|\,|B|$.` },
      ],
    },
    {
      title: "Adjoint and inverse",
      kind: "formulas",
      items: [
        { label: "Adjoint", body: t`$\text{adj}\,A$ is the transpose of the matrix of cofactors.` },
        { label: "Key identity", body: t`$$A\,(\text{adj}\,A)=(\text{adj}\,A)\,A=|A|\,I$$` },
        { label: "Inverse", body: t`$$A^{-1}=\frac{1}{|A|}\,\text{adj}\,A\qquad(|A|\ne0)$$` },
        { label: "Orders", body: t`$|\text{adj}\,A|=|A|^{n-1}$ and $|A^{-1}|=\dfrac{1}{|A|}$ for an $n\times n$ matrix.` },
        { label: "2×2 shortcut", body: t`$$\begin{pmatrix}a&b\\c&d\end{pmatrix}^{-1}=\frac{1}{ad-bc}\begin{pmatrix}d&-b\\-c&a\end{pmatrix}$$` },
      ],
    },
    {
      title: "Systems of linear equations",
      kind: "concepts",
      items: [
        { body: t`Write the system as $AX=B$. If $|A|\ne0$ the **unique** solution is $X=A^{-1}B$.` },
        { body: t`If $|A|=0$, compute $(\text{adj}\,A)B$. If it is **not** the zero matrix the system is **inconsistent** (no solution).` },
        { body: t`If $|A|=0$ and $(\text{adj}\,A)B=O$, the system is **consistent with infinitely many** solutions.` },
        { body: t`A homogeneous system $AX=O$ always has the trivial solution; it has non-trivial solutions iff $|A|=0$.` },
      ],
    },
    {
      title: "Common mistakes",
      kind: "mistakes",
      items: [
        { body: t`Forgetting the alternating signs $+\,-\,+$ when expanding along a row.` },
        { body: t`Using the minor instead of the cofactor (missing $(-1)^{i+j}$).` },
        { body: t`Writing $|kA|=k|A|$. For an $n\times n$ matrix it is $k^n|A|$.` },
        { body: t`Forgetting to **transpose** the cofactor matrix when forming the adjoint.` },
        { body: t`Writing $A^{-1}$ without checking $|A|\ne0$.` },
      ],
    },
    {
      title: "Quick worked example",
      kind: "example",
      items: [
        { label: "Problem", body: t`Find $A^{-1}$ for $A=${M([2, 1], [5, 3])}$.` },
        { label: "Step 1", body: t`$|A|=2(3)-1(5)=1\ne0$.` },
        { label: "Step 2", body: t`$\text{adj}\,A=${M([3, -1], [-5, 2])}$.` },
        { label: "Answer", body: t`$A^{-1}=\dfrac{1}{1}${M([3, -1], [-5, 2])}$.` },
      ],
    },
  ],

  examples: [
    {
      title: "Expanding a 3×3 determinant",
      problem: t`Evaluate $${D([1, 2, 3], [0, 1, 4], [5, 6, 0])}$.`,
      steps: [
        { doit: t`Expand along row $1$: $1\cdot M_{11}-2\cdot M_{12}+3\cdot M_{13}$`, why: t`The signs alternate $+,-,+$ along the first row.` },
        { doit: t`$M_{11}=\begin{vmatrix}1&4\\6&0\end{vmatrix}=-24,\ M_{12}=\begin{vmatrix}0&4\\5&0\end{vmatrix}=-20,\ M_{13}=\begin{vmatrix}0&1\\5&6\end{vmatrix}=-5$`, why: t`Each minor is the $2\times2$ determinant left after deleting that entry's row and column.` },
        { doit: t`$1(-24)-2(-20)+3(-5)=-24+40-15$`, why: t`Substitute the minors, paying attention to the minus signs.` },
      ],
      answer: t`$1$`,
    },
    {
      title: "Inverse using the adjoint",
      problem: t`Find $A^{-1}$ for $A=${M([1, 2, 3], [0, 1, 4], [5, 6, 0])}$.`,
      steps: [
        { doit: t`$|A|=1\ne0$ (computed above)`, why: t`The inverse exists only when the determinant is non-zero.` },
        { doit: t`Cofactors: $A_{11}=-24,\ A_{12}=20,\ A_{13}=-5,\ A_{21}=18,\ A_{22}=-15,\ A_{23}=4,\ A_{31}=5,\ A_{32}=-4,\ A_{33}=1$`, why: t`Each cofactor is $(-1)^{i+j}$ times its minor.` },
        { doit: t`$\text{adj}\,A=${M([-24, 18, 5], [20, -15, -4], [-5, 4, 1])}$`, why: t`The adjoint is the **transpose** of the cofactor matrix: the cofactors of row $1$ become column $1$.` },
        { doit: t`$A^{-1}=\dfrac{1}{|A|}\text{adj}\,A$`, why: t`Divide the adjoint by the determinant; here $|A|=1$.` },
      ],
      answer: t`$A^{-1}=${M([-24, 18, 5], [20, -15, -4], [-5, 4, 1])}$`,
    },
    {
      title: "Solving a system with the inverse",
      problem: t`Solve $2x+y=4$ and $x-y=-1$ using matrices.`,
      steps: [
        { doit: t`$A=${M([2, 1], [1, -1])}$, $\ X=${M(["x"], ["y"])}$, $\ B=${M([4], [-1])}$`, why: t`Write the system in the form $AX=B$.` },
        { doit: t`$|A|=-2-1=-3\ne0$`, why: t`A non-zero determinant guarantees a unique solution $X=A^{-1}B$.` },
        { doit: t`$A^{-1}=\dfrac{1}{-3}${M([-1, -1], [-1, 2])}=${M(["\\frac13", "\\frac13"], ["\\frac13", "-\\frac23"])}$`, why: t`Use the $2\times2$ inverse formula.` },
        { doit: t`$X=A^{-1}B=${M(["\\frac43-\\frac13"], ["\\frac43+\\frac23"])}=${M([1], [2])}$`, why: t`Multiply $A^{-1}$ by $B$ to read off $x$ and $y$.` },
      ],
      answer: t`$x=1,\ y=2$`,
    },
  ],

  cards: [
    c("Evaluation", t`$\begin{vmatrix}a&b\\c&d\end{vmatrix}$`, t`$ad-bc$`),
    c("Evaluation", t`Minor and cofactor of the entry $a_{ij}$`, t`Minor $M_{ij}$: determinant after deleting row $i$ and column $j$.\nCofactor: $A_{ij}=(-1)^{i+j}M_{ij}$.`),
    c("Evaluation", t`Area of a triangle with vertices $(x_1,y_1),(x_2,y_2),(x_3,y_3)$`, t`$$\frac12\left|\begin{vmatrix}x_1&y_1&1\\x_2&y_2&1\\x_3&y_3&1\end{vmatrix}\right|$$`),
    c("Properties", t`What does swapping two rows do to a determinant?`, t`It changes the sign.`),
    c("Properties", t`When is a determinant zero? (three situations)`, t`When a row/column is all zero, when two rows/columns are identical, or when two rows/columns are proportional.`),
    c("Properties", t`$|kA|$ for an $n\times n$ matrix`, t`$k^n|A|$`),
    c("Properties", t`$|AB|$ and $|A^T|$`, t`$|AB|=|A||B|$ and $|A^T|=|A|$.`),
    c("Inverse", t`Definition of $\text{adj}\,A$`, t`The transpose of the matrix of cofactors of $A$.`),
    c("Inverse", t`$A\,(\text{adj}\,A)$`, t`$|A|\,I$, the same as $(\text{adj}\,A)A$.`),
    c("Inverse", t`Formula for $A^{-1}$ and the condition for its existence`, t`$A^{-1}=\dfrac{1}{|A|}\text{adj}\,A$, provided $|A|\ne0$ (non-singular).`),
    c("Inverse", t`$|\text{adj}\,A|$ and $|A^{-1}|$ for an $n\times n$ matrix`, t`$|\text{adj}\,A|=|A|^{n-1}$ and $|A^{-1}|=\dfrac{1}{|A|}$.`),
    c("Systems", t`Solution of $AX=B$ when $|A|\ne0$`, t`Unique solution $X=A^{-1}B$.`),
    c("Systems", t`$AX=B$ with $|A|=0$: how to decide consistency?`, t`Find $(\text{adj}\,A)B$. If it is non-zero the system is inconsistent; if it is the zero matrix there are infinitely many solutions.`),
  ],
};
