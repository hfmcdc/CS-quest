"use client";

import { useMemo, useState } from "react";
import type { PhysConcept } from "@/lib/physics/types";
import { readNav, writeNav } from "@/lib/navState";
import Session from "./Session";
import McqCard from "./McqCard";
import WrittenCard from "./WrittenCard";
import { chipCls } from "./shared";

type Kind = "all" | "mcq" | "written";

/** Conceptual questions: auto-checked MCQs (hint plus one retry) and written answers compared with a model answer. */
export default function ConceptPractice({ chapterKey, items }: { chapterKey: string; items: PhysConcept[] }) {
  const kindKey = `phys:concept-kind:${chapterKey}`;
  const [kind, setKindState] = useState<Kind>(() => readNav<Kind>(kindKey, "all"));
  const setKind = (k: Kind) => { setKindState(k); writeNav(kindKey, k); };
  const list = useMemo(() => items.filter((q) => kind === "all" || q.kind === kind), [items, kind]);
  const nMcq = items.filter((q) => q.kind === "mcq").length;

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="Question type">
        <button onClick={() => setKind("all")} aria-pressed={kind === "all"} className={chipCls(kind === "all")}>All ({items.length})</button>
        <button onClick={() => setKind("mcq")} aria-pressed={kind === "mcq"} className={chipCls(kind === "mcq")}>Multiple choice ({nMcq})</button>
        <button onClick={() => setKind("written")} aria-pressed={kind === "written"} className={chipCls(kind === "written")}>Written answer ({items.length - nMcq})</button>
      </div>
      <Session key={kind} navKey={`phys:concept:${chapterKey}:${kind}`} items={list} label="Conceptual questions"
        render={(q, ctl) => q.kind === "mcq"
          ? <McqCard id={q.id} tag={q.tag} text={q.text} options={q.options} answer={q.answer} why={q.why} hint={q.hint} retry {...ctl} />
          : <WrittenCard q={q} {...ctl} />} />
    </div>
  );
}
