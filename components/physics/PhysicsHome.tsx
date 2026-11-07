import Link from "next/link";
import { PHYS_CHAPTERS, physChapterHref } from "@/lib/physics/chapters";
import Icon from "@/components/Icon";
import BetaBanner from "@/components/BetaBanner";
import { BackLink, PageHeader } from "@/components/ui";

/** Physics chapter list. Static (no client state), so it renders instantly and prefetches with the route. */
export default function PhysicsHome() {
  return (
    <>
      <BetaBanner />
      <main className="theme-phys mx-auto max-w-5xl px-4 py-8 sm:py-12">
        <div className="mb-8"><BackLink href="/">Home</BackLink></div>
        <PageHeader title="Physics" icon={<Icon name="magnet" size={24} />}>CBSE Class XII. Pick a chapter, then choose flashcards, practice, equation identification or advanced numericals.</PageHeader>
        <section className="stagger grid gap-4 md:grid-cols-2" aria-label="Physics chapters">
          {PHYS_CHAPTERS.map((c) => (
            <Link key={c.slug} href={physChapterHref(c.slug)} className="card card-link gap-4 p-6">
              <div className="flex items-center gap-3">
                <span className="tile"><Icon name="magnet" size={22} /></span>
                <div className="min-w-0">
                  <p className="text-sm text-slate-500">Chapter {c.number}</p>
                  <h2 className="text-lg font-semibold leading-snug text-white">{c.title}</h2>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-slate-400">{c.desc}</p>
              <p className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs leading-relaxed text-slate-400">{c.weightage}</p>
              <ul className="flex flex-wrap gap-2" aria-label="Topics covered">
                {c.topics.map((t) => <li key={t} className="chip">{t}</li>)}
              </ul>
              <span className="mt-auto flex items-center gap-2 pt-1 text-sm font-medium text-[rgb(var(--ac))]">Open chapter<Icon name="forward" size={16} /></span>
            </Link>
          ))}
        </section>
        <p className="mt-10 text-center text-xs text-slate-500">More Physics chapters are coming. Questions follow the CBSE Class XII Physics syllabus and NCERT. Nothing is saved.</p>
      </main>
    </>
  );
}
