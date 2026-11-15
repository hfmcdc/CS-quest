import type { ChapterContent } from "../types";
import { rel } from "./rel";
import { mat } from "./mat";
import { det } from "./det";
import { cont } from "./cont";
import { derivapps } from "./derivapps";
import { integrals } from "./intadv";
import { areaint } from "./areaint";
import { de } from "./de";
import { lpp } from "./lpp";
import { prob } from "./prob";

export const CHAPTERS: ChapterContent[] = [rel, mat, det, cont, derivapps, integrals, areaint, de, lpp, prob];
