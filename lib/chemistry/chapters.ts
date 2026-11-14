import type { ChemChapterContent, ChemChapterMeta } from "./types";

/**
 * Chemistry chapter registry.
 * To add a chapter: create lib/chemistry/chapters/<slug>.ts exporting `content`,
 * then add one entry here. Routes, the chapter list, static generation and
 * prefetching all pick it up automatically.
 */
export const CHEM_CHAPTERS: ChemChapterMeta[] = [
  {
    slug: "d-and-f-block-elements",
    number: 1,
    title: "D- and F-Block Elements",
    short: "D & F Block",
    icon: "🧪",
    desc: "Revision notes, flashcards, MCQ practice and conceptual challenge questions on transition metals, K₂Cr₂O₇, KMnO₄, lanthanoids and actinoids.",
    topics: ["Transition elements", "Properties", "K₂Cr₂O₇ & KMnO₄", "Lanthanoids", "Actinoids"],
    load: () => import("./chapters/d-and-f-block").then((m) => m.content),
  },
];

export function chemChapter(slug: string): ChemChapterMeta | undefined {
  return CHEM_CHAPTERS.find((c) => c.slug === slug);
}

export const chemChapterHref = (slug: string) => `/chemistry/${slug}`;

// ---- on-demand content cache (memory only; the browser/service worker caches the JS chunk) ----
const loaded = new Map<string, ChemChapterContent>();
const inflight = new Map<string, Promise<ChemChapterContent>>();

export function cachedChemContent(slug: string): ChemChapterContent | undefined {
  return loaded.get(slug);
}

export function loadChemContent(slug: string): Promise<ChemChapterContent> {
  const hit = loaded.get(slug);
  if (hit) return Promise.resolve(hit);
  const pending = inflight.get(slug);
  if (pending) return pending;
  const meta = chemChapter(slug);
  if (!meta) return Promise.reject(new Error(`Unknown chemistry chapter ${slug}`));
  const p = meta
    .load()
    .then((c) => { loaded.set(slug, c); inflight.delete(slug); return c; })
    .catch((e) => { inflight.delete(slug); throw e; });
  inflight.set(slug, p);
  return p;
}
