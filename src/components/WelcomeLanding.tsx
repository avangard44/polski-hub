'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState, useTransition } from 'react';
import { useLearningProgress } from '@/context/LearningProgressContext';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { CASE_META, CASE_ORDER } from '@/lib/cases';
import { UI_LOCALES, type UILocale } from '@/types/grammar';

const LOCALE_CARDS: Record<
  UILocale,
  { flag: string; title: string; subtitle: string; badge: string }
> = {
  en: {
    flag: '🇬🇧',
    title: 'English',
    subtitle: 'Explanations & grammar comparisons in English',
    badge: 'EN',
  },
  ru: {
    flag: '🇷🇺',
    title: 'Русский',
    subtitle: 'Объяснения и сравнение с русским языком',
    badge: 'RU',
  },
  tr: {
    flag: '🇹🇷',
    title: 'Türkçe',
    subtitle: 'Türkçe açıklamalar ve dilbilgisi karşılaştırmaları',
    badge: 'TR',
  },
};

function detectPreferredLocale(): UILocale {
  if (typeof window === 'undefined') return 'en';
  const langs = navigator.languages?.length ? navigator.languages : [navigator.language || 'en'];
  for (const raw of langs) {
    const code = raw.toLowerCase();
    if (code.startsWith('ru')) return 'ru';
    if (code.startsWith('tr')) return 'tr';
    if (code.startsWith('en')) return 'en';
  }
  // Any language other than en, ru, tr defaults to English ('en')
  return 'en';
}

export function WelcomeLanding({ onStartComplete }: { onStartComplete?: () => void }) {
  const locale = useLocale() as UILocale;
  const t = useTranslations('welcome');
  const tAuth = useTranslations('auth');
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const {
    user,
    signInWithEmail,
    signInWithGoogle,
    openPlacementModal,
    isSupabaseReady,
  } = useLearningProgress();

  const [isStartModalOpen, setIsStartModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signup' | 'login'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-detect browser language on very first visit:
  // If browser is Russian -> 'ru', Turkish -> 'tr', any other language -> 'en'.
  useEffect(() => {
    try {
      const alreadyChosen = localStorage.getItem('polski-hub-locale-chosen');
      if (!alreadyChosen) {
        const detected = detectPreferredLocale();
        localStorage.setItem('polski-hub-locale-chosen', detected);
        if (detected !== locale) {
          startTransition(() => {
            router.replace(pathname, { locale: detected });
          });
        }
      }
    } catch {
      // ignore storage errors
    }
  }, [locale, pathname, router]);

  const handleSelectLanguage = (nextLocale: UILocale) => {
    try {
      localStorage.setItem('polski-hub-locale-chosen', nextLocale);
    } catch {
      // ignore
    }
    if (nextLocale !== locale) {
      startTransition(() => {
        router.replace(pathname, { locale: nextLocale });
      });
    }
  };

  const finishStartAndLaunchPlacement = () => {
    setIsStartModalOpen(false);
    onStartComplete?.();
    openPlacementModal();
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await signInWithEmail(email, password, authMode);
      if (res.error) {
        setError(res.error);
      } else {
        finishStartAndLaunchPlacement();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await signInWithGoogle();
      if (res.error) {
        setError(res.error);
      } else {
        finishStartAndLaunchPlacement();
      }
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: '🗺️',
      accent: 'from-red-500 to-amber-500',
      title: t('features.roadmapTitle'),
      desc: t('features.roadmapDesc'),
    },
    {
      icon: '📐',
      accent: 'from-amber-400 to-rose-500',
      title: t('features.casesTitle'),
      desc: t('features.casesDesc'),
    },
    {
      icon: '⚡',
      accent: 'from-violet-500 to-indigo-500',
      title: t('features.verbsTitle'),
      desc: t('features.verbsDesc'),
    },
    {
      icon: '☁️',
      accent: 'from-emerald-400 to-teal-500',
      title: t('features.syncTitle'),
      desc: t('features.syncDesc'),
    },
  ];

  const steps = [
    { num: '1', title: t('steps.s1Title'), desc: t('steps.s1Desc') },
    { num: '2', title: t('steps.s2Title'), desc: t('steps.s2Desc') },
    { num: '3', title: t('steps.s3Title'), desc: t('steps.s3Desc') },
  ];

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* HERO SECTION: About Polski Hub + Primary "Start" Button */}
      <section className="relative overflow-hidden rounded-3xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-200 sm:p-12">
        <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-red-600 via-amber-500 to-emerald-500" />

        <div className="mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-red-700 ring-1 ring-red-200">
            <span>🇵🇱 Polski Hub</span>
            <span>·</span>
            <span>A1 → B2</span>
          </span>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            {t('heroTitle')}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {t('heroSubtitle')}
          </p>

          {/* 7 Color-coded Polish Case Pills */}
          <div className="mt-6 flex flex-wrap justify-center gap-1.5 sm:gap-2" aria-hidden>
            {CASE_ORDER.map((c) => (
              <span
                key={c}
                className={`rounded-full px-3 py-1 text-xs font-bold ${CASE_META[c].ui.badge}`}
              >
                {CASE_META[c].pl} · {CASE_META[c].names[locale]}
              </span>
            ))}
          </div>

          {/* Primary "Начать / Get Started" CTA */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setIsStartModalOpen(true)}
              className="w-full rounded-2xl bg-red-600 px-8 py-4 text-base font-extrabold text-white shadow-lg shadow-red-600/20 transition hover:-translate-y-0.5 hover:bg-red-700 sm:w-auto sm:text-lg"
            >
              🚀 {t('startBtn')} →
            </button>

            <Link
              href="/library"
              className="w-full rounded-2xl bg-slate-100 px-6 py-4 text-sm font-bold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-200 sm:w-auto"
            >
              📚 {t('exploreLibraryBtn')}
            </Link>
          </div>

          <p className="mt-3 text-xs font-medium text-slate-400">
            {t('autoLangHint', { lang: LOCALE_CARDS[locale].title })}
          </p>
        </div>
      </section>

      {/* HOW IT WORKS (3 STEPS) */}
      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
        <div className="text-center">
          <span className="text-xs font-extrabold uppercase tracking-wider text-red-600">
            {t('howItWorksBadge')}
          </span>
          <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
            {t('howItWorksTitle')}
          </h2>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {steps.map((st) => (
            <div
              key={st.num}
              className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-base font-extrabold text-white">
                {st.num}
              </div>
              <h3 className="mt-3.5 text-base font-bold text-slate-900 sm:text-lg">
                {st.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                {st.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4 PLATFORM PILLARS */}
      <section>
        <h2 className="mb-4 text-center text-2xl font-bold text-slate-900 sm:text-3xl">
          {t('whatInsideTitle')}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200"
            >
              <div className={`h-1.5 bg-gradient-to-r ${f.accent}`} />
              <div className="p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                    {f.icon}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">{f.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CALL TO ACTION */}
      <section className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-7 text-center text-white shadow-md sm:p-10">
        <h2 className="text-2xl font-extrabold sm:text-3xl">{t('bottomCtaTitle')}</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-slate-300 sm:text-base">
          {t('bottomCtaSub')}
        </p>
        <button
          type="button"
          onClick={() => setIsStartModalOpen(true)}
          className="mt-6 rounded-2xl bg-red-600 px-8 py-4 text-base font-extrabold text-white shadow-lg transition hover:bg-red-500"
        >
          🚀 {t('startBtn')} →
        </button>
      </section>

      {/* ==================== START MODAL: 1. CHOOSE LANGUAGE + 2. AUTHORIZATION ==================== */}
      {isStartModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-3 backdrop-blur-sm sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="start-modal-title"
        >
          <div className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl ring-1 ring-slate-200 sm:p-7">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-700 ring-1 ring-red-200">
                  🇵🇱 Polski Hub · {t('setupBadge')}
                </span>
                <h2 id="start-modal-title" className="mt-2 text-xl font-extrabold text-slate-900 sm:text-2xl">
                  {t('modalTitle')}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsStartModalOpen(false)}
                aria-label="Close"
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            {/* STEP 1: CHOOSE LEARNING / EXPLANATION LANGUAGE */}
            <div className="mt-5">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500">
                1. {t('chooseLangTitle')}
              </label>
              <p className="mt-0.5 text-xs text-slate-500">{t('chooseLangSub')}</p>

              <div className="mt-3 grid grid-cols-3 gap-2.5">
                {UI_LOCALES.map((l) => {
                  const card = LOCALE_CARDS[l];
                  const active = l === locale;
                  return (
                    <button
                      key={l}
                      type="button"
                      disabled={isPending}
                      onClick={() => handleSelectLanguage(l)}
                      className={`flex flex-col items-center rounded-2xl p-3 text-center ring-1 transition ${
                        active
                          ? 'bg-slate-900 text-white ring-2 ring-slate-900 shadow-sm'
                          : 'bg-slate-50 text-slate-800 ring-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-2xl">{card.flag}</span>
                      <span className="mt-1 text-sm font-extrabold">{card.title}</span>
                      <span
                        className={`mt-0.5 line-clamp-2 text-[11px] ${
                          active ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        {card.subtitle}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: AUTHORIZATION (SIGN UP / LOG IN) */}
            <div className="mt-6 border-t border-slate-200 pt-5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500">
                  2. {t('authStepTitle')}
                </label>
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800 ring-1 ring-emerald-200">
                  {isSupabaseReady ? `☁️ ${tAuth('cloudBadge')}` : `💾 ${tAuth('localSyncBadge')}`}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-slate-500">{t('authStepSub')}</p>

              {user ? (
                <div className="mt-4 rounded-2xl bg-emerald-50 p-4 ring-1 ring-emerald-200">
                  <p className="text-sm font-bold text-emerald-950">
                    ✓ {t('alreadySignedInAs', { email: user.email })}
                  </p>
                  <button
                    type="button"
                    onClick={finishStartAndLaunchPlacement}
                    className="mt-3 w-full rounded-2xl bg-red-600 px-5 py-3.5 text-sm font-extrabold text-white shadow-sm transition hover:bg-red-700"
                  >
                    {t('continueToPlacementBtn')} →
                  </button>
                </div>
              ) : (
                <>
                  {/* Mode Switcher: Sign Up / Log In */}
                  <div className="mt-3 grid grid-cols-2 rounded-2xl bg-slate-100 p-1 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('signup');
                        setError(null);
                      }}
                      className={`rounded-xl py-2 transition ${
                        authMode === 'signup'
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      {tAuth('signupTab')}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('login');
                        setError(null);
                      }}
                      className={`rounded-xl py-2 transition ${
                        authMode === 'login'
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      {tAuth('loginTab')}
                    </button>
                  </div>

                  {/* Google OAuth Button */}
                  <button
                    type="button"
                    disabled={loading}
                    onClick={handleGoogleAuth}
                    className="mt-3.5 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-slate-800 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50 disabled:opacity-50"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                      <path
                        fill="#EA4335"
                        d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.8C6.2 7.2 8.9 5 12 5z"
                      />
                      <path
                        fill="#4285F4"
                        d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.6l3.7 2.9c2.2-2 3.7-5 3.7-8.7z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.3 14.8c-.2-.8-.4-1.8-.4-2.8s.2-2 .4-2.8L1.6 6.4C.6 8.3 0 10.1 0 12s.6 3.7 1.6 5.6l3.7-2.8z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.1-6.7-5l-3.7 2.8C3.5 20.4 7.4 23 12 23z"
                      />
                    </svg>
                    <span>{tAuth('googleBtn')}</span>
                  </button>

                  <div className="my-3 flex items-center gap-3 text-xs text-slate-400">
                    <div className="h-px flex-1 bg-slate-200" />
                    <span>{tAuth('orEmail')}</span>
                    <div className="h-px flex-1 bg-slate-200" />
                  </div>

                  <form onSubmit={handleEmailAuth} className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-600">
                        {tAuth('emailLabel')}
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="anna@example.com"
                        className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600">
                        {tAuth('passwordLabel')}
                      </label>
                      <input
                        type="password"
                        required
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100"
                      />
                    </div>

                    {error && (
                      <p className="rounded-xl bg-rose-50 px-3.5 py-2 text-xs font-semibold text-rose-800 ring-1 ring-rose-200">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-2xl bg-red-600 px-5 py-3.5 text-sm font-extrabold text-white shadow-md transition hover:bg-red-700 disabled:opacity-50"
                    >
                      {loading
                        ? '...'
                        : authMode === 'signup'
                          ? `${tAuth('signupSubmit')} & ${t('startLearningShort')} →`
                          : `${tAuth('loginSubmit')} & ${t('startLearningShort')} →`}
                    </button>
                  </form>

                  {/* Guest Option */}
                  <div className="mt-3 text-center">
                    <button
                      type="button"
                      onClick={finishStartAndLaunchPlacement}
                      className="text-xs font-semibold text-slate-500 underline-offset-2 hover:text-slate-900 hover:underline"
                    >
                      {t('continueAsGuestBtn')} →
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
