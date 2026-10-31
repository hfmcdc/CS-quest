import Link from "next/link";
import { SUBJECTS } from "@/lib/subjects";

export default function SubjectPicker() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center gap-8 px-5 py-12">
      <div className="text-center">
        <h1 className="mono text-5xl font-bold tracking-tight text-cyan-300 sm:text-6xl">Quest MC</h1>
        <p className="mt-3 text-slate-400">CBSE Class XII practice. Which subject today?</p>
      </div>

      <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SUBJECTS.map((subject) => (
          <Link
            key={subject.href}
            href={subject.href}
            className={`group flex min-h-56 flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition ${subject.hoverClass} hover:bg-white/[0.06]`}
          >
            <span aria-hidden="true" className={`mono text-4xl font-bold ${subject.glyphClass}`}>{subject.glyph}</span>
            <span className="text-xl font-semibold text-slate-100">{subject.title}</span>
            <span className="text-sm text-slate-400">{subject.note}</span>
            <span className={`mt-auto pt-2 text-sm font-semibold ${subject.glyphClass}`}>{subject.cta} →</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
