/** One consistent icon set (24px grid, 1.75 stroke) so every screen shares the same visual language. */
const PATHS = {
  home: "M3 11.5 12 4l9 7.5M5.5 10v9.5h13V10",
  code: "m16 18 6-6-6-6M8 6l-6 6 6 6",
  sigma: "M18 7V4H6l6.5 8L6 20h12v-3",
  flask: "M9 3h6M10 3v6.2L4.6 18.6A1.6 1.6 0 0 0 6 21h12a1.6 1.6 0 0 0 1.4-2.4L14 9.2V3M7.6 15h8.8",
  book: "M3 5.5A1.5 1.5 0 0 1 4.5 4H10a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H3zM21 5.5A1.5 1.5 0 0 0 19.5 4H14a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h7z",
  cards: "m12 3 9 5-9 5-9-5zM3 12.5l9 5 9-5M3 17l9 5 9-5",
  target: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zM12 11.2a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6z",
  flame: "M12 3c.6 3.6 5 5.2 5 10.2a5 5 0 0 1-10 0c0-2.1 1-3.4 2.2-4.6.1 1.9.9 2.9 1.9 3.3-.5-3.2-.6-5.6.9-8.9z",
  compass: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM15.8 8.2l-2.1 5.5-5.5 2.1 2.1-5.5z",
  back: "M19 12H5m7 7-7-7 7-7",
  forward: "M5 12h14m-7-7 7 7-7 7",
  chevron: "m6 9 6 6 6-6",
  check: "m5 12.5 4.5 4.5L19 7.5",
  bulb: "M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.4 1.1 2.2h5c0-.8.4-1.6 1.1-2.2A6 6 0 0 0 12 3z",
  warn: "M12 4 3 20h18zM12 10v4M12 17.2v.1",
  table: "M4 5h16v14H4zM4 10h16M10 5v14",
  sound: "M11 5 6 9H3v6h3l5 4zM15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13",
  mute: "M11 5 6 9H3v6h3l5 4zM22 9l-6 6M16 9l6 6",
  spark: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z",
} as const;

export type IconName = keyof typeof PATHS;

export default function Icon({ name, size = 20, className = "" }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`shrink-0 ${className}`}>
      <path d={PATHS[name]} />
    </svg>
  );
}
