"use client";

import type { PhysEquationQ } from "@/lib/physics/types";
import Session from "./Session";
import McqCard from "./McqCard";

/** "Which equation gives ...?" The options are equations only, with no names, and the feedback is immediate. */
export default function EquationID({ chapterKey, items }: { chapterKey: string; items: PhysEquationQ[] }) {
  return (
    <Session navKey={`phys:equations:${chapterKey}`} items={items} label="Equation identification" noun="equations"
      render={(q, ctl) => <McqCard id={q.id} tag={q.tag} text={q.text} options={q.options} answer={q.answer} why={q.why} asEquations {...ctl} />} />
  );
}
