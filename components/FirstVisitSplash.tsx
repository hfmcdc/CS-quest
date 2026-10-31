"use client";

import { useEffect, useRef, useState } from "react";

/** localStorage key; also read by the inline script in app/layout.tsx that decides whether the splash shows. */
export const SPLASH_KEY = "qmc_splash_seen_v1";
const DURATION = 4500;
const DURATION_REDUCED = 1800;
const EXIT_MS = 600;

const WORD = "Quest MC".split("");

/**
 * Full-screen first-visit loader. The markup is always server-rendered but hidden by CSS;
 * the tiny inline script in <head> sets html[data-splash="1"] only when the key is missing,
 * so repeat visits never flash it and internal navigation never re-triggers it.
 * Progress is driven from JS (compositor-friendly transform) so it also works with reduced motion.
 */
export default function FirstVisitSplash() {
  const [gone, setGone] = useState(false);
  const bar = useRef<HTMLDivElement>(null);
  const pct = useRef<HTMLSpanElement>(null);
  const finish = useRef<() => void>(() => {});

  useEffect(() => {
    const root = document.documentElement;
    if (root.getAttribute("data-splash") !== "1") { setGone(true); return; }

    try { localStorage.setItem(SPLASH_KEY, "1"); } catch { /* storage blocked: splash may repeat, harmless */ }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduced ? DURATION_REDUCED : DURATION;
    let raf = 0;
    let exitTimer: ReturnType<typeof setTimeout> | undefined;
    let ended = false;
    const start = performance.now();

    const end = () => {
      if (ended) return;
      ended = true;
      cancelAnimationFrame(raf);
      if (bar.current) bar.current.style.transform = "scaleX(1)";
      if (pct.current) pct.current.textContent = "100";
      root.setAttribute("data-splash", "exit");
      exitTimer = setTimeout(() => { root.removeAttribute("data-splash"); setGone(true); }, reduced ? 0 : EXIT_MS);
    };
    finish.current = end;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / total);
      // ease-in-out so the bar feels like real loading: quick start, pause in the middle, smooth finish
      const p = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      if (pct.current) pct.current.textContent = String(Math.round(p * 100));
      if (t < 1) raf = requestAnimationFrame(tick); else end();
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      if (exitTimer) clearTimeout(exitTimer);
      // strict-mode remount / unmount: never leave the page locked behind the splash
      if (ended) { root.removeAttribute("data-splash"); }
    };
  }, []);

  if (gone) return null;

  return (
    <div id="splash" role="status" aria-live="polite" aria-label="Loading Quest MC">
      <div className="splash-glow splash-glow-a" aria-hidden="true" />
      <div className="splash-glow splash-glow-b" aria-hidden="true" />
      <span className="splash-chip splash-chip-1 mono" aria-hidden="true">{"</>"}</span>
      <span className="splash-chip splash-chip-2 mono" aria-hidden="true">∑</span>
      <span className="splash-chip splash-chip-3 mono" aria-hidden="true">⚗</span>

      <div className="splash-center">
        <h1 className="splash-word mono" aria-hidden="true">
          {WORD.map((ch, i) => (
            <span key={i} className="splash-letter" style={{ animationDelay: `${0.15 + i * 0.07}s` }}>{ch === " " ? "\u00A0" : ch}</span>
          ))}
          <span className="splash-shine" />
        </h1>
        <p className="splash-tag">CBSE Class XII practice arena</p>

        <div className="splash-track" aria-hidden="true">
          <div ref={bar} className="splash-fill" />
        </div>
        <p className="splash-pct mono" aria-hidden="true"><span ref={pct}>0</span>%</p>
      </div>

      <button type="button" className="splash-skip" onClick={() => finish.current()}>Skip</button>
    </div>
  );
}
