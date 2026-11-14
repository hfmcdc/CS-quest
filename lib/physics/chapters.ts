import type { PhysChapterContent, PhysChapterMeta, PhysFeature } from "./types";

/**
 * Physics chapter registry (same pattern as lib/chemistry/chapters.ts).
 * To add a chapter: create lib/physics/chapters/<slug>.ts exporting `content`, then add one entry here.
 * Routes, the chapter list, static generation and prefetching all pick it up automatically.
 */
export const PHYS_CHAPTERS: PhysChapterMeta[] = [
  {
    slug: "moving-charges-and-magnetism",
    number: 4,
    title: "Moving Charges and Magnetism",
    short: "Moving Charges",
    desc: "Magnetic force, motion in a magnetic field, Biot–Savart law, Ampère's law, parallel conductors, torque on a loop and the moving coil galvanometer.",
    // Wording supplied for the launch. Kept in one place so it is easy to correct. Do not present it as this chapter's own marks.
    weightage: "Part of the 17-mark combined unit group (Chapters 4–7).",
    topics: ["Lorentz force", "Circular & helical motion", "Biot–Savart & Ampère", "Current loops", "Galvanometer"],
    load: () => import("./chapters/moving-charges").then((m) => m.content),
  },
];

export const PHYS_FEATURES: { id: PhysFeature; label: string; blurb: string }[] = [
  { id: "flashcards", label: "Formula Flashcards", blurb: "Tap to reveal each formula with its symbols and SI units." },
  { id: "practice", label: "Practice", blurb: "Conceptual questions and numericals where you enter the equation and the answer." },
  { id: "equations", label: "Equation Identification", blurb: "Pick the correct equation from options shown without names." },
  { id: "advanced", label: "Advanced Numericals", blurb: "Multi-step problems at CBSE Board, HOTS and JEE Main level." },
];

export const physChapter = (slug: string) => PHYS_CHAPTERS.find((c) => c.slug === slug);
export const physChapterHref = (slug: string) => `/physics/${slug}`;
export const physFeatureHref = (slug: string, f: PhysFeature) => `/physics/${slug}/${f}`;
export const isPhysFeature = (f: string): f is PhysFeature => PHYS_FEATURES.some((x) => x.id === f);

// ---- on-demand content cache (memory only; the browser/service worker caches the JS chunk) ----
const loaded = new Map<string, PhysChapterContent>();
const inflight = new Map<string, Promise<PhysChapterContent>>();

export function cachedPhysContent(slug: string): PhysChapterContent | undefined {
  return loaded.get(slug);
}

export function loadPhysContent(slug: string): Promise<PhysChapterContent> {
  const hit = loaded.get(slug);
  if (hit) return Promise.resolve(hit);
  const pending = inflight.get(slug);
  if (pending) return pending;
  const meta = physChapter(slug);
  if (!meta) return Promise.reject(new Error(`Unknown physics chapter ${slug}`));
  const p = meta.load()
    .then((c) => { loaded.set(slug, c); inflight.delete(slug); return c; })
    .catch((e) => { inflight.delete(slug); throw e; });
  inflight.set(slug, p);
  return p;
}
