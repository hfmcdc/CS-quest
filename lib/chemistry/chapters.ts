import type { ChemChapterContent, ChemChapterMeta } from "./types";

/**
 * Chemistry chapter registry.
 * Chapters are listed in syllabus order. A chapter is added only when its content is complete: no placeholders.
 * To add one: create lib/chemistry/chapters/<slug>.ts exporting `content`, add one entry here, run `npm run verify:chemistry`. Routes, the chapter list, static generation and
 * prefetching all pick it up automatically.
 */
export const CHEM_CHAPTERS: ChemChapterMeta[] = [
  {
    slug: "solutions",
    number: 1,
    title: "Solutions",
    short: "Solutions",
    icon: "💧",
    desc: "Concentration terms, Henry's law, Raoult's law, ideal and non-ideal solutions, colligative properties and the van't Hoff factor.",
    topics: ["Concentration", "Henry's law", "Raoult's law", "Colligative properties", "van't Hoff factor"],
    branch: "physical",
    marks: 7,
    features: ["revise", "cards", "concept", "numerical", "practice", "predict", "challenge"],
    load: () => import("./chapters/solutions").then((m) => m.content),
  },
  {
    slug: "chemical-kinetics",
    number: 3,
    title: "Chemical Kinetics",
    short: "Kinetics",
    icon: "⏱",
    desc: "Rate of reaction, rate law, order and molecularity, zero- and first-order integrated equations, the Arrhenius equation and collision theory.",
    topics: ["Rate of reaction", "Rate law & order", "Integrated rate equations", "Arrhenius equation", "Collision theory"],
    branch: "physical",
    marks: 7,
    features: ["revise", "cards", "concept", "numerical", "practice", "predict", "challenge"],
    load: () => import("./chapters/chemical-kinetics").then((m) => m.content),
  },
  {
    slug: "d-and-f-block-elements",
    number: 4,
    title: "D- and F-Block Elements",
    short: "D & F Block",
    icon: "🧪",
    desc: "Revision notes, flashcards, MCQ practice and conceptual challenge questions on transition metals, K₂Cr₂O₇, KMnO₄, lanthanoids and actinoids.",
    topics: ["Transition elements", "Properties", "K₂Cr₂O₇ & KMnO₄", "Lanthanoids", "Actinoids"],
    branch: "inorganic",
    marks: 7,
    features: ["revise", "cards", "practice", "challenge"],
    load: () => import("./chapters/d-and-f-block").then((m) => m.content),
  },
  {
    slug: "haloalkanes-and-haloarenes",
    number: 6,
    title: "Haloalkanes and Haloarenes",
    short: "Haloalkanes",
    icon: "🧪",
    desc: "Classification, nature of the C–X bond, preparation, nucleophilic substitution and elimination, reactions of haloarenes, and polyhalogen compounds.",
    topics: ["C–X bond", "Preparation", "SN1 and SN2", "Elimination", "Haloarenes", "Polyhalogen compounds"],
    branch: "organic",
    marks: 6,
    features: ["revise", "cards", "concept", "equations", "reactions", "practice", "predict", "challenge"],
    load: () => import("./chapters/haloalkanes-and-haloarenes").then((m) => m.content),
  },
  {
    slug: "alcohols-phenols-and-ethers",
    number: 7,
    title: "Alcohols, Phenols and Ethers",
    short: "Alcohols",
    icon: "🍶",
    desc: "Preparation and reactions of alcohols, phenols and ethers: acidity, named reactions, Williamson synthesis and ether cleavage.",
    topics: ["Preparation", "Acidity", "Alcohol reactions", "Phenol reactions", "Ethers"],
    branch: "organic",
    marks: 6,
    features: ["revise", "cards", "concept", "equations", "reactions", "practice", "predict", "challenge"],
    load: () => import("./chapters/alcohols-phenols-and-ethers").then((m) => m.content),
  },
  {
    slug: "aldehydes-ketones-and-carboxylic-acids",
    number: 8,
    title: "Aldehydes, Ketones and Carboxylic Acids",
    short: "Carbonyls",
    icon: "⚗",
    desc: "Preparation and reactions of aldehydes, ketones and carboxylic acids: nucleophilic addition, named reactions, acidity and chemical tests.",
    topics: ["Nomenclature", "Preparation", "Nucleophilic addition", "Named reactions", "Acidity", "Chemical tests"],
    branch: "organic",
    marks: 8,
    features: ["revise", "cards", "concept", "equations", "reactions", "practice", "predict", "challenge"],
    load: () => import("./chapters/aldehydes-ketones-and-carboxylic-acids").then((m) => m.content),
  },
  {
    slug: "amines",
    number: 9,
    title: "Amines",
    short: "Amines",
    icon: "🧫",
    desc: "Classification, preparation, basic character and reactions of amines, plus diazonium salts and their synthetic uses.",
    topics: ["Preparation", "Basic character", "Reactions", "Diazonium salts", "Coupling"],
    branch: "organic",
    marks: 6,
    features: ["revise", "cards", "concept", "equations", "reactions", "practice", "predict", "challenge"],
    load: () => import("./chapters/amines").then((m) => m.content),
  },
  {
    slug: "biomolecules",
    number: 10,
    title: "Biomolecules",
    short: "Biomolecules",
    icon: "🧬",
    desc: "Carbohydrates, proteins, enzymes, vitamins, nucleic acids and the basic ideas about hormones.",
    topics: ["Carbohydrates", "Glucose", "Proteins", "Enzymes", "Vitamins", "Nucleic acids", "Hormones"],
    branch: "organic",
    marks: 7,
    features: ["revise", "cards", "concept", "equations", "reactions", "practice", "predict", "challenge"],
    load: () => import("./chapters/biomolecules").then((m) => m.content),
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
