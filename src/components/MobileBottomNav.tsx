'use client';

import { useTranslations } from 'next-intl';
import { useLearningProgress } from '@/context/LearningProgressContext';
import { Link, usePathname } from '@/i18n/navigation';

export function MobileBottomNav() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const { state, hydrated } = useLearningProgress();

  const isLibraryActive =
    pathname.startsWith('/library') ||
    pathname.startsWith('/cases') ||
    pathname.startsWith('/verbs') ||
    pathname.startsWith('/vocabulary');

  const items = [
    {
      href: '/' as const,
      label: t('myPath'),
      active: pathname === '/' || pathname.startsWith('/learn'),
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      href: '/library' as const,
      label: t('library'),
      active: isLibraryActive,
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M4 6h16M4 12h16M4 18h10" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      href: '/profile' as const,
      label: hydrated ? `${t('profile')} (${state.assignedLevel})` : t('profile'),
      active: pathname.startsWith('/profile') || pathname.startsWith('/auth'),
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c1.5-4 14.5-4 16 0" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur sm:hidden"
    >
      <div className="mx-auto grid max-w-md grid-cols-3 px-2 py-1.5">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center gap-0.5 rounded-xl py-1.5 text-[11px] font-semibold transition ${
              item.active ? 'text-red-600' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {item.icon}
            <span className="truncate">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
