export type ChemLevel = 1 | 2 | 3;

export interface ChemQuestion {
  id: string;
  tag: string;
  level: ChemLevel;
  text: string;
  options: string[];
  answer: string; // equals one entry of options
  why: string;
  hint: string;
}

export interface ChemItem {
  label?: string;
  body: string;
}

export type ChemSection =
  | { kind: "concepts" | "reactions" | "mistakes"; title: string; items: ChemItem[] }
  | { kind: "table"; title: string; head: string[]; rows: string[][]; note?: string };

/** Heavy content (notes + question bank) lives in its own module and is loaded on demand. */
export interface ChemChapterContent {
  sections: ChemSection[];
  questions: ChemQuestion[];
}

/** Light metadata: safe to import anywhere (home screen, routing, prefetching). */
export interface ChemChapterMeta {
  slug: string;
  number: number;
  title: string;
  short: string;
  icon: string;
  desc: string;
  topics: string[];
  load: () => Promise<ChemChapterContent>;
}
