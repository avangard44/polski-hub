import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CaseGrammarHub } from '@/components/CaseGrammarHub';
import type { UILocale } from '@/types/grammar';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = (await params) as { locale: UILocale };
  const t = await getTranslations({ locale, namespace: 'cases' });
  return { title: t('title'), description: t('intro') };
}

export default async function CasesPage({ params }: Props) {
  const { locale } = (await params) as { locale: UILocale };
  setRequestLocale(locale);
  const t = await getTranslations('cases');

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-3xl font-bold text-slate-900">{t('title')}</h1>
      <p className="mb-6 mt-2 max-w-3xl text-slate-500">{t('intro')}</p>
      <CaseGrammarHub />
    </div>
  );
}
