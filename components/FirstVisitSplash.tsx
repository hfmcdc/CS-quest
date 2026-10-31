"use client";

import { useEffect, useRef, useState } from "react";

const DURATION = 4500;
const DURATION_REDUCED = 1800;
const EXIT_MS = 700;
const READY_GRACE_MS = 3000; // never hold the splash longer than this waiting for the page to finish loading
const R = 54;
const C = 2 * Math.PI * R;
const WORD = "Quest MC".split("");

/** Cobweb for the top-left corner (mirrored by CSS for the other three). Spokes + sagging rings, built once. */
const WEB = (() => {
  const spokes = 7, rings = [26, 52, 78, 104, 130, 156], R = 160;
  const pt = (r: number, i: number) => { const a = (i / (spokes - 1)) * (Math.PI / 2); return [r * Math.cos(a), r * Math.sin(a)]; };
  let d = "";
  for (let i = 0; i < spokes; i++) { const [x, y] = pt(R, i); d += `M0 0L${x.toFixed(1)} ${y.toFixed(1)}`; }
  for (const r of rings) {
    for (let i = 0; i < spokes - 1; i++) {
      const [x1, y1] = pt(r, i), [x2, y2] = pt(r, i + 1);
      const [cx, cy] = [(x1 + x2) / 2 * 0.82, (y1 + y2) / 2 * 0.82];
      d += `${i === 0 ? `M${x1.toFixed(1)} ${y1.toFixed(1)}` : ""}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
    }
  }
  return d;
})();

function Web({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  return (
    <svg className={`splash-web web-${pos}`} viewBox="0 0 160 160" fill="none" aria-hidden="true">
      <path d={WEB} stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
}

/** A spider on a thread. The thread is a CSS pseudo-element, so the whole unit just moves up and down. */
function Spider({ x, size, dur, delay, drop }: { x: string; size: number; dur: number; delay: number; drop: string }) {
  return (
    <div className="splash-dangler" style={{ left: x, ["--drop" as string]: drop, animationDuration: `${dur}s`, animationDelay: `${delay}s` }} aria-hidden="true">
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" stroke="#d9c8ff" strokeWidth="1.6" strokeLinecap="round" className="splash-spider">
        <path d="M20 17 8 7M20 17 4 14M20 18 3 24M20 19 9 34M20 17 32 7M20 17 36 14M20 18 37 24M20 19 31 34" />
        <ellipse cx="20" cy="24" rx="6.5" ry="8" fill="#1a1030" />
        <circle cx="20" cy="15.5" r="4" fill="#1a1030" />
        <circle cx="18.4" cy="15" r="0.9" fill="#ff8a2b" stroke="none" /><circle cx="21.6" cy="15" r="0.9" fill="#ff8a2b" stroke="none" />
      </svg>
    </div>
  );
}

/**
 * Full-screen loader shown on every full page load (first open and every refresh). The markup is server-rendered but hidden by CSS;
 * the inline script in <head> switches it on (html[data-splash="1"]) before first paint. The layout stays mounted during
 * client-side navigation, so moving between screens never replays it.
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

      {/* Halloween extras: hidden by CSS unless html[data-theme="halloween"] */}
      {(["tl", "tr", "bl", "br"] as const).map((p) => <Web key={p} pos={p} />)}
      <Spider x="14%" size={34} dur={5.2} delay={0} drop="26vh" />
      <Spider x="50%" size={46} dur={6.4} delay={-1.8} drop="19vh" />
      <Spider x="82%" size={38} dur={5.8} delay={-3.2} drop="32vh" />

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
        <p className="splash-tag"><span className="t-normal">CBSE Class XII practice</span><span className="t-spooky">Summoning your questions…</span></p>
        <p className="splash-pct mono" aria-hidden="true"><span ref={pct}>0</span>%</p>
      </div>

      <button type="button" className="splash-skip" onClick={() => finish.current()}>Skip</button>
    </div>
  );
}
