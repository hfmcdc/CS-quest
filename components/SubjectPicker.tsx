import Link from "next/link";

const SUBJECTS = [
  { href: "/computer", glyph: "</>", title: "Computer Science", note: "Binary files, CSV, MySQL, Python-SQL. Live now.", cta: "Start practice", live: true },
  { href: "/maths", glyph: "∑", title: "Maths", note: "Launching soon. See the countdown.", cta: "See launch time", live: false },
];

export default function SubjectPicker() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-8 px-5 py-12">
      <div className="text-center">
        <h1 className="mono text-5xl font-bold tracking-tight text-cyan-300 sm:text-6xl">Quest</h1>
        <p className="mt-3 text-slate-400">CBSE Class XII practice. Which subject today?</p>
      </div>

      <div className="grid w-full gap-4 sm:grid-cols-2">
        {SUBJECTS.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-cyan-300/60 hover:bg-white/[0.06]"
          >
            <span aria-hidden="true" className="mono text-4xl font-bold text-violet-300">{s.glyph}</span>
            <span className="text-xl font-semibold text-slate-100">{s.title}</span>
            <span className="text-sm text-slate-400">{s.note}</span>
            <span className={`mt-2 text-sm font-semibold ${s.live ? "text-cyan-300" : "text-amber-200"}`}>{s.cta}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
