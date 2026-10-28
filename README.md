# CS Quest — CBSE Class XII Computer Science practice

> ⚠️ **Beta version.** Found a bug? DM me on Instagram: **[@mr.mallu_gg](https://www.instagram.com/mr.mallu_gg/)**

All questions are now **multiple choice (MCQ)**. ✍️ Write-your-own-program questions are coming soon.

Next.js 14 + TypeScript + Tailwind CSS. No backend, no database, no storage: refreshing the page resets everything.
Syllabus: Binary Files, CSV Files, MySQL table questions, Python–SQL interface.

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
