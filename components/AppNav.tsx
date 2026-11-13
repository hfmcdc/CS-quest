"use client";

import Link from "next/link";
import Wordmark from "@/components/Wordmark";
import SoundToggle from "@/components/SoundToggle";

/** Persistent top bar: logo and sound toggle. The site is Computer Science only for now. */
export default function AppNav() {
  return (
    <header className="nav-bar">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4">
        <Link href="/" prefetch={false} aria-label="Quest MC home" className="text-lg text-cyan-200"><Wordmark /></Link>
        <SoundToggle />
      </div>
    </header>
  );
}
