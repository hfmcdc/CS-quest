import Link from "next/link";
import Icon from "@/components/Icon";
import BetaBanner from "@/components/BetaBanner";
import { BackLink } from "@/components/ui";
import { PHYS_COUNTS } from "@/lib/physics/counts.generated";
import { physChapter, physFeatureHref, weightLabel, weightNote } from "@/lib/physics/chapters";
import { FEATURES } from "@/lib/physics/features";
import type { PhysFeature } from "@/lib/physics/types";

function countText(slug: string, f: PhysFeature): string {
  const c = PHYS_COUNTS[slug];
  if (!c) return "";
  switch (f) {
    case "flashcards": return `${c.cards} cards`;
    case "practice": return `${c.concept} conceptual · ${c.numerical} numerical`;
    case "equations": return `${c.equations} questions`;
    case "advanced": return `${c.advanced} problems · 3 levels`;
  }
}

/** Chapter screen: the four learning features. Static; the question banks load only when a feature is opened. */
export default function ChapterHub({ slug }: { slug: string }) {
  const c = physChapter(slug)!;
  return (
    <>
      <BetaBanner />
      <main className="theme-phys ph-wide">
        <div className="ph-top"><BackLink href="/physics">All chapters</BackLink></div>
        <header>
          <p className="ph-eyebrow">Chapter {c.number} · Physics</p>
          <h1 className="ph-h1">{c.title}</h1>
          <p className="ph-lead">{c.desc}</p>
          <ul className="ph-topics" aria-label="Topics covered">{c.topics.map((t) => <li key={t} className="chip">{t}</li>)}</ul>
          <p className="ph-notice"><b>{weightLabel(c.number)}.</b> {weightNote(c.number)}</p>
        </header>

        <section className="stagger ph-features" aria-label="Learning features">
          {FEATURES.map((f) => (
            <Link key={f.id} href={physFeatureHref(slug, f.id)} prefetch={false} className="card card-link fx-spot fx-edge ph-feat">
              <span className="tile"><Icon name={f.icon} size={22} /></span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <span className="ph-count">{countText(slug, f.id)}</span>
              <span className="ph-go">Open<Icon name="forward" size={16} /></span>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
}
