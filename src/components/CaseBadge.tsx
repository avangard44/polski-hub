import { CASE_META } from '@/lib/cases';
import type { PolishCase, UILocale } from '@/types/grammar';

/** Colour-coded case chip: "Dopełniacz · Родительный". */
export function CaseBadge({ c, locale, compact = false }: { c: PolishCase; locale: UILocale; compact?: boolean }) {
  const meta = CASE_META[c];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${meta.ui.badge}`}>
      {meta.pl}
      {!compact && <span className="font-normal opacity-75">· {meta.names[locale]}</span>}
    </span>
  );
}
