import type {
  Aspect,
  CEFRLevel,
  Conjugation,
  ContrastNote,
  ExampleSentence,
  GovernmentPattern,
  Localized,
  PersonForms,
  PolishCase,
  Segment,
  VerbEntry,
} from '@/types/grammar';

/* ------------------------------------------------------------------ */
/* Conjugation engines for Polish verb classes                        */
/* ------------------------------------------------------------------ */

export const forms = (f: [string, string, string, string, string, string], suffix = ''): PersonForms => ({
  '1sg': f[0] + suffix,
  '2sg': f[1] + suffix,
  '3sg': f[2] + suffix,
  '1pl': f[3] + suffix,
  '2pl': f[4] + suffix,
  '3pl': f[5] + suffix,
});

export const compoundFuture = (inf: string, reflexive = false): PersonForms =>
  forms(
    ['będę', 'będziesz', 'będzie', 'będziemy', 'będziecie', 'będą'].map((b) =>
      reflexive ? `${b} się ${inf}` : `${b} ${inf}`,
    ) as [string, string, string, string, string, string],
  );

export const pastFrom = (fStem: string, m3sg: string, virile: string, suffix = ''): Conjugation['past'] => ({
  masculine: forms([`${fStem}em`, `${fStem}eś`, m3sg, `${virile}śmy`, `${virile}ście`, virile], suffix),
  feminine: forms([`${fStem}am`, `${fStem}aś`, `${fStem}a`, `${fStem}yśmy`, `${fStem}yście`, `${fStem}y`], suffix),
});

/**
 * Automatically derives a full Conjugation from an infinitive + conjugation class hint,
 * or accepts explicit overrides for irregular verbs.
 */
export interface ConjSpec {
  inf: string;
  /**
   * 'a'     -> -am, -asz, -a, -amy, -acie, -ają (czytać -> czytam)
   * 'owa'   -> -uję, -ujesz, -uje, -ujemy, -ujecie, -ują (pracować -> pracuję)
   * 'iwa'   -> -uję, -ujesz... for -ywać/-iwać (pokazywać -> pokazuję)
   * 'awa'   -> -aję, -ajesz, -aje... (dawać -> daję)
   * 'i'     -> -ę, -isz, -i, -imy, -icie, -ą (mówić -> mówię)
   * 'y'     -> -ę, -ysz, -y, -ymy, -ycie, -ą (uczyć -> uczę)
   * 'em'    -> -em, -esz, -e, -emy, -ecie, -eją (rozumieć -> rozumiem)
   * 'e_i'   -> -ę, -isz, -i, -imy, -icie, -ą for -eć verbs (widzieć -> widzę, myśleć -> myślę)
   * 'e_y'   -> -ę, -ysz, -y, -ymy, -ycie, -ą for -eć verbs (słyszeć -> słyszę)
   * 'na'    -> -nę, -niesz, -nie, -niemy, -niecie, -ną (ciągnąć -> ciągnę)
   */
  cls?: 'a' | 'owa' | 'iwa' | 'awa' | 'i' | 'y' | 'em' | 'e_i' | 'e_y' | 'na';
  /** Optional explicit 6 person forms (present for impf, simple future for pf). */
  pres?: [string, string, string, string, string, string];
  /** Optional explicit past [fStem, m3sg, virile] without 'się'. */
  past?: [string, string, string];
  /** Optional explicit imperative 2sg (without 'się'). */
  imp2?: string;
}

export function buildConjugation(spec: ConjSpec, aspect: Aspect): Conjugation {
  const isRefl = spec.inf.endsWith(' się');
  const suffix = isRefl ? ' się' : '';
  const bareInf = isRefl ? spec.inf.slice(0, -4) : spec.inf;

  let activeForms: PersonForms;
  let imp2 = spec.imp2;

  if (spec.pres) {
    activeForms = forms(spec.pres, suffix);
    if (!imp2) {
      imp2 = spec.pres[1].replace(/(esz|isz|ysz|asz)$/, '');
    }
  } else {
    const cls = spec.cls ?? guessClass(bareInf);
    switch (cls) {
      case 'a': {
        const stem = bareInf.slice(0, -2); // czytać -> czyt
        activeForms = forms([`${stem}am`, `${stem}asz`, `${stem}a`, `${stem}amy`, `${stem}acie`, `${stem}ają`], suffix);
        imp2 = imp2 ?? `${stem}aj`;
        break;
      }
      case 'owa': {
        const stem = bareInf.slice(0, -4); // pracować -> prac
        activeForms = forms([`${stem}uję`, `${stem}ujesz`, `${stem}uje`, `${stem}ujemy`, `${stem}ujecie`, `${stem}ują`], suffix);
        imp2 = imp2 ?? `${stem}uj`;
        break;
      }
      case 'iwa': {
        const stem = bareInf.slice(0, -4); // pokazywać -> pokaz
        activeForms = forms([`${stem}uję`, `${stem}ujesz`, `${stem}uje`, `${stem}ujemy`, `${stem}ujecie`, `${stem}ują`], suffix);
        imp2 = imp2 ?? `${stem}uj`;
        break;
      }
      case 'awa': {
        const stem = bareInf.slice(0, -4); // dawać -> d
        activeForms = forms([`${stem}aję`, `${stem}ajesz`, `${stem}aje`, `${stem}ajemy`, `${stem}ajecie`, `${stem}ają`], suffix);
        imp2 = imp2 ?? `${stem}awaj`;
        break;
      }
      case 'i': {
        const stem = bareInf.slice(0, -2); // mówić -> mów
        const iot = iotateStem(stem);
        activeForms = forms([`${iot}ę`, `${stem}isz`, `${stem}i`, `${stem}imy`, `${stem}icie`, `${iot}ą`], suffix);
        imp2 = imp2 ?? stem;
        break;
      }
      case 'y': {
        const stem = bareInf.slice(0, -2); // uczyć -> ucz
        activeForms = forms([`${stem}ę`, `${stem}ysz`, `${stem}y`, `${stem}ymy`, `${stem}ycie`, `${stem}ą`], suffix);
        imp2 = imp2 ?? stem;
        break;
      }
      case 'em': {
        const stem = bareInf.slice(0, -2); // rozumieć -> rozumi
        activeForms = forms([`${stem}em`, `${stem}esz`, `${stem}e`, `${stem}emy`, `${stem}ecie`, `${stem}eją`], suffix);
        imp2 = imp2 ?? `${stem}ej`;
        break;
      }
      case 'e_i': {
        const stem = bareInf.slice(0, -2); // myśleć -> myśl
        const iot = iotateStem(stem);
        activeForms = forms([`${iot}ę`, `${stem}isz`, `${stem}i`, `${stem}imy`, `${stem}icie`, `${iot}ą`], suffix);
        imp2 = imp2 ?? stem;
        break;
      }
      case 'e_y': {
        const stem = bareInf.slice(0, -2); // słyszeć -> słysz
        activeForms = forms([`${stem}ę`, `${stem}ysz`, `${stem}y`, `${stem}ymy`, `${stem}ycie`, `${stem}ą`], suffix);
        imp2 = imp2 ?? stem;
        break;
      }
      case 'na': {
        const stem = bareInf.slice(0, -2); // ciągnąć -> ciąg
        activeForms = forms([`${stem}nę`, `${stem}niesz`, `${stem}nie`, `${stem}niemy`, `${stem}niecie`, `${stem}ną`], suffix);
        imp2 = imp2 ?? `${stem}nij`;
        break;
      }
    }
  }

  let pastTuple = spec.past;
  if (!pastTuple) {
    if (bareInf.endsWith('ieć')) {
      const s = bareInf.slice(0, -3);
      pastTuple = [`${s}ał`, `${s}ał`, `${s}eli`];
    } else if (bareInf.endsWith('eć')) {
      const s = bareInf.slice(0, -2);
      pastTuple = [`${s}ał`, `${s}ał`, `${s}eli`];
    } else if (bareInf.endsWith('ąć')) {
      const s = bareInf.slice(0, -2);
      pastTuple = [`${s}ęł`, `${s}ął`, `${s}ęli`];
    } else {
      const s = bareInf.slice(0, -1); // -ć -> -ł
      pastTuple = [`${s}ł`, `${s}ł`, `${s}li`];
    }
  }

  const impBase = imp2!;
  const imperative = {
    '2sg': `${impBase}${suffix}`,
    '1pl': `${impBase}my${suffix}`,
    '2pl': `${impBase}cie${suffix}`,
  };

  return {
    infinitive: spec.inf,
    present: aspect === 'imperfective' ? activeForms : undefined,
    future: aspect === 'imperfective' ? compoundFuture(bareInf, isRefl) : activeForms,
    past: pastFrom(pastTuple[0], pastTuple[1], pastTuple[2], suffix),
    imperative,
  };
}

function guessClass(bareInf: string): NonNullable<ConjSpec['cls']> {
  if (bareInf.endsWith('ować')) return 'owa';
  if (bareInf.endsWith('ywać') || bareInf.endsWith('iwać')) return 'iwa';
  if (bareInf.endsWith('awać')) return 'awa';
  if (bareInf.endsWith('ić')) return 'i';
  if (bareInf.endsWith('yć')) return 'y';
  if (bareInf.endsWith('nąć')) return 'na';
  return 'a';
}

function iotateStem(stem: string): string {
  if (stem.endsWith('ch')) return stem;
  if (stem.endsWith('sz') || stem.endsWith('ż') || stem.endsWith('cz') || stem.endsWith('dż')) return stem;
  if (stem.endsWith('l') || stem.endsWith('j')) return stem;
  if (stem.endsWith('w') || stem.endsWith('b') || stem.endsWith('p') || stem.endsWith('m') || stem.endsWith('n')) {
    return `${stem}i`;
  }
  return stem;
}

/* ------------------------------------------------------------------ */
/* Reusable Contrastive Notes by Government Type                      */
/* ------------------------------------------------------------------ */

export const CASE_QUESTIONS: Record<PolishCase, string> = {
  nominative: 'kto? co?',
  genitive: 'kogo? czego?',
  dative: 'komu? czemu?',
  accusative: 'kogo? co?',
  instrumental: 'kim? czym?',
  locative: 'kim? czym?',
  vocative: 'o!',
};

export function defaultContrast(
  c: PolishCase,
  prep: string | undefined,
  meaning: Localized,
  custom?: Partial<Localized<ContrastNote>>,
): Localized<ContrastNote> {
  const key = prep ? `${prep}+${c}` : c;

  const base: Localized<ContrastNote> = (() => {
    switch (key) {
      case 'accusative':
        return {
          en: {
            equivalent: `${meaning.en} + direct object`,
            level: 'partial',
            note: 'Takes a direct object in the Accusative (Biernik). Remember: when negated with "nie", the object automatically shifts to the Genitive (Dopełniacz)!',
          },
          ru: {
            equivalent: `${meaning.ru} + В. п. (при отрицании → Р. п.)`,
            level: 'partial',
            note: 'Прямое дополнение в винительном падеже (Biernik). Важно: при отрицании с «nie» винительный падеж в польском ОБЯЗАТЕЛЬНО меняется на родительный (Dopełniacz)!',
          },
          tr: {
            equivalent: `${meaning.tr} + belirtme (-i) / yalın hâl`,
            level: 'mismatch',
            note: 'Lehçede nesne belirsiz olsa bile 항상 Biernik (belirtme hâli) alır. Olumsuz ("nie") cümlelerde ise nesne Dopełniacz hâline dönüşür.',
          },
        };
      case 'genitive':
        return {
          en: {
            equivalent: `${meaning.en} + object`,
            level: 'mismatch',
            note: 'Unlike English, this verb governs the Genitive (Dopełniacz) directly without a preposition. Using the Accusative here is a common mistake.',
          },
          ru: {
            equivalent: `${meaning.ru} + Р. п. / В. п.`,
            level: 'partial',
            note: 'Этот глагол требует родительного падежа (Dopełniacz — kogo? czego?) без предлога. Отрицание падеж не меняет.',
          },
          tr: {
            equivalent: `${meaning.tr} + nesne`,
            level: 'mismatch',
            note: 'Bu fiil edatsız olarak doğrudan Dopełniacz (ilgi hâli) ister. Olumsuz cümlede de hâl değişmez.',
          },
        };
      case 'dative':
        return {
          en: {
            equivalent: `${meaning.en} + (to) someone`,
            level: 'partial',
            note: 'The recipient or beneficiary is placed in the Dative (Celownik: komu? czemu?) without a preposition.',
          },
          ru: {
            equivalent: `${meaning.ru} + Д. п. (кому? чему?)`,
            level: 'match',
            note: 'Полное совпадение с русским дательным падежом (Celownik — komu? czemu?).',
          },
          tr: {
            equivalent: `${meaning.tr} + yönelme hâli (-e/-a)`,
            level: 'match',
            note: 'Türkçe yönelme hâli (-e/-a) ile birebir örtüşür: Celownik (komu? czemu?).',
          },
        };
      case 'instrumental':
        return {
          en: {
            equivalent: `${meaning.en} + object / role`,
            level: 'mismatch',
            note: 'Requires the Instrumental case (Narzędnik: kim? czym?) directly without a preposition.',
          },
          ru: {
            equivalent: `${meaning.ru} + Т. п. (кем? чем?)`,
            level: 'match',
            note: 'Совпадает с русским творительным падежом (Narzędnik — kim? czym?) без предлога.',
          },
          tr: {
            equivalent: `${meaning.tr} + (-le/-la / nesne)`,
            level: 'partial',
            note: 'Edatsız Narzędnik (vasıta hâli: kim? czym?) gerektirir.',
          },
        };
      case 'z+instrumental':
        return {
          en: {
            equivalent: `${meaning.en} with + object`,
            level: 'match',
            note: 'Uses the preposition "z" (with) followed by the Instrumental case (Narzędnik).',
          },
          ru: {
            equivalent: `${meaning.ru} с + Т. п.`,
            level: 'match',
            note: 'Полное совпадение с русским «с + творительный падеж» (z + Narzędnik).',
          },
          tr: {
            equivalent: `${meaning.tr} + biriyle / bir şeyle (-le/-la)`,
            level: 'match',
            note: 'Türkçe "-le/-la (ile)" yapısına karşılık gelir: z + Narzędnik.',
          },
        };
      case 'na+accusative':
        return {
          en: {
            equivalent: `${meaning.en} (for / on / at) + object`,
            level: 'partial',
            note: 'Requires the preposition "na" + Accusative (Biernik). Because of the preposition, negation does NOT shift the noun to the Genitive.',
          },
          ru: {
            equivalent: `${meaning.ru} (на + В. п. / без предлога)`,
            level: 'partial',
            note: 'Требует предлога na + Biernik (винительный падеж). Из-за предлога отрицание падеж не меняет.',
          },
          tr: {
            equivalent: `${meaning.tr} + nesne`,
            level: 'mismatch',
            note: 'Lehçede na + Biernik edatlı yapısı kullanılır. Olumsuzluk durumunda hâl değişmez.',
          },
        };
      case 'o+locative':
        return {
          en: {
            equivalent: `${meaning.en} about + object`,
            level: 'match',
            note: 'Uses the preposition "o" (about) + Locative case (Miejscownik: o kim? o czym?).',
          },
          ru: {
            equivalent: `${meaning.ru} о + П. п.`,
            level: 'match',
            note: 'Полное совпадение с русским «о + предложный падеж» (o + Miejscownik).',
          },
          tr: {
            equivalent: `${meaning.tr} + hakkında`,
            level: 'partial',
            note: '"Hakkında" anlamı için o + Miejscownik (bulunma hâli) kullanılır.',
          },
        };
      case 'o+accusative':
        return {
          en: {
            equivalent: `${meaning.en} for / about + object`,
            level: 'mismatch',
            note: 'Watch out: with verbs of asking, fighting, or caring, "o" takes the Accusative (Biernik: o kogo? o co?), NOT the Locative!',
          },
          ru: {
            equivalent: `${meaning.ru} о / про / за + В. п.`,
            level: 'partial',
            note: 'Внимание: здесь предлог «o» требует винительного падежа (Biernik — o kogo? o co?), а не предложного!',
          },
          tr: {
            equivalent: `${meaning.tr} + için / hakkında`,
            level: 'mismatch',
            note: 'Dikkat: burada "o" edatı Miejscownik değil, Biernik (o kogo? o co?) alır!',
          },
        };
      case 'do+genitive':
        return {
          en: {
            equivalent: `${meaning.en} to + object`,
            level: 'match',
            note: 'Uses the preposition "do" (to/into) which always governs the Genitive (Dopełniacz).',
          },
          ru: {
            equivalent: `${meaning.ru} в / к / до + Р. п. или Д. п.`,
            level: 'partial',
            note: 'Предлог «do» в польском заменяет и «в» (направление), и «к» (к человеку), и ВСЕГДА требует родительного падежа (Dopełniacz).',
          },
          tr: {
            equivalent: `${meaning.tr} + yönelme (-e/-a)`,
            level: 'partial',
            note: 'Yönelme bildiren "do" edatı her zaman Dopełniacz (ilgi hâli) alır.',
          },
        };
      case 'z+genitive':
      case 'od+genitive':
        return {
          en: {
            equivalent: `${meaning.en} from + object`,
            level: 'match',
            note: `The preposition "${prep}" always requires the Genitive (Dopełniacz).`,
          },
          ru: {
            equivalent: `${meaning.ru} из / от + Р. п.`,
            level: 'match',
            note: `Предлог «${prep}» всегда требует родительного падежа (Dopełniacz).`,
          },
          tr: {
            equivalent: `${meaning.tr} + ayrılma hâli (-den/-dan)`,
            level: 'match',
            note: `Türkçe -den/-dan (ayrılma hâli) anlamını "${prep} + Dopełniacz" verir.`,
          },
        };
      default:
        return {
          en: {
            equivalent: meaning.en,
            level: 'partial',
            note: `Requires ${prep ? `"${prep}" + ` : ''}${c} (${CASE_QUESTIONS[c]}).`,
          },
          ru: {
            equivalent: meaning.ru,
            level: 'partial',
            note: `Требует конструкции ${prep ? `«${prep}» + ` : ''}${c} (${CASE_QUESTIONS[c]}).`,
          },
          tr: {
            equivalent: meaning.tr,
            level: 'partial',
            note: `${prep ? `"${prep}" + ` : ''}${c} (${CASE_QUESTIONS[c]}) yapısını gerektirir.`,
          },
        };
    }
  })();

  return {
    en: custom?.en ?? base.en,
    ru: custom?.ru ?? base.ru,
    tr: custom?.tr ?? base.tr,
  };
}

/* ------------------------------------------------------------------ */
/* Concise Verb Blueprint Builder                                     */
/* ------------------------------------------------------------------ */

export interface CompactExample {
  /** Verb phrase in sentence, e.g. 'Czytam ' */
  v: string;
  /** Optional preposition before object, e.g. 'na ' */
  prep?: string;
  /** Governed object form in sentence, e.g. 'książkę' */
  obj: string;
  /** Dictionary lemma of the object, e.g. 'książka' */
  lemma: string;
  /** Optional Genitive form of the object when negated (for Accusative verbs), e.g. 'książki' */
  negObj?: string;
  /** Optional prefix before verb */
  pre?: string;
  /** Optional suffix after object (without trailing dot if dot is default) */
  post?: string;
  /** Sentence translation */
  tr: Localized;
  /** Optional negated translation */
  negTr?: Localized;
}

export interface CompactVerbSpec {
  slug: string;
  level: CEFRLevel;
  rank: number;
  tags: string[];
  tr: Localized;
  impf: ConjSpec;
  pf?: ConjSpec;
  aspectNote?: Localized;
  gov: {
    case: PolishCase;
    prep?: string;
    meaning?: Localized;
    contrast?: Partial<Localized<ContrastNote>>;
    ex: CompactExample;
    pfEx?: CompactExample;
  }[];
}

export function buildVerbEntry(spec: CompactVerbSpec): VerbEntry {
  const impfConj = buildConjugation(spec.impf, 'imperfective');
  const pfConj = spec.pf ? buildConjugation(spec.pf, 'perfective') : undefined;

  const defaultAspectNote: Localized = pfConj
    ? {
        en: `${impfConj.infinitive} describes an ongoing or repeated action; ${pfConj.infinitive} focuses on a single completed result.`,
        ru: `${impfConj.infinitive} описывает процесс или регулярное действие (несов. вид); ${pfConj.infinitive} — однократное действие с результатом (сов. вид).`,
        tr: `${impfConj.infinitive}Rn (imperfektif) süreci veya tekrarlanan eylemi; ${pfConj.infinitive} (perfektif) tamamlanmış tek bir sonucu anlatır.`,
      }
    : {
        en: `${impfConj.infinitive} is used primarily in the imperfective aspect (describes a state or ongoing activity).`,
        ru: `${impfConj.infinitive} употребляется преимущественно в несовершенном виде (описывает состояние или процесс).`,
        tr: `${impfConj.infinitive} çoğunlukla bitmemişlik (imperfektif) görünüşünde, bir durumu veya süreci anlatmak için kullanılır.`,
      };

  const government: GovernmentPattern[] = spec.gov.map((g, idx) => {
    const patternId = `${spec.slug}-${idx === 0 ? g.case : `${g.prep ?? ''}-${g.case}`}`;
    const qBase = CASE_QUESTIONS[g.case];
    const question = g.prep ? `${g.prep} ${qBase}` : qBase;
    const isAccDirect = g.case === 'accusative' && !g.prep;
    const meaning = g.meaning ?? spec.tr;

    const makeSegments = (e: CompactExample, useNeg = false): Segment[] => {
      const segs: Segment[] = [];
      if (e.pre) segs.push({ text: e.pre });
      const verbText = useNeg ? negateVerbText(e.v) : e.v;
      segs.push({ text: verbText, role: 'verb' });
      if (e.prep) segs.push({ text: e.prep, role: 'preposition', case: g.case });
      segs.push({
        text: useNeg && e.negObj ? e.negObj : e.obj,
        role: 'object',
        case: useNeg && isAccDirect && e.negObj ? 'genitive' : g.case,
        lemma: e.lemma,
        patternId,
      });
      segs.push({ text: e.post ?? '.' });
      return segs;
    };

    const ex1: ExampleSentence = {
      id: `${spec.slug}-e${idx + 1}`,
      segments: makeSegments(g.ex, false),
      translation: g.ex.tr,
      ...(g.ex.negObj
        ? {
            negated: makeSegments(g.ex, true),
            negatedTranslation: g.ex.negTr ?? {
              en: `Not: ${g.ex.tr.en}`,
              ru: `Отрицание: ${g.ex.tr.ru}`,
              tr: `Olumsuz: ${g.ex.tr.tr}`,
            },
          }
        : {}),
    };

    const examples: ExampleSentence[] = [ex1];
    if (g.pfEx) {
      examples.push({
        id: `${spec.slug}-e${idx + 1}-pf`,
        segments: makeSegments(g.pfEx, false),
        translation: g.pfEx.tr,
      });
    }

    return {
      id: patternId,
      case: g.case,
      preposition: g.prep,
      question,
      meaning,
      negation: isAccDirect ? 'genitive-shift' : 'unchanged',
      contrast: defaultContrast(g.case, g.prep, meaning, g.contrast),
      examples,
    };
  });

  const firstGov = spec.gov[0];
  const firstPatId = government[0].id;
  const aspectExamples: ExampleSentence[] = [
    {
      id: `${spec.slug}-a1`,
      aspect: 'imperfective',
      segments: government[0].examples[0].segments,
      translation: firstGov.ex.tr,
    },
  ];

  if (firstGov.pfEx) {
    const e = firstGov.pfEx;
    const segs: Segment[] = [];
    if (e.pre) segs.push({ text: e.pre });
    segs.push({ text: e.v, role: 'verb' });
    if (e.prep) segs.push({ text: e.prep, role: 'preposition', case: firstGov.case });
    segs.push({
      text: e.obj,
      role: 'object',
      case: firstGov.case,
      lemma: e.lemma,
      patternId: firstPatId,
    });
    segs.push({ text: e.post ?? '.' });
    aspectExamples.push({
      id: `${spec.slug}-a2`,
      aspect: 'perfective',
      segments: segs,
      translation: e.tr,
    });
  }

  return {
    slug: spec.slug,
    level: spec.level,
    frequencyRank: spec.rank,
    tags: spec.tags,
    translation: spec.tr,
    aspects: {
      imperfective: impfConj,
      ...(pfConj ? { perfective: pfConj } : {}),
    },
    aspectNote: spec.aspectNote ?? defaultAspectNote,
    aspectExamples,
    government,
  };
}

function negateVerbText(vText: string): string {
  const trimmed = vText.trimStart();
  if (/^nie /i.test(trimmed)) return vText;
  const lower = trimmed.charAt(0).toLowerCase() + trimmed.slice(1);
  return `Nie ${lower}`;
}
