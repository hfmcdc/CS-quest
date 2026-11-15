import type { ChapterContent } from "../types";
import { HELP, cardMk, mcq, mk, num, tup } from "../qhelpers";

const t = String.raw;
const q = mk("mat");
const c = cardMk("mat", "MT");

/** TeX for a matrix in round brackets: M([1,2],[3,4]). */
const M = (...rows: (string | number)[][]) => "\\begin{pmatrix}" + rows.map((r) => r.join("&")).join("\\\\") + "\\end{pmatrix}";

export const mat: ChapterContent = {
  id: "mat",
  questions: [
    q("MAT-1", "Order", "direct", 1,
      t`A matrix has $3$ rows and $4$ columns. How many elements does it have?`,
      num(12), t`$12$`,
      [
        t`A matrix of order $m\times n$ has $mn$ elements.`,
        t`Here $m=3$ and $n=4$, so there are $3\times4=12$ elements.`,
      ],
      t`Multiply the number of rows by the number of columns.`,
      { input: HELP.num }),

    q("MAT-2", "Addition", "direct", 1,
      t`If $A=${M([1, 2], [3, 4])}$ and $B=${M([0, 1], [-1, 2])}$, find $A+B$.`,
      tup([1, 3, 2, 6]), t`$${M([1, 3], [2, 6])}$`,
      [
        t`Add corresponding entries (the matrices have the same order $2\times2$).`,
        t`$\ ${M(["1+0", "2+1"], ["3-1", "4+2"])}=${M([1, 3], [2, 6])}$.`,
      ],
      t`Matrices of the same order are added entry by entry.`,
      { input: HELP.mat }),

    q("MAT-3", "Transpose", "direct", 1,
      t`Find the transpose of $A=${M([1, 2, 3], [4, 5, 6])}$. Give the entries of $A^T$ row by row.`,
      tup([1, 4, 2, 5, 3, 6]), t`$A^T=${M([1, 4], [2, 5], [3, 6])}$`,
      [
        t`$A$ is $2\times3$, so $A^T$ is $3\times2$.`,
        t`The rows of $A$ become the columns of $A^T$: first row $(1,2,3)$ becomes the first column.`,
        t`$A^T=${M([1, 4], [2, 5], [3, 6])}$, which has entries $1,4,2,5,3,6$ read row by row.`,
      ],
      t`Interchange rows and columns: the first row of $A$ becomes the first column of $A^T$.`,
      { input: HELP.mat }),

    q("MAT-4", "Multiplication", "short", 2,
      t`If $A=${M([1, 2], [3, 4])}$ and $B=${M([2, 0], [1, 3])}$, find $AB$.`,
      tup([4, 6, 10, 12]), t`$AB=${M([4, 6], [10, 12])}$`,
      [
        t`Each entry of $AB$ is (row of $A$) $\cdot$ (column of $B$).`,
        t`Row 1: $1(2)+2(1)=4$ and $1(0)+2(3)=6$.`,
        t`Row 2: $3(2)+4(1)=10$ and $3(0)+4(3)=12$.`,
      ],
      t`Entry in row $i$, column $j$ of $AB$ is the sum of products of row $i$ of $A$ with column $j$ of $B$.`,
      { input: HELP.mat }),

    q("MAT-5", "Powers", "short", 2,
      t`If $A=${M([2, 3], [1, -1])}$, find $A^2$.`,
      tup([7, 3, 1, 4]), t`$A^2=${M([7, 3], [1, 4])}$`,
      [
        t`$A^2=A\cdot A$. Row 1: $2(2)+3(1)=7$ and $2(3)+3(-1)=3$.`,
        t`Row 2: $1(2)+(-1)(1)=1$ and $1(3)+(-1)(-1)=4$.`,
      ],
      t`Multiply $A$ by itself using row-by-column products.`,
      { input: HELP.mat }),

    q("MAT-6", "Skew-symmetric", "short", 2,
      t`Which of these matrices is skew-symmetric?`,
      mcq([
        t`$${M([0, 2], [-2, 0])}$`,
        t`$${M([0, 2], [2, 0])}$`,
        t`$${M([1, 2], [-2, 1])}$`,
        t`$${M([0, 2], [-2, 1])}$`,
      ], 0),
      t`$${M([0, 2], [-2, 0])}$`,
      [
        t`A matrix is skew-symmetric when $A^T=-A$, i.e. $a_{ji}=-a_{ij}$.`,
        t`This forces every diagonal entry to be $0$ (since $a_{ii}=-a_{ii}$).`,
        t`Only the first option has zero diagonal and $a_{21}=-a_{12}$.`,
      ],
      t`Diagonal entries of a skew-symmetric matrix must be $0$, and $a_{ji}=-a_{ij}$.`),

    q("MAT-7", "Equal matrices", "short", 2,
      t`If $${M(["x+y", 2], [5, "xy"])}=${M([6, 2], [5, 8])}$, find $x^2+y^2$.`,
      num(20), t`$20$`,
      [
        t`Equal matrices have equal corresponding entries: $x+y=6$ and $xy=8$.`,
        t`$x^2+y^2=(x+y)^2-2xy=36-16=20$.`,
        t`(Indeed $\{x,y\}=\{2,4\}$, and $4+16=20$.)`,
      ],
      t`Use $x^2+y^2=(x+y)^2-2xy$.`,
      { input: HELP.num }),

    q("MAT-8", "Powers", "short", 2,
      t`If $A=${M([1, 2], [0, 1])}$, find the entry in row $1$, column $2$ of $A^3$.`,
      num(6), t`$6$`,
      [
        t`$A^2=${M([1, 4], [0, 1])}$.`,
        t`$A^3=A^2\cdot A=${M([1, 6], [0, 1])}$.`,
        t`The required entry is $6$. (In general $A^n=${M([1, "2n"], [0, 1])}$.)`,
      ],
      t`Compute $A^2$ first, then multiply by $A$ once more.`,
      { input: HELP.num }),

    q("MAT-9", "Scalar multiple", "short", 2,
      t`If $A=${M([1, 1], [1, 1])}$ and $A^2=kA$, find $k$.`,
      num(2), t`$k=2$`,
      [
        t`$A^2=${M(["1+1", "1+1"], ["1+1", "1+1"])}=${M([2, 2], [2, 2])}$.`,
        t`This equals $2A$, so $k=2$.`,
      ],
      t`Multiply $A$ by itself and compare each entry with the corresponding entry of $A$.`,
      { input: HELP.num }),

    q("MAT-10", "Symmetric part", "steps", 2,
      t`Find the symmetric part $\frac12\left(A+A^T\right)$ of $A=${M([1, 2], [4, 3])}$. Give its entries row by row.`,
      tup([1, 3, 3, 3]), t`$${M([1, 3], [3, 3])}$`,
      [
        t`$A^T=${M([1, 4], [2, 3])}$.`,
        t`$A+A^T=${M([2, 6], [6, 6])}$.`,
        t`Half of it is $${M([1, 3], [3, 3])}$, which is symmetric.`,
      ],
      t`Add $A$ and $A^T$ entry by entry, then halve each entry.`,
      { input: HELP.mat }),

    q("MAT-11", "Product rule for transpose", "direct", 2,
      t`For matrices $A$ and $B$ such that $AB$ is defined, $(AB)^T$ equals:`,
      mcq([t`$B^TA^T$`, t`$A^TB^T$`, t`$AB^T$`, t`$A^TB$`], 0),
      t`$B^TA^T$`,
      [
        t`The transpose reverses the order of a product: $(AB)^T=B^TA^T$.`,
        t`Check the orders: if $A$ is $m\times n$ and $B$ is $n\times p$, then $B^T$ is $p\times n$ and $A^T$ is $n\times m$, so $B^TA^T$ is defined and is $p\times m$, the order of $(AB)^T$.`,
      ],
      t`Compare the orders of the matrices: the reversed product is the only one that is always defined.`),

    q("MAT-12", "Inverse by a matrix equation", "exam", 3,
      t`If $A=${M([1, 2], [-1, 3])}$ satisfies $A^2-4A+5I=O$, find $A^{-1}$. Give its entries row by row.`,
      tup([0.6, -0.4, 0.2, 0.2]), t`$A^{-1}=\dfrac15${M([3, -2], [1, 1])}$`,
      [
        t`Multiply $A^2-4A+5I=O$ by $A^{-1}$: $A-4I+5A^{-1}=O$.`,
        t`So $5A^{-1}=4I-A=${M([3, -2], [1, 1])}$.`,
        t`Hence $A^{-1}=\dfrac15${M([3, -2], [1, 1])}$, with entries $\frac35,-\frac25,\frac15,\frac15$.`,
      ],
      t`Multiply the given equation by $A^{-1}$ and solve for $A^{-1}$.`,
      { input: HELP.mat }),

    q("MAT-13", "Zero product", "exam", 3,
      t`Which statement about matrices is true?`,
      mcq([
        t`$AB=O$ is possible even when $A\ne O$ and $B\ne O$`,
        t`$AB=O$ implies $A=O$ or $B=O$`,
        t`$AB=BA$ for all square matrices of the same order`,
        t`$(A+B)^2=A^2+2AB+B^2$ always`,
      ], 0),
      t`$AB=O$ is possible even when $A\ne O$ and $B\ne O$`,
      [
        t`Take $A=${M([1, 1], [1, 1])}$ and $B=${M([1, -1], [-1, 1])}$. Both are non-zero.`,
        t`$AB=${M(["1-1", "-1+1"], ["1-1", "-1+1"])}=O$.`,
        t`Matrix multiplication is not commutative, so $AB\ne BA$ in general, and $(A+B)^2=A^2+AB+BA+B^2$, which equals $A^2+2AB+B^2$ only when $AB=BA$.`,
      ],
      t`Try the two matrices whose entries are all $1$ and the one with entries $1,-1,-1,1$.`),

    q("MAT-C1", "Large powers", "exam", 3,
      t`If $A=${M([0, 1], [-1, 0])}$, find $A^{2025}$. Give its entries row by row.`,
      tup([0, 1, -1, 0]), t`$A^{2025}=A=${M([0, 1], [-1, 0])}$`,
      [
        t`$A^2=${M(["0-1", 0], [0, "-1+0"])}=-I$.`,
        t`Then $A^4=(A^2)^2=(-I)^2=I$, so the powers repeat with period $4$.`,
        t`$2025=4(506)+1$, so $A^{2025}=A^1=A$.`,
      ],
      t`Compute $A^2$, then $A^4$, and look for a repeating pattern.`,
      { challenge: true, input: HELP.mat }),

    q("MAT-C2", "Rotation matrix powers", "exam", 3,
      t`If $A=${M(["\\cos30^\\circ", "\\sin30^\\circ"], ["-\\sin30^\\circ", "\\cos30^\\circ"])}$, find the entry in row $1$, column $2$ of $A^3$.`,
      num(1), t`$1$`,
      [
        t`For $A=${M(["\\cos\\theta", "\\sin\\theta"], ["-\\sin\\theta", "\\cos\\theta"])}$ we have $A^n=${M(["\\cos n\\theta", "\\sin n\\theta"], ["-\\sin n\\theta", "\\cos n\\theta"])}$ (verify $n=2$ with the double-angle formulas, then use induction).`,
        t`With $\theta=30^\circ$ and $n=3$: the entry is $\sin90^\circ=1$.`,
      ],
      t`Multiplying two such matrices adds the angles.`,
      { challenge: true, input: HELP.num }),

    q("MAT-C3", "Counting matrices", "exam", 3,
      t`How many $3\times3$ symmetric matrices are there with every entry equal to $0$ or $1$?`,
      num(64), t`$64$`,
      [
        t`A symmetric matrix is fixed by its entries on and above the diagonal: $3+2+1=6$ entries.`,
        t`Each of those $6$ entries is $0$ or $1$ independently, and the entries below the diagonal are forced.`,
        t`Total $2^6=64$.`,
      ],
      t`Count how many entries are free once symmetry fixes the rest.`,
      { challenge: true, input: HELP.num }),

    q("MAT-C4", "Symmetric products", "exam", 3,
      t`If $A$ and $B$ are symmetric matrices of the same order, $AB$ is symmetric if and only if:`,
      mcq([t`$AB=BA$`, t`$A=B$`, t`$AB=O$`, t`$A$ or $B$ is the identity`], 0),
      t`$AB=BA$`,
      [
        t`$(AB)^T=B^TA^T=BA$ because $A$ and $B$ are symmetric.`,
        t`$AB$ is symmetric iff $(AB)^T=AB$, that is iff $BA=AB$.`,
      ],
      t`Take the transpose of $AB$ and use $A^T=A$, $B^T=B$.`,
      { challenge: true }),
  ],

  revision: [
    {
      title: "Types and order",
      kind: "formulas",
      items: [
        { label: "Order", body: t`A matrix with $m$ rows and $n$ columns has order $m\times n$ and $mn$ entries.` },
        { label: "Square matrix", body: t`$m=n$. A **diagonal** matrix has $a_{ij}=0$ for $i\ne j$; a **scalar** matrix is diagonal with equal diagonal entries; the **identity** $I$ has diagonal entries $1$.` },
        { label: "Equality", body: t`$A=B$ iff they have the same order and $a_{ij}=b_{ij}$ for every $i,j$.` },
        { label: "Zero matrix", body: t`$O$ has all entries $0$; $A+O=A$ and $A+(-A)=O$.` },
      ],
    },
    {
      title: "Operations and properties",
      kind: "formulas",
      items: [
        { label: "Addition", body: t`Only for matrices of the same order: $(A+B)_{ij}=a_{ij}+b_{ij}$. It is commutative and associative.` },
        { label: "Multiplication", body: t`$AB$ exists when columns of $A$ = rows of $B$. If $A$ is $m\times n$ and $B$ is $n\times p$, then $AB$ is $m\times p$ and $$(AB)_{ij}=\sum_{k}a_{ik}b_{kj}$$` },
        { label: "Laws", body: t`$A(BC)=(AB)C$, $\ A(B+C)=AB+AC$, $\ AI=IA=A$.` },
        { label: "Not commutative", body: t`In general $AB\ne BA$. Also $AB=O$ does **not** imply $A=O$ or $B=O$.` },
      ],
    },
    {
      title: "Transpose, symmetric and skew-symmetric",
      kind: "formulas",
      items: [
        { label: "Rules", body: t`$$(A^T)^T=A,\quad(A+B)^T=A^T+B^T,\quad(kA)^T=kA^T,\quad(AB)^T=B^TA^T$$` },
        { label: "Symmetric", body: t`$A^T=A$, i.e. $a_{ji}=a_{ij}$.` },
        { label: "Skew-symmetric", body: t`$A^T=-A$, i.e. $a_{ji}=-a_{ij}$; so every diagonal entry is $0$.` },
        { label: "Decomposition", body: t`Every square matrix is the sum of a symmetric and a skew-symmetric matrix: $$A=P+Q,\qquad P=\tfrac12(A+A^T),\ \ Q=\tfrac12(A-A^T)$$` },
      ],
    },
    {
      title: "Invertible matrices",
      kind: "concepts",
      items: [
        { body: t`A square matrix $A$ is **invertible** if there is $B$ with $AB=BA=I$. Then $B$ is unique and is written $A^{-1}$.` },
        { body: t`$(AB)^{-1}=B^{-1}A^{-1}$ and $(A^T)^{-1}=(A^{-1})^T$.` },
        { body: t`If $A$ satisfies a polynomial equation such as $A^2-4A+5I=O$, multiply by $A^{-1}$ to get $A^{-1}$ without any row operations.` },
        { body: t`In this course $A^{-1}$ exists iff $\det A\ne0$ (see Determinants).` },
      ],
    },
    {
      title: "Common mistakes",
      kind: "mistakes",
      items: [
        { body: t`Multiplying entry by entry instead of row by column.` },
        { body: t`Writing $(AB)^T=A^TB^T$. The order reverses: $(AB)^T=B^TA^T$.` },
        { body: t`Expanding $(A+B)^2$ as $A^2+2AB+B^2$. Since $AB\ne BA$ in general, it is $A^2+AB+BA+B^2$.` },
        { body: t`Adding matrices of different orders, or multiplying when the inner orders do not match.` },
      ],
    },
    {
      title: "Quick worked example",
      kind: "example",
      items: [
        { label: "Problem", body: t`Write $A=${M([3, 5], [1, -1])}$ as the sum of a symmetric and a skew-symmetric matrix.` },
        { label: "Symmetric", body: t`$P=\frac12(A+A^T)=${M([3, 3], [3, -1])}$.` },
        { label: "Skew", body: t`$Q=\frac12(A-A^T)=${M([0, 2], [-2, 0])}$.` },
        { label: "Check", body: t`$P+Q=${M([3, 5], [1, -1])}=A$.` },
      ],
    },
  ],

  examples: [
    {
      title: "Multiplying two matrices",
      problem: t`Find $AB$ if $A=${M([1, 2], [3, 4])}$ and $B=${M([2, 0], [1, 3])}$.`,
      steps: [
        { doit: t`$A$ is $2\times2$ and $B$ is $2\times2$, so $AB$ exists and is $2\times2$`, why: t`Check that the number of columns of $A$ equals the number of rows of $B$ before multiplying.` },
        { doit: t`$(AB)_{11}=1(2)+2(1)=4,\quad(AB)_{12}=1(0)+2(3)=6$`, why: t`Row $1$ of $A$ is multiplied with each column of $B$ in turn.` },
        { doit: t`$(AB)_{21}=3(2)+4(1)=10,\quad(AB)_{22}=3(0)+4(3)=12$`, why: t`Row $2$ of $A$ is multiplied with each column of $B$.` },
      ],
      answer: t`$AB=${M([4, 6], [10, 12])}$`,
    },
    {
      title: "Symmetric plus skew-symmetric",
      problem: t`Express $A=${M([3, 5], [1, -1])}$ as $P+Q$ with $P$ symmetric and $Q$ skew-symmetric.`,
      steps: [
        { doit: t`$A^T=${M([3, 1], [5, -1])}$`, why: t`Both $P$ and $Q$ are built from $A$ and its transpose.` },
        { doit: t`$P=\frac12(A+A^T)=${M([3, 3], [3, -1])}$`, why: t`$P^T=\frac12(A^T+A)=P$, so $P$ is symmetric.` },
        { doit: t`$Q=\frac12(A-A^T)=${M([0, 2], [-2, 0])}$`, why: t`$Q^T=\frac12(A^T-A)=-Q$, so $Q$ is skew-symmetric.` },
        { doit: t`$P+Q=${M([3, 5], [1, -1])}=A$`, why: t`Always check that the two parts add back to $A$.` },
      ],
      answer: t`$A=${M([3, 3], [3, -1])}+${M([0, 2], [-2, 0])}$`,
    },
    {
      title: "Inverse from a matrix equation",
      problem: t`If $A=${M([2, 1], [1, 1])}$, show that $A^2-3A+I=O$ and hence find $A^{-1}$.`,
      steps: [
        { doit: t`$A^2=${M([5, 3], [3, 2])}$, $\ 3A=${M([6, 3], [3, 3])}$`, why: t`Compute each term of the polynomial separately.` },
        { doit: t`$A^2-3A+I=${M(["5-6+1", "3-3"], ["3-3", "2-3+1"])}=O$`, why: t`Combine the three matrices entry by entry.` },
        { doit: t`$A-3I+A^{-1}=O$ (multiplying by $A^{-1}$)`, why: t`$A^{-1}A^2=A$, $A^{-1}A=I$ and $A^{-1}I=A^{-1}$.` },
        { doit: t`$A^{-1}=3I-A=${M([1, -1], [-1, 2])}$`, why: t`Rearrange to isolate $A^{-1}$.` },
      ],
      answer: t`$A^{-1}=${M([1, -1], [-1, 2])}$`,
    },
  ],

  cards: [
    c("Basics", t`Order of a matrix with $m$ rows and $n$ columns; number of entries`, t`Order $m\times n$; it has $mn$ entries.`),
    c("Basics", t`When are two matrices equal?`, t`When they have the same order and all corresponding entries are equal.`),
    c("Types", t`Diagonal, scalar and identity matrices`, t`Diagonal: $a_{ij}=0$ for $i\ne j$.\nScalar: diagonal with equal diagonal entries.\nIdentity $I$: scalar with diagonal entries $1$.`),
    c("Operations", t`Condition for $AB$ to exist, and its order`, t`Columns of $A$ = rows of $B$. If $A$ is $m\times n$ and $B$ is $n\times p$, then $AB$ is $m\times p$.`),
    c("Operations", t`Is matrix multiplication commutative?`, t`No. In general $AB\ne BA$.`),
    c("Operations", t`Does $AB=O$ imply $A=O$ or $B=O$?`, t`No. For example $\begin{pmatrix}1&1\\1&1\end{pmatrix}\begin{pmatrix}1&-1\\-1&1\end{pmatrix}=O$.`),
    c("Transpose", t`$(AB)^T$ in terms of $A^T$ and $B^T$`, t`$$(AB)^T=B^TA^T$$`),
    c("Transpose", t`$(A+B)^T$ and $(kA)^T$`, t`$(A+B)^T=A^T+B^T$ and $(kA)^T=kA^T$.`),
    c("Symmetric", t`Definition of symmetric and skew-symmetric matrices`, t`Symmetric: $A^T=A$.\nSkew-symmetric: $A^T=-A$.`),
    c("Symmetric", t`What are the diagonal entries of a skew-symmetric matrix?`, t`All $0$, because $a_{ii}=-a_{ii}$.`),
    c("Decomposition", t`Write a square matrix $A$ as symmetric + skew-symmetric`, t`$$A=\tfrac12(A+A^T)+\tfrac12(A-A^T)$$`),
    c("Inverse", t`Definition of an invertible matrix and the inverse of a product`, t`$AB=BA=I$ defines $B=A^{-1}$ (it is unique).\n$$(AB)^{-1}=B^{-1}A^{-1}$$`),
    c("Common mistake", t`Expand $(A+B)^2$ for square matrices`, t`$A^2+AB+BA+B^2$. It equals $A^2+2AB+B^2$ only if $AB=BA$.`),
  ],
};
