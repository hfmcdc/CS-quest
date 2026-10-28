"use client";

import { useEffect, useState } from "react";
import { BANK, MODE_LABEL, TOPICS } from "@/lib/questions";
import { evaluate } from "@/lib/checker";
import type { Outcome, Question, Topic } from "@/lib/types";
import Flashcards from "@/components/Flashcards";

const IG_URL = "https://www.instagram.com/mr.mallu_gg/";

function Instagram() {
  return (
    <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-300">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
      @mr.mallu_gg
    </a>
  );
}

function BetaBanner() {
  return (
    <div role="note" className="border-b border-amber-400/30 bg-amber-400/10 px-4 py-2 text-center text-xs text-amber-200 sm:text-sm">
      ⚠️ <b>Beta version</b> – found a bug? DM me on Instagram{" "}
      <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="font-semibold underline hover:text-amber-100">@mr.mallu_gg</a>
    </div>
  );
}

function ComingSoon() {
  return <p className="text-center text-xs text-slate-500">✍️ Write-your-own-program questions coming soon!</p>;
}

function Loader({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1800);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="mono text-5xl font-bold tracking-tight text-cyan-300 sm:text-6xl">CS Quest</h1>
      <p className="text-slate-400" role="status">Loading your Class XII practice arena…</p>
      <div className="h-1.5 w-56 overflow-hidden rounded-full bg-slate-800"><div className="bar h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-400" /></div>
      <div className="flex flex-col items-center gap-3">
        <button onClick={onDone} className="text-sm text-slate-500 underline hover:text-slate-300">Skip</button>
        <Instagram />
      </div>
    </main>
  );
}

function pick(topic: Topic, diff: number, seen: string[]) {
  const pool = BANK.filter((q) => q.topic === topic);
  const fresh = pool.filter((q) => !seen.includes(q.id));
  const base = fresh.length ? fresh : pool;
  const d = Math.min(...base.map((q) => Math.abs(q.level - diff)));
  const near = base.filter((q) => Math.abs(q.level - diff) === d);
  const base0 = near[Math.floor(Math.random() * near.length)];
  const q: Question = { ...base0, options: [...base0.options].sort(() => Math.random() - 0.5) };
  return { q, seen: fresh.length ? [...seen, q.id] : [q.id], restarted: !fresh.length && seen.length > 0 };
}

const LEVELS = ["Easy", "Medium", "Hard"];
function modeLabel(q: Question) {
  if (q.topic === "sql") {
    if (q.mode === "complete") return "Complete the SQL command";
    if (q.mode === "predict") return "Predict the query output";
    if (q.mode === "debug") return "Debug an incorrect query";
  }
  return MODE_LABEL[q.mode];
}

function Practice({ topic, onExit }: { topic: Topic; onExit: () => void }) {
  const meta = TOPICS.find((t) => t.id === topic)!;
  const [q, setQ] = useState<Question | null>(null);
  const [seen, setSeen] = useState<string[]>([]);
  const [diff, setDiff] = useState(1);
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState<"ask" | "retry" | "done">("ask");
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [hint, setHint] = useState(false);
  const [change, setChange] = useState("");
  const [fx, setFx] = useState(0);
  const [restarted, setRestarted] = useState(false);

  const load = (d: number, s: string[]) => {
    const r = pick(topic, d, s);
    setQ(r.q); setSeen(r.seen); setRestarted(r.restarted);
    setInput(""); setPhase("ask"); setOutcome(null); setHint(false); setChange("");
  };
  useEffect(() => { load(1, []); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, []);

  if (!q) return <p className="p-8 text-center text-slate-400" role="status">Loading question…</p>;
  if (BANK.filter((x) => x.topic === topic).length === 0) return <p className="p-8 text-center">No questions available for this topic.</p>;

  const move = (n: number) => {
    const nd = Math.min(3, Math.max(1, diff + n));
    setDiff(nd);
    setChange(n > 0 ? (nd === diff ? "Already at the hardest level." : "Next question will be harder.") : nd === diff ? "Already at the easiest level." : "Next question will be easier.");
  };

  const submit = () => {
    const r = evaluate(q, input);
    setFx((n) => n + 1);
    if (r === "correct") { setOutcome(r); setPhase("done"); move(1); }
    else if (phase === "ask") { setPhase("retry"); setHint(true); }
    else { setOutcome("incorrect"); setPhase("done"); move(-1); }
  };

  const done = phase === "done";
  const canSubmit = input !== "";
  const box = "mono overflow-x-auto whitespace-pre rounded-xl border border-slate-700 bg-slate-950/70 p-3 text-[13px] leading-relaxed text-slate-200";

  return (
    <main className="mx-auto max-w-3xl px-4 py-6">
      <div className="mb-4 flex items-center justify-between gap-2">
        <button onClick={onExit} className="rounded-lg border border-slate-700 px-3 py-2 text-sm hover:border-cyan-400">← Dashboard</button>
        <div className="text-right text-sm" aria-label={`Current difficulty ${LEVELS[diff - 1]}`}>
          <span className="text-slate-400">Difficulty </span>
          <span className="mono text-cyan-300">{"●".repeat(diff)}{"○".repeat(3 - diff)} {LEVELS[diff - 1]}</span>
        </div>
      </div>

      <article key={q.id} className={`a-rise relative rounded-2xl border border-slate-700/80 bg-slate-900/70 p-4 shadow-[0_0_40px_-20px_#22d3ee] sm:p-6 ${phase === "retry" ? "a-shake" : ""}`}>
        <div className="mb-3 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-cyan-300">{meta.title} · {q.tag}</span>
          <span className="rounded-full bg-violet-400/10 px-3 py-1 text-violet-300">{modeLabel(q)}</span>
          <span className="rounded-full bg-slate-700/50 px-3 py-1 text-slate-300">{LEVELS[q.level - 1]}</span>
        </div>
        {restarted && <p className="mb-3 rounded-lg bg-slate-800 p-2 text-xs text-slate-300">You have seen every question in this topic, so the bank is repeating. More questions are on the way.</p>}
        <p className="mb-3 text-base font-medium leading-relaxed">{q.text}</p>
        {q.table && <pre className={`${box} mb-3`} aria-label="Sample table">{q.table}</pre>}
        {q.show && <pre className={`${box} mb-3`} aria-label="Code">{q.show}</pre>}

        <fieldset disabled={done} className="space-y-2">
          <legend className="sr-only">Choose one answer</legend>
          {q.options.map((o) => (
            <label key={o} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 text-sm ${input === o ? "border-cyan-400 bg-cyan-400/10" : "border-slate-700"}`}>
              <input type="radio" name="opt" className="mt-1 shrink-0" checked={input === o} onChange={() => setInput(o)} />
              <span className={q.code ? "mono min-w-0 overflow-x-auto whitespace-pre text-[13px] leading-relaxed" : ""}>{o}</span>
            </label>
          ))}
        </fieldset>

        {!done && (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button onClick={submit} disabled={!canSubmit} className="rounded-xl bg-gradient-to-r from-cyan-400 to-violet-400 px-5 py-3 font-semibold text-slate-950 transition hover:brightness-110 disabled:opacity-40">
              {phase === "retry" ? "Submit retry" : "Submit Answer"}
            </button>
            {!hint && <button onClick={() => setHint(true)} className="rounded-xl border border-slate-600 px-4 py-3 text-sm hover:border-cyan-400">Show hint</button>}
          </div>
        )}

        <div role="status" aria-live="polite" className="mt-4 space-y-3">
          {hint && !done && <p className="a-rise rounded-xl border border-amber-400/40 bg-amber-400/10 p-3 text-sm text-amber-200">💡 Hint: {q.hint}</p>}
          {phase === "retry" && <p className="a-rise rounded-xl border border-rose-400/40 bg-rose-400/10 p-3 text-sm text-rose-200">Not quite. You have one retry. Choose again and resubmit.</p>}

          {done && outcome && (
            <div key={fx} className="a-rise relative rounded-xl border border-slate-700 bg-slate-950/60 p-4 text-sm">
              {outcome === "correct" && (
                <>
                  {[[-40, -50], [30, -60], [60, -20], [-60, -10], [10, -70], [80, -45]].map(([x, y], i) => (
                    <span key={i} className="spark" style={{ ["--x" as string]: `${x}px`, ["--y" as string]: `${y}px`, background: i % 2 ? "#a78bfa" : "#22d3ee" }} />
                  ))}
                  <p className="a-pop mb-2 text-lg font-semibold text-emerald-300">✅ Correct</p>
                                  </>
              )}
              {outcome === "incorrect" && <p className="mb-2 text-lg font-semibold text-rose-300">❌ Not this time</p>}
              <p className="mb-1 text-slate-400">Correct option</p>
              <pre className={`${box} mb-3 whitespace-pre-wrap`}>{q.answer}</pre>
              {q.result && <><p className="mb-1 text-slate-400">Expected result</p><pre className={`${box} mb-3`}>{q.result}</pre></>}
              <p className="mb-1 text-slate-400">Explanation</p>
              <p className="mb-3 leading-relaxed">{q.why}</p>
              <p className="text-xs text-cyan-300">{change}</p>
            </div>
          )}
        </div>

        {done && (
          <button onClick={() => load(diff, seen)} className="mt-4 rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 hover:brightness-110">Next Question</button>
        )}
      </article>
      <div className="mt-4 space-y-1 text-center text-xs text-slate-500">
        <p>All questions are multiple choice. Nothing is saved.</p>
        <ComingSoon />
      </div>
    </main>
  );
}

export default function CSQuest() {
  const [screen, setScreen] = useState<"loading" | "home" | "flash" | Topic>("loading");
  if (screen === "loading") return <><BetaBanner /><Loader onDone={() => setScreen("home")} /></>;
  if (screen === "flash") return <><BetaBanner /><Flashcards onExit={() => setScreen("home")} /></>;
  if (screen !== "home") return <><BetaBanner /><Practice key={screen} topic={screen} onExit={() => setScreen("home")} /></>;
  return (
    <>
    <BetaBanner />
    <main className="mx-auto max-w-5xl px-4 py-10">
      <header className="mb-8">
        <h1 className="mono text-3xl font-bold text-cyan-300 sm:text-4xl">CS Quest</h1>
        <p className="mt-2 max-w-xl text-slate-400">Practice for the CBSE Class XII Second Mid-Term Computer Science exam with MCQs. Pick an area and start.</p>
      </header>
      <section className="grid gap-4 md:grid-cols-3" aria-label="Practice areas">
        {TOPICS.map((t) => (
          <button key={t.id} onClick={() => setScreen(t.id)} className="group rounded-2xl border border-slate-700/80 bg-gradient-to-b from-slate-900 to-slate-900/40 p-5 text-left transition hover:-translate-y-1 hover:border-cyan-400 hover:shadow-[0_0_40px_-15px_#22d3ee]">
            <div className="mb-3 text-3xl" aria-hidden="true">{t.icon}</div>
            <h2 className="text-lg font-semibold">{t.title}</h2>
            <p className="mono mb-2 text-xs text-violet-300">{t.sub}</p>
            <p className="mb-4 text-sm text-slate-400">{t.desc}</p>
            <span className="text-sm font-semibold text-cyan-300">Start practice</span>
          </button>
        ))}
      </section>
      <section className="mt-4" aria-label="Flashcards">
        <button onClick={() => setScreen("flash")} className="group flex w-full items-center gap-4 rounded-2xl border border-slate-700/80 bg-gradient-to-r from-violet-500/10 to-cyan-500/10 p-5 text-left transition hover:-translate-y-1 hover:border-violet-400 hover:shadow-[0_0_40px_-15px_#a78bfa]">
          <span className="text-3xl" aria-hidden="true">🃏</span>
          <span className="flex-1">
            <span className="block text-lg font-semibold">Flashcards</span>
            <span className="block text-sm text-slate-400">Quick revision of <b className="text-slate-200">theory</b> and <b className="text-slate-200">commands</b> for all three topics.</span>
          </span>
          <span className="text-sm font-semibold text-violet-300">Revise</span>
        </button>
      </section>
      <footer className="mt-12 flex flex-col items-center gap-3"><ComingSoon /><Instagram /></footer>
    </main>
    </>
  );
}
