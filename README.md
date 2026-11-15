# CS Quest — CBSE Class XII Computer Science & Maths practice

> ⚠️ **Beta version.** Found a bug? DM me on Instagram: **[@mr.mallu_gg](https://www.instagram.com/mr.mallu_gg/)**

All questions are now **multiple choice (MCQ)**. ✍️ Write-your-own-program questions are coming soon.

Next.js 14 + TypeScript + Tailwind CSS. No backend, no database, no storage: refreshing the page resets everything.
Syllabus: Binary Files, CSV Files, MySQL table questions, Python–SQL interface.

## Flashcards
A **Flashcards** option on the dashboard offers revision decks for **Theory** and **Commands** across all topics (`lib/flashcards.ts`). Flip a card, mark *Got it* / *Review again*, and re-study the missed ones. Add cards with the `ft/fc/st/sc/pt/pc` helpers.

## Maths Quest
Choose **Maths** from the home page to open the **full CBSE Class XII syllabus** in NCERT order, as 14 parts: Relations and Functions · Inverse Trigonometric Functions · Matrices · Determinants · Continuity and Differentiability · Applications of Derivatives (Rate of Change, Monotonicity) · Applications of Derivatives (Maxima and Minima) · Integrals · Applications of Integrals · Differential Equations · Vector Algebra · Three-Dimensional Geometry · Linear Programming · Probability.

Each part has four modes: **Quick Revision**, **Learn with Examples**, **Practice** (adaptive) and **Challenge**, plus **Maths Flashcards** (formulas, conditions and principal values). Computer Science is at `/computer`; Maths is at `/maths`.

- Code lives in `lib/maths/` and `components/maths/`; the subject picker is in `components/SubjectPicker.tsx`.
- **Chapter files:** the original five chapters live in `questions.ts`, `revision.ts`, `examples.ts` and `flashcards.ts`. The eleven added chapters are self-contained in `lib/maths/chapters/<id>.ts` (practice + challenge questions, revision notes, worked examples and flashcards) and are merged in by `lib/maths/chapters/index.ts`. To add a chapter: add its id to `MathTopicId` in `types.ts`, an entry in `topics.ts`, a chapter file, and register it in `chapters/index.ts`. Shared builders (`mk`, `mcq`, `num`, `expr`, `anti`, `tup`, `vec`, `cardMk`, `HELP`) are in `lib/maths/qhelpers.ts`.
- Maths is shown with a small built-in renderer (`components/maths/MathText.tsx`), so **no new dependency** was added. Write maths as `$inline$` or `$$display$$` LaTeX. Besides fractions, roots, vectors and integrals it supports `pmatrix`/`bmatrix`/`vmatrix`/`cases`/`array` environments (with `&`, `\\` and `\hline`), `\binom`, set notation (`\mathbb{R}`, `\cup`, `\subset` ...), `\pmod` and `\comp` (function composition circle; `\circ` stays the degree sign).
- Answers are checked by `lib/maths/checker.ts` using a safe expression parser (no `eval`): numbers, `pi`, `sqrt()`, vectors (`2i-3j+k`), direction ratios, matrix entries typed row by row, and expressions in x (derivatives, solutions of differential equations). Equivalent forms are accepted and integrals are compared up to the constant `+C`. If an answer cannot be read or compared reliably it is **never marked wrong**: the model answer is shown for self-comparison.
- Adaptive practice (temporary, in memory only): correct → harder; wrong → hint and one retry; wrong again → worked solution and easier; unsure → model answer, difficulty unchanged. There is no score, streak or saved progress.
- **Verify the answer independently before adding a question**, then run `npm run verify:maths`. It runs two scripts: `scripts/verify-maths.ts` (content structure, renderer, checker, generators, adaptive flow, flashcards) and `scripts/verify-maths-chapters.ts`, which **recomputes every answer key of the eleven added chapters independently** (brute-force enumeration for relations/matrices/probability, numerical differentiation and Simpson integration for calculus, vertex enumeration with a grid cross-check for linear programming, residual checks for differential-equation solutions). Add an oracle there for each new question. Both fetch `tsx` with `npx`; nothing is added to `package.json` dependencies.
- Scope note: coverage follows standard NCERT/CBSE topics. Questions are original practice questions, **not** copied from textbook exercises, and are not claimed to match specific exercise numbers.

## Prerequisites
Node.js 18.18+ (or 20+), npm, Git, a GitHub account and a Vercel account.

## Run locally
```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck    # TypeScript check
npm run build        # production build
npm start            # serve the production build
```

## Deploy on Vercel
```bash
git init && git add . && git commit -m "CS Quest"
git branch -M main
git remote add origin https://github.com/<you>/cs-quest.git   # create the empty repo on GitHub first
git push -u origin main
```
Then on vercel.com: **Add New → Project → Import** the repo → framework is detected as Next.js → keep defaults (no environment variables) → **Deploy**.

## How answers are checked
- Every question is MCQ, so the answer is an exact match against the answer key. Nothing is executed.
- The bank is small (29 questions) and does not cover every possible exam question. Add questions in `lib/questions.ts` using the `f(...)` / `s(...)` / `p(...)` helpers: give 4 options and the index (0-3) of the correct one.

## Chemistry
**Chemistry** is a third subject (`/chemistry`). Chapter 1, **D- and F-Block Elements**, has four modes: Quick Revision, Flashcards (46 cards), Practice (45 adaptive MCQs) and Challenge (20 conceptual and assertion–reason questions).
- Chapters are registered in `lib/chemistry/chapters.ts`; each chapter's content (notes, cards, questions) lives in `lib/chemistry/chapters/<slug>.ts` and is loaded on demand.
- Chemical formulas use Unicode subscripts/superscripts, so no renderer is needed.

## Design system and performance
- **Look:** premium dark theme. Tokens and shared classes (`.card`, `.btn-primary`, `.btn-ghost`, `.chip`, `.tile`, `.stagger`, `.page-enter`) live in `app/globals.css`; the `slate` palette is remapped in `tailwind.config.ts`, so the whole app re-skins from one place. Each subject sets an accent with `theme-cs`, `theme-maths` or `theme-chem` (an RGB triplet in `--ac`). Shared pieces: `components/ui.tsx`, `Icon.tsx`, `ModeTabs.tsx`, `Collapsible.tsx`, `AppNav.tsx`.
- **Navigation:** a persistent top bar (desktop) and tab bar (phones) in the root layout, so switching subject never remounts the chrome. `app/template.tsx` adds the route transition.
- **Splash:** shown on every full page load (open and refresh), never during in-app navigation (`components/FirstVisitSplash.tsx`). It runs about 4.5 s and waits for `window.load` before fading out. Halloween adds cobwebs and spiders until the date in `lib/seasonal.ts`.
- **Caching:** `components/AppPrefetcher.tsx` warms subject routes in the background (skipped on data-saver/2G), prefetches on hover or touch, and loads Chemistry chapter content on demand. `public/sw.js` (production only) caches hashed assets, pre-caches the main pages and serves cached pages when the network is slow. In-app screen state is kept by `lib/navState.ts`.
- **Motion:** all animation is CSS and respects `prefers-reduced-motion`.
- **Adding a Chemistry chapter:** create `lib/chemistry/chapters/<slug>.ts` and register it in `lib/chemistry/chapters.ts`.


## Physics

Physics lives in its own modules and does not touch the other subjects.

- `lib/physics/chapters.ts` is the chapter registry. Routes, the chapter list, static generation and prefetching all read from it.
- `lib/physics/chapters/<slug>/` holds one chapter's question bank (`cards.ts`, `concepts.ts`, `equations.ts`, `numericals.ts`).
- `lib/physics/checker.ts` checks typed equations (any equivalent rearrangement is accepted) and numeric answers with units.
- `components/physics/` has the screens. Routes are `/physics`, `/physics/<chapter>` and `/physics/<chapter>/<feature>`.

**Adding a chapter:** create `lib/physics/chapters/<slug>/index.ts` exporting `content`, then add one entry to `PHYS_CHAPTERS`. Nothing else needs to change.

**Checking the question bank:** `npm run verify:physics` re-solves every numerical answer from its accepted equation, tests the checker with correct and deliberately wrong inputs, and checks that every TeX command is supported by the renderer. Run it after editing any question.
