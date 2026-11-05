/**
 * Core content model for Polski Hub.
 *
 * Design principles
 * 1. Polish forms are stored ONCE (they are language-independent).
 * 2. Everything that is explained to the learner is `Localized<T>` → one value
 *    per interface language (en / ru / tr).
 * 3. Comparative notes are keyed by the learner's L1: an RU user reads a note
 *    that compares Polish with RUSSIAN, a TR user one that compares with TURKISH.
 * 4. Example sentences are pre-segmented so the UI can colour-code and link
 *    every governed word back to the case/pattern that caused it.
 */

export const UI_LOCALES = ['en', 'ru', 'tr'] as const;
export type UILocale = (typeof UI_LOCALES)[number];

/** One value per interface / native language. */
export type Localized<T = string> = Record<UILocale, T>;

export type PolishCase =
  | 'nominative' // Mianownik
  | 'genitive' // Dopełniacz
  | 'dative' // Celownik
  | 'accusative' // Biernik
  | 'instrumental' // Narzędnik
  | 'locative' // Miejscownik
  | 'vocative'; // Wołacz

export type Aspect = 'imperfective' | 'perfective';
export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export type Person = '1sg' | '2sg' | '3sg' | '1pl' | '2pl' | '3pl';
export type PersonForms = Record<Person, string>;

export interface Conjugation {
  infinitive: string;
  /** Imperfective verbs only – perfective verbs have no present tense. */
  present?: PersonForms;
  /**
   * Imperfective: compound future (będę szukać).
   * Perfective: simple future (morphologically "present": znajdę).
   */
  future: PersonForms;
  /**
   * Past tense is gendered.
   *  - `masculine` plural = męskoosobowy (virile: szukaliśmy)
   *  - `feminine`  plural = niemęskoosobowy (non-virile: szukałyśmy)
   */
  past: { masculine: PersonForms; feminine: PersonForms };
  imperative: Pick<PersonForms, '2sg' | '1pl' | '2pl'>;
}

/** A piece of an example sentence. Concatenating `text` gives the sentence. */
export interface Segment {
  text: string;
  role?: 'verb' | 'object' | 'preposition';
  /** Grammatical case of this word group (if relevant). */
  case?: PolishCase;
  /** Dictionary form, shown in the tooltip: "praca → pracy". */
  lemma?: string;
  /**
   * Links the segment to the GovernmentPattern that caused its case.
   * Segments with a `case` but no `patternId` are rendered as
   * "other case, not governed by this verb".
   */
  patternId?: string;
}

export interface ExampleSentence {
  id: string;
  segments: Segment[];
  translation: Localized;
  /** Same sentence with "nie" – used to demo the Genitive of negation. */
  negated?: Segment[];
  negatedTranslation?: Localized;
  /** For aspect-contrast examples. */
  aspect?: Aspect;
  register?: 'neutral' | 'colloquial' | 'formal';
  /** Recorded audio; when absent the UI falls back to speech synthesis. */
  audioUrl?: string;
}

/**
 * How similar the Polish structure is to the learner's native language.
 * Drives the colour of the "native lens" badge (green / amber / red).
 */
export type InterferenceLevel = 'match' | 'partial' | 'mismatch';

export interface ContrastNote {
  /** The native-language equivalent structure, e.g. "искать + В. п." */
  equivalent: string;
  level: InterferenceLevel;
  /** Explanation + typical L1-interference error. */
  note: string;
}

/** Rekcja – one way a verb connects to its complement. */
export interface GovernmentPattern {
  id: string;
  case: PolishCase;
  /** Required preposition, if any (czekać NA + Biernik). */
  preposition?: string;
  /** Case question as taught in Polish schools: "kogo? czego?". */
  question: string;
  meaning: Localized;
  /**
   * 'genitive-shift' → direct Accusative object becomes Genitive after "nie".
   * 'unchanged'     → already Genitive, or shielded by a preposition.
   */
  negation: 'genitive-shift' | 'unchanged';
  /** Keyed by the learner's L1 (= UI locale). */
  contrast: Localized<ContrastNote>;
  examples: ExampleSentence[];
}

export interface VerbEntry {
  /** URL slug, ASCII-only: "szukac". */
  slug: string;
  level: CEFRLevel;
  /** Rank in the frequency list (lower = more frequent). */
  frequencyRank?: number;
  translation: Localized;
  /**
   * Aspect pair. Either side may be missing:
   *  - bać się has no perfective partner,
   *  - some perfectives have no imperfective in common use.
   */
  aspects: Partial<Record<Aspect, Conjugation>>;
  aspectNote: Localized;
  aspectExamples: ExampleSentence[];
  /** One verb can govern several cases (pomagać KOMU w CZYM). */
  government: GovernmentPattern[];
  tags: string[];
}

/* ---------- Vocabulary ---------- */

export type VocabTopic = 'daily' | 'university' | 'work' | 'travel';

export interface VocabWord {
  id: string;
  topic: VocabTopic;
  pl: string;
  /** m / f / n, or 'pl' for plural-only nouns (pluralia tantum). */
  gender: 'm' | 'f' | 'n' | 'pl';
  translation: Localized;
  example: { pl: string; translation: Localized };
  /** False-friend warnings only where relevant for a given L1. */
  falseFriend?: Partial<Localized>;
  frequencyRank?: number;
  audioUrl?: string;
}
