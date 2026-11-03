"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const LAUNCH_AT = new Date("2026-11-04T02:30:00.000Z").getTime(); // 4 Nov 2026, 8:00 AM IST
const UNITS = [
  { label: "Days", seconds: 86400 },
  { label: "Hours", seconds: 3600 },
  { label: "Minutes", seconds: 60 },
  { label: "Seconds", seconds: 1 },
];

export default function PhysicsLaunchCountdown() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setRemaining(Math.max(0, Math.floor((LAUNCH_AT - Date.now()) / 1000)));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const launched = remaining === 0;

  return (
    <main className="physics-countdown-page mx-auto flex min-h-[calc(100vh-7rem)] max-w-4xl flex-col items-center justify-center px-5 py-12 text-center sm:min-h-[calc(100vh-9rem)]">
      <div className="physics-orbit" aria-hidden="true"><span>⚡</span></div>
      <p className="physics-eyebrow">A NEW QUEST IS APPROACHING</p>
      <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">Physics Quest</h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
        {launched ? "Physics Quest should now be available. Thanks for waiting while we fixed the coding errors." : "Get ready to explore Physics. We’re fixing a few coding errors and will be ready soon."}
      </p>

      <section className="physics-countdown-card card mt-9 w-full max-w-2xl p-5 sm:p-8" aria-label="Physics Quest launch countdown">
        <p className="physics-eyebrow">{launched ? "LAUNCH TIME" : "COUNTDOWN TO LAUNCH"}</p>
        <div className="mt-5 grid grid-cols-4 gap-2 sm:gap-4" aria-live="off">
          {UNITS.map(({ label, seconds }) => {
            const value = remaining === null ? "--" : String(Math.floor(remaining / seconds) % (label === "Days" ? Infinity : label === "Hours" ? 24 : 60)).padStart(2, "0");
            return (
              <div className="physics-countdown-unit" key={label}>
                <span className="physics-countdown-number mono">{value}</span>
                <span className="mt-2 block text-[10px] font-medium uppercase tracking-[.14em] text-slate-400 sm:text-xs">{label}</span>
              </div>
            );
          })}
        </div>
        <p className="mt-6 text-sm text-slate-400">4 November 2026 <span className="mx-1 text-slate-600">·</span> 8:00 AM IST</p>
      </section>

      <aside className="physics-temp-update mt-5 max-w-2xl text-left" aria-label="Temporary update">
        <span className="physics-update-dot" aria-hidden="true" />
        <div><strong className="text-slate-100">Temporary update</strong><p className="mt-1 text-sm leading-relaxed text-slate-400">Live coding was delayed while we fix a few errors. Physics Quest will be available by 8:00 AM IST on 4 November. The countdown updates automatically.</p></div>
      </aside>

      <Link href="/" className="btn-ghost mt-7">← Back to subjects</Link>
    </main>
  );
}
