'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { AudioButton } from '@/components/AudioButton';
import { Link } from '@/i18n/navigation';
import { CASE_GRAMMAR } from '@/lib/caseGrammar';
import { CASE_META, CASE_ORDER } from '@/lib/cases';
import type { PolishCase } from '@/types/grammar';

export function CaseGrammarHub() {
  const locale = useLocale();
  const t = useTranslations('cases');
  const tv = useTranslations('verb');
  const [activeCase, setActiveCase] = useState<PolishCase>('genitive');

  // Support deep-linking from verb pages via URL hash, e.g. /cases#dative
  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace('#', '') as PolishCase;
      if (CASE_ORDER.includes(hash)) {
        setActiveCase(hash);
      }
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  const selectCase = (c: PolishCase) => {
    setActiveCase(c);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${c}`);
    }
  };

  const meta = CASE_META[activeCase];
  const grammar = CASE_GRAMMAR[activeCase];
  const [before, form, after] = meta.example.parts;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* ---- 7-Case Selector Tabs (horizontal swipe strip on mobile, grid on sm+) ---- */}
      <div
        role="tablist"
        aria-label={t('title')}
        className="-mx-3 flex gap-2 overflow-x-auto px-3 pb-1 sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-7"
      >
        {CASE_ORDER.map((c) => {
          const m = CASE_META[c];
          const selected = c === activeCase;
          return (
            <button
              key={c}
              role="tab"
              aria-selected={selected}
              onClick={() => selectCase(c)}
              className={`flex min-w-[132px] shrink-0 flex-col items-start rounded-2xl border-2 p-2.5 text-left transition sm:min-w-0 sm:p-3 ${
                selected ? `${m.ui.border} bg-white shadow-md` : 'border-transparent bg-white/70 ring-1 ring-slate-200 hover:bg-white'
              }`}
            >
              <span className={`inline-block h-2 w-8 rounded-full ${m.ui.line}`} />
              <span className="mt-1.5 text-sm font-bold text-slate-900 sm:mt-2 sm:text-base" lang="pl">
                {m.pl}
              </span>
              <span className="text-xs text-slate-500">{m.names[locale]}</span>
              <span className={`mt-0.5 text-xs font-semibold ${m.ui.text}`} lang="pl">
                {m.questions}
              </span>
            </button>
          );
        })}
      </div>

      {/* ---- Active Case Overview Banner ---- */}
      <section className={`rounded-3xl border-l-8 bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-6 ${meta.ui.border}`}>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:flex-wrap sm:items-start">
          <div>
            <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl" lang="pl">
                {meta.pl}
              </h2>
              <span className={`text-base font-bold sm:text-lg ${meta.ui.text}`} lang="pl">
                {meta.questions}
              </span>
              <span className="text-sm text-slate-400 sm:text-lg">· {meta.names[locale]}</span>
            </div>
            <p className="mt-2.5 max-w-3xl text-sm leading-relaxed text-slate-600 sm:mt-3 sm:text-base">{meta.note[locale]}</p>
          </div>

          <div className="rounded-2xl bg-slate-50 px-3.5 py-2.5 ring-1 ring-slate-200/80 sm:px-4 sm:py-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-base font-medium text-slate-800 sm:text-lg" lang="pl">
                {before}
                <span className={`rounded px-1 font-bold underline decoration-2 underline-offset-4 ${meta.ui.underline} ${meta.ui.highlight}`}>
                  {form}
                </span>
                {after}
              </p>
              <AudioButton text={`${before}${form}${after}`} label={tv('listen')} size="sm" />
            </div>
            <p className="mt-0.5 text-xs text-slate-500">{meta.example.translation[locale]}</p>
          </div>
        </div>
      </section>

      {/* ---- Declension Section (Stacked cards on mobile, table on md+) ---- */}
      <section className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-6">
        <h3 className="text-base font-bold text-slate-900 sm:text-lg">{t('declensionTitle')}</h3>

        {grammar.alternationNote && (
          <div className={`mt-3 rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed sm:px-4 sm:py-3 sm:text-sm ${meta.ui.badge}`}>
            <span className="font-bold">{t('alternations')}: </span>
            {grammar.alternationNote[locale]}
          </div>
        )}

        {/* Mobile stacked cards (no horizontal scroll needed) */}
        <div className="mt-4 space-y-3 md:hidden">
          {grammar.declension.map((row) => (
            <div key={row.gender} className="rounded-2xl bg-slate-50 p-3.5 ring-1 ring-slate-200/80">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wide text-slate-500">{row.genderLabel[locale]}</span>
                <AudioButton text={row.inflected.replace(/\(.*?\)\s*/g, '')} label={tv('listen')} size="sm" />
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-1.5 text-sm">
                <span className="font-medium text-slate-500" lang="pl">
                  {row.nominative}
                </span>
                <span className={`rounded-lg px-2.5 py-1 font-bold ${meta.ui.badge}`} lang="pl">
                  → {row.inflected}
                </span>
              </div>

              <p className="mt-2 text-xs font-semibold text-slate-800">{row.endingRule[locale]}</p>
              <p className="mt-1 text-xs text-slate-600" lang="pl">
                «{row.miniExample.pl}» — <span className="text-slate-500">{row.miniExample.tr[locale]}</span>
              </p>
            </div>
          ))}
        </div>

        {/* Desktop table */}
        <div className="mt-4 hidden overflow-x-auto md:block">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-400">
                <th className="py-3 pr-4 font-semibold">{t('genderCol')}</th>
                <th className="py-3 pr-4 font-semibold">{t('nomCol')}</th>
                <th className="py-3 pr-4 font-semibold">
                  {t('targetCol')} ({meta.pl})
                </th>
                <th className="py-3 font-semibold">{t('endingsCol')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {grammar.declension.map((row) => (
                <tr key={row.gender} className="align-top hover:bg-slate-50/70">
                  <td className="py-3.5 pr-4 font-semibold text-slate-700">{row.genderLabel[locale]}</td>
                  <td className="py-3.5 pr-4 font-medium text-slate-500" lang="pl">
                    {row.nominative}
                  </td>
                  <td className="py-3.5 pr-4">
                    <div className="flex items-center gap-2">
                      <span className={`inline-block rounded-lg px-2.5 py-1 font-bold ${meta.ui.badge}`} lang="pl">
                        → {row.inflected}
                      </span>
                      <AudioButton text={row.inflected.replace(/\(.*?\)\s*/g, '')} label={tv('listen')} size="sm" />
                    </div>
                  </td>
                  <td className="py-3.5">
                    <p className="font-semibold text-slate-800">{row.endingRule[locale]}</p>
                    <p className="mt-1 text-slate-700" lang="pl">
                      «{row.miniExample.pl}» — <span className="text-slate-500">{row.miniExample.tr[locale]}</span>
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ---- Two-column: When to use + Prepositions ---- */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        <section className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-6">
          <h3 className="text-base font-bold text-slate-900 sm:text-lg">{t('whenToUse')}</h3>
          <ul className="mt-3.5 space-y-3 sm:mt-4">
            {grammar.whenToUse[locale].map((point, i) => (
              <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-slate-700">
                <span className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${meta.ui.badge}`}>
                  {i + 1}
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-6">
          <h3 className="text-base font-bold text-slate-900 sm:text-lg">{t('prepositions')}</h3>
          {grammar.prepositions.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">{t('noPrepositions')}</p>
          ) : (
            <ul className="mt-3.5 grid gap-2.5 sm:mt-4 sm:grid-cols-2">
              {grammar.prepositions.map((p) => (
                <li key={p.prep} className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200/70">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`rounded-lg px-2.5 py-0.5 text-sm font-bold ${meta.ui.badge}`} lang="pl">
                      {p.prep} + {meta.pl}
                    </span>
                    <AudioButton text={p.example} label={tv('listen')} size="sm" />
                  </div>
                  <p className="mt-1.5 text-xs font-medium text-slate-500">{p.meaning[locale]}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800" lang="pl">
                    {p.example}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* ---- Most Common Phrases & Constructions ---- */}
      <section className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-base font-bold text-slate-900 sm:text-lg">{t('commonPhrases')}</h3>
          <Link href="/verbs" className="text-sm font-semibold text-red-600 hover:underline">
            {t('exploreVerbs')}
          </Link>
        </div>

        <div className="mt-3.5 grid gap-3 sm:mt-4 sm:gap-4 md:grid-cols-3">
          {grammar.commonPhrases.map((phrase, i) => (
            <div key={i} className="flex flex-col justify-between rounded-2xl bg-slate-50 p-3.5 ring-1 ring-slate-200/80 sm:p-4">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${meta.ui.badge}`}>
                    {phrase.formula}
                  </span>
                  <AudioButton text={phrase.pl} label={tv('listen')} size="sm" />
                </div>
                <p className="mt-2.5 text-base font-bold text-slate-900 sm:mt-3 sm:text-lg" lang="pl">
                  {phrase.pl}
                </p>
                <p className="mt-1 text-sm font-medium text-slate-600">{phrase.tr[locale]}</p>
              </div>
              <p className="mt-2.5 border-t border-slate-200/80 pt-2 text-xs leading-relaxed text-slate-500 sm:mt-3 sm:pt-2.5">
                {phrase.note[locale]}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
