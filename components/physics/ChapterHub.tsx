import Link from "next/link";
import { physChapter, PHYS_FEATURES, physFeatureHref } from "@/lib/physics/chapters";
import Icon, { type IconName } from "@/components/Icon";
import BetaBanner from "@/components/BetaBanner";
import { BackLink } from "@/components/ui";

const ICON: Record<string, IconName> = { flashcards: "cards", practice: "target", equations: "compass", advanced: "flame" };

/** Chapter screen: the four learning features. Server component: the counts come from the real question bank, never hard-coded. */
export default async function ChapterHub({ slug }: { slug: string }) {
  const meta = physChapter(slug)!;
  const c = await meta.load();
  const adv = c.advanced.board.length + c.advanced.hots.length + c.advanced.jee.length;
  const count: Record<string, string> = {
    flashcards: `${c.cards.length} formula cards`,
    practice: `${c.concepts.length} conceptual · ${c.numericals.length} numerical`,
    equations: `${c.equations.length} questions`,
    advanced: `${adv} problems · Board, HOTS, JEE Main`,
  };
  return (
    <>
      <BetaBanner />
      <main className="theme-phys mx-auto max-w-3xl px-4 py-6 sm:py-10">
        <div className="mb-6"><BackLink href="/physics">Physics</BackLink></div>
        <header className="mb-8">
          <p className="mb-1 text-sm text-slate-500">Chapter {meta.number}</p>
          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">{meta.title}</h1>
          <p className="mt-3 max-w-xl leading-relaxed text-slate-400">{meta.desc}</p>
          <p className="mt-3 inline-block rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs leading-relaxed text-slate-400">{meta.weightage}</p>
        </header>
        <section className="stagger grid gap-4 sm:grid-cols-2" aria-label="Learning features">
          {PHYS_FEATURES.map((f) => (
            <Link key={f.id} href={physFeatureHref(slug, f.id)} className="card card-link gap-3 p-5">
              <div className="flex items-center gap-3">
                <span className="tile"><Icon name={ICON[f.id]} size={22} /></span>
                <h2 className="text-lg font-semibold leading-snug text-white">{f.label}</h2>
              </div>
              <p className="text-sm leading-relaxed text-slate-400">{f.blurb}</p>
              <p className="text-xs text-slate-500">{count[f.id]}</p>
              <span className="mt-auto flex items-center gap-2 pt-1 text-sm font-medium text-[rgb(var(--ac))]">Open<Icon name="forward" size={16} /></span>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
}
