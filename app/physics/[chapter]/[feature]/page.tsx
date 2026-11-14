import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PHYS_CHAPTERS, PHYS_FEATURES, isPhysFeature, physChapter } from "@/lib/physics/chapters";
import FeatureScreen from "@/components/physics/FeatureScreen";

export const dynamicParams = false;

export function generateStaticParams() {
  return PHYS_CHAPTERS.flatMap((c) => PHYS_FEATURES.map((f) => ({ chapter: c.slug, feature: f.id })));
}

export function generateMetadata({ params }: { params: { chapter: string; feature: string } }): Metadata {
  const c = physChapter(params.chapter);
  const f = PHYS_FEATURES.find((x) => x.id === params.feature);
  return { title: c && f ? `${f.label} | ${c.title} | Quest MC` : "Physics | Quest MC", description: f?.blurb };
}

export default function PhysicsFeaturePage({ params }: { params: { chapter: string; feature: string } }) {
  if (!physChapter(params.chapter) || !isPhysFeature(params.feature)) notFound();
  return <FeatureScreen slug={params.chapter} feature={params.feature} />;
}
