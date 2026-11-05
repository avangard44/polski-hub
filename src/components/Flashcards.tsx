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
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {topics.map((tp) => (
            <button
              key={tp}
              aria-pressed={tp === topic}
              onClick={() => {
                setTopic(tp);
                setIndex(0);
                setFlipped(false);
              }}
              className={`rounded-full px-4 py-1.5 text-sm ring-1 transition ${
                tp === topic ? 'bg-red-600 text-white ring-red-600' : 'bg-white text-slate-600 ring-slate-200 hover:ring-slate-400'
              }`}
            >
              {t(`topics.${tp}`)}
            </button>
          ))}
        </div>
        <div className="flex rounded-full bg-slate-100 p-1 text-sm">
          {(['cards', 'list'] as const).map((m) => (
            <button
              key={m}
              aria-pressed={mode === m}
              onClick={() => setMode(m)}
              className={`rounded-full px-3 py-1 ${mode === m ? 'bg-white shadow-sm' : 'text-slate-500'}`}
            >
              {t(m)}
            </button>
          ))}
        </div>
      </div>

      {mode === 'cards' && word && (
        <div className="mx-auto mt-8 max-w-md">
          <div
            role="button"
            tabIndex={0}
            aria-label={t('flip')}
            onClick={() => setFlipped((f) => !f)}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setFlipped((f) => !f))}
            className="flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-3xl bg-white p-8 text-center shadow-md ring-1 ring-slate-200 transition hover:shadow-lg"
          >
            {!flipped ? (
              <>
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-bold text-slate-900" lang="pl">
                    {word.pl}
                  </span>
                  <AudioButton text={word.pl} src={word.audioUrl} label={tv('listen')} />
                </div>
                <span className="mt-2 text-sm text-slate-400">{GENDER[word.gender]}</span>
                <span className="mt-8 text-xs text-slate-400">{t('flip')}</span>
              </>
            ) : (
              <>
                <span className="text-2xl font-semibold text-slate-900">{word.translation[locale]}</span>
                <p className="mt-4 text-lg text-slate-700" lang="pl">
                  {word.example.pl}
                </p>
                <p className="text-sm text-slate-500">{word.example.translation[locale]}</p>
                {word.falseFriend?.[locale] && (
                  <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
                    <b>{t('falseFriend')}:</b> {word.falseFriend[locale]}
                  </p>
                )}
              </>
            )}
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <button onClick={() => go(-1)} className="rounded-full px-4 py-2 text-slate-600 hover:bg-slate-100">
              ← {t('prev')}
            </button>
            <span className="text-slate-400">
              {index + 1} / {list.length}
            </span>
            <button onClick={() => go(1)} className="rounded-full px-4 py-2 text-slate-600 hover:bg-slate-100">
              {t('next')} →
            </button>
          </div>
        </div>
      )}

      {mode === 'list' && (
        <ul className="mt-6 divide-y divide-slate-100 rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
          {list.map((w) => (
            <li key={w.id} className="flex items-center gap-4 px-4 py-3">
              <AudioButton text={w.pl} src={w.audioUrl} label={tv('listen')} size="sm" />
              <span className="w-40 font-semibold text-slate-900" lang="pl">
                {w.pl} <span className="text-xs font-normal text-slate-400">{GENDER[w.gender]}</span>
              </span>
              <span className="flex-1 text-slate-600">{w.translation[locale]}</span>
              {w.falseFriend?.[locale] && (
                <span title={w.falseFriend[locale]} className="rounded-full bg-red-50 px-2 py-0.5 text-xs text-red-700">
                  {t('falseFriend')}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
