import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PHYS_CHAPTERS, PHYS_FEATURES, isPhysFeature, physChapter } from "@/lib/physics/chapters";
import { featureMeta } from "@/lib/physics/features";
import FeaturePage from "@/components/physics/FeaturePage";

export const dynamicParams = false;

export function generateStaticParams() {
  return PHYS_CHAPTERS.flatMap((c) => PHYS_FEATURES.map((f) => ({ chapter: c.slug, feature: f })));
}

export function generateMetadata({ params }: { params: { chapter: string; feature: string } }): Metadata {
  const c = physChapter(params.chapter);
  const f = params.feature;
  if (!c || !isPhysFeature(f)) return { title: "Physics | Quest MC" };
  return { title: `${featureMeta(f).title} · ${c.title} | Physics | Quest MC` };
}

export default function PhysicsFeaturePage({ params }: { params: { chapter: string; feature: string } }) {
  if (!physChapter(params.chapter) || !isPhysFeature(params.feature)) notFound();
  return <FeaturePage slug={params.chapter} feature={params.feature} />;
}
