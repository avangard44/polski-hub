'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { AudioButton } from '@/components/AudioButton';
import { useLearningProgress } from '@/context/LearningProgressContext';
import { CURRICULUM_MODULES } from '@/data/curriculum';
import { Link } from '@/i18n/navigation';
import { CASE_META } from '@/lib/cases';
import type { CurriculumModule } from '@/types/curriculum';
import type { UILocale } from '@/types/grammar';

type LessonStep = 'theory' | 'practice' | 'completion';

export function LessonPlayer({ module }: { module: CurriculumModule }) {
  const locale = useLocale() as UILocale;
  const t = useTranslations('lesson');
  const { completeModule, getModuleStatus } = useLearningProgress();

  const [step, setStep] = useState<LessonStep>('theory');
  const [exIndex, setExIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showTranslation, setShowTranslation] = useState(true);

  const exercises = module.exercises;
  const currentEx = exercises[exIndex];
  const nextModule = CURRICULUM_MODULES.find((m) => m.order === module.order + 1);
  const status = getModuleStatus(module);

  const handleCheck = () => {
    if (selectedOpt === null) return;
    setChecked(true);
    if (selectedOpt === currentEx.correctIndex) {
      setCorrectAnswers((c) => c + 1);
    }
  };

  const handleNextExercise = () => {
    if (exIndex + 1 < exercises.length) {
      setExIndex((i) => i + 1);
      setSelectedOpt(null);
      setChecked(false);
    } else {
      const finalScore = Math.round((correctAnswers / exercises.length) * 100);
      completeModule(module.id, finalScore, module.xpReward);
      setStep('completion');
    }
  };

  const handleRetryPractice = () => {
    setExIndex(0);
    setSelectedOpt(null);
    setChecked(false);
    setCorrectAnswers(0);
    setStep('practice');
  };

  const finalScorePercent = Math.round((correctAnswers / exercises.length) * 100);

  return (
    <div className="mx-auto max-w-4xl">
      {/* Breadcrumb & Stage Stepper */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/learn"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-900"
        >
          <span>←</span>
          <span>{t('backToRoadmap')}</span>
        </Link>

        {/* 3-Step Pill Indicator */}
        <div className="inline-flex rounded-xl bg-slate-200/75 p-1 text-xs font-bold">
          <button
            type="button"
            onClick={() => setStep('theory')}
            className={`rounded-lg px-3 py-1.5 transition ${
              step === 'theory' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            1. {t('stepTheory')}
          </button>
          <button
            type="button"
            onClick={() => setStep('practice')}
            className={`rounded-lg px-3 py-1.5 transition ${
              step === 'practice' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            2. {t('stepPractice')} ({exercises.length})
          </button>
          <span
            className={`rounded-lg px-3 py-1.5 ${
              step === 'completion' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'
            }`}
          >
            3. {t('stepCompletion')}
          </span>
        </div>
      </div>

      {/* Lesson Header Card */}
      <header className="mt-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-lg bg-slate-900 px-2.5 py-1 text-xs font-bold text-white">
              {module.subLevel}
            </span>
            {module.relatedCase && (
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${CASE_META[module.relatedCase].ui.badge}`}>
                {CASE_META[module.relatedCase].pl} · {CASE_META[module.relatedCase].names[locale]}
              </span>
            )}
            <span className="text-xs font-semibold text-amber-600">+{module.xpReward} XP</span>
          </div>
          {status === 'completed' && (
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-900 ring-1 ring-emerald-300">
              ✓ {t('completedBadge')}
            </span>
          )}
        </div>
        <h1 className="mt-2.5 text-2xl font-bold text-slate-900 sm:text-3xl">{module.title[locale]}</h1>
        <p className="mt-1 text-sm text-slate-600 sm:text-base">{module.subtitle[locale]}</p>
      </header>

      {/* ==================== STEP 1: THEORY & READING ==================== */}
      {step === 'theory' && (
        <div className="mt-5 space-y-5">
          {module.theory.map((sec) => (
            <section
              key={sec.id}
              className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6"
            >
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl">{sec.heading[locale]}</h2>
              <p className="mt-2.5 leading-relaxed text-slate-700">{sec.body[locale]}</p>

              {/* Native L1 Comparison Callout */}
              <div className="mt-4 rounded-2xl bg-amber-50 p-4 text-sm text-amber-950 ring-1 ring-amber-200">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  💡 {t('l1TipTitle')}
                </p>
                <p className="mt-1 font-medium">{sec.l1Tip[locale]}</p>
              </div>

              {/* Examples */}
              <div className="mt-4 space-y-2.5">
                {sec.examples.map((ex, i) => (
                  <div
                    key={i}
                    className="flex flex-col justify-between gap-2 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 sm:flex-row sm:items-center"
                  >
                    <div>
                      <p lang="pl" className="text-base font-bold text-slate-900">
                        {ex.pl}
                      </p>
                      <p className="mt-0.5 text-sm text-slate-600">{ex.translation[locale]}</p>
                    </div>
                    <AudioButton text={ex.pl} label={t('listen')} />
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Optional Reading Comprehension Passage */}
          {module.reading && (
            <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-red-600">
                    📖 {t('readingSectionBadge')}
                  </span>
                  <h2 className="mt-1 text-lg font-bold text-slate-900 sm:text-xl">
                    {module.reading.title[locale]}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setShowTranslation((v) => !v)}
                  className="rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-200"
                >
                  {showTranslation ? t('hideTranslation') : t('showTranslation')}
                </button>
              </div>

              <div className="mt-4 space-y-3">
                {module.reading.plParagraphs.map((para, idx) => (
                  <div key={idx} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                    <div className="flex items-start justify-between gap-3">
                      <p lang="pl" className="text-base font-semibold leading-relaxed text-slate-900">
                        {para}
                      </p>
                      <AudioButton text={para} label={t('listen')} />
                    </div>
                    {showTranslation && (
                      <p className="mt-2 border-t border-slate-200/80 pt-2 text-sm text-slate-600">
                        {module.reading?.translationParagraphs[locale][idx]}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Key Phrases from Reading */}
              <div className="mt-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {t('keyExpressions')}
                </h3>
                <div className="mt-2 grid gap-2 sm:grid-cols-3">
                  {module.reading.keyPhrases.map((kp, i) => (
                    <div key={i} className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200">
                      <p lang="pl" className="font-bold text-red-600">
                        {kp.pl}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-600">{kp.translation[locale]}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Deep Reference Shortcuts + Start Practice CTA */}
          <div className="flex flex-col items-stretch justify-between gap-3 rounded-3xl bg-slate-900 p-5 text-white sm:flex-row sm:items-center sm:p-6">
            <div>
              <p className="text-base font-bold">{t('readyForPracticeTitle')}</p>
              <p className="text-xs text-slate-300">
                {t('readyForPracticeSub', { count: exercises.length })}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setStep('practice')}
              className="rounded-2xl bg-red-600 px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-red-500"
            >
              {t('startPracticeBtn')} →
            </button>
          </div>
        </div>
      )}

      {/* ==================== STEP 2: INTERACTIVE PRACTICE ==================== */}
      {step === 'practice' && currentEx && (
        <section className="mt-5 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-7">
          {/* Exercise Progress Bar */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>
              {t('exerciseProgress', { current: exIndex + 1, total: exercises.length })}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700 ring-1 ring-slate-200">
              {t(`exerciseTypes.${currentEx.type}`)}
            </span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-red-500 to-emerald-500 transition-all"
              style={{ width: `${((exIndex + 1) / exercises.length) * 100}%` }}
            />
          </div>

          {/* Prompt & Fill-in Sentence */}
          <div className="mt-6">
            <p className="text-base font-bold text-slate-900 sm:text-lg">{currentEx.prompt[locale]}</p>

            {currentEx.sentencePl && (
              <div className="mt-3 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <p lang="pl" className="text-lg font-extrabold text-slate-900 sm:text-xl">
                  {selectedOpt !== null
                    ? currentEx.sentencePl.replace('___', `[${currentEx.options[selectedOpt]}]`)
                    : currentEx.sentencePl}
                </p>
                {currentEx.sentenceTranslation && (
                  <p className="mt-1 text-sm text-slate-500">{currentEx.sentenceTranslation[locale]}</p>
                )}
              </div>
            )}

            {/* Answer Options */}
            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {currentEx.options.map((opt, idx) => {
                const isSelected = selectedOpt === idx;
                const isCorrect = idx === currentEx.correctIndex;

                let style = 'bg-white text-slate-800 ring-slate-200 hover:ring-slate-400';
                if (checked) {
                  if (isCorrect) {
                    style = 'bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500 font-bold';
                  } else if (isSelected && !isCorrect) {
                    style = 'bg-rose-50 text-rose-900 ring-2 ring-rose-400 line-through';
                  } else {
                    style = 'bg-white text-slate-400 ring-slate-200 opacity-60';
                  }
                } else if (isSelected) {
                  style = 'bg-slate-900 text-white ring-slate-900 font-bold';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={checked}
                    onClick={() => setSelectedOpt(idx)}
                    lang="pl"
                    className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-left text-base ring-1 transition ${style}`}
                  >
                    <span>{opt}</span>
                    {checked && isCorrect && <span className="text-emerald-600">✓</span>}
                    {checked && isSelected && !isCorrect && <span className="text-rose-600">✕</span>}
                  </button>
                );
              })}
            </div>

            {/* Instant Feedback & Grammar Explanation */}
            {checked && (
              <div
                className={`mt-5 rounded-2xl p-4 text-sm ring-1 ${
                  selectedOpt === currentEx.correctIndex
                    ? 'bg-emerald-50 text-emerald-950 ring-emerald-200'
                    : 'bg-amber-50 text-amber-950 ring-amber-200'
                }`}
              >
                <p className="font-bold">
                  {selectedOpt === currentEx.correctIndex ? `✓ ${t('correctFeedback')}` : `💡 ${t('incorrectFeedback')}`}
                </p>
                <p className="mt-1">{currentEx.explanation[locale]}</p>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep('theory')}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900"
            >
              ← {t('reviewTheoryBtn')}
            </button>

            {!checked ? (
              <button
                type="button"
                disabled={selectedOpt === null}
                onClick={handleCheck}
                className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {t('checkBtn')}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextExercise}
                className="rounded-2xl bg-red-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-700"
              >
                {exIndex + 1 < exercises.length ? `${t('nextExerciseBtn')} →` : `${t('finishLessonBtn')} →`}
              </button>
            )}
          </div>
        </section>
      )}

      {/* ==================== STEP 3: COMPLETION SUMMARY ==================== */}
      {step === 'completion' && (
        <section className="mt-5 rounded-3xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-200 sm:p-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-100 text-3xl ring-1 ring-emerald-200">
            🎉
          </div>
          <h2 className="mt-4 text-2xl font-extrabold text-slate-900 sm:text-3xl">
            {t('completionTitle')}
          </h2>
          <p className="mt-1 text-sm text-slate-600">{module.title[locale]}</p>

          <div className="mx-auto mt-6 grid max-w-md grid-cols-2 gap-3">
            <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('scoreLabel')}</p>
              <p className="mt-1 text-3xl font-extrabold text-emerald-600">{finalScorePercent}%</p>
              <p className="text-xs text-slate-500">
                {correctAnswers} / {exercises.length}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('xpEarnedLabel')}</p>
              <p className="mt-1 text-3xl font-extrabold text-amber-600">+{module.xpReward} XP</p>
              <p className="text-xs text-slate-500">{t('progressSavedTag')}</p>
            </div>
          </div>

          {nextModule && (
            <div className="mx-auto mt-6 max-w-lg rounded-2xl bg-emerald-50 p-4 text-left ring-1 ring-emerald-200">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                🔓 {t('unlockedNextLabel')} · {nextModule.subLevel}
              </p>
              <p className="mt-1 font-bold text-emerald-950">{nextModule.title[locale]}</p>
              <p className="mt-0.5 text-xs text-emerald-800">{nextModule.subtitle[locale]}</p>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleRetryPractice}
              className="rounded-2xl px-5 py-3 text-sm font-bold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-100"
            >
              ↻ {t('practiceAgainBtn')}
            </button>

            <Link
              href="/learn"
              className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
            >
              {t('backToRoadmap')}
            </Link>

            {nextModule && (
              <Link
                href={`/learn/${nextModule.slug}`}
                className="rounded-2xl bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-red-700"
              >
                {t('nextLessonBtn')} →
              </Link>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
