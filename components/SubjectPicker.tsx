import Link from "next/link";
import { SUBJECTS } from "@/lib/subjects";
import Icon from "@/components/Icon";
import Wordmark from "@/components/Wordmark";

export default function SubjectPicker() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-5xl flex-col justify-center px-5 py-14 sm:py-20">
      <header className="mb-12 max-w-xl">
        <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-6xl">
          <Wordmark className="bg-gradient-to-r from-cyan-200 via-cyan-300 to-violet-300 bg-clip-text text-transparent" />
        </h1>
        <p className="mt-5 text-lg text-slate-400">Pick a subject and start practising.</p>
      </header>

      <div className="stagger grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SUBJECTS.map((s) => (
          <Link key={s.href} href={s.href} prefetch={false} className={`card card-link ${s.theme} min-h-56 gap-4 p-6`}>
            <span className="tile h-12 w-12"><Icon name={s.icon} size={24} /></span>
            <span className="text-xl font-semibold text-white">{s.title}</span>
            <span className="text-sm leading-relaxed text-slate-400">{s.note}</span>
            <span className="mt-auto flex items-center gap-2 pt-3 text-sm font-medium text-[rgb(var(--ac))]">
              {s.cta}<Icon name="forward" size={16} />
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
