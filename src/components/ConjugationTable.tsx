'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import type { Conjugation, Person, PersonForms } from '@/types/grammar';

const PRONOUNS: Record<Person, string> = {
  '1sg': 'ja',
  '2sg': 'ty',
  '3sg': 'on / ona / ono',
  '1pl': 'my',
  '2pl': 'wy',
  '3pl': 'oni / one',
};
const PERSONS = Object.keys(PRONOUNS) as Person[];

type Tab = 'present' | 'future' | 'past' | 'imperative';

export function ConjugationTable({ conjugation }: { conjugation: Conjugation }) {
  const t = useTranslations('verb');
  const tabs: Tab[] = conjugation.present ? ['present', 'past', 'future', 'imperative'] : ['future', 'past', 'imperative'];
  const [tab, setTab] = useState<Tab>(tabs[0]);
  const current = tabs.includes(tab) ? tab : tabs[0];

  const simple = (f: Partial<PersonForms>) => (
    <tbody>
      {PERSONS.filter((p) => f[p]).map((p) => (
        <tr key={p} className="border-t border-slate-100">
          <td className="py-1.5 pr-3 text-slate-400">{PRONOUNS[p]}</td>
          <td className="py-1.5 font-medium text-slate-800">{f[p]}</td>
        </tr>
      ))}
    </tbody>
  );

  return (
    <div>
      <div role="tablist" className="mb-3 flex flex-wrap gap-1 rounded-xl bg-slate-100 p-1">
        {tabs.map((key) => (
          <button
            key={key}
            role="tab"
            aria-selected={current === key}
            onClick={() => setTab(key)}
            className={`flex-1 rounded-lg px-2 py-1 text-xs font-medium transition ${
              current === key ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {t(key)}
          </button>
        ))}
      </div>

      <table className="w-full text-sm">
        {current === 'present' && conjugation.present && simple(conjugation.present)}
        {current === 'future' && simple(conjugation.future)}
        {current === 'imperative' && simple(conjugation.imperative)}
        {current === 'past' && (
          <>
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wide text-slate-400">
                <th className="pb-1 font-medium" />
                <th className="pb-1 font-medium">{t('masculine')}</th>
                <th className="pb-1 font-medium">{t('feminine')}</th>
              </tr>
            </thead>
            <tbody>
              {PERSONS.map((p) => (
                <tr key={p} className="border-t border-slate-100">
                  <td className="py-1.5 pr-2 text-slate-400">{PRONOUNS[p]}</td>
                  <td className="py-1.5 pr-2 font-medium text-slate-800">{conjugation.past.masculine[p]}</td>
                  <td className="py-1.5 font-medium text-slate-800">{conjugation.past.feminine[p]}</td>
                </tr>
              ))}
            </tbody>
          </>
        )}
      </table>
    </div>
  );
}
