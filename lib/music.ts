/**
 * Adaptive study music, synthesized live with Web Audio. No audio files, no dependencies, nothing to license.
 *
 * It reacts to the learner in two ways:
 *  1. SUBJECT: each subject has its own sound. Computer = steady electronic pulse, Maths = quiet piano for deep
 *     focus, Chemistry = bright dreamy shimmer, Physics = slow spacey pads, Home = relaxed lo-fi.
 *     Changing subject crossfades at the next bar, never mid-phrase.
 *  2. PROGRESS: a hidden "energy" level (0..1). Right answers push it up, wrong answers ease it down, and it
 *     slowly relaxes on its own. More energy = more layers (drums, melody, arpeggio, fast hats), a slightly
 *     faster tempo and a brighter tone. Finishing a deck gives a big lift.
 *
 * - Off by default (browsers block autoplay anyway). Choice is remembered in localStorage ("qmc:music").
 * - Pauses by itself when the tab is hidden; fades in/out.
 * - Independent of the sound-effects toggle in lib/fx.ts.
 * Every function is safe to call anywhere; failures are swallowed so music can never break a quiz.
 */
const MUSIC_KEY = "qmc:music";
const LOOKAHEAD = 0.15;   // seconds scheduled ahead
const MASTER = 0.6;       // slightly louder; sound effects stay on top
const BASE_ENERGY = 0.15; // where energy settles when nothing is happening

export type Mood = "home" | "computer" | "maths" | "chemistry" | "physics";

type Chord = { bass: number; keys: number[] };
type MoodDef = {
  bpm: number;
  chords: [Chord, Chord, Chord, Chord];
  melody: number[];         // 32 eighth-notes (4 bars), 0 = rest
  keyWave: OscillatorType;
  melodyWave: OscillatorType;
  keyCutoff: number;
  pad: boolean;             // long, slow-attack chords
  arp: boolean;             // arpeggio over the chord
  arpAt: number;            // energy at which the arpeggio comes in
  drumsAt: number;          // energy at which kick + snare come in
  hatsAt: number;           // energy at which hats come in
  melodyAt: number;         // energy at which the melody comes in
  swing: number;            // 0 = straight, ~0.2 = lazy lo-fi
};

const MOODS: Record<Mood, MoodDef> = {
  // relaxed lo-fi: Am9 | Fmaj7 | Cmaj7 | G6
  home: {
    bpm: 72, keyWave: "triangle", melodyWave: "sine", keyCutoff: 1500, pad: false, arp: false,
    arpAt: 0.55, drumsAt: 0.1, hatsAt: 0.1, melodyAt: 0.35, swing: 0.18,
    chords: [
      { bass: 45, keys: [60, 64, 67, 71] }, { bass: 41, keys: [60, 64, 67, 69] },
      { bass: 48, keys: [59, 64, 67, 71] }, { bass: 43, keys: [59, 62, 67, 69] },
    ],
    melody: [76,0,0,0,72,0,74,0, 0,0,69,0,0,0,72,0, 76,0,0,79,0,0,76,0, 74,0,0,0,72,0,0,0],
  },
  // focus + electronic: Dm7 | Bbmaj7 | Fmaj7 | C. Steady pulse from the very start, nothing wandering.
  computer: {
    bpm: 94, keyWave: "square", melodyWave: "triangle", keyCutoff: 1100, pad: false, arp: true,
    arpAt: 0, drumsAt: 0.05, hatsAt: 0.05, melodyAt: 0.45, swing: 0,
    chords: [
      { bass: 38, keys: [57, 60, 62, 65] }, { bass: 46, keys: [58, 62, 65, 69] },
      { bass: 41, keys: [57, 60, 64, 65] }, { bass: 48, keys: [55, 60, 64, 67] },
    ],
    melody: [74,0,0,77,0,0,81,0, 0,0,77,0,74,0,0,0, 72,0,0,76,0,0,79,0, 0,0,76,0,72,0,0,0],
  },
  // calm deep focus: quiet, sparse piano. Cmaj7 | Am7 | Dm7 | G7sus4
  maths: {
    bpm: 64, keyWave: "triangle", melodyWave: "sine", keyCutoff: 1800, pad: false, arp: false,
    arpAt: 0.6, drumsAt: 0.4, hatsAt: 0.55, melodyAt: 0.2, swing: 0.1,
    chords: [
      { bass: 48, keys: [64, 67, 71, 72] }, { bass: 45, keys: [60, 64, 67, 69] },
      { bass: 50, keys: [60, 62, 65, 69] }, { bass: 43, keys: [60, 62, 65, 67] },
    ],
    melody: [79,0,0,0,0,0,76,0, 0,0,72,0,0,0,0,0, 74,0,0,0,77,0,0,0, 0,0,76,0,0,0,0,0],
  },
  // bright, dreamy, a little sparkly: Dmaj7 | Bm7 | Gmaj7 | A6
  chemistry: {
    bpm: 78, keyWave: "sine", melodyWave: "triangle", keyCutoff: 2600, pad: true, arp: true,
    arpAt: 0.3, drumsAt: 0.25, hatsAt: 0.3, melodyAt: 0.1, swing: 0.08,
    chords: [
      { bass: 50, keys: [61, 64, 66, 69] }, { bass: 47, keys: [62, 66, 69, 71] },
      { bass: 43, keys: [59, 62, 66, 69] }, { bass: 45, keys: [61, 64, 66, 69] },
    ],
    melody: [81,0,78,0,0,0,76,0, 78,0,0,0,74,0,0,0, 83,0,81,0,0,0,78,0, 76,0,0,0,81,0,0,0],
  },
  // slow, wide, spacey pads: Am | Fmaj7 | Cadd9 | Em7
  physics: {
    bpm: 68, keyWave: "sawtooth", melodyWave: "sine", keyCutoff: 900, pad: true, arp: false,
    arpAt: 0.5, drumsAt: 0.3, hatsAt: 0.5, melodyAt: 0.25, swing: 0,
    chords: [
      { bass: 45, keys: [57, 60, 64, 69] }, { bass: 41, keys: [57, 60, 64, 65] },
      { bass: 48, keys: [55, 60, 62, 64] }, { bass: 40, keys: [55, 59, 62, 64] },
    ],
    melody: [0,0,0,0,76,0,0,0, 0,0,81,0,0,0,0,0, 0,0,0,0,79,0,0,0, 0,0,76,0,0,0,0,0],
  },
};

export function moodForPath(path: string): Mood {
  const p = path || "/";
  if (p.startsWith("/computer")) return "computer";
  if (p.startsWith("/maths")) return "maths";
  if (p.startsWith("/chemistry")) return "chemistry";
  if (p.startsWith("/physics")) return "physics";
  return "home";
}

export function musicOn(): boolean {
  try {
    const saved = localStorage.getItem(MUSIC_KEY);
    return saved === null || saved === "1";
  } catch { return true; }
}
function remember(on: boolean) {
  try { localStorage.setItem(MUSIC_KEY, on ? "1" : "0"); } catch { /* ignore */ }
  window.dispatchEvent(new Event("qmc-music"));
}

const mtof = (m: number) => 440 * Math.pow(2, (m - 69) / 12);
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let tone: BiquadFilterNode | null = null; // master brightness, opens up with energy
let noiseBuf: AudioBuffer | null = null;
let timer: ReturnType<typeof setInterval> | null = null;
let nextTime = 0;
let step = 0;
let playing = false;
let mood: Mood = "home";
let pendingMood: Mood | null = null;
let energy = BASE_ENERGY;

function note(freq: number, at: number, dur: number, type: OscillatorType, vol: number, cutoff = 1800, attack = 0.015) {
  if (!ctx || !master) return;
  const o = ctx.createOscillator();
  const o2 = ctx.createOscillator();
  const g = ctx.createGain();
  const g2 = ctx.createGain();
  const f = ctx.createBiquadFilter();
  o.type = type; o2.type = "sine";
  o.frequency.value = freq; o2.frequency.value = freq * 2.005; // slight detune = warm shimmer
  f.type = "lowpass"; f.frequency.value = cutoff;
  g.gain.setValueAtTime(0.0001, at);
  g.gain.exponentialRampToValueAtTime(vol, at + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  g2.gain.value = 0.25;
  o.connect(f); o2.connect(g2); g2.connect(f);
  f.connect(g); g.connect(master);
  o.start(at); o2.start(at); o.stop(at + dur + 0.05); o2.stop(at + dur + 0.05);
}

function drum(at: number, kind: "kick" | "hat" | "snare", vol = 1) {
  if (!ctx || !master) return;
  if (kind === "kick") {
    const o = ctx.createOscillator(); const g = ctx.createGain();
    o.frequency.setValueAtTime(120, at); o.frequency.exponentialRampToValueAtTime(42, at + 0.14);
    g.gain.setValueAtTime(0.5 * vol, at); g.gain.exponentialRampToValueAtTime(0.0001, at + 0.22);
    o.connect(g); g.connect(master); o.start(at); o.stop(at + 0.25);
    return;
  }
  if (!noiseBuf) {
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  const s = ctx.createBufferSource(); s.buffer = noiseBuf;
  const f = ctx.createBiquadFilter(); const g = ctx.createGain();
  if (kind === "hat") { f.type = "highpass"; f.frequency.value = 7000; g.gain.setValueAtTime(0.1 * vol, at); g.gain.exponentialRampToValueAtTime(0.0001, at + 0.05); }
  else { f.type = "bandpass"; f.frequency.value = 1800; g.gain.setValueAtTime(0.2 * vol, at); g.gain.exponentialRampToValueAtTime(0.0001, at + 0.16); }
  s.connect(f); f.connect(g); g.connect(master);
  s.start(at); s.stop(at + 0.2);
}

const stepLen = () => 60 / (MOODS[mood].bpm * (1 + 0.12 * energy)) / 2; // up to ~12% faster when fired up

function scheduleStep(s: number, at: number) {
  const m = MOODS[mood];
  const e = energy;
  const beat = stepLen() * 2;
  const bar = Math.floor(s / 8) % 4;
  const i = s % 8;
  const chord = m.chords[bar];
  const t = at + (i % 2 === 1 ? stepLen() * m.swing : 0);
  const cut = m.keyCutoff * (1 + 0.8 * e);

  if (i === 0) {
    if (m.pad) chord.keys.forEach((k) => note(mtof(k), t, beat * 7, m.keyWave, 0.05, cut, 0.5));
    else chord.keys.forEach((k, n) => note(mtof(k), t + n * 0.018, beat * 3.6, m.keyWave, 0.1, cut));
    note(mtof(chord.bass), t, beat * 1.8, "sine", 0.3, 400);
  }
  if (i === 4) note(mtof(chord.bass), t, beat * 1.6, "sine", 0.24, 400);
  if (e > 0.7 && i % 2 === 0) note(mtof(chord.bass + 12), t, beat * 0.5, "triangle", 0.08, 700); // driving octave bass

  if (m.arp && e >= m.arpAt) {
    const idx = [0, 1, 2, 3, 2, 1, 2, 3][i];
    note(mtof(chord.keys[idx] + 12), t, stepLen() * 1.3, m.keyWave === "square" ? "square" : "triangle", 0.03 + 0.03 * e, cut);
  }

  if (e >= m.drumsAt) {
    if (i === 0 || i === 5) drum(t, "kick");
    if (i === 4) drum(t, "snare");
  }
  if (e >= m.hatsAt && i % 2 === 0) drum(t, "hat", 0.7 + 0.5 * e);
  if (e > 0.75 && i % 2 === 1) drum(t, "hat", 0.6); // extra off-beat hats when fired up

  const mel = m.melody[s % m.melody.length];
  if (mel && e >= m.melodyAt) note(mtof(mel), t, beat * 1.4, m.melodyWave, 0.05 + 0.05 * e, 2400);
  if (mel && e > 0.6) note(mtof(mel + 12), t + stepLen() * 0.5, beat * 0.8, "sine", 0.025, 3000); // sparkle on top
}

function tick() {
  if (!ctx) return;
  while (nextTime < ctx.currentTime + LOOKAHEAD) {
    // switch subject sound only on a bar line so chords never clash mid-bar
    if (pendingMood && step % 8 === 0) { mood = pendingMood; pendingMood = null; step = 0; }
    scheduleStep(step, Math.max(nextTime, ctx.currentTime));
    nextTime += stepLen();
    step = (step + 1) % 32;
    if (step % 8 === 0) energy = Math.max(BASE_ENERGY, energy - 0.025); // relax a little each bar
  }
  if (tone) tone.frequency.setTargetAtTime(3200 + 5200 * energy, ctx.currentTime, 0.4);
}

function onVisibility() {
  if (!ctx) return;
  if (document.hidden) void ctx.suspend(); else if (playing) void ctx.resume();
}

function start() {
  if (typeof window === "undefined" || playing) return;
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    if (!ctx) {
      ctx = new AC();
      master = ctx.createGain();
      tone = ctx.createBiquadFilter(); tone.type = "lowpass"; tone.frequency.value = 4000;
      master.connect(tone); tone.connect(ctx.destination);
      document.addEventListener("visibilitychange", onVisibility);
    }
    if (ctx.state === "suspended") void ctx.resume();
    master!.gain.cancelScheduledValues(ctx.currentTime);
    master!.gain.setValueAtTime(0.0001, ctx.currentTime);
    master!.gain.exponentialRampToValueAtTime(MASTER, ctx.currentTime + 2); // fade in
    nextTime = ctx.currentTime + 0.1; step = 0; playing = true;
    timer = setInterval(tick, 50);
  } catch { /* audio unavailable: stay silent */ }
}

function stop() {
  if (!playing || !ctx || !master) return;
  playing = false;
  try {
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), ctx.currentTime);
    master.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8); // fade out
  } catch { /* ignore */ }
  if (timer) { clearInterval(timer); timer = null; }
}

/** Turn music on or off. Call from a click/tap so the browser allows audio. */
export function setMusic(on: boolean): void {
  if (typeof window === "undefined") return;
  remember(on);
  if (on) start(); else stop();
}

/** Pick the subject's sound. Safe to call before music starts; takes effect at the next bar. */
export function setMusicMood(next: Mood): void {
  if (next === mood && !pendingMood) return;
  if (!playing) { mood = next; pendingMood = null; return; }
  pendingMood = next;
}

/** Tell the music how the learner is doing. Right answers lift the energy, wrong ones ease it. */
export function musicReact(kind: "correct" | "wrong" | "done"): void {
  if (kind === "correct") energy = clamp01(energy + 0.2);
  else if (kind === "done") energy = clamp01(energy + 0.45);
  else energy = clamp01(energy - 0.25);
}

/** Current energy 0..1 (for tests / debugging). */
export function musicEnergy(): number { return energy; }
