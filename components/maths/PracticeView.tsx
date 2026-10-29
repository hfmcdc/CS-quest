"use client";

import { useRef, useState } from "react";
import { checkAnswer } from "@/lib/maths/checker";
import { nextQuestion, selfAssess, showHint, startSession, submit } from "@/lib/maths/session";
import type { Mode, Session } from "@/lib/maths/session";
import { KIND_LABEL, LEVEL_LABEL, topicMeta } from "@/lib/maths/topics";
import type { MathTopicId } from "@/lib/maths/types";
import { Rich } from "@/components/maths/MathText";

const PRAISE = ["Nicely done!", "Spot on!", "Great working!", "Exactly right!", "Well solved!", "That's it!"];

const KEYS: Record<string, string[]> = {
  numeric: ["π", "√(", "^", "/", "(", ")"],
  vector: ["i", "j", "k", "/", "√(", "(", ")", ","],
  tuple: [",", "/", "√(", "π", "(", ")"],
  expr: ["x", "π", "^", "/", "√(", "(", ")", "sin(", "cos(", "tan(", "ln|x|", "e^"],
  antiderivative: ["x", "^", "/", "√(", "(", ")", "ln|", "e^", "sin(", "cos(", "tan(", "tan^-1(", "sin^-1("],
};

export default function PracticeView({ topic, mode }: { topic: MathTopicId; mode: Mode }) {
  const meta = topicMeta(topic);
  const [s, setS] = useState<Session>(() => startSession(topic, mode));
  const [answer, setAnswer] = useState("");
  const [qn, setQn] = useState(0); // bumps per question so the card animates in
  const inputRef = useRef<HTMLInputElement>(null);

  const q = s.q;
  const spec = q.spec;
  const isMcq = spec.kind === "mcq";
  const finished = s.phase === "correct" || s.phase === "solved" || s.phase === "uncertain";
  const canSubmit = answer.trim() !== "";
  const box = "max-w-full overflow-x-auto rounded-xl border border-slate-700 bg-slate-950/70 p-3 text-sm leading-relaxed text-slate-200";

  const doSubmit = () => {
    if (finished || (!canSubmit && spec.kind !== "manual")) return;
    const result = checkAnswer(q, answer);
    const next = submit(s, result);
    setS(next);
    if (next.phase === "retry" && isMcq) setAnswer("");
  };

  const go = (from: Session) => { setS(nextQuestion(from)); setAnswer(""); setQn((n) => n + 1); };

  const insert = (text: string) => {
    const el = inputRef.current;
    if (!el) { setAnswer((a) => a + text); return; }
    const start = el.selectionStart ?? answer.length;
    const end = el.selectionEnd ?? answer.length;
    const value = answer.slice(0, start) + text + answer.slice(end);
    setAnswer(value);
    requestAnimationFrame(() => {
      el.focus();
      const pos = start + text.length;
      el.setSelectionRange(pos, pos);
    });
  };

  const level = mode === "challenge" ? "Challenge" : LEVEL_LABEL[s.diff - 1];
  const qLevel = LEVEL_LABEL[q.level - 1];
  const stars = "⭐".repeat(q.level);

  return (
    <div>
      <div className="mb-3 flex items-center justify-end text-sm" aria-live="polite">
        <span className="text-slate-400">Difficulty </span>
        <span className="mono ml-1 text-cyan-300" aria-label={`Current difficulty ${level}`}>
          {mode === "challenge" ? "🔥 Challenge" : `${"●".repeat(s.diff)}${"○".repeat(3 - s.diff)} ${level}`}
        </span>
      </div>

      <article key={qn} className={`a-rise relative min-w-0 max-w-full rounded-2xl border border-slate-700/80 bg-slate-900/70 p-4 shadow-[0_0_40px_-20px_#22d3ee] sm:p-6 ${s.phase === "retry" ? "a-shake" : ""}`}>
        <div className="mb-3 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-cyan-300">{meta.short} · {q.tag}</span>
          <span className="rounded-full bg-violet-400/10 px-3 py-1 text-violet-300">{KIND_LABEL[q.kind]}</span>
          <span className="rounded-full bg-slate-700/50 px-3 py-1 text-slate-300">{qLevel}</span>
        </div>
        {s.repeated && <p className="mb-3 rounded-lg bg-slate-800 p-2 text-xs text-slate-300">You have seen every fixed question here, so the set is starting again. More are on the way.</p>}

        <p id="q-text" className="mb-4 min-w-0 text-base font-medium leading-relaxed"><Rich text={q.text} /></p>

        {spec.kind === "mcq" ? (
          <fieldset disabled={finished} className="min-w-0 max-w-full space-y-2">
            <legend className="sr-only">Choose one answer</legend>
            {spec.options.map((o, i) => (
              <label key={o} className={`flex w-full min-w-0 max-w-full cursor-pointer items-start gap-3 rounded-xl border p-3 text-sm ${answer === String(i) ? "border-cyan-400 bg-cyan-400/10" : "border-slate-700"}`}>
                <input type="radio" name="opt" className="mt-1 shrink-0" checked={answer === String(i)} onChange={() => setAnswer(String(i))} />
                <span className="min-w-0 flex-1"><Rich text={o} /></span>
              </label>
            ))}
          </fieldset>
        ) : (
          <div className="min-w-0">
            <label htmlFor="ans" className="mb-1 block text-xs text-slate-400">
              {spec.kind === "manual" ? "Your working or answer (optional, for your own comparison)" : "Your answer"}
            </label>
            <input
              id="ans" ref={inputRef} type="text" value={answer} disabled={finished}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); doSubmit(); } }}
              autoComplete="off" autoCapitalize="off" autoCorrect="off" spellCheck={false}
              aria-describedby="ans-help"
              placeholder={spec.kind === "manual" ? "Type your answer, then submit to see the model answer" : "Type your answer"}
              className="mono w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:border-cyan-400 disabled:opacity-60"
            />
            <p id="ans-help" className="mt-1 text-xs text-slate-500">{q.input}</p>
            {!finished && KEYS[spec.kind] && (
              <div className="mt-2 flex flex-wrap gap-1.5" role="group" aria-label="Insert a symbol">
                {KEYS[spec.kind].map((k) => (
                  <button key={k} type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => insert(k)} className="mono rounded-lg border border-slate-700 px-2.5 py-1.5 text-xs text-slate-300 hover:border-cyan-400">
                    {k}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {!finished && (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button onClick={doSubmit} disabled={spec.kind !== "manual" && !canSubmit}
              className="rounded-xl bg-gradient-to-r from-cyan-400 to-violet-400 px-5 py-3 font-semibold text-slate-950 transition hover:brightness-110 disabled:opacity-40">
              {s.phase === "retry" ? "Submit retry" : spec.kind === "manual" ? "Show model answer" : "Submit Answer"}
            </button>
            {!s.hint && <button onClick={() => setS(showHint(s))} className="rounded-xl border border-slate-600 px-4 py-3 text-sm hover:border-cyan-400">Show hint</button>}
            <button onClick={() => go(s)} className="rounded-xl px-3 py-3 text-sm text-slate-400 underline hover:text-slate-200">Skip</button>
          </div>
        )}

        <div role="status" aria-live="polite" className="mt-4 space-y-3">
          {s.hint && !finished && (
            <p className="a-rise rounded-xl border border-amber-400/40 bg-amber-400/10 p-3 text-sm text-amber-200"><span aria-hidden="true">💡 </span>Hint: <Rich text={q.hint} /></p>
          )}
          {s.phase === "retry" && (
            <div className="a-rise rounded-xl border border-rose-400/40 bg-rose-400/10 p-3 text-sm text-rose-200">
              <p>Not quite. You have one retry. Use the hint and try again.</p>
              {s.retryNote && <p className="mt-1"><Rich text={s.retryNote} /></p>}
              {q.mistake && <p className="mt-1 text-rose-100"><Rich text={q.mistake} /></p>}
            </div>
          )}

          {finished && (
            <div key={s.fx} className="a-rise relative rounded-xl border border-slate-700 bg-slate-950/60 p-4 text-sm">
              {s.phase === "correct" && (
                <>
                  {[[-40, -50], [30, -60], [60, -20], [-60, -10], [10, -70], [80, -45]].map(([x, y], i) => (
                    <span key={i} className="spark" style={{ ["--x" as string]: `${x}px`, ["--y" as string]: `${y}px`, background: i % 2 ? "#a78bfa" : "#22d3ee" }} />
                  ))}
                  <p className="a-pop mb-1 text-lg font-semibold text-emerald-300">✅ Correct. {PRAISE[s.fx % PRAISE.length]}</p>
                  <p className="a-pop mb-2 text-sm" aria-label={`${q.level} star reward`}>{stars}</p>
                  {s.message && <p className="mb-2 text-xs text-emerald-200/80">{s.message}</p>}
                </>
              )}
              {s.phase === "solved" && (
                <>
                  <p className="mb-1 text-lg font-semibold text-rose-300">❌ Not this time</p>
                  <p className="mb-2 text-slate-400">That&apos;s fine. Study the working below, then try the next one.</p>
                  {s.retryNote && <p className="mb-2"><Rich text={s.retryNote} /></p>}
                  {q.mistake && <p className="mb-2 rounded-lg bg-rose-400/10 p-2 text-rose-100"><span className="font-semibold">Watch out: </span><Rich text={q.mistake} /></p>}
                </>
              )}
              {s.phase === "uncertain" && (
                <>
                  <p className="mb-1 text-lg font-semibold text-amber-300">🤔 Compare with the model answer</p>
                  <p className="mb-2 text-slate-400">{s.message || "I couldn't check this automatically, so it hasn't been marked right or wrong."}</p>
                </>
              )}

              <p className="mb-1 text-slate-400">Model answer</p>
              <div className={`${box} mb-3`}><Rich text={q.answer} /></div>

              {s.phase === "correct" ? (
                <details className="mb-1">
                  <summary className="cursor-pointer text-cyan-300">See the worked solution</summary>
                  <Steps steps={q.steps} />
                </details>
              ) : (
                <>
                  <p className="mb-1 text-slate-400">Worked solution</p>
                  <Steps steps={q.steps} />
                </>
              )}

              {s.phase === "uncertain" && !s.assessed && (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-slate-400">Did your answer match?</span>
                  <button onClick={() => setS(selfAssess(s, true))} className="rounded-lg border border-emerald-400/50 px-3 py-2 text-xs text-emerald-200 hover:bg-emerald-400/10">Yes, it matched</button>
                  <button onClick={() => setS(selfAssess(s, false))} className="rounded-lg border border-rose-400/50 px-3 py-2 text-xs text-rose-200 hover:bg-rose-400/10">No, it was different</button>
                </div>
              )}
              {s.change && <p className="mt-3 text-xs text-cyan-300">{s.change}</p>}
            </div>
          )}
        </div>

        {finished && (
          <button onClick={() => go(s)} className="mt-4 rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 hover:brightness-110">Next Question</button>
        )}
      </article>
      <p className="mt-4 text-center text-xs text-slate-500">Nothing is saved. Refreshing the page resets everything.</p>
    </div>
  );
}

function Steps({ steps }: { steps: string[] }) {
  return (
    <ol className="mt-2 space-y-2">
      {steps.map((st, i) => (
        <li key={i} className="flex min-w-0 gap-2 text-sm leading-relaxed">
          <span className="mono mt-0.5 shrink-0 text-xs text-cyan-300">{i + 1}.</span>
          <span className="min-w-0 flex-1"><Rich text={st} /></span>
        </li>
      ))}
    </ol>
  );
}
