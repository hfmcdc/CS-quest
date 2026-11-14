import type { IconName } from "@/components/Icon";
import type { PhysFeature } from "./types";

export interface FeatureMeta { id: PhysFeature; title: string; short: string; desc: string; icon: IconName }

/** The four learning features every Physics chapter has. */
export const FEATURES: FeatureMeta[] = [
  { id: "flashcards", title: "Formula Flashcards", short: "Flashcards", icon: "cards", desc: "Tap a card to reveal the equation, what each symbol means and its SI unit." },
  { id: "practice", title: "Practice", short: "Practice", icon: "target", desc: "Conceptual questions and numerical problems, with hints, retries and step-by-step solutions." },
  { id: "equations", title: "Equation Identification", short: "Equations", icon: "sigma", desc: "Read a physical situation and pick the right equation. The options show equations only." },
  { id: "advanced", title: "Advanced Numericals", short: "Advanced", icon: "flame", desc: "Multi-step problems at CBSE Board, CBSE HOTS and JEE Main level." },
];

export const featureMeta = (id: PhysFeature): FeatureMeta => FEATURES.find((f) => f.id === id)!;
