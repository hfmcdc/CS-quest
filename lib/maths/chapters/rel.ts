import type { ChapterContent } from "../types";
import { HELP, cardMk, expr, mcq, mk, num } from "../qhelpers";

const t = String.raw;
const q = mk("rel");
const c = cardMk("rel", "RL");

export const rel: ChapterContent = {
  id: "rel",
  questions: [
    q("REL-1", "Types of relations", "direct", 1,
      t`A relation $R$ on $A=\{1,2,3\}$ is $R=\{(1,1),(2,2),(3,3),(1,2)\}$. Which statement is true?`,
      mcq([
        t`Reflexive and transitive, but not symmetric`,
        t`Symmetric, but not reflexive`,
        t`An equivalence relation`,
        t`Neither reflexive nor transitive`,
      ], 0),
      t`Reflexive and transitive, but not symmetric`,
      [
        t`Reflexive: $(1,1),(2,2),(3,3)\in R$, so every element is related to itself.`,
        t`Symmetric fails: $(1,2)\in R$ but $(2,1)\notin R$.`,
        t`Transitive holds: the only chain with two different elements is $(1,2),(2,2)\Rightarrow(1,2)\in R$, which is present.`,
      ],
      t`Check the three properties one at a time: does every $a$ have $(a,a)$? Is every pair reversible? Do chains close up?`),

    q("REL-2", "Counting relations", "direct", 1,
      t`If $A$ has $2$ elements and $B$ has $3$ elements, how many relations from $A$ to $B$ are there?`,
      num(64), t`$64$`,
      [
        t`A relation from $A$ to $B$ is any subset of $A\times B$.`,
        t`$n(A\times B)=2\times3=6$.`,
        t`A set with $6$ elements has $2^6=64$ subsets, so there are $64$ relations.`,
      ],
      t`A relation is a subset of $A\times B$. How many subsets does a $6$-element set have?`,
      { input: HELP.num, traps: [{ value: 6, msg: t`$6$ is the number of ordered pairs in $A\times B$, not the number of relations. Each relation is a subset of $A\times B$, so count subsets: $2^6$.` }] }),

    q("REL-3", "One-one and onto", "direct", 1,
      t`The function $f:\mathbb{R}\to\mathbb{R}$, $f(x)=x^2$ is:`,
      mcq([
        t`Neither one-one nor onto`,
        t`One-one but not onto`,
        t`Onto but not one-one`,
        t`Bijective`,
      ], 0),
      t`Neither one-one nor onto`,
      [
        t`Not one-one: $f(2)=f(-2)=4$ although $2\ne-2$.`,
        t`Not onto: $x^2\ge0$, so no negative real number (for example $-1$) is ever an output.`,
      ],
      t`Try $f(2)$ and $f(-2)$, then ask whether $-1$ can be a value of $x^2$.`),

    q("REL-4", "Equivalence relation", "short", 2,
      t`On $\mathbb{Z}$, define $R=\{(a,b): a-b \text{ is divisible by } 3\}$. Which statement is correct?`,
      mcq([
        t`$R$ is an equivalence relation`,
        t`$R$ is reflexive and symmetric but not transitive`,
        t`$R$ is symmetric and transitive but not reflexive`,
        t`$R$ is only reflexive`,
      ], 0),
      t`$R$ is an equivalence relation`,
      [
        t`Reflexive: $a-a=0$ is divisible by $3$.`,
        t`Symmetric: if $3\mid(a-b)$ then $3\mid(b-a)$, since $b-a=-(a-b)$.`,
        t`Transitive: if $3\mid(a-b)$ and $3\mid(b-c)$, then $3\mid\big((a-b)+(b-c)\big)=3\mid(a-c)$.`,
        t`All three properties hold, so $R$ is an equivalence relation.`,
      ],
      t`Test reflexive with $a-a$, symmetric with $b-a=-(a-b)$, and transitive by adding $a-b$ and $b-c$.`),

    q("REL-5", "Equivalence classes", "short", 2,
      t`For the relation $R=\{(a,b): a-b \text{ is divisible by } 3\}$ on $\mathbb{Z}$, how many distinct equivalence classes are there?`,
      num(3), t`$3$`,
      [
        t`Two integers are in the same class exactly when they leave the same remainder on division by $3$.`,
        t`The possible remainders are $0,1,2$, giving three classes: $[0]$, $[1]$ and $[2]$.`,
      ],
      t`Which remainders are possible when an integer is divided by $3$?`,
      { input: HELP.num }),

    q("REL-6", "Composition", "short", 2,
      t`Let $f(x)=2x+3$ and $g(x)=x^2$. Find $(f\comp g)(2)$.`,
      num(11), t`$11$`,
      [
        t`$(f\comp g)(2)=f\big(g(2)\big)$: apply $g$ first.`,
        t`$g(2)=2^2=4$.`,
        t`$f(4)=2(4)+3=11$.`,
      ],
      t`In $f\comp g$ the function $g$ acts first, then $f$.`,
      { input: HELP.num, traps: [{ value: 49, msg: t`That is $(g\comp f)(2)$: you applied $f$ first. For $f\comp g$ apply $g$ first, then $f$.` }] }),

    q("REL-7", "Inverse function", "steps", 2,
      t`Find $f^{-1}(x)$ for the bijective function $f:\mathbb{R}\to\mathbb{R}$, $f(x)=3x+5$.`,
      expr("(x-5)/3", [-5, 5]), t`$f^{-1}(x)=\dfrac{x-5}{3}$`,
      [
        t`Put $y=3x+5$ and solve for $x$.`,
        t`$3x=y-5$, so $x=\dfrac{y-5}{3}$.`,
        t`Swap the names of the variable: $f^{-1}(x)=\dfrac{x-5}{3}$.`,
      ],
      t`Write $y=f(x)$, solve for $x$ in terms of $y$, then rename $y$ as $x$.`,
      { input: HELP.expr }),

    q("REL-8", "Counting functions", "short", 2,
      t`How many one-one functions are there from $\{1,2\}$ to $\{a,b,c,d\}$?`,
      num(12), t`$12$`,
      [
        t`For a one-one function, different inputs must have different outputs.`,
        t`The image of $1$ can be any of the $4$ elements.`,
        t`The image of $2$ must differ from it: $3$ choices. Total $4\times3=12$.`,
      ],
      t`Choose the image of $1$ first, then the image of $2$ with the restriction that it is different.`,
      { input: HELP.num, traps: [{ value: 16, msg: t`$4^2=16$ counts all functions, including those that are not one-one.` }] }),

    q("REL-9", "Range", "exam", 3,
      t`What is the range of $f:\mathbb{R}\to\mathbb{R}$, $f(x)=\dfrac{x}{1+x^2}$?`,
      mcq([
        t`$\left[-\frac12,\frac12\right]$`,
        t`$(-1,1)$`,
        t`$[-1,1]$`,
        t`$\left[0,\frac12\right]$`,
      ], 0),
      t`$\left[-\dfrac12,\dfrac12\right]$`,
      [
        t`Let $y=\dfrac{x}{1+x^2}$. Then $yx^2-x+y=0$.`,
        t`For $y\ne0$ this quadratic in $x$ needs a real solution, so its discriminant is non-negative: $1-4y^2\ge0$.`,
        t`Hence $-\frac12\le y\le\frac12$. The value $y=0$ is obtained at $x=0$, so it is included too.`,
        t`Both $\pm\frac12$ are attained (at $x=\pm1$), so the range is $\left[-\frac12,\frac12\right]$.`,
      ],
      t`Treat $y=\frac{x}{1+x^2}$ as a quadratic in $x$ and require its discriminant to be non-negative.`),

    q("REL-10", "Self-inverse function", "exam", 3,
      t`Let $f(x)=\dfrac{x+1}{x-1}$ for $x\ne1$. Find $(f\comp f)(x)$.`,
      expr("x", [2, 8]), t`$x$`,
      [
        t`$(f\comp f)(x)=f\left(\dfrac{x+1}{x-1}\right)=\dfrac{\frac{x+1}{x-1}+1}{\frac{x+1}{x-1}-1}$.`,
        t`Numerator: $\dfrac{(x+1)+(x-1)}{x-1}=\dfrac{2x}{x-1}$. Denominator: $\dfrac{(x+1)-(x-1)}{x-1}=\dfrac{2}{x-1}$.`,
        t`Dividing gives $\dfrac{2x}{2}=x$. So $f\comp f$ is the identity: $f$ is its own inverse.`,
      ],
      t`Substitute $f(x)$ for the variable inside $f$ and put everything over the common denominator $x-1$.`,
      { input: HELP.expr }),

    q("REL-11", "Composition equation", "exam", 3,
      t`Let $f(x)=x+2$ and $g(x)=x^2$. Find $x$ such that $(g\comp f)(x)=(f\comp g)(x)$.`,
      num(-0.5), t`$x=-\dfrac12$`,
      [
        t`$(g\comp f)(x)=g(x+2)=(x+2)^2=x^2+4x+4$.`,
        t`$(f\comp g)(x)=f(x^2)=x^2+2$.`,
        t`Equate: $x^2+4x+4=x^2+2\Rightarrow4x=-2\Rightarrow x=-\frac12$.`,
      ],
      t`Write both compositions as expressions in $x$ and set them equal; the $x^2$ terms cancel.`,
      { input: HELP.num }),

    q("REL-C1", "Equivalence relations on a set", "exam", 3,
      t`How many equivalence relations are there on the set $\{1,2,3\}$?`,
      num(5), t`$5$`,
      [
        t`An equivalence relation on a set is the same thing as a partition of the set into classes.`,
        t`Partitions of $\{1,2,3\}$: all in one class ($1$ way); one pair together and the third alone ($3$ ways); all separate ($1$ way).`,
        t`Total $1+3+1=5$.`,
      ],
      t`Count the ways of splitting $\{1,2,3\}$ into non-empty groups.`,
      { challenge: true, input: HELP.num }),

    q("REL-C2", "Symmetric relations", "exam", 3,
      t`How many symmetric relations are there on a set with $3$ elements?`,
      num(64), t`$64$`,
      [
        t`There are $9$ ordered pairs: $3$ diagonal pairs $(a,a)$ and $6$ off-diagonal pairs forming $3$ mirror pairs $\{(a,b),(b,a)\}$.`,
        t`In a symmetric relation each diagonal pair is free (in or out) and each mirror pair is in or out together.`,
        t`That is $3+3=6$ independent yes/no choices, so $2^6=64$ symmetric relations.`,
      ],
      t`Group $(a,b)$ with $(b,a)$; each group, and each diagonal pair, is a single yes/no choice.`,
      { challenge: true, input: HELP.num }),

    q("REL-C3", "Onto functions", "exam", 3,
      t`How many onto functions are there from $\{1,2,3,4\}$ to $\{a,b\}$?`,
      num(14), t`$14$`,
      [
        t`Total functions from a $4$-element set to a $2$-element set: $2^4=16$.`,
        t`A function fails to be onto only if every element maps to $a$ or every element maps to $b$: $2$ functions.`,
        t`Onto functions $=16-2=14$.`,
      ],
      t`Count all functions, then subtract the ones whose image is a single element.`,
      { challenge: true, input: HELP.num }),

    q("REL-C4", "Invertible functions", "exam", 3,
      t`If $f:A\to B$ and $g:B\to C$ are both bijective, then $(g\comp f)^{-1}$ equals:`,
      mcq([
        t`$f^{-1}\comp g^{-1}$`,
        t`$g^{-1}\comp f^{-1}$`,
        t`$f\comp g$`,
        t`$g\comp f$`,
      ], 0),
      t`$f^{-1}\comp g^{-1}$`,
      [
        t`$g\comp f$ first applies $f$ (from $A$ to $B$), then $g$ (from $B$ to $C$).`,
        t`To undo it, undo the last step first: apply $g^{-1}$, then $f^{-1}$.`,
        t`That is $f^{-1}\comp g^{-1}$ (read right to left). Check: $(f^{-1}\comp g^{-1})\comp(g\comp f)=f^{-1}\comp f=\text{identity}$.`,
      ],
      t`Think of putting on socks then shoes: to undo, you remove the shoes first.`,
      { challenge: true }),
  ],

  revision: [
    {
      title: "Types of relations",
      kind: "formulas",
      items: [
        { label: "Reflexive", body: t`$$(a,a)\in R\ \text{for every } a\in A$$` },
        { label: "Symmetric", body: t`$$(a,b)\in R\ \Rightarrow\ (b,a)\in R$$` },
        { label: "Transitive", body: t`$$(a,b)\in R\ \text{and}\ (b,c)\in R\ \Rightarrow\ (a,c)\in R$$` },
        { label: "Equivalence relation", body: t`Reflexive **and** symmetric **and** transitive. It splits the set into disjoint equivalence classes.` },
        { label: "Counting", body: t`If $n(A)=m$ and $n(B)=n$: number of relations from $A$ to $B$ is $2^{mn}$; reflexive relations on $A$: $2^{m^2-m}$; symmetric relations on $A$: $2^{m(m+1)/2}$.` },
      ],
    },
    {
      title: "Types of functions",
      kind: "formulas",
      items: [
        { label: "One-one (injective)", body: t`$$f(x_1)=f(x_2)\Rightarrow x_1=x_2$$` },
        { label: "Onto (surjective)", body: t`Every element of the codomain is an image: range $=$ codomain.` },
        { label: "Bijective", body: t`One-one **and** onto. Only bijective functions have inverses.` },
        { label: "Counting functions", body: t`$n(A)=m,\ n(B)=n$: all functions $n^m$; one-one functions $\,^{n}P_m=n(n-1)\cdots(n-m+1)$ (needs $n\ge m$); bijections $m!$ (when $m=n$).` },
        { label: "Composition", body: t`$$(f\comp g)(x)=f\big(g(x)\big)$$ $g$ acts first. In general $f\comp g\ne g\comp f$.` },
        { label: "Inverse", body: t`$$f\comp f^{-1}=f^{-1}\comp f=I,\qquad (g\comp f)^{-1}=f^{-1}\comp g^{-1}$$` },
      ],
    },
    {
      title: "Key concepts",
      kind: "concepts",
      items: [
        { body: t`To prove a relation is an equivalence relation you must prove **all three** properties. To disprove it, one failing example for one property is enough.` },
        { body: t`To show $f$ is one-one: assume $f(x_1)=f(x_2)$ and deduce $x_1=x_2$. To show it is onto: take any $y$ in the codomain and solve $f(x)=y$ for $x$ in the domain.` },
        { body: t`Changing the domain or codomain can change whether a function is one-one or onto. $x^2$ on $\mathbb{R}\to\mathbb{R}$ is neither; on $[0,\infty)\to[0,\infty)$ it is bijective.` },
        { body: t`To find $f^{-1}$: write $y=f(x)$, solve for $x$, swap the names of the variables.` },
      ],
    },
    {
      title: "Common mistakes",
      kind: "mistakes",
      items: [
        { body: t`Applying the functions in the wrong order in $f\comp g$: $g$ is applied first.` },
        { body: t`Saying a relation is symmetric because **some** pairs are reversible. Every pair must be reversible.` },
        { body: t`Forgetting the empty-chain case: a relation can be transitive (or symmetric) vacuously.` },
        { body: t`Claiming a function is onto without checking the codomain, or giving an inverse for a function that is not bijective.` },
      ],
    },
    {
      title: "Quick worked example",
      kind: "example",
      items: [
        { label: "Problem", body: t`Show that $f:\mathbb{R}\to\mathbb{R}$, $f(x)=2x+3$ is bijective and find $f^{-1}$.` },
        { label: "One-one", body: t`$f(x_1)=f(x_2)\Rightarrow2x_1+3=2x_2+3\Rightarrow x_1=x_2$.` },
        { label: "Onto", body: t`For any $y$, $x=\frac{y-3}{2}\in\mathbb{R}$ gives $f(x)=y$.` },
        { label: "Answer", body: t`$f^{-1}(x)=\dfrac{x-3}{2}$.` },
      ],
    },
  ],

  examples: [
    {
      title: "Proving an equivalence relation",
      problem: t`Show that $R=\{(a,b):|a-b|\text{ is even}\}$ on $\{1,2,3,4,5\}$ is an equivalence relation.`,
      steps: [
        { doit: t`$|a-a|=0$ is even, so $(a,a)\in R$`, why: t`Reflexive: every element must be related to itself.` },
        { doit: t`$|a-b|=|b-a|$, so $(a,b)\in R\Rightarrow(b,a)\in R$`, why: t`Symmetric: the distance between two numbers does not depend on the order.` },
        { doit: t`If $a-b$ and $b-c$ are even, then $a-c=(a-b)+(b-c)$ is even`, why: t`Transitive: a sum of two even numbers is even.` },
        { doit: t`Classes: $\{1,3,5\}$ and $\{2,4\}$`, why: t`Elements are related when they have the same parity, which gives the two equivalence classes.` },
      ],
      answer: t`$R$ is reflexive, symmetric and transitive, hence an equivalence relation with classes $\{1,3,5\}$ and $\{2,4\}$.`,
    },
    {
      title: "Showing a function is bijective",
      problem: t`Show that $f:\mathbb{R}\to\mathbb{R}$, $f(x)=2x+3$ is bijective and find $f^{-1}$.`,
      steps: [
        { doit: t`Suppose $f(x_1)=f(x_2)$. Then $2x_1+3=2x_2+3$, so $x_1=x_2$`, why: t`This is the one-one test: equal outputs force equal inputs.` },
        { doit: t`Let $y\in\mathbb{R}$. Put $x=\dfrac{y-3}{2}$; then $f(x)=y$`, why: t`This is the onto test: every $y$ in the codomain has a pre-image in the domain.` },
        { doit: t`$f$ is one-one and onto, hence bijective`, why: t`Both conditions are needed for an inverse to exist.` },
        { doit: t`$y=2x+3\Rightarrow x=\dfrac{y-3}{2}$, so $f^{-1}(x)=\dfrac{x-3}{2}$`, why: t`Solve for $x$ and swap variable names to write the inverse.` },
      ],
      answer: t`$f$ is bijective and $f^{-1}(x)=\dfrac{x-3}{2}$.`,
    },
    {
      title: "Finding both compositions",
      problem: t`If $f(x)=x+2$ and $g(x)=x^2$, find $f\comp g$ and $g\comp f$.`,
      steps: [
        { doit: t`$(f\comp g)(x)=f\big(g(x)\big)=f(x^2)=x^2+2$`, why: t`In $f\comp g$ the function $g$ acts first, so $x^2$ is fed into $f$.` },
        { doit: t`$(g\comp f)(x)=g\big(f(x)\big)=g(x+2)=(x+2)^2$`, why: t`In $g\comp f$ the function $f$ acts first, so $x+2$ is fed into $g$.` },
        { doit: t`$x^2+2\ne(x+2)^2$ in general`, why: t`Composition is not commutative; the order of the functions matters.` },
      ],
      answer: t`$(f\comp g)(x)=x^2+2$ and $(g\comp f)(x)=(x+2)^2$.`,
    },
  ],

  cards: [
    c("Relations", t`Define reflexive, symmetric and transitive relations`, t`Reflexive: $(a,a)\in R$ for all $a$.\nSymmetric: $(a,b)\in R\Rightarrow(b,a)\in R$.\nTransitive: $(a,b),(b,c)\in R\Rightarrow(a,c)\in R$.`),
    c("Relations", t`What is an equivalence relation?`, t`A relation that is reflexive, symmetric and transitive.`),
    c("Relations", t`What do the equivalence classes of an equivalence relation form?`, t`A partition of the set: the classes are disjoint and their union is the whole set.`),
    c("Counting", t`Number of relations from $A$ to $B$ with $n(A)=m$, $n(B)=n$`, t`$$2^{mn}$$`),
    c("Counting", t`Number of reflexive relations and symmetric relations on a set of $n$ elements`, t`Reflexive: $2^{n^2-n}$.\nSymmetric: $2^{n(n+1)/2}$.`),
    c("Functions", t`Define a one-one function and an onto function`, t`One-one: $f(x_1)=f(x_2)\Rightarrow x_1=x_2$.\nOnto: range $=$ codomain, so every $y$ has some $x$ with $f(x)=y$.`),
    c("Functions", t`When does a function have an inverse?`, t`Exactly when it is bijective (one-one and onto).`),
    c("Counting", t`Number of functions, one-one functions and bijections from $A$ ($m$ elements) to $B$ ($n$ elements)`, t`All: $n^m$. One-one: $n(n-1)\cdots(n-m+1)$. Bijections (for $m=n$): $n!$.`),
    c("Composition", t`Meaning of $(f\comp g)(x)$`, t`$f\big(g(x)\big)$: apply $g$ first, then $f$.`),
    c("Composition", t`Is composition of functions commutative?`, t`No. In general $f\comp g\ne g\comp f$.`),
    c("Inverse", t`$(g\comp f)^{-1}$ in terms of $f^{-1}$ and $g^{-1}$`, t`$$(g\comp f)^{-1}=f^{-1}\comp g^{-1}$$`),
    c("Inverse", t`How do you find $f^{-1}$ for a bijective $f$?`, t`Write $y=f(x)$, solve for $x$ in terms of $y$, then swap the names so that $f^{-1}(x)$ is a function of $x$.`),
    c("Common mistake", t`Is $f(x)=x^2$ from $\mathbb{R}$ to $\mathbb{R}$ one-one or onto?`, t`Neither: $f(2)=f(-2)$, and negative numbers are never values.`),
  ],
};
