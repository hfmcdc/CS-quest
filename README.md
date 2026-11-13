# CS Quest — CBSE Class XII Computer Science practice

> ⚠️ **Beta version.** Found a bug? DM me on Instagram: **[@mr.mallu_gg](https://www.instagram.com/mr.mallu_gg/)**

All questions are now **multiple choice (MCQ)**. ✍️ Write-your-own-program questions are coming soon.

Next.js 14 + TypeScript + Tailwind CSS. No backend, no database, no storage: refreshing the page resets everything.
Syllabus: Binary Files, CSV Files, MySQL table questions, Python–SQL interface. **Viva** and **Practical** sections are coming soon. The site is Computer Science only for now.

## Flashcards
A **Flashcards** option on the dashboard offers revision decks for **Theory** and **Commands** across all topics (`lib/flashcards.ts`). Flip a card, mark *Got it* / *Review again*, and re-study the missed ones. Add cards with the `ft/fc/st/sc/pt/pc` helpers.

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

## Design system and performance
- **Look:** premium dark theme. Tokens and shared classes (`.card`, `.btn-primary`, `.btn-ghost`, `.chip`, `.tile`, `.stagger`, `.page-enter`) live in `app/globals.css`; the `slate` palette is remapped in `tailwind.config.ts`, so the whole app re-skins from one place. The accent is set by `theme-cs` (an RGB triplet in `--ac`). Shared pieces: `components/ui.tsx`, `Icon.tsx`, `AppNav.tsx`.
- **Navigation:** a persistent top bar (logo and sound toggle) in the root layout. `app/template.tsx` adds the route transition.
- **Splash:** shown on every full page load (open and refresh), never during in-app navigation (`components/FirstVisitSplash.tsx`). It runs about 4.5 s and waits for `window.load` before fading out. Halloween adds cobwebs and spiders until the date in `lib/seasonal.ts`.
- **Caching:** `components/AppPrefetcher.tsx` registers the service worker. `public/sw.js` (production only) caches hashed assets, pre-caches the main pages and serves cached pages when the network is slow. In-app screen state is kept by `lib/navState.ts`.
- **Motion:** all animation is CSS and respects `prefers-reduced-motion`.
