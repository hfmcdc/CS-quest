"use client";

import { useEffect, useState } from "react";

// 5:00 PM IST on 29 Oct 2026. Change this one line to move the launch time.
const LAUNCH = new Date("2026-10-29T17:00:00+05:30").getTime();
const IG_URL = "https://www.instagram.com/mr.mallu_gg/";

const GLYPHS = [
  { ch: "∑", cls: "left-3 top-2 text-7xl" },
  { ch: "π", cls: "right-4 top-16 text-6xl" },
  { ch: "∫", cls: "left-6 bottom-24 text-8xl" },
  { ch: "√", cls: "right-3 bottom-8 text-7xl" },
  { ch: "∞", cls: "left-1/2 top-1/3 text-5xl" },
];

function split(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
}
const two = (n: number) => String(n).padStart(2, "0");

function Unit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex min-w-[3.6rem] flex-col items-center rounded-xl border border-white/10 bg-black/40 px-2 py-2.5">
      <span className="mono text-3xl font-bold tabular-nums text-cyan-300">{value}</span>
      <span className="mt-0.5 text-xs text-slate-400">{label}</span>
    </div>
  );
}

export default function MathsComingSoon() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const left = now === null ? null : LAUNCH - now;
  const live = left !== null && left <= 0;
  const t = split(left ?? 0);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 px-5 py-10">
      <section
        aria-label="Maths Quest launch poster"
        className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-violet-400/30 bg-gradient-to-b from-[#12162a] to-[#0a0d18] p-6 text-center shadow-2xl shadow-violet-500/10"
      >
        {GLYPHS.map((g) => (
          <span key={g.ch} aria-hidden="true" className={`mono pointer-events-none absolute select-none font-bold text-white/[0.05] ${g.cls}`}>
            {g.ch}
          </span>
        ))}

        <div className="relative flex flex-col items-center gap-4 py-4">
          <span className="rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-sm font-semibold text-amber-200">
            Coming soon
          </span>

          <h1 className="mono text-5xl font-bold tracking-tight text-cyan-300">Maths Quest</h1>
          <p className="max-w-[16rem] text-slate-300">CBSE Class XII Maths practice, built like CS Quest.</p>

          {live ? (
            <p role="status" className="a-pop rounded-xl border border-emerald-400/40 bg-emerald-400/10 px-4 py-3 font-semibold text-emerald-200">
              Maths Quest is live. Refresh the page to start.
            </p>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div
                role="timer"
                aria-label={left === null ? "Countdown loading" : `${t.d} days ${t.h} hours ${t.m} minutes left`}
                className="flex items-start justify-center gap-2"
              >
                {t.d > 0 && <Unit value={two(t.d)} label="days" />}
                <Unit value={left === null ? "--" : two(t.h)} label="hours" />
                <Unit value={left === null ? "--" : two(t.m)} label="minutes" />
                <Unit value={left === null ? "--" : two(t.s)} label="seconds" />
              </div>
              <p className="text-sm text-slate-400">Launching 29 Oct at 5:00 PM IST</p>
            </div>
          )}
        </div>
      </section>

      <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-cyan-300">
        Follow @mr.mallu_gg for the launch
      </a>
    </main>
  );
}
