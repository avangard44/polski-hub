'use client';

import { useTranslations } from 'next-intl';
import { useLearningProgress } from '@/context/LearningProgressContext';
import { Link, usePathname } from '@/i18n/navigation';

export function DesktopNav() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const { state, user, hydrated } = useLearningProgress();

  const isMyPathActive = pathname === '/' || pathname.startsWith('/learn');
  const isLibraryActive =
    pathname.startsWith('/library') ||
    pathname.startsWith('/cases') ||
    pathname.startsWith('/verbs') ||
    pathname.startsWith('/vocabulary');
  const isProfileActive = pathname.startsWith('/profile') || pathname.startsWith('/auth');

  return (
    <nav aria-label="Main navigation" className="hidden items-center gap-1.5 text-sm sm:flex">
      {/* 1. Home / My Path (Primary Focus) */}
      <Link
        href="/"
        className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 font-bold transition ${
          isMyPathActive
            ? 'bg-red-600 text-white shadow-sm'
            : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
        }`}
      >
        <span>🗺️</span>
        <span>{t('myPath')}</span>
      </Link>

      {/* 2. Reference Library (Cases, Verbs, Vocabulary) */}
      <Link
        href="/library"
        className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 font-bold transition ${
          isLibraryActive
            ? 'bg-slate-900 text-white shadow-sm'
            : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
        }`}
      >
        <span>📚</span>
        <span>{t('library')}</span>
      </Link>

      {/* 3. Profile & User Stats */}
      <Link
        href="/profile"
        className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 font-bold transition ${
          isProfileActive
            ? 'bg-slate-900 text-white shadow-sm'
            : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
        }`}
      >
        <span>👤</span>
        <span>{user ? user.email.split('@')[0] : t('profile')}</span>
        {hydrated && (
          <span
            className={`rounded-md px-1.5 py-0.5 text-[11px] font-extrabold ${
              isProfileActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-800'
            }`}
          >
            {state.assignedLevel} · ⚡{state.totalXp}
          </span>
        )}
      </Link>
    </nav>
  );
}
