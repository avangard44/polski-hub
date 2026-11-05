'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';

export function LibrarySubNav() {
  const t = useTranslations('library');
  const pathname = usePathname();

  const tabs = [
    { href: '/library' as const, label: t('overviewTab'), active: pathname === '/library' },
    { href: '/cases' as const, label: t('casesTab'), active: pathname.startsWith('/cases') },
    { href: '/verbs' as const, label: t('verbsTab'), active: pathname.startsWith('/verbs') },
    { href: '/vocabulary' as const, label: t('vocabTab'), active: pathname.startsWith('/vocabulary') },
  ];

  return (
    <div className="mb-6 rounded-2xl bg-white p-2 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-center justify-between gap-2 px-2 pb-2 pt-1">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          📚 {t('sectionBadge')}
        </span>
        <Link href="/" className="text-xs font-bold text-red-600 hover:underline">
          ← {t('backToMyPath')}
        </Link>
      </div>
      <nav
        aria-label="Reference Library sections"
        className="flex gap-1.5 overflow-x-auto pb-1 sm:grid sm:grid-cols-4 sm:overflow-visible sm:pb-0"
      >
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`shrink-0 rounded-xl px-3.5 py-2.5 text-center text-xs font-bold transition sm:text-sm ${
              tab.active
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
