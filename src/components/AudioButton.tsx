'use client';

/**
 * Audio pronunciation placeholder.
 * Uses a recorded file when `src` is provided; otherwise falls back to the
 * browser's speech synthesis with a Polish voice (pl-PL) so the feature works
 * before any audio has been recorded.
 */
export function AudioButton({ text, src, label, size = 'md' }: { text: string; src?: string; label: string; size?: 'sm' | 'md' }) {
  const play = () => {
    if (src) {
      void new Audio(src).play();
      return;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pl-PL';
      utterance.rate = 0.9;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  const dims = size === 'sm' ? 'h-7 w-7' : 'h-10 w-10';

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        play();
      }}
      aria-label={`${label}: ${text}`}
      title={label}
      className={`${dims} inline-flex shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-red-50 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-red-500`}
    >
      <svg viewBox="0 0 24 24" className="h-1/2 w-1/2" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M11 5 6 9H2v6h4l5 4V5z" />
        <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" strokeLinecap="round" />
      </svg>
    </button>
  );
}
