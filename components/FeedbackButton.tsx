const IG_URL = "https://www.instagram.com/mr.mallu_gg/";

export default function FeedbackButton() {
  return (
    <a
      href={IG_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-3 top-12 z-40 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#0d1224]/90 px-3 py-1.5 text-xs font-medium text-slate-300 backdrop-blur hover:border-cyan-300/60 hover:text-cyan-200"
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
      </svg>
      Feedback
    </a>
  );
}
