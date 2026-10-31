import type { ChemSection } from "@/lib/chemistry/types";

const STYLE = {
  concepts: { icon: "💡", ring: "border-violet-400/30" },
  reactions: { icon: "⚗️", ring: "border-cyan-400/30" },
  mistakes: { icon: "⚠️", ring: "border-rose-400/30" },
  table: { icon: "📊", ring: "border-emerald-400/30" },
} as const;

export default function ChemNotes({ sections }: { sections: ChemSection[] }) {
  return (
    <div className="space-y-4">
      {sections.map((sec) => {
        const st = STYLE[sec.kind];
        return (
          <section key={sec.title} className={`a-rise min-w-0 rounded-2xl border ${st.ring} bg-slate-900/70 p-4 sm:p-5`} aria-label={sec.title}>
            <h3 className="mb-3 text-base font-semibold"><span aria-hidden="true">{st.icon} </span>{sec.title}</h3>
            {sec.kind === "table" ? (
              <>
                <div className="overflow-x-auto rounded-xl border border-slate-700/70">
                  <table className="w-full min-w-[22rem] border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-slate-950/60 text-xs text-cyan-300">
                        {sec.head.map((h) => <th key={h} scope="col" className="px-3 py-2 font-semibold">{h}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {sec.rows.map((r, i) => (
                        <tr key={i} className="border-t border-slate-800">
                          {r.map((cell, j) => <td key={j} className={`px-3 py-2 ${j === 0 ? "font-medium text-slate-100" : "text-slate-300"}`}>{cell}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {sec.note && <p className="mt-2 text-xs text-slate-500">{sec.note}</p>}
              </>
            ) : (
              <ul className="space-y-2 text-sm leading-relaxed">
                {sec.items.map((it, i) => (
                  <li key={i} className="flex min-w-0 gap-2">
                    <span aria-hidden="true" className={sec.kind === "mistakes" ? "text-rose-300" : "text-violet-300"}>{sec.kind === "mistakes" ? "✗" : "•"}</span>
                    <span className="min-w-0 flex-1 break-words">
                      {it.label && <span className={`font-semibold ${sec.kind === "reactions" ? "text-cyan-300" : "text-amber-200"}`}>{it.label}: </span>}
                      {it.body}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );
}
