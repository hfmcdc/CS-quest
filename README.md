# CS Quest — CBSE Class XII Computer Science & Maths practice

> ⚠️ **Beta version.** Found a bug? DM me on Instagram: **[@mr.mallu_gg](https://www.instagram.com/mr.mallu_gg/)**

All questions are now **multiple choice (MCQ)**. ✍️ Write-your-own-program questions are coming soon.

Next.js 14 + TypeScript + Tailwind CSS. No backend, no database, no storage: refreshing the page resets everything.
Syllabus: Binary Files, CSV Files, MySQL table questions, Python–SQL interface.

## Flashcards
A **Flashcards** option on the dashboard offers revision decks for **Theory** and **Commands** across all topics (`lib/flashcards.ts`). Flip a card, mark *Got it* / *Review again*, and re-study the missed ones. Add cards with the `ft/fc/st/sc/pt/pc` helpers.

## Maths Quest
A **Maths Quest** card on the dashboard opens Class XII Maths practice for the Second Mid-Term portions: Inverse Trigonometric Functions, Vector Algebra, Three-Dimensional Geometry, Applications of Derivatives (**maxima and minima only**) and Integrals (**up to Exercise 7.4**). Each topic has four modes: **Quick Revision**, **Learn with Examples**, **Practice** (adaptive) and **Challenge**.

- Code lives in `lib/maths/` and `components/maths/`; the Computer Science code is unchanged apart from the dashboard entry in `components/CSQuest.tsx`.
- Maths is shown with a small built-in renderer (`components/maths/MathText.tsx`), so **no new dependency** was added. Write maths in questions as `$inline$` or `$$display$$` LaTeX.
- Answers are checked by `lib/maths/checker.ts` using a safe expression parser (no `eval`): numbers, `pi`, `sqrt()`, vectors (`2i-3j+k`), direction ratios, and expressions in x. Equivalent forms are accepted and integrals are compared up to the constant `+C`. If an answer cannot be read or compared reliably it is **never marked wrong**: the model answer is shown for self-comparison.
- Adaptive practice (temporary, in memory only): correct → harder; wrong → hint and one retry; wrong again → worked solution and easier; unsure → model answer, difficulty unchanged. There is no score, streak or saved progress.
- Add a question in `lib/maths/questions.ts` (`ig(...)`, `vc(...)` etc.) with a model answer, steps and hint. **Verify the answer independently before adding it**, then run `npm run verify:maths`.
- `npm run verify:maths` runs the content, renderer, checker, generator and adaptive-flow self-checks (it fetches `tsx` with `npx`; nothing is added to `package.json` dependencies).
- Scope note: coverage follows standard NCERT/CBSE topics for these chapters. Questions are original practice questions, **not** copied from textbook exercises, and are not claimed to match specific exercise numbers.

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
