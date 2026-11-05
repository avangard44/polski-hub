import type { Conjugation, PersonForms, PolishCase, Segment, VerbEntry } from '@/types/grammar';
import { buildVerbEntry } from './verbBuilder';
import { VERBS_PART_1 } from './verbsPart1';
import { VERBS_PART_2 } from './verbsPart2';
import { VERBS_PART_3 } from './verbsPart3';

/* ------------------------------------------------------------------ */
/* Authoring helpers (keep data readable; output is plain typed data)  */
/* ------------------------------------------------------------------ */

const forms = (f: [string, string, string, string, string, string], suffix = ''): PersonForms => ({
  '1sg': f[0] + suffix,
  '2sg': f[1] + suffix,
  '3sg': f[2] + suffix,
  '1pl': f[3] + suffix,
  '2pl': f[4] + suffix,
  '3pl': f[5] + suffix,
});

/** Regular -am/-asz conjugation: szuka- → szukam, szukasz, … */
const amAsz = (stem: string, suffix = '') =>
  forms([`${stem}m`, `${stem}sz`, stem, `${stem}my`, `${stem}cie`, `${stem}ją`], suffix);

/**
 * Past tense from three anchors:
 *  fStem  – feminine stem   (szukał-  → szukałam)
 *  m3sg   – masc. 3sg       (szukał / pomógł)
 *  virile – virile 3pl      (szukali)
 */
const past = (fStem: string, m3sg: string, virile: string, suffix = ''): Conjugation['past'] => ({
  masculine: forms([`${fStem}em`, `${fStem}eś`, m3sg, `${virile}śmy`, `${virile}ście`, virile], suffix),
  feminine: forms([`${fStem}am`, `${fStem}aś`, `${fStem}a`, `${fStem}yśmy`, `${fStem}yście`, `${fStem}y`], suffix),
});

/** Imperfective compound future: będę + infinitive. */
const compoundFuture = (inf: string, reflexive = false) =>
  forms(
    ['będę', 'będziesz', 'będzie', 'będziemy', 'będziecie', 'będą'].map((b) =>
      reflexive ? `${b} się ${inf}` : `${b} ${inf}`,
    ) as [string, string, string, string, string, string],
  );

const imp = (sg2: string, pl1: string, pl2: string): Conjugation['imperative'] => ({
  '2sg': sg2,
  '1pl': pl1,
  '2pl': pl2,
});

// Segment shorthands
const t = (text: string): Segment => ({ text });
const v = (text: string): Segment => ({ text, role: 'verb' });
const p = (text: string, c: PolishCase): Segment => ({ text, role: 'preposition', case: c });
const o = (text: string, c: PolishCase, lemma: string, patternId?: string): Segment => ({
  text,
  role: 'object',
  case: c,
  lemma,
  patternId,
});

/* ------------------------------------------------------------------ */

export const CORE_VERBS: VerbEntry[] = [
  /* ============================ SZUKAĆ + Gen ============================ */
  {
    slug: 'szukac',
    level: 'A1',
    frequencyRank: 210,
    tags: ['daily', 'work'],
    translation: { en: 'to look for, to search', ru: 'искать', tr: 'aramak' },
    aspects: {
      imperfective: {
        infinitive: 'szukać',
        present: amAsz('szuka'),
        future: compoundFuture('szukać'),
        past: past('szukał', 'szukał', 'szukali'),
        imperative: imp('szukaj', 'szukajmy', 'szukajcie'),
      },
      perfective: {
        infinitive: 'poszukać',
        future: amAsz('poszuka'),
        past: past('poszukał', 'poszukał', 'poszukali'),
        imperative: imp('poszukaj', 'poszukajmy', 'poszukajcie'),
      },
    },
    aspectNote: {
      en: 'szukać describes the process of searching (no result implied). poszukać = "search for a while / have a look" – one bounded attempt. The result ("to find") is a different verb: znaleźć.',
      ru: 'szukać — процесс поиска. poszukać — «поискать», ограниченная попытка. Результат «найти» — отдельный глагол: znaleźć (как и в русском: искать → найти).',
      tr: 'szukać aramanın sürecini anlatır. poszukać "biraz aramak, bir göz atmak" demektir (sınırlı tek bir deneme). Sonuç ("bulmak") ayrı bir fiildir: znaleźć.',
    },
    aspectExamples: [
      {
        id: 'szukac-a1',
        aspect: 'imperfective',
        segments: [v('Szukałem '), o('kluczy', 'genitive', 'klucze', 'szukac-gen'), t(' przez godzinę.')],
        translation: {
          en: 'I was looking for my keys for an hour.',
          ru: 'Я искал ключи целый час.',
          tr: 'Bir saat boyunca anahtarlarımı aradım.',
        },
      },
      {
        id: 'szukac-a2',
        aspect: 'perfective',
        segments: [v('Poszukam '), o('tego', 'genitive', 'to', 'szukac-gen'), t(' w internecie.')],
        translation: { en: "I'll look it up online.", ru: 'Поищу это в интернете.', tr: 'İnternette bir bakarım.' },
      },
    ],
    government: [
      {
        id: 'szukac-gen',
        case: 'genitive',
        question: 'kogo? czego?',
        negation: 'unchanged',
        meaning: {
          en: 'to look for someone / something',
          ru: 'искать кого-то / что-то',
          tr: 'birini / bir şeyi aramak',
        },
        contrast: {
          en: {
            equivalent: 'look for + object',
            level: 'mismatch',
            note: 'English needs the preposition "for"; Polish has no preposition but puts the object in the Genitive: szukam pracy – not *szukam pracę or *szukam dla pracy.',
          },
          ru: {
            equivalent: 'искать + В. п. (иногда Р. п.)',
            level: 'partial',
            note: 'В русском обычно винительный: «ищу работу», «ищу ключи»; родительный — лишь с абстрактными словами («искать помощи»). В польском — ВСЕГДА родительный: szukam pracy, szukam kluczy. Типичная ошибка: *szukam pracę.',
          },
          tr: {
            equivalent: 'aramak + belirtme hâli (-ı) / yalın hâl',
            level: 'mismatch',
            note: 'Türkçede nesne belirsizse yalın ("iş arıyorum"), belirliyse -ı hâlinde ("anahtarımı arıyorum"). Lehçede belirli/belirsiz fark etmez: nesne her zaman Dopełniacz hâlindedir: szukam pracy, szukam klucza.',
          },
        },
        examples: [
          {
            id: 'szukac-e1',
            segments: [v('Szukam '), o('pracy', 'genitive', 'praca', 'szukac-gen'), t('.')],
            translation: { en: "I'm looking for a job.", ru: 'Я ищу работу.', tr: 'İş arıyorum.' },
          },
          {
            id: 'szukac-e2',
            segments: [o('Czego', 'genitive', 'co', 'szukac-gen'), v(' szukasz'), t('?')],
            translation: { en: 'What are you looking for?', ru: 'Что ты ищешь?', tr: 'Ne arıyorsun?' },
          },
          {
            id: 'szukac-e3',
            segments: [
              v('Szukamy '),
              o('taniego mieszkania', 'genitive', 'tanie mieszkanie', 'szukac-gen'),
              t(' w centrum.'),
            ],
            translation: {
              en: "We're looking for a cheap apartment in the city centre.",
              ru: 'Мы ищем недорогую квартиру в центре.',
              tr: 'Merkezde ucuz bir daire arıyoruz.',
            },
          },
        ],
      },
    ],
  },

  /* ===================== POMAGAĆ + Dat (+ w + Loc) ===================== */
  {
    slug: 'pomagac',
    level: 'A1',
    frequencyRank: 330,
    tags: ['daily'],
    translation: { en: 'to help', ru: 'помогать', tr: 'yardım etmek' },
    aspects: {
      imperfective: {
        infinitive: 'pomagać',
        present: amAsz('pomaga'),
        future: compoundFuture('pomagać'),
        past: past('pomagał', 'pomagał', 'pomagali'),
        imperative: imp('pomagaj', 'pomagajmy', 'pomagajcie'),
      },
      perfective: {
        infinitive: 'pomóc',
        future: forms(['pomogę', 'pomożesz', 'pomoże', 'pomożemy', 'pomożecie', 'pomogą']),
        past: past('pomogł', 'pomógł', 'pomogli'),
        imperative: imp('pomóż', 'pomóżmy', 'pomóżcie'),
      },
    },
    aspectNote: {
      en: 'pomagać = to help regularly or to be in the middle of helping; pomóc = to help once, with a completed result ("Can you help me?" → pomóc).',
      ru: 'pomagać — помогать (регулярно, процесс); pomóc — помочь (однократно, с результатом). Пара полностью совпадает с русской.',
      tr: 'pomagać: düzenli olarak ya da süreç içinde yardım etmek; pomóc: bir kez, sonucu olan yardım ("Bana yardım edebilir misin?" → pomóc).',
    },
    aspectExamples: [
      {
        id: 'pomagac-a1',
        aspect: 'imperfective',
        segments: [t('Co sobotę '), v('pomagam '), o('dziadkom', 'dative', 'dziadkowie', 'pomagac-dat'), t(' w ogrodzie.')],
        translation: {
          en: 'Every Saturday I help my grandparents in the garden.',
          ru: 'Каждую субботу я помогаю бабушке с дедушкой в саду.',
          tr: 'Her cumartesi bahçede büyükanne ve büyükbabama yardım ediyorum.',
        },
      },
      {
        id: 'pomagac-a2',
        aspect: 'perfective',
        segments: [t('Dzięki, bardzo '), o('mi', 'dative', 'ja', 'pomagac-dat'), v(' pomogłeś'), t('!')],
        translation: {
          en: "Thanks, you've helped me a lot!",
          ru: 'Спасибо, ты мне очень помог!',
          tr: 'Teşekkürler, bana çok yardım ettin!',
        },
      },
    ],
    government: [
      {
        id: 'pomagac-dat',
        case: 'dative',
        question: 'komu? czemu?',
        negation: 'unchanged',
        meaning: { en: 'to help someone', ru: 'помогать кому-то', tr: 'birine yardım etmek' },
        contrast: {
          en: {
            equivalent: 'help + direct object',
            level: 'mismatch',
            note: 'In English "help him" looks like a direct object, so learners say *pomagam go. Polish treats the person helped as a recipient → Dative: pomagam mu, pomagam Annie.',
          },
          ru: {
            equivalent: 'помогать + Д. п.',
            level: 'match',
            note: 'Полное совпадение: помогать кому? — pomagać komu? Pomagam mamie = Помогаю маме.',
          },
          tr: {
            equivalent: 'yardım etmek + yönelme hâli (-e)',
            level: 'match',
            note: 'Türkçedeki gibi: kime? = komu? Anneme yardım ediyorum = Pomagam mamie. Celownik ≈ yönelme hâli.',
          },
        },
        examples: [
          {
            id: 'pomagac-e1',
            segments: [v('Pomagam '), o('mamie', 'dative', 'mama', 'pomagac-dat'), t('.')],
            translation: { en: 'I help my mom.', ru: 'Я помогаю маме.', tr: 'Anneme yardım ediyorum.' },
          },
          {
            id: 'pomagac-e2',
            segments: [t('Czy możesz '), o('mi', 'dative', 'ja', 'pomagac-dat'), t(' '), v('pomóc'), t('?')],
            translation: { en: 'Can you help me?', ru: 'Ты можешь мне помочь?', tr: 'Bana yardım edebilir misin?' },
          },
          {
            id: 'pomagac-e3',
            segments: [t('Wolontariusze '), v('pomagają '), o('uchodźcom', 'dative', 'uchodźcy', 'pomagac-dat'), t('.')],
            translation: {
              en: 'Volunteers help refugees.',
              ru: 'Волонтёры помогают беженцам.',
              tr: 'Gönüllüler mültecilere yardım ediyor.',
            },
          },
        ],
      },
      {
        id: 'pomagac-w-loc',
        case: 'locative',
        preposition: 'w',
        question: 'w czym?',
        negation: 'unchanged',
        meaning: { en: 'to help with something', ru: 'помогать в чём-то / с чем-то', tr: 'bir konuda yardım etmek' },
        contrast: {
          en: {
            equivalent: 'help with + noun',
            level: 'partial',
            note: 'English "with" ≠ Polish z here! Standard Polish uses w + Locative: pomóc w przeprowadzce (help with the move). *Pomóc z przeprowadzką is colloquial and considered incorrect.',
          },
          ru: {
            equivalent: 'помочь с чем-то / в чём-то',
            level: 'partial',
            note: 'Русское «помочь с переездом» соблазняет сказать *pomóc z przeprowadzką. Норма — w + Miejscownik: pomóc w przeprowadzce (ср. «помочь в работе»).',
          },
          tr: {
            equivalent: '-de yardım etmek',
            level: 'match',
            note: 'Türkçe "taşınmada yardım etmek" yapısına benzer: w + Miejscownik ≈ bulunma hâli (-de). Pomóc w przeprowadzce.',
          },
        },
        examples: [
          {
            id: 'pomagac-e4',
            segments: [
              t('Kto '),
              v('pomoże '),
              o('mi', 'dative', 'ja', 'pomagac-dat'),
              t(' '),
              p('w ', 'locative'),
              o('przeprowadzce', 'locative', 'przeprowadzka', 'pomagac-w-loc'),
              t('?'),
            ],
            translation: {
              en: 'Who will help me with the move?',
              ru: 'Кто поможет мне с переездом?',
              tr: 'Taşınmamda bana kim yardım edecek?',
            },
          },
        ],
      },
    ],
  },

  /* ======================= INTERESOWAĆ SIĘ + Inst ======================= */
  {
    slug: 'interesowac-sie',
    level: 'A2',
    frequencyRank: 1250,
    tags: ['daily', 'university'],
    translation: { en: 'to be interested in', ru: 'интересоваться', tr: 'ilgilenmek' },
    aspects: {
      imperfective: {
        infinitive: 'interesować się',
        present: forms(['interesuję', 'interesujesz', 'interesuje', 'interesujemy', 'interesujecie', 'interesują'], ' się'),
        future: compoundFuture('interesować', true),
        past: past('interesował', 'interesował', 'interesowali', ' się'),
        imperative: imp('interesuj się', 'interesujmy się', 'interesujcie się'),
      },
      perfective: {
        infinitive: 'zainteresować się',
        future: forms(
          ['zainteresuję', 'zainteresujesz', 'zainteresuje', 'zainteresujemy', 'zainteresujecie', 'zainteresują'],
          ' się',
        ),
        past: past('zainteresował', 'zainteresował', 'zainteresowali', ' się'),
        imperative: imp('zainteresuj się', 'zainteresujmy się', 'zainteresujcie się'),
      },
    },
    aspectNote: {
      en: 'interesować się = to have an interest (a state); zainteresować się = to become interested, to take an interest (a moment of change).',
      ru: 'interesować się — интересоваться (состояние); zainteresować się — заинтересоваться (начало, изменение).',
      tr: 'interesować się: ilgi duymak (bir durum); zainteresować się: ilgilenmeye başlamak (bir değişim anı).',
    },
    aspectExamples: [
      {
        id: 'interes-a1',
        aspect: 'imperfective',
        segments: [t('Od dziecka '), v('interesuję się '), o('astronomią', 'instrumental', 'astronomia', 'interes-inst'), t('.')],
        translation: {
          en: "I've been interested in astronomy since childhood.",
          ru: 'С детства интересуюсь астрономией.',
          tr: 'Çocukluğumdan beri astronomiyle ilgileniyorum.',
        },
      },
      {
        id: 'interes-a2',
        aspect: 'perfective',
        segments: [t('Policja '), v('zainteresowała się '), o('tą sprawą', 'instrumental', 'ta sprawa', 'interes-inst'), t('.')],
        translation: {
          en: 'The police took an interest in this case.',
          ru: 'Полиция заинтересовалась этим делом.',
          tr: 'Polis bu davayla ilgilenmeye başladı.',
        },
      },
    ],
    government: [
      {
        id: 'interes-inst',
        case: 'instrumental',
        question: 'kim? czym?',
        negation: 'unchanged',
        meaning: {
          en: 'to be interested in someone / something',
          ru: 'интересоваться кем-то / чем-то',
          tr: 'biriyle / bir şeyle ilgilenmek',
        },
        contrast: {
          en: {
            equivalent: 'be interested in + noun',
            level: 'mismatch',
            note: 'No preposition "in"! The topic goes straight into the Instrumental: interesuję się sportem – not *interesuję się w sporcie.',
          },
          ru: {
            equivalent: 'интересоваться + Т. п.',
            level: 'match',
            note: 'Точное совпадение: интересоваться чем? — interesować się czym? Не забудьте возвратное się (как «-ся»).',
          },
          tr: {
            equivalent: '-le/-la ilgilenmek',
            level: 'match',
            note: 'Türkçe "-le ilgilenmek" yapısıyla birebir: müzikle ilgileniyorum = interesuję się muzyką. Narzędnik ≈ -le/-la (ile).',
          },
        },
        examples: [
          {
            id: 'interes-e1',
            segments: [v('Interesuję się '), o('muzyką', 'instrumental', 'muzyka', 'interes-inst'), t('.')],
            translation: { en: "I'm interested in music.", ru: 'Я интересуюсь музыкой.', tr: 'Müzikle ilgileniyorum.' },
          },
          {
            id: 'interes-e2',
            segments: [o('Czym', 'instrumental', 'co', 'interes-inst'), v(' się interesujesz'), t('?')],
            translation: { en: 'What are you interested in?', ru: 'Чем ты интересуешься?', tr: 'Neyle ilgileniyorsun?' },
          },
          {
            id: 'interes-e3',
            segments: [
              t('Mój brat '),
              v('interesuje się '),
              o('historią', 'instrumental', 'historia', 'interes-inst'),
              t(' '),
              o('Polski', 'genitive', 'Polska'),
              t('.'),
            ],
            translation: {
              en: 'My brother is interested in Polish history.',
              ru: 'Мой брат интересуется историей Польши.',
              tr: 'Erkek kardeşim Polonya tarihiyle ilgileniyor.',
            },
          },
        ],
      },
    ],
  },

  /* ========================= CZEKAĆ + na + Acc ========================= */
  {
    slug: 'czekac',
    level: 'A1',
    frequencyRank: 290,
    tags: ['daily', 'travel'],
    translation: { en: 'to wait', ru: 'ждать', tr: 'beklemek' },
    aspects: {
      imperfective: {
        infinitive: 'czekać',
        present: amAsz('czeka'),
        future: compoundFuture('czekać'),
        past: past('czekał', 'czekał', 'czekali'),
        imperative: imp('czekaj', 'czekajmy', 'czekajcie'),
      },
      perfective: {
        infinitive: 'poczekać',
        future: amAsz('poczeka'),
        past: past('poczekał', 'poczekał', 'poczekali'),
        imperative: imp('poczekaj', 'poczekajmy', 'poczekajcie'),
      },
    },
    aspectNote: {
      en: 'czekać = to wait (process, duration); poczekać = to wait for a (short) while – very common in requests: Poczekaj chwilę! (Wait a moment!)',
      ru: 'czekać — ждать (процесс); poczekać — подождать (ограниченное время). Poczekaj chwilę! = Подожди минутку!',
      tr: 'czekać: beklemek (süreç); poczekać: kısa bir süre beklemek – rica ederken sık kullanılır: Poczekaj chwilę! (Bir dakika bekle!)',
    },
    aspectExamples: [
      {
        id: 'czekac-a1',
        aspect: 'imperfective',
        segments: [v('Czekałam '), p('na ', 'accusative'), o('ciebie', 'accusative', 'ty', 'czekac-na-acc'), t(' dwie godziny!')],
        translation: { en: 'I waited for you for two hours!', ru: 'Я ждала тебя два часа!', tr: 'Seni iki saat bekledim!' },
      },
      {
        id: 'czekac-a2',
        aspect: 'perfective',
        segments: [v('Poczekaj '), p('na ', 'accusative'), o('mnie', 'accusative', 'ja', 'czekac-na-acc'), t(' przed kinem.')],
        translation: {
          en: 'Wait for me in front of the cinema.',
          ru: 'Подожди меня у кинотеатра.',
          tr: 'Beni sinemanın önünde bekle.',
        },
      },
    ],
    government: [
      {
        id: 'czekac-na-acc',
        case: 'accusative',
        preposition: 'na',
        question: 'na kogo? na co?',
        negation: 'unchanged',
        meaning: {
          en: 'to wait for someone / something',
          ru: 'ждать кого-то / что-то',
          tr: 'birini / bir şeyi beklemek',
        },
        contrast: {
          en: {
            equivalent: 'wait for + object',
            level: 'match',
            note: 'A rare perfect match for English speakers: "wait for" = czekać na. Just remember that na takes the Accusative here – and negation does NOT change it.',
          },
          ru: {
            equivalent: 'ждать + В. п. / Р. п. (без предлога)',
            level: 'mismatch',
            note: 'В русском нет предлога: «жду автобус / автобуса». В польском обязателен предлог na + Biernik: czekam na autobus. Ошибка: *czekam autobusu. Отрицание падеж не меняет: nie czekam na autobus.',
          },
          tr: {
            equivalent: 'beklemek + belirtme hâli (-i)',
            level: 'mismatch',
            note: 'Türkçede nesne doğrudan -i alır ("otobüsü bekliyorum"). Lehçede edat gerekir: na + Biernik – czekam na autobus.',
          },
        },
        examples: [
          {
            id: 'czekac-e1',
            segments: [v('Czekam '), p('na ', 'accusative'), o('autobus', 'accusative', 'autobus', 'czekac-na-acc'), t('.')],
            translation: { en: "I'm waiting for the bus.", ru: 'Я жду автобус.', tr: 'Otobüsü bekliyorum.' },
            negated: [v('Nie czekam '), p('na ', 'accusative'), o('autobus', 'accusative', 'autobus', 'czekac-na-acc'), t('.')],
            negatedTranslation: {
              en: "I'm not waiting for the bus.",
              ru: 'Я не жду автобуса.',
              tr: 'Otobüsü beklemiyorum.',
            },
          },
          {
            id: 'czekac-e2',
            segments: [p('Na ', 'accusative'), o('kogo', 'accusative', 'kto', 'czekac-na-acc'), v(' czekasz'), t('?')],
            translation: { en: 'Who are you waiting for?', ru: 'Кого ты ждёшь?', tr: 'Kimi bekliyorsun?' },
          },
          {
            id: 'czekac-e3',
            segments: [
              v('Czekamy '),
              p('na ', 'accusative'),
              o('wyniki', 'accusative', 'wyniki', 'czekac-na-acc'),
              t(' '),
              o('egzaminu', 'genitive', 'egzamin'),
              t('.'),
            ],
            translation: {
              en: "We're waiting for the exam results.",
              ru: 'Мы ждём результатов экзамена.',
              tr: 'Sınav sonuçlarını bekliyoruz.',
            },
          },
        ],
      },
    ],
  },

  /* ============================ BAĆ SIĘ + Gen ============================ */
  {
    slug: 'bac-sie',
    level: 'A2',
    frequencyRank: 480,
    tags: ['daily', 'emotions'],
    translation: { en: 'to be afraid (of), to fear', ru: 'бояться', tr: 'korkmak' },
    aspects: {
      imperfective: {
        infinitive: 'bać się',
        present: forms(['boję', 'boisz', 'boi', 'boimy', 'boicie', 'boją'], ' się'),
        future: compoundFuture('bać', true),
        past: past('bał', 'bał', 'bali', ' się'),
        imperative: imp('nie bój się', 'nie bójmy się', 'nie bójcie się'),
      },
    },
    aspectNote: {
      en: 'bać się has no perfective partner – it describes a state. For a sudden moment of fear Polish uses another verb: przestraszyć się (to get scared).',
      ru: 'У bać się нет пары совершенного вида (как и у «бояться»). Момент испуга — другой глагол: przestraszyć się (испугаться).',
      tr: 'bać się fiilinin bitmişlik (perfektif) eşi yoktur, bir durumu anlatır. Ani korku için başka bir fiil kullanılır: przestraszyć się (korkmak, ürkmek).',
    },
    aspectExamples: [
      {
        id: 'bac-a1',
        aspect: 'imperfective',
        segments: [v('Nie bój się'), t(', to tylko burza.')],
        translation: {
          en: "Don't be afraid, it's just a storm.",
          ru: 'Не бойся, это просто гроза.',
          tr: 'Korkma, sadece fırtına.',
        },
      },
      {
        id: 'bac-a2',
        aspect: 'perfective',
        segments: [v('Przestraszyłem się'), t(', kiedy zgasło światło.')],
        translation: {
          en: 'I got scared when the lights went out.',
          ru: 'Я испугался, когда погас свет.',
          tr: 'Işıklar sönünce korktum.',
        },
      },
    ],
    government: [
      {
        id: 'bac-gen',
        case: 'genitive',
        question: 'kogo? czego?',
        negation: 'unchanged',
        meaning: {
          en: 'to be afraid of someone / something',
          ru: 'бояться кого-то / чего-то',
          tr: 'birinden / bir şeyden korkmak',
        },
        contrast: {
          en: {
            equivalent: 'be afraid of + noun',
            level: 'mismatch',
            note: '"of" might tempt you to add a preposition – don\'t. The thing you fear goes straight into the Genitive: boję się pająków (I\'m afraid of spiders).',
          },
          ru: {
            equivalent: 'бояться + Р. п.',
            level: 'match',
            note: 'Полное совпадение: бояться чего? — bać się czego? Boję się psów = Боюсь собак.',
          },
          tr: {
            equivalent: '-den korkmak (ayrılma hâli)',
            level: 'partial',
            note: 'Türkçede "-den korkmak". Lehçede edat yoktur, Dopełniacz kullanılır: köpeklerden korkuyorum = boję się psów.',
          },
        },
        examples: [
          {
            id: 'bac-e1',
            segments: [v('Boję się '), o('psów', 'genitive', 'psy', 'bac-gen'), t('.')],
            translation: { en: "I'm afraid of dogs.", ru: 'Я боюсь собак.', tr: 'Köpeklerden korkuyorum.' },
          },
          {
            id: 'bac-e2',
            segments: [o('Czego', 'genitive', 'co', 'bac-gen'), v(' się boisz'), t('?')],
            translation: { en: 'What are you afraid of?', ru: 'Чего ты боишься?', tr: 'Nelerden korkuyorsun?' },
          },
          {
            id: 'bac-e3',
            segments: [
              t('Wielu studentów '),
              v('boi się '),
              o('egzaminu ustnego', 'genitive', 'egzamin ustny', 'bac-gen'),
              t('.'),
            ],
            translation: {
              en: 'Many students are afraid of the oral exam.',
              ru: 'Многие студенты боятся устного экзамена.',
              tr: 'Birçok öğrenci sözlü sınavdan korkar.',
            },
          },
        ],
      },
    ],
  },

  /* ================ PIĆ + Acc  (→ Gen under negation) ================ */
  {
    slug: 'pic',
    level: 'A1',
    frequencyRank: 520,
    tags: ['daily', 'food'],
    translation: { en: 'to drink', ru: 'пить', tr: 'içmek' },
    aspects: {
      imperfective: {
        infinitive: 'pić',
        present: forms(['piję', 'pijesz', 'pije', 'pijemy', 'pijecie', 'piją']),
        future: compoundFuture('pić'),
        past: past('pił', 'pił', 'pili'),
        imperative: imp('pij', 'pijmy', 'pijcie'),
      },
      perfective: {
        infinitive: 'wypić',
        future: forms(['wypiję', 'wypijesz', 'wypije', 'wypijemy', 'wypijecie', 'wypiją']),
        past: past('wypił', 'wypił', 'wypili'),
        imperative: imp('wypij', 'wypijmy', 'wypijcie'),
      },
    },
    aspectNote: {
      en: 'pić = to drink (habit or process); wypić = to drink up / finish a portion (result). Wypiłem kawę = I drank (all) my coffee.',
      ru: 'pić — пить; wypić — выпить (до конца, с результатом). Пара совпадает с русской.',
      tr: 'pić: içmek (alışkanlık ya da süreç); wypić: içip bitirmek (sonuç). Wypiłem kawę = Kahvemi içtim (bitirdim).',
    },
    aspectExamples: [
      {
        id: 'pic-a1',
        aspect: 'imperfective',
        segments: [t('Zwykle '), v('piję '), o('kawę', 'accusative', 'kawa', 'pic-acc'), t(' bez cukru.')],
        translation: {
          en: 'I usually drink coffee without sugar.',
          ru: 'Обычно я пью кофе без сахара.',
          tr: 'Genelde kahveyi şekersiz içerim.',
        },
      },
      {
        id: 'pic-a2',
        aspect: 'perfective',
        segments: [v('Wypij '), o('lekarstwo', 'accusative', 'lekarstwo', 'pic-acc'), t(', zanim wyjdziesz.')],
        translation: {
          en: 'Take (drink) your medicine before you go out.',
          ru: 'Выпей лекарство, прежде чем уйдёшь.',
          tr: 'Çıkmadan önce ilacını iç.',
        },
      },
    ],
    government: [
      {
        id: 'pic-acc',
        case: 'accusative',
        question: 'co?',
        negation: 'genitive-shift',
        meaning: { en: 'to drink something', ru: 'пить что-то', tr: 'bir şey içmek' },
        contrast: {
          en: {
            equivalent: 'drink + object',
            level: 'partial',
            note: 'Affirmative sentences work like English (direct object → Accusative). But after "nie" the object MUST switch to the Genitive: piję kawę → nie piję kawy. Use the "Negate" toggle to see it.',
          },
          ru: {
            equivalent: 'пить + В. п. (при отрицании В. п. / Р. п.)',
            level: 'partial',
            note: 'В русском при отрицании возможно и «не пью кофе», и «не пью вина». В польском родительный после отрицания ОБЯЗАТЕЛЕН: nie piję kawy, nie piję wina. *Nie piję kawę — ошибка.',
          },
          tr: {
            equivalent: 'içmek + yalın / belirtme hâli',
            level: 'mismatch',
            note: 'Türkçede belirsiz nesne yalın kalır ("kahve içiyorum"). Lehçede her zaman Biernik: piję kawę. Olumsuz cümlede ise nesne Dopełniacz olur: nie piję kawy.',
          },
        },
        examples: [
          {
            id: 'pic-e1',
            segments: [v('Piję '), o('kawę', 'accusative', 'kawa', 'pic-acc'), t('.')],
            translation: { en: 'I drink coffee.', ru: 'Я пью кофе.', tr: 'Kahve içiyorum.' },
            negated: [v('Nie piję '), o('kawy', 'genitive', 'kawa', 'pic-acc'), t('.')],
            negatedTranslation: { en: "I don't drink coffee.", ru: 'Я не пью кофе.', tr: 'Kahve içmiyorum.' },
          },
          {
            id: 'pic-e2',
            segments: [
              t('Wieczorem '),
              v('piję '),
              o('herbatę', 'accusative', 'herbata', 'pic-acc'),
              t(' '),
              p('z ', 'instrumental'),
              o('miodem', 'instrumental', 'miód'),
              t('.'),
            ],
            translation: {
              en: 'In the evening I drink tea with honey.',
              ru: 'Вечером я пью чай с мёдом.',
              tr: 'Akşamları ballı çay içerim.',
            },
            negated: [t('Wieczorem '), v('nie piję '), o('herbaty', 'genitive', 'herbata', 'pic-acc'), t('.')],
            negatedTranslation: {
              en: "I don't drink tea in the evening.",
              ru: 'Вечером я не пью чай.',
              tr: 'Akşamları çay içmem.',
            },
          },
          {
            id: 'pic-e3',
            segments: [o('Co', 'accusative', 'co', 'pic-acc'), v(' pijesz'), t('?')],
            translation: { en: 'What are you drinking?', ru: 'Что ты пьёшь?', tr: 'Ne içiyorsun?' },
          },
        ],
      },
    ],
  },
];

export const VERBS: VerbEntry[] = [
  ...CORE_VERBS,
  ...VERBS_PART_1.map(buildVerbEntry),
  ...VERBS_PART_2.map(buildVerbEntry),
  ...VERBS_PART_3.map(buildVerbEntry),
];

export const getVerb = (slug: string) => VERBS.find((verb) => verb.slug === slug);

/** Display name of the verb pair: "szukać / poszukać". */
export const pairLabel = (verb: VerbEntry) =>
  [verb.aspects.imperfective?.infinitive, verb.aspects.perfective?.infinitive].filter(Boolean).join(' / ');
