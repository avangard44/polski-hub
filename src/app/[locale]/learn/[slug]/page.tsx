import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { LessonPlayer } from '@/components/LessonPlayer';
import { CURRICULUM_MODULES, MODULE_BY_SLUG } from '@/data/curriculum';
import { routing } from '@/i18n/routing';
import type { UILocale } from '@/types/grammar';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    CURRICULUM_MODULES.map((m) => ({ locale, slug: m.slug })),
  );
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = (await params) as { locale: UILocale; slug: string };
  setRequestLocale(locale);

  const mod = MODULE_BY_SLUG[slug];
  if (!mod) notFound();

  return <LessonPlayer module={mod} />;
}
