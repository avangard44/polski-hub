import type { Localized, PolishCase } from '@/types/grammar';

export interface CaseMeta {
  /** Polish grammatical name. */
  pl: string;
  questions: string;
  /** Name of the closest equivalent in the learner's own grammar tradition. */
  names: Localized;
  /** Comparative explanation for each L1. */
  note: Localized;
  example: { parts: [string, string, string]; translation: Localized };
  /**
   * Full Tailwind class strings (must be literal so Tailwind can detect them).
   * Every case keeps the SAME colour everywhere in the app → visual memory.
   */
  ui: {
    badge: string;
    text: string;
    line: string;
    border: string;
    ring: string;
    underline: string;
    highlight: string;
  };
}

export const CASE_ORDER: PolishCase[] = [
  'nominative',
  'genitive',
  'dative',
  'accusative',
  'instrumental',
  'locative',
  'vocative',
];

export const CASE_META: Record<PolishCase, CaseMeta> = {
  nominative: {
    pl: 'Mianownik',
    questions: 'kto? co?',
    names: { en: 'Nominative', ru: 'Именительный', tr: 'Yalın hâl' },
    note: {
      en: 'The subject of the sentence and the dictionary form.',
      ru: 'Как русский именительный: подлежащее и словарная форма.',
      tr: 'Yalın hâl: cümlenin öznesi ve sözlükteki biçim.',
    },
    example: {
      parts: ['', 'Anna', ' jest studentką.'],
      translation: { en: 'Anna is a student.', ru: 'Анна — студентка.', tr: 'Anna öğrenci.' },
    },
    ui: {
      badge: 'bg-slate-100 text-slate-900 ring-1 ring-slate-300',
      text: 'text-slate-600',
      line: 'bg-slate-400',
      border: 'border-slate-400',
      ring: 'ring-slate-400',
      underline: 'decoration-slate-500',
      highlight: 'bg-slate-200',
    },
  },
  genitive: {
    pl: 'Dopełniacz',
    questions: 'kogo? czego?',
    names: { en: 'Genitive', ru: 'Родительный', tr: 'İlgi hâli (-in)' },
    note: {
      en: 'Expresses "of" (dom Anny = Anna\'s house), quantity (dużo czasu) and the object after negation (Nie mam czasu). Many verbs that take a direct object in English require the Genitive in Polish: szukać (look for), słuchać (listen to).',
      ru: 'Как русский родительный, но шире: после отрицания прямое дополнение ВСЕГДА в родительном (Nie mam czasu), и многие глаголы, которые в русском требуют винительного, здесь требуют родительного: szukać pracy (искать работу), słuchać muzyki (слушать музыку).',
      tr: 'Türkçe ilgi hâli (-in) gibi sahiplik bildirir (dom Anny = Anna\'nın evi), ama çok daha geniştir: olumsuz cümlede nesne (Nie mam czasu = Vaktim yok), miktar (dużo ludzi) ve bazı fiiller (szukać = aramak) bu hâli ister. Türkçe -den ile ifade edilen pek çok yapı da Lehçede Dopełniacz alır (od/z + Dopełniacz).',
    },
    example: {
      parts: ['Nie mam ', 'czasu', '.'],
      translation: { en: "I don't have time.", ru: 'У меня нет времени.', tr: 'Vaktim yok.' },
    },
    ui: {
      badge: 'bg-amber-100 text-amber-900 ring-1 ring-amber-300',
      text: 'text-amber-600',
      line: 'bg-amber-400',
      border: 'border-amber-400',
      ring: 'ring-amber-400',
      underline: 'decoration-amber-500',
      highlight: 'bg-amber-200',
    },
  },
  dative: {
    pl: 'Celownik',
    questions: 'komu? czemu?',
    names: { en: 'Dative', ru: 'Дательный', tr: 'Yönelme hâli (-e)' },
    note: {
      en: 'The indirect object – "to / for someone": Daję mamie kwiaty = I give flowers to Mom.',
      ru: 'Полностью соответствует русскому дательному: кому? — komu?',
      tr: 'Yönelme hâli (-e) gibi: kime? = komu? Pomagam mamie = Anneme yardım ediyorum.',
    },
    example: {
      parts: ['Daję ', 'mamie', ' kwiaty.'],
      translation: { en: 'I give flowers to Mom.', ru: 'Я дарю маме цветы.', tr: 'Anneme çiçek veriyorum.' },
    },
    ui: {
      badge: 'bg-emerald-100 text-emerald-900 ring-1 ring-emerald-300',
      text: 'text-emerald-600',
      line: 'bg-emerald-400',
      border: 'border-emerald-400',
      ring: 'ring-emerald-400',
      underline: 'decoration-emerald-500',
      highlight: 'bg-emerald-200',
    },
  },
  accusative: {
    pl: 'Biernik',
    questions: 'kogo? co?',
    names: { en: 'Accusative', ru: 'Винительный', tr: 'Belirtme hâli (-i)' },
    note: {
      en: 'The direct object, like "him / her / them" in English: Widzę Annę = I see Anna.',
      ru: 'Почти как винительный. Внимание: у одушевлённых сущ. мужского рода форма = родительному (widzę brata), а во мн. ч. — только для мужчин-лиц (widzę braci, но widzę koty).',
      tr: 'Belirtme hâli (-i) gibi, ama Lehçede belirsiz nesneler de bu hâli alır: Türkçe "kahve içiyorum" (yalın) → Lehçe "piję kawę".',
    },
    example: {
      parts: ['Widzę ', 'Annę', '.'],
      translation: { en: 'I see Anna.', ru: 'Я вижу Анну.', tr: "Anna'yı görüyorum." },
    },
    ui: {
      badge: 'bg-sky-100 text-sky-900 ring-1 ring-sky-300',
      text: 'text-sky-600',
      line: 'bg-sky-400',
      border: 'border-sky-400',
      ring: 'ring-sky-400',
      underline: 'decoration-sky-500',
      highlight: 'bg-sky-200',
    },
  },
  instrumental: {
    pl: 'Narzędnik',
    questions: '(z) kim? (z) czym?',
    names: { en: 'Instrumental', ru: 'Творительный', tr: 'Vasıta hâli (-le)' },
    note: {
      en: '"With / by means of": piszę długopisem = I write with a pen; z Anną = with Anna. Also for professions after być: Jestem studentem.',
      ru: 'Как творительный: z + Narzędnik = «с кем/чем». Но после być профессия тоже в творительном, даже в настоящем времени: Jestem studentem (а не «Я студент»).',
      tr: '-le/-la (ile) eki gibi: z kim? = kiminle? Araç da bu hâlde: jadę tramwajem = tramvayla gidiyorum.',
    },
    example: {
      parts: ['Jadę ', 'tramwajem', '.'],
      translation: { en: "I'm going by tram.", ru: 'Я еду на трамвае.', tr: 'Tramvayla gidiyorum.' },
    },
    ui: {
      badge: 'bg-violet-100 text-violet-900 ring-1 ring-violet-300',
      text: 'text-violet-600',
      line: 'bg-violet-400',
      border: 'border-violet-400',
      ring: 'ring-violet-400',
      underline: 'decoration-violet-500',
      highlight: 'bg-violet-200',
    },
  },
  locative: {
    pl: 'Miejscownik',
    questions: '(o) kim? (o) czym?',
    names: { en: 'Locative', ru: 'Предложный', tr: 'Bulunma hâli (-de)' },
    note: {
      en: 'Used only after prepositions (w, na, o, przy, po): w Krakowie = in Kraków.',
      ru: '= русский предложный: употребляется только с предлогами (w, na, o, przy, po).',
      tr: 'Bulunma hâli (-de) gibi, ama her zaman bir edatla: w domu = evde, o filmie = film hakkında.',
    },
    example: {
      parts: ['Mieszkam w ', 'Krakowie', '.'],
      translation: { en: 'I live in Kraków.', ru: 'Я живу в Кракове.', tr: "Krakow'da yaşıyorum." },
    },
    ui: {
      badge: 'bg-rose-100 text-rose-900 ring-1 ring-rose-300',
      text: 'text-rose-600',
      line: 'bg-rose-400',
      border: 'border-rose-400',
      ring: 'ring-rose-400',
      underline: 'decoration-rose-500',
      highlight: 'bg-rose-200',
    },
  },
  vocative: {
    pl: 'Wołacz',
    questions: 'o!',
    names: { en: 'Vocative', ru: 'Звательный', tr: 'Seslenme hâli' },
    note: {
      en: 'Used when addressing someone directly: Anno! Panie profesorze! English has no special form.',
      ru: 'В русском почти исчез (Боже!, мам!), в польском активно используется: Panie profesorze! Aniu!',
      tr: 'Türkçede seslenme için ek yoktur; Lehçede isim değişir: Anna → Anno! / Aniu!, pan → panie!',
    },
    example: {
      parts: ['Dzień dobry, ', 'panie profesorze', '!'],
      translation: { en: 'Good morning, Professor!', ru: 'Здравствуйте, господин профессор!', tr: 'İyi günler, hocam!' },
    },
    ui: {
      badge: 'bg-teal-100 text-teal-900 ring-1 ring-teal-300',
      text: 'text-teal-600',
      line: 'bg-teal-400',
      border: 'border-teal-400',
      ring: 'ring-teal-400',
      underline: 'decoration-teal-500',
      highlight: 'bg-teal-200',
    },
  },
};
