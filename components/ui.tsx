import Link from "next/link";
import type { ReactNode } from "react";
import Icon from "@/components/Icon";

export const LEVELS = ["Easy", "Medium", "Hard"];

/** Three-segment difficulty meter (replaces the old ●●○ text). */
export function DifficultyMeter({ level }: { level: number }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm" aria-label={`Current difficulty ${LEVELS[level - 1]}`}>
      <span className="meter" aria-hidden="true">{[1, 2, 3].map((i) => <i key={i} className={i <= level ? "on" : ""} />)}</span>
      <span className="text-slate-300">{LEVELS[level - 1]}</span>
    </span>
  );
}

/** Back link (route) or button (in-page screen) with one shared look. */
export function BackLink({ href, onClick, children }: { href?: string; onClick?: () => void; children: ReactNode }) {
  const inner = <><Icon name="back" size={16} />{children}</>;
  return href ? <Link href={href} className="btn-ghost">{inner}</Link> : <button type="button" onClick={onClick} className="btn-ghost">{inner}</button>;
}

/** Page title block used by every subject / chapter screen. */
export function PageHeader({ eyebrow, title, children, icon }: { eyebrow?: string; title: string; children?: ReactNode; icon?: ReactNode }) {
  return (
    <header className="mb-8 flex items-start gap-4">
      {icon && <span className="tile mt-1">{icon}</span>}
      <div className="min-w-0">
        {eyebrow && <p className="mb-1 text-sm text-slate-400">{eyebrow}</p>}
        <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">{title}</h1>
        {children && <p className="mt-3 max-w-xl leading-relaxed text-slate-400">{children}</p>}
      </div>
    </header>
  );
}
