export default function Logo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" role="img" aria-label="Quest MC logo">
      <defs>
        <linearGradient id="qmc-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="112" fill="#0b1020" />
      <circle cx="240" cy="240" r="120" fill="none" stroke="url(#qmc-g)" strokeWidth="40" />
      <path d="M296 296 L352 352" stroke="url(#qmc-g)" strokeWidth="40" strokeLinecap="round" />
      <path d="M192 205 L234 240 L192 275" fill="none" stroke="#e6e9f2" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M290 216 V264 M266 240 H314" stroke="#e6e9f2" strokeWidth="22" strokeLinecap="round" />
    </svg>
  );
}
