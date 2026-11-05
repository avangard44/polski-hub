import { getTranslations, setRequestLocale } from 'next-intl/server';
import { LearningRoadmap } from '@/components/LearningRoadmap';
import { Link } from '@/i18n/navigation';
import type { UILocale } from '@/types/grammar';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: UILocale };
  setRequestLocale(locale);
  const t = await getTranslations('home');

  const modules = [
    { href: '/cases', key: 'cases', accent: 'from-amber-400 to-rose-400' },
    { href: '/verbs', key: 'verbs', accent: 'from-red-500 to-violet-500' },
    { href: '/vocabulary', key: 'vocabulary', accent: 'from-emerald-400 to-sky-400' },
  ] as const;

  return (
    <div className="space-y-10">
      {/* Main Progressive Learning Roadmap (A1 -> B2) & Onboarding Placement Flow */}
      <LearningRoadmap />

      {/* Reference Hubs Section */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{t('referenceTitle')}</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {modules.map((m) => (
            <Link
              key={m.key}
              href={m.href}
              className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className={`h-2 bg-gradient-to-r ${m.accent}`} />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900">{t(`${m.key}.title`)}</h3>
                <p className="mt-2 text-slate-500">{t(`${m.key}.desc`)}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-red-600 group-hover:underline">
                  {t('start')} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
