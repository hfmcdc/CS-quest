/**
 * Celebration effects: confetti and tiny synthesized sounds (Web Audio, no audio files, no dependencies).
 * - Sound can be muted from the nav bar; the choice is remembered in localStorage ("qmc:sound").
 * - Confetti is skipped when the visitor prefers reduced motion.
 * - During the Halloween theme the confetti is pumpkins, bats, ghosts and sweets.
 * Every function is safe to call anywhere; failures are swallowed so an effect can never break a quiz.
 */
const SOUND_KEY = "qmc:sound";
export type Sfx = "correct" | "wrong" | "done" | "tap";

export function soundOn(): boolean {
  try { return localStorage.getItem(SOUND_KEY) !== "0"; } catch { return true; }
}
export function setSound(on: boolean): void {
  try { localStorage.setItem(SOUND_KEY, on ? "1" : "0"); } catch { /* ignore */ }
  window.dispatchEvent(new Event("qmc-sound"));
}

let ctx: AudioContext | null = null;
function tone(freq: number, at: number, dur: number, type: OscillatorType, vol: number, slideTo?: number) {
  if (!ctx) return;
  const t = ctx.currentTime + at;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g); g.connect(ctx.destination);
  o.start(t); o.stop(t + dur + 0.05);
}

export function playSound(kind: Sfx): void {
  if (typeof window === "undefined" || !soundOn()) return;
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    if (!ctx) ctx = new AC();
    if (ctx.state === "suspended") void ctx.resume();
    const spooky = document.documentElement.getAttribute("data-theme") === "halloween";
    if (kind === "correct") { [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.08, 0.28, "triangle", 0.09)); }
    else if (kind === "done") { [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, i * 0.1, 0.4, "triangle", 0.1)); }
    else if (kind === "wrong") { spooky ? tone(330, 0, 0.5, "sawtooth", 0.05, 110) : tone(220, 0, 0.3, "sine", 0.08, 140); }
    else tone(660, 0, 0.06, "sine", 0.04);
  } catch { /* audio unavailable: stay silent */ }
}

const PARTY = ["#22d3ee", "#a78bfa", "#34d399", "#fcd34d", "#fb7185", "#f0abfc"];
const SPOOKY = ["🎃", "🦇", "👻", "🍬", "🕷️", "🍭"];

export function confetti(big = false): void {
  if (typeof document === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  try {
    const spooky = document.documentElement.getAttribute("data-theme") === "halloween";
    const box = document.createElement("div");
    box.setAttribute("aria-hidden", "true");
    box.style.cssText = "position:fixed;inset:0;z-index:90;pointer-events:none;overflow:hidden";
    const n = big ? 56 : 30;
    for (let i = 0; i < n; i++) {
      const p = document.createElement("span");
      const dx = (Math.random() - 0.5) * (big ? 900 : 620);
      const up = 160 + Math.random() * 260;
      const rot = (Math.random() - 0.5) * 900;
      p.style.cssText = "position:absolute;left:50%;top:58%;will-change:transform,opacity;";
      if (spooky) { p.textContent = SPOOKY[i % SPOOKY.length]; p.style.fontSize = `${16 + Math.random() * 14}px`; }
      else { p.style.width = "8px"; p.style.height = "12px"; p.style.borderRadius = "2px"; p.style.background = PARTY[i % PARTY.length]; }
      p.animate(
        [
          { transform: "translate(-50%,0) rotate(0deg)", opacity: 1 },
          { transform: `translate(calc(-50% + ${dx * 0.6}px), -${up}px) rotate(${rot * 0.5}deg)`, opacity: 1, offset: 0.4 },
          { transform: `translate(calc(-50% + ${dx}px), ${180 + Math.random() * 160}px) rotate(${rot}deg)`, opacity: 0 },
        ],
        { duration: 1500 + Math.random() * 900, easing: "cubic-bezier(.2,.7,.3,1)", fill: "forwards", delay: Math.random() * 120 }
      );
      box.appendChild(p);
    }
    document.body.appendChild(box);
    setTimeout(() => box.remove(), 2800);
  } catch { /* ignore */ }
}

/** Sound + confetti for a right answer (big = finished a whole deck). */
export function celebrate(big = false): void {
  playSound(big ? "done" : "correct");
  confetti(big);
}
