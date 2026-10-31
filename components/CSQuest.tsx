"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { readNav, writeNav } from "@/lib/navState";
import { BANK, MODE_LABEL, TOPICS } from "@/lib/questions";
import { evaluate } from "@/lib/checker";
import type { Outcome, Question, Topic } from "@/lib/types";
import Flashcards from "@/components/Flashcards";
import Icon from "@/components/Icon";
import { BackLink, DifficultyMeter, PageHeader } from "@/components/ui";

const IG_URL = "https://www.instagram.com/mr.mallu_gg/";

function Instagram() {
  return (
    <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-cyan-300">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
      @mr.mallu_gg
    </a>
  );
}

function BetaBanner() {
  return (
    <div role="note" className="px-4 py-2 text-center text-xs text-slate-500">
      Beta · found a bug? DM{" "}
      <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="text-slate-300 underline decoration-white/20 underline-offset-2 hover:text-white">@mr.mallu_gg</a>
    </div>
  );
}

function ComingSoon() {
  return <p className="text-center text-xs text-slate-500">Write-your-own-program questions are coming soon.</p>;
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

  if (!q) return <div className="theme-cs flex justify-center p-12" role="status" aria-label="Loading question"><span className="h-6 w-6 animate-spin rounded-full border-2 border-white/10 border-t-cyan-300" /></div>;
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
  const box = "mono max-w-full overflow-x-auto whitespace-pre rounded-xl border border-white/10 bg-black/30 p-3 text-[13px] leading-relaxed text-slate-200";

  return (
    <main className="theme-cs mx-auto max-w-3xl px-4 py-6">
      <div className="mb-5 flex items-center justify-between gap-2">
        <BackLink onClick={onExit}>Computer Science</BackLink>
        <DifficultyMeter level={diff} />
      </div>

      <article key={q.id} className={`card a-rise max-w-full p-5 sm:p-7 ${phase === "retry" ? "a-shake" : ""}`}>
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="chip chip-ac">{meta.title} · {q.tag}</span>
          <span className="chip">{modeLabel(q)}</span>
          <span className="chip">{LEVELS[q.level - 1]}</span>
        </div>
        {restarted && <p className="mb-3 rounded-xl bg-white/5 p-3 text-xs text-slate-300">You have seen every question in this topic, so the bank is repeating. More questions are on the way.</p>}
        <p className="mb-4 text-lg font-medium leading-relaxed text-white">{q.text}</p>
        {q.table && <pre className={`${box} mb-3`} aria-label="Sample table">{q.table}</pre>}
        {q.show && <pre className={`${box} mb-3`} aria-label="Code">{q.show}</pre>}

        <fieldset disabled={done} className="min-w-0 max-w-full space-y-2.5">
          <legend className="sr-only">Choose one answer</legend>
          {q.options.map((o) => (
            <label key={o} className={`flex w-full min-w-0 max-w-full cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-sm ${done && o === q.answer ? "opt-correct" : done && input === o ? "opt-wrong" : ""}`}>
              <input type="radio" name="opt" className="mt-1 shrink-0" checked={input === o} onChange={() => setInput(o)} />
              <span className={q.code ? "mono min-w-0 flex-1 overflow-x-auto whitespace-pre text-[12px] leading-relaxed sm:text-[13px]" : "min-w-0 flex-1 break-words"}>{o}</span>
            </label>
          ))}
        </fieldset>

        {!done && (
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button onClick={submit} disabled={!canSubmit} className="btn-primary">
              {phase === "retry" ? "Submit retry" : "Submit Answer"}
            </button>
            {!hint && <button onClick={() => setHint(true)} className="btn-ghost min-h-[2.9rem]"><Icon name="bulb" size={16} />Show hint</button>}
          </div>
        )}

        <div role="status" aria-live="polite" className="mt-4 space-y-3">
          {hint && !done && <p className="a-rise flex gap-2 rounded-xl border border-amber-300/30 bg-amber-300/10 p-3.5 text-sm text-amber-100"><Icon name="bulb" size={18} className="mt-0.5 text-amber-300" /><span>{q.hint}</span></p>}
          {phase === "retry" && <p className="a-rise rounded-xl border border-rose-400/30 bg-rose-400/10 p-3.5 text-sm text-rose-200">Not quite. You have one retry. Choose again and resubmit.</p>}

          {done && outcome && (
            <div key={fx} className="a-rise relative rounded-xl border border-white/10 bg-black/25 p-4 text-sm">
              {outcome === "correct" && (
                <>
                  {[[-40, -50], [30, -60], [60, -20], [-60, -10], [10, -70], [80, -45]].map(([x, y], i) => (
                    <span key={i} className="spark" style={{ ["--x" as string]: `${x}px`, ["--y" as string]: `${y}px`, background: i % 2 ? "#a78bfa" : "#22d3ee" }} />
                  ))}
                  <p className="a-pop mb-3 flex items-center gap-2 text-lg font-semibold text-emerald-300"><Icon name="check" size={22} />Correct</p>
                                  </>
              )}
              {outcome === "incorrect" && <p className="mb-3 text-lg font-semibold text-rose-300">Not this time</p>}
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
          <button onClick={() => load(diff, seen)} className="btn-primary mt-5">Next question<Icon name="forward" size={18} /></button>
        )}
      </article>
      <div className="mt-6 space-y-1 text-center text-xs text-slate-500">
        <p>All questions are multiple choice. Nothing is saved.</p>
        <ComingSoon />
      </div>
    </main>
  );
}

export default function CSQuest() {
  const [screen, setScreen] = useState<"home" | "flash" | Topic>(() => readNav<"home" | "flash" | Topic>("cs:screen", "home"));
  useEffect(() => { writeNav("cs:screen", screen); }, [screen]);
  if (screen === "flash") return <><BetaBanner /><Flashcards onExit={() => setScreen("home")} /></>;
  if (screen !== "home") return <><BetaBanner /><Practice key={screen} topic={screen} onExit={() => setScreen("home")} /></>;
  return (
    <>
    <BetaBanner />
    <main className="theme-cs mx-auto max-w-5xl px-4 py-10 sm:py-14">
      <PageHeader title="Computer Science" icon={<Icon name="code" size={24} />}>Second Mid-Term practice for CBSE Class XII. Pick an area and start.</PageHeader>
      <section className="stagger grid gap-4 md:grid-cols-3" aria-label="Practice areas">
        {TOPICS.map((t) => (
          <button key={t.id} onClick={() => setScreen(t.id)} className="card card-link group gap-1 p-6 text-left">
            <span className="tile mb-3 text-2xl" aria-hidden="true">{t.icon}</span>
            <h2 className="text-lg font-semibold text-white">{t.title}</h2>
            <p className="mb-2 text-xs text-slate-500">{t.sub}</p>
            <p className="mb-5 text-sm leading-relaxed text-slate-400">{t.desc}</p>
            <span className="mt-auto flex items-center gap-2 text-sm font-medium text-[rgb(var(--ac))]">Start practice<Icon name="forward" size={16} /></span>
          </button>
        ))}
      </section>
      <section className="a-rise mt-4" style={{ animationDelay: ".3s" }} aria-label="Flashcards">
        <button onClick={() => setScreen("flash")} className="card card-link w-full flex-row items-center gap-4 p-5 text-left">
          <span className="tile"><Icon name="cards" size={22} /></span>
          <span className="flex-1">
            <span className="block text-lg font-semibold text-white">Flashcards</span>
            <span className="block text-sm text-slate-400">Quick revision of theory and commands for all three topics.</span>
          </span>
          <Icon name="forward" size={18} className="text-slate-500" />
        </button>
      </section>
      <footer className="mt-14 flex flex-col items-center gap-3"><ComingSoon /><Link href="/" className="text-sm text-slate-400 underline decoration-white/20 underline-offset-2 hover:text-cyan-300">Switch subject</Link><Instagram /></footer>
    </main>
    </>
  );
}
