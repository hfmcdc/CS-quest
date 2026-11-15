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

    q("REL-6", "One-one and onto", "short", 2,
      t`The function $f:\mathbb{R}\to\mathbb{R}$, $f(x)=3-4x$ is:`,
      mcq([
        t`One-one and onto (bijective)`,
        t`One-one but not onto`,
        t`Onto but not one-one`,
        t`Neither one-one nor onto`,
      ], 0),
      t`One-one and onto (bijective)`,
      [
        t`One-one: $f(x_1)=f(x_2)\Rightarrow3-4x_1=3-4x_2\Rightarrow x_1=x_2$.`,
        t`Onto: for any real $y$, $x=\dfrac{3-y}{4}\in\mathbb{R}$ satisfies $f(x)=y$.`,
        t`So $f$ is both one-one and onto.`,
      ],
      t`Test one-one by assuming $f(x_1)=f(x_2)$, and onto by solving $f(x)=y$ for $x$.`),
    q("REL-7", "One-one but not onto", "short", 2,
      t`The function $f:\mathbb{N}\to\mathbb{N}$, $f(x)=x^2$ is:`,
      mcq([
        t`One-one but not onto`,
        t`Onto but not one-one`,
        t`Both one-one and onto`,
        t`Neither one-one nor onto`,
      ], 0),
      t`One-one but not onto`,
      [
        t`One-one: for natural numbers, $x_1^2=x_2^2\Rightarrow x_1=x_2$ (no negatives in $\mathbb{N}$).`,
        t`Not onto: $2\in\mathbb{N}$ is not the square of any natural number.`,
      ],
      t`Look for a natural number that is not a perfect square.`),
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
    q("REL-9", "Relation on lines", "exam", 3,
      t`Let $R$ be the relation on the set of all lines in a plane: $l_1\,R\,l_2$ if $l_1$ is perpendicular to $l_2$. Then $R$ is:`,
      mcq([
        t`Symmetric only`,
        t`Reflexive only`,
        t`Transitive only`,
        t`An equivalence relation`,
      ], 0),
      t`Symmetric only`,
      [
        t`Not reflexive: a line is not perpendicular to itself.`,
        t`Symmetric: if $l_1\perp l_2$ then $l_2\perp l_1$.`,
        t`Not transitive: if $l_1\perp l_2$ and $l_2\perp l_3$, then $l_1\parallel l_3$, not perpendicular.`,
      ],
      t`Test each of the three properties with geometric reasoning.`),
    q("REL-10", "Checking all three properties", "exam", 3,
      t`On $\mathbb{R}$, define $R=\{(a,b): a\le b^2\}$. Which statement is true?`,
      mcq([
        t`$R$ is neither reflexive, nor symmetric, nor transitive`,
        t`$R$ is reflexive but not symmetric`,
        t`$R$ is symmetric and transitive`,
        t`$R$ is an equivalence relation`,
      ], 0),
      t`$R$ is neither reflexive, nor symmetric, nor transitive`,
      [
        t`Not reflexive: $\left(\frac12,\frac12\right)\notin R$ since $\frac12>\frac14$.`,
        t`Not symmetric: $(1,2)\in R$ because $1\le4$, but $(2,1)\notin R$ because $2>1$.`,
        t`Not transitive: $(3,-2)\in R$ ($3\le4$) and $(-2,1)\in R$ ($-2\le1$), but $(3,1)\notin R$ ($3>1$).`,
      ],
      t`Find a single counter-example for each property.`),
    q("REL-11", "Counting related pairs", "exam", 3,
      t`On $A=\{1,2,3,4,5,6\}$, $R=\{(a,b): b \text{ is divisible by } a\}$. How many ordered pairs does $R$ contain?`,
      num(14), t`$14$`,
      [
        t`Count, for each $a$, the multiples of $a$ in $A$.`,
        t`$a=1$: $6$; $a=2$: $3$ ($2,4,6$); $a=3$: $2$ ($3,6$); $a=4,5,6$: $1$ each.`,
        t`Total $6+3+2+1+1+1=14$.`,
      ],
      t`For each $a$, list the $b\in A$ that are multiples of $a$.`,
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

    q("REL-C4", "Reflexive relations", "exam", 3,
      t`How many reflexive relations are there on a set with $3$ elements?`,
      num(64), t`$64$`,
      [
        t`A reflexive relation must contain all $3$ pairs $(a,a)$.`,
        t`The other $9-3=6$ ordered pairs can each be in or out of the relation.`,
        t`Total $2^6=64$.`,
      ],
      t`The diagonal pairs are forced; every other pair is a free yes/no choice.`,
      { challenge: true, input: HELP.num }),
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
        { label: "Bijective", body: t`One-one **and** onto.` },
        { label: "Counting functions", body: t`$n(A)=m,\ n(B)=n$: all functions $n^m$; one-one functions $\,^{n}P_m=n(n-1)\cdots(n-m+1)$ (needs $n\ge m$); bijections $m!$ (when $m=n$).` },
      ],
    },
    {
      title: "Key concepts",
      kind: "concepts",
      items: [
        { body: t`To prove a relation is an equivalence relation you must prove **all three** properties. To disprove it, one failing example for one property is enough.` },
        { body: t`To show $f$ is one-one: assume $f(x_1)=f(x_2)$ and deduce $x_1=x_2$. To show it is onto: take any $y$ in the codomain and solve $f(x)=y$ for $x$ in the domain.` },
        { body: t`Changing the domain or codomain can change whether a function is one-one or onto. $x^2$ on $\mathbb{R}\to\mathbb{R}$ is neither; on $[0,\infty)\to[0,\infty)$ it is bijective.` },
        { body: t`A function can be shown **not** one-one by two different inputs with the same output, and **not** onto by one value of the codomain that is never reached.` },
      ],
    },
    {
      title: "Common mistakes",
      kind: "mistakes",
      items: [
        { body: t`Saying a relation is symmetric because **some** pairs are reversible. Every pair must be reversible.` },
        { body: t`Forgetting the empty-chain case: a relation can be transitive (or symmetric) vacuously.` },
        { body: t`Claiming a function is onto without checking the codomain.` },
      ],
    },
    {
      title: "Quick worked example",
      kind: "example",
      items: [
        { label: "Problem", body: t`Show that $f:\mathbb{R}\to\mathbb{R}$, $f(x)=2x+3$ is one-one and onto.` },
        { label: "One-one", body: t`$f(x_1)=f(x_2)\Rightarrow2x_1+3=2x_2+3\Rightarrow x_1=x_2$.` },
        { label: "Onto", body: t`For any $y$, $x=\frac{y-3}{2}\in\mathbb{R}$ gives $f(x)=y$.` },
        { label: "Answer", body: t`$f$ is bijective.` },
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
      problem: t`Show that $f:\mathbb{R}\to\mathbb{R}$, $f(x)=2x+3$ is one-one and onto.`,
      steps: [
        { doit: t`Suppose $f(x_1)=f(x_2)$. Then $2x_1+3=2x_2+3$, so $x_1=x_2$`, why: t`This is the one-one test: equal outputs force equal inputs.` },
        { doit: t`Let $y\in\mathbb{R}$. Put $x=\dfrac{y-3}{2}$; then $f(x)=y$`, why: t`This is the onto test: every $y$ in the codomain has a pre-image in the domain.` },
      ],
      answer: t`$f$ is one-one and onto, hence bijective.`,
    },
    {
      title: "A function that is neither one-one nor onto",
      problem: t`Show that $f:\mathbb{R}\to\mathbb{R}$, $f(x)=x^2$ is neither one-one nor onto.`,
      steps: [
        { doit: t`$f(2)=4=f(-2)$ although $2\ne-2$`, why: t`Two different inputs with the same output show $f$ is not one-one.` },
        { doit: t`$x^2\ge0$ for every real $x$, so $-1$ is never an output`, why: t`A codomain element with no pre-image shows $f$ is not onto.` },
      ],
      answer: t`$f$ is neither one-one nor onto.`,
    },
  ],

  cards: [
    c("Relations", t`Define reflexive, symmetric and transitive relations`, t`Reflexive: $(a,a)\in R$ for all $a$.\nSymmetric: $(a,b)\in R\Rightarrow(b,a)\in R$.\nTransitive: $(a,b),(b,c)\in R\Rightarrow(a,c)\in R$.`),
    c("Relations", t`What is an equivalence relation?`, t`A relation that is reflexive, symmetric and transitive.`),
    c("Relations", t`What do the equivalence classes of an equivalence relation form?`, t`A partition of the set: the classes are disjoint and their union is the whole set.`),
    c("Counting", t`Number of relations from $A$ to $B$ with $n(A)=m$, $n(B)=n$`, t`$$2^{mn}$$`),
    c("Counting", t`Number of reflexive relations and symmetric relations on a set of $n$ elements`, t`Reflexive: $2^{n^2-n}$.\nSymmetric: $2^{n(n+1)/2}$.`),
    c("Functions", t`Define a one-one function and an onto function`, t`One-one: $f(x_1)=f(x_2)\Rightarrow x_1=x_2$.\nOnto: range $=$ codomain, so every $y$ has some $x$ with $f(x)=y$.`),
    c("Counting", t`Number of functions, one-one functions and bijections from $A$ ($m$ elements) to $B$ ($n$ elements)`, t`All: $n^m$. One-one: $n(n-1)\cdots(n-m+1)$. Bijections (for $m=n$): $n!$.`),
    c("Functions", t`How do you prove a function is one-one?`, t`Assume $f(x_1)=f(x_2)$ and show $x_1=x_2$. To disprove it, give two different inputs with the same output.`),
    c("Functions", t`How do you prove a function is onto?`, t`Take any $y$ in the codomain and solve $f(x)=y$ for an $x$ in the domain. To disprove it, give a value of $y$ that is never reached.`),
    c("Functions", t`Do the domain and codomain matter for one-one and onto?`, t`Yes. $x^2$ is neither on $\mathbb{R}\to\mathbb{R}$, but one-one on $\mathbb{N}\to\mathbb{N}$ and bijective on $[0,\infty)\to[0,\infty)$.`),
    c("Relations", t`How do you prove a relation is NOT symmetric or NOT transitive?`, t`Give one counter-example: a pair $(a,b)\in R$ with $(b,a)\notin R$, or a chain $(a,b),(b,c)\in R$ with $(a,c)\notin R$.`),
    c("Relations", t`Is a relation that is symmetric and transitive always reflexive?`, t`No. Reflexivity must be checked separately, for every element.`),
    c("Common mistake", t`Is $f(x)=x^2$ from $\mathbb{R}$ to $\mathbb{R}$ one-one or onto?`, t`Neither: $f(2)=f(-2)$, and negative numbers are never values.`),
  ],
};
