import type {
  CurriculumCEFR,
  CurriculumModule,
  PlacementQuestion,
  QuestionnaireItem,
  SubLevel,
} from '@/types/curriculum';
import type { Localized } from '@/types/grammar';

export const CEFR_LEVEL_META: Record<
  CurriculumCEFR,
  {
    code: CurriculumCEFR;
    subLevels: SubLevel[];
    badgeClass: string;
    accentGradient: string;
    ringClass: string;
    title: Localized;
    description: Localized;
  }
> = {
  A1: {
    code: 'A1',
    subLevels: ['A1.1', 'A1.2'],
    badgeClass: 'bg-emerald-100 text-emerald-900 ring-emerald-300',
    accentGradient: 'from-emerald-500 to-teal-500',
    ringClass: 'ring-emerald-400',
    title: {
      en: 'A1 · Beginner Foundations',
      ru: 'A1 · Базовый уровень (С нуля)',
      tr: 'A1 · Başlangıç Temelleri',
    },
    description: {
      en: 'Sounds & alphabet, noun genders, Nominative, Instrumental (Jestem...), Accusative direct objects, and everyday survival vocabulary.',
      ru: 'Алфавит и звуки, род существительных, Именительный, Творительный (Jestem...) и Винительный падежи, базовая лексика и первые диалоги.',
      tr: 'Alfabe ve sesler, isim cinsiyetleri, Yalın hâl, Araç hâli (Jestem...), Belirtme hâli ve günlük temel kelimeler.',
    },
  },
  A2: {
    code: 'A2',
    subLevels: ['A2'],
    badgeClass: 'bg-sky-100 text-sky-900 ring-sky-300',
    accentGradient: 'from-sky-500 to-indigo-500',
    ringClass: 'ring-sky-400',
    title: {
      en: 'A2 · Elementary & Core Cases',
      ru: 'A2 · Элементарный уровень и главные падежи',
      tr: 'A2 · Temel İletişim ve Ana Hâller',
    },
    description: {
      en: 'Genitive of negation & possession, Locative prepositions (w/na), motion vs. location, and university & travel communication.',
      ru: 'Родительный падеж при отрицании и принадлежности, Предложный падеж (w/na), движение и местонахождение, темы учёбы и путешествий.',
      tr: 'Olumsuzluk ve iyelikte Tamlayan hâli, Bulunma hâli edatları (w/na), hareket ve konum, üniversite ve seyahat iletişimi.',
    },
  },
  B1: {
    code: 'B1',
    subLevels: ['B1'],
    badgeClass: 'bg-amber-100 text-amber-900 ring-amber-300',
    accentGradient: 'from-amber-500 to-orange-500',
    ringClass: 'ring-amber-400',
    title: {
      en: 'B1 · Intermediate Aspect & Verb Government',
      ru: 'B1 · Средний уровень: виды глаголов и управление',
      tr: 'B1 · Orta Seviye: Fiil Görünüşü ve Hâl Yönetimi',
    },
    description: {
      en: 'Imperfective vs. Perfective aspect pairs, gendered past tense, Dative case (Celownik), tricky verb government, and workplace Polish.',
      ru: 'Несовершенный и совершенный вид глаголов, род в прошедшем времени, Дательный падеж (Celownik), ловушки управления глаголов и деловой польский.',
      tr: 'Bitmemiş ve bitmiş fiil görünüş çiftleri, cinsiyetli geçmiş zaman, Yönelme hâli (Celownik), fiil yönetimi tuzakları ve iş Lehçesi.',
    },
  },
  B2: {
    code: 'B2',
    subLevels: ['B2'],
    badgeClass: 'bg-violet-100 text-violet-900 ring-violet-300',
    accentGradient: 'from-violet-500 to-rose-500',
    ringClass: 'ring-violet-400',
    title: {
      en: 'B2 · Upper-Intermediate Fluency & Nuance',
      ru: 'B2 · Продвинутая грамматика и свободная речь',
      tr: 'B2 · İleri-Orta Akıcılık ve Nüanslar',
    },
    description: {
      en: 'Conditional mood (-bym/-byś), complex multi-case verb patterns, reflexive constructions, and authentic reading comprehension.',
      ru: 'Сослагательное наклонение (-bym/-byś), сложные модели управления с двумя падежами, возвратные конструкции и чтение оригинальных текстов.',
      tr: 'Dilek-şart kipi (-bym/-byś), çoklu hâl yöneten fiil kalıpları, dönüşlü yapılar ve özgün metin okuma.',
    },
  },
};

export const PLACEMENT_QUESTIONNAIRE: QuestionnaireItem[] = [
  {
    id: 'q-alphabet',
    question: {
      en: '1. Are you familiar with the Polish alphabet and digraphs (sz, cz, szcz, ą, ę, ł)?',
      ru: '1. Знакомы ли вы с польским алфавитом и чтением сочетаний (sz, cz, szcz, ą, ę, ł)?',
      tr: '1. Lehçe alfabeye ve özel harf bileşimlerine (sz, cz, szcz, ą, ę, ł) aşina mısınız?',
    },
    options: [
      {
        label: {
          en: 'No, I am starting from zero',
          ru: 'Нет, я начинаю совсем с нуля',
          tr: 'Hayır, sıfırdan başlıyorum',
        },
        points: 0,
      },
      {
        label: {
          en: 'A little — I can read simple words slowly',
          ru: 'Немного — могу медленно прочитать простые слова',
          tr: 'Biraz — basit kelimeleri yavaşça okuyabiliyorum',
        },
        points: 1,
      },
      {
        label: {
          en: 'Yes, I read Polish pronunciation rules comfortably',
          ru: 'Да, я свободно читаю по-польски и знаю ударение',
          tr: 'Evet, Lehçe telaffuz kurallarını rahatça okuyorum',
        },
        points: 2,
      },
    ],
  },
  {
    id: 'q-cases',
    question: {
      en: '2. How well do you know Polish noun cases (Mianownik, Dopełniacz, Biernik, Narzędnik...)?',
      ru: '2. Насколько вы знакомы с польскими падежами и окончаниями существительных?',
      tr: '2. Lehçe isim hâllerini (Mianownik, Dopełniacz, Biernik, Narzędnik...) ne kadar biliyorsunuz?',
    },
    options: [
      {
        label: {
          en: 'I have not studied Polish cases yet',
          ru: 'Ещё не изучал(а) польские падежи',
          tr: 'Henüz Lehçe hâlleri çalışmadım',
        },
        points: 0,
      },
      {
        label: {
          en: 'I know basic forms like "Jestem studentem" and "Piję kawę"',
          ru: 'Знаю базовые формы вроде «Jestem studentem» и «Piję kawę»',
          tr: '"Jestem studentem" ve "Piję kawę" gibi temel biçimleri biliyorum',
        },
        points: 2,
      },
      {
        label: {
          en: 'I use multiple cases and know that negation triggers Genitive',
          ru: 'Использую разные падежи и знаю, что отрицание требует Родительного падежа',
          tr: 'Birden fazla hâli kullanıyorum ve olumsuzluğun Dopełniacz gerektirdiğini biliyorum',
        },
        points: 4,
      },
    ],
  },
  {
    id: 'q-verbs',
    question: {
      en: '3. Can you conjugate verbs across tenses and distinguish aspect pairs (robić vs. zrobić)?',
      ru: '3. Умеете ли вы спрягать глаголы по временам и различать виды (robić / zrobić)?',
      tr: '3. Fiilleri zamanlara göre çekimleyebiliyor ve görünüş çiftlerini (robić / zrobić) ayırt edebiliyor musunuz?',
    },
    options: [
      {
        label: {
          en: 'Not yet',
          ru: 'Пока нет',
          tr: 'Henüz değil',
        },
        points: 0,
      },
      {
        label: {
          en: 'I know present tense (-ę, -esz / -am, -asz)',
          ru: 'Знаю настоящее время (-ę, -esz / -am, -asz)',
          tr: 'Şimdiki zamanı biliyorum (-ę, -esz / -am, -asz)',
        },
        points: 2,
      },
      {
        label: {
          en: 'Yes, including gendered past (-łem/-łam) and verb government',
          ru: 'Да, включая прошедшее время (-łem/-łam) и управление глаголов',
          tr: 'Evet, cinsiyetli geçmiş zaman (-łem/-łam) ve fiil yönetimi dahil',
        },
        points: 4,
      },
    ],
  },
];

export const PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  {
    id: 'pq-1',
    level: 'A1.1',
    prompt: {
      en: 'Choose the correct demonstrative pronoun for a neuter noun ending in -o: "___ okno jest duże."',
      ru: 'Выберите правильное указательное местоимение для среднего рода на -o: «___ okno jest duże».',
      tr: '-o ile biten nötr isim için doğru işaret zamirini seçin: "___ okno jest duże."',
    },
    sentencePl: '___ okno jest duże.',
    options: ['Ten', 'Ta', 'To', 'Te'],
    correctIndex: 2,
    explanation: {
      en: 'Singular neuter nouns ending in -o or -e take "to" (to okno, to mieszkanie).',
      ru: 'Существительные среднего рода ед. ч. на -o или -e сочетаются с «to» (to okno).',
      tr: '-o veya -e ile biten tekil nötr isimler "to" alır (to okno).',
    },
  },
  {
    id: 'pq-2',
    level: 'A1.2',
    prompt: {
      en: 'How do you say "I am a student" using the Instrumental case (Narzędnik)?',
      ru: 'Как сказать «Я студент» (в польском после «быть кем-то» всегда нужен Творительный падеж)?',
      tr: 'Araç hâli (Narzędnik) kullanarak "Ben öğrenciyim" nasıl denir?',
    },
    sentencePl: 'Jestem ___.',
    options: ['student', 'studentem', 'studenta', 'studencie'],
    correctIndex: 1,
    explanation: {
      en: 'Professions and identities after "być" (jestem) require the Instrumental case: student → studentem.',
      ru: 'После глагола być (jestem) профессия и статус всегда стоят в Творительном падеже (Narzędnik): student → studentem.',
      tr: '"być" (jestem) fiilinden sonra meslek ve kimlikler 항상 Narzędnik (Araç hâli) alır: student → studentem.',
    },
  },
  {
    id: 'pq-3',
    level: 'A1.2',
    prompt: {
      en: 'Complete the sentence with the Accusative case (Biernik): "Codziennie rano piję ___." (czarna kawa)',
      ru: 'Поставьте «czarna kawa» в Винительный падеж (Biernik): «Codziennie rano piję ___».',
      tr: '"czarna kawa" ifadesini Belirtme hâline (Biernik) koyun: "Codziennie rano piję ___."',
    },
    sentencePl: 'Codziennie rano piję ___.',
    options: ['czarna kawa', 'czarną kawę', 'czarnej kawy', 'czarną kawą'],
    correctIndex: 1,
    explanation: {
      en: 'In the Accusative case, feminine adjectives take -ą and nouns ending in -a change to -ę: czarną kawę.',
      ru: 'В Винительном падеже (Biernik) женские прилагательные получают -ą, а существительные на -a меняют окончание на -ę: czarną kawę.',
      tr: 'Biernik hâlinde dişil sıfatlar -ą alır, -a ile biten isimler ise -ę olur: czarną kawę.',
    },
  },
  {
    id: 'pq-4',
    level: 'A2',
    prompt: {
      en: 'What happens to the direct object when you negate an Accusative verb? "Lubię kawę" → "Nie lubię ___."',
      ru: 'Как изменится падеж при отрицании? «Lubię kawę» → «Nie lubię ___».',
      tr: 'Belirtme hâli alan bir fiil olumsuz yapıldığında nesne nasıl değişir? "Lubię kawę" → "Nie lubię ___."',
    },
    sentencePl: 'Nie lubię ___.',
    options: ['kawę', 'kawy', 'kawą', 'kawie'],
    correctIndex: 1,
    explanation: {
      en: 'Genitive of negation: in Polish, negating a direct Accusative verb ALWAYS shifts the object to Genitive (kawa → kawy).',
      ru: 'Родительный отрицания: в польском после «nie» прямое дополнение ВСЕГДА переходит из Винительного в Родительный падеж (kawa → kawy).',
      tr: 'Olumsuzluk genitifi: Lehçede doğrudan Biernik alan bir fiil olumsuzlandığında nesne HER ZAMAN Dopełniacz olur (kawa → kawy).',
    },
  },
  {
    id: 'pq-5',
    level: 'A2',
    prompt: {
      en: 'Which case does the verb "szukać" (to look for) govern? "Szukam ___." (nowa praca)',
      ru: 'Какого падежа требует глагол «szukać» (искать)? «Szukam ___» (nowa praca).',
      tr: '"szukać" (aramak) fiili hangi hâli yönetir? "Szukam ___." (nowa praca)',
    },
    sentencePl: 'Szukam ___.',
    options: ['nową pracę', 'nowej pracy', 'nową pracą', 'o nowej pracy'],
    correctIndex: 1,
    explanation: {
      en: 'Szukać always governs the Genitive case (Dopełniacz — kogo? czego?): szukam nowej pracy.',
      ru: 'В отличие от русского «искать работу (В. п.)», польский глагол szukać всегда требует Родительного падежа (Dopełniacz): szukam nowej pracy.',
      tr: 'Szukać fiili her zaman Dopełniacz (Tamlayan hâli) ister: szukam nowej pracy.',
    },
  },
  {
    id: 'pq-6',
    level: 'B1',
    prompt: {
      en: 'Choose the correct preposition and case for "czekać" (to wait for): "Czekam ___." (autobus)',
      ru: 'Выберите правильный предлог и падеж после глагола «czekać» (ждать): «Czekam ___» (autobus).',
      tr: '"czekać" (beklemek) fiili için doğru edat ve hâli seçin: "Czekam ___." (autobus)',
    },
    sentencePl: 'Czekam ___.',
    options: ['autobusu', 'na autobus', 'za autobusem', 'do autobusu'],
    correctIndex: 1,
    explanation: {
      en: 'In Polish you wait "on something": czekać NA + Accusative (Biernik) → czekam na autobus.',
      ru: 'Ловушка для русскоязычных: в польском нельзя «ждать автобуса» без предлога — только czekać NA + Biernik (Винительный): czekam na autobus.',
      tr: 'Lehçede beklemek fiili "czekać NA + Biernik" kalıbıyla kullanılır: czekam na autobus.',
    },
  },
  {
    id: 'pq-7',
    level: 'B1',
    prompt: {
      en: 'Select the Perfective future form ("I will finish reading the whole book tomorrow"): "Jutro ___ tę książkę do końca."',
      ru: 'Выберите глагол совершенного вида («Завтра я дочитаю эту книгу до конца»): «Jutro ___ tę książkę do końca».',
      tr: 'Bitmiş görünüşlü (Perfektif) gelecek zaman biçimini seçin ("Yarın bu kitabı sonuna kadar okuyacağım"): "Jutro ___ tę książkę do końca."',
    },
    sentencePl: 'Jutro ___ tę książkę do końca.',
    options: ['czytam', 'będę czytać', 'przeczytam', 'czytałem'],
    correctIndex: 2,
    explanation: {
      en: 'A single completed result in the future uses the Perfective verb conjugated like present tense: przeczytam.',
      ru: 'Для однократного завершённого результата в будущем используется глагол совершенного вида (dokonany): przeczytam.',
      tr: 'Gelecekte tamamlanacak tek bir sonuç için perfektif fiil kullanılır: przeczytam.',
    },
  },
  {
    id: 'pq-8',
    level: 'B2',
    prompt: {
      en: 'Choose the correct 1st-person Conditional form ("If I had more time, I would help my friend"): "Gdybym miał więcej czasu, ___ koledze."',
      ru: 'Выберите правильную форму сослагательного наклонения и Дательного падежа: «Gdybym miał więcej czasu, ___ koledze».',
      tr: '1. tekil şahıs dilek-şart kipini seçin ("Daha çok vaktim olsaydı arkadaşıma yardım ederdim"): "Gdybym miał więcej czasu, ___ koledze."',
    },
    sentencePl: 'Gdybym miał więcej czasu, ___ koledze.',
    options: ['pomogę', 'pomógłbym', 'pomagałem', 'pomóc bym'],
    correctIndex: 1,
    explanation: {
      en: 'Conditional mood attaches -bym/-byś/-by to the 3rd person past stem (pomógł + bym → pomógłbym), and pomagać governs Dative (kolega → koledze).',
      ru: 'Сослагательное наклонение образуется от основы прошедшего времени + частица -bym (pomógłbym), а глагол pomagać требует Дательного падежа (kolega → koledze).',
      tr: 'Şart kipi, 3. tekil geçmiş zaman gövdesine -bym/-byś/-by eklenerek yapılır (pomógłbym) ve pomagać fiili Celownik (koledze) alır.',
    },
  },
];

/**
 * Computes assigned SubLevel and highest unlocked module `order` from questionnaire + test score.
 */
export function evaluatePlacement(
  questionnairePoints: number,
  correctAnswers: number,
  totalQuestions: number,
): { assignedLevel: SubLevel; unlockedUpToOrder: number } {
  // Max questionnairePoints = 10, max correctAnswers = 8
  const qNorm = questionnairePoints / 10; // 0..1
  const tNorm = totalQuestions > 0 ? correctAnswers / totalQuestions : 0; // 0..1
  const combined = tNorm * 0.75 + qNorm * 0.25;

  if (combined < 0.25) {
    return { assignedLevel: 'A1.1', unlockedUpToOrder: 1 };
  }
  if (combined < 0.45) {
    return { assignedLevel: 'A1.2', unlockedUpToOrder: 3 };
  }
  if (combined < 0.68) {
    return { assignedLevel: 'A2', unlockedUpToOrder: 5 };
  }
  if (combined < 0.85) {
    return { assignedLevel: 'B1', unlockedUpToOrder: 9 };
  }
  return { assignedLevel: 'B2', unlockedUpToOrder: 12 };
}

export const CURRICULUM_MODULES: CurriculumModule[] = [
  /* ==================== LEVEL A1 (A1.1 & A1.2) ==================== */
  {
    id: 'mod-a1-1',
    slug: 'a1-alphabet-nominative',
    order: 1,
    cefr: 'A1',
    subLevel: 'A1.1',
    category: 'grammar',
    estimatedMinutes: 6,
    xpReward: 50,
    relatedCase: 'nominative',
    title: {
      en: 'Alphabet, Gender & Nominative (Mianownik)',
      ru: 'Алфавит, род и Именительный падеж (Mianownik)',
      tr: 'Alfabe, Cinsiyet ve Yalın Hâl (Mianownik)',
    },
    subtitle: {
      en: 'Pronunciation rules, stress on the penultimate syllable, and identifying masculine, feminine & neuter nouns.',
      ru: 'Правила чтения, ударение на предпоследний слог и три рода существительных (ten, ta, to).',
      tr: 'Telaffuz kuralları, sondan bir önceki hecede vurgu ve eril, dişil, nötr isimler (ten, ta, to).',
    },
    theory: [
      {
        id: 'th-a1-1a',
        heading: {
          en: '1. Polish Stress & Key Digraphs',
          ru: '1. Ударение и главные буквосочетания',
          tr: '1. Lehçe Vurgu ve Temel Harf Bileşimleri',
        },
        body: {
          en: 'In Polish, word stress almost always falls on the second-to-last (penultimate) syllable: War-SZA-wa, stu-DENT-ka. Two-letter combinations represent single sounds: sz (sh), cz (hard ch),rz/ż (zh), and ł sounds like English "w".',
          ru: 'В польском языке ударение почти всегда падает на предпоследний слог: War-SZA-wa, stu-DENT-ka. Важные сочетания: sz = твёрдое [ш], cz = твёрдое [ч], rz/ż = [ж], а буква ł читается как краткое [ў] (как английское w).',
          tr: 'Lehçede kelime vurgusu neredeyse her zaman sondan bir önceki hecededir: War-SZA-wa, stu-DENT-ka. İki harfli bileşimler tek ses verir: sz (ş), cz (sert ç), rz/ż (j) ve ł İngilizce "w" gibi okunur.',
        },
        l1Tip: {
          en: 'Unlike English, Polish spelling is phonetic: once you know the digraphs, you can pronounce any word on sight.',
          ru: 'Главное отличие от русского: безударное «o» в польском НИКОГДА не превращается в «а»! Слово «okno» читается чётко через два [о].',
          tr: 'Türkçe gibi Lehçe de yazıldığı gibi okunur; sadece sz, cz, rz gibi iki harfli kombinasyonları tek ses olarak okumanız gerekir.',
        },
        examples: [
          {
            pl: 'Dzień dobry! Przepraszam, gdzie jest szkoła?',
            highlight: 'szkoła',
            translation: {
              en: 'Good morning! Excuse me, where is the school?',
              ru: 'Добрый день! Извините, где находится школа?',
              tr: 'İyi günler! Affedersiniz, okul nerede?',
            },
          },
        ],
      },
      {
        id: 'th-a1-1b',
        heading: {
          en: '2. Three Genders in Nominative (Ten, Ta, To)',
          ru: '2. Три рода в Именительном падеже (Ten, Ta, To)',
          tr: '2. Yalın Hâlde Üç Cinsiyet (Ten, Ta, To)',
        },
        body: {
          en: 'The dictionary form of a noun is the Nominative case (Mianownik — kto? co?): Masculine (ten) usually ends in a consonant (ten brat, ten telefon); Feminine (ta) ends in -a (ta kawa, ta praca); Neuter (to) ends in -o, -e, or -ę (to okno, to mieszkanie).',
          ru: 'Словарная форма слова — Именительный падеж (Mianownik — kto? co?): Мужской род (ten) обычно оканчивается на согласный (ten brat, ten dom); Женский род (ta) — на -a (ta kawa, ta książka); Средний род (to) — на -o, -e, -ę (to okno, to morze).',
          tr: 'İsmin sözlük biçimi Yalın hâldir (Mianownik — kto? co?): Eril (ten) genelde ünsüzle biter (ten brat, ten telefon); Dişil (ta) -a ile biter (ta kawa); Nötr (to) -o, -e veya -ę ile biter (to okno, to mieszkanie).',
        },
        l1Tip: {
          en: 'Adjectives change their ending to match the noun gender: dobry brat (m), dobra kawa (f), dobre okno (n).',
          ru: 'Род большинства слов совпадает с русским, но будьте внимательны: прилагательные среднего рода имеют окончание -e (dobre okno, nowe mieszkanie).',
          tr: 'Türkçede gramatik cinsiyet yoktur; Lehçede kelimenin son harfine bakarak cinsiyetini (%95 doğrulukla) hemen anlayabilirsiniz.',
        },
        examples: [
          {
            pl: 'Ten nowy telefon · Ta dobra kawa · To duże mieszkanie',
            highlight: 'Ten / Ta / To',
            translation: {
              en: 'This new phone (m) · This good coffee (f) · This big apartment (n)',
              ru: 'Этот новый телефон (м.р.) · Этот хороший кофе (ж.р.) · Эта большая квартира (ср.р.)',
              tr: 'Bu yeni telefon (eril) · Bu iyi kahve (dişil) · Bu büyük daire (nötr)',
            },
          },
        ],
      },
    ],
    exercises: [
      {
        id: 'ex-a1-1-1',
        type: 'fill-blank',
        prompt: {
          en: 'Choose the right demonstrative and adjective ending for a feminine noun:',
          ru: 'Выберите правильную форму для существительного женского рода (kawa):',
          tr: 'Dişil isim (kawa) için doğru işaret sıfatı ve sıfat ekini seçin:',
        },
        sentencePl: '___ ___ kawa jest bardzo smaczna.',
        sentenceTranslation: {
          en: 'This Polish coffee is very tasty.',
          ru: 'Этот польский кофе очень вкусный.',
          tr: 'Bu Leh kahvesi çok lezzetli.',
        },
        governedCase: 'nominative',
        options: ['Ta polska', 'Ten polski', 'To polskie', 'Te polskie'],
        correctIndex: 0,
        explanation: {
          en: '"Kawa" ends in -a (feminine), so it takes "ta" and the feminine adjective ending "-a" (ta polska kawa).',
          ru: 'В польском языке «kawa» — женского рода (на -a), поэтому говорим «ta polska kawa».',
          tr: '"Kawa" -a ile biter (dişil), bu yüzden "ta" ve dişil sıfat eki "-a" alır (ta polska kawa).',
        },
      },
      {
        id: 'ex-a1-1-2',
        type: 'multiple-choice',
        prompt: {
          en: 'Which group contains ONLY neuter (to) nouns?',
          ru: 'В какой строке все существительные относятся к среднему роду (to)?',
          tr: 'Hangi seçenekte SADECE nötr (to) isimler yer almaktadır?',
        },
        options: [
          'okno, mieszkanie, imię',
          'dom, brat, bilet',
          'praca, szkoła, kawa',
          'student, miasto, siostra',
        ],
        correctIndex: 0,
        explanation: {
          en: 'Neuter nouns in Polish end in -o (okno, miasto), -e (mieszkanie), or -ę (imię).',
          ru: 'Существительные среднего рода оканчиваются на -o (okno), -e (mieszkanie) или -ę (imię).',
          tr: 'Lehçede nötr isimler -o (okno), -e (mieszkanie) veya -ę (imię) ile biter.',
        },
      },
      {
        id: 'ex-a1-1-3',
        type: 'fill-blank',
        prompt: {
          en: 'Match the adjective to the neuter noun "mieszkanie":',
          ru: 'Согласуйте прилагательное со словом среднего рода «mieszkanie»:',
          tr: 'Sıfatı nötr isim "mieszkanie" ile uyumlu hâle getirin:',
        },
        sentencePl: 'To jest ___ mieszkanie.',
        sentenceTranslation: {
          en: 'This is a new apartment.',
          ru: 'Это новая квартира.',
          tr: 'Bu yeni bir daire.',
        },
        governedCase: 'nominative',
        options: ['nowy', 'nowa', 'nowe', 'nowej'],
        correctIndex: 2,
        explanation: {
          en: 'Neuter singular adjectives end in -e: nowe mieszkanie.',
          ru: 'Прилагательные среднего рода в Именительном падеже имеют окончание -e: nowe mieszkanie.',
          tr: 'Tekil nötr sıfatlar -e ile biter: nowe mieszkanie.',
        },
      },
    ],
  },

  {
    id: 'mod-a1-2',
    slug: 'a1-daily-vocab',
    order: 2,
    cefr: 'A1',
    subLevel: 'A1.1',
    category: 'vocabulary',
    estimatedMinutes: 6,
    xpReward: 50,
    relatedVocabTopic: 'daily',
    title: {
      en: 'Everyday Words & False Friends',
      ru: 'Базовый словарь быта и «ложные друзья»',
      tr: 'Günlük Kelimeler ve Yalancı Eşdeğerler',
    },
    subtitle: {
      en: 'Essential home, food & city nouns plus famous Polish false friends (sklep, dywan, owoce).',
      ru: 'Главные слова для жизни в Польше и коварные «ложные друзья переводчика» (sklep, dywan, owoce).',
      tr: 'Ev, yemek ve şehir için temel kelimeler ve dikkat edilmesi gereken kelimeler.',
    },
    theory: [
      {
        id: 'th-a1-2a',
        heading: {
          en: '1. Survival Daily Vocabulary',
          ru: '1. Самые нужные слова на каждый день',
          tr: '1. Günlük Hayatta En Gerekli Kelimeler',
        },
        body: {
          en: 'Master these everyday nouns first: sklep (shop/store), mieszkanie (apartment), klucz (key), śniadanie (breakfast), obiad (lunch/main meal), kolacja (dinner), rachunek (bill/check).',
          ru: 'Запомните базовые слова: sklep (магазин), mieszkanie (квартира), klucz (ключ), śniadanie (завтрак), obiad (обед), kolacja (ужин), rachunek (счёт).',
          tr: 'Önce şu temel isimleri öğrenin: sklep (mağaza/market), mieszkanie (daire), klucz (anahtar), śniadanie (kahvaltı), obiad (öğle yemeği), kolacja (akşam yemeği), rachunek (hesap/fatura).',
        },
        l1Tip: {
          en: 'Notice "pensja" means salary (not pension!), and "aktualnie" means currently (not actually!).',
          ru: 'Осторожно с «ложными друзьями»! В польском «sklep» — это магазин (а не склеп), «dywan» — это ковёр (а не диван; диван = kanapa), а «owoce» — это фрукты (овощи = warzywa)!',
          tr: '"Kolacja" Lehçede akşam yemeği demektir; "obiad" ise günün ana sıcak öğünüdür (öğleden sonra yenir).',
        },
        examples: [
          {
            pl: 'Kupuję świeże owoce i warzywa w sklepie.',
            highlight: 'owoce i warzywa w sklepie',
            translation: {
              en: 'I buy fresh fruit and vegetables at the shop.',
              ru: 'Я покупаю свежие фрукты и овощи в магазине.',
              tr: 'Marketten taze meyve ve sebze satın alıyorum.',
            },
          },
        ],
      },
    ],
    exercises: [
      {
        id: 'ex-a1-2-1',
        type: 'multiple-choice',
        prompt: {
          en: 'What does the Polish word "sklep" mean?',
          ru: 'Что означает польское слово «sklep»?',
          tr: 'Lehçe "sklep" kelimesi ne anlama gelir?',
        },
        options: [
          'Shop / Store (Магазин / Mağaza)',
          'Basement / Vault (Подвал / Mahzen)',
          'Sofa / Couch (Диван / Kanepe)',
          'Receipt (Чек / Fiş)',
        ],
        correctIndex: 0,
        explanation: {
          en: '"Sklep" means shop or grocery store in Polish.',
          ru: '«Sklep» по-польски — это обычный магазин или супермаркет.',
          tr: '"Sklep" Lehçede mağaza, dükkân veya market demektir.',
        },
      },
      {
        id: 'ex-a1-2-2',
        type: 'fill-blank',
        prompt: {
          en: 'Complete the restaurant phrase ("Can I have the bill, please?"):',
          ru: 'Дополните фразу в кафе («Можно счёт, пожалуйста?»):',
          tr: 'Restoran ifadesini tamamlayın ("Hesabı alabilir miyim lütfen?"):',
        },
        sentencePl: 'Poproszę ___.',
        sentenceTranslation: {
          en: 'The bill, please.',
          ru: 'Счёт, пожалуйста.',
          tr: 'Hesap, lütfen.',
        },
        options: ['rachunek', 'dywan', 'klucz', 'przystanek'],
        correctIndex: 0,
        explanation: {
          en: '"Rachunek" means bill/check or bank account. "Poproszę rachunek" is used in every café and restaurant.',
          ru: '«Rachunek» — счёт в ресторане или банке. «Poproszę rachunek» — самая полезная фраза в кафе.',
          tr: '"Rachunek" hesap veya fatura demektir. Kafe ve restoranlarda "Poproszę rachunek" kullanılır.',
        },
      },
      {
        id: 'ex-a1-2-3',
        type: 'multiple-choice',
        prompt: {
          en: 'In Polish, "owoce" means:',
          ru: 'Что по-польски означает слово «owoce»?',
          tr: 'Lehçede "owoce" kelimesinin anlamı nedir?',
        },
        options: [
          'Fruits (Фрукты / Meyveler)',
          'Vegetables (Овощи / Sebzeler)',
          'Sweets (Сладости / Tatlılar)',
          'Groceries (Продукты / Bakkal ürünleri)',
        ],
        correctIndex: 0,
        explanation: {
          en: '"Owoce" means fruits! Vegetables in Polish are "warzywa".',
          ru: '«Owoce» — это ФРУКТЫ! А овощи по-польски — «warzywa».',
          tr: '"Owoce" meyveler demektir! Sebzeler ise Lehçede "warzywa"dır.',
        },
      },
    ],
  },

  {
    id: 'mod-a1-3',
    slug: 'a1-instrumental-identity',
    order: 3,
    cefr: 'A1',
    subLevel: 'A1.2',
    category: 'grammar',
    estimatedMinutes: 8,
    xpReward: 60,
    relatedCase: 'instrumental',
    relatedVerbSlug: 'interesowac-sie',
    title: {
      en: 'Instrumental Case (Narzędnik): Professions & "With"',
      ru: 'Творительный падеж (Narzędnik): «Кем я работаю» и предлог «z»',
      tr: 'Araç Hâli (Narzędnik): Meslekler ve "z" (ile) Edatı',
    },
    subtitle: {
      en: 'Saying who you are (Jestem studentem / Polką), ordering "kawa z mlekiem", and verbs like interesować się.',
      ru: 'Почему нельзя сказать «Jestem student», как заказать «kawa z mlekiem» и глагол interesować się.',
      tr: 'Kim olduğunuzu söylemek (Jestem studentem), "kawa z mlekiem" sipariş etmek ve interesować się fiili.',
    },
    theory: [
      {
        id: 'th-a1-3a',
        heading: {
          en: '1. Identity & Profession after "być" (Jestem...)',
          ru: '1. Профессия и национальность после «być» (Jestem...)',
          tr: '1. "być" (Jestem...) Sonrasında Meslek ve Kimlik',
        },
        body: {
          en: 'Whenever you state someone’s profession, nationality, or role after "być" (jestem, jesteś, jest), Polish requires the Instrumental case (Narzędnik — kim? czym?): Masculine/Neuter nouns add -em (adj: -ym/-im), and Feminine nouns/adjectives take -ą.',
          ru: 'В настоящем времени после глагола «być» (jestem, jesteś, jest) существительное со значением профессии, национальности или роли ВСЕГДА ставится в Творительный падеж (Narzędnik — kim? czym?): мужской и средний род получают окончание -em (прил. -ym/-im), а женский род — -ą.',
          tr: '"być" (jestem, jesteś, jest) fiilinden sonra meslek, milliyet veya rol belirtirken Lehçe her zaman Narzędnik (Araç hâli) ister: Eril/Nötr isimler -em (sıfat: -ym/-im), Dişil isim ve sıfatlar -ą alır.',
        },
        l1Tip: {
          en: 'English uses Nominative ("I am a doctor"), so remember to add -em (m) or -ą (f) in Polish: Jestem lekarzem / lekarką.',
          ru: 'В русском мы говорим в Именительном («Я студент»), а в польском «Jestem student» — грубая ошибка! Правильно только: «Jestem studentem» / «Jestem studentką».',
          tr: 'Türkçede "-im/-ım" (öğrenciyim) eklenir; Lehçede ise kelime Narzędnik ekini alır: Jestem studentem (erkek) / Jestem studentką (kadın).',
        },
        examples: [
          {
            pl: 'Mój brat jest dobrym programistą, a siostra jest lekarką.',
            highlight: 'dobrym programistą / lekarką',
            translation: {
              en: 'My brother is a good programmer, and my sister is a doctor.',
              ru: 'Мой брат — хороший программист, а сестра — врач.',
              tr: 'Kardeşim iyi bir programcı, kız kardeşim ise doktor.',
            },
          },
        ],
      },
      {
        id: 'th-a1-3b',
        heading: {
          en: '2. Preposition "z" (with) & Verb "interesować się"',
          ru: '2. Предлог «z» (с кем/чем) и глагол «interesować się»',
          tr: '2. "z" (ile) Edatı ve "interesować się" Fiili',
        },
        body: {
          en: 'The preposition "z" meaning "together with" always takes Instrumental: herbata z cytryną (tea with lemon), kawa z mlekiem (coffee with milk). Verbs of interest and travel like "interesować się" (to be interested in) and "jechać" (by transport) also take Instrumental.',
          ru: 'Предлог «z» («с кем? с чем?») и глаголы вроде «interesować się» (интересоваться чем-то), «zajmować się» (заниматься чем-то) требуют Творительного падежа: kawa z mlekiem, interesuję się muzyką.',
          tr: '"Birlikte / ile" anlamındaki "z" edatı ve "interesować się" (ilgilenmek) fiili her zaman Narzędnik alır: kawa z mlekiem (sütlü kahve), interesuję się muzyką (müzikle ilgileniyorum).',
        },
        l1Tip: {
          en: 'Transport without a preposition uses Instrumental: jadę pociągiem / autobusem (I go by train / by bus).',
          ru: 'Полное совпадение с русским: «кофе с молоком» = kawa z mlekiem, «интересоваться музыкой» = interesować się muzyką, «ехать поездом» = jechać pociągiem.',
          tr: 'Ulaşım araçlarında edat kullanılmaz, doğrudan Narzędnik kullanılır: jadę pociągiem (trenle gidiyorum).',
        },
        examples: [
          {
            pl: 'Piję herbatę z cytryną i jadę do pracy pociągiem.',
            highlight: 'z cytryną / pociągiem',
            translation: {
              en: 'I drink tea with lemon and go to work by train.',
              ru: 'Я пью чай с лимоном и еду на работу поездом.',
              tr: 'Limonlu çay içiyorum ve işe trenle gidiyorum.',
            },
          },
        ],
      },
    ],
    exercises: [
      {
        id: 'ex-a1-3-1',
        type: 'fill-blank',
        prompt: {
          en: 'Put "nowy inżynier" (masculine) into the Instrumental case:',
          ru: 'Поставьте «nowy inżynier» (мужской род) в Творительный падеж (Narzędnik):',
          tr: '"nowy inżynier" (eril) ifadesini Narzędnik hâline koyun:',
        },
        sentencePl: 'On jest ___.',
        sentenceTranslation: {
          en: 'He is a new engineer.',
          ru: 'Он новый инженер.',
          tr: 'O yeni bir mühendis.',
        },
        governedCase: 'instrumental',
        options: ['nowy inżynier', 'nowym inżynierem', 'nowego inżyniera', 'nowemu inżynierowi'],
        correctIndex: 1,
        explanation: {
          en: 'Masculine Instrumental takes -ym/-im for the adjective and -em for the noun: nowym inżynierem.',
          ru: 'В Творительном падеже мужского рода прилагательное получает -ym, а существительное -em: nowym inżynierem.',
          tr: 'Eril Narzędnik sıfatlarda -ym/-im, isimlerde -em alır: nowym inżynierem.',
        },
      },
      {
        id: 'ex-a1-3-2',
        type: 'case-match',
        prompt: {
          en: 'Which case and form does "interesować się" require for "polska kultura"?',
          ru: 'Какого падежа и окончания требует глагол «interesować się» для «polska kultura»?',
          tr: '"interesować się" fiili "polska kultura" için hangi hâl ve eki gerektirir?',
        },
        sentencePl: 'Interesuję się ___.',
        sentenceTranslation: {
          en: 'I am interested in Polish culture.',
          ru: 'Я интересуюсь польской культурой.',
          tr: 'Leh kültürüyle ilgileniyorum.',
        },
        governedCase: 'instrumental',
        options: [
          'Narzędnik: polską kulturą',
          'Biernik: polską kulturę',
          'Dopełniacz: polskiej kultury',
          'Mianownik: polska kultura',
        ],
        correctIndex: 0,
        explanation: {
          en: '"Interesować się" governs Instrumental (Narzędnik). Feminine nouns and adjectives both end in -ą: polską kulturą.',
          ru: 'Глагол «interesować się» управляет Творительным падежом (Narzędnik). В женском роде и прилагательное, и существительное имеют окончание -ą: polską kulturą.',
          tr: '"Interesować się" Narzędnik yönetir. Dişil isim ve sıfatların ikisi de -ą ile biter: polską kulturą.',
        },
      },
      {
        id: 'ex-a1-3-3',
        type: 'fill-blank',
        prompt: {
          en: 'Order coffee with milk ("mleko" — neuter):',
          ru: 'Закажите кофе с молоком («mleko» — средний род):',
          tr: 'Sütlü kahve sipariş edin ("mleko" — nötr):',
        },
        sentencePl: 'Poproszę kawę z ___.',
        sentenceTranslation: {
          en: 'Coffee with milk, please.',
          ru: 'Кофе с молоком, пожалуйста.',
          tr: 'Sütlü kahve, lütfen.',
        },
        governedCase: 'instrumental',
        options: ['mlekiem', 'mleko', 'mleka', 'mleku'],
        correctIndex: 0,
        explanation: {
          en: 'After "z" (with), neuter nouns take -em (with k → ki softening before -em): mleko → z mlekiem.',
          ru: 'После предлога «z» средний род получает окончание -em (после k добавляется мягкость i): mleko → z mlekiem.',
          tr: '"z" (ile) edatından sonra nötr isimler -em alır (k sesi -em önünde ki olur): mleko → z mlekiem.',
        },
      },
    ],
  },

  {
    id: 'mod-a1-4',
    slug: 'a1-accusative-reading',
    order: 4,
    cefr: 'A1',
    subLevel: 'A1.2',
    category: 'reading',
    estimatedMinutes: 8,
    xpReward: 70,
    relatedCase: 'accusative',
    relatedVerbSlug: 'kupowac',
    title: {
      en: 'Reading & Accusative (Biernik): Morning in a Kraków Café',
      ru: 'Чтение и Винительный падеж (Biernik): Утро в краковском кафе',
      tr: 'Okuma ve Belirtme Hâli (Biernik): Kraków Kafesinde Sabah',
    },
    subtitle: {
      en: 'Direct objects (kupować, pić, mieć, widzieć) and an authentic A1 dialogue in Kraków.',
      ru: 'Прямое дополнение после глаголов mieć, pić, kupować и диалог в кафе Кракова.',
      tr: 'Doğrudan nesneler (kupować, pić, mieć, widzieć) ve Kraków’da bir A1 diyaloğu.',
    },
    theory: [
      {
        id: 'th-a1-4a',
        heading: {
          en: 'How Accusative (Biernik — kogo? co?) Changes Nouns',
          ru: 'Как меняется Винительный падеж (Biernik — kogo? co?)',
          tr: 'Belirtme Hâli (Biernik — kogo? co?) İsimleri Nasıl Değiştirir?',
        },
        body: {
          en: 'The Accusative case marks the direct object of verbs like mieć (have), kupować (buy), czytać (read), pić (drink), and kochać (love): 1) Feminine nouns change -a → -ę (adj -a → -ą): dobrą kawę. 2) Masculine INANIMATE (things) and Neuter do NOT change! (kupuję nowy telefon, nowe mieszkanie). 3) Masculine ANIMATE (people/animals) takes -a (adj -ego): mam dobrego brata.',
          ru: 'Винительный падеж (Biernik) используется для прямого объекта (имею, пью, покупаю, вижу): 1) Женский род меняет -a → -ę (прил. -ą): dobrą kawę. 2) Мужской неодушевлённый и средний род НЕ меняются (kupuję nowy bilet, dobre ciasto). 3) Мужской одушевлённый получает -a (прил. -ego): mam starszego brata.',
          tr: 'Biernik hâli mieć, kupować, czytać, pić gibi fiillerin doğrudan nesnesidir: 1) Dişil isimlerde -a → -ę (sıfat -ą) olur: dobrą kawę. 2) Cansız eril ve nötr isimler DEĞİŞMEZ (nowy bilet). 3) Canlı eril isimler -a (sıfat -ego) alır: mam dobrego brata.',
        },
        l1Tip: {
          en: 'Only feminine (-a → -ę) and animate masculine (-a) change in the singular Accusative!',
          ru: 'Запомните главное отличие в женском роде: у существительного пишется -ę (kawę), а у прилагательного -ą (czarną) — они рифмуются с русскими «чёрнУЮ кофе/книгУ», но буквы разные!',
          tr: 'Tekil Biernik hâlinde sadece dişil (-a → -ę) ve canlı eril (-a) kelimeler değişir; cansız eril ve nötr kelimeler yalın hâlde kalır.',
        },
        examples: [
          {
            pl: 'Widzę mojego dobrego kolegę i kupuję czarną kawę oraz nowy bilet.',
            highlight: 'dobrego kolegę / czarną kawę / nowy bilet',
            translation: {
              en: 'I see my good friend (m. anim.) and buy black coffee (f.) and a new ticket (m. inanim.).',
              ru: 'Я вижу моего хорошего друга (м. одуш.) и покупаю чёрный кофе (ж.р.) и новый билет (м. неодуш.).',
              tr: 'İyi arkadaşımı (canlı eril) görüyorum ve sade kahve (dişil) ile yeni bilet (cansız eril) alıyorum.',
            },
          },
        ],
      },
    ],
    reading: {
      title: {
        en: 'Story: Morning at a Café on the Main Square',
        ru: 'Текст: Утро в кафе на Главном Рынке в Кракове',
        tr: 'Hikâye: Ana Meydan’daki Kafede Sabah',
      },
      plParagraphs: [
        'Cześć! Mam na imię Marek i jestem architektem. Mieszkam w Krakowie. Codziennie rano idę do małej kawiarni i zamawiam czarną kawę oraz świeżą bułkę z serem.',
        'Dzisiaj w kawiarni widzę moją dobrą koleżankę Annę. Anna jest studentką. Ona czyta ciekawą książkę i pije zieloną herbatę z cytryną.',
        'Mamy chwilę przed pracą, więc rozmawiamy, a potem proszę kelnera o rachunek i kupuję bilet na tramwaj.',
      ],
      translationParagraphs: {
        en: [
          'Hi! My name is Marek and I am an architect. I live in Kraków. Every morning I go to a small café and order a black coffee and a fresh roll with cheese.',
          'Today at the café I see my good friend Anna. Anna is a student. She is reading an interesting book and drinking green tea with lemon.',
          'We have a moment before work, so we chat, and then I ask the waiter for the bill and buy a tram ticket.',
        ],
        ru: [
          'Привет! Меня зовут Марек, я архитектор. Я живу в Кракове. Каждое утро я иду в маленькое кафе и заказываю чёрный кофе и свежую булочку с сыром.',
          'Сегодня в кафе я вижу мою хорошую подругу Анну. Анна — студентка. Она читает интересную книгу и пьёт зелёный чай с лимоном.',
          'У нас есть минутка перед работой, поэтому мы разговариваем, а потом я прошу у официанта счёт и покупаю билет на трамвай.',
        ],
        tr: [
          'Merhaba! Adım Marek ve mimarım. Kraków’da yaşıyorum. Her sabah küçük bir kafeye gidiyorum ve sade kahve ile peynirli taze bir sandviç ekmeği sipariş ediyorum.',
          'Bugün kafede iyi arkadaşım Anna’yı görüyorum. Anna öğrenci. O ilginç bir kitap okuyor ve limonlu yeşil çay içiyor.',
          'İşten önce biraz vaktimiz var, bu yüzden sohbet ediyoruz, sonra garsondan hesabı istiyorum ve tramvay bileti alıyorum.',
        ],
      },
      keyPhrases: [
        {
          pl: 'zamawiam czarną kawę',
          translation: {
            en: 'I order black coffee (Accusative f.)',
            ru: 'заказываю чёрный кофе (Винительный ж.р.)',
            tr: 'sade kahve sipariş ediyorum (Biernik dişil)',
          },
        },
        {
          pl: 'z serem / z cytryną',
          translation: {
            en: 'with cheese / with lemon (Instrumental)',
            ru: 'с сыром / с лимоном (Творительный)',
            tr: 'peynirli / limonlu (Narzędnik)',
          },
        },
        {
          pl: 'kupuję bilet na tramwaj',
          translation: {
            en: 'I buy a tram ticket (Accusative m. inanim.)',
            ru: 'покупаю билет на трамвай (Винительный м. неодуш.)',
            tr: 'tramvay bileti alıyorum (Biernik cansız eril)',
          },
        },
      ],
    },
    exercises: [
      {
        id: 'ex-a1-4-1',
        type: 'multiple-choice',
        prompt: {
          en: 'According to the text, what does Anna drink at the café?',
          ru: 'Согласно тексту, что Анна пьёт в кафе?',
          tr: 'Metne göre Anna kafede ne içiyor?',
        },
        options: [
          'Zieloną herbatę z cytryną',
          'Czarną kawę z mlekiem',
          'Zimną wodę',
          'Sok pomarańczowy',
        ],
        correctIndex: 0,
        explanation: {
          en: 'The text says: "Ona czyta ciekawą książkę i pije zieloną herbatę z cytryną."',
          ru: 'В тексте сказано: «Ona czyta ciekawą książkę i pije zieloną herbatę z cytryną» (зелёный чай с лимоном).',
          tr: 'Metinde şöyle deniyor: "Ona czyta ciekawą książkę i pije zieloną herbatę z cytryną."',
        },
      },
      {
        id: 'ex-a1-4-2',
        type: 'fill-blank',
        prompt: {
          en: 'Put "ciekawa książka" into the Accusative case (Biernik):',
          ru: 'Поставьте «ciekawa książka» в Винительный падеж (Biernik):',
          tr: '"ciekawa książka" ifadesini Belirtme hâline (Biernik) koyun:',
        },
        sentencePl: 'Anna czyta ___.',
        sentenceTranslation: {
          en: 'Anna is reading an interesting book.',
          ru: 'Анна читает интересную книгу.',
          tr: 'Anna ilginç bir kitap okuyor.',
        },
        governedCase: 'accusative',
        options: ['ciekawą książkę', 'ciekawa książka', 'ciekawej książki', 'ciekawą książką'],
        correctIndex: 0,
        explanation: {
          en: 'In Feminine Accusative, the adjective ends in -ą and the noun ends in -ę: ciekawą książkę.',
          ru: 'В Винительном падеже женского рода прилагательное оканчивается на -ą, а существительное на -ę: ciekawą książkę.',
          tr: 'Dişil Biernik hâlinde sıfat -ą, isim ise -ę ile biter: ciekawą książkę.',
        },
      },
      {
        id: 'ex-a1-4-3',
        type: 'fill-blank',
        prompt: {
          en: 'Put the animate masculine phrase "dobry kolega" (or "starszy brat") into the Accusative case:',
          ru: 'Поставьте одушевлённое существительное мужского рода «starszy brat» в Винительный падеж:',
          tr: 'Canlı eril "starszy brat" ifadesini Belirtme hâline (Biernik) koyun:',
        },
        sentencePl: 'Marek ma ___.',
        sentenceTranslation: {
          en: 'Marek has an older brother.',
          ru: 'У Марека есть старший брат.',
          tr: 'Marek’in bir ağabeyi var.',
        },
        governedCase: 'accusative',
        options: ['starszego brata', 'starszy brat', 'starszym bratem', 'starszemu bratu'],
        correctIndex: 0,
        explanation: {
          en: 'Masculine animate nouns take -a (adj -ego) in the Accusative: mam starszego brata.',
          ru: 'Мужской одушевлённый род в Винительном падеже получает окончание -a (прил. -ego): mam starszego brata.',
          tr: 'Canlı eril isimler Biernik hâlinde -a (sıfat -ego) alır: mam starszego brata.',
        },
      },
    ],
  },

  /* ==================== LEVEL A2 ==================== */
  {
    id: 'mod-a2-1',
    slug: 'a2-genitive-negation',
    order: 5,
    cefr: 'A2',
    subLevel: 'A2',
    category: 'grammar',
    estimatedMinutes: 9,
    xpReward: 80,
    relatedCase: 'genitive',
    relatedVerbSlug: 'szukac',
    title: {
      en: 'Genitive (Dopełniacz): Negation & Verbs like "Szukać"',
      ru: 'Родительный падеж (Dopełniacz): Отрицание и глаголы szukać, słuchać',
      tr: 'Tamlayan Hâli (Dopełniacz): Olumsuzluk ve "Szukać" Grubu Fiiller',
    },
    subtitle: {
      en: 'Why every negated Accusative flips to Genitive, plus verbs of seeking, listening, and needing.',
      ru: 'Железное правило «nie + Dopełniacz» и глаголы, которые всегда требуют Родительного падежа.',
      tr: 'Olumsuz cümlelerde Biernik → Dopełniacz dönüşümü ve aramak/dinlemek/ihtiyaç duymak fiilleri.',
    },
    theory: [
      {
        id: 'th-a2-1a',
        heading: {
          en: '1. The Iron Rule: Genitive of Negation',
          ru: '1. Железное правило: Родительный падеж при отрицании',
          tr: '1. Demir Kural: Olumsuzlukta Tamlayan Hâli (Dopełniacz)',
        },
        body: {
          en: 'In Polish, whenever you negate a verb that takes a direct Accusative object, the object MUST switch to the Genitive case (Dopełniacz — kogo? czego?): Mam czas (Acc) → Nie mam czasu (Gen). Lubię czarną kawę (Acc) → Nie lubię czarnej kawy (Gen).',
          ru: 'В польском языке действует строгое правило: если переходный глагол с Винительным падежом ставится с частицей «nie», дополнение ОБЯЗАТЕЛЬНО переходит в Родительный падеж (Dopełniacz): Mam bilet → Nie mam biletu; Piję czarną kawę → Nie piję czarnej kawy.',
          tr: 'Lehçede doğrudan Biernik (Belirtme) nesnesi alan bir fiili "nie" ile olumsuz yaptığınızda nesne ZORUNLU OLARAK Dopełniacz (Tamlayan) hâline geçer: Mam czas → Nie mam czasu; Lubię czarną kawę → Nie lubię czarnej kawy.',
        },
        l1Tip: {
          en: 'Endings in Genitive: Feminine -y/-i (adj -ej: nowej pracy); Masculine/Neuter adj -ego, noun -a (animate/objects) or -u (abstract/substances: czasu, biletu).',
          ru: 'В русском языке после «не» часто остаётся Винительный («не люблю чёрный кофе», «не вижу маму»), а в польском — ТОЛЬКО Родительный («Nie lubię czarnej kawy», «Nie widzę mamy»)!',
          tr: 'Dopełniacz ekleri: Dişil isimler -y/-i (sıfat -ej: nowej pracy); Eril/Nötr sıfatlar -ego, isimler -a veya -u (czasu, biletu) alır.',
        },
        examples: [
          {
            pl: 'Mam nowy samochód (Biernik) → Nie mam nowego samochodu (Dopełniacz).',
            highlight: 'nowego samochodu',
            translation: {
              en: 'I have a new car → I do not have a new car.',
              ru: 'У меня есть новая машина → У меня нет новой машины.',
              tr: 'Yeni bir arabam var → Yeni bir arabam yok.',
            },
          },
        ],
      },
      {
        id: 'th-a2-1b',
        heading: {
          en: '2. High-Frequency Genitive Verbs: Szukać, Słuchać, Potrzebować, Uczyć się',
          ru: '2. Глаголы, всегда требующие Dopełniacz: szukać, słuchać, potrzebować, uczyć się',
          tr: '2. Her Zaman Dopełniacz İsteyen Fiiller: Szukać, Słuchać, Potrzebować, Uczyć się',
        },
        body: {
          en: 'Several core Polish verbs always govern the Genitive case even in positive sentences: szukać (to look for), słuchać (to listen to), potrzebować (to need), uczyć się (to study/learn), bać się (to be afraid of), używać (to use).',
          ru: 'Целая группа важнейших глаголов всегда управляет Родительным падежом (даже без отрицания): szukać (искать), słuchać (слушать), potrzebować (нуждаться), uczyć się (учить что-то), używać (использовать).',
          tr: 'Birçok temel Lehçe fiil olumlu cümlelerde bile her zaman Dopełniacz ister: szukać (aramak), słuchać (dinlemek), potrzebować (ihtiyaç duymak), uczyć się (öğrenmek), używać (kullanmak).',
        },
        l1Tip: {
          en: 'Think of them as "seeking / needing / taking a piece of something" → Genitive.',
          ru: 'Внимание! По-русски мы говорим «слушать музыку», «искать квартиру», «учить польский язык» (везде Винительный!), а по-польски — ТОЛЬКО Родительный: słuchać muzyki, szukać mieszkania, uczyć się języka polskiego!',
          tr: 'Türkçede "müzik dinlemek, iş aramak, Lehçe öğrenmek" nesne alır; Lehçede bu fiillerin tamamı Dopełniacz (nowej pracy, muzyki, języka polskiego) alır.',
        },
        examples: [
          {
            pl: 'Szukam taniego mieszkania, słucham polskiej muzyki i uczę się języka polskiego.',
            highlight: 'taniego mieszkania / polskiej muzyki / języka polskiego',
            translation: {
              en: 'I am looking for a cheap apartment, listening to Polish music, and learning Polish.',
              ru: 'Я ищу недорогую квартиру, слушаю польскую музыку и учу польский язык.',
              tr: 'Ucuz bir daire arıyorum, Leh müziği dinliyorum ve Lehçe öğreniyorum.',
            },
          },
        ],
      },
    ],
    exercises: [
      {
        id: 'ex-a2-1-1',
        type: 'fill-blank',
        prompt: {
          en: 'Negate the sentence using the Genitive of negation ("ciekawa książka"):',
          ru: 'Поставьте словосочетание «ciekawa książka» в нужный падеж после отрицания «nie»:',
          tr: 'Olumsuzluk genitifi kullanarak cümleyi tamamlayın ("ciekawa książka"):',
        },
        sentencePl: 'Nie czytam tej ___.',
        sentenceTranslation: {
          en: 'I am not reading this interesting book.',
          ru: 'Я не читаю эту интересную книгу.',
          tr: 'Bu ilginç kitabı okumuyorum.',
        },
        governedCase: 'genitive',
        options: ['ciekawej książki', 'ciekawą książkę', 'ciekawa książka', 'ciekawą książką'],
        correctIndex: 0,
        explanation: {
          en: 'After "nie", Accusative shifts to Genitive: feminine adjective takes -ej and noun takes -i (after k): ciekawej książki.',
          ru: 'После «nie» Винительный падеж переходит в Родительный (Dopełniacz): женское прилагательное получает -ej, а существительное -i: ciekawej książki.',
          tr: '"nie" sonrasında Biernik, Dopełniacz olur: dişil sıfat -ej, isim ise -i alır: ciekawej książki.',
        },
      },
      {
        id: 'ex-a2-1-2',
        type: 'case-match',
        prompt: {
          en: 'Which case and form does "słuchać" (to listen to) require for "polska muzyka"?',
          ru: 'Какого падежа и формы требует глагол «słuchać» (слушать) для «polska muzyka»?',
          tr: '"słuchać" (dinlemek) fiili "polska muzyka" için hangi hâl ve biçimi ister?',
        },
        sentencePl: 'Wieczorem słucham ___.',
        sentenceTranslation: {
          en: 'In the evening I listen to Polish music.',
          ru: 'Вечером я слушаю польскую музыку.',
          tr: 'Akşamları Leh müziği dinliyorum.',
        },
        governedCase: 'genitive',
        options: [
          'Dopełniacz: polskiej muzyki',
          'Biernik: polską muzykę',
          'Narzędnik: polską muzyką',
          'Celownik: polskiej muzyce',
        ],
        correctIndex: 0,
        explanation: {
          en: '"Słuchać" always governs the Genitive case (Dopełniacz): słucham polskiej muzyki.',
          ru: 'Глагол «słuchać» всегда требует Родительного падежа (Dopełniacz): słucham polskiej muzyki (а не *polską muzykę!).',
          tr: '"Słuchać" fiili her zaman Dopełniacz (Tamlayan hâli) yönetir: słucham polskiej muzyki.',
        },
      },
      {
        id: 'ex-a2-1-3',
        type: 'fill-blank',
        prompt: {
          en: 'Complete with the Genitive form after "uczyć się" (język polski):',
          ru: 'Дополните предложение после глагола «uczyć się» (język polski):',
          tr: '"uczyć się" fiilinden sonra Dopełniacz biçimiyle tamamlayın (język polski):',
        },
        sentencePl: 'Od roku uczę się ___.',
        sentenceTranslation: {
          en: 'I have been learning the Polish language for a year.',
          ru: 'Я уже год учу польский язык.',
          tr: 'Bir yıldır Leh dili öğreniyorum.',
        },
        governedCase: 'genitive',
        options: ['języka polskiego', 'język polski', 'językiem polskim', 'języku polskim'],
        correctIndex: 0,
        explanation: {
          en: '"Uczyć się" governs Genitive: język polski → języka polskiego.',
          ru: 'Глагол «uczyć się» требует Родительного падежа (kogo? czego?): uczę się języka polskiego.',
          tr: '"Uczyć się" Dopełniacz alır: język polski → języka polskiego.',
        },
      },
    ],
  },

  {
    id: 'mod-a2-2',
    slug: 'a2-university-travel-vocab',
    order: 6,
    cefr: 'A2',
    subLevel: 'A2',
    category: 'vocabulary',
    estimatedMinutes: 7,
    xpReward: 75,
    relatedVocabTopic: 'travel',
    title: {
      en: 'University, Transport & Direction Prepositions',
      ru: 'Университет, транспорт и предлоги направления (do / na)',
      tr: 'Üniversite, Ulaşım ve Yön Edatları (do / na)',
    },
    subtitle: {
      en: 'Key travel & academic words (dworzec, przesiadka, wykład, stypendium) and going "do" vs "na".',
      ru: 'Словарь путешествий и учёбы (dworzec, przesiadka, wykład) и разница между «idę do» и «idę na».',
      tr: 'Seyahat ve üniversite kelimeleri (dworzec, przesiadka, wykład) ve "do" ile "na" farkı.',
    },
    theory: [
      {
        id: 'th-a2-2a',
        heading: {
          en: 'Going Somewhere: "do + Genitive" vs. "na + Accusative"',
          ru: 'Куда мы идём: «do + Dopełniacz» против «na + Biernik»',
          tr: 'Bir Yere Gitmek: "do + Dopełniacz" ve "na + Biernik"',
        },
        body: {
          en: 'When moving toward a destination: 1) Most buildings, cities, and countries use "do + Genitive" (idę do sklepu, do pracy, jadę do Warszawy). 2) Open areas, events, stations, and airports use "na + Accusative" (idę na dworzec, na lotnisko, na wykład, na uniwersytet).',
          ru: 'При движении К цели («куда?»): 1) Для большинства зданий, городов и стран используется предлог «do + Родительный падеж (Dopełniacz)»: idę do sklepu, do pracy, do kina, jadę do Warszawy. 2) Для открытых пространств, мероприятий, вокзала и аэропорта — «na + Винительный (Biernik)»: idę na dworzec, na lotnisko, na wykład, na spacer.',
          tr: 'Bir hedefe doğru giderken: 1) Çoğu bina, şehir ve ülke için "do + Dopełniacz" kullanılır (idę do sklepu, do pracy, jadę do Warszawy). 2) Açık alanlar, etkinlikler, gar ve havalimanı için "na + Biernik" kullanılır (idę na dworzec, na lotnisko, na wykład).',
        },
        l1Tip: {
          en: 'Remember the pair: idę DO pracy (Genitive), but idę NA uniwersytet / NA lotnisko (Accusative).',
          ru: 'Обратите внимание: по-русски «иду В магазин / В кино / На работу», а по-польски со зданиями и работой при движении используется предлог DO + Родительный падеж: idę DO sklepu, DO kina, DO pracy!',
          tr: 'İpucu: Bina içlerine giderken "do + Dopełniacz" (do sklepu), etkinlik ve istasyonlara giderken "na + Biernik" (na lotnisko, na koncert) kullanılır.',
        },
        examples: [
          {
            pl: 'Rano idę na wykład, potem do biblioteki, a wieczorem jadę na lotnisko.',
            highlight: 'na wykład / do biblioteki / na lotnisko',
            translation: {
              en: 'In the morning I go to a lecture, then to the library, and in the evening to the airport.',
              ru: 'Утром я иду на лекцию, потом в библиотеку, а вечером еду в аэропорт.',
              tr: 'Sabah derse (konferansa), sonra kütüphaneye, akşam ise havalimanına gidiyorum.',
            },
          },
        ],
      },
    ],
    exercises: [
      {
        id: 'ex-a2-2-1',
        type: 'fill-blank',
        prompt: {
          en: 'How do you say "I am going to the shop (sklep)" in Polish?',
          ru: 'Как сказать по-польски «Я иду в магазин (sklep)»?',
          tr: 'Lehçede "Markete (sklep) gidiyorum" nasıl denir?',
        },
        sentencePl: 'Idę ___.',
        sentenceTranslation: {
          en: 'I am going to the shop.',
          ru: 'Я иду в магазин.',
          tr: 'Markete gidiyorum.',
        },
        governedCase: 'genitive',
        options: ['do sklepu', 'w sklep', 'na sklep', 'w sklepie'],
        correctIndex: 0,
        explanation: {
          en: 'Motion into a building uses "do + Genitive": sklep → idę do sklepu ("w sklepie" means static location "at the shop").',
          ru: 'Движение внутрь здания выражается предлогом «do + Родительный падеж»: idę do sklepu (а «w sklepie» — это «нахожусь где? в магазине»).',
          tr: 'Bir binaya doğru hareket "do + Dopełniacz" ile ifade edilir: idę do sklepu ("w sklepie" ise "markette" konumunu bildirir).',
        },
      },
      {
        id: 'ex-a2-2-2',
        type: 'multiple-choice',
        prompt: {
          en: 'What does "przesiadka" mean when traveling by train or bus?',
          ru: 'Что означает слово «przesiadka» в поездке на поезде или автобусе?',
          tr: 'Tren veya otobüsle seyahat ederken "przesiadka" ne anlama gelir?',
        },
        options: [
          'Transfer / Change of train (Пересадка / Aktarma)',
          'Delay (Опоздание / Gecikme)',
          'Round-trip ticket (Билет туда-обратно / Gidiş-dönüş bileti)',
          'Luggage compartment (Багажное отделение / Bagaj bölmesi)',
        ],
        correctIndex: 0,
        explanation: {
          en: '"Przesiadka" is a transfer/connection between trains, buses, or flights.',
          ru: '«Przesiadka» — это пересадка с одного транспорта на другой.',
          tr: '"Przesiadka" tren, otobüs veya uçaklar arasındaki aktarma demektir.',
        },
      },
      {
        id: 'ex-a2-2-3',
        type: 'fill-blank',
        prompt: {
          en: 'Choose the right preposition and form for "going to the train station (dworzec)":',
          ru: 'Выберите правильный предлог и форму для «еду на вокзал (dworzec)»:',
          tr: '"Tren garına (dworzec) gidiyorum" için doğru edat ve biçimi seçin:',
        },
        sentencePl: 'Jadę taksówką ___.',
        sentenceTranslation: {
          en: 'I am going by taxi to the train station.',
          ru: 'Я еду на такси на вокзал.',
          tr: 'Taksiyle tren garına gidiyorum.',
        },
        governedCase: 'accusative',
        options: ['na dworzec', 'do dworcu', 'w dworzec', 'na dworcu'],
        correctIndex: 0,
        explanation: {
          en: '"Dworzec" and "lotnisko" use "na + Accusative" for direction: jadę na dworzec / na lotnisko.',
          ru: 'Со словами «dworzec» (вокзал) и «lotnisko» (аэропорт) для направления («куда?») используется «na + Biernik»: jadę na dworzec.',
          tr: '"Dworzec" (gar) ve "lotnisko" (havalimanı) yön bildirirken "na + Biernik" alır: jadę na dworzec.',
        },
      },
    ],
  },

  {
    id: 'mod-a2-3',
    slug: 'a2-locative-prepositions',
    order: 7,
    cefr: 'A2',
    subLevel: 'A2',
    category: 'grammar',
    estimatedMinutes: 9,
    xpReward: 85,
    relatedCase: 'locative',
    relatedVerbSlug: 'myslec',
    title: {
      en: 'Locative (Miejscownik): Where You Are & Thinking "O"',
      ru: 'Предложный падеж (Miejscownik): Где вы находитесь и предлог «o»',
      tr: 'Bulunma Hâli (Miejscownik): Nerede Olduğunuz ve "O" Edatı',
    },
    subtitle: {
      en: 'Static location with w/na, stem alternations (Polska → w Polsce, biuro → w biurze), and myśleć o.',
      ru: 'Местонахождение (w/na), чередования согласных (Polska → w Polsce, biuro → w biurze) и глагол myśleć o.',
      tr: 'w/na ile konum, ünsüz değişimleri (Polska → w Polsce, biuro → w biurze) ve myśleć o fiili.',
    },
    theory: [
      {
        id: 'th-a2-3a',
        heading: {
          en: '1. Prepositions of the Locative Case: w, na, o, po, przy',
          ru: '1. Предлоги падежа Miejscownik: w, na, o, po, przy',
          tr: '1. Miejscownik Edatları: w, na, o, po, przy',
        },
        body: {
          en: 'The Locative case (Miejscownik — o kim? o czym? gdzie?) NEVER appears without a preposition. It is triggered by: w (in — static location), na (on/at — static location), o (about — myśleć o, rozmawiać o, marzyć o), po (after / in a language: po polsku), and przy (near/by).',
          ru: 'Предложный падеж (Miejscownik) НИКОГДА не используется без предлога. Его главные предлоги: w (в — где?), na (на — где?), o (о ком/чём — myśleć o, rozmawiać o), po (после / на языке), przy (при, возле).',
          tr: 'Miejscownik (Bulunma hâli) ASLA edatsız kullanılmaz. Başlıca edatları: w (içinde — nerede?), na (üstünde/yerde — nerede?), o (hakkında — myśleć o, rozmawiać o), po (sonra / dilde) ve przy (yanında).',
        },
        l1Tip: {
          en: 'Endings: Masculine/Neuter nouns take -e (with consonant softening: biuro → w biurze, sklep → w sklepie) or -u (after k, g, ch, c, sz, ż, j: w banku, w pokoju). Feminine takes -e/-i/-y (adj -ej: w nowej pracy).',
          ru: 'Главное правило чередований перед окончанием -e: r → rz (biuro → w biurze), l → l (szkoła → w szkole), t → ci (uniwersytet → na uniwersytecie), k → c (Polska → w Polsce)! А после k, g, ch в мужском и среднем роде просто пишется -u (w banku, w mieszkaniu).',
          tr: '-e ekinden önce kök ünsüzü yumuşar: r → rz (biuro → w biurze), k → c (Polska → w Polsce), t → ci (uniwersytet → na uniwersytecie). Eril ve nötrde k, g, ch, j sonrasında -u gelir (w banku, w pokoju).',
        },
        examples: [
          {
            pl: 'Mieszkam w Polsce, pracuję w dużym biurze i często myślę o nowej pracy.',
            highlight: 'w Polsce / w dużym biurze / o nowej pracy',
            translation: {
              en: 'I live in Poland, work in a large office, and often think about a new job.',
              ru: 'Я живу в Польше, работаю в большом офисе и часто думаю о новой работе.',
              tr: 'Polonya’da yaşıyorum, büyük bir ofiste çalışıyorum ve sık sık yeni bir iş hakkında düşünüyorum.',
            },
          },
        ],
      },
    ],
    exercises: [
      {
        id: 'ex-a2-3-1',
        type: 'fill-blank',
        prompt: {
          en: 'Apply the r → rz stem alternation in the Locative case ("duże biuro"):',
          ru: 'Примените чередование r → rz в Предложном падеже («duże biuro»):',
          tr: 'Miejscownik hâlinde r → rz ünsüz değişimini uygulayın ("duże biuro"):',
        },
        sentencePl: 'Pracuję w ___.',
        sentenceTranslation: {
          en: 'I work in a big office.',
          ru: 'Я работаю в большом офисе.',
          tr: 'Büyük bir ofiste çalışıyorum.',
        },
        governedCase: 'locative',
        options: ['dużym biurze', 'duże biuro', 'dużego biura', 'dużym biurem'],
        correctIndex: 0,
        explanation: {
          en: 'In Locative, neuter adjectives take -ym/-im and nouns ending in -ro soften to -rze: w dużym biurze.',
          ru: 'В Предложном падеже прилагательное среднего рода получает -ym, а основа на -r перед -e переходит в -rz: w dużym biurze.',
          tr: 'Miejscownik hâlinde nötr sıfat -ym alır ve -r ile biten kök -e önünde -rz olur: w dużym biurze.',
        },
      },
      {
        id: 'ex-a2-3-2',
        type: 'fill-blank',
        prompt: {
          en: 'How does "Polska" change after the preposition "w" (in Poland)?',
          ru: 'Как меняется слово «Polska» после предлога «w» (в Польше)?',
          tr: '"Polska" kelimesi "w" edatından sonra (Polonya’da) nasıl değişir?',
        },
        sentencePl: 'Studiuję w ___.',
        sentenceTranslation: {
          en: 'I study in Poland.',
          ru: 'Я учусь в Польше.',
          tr: 'Polonya’da okuyorum.',
        },
        governedCase: 'locative',
        options: ['Polsce', 'Polski', 'Polskę', 'Polską'],
        correctIndex: 0,
        explanation: {
          en: 'In feminine Locative, -ka mutates to -ce (k → c): Polska → w Polsce, apteka → w aptece.',
          ru: 'В женском роде перед окончанием -e согласный k переходит в c: Polska → w Polsce, apteka → w aptece, książka → w książce.',
          tr: 'Dişil Miejscownik hâlinde -ka eki -ce olur (k → c): Polska → w Polsce, apteka → w aptece.',
        },
      },
      {
        id: 'ex-a2-3-3',
        type: 'case-match',
        prompt: {
          en: 'Which preposition and case does "rozmawiać" (to talk about) use?',
          ru: 'Какой предлог и падеж использует глагол «rozmawiać» (разговаривать о чём-то)?',
          tr: '"rozmawiać" (hakkında konuşmak) fiili hangi edat ve hâli kullanır?',
        },
        sentencePl: 'Rozmawiamy ___ (nowy projekt).',
        sentenceTranslation: {
          en: 'We are talking about a new project.',
          ru: 'Мы разговариваем о новом проекте.',
          tr: 'Yeni bir proje hakkında konuşuyoruz.',
        },
        governedCase: 'locative',
        options: [
          'o + Miejscownik: o nowym projekcie',
          'na + Biernik: na nowy projekt',
          'z + Narzędnik: z nowym projektem',
          'do + Dopełniacz: do nowego projektu',
        ],
        correctIndex: 0,
        explanation: {
          en: 'Talking/thinking/dreaming ABOUT something is always "o + Miejscownik": o nowym projekcie (t → ci before -e).',
          ru: 'Глаголы речи и мысли («о чём?») требуют предлога «o + Miejscownik»: o nowym projekcie (с чередованием t → ci).',
          tr: 'Bir şey HAKKINDA konuşmak veya düşünmek her zaman "o + Miejscownik" alır: o nowym projekcie (t → ci).',
        },
      },
    ],
  },

  {
    id: 'mod-a2-4',
    slug: 'a2-train-to-gdansk-reading',
    order: 8,
    cefr: 'A2',
    subLevel: 'A2',
    category: 'reading',
    estimatedMinutes: 8,
    xpReward: 85,
    relatedCase: 'genitive',
    relatedVerbSlug: 'czekac',
    title: {
      en: 'Reading: Weekend Train from Warsaw to Gdańsk',
      ru: 'Чтение: Поездка на выходные из Варшавы в Гданьск',
      tr: 'Okuma: Varşova’dan Gdańsk’a Hafta Sonu Treni',
    },
    subtitle: {
      en: 'Contrast motion (do/na) vs. location (w/na) and verb government in a realistic travel story.',
      ru: 'Закрепляем падежи движения (do/na), местонахождения (w/na) и управление глаголов в истории о путешествии.',
      tr: 'Gerçekçi bir seyahat hikâyesinde yön (do/na), konum (w/na) ve fiil yönetimini pekiştirin.',
    },
    theory: [
      {
        id: 'th-a2-4a',
        heading: {
          en: 'Direction vs. Location at a Glance',
          ru: 'Шпаргалка: «Куда?» (Движение) против «Где?» (Место)',
          tr: 'Tek Bakışta Yön (Nereye?) ve Konum (Nerede?)',
        },
        body: {
          en: 'Compare the pairs: 1) Jadę DO Gdańska (Genitive — direction) vs. Jestem W Gdańsku (Locative — location). 2) Idę NA dworzec (Accusative — direction) vs. Czekam NA dworcu (Locative — location).',
          ru: 'Сравните пары: 1) Jadę DO Gdańska (Родительный — куда?) ↔ Jestem W Gdańsku (Предложный — где?). 2) Idę NA dworzec (Винительный — куда?) ↔ Czekam NA dworcu (Предложный — где?).',
          tr: 'Çiftleri karşılaştırın: 1) Jadę DO Gdańska (Dopełniacz — nereye?) ↔ Jestem W Gdańsku (Miejscownik — nerede?). 2) Idę NA dworzec (Biernik — nereye?) ↔ Czekam NA dworcu (Miejscownik — nerede?).',
        },
        l1Tip: {
          en: 'Also notice: "czekać NA pociąg" (Accusative — wait FOR a train) vs. "czekać NA peronie" (Locative — wait ON the platform).',
          ru: 'Обратите внимание на предлог «na» в одном предложении: «Czekam NA pociąg (Винительный — жду чего?) NA peronie (Предложный — стою где?)».',
          tr: 'Aynı cümledeki iki "na" edatına dikkat edin: "Czekam NA pociąg (Biernik — treni bekliyorum) NA peronie (Miejscownik — peronda)".',
        },
        examples: [
          {
            pl: 'Stoję na peronie na dworcu w Warszawie i czekam na szybki pociąg do Gdańska.',
            highlight: 'na peronie / w Warszawie / na szybki pociąg / do Gdańska',
            translation: {
              en: 'I am standing on the platform at the station in Warsaw and waiting for the fast train to Gdańsk.',
              ru: 'Я стою на перроне на вокзале в Варшаве и жду скорый поезд в Гданьск.',
              tr: 'Varşova’daki garda peronda duruyorum ve Gdańsk’a giden hızlı treni bekliyorum.',
            },
          },
        ],
      },
    ],
    reading: {
      title: {
        en: 'Story: A Trip to the Baltic Sea',
        ru: 'Текст: Поездка к Балтийскому морю',
        tr: 'Hikâye: Baltık Denizi’ne Yolculuk',
      },
      plParagraphs: [
        'Jest piątek rano. Karolina i Tomek jadą na weekend z Warszawy do Gdańska. Najpierw jadą metrem na Dworzec Centralny, bo nie mają samochodu.',
        'Na dworcu kupują gorącą kawę w małym sklepie, a potem stoją na peronie i czekają na pociąg. W pociągu szukają wolnego miejsca przy oknie i słuchają muzyki.',
        'Po trzech godzinach są już w Gdańsku. Spacerują po Starym Mieście, jedzą świeżą rybę w restauracji i rozmawiają o urlopie nad morzem.',
      ],
      translationParagraphs: {
        en: [
          'It is Friday morning. Karolina and Tomek are going for the weekend from Warsaw to Gdańsk. First they go by metro to the Central Station because they do not have a car.',
          'At the station they buy hot coffee at a small shop, and then stand on the platform waiting for the train. On the train they look for a free seat by the window and listen to music.',
          'After three hours they are already in Gdańsk. They walk around the Old Town, eat fresh fish at a restaurant, and talk about their vacation by the sea.',
        ],
        ru: [
          'Пятница, утро. Каролина и Томек едут на выходные из Варшавы в Гданьск. Сначала они едут на метро на Центральный вокзал, потому что у них нет машины.',
          'На вокзале они покупают горячий кофе в маленьком магазине, а потом стоят на перроне и ждут поезд. В поезде они ищут свободное место у окна и слушают музыку.',
          'Через три часа они уже в Гданьске. Они гуляют по Старому городу, едят свежую рыбу в ресторане и разговаривают об отпуске на море.',
        ],
        tr: [
          'Cuma sabahı. Karolina ve Tomek hafta sonu için Varşova’dan Gdańsk’a gidiyorlar. Arabaları olmadığı için önce metroyla Merkez Garı’na gidiyorlar.',
          'Garda küçük bir dükkândan sıcak kahve alıyorlar, sonra peronda durup treni bekliyorlar. Trende pencere kenarında boş bir yer arıyor ve müzik dinliyorlar.',
          'Üç saat sonra artık Gdańsk’talar. Eski Şehir’de yürüyor, restoranda taze balık yiyor ve deniz kenarındaki tatil hakkında konuşuyorlar.',
        ],
      },
      keyPhrases: [
        {
          pl: 'z Warszawy do Gdańska',
          translation: {
            en: 'from Warsaw to Gdańsk (both Genitive)',
            ru: 'из Варшавы в Гданьск (оба в Родительном падеже)',
            tr: 'Varşova’dan Gdańsk’a (ikisi de Dopełniacz)',
          },
        },
        {
          pl: 'nie mają samochodu',
          translation: {
            en: 'they do not have a car (Genitive of negation)',
            ru: 'у них нет машины (Родительный отрицания)',
            tr: 'arabaları yok (Olumsuzluk genitifi)',
          },
        },
        {
          pl: 'szukają wolnego miejsca',
          translation: {
            en: 'they look for a free seat (szukać + Genitive)',
            ru: 'ищут свободное место (szukać + Родительный)',
            tr: 'boş bir yer arıyorlar (szukać + Dopełniacz)',
          },
        },
      ],
    },
    exercises: [
      {
        id: 'ex-a2-4-1',
        type: 'multiple-choice',
        prompt: {
          en: 'Why is "samochodu" in the Genitive case in "bo nie mają samochodu"?',
          ru: 'Почему слово «samochodu» стоит в Родительном падеже во фразе «bo nie mają samochodu»?',
          tr: '"bo nie mają samochodu" ifadesinde "samochodu" neden Dopełniacz hâlindedir?',
        },
        options: [
          'Because "mieć" is negated with "nie" (Genitive of negation)',
          'Because "samochód" is feminine',
          'Because it shows location',
          'Because it follows the preposition "na"',
        ],
        correctIndex: 0,
        explanation: {
          en: 'Negating "mają samochód" (Accusative) automatically shifts the object to Genitive: nie mają samochodu.',
          ru: 'При отрицании глагола «mieć» (mają samochód) дополнение всегда переходит в Родительный падеж: nie mają samochodu.',
          tr: '"mają samochód" (Biernik) olumsuz yapıldığında nesne otomatik olarak Dopełniacz olur: nie mają samochodu.',
        },
      },
      {
        id: 'ex-a2-4-2',
        type: 'fill-blank',
        prompt: {
          en: 'Complete the sentence from the story: "W pociągu szukają ___ przy oknie." (wolne miejsce)',
          ru: 'Дополните предложение из текста: «W pociągu szukają ___ przy oknie» (wolne miejsce):',
          tr: 'Hikâyedeki cümleyi tamamlayın: "W pociągu szukają ___ przy oknie." (wolne miejsce)',
        },
        sentencePl: 'W pociągu szukają ___ przy oknie.',
        sentenceTranslation: {
          en: 'On the train they look for a free seat by the window.',
          ru: 'В поезде они ищут свободное место у окна.',
          tr: 'Trende pencere kenarında boş bir yer arıyorlar.',
        },
        governedCase: 'genitive',
        options: ['wolnego miejsca', 'wolne miejsce', 'wolnym miejscem', 'wolnemu miejscu'],
        correctIndex: 0,
        explanation: {
          en: '"Szukać" governs Genitive: neuter "wolne miejsce" becomes "wolnego miejsca".',
          ru: 'Глагол «szukać» требует Родительного падежа: средний род «wolne miejsce» → «wolnego miejsca».',
          tr: '"Szukać" Dopełniacz yönetir: nötr "wolne miejsce" → "wolnego miejsca" olur.',
        },
      },
      {
        id: 'ex-a2-4-3',
        type: 'fill-blank',
        prompt: {
          en: 'Contrast direction and location: "Jadę ___ Gdańska, a jutro będę ___ Gdańsku."',
          ru: 'Выберите предлоги направления («куда?») и места («где?»): «Jadę ___ Gdańska, a jutro będę ___ Gdańsku».',
          tr: 'Yön ve konum edatlarını seçin: "Jadę ___ Gdańska, a jutro będę ___ Gdańsku."',
        },
        sentencePl: 'Jadę ___ Gdańska, a jutro będę ___ Gdańsku.',
        sentenceTranslation: {
          en: 'I am going to Gdańsk, and tomorrow I will be in Gdańsk.',
          ru: 'Я еду в Гданьск, а завтра буду в Гданьске.',
          tr: 'Gdańsk’a gidiyorum ve yarın Gdańsk’ta olacağım.',
        },
        options: ['do / w', 'w / do', 'na / w', 'do / na'],
        correctIndex: 0,
        explanation: {
          en: 'Going TO a city is "do + Genitive" (do Gdańska); being IN a city is "w + Locative" (w Gdańsku).',
          ru: 'Движение В город — всегда «do + Dopełniacz» (do Gdańska), а нахождение В городе — «w + Miejscownik» (w Gdańsku).',
          tr: 'Bir şehre gitmek "do + Dopełniacz" (do Gdańska), bir şehirde bulunmak ise "w + Miejscownik" (w Gdańsku) ile söylenir.',
        },
      },
    ],
  },

  /* ==================== LEVEL B1 ==================== */
  {
    id: 'mod-b1-1',
    slug: 'b1-verb-aspect-tenses',
    order: 9,
    cefr: 'B1',
    subLevel: 'B1',
    category: 'grammar',
    estimatedMinutes: 10,
    xpReward: 100,
    relatedVerbSlug: 'kupowac',
    title: {
      en: 'Verb Aspect Pairs (Niedokonany / Dokonany) & Past Tense',
      ru: 'Виды глаголов (Niedokonany / Dokonany) и прошедшее время',
      tr: 'Fiil Görünüş Çiftleri (Niedokonany / Dokonany) ve Geçmiş Zaman',
    },
    subtitle: {
      en: 'Choosing between process (robić, kupować) and result (zrobić, kupić), plus gendered past endings (-łem/-łam, -liśmy/-łyśmy).',
      ru: 'Процесс (robić, kupować) против результата (zrobić, kupić) и личные окончания прошедшего времени (-łem/-łam, -liśmy/-łyśmy).',
      tr: 'Süreç (robić, kupować) ile sonuç (zrobić, kupić) arasındaki fark ve cinsiyetli geçmiş zaman ekleri (-łem/-łam).',
    },
    theory: [
      {
        id: 'th-b1-1a',
        heading: {
          en: '1. Imperfective (Process/Habit) vs. Perfective (Completed Result)',
          ru: '1. Несовершенный вид (процесс) и совершенный вид (результат)',
          tr: '1. Bitmemiş (Süreç/Alışkanlık) ve Bitmiş (Tamamlanmış Sonuç) Görünüş',
        },
        body: {
          en: 'Almost every Polish verb comes in an aspect pair: 1) Imperfective (Niedokonany: czytać, kupować, pisać) describes an ongoing process, habit, or duration (codziennie, długo, często). It has Present, Past, and Compound Future (będę czytać). 2) Perfective (Dokonany: przeczytać, kupić, napisać) describes a single completed result (już, wreszcie, jutro). It has NO present tense — its present-looking form means simple FUTURE (przeczytam = I will finish reading)!',
          ru: 'Почти каждый польский глагол образует видовую пару: 1) Несовершенный вид (Niedokonany: czytać, kupować, robić) обозначает процесс, повторяемость или длительность (codziennie, długo) и имеет настоящее, прошедшее и составное будущее время (będę czytać). 2) Совершенный вид (Dokonany: przeczytać, kupić, zrobić) обозначает однократный результат (już, w końcu) и в форме настоящего времени означает БУДУЩЕЕ (przeczytam, kupię)!',
          tr: 'Hemen her Lehçe fiil bir görünüş çiftine sahiptir: 1) İmperfektif (Niedokonany: czytać, kupować) devam eden süreci veya alışkanlığı anlatır (codziennie, długo); şimdiki, geçmiş ve birleşik gelecek zamanı (będę czytać) vardır. 2) Perfektif (Dokonany: przeczytać, kupić) tamamlanmış tek bir sonucu anlatır; şimdiki zamanı yoktur, çekimlenmiş biçimi GELECEK zaman anlamı verir (kupię = satın alacağım).',
        },
        l1Tip: {
          en: 'Signal words: codziennie / cały dzień → Imperfective; już / wreszcie / nagle → Perfective.',
          ru: 'Логика видов очень близка к русской, но следите за сложным будущим временем несовершенного вида: можно сказать как «będę czytać», так и «będę czytał (м.р.) / będę czytała (ж.р.)».',
          tr: 'İpucu: "codziennie / cały dzień" (her gün / bütün gün) → İmperfektif; "już / wreszcie" (artık / sonunda) → Perfektif.',
        },
        examples: [
          {
            pl: 'Wczoraj długo pisałem raport (proces), aż w końcu napisałem go o północy (rezultat).',
            highlight: 'pisałem / napisałem',
            translation: {
              en: 'Yesterday I was writing the report for a long time (process), until I finally finished writing it at midnight (result).',
              ru: 'Вчера я долго писал отчёт (процесс), пока наконец не написал его в полночь (результат).',
              tr: 'Dün uzun süre rapor yazdım (süreç), sonunda gece yarısı onu yazıp bitirdim (sonuç).',
            },
          },
        ],
      },
      {
        id: 'th-b1-1b',
        heading: {
          en: '2. Gendered Past Tense Endings (-łem/-łam, -liśmy/-łyśmy)',
          ru: '2. Окончания прошедшего времени по лицам и родам',
          tr: '2. Cinsiyet ve Şahsa Göre Geçmiş Zaman Ekleri',
        },
        body: {
          en: 'Unlike Russian or English, Polish past tense endings include BOTH gender and person: Masculine singular: robiłem (I), robiłeś (you), robił (he). Feminine singular: robiłam (I), robiłaś (you), robiła (she). Plural with at least one man (virile): robiliśmy / robili. Plural without men (non-virile): robiłyśmy / robiły.',
          ru: 'В отличие от русского (где «я делал, ты делал, он делал» звучат одинаково), в польском прошедшее время изменяется И по родам, И по лицам: Мужчина: robiłem (я), robiłeś (ты), robił (он). Женщина: robiłam (я), robiłaś (ты), robiła (она). Мн. ч. с мужчинами: robiliśmy. Мн. ч. без мужчин: robiłyśmy.',
          tr: 'Lehçede geçmiş zaman hem cinsiyet hem de şahıs eki alır: Erkek: robiłem (ben), robiłeś (sen), robił (o). Kadın: robiłam (ben), robiłaś (sen), robiła (o). Çoğul (erkek içeren grup): robiliśmy. Çoğul (diğer): robiłyśmy.',
        },
        l1Tip: {
          en: 'Watch the vowel before -łem: men say -e- (kupowałem), women say -a- (kupowałam).',
          ru: 'В польском личное местоимение («ja», «ty») обычно опускается, потому что окончание -łem (я, муж.) или -łaś (ты, жен.) уже однозначно показывает, кто говорит!',
          tr: 'Şahıs eki fiilin sonundadır (-m = ben, -ś = sen, -śmy = biz), bu yüzden "ja, ty, my" zamirlerini kullanmaya gerek yoktur.',
        },
        examples: [
          {
            pl: 'Co robiłaś wczoraj? — Kupiłam bilety i zarezerwowałam hotel.',
            highlight: 'robiłaś / Kupiłam / zarezerwowałam',
            translation: {
              en: 'What were you (f.) doing yesterday? — I (f.) bought tickets and booked a hotel.',
              ru: 'Что ты (жен.) делала вчера? — Я (жен.) купила билеты и забронировала отель.',
              tr: 'Dün ne yapıyordun (kadın)? — Biletleri aldım ve otel rezervasyonu yaptım.',
            },
          },
        ],
      },
    ],
    exercises: [
      {
        id: 'ex-b1-1-1',
        type: 'fill-blank',
        prompt: {
          en: 'Choose the right aspect for a repeated habit ("Codziennie rano..."):',
          ru: 'Выберите правильный вид и время для регулярного действия («Codziennie rano...»):',
          tr: 'Düzenli tekrarlanan bir alışkanlık için doğru görünüşü seçin ("Codziennie rano..."):',
        },
        sentencePl: 'Codziennie rano ___ świeży chleb w piekarni.',
        sentenceTranslation: {
          en: 'Every morning I buy fresh bread at the bakery.',
          ru: 'Каждое утро я покупаю свежий хлеб в пекарне.',
          tr: 'Her sabah fırından taze ekmek alırım.',
        },
        options: ['kupuję', 'kupię', 'kupiłem', 'kupić'],
        correctIndex: 0,
        explanation: {
          en: '"Codziennie" (every day) signals a repeated habit → Imperfective present tense "kupuję" ("kupię" is Perfective future "I will buy once").',
          ru: '«Codziennie» (каждый день) указывает на регулярное действие → настоящее время несовершенного вида «kupuję» (а «kupię» — это совершенный вид будущего времени «куплю»).',
          tr: '"Codziennie" (her gün) alışkanlık bildirir → İmperfektif şimdiki zaman "kupuję" ("kupię" ise perfektif gelecek zamandır).',
        },
      },
      {
        id: 'ex-b1-1-2',
        type: 'fill-blank',
        prompt: {
          en: 'A woman says: "Yesterday I finally bought a new apartment." Choose the right form:',
          ru: 'Женщина говорит: «Вчера я наконец-то купила новую квартиру». Выберите правильную форму:',
          tr: 'Bir kadın söylüyor: "Dün sonunda yeni bir daire satın aldım." Doğru biçimi seçin:',
        },
        sentencePl: 'Wczoraj wreszcie ___ nowe mieszkanie.',
        sentenceTranslation: {
          en: 'Yesterday I (f.) finally bought a new apartment.',
          ru: 'Вчера я (жен.) наконец купила новую квартиру.',
          tr: 'Dün sonunda yeni bir daire satın aldım (kadın).',
        },
        options: ['kupiłam', 'kupowałam', 'kupiłem', 'kupię'],
        correctIndex: 0,
        explanation: {
          en: '"Wreszcie" (finally) requires Perfective (kupić), and 1st-person feminine past takes -łam: kupiłam.',
          ru: '«Wreszcie» (наконец-то) требует совершенного вида (kupić — результат), а для 1-го лица женского рода нужно окончание -łam: kupiłam.',
          tr: '"Wreszcie" (sonunda) tamamlanmış sonuç (kupić) gerektirir ve 1. tekil kadın geçmiş zaman eki -łam’dır: kupiłam.',
        },
      },
      {
        id: 'ex-b1-1-3',
        type: 'multiple-choice',
        prompt: {
          en: 'What does the Perfective verb form "przeczytam" mean?',
          ru: 'Что означает форма совершенного вида «przeczytam»?',
          tr: 'Perfektif fiil biçimi olan "przeczytam" ne anlama gelir?',
        },
        options: [
          'I will read / finish reading (Future result)',
          'I am reading right now (Present process)',
          'I used to read (Past habit)',
          'Read! (Imperative)',
        ],
        correctIndex: 0,
        explanation: {
          en: 'Perfective verbs have no present tense; their conjugated form always expresses a completed action in the FUTURE.',
          ru: 'У глаголов совершенного вида нет настоящего времени — их личная форма всегда означает завершённое действие в БУДУЩЕМ («прочитаю»).',
          tr: 'Perfektif fiillerin şimdiki zamanı yoktur; çekimli biçimleri her zaman GELECEKTE tamamlanacak bir eylemi ifade eder.',
        },
      },
    ],
  },

  {
    id: 'mod-b1-2',
    slug: 'b1-dative-verb-government',
    order: 10,
    cefr: 'B1',
    subLevel: 'B1',
    category: 'grammar',
    estimatedMinutes: 10,
    xpReward: 100,
    relatedCase: 'dative',
    relatedVerbSlug: 'pomagac',
    title: {
      en: 'Dative (Celownik) & Tricky Verb Government Traps',
      ru: 'Дательный падеж (Celownik) и главные ловушки управления глаголов',
      tr: 'Yönelme Hâli (Celownik) ve Fiil Yönetimi Tuzakları',
    },
    subtitle: {
      en: 'Pomagać, dziękować, ufać, przeszkadzać (+ Celownik) vs. dziękować ZA, czekać NA, pytać O.',
      ru: 'Pomagać, dziękować, ufać (+ Celownik) и глаголы, где падеж не совпадает с русским или английским.',
      tr: 'Pomagać, dziękować, ufać (+ Celownik) ve dikkat gerektiren edatlı fiil kalıpları.',
    },
    theory: [
      {
        id: 'th-b1-2a',
        heading: {
          en: '1. Dative Endings (Komu? Czemu?) — -owi, -u, -e/-i',
          ru: '1. Окончания Дательного падежа (Celownik — komu? czemu?)',
          tr: '1. Yönelme Hâli (Celownik — komu? czemu?) Ekleri',
        },
        body: {
          en: 'The Dative case marks the recipient or beneficiary: 1) Masculine nouns almost always take -owi (student → studentowi, kolega → koledze, but a few short nouns take -u: bratu, ojcu, psu, panu). Masculine/Neuter adjectives take -emu (dobremu studentowi). 2) Feminine nouns take -e/-i/-y (with k→c, g→dz: siostrze, mamie, koleżance) and adjectives take -ej (dobrej koleżance). 3) Plural always ends in -om (studentom).',
          ru: 'Дательный падеж (Celownik) обозначает адресата действия: 1) В мужском роде почти все существительные получают окончание -owi (student → studentowi, syn → synowi; и только несколько коротких слов берут -u: bratu, ojcu, psu, panu). Прилагательные м./ср. рода имеют окончание -emu (dobremu studentowi). 2) В женском роде окончания совпадают с Предложным падежом: -e/-i/-y (с чередованием k→c: siostrze, koleżance, прил. -ej: dobrej koleżance). 3) Мн. число — всегда -om.',
          tr: 'Celownik alıcıyı/yönelinen kişiyi gösterir: 1) Eril isimler çoğunlukla -owi alır (student → studentowi; birkaç kısa kelime -u alır: bratu, ojcu, panu). Eril/Nötr sıfatlar -emu alır (dobremu studentowi). 2) Dişil isimler -e/-i/-y (k→c: siostrze, koleżance) ve sıfatlar -ej alır. 3) Çoğul her zaman -om ile biter.',
        },
        l1Tip: {
          en: 'Key Dative verbs: pomagać (help), dziękować (thank), ufać (trust), przeszkadzać (disturb), podobać się (appeal to), dziwić się (be surprised at).',
          ru: 'Ловушка для русскоязычных! По-русски мы говорим «благодарить кого? — друга (Винительный!)», а по-польски «dziękować komu? — koledze (Дательный!)» + «za co? (Винительный)»: Dziękuję bratu za pomoc!',
          tr: 'Türkçede "kime?" sorusuna karşılık gelir: pomagać (yardım etmek), dziękować (teşekkür etmek), ufać (güvenmek), przeszkadzać (rahatsız etmek) fiillerinin tümü Celownik alır.',
        },
        examples: [
          {
            pl: 'Dziękuję dobremu koledze za pomoc i pomagam młodszej siostrze.',
            highlight: 'dobremu koledze / za pomoc / młodszej siostrze',
            translation: {
              en: 'I thank my good friend for the help and help my younger sister.',
              ru: 'Я благодарю хорошего друга за помощь и помогаю младшей сестре.',
              tr: 'İyi arkadaşıma yardımı için teşekkür ediyorum ve küçük kız kardeşime yardım ediyorum.',
            },
          },
        ],
      },
      {
        id: 'th-b1-2b',
        heading: {
          en: '2. Top 4 Verb Government Traps to Master at B1',
          ru: '2. Топ-4 ловушки управления глаголов уровня B1',
          tr: '2. B1 Seviyesinde Bilinmesi Gereken 4 Fiil Yönetimi Kalıbı',
        },
        body: {
          en: 'Memorize these exact patterns: 1) dziękować KOMU (Dat) ZA CO (Acc) — thank someone for something; 2) przepraszać KOGO (Acc) ZA CO (Acc) — apologize to someone for something; 3) pytać KOGO (Acc) O CO (Acc) — ask someone about something; 4) zależeć KOMU (Dat) NA CZYM (Loc) — care deeply about something (Zależy mi na tej pracy).',
          ru: 'Запомните эти конструкции: 1) dziękować KOMU (Дат.) ZA CO (Вин.) — благодарить кого-то за что-то; 2) przepraszać KOGO (Вин.) ZA CO (Вин.) — извиняться ПЕРЕД кем-то (без предлога!) за что-то; 3) pytać KOGO (Вин.) O CO (Вин.!) — спрашивать о чём-то (после «o» здесь Винительный, а не Предложный!); 4) Zależy mi NA + Предложный — мне очень важно что-то (Zależy mi na tej pracy).',
          tr: 'Şu 4 kalıbı tam olarak ezberleyin: 1) dziękować KOMU (Dat) ZA CO (Acc); 2) przepraszać KOGO (Acc) ZA CO (Acc) — birinden bir şey için özür dilemek; 3) pytać KOGO (Acc) O CO (Acc) — birine bir şeyi sormak; 4) Zależy mi NA CZYM (Loc) — bir şeye çok önem vermek.',
        },
        l1Tip: {
          en: 'Notice "pytać o + Accusative": Pytam profesora o egzamin (or o nową pracę!).',
          ru: 'Супер-важная деталь: «rozmawiać o nowej pracy» (Предложный падеж), но «pytać / prosić o nową pracę» (Винительный падеж после предлога o!).',
          tr: 'Dikkat: "rozmawiać o + Miejscownik" (o nowej pracy), ancak "pytać / prosić o + Biernik" (o nową pracę) kullanılır!',
        },
        examples: [
          {
            pl: 'Przepraszam szefa za spóźnienie i pytam koleżankę o nową pracę.',
            highlight: 'szefa za spóźnienie / koleżankę o nową pracę',
            translation: {
              en: 'I apologize to the boss for being late and ask my colleague about the new job.',
              ru: 'Я извиняюсь перед начальником за опоздание и спрашиваю коллегу о новой работе.',
              tr: 'Gecikme için patrondan özür diliyorum ve iş arkadaşıma yeni işi soruyorum.',
            },
          },
        ],
      },
    ],
    exercises: [
      {
        id: 'ex-b1-2-1',
        type: 'fill-blank',
        prompt: {
          en: 'Put "mój dobry kolega" into the Dative case after "pomagać":',
          ru: 'Поставьте «mój dobry kolega» в Дательный падеж (Celownik) после глагола «pomagać»:',
          tr: '"pomagać" fiilinden sonra "mój dobry kolega" ifadesini Celownik hâline koyun:',
        },
        sentencePl: 'Często pomagam ___ w pracy.',
        sentenceTranslation: {
          en: 'I often help my good friend at work.',
          ru: 'Я часто помогаю моему хорошему другу на работе.',
          tr: 'İşte iyi arkadaşıma sık sık yardım ederim.',
        },
        governedCase: 'dative',
        options: [
          'mojemu dobremu koledze',
          'mojego dobrego kolegę',
          'moim dobrym kolegą',
          'mój dobry kolega',
        ],
        correctIndex: 0,
        explanation: {
          en: 'In Dative, masculine adjectives take -emu and nouns ending in -ga mutate to -dze: mojemu dobremu koledze.',
          ru: 'В Дательном падеже мужские прилагательные получают -emu, а слово «kolega» (на -ga) меняет основу g → dz: mojemu dobremu koledze.',
          tr: 'Celownik hâlinde eril sıfatlar -emu alır, -ga ile biten "kolega" ise g → dz değişimiyle "koledze" olur.',
        },
      },
      {
        id: 'ex-b1-2-2',
        type: 'case-match',
        prompt: {
          en: 'Which case does "dziękować" (to thank someone) govern for the person being thanked?',
          ru: 'Какого падежа требует глагол «dziękować» (благодарить кого-то) для человека?',
          tr: '"dziękować" (teşekkür etmek) fiili teşekkür edilen kişi için hangi hâli ister?',
        },
        sentencePl: 'Serdecznie dziękuję ___ (nasz profesor) za wykład.',
        sentenceTranslation: {
          en: 'I warmly thank our professor for the lecture.',
          ru: 'Сердечно благодарю нашего профессора за лекцию.',
          tr: 'Profesörümüze ders için içtenlikle teşekkür ediyorum.',
        },
        governedCase: 'dative',
        options: [
          'Celownik: naszemu profesorowi',
          'Biernik: naszego profesora',
          'Narzędnik: naszym profesorem',
          'Dopełniacz: naszego profesora',
        ],
        correctIndex: 0,
        explanation: {
          en: '"Dziękować" governs Dative (komu? czemu?): naszemu profesorowi.',
          ru: 'В польском языке «dziękować» управляет Дательным падежом (komu? — naszemu profesorowi), а не Винительным!',
          tr: '"Dziękować" Celownik (kime? — naszemu profesorowi) yönetir.',
        },
      },
      {
        id: 'ex-b1-2-3',
        type: 'fill-blank',
        prompt: {
          en: 'Complete with the right case after "pytać o" (nowa oferta):',
          ru: 'Выберите правильную форму после «pytać o» (nowa oferta):',
          tr: '"pytać o" sonrasında doğru biçimi seçin (nowa oferta):',
        },
        sentencePl: 'Klient pyta menedżera o ___.',
        sentenceTranslation: {
          en: 'The client asks the manager about the new offer.',
          ru: 'Клиент спрашивает менеджера о новом предложении.',
          tr: 'Müşteri müdüre yeni teklifi soruyor.',
        },
        governedCase: 'accusative',
        options: ['nową ofertę', 'nowej ofercie', 'nowej oferty', 'nową ofertą'],
        correctIndex: 0,
        explanation: {
          en: 'After "pytać o" and "prosić o", the preposition "o" governs the Accusative case (Biernik): o nową ofertę!',
          ru: 'После глаголов «pytać o» (спрашивать о) и «prosić o» (просить о) предлог «o» требует Винительного падежа (Biernik): o nową ofertę!',
          tr: '"pytać o" ve "prosić o" fiillerinden sonra "o" edatı Biernik (Belirtme hâli) alır: o nową ofertę!',
        },
      },
    ],
  },

  {
    id: 'mod-b1-3',
    slug: 'b1-work-interview-reading',
    order: 11,
    cefr: 'B1',
    subLevel: 'B1',
    category: 'reading',
    estimatedMinutes: 10,
    xpReward: 110,
    relatedVocabTopic: 'work',
    relatedVerbSlug: 'zalezec',
    title: {
      en: 'Reading & Career Polish: Job Interview in Warsaw',
      ru: 'Чтение и деловой польский: Собеседование в Варшаве',
      tr: 'Okuma ve İş Lehçesi: Varşova’da İş Görüşmesi',
    },
    subtitle: {
      en: 'Professional vocabulary (rozmowa kwalifikacyjna, doświadczenie, umowa, pensja) and B1 grammar in context.',
      ru: 'Профессиональная лексика (rozmowa kwalifikacyjna, doświadczenie, umowa, pensja) и конструкции уровня B1.',
      tr: 'Profesyonel kelimeler (rozmowa kwalifikacyjna, doświadczenie, umowa, pensja) ve bağlam içinde B1 dilbilgisi.',
    },
    theory: [
      {
        id: 'th-b1-3a',
        heading: {
          en: 'Essential Workplace & Career Expressions',
          ru: 'Ключевые выражения для работы и карьеры в Польше',
          tr: 'İş ve Kariyer İçin Temel İfadeler',
        },
        body: {
          en: 'Key B1 career terms: rozmowa kwalifikacyjna (job interview), doświadczenie zawodowe (work experience), umowa o pracę (employment contract), wynagrodzenie / pensja (salary), nadgodziny (overtime), awans (promotion), zajmować się + Instrumental (to deal with / be responsible for).',
          ru: 'Важнейшие слова для работы: rozmowa kwalifikacyjna (собеседование), doświadczenie zawodowe (опыт работы), umowa o pracę (трудовой договор), pensja / wynagrodzenie (зарплата), nadgodziny (сверхурочные), zajmować się + Творительный падеж (заниматься чем-то / отвечать за что-то).',
          tr: 'Temel B1 kariyer terimleri: rozmowa kwalifikacyjna (iş görüşmesi), doświadczenie zawodowe (iş deneyimi), umowa o pracę (iş sözleşmesi), pensja / wynagrodzenie (maaş), zajmować się + Narzędnik (bir işle ilgilenmek / sorumlu olmak).',
        },
        l1Tip: {
          en: 'Remember: "pensja" means monthly salary (retirement pension is "emerytura").',
          ru: 'Не перепутайте: «pensja» — это зарплата (а пенсия по возрасту — «emerytura»).',
          tr: '"Zajmować się" fiili her zaman Narzędnik alır: Zajmuję się analizą danych (Veri analiziyle ilgileniyorum).',
        },
        examples: [
          {
            pl: 'W poprzedniej firmie zajmowałem się obsługą klientów i pomagałem nowemu zespołowi.',
            highlight: 'zajmowałem się obsługą / pomagałem nowemu zespołowi',
            translation: {
              en: 'At my previous company I handled customer service and helped the new team.',
              ru: 'В предыдущей компании я занимался обслуживанием клиентов и помогал новой команде.',
              tr: 'Önceki şirkette müşteri hizmetleriyle ilgileniyor ve yeni ekibe yardım ediyordum.',
            },
          },
        ],
      },
    ],
    reading: {
      title: {
        en: 'Story: Elena’s Job Interview at an IT Company',
        ru: 'Текст: Собеседование Елены в IT-компании',
        tr: 'Hikâye: Elena’nın Bilişim Şirketindeki İş Görüşmesi',
      },
      plParagraphs: [
        'Elena od dwóch lat mieszka w Warszawie. W zeszłym tygodniu szukała nowej pracy i wysłała swoje CV do międzynarodowej firmy technologicznej. Dzisiaj rano miała rozmowę kwalifikacyjną.',
        'Podczas spotkania menedżer zapytał Elenę o doświadczenie zawodowe. Elena odpowiedziała, że przez trzy lata pracowała jako analityczka i zajmowała się dużymi projektami finansowymi.',
        '— Bardzo zależy mi na rozwoju zawodowym i chętnie pomagam młodszym kolegom w zespole — dodała Elena. Po południu zadzwonił dyrektor, podziękował Elenie za świetną rozmowę i zaproponował jej umowę o pracę oraz dobrą pensję.',
      ],
      translationParagraphs: {
        en: [
          'Elena has been living in Warsaw for two years. Last week she was looking for a new job and sent her CV to an international tech company. This morning she had a job interview.',
          'During the meeting, the manager asked Elena about her work experience. Elena replied that she had worked as an analyst for three years and handled large financial projects.',
          '“I care deeply about professional growth and gladly help younger colleagues on the team,” Elena added. In the afternoon the director called, thanked Elena for a great interview, and offered her an employment contract and a good salary.',
        ],
        ru: [
          'Елена уже два года живёт в Варшаве. На прошлой неделе она искала новую работу и отправила своё резюме в международную технологическую компанию. Сегодня утром у неё было собеседование.',
          'Во время встречи менеджер спросил Елену о профессиональном опыте. Елена ответила, что три года работала аналитиком и занималась крупными финансовыми проектами.',
          '— Мне очень важно профессиональное развитие, и я охотно помогаю младшим коллегам в команде, — добавила Елена. После обеда позвонил директор, поблагодарил Елену за отличную беседу и предложил ей трудовой договор и хорошую зарплату.',
        ],
        tr: [
          'Elena iki yıldır Varşova’da yaşıyor. Geçen hafta yeni bir iş arıyordu ve CV’sini uluslararası bir teknoloji şirketine gönderdi. Bu sabah iş görüşmesi vardı.',
          'Toplantı sırasında müdür Elena’ya iş deneyimini sordu. Elena üç yıl analist olarak çalıştığını ve büyük finans projeleriyle ilgilendiğini söyledi.',
          'Elena, "Mesleki gelişime çok önem veriyorum ve ekipteki genç arkadaşlara memnuniyetle yardım ediyorum" diye ekledi. Öğleden sonra direktör aradı, harika görüşme için Elena’ya teşekkür etti ve ona iş sözleşmesi ile iyi bir maaş teklif etti.',
        ],
      },
      keyPhrases: [
        {
          pl: 'zapytał Elenę o doświadczenie',
          translation: {
            en: 'asked Elena about her experience (pytać kogo o co — Accusative)',
            ru: 'спросил Елену об опыте (pytać kogo o co — Винительный)',
            tr: 'Elena’ya deneyimini sordu (pytać kogo o co — Biernik)',
          },
        },
        {
          pl: 'zajmowała się dużymi projektami',
          translation: {
            en: 'handled large projects (zajmować się + Instrumental plural)',
            ru: 'занималась крупными проектами (zajmować się + Творительный мн.ч.)',
            tr: 'büyük projelerle ilgileniyordu (zajmować się + Narzędnik çoğul)',
          },
        },
        {
          pl: 'zależy mi na rozwoju',
          translation: {
            en: 'I care about growth (zależeć komu na czym — Locative)',
            ru: 'мне важно развитие (zależeć komu na czym — Предложный)',
            tr: 'gelişime önem veriyorum (zależeć komu na czym — Miejscownik)',
          },
        },
      ],
    },
    exercises: [
      {
        id: 'ex-b1-3-1',
        type: 'multiple-choice',
        prompt: {
          en: 'What did the director offer Elena in the afternoon?',
          ru: 'Что директор предложил Елене после обеда?',
          tr: 'Direktör öğleden sonra Elena’ya ne teklif etti?',
        },
        options: [
          'Umowę o pracę oraz dobrą pensję',
          'Bezpłatny staż na miesiąc',
          'Kolejną rozmowę kwalifikacyjną za tydzień',
          'Przeprowadzkę do innego miasta',
        ],
        correctIndex: 0,
        explanation: {
          en: 'The text states: "zaproponował jej umowę o pracę oraz dobrą pensję" (an employment contract and a good salary).',
          ru: 'В тексте сказано: «zaproponował jej umowę o pracę oraz dobrą pensję» (трудовой договор и хорошую зарплату).',
          tr: 'Metinde "zaproponował jej umowę o pracę oraz dobrą pensję" (iş sözleşmesi ve iyi bir maaş teklif etti) denmektedir.',
        },
      },
      {
        id: 'ex-b1-3-2',
        type: 'fill-blank',
        prompt: {
          en: 'Complete the B1 idiom "I care deeply about this job" (ta praca):',
          ru: 'Дополните важную конструкцию уровня B1 «Мне очень важна эта работа» (ta praca):',
          tr: '"Bu işe çok önem veriyorum" (ta praca) B1 kalıbını tamamlayın:',
        },
        sentencePl: 'Bardzo zależy mi na ___.',
        sentenceTranslation: {
          en: 'This job matters a lot to me.',
          ru: 'Мне очень важна эта работа.',
          tr: 'Bu iş benim için çok önemli.',
        },
        governedCase: 'locative',
        options: ['tej pracy', 'tę pracę', 'ta praca', 'tą pracą'],
        correctIndex: 0,
        explanation: {
          en: '"Zależeć komuś NA czymś" governs the Locative case (Miejscownik): zależy mi na tej pracy.',
          ru: 'Конструкция «zależeć komuś NA czymś» требует Предложного падежа (Miejscownik): zależy mi na tej pracy.',
          tr: '"Zależeć komuś NA czymś" kalıbı Miejscownik (Bulunma hâli) alır: zależy mi na tej pracy.',
        },
      },
      {
        id: 'ex-b1-3-3',
        type: 'fill-blank',
        prompt: {
          en: 'Choose the right Instrumental plural form after "zajmować się" (nowe projekty):',
          ru: 'Выберите правильную форму Творительного падежа мн. числа после «zajmować się» (nowe projekty):',
          tr: '"zajmować się" sonrasında doğru çoğul Narzędnik biçimini seçin (nowe projekty):',
        },
        sentencePl: 'W naszej firmie zajmujemy się ___.',
        sentenceTranslation: {
          en: 'In our company we deal with new projects.',
          ru: 'В нашей компании мы занимаемся новыми проектами.',
          tr: 'Şirketimizde yeni projelerle ilgileniyoruz.',
        },
        governedCase: 'instrumental',
        options: ['nowymi projektami', 'nowych projektów', 'nowym projektom', 'nowe projekty'],
        correctIndex: 0,
        explanation: {
          en: 'Plural Instrumental always ends in -ymi/-imi for adjectives and -ami for nouns: nowymi projektami.',
          ru: 'Во множественном числе Творительного падежа (Narzędnik) у всех родов одинаковые окончания: прил. -ymi/-imi, сущ. -ami → nowymi projektami.',
          tr: 'Çoğul Narzędnik tüm cinsiyetlerde sıfatlarda -ymi/-imi, isimlerde -ami ile biter: nowymi projektami.',
        },
      },
    ],
  },

  /* ==================== LEVEL B2 ==================== */
  {
    id: 'mod-b2-1',
    slug: 'b2-conditional-complex-cases',
    order: 12,
    cefr: 'B2',
    subLevel: 'B2',
    category: 'grammar',
    estimatedMinutes: 12,
    xpReward: 150,
    relatedCase: 'genitive',
    relatedVerbSlug: 'zastanawiac-sie',
    title: {
      en: 'Conditional Mood (-bym/-byś), "Żeby" Clauses & Advanced Rekcja',
      ru: 'Сослагательное наклонение (-bym/-byś), союзы «gdyby / żeby» и сложное управление',
      tr: 'Dilek-Şart Kipi (-bym/-byś), "Gdyby / Żeby" Cümleleri ve İleri Fiil Yönetimi',
    },
    subtitle: {
      en: 'Expressing hypotheses (Gdybym wiedział...), polite requests (Chciałbym...), and B2 verbs (zastanawiać się nad, przyzwyczaić się do).',
      ru: 'Условные предложения (Gdybym miał...), вежливые конструкции (Chciałbym...) и глаголы уровня B2 (zastanawiać się nad, przyzwyczaić się do).',
      tr: 'Koşul cümleleri (Gdybym wiedział...), kibarca rica (Chciałbym...) ve B2 fiilleri (zastanawiać się nad, przyzwyczaić się do).',
    },
    theory: [
      {
        id: 'th-b2-1a',
        heading: {
          en: '1. Conditional Mood (Tryb przypuszczający) & Mobile "-bym / -byś / -by"',
          ru: '1. Сослагательное наклонение и подвижная частица -bym / -byś / -by',
          tr: '1. Dilek-Şart Kipi (Tryb przypuszczający) ve Hareketli "-bym / -byś / -by" Eki',
        },
        body: {
          en: 'To form the Conditional ("would"), take the 3rd-person past stem (chciał / chciała / chcieli / chciały) and attach the personal conditional endings: -bym (I), -byś (you), -by (he/she/it), -byśmy (we), -byście (you pl.), -by (they). Crucially, in "if" clauses, the ending detaches from the verb and fuses with "gdy" → Gdybym miał czas... (If I had time...), Gdybyś mogła... (If you could...).',
          ru: 'Сослагательное наклонение образуется от основы 3-го лица прошедшего времени (chciał / chciała / chcieli) + личные частицы: -bym (я бы), -byś (ты бы), -by (он/она бы), -byśmy (мы бы), -byście (вы бы). Важнейшая особенность польского: в придаточных предложениях частица отрывается от глагола и приклеивается к союзу «gdy» (если бы) или «że» (чтобы): Gdybym wiedział! (Если бы я знал!), Chcę, żebyś przyszedł (Хочу, чтобы ты пришёл)!',
          tr: 'Dilek-şart kipini ("-seydim / -erdim") kurmak için 3. şahıs geçmiş zaman gövdesine (chciał / chciała) şahıslı şart ekleri getirilir: -bym (ben), -byś (sen), -by (o), -byśmy (biz), -byście (siz). "Eğer" (gdyby) ve "için/diye" (żeby) cümlelerinde bu ek fiilden ayrılıp bağlaca yapışır: Gdybym miał czas... (Vaktim olsaydı...), Chcę, żebyś przyszedł (Gelmeni istiyorum).',
        },
        l1Tip: {
          en: 'After "żeby" (so that / in order for someone to), the verb is ALWAYS in the 3rd-person past form: Proszę, żebyś mi pomógł (literally: "that-you helped me").',
          ru: 'В русском частица «бы» не изменяется по лицам, а в польском именно в ней спрятано лицо (-bym, -byś, -byśmy), поэтому после «gdybym / żebyś» сам глагол стоит в форме 3-го лица (Gdybym miał, Żebyś zrobiła)!',
          tr: '"Gdybym / gdybyś / żebyś" bağlaçları şahıs ekini zaten taşıdığı için devamındaki fiil 3. tekil geçmiş zaman biçiminde (miał / miała) kalır.',
        },
        examples: [
          {
            pl: 'Gdybym miał więcej wolnego czasu, przeprowadziłbym się nad morze.',
            highlight: 'Gdybym miał / przeprowadziłbym się',
            translation: {
              en: 'If I (m.) had more free time, I would move to the seaside.',
              ru: 'Если бы у меня (муж.) было больше свободного времени, я бы переехал к морю.',
              tr: 'Daha fazla boş vaktim olsaydı (erkek), deniz kenarına taşınırdım.',
            },
          },
        ],
      },
      {
        id: 'th-b2-1b',
        heading: {
          en: '2. Advanced B2 Verb Government: Zastanawiać się NAD & Przyzwyczaić się DO',
          ru: '2. Продвинутое управление B2: zastanawiać się NAD и przyzwyczaić się DO',
          tr: '2. İleri B2 Fiil Yönetimi: Zastanawiać się NAD ve Przyzwyczaić się DO',
        },
        body: {
          en: 'At B2 level, master these expressive prepositional verbs: 1) zastanawiać się / zastanowić się NAD + Instrumental (to ponder / consider deeply: Zastanawiam się nad nową ofertą). 2) przyzwyczajać się / przyzwyczaić się DO + Genitive (to get used to: Przyzwyczaiłem się do nowego klimatu). 3) rezygnować / zrezygnować Z + Genitive (to give up / resign from: Zrezygnował z dawnej pracy).',
          ru: 'На уровне B2 важно свободно владеть глаголами с предложным управлением: 1) zastanawiać się NAD + Творительный (размышлять над чем-то: Zastanawiam się nad przeprowadzką). 2) przyzwyczaić się DO + Родительный (привыкнуть к чему-то — внимание: предлог DO + Dopełniacz вместо русского «к + Дат.»!). 3) zrezygnować Z + Родительный (отказаться от чего-то).',
          tr: 'B2 seviyesinde şu edatlı fiillere hâkim olun: 1) zastanawiać się NAD + Narzędnik (üzerinde derin düşünmek: Zastanawiam się nad nową ofertą). 2) przyzwyczaić się DO + Dopełniacz (bir şeye alışmak: Przyzwyczaiłem się do nowego miasta). 3) zrezygnować Z + Dopełniacz (bir şeyden vazgeçmek / istifa etmek).',
        },
        l1Tip: {
          en: 'Notice: "tęsknić ZA + Instrumental" (to miss someone/something: Tęsknię za domem, za rodziną).',
          ru: 'Ещё один частый глагол B2: «tęsknić ZA + Творительный падеж» (скучать по кому/чему: Tęsknię za domem, za rodziną).',
          tr: 'Önemli bir B2 fiili daha: "tęsknić ZA + Narzędnik" (birini/bir şeyi özlemek: Tęsknię za domem).',
        },
        examples: [
          {
            pl: 'Szybko przyzwyczaiłam się do życia w Polsce, ale wciąż zastanawiam się nad zmianą pracy.',
            highlight: 'do życia / nad zmianą pracy',
            translation: {
              en: 'I (f.) quickly got used to life in Poland, but I am still considering changing jobs.',
              ru: 'Я (жен.) быстро привыкла к жизни в Польше, но всё ещё размышляю над сменой работы.',
              tr: 'Polonya’daki hayata çabuk alıştım (kadın), ama hâlâ iş değiştirmeyi düşünüyorum.',
            },
          },
        ],
      },
    ],
    exercises: [
      {
        id: 'ex-b2-1-1',
        type: 'fill-blank',
        prompt: {
          en: 'Complete the 2nd-person singular ("ty") conditional clause ("If you had time..."):',
          ru: 'Дополните условное предложение для 2-го лица ед. ч. («Если бы у тебя было время...»):',
          tr: '2. tekil şahıs ("sen") şart cümlesini tamamlayın ("Vaktin olsaydı..."):',
        },
        sentencePl: '___ czas, poszlibyśmy dzisiaj do teatru.',
        sentenceTranslation: {
          en: 'If you (m.) had time, we would go to the theater today.',
          ru: 'Если бы у тебя (муж.) было время, мы бы пошли сегодня в театр.',
          tr: 'Vaktin olsaydı (erkek), bugün tiyatroya giderdik.',
        },
        options: ['Gdybyś miał', 'Gdyby miałeś', 'Gdybym miał', 'Żebyś masz'],
        correctIndex: 0,
        explanation: {
          en: 'In conditional "if" clauses, "-byś" attaches to "gdy" (Gdybyś), and the verb stays in the 3rd-person past form (miał).',
          ru: 'В условном предложении личное окончание -byś присоединяется к союзу «gdy» → «Gdybyś», а глагол ставится в форму 3-го лица прош. времени («miał», а не *miałeś!).',
          tr: 'Şart cümlesinde "-byś" eki "gdy" bağlacına birleşir (Gdybyś) ve fiil 3. tekil geçmiş zamanda (miał) kalır.',
        },
      },
      {
        id: 'ex-b2-1-2',
        type: 'case-match',
        prompt: {
          en: 'Which preposition and case does "zastanawiać się" (to consider / ponder) govern?',
          ru: 'Какого предлога и падежа требует глагол «zastanawiać się» (размышлять / обдумывать)?',
          tr: '"zastanawiać się" (üzerinde düşünmek) fiili hangi edat ve hâli yönetir?',
        },
        sentencePl: 'Zastanawiamy się ___ (ta propozycja).',
        sentenceTranslation: {
          en: 'We are considering this proposal.',
          ru: 'Мы размышляем над этим предложением.',
          tr: 'Bu teklif üzerinde düşünüyoruz.',
        },
        governedCase: 'instrumental',
        options: [
          'nad + Narzędnik: nad tą propozycją',
          'o + Miejscownik: o tej propozycji',
          'na + Biernik: na tę propozycję',
          'do + Dopełniacz: do tej propozycji',
        ],
        correctIndex: 0,
        explanation: {
          en: '"Zastanawiać się" governs "nad + Instrumental (Narzędnik)": zastanawiamy się nad tą propozycją.',
          ru: 'Глагол «zastanawiać się» всегда требует предлога «nad + Творительный падеж (Narzędnik)»: nad tą propozycją.',
          tr: '"Zastanawiać się" fiili "nad + Narzędnik" kalıbıyla kullanılır: nad tą propozycją.',
        },
      },
      {
        id: 'ex-b2-1-3',
        type: 'fill-blank',
        prompt: {
          en: 'Complete with the right preposition and case after "przyzwyczaić się" (nowe miasto):',
          ru: 'Выберите правильный предлог и падеж после глагола «przyzwyczaić się» (nowe miasto):',
          tr: '"przyzwyczaić się" fiilinden sonra doğru edat ve hâli seçin (nowe miasto):',
        },
        sentencePl: 'Po miesiącu przyzwyczaiłem się ___.',
        sentenceTranslation: {
          en: 'After a month I got used to the new city.',
          ru: 'Через месяц я привык к новому городу.',
          tr: 'Bir ay sonra yeni şehre alıştım.',
        },
        governedCase: 'genitive',
        options: [
          'do nowego miasta',
          'nowemu miastu',
          'z nowym miastem',
          'w nowym mieście',
        ],
        correctIndex: 0,
        explanation: {
          en: '"Przyzwyczaić się" (to get used to) governs "do + Genitive (Dopełniacz)": do nowego miasta.',
          ru: 'В отличие от русского «привыкнуть К + Дательный», в польском «przyzwyczaić się» требует предлога «DO + Родительный падеж (Dopełniacz)»: do nowego miasta.',
          tr: '"Przyzwyczaić się" (alışmak) fiili "do + Dopełniacz" alır: do nowego miasta.',
        },
      },
    ],
  },
];

export const MODULE_BY_SLUG: Record<string, CurriculumModule> = Object.fromEntries(
  CURRICULUM_MODULES.map((m) => [m.slug, m]),
);
