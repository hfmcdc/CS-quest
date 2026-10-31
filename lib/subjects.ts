/** Single registry of subjects shown on the home screen. Add a subject here (plus its route) and it appears automatically. */
export interface SubjectMeta {
  id: string;
  href: string;
  glyph: string;
  title: string;
  note: string;
  cta: string;
  glyphClass: string;
  hoverClass: string;
}

export const SUBJECTS: SubjectMeta[] = [
  {
    id: "computer",
    href: "/computer",
    glyph: "</>",
    title: "Computer Science",
    note: "Binary files, CSV, MySQL and Python–SQL practice.",
    cta: "Start practice",
    glyphClass: "text-cyan-300",
    hoverClass: "hover:border-cyan-300/60",
  },
  {
    id: "maths",
    href: "/maths",
    glyph: "∑",
    title: "Maths",
    note: "Revision notes, worked examples, adaptive practice and challenges.",
    cta: "Start practice",
    glyphClass: "text-emerald-300",
    hoverClass: "hover:border-emerald-300/60",
  },
  {
    id: "chemistry",
    href: "/chemistry",
    glyph: "⚗",
    title: "Chemistry",
    note: "D- and F-Block Elements: revision notes and MCQ practice.",
    cta: "Start practice",
    glyphClass: "text-amber-300",
    hoverClass: "hover:border-amber-300/60",
  },
];

/** Top-level routes worth warming in the background, highest priority first. */
export const SUBJECT_ROUTES = SUBJECTS.map((s) => s.href);
