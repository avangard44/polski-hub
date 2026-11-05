'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useRef, useState, useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

const LABELS: Record<(typeof routing.locales)[number], { name: string; badge: string }> = {
  en: { name: 'English', badge: 'EN' },
  ru: { name: 'Русский', badge: 'RU' },
  tr: { name: 'Türkçe', badge: 'TR' },
};

type Theme = 'light' | 'dark';

/**
 * Top-right menu button that lets the user switch between Light/Dark theme
 * and change the interface language (EN / RU / TR).
 */
export function LocaleSwitcher() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>('light');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('polski-hub-theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial: Theme = saved ?? (prefersDark ? 'dark' : 'light');
    setTheme(initial);
    document.documentElement.classList.toggle('dark', initial === 'dark');
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const applyTheme = (next: Theme) => {
    setTheme(next);
    localStorage.setItem('polski-hub-theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  const selectLocale = (nextLocale: (typeof routing.locales)[number]) => {
    setOpen(false);
    try {
      localStorage.setItem('polski-hub-locale-chosen', nextLocale);
    } catch {
      // ignore
    }
    startTransition(() => router.replace(pathname, { locale: nextLocale }));
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={t('settings')}
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex items-center gap-2 rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-semibold text-slate-800 ring-1 ring-slate-200 transition hover:bg-slate-200/70 ${
          pending ? 'opacity-60' : ''
        }`}
      >
        {theme === 'dark' ? (
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-amber-400" fill="currentColor" aria-hidden>
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" strokeLinecap="round" />
          </svg>
        )}
        <span className="uppercase">{locale}</span>
        <svg
          viewBox="0 0 20 20"
          className={`h-3.5 w-3.5 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="currentColor"
          aria-hidden
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={t('settings')}
          className="absolute right-0 z-50 mt-2 w-64 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-slate-200"
        >
          {/* ---- Theme switcher ---- */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{t('theme')}</p>
            <div role="radiogroup" aria-label={t('theme')} className="mt-2 grid grid-cols-2 gap-1.5 rounded-xl bg-slate-100 p-1">
              <button
                type="button"
                role="radio"
                aria-checked={theme === 'light'}
                onClick={() => applyTheme('light')}
                className={`flex items-center justify-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition ${
                  theme === 'light' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" strokeLinecap="round" />
                </svg>
                {t('light')}
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={theme === 'dark'}
                onClick={() => applyTheme('dark')}
                className={`flex items-center justify-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition ${
                  theme === 'dark' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-amber-400" fill="currentColor" aria-hidden>
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
                {t('dark')}
              </button>
            </div>
          </div>

          {/* ---- Language switcher ---- */}
          <div className="mt-4 border-t border-slate-100 pt-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{t('language')}</p>
            <div role="radiogroup" aria-label={t('language')} className="mt-2 space-y-1">
              {routing.locales.map((l) => {
                const active = l === locale;
                return (
                  <button
                    key={l}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => selectLocale(l)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-medium transition ${
                      active ? 'bg-slate-900 text-white font-semibold' : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{LABELS[l].name}</span>
                    <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      {LABELS[l].badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
