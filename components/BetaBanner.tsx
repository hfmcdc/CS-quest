export const IG_URL = "https://www.instagram.com/mr.mallu_gg/";

/** Small beta notice shown at the top of every subject (Computer Science, Maths, Chemistry). */
export default function BetaBanner() {
  return (
    <div role="note" className="px-4 py-2 text-center text-xs text-slate-500">
      Beta · found a bug? DM{" "}
      <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="text-slate-300 underline decoration-white/20 underline-offset-2 hover:text-white">@mr.mallu_gg</a>
    </div>
  );
}
