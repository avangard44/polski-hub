'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { CaseBadge } from '@/components/CaseBadge';
import { Link } from '@/i18n/navigation';
import { CASE_META, CASE_ORDER } from '@/lib/cases';
import type { PolishCase } from '@/types/grammar';

export interface VerbSummary {
  slug: string;
  pair: string;
  translation: string;
  level: string;
  patterns: { case: PolishCase; preposition?: string }[];
}

/** Diacritic-insensitive: "szukac" finds "szukać", "laka" finds "łąka". */
const normalize = (s: string) =>
  s.toLowerCase().replace(/ł/g, 'l').normalize('NFD').replace(/\p{Diacritic}/gu, '');

export function VerbSearch({ verbs }: { verbs: VerbSummary[] }) {
  const t = useTranslations('verbs');
  const locale = useLocale();
  const [query, setQuery] = useState('');
  const [caseFilter, setCaseFilter] = useState<PolishCase | null>(null);
  const [levelFilter, setLevelFilter] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = normalize(query.trim());
    return verbs.filter(
      (v) =>
        (!q || normalize(`${v.pair} ${v.translation}`).includes(q)) &&
        (!caseFilter || v.patterns.some((p) => p.case === caseFilter)) &&
        (!levelFilter || v.level === levelFilter),
    );
  }, [verbs, query, caseFilter, levelFilter]);

  const governedCases = CASE_ORDER.filter((c) => verbs.some((v) => v.patterns.some((p) => p.case === c)));
  const levels = ['A1', 'A2', 'B1'].filter((lvl) => verbs.some((v) => v.level === lvl));

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t('searchPlaceholder')}
        className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-lg shadow-sm outline-none focus:border-red-400 focus:ring-4 focus:ring-red-100"
      />

      <div className="mt-3 flex flex-wrap gap-2">
        <FilterChip active={!caseFilter} onClick={() => setCaseFilter(null)}>
          {t('allCases')}
        </FilterChip>
        {governedCases.map((c) => (
          <FilterChip key={c} active={caseFilter === c} onClick={() => setCaseFilter(caseFilter === c ? null : c)}>
            <span className={`mr-1.5 inline-block h-2 w-2 rounded-full ${CASE_META[c].ui.line}`} />
            {CASE_META[c].pl}
          </FilterChip>
        ))}
        <span className="mx-1 self-center text-slate-300">|</span>
        {levels.map((lvl) => (
          <FilterChip key={lvl} active={levelFilter === lvl} onClick={() => setLevelFilter(levelFilter === lvl ? null : lvl)}>
            {lvl}
          </FilterChip>
        ))}
      </div>

      <p className="mt-4 text-sm text-slate-400">{t('count', { count: results.length })}</p>

      {results.length === 0 ? (
        <p className="mt-6 text-slate-500">{t('noResults')}</p>
      ) : (
        <ul className="mt-2 grid gap-3 sm:grid-cols-2">
          {results.map((v) => (
            <li key={v.slug}>
              <Link
                href={`/verbs/${v.slug}`}
                className="block rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-lg font-semibold text-slate-900" lang="pl">
                    {v.pair}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">{v.level}</span>
                </div>
                <p className="text-sm text-slate-500">{v.translation}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {v.patterns.map((p, i) => (
                    <span key={i} className="inline-flex items-center gap-1">
                      {p.preposition && <span className={`text-xs font-bold ${CASE_META[p.case].ui.text}`}>{p.preposition} +</span>}
                      <CaseBadge c={p.case} locale={locale} />
                    </span>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm ring-1 transition ${
        active ? 'bg-slate-900 text-white ring-slate-900' : 'bg-white text-slate-600 ring-slate-200 hover:ring-slate-400'
      }`}
    >
      {children}
    </button>
  );
}
