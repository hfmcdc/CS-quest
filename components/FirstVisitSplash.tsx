"use client";

import { useEffect, useRef, useState } from "react";

const DURATION = 4500;
const DURATION_REDUCED = 1800;
const EXIT_MS = 700;
const READY_GRACE_MS = 3000; // never hold the splash longer than this waiting for the page to finish loading
const SEEN_KEY = "qmc:seen"; // must match the inline script in app/layout.tsx
const R = 54;
const C = 2 * Math.PI * R;
const WORD = "Quest MC".split("");

/**
 * Full-screen loader shown only on a browser's first visit. The markup is server-rendered but hidden by CSS;
 * the inline script in <head> switches it on (html[data-splash="1"]) before first paint only if the "seen" flag
 * is missing. The flag is written as soon as the splash starts, so refreshes and later visits skip it, and the
 * layout stays mounted during client-side navigation, so moving between screens never replays it.
 * Progress runs ~4.5 s, then waits (briefly) for window "load" so the app is ready before the hand-off.
 */
export default function FirstVisitSplash() {
  const [gone, setGone] = useState(false);
  const ring = useRef<SVGCircleElement>(null);
  const pct = useRef<HTMLSpanElement>(null);
  const finish = useRef<() => void>(() => {});

  useEffect(() => {
    const root = document.documentElement;
    if (root.getAttribute("data-splash") !== "1") { setGone(true); return; }
    try { localStorage.setItem(SEEN_KEY, "1"); } catch { /* storage blocked: splash simply shows again next time */ }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduced ? DURATION_REDUCED : DURATION;
    let raf = 0;
    let exitTimer: ReturnType<typeof setTimeout> | undefined;
    let readyTimer: ReturnType<typeof setTimeout> | undefined;
    let ended = false;
    const start = performance.now();

    const paint = (p: number) => {
      if (ring.current) ring.current.style.strokeDashoffset = String(C * (1 - p));
      if (pct.current) pct.current.textContent = String(Math.round(p * 100));
    };

    const end = () => {
      if (ended) return;
      ended = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("load", end);
      if (readyTimer) clearTimeout(readyTimer);
      paint(1);
      root.setAttribute("data-splash", "exit");
      exitTimer = setTimeout(() => { root.removeAttribute("data-splash"); setGone(true); }, reduced ? 0 : EXIT_MS);
    };
    finish.current = end;

    const whenReady = () => {
      if (document.readyState === "complete") return end();
      window.addEventListener("load", end, { once: true });
      readyTimer = setTimeout(end, READY_GRACE_MS);
    };

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / total);
      // ease-in-out so it reads as real loading: quick start, a pause in the middle, smooth finish
      const p = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      paint(p);
      if (t < 1) raf = requestAnimationFrame(tick); else whenReady();
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", end);
      if (readyTimer) clearTimeout(readyTimer);
      if (exitTimer) clearTimeout(exitTimer);
      // strict-mode remount / unmount: never leave the page locked behind the splash
      if (ended) root.removeAttribute("data-splash");
    };
  }, []);

  if (gone) return null;

  return (
    <div id="splash" role="status" aria-live="polite" aria-label="Loading Quest MC">
      <div className="splash-glow splash-glow-a" aria-hidden="true" />
      <div className="splash-glow splash-glow-b" aria-hidden="true" />

      <div className="splash-center">
        <div className="splash-ring" aria-hidden="true">
          <span className="splash-orbit" />
          <svg viewBox="0 0 120 120" width="120" height="120">
            <defs>
              <linearGradient id="splash-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#22d3ee" /><stop offset="1" stopColor="#a78bfa" />
              </linearGradient>
            </defs>
            <circle className="trk" cx="60" cy="60" r={R} />
            <circle ref={ring} className="prg" cx="60" cy="60" r={R} strokeDasharray={C} strokeDashoffset={C} />
          </svg>
          <span className="splash-mark mono">{"</>"}</span>
        </div>

        <h1 className="splash-word mono" aria-hidden="true">
          {WORD.map((ch, i) => (
            <span key={i} className="splash-letter" style={{ animationDelay: `${0.2 + i * 0.07}s` }}>{ch === " " ? "\u00A0" : ch}</span>
          ))}
          <span className="splash-shine" />
        </h1>
        <p className="splash-tag">CBSE Class XII practice</p>
        <p className="splash-pct mono" aria-hidden="true"><span ref={pct}>0</span>%</p>
      </div>

      <button type="button" className="splash-skip" onClick={() => finish.current()}>Skip</button>
    </div>
  );
}
