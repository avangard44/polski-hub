import { getTranslations, setRequestLocale } from 'next-intl/server';
import { LibrarySubNav } from '@/components/LibrarySubNav';
import { VERBS } from '@/data/verbs';
import { VOCABULARY } from '@/data/vocabulary';
import { Link } from '@/i18n/navigation';
import { CASE_META, CASE_ORDER } from '@/lib/cases';
import type { UILocale } from '@/types/grammar';

export default async function ReferenceLibraryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: UILocale };
  setRequestLocale(locale);
  const t = await getTranslations('library');

  const sections = [
    {
      href: '/cases' as const,
      icon: '📐',
      badge: '7 Cases · Declension Tables',
      accent: 'from-amber-400 to-rose-500',
      title: t('casesCard.title'),
      desc: t('casesCard.desc'),
      cta: t('casesCard.cta'),
    },
    {
      href: '/verbs' as const,
      icon: '⚡',
      badge: `${VERBS.length} Verbs · Rekcja & Aspect`,
      accent: 'from-red-500 to-violet-600',
      title: t('verbsCard.title'),
      desc: t('verbsCard.desc'),
      cta: t('verbsCard.cta'),
    },
    {
      href: '/vocabulary' as const,
      icon: '🗂️',
      badge: `${VOCABULARY.length} Words · 4 Themes`,
      accent: 'from-emerald-400 to-sky-500',
      title: t('vocabCard.title'),
      desc: t('vocabCard.desc'),
      cta: t('vocabCard.cta'),
    },
  ];

  return (
    <div>
      <LibrarySubNav />

      <header className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-700 ring-1 ring-slate-200">
          📚 {t('sectionBadge')}
        </span>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {t('title')}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">{t('subtitle')}</p>

        {/* Quick 7-Case Pill Shortcuts */}
        <div className="mt-5 flex flex-wrap gap-2">
          {CASE_ORDER.map((c) => (
            <Link
              key={c}
              href={`/cases?case=${c}`}
              className={`rounded-full px-3 py-1 text-xs font-bold transition hover:scale-105 ${CASE_META[c].ui.badge}`}
            >
              {CASE_META[c].pl} · {CASE_META[c].names[locale]}
            </Link>
          ))}
        </div>
      </header>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {sections.map((sec) => (
          <Link
            key={sec.href}
            href={sec.href}
            className="group flex flex-col justify-between overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md"
          >
            <div>
              <div className={`h-2 bg-gradient-to-r ${sec.accent}`} />
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{sec.icon}</span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600">
                    {sec.badge}
                  </span>
                </div>
                <h2 className="mt-4 text-xl font-bold text-slate-900">{sec.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{sec.desc}</p>
              </div>
            </div>
            <div className="border-t border-slate-100 px-6 py-4">
              <span className="text-sm font-bold text-red-600 group-hover:underline">
                {sec.cta} →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
