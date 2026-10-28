# CS Quest — CBSE Class XII Computer Science practice

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

## Answer checker limitations
- Nothing is executed: no Python interpreter, no MySQL. Answers are compared with curated keys and required-pattern rules.
- SQL: case, whitespace, a trailing `;` and quote style are ignored. Other equivalent queries may be marked "Needs manual checking".
- Output and fill-in questions are strict. Debug / write questions are "Correct" only when required elements are present, and "Needs manual checking" otherwise (difficulty is then unchanged). Pattern matches are evidence, not proof, so a correct-looking answer with a hidden logic error can pass.
- The bank is small (28 questions) and does not cover every possible exam question. Add questions in `lib/questions.ts`.
