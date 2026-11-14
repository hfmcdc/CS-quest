import type { ChapterContent } from "../types";
import { HELP, cardMk, mcq, mk, num } from "../qhelpers";

const t = String.raw;
const q = mk("lpp");
const c = cardMk("lpp", "LP");

export const lpp: ChapterContent = {
  id: "lpp",
  questions: [
    q("LPP-1", "Corner point method", "direct", 1,
      t`Maximise $Z=3x+4y$ subject to $x+y\le4$, $x\ge0$, $y\ge0$.`,
      num(16), t`Maximum $Z=16$ at $(0,4)$`,
      [
        t`The feasible region is the triangle with corner points $(0,0)$, $(4,0)$ and $(0,4)$.`,
        t`$Z(0,0)=0$, $\ Z(4,0)=12$, $\ Z(0,4)=16$.`,
        t`The region is bounded, so the maximum is $16$.`,
      ],
      t`Evaluate $Z$ at each corner point of the triangle.`,
      { input: HELP.num }),

    q("LPP-2", "Corner point theorem", "direct", 1,
      t`In a linear programming problem with a bounded feasible region, the maximum or minimum value of the objective function occurs:`,
      mcq([
        t`At a corner point of the feasible region`,
        t`At the centre of the feasible region`,
        t`Only at the origin`,
        t`At any interior point`,
      ], 0),
      t`At a corner point of the feasible region`,
      [
        t`The Corner Point Theorem says that for a bounded feasible region, the optimum value of $Z=ax+by$ is attained at a corner (vertex).`,
        t`That is why we evaluate $Z$ only at the corner points.`,
      ],
      t`Recall the Corner Point Theorem.`),

    q("LPP-3", "Maximisation", "short", 2,
      t`Maximise $Z=5x+3y$ subject to $x+y\le6$, $x\le4$, $y\le5$, $x,y\ge0$.`,
      num(26), t`Maximum $Z=26$ at $(4,2)$`,
      [
        t`Corner points: $(0,0)$, $(4,0)$, $(4,2)$ (where $x=4$ meets $x+y=6$), $(1,5)$ ($y=5$ meets $x+y=6$) and $(0,5)$.`,
        t`$Z$ values: $0,\ 20,\ 26,\ 20,\ 15$.`,
        t`The maximum is $26$.`,
      ],
      t`Find every vertex by intersecting the boundary lines, then compare $Z$.`,
      { input: HELP.num }),

    q("LPP-4", "Production problem", "short", 2,
      t`A firm makes tables ($x$) and chairs ($y$). Profit is ₹30 per table and ₹20 per chair. Carpentry: $2x+y\le8$ hours; finishing: $x+2y\le10$ hours. Find the maximum profit.`,
      num(140), t`₹140 (with $2$ tables and $4$ chairs)`,
      [
        t`Maximise $Z=30x+20y$ subject to $2x+y\le8$, $x+2y\le10$, $x,y\ge0$.`,
        t`Corner points: $(0,0)$, $(4,0)$, $(2,4)$ (solving $2x+y=8$, $x+2y=10$) and $(0,5)$.`,
        t`$Z$: $0,\ 120,\ 140,\ 100$. The maximum profit is ₹140.`,
      ],
      t`Write the objective function and the two constraints, then use the corner points.`,
      { input: HELP.num }),

    q("LPP-5", "Number of corner points", "short", 2,
      t`How many corner points does the feasible region of $x+y\le5$, $x\le3$, $y\le4$, $x\ge0$, $y\ge0$ have?`,
      num(5), t`$5$`,
      [
        t`Vertices: $(0,0)$, $(3,0)$, $(3,2)$ ($x=3$ meets $x+y=5$), $(1,4)$ ($y=4$ meets $x+y=5$), $(0,4)$.`,
        t`That is $5$ corner points (a pentagon).`,
      ],
      t`List the intersections of the boundary lines that satisfy all the constraints.`,
      { input: HELP.num }),

    q("LPP-6", "Maximisation", "short", 2,
      t`Maximise $Z=4x+y$ subject to $x+y\le50$, $3x+y\le90$, $x,y\ge0$.`,
      num(120), t`Maximum $Z=120$ at $(30,0)$`,
      [
        t`Corner points: $(0,0)$, $(30,0)$, $(20,30)$ (solving $x+y=50$, $3x+y=90$), $(0,50)$.`,
        t`$Z$: $0,\ 120,\ 110,\ 50$.`,
        t`The maximum is $120$.`,
      ],
      t`Intersect $x+y=50$ and $3x+y=90$ to get the interior vertex.`,
      { input: HELP.num }),

    q("LPP-7", "Minimisation with an unbounded region", "short", 2,
      t`Minimise $Z=4x+3y$ subject to $x+y\ge4$, $x+3y\ge6$, $x,y\ge0$.`,
      num(12), t`Minimum $Z=12$ at $(0,4)$`,
      [
        t`The feasible region is unbounded, with corner points $(0,4)$, $(3,1)$ and $(6,0)$.`,
        t`$Z$: $12,\ 15,\ 24$. Smallest value is $m=12$.`,
        t`Check that $4x+3y<12$ has no point in common with the feasible region. It has none, so $12$ is the minimum.`,
      ],
      t`For an unbounded region, take the smallest corner value and check the half-plane $Z<m$.`,
      { input: HELP.num }),

    q("LPP-8", "Optimal solutions on an edge", "exam", 3,
      t`Maximise $Z=2x+4y$ subject to $x+2y\le10$, $x\ge0$, $y\ge0$. The maximum value of $Z$ is attained:`,
      mcq([
        t`At infinitely many points (the whole edge $x+2y=10$)`,
        t`At exactly one point`,
        t`Only at the origin`,
        t`Nowhere (no maximum)`,
      ], 0),
      t`At infinitely many points (the whole edge $x+2y=10$)`,
      [
        t`Corner points: $(0,0)$, $(10,0)$, $(0,5)$.`,
        t`$Z=0,\ 20,\ 20$. Two adjacent corners give the same maximum.`,
        t`Then every point on the segment joining them is also optimal ($Z=2(x+2y)=20$ on $x+2y=10$).`,
      ],
      t`Notice that $Z$ is exactly twice the left side of the constraint $x+2y\le10$.`),

    q("LPP-9", "Unbounded objective", "exam", 3,
      t`Maximise $Z=x+y$ subject to $x-y\le1$, $x\ge0$, $y\ge0$. Which statement is correct?`,
      mcq([
        t`$Z$ has no maximum because the feasible region is unbounded in the direction of increasing $Z$`,
        t`The maximum is $1$ at $(1,0)$`,
        t`The maximum is $0$ at the origin`,
        t`There is no feasible point`,
      ], 0),
      t`$Z$ has no maximum because the feasible region is unbounded in the direction of increasing $Z$`,
      [
        t`Points such as $(t,t)$ satisfy $x-y=0\le1$ for every $t\ge0$ and give $Z=2t$, which can be made as large as we like.`,
        t`So the region is unbounded and the half-plane $Z>m$ always meets it for any $m$: no maximum exists.`,
      ],
      t`Try points on the line $y=x$ and see how large $Z$ can get.`),

    q("LPP-10", "Corner point method", "direct", 1,
      t`Maximise $Z=x+y$ subject to $x\le3$, $y\le2$, $x\ge0$, $y\ge0$.`,
      num(5), t`Maximum $Z=5$ at $(3,2)$`,
      [
        t`The feasible region is the rectangle with corners $(0,0)$, $(3,0)$, $(3,2)$ and $(0,2)$.`,
        t`$Z=0,\ 3,\ 5,\ 2$. The maximum is $5$.`,
      ],
      t`List the four corners of the rectangle and evaluate $Z$ at each.`,
      { input: HELP.num }),

    q("LPP-C1", "Maximisation", "exam", 3,
      t`Maximise $Z=3x+2y$ subject to $x+2y\le10$, $3x+y\le15$, $x,y\ge0$.`,
      num(18), t`Maximum $Z=18$ at $(4,3)$`,
      [
        t`Corner points: $(0,0)$, $(5,0)$, $(4,3)$ (solving $x+2y=10$, $3x+y=15$) and $(0,5)$.`,
        t`$Z$: $0,\ 15,\ 18,\ 10$.`,
        t`The maximum is $18$.`,
      ],
      t`Solve the two constraint equations together for the interior corner.`,
      { challenge: true, input: HELP.num }),

    q("LPP-C2", "Diet problem", "exam", 3,
      t`Minimise $Z=5x+4y$ subject to $2x+y\ge8$, $x+2y\ge10$, $x,y\ge0$.`,
      num(26), t`Minimum $Z=26$ at $(2,4)$`,
      [
        t`Corner points of the unbounded region: $(0,8)$, $(2,4)$ (from $2x+y=8$, $x+2y=10$) and $(10,0)$.`,
        t`$Z$: $32,\ 26,\ 50$. Candidate minimum $m=26$.`,
        t`The half-plane $5x+4y<26$ has no point in common with the feasible region, so the minimum is $26$.`,
      ],
      t`Find the vertices, take the smallest $Z$, then confirm with the half-plane test.`,
      { challenge: true, input: HELP.num }),

    q("LPP-C3", "Negative objective values", "exam", 3,
      t`Minimise $Z=-3x+4y$ subject to $x+2y\le8$, $3x+2y\le12$, $x,y\ge0$.`,
      num(-12), t`Minimum $Z=-12$ at $(4,0)$`,
      [
        t`Corner points: $(0,0)$, $(4,0)$, $(2,3)$ (solving $x+2y=8$, $3x+2y=12$), $(0,4)$.`,
        t`$Z$: $0,\ -12,\ 6,\ 16$.`,
        t`The region is bounded, so the minimum is $-12$.`,
      ],
      t`Evaluate at all four corner points; the minimum can be negative.`,
      { challenge: true, input: HELP.num }),

    q("LPP-C4", "Infeasible problem", "exam", 3,
      t`If the constraints of a linear programming problem have **no** common point (for example $x+y\le2$ and $x+y\ge5$), the problem has:`,
      mcq([
        t`No feasible solution, hence no optimal solution`,
        t`A maximum at the origin`,
        t`An unbounded solution`,
        t`Infinitely many optimal solutions`,
      ], 0),
      t`No feasible solution, hence no optimal solution`,
      [
        t`No point satisfies $x+y\le2$ and $x+y\ge5$ at the same time, so the feasible region is empty.`,
        t`With an empty feasible region there is no feasible point and therefore no optimal one.`,
      ],
      t`What does the feasible region look like when the constraints contradict each other?`,
      { challenge: true }),
  ],

  revision: [
    {
      title: "Terminology",
      kind: "formulas",
      items: [
        { label: "Objective function", body: t`The linear function $Z=ax+by$ to be maximised or minimised.` },
        { label: "Constraints", body: t`Linear inequalities in $x,y$ (including the non-negativity conditions $x\ge0,\ y\ge0$).` },
        { label: "Feasible region", body: t`The set of points that satisfy **all** the constraints. A **feasible solution** is a point in it; an **optimal solution** is the one giving the best $Z$.` },
        { label: "Bounded / unbounded", body: t`A region is bounded if it can be enclosed by a circle; otherwise it is unbounded.` },
      ],
    },
    {
      title: "The corner point method",
      kind: "concepts",
      items: [
        { body: t`**Step 1.** Write the objective function and all constraints.` },
        { body: t`**Step 2.** Draw the lines for the constraints and shade the feasible region.` },
        { body: t`**Step 3.** Find the corner points (intersections of boundary lines that lie in the region).` },
        { body: t`**Step 4.** Evaluate $Z$ at every corner point. The largest and smallest values are $M$ and $m$.` },
        { body: t`**Bounded region:** $M$ is the maximum and $m$ is the minimum.` },
        { body: t`**Unbounded region:** $M$ is the maximum only if $ax+by>M$ has **no** point in common with the region; $m$ is the minimum only if $ax+by<m$ has no point in common with the region. Otherwise there is no maximum/minimum.` },
      ],
    },
    {
      title: "Special cases",
      kind: "concepts",
      items: [
        { body: t`If two corner points give the same optimal value, **every point on the segment** joining them is optimal (infinitely many solutions).` },
        { body: t`If the feasible region is empty, the problem has **no feasible solution**.` },
        { body: t`A problem with an unbounded region can still have a minimum even though it has no maximum.` },
      ],
    },
    {
      title: "Common mistakes",
      kind: "mistakes",
      items: [
        { body: t`Forgetting the non-negativity constraints $x\ge0$, $y\ge0$.` },
        { body: t`Evaluating $Z$ at points that are not in the feasible region (e.g. a line intersection that violates another constraint).` },
        { body: t`For an unbounded region, stating the smallest corner value is the minimum without the half-plane check.` },
        { body: t`Mixing up $\le$ and $\ge$ when shading.` },
      ],
    },
    {
      title: "Quick worked example",
      kind: "example",
      items: [
        { label: "Problem", body: t`Maximise $Z=3x+4y$ subject to $x+y\le4$, $x,y\ge0$.` },
        { label: "Corners", body: t`$(0,0)$, $(4,0)$, $(0,4)$.` },
        { label: "Values", body: t`$Z=0,\ 12,\ 16$.` },
        { label: "Answer", body: t`Maximum $=16$ at $(0,4)$.` },
      ],
    },
  ],

  examples: [
    {
      title: "A production problem",
      problem: t`A firm makes tables ($x$) and chairs ($y$) with profit ₹30 and ₹20 each. Carpentry: $2x+y\le8$; finishing: $x+2y\le10$. Maximise the profit.`,
      steps: [
        { doit: t`Maximise $Z=30x+20y$ subject to $2x+y\le8$, $x+2y\le10$, $x,y\ge0$`, why: t`Translate the story into an objective function and linear constraints.` },
        { doit: t`Corner points: $(0,0)$, $(4,0)$, $(2,4)$, $(0,5)$`, why: t`$(2,4)$ comes from solving $2x+y=8$ and $x+2y=10$ together; the others lie on the axes.` },
        { doit: t`$Z=0,\ 120,\ 140,\ 100$`, why: t`Evaluate the objective at every corner point.` },
      ],
      answer: t`Maximum profit ₹140 with $2$ tables and $4$ chairs.`,
    },
    {
      title: "Minimisation with an unbounded region",
      problem: t`Minimise $Z=4x+3y$ subject to $x+y\ge4$, $x+3y\ge6$, $x,y\ge0$.`,
      steps: [
        { doit: t`Corner points: $(0,4)$, $(3,1)$, $(6,0)$`, why: t`$(3,1)$ is the intersection of $x+y=4$ and $x+3y=6$; the other two are on the axes.` },
        { doit: t`$Z=12,\ 15,\ 24$, so $m=12$`, why: t`The smallest corner value is only a **candidate** because the region is unbounded.` },
        { doit: t`$4x+3y<12$ has no point in the region`, why: t`This half-plane check confirms that the candidate is the true minimum.` },
      ],
      answer: t`Minimum $Z=12$ at $(0,4)$.`,
    },
    {
      title: "An edge of optimal solutions",
      problem: t`Maximise $Z=2x+4y$ subject to $x+2y\le10$, $x,y\ge0$.`,
      steps: [
        { doit: t`Corner points: $(0,0)$, $(10,0)$, $(0,5)$`, why: t`The region is a triangle.` },
        { doit: t`$Z=0,\ 20,\ 20$`, why: t`Two corner points give the same, maximum value.` },
        { doit: t`On the segment $x+2y=10$, $Z=2(x+2y)=20$`, why: t`Every point of that edge is therefore optimal.` },
      ],
      answer: t`Maximum $Z=20$, attained at infinitely many points.`,
    },
  ],

  cards: [
    c("Terms", t`Objective function and constraints`, t`Objective function: the linear expression $Z=ax+by$ to optimise. Constraints: the linear inequalities, including $x,y\ge0$.`),
    c("Terms", t`Feasible region; feasible solution; optimal solution`, t`Feasible region: all points satisfying every constraint. A feasible solution is a point in it. An optimal solution is a feasible point giving the best value of $Z$.`),
    c("Theorem", t`Corner Point Theorem`, t`If the feasible region is bounded, the maximum and minimum of $Z$ occur at corner points.`),
    c("Method", t`Corner point method: steps`, t`Draw and shade the region; find corner points; evaluate $Z$ at each; take the largest/smallest.`),
    c("Unbounded", t`Maximum of $Z$ on an unbounded region: when is the largest corner value $M$ the maximum?`, t`Only if the half-plane $ax+by>M$ has no point in common with the feasible region.`),
    c("Unbounded", t`Minimum of $Z$ on an unbounded region: when is the smallest corner value $m$ the minimum?`, t`Only if the half-plane $ax+by<m$ has no point in common with the feasible region.`),
    c("Special", t`Two adjacent corner points give the same optimal value`, t`Every point on the line segment joining them is also optimal: infinitely many solutions.`),
    c("Special", t`What if the feasible region is empty?`, t`No feasible solution, so the problem has no optimal solution.`),
    c("Setup", t`How do you find a corner point?`, t`Solve the equations of the two boundary lines that meet there, and check that the point satisfies all other constraints.`),
    c("Setup", t`What do $x\ge0$ and $y\ge0$ mean for the region?`, t`The feasible region lies in the first quadrant.`),
    c("Boundedness", t`When is a feasible region bounded?`, t`When it can be enclosed within a circle.`),
    c("Common mistake", t`Why not just compare $Z$ at the corner points in an unbounded region?`, t`The true optimum might not exist; the half-plane check is needed to confirm $M$ or $m$.`),
  ],
};
