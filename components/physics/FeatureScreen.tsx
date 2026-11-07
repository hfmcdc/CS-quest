"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cachedPhysContent, loadPhysContent, physChapter, physChapterHref, physFeatureHref, PHYS_FEATURES } from "@/lib/physics/chapters";
import type { PhysChapterContent, PhysFeature } from "@/lib/physics/types";
import BetaBanner from "@/components/BetaBanner";
import { BackLink } from "@/components/ui";
import Flashcards from "./Flashcards";
import Practice from "./Practice";
import EquationID from "./EquationID";
import Advanced from "./Advanced";

function Skeleton() {
  return (
    <div className="space-y-4" role="status" aria-label="Loading">
      {[0, 1, 2].map((i) => <div key={i} className="h-28 animate-pulse rounded-2xl border border-white/5 bg-white/[0.03]" style={{ animationDelay: `${i * 120}ms` }} />)}
    </div>
  );
}

/** One learning feature of a chapter. Content loads on demand and is cached in memory, so revisiting is instant. */
export default function FeatureScreen({ slug, feature }: { slug: string; feature: PhysFeature }) {
  const meta = physChapter(slug)!;
  const f = PHYS_FEATURES.find((x) => x.id === feature)!;
  const [content, setContent] = useState<PhysChapterContent | undefined>(() => cachedPhysContent(slug));
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (content) return;
    let live = true;
    loadPhysContent(slug).then((c) => live && setContent(c)).catch(() => live && setFailed(true));
    return () => { live = false; };
  }, [slug, content]);

  return (
    <>
      <BetaBanner />
      <main className="theme-phys mx-auto max-w-3xl px-4 py-6 sm:py-10">
        <div className="mb-6"><BackLink href={physChapterHref(slug)}>{meta.short}</BackLink></div>
        <header className="mb-5">
          <p className="mb-1 text-sm text-slate-500">Chapter {meta.number} · {meta.title}</p>
          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white">{f.label}</h1>
        </header>

        <nav aria-label="Learning features" className="mb-6 flex gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {PHYS_FEATURES.map((x) => (
            <Link key={x.id} href={physFeatureHref(slug, x.id)} aria-current={x.id === feature ? "page" : undefined}
              className={`chip min-h-[2.4rem] shrink-0 px-3.5 text-sm ${x.id === feature ? "chip-ac" : "hover:!border-white/25 hover:!text-white"}`}>{x.label}</Link>
          ))}
        </nav>

        {failed && <p className="rounded-xl border border-rose-400/30 bg-rose-400/10 p-4 text-sm text-rose-200" role="alert">Could not load this chapter. Check your connection and refresh the page.</p>}
        {!content && !failed && <Skeleton />}
        {content && (
          <div className="a-fade">
            {feature === "flashcards" && <Flashcards chapterKey={slug} cards={content.cards} />}
            {feature === "practice" && <Practice chapterKey={slug} content={content} />}
            {feature === "equations" && <EquationID chapterKey={slug} items={content.equations} />}
            {feature === "advanced" && <Advanced chapterKey={slug} content={content} />}
          </div>
        )}
      </main>
    </>
  );
}
