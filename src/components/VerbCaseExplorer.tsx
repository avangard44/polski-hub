'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { AudioButton } from '@/components/AudioButton';
import { ConjugationTable } from '@/components/ConjugationTable';
import { Sentence, sentenceText } from '@/components/Sentence';
import { Link } from '@/i18n/navigation';
import { CASE_GRAMMAR } from '@/lib/caseGrammar';
import { CASE_META } from '@/lib/cases';
import type { Aspect, ExampleSentence, InterferenceLevel, PolishCase, VerbEntry } from '@/types/grammar';

const LEVEL_STYLE: Record<InterferenceLevel, string> = {
  match: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  partial: 'bg-amber-50 text-amber-700 ring-amber-200',
  mismatch: 'bg-red-50 text-red-700 ring-red-200',
};

/**
 * The "Verb & Case" learning unit (responsive for mobile & desktop).
 */
export function VerbCaseExplorer({ verb }: { verb: VerbEntry }) {
  const locale = useLocale(); // 'en' | 'ru' | 'tr'
  const t = useTranslations('verb');
  const tc = useTranslations('cases');

  const aspects = (['imperfective', 'perfective'] as const).filter((a) => verb.aspects[a]);
  const [aspect, setAspect] = useState<Aspect>(aspects[0]);
  const [patternId, setPatternId] = useState(verb.government[0].id);
  const [hoverCase, setHoverCase] = useState<PolishCase | null>(null);
  const [negated, setNegated] = useState(false);
  const [showTranslations, setShowTranslations] = useState(true);

  const conjugation = verb.aspects[aspect]!;
  const impfConj = verb.aspects.imperfective ?? conjugation;
  const pfConj = verb.aspects.perfective;
  const pattern = verb.government.find((g) => g.id === patternId) ?? verb.government[0];
  const contrast = pattern.contrast[locale];
  const canNegate = pattern.examples.some((e) => e.negated);

  // If user toggled negation on a direct Accusative verb, show how words change in Genitive!
  const effectiveCase: PolishCase =
    negated && pattern.negation === 'genitive-shift' ? 'genitive' : pattern.case;
  const effectiveMeta = CASE_META[effectiveCase];
  const caseGrammar = CASE_GRAMMAR[effectiveCase];

  // Extract the governed object phrase from the first example to build live verb constructions
  const sampleEx = pattern.examples[0];
  const sampleObjSeg = sampleEx?.segments.find((s) => s.role === 'object');
  const sampleNegObjSeg = sampleEx?.negated?.find((s) => s.role === 'object');
  const objPhrase = [
    pattern.preposition,
    negated && sampleNegObjSeg ? sampleNegObjSeg.text : sampleObjSeg?.text ?? '',
  ]
    .filter(Boolean)
    .join(' ');
  const negPrefix = negated ? 'Nie ' : '';
  const lowerIfNeg = (form: string) => (negated ? `${negPrefix}${form.charAt(0).toLowerCase()}${form.slice(1)}` : cap(form));

  const verbConstructions = [
    impfConj.present && {
      key: 'now' as const,
      pl: `${lowerIfNeg(impfConj.present['1sg'])} ${objPhrase}.`,
      formula: `${impfConj.infinitive} (1 os. cz. teraźniejszy) + ${effectiveMeta.pl}`,
    },
    {
      key: 'pastM' as const,
      pl: `${lowerIfNeg(conjugation.past.masculine['1sg'])} ${objPhrase}.`,
      formula: `${conjugation.infinitive} (cz. przeszły, r. męski) + ${effectiveMeta.pl}`,
    },
    {
      key: 'pastF' as const,
      pl: `${lowerIfNeg(conjugation.past.feminine['1sg'])} ${objPhrase}.`,
      formula: `${conjugation.infinitive} (cz. przeszły, r. żeński) + ${effectiveMeta.pl}`,
    },
    {
      key: 'future' as const,
      pl: `${lowerIfNeg((pfConj ?? impfConj).future['1sg'])} ${objPhrase}.`,
      formula: `${(pfConj ?? impfConj).infinitive} (cz. przyszły) + ${effectiveMeta.pl}`,
    },
    {
      key: 'imperative' as const,
      pl: `${cap((pfConj ?? impfConj).imperative['2sg'])} ${objPhrase}!`,
      formula: `Tryb rozkazujący (ty) + ${effectiveMeta.pl}`,
    },
    {
      key: 'modal' as const,
      pl: `${negated ? 'Nie chcę' : 'Chcę / Muszę'} ${(pfConj ?? impfConj).infinitive} ${objPhrase}.`,
      formula: `chcieć / musieć + bezokolicznik + ${effectiveMeta.pl}`,
    },
  ].filter(Boolean) as { key: 'now' | 'pastM' | 'pastF' | 'future' | 'imperative' | 'modal'; pl: string; formula: string }[];

  const renderExample = (ex: ExampleSentence, useNegation = false, label?: string) => {
    const neg = useNegation && negated && ex.negated;
    const segments = neg ? ex.negated! : ex.segments;
    const translation = neg && ex.negatedTranslation ? ex.negatedTranslation : ex.translation;
    return (
      <li key={ex.id} className="flex items-start gap-2.5 rounded-xl px-2 py-2 transition hover:bg-slate-50 sm:gap-3 sm:px-3">
        <AudioButton text={sentenceText(segments)} src={ex.audioUrl} label={t('listen')} size="sm" />
        <div className="min-w-0">
          {label && <span className="block text-[11px] uppercase tracking-wide text-slate-400">{label}</span>}
          <p className="text-base text-slate-700 sm:text-lg" lang="pl">
            <Sentence
              segments={segments}
              locale={locale}
              activePatternId={pattern.id}
              hoverCase={hoverCase}
              onHoverCase={setHoverCase}
              otherCaseLabel={t('otherCase')}
            />
          </p>
          {showTranslations && <p className="text-sm text-slate-500">{translation[locale]}</p>}
        </div>
      </li>
    );
  };

  return (
    <article className="grid gap-4 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      {/* ================= MAIN COLUMN ================= */}
      <div className="space-y-4 sm:space-y-6">
        {/* ---- Header: verb + aspect switch ---- */}
        <header className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl" lang="pl">
                  {conjugation.infinitive}
                </h1>
                <AudioButton text={conjugation.infinitive} label={t('listen')} />
              </div>
              <p className="mt-1 text-base text-slate-500 sm:text-lg">{verb.translation[locale]}</p>
            </div>
            <span className="shrink-0 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">{verb.level}</span>
          </div>

          <div
            role="radiogroup"
            aria-label="Aspect"
            className="mt-4 grid w-full grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1 sm:mt-5 sm:inline-flex sm:w-auto"
          >
            {(['imperfective', 'perfective'] as const).map((a) => {
              const form = verb.aspects[a];
              const selected = aspect === a;
              return (
                <button
                  key={a}
                  role="radio"
                  aria-checked={selected}
                  disabled={!form}
                  onClick={() => setAspect(a)}
                  className={`min-w-0 rounded-lg px-3 py-2 text-left transition disabled:cursor-not-allowed disabled:opacity-40 sm:px-4 ${
                    selected ? 'bg-white shadow-sm' : 'hover:bg-white/60'
                  }`}
                >
                  <span className="block truncate text-[10px] uppercase tracking-wide text-slate-400 sm:text-[11px]">{t(a)}</span>
                  <span className="block truncate text-sm font-semibold text-slate-800 sm:text-base" lang="pl">
                    {form?.infinitive ?? t('noPerfective')}
                  </span>
                </button>
              );
            })}
          </div>
        </header>

        {/* ---- Government bridges ---- */}
        <section className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400 sm:text-sm">{t('government')}</h2>
            <Link
              href={`/cases#${effectiveCase}`}
              className={`rounded-full px-2.5 py-1 text-xs font-semibold transition hover:opacity-80 ${effectiveMeta.ui.badge}`}
            >
              {t('openFullCaseGuide', { caseName: effectiveMeta.pl })}
            </Link>
          </div>
          <p className="mb-3.5 mt-1 text-xs text-slate-500 sm:mb-4 sm:text-sm">{t('governmentHint')}</p>

          <div role="radiogroup" aria-label={t('government')} className="space-y-2.5">
            {verb.government.map((g) => {
              const meta = CASE_META[g.case];
              const selected = g.id === pattern.id;
              const lit = hoverCase === g.case;
              return (
                <button
                  key={g.id}
                  role="radio"
                  aria-checked={selected}
                  onClick={() => {
                    setPatternId(g.id);
                    setNegated(false);
                  }}
                  className={`flex w-full flex-col gap-2 rounded-2xl border-2 p-3 text-left transition sm:flex-row sm:items-center sm:gap-3 ${
                    selected ? `${meta.ui.border} bg-white` : 'border-transparent bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex w-full items-center gap-2 sm:w-auto sm:flex-1">
                    {/* Verb node */}
                    <span className="shrink-0 rounded-xl bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white sm:py-2 sm:text-base" lang="pl">
                      {conjugation.infinitive}
                    </span>

                    {/* Connector (with optional preposition) */}
                    <span className="relative flex min-w-12 flex-1 items-center" aria-hidden>
                      <span className={`h-1 w-full rounded-full ${meta.ui.line}`} />
                      <svg viewBox="0 0 10 10" className={`-ml-1 h-3 w-3 shrink-0 ${meta.ui.text}`} fill="currentColor">
                        <path d="M0 0 10 5 0 10z" />
                      </svg>
                      {g.preposition && (
                        <span
                          className={`absolute left-1/2 -translate-x-1/2 rounded-full border-2 bg-white px-2 text-xs font-bold sm:text-sm ${meta.ui.border} ${meta.ui.text}`}
                        >
                          {g.preposition}
                        </span>
                      )}
                    </span>
                  </div>

                  {/* Case node */}
                  <span
                    onMouseEnter={() => setHoverCase(g.case)}
                    onMouseLeave={() => setHoverCase(null)}
                    className={`w-full rounded-xl px-3 py-2 transition sm:w-auto sm:shrink-0 ${meta.ui.badge} ${lit ? `ring-4 ${meta.ui.ring}` : ''}`}
                  >
                    <span className="block text-sm font-semibold sm:text-base">{meta.pl}</span>
                    <span className="block text-xs opacity-80">
                      {g.question} · {meta.names[locale]}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <p className="mt-3.5 text-sm text-slate-700 sm:mt-4 sm:text-base">
            <span className="font-semibold" lang="pl">
              {conjugation.infinitive} {pattern.preposition ? `${pattern.preposition} ` : ''}+ {CASE_META[pattern.case].pl}
            </span>{' '}
            — {pattern.meaning[locale]}
          </p>
        </section>

        {/* ---- Examples ---- */}
        <section className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-6">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400 sm:text-sm">{t('examples')}</h2>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {canNegate && (
                <Toggle checked={negated} onChange={setNegated}>
                  {t('negate')}
                </Toggle>
              )}
              <Toggle checked={showTranslations} onChange={setShowTranslations}>
                {t('translations')}
              </Toggle>
            </div>
          </div>

          {canNegate && negated && (
            <p
              className={`mb-3 rounded-xl px-3 py-2 text-xs sm:text-sm ${
                pattern.negation === 'genitive-shift' ? CASE_META.genitive.ui.badge : 'bg-slate-50 text-slate-600'
              }`}
            >
              {pattern.negation === 'genitive-shift' ? t('negationShift') : t('negationUnchanged')}
            </p>
          )}

          <ul className="-mx-2 space-y-1 sm:-mx-3">{pattern.examples.map((ex) => renderExample(ex, true))}</ul>
        </section>

        {/* ---- How the verb changes in key constructions ---- */}
        <section className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-6">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400 sm:text-sm">{t('verbConstructionsTitle')}</h2>
          <div className="mt-3.5 grid gap-2.5 sm:mt-4 sm:grid-cols-2 sm:gap-3">
            {verbConstructions.map((item) => (
              <div key={item.key} className="flex items-start justify-between gap-2.5 rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200/70 sm:p-3.5">
                <div className="min-w-0">
                  <span className="block text-xs font-semibold text-slate-500">{t(`constructions.${item.key}`)}</span>
                  <p className="mt-1 text-sm font-bold text-slate-900 sm:text-base" lang="pl">
                    {item.pl}
                  </p>
                  <span className="mt-0.5 block text-[11px] text-slate-400">{item.formula}</span>
                </div>
                <AudioButton text={item.pl} label={t('listen')} size="sm" />
              </div>
            ))}
          </div>
        </section>

        {/* ---- Case Grammar Breakdown (Stacked cards on mobile, table on md+) ---- */}
        <section className={`rounded-3xl border-l-8 bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-6 ${effectiveMeta.ui.border}`}>
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h2 className="text-base font-bold text-slate-900 sm:text-lg">{t('caseGrammarTitle')}</h2>
              <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                {t('caseGrammarSub', {
                  caseName: `${effectiveMeta.pl} (${effectiveMeta.questions} · ${effectiveMeta.names[locale]})`,
                })}
              </p>
            </div>
            <Link href={`/cases#${effectiveCase}`} className="text-xs font-semibold text-red-600 hover:underline sm:text-sm">
              {t('openFullCaseGuide', { caseName: effectiveMeta.pl })}
            </Link>
          </div>

          {caseGrammar.alternationNote && (
            <div className={`mt-3.5 rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed sm:mt-4 sm:px-4 ${effectiveMeta.ui.badge}`}>
              <span className="font-bold">{tc('alternations')}: </span>
              {caseGrammar.alternationNote[locale]}
            </div>
          )}

          {/* Mobile cards */}
          <div className="mt-3.5 space-y-2.5 md:hidden">
            {caseGrammar.declension.map((row) => (
              <div key={row.gender} className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200/70">
                <span className="block text-[11px] font-bold uppercase tracking-wide text-slate-500">{row.genderLabel[locale]}</span>
                <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-xs">
                  <span className="font-medium text-slate-500" lang="pl">
                    {row.nominative}
                  </span>
                  <span className={`rounded-lg px-2 py-0.5 font-bold ${effectiveMeta.ui.badge}`} lang="pl">
                    → {row.inflected}
                  </span>
                </div>
                <p className="mt-1.5 text-xs font-semibold text-slate-800">{row.endingRule[locale]}</p>
                <p className="mt-0.5 text-xs text-slate-500" lang="pl">
                  {row.miniExample.pl}
                </p>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="mt-4 hidden overflow-x-auto md:block">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-400">
                  <th className="py-2.5 pr-3 font-semibold">{tc('genderCol')}</th>
                  <th className="py-2.5 pr-3 font-semibold">{tc('nomCol')}</th>
                  <th className="py-2.5 pr-3 font-semibold">{effectiveMeta.pl}</th>
                  <th className="py-2.5 font-semibold">{tc('endingsCol')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {caseGrammar.declension.map((row) => (
                  <tr key={row.gender} className="align-top">
                    <td className="py-3 pr-3 text-xs font-semibold text-slate-700">{row.genderLabel[locale]}</td>
                    <td className="py-3 pr-3 font-medium text-slate-500" lang="pl">
                      {row.nominative}
                    </td>
                    <td className="py-3 pr-3">
                      <span className={`inline-block rounded-lg px-2 py-0.5 text-xs font-bold ${effectiveMeta.ui.badge}`} lang="pl">
                        → {row.inflected}
                      </span>
                    </td>
                    <td className="py-3 text-xs">
                      <p className="font-semibold text-slate-800">{row.endingRule[locale]}</p>
                      <p className="mt-0.5 text-slate-500" lang="pl">
                        {row.miniExample.pl}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Frequent phrases in this case */}
          <div className="mt-4 border-t border-slate-100 pt-3.5 sm:mt-5 sm:pt-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              {t('casePhrasesTitle', { caseName: effectiveMeta.pl })}
            </h3>
            <div className="mt-2.5 grid gap-2.5 sm:grid-cols-3">
              {caseGrammar.commonPhrases.map((ph, idx) => (
                <div key={idx} className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200/60">
                  <div className="flex items-start justify-between gap-1">
                    <p className="text-sm font-bold text-slate-900" lang="pl">
                      {ph.pl}
                    </p>
                    <AudioButton text={ph.pl} label={t('listen')} size="sm" />
                  </div>
                  <p className="mt-1 text-xs text-slate-600">{ph.tr[locale]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ================= SIDEBAR ================= */}
      <aside className="space-y-4 sm:space-y-6">
        {/* ---- Native-language lens ---- */}
        <section className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400 sm:text-sm">{t('nativeLens')}</h2>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${LEVEL_STYLE[contrast.level]}`}>
              {t(`level.${contrast.level}`)}
            </span>
          </div>
          <p className="mb-2 font-mono text-xs text-slate-800 sm:text-sm">{contrast.equivalent}</p>
          <p className="text-sm leading-relaxed text-slate-600">{contrast.note}</p>
        </section>

        {/* ---- Conjugation ---- */}
        <section className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-5">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400 sm:text-sm">
            {t('conjugation')} · <span lang="pl">{conjugation.infinitive}</span>
          </h2>
          <ConjugationTable key={aspect} conjugation={conjugation} />
        </section>

        {/* ---- Aspect in context ---- */}
        <section className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-5">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400 sm:text-sm">{t('aspectUsage')}</h2>
          <p className="mb-3 text-sm leading-relaxed text-slate-600">{verb.aspectNote[locale]}</p>
          <ul className="-mx-2 space-y-1 sm:-mx-3">
            {verb.aspectExamples.map((ex) => renderExample(ex, false, ex.aspect && t(ex.aspect)))}
          </ul>
        </section>
      </aside>
    </article>
  );
}

const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

function Toggle({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ring-1 transition ${
        checked ? 'bg-slate-900 text-white ring-slate-900' : 'bg-white text-slate-600 ring-slate-300 hover:ring-slate-400'
      }`}
    >
      <span className={`h-2 w-2 rounded-full ${checked ? 'bg-emerald-400' : 'bg-slate-300'}`} />
      {children}
    </button>
  );
}
