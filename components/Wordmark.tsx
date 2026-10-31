/** The existing Quest MC wordmark, reused by the nav bar and the loading screen. */
export default function Wordmark({ className = "" }: { className?: string }) {
  return <span className={`wm mono font-bold tracking-tight ${className}`}>Quest MC</span>;
}
