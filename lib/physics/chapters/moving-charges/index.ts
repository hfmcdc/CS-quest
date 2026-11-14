import type { PhysChapterContent } from "../../types";
import { cards } from "./cards";
import { concepts } from "./concepts";
import { equations } from "./equations";
import { practice, board, hots, jee } from "./numericals";

/** Chapter 4: Moving Charges and Magnetism. */
export const content: PhysChapterContent = { cards, concepts, numericals: practice, equations, advanced: { board, hots, jee } };
