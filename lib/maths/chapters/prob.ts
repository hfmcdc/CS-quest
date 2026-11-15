import type { ChapterContent } from "../types";
import { HELP, cardMk, mk, num } from "../qhelpers";

const t = String.raw;
const q = mk("prob");
const c = cardMk("prob", "PR");

const DIST = (xs: (string | number)[], ps: (string | number)[]) =>
  "\\begin{array}{c|" + "c".repeat(xs.length) + "}X&" + xs.join("&") + "\\\\ \\hline P(X)&" + ps.join("&") + "\\end{array}";

export const prob: ChapterContent = {
  id: "prob",
  questions: [
    q("PRB-1", "Independent events", "direct", 1,
      t`$A$ and $B$ are independent events with $P(A)=0.6$ and $P(B)=0.3$. Find $P(A\cap B)$.`,
      num(0.18), t`$0.18$`,
      [
        t`For independent events, $P(A\cap B)=P(A)\,P(B)$.`,
        t`$0.6\times0.3=0.18$.`,
      ],
      t`Multiply the individual probabilities.`,
      { input: HELP.prob }),

    q("PRB-2", "Conditional probability", "direct", 1,
      t`If $P(A\cap B)=0.2$ and $P(B)=0.5$, find $P(A\mid B)$.`,
      num(0.4), t`$0.4$`,
      [
        t`$P(A\mid B)=\dfrac{P(A\cap B)}{P(B)}$ for $P(B)\ne0$.`,
        t`$=\dfrac{0.2}{0.5}=0.4$.`,
      ],
      t`Divide the probability of both by the probability of the given event.`,
      { input: HELP.prob, traps: [{ value: 0.1, msg: t`You multiplied. The conditional probability is a **ratio**: $\frac{P(A\cap B)}{P(B)}$.` }] }),

    q("PRB-3", "Equally likely outcomes", "direct", 1,
      t`Two fair dice are thrown. Find the probability that the sum is $8$.`,
      num(5 / 36), t`$\dfrac{5}{36}$`,
      [
        t`There are $36$ equally likely outcomes.`,
        t`Sum $8$: $(2,6),(3,5),(4,4),(5,3),(6,2)$, that is $5$ outcomes.`,
        t`Probability $=\dfrac{5}{36}$.`,
      ],
      t`List the favourable pairs and divide by $36$.`,
      { input: HELP.prob }),

    q("PRB-4", "Conditional probability", "short", 2,
      t`Two fair coins are tossed. Find the probability of two heads, given that at least one head appears.`,
      num(1 / 3), t`$\dfrac13$`,
      [
        t`Sample space: $\{HH,HT,TH,TT\}$. Let $A=$ two heads $=\{HH\}$ and $B=$ at least one head $=\{HH,HT,TH\}$.`,
        t`$P(A\cap B)=\dfrac14$ and $P(B)=\dfrac34$.`,
        t`$P(A\mid B)=\dfrac{1/4}{3/4}=\dfrac13$.`,
      ],
      t`The condition shrinks the sample space to $\{HH,HT,TH\}$.`,
      { input: HELP.prob, traps: [{ value: 0.5, msg: t`$\frac12$ would be the answer if the **first** coin were known to be a head. "At least one head" leaves three equally likely outcomes.` }] }),

    q("PRB-5", "Without replacement", "short", 2,
      t`A bag has $5$ red and $3$ blue balls. Two are drawn one after the other without replacement. Find the probability that both are red. Give a decimal or fraction.`,
      num(5 / 14), t`$\dfrac{5}{14}$`,
      [
        t`$P(\text{1st red})=\dfrac58$.`,
        t`Given that, $P(\text{2nd red})=\dfrac47$ (one red ball is gone).`,
        t`$P(\text{both red})=\dfrac58\cdot\dfrac47=\dfrac{20}{56}=\dfrac5{14}$.`,
      ],
      t`Use the multiplication rule: $P(A\cap B)=P(A)\,P(B\mid A)$.`,
      { input: HELP.prob }),

    q("PRB-6", "Total probability", "short", 2,
      t`Bag I has $3$ red and $2$ black balls; Bag II has $1$ red and $4$ black balls. A bag is chosen at random and a ball is drawn. Find $P(\text{red})$.`,
      num(0.4), t`$0.4$`,
      [
        t`$P(\text{red})=P(I)P(R\mid I)+P(II)P(R\mid II)$.`,
        t`$=\dfrac12\cdot\dfrac35+\dfrac12\cdot\dfrac15=\dfrac{3}{10}+\dfrac1{10}=\dfrac25$.`,
      ],
      t`Add the probabilities of reaching a red ball through each bag.`,
      { input: HELP.prob }),

    q("PRB-7", "Bayes' theorem", "short", 2,
      t`In the same two-bag experiment (Bag I: $3$ red, $2$ black; Bag II: $1$ red, $4$ black), a red ball is drawn. Find the probability that it came from Bag I.`,
      num(0.75), t`$\dfrac34$`,
      [
        t`Bayes: $P(I\mid R)=\dfrac{P(I)P(R\mid I)}{P(R)}$.`,
        t`$P(I)P(R\mid I)=\dfrac12\cdot\dfrac35=\dfrac3{10}$ and $P(R)=\dfrac25$.`,
        t`$P(I\mid R)=\dfrac{3/10}{2/5}=\dfrac34$.`,
      ],
      t`Divide the contribution through Bag I by the total probability of a red ball.`,
      { input: HELP.prob }),

    q("PRB-8", "Union of independent events", "short", 2,
      t`$A$ and $B$ are independent with $P(A)=\frac12$ and $P(B)=\frac13$. Find $P(A\cup B)$.`,
      num(2 / 3), t`$\dfrac23$`,
      [
        t`$P(A\cap B)=\dfrac12\cdot\dfrac13=\dfrac16$.`,
        t`$P(A\cup B)=P(A)+P(B)-P(A\cap B)=\dfrac12+\dfrac13-\dfrac16=\dfrac23$.`,
      ],
      t`Use the addition rule with the product for the intersection.`,
      { input: HELP.prob }),

    q("PRB-9", "Conditional probability from the union", "short", 2,
      t`If $P(A)=0.3$, $P(B)=0.4$ and $P(A\cup B)=0.5$, find $P(A\mid B)$.`,
      num(0.5), t`$0.5$`,
      [
        t`$P(A\cap B)=P(A)+P(B)-P(A\cup B)=0.3+0.4-0.5=0.2$.`,
        t`$P(A\mid B)=\dfrac{P(A\cap B)}{P(B)}=\dfrac{0.2}{0.4}=0.5$.`,
      ],
      t`First find $P(A\cap B)$ with the addition rule.`,
      { input: HELP.prob }),
    q("PRB-10", "Mean of a random variable", "short", 2,
      t`A random variable has the distribution $${DIST([0, 1, 2], [0.2, 0.5, 0.3])}$. Find its mean $E(X)$.`,
      num(1.1), t`$1.1$`,
      [
        t`$E(X)=\sum x_iP(x_i)$.`,
        t`$=0(0.2)+1(0.5)+2(0.3)=0.5+0.6=1.1$.`,
      ],
      t`Multiply each value by its probability and add.`,
      { input: HELP.num }),

    q("PRB-11", "Probability distribution", "exam", 3,
      t`A random variable $X$ takes the values $1,2,3,4$ with $P(X=x)=kx$. Find $k$.`,
      num(0.1), t`$k=\dfrac1{10}$`,
      [
        t`The probabilities of a distribution add to $1$: $k(1+2+3+4)=1$.`,
        t`$10k=1\Rightarrow k=\dfrac{1}{10}$.`,
      ],
      t`Use $\sum P(x_i)=1$.`,
      { input: HELP.prob }),
    q("PRB-12", "At least one", "exam", 3,
      t`A fair die is thrown $4$ times. Find the probability of getting at least one six. Give a decimal.`,
      num(1 - (5 / 6) ** 4), t`$1-\left(\dfrac56\right)^4\approx0.518$`,
      [
        t`Use the complement: $P(\text{at least one six})=1-P(\text{no six})$.`,
        t`$P(\text{no six in 4 throws})=\left(\dfrac56\right)^4=\dfrac{625}{1296}$.`,
        t`$1-\dfrac{625}{1296}=\dfrac{671}{1296}\approx0.518$.`,
      ],
      t`It is easier to find the probability of **no** six and subtract from $1$.`,
      { input: HELP.prob }),

    q("PRB-13", "Bayes' theorem (test)", "exam", 3,
      t`$1\%$ of people have a disease. A test is positive for $99\%$ of those with the disease and for $5\%$ of those without it. If a person tests positive, find the probability that they have the disease. Give a decimal.`,
      num(1 / 6), t`$\dfrac16\approx0.167$`,
      [
        t`$P(D)=0.01$, $P(+\mid D)=0.99$, $P(D')=0.99$, $P(+\mid D')=0.05$.`,
        t`$P(+)=0.01(0.99)+0.99(0.05)=0.0099+0.0495=0.0594$.`,
        t`$P(D\mid+)=\dfrac{0.0099}{0.0594}=\dfrac16\approx0.167$.`,
      ],
      t`Total probability for the positive test goes in the denominator of Bayes' theorem.`,
      { input: HELP.prob }),

    q("PRB-C1", "Conditional probability with dice", "exam", 3,
      t`Two dice are thrown. Given that the sum is $8$, find the probability that the first die shows an even number.`,
      num(0.6), t`$\dfrac35$`,
      [
        t`Sum $8$: $(2,6),(3,5),(4,4),(5,3),(6,2)$. Five equally likely outcomes.`,
        t`First die even: $(2,6),(4,4),(6,2)$, that is $3$.`,
        t`$P=\dfrac35$.`,
      ],
      t`The condition reduces the sample space to the five outcomes with sum $8$.`,
      { challenge: true, input: HELP.prob }),

    q("PRB-C2", "Mean of a random variable", "exam", 3,
      t`Two fair dice are thrown. If $X$ is the number of sixes, find $E(X)$. Give a decimal or fraction.`,
      num(1 / 3), t`$\dfrac13$`,
      [
        t`$P(X=0)=\dfrac{25}{36}$, $\ P(X=1)=\dfrac{10}{36}$, $\ P(X=2)=\dfrac1{36}$.`,
        t`$E(X)=0\cdot\dfrac{25}{36}+1\cdot\dfrac{10}{36}+2\cdot\dfrac{1}{36}=\dfrac{12}{36}=\dfrac13$.`,
      ],
      t`Build the distribution of $X$ first, then use $E(X)=\sum x_iP(x_i)$.`,
      { challenge: true, input: HELP.prob }),
    q("PRB-C3", "Independence and complements", "exam", 3,
      t`$A$ and $B$ are independent with $P(A)=0.3$ and $P(B)=0.4$. Find $P(A'\cap B')$.`,
      num(0.42), t`$0.42$`,
      [
        t`If $A$ and $B$ are independent, so are $A'$ and $B'$.`,
        t`$P(A'\cap B')=P(A')P(B')=(0.7)(0.6)=0.42$.`,
        t`(Check: $1-P(A\cup B)=1-(0.3+0.4-0.12)=0.42$.)`,
      ],
      t`Complements of independent events are independent.`,
      { challenge: true, input: HELP.prob }),
    q("PRB-C4", "Bayes with three causes", "exam", 3,
      t`Machines $A$, $B$, $C$ make $50\%$, $30\%$ and $20\%$ of the items, with defect rates $1\%$, $2\%$ and $3\%$. An item is found defective. Find the probability that it was made by $A$. Give a decimal.`,
      num(5 / 17), t`$\dfrac5{17}\approx0.294$`,
      [
        t`$P(D)=0.5(0.01)+0.3(0.02)+0.2(0.03)=0.005+0.006+0.006=0.017$.`,
        t`$P(A\mid D)=\dfrac{0.5(0.01)}{0.017}=\dfrac{0.005}{0.017}=\dfrac{5}{17}\approx0.294$.`,
      ],
      t`Add the three contributions for the denominator, then take the share belonging to $A$.`,
      { challenge: true, input: HELP.prob }),
  ],

  revision: [
    {
      title: "Conditional probability and independence",
      kind: "formulas",
      items: [
        { label: "Conditional probability", body: t`$$P(A\mid B)=\frac{P(A\cap B)}{P(B)},\quad P(B)\ne0$$` },
        { label: "Multiplication rule", body: t`$$P(A\cap B)=P(A)\,P(B\mid A)=P(B)\,P(A\mid B)$$` },
        { label: "Independent events", body: t`$$P(A\cap B)=P(A)\,P(B)$$ Then $P(A\mid B)=P(A)$. If $A,B$ are independent so are $A,B'$ and $A',B'$.` },
        { label: "Addition rule", body: t`$$P(A\cup B)=P(A)+P(B)-P(A\cap B)$$` },
        { label: "Complement", body: t`$P(A')=1-P(A)$ and $P(A'\mid B)=1-P(A\mid B)$.` },
      ],
    },
    {
      title: "Total probability and Bayes' theorem",
      kind: "formulas",
      items: [
        { label: "Partition", body: t`Events $E_1,\dots,E_n$ that are mutually exclusive, exhaustive and with $P(E_i)>0$.` },
        { label: "Total probability", body: t`$$P(A)=\sum_{i=1}^{n}P(E_i)\,P(A\mid E_i)$$` },
        { label: "Bayes' theorem", body: t`$$P(E_i\mid A)=\frac{P(E_i)\,P(A\mid E_i)}{\sum_jP(E_j)\,P(A\mid E_j)}$$` },
      ],
    },
    {
      title: "Random variables",
      kind: "formulas",
      items: [
        { label: "Probability distribution", body: t`$P(x_i)\ge0$ and $\sum P(x_i)=1$.` },
        { label: "Mean (expected value)", body: t`$$E(X)=\sum x_iP(x_i)$$` },
      ],
    },
    {
      title: "Key concepts",
      kind: "concepts",
      items: [
        { body: t`**Independent** and **mutually exclusive** are different ideas. Independent: $P(A\cap B)=P(A)P(B)$. Mutually exclusive: $P(A\cap B)=0$.` },
        { body: t`With "without replacement" draws the second probability changes: use conditional probability.` },
        { body: t`"At least one" problems: use $1-P(\text{none})$.` },
        { body: t`In Bayes' theorem the denominator is the total probability of the observed event.` },
      ],
    },
    {
      title: "Common mistakes",
      kind: "mistakes",
      items: [
        { body: t`Treating mutually exclusive events as independent.` },
        { body: t`Computing $P(A\mid B)$ as $P(A)P(B)$.` },
        { body: t`Forgetting to change the denominators in draws without replacement.` },
        { body: t`In Bayes' theorem, using the wrong denominator (not the total probability).` },
        { body: t`Forgetting to check that the probabilities of a distribution add to $1$.` },
      ],
    },
    {
      title: "Quick worked example",
      kind: "example",
      items: [
        { label: "Problem", body: t`Two coins are tossed. Given at least one head, find $P(\text{two heads})$.` },
        { label: "Step 1", body: t`$P(A\cap B)=\frac14$, $P(B)=\frac34$.` },
        { label: "Step 2", body: t`$P(A\mid B)=\frac{1/4}{3/4}$.` },
        { label: "Answer", body: t`$\dfrac13$.` },
      ],
    },
  ],

  examples: [
    {
      title: "Conditional probability",
      problem: t`A die is thrown twice. Given that the sum is $8$, find the probability that the first die shows an even number.`,
      steps: [
        { doit: t`Sum $8$: $(2,6),(3,5),(4,4),(5,3),(6,2)$`, why: t`The given condition reduces the sample space to these $5$ equally likely outcomes.` },
        { doit: t`First die even: $(2,6),(4,4),(6,2)$`, why: t`Pick the outcomes inside the reduced sample space that also satisfy the event.` },
        { doit: t`$P=\dfrac35$`, why: t`Divide the favourable count by the size of the reduced space.` },
      ],
      answer: t`$\dfrac35$`,
    },
    {
      title: "Total probability and Bayes' theorem",
      problem: t`Bag I has $3$ red, $2$ black; Bag II has $1$ red, $4$ black. A bag is picked at random and a red ball is drawn. Find the probability it came from Bag I.`,
      steps: [
        { doit: t`$P(R)=\dfrac12\cdot\dfrac35+\dfrac12\cdot\dfrac15=\dfrac25$`, why: t`Total probability: add the two ways of getting a red ball.` },
        { doit: t`$P(I\cap R)=\dfrac12\cdot\dfrac35=\dfrac3{10}$`, why: t`This is the part of the red-ball probability that passes through Bag I.` },
        { doit: t`$P(I\mid R)=\dfrac{3/10}{2/5}=\dfrac34$`, why: t`Bayes' theorem: ratio of the Bag I contribution to the total.` },
      ],
      answer: t`$\dfrac34$`,
    },
    {
      title: "Mean of a random variable",
      problem: t`Two fair dice are thrown and $X$ is the number of sixes. Find the probability distribution and $E(X)$.`,
      steps: [
        { doit: t`$P(X=0)=\dfrac{25}{36},\ P(X=1)=\dfrac{10}{36},\ P(X=2)=\dfrac{1}{36}$`, why: t`Count outcomes of the $36$ with no six ($5\times5$), exactly one six ($2\times5$) and two sixes ($1$).` },
        { doit: t`Check: $\dfrac{25+10+1}{36}=1$`, why: t`The probabilities of a distribution must add to $1$.` },
        { doit: t`$E(X)=0\cdot\dfrac{25}{36}+1\cdot\dfrac{10}{36}+2\cdot\dfrac{1}{36}=\dfrac{12}{36}$`, why: t`The mean is the probability-weighted average of the values.` },
      ],
      answer: t`$E(X)=\dfrac13$`,
    },
  ],

  cards: [
    c("Conditional", t`Definition of $P(A\mid B)$`, t`$$P(A\mid B)=\frac{P(A\cap B)}{P(B)},\ P(B)\ne0$$`),
    c("Conditional", t`Multiplication theorem of probability`, t`$P(A\cap B)=P(A)P(B\mid A)$`),
    c("Independence", t`Condition for independent events`, t`$P(A\cap B)=P(A)\,P(B)$, equivalently $P(A\mid B)=P(A)$.`),
    c("Independence", t`Independent vs mutually exclusive`, t`Mutually exclusive: $P(A\cap B)=0$. Independent: $P(A\cap B)=P(A)P(B)$. Two events with positive probabilities cannot be both.`),
    c("Rules", t`Addition rule for $P(A\cup B)$`, t`$P(A)+P(B)-P(A\cap B)$`),
    c("Rules", t`$P(A'\mid B)$ in terms of $P(A\mid B)$`, t`$1-P(A\mid B)$`),
    c("Total probability", t`Theorem of total probability`, t`$P(A)=\sum P(E_i)P(A\mid E_i)$ for a partition $E_1,\dots,E_n$.`),
    c("Bayes", t`Bayes' theorem`, t`$$P(E_i\mid A)=\frac{P(E_i)P(A\mid E_i)}{\sum_jP(E_j)P(A\mid E_j)}$$`),
    c("Random variables", t`Mean (expected value) of a random variable $X$`, t`$E(X)=\sum x_iP(x_i)$`),
    c("Random variables", t`Conditions for a probability distribution`, t`$P(x_i)\ge0$ for all $i$ and $\sum P(x_i)=1$.`),
    c("Independence", t`If $A$ and $B$ are independent, what about $A'$ and $B'$?`, t`They are independent too: $P(A'\cap B')=P(A')P(B')$.`),
    c("Random variables", t`What must be true of the probabilities in a distribution?`, t`Each is $\ge0$ and they add to $1$.`),
    c("Common mistake", t`Easiest way to handle "at least one" problems`, t`$1-P(\text{none})$.`),
  ],
};
