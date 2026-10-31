import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CHEM_CHAPTERS, chemChapter } from "@/lib/chemistry/chapters";
import ChapterScreen from "@/components/chemistry/ChapterScreen";

export const dynamicParams = false;

export function generateStaticParams() {
  return CHEM_CHAPTERS.map((c) => ({ chapter: c.slug }));
}

export function generateMetadata({ params }: { params: { chapter: string } }): Metadata {
  const c = chemChapter(params.chapter);
  return {
    title: c ? `${c.title} | Chemistry | Quest MC` : "Chemistry | Quest MC",
    description: c ? c.desc : "CBSE Class XII Chemistry.",
  };
}

export default function ChapterPage({ params }: { params: { chapter: string } }) {
  if (!chemChapter(params.chapter)) notFound();
  return <ChapterScreen slug={params.chapter} />;
}
