import type { MathTopicMeta } from "./types";

/** All chapters of the CBSE Class XII Maths syllabus, in NCERT order. `midterm` marks the Second Mid-Term portion. */
export const MATH_TOPICS: MathTopicMeta[] = [
  { id: "rel", title: "Relations and Functions", short: "Relations", icon: "🔗", chapter: "Chapter 1",
    desc: "Reflexive, symmetric and transitive relations, equivalence classes, one-one and onto functions." },
  { id: "itf", title: "Inverse Trigonometric Functions", short: "Inverse Trig", icon: "📐", chapter: "Chapter 2", midterm: true,
    desc: "Principal value branches, domain and range, standard identities, and Exercise 2.2 / miscellaneous-style problems." },
  { id: "mat", title: "Matrices", short: "Matrices", icon: "🔢", chapter: "Chapter 3",
    desc: "Order and types, addition, multiplication, transpose, symmetric and skew-symmetric matrices, and invertible matrices." },
  { id: "det", title: "Determinants", short: "Determinants", icon: "▦", chapter: "Chapter 4",
    desc: "Minors, cofactors and properties, area of a triangle, adjoint and inverse, solving systems of linear equations." },
  { id: "cont", title: "Continuity and Differentiability", short: "Continuity", icon: "📈", chapter: "Chapter 5",
    desc: "Continuity of piecewise functions, chain rule, implicit, logarithmic and parametric differentiation, exponential and logarithmic functions, and second-order derivatives." },
  { id: "derivapps", title: "Applications of Derivatives — Rate of Change and Monotonicity", short: "Rate & Monotonicity", icon: "🚀", chapter: "Chapter 6 · Part 1",
    desc: "Rate of change of quantities and increasing and decreasing functions." },
  { id: "maxmin", title: "Applications of Derivatives — Maxima and Minima", short: "Maxima & Minima", icon: "⛰️", chapter: "Chapter 6 · Part 2", midterm: true,
    desc: "Critical points, first and second derivative tests, absolute extrema and optimisation word problems." },
  { id: "integrals", title: "Integrals — Up to Exercise 7.4", short: "Integrals", icon: "∫", chapter: "Chapter 7 · Part 1", midterm: true,
    desc: "Standard integrals, substitution, trigonometric identities and the standard forms with completing the square." },
  { id: "intadv", title: "Integrals — Parts, Partial Fractions, Definite Integrals", short: "Integrals II", icon: "∮", chapter: "Chapter 7 · Part 2",
    desc: "Integration by parts, partial fractions, definite integrals and their properties." },
  { id: "areaint", title: "Applications of Integrals", short: "Area", icon: "🧮", chapter: "Chapter 8",
    desc: "Area under curves, between a curve and a line, parabola, circle and ellipse." },
  { id: "de", title: "Differential Equations", short: "Diff. Equations", icon: "🌊", chapter: "Chapter 9",
    desc: "Order and degree, forming equations, variable separable, homogeneous and linear equations." },
  { id: "vectors", title: "Vector Algebra", short: "Vectors", icon: "➡️", chapter: "Chapter 10", midterm: true,
    desc: "Magnitude, direction cosines, addition, dot product, cross product, projections and areas." },
  { id: "geometry3d", title: "Three-Dimensional Geometry", short: "3D Geometry", icon: "🧊", chapter: "Chapter 11", midterm: true,
    desc: "Direction ratios and cosines, equations of lines in space, angle between lines, coplanar and skew lines, shortest distance." },
  { id: "lpp", title: "Linear Programming", short: "LPP", icon: "📊", chapter: "Chapter 12",
    desc: "Constraints, feasible region, corner point method, bounded and unbounded regions, word problems." },
  { id: "prob", title: "Probability", short: "Probability", icon: "🎲", chapter: "Chapter 13",
    desc: "Conditional probability, independence, total probability, Bayes' theorem, random variables and their mean." },
];

/** Topics that were in scope before the full-syllabus extension (Second Mid-Term portion). */
export const MIDTERM_TOPIC_IDS = MATH_TOPICS.filter((t) => t.midterm).map((t) => t.id);

export function topicMeta(id: string): MathTopicMeta {
  const t = MATH_TOPICS.find((x) => x.id === id);
  if (!t) throw new Error(`Unknown maths topic ${id}`);
  return t;
}

export const KIND_LABEL = {
  direct: "Direct formula",
  short: "Short answer",
  steps: "Step-by-step",
  application: "Application",
  exam: "Exam style",
} as const;

export const LEVEL_LABEL = ["Easy", "Medium", "Hard"] as const;
