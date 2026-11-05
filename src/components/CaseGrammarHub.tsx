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
    <div className="space-y-6">
      {/* ---- 7-Case Selector Tabs ---- */}
      <div role="tablist" aria-label={t('title')} className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
        {CASE_ORDER.map((c) => {
          const m = CASE_META[c];
          const selected = c === activeCase;
          return (
            <button
              key={c}
              role="tab"
              aria-selected={selected}
              onClick={() => selectCase(c)}
              className={`flex flex-col items-start rounded-2xl border-2 p-3 text-left transition ${
                selected ? `${m.ui.border} bg-white shadow-md` : 'border-transparent bg-white/70 hover:bg-white ring-1 ring-slate-200'
              }`}
            >
              <span className={`inline-block h-2 w-8 rounded-full ${m.ui.line}`} />
              <span className="mt-2 font-bold text-slate-900" lang="pl">
                {m.pl}
              </span>
              <span className="text-xs text-slate-500">{m.names[locale]}</span>
              <span className={`mt-1 text-xs font-semibold ${m.ui.text}`} lang="pl">
                {m.questions}
              </span>
            </button>
          );
        })}
      </div>

      {/* ---- Active Case Overview Banner ---- */}
      <section className={`rounded-3xl border-l-8 bg-white p-6 shadow-sm ring-1 ring-slate-200 ${meta.ui.border}`}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-baseline gap-3">
              <h2 className="text-3xl font-bold text-slate-900" lang="pl">
                {meta.pl}
              </h2>
              <span className={`text-lg font-bold ${meta.ui.text}`} lang="pl">
                {meta.questions}
              </span>
              <span className="text-lg text-slate-400">· {meta.names[locale]}</span>
            </div>
            <p className="mt-3 max-w-3xl leading-relaxed text-slate-600">{meta.note[locale]}</p>
          </div>

          <div className="rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200/80">
            <div className="flex items-center gap-2">
              <p className="text-lg font-medium text-slate-800" lang="pl">
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

      {/* ---- Declension Table (Nominative -> Target Case by Gender) ---- */}
      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h3 className="text-lg font-bold text-slate-900">{t('declensionTitle')}</h3>

        {grammar.alternationNote && (
          <div className={`mt-3 rounded-2xl px-4 py-3 text-sm ${meta.ui.badge}`}>
            <span className="font-bold">{t('alternations')}: </span>
            {grammar.alternationNote[locale]}
          </div>
        )}

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[680px] border-collapse text-left text-sm">
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
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h3 className="text-lg font-bold text-slate-900">{t('whenToUse')}</h3>
          <ul className="mt-4 space-y-3">
            {grammar.whenToUse[locale].map((point, i) => (
              <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-slate-700">
                <span className={`mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${meta.ui.badge}`}>
                  {i + 1}
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h3 className="text-lg font-bold text-slate-900">{t('prepositions')}</h3>
          {grammar.prepositions.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">{t('noPrepositions')}</p>
          ) : (
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
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
      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-slate-900">{t('commonPhrases')}</h3>
          <Link href="/verbs" className="text-sm font-semibold text-red-600 hover:underline">
            {t('exploreVerbs')}
          </Link>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {grammar.commonPhrases.map((phrase, i) => (
            <div key={i} className="flex flex-col justify-between rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200/80">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${meta.ui.badge}`}>
                    {phrase.formula}
                  </span>
                  <AudioButton text={phrase.pl} label={tv('listen')} size="sm" />
                </div>
                <p className="mt-3 text-lg font-bold text-slate-900" lang="pl">
                  {phrase.pl}
                </p>
                <p className="mt-1 text-sm font-medium text-slate-600">{phrase.tr[locale]}</p>
              </div>
              <p className="mt-3 border-t border-slate-200/80 pt-2.5 text-xs leading-relaxed text-slate-500">
                {phrase.note[locale]}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
