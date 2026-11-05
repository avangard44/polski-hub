import { Link } from '@/i18n/navigation';
import { DesktopNav } from './DesktopNav';
import { LocaleSwitcher } from './LocaleSwitcher';
import { MobileBottomNav } from './MobileBottomNav';

export async function SiteHeader() {
  return (
    <>
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-2.5 sm:px-4 sm:py-3">
          <Link href="/" className="flex items-center gap-2 text-base font-bold text-slate-900 sm:text-lg">
            <span className="flex h-7 w-7 shrink-0 flex-col overflow-hidden rounded-md ring-1 ring-slate-200" aria-hidden>
              <span className="flex-1 bg-white" />
              <span className="flex-1 bg-red-600" />
            </span>
            <span className="truncate">Polski Hub</span>
          </Link>

          <DesktopNav />

          <LocaleSwitcher />
        </div>
      </header>
      <MobileBottomNav />
    </>
  );
}
