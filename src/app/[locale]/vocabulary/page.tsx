import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Flashcards } from '@/components/Flashcards';
import { VOCAB_TOPICS, VOCABULARY } from '@/data/vocabulary';
import type { UILocale } from '@/types/grammar';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = (await params) as { locale: UILocale };
  const t = await getTranslations({ locale, namespace: 'vocab' });
  return { title: t('title'), description: t('intro') };
}

export default async function VocabularyPage({ params }: Props) {
  const { locale } = (await params) as { locale: UILocale };
  setRequestLocale(locale);
  const t = await getTranslations('vocab');

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold text-slate-900">{t('title')}</h1>
      <p className="mb-6 mt-2 text-slate-500">{t('intro')}</p>
      <Flashcards words={VOCABULARY} topics={VOCAB_TOPICS} />
    </div>
  );
}
