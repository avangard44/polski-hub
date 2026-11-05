'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { AudioButton } from '@/components/AudioButton';
import type { VocabTopic, VocabWord } from '@/types/grammar';

const GENDER: Record<VocabWord['gender'], string> = { m: 'm.', f: 'ż.', n: 'n.', pl: 'lm.' };

export function Flashcards({ words, topics }: { words: VocabWord[]; topics: VocabTopic[] }) {
  const t = useTranslations('vocab');
  const tv = useTranslations('verb');
  const locale = useLocale();
  const [topic, setTopic] = useState<VocabTopic>(topics[0]);
  const [mode, setMode] = useState<'cards' | 'list'>('cards');
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const list = words.filter((w) => w.topic === topic);
  const word = list[Math.min(index, list.length - 1)];

  const go = (delta: number) => {
    setFlipped(false);
    setIndex((i) => (i + delta + list.length) % list.length);
  };

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="-mx-3 flex gap-2 overflow-x-auto px-3 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
          {topics.map((tp) => (
            <button
              key={tp}
              aria-pressed={tp === topic}
              onClick={() => {
                setTopic(tp);
                setIndex(0);
                setFlipped(false);
              }}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium ring-1 transition ${
                tp === topic ? 'bg-red-600 text-white ring-red-600' : 'bg-white text-slate-600 ring-slate-200 hover:ring-slate-400'
              }`}
            >
              {t(`topics.${tp}`)}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 rounded-full bg-slate-100 p-1 text-sm sm:flex">
          {(['cards', 'list'] as const).map((m) => (
            <button
              key={m}
              aria-pressed={mode === m}
              onClick={() => setMode(m)}
              className={`rounded-full px-3 py-1 font-medium ${mode === m ? 'bg-white shadow-sm' : 'text-slate-500'}`}
            >
              {t(m)}
            </button>
          ))}
        </div>
      </div>

      {mode === 'cards' && word && (
        <div className="mx-auto mt-6 max-w-md sm:mt-8">
          <div
            role="button"
            tabIndex={0}
            aria-label={t('flip')}
            onClick={() => setFlipped((f) => !f)}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setFlipped((f) => !f))}
            className="flex min-h-60 cursor-pointer flex-col items-center justify-center rounded-3xl bg-white p-5 text-center shadow-md ring-1 ring-slate-200 transition hover:shadow-lg sm:min-h-64 sm:p-8"
          >
            {!flipped ? (
              <>
                <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
                  <span className="text-2xl font-bold text-slate-900 sm:text-4xl" lang="pl">
                    {word.pl}
                  </span>
                  <AudioButton text={word.pl} src={word.audioUrl} label={tv('listen')} />
                </div>
                <span className="mt-2 text-sm text-slate-400">{GENDER[word.gender]}</span>
                <span className="mt-6 text-xs text-slate-400 sm:mt-8">{t('flip')}</span>
              </>
            ) : (
              <>
                <span className="text-xl font-semibold text-slate-900 sm:text-2xl">{word.translation[locale]}</span>
                <p className="mt-3.5 text-base text-slate-700 sm:mt-4 sm:text-lg" lang="pl">
                  {word.example.pl}
                </p>
                <p className="mt-0.5 text-sm text-slate-500">{word.example.translation[locale]}</p>
                {word.falseFriend?.[locale] && (
                  <p className="mt-3.5 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-700 sm:mt-4 sm:text-sm">
                    <b>{t('falseFriend')}:</b> {word.falseFriend[locale]}
                  </p>
                )}
              </>
            )}
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <button onClick={() => go(-1)} className="rounded-full bg-white px-4 py-2 font-medium text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100">
              ← {t('prev')}
            </button>
            <span className="font-medium text-slate-400">
              {index + 1} / {list.length}
            </span>
            <button onClick={() => go(1)} className="rounded-full bg-white px-4 py-2 font-medium text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100">
              {t('next')} →
            </button>
          </div>
        </div>
      )}

      {mode === 'list' && (
        <ul className="mt-5 divide-y divide-slate-100 rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 sm:mt-6">
          {list.map((w) => (
            <li key={w.id} className="flex items-start gap-3 px-3.5 py-3 sm:items-center sm:gap-4 sm:px-4">
              <AudioButton text={w.pl} src={w.audioUrl} label={tv('listen')} size="sm" />
              <div className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-4">
                <span className="font-semibold text-slate-900 sm:w-52 sm:shrink-0" lang="pl">
                  {w.pl} <span className="text-xs font-normal text-slate-400">{GENDER[w.gender]}</span>
                </span>
                <span className="text-sm text-slate-600 sm:flex-1 sm:text-base">{w.translation[locale]}</span>
                {w.falseFriend?.[locale] && (
                  <span
                    title={w.falseFriend[locale]}
                    className="mt-1 inline-block w-fit rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700 sm:mt-0"
                  >
                    {t('falseFriend')}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
