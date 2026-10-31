import Link from "next/link";
import { CHEM_CHAPTERS, chemChapterHref } from "@/lib/chemistry/chapters";

/** Chapter list. Static (no client state) so it renders instantly and is prefetched with the route. */
export default function ChemistryHome() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6">
        <Link href="/" className="rounded-lg border border-slate-700 px-3 py-2 text-sm hover:border-amber-400">← Main dashboard</Link>
      </div>
      <header className="mb-6">
        <h1 className="mono text-3xl font-bold text-amber-300 sm:text-4xl"><span aria-hidden="true">⚗ </span>Chemistry Quest</h1>
        <p className="mt-2 max-w-xl text-slate-400">CBSE Class XII Chemistry. Pick a chapter, revise the key ideas, then practise with MCQs.</p>
      </header>
      <section className="grid gap-4 md:grid-cols-2" aria-label="Chemistry chapters">
        {CHEM_CHAPTERS.map((c) => (
          <Link
            key={c.slug}
            href={chemChapterHref(c.slug)}
            className="group flex min-w-0 flex-col rounded-2xl border border-slate-700/80 bg-gradient-to-b from-slate-900 to-slate-900/40 p-5 transition hover:-translate-y-1 hover:border-amber-400 hover:shadow-[0_0_40px_-15px_#fbbf24]"
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-2xl" aria-hidden="true">{c.icon}</span>
              <div className="min-w-0">
                <p className="mono text-xs text-violet-300">Chapter {c.number}</p>
                <h2 className="text-lg font-semibold leading-snug">{c.title}</h2>
              </div>
            </div>
            <p className="mb-3 text-sm text-slate-400">{c.desc}</p>
            <ul className="mb-4 flex flex-wrap gap-2 text-xs" aria-label="Topics covered">
              {c.topics.map((t) => <li key={t} className="rounded-full bg-amber-400/10 px-3 py-1 text-amber-200">{t}</li>)}
            </ul>
            <span className="mt-auto text-sm font-semibold text-amber-300">Open chapter →</span>
          </Link>
        ))}
      </section>
      <p className="mt-8 text-center text-xs text-slate-500">
        More Chemistry chapters will be added later. Questions are written for practice and follow the CBSE Class XII syllabus. Nothing is saved.
      </p>
    </main>
  );
}
