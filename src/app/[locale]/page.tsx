import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { CASE_META, CASE_ORDER } from '@/lib/cases';
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
    <div>
      <section className="py-6 text-center sm:py-10">
        <h1 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">{t('title')}</h1>
        <p className="mx-auto mt-3 max-w-2xl text-base text-slate-500 sm:mt-4 sm:text-lg">{t('subtitle')}</p>
        <div className="mt-5 flex flex-wrap justify-center gap-1.5 sm:mt-6 sm:gap-2" aria-hidden>
          {CASE_ORDER.map((c) => (
            <span key={c} className={`rounded-full px-3 py-1 text-xs font-semibold ${CASE_META[c].ui.badge}`}>
              {CASE_META[c].pl}
            </span>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {modules.map((m) => (
          <Link
            key={m.key}
            href={m.href}
            className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className={`h-2 bg-gradient-to-r ${m.accent}`} />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-slate-900">{t(`${m.key}.title`)}</h2>
              <p className="mt-2 text-slate-500">{t(`${m.key}.desc`)}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-red-600 group-hover:underline">{t('start')} →</span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
