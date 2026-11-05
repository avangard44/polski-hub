import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { LocaleSwitcher } from './LocaleSwitcher';

export async function SiteHeader() {
  const t = await getTranslations('nav');
  const links = [
    { href: '/cases', label: t('cases') },
    { href: '/verbs', label: t('verbs') },
    { href: '/vocabulary', label: t('vocabulary') },
  ] as const;

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-900">
          <span className="flex h-7 w-7 flex-col overflow-hidden rounded-md ring-1 ring-slate-200" aria-hidden>
            <span className="flex-1 bg-white" />
            <span className="flex-1 bg-red-600" />
          </span>
          Polski Hub
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-lg px-3 py-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900">
              {l.label}
            </Link>
          ))}
        </nav>
        <LocaleSwitcher />
      </div>
    </header>
  );
}
