'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { useLearningProgress } from '@/context/LearningProgressContext';
import { CEFR_LEVEL_META, CURRICULUM_MODULES } from '@/data/curriculum';
import { Link } from '@/i18n/navigation';
import { CASE_META } from '@/lib/cases';
import type { CurriculumCEFR, ModuleCategory } from '@/types/curriculum';
import type { UILocale } from '@/types/grammar';
import { OnboardingPlacementModal } from './OnboardingPlacementModal';
import { WelcomeLanding } from './WelcomeLanding';

const CEFR_ORDER: CurriculumCEFR[] = ['A1', 'A2', 'B1', 'B2'];

const CATEGORY_STYLE: Record<ModuleCategory, { icon: string; badge: string }> = {
  grammar: {
    icon: '📐',
    badge: 'bg-indigo-50 text-indigo-900 ring-indigo-200',
  },
  vocabulary: {
    icon: '🗂️',
    badge: 'bg-emerald-50 text-emerald-900 ring-emerald-200',
  },
  reading: {
    icon: '📖',
    badge: 'bg-amber-50 text-amber-900 ring-amber-200',
  },
};

export function LearningRoadmap() {
  const locale = useLocale() as UILocale;
  const t = useTranslations('roadmap');
  const {
    state,
    hydrated,
    user,
    getModuleStatus,
    activeModule,
    openPlacementModal,
    resetProgress,
  } = useLearningProgress();

  const [selectedCefr, setSelectedCefr] = useState<CurriculumCEFR | 'ALL'>('ALL');
  const [hasDismissedWelcome, setHasDismissedWelcome] = useState(false);
  const [showAboutView, setShowAboutView] = useState(false);

  const totalModules = CURRICULUM_MODULES.length;
  const completedCount = Object.keys(state.completedModules).length;
  const overallProgressPercent = Math.round((completedCount / totalModules) * 100);

  const visibleLevels = selectedCefr === 'ALL' ? CEFR_ORDER : [selectedCefr];

  const shouldShowWelcome =
    showAboutView || (hydrated && !user && !state.hasCompletedOnboarding && !hasDismissedWelcome);

  if (shouldShowWelcome) {
    return (
      <>
        <OnboardingPlacementModal />
        <WelcomeLanding
          onStartComplete={() => {
            setHasDismissedWelcome(true);
            setShowAboutView(false);
          }}
        />
      </>
    );
  }

  return (
    <div>
      <OnboardingPlacementModal />

      {/* Top Hero & Progress Dashboard */}
      <section className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
        <div className="h-2 bg-gradient-to-r from-emerald-500 via-amber-500 to-violet-600" />
        <div className="p-5 sm:p-7">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-700 ring-1 ring-red-200">
                  A1 → B2 · {t('pathBadge')}
                </span>
                {hydrated && (
                  <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white">
                    {t('yourLevel')}: {state.assignedLevel}
                  </span>
                )}
              </div>
              <h1 className="mt-2.5 text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {t('title')}
              </h1>
              <p className="mt-1.5 max-w-2xl text-sm text-slate-600 sm:text-base">
                {t('subtitle')}
              </p>
            </div>

            {/* Stats & Placement Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => setShowAboutView(true)}
                className="inline-flex items-center gap-1.5 rounded-2xl bg-white px-3.5 py-2.5 text-xs font-bold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-50 sm:text-sm"
              >
                <span>ℹ️</span>
                <span>{t('aboutSiteBtn')}</span>
              </button>

              <button
                type="button"
                onClick={openPlacementModal}
                className="inline-flex items-center gap-1.5 rounded-2xl bg-slate-100 px-4 py-2.5 text-xs font-bold text-slate-800 ring-1 ring-slate-200 transition hover:bg-slate-200 sm:text-sm"
              >
                <span>🎯</span>
                <span>{state.hasCompletedOnboarding ? t('retakePlacementBtn') : t('takePlacementBtn')}</span>
              </button>

              {completedCount > 0 && (
                <button
                  type="button"
                  onClick={resetProgress}
                  className="rounded-2xl px-3 py-2.5 text-xs font-semibold text-slate-400 ring-1 ring-slate-200 transition hover:text-rose-600"
                >
                  {t('resetBtn')}
                </button>
              )}
            </div>
          </div>

          {/* Progress Bar + Stats Strip */}
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                <span>{t('overallProgress')}</span>
                <span className="text-slate-900">{overallProgressPercent}%</span>
              </div>
              <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-red-600 transition-all duration-500"
                  style={{ width: `${overallProgressPercent}%` }}
                />
              </div>
              <p className="mt-2 text-xs font-medium text-slate-500">
                {t('completedCountLabel', { completed: completedCount, total: totalModules })}
              </p>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('xpLabel')}</p>
                <p className="mt-1 text-2xl font-extrabold text-slate-900">⚡ {state.totalXp} XP</p>
                <p className="mt-0.5 text-xs text-slate-500">
                  {state.placementScore !== null
                    ? t('placementScoreTag', { score: state.placementScore })
                    : t('noPlacementYet')}
                </p>
              </div>
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-xl ring-1 ring-amber-200">
                🏆
              </span>
            </div>

            {/* Next Recommended Lesson Card */}
            <div className="flex flex-col justify-between rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-4 text-white shadow-sm">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                    {t('upNextLabel')} · {activeModule.subLevel}
                  </span>
                  <span className="text-xs text-slate-300">+{activeModule.xpReward} XP</span>
                </div>
                <p className="mt-1 line-clamp-1 text-sm font-bold">{activeModule.title[locale]}</p>
              </div>
              <Link
                href={`/learn/${activeModule.slug}`}
                className="mt-3 inline-flex items-center justify-center rounded-xl bg-red-600 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-red-500"
              >
                {t('continueBtn')} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CEFR Filter Strip */}
      <div className="-mx-3 mt-5 flex gap-2 overflow-x-auto px-3 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
        <button
          type="button"
          onClick={() => setSelectedCefr('ALL')}
          className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-bold ring-1 transition ${
            selectedCefr === 'ALL'
              ? 'bg-slate-900 text-white ring-slate-900'
              : 'bg-white text-slate-600 ring-slate-200 hover:ring-slate-400'
          }`}
        >
          {t('allLevels')} (A1–B2)
        </button>
        {CEFR_ORDER.map((cefr) => {
          const levelModules = CURRICULUM_MODULES.filter((m) => m.cefr === cefr);
          const levelCompleted = levelModules.filter((m) => Boolean(state.completedModules[m.id])).length;
          const active = selectedCefr === cefr;
          return (
            <button
              key={cefr}
              type="button"
              onClick={() => setSelectedCefr(cefr)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold ring-1 transition ${
                active
                  ? 'bg-slate-900 text-white ring-slate-900'
                  : 'bg-white text-slate-700 ring-slate-200 hover:ring-slate-400'
              }`}
            >
              <span>{cefr}</span>
              <span className="rounded-full bg-slate-200/75 px-2 py-0.5 text-xs text-slate-800">
                {levelCompleted}/{levelModules.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Sequential Learning Path by CEFR Level */}
      <div className="mt-6 space-y-8">
        {visibleLevels.map((cefr) => {
          const meta = CEFR_LEVEL_META[cefr];
          const modules = CURRICULUM_MODULES.filter((m) => m.cefr === cefr);
          const doneInLevel = modules.filter((m) => Boolean(state.completedModules[m.id])).length;

          return (
            <section
              key={cefr}
              className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200"
            >
              <div className={`h-2 bg-gradient-to-r ${meta.accentGradient}`} />
              <div className="border-b border-slate-100 p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className={`rounded-xl px-3 py-1 text-sm font-extrabold ring-1 ${meta.badgeClass}`}>
                      {cefr}
                    </span>
                    <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                      {meta.title[locale]}
                    </h2>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                    {doneInLevel} / {modules.length} {t('modulesDoneShort')}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{meta.description[locale]}</p>
              </div>

              {/* Connected Vertical Path Nodes */}
              <div className="p-4 sm:p-6">
                <ol className="relative space-y-4 before:absolute before:bottom-6 before:left-5 before:top-6 before:w-0.5 before:bg-slate-200 sm:before:left-6">
                  {modules.map((mod) => {
                    const status = getModuleStatus(mod);
                    const isCurrent = activeModule.id === mod.id && status === 'unlocked';
                    const record = state.completedModules[mod.id];
                    const cat = CATEGORY_STYLE[mod.category];

                    return (
                      <li key={mod.id} className="relative flex items-stretch gap-3 sm:gap-5">
                        {/* Step Node Circle */}
                        <div className="relative z-10 flex flex-col items-center pt-3">
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-sm font-extrabold shadow-sm ring-2 transition sm:h-12 sm:w-12 sm:text-base ${
                              status === 'completed'
                                ? 'bg-emerald-600 text-white ring-emerald-200'
                                : isCurrent
                                  ? 'bg-red-600 text-white ring-4 ring-red-200'
                                  : status === 'unlocked'
                                    ? 'bg-white text-slate-900 ring-slate-300'
                                    : 'bg-slate-100 text-slate-400 ring-slate-200'
                            }`}
                          >
                            {status === 'completed' ? '✓' : status === 'locked' ? '🔒' : mod.order}
                          </div>
                        </div>

                        {/* Module Card */}
                        <div
                          className={`flex-1 rounded-2xl p-4 ring-1 transition sm:p-5 ${
                            status === 'completed'
                              ? 'bg-emerald-50/40 ring-emerald-200 hover:shadow-sm'
                              : isCurrent
                                ? 'bg-white shadow-md ring-2 ring-red-500'
                                : status === 'unlocked'
                                  ? 'bg-white ring-slate-200 hover:ring-slate-300 hover:shadow-sm'
                                  : 'bg-slate-50/75 opacity-75 ring-slate-200'
                          }`}
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="rounded-md bg-slate-900 px-2 py-0.5 text-xs font-bold text-white">
                                {mod.subLevel}
                              </span>
                              <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${cat.badge}`}>
                                <span aria-hidden>{cat.icon}</span>
                                <span>{t(`categories.${mod.category}`)}</span>
                              </span>
                              {mod.relatedCase && (
                                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${CASE_META[mod.relatedCase].ui.badge}`}>
                                  {CASE_META[mod.relatedCase].pl}
                                </span>
                              )}
                              {isCurrent && (
                                <span className="rounded-full bg-red-600 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white">
                                  {t('currentTag')}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                              <span>⏱ {mod.estimatedMinutes} min</span>
                              <span>·</span>
                              <span className="text-amber-600">+{mod.xpReward} XP</span>
                              {record && (
                                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-900 ring-1 ring-emerald-300">
                                  ★ {record.score}%
                                </span>
                              )}
                            </div>
                          </div>

                          <h3 className="mt-2 text-base font-bold text-slate-900 sm:text-lg">
                            {mod.title[locale]}
                          </h3>
                          <p className="mt-1 text-sm text-slate-600">{mod.subtitle[locale]}</p>

                          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                            {status === 'locked' ? (
                              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                                <span>🔒</span>
                                <span>{t('lockedHint')}</span>
                              </span>
                            ) : (
                              <Link
                                href={`/learn/${mod.slug}`}
                                className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition sm:text-sm ${
                                  status === 'completed'
                                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                    : isCurrent
                                      ? 'bg-red-600 text-white shadow-sm hover:bg-red-700'
                                      : 'bg-slate-900 text-white hover:bg-slate-800'
                                }`}
                              >
                                <span>
                                  {status === 'completed'
                                    ? t('reviewLessonBtn')
                                    : isCurrent
                                      ? t('startCurrentLessonBtn')
                                      : t('startLessonBtn')}
                                </span>
                                <span>→</span>
                              </Link>
                            )}

                            {/* Optional Quick Reference Links */}
                            {status !== 'locked' && (mod.relatedCase || mod.relatedVerbSlug) && (
                              <div className="flex flex-wrap gap-2 text-xs font-semibold">
                                {mod.relatedCase && (
                                  <Link
                                    href={`/cases?case=${mod.relatedCase}`}
                                    className="text-slate-500 hover:text-slate-900 hover:underline"
                                  >
                                    {CASE_META[mod.relatedCase].pl} {t('grammarRefLink')} ↗
                                  </Link>
                                )}
                                {mod.relatedVerbSlug && (
                                  <Link
                                    href={`/verbs/${mod.relatedVerbSlug}`}
                                    className="text-slate-500 hover:text-slate-900 hover:underline"
                                  >
                                    {t('verbRefLink')} ↗
                                  </Link>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
