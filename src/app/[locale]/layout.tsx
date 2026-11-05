import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SiteHeader } from '@/components/SiteHeader';
import { routing } from '@/i18n/routing';
import '../globals.css';

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

// Pre-render every page for every locale (SSG → fast + SEO-friendly).
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Omit<Props, 'children'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as (typeof routing.locales)[number], namespace: 'meta' });
  return {
    title: { default: t('title'), template: `%s · Polski Hub` },
    description: t('description'),
    // hreflang alternates so Google serves the right language version.
    alternates: {
      languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}`])),
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Enables static rendering for this locale.
  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('polski-hub-theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen transition-colors">
        <NextIntlClientProvider>
          <SiteHeader />
          <main className="mx-auto max-w-6xl px-3 pb-24 pt-5 sm:px-4 sm:py-8">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
