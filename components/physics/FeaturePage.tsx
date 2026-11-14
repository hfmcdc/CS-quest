import BetaBanner from "@/components/BetaBanner";
import { BackLink } from "@/components/ui";
import { physChapter, physChapterHref } from "@/lib/physics/chapters";
import { featureMeta } from "@/lib/physics/features";
import type { PhysFeature } from "@/lib/physics/types";
import AdvancedScreen from "./AdvancedScreen";
import EquationQuiz from "./EquationQuiz";
import Flashcards from "./Flashcards";
import PracticeScreen from "./PracticeScreen";

/** A dedicated learning screen for one feature of one chapter. The heavy question bank is loaded by the client component, on demand. */
export default function FeaturePage({ slug, feature }: { slug: string; feature: PhysFeature }) {
  const c = physChapter(slug)!;
  const f = featureMeta(feature);
  return (
    <>
      <BetaBanner />
      <main className="theme-phys ph-wrap">
        <div className="ph-top"><BackLink href={physChapterHref(slug)}>Chapter {c.number}</BackLink></div>
        <header style={{ marginBottom: "1.5rem" }}>
          <p className="ph-eyebrow">Chapter {c.number} · {c.title}</p>
          <h1 className="ph-h1">{f.title}</h1>
        </header>
        {feature === "flashcards" && <Flashcards slug={slug} />}
        {feature === "practice" && <PracticeScreen slug={slug} />}
        {feature === "equations" && <EquationQuiz slug={slug} />}
        {feature === "advanced" && <AdvancedScreen slug={slug} />}
      </main>
    </>
  );
}
