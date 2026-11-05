import { defineRouting } from 'next-intl/routing';

/**
 * Single source of truth for locales.
 * URLs are always prefixed (/en/verbs, /ru/verbs, /tr/verbs) → each language
 * gets its own crawlable, hreflang-linked URL (best for SEO).
 */
export const routing = defineRouting({
  locales: ['en', 'ru', 'tr'],
  defaultLocale: 'en',
  localePrefix: 'always',
});

export type AppLocale = (typeof routing.locales)[number];
