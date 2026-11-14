"use client";

import type { ChemSection } from "@/lib/chemistry/types";
import Collapsible from "@/components/Collapsible";
import Icon, { type IconName } from "@/components/Icon";

const ICON: Record<ChemSection["kind"], IconName> = { concepts: "bulb", reactions: "flask", mistakes: "warn", table: "table" };

export default function ChemNotes({ sections }: { sections: ChemSection[] }) {
  return (
    <div className="stagger space-y-3">
      {sections.map((sec, n) => (
        <Collapsible key={sec.title} title={sec.title} icon={<Icon name={ICON[sec.kind]} size={20} />} defaultOpen={n < 2} tone={sec.kind === "mistakes" ? "!border-rose-400/20" : ""}>
          {sec.kind === "table" ? (
            <>
              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full min-w-[22rem] border-collapse text-left text-sm">
                  <thead>
                    <tr className="bg-white/[0.04] text-xs text-[rgb(var(--ac))]">
                      {sec.head.map((h) => <th key={h} scope="col" className="px-3 py-2.5 font-semibold">{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {sec.rows.map((r, i) => (
                      <tr key={i} className="border-t border-white/5">
                        {r.map((cell, j) => <td key={j} className={`px-3 py-2.5 ${j === 0 ? "font-medium text-slate-100" : "text-slate-300"}`}>{cell}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {sec.note && <p className="mt-2 text-xs text-slate-500">{sec.note}</p>}
            </>
          ) : (
            <ul className="space-y-3 text-sm leading-relaxed text-slate-300">
              {sec.items.map((it, i) => (
                <li key={i} className="flex min-w-0 gap-3">
                  <span aria-hidden="true" className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${sec.kind === "mistakes" ? "bg-rose-400" : "bg-[rgb(var(--ac))]"}`} />
                  <span className="min-w-0 flex-1 break-words">
                    {it.label && <span className="font-semibold text-white">{it.label}: </span>}
                    {it.body}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Collapsible>
      ))}
    </div>
  );
}
