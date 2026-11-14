import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import Icon from "@/components/Icon";

/** Small presentational pieces shared by the Physics screens (no hooks: usable from server and client components). */

export type SegState = "" | "ok" | "bad" | "part" | "seen";

export function SegProgress({ states, current, label }: { states: SegState[]; current: number; label: string }) {
  return (
    <div className="ph-prog" role="group" aria-label={label}>
      <div className="ph-seg" aria-hidden="true">
        {states.map((s, i) => <i key={i} className={s || (i === current ? "cur" : "")} />)}
      </div>
      <small>{Math.min(current + 1, states.length)} / {states.length}</small>
    </div>
  );
}

/** Animated sliding-indicator tabs (EasyUI "pill navigation" idea, CSS only). */
export function Pills<T extends string>({ options, value, onChange, label }: { options: { id: T; label: string }[]; value: T; onChange: (v: T) => void; label: string }) {
  const idx = Math.max(0, options.findIndex((o) => o.id === value));
  return (
    <div className="ph-pills" role="group" aria-label={label} style={{ "--n": options.length, "--i": idx } as CSSProperties}>
      <span className="ph-thumb" aria-hidden="true" />
      {options.map((o) => (
        <button key={o.id} type="button" aria-pressed={o.id === value} onClick={() => onChange(o.id)}>{o.label}</button>
      ))}
    </div>
  );
}

export function Tick({ kind }: { kind: "ok" | "bad" | "warn" | "hint" }) {
  const paths = {
    ok: "m5 12.5 4.5 4.5L19 7.5",
    bad: "M6 6l12 12M18 6 6 18",
    warn: "M12 7v6M12 16.8v.1",
    hint: "M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.4 1.1 2.2h5c0-.8.4-1.6 1.1-2.2A6 6 0 0 0 12 3z",
  } as const;
  return (
    <svg className={`ph-ico ${kind} ${kind === "ok" ? "ph-tick" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[kind]} />
    </svg>
  );
}

export function Feedback({ kind, title, children }: { kind: "ok" | "bad" | "warn" | "hint"; title?: string; children: ReactNode }) {
  return (
    <div className={`ph-fb ${kind}`} role="status">
      <Tick kind={kind} />
      <div>{title && <strong>{title}</strong>}{children}</div>
    </div>
  );
}

export function Skeleton() {
  return <div className="ph-skel" role="status" aria-label="Loading questions" />;
}

export function LoadError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="card ph-empty" role="alert">
      <p style={{ margin: "0 0 1rem" }}>These questions could not be loaded. Check your connection and try again.</p>
      <button type="button" className="btn-ghost" onClick={onRetry}>Try again</button>
    </div>
  );
}

export function EndCard({ title, score, outOf, note, onAgain, backHref }: { title: string; score?: number; outOf?: number; note?: string; onAgain: () => void; backHref: string }) {
  return (
    <div className="card ph-end a-pop">
      <h2>{title}</h2>
      {score !== undefined && outOf !== undefined && <div className="ph-score"><b>{score}</b><span>/ {outOf}</span></div>}
      {note && <p className="ph-muted" style={{ margin: "0 0 1.25rem", fontSize: ".9rem" }}>{note}</p>}
      <div className="ph-actions" style={{ justifyContent: "center", marginTop: 0 }}>
        <button type="button" className="btn-primary" onClick={onAgain}>Practise again</button>
        <Link href={backHref} className="btn-ghost"><Icon name="back" size={16} />Back to chapter</Link>
      </div>
    </div>
  );
}
