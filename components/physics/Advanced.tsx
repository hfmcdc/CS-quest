"use client";

import { useState } from "react";
import type { PhysChapterContent, PhysLevel } from "@/lib/physics/types";
import { readNav, writeNav } from "@/lib/navState";
import ModeTabs from "@/components/ModeTabs";
import NumericalSession from "./NumericalSession";

const LEVELS: { id: PhysLevel; label: string; blurb: string }[] = [
  { id: "board", label: "CBSE Board", blurb: "Two- or three-step problems of the kind set in the CBSE board paper." },
  { id: "hots", label: "CBSE HOTS", blurb: "Higher-order thinking: ratios, geometry and reasoning before the calculation." },
  { id: "jee", label: "JEE Main", blurb: "Multi-step problems that combine ideas from the chapter." },
];

/** Advanced numericals in three difficulty levels. Each level has its own progress. */
export default function Advanced({ chapterKey, content }: { chapterKey: string; content: PhysChapterContent }) {
  const key = `phys:adv-level:${chapterKey}`;
  const [lvl, setLvl] = useState<PhysLevel>(() => readNav<PhysLevel>(key, "board"));
  const pick = (l: PhysLevel) => { setLvl(l); writeNav(key, l); };
  const cur = LEVELS.find((l) => l.id === lvl)!;
  return (
    <div>
      <ModeTabs blurb={`${cur.blurb} ${content.advanced[lvl].length} problems.`}
        tabs={LEVELS.map((l) => ({ key: l.id, label: l.label, icon: l.id === "board" ? "book" : l.id === "hots" ? "bulb" : "flame", active: l.id === lvl, onClick: () => pick(l.id) }))} />
      <div key={lvl} className="a-fade">
        <NumericalSession navKey={`phys:adv:${chapterKey}:${lvl}`} problems={content.advanced[lvl]} label={cur.label} />
      </div>
    </div>
  );
}
