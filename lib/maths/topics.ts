import type { MathTopicMeta } from "./types";

export const MATH_TOPICS: MathTopicMeta[] = [
  {
    id: "itf",
    title: "Inverse Trigonometric Functions",
    short: "Inverse Trig",
    icon: "📐",
    chapter: "Chapter 1",
    desc: "Principal value branches, domain and range, standard identities, and Exercise 2.2 / miscellaneous-style problems.",
  },
  {
    id: "vectors",
    title: "Vector Algebra",
    short: "Vectors",
    icon: "➡️",
    chapter: "Chapter 2",
    desc: "Magnitude, direction cosines, addition, dot product, cross product, projections and areas.",
  },
  {
    id: "geometry3d",
    title: "Three-Dimensional Geometry",
    short: "3D Geometry",
    icon: "🧊",
    chapter: "Chapter 3",
    desc: "Direction ratios and cosines, equations of lines in space, angle between lines, shortest distance.",
  },
  {
    id: "maxmin",
    title: "Applications of Derivatives — Maxima and Minima",
    short: "Maxima & Minima",
    icon: "⛰️",
    chapter: "Chapter 4",
    desc: "Critical points, first and second derivative tests, absolute extrema and optimisation word problems.",
  },
  {
    id: "integrals",
    title: "Integrals — Up to Exercise 7.4",
    short: "Integrals",
    icon: "∫",
    chapter: "Chapter 5",
    desc: "Standard integrals, substitution, trigonometric identities and the standard forms with completing the square.",
  },
];

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
