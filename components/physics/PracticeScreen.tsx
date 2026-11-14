"use client";

import { useState } from "react";
import { readNav, writeNav } from "@/lib/navState";
import ConceptPlayer from "./ConceptPlayer";
import NumericalPlayer from "./NumericalPlayer";
import { LoadError, Pills, Skeleton } from "./shared";
import { usePhysContent } from "./usePhysContent";

type Mode = "concept" | "numerical";
const MODES: { id: Mode; label: string }[] = [{ id: "concept", label: "Conceptual" }, { id: "numerical", label: "Numerical" }];
const NOTE: Record<Mode, string> = {
  concept: "Definitions, reasoning and applications: multiple-choice, assertion–reason and written questions.",
  numerical: "Enter the main equation and the final answer with its unit. Equivalent equations and units are accepted.",
};

/** Feature 2 — Practice, in two categories: A. Conceptual questions, B. Numerical questions. */
export default function PracticeScreen({ slug }: { slug: string }) {
  const { data, error, retry } = usePhysContent(slug, "practice");
  const [mode, setModeState] = useState<Mode>(() => readNav<Mode>(`phys:${slug}:practice-mode`, "concept"));
  const setMode = (m: Mode) => { setModeState(m); writeNav(`phys:${slug}:practice-mode`, m); };

  return (
    <div>
      <Pills options={MODES} value={mode} onChange={setMode} label="Practice category" />
      <p className="ph-pillnote">{NOTE[mode]}</p>
      <div style={{ marginTop: "1.1rem" }}>
        {error ? <LoadError onRetry={retry} /> : !data ? <Skeleton /> : mode === "concept"
          ? <ConceptPlayer key={`${slug}-c`} slug={slug} questions={data.concept} />
          : <NumericalPlayer key={`${slug}-n`} slug={slug} questions={data.numerical} levelLabels={["Easy", "Medium", "Hard"]} filterable />}
      </div>
    </div>
  );
}
