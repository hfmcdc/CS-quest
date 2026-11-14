import type { ReactNode } from "react";
import { parseRich, parseTex, plain, type TexNode } from "@/lib/physics/tex";

/**
 * Renders the LaTeX subset used in the Physics question banks as plain HTML + CSS (no libraries, no fonts to download,
 * works offline). Styles live in app/physics.css (.pm-*). Fractions, roots, sub/superscripts, vectors and Greek letters
 * are laid out with CSS so they stay crisp and wrap sensibly on phones. Display equations scroll sideways instead of
 * overflowing the page.
 *
 * Server- and client-safe: no hooks, no state.
 */

function nodes(list: TexNode[], key = ""): ReactNode[] {
  return list.map((n, i) => node(n, `${key}${i}`));
}

function node(n: TexNode, k: string): ReactNode {
  switch (n.t) {
    case "i": return <span key={k} className="pm-i">{n.s}</span>;
    case "g": return <span key={k} className="pm-i">{n.s}</span>;
    case "n": return <span key={k}>{n.s}</span>;
    case "rm": return <span key={k} className={n.bold ? "pm-b" : "pm-rm"}>{n.s}</span>;
    case "fn": return <span key={k} className="pm-fn">{n.s}</span>;
    case "sym": return <span key={k}>{n.s}</span>;
    case "op": return <span key={k} className={n.unary ? "pm-op pm-un" : "pm-op"}>{n.s}</span>;
    case "big": return <span key={k} className="pm-big">{n.s}</span>;
    case "sp": return <span key={k} className="pm-sp" style={{ width: `${n.w}em` }} />;
    case "br": return <br key={k} />;
    case "frac":
      return (
        <span key={k} className="pm-frac">
          <span className="pm-num">{nodes(n.a, `${k}a`)}</span>
          <span className="pm-den">{nodes(n.b, `${k}b`)}</span>
        </span>
      );
    case "sqrt":
      return (
        <span key={k} className="pm-sqrt">
          {n.idx && <sup className="pm-idx">{nodes(n.idx, `${k}i`)}</sup>}
          <span className="pm-rad">√</span>
          <span className="pm-rad-body">{nodes(n.a, `${k}r`)}</span>
        </span>
      );
    case "scr": {
      const base = n.base ? node(n.base, `${k}b`) : null;
      if (n.sup && n.sub) {
        return (
          <span key={k} className="pm-scr">
            {base}
            <span className="pm-stack"><sup>{nodes(n.sup, `${k}u`)}</sup><sub>{nodes(n.sub, `${k}d`)}</sub></span>
          </span>
        );
      }
      return (
        <span key={k} className="pm-scr">
          {base}
          {n.sup && <sup>{nodes(n.sup, `${k}u`)}</sup>}
          {n.sub && <sub>{nodes(n.sub, `${k}d`)}</sub>}
        </span>
      );
    }
    case "acc":
      return <span key={k} className={`pm-acc pm-${n.kind}`}>{nodes(n.a, `${k}x`)}</span>;
  }
}

/** One equation or expression. `display` centres it on its own line. */
export function Tex({ src, display = false, className = "" }: { src: string; display?: boolean; className?: string }) {
  let tree: TexNode[];
  try { tree = parseTex(src); } catch { return <span className="pm-err" title="Could not render this expression">{src}</span>; }
  const label = plain(tree);
  return display
    ? <div className={`pm pm-block ${className}`} role="math" aria-label={label}>{nodes(tree)}</div>
    : <span className={`pm ${className}`} role="math" aria-label={label}>{nodes(tree)}</span>;
}

/** Prose with $inline$ and $$display$$ maths, **bold** and line breaks. */
export default function Rich({ text, className = "" }: { text: string; className?: string }) {
  let segs;
  try { segs = parseRich(text); } catch { return <span className={className}>{text}</span>; }
  return (
    <span className={className}>
      {segs.map((s, i) => {
        if (s.t === "br") return <br key={i} />;
        if (s.t === "text") return s.bold ? <strong key={i} className="font-semibold text-white">{s.s}</strong> : <span key={i}>{s.s}</span>;
        const label = plain(s.nodes);
        return s.display
          ? <span key={i} className="pm pm-block" role="math" aria-label={label}>{nodes(s.nodes, `m${i}`)}</span>
          : <span key={i} className="pm" role="math" aria-label={label}>{nodes(s.nodes, `m${i}`)}</span>;
      })}
    </span>
  );
}
