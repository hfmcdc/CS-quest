import Link from "next/link";
import { CHEM_CHAPTERS, chemChapterHref } from "@/lib/chemistry/chapters";
import Icon from "@/components/Icon";
import { BackLink, PageHeader } from "@/components/ui";

/** Chapter list. Static (no client state) so it renders instantly and is prefetched with the route. */
export default function ChemistryHome() {
  return (
    <main className="theme-chem mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <div className="mb-8"><BackLink href="/">Home</BackLink></div>
      <PageHeader title="Chemistry" icon={<Icon name="flask" size={24} />}>CBSE Class XII. Pick a chapter, revise the key ideas, then practise with MCQs.</PageHeader>
      <section className="stagger grid gap-4 md:grid-cols-2" aria-label="Chemistry chapters">
        {CHEM_CHAPTERS.map((c) => (
          <Link key={c.slug} href={chemChapterHref(c.slug)} className="card card-link gap-4 p-6">
            <div className="flex items-center gap-3">
              <span className="tile"><Icon name="flask" size={22} /></span>
              <div className="min-w-0">
                <p className="text-sm text-slate-500">Chapter {c.number}</p>
                <h2 className="text-lg font-semibold leading-snug text-white">{c.title}</h2>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">{c.desc}</p>
            <ul className="flex flex-wrap gap-2" aria-label="Topics covered">
              {c.topics.map((t) => <li key={t} className="chip">{t}</li>)}
            </ul>
            <span className="mt-auto flex items-center gap-2 pt-1 text-sm font-medium text-[rgb(var(--ac))]">Open chapter<Icon name="forward" size={16} /></span>
          </Link>
        ))}
      </section>
      <p className="mt-10 text-center text-xs text-slate-500">More chapters are coming. Questions are written for practice and follow the CBSE Class XII syllabus. Nothing is saved.</p>
    </main>
  );
}
