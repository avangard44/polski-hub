'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useLearningProgress } from '@/context/LearningProgressContext';
import {
  CURRICULUM_MODULES,
  evaluatePlacement,
  PLACEMENT_QUESTIONNAIRE,
  PLACEMENT_QUESTIONS,
} from '@/data/curriculum';
import type { UILocale } from '@/types/grammar';

type Stage = 'questionnaire' | 'quiz' | 'result';

export function OnboardingPlacementModal({ autoOpenOnFirstVisit = false }: { autoOpenOnFirstVisit?: boolean }) {
  const locale = useLocale() as UILocale;
  const t = useTranslations('roadmap');
  const {
    state,
    hydrated,
    isPlacementModalOpen,
    openPlacementModal,
    closePlacementModal,
    completeOnboarding,
    skipOnboardingAsBeginner,
  } = useLearningProgress();

  const [stage, setStage] = useState<Stage>('questionnaire');
  const [qAnswers, setQAnswers] = useState<Record<string, number>>({});
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  // Automatically trigger onboarding modal on first visit once hydrated
  useEffect(() => {
    if (autoOpenOnFirstVisit && hydrated && !state.hasCompletedOnboarding) {
      openPlacementModal();
    }
  }, [autoOpenOnFirstVisit, hydrated, state.hasCompletedOnboarding, openPlacementModal]);

  // Reset internal wizard state whenever modal opens
  useEffect(() => {
    if (isPlacementModalOpen) {
      setStage('questionnaire');
      setQAnswers({});
      setQuizIndex(0);
      setSelectedOption(null);
      setIsSubmitted(false);
      setCorrectCount(0);
    }
  }, [isPlacementModalOpen]);

  if (!hydrated || !isPlacementModalOpen) {
    return null;
  }

  const allQuestionnaireAnswered = PLACEMENT_QUESTIONNAIRE.every((item) => typeof qAnswers[item.id] === 'number');
  const questionnairePoints = Object.values(qAnswers).reduce((acc, pts) => acc + pts, 0);

  const currentQuestion = PLACEMENT_QUESTIONS[quizIndex];
  const totalQuestions = PLACEMENT_QUESTIONS.length;

  const placementEvaluation = evaluatePlacement(questionnairePoints, correctCount, totalQuestions);
  const unlockedModulesCount = CURRICULUM_MODULES.filter(
    (m) => m.order <= placementEvaluation.unlockedUpToOrder,
  ).length;

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === currentQuestion.correctIndex) {
      setCorrectCount((c) => c + 1);
    }
  };

  const handleNextQuestion = () => {
    if (quizIndex + 1 < totalQuestions) {
      setQuizIndex((i) => i + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setStage('result');
    }
  };

  const handleConfirmResult = () => {
    const scorePercent = Math.round((correctCount / totalQuestions) * 100);
    completeOnboarding({
      assignedLevel: placementEvaluation.assignedLevel,
      placementScore: scorePercent,
      unlockedUpToOrder: placementEvaluation.unlockedUpToOrder,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 p-3 backdrop-blur-sm sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-modal-title"
    >
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl ring-1 ring-slate-200 sm:p-7">
        {/* Top bar */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-700 ring-1 ring-red-200">
              {t('placementBadge')}
            </span>
            <h2 id="onboarding-modal-title" className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">
              {stage === 'questionnaire' && t('onboardingTitle')}
              {stage === 'quiz' && t('quizTitle')}
              {stage === 'result' && t('resultTitle')}
            </h2>
          </div>

          {state.hasCompletedOnboarding && (
            <button
              type="button"
              onClick={closePlacementModal}
              aria-label="Close"
              className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              ✕
            </button>
          )}
        </div>

        {/* STAGE 1: QUESTIONNAIRE */}
        {stage === 'questionnaire' && (
          <div className="mt-4">
            <p className="text-sm text-slate-600 sm:text-base">{t('onboardingSub')}</p>

            <div className="mt-5 space-y-5">
              {PLACEMENT_QUESTIONNAIRE.map((item) => (
                <div key={item.id} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <p className="font-semibold text-slate-900">{item.question[locale]}</p>
                  <div className="mt-3 grid gap-2">
                    {item.options.map((opt, idx) => {
                      const active = qAnswers[item.id] === opt.points && idx === item.options.findIndex((o) => o.points === qAnswers[item.id]);
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setQAnswers((prev) => ({ ...prev, [item.id]: opt.points }))}
                          className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm font-medium ring-1 transition ${
                            active
                              ? 'bg-slate-900 text-white ring-slate-900'
                              : 'bg-white text-slate-700 ring-slate-200 hover:ring-slate-400'
                          }`}
                        >
                          <span>{opt.label[locale]}</span>
                          <span
                            className={`ml-2 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                              active ? 'border-white bg-white text-slate-900' : 'border-slate-300'
                            }`}
                          >
                            {active && <span className="h-2 w-2 rounded-full bg-slate-900" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col-reverse gap-2.5 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={skipOnboardingAsBeginner}
                className="rounded-2xl px-4 py-3 text-sm font-semibold text-slate-600 ring-1 ring-slate-200 transition hover:bg-slate-100"
              >
                {t('startFromZeroBtn')}
              </button>

              <button
                type="button"
                disabled={!allQuestionnaireAnswered}
                onClick={() => setStage('quiz')}
                className="rounded-2xl bg-red-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {t('startPlacementQuizBtn')} →
              </button>
            </div>
          </div>
        )}

        {/* STAGE 2: INTERACTIVE PLACEMENT QUIZ */}
        {stage === 'quiz' && currentQuestion && (
          <div className="mt-4">
            {/* Progress bar */}
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>
                {t('questionProgress', { current: quizIndex + 1, total: totalQuestions })}
              </span>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-slate-700 ring-1 ring-slate-200">
                {t('testingLevel')}: {currentQuestion.level}
              </span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-red-500 to-amber-500 transition-all"
                style={{ width: `${((quizIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>

            <div className="mt-5 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 sm:p-5">
              <p className="text-base font-semibold text-slate-900">{currentQuestion.prompt[locale]}</p>
              {currentQuestion.sentencePl && (
                <p
                  lang="pl"
                  className="mt-3 rounded-xl bg-white px-4 py-3 font-mono text-lg font-bold text-slate-900 ring-1 ring-slate-200"
                >
                  {currentQuestion.sentencePl}
                </p>
              )}

              <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {currentQuestion.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQuestion.correctIndex;

                  let btnStyle = 'bg-white text-slate-800 ring-slate-200 hover:ring-slate-400';
                  if (isSubmitted) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500 font-bold';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'bg-rose-50 text-rose-900 ring-2 ring-rose-400 line-through';
                    } else {
                      btnStyle = 'bg-white text-slate-400 ring-slate-200 opacity-65';
                    }
                  } else if (isSelected) {
                    btnStyle = 'bg-slate-900 text-white ring-slate-900 font-semibold';
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isSubmitted}
                      onClick={() => setSelectedOption(idx)}
                      lang="pl"
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-left text-base ring-1 transition ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {isSubmitted && isCorrect && <span className="text-emerald-600">✓</span>}
                      {isSubmitted && isSelected && !isCorrect && <span className="text-rose-600">✕</span>}
                    </button>
                  );
                })}
              </div>

              {isSubmitted && (
                <div
                  className={`mt-4 rounded-xl p-3.5 text-sm ring-1 ${
                    selectedOption === currentQuestion.correctIndex
                      ? 'bg-emerald-50 text-emerald-950 ring-emerald-200'
                      : 'bg-amber-50 text-amber-950 ring-amber-200'
                  }`}
                >
                  <p className="font-bold">
                    {selectedOption === currentQuestion.correctIndex ? t('correctLabel') : t('explanationLabel')}
                  </p>
                  <p className="mt-1">{currentQuestion.explanation[locale]}</p>
                </div>
              )}
            </div>

            <div className="mt-5 flex items-center justify-between">
              <button
                type="button"
                onClick={skipOnboardingAsBeginner}
                className="text-xs font-semibold text-slate-400 hover:text-slate-700"
              >
                {t('skipToA1')}
              </button>

              {!isSubmitted ? (
                <button
                  type="button"
                  disabled={selectedOption === null}
                  onClick={handleCheckAnswer}
                  className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {t('checkAnswerBtn')}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="rounded-2xl bg-red-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-700"
                >
                  {quizIndex + 1 < totalQuestions ? `${t('nextQuestionBtn')} →` : `${t('seeResultsBtn')} →`}
                </button>
              )}
            </div>
          </div>
        )}

        {/* STAGE 3: RESULT & ASSIGNED LEVEL */}
        {stage === 'result' && (
          <div className="mt-5">
            <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-center text-white shadow-lg">
              <p className="text-xs font-bold uppercase tracking-widest text-amber-300">{t('assignedLevelLabel')}</p>
              <p className="mt-2 text-5xl font-extrabold tracking-tight">{placementEvaluation.assignedLevel}</p>
              <p className="mt-2 text-sm text-slate-300">
                {t('placementScoreSummary', {
                  correct: correctCount,
                  total: totalQuestions,
                  unlocked: unlockedModulesCount,
                })}
              </p>
            </div>

            <div className="mt-4 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('unlockedModulesPreview')}</p>
              <ul className="mt-2.5 grid gap-2 sm:grid-cols-2">
                {CURRICULUM_MODULES.map((m) => {
                  const isUnlocked = m.order <= placementEvaluation.unlockedUpToOrder;
                  return (
                    <li
                      key={m.id}
                      className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold ring-1 ${
                        isUnlocked
                          ? 'bg-emerald-50 text-emerald-950 ring-emerald-200'
                          : 'bg-white text-slate-400 ring-slate-200'
                      }`}
                    >
                      <span>{isUnlocked ? '🔓' : '🔒'}</span>
                      <span className="rounded bg-slate-200/70 px-1.5 py-0.5 text-[10px] font-bold text-slate-700">
                        {m.subLevel}
                      </span>
                      <span className="truncate">{m.title[locale]}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={handleConfirmResult}
                className="w-full rounded-2xl bg-red-600 px-6 py-3.5 text-base font-bold text-white shadow-md transition hover:bg-red-700 sm:w-auto"
              >
                {t('startMyPathBtn', { level: placementEvaluation.assignedLevel })} →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
