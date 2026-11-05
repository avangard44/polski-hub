import { setRequestLocale } from 'next-intl/server';
import { LearningRoadmap } from '@/components/LearningRoadmap';
import type { UILocale } from '@/types/grammar';

export default async function LearnRoadmapPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: UILocale };
  setRequestLocale(locale);

  return <LearningRoadmap />;
}
