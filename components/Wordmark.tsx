import pkg from "@/package.json";

/** The existing Quest MC wordmark, reused by the nav bar and the loading screen. */
export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`wm mono font-bold tracking-tight ${className}`}>
      Quest MC<sup className="ml-1 text-[.55rem] font-medium tracking-normal text-slate-500">v{pkg.version}</sup>
    </span>
  );
}
