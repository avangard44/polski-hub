'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';

export function MobileBottomNav() {
  const t = useTranslations('nav');
  const pathname = usePathname();

  const items = [
    {
      href: '/' as const,
      label: t('home'),
      active: pathname === '/',
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      href: '/cases' as const,
      label: t('cases'),
      active: pathname.startsWith('/cases'),
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M4 6h16M4 12h16M4 18h10" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      href: '/verbs' as const,
      label: t('verbs'),
      active: pathname.startsWith('/verbs'),
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M13 2 3 14h8l-1 8 10-12h-8l1-8z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      href: '/vocabulary' as const,
      label: t('vocabulary'),
      active: pathname.startsWith('/vocabulary'),
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M7 8h10M7 12h6" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur sm:hidden"
    >
      <div className="mx-auto grid max-w-md grid-cols-4 px-2 py-1.5">
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
