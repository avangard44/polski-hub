import type { routing } from '@/i18n/routing';
import type messages from './messages/en.json';

// Strongly-typed locales + message keys across the whole app
// (useLocale() returns 'en' | 'ru' | 'tr', t('typo') is a compile error).
declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
