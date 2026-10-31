/** A template (unlike a layout) re-mounts on every navigation, which replays this short fade-and-rise. CSS-only, so it costs no JS. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
