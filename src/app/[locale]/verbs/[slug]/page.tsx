import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { VerbCaseExplorer } from '@/components/VerbCaseExplorer';
import { getVerb, pairLabel, VERBS } from '@/data/verbs';
import { Link } from '@/i18n/navigation';
import { CASE_META } from '@/lib/cases';
import type { UILocale } from '@/types/grammar';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return VERBS.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = (await params) as { locale: UILocale; slug: string };
  const verb = getVerb(slug);
  if (!verb) return {};
  const cases = verb.government
    .map((g) => `${g.preposition ? g.preposition + ' + ' : ''}${CASE_META[g.case].pl}`)
    .join(', ');
  // e.g. "szukać / poszukać — искать (+ Dopełniacz)"
  return {
    title: `${pairLabel(verb)} — ${verb.translation[locale]}`,
    description: `${pairLabel(verb)} + ${cases}. ${verb.government[0].meaning[locale]}.`,
  };
}

export default async function VerbPage({ params }: Props) {
  const { locale, slug } = (await params) as { locale: UILocale; slug: string };
  setRequestLocale(locale);
  const verb = getVerb(slug);
  if (!verb) notFound();
  const t = await getTranslations('verb');

  return (
    <div>
      <Link href="/verbs" className="mb-4 inline-block text-sm text-slate-500 hover:text-slate-900">
        ← {t('back')}
      </Link>
      <VerbCaseExplorer verb={verb} />
    </div>
  );
}
