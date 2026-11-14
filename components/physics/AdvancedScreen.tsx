"use client";

import { useState } from "react";
import { readNav, writeNav } from "@/lib/navState";
import type { AdvLevel } from "@/lib/physics/types";
import NumericalPlayer from "./NumericalPlayer";
import { LoadError, Pills, Skeleton } from "./shared";
import { usePhysContent } from "./usePhysContent";

const LEVELS: { id: AdvLevel; label: string; level: 1 | 2 | 3; note: string }[] = [
  { id: "board", label: "CBSE Board", level: 1, note: "Multi-step problems at the standard of the longer numerical questions in the board paper." },
  { id: "hots", label: "CBSE HOTS", level: 2, note: "Higher-order thinking: combine several ideas and reason about the situation before you calculate." },
  { id: "jee", label: "JEE Main", level: 3, note: "Tougher, multi-concept problems in the style of JEE Main, built on this chapter's ideas." },
];
const LABELS = ["CBSE Board", "CBSE HOTS", "JEE Main"];

/** Feature 4 — Advanced numericals at three selectable levels. */
export default function AdvancedScreen({ slug }: { slug: string }) {
  const { data, error, retry } = usePhysContent(slug, "advanced");
  const [lv, setLvState] = useState<AdvLevel>(() => readNav<AdvLevel>(`phys:${slug}:adv-level`, "board"));
  const setLv = (v: AdvLevel) => { setLvState(v); writeNav(`phys:${slug}:adv-level`, v); };
  const cur = LEVELS.find((l) => l.id === lv)!;

  return (
    <div>
      <Pills options={LEVELS} value={lv} onChange={setLv} label="Difficulty level" />
      <p className="ph-pillnote">{cur.note}</p>
      <div style={{ marginTop: "1.1rem" }}>
        {error ? <LoadError onRetry={retry} /> : !data ? <Skeleton /> : (
          <NumericalPlayer key={`${slug}-${lv}`} slug={slug} questions={data.problems.filter((p) => p.level === cur.level)} levelLabels={LABELS} />
        )}
      </div>
    </div>
  );
}
