import { CASE_META } from '@/lib/cases';
import type { PolishCase, Segment, UILocale } from '@/types/grammar';

interface Props {
  segments: Segment[];
  locale: UILocale;
  /** Pattern currently selected in the government bridge. */
  activePatternId?: string;
  /** Case currently hovered anywhere on the page (overrides pattern highlight). */
  hoverCase?: PolishCase | null;
  onHoverCase?: (c: PolishCase | null) => void;
  otherCaseLabel: string;
}

/**
 * Renders a pre-segmented Polish sentence.
 *  - verbs are bold
 *  - governed words are underlined in their case colour (+ highlighted when active)
 *  - words in a case NOT caused by the verb get a dotted underline
 *  - every case-marked word has an accessible tooltip: "praca → pracy · Dopełniacz"
 */
export function Sentence({ segments, locale, activePatternId, hoverCase, onHoverCase, otherCaseLabel }: Props) {
  return (
    <span className="leading-loose">
      {segments.map((seg, i) => {
        if (seg.role === 'verb') {
          return (
            <span key={i} className="font-semibold text-slate-900">
              {seg.text}
            </span>
          );
        }
        if (!seg.case) return <span key={i}>{seg.text}</span>;

        const meta = CASE_META[seg.case];

        if (seg.role === 'preposition') {
          return (
            <span key={i} className={`font-semibold ${meta.ui.text}`}>
              {seg.text}
            </span>
          );
        }

        const governed = Boolean(seg.patternId);
        const active = hoverCase ? hoverCase === seg.case : governed && seg.patternId === activePatternId;

        return (
          <span
            key={i}
            tabIndex={0}
            onMouseEnter={() => onHoverCase?.(seg.case!)}
            onMouseLeave={() => onHoverCase?.(null)}
            onFocus={() => onHoverCase?.(seg.case!)}
            onBlur={() => onHoverCase?.(null)}
            className={[
              'group relative cursor-help rounded px-0.5 underline underline-offset-4 outline-none transition-colors',
              meta.ui.underline,
              governed ? 'decoration-2' : 'decoration-dotted decoration-1',
              active ? meta.ui.highlight : '',
            ].join(' ')}
          >
            {seg.text}
            <span
              role="tooltip"
              className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-max max-w-[82vw] -translate-x-1/2 whitespace-normal rounded-lg bg-slate-900 px-2.5 py-1.5 text-center text-xs font-normal leading-snug text-white no-underline opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus:opacity-100 sm:max-w-xs"
            >
              {seg.lemma && (
                <span className="block">
                  {seg.lemma} → <b>{seg.text.trim()}</b>
                </span>
              )}
              <span className="block opacity-80">
                {meta.pl} · {meta.names[locale]}
                {!governed && ` (${otherCaseLabel})`}
              </span>
            </span>
          </span>
        );
      })}
    </span>
  );
}

export const sentenceText = (segments: Segment[]) => segments.map((s) => s.text).join('');
