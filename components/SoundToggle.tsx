"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import { playSound, setSound, soundOn } from "@/lib/fx";

/** Mute / unmute the little sound effects. Remembered between visits. */
export default function SoundToggle() {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const sync = () => setOn(soundOn());
    sync();
    window.addEventListener("qmc-sound", sync);
    return () => window.removeEventListener("qmc-sound", sync);
  }, []);
  return (
    <button
      type="button"
      onClick={() => { const next = !on; setSound(next); if (next) playSound("tap"); }}
      aria-pressed={on}
      aria-label={on ? "Sound effects on. Tap to mute" : "Sound effects off. Tap to turn on"}
      className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 hover:bg-white/5 hover:text-white"
    >
      <Icon name={on ? "sound" : "mute"} size={20} />
    </button>
  );
}
