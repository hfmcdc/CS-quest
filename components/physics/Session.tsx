"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { readNav, writeNav } from "@/lib/navState";
import { celebrate } from "@/lib/fx";
import { FinishCard, Progress, shuffle } from "./shared";

interface S { ids: string[]; idx: number; results: Record<string, boolean>; finished: boolean }

/** Generic ordered question session: progress bar, results screen, retry-missed. Progress is kept while the tab stays open. */
export default function Session<T extends { id: string }>({ navKey, items, label, shuffled = true, render, noun = "questions" }: {
  navKey: string; items: T[]; label: string; shuffled?: boolean; noun?: string;
  render: (item: T, ctl: { onDone: (ok: boolean) => void; onNext: () => void; last: boolean }) => ReactNode;
}) {
  const fresh = (only?: string[]): S => { const pool = items.filter((x) => !only || only.includes(x.id)).map((x) => x.id); return { ids: shuffled ? shuffle(pool) : pool, idx: 0, results: {}, finished: false }; };
  const [s, setS] = useState<S>(() => {
    const saved = readNav<S | null>(navKey, null);
    return saved && saved.ids.every((id) => items.some((x) => x.id === id)) ? saved : fresh();
  });
  const ref = useRef(s); ref.current = s;
  useEffect(() => () => writeNav(navKey, ref.current), [navKey]);
  const byId = useMemo(() => new Map(items.map((x) => [x.id, x])), [items]);

  const total = s.ids.length;
  const right = s.ids.filter((id) => s.results[id]).length;
  const answered = s.ids.filter((id) => id in s.results).length;
  useEffect(() => { if (s.finished && right === total && total > 0) celebrate(true); }, [s.finished]); // eslint-disable-line react-hooks/exhaustive-deps

  if (s.finished) {
    const missed = s.ids.filter((id) => !s.results[id]);
    return (
      <FinishCard title="Set complete" actions={<>
        {missed.length > 0 && <button onClick={() => setS(fresh(missed))} className="btn-primary">Retry {missed.length} missed</button>}
        <button onClick={() => setS(fresh())} className="btn-ghost min-h-[2.9rem]">Restart</button>
      </>}>
        You got <b>{right}</b> of {total} {noun} right{missed.length === 0 ? ". Perfect set." : "."}
      </FinishCard>
    );
  }
  const item = byId.get(s.ids[s.idx]);
  if (!item) return null;
  return (
    <div>
      <Progress done={answered} total={total} label={label} />
      <div key={item.id}>
        {render(item, {
          onDone: (ok) => setS((c) => ({ ...c, results: { ...c.results, [item.id]: ok } })),
          onNext: () => setS((c) => (c.idx >= c.ids.length - 1 ? { ...c, finished: true } : { ...c, idx: c.idx + 1 })),
          last: s.idx === total - 1,
        })}
      </div>
    </div>
  );
}
