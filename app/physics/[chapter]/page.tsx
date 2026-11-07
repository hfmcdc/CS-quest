import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PHYS_CHAPTERS, physChapter } from "@/lib/physics/chapters";
import ChapterHub from "@/components/physics/ChapterHub";

export const dynamicParams = false;

export function generateStaticParams() {
  return PHYS_CHAPTERS.map((c) => ({ chapter: c.slug }));
}

export function generateMetadata({ params }: { params: { chapter: string } }): Metadata {
  const c = physChapter(params.chapter);
  return {
    title: c ? `${c.title} | Physics | Quest MC` : "Physics | Quest MC",
    description: c ? c.desc : "CBSE Class XII Physics.",
  };
}

export default function PhysicsChapterPage({ params }: { params: { chapter: string } }) {
  if (!physChapter(params.chapter)) notFound();
  return <ChapterHub slug={params.chapter} />;
}
