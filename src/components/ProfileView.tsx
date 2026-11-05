'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState, useTransition } from 'react';
import { AuthForm } from '@/components/AuthForm';
import { OnboardingPlacementModal } from '@/components/OnboardingPlacementModal';
import { useLearningProgress } from '@/context/LearningProgressContext';
import { CURRICULUM_MODULES } from '@/data/curriculum';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { UI_LOCALES, type UILocale } from '@/types/grammar';

const LOCALE_LABELS: Record<UILocale, { flag: string; name: string }> = {
  en: { flag: '🇬🇧', name: 'English' },
  ru: { flag: '🇷🇺', name: 'Русский' },
  tr: { flag: '🇹🇷', name: 'Türkçe' },
};

export function ProfileView() {
  const locale = useLocale() as UILocale;
  const t = useTranslations('profile');
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const {
    state,
    user,
    cloudSyncing,
    isSupabaseReady,
    openPlacementModal,
    resetProgress,
    signOut,
  } = useLearningProgress();

  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const applyTheme = (next: 'light' | 'dark') => {
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    try {
      localStorage.setItem('polski-hub-theme', next);
    } catch {
      // ignore
    }
  };

  const switchLanguage = (nextLocale: UILocale) => {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  const completedList = CURRICULUM_MODULES.filter((m) => Boolean(state.completedModules[m.id]));
  const totalModules = CURRICULUM_MODULES.length;
  const progressPercent = Math.round((completedList.length / totalModules) * 100);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <OnboardingPlacementModal />

      {/* Top Profile Header & Stats */}
      <section className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
        <div className="h-2 bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500" />
        <div className="p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-xl font-extrabold text-white">
                {user ? user.email.slice(0, 2).toUpperCase() : 'PL'}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold text-slate-900">
                    {user ? user.email : t('guestTitle')}
                  </h1>
                  <span className="rounded-full bg-red-50 px-3 py-0.5 text-xs font-extrabold text-red-700 ring-1 ring-red-200">
                    {state.assignedLevel}
                  </span>
                </div>
                <p className="mt-1 text-xs font-medium text-slate-500">
                  {user
                    ? user.provider === 'supabase'
                      ? `☁️ ${t('syncedWithSupabase')}`
                      : `💾 ${t('savedLocallyAccount')}`
                    : t('guestSub')}
                  {cloudSyncing && ' · Syncing...'}
                </p>
              </div>
            </div>

            {user && (
              <button
                type="button"
                onClick={signOut}
                className="rounded-2xl px-4 py-2.5 text-xs font-bold text-slate-600 ring-1 ring-slate-200 transition hover:bg-slate-100 hover:text-rose-600"
              >
                {t('signOutBtn')}
              </button>
            )}
          </div>

          {/* 4 Stat Tiles */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('levelStat')}</p>
              <p className="mt-1 text-2xl font-extrabold text-slate-900">{state.assignedLevel}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('xpStat')}</p>
              <p className="mt-1 text-2xl font-extrabold text-amber-600">⚡ {state.totalXp}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('completedStat')}</p>
              <p className="mt-1 text-2xl font-extrabold text-emerald-600">
                {completedList.length} / {totalModules}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('placementStat')}</p>
              <p className="mt-1 text-2xl font-extrabold text-slate-900">
                {state.placementScore !== null ? `${state.placementScore}%` : '—'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid: Authentication / Cloud Sync + Settings */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column: Auth or Completed Lessons History */}
        <div>
          {!user ? (
            <AuthForm />
          ) : (
            <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">{t('completedModulesTitle')}</h2>
                <span className="text-xs font-bold text-slate-400">{progressPercent}%</span>
              </div>

              {completedList.length === 0 ? (
                <div className="mt-4 rounded-2xl bg-slate-50 p-5 text-center ring-1 ring-slate-200">
                  <p className="text-sm text-slate-600">{t('noModulesCompletedYet')}</p>
                  <Link
                    href="/"
                    className="mt-3 inline-block rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-700"
                  >
                    {t('goToMyPathBtn')} →
                  </Link>
                </div>
              ) : (
                <ul className="mt-4 space-y-2.5">
                  {completedList.map((mod) => {
                    const rec = state.completedModules[mod.id];
                    return (
                      <li key={mod.id}>
                        <Link
                          href={`/learn/${mod.slug}`}
                          className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200 transition hover:bg-slate-100"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="rounded-md bg-slate-900 px-2 py-0.5 text-xs font-bold text-white">
                              {mod.subLevel}
                            </span>
                            <span className="text-sm font-bold text-slate-900">{mod.title[locale]}</span>
                          </div>
                          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-900">
                            ★ {rec.score}%
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          )}
        </div>

        {/* Right Column: Language, Appearance & Learning Settings */}
        <section className="space-y-5 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-bold text-slate-900">⚙️ {t('settingsTitle')}</h2>

          {/* Interface / Native Language Toggle */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {t('nativeLanguageLabel')}
            </p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {UI_LOCALES.map((l) => {
                const active = l === locale;
                return (
                  <button
                    key={l}
                    type="button"
                    disabled={isPending}
                    onClick={() => switchLanguage(l)}
                    className={`flex flex-col items-center gap-1 rounded-2xl px-3 py-3 text-xs font-bold ring-1 transition ${
                      active
                        ? 'bg-slate-900 text-white ring-slate-900'
                        : 'bg-slate-50 text-slate-700 ring-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-lg">{LOCALE_LABELS[l].flag}</span>
                    <span>{LOCALE_LABELS[l].name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Theme Toggle */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {t('appearanceLabel')}
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => applyTheme('light')}
                className={`flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-xs font-bold ring-1 transition ${
                  theme === 'light'
                    ? 'bg-slate-900 text-white ring-slate-900'
                    : 'bg-slate-50 text-slate-700 ring-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>☀️</span>
                <span>{t('lightMode')}</span>
              </button>
              <button
                type="button"
                onClick={() => applyTheme('dark')}
                className={`flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-xs font-bold ring-1 transition ${
                  theme === 'dark'
                    ? 'bg-slate-900 text-white ring-slate-900'
                    : 'bg-slate-50 text-slate-700 ring-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>🌙</span>
                <span>{t('darkMode')}</span>
              </button>
            </div>
          </div>

          {/* Placement Test & Reset Controls */}
          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {t('learningControlsLabel')}
            </p>
            <div className="mt-2.5 flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={openPlacementModal}
                className="rounded-2xl bg-slate-100 px-4 py-2.5 text-xs font-bold text-slate-800 ring-1 ring-slate-200 transition hover:bg-slate-200"
              >
                🎯 {t('retakePlacementBtn')}
              </button>
              <button
                type="button"
                onClick={resetProgress}
                className="rounded-2xl px-4 py-2.5 text-xs font-bold text-rose-600 ring-1 ring-rose-200 transition hover:bg-rose-50"
              >
                {t('resetProgressBtn')}
              </button>
            </div>
          </div>

          {/* Database Connection Status Info */}
          <div className="rounded-2xl bg-slate-50 p-4 text-xs text-slate-500 ring-1 ring-slate-200">
            <p className="font-bold text-slate-700">
              {isSupabaseReady ? `🟢 ${t('dbConnectedTitle')}` : `🟡 ${t('dbLocalFallbackTitle')}`}
            </p>
            <p className="mt-1">{isSupabaseReady ? t('dbConnectedDesc') : t('dbLocalFallbackDesc')}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
