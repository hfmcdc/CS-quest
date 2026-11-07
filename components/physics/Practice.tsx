"use client";

import { useState } from "react";
import type { PhysChapterContent } from "@/lib/physics/types";
import { readNav, writeNav } from "@/lib/navState";
import ModeTabs from "@/components/ModeTabs";
import ConceptPractice from "./ConceptPractice";
import NumericalSession from "./NumericalSession";

type Cat = "concept" | "numerical";

/** Practice = two categories: Conceptual and Numerical. */
export default function Practice({ chapterKey, content }: { chapterKey: string; content: PhysChapterContent }) {
  const key = `phys:practice-cat:${chapterKey}`;
  const [cat, setCat] = useState<Cat>(() => readNav<Cat>(key, "concept"));
  const pick = (c: Cat) => { setCat(c); writeNav(key, c); };
  return (
    <div>
      <ModeTabs
        blurb={cat === "concept" ? "Definitions, reasoning and applications. Multiple choice is checked for you; written answers use a model answer." : "Enter the main equation and the final answer with its unit. Both are checked."}
        tabs={[
          { key: "concept", label: "Conceptual", icon: "bulb", active: cat === "concept", onClick: () => pick("concept") },
          { key: "numerical", label: "Numerical", icon: "target", active: cat === "numerical", onClick: () => pick("numerical") },
        ]} />
      <div key={cat} className="a-fade">
        {cat === "concept"
          ? <ConceptPractice chapterKey={chapterKey} items={content.concepts} />
          : <NumericalSession navKey={`phys:numerical:${chapterKey}`} problems={content.numericals} label="Numerical practice" />}
      </div>
    </div>
  );
}
