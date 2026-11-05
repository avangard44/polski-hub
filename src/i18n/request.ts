import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

/**
 * Loads UI strings (messages/*.json) per request / per static page.
 * Learning CONTENT (verbs, cases, vocab) is NOT stored here — it lives in
 * typed data objects with Localized<> fields (see src/types/grammar.ts),
 * so it can later move to a CMS/DB without touching UI translations.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
