"use client";

import { useEffect, useState } from "react";
import { musicOn, setMusic } from "@/lib/music";

/** Start / stop the calm background music. Off by default; the choice is remembered, and it
 *  resumes on the visitor's next tap anywhere (browsers only allow audio after a tap). */
export default function MusicToggle() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const sync = () => setOn(musicOn());
    sync();
    window.addEventListener("qmc-music", sync);
    // If they left it on last visit, start it on the first tap (autoplay isn't allowed before that).
    const resume = () => { if (musicOn()) setMusic(true); };
    window.addEventListener("pointerdown", resume, { once: true });
    return () => {
      window.removeEventListener("qmc-music", sync);
      window.removeEventListener("pointerdown", resume);
    };
  }, []);
  return (
    <button
      type="button"
      onClick={() => setMusic(!on)}
      aria-pressed={on}
      aria-label={on ? "Background music on. Tap to stop" : "Background music off. Tap to play"}
      className={`flex h-10 w-10 items-center justify-center rounded-xl hover:bg-white/5 hover:text-white ${on ? "text-cyan-200" : "text-slate-400"}`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
        {!on && <path d="M3 3l18 18" />}
      </svg>
    </button>
  );
}
