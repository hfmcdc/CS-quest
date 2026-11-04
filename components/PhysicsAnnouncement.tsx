"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const RELEASE_AT = new Date("2026-11-04T14:30:00.000Z").getTime(); // 4 Nov 2026, 8:00 PM IST
const MESSAGE = "PHYSICS QUEST  •  RELEASES TODAY AT 8:00 PM IST  •  TAP FOR COUNTDOWN";

export default function PhysicsAnnouncement() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (Date.now() >= RELEASE_AT) return;
    const timer = window.setTimeout(() => setShowPopup(true), 6500);
    return () => window.clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <Link href="/physics" prefetch={false} className="physics-ticker" aria-label="Physics Quest announcement. Open launch countdown.">
        <span className="physics-ticker-label">📣 ANNOUNCEMENT</span>
        <span className="physics-marquee" aria-hidden="true">
          <span className="physics-marquee-track">
            <span className="physics-marquee-copy">{MESSAGE}<span className="physics-led-dot"> ◆ </span></span>
            <span className="physics-marquee-copy">{MESSAGE}<span className="physics-led-dot"> ◆ </span></span>
          </span>
        </span>
        <span className="physics-ticker-open">OPEN ↗</span>
      </Link>

      {showPopup && (
        <div className="physics-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) closePopup(); }}>
          <section className="physics-modal card" role="dialog" aria-modal="true" aria-labelledby="physics-modal-title">
            <button type="button" className="physics-modal-close" aria-label="Close announcement" onClick={closePopup}>×</button>
            <span className="tile theme-chem h-12 w-12 text-2xl" aria-hidden="true">⚡</span>
            <p className="physics-eyebrow">TEMPORARY UPDATE</p>
            <h2 id="physics-modal-title" className="text-2xl font-semibold text-white sm:text-3xl">Physics Quest releases tonight</h2>
            <p className="text-sm leading-relaxed text-slate-300">Due to coding errors, Physics Quest will release at <strong className="text-amber-200">8:00 PM IST on 4 November</strong>. Tap below for the countdown.</p>
            <div className="mt-2 flex flex-wrap gap-3">
              <Link href="/physics" className="btn-primary theme-chem" onClick={closePopup}>See countdown <span aria-hidden="true">→</span></Link>
              <button type="button" className="btn-ghost" onClick={closePopup}>Maybe later</button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
