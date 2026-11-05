import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { LibrarySubNav } from '@/components/LibrarySubNav';
import { VerbSearch, type VerbSummary } from '@/components/VerbSearch';
import { pairLabel, VERBS } from '@/data/verbs';
import type { UILocale } from '@/types/grammar';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = (await params) as { locale: UILocale };
  const t = await getTranslations({ locale, namespace: 'verbs' });
  return { title: t('title'), description: t('intro') };
}

export default async function VerbsPage({ params }: Props) {
  const { locale } = (await params) as { locale: UILocale };
  setRequestLocale(locale);
  const t = await getTranslations('verbs');

  // Send only what the list needs to the client (smaller payload).
  const summaries: VerbSummary[] = VERBS.map((v) => ({
    slug: v.slug,
    pair: pairLabel(v),
    translation: v.translation[locale],
    level: v.level,
    patterns: v.government.map((g) => ({ case: g.case, preposition: g.preposition })),
  }));

  return (
    <div className="mx-auto max-w-4xl">
      <LibrarySubNav />
      <h1 className="text-3xl font-bold text-slate-900">{t('title')}</h1>
      <p className="mb-6 mt-2 text-slate-500">{t('intro')}</p>
      <VerbSearch verbs={summaries} />
    </div>
  );
}
