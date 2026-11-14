import type { AdvancedContent, EquationsContent, FeatureContentMap, FlashcardsContent, PhysChapterMeta, PhysFeature, PracticeContent, WeightGroup } from "./types";

/**
 * Physics chapter registry (light metadata, safe to import anywhere) and on-demand content loaders.
 * Each chapter has four content modules, loaded only when that feature is opened:
 *   lib/physics/content/<slug>/{cards,practice,equations,advanced}.ts
 * To add a question, edit the matching file and run `npm run verify:physics`.
 *
 * Scope note: topics follow the CBSE 2026-27 Class XII syllabus (NCERT content marked as excluded is not tested).
 */
export const PHYS_CHAPTERS: PhysChapterMeta[] = [
  { slug: "electric-charges-and-fields", number: 1, title: "Electric Charges and Fields", short: "Electric Charges", desc: "Charge, Coulomb's law, electric field and dipoles, flux and Gauss's theorem.", topics: ["Coulomb's law", "Electric field", "Dipole", "Flux", "Gauss's theorem"] },
  { slug: "electrostatic-potential-and-capacitance", number: 2, title: "Electrostatic Potential and Capacitance", short: "Potential & Capacitance", desc: "Potential, equipotentials, dielectrics, capacitors and the energy stored in them.", topics: ["Potential", "Equipotentials", "Dielectrics", "Capacitors", "Energy stored"] },
  { slug: "current-electricity", number: 3, title: "Current Electricity", short: "Current Electricity", desc: "Drift velocity, Ohm's law, resistivity, cells, Kirchhoff's rules and the Wheatstone bridge.", topics: ["Drift velocity", "Ohm's law", "Resistivity", "emf & internal resistance", "Kirchhoff's rules", "Wheatstone bridge"] },
  { slug: "moving-charges-and-magnetism", number: 4, title: "Moving Charges and Magnetism", short: "Moving Charges", desc: "Biot–Savart and Ampere's laws, the Lorentz force, current loops and the galvanometer.", topics: ["Biot–Savart law", "Ampere's law", "Lorentz force", "Force between currents", "Current loop", "Galvanometer"] },
  { slug: "magnetism-and-matter", number: 5, title: "Magnetism and Matter", short: "Magnetism & Matter", desc: "Bar magnets, Earth's magnetism, magnetic dipoles and the magnetic properties of materials.", topics: ["Bar magnet", "Earth's magnetism", "Magnetic dipole", "Para, dia, ferro", "Magnetisation"] },
  { slug: "electromagnetic-induction", number: 6, title: "Electromagnetic Induction", short: "EM Induction", desc: "Faraday's and Lenz's laws, motional emf, eddy currents, self and mutual inductance.", topics: ["Faraday's law", "Lenz's law", "Motional emf", "Eddy currents", "Inductance"] },
  { slug: "alternating-current", number: 7, title: "Alternating Current", short: "Alternating Current", desc: "rms values, reactance, LCR circuits, resonance, power factor, generators and transformers.", topics: ["rms & peak", "Reactance", "LCR circuit", "Resonance", "Power factor", "Transformer"] },
  { slug: "electromagnetic-waves", number: 8, title: "Electromagnetic Waves", short: "EM Waves", desc: "Displacement current, the nature of electromagnetic waves and the electromagnetic spectrum.", topics: ["Displacement current", "Wave properties", "Speed of light", "EM spectrum"] },
  { slug: "ray-optics-and-optical-instruments", number: 9, title: "Ray Optics and Optical Instruments", short: "Ray Optics", desc: "Mirrors, refraction, lenses, prisms, microscopes and telescopes.", topics: ["Mirrors", "Refraction", "Total internal reflection", "Lenses", "Prism", "Microscope & telescope"] },
  { slug: "wave-optics", number: 10, title: "Wave Optics", short: "Wave Optics", desc: "Huygens' principle, interference, Young's experiment, single-slit diffraction and polarisation.", topics: ["Huygens' principle", "Interference", "Young's experiment", "Diffraction", "Polarisation"] },
  { slug: "dual-nature-of-radiation-and-matter", number: 11, title: "Dual Nature of Radiation and Matter", short: "Dual Nature", desc: "The photoelectric effect, Einstein's equation, photons and de Broglie matter waves.", topics: ["Photoelectric effect", "Einstein's equation", "Photon", "de Broglie wavelength"] },
  { slug: "atoms", number: 12, title: "Atoms", short: "Atoms", desc: "Rutherford's model, Bohr's model of hydrogen, energy levels and spectral lines.", topics: ["Rutherford's model", "Bohr's postulates", "Energy levels", "Hydrogen spectrum"] },
  { slug: "nuclei", number: 13, title: "Nuclei", short: "Nuclei", desc: "Nuclear size and composition, mass defect, binding energy, fission and fusion.", topics: ["Nuclear size", "Mass defect", "Binding energy", "Fission", "Fusion"] },
  { slug: "semiconductor-electronics", number: 14, title: "Semiconductor Electronics: Materials, Devices and Simple Circuits", short: "Semiconductors", desc: "Energy bands, intrinsic and extrinsic semiconductors, the p–n junction diode and rectifiers.", topics: ["Energy bands", "Intrinsic & extrinsic", "p–n junction", "Diode I–V", "Rectifier"] },
];

/** CBSE publishes marks per unit group, not per chapter. Never show a single chapter as "worth" a number of marks. */
export const WEIGHT_GROUPS: WeightGroup[] = [
  { id: "u1-2", marks: 16, chapters: [1, 2, 3], unitLabel: "Units I–II" },
  { id: "u3-4", marks: 17, chapters: [4, 5, 6, 7], unitLabel: "Units III–IV" },
  { id: "u5-6", marks: 18, chapters: [8, 9, 10], unitLabel: "Units V–VI" },
  { id: "u7-8", marks: 12, chapters: [11, 12, 13], unitLabel: "Units VII–VIII" },
  { id: "u9", marks: 7, chapters: [14], unitLabel: "Unit IX" },
];

export const weightGroupOf = (chapterNumber: number): WeightGroup => WEIGHT_GROUPS.find((g) => g.chapters.includes(chapterNumber))!;

/** Short label for a chapter card. Chapters 1-13 share a unit group's marks; Chapter 14 is a unit on its own. */
export function weightLabel(chapterNumber: number): string {
  const g = weightGroupOf(chapterNumber);
  return g.chapters.length === 1 ? `${g.marks} marks · ${g.unitLabel.replace("Units", "Unit")}` : `Part of ${g.marks}-mark unit group`;
}

/** Longer clarification: the marks are shared by the whole group. */
export function weightNote(chapterNumber: number): string {
  const g = weightGroupOf(chapterNumber);
  if (g.chapters.length === 1) return `${g.unitLabel.replace("Units", "Unit")} carries ${g.marks} marks in the theory paper.`;
  const first = g.chapters[0];
  const last = g.chapters[g.chapters.length - 1];
  return `${g.marks} marks are shared by Chapters ${first}–${last} together. CBSE does not publish marks for individual chapters.`;
}

export const physChapter = (slug: string): PhysChapterMeta | undefined => PHYS_CHAPTERS.find((c) => c.slug === slug);
export const PHYS_FEATURES: PhysFeature[] = ["flashcards", "practice", "equations", "advanced"];
export const isPhysFeature = (s: string): s is PhysFeature => (PHYS_FEATURES as string[]).includes(s);
export const physChapterHref = (slug: string) => `/physics/${slug}`;
export const physFeatureHref = (slug: string, f: PhysFeature) => `/physics/${slug}/${f}`;

type Loader<T> = () => Promise<T>;
type Loaders = { [K in PhysFeature]: Loader<FeatureContentMap[K]> };

const LOADERS: Record<string, Loaders> = {
  "electric-charges-and-fields": {
    flashcards: () => import("./content/electric-charges-and-fields/cards").then((m) => m.content as FlashcardsContent),
    practice: () => import("./content/electric-charges-and-fields/practice").then((m) => m.content as PracticeContent),
    equations: () => import("./content/electric-charges-and-fields/equations").then((m) => m.content as EquationsContent),
    advanced: () => import("./content/electric-charges-and-fields/advanced").then((m) => m.content as AdvancedContent),
  },
  "electrostatic-potential-and-capacitance": {
    flashcards: () => import("./content/electrostatic-potential-and-capacitance/cards").then((m) => m.content as FlashcardsContent),
    practice: () => import("./content/electrostatic-potential-and-capacitance/practice").then((m) => m.content as PracticeContent),
    equations: () => import("./content/electrostatic-potential-and-capacitance/equations").then((m) => m.content as EquationsContent),
    advanced: () => import("./content/electrostatic-potential-and-capacitance/advanced").then((m) => m.content as AdvancedContent),
  },
  "current-electricity": {
    flashcards: () => import("./content/current-electricity/cards").then((m) => m.content as FlashcardsContent),
    practice: () => import("./content/current-electricity/practice").then((m) => m.content as PracticeContent),
    equations: () => import("./content/current-electricity/equations").then((m) => m.content as EquationsContent),
    advanced: () => import("./content/current-electricity/advanced").then((m) => m.content as AdvancedContent),
  },
  "moving-charges-and-magnetism": {
    flashcards: () => import("./content/moving-charges-and-magnetism/cards").then((m) => m.content as FlashcardsContent),
    practice: () => import("./content/moving-charges-and-magnetism/practice").then((m) => m.content as PracticeContent),
    equations: () => import("./content/moving-charges-and-magnetism/equations").then((m) => m.content as EquationsContent),
    advanced: () => import("./content/moving-charges-and-magnetism/advanced").then((m) => m.content as AdvancedContent),
  },
  "magnetism-and-matter": {
    flashcards: () => import("./content/magnetism-and-matter/cards").then((m) => m.content as FlashcardsContent),
    practice: () => import("./content/magnetism-and-matter/practice").then((m) => m.content as PracticeContent),
    equations: () => import("./content/magnetism-and-matter/equations").then((m) => m.content as EquationsContent),
    advanced: () => import("./content/magnetism-and-matter/advanced").then((m) => m.content as AdvancedContent),
  },
  "electromagnetic-induction": {
    flashcards: () => import("./content/electromagnetic-induction/cards").then((m) => m.content as FlashcardsContent),
    practice: () => import("./content/electromagnetic-induction/practice").then((m) => m.content as PracticeContent),
    equations: () => import("./content/electromagnetic-induction/equations").then((m) => m.content as EquationsContent),
    advanced: () => import("./content/electromagnetic-induction/advanced").then((m) => m.content as AdvancedContent),
  },
  "alternating-current": {
    flashcards: () => import("./content/alternating-current/cards").then((m) => m.content as FlashcardsContent),
    practice: () => import("./content/alternating-current/practice").then((m) => m.content as PracticeContent),
    equations: () => import("./content/alternating-current/equations").then((m) => m.content as EquationsContent),
    advanced: () => import("./content/alternating-current/advanced").then((m) => m.content as AdvancedContent),
  },
  "electromagnetic-waves": {
    flashcards: () => import("./content/electromagnetic-waves/cards").then((m) => m.content as FlashcardsContent),
    practice: () => import("./content/electromagnetic-waves/practice").then((m) => m.content as PracticeContent),
    equations: () => import("./content/electromagnetic-waves/equations").then((m) => m.content as EquationsContent),
    advanced: () => import("./content/electromagnetic-waves/advanced").then((m) => m.content as AdvancedContent),
  },
  "ray-optics-and-optical-instruments": {
    flashcards: () => import("./content/ray-optics-and-optical-instruments/cards").then((m) => m.content as FlashcardsContent),
    practice: () => import("./content/ray-optics-and-optical-instruments/practice").then((m) => m.content as PracticeContent),
    equations: () => import("./content/ray-optics-and-optical-instruments/equations").then((m) => m.content as EquationsContent),
    advanced: () => import("./content/ray-optics-and-optical-instruments/advanced").then((m) => m.content as AdvancedContent),
  },
  "wave-optics": {
    flashcards: () => import("./content/wave-optics/cards").then((m) => m.content as FlashcardsContent),
    practice: () => import("./content/wave-optics/practice").then((m) => m.content as PracticeContent),
    equations: () => import("./content/wave-optics/equations").then((m) => m.content as EquationsContent),
    advanced: () => import("./content/wave-optics/advanced").then((m) => m.content as AdvancedContent),
  },
  "dual-nature-of-radiation-and-matter": {
    flashcards: () => import("./content/dual-nature-of-radiation-and-matter/cards").then((m) => m.content as FlashcardsContent),
    practice: () => import("./content/dual-nature-of-radiation-and-matter/practice").then((m) => m.content as PracticeContent),
    equations: () => import("./content/dual-nature-of-radiation-and-matter/equations").then((m) => m.content as EquationsContent),
    advanced: () => import("./content/dual-nature-of-radiation-and-matter/advanced").then((m) => m.content as AdvancedContent),
  },
  "atoms": {
    flashcards: () => import("./content/atoms/cards").then((m) => m.content as FlashcardsContent),
    practice: () => import("./content/atoms/practice").then((m) => m.content as PracticeContent),
    equations: () => import("./content/atoms/equations").then((m) => m.content as EquationsContent),
    advanced: () => import("./content/atoms/advanced").then((m) => m.content as AdvancedContent),
  },
  "nuclei": {
    flashcards: () => import("./content/nuclei/cards").then((m) => m.content as FlashcardsContent),
    practice: () => import("./content/nuclei/practice").then((m) => m.content as PracticeContent),
    equations: () => import("./content/nuclei/equations").then((m) => m.content as EquationsContent),
    advanced: () => import("./content/nuclei/advanced").then((m) => m.content as AdvancedContent),
  },
  "semiconductor-electronics": {
    flashcards: () => import("./content/semiconductor-electronics/cards").then((m) => m.content as FlashcardsContent),
    practice: () => import("./content/semiconductor-electronics/practice").then((m) => m.content as PracticeContent),
    equations: () => import("./content/semiconductor-electronics/equations").then((m) => m.content as EquationsContent),
    advanced: () => import("./content/semiconductor-electronics/advanced").then((m) => m.content as AdvancedContent),
  },
};

// ---- on-demand cache (memory only; the browser and service worker cache the JS chunks) ----
const loaded = new Map<string, unknown>();
const inflight = new Map<string, Promise<unknown>>();
const key = (slug: string, f: PhysFeature) => `${slug}:${f}`;

export function cachedPhysContent<F extends PhysFeature>(slug: string, f: F): FeatureContentMap[F] | undefined {
  return loaded.get(key(slug, f)) as FeatureContentMap[F] | undefined;
}

export function loadPhysContent<F extends PhysFeature>(slug: string, f: F): Promise<FeatureContentMap[F]> {
  const k = key(slug, f);
  if (loaded.has(k)) return Promise.resolve(loaded.get(k) as FeatureContentMap[F]);
  const pending = inflight.get(k);
  if (pending) return pending as Promise<FeatureContentMap[F]>;
  const set = LOADERS[slug];
  if (!set) return Promise.reject(new Error(`Unknown physics chapter ${slug}`));
  const p = (set[f]() as Promise<FeatureContentMap[F]>)
    .then((c) => { loaded.set(k, c); inflight.delete(k); return c; })
    .catch((e) => { inflight.delete(k); throw e; });
  inflight.set(k, p);
  return p;
}
