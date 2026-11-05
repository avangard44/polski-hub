import type { CompactVerbSpec } from './verbBuilder';

export const VERBS_PART_3: CompactVerbSpec[] = [
  // 106. ufać / zaufać
  {
    slug: 'ufac',
    level: 'A2',
    rank: 116,
    tags: ['daily'],
    tr: { en: 'to trust', ru: 'доверять / довериться', tr: 'güvenmek' },
    impf: { inf: 'ufać', cls: 'a' },
    pf: { inf: 'zaufać', cls: 'a' },
    gov: [
      {
        case: 'dative',
        contrast: {
          en: {
            equivalent: 'trust + direct object',
            level: 'mismatch',
            note: 'In Polish you give trust TO someone (Dative / Celownik): ufam tobie, ufam lekarzowi.',
          },
          ru: {
            equivalent: 'доверять + Д. п.',
            level: 'match',
            note: 'Полное совпадение с русским: доверять кому? — ufać komu? (Celownik).',
          },
          tr: {
            equivalent: 'birine (-e) güvenmek',
            level: 'match',
            note: 'Türkçe yönelme hâli (-e) ile tam örtüşür: ufam tobie = sana güveniyorum.',
          },
        },
        ex: {
          v: 'Ufam ',
          obj: 'swojemu lekarzowi',
          lemma: 'swój lekarz',
          tr: { en: 'I trust my doctor.', ru: 'Я доверяю своему врачу.', tr: 'Doktoruma güveniyorum.' },
        },
      },
    ],
  },
  // 107. wierzyć / uwierzyć
  {
    slug: 'wierzyc',
    level: 'A2',
    rank: 117,
    tags: ['daily'],
    tr: { en: 'to believe', ru: 'верить / поверить', tr: 'inanmak' },
    impf: { inf: 'wierzyć', cls: 'y' },
    pf: { inf: 'uwierzyć', cls: 'y' },
    gov: [
      {
        case: 'dative',
        meaning: { en: 'to believe someone', ru: 'верить кому-то', tr: 'birine inanmak' },
        ex: {
          v: 'Wierzę ',
          obj: 'ci',
          lemma: 'ty',
          tr: { en: 'I believe you.', ru: 'Я верю тебе.', tr: 'Sana inanıyorum.' },
        },
      },
      {
        case: 'accusative',
        prep: 'w',
        meaning: { en: 'to believe in something', ru: 'верить во что-то', tr: 'bir şeye inanmak' },
        ex: {
          v: 'Wierzymy ',
          prep: 'w ',
          obj: 'sukces',
          lemma: 'sukces',
          tr: { en: 'We believe in success.', ru: 'Мы верим в успех.', tr: 'Başarıya inanıyoruz.' },
        },
      },
    ],
  },
  // 108. marzyć / zamarzyć
  {
    slug: 'marzyc',
    level: 'A2',
    rank: 118,
    tags: ['daily'],
    tr: { en: 'to dream (wish for)', ru: 'мечтать', tr: 'hayal kurmak' },
    impf: { inf: 'marzyć', cls: 'y' },
    pf: { inf: 'zamarzyć', cls: 'y' },
    gov: [
      {
        case: 'locative',
        prep: 'o',
        ex: {
          v: 'Marzę ',
          prep: 'o ',
          obj: 'długim urlopie',
          lemma: 'długi urlop',
          tr: { en: 'I dream of a long vacation.', ru: 'Я мечтаю о долгом отпуске.', tr: 'Uzun bir tatil hayal ediyorum.' },
        },
      },
    ],
  },
  // 109. tęsknić / zatęsknić
  {
    slug: 'tesknic',
    level: 'B1',
    rank: 119,
    tags: ['daily', 'emotions'],
    tr: { en: 'to miss (someone / home)', ru: 'скучать, тосковать (по кому-то / чему-то)', tr: 'özlemek' },
    impf: { inf: 'tęsknić', cls: 'i' },
    pf: { inf: 'zatęsknić', cls: 'i' },
    gov: [
      {
        case: 'instrumental',
        prep: 'za',
        contrast: {
          en: {
            equivalent: 'miss + direct object',
            level: 'mismatch',
            note: 'Polish uses the preposition "za" + Instrumental (Narzędnik): tęsknię za domem, tęsknię za tobą.',
          },
          ru: {
            equivalent: 'скучать по + Д. п.',
            level: 'mismatch',
            note: 'В русском «скучаю по дому / по тебе», а в польском — tęsknić ZA + творительный падеж (Narzędnik): tęsknię za domem, tęsknię za tobą!',
          },
          tr: {
            equivalent: 'birini / bir yeri (-i) özlemek',
            level: 'mismatch',
            note: 'Türkçede doğrudan nesne (-i) alır; Lehçede ise "za + Narzędnik" kullanılır: tęsknię za domem (evimi özlüyorum).',
          },
        },
        ex: {
          v: 'Bardzo tęsknię ',
          prep: 'za ',
          obj: 'rodziną',
          lemma: 'rodzina',
          tr: { en: 'I miss my family very much.', ru: 'Я очень скучаю по семье.', tr: 'Ailemi çok özlüyorum.' },
        },
      },
    ],
  },
  // 110. cieszyć się / ucieszyć się
  {
    slug: 'cieszyc-sie',
    level: 'A2',
    rank: 120,
    tags: ['daily', 'emotions'],
    tr: { en: 'to be glad, to rejoice', ru: 'радоваться / обрадоваться', tr: 'sevinmek' },
    impf: { inf: 'cieszyć się', cls: 'y' },
    pf: { inf: 'ucieszyć się', cls: 'y' },
    gov: [
      {
        case: 'genitive',
        prep: 'z',
        contrast: {
          ru: {
            equivalent: 'радоваться + Д. п. (чему?)',
            level: 'mismatch',
            note: 'В русском «радуюсь подарку» (Д. п.), а в польском — cieszyć się Z + родительный падеж (Dopełniacz): cieszę się z prezentu!',
          },
        },
        ex: {
          v: 'Cieszę się ',
          prep: 'z ',
          obj: 'twojego sukcesu',
          lemma: 'twój sukces',
          tr: { en: 'I am happy about your success.', ru: 'Я рад твоему успеху.', tr: 'Başarına seviniyorum.' },
        },
      },
    ],
  },
  // 111. martwić się / zmartwić się
  {
    slug: 'martwic-sie',
    level: 'A2',
    rank: 121,
    tags: ['daily', 'emotions'],
    tr: { en: 'to worry', ru: 'беспокоиться, переживать / расстроиться', tr: 'endişelenmek, üzülmek' },
    impf: { inf: 'martwić się', cls: 'i' },
    pf: { inf: 'zmartwić się', cls: 'i' },
    gov: [
      {
        case: 'accusative',
        prep: 'o',
        meaning: { en: 'to worry about someone', ru: 'переживать за кого-то', tr: 'biri için endişelenmek' },
        ex: {
          v: 'Martwię się ',
          prep: 'o ',
          obj: 'zdrowie babci',
          lemma: 'zdrowie babci',
          tr: { en: "I worry about grandma's health.", ru: 'Я переживаю за здоровье бабушки.', tr: 'Büyükannemin sağlığı için endişeleniyorum.' },
        },
      },
      {
        case: 'instrumental',
        meaning: { en: 'to worry about a problem', ru: 'беспокоиться чем-то (из-за чего-то)', tr: 'bir şeyi dert etmek' },
        ex: {
          v: 'Nie martw się ',
          obj: 'tym egzaminem',
          lemma: 'ten egzamin',
          tr: { en: "Don't worry about this exam.", ru: 'Не переживай из-за этого экзамена.', tr: 'Bu sınavı kafana takma.' },
        },
      },
    ],
  },
  // 112. denerwować się / zdenerwować się
  {
    slug: 'denerwowac-sie',
    level: 'A2',
    rank: 122,
    tags: ['daily', 'emotions'],
    tr: { en: 'to get nervous, to be upset', ru: 'нервничать / разозлиться, разнервничаться', tr: 'sinirlenmek, heyecanlanmak' },
    impf: { inf: 'denerwować się', cls: 'owa' },
    pf: { inf: 'zdenerwować się', cls: 'owa' },
    gov: [
      {
        case: 'instrumental',
        ex: {
          v: 'Denerwuję się ',
          obj: 'rozmową kwalifikacyjną',
          lemma: 'rozmowa kwalifikacyjna',
          tr: { en: 'I am nervous about the job interview.', ru: 'Я нервничаю из-за собеседования.', tr: 'İş görüşmesi yüzünden heyecanlanıyorum.' },
        },
      },
    ],
  },
  // 113. dziwić się / zdziwić się
  {
    slug: 'dziwic-sie',
    level: 'B1',
    rank: 123,
    tags: ['daily', 'emotions'],
    tr: { en: 'to be surprised, to wonder', ru: 'удивляться / удивиться', tr: 'şaşırmak' },
    impf: { inf: 'dziwić się', cls: 'i' },
    pf: { inf: 'zdziwić się', cls: 'i' },
    gov: [
      {
        case: 'dative',
        ex: {
          v: 'Nie dziwię się ',
          obj: 'twojej decyzji',
          lemma: 'twoja decyzja',
          tr: { en: 'I am not surprised by your decision.', ru: 'Я не удивляюсь твоему решению.', tr: 'Kararına şaşırmıyorum.' },
        },
      },
    ],
  },
  // 114. śmiać się / zaśmiać się
  {
    slug: 'smiac-sie',
    level: 'A2',
    rank: 124,
    tags: ['daily', 'emotions'],
    tr: { en: 'to laugh', ru: 'смеяться / засмеяться', tr: 'gülmek' },
    impf: {
      inf: 'śmiać się',
      pres: ['śmieję', 'śmiejesz', 'śmieje', 'śmiejemy', 'śmiejecie', 'śmieją'],
      past: ['śmiał', 'śmiał', 'śmiali'],
      imp2: 'śmiej',
    },
    pf: {
      inf: 'zaśmiać się',
      pres: ['zaśmieję', 'zaśmiejesz', 'zaśmieje', 'zaśmiejemy', 'zaśmiejecie', 'zaśmieją'],
      past: ['zaśmiał', 'zaśmiał', 'zaśmiali'],
      imp2: 'zaśmiej',
    },
    gov: [
      {
        case: 'genitive',
        prep: 'z',
        meaning: { en: 'to laugh at', ru: 'смеяться над кем-то / чем-то', tr: 'birine / bir şeye gülmek' },
        contrast: {
          ru: {
            equivalent: 'смеяться над + Т. п.',
            level: 'mismatch',
            note: 'В русском «смеяться над шуткой», а в польском — śmiać się Z + родительный падеж (Dopełniacz): śmieję się z żartu!',
          },
        },
        ex: {
          v: 'Wszyscy śmieją się ',
          prep: 'z ',
          obj: 'tego żartu',
          lemma: 'ten żart',
          tr: { en: 'Everyone is laughing at this joke.', ru: 'Все смеются над этой шуткой.', tr: 'Herkes bu şakaya gülüyor.' },
        },
      },
    ],
  },
  // 115. uśmiechać się / uśmiechnąć się
  {
    slug: 'usmiechac-sie',
    level: 'A2',
    rank: 125,
    tags: ['daily', 'emotions'],
    tr: { en: 'to smile', ru: 'улыбаться / улыбнуться', tr: 'gülümsemek' },
    impf: { inf: 'uśmiechać się', cls: 'a' },
    pf: { inf: 'uśmiechnąć się', cls: 'na' },
    gov: [
      {
        case: 'genitive',
        prep: 'do',
        contrast: {
          ru: {
            equivalent: 'улыбаться + Д. п. (кому?)',
            level: 'mismatch',
            note: 'В польском улыбаются «К кому-то» — uśmiechać się DO + Dopełniacz: uśmiecham się do dziecka.',
          },
        },
        ex: {
          v: 'Uśmiecham się ',
          prep: 'do ',
          obj: 'sąsiadki',
          lemma: 'sąsiadka',
          tr: { en: 'I smile at my neighbor.', ru: 'Я улыбаюсь соседке.', tr: 'Komşuma gülümsüyorum.' },
        },
      },
    ],
  },
  // 116. opiekować się / zaopiekować się
  {
    slug: 'opiekowac-sie',
    level: 'B1',
    rank: 126,
    tags: ['daily'],
    tr: { en: 'to take care of, to look after', ru: 'заботиться, присматривать / позаботиться', tr: 'ilgilenmek, bakmak (birine)' },
    impf: { inf: 'opiekować się', cls: 'owa' },
    pf: { inf: 'zaopiekować się', cls: 'owa' },
    gov: [
      {
        case: 'instrumental',
        contrast: {
          en: {
            equivalent: 'take care of + noun',
            level: 'mismatch',
            note: 'Governs the Instrumental (Narzędnik) without any preposition: opiekuję się dzieckiem.',
          },
          ru: {
            equivalent: 'заботиться о + П. п.',
            level: 'mismatch',
            note: 'В русском «заботиться о коте», а в польском — творительный падеж без предлога (Narzędnik): opiekuję się kotem!',
          },
        },
        ex: {
          v: 'Opiekuję się ',
          obj: 'młodszym bratem',
          lemma: 'młodszy brat',
          tr: { en: 'I look after my younger brother.', ru: 'Я присматриваю за младшим братом.', tr: 'Küçük kardeşimle ilgileniyorum.' },
        },
      },
    ],
  },
  // 117. zajmować się / zająć się
  {
    slug: 'zajmowac-sie',
    level: 'A2',
    rank: 127,
    tags: ['work', 'daily'],
    tr: { en: 'to deal with, to be occupied with', ru: 'заниматься / заняться (чем-то)', tr: 'uğraşmak, ilgilenmek' },
    impf: { inf: 'zajmować się', cls: 'owa' },
    pf: {
      inf: 'zająć się',
      pres: ['zajmę', 'zajmiesz', 'zajmie', 'zajmiemy', 'zajmiecie', 'zajmą'],
      past: ['zajęł', 'zajął', 'zajęli'],
      imp2: 'zajmij',
    },
    gov: [
      {
        case: 'instrumental',
        ex: {
          v: 'Zajmuję się ',
          obj: 'marketingiem',
          lemma: 'marketing',
          tr: { en: 'I work in (deal with) marketing.', ru: 'Я занимаюсь маркетингом.', tr: 'Pazarlamayla ilgileniyorum.' },
        },
        pfEx: {
          v: 'Zajmę się ',
          obj: 'tą sprawą',
          lemma: 'ta sprawa',
          tr: { en: 'I will take care of this matter.', ru: 'Я займусь этим вопросом.', tr: 'Bu konuyla ilgileneceğim.' },
        },
      },
    ],
  },
  // 118. korzystać / skorzystać
  {
    slug: 'korzystac',
    level: 'B1',
    rank: 128,
    tags: ['daily', 'work', 'university'],
    tr: { en: 'to use, to make use of, to benefit from', ru: 'пользоваться / воспользоваться', tr: 'yararlanmak, kullanmak' },
    impf: { inf: 'korzystać', cls: 'a' },
    pf: { inf: 'skorzystać', cls: 'a' },
    gov: [
      {
        case: 'genitive',
        prep: 'z',
        contrast: {
          ru: {
            equivalent: 'пользоваться + Т. п.',
            level: 'mismatch',
            note: 'Ловушка! В русском «пользоваться интернетом» (Т. п.), а в польском — korzystać Z + родительный падеж (Dopełniacz): korzystam z internetu!',
          },
          tr: {
            equivalent: 'bir şeyden (-den) yararlanmak',
            level: 'match',
            note: 'Türkçe "-den yararlanmak" ile aynı mantıktadır: z + Dopełniacz (korzystam z internetu).',
          },
        },
        ex: {
          v: 'Korzystam ',
          prep: 'z ',
          obj: 'transportu publicznego',
          lemma: 'transport publiczny',
          tr: { en: 'I use public transport.', ru: 'Я пользуюсь общественным транспортом.', tr: 'Toplu taşıma kullanıyorum.' },
        },
        pfEx: {
          v: 'Skorzystałem ',
          prep: 'z ',
          obj: 'okazji',
          lemma: 'okazja',
          tr: { en: 'I took advantage of the opportunity.', ru: 'Я воспользовался случаем.', tr: 'Fırsattan yararlandım.' },
        },
      },
    ],
  },
  // 119. zależeć
  {
    slug: 'zalezec',
    level: 'B1',
    rank: 129,
    tags: ['daily', 'work'],
    tr: { en: 'to depend on / to care deeply about', ru: 'зависеть от / быть важным для кого-то', tr: 'bağlı olmak / önemsemek' },
    impf: { inf: 'zależeć', cls: 'e_y' },
    gov: [
      {
        case: 'genitive',
        prep: 'od',
        meaning: { en: 'to depend on something', ru: 'зависеть от чего-то', tr: 'bir şeye bağlı olmak' },
        ex: {
          v: 'Wszystko zależy ',
          prep: 'od ',
          obj: 'pogody',
          lemma: 'pogoda',
          tr: { en: 'Everything depends on the weather.', ru: 'Всё зависит от погоды.', tr: 'Her şey havaya bağlı.' },
        },
      },
      {
        case: 'locative',
        prep: 'na',
        meaning: { en: 'to care a lot about (zależy mi na...)', ru: 'мне важно / я дорожу (zależy mi na + П. п.)', tr: 'benim için çok önemli (zależy mi na...)' },
        ex: {
          v: 'Bardzo mi zależy ',
          prep: 'na ',
          obj: 'tej pracy',
          lemma: 'ta praca',
          tr: { en: 'I really care about getting this job.', ru: 'Мне очень важна эта работа.', tr: 'Bu iş benim için çok önemli.' },
        },
      },
    ],
  },
  // 120. zgadzać się / zgodzić się
  {
    slug: 'zgadzac-sie',
    level: 'A2',
    rank: 130,
    tags: ['work', 'daily'],
    tr: { en: 'to agree', ru: 'соглашаться / согласиться', tr: 'katılmak, kabul etmek' },
    impf: { inf: 'zgadzać się', cls: 'a' },
    pf: { inf: 'zgodzić się', cls: 'i', pres: ['zgodzę', 'zgodzisz', 'zgodzi', 'zgodzimy', 'zgodzicie', 'zgodzą'] },
    gov: [
      {
        case: 'instrumental',
        prep: 'z',
        meaning: { en: 'to agree with someone', ru: 'соглашаться с кем-то', tr: 'birine katılmak (hemfikir olmak)' },
        ex: {
          v: 'Zgadzam się ',
          prep: 'z ',
          obj: 'tobą',
          lemma: 'ty',
          tr: { en: 'I agree with you.', ru: 'Я согласен с тобой.', tr: 'Sana katılıyorum.' },
        },
      },
      {
        case: 'accusative',
        prep: 'na',
        meaning: { en: 'to agree to (accept) a proposal', ru: 'согласиться на (предложение, условия)', tr: 'bir teklifi / koşulu kabul etmek' },
        ex: {
          v: 'Zgodziliśmy się ',
          prep: 'na ',
          obj: 'nowe warunki',
          lemma: 'nowe warunki',
          tr: { en: 'We agreed to the new terms.', ru: 'Мы согласились на новые условия.', tr: 'Yeni koşulları kabul ettik.' },
        },
      },
    ],
  },
  // 121. kłócić się / pokłócić się
  {
    slug: 'klocic-sie',
    level: 'B1',
    rank: 131,
    tags: ['daily'],
    tr: { en: 'to argue, to quarrel', ru: 'ссориться, спорить / поссориться', tr: 'tartışmak, kavga etmek' },
    impf: { inf: 'kłócić się', cls: 'i', pres: ['kłócę', 'kłócisz', 'kłóci', 'kłócimy', 'kłócicie', 'kłócą'] },
    pf: { inf: 'pokłócić się', cls: 'i', pres: ['pokłócę', 'pokłócisz', 'pokłóci', 'pokłócimy', 'pokłócicie', 'pokłócą'] },
    gov: [
      {
        case: 'instrumental',
        prep: 'z',
        ex: {
          v: 'Rzadko kłócę się ',
          prep: 'z ',
          obj: 'bratem',
          lemma: 'brat',
          tr: { en: 'I rarely argue with my brother.', ru: 'Я редко ссорюсь с братом.', tr: 'Kardeşimle nadiren tartışırım.' },
        },
      },
    ],
  },
  // 122. żartować / zażartować
  {
    slug: 'zartowac',
    level: 'A2',
    rank: 132,
    tags: ['daily'],
    tr: { en: 'to joke, to kid', ru: 'шутить / пошутить', tr: 'şaka yapmak' },
    impf: { inf: 'żartować', cls: 'owa' },
    pf: { inf: 'zażartować', cls: 'owa' },
    gov: [
      {
        case: 'genitive',
        prep: 'z',
        ex: {
          v: 'Tylko żartuję ',
          prep: 'z ',
          obj: 'ciebie',
          lemma: 'ty',
          tr: { en: 'I am just teasing (joking with) you.', ru: 'Я просто подшучиваю над тобой.', tr: 'Seninle sadece şakalaşıyorum.' },
        },
      },
    ],
  },
  // 123. gratulować / pogratulować
  {
    slug: 'gratulowac',
    level: 'B1',
    rank: 133,
    tags: ['daily', 'work', 'university'],
    tr: { en: 'to congratulate', ru: 'поздравлять / поздравить (с успехом)', tr: 'tebrik etmek, kutlamak' },
    impf: { inf: 'gratulować', cls: 'owa' },
    pf: { inf: 'pogratulować', cls: 'owa' },
    gov: [
      {
        case: 'genitive',
        meaning: { en: 'to congratulate on (success)', ru: 'поздравлять с чем-то (в польском — Р. п. без предлога!)', tr: 'bir başarıyı tebrik etmek' },
        contrast: {
          ru: {
            equivalent: 'поздравлять с + Т. п.',
            level: 'mismatch',
            note: 'В русском «поздравляю с успехом», а в польском — родительный падеж БЕЗ предлога (Dopełniacz): gratuluję sukcesu, gratuluję awansu!',
          },
        },
        ex: {
          v: 'Gratuluję ',
          obj: 'zdania egzaminu',
          lemma: 'zdanie egzaminu',
          tr: { en: 'Congratulations on passing the exam.', ru: 'Поздравляю со сдачей экзамена.', tr: 'Sınavı geçtiğin için tebrik ederim.' },
        },
      },
    ],
  },
  // 124. życzyć
  {
    slug: 'zyczyc',
    level: 'A2',
    rank: 134,
    tags: ['daily'],
    tr: { en: 'to wish', ru: 'желать (кому-то чего-то)', tr: 'dilemek' },
    impf: { inf: 'życzyć', cls: 'y' },
    gov: [
      {
        case: 'genitive',
        meaning: { en: 'to wish something (health, luck)', ru: 'желать чего-то (здоровья, удачи)', tr: 'bir şey dilemek (sağlık, başarı)' },
        ex: {
          v: 'Życzę ci ',
          obj: 'dużo zdrowia',
          lemma: 'dużo zdrowia',
          tr: { en: 'I wish you good health.', ru: 'Желаю тебе крепкого здоровья.', tr: 'Sana bol sağlık diliyorum.' },
        },
      },
    ],
  },
  // 125. brakować / zabraknąć
  {
    slug: 'brakowac',
    level: 'B1',
    rank: 135,
    tags: ['daily', 'work'],
    tr: { en: 'to lack, to be short of', ru: 'не хватать, недоставать', tr: 'eksik olmak, yetmemek' },
    impf: { inf: 'brakować', cls: 'owa' },
    pf: { inf: 'zabraknąć', cls: 'na' },
    gov: [
      {
        case: 'genitive',
        ex: {
          v: 'Brakuje mi ',
          obj: 'czasu',
          lemma: 'czas',
          tr: { en: 'I am short of time.', ru: 'Мне не хватает времени.', tr: 'Zamanım yetmiyor (vaktim eksik).' },
        },
        pfEx: {
          v: 'Zabrakło ',
          obj: 'kawy',
          lemma: 'kawa',
          tr: { en: 'We ran out of coffee.', ru: 'Кофе закончился (не хватило кофе).', tr: 'Kahve kalmadı.' },
        },
      },
    ],
  },
  // 126. wystarczać / wystarczyć
  {
    slug: 'wystarczac',
    level: 'B1',
    rank: 136,
    tags: ['daily', 'work'],
    tr: { en: 'to suffice, to be enough', ru: 'хватать / хватить (быть достаточным)', tr: 'yetmek, yeterli olmak' },
    impf: { inf: 'wystarczać', cls: 'a' },
    pf: { inf: 'wystarczyć', cls: 'y' },
    gov: [
      {
        case: 'genitive',
        ex: {
          v: 'Wystarczy nam ',
          obj: 'pieniędzy',
          lemma: 'pieniądze',
          tr: { en: 'We will have enough money.', ru: 'Нам хватит денег.', tr: 'Paramız yetecek.' },
        },
      },
    ],
  },
  // 127. podobać się / spodobać się
  {
    slug: 'podobac-sie',
    level: 'A1',
    rank: 137,
    tags: ['daily', 'travel'],
    tr: { en: 'to be pleasing to (visually/experientially)', ru: 'нравиться / понравиться (внешне, по впечатлению)', tr: 'hoşa gitmek, beğenilmek' },
    impf: { inf: 'podobać się', cls: 'a' },
    pf: { inf: 'spodobać się', cls: 'a' },
    gov: [
      {
        case: 'dative',
        ex: {
          v: 'Bardzo podoba ',
          obj: 'mi',
          lemma: 'ja',
          post: ' się to miasto.',
          tr: { en: 'I really like this city.', ru: 'Мне очень нравится этот город.', tr: 'Bu şehir çok hoşuma gidiyor.' },
        },
      },
    ],
  },
  // 128. smakować / posmakować
  {
    slug: 'smakowac',
    level: 'A1',
    rank: 138,
    tags: ['daily'],
    tr: { en: 'to taste good (to someone)', ru: 'быть вкусным, нравиться на вкус', tr: 'lezzetli gelmek, tadı hoşa gitmek' },
    impf: { inf: 'smakować', cls: 'owa' },
    pf: { inf: 'posmakować', cls: 'owa' },
    gov: [
      {
        case: 'dative',
        ex: {
          v: 'Czy smakuje ',
          obj: 'ci',
          lemma: 'ty',
          post: ' ta zupa?',
          tr: { en: 'Do you like (the taste of) this soup?', ru: 'Тебе нравится (на вкус) этот суп?', tr: 'Bu çorbanın tadını beğendin mi?' },
        },
      },
    ],
  },
  // 129. pasować
  {
    slug: 'pasowac',
    level: 'A2',
    rank: 139,
    tags: ['daily'],
    tr: { en: 'to fit, to suit, to match', ru: 'подходить, идти (об одежде, времени)', tr: 'uymak, yakışmak' },
    impf: { inf: 'pasować', cls: 'owa' },
    gov: [
      {
        case: 'genitive',
        prep: 'do',
        meaning: { en: 'to match something', ru: 'подходить к чему-то', tr: 'bir şeye uymak' },
        ex: {
          v: 'Ta koszula pasuje ',
          prep: 'do ',
          obj: 'marynarki',
          lemma: 'marynarka',
          tr: { en: 'This shirt matches the jacket.', ru: 'Эта рубашка подходит к пиджаку.', tr: 'Bu gömlek cekete uyuyor.' },
        },
      },
      {
        case: 'dative',
        meaning: { en: 'to suit someone (schedule/clothes)', ru: 'подходить кому-то (о времени, планах)', tr: 'birine uymak' },
        ex: {
          v: 'Piątek bardzo ',
          obj: 'mi',
          lemma: 'ja',
          post: ' pasuje.',
          tr: { en: 'Friday suits me very well.', ru: 'Пятница мне очень подходит.', tr: 'Cuma günü bana çok uyar.' },
        },
      },
    ],
  },
  // 130. boleć / rozboleć
  {
    slug: 'bolec',
    level: 'A1',
    rank: 140,
    tags: ['daily'],
    tr: { en: 'to hurt, to ache', ru: 'болеть / разболеться (об органе)', tr: 'ağrımak, acımak' },
    impf: { inf: 'boleć', cls: 'e_i' },
    pf: { inf: 'rozboleć', cls: 'e_i' },
    gov: [
      {
        case: 'accusative',
        contrast: {
          ru: {
            equivalent: 'у меня болит + И. п.',
            level: 'mismatch',
            note: 'В русском «у меня болит голова», а в польском — «болит меня голова» с винительным падежом (Biernik): boli mnie głowa!',
          },
        },
        ex: {
          v: 'Boli ',
          obj: 'mnie',
          negObj: 'mnie',
          lemma: 'ja',
          post: ' głowa.',
          tr: { en: 'My head hurts (I have a headache).', ru: 'У меня болит голова.', tr: 'Başım ağrıyor.' },
        },
      },
    ],
  },
  // 131. czuć się / poczuć się
  {
    slug: 'czuc-sie',
    level: 'A1',
    rank: 141,
    tags: ['daily'],
    tr: { en: 'to feel (well / unwell)', ru: 'чувствовать себя / почувствовать себя', tr: 'hissetmek (kendini)' },
    impf: {
      inf: 'czuć się',
      pres: ['czuję', 'czujesz', 'czuje', 'czujemy', 'czujecie', 'czują'],
      past: ['czuł', 'czuł', 'czuli'],
      imp2: 'czuj',
    },
    pf: {
      inf: 'poczuć się',
      pres: ['poczuję', 'poczujesz', 'poczuje', 'poczujemy', 'poczujecie', 'poczują'],
      past: ['poczuł', 'poczuł', 'poczuli'],
      imp2: 'poczuj',
    },
    gov: [
      {
        case: 'locative',
        prep: 'w',
        ex: {
          v: 'Dobrze czuję się ',
          prep: 'w ',
          obj: 'tym mieście',
          lemma: 'to miasto',
          tr: { en: 'I feel good in this city.', ru: 'Я хорошо чувствую себя в этом городе.', tr: 'Bu şehirde kendimi iyi hissediyorum.' },
        },
      },
    ],
  },
  // 132. odpoczywać / odpocząć
  {
    slug: 'odpoczywac',
    level: 'A1',
    rank: 142,
    tags: ['daily', 'travel'],
    tr: { en: 'to rest, to relax', ru: 'отдыхать / отдохнуть', tr: 'dinlenmek' },
    impf: { inf: 'odpoczywać', cls: 'a' },
    pf: {
      inf: 'odpocząć',
      pres: ['odpocznę', 'odpoczniesz', 'odpocznie', 'odpoczniemy', 'odpoczniecie', 'odpoczną'],
      past: ['odpoczęł', 'odpoczął', 'odpoczęli'],
      imp2: 'odpocznij',
    },
    gov: [
      {
        case: 'locative',
        prep: 'po',
        meaning: { en: 'to rest after something', ru: 'отдыхать после чего-то', tr: 'bir şeyden sonra dinlenmek' },
        ex: {
          v: 'Odpoczywam ',
          prep: 'po ',
          obj: 'ciężkiej pracy',
          lemma: 'ciężka praca',
          tr: { en: 'I am resting after hard work.', ru: 'Я отдыхаю после тяжёлой работы.', tr: 'Yoğun işten sonra dinleniyorum.' },
        },
      },
    ],
  },
  // 133. spacerować / pospacerować
  {
    slug: 'spacerowac',
    level: 'A1',
    rank: 143,
    tags: ['daily', 'travel'],
    tr: { en: 'to stroll, to walk', ru: 'гулять / погулять', tr: 'yürüyüş yapmak, gezmek' },
    impf: { inf: 'spacerować', cls: 'owa' },
    pf: { inf: 'pospacerować', cls: 'owa' },
    gov: [
      {
        case: 'locative',
        prep: 'po',
        ex: {
          v: 'Spacerujemy ',
          prep: 'po ',
          obj: 'parku',
          lemma: 'park',
          tr: { en: 'We are walking in the park.', ru: 'Мы гуляем по парку.', tr: 'Parkta yürüyüş yapıyoruz.' },
        },
      },
    ],
  },
  // 134. biegać / pobiegać
  {
    slug: 'biegac',
    level: 'A1',
    rank: 144,
    tags: ['daily'],
    tr: { en: 'to run, to jog', ru: 'бегать / побегать', tr: 'koşmak' },
    impf: { inf: 'biegać', cls: 'a' },
    pf: { inf: 'pobiegać', cls: 'a' },
    gov: [
      {
        case: 'locative',
        prep: 'w',
        ex: {
          v: 'Rano biegam ',
          prep: 'w ',
          obj: 'lesie',
          lemma: 'las',
          tr: { en: 'In the morning I jog in the forest.', ru: 'Утром я бегаю в лесу.', tr: 'Sabahları ormanda koşuyorum.' },
        },
      },
    ],
  },
  // 135. pływać / popływać
  {
    slug: 'plywac',
    level: 'A1',
    rank: 145,
    tags: ['daily', 'travel'],
    tr: { en: 'to swim', ru: 'плавать / поплавать', tr: 'yüzmek' },
    impf: { inf: 'pływać', cls: 'a' },
    pf: { inf: 'popływać', cls: 'a' },
    gov: [
      {
        case: 'locative',
        prep: 'w',
        ex: {
          v: 'Lubię pływać ',
          prep: 'w ',
          obj: 'morzu',
          lemma: 'morze',
          tr: { en: 'I like swimming in the sea.', ru: 'Я люблю плавать в море.', tr: 'Denizde yüzmeyi seviyorum.' },
        },
      },
    ],
  },
  // 136. grać / zagrać
  {
    slug: 'grac',
    level: 'A1',
    rank: 146,
    tags: ['daily'],
    tr: { en: 'to play (a game or instrument)', ru: 'играть / сыграть', tr: 'oynamak (oyun) / çalmak (enstrüman)' },
    impf: { inf: 'grać', cls: 'a' },
    pf: { inf: 'zagrać', cls: 'a' },
    gov: [
      {
        case: 'accusative',
        prep: 'w',
        meaning: { en: 'to play a sport / game', ru: 'играть в (игру, спорт)', tr: 'bir oyun / spor oynamak' },
        ex: {
          v: 'Gramy ',
          prep: 'w ',
          obj: 'piłkę nożną',
          lemma: 'piłka nożna',
          tr: { en: 'We play football.', ru: 'Мы играем в футбол.', tr: 'Futbol oynuyoruz.' },
        },
      },
      {
        case: 'locative',
        prep: 'na',
        meaning: { en: 'to play a musical instrument', ru: 'играть на (музыкальном инструменте)', tr: 'bir müzik aleti çalmak' },
        ex: {
          v: 'Ona gra ',
          prep: 'na ',
          obj: 'gitarze',
          lemma: 'gitara',
          tr: { en: 'She plays the guitar.', ru: 'Она играет на гитаре.', tr: 'O gitar çalıyor.' },
        },
      },
    ],
  },
  // 137. śpiewać / zaśpiewać
  {
    slug: 'spiewac',
    level: 'A1',
    rank: 147,
    tags: ['daily'],
    tr: { en: 'to sing', ru: 'петь / спеть', tr: 'şarkı söylemek' },
    impf: { inf: 'śpiewać', cls: 'a' },
    pf: { inf: 'zaśpiewać', cls: 'a' },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Śpiewamy ',
          obj: 'polską piosenkę',
          negObj: 'polskiej piosenki',
          lemma: 'polska piosenka',
          tr: { en: 'We are singing a Polish song.', ru: 'Мы поём польскую песню.', tr: 'Lehçe bir şarkı söylüyoruz.' },
        },
      },
    ],
  },
  // 138. tańczyć / zatańczyć
  {
    slug: 'tanczyc',
    level: 'A1',
    rank: 148,
    tags: ['daily'],
    tr: { en: 'to dance', ru: 'танцевать / станцевать', tr: 'dans etmek' },
    impf: { inf: 'tańczyć', cls: 'y' },
    pf: { inf: 'zatańczyć', cls: 'y' },
    gov: [
      {
        case: 'instrumental',
        prep: 'z',
        ex: {
          v: 'Tańczę ',
          prep: 'z ',
          obj: 'żoną',
          lemma: 'żona',
          tr: { en: 'I am dancing with my wife.', ru: 'Я танцую с женой.', tr: 'Eşimle dans ediyorum.' },
        },
      },
    ],
  },
  // 139. rysować / narysować
  {
    slug: 'rysowac',
    level: 'A1',
    rank: 149,
    tags: ['daily'],
    tr: { en: 'to draw', ru: 'рисовать / нарисовать (карандашом)', tr: 'çizmek (resim)' },
    impf: { inf: 'rysować', cls: 'owa' },
    pf: { inf: 'narysować', cls: 'owa' },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Dziecko rysuje ',
          obj: 'psa',
          negObj: 'psa',
          lemma: 'pies',
          tr: { en: 'The child is drawing a dog.', ru: 'Ребёнок рисует собаку.', tr: 'Çocuk bir köpek çiziyor.' },
        },
      },
    ],
  },
  // 140. malować / namalować
  {
    slug: 'malowac',
    level: 'A2',
    rank: 150,
    tags: ['daily'],
    tr: { en: 'to paint', ru: 'рисовать красками, красить / нарисовать', tr: 'boyamak, resim yapmak' },
    impf: { inf: 'malować', cls: 'owa' },
    pf: { inf: 'namalować', cls: 'owa' },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Artysta maluje ',
          obj: 'portret',
          negObj: 'portretu',
          lemma: 'portret',
          tr: { en: 'The artist is painting a portrait.', ru: 'Художник пишет портрет.', tr: 'Sanatçı bir portre yapıyor.' },
        },
      },
    ],
  },
  // 141. budować / zbudować
  {
    slug: 'budowac',
    level: 'A2',
    rank: 151,
    tags: ['work'],
    tr: { en: 'to build, to construct', ru: 'строить / построить', tr: 'inşa etmek' },
    impf: { inf: 'budować', cls: 'owa' },
    pf: { inf: 'zbudować', cls: 'owa' },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Budujemy ',
          obj: 'dom',
          negObj: 'domu',
          lemma: 'dom',
          tr: { en: 'We are building a house.', ru: 'Мы строим дом.', tr: 'Bir ev inşa ediyoruz.' },
        },
        pfEx: {
          v: 'Zbudowali ',
          obj: 'nowy most',
          lemma: 'nowy most',
          tr: { en: 'They built a new bridge.', ru: 'Они построили новый мост.', tr: 'Yeni bir köprü inşa ettiler.' },
        },
      },
    ],
  },
  // 142. naprawiać / naprawić
  {
    slug: 'naprawiac',
    level: 'A2',
    rank: 152,
    tags: ['daily', 'work'],
    tr: { en: 'to repair, to fix', ru: 'чинить, ремонтировать / починить', tr: 'tamir etmek, onarmak' },
    impf: { inf: 'naprawiać', cls: 'a' },
    pf: { inf: 'naprawić', cls: 'i' },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Mechanik naprawia ',
          obj: 'samochód',
          negObj: 'samochodu',
          lemma: 'samochód',
          tr: { en: 'The mechanic is repairing the car.', ru: 'Механик чинит машину.', tr: 'Tamirci arabayı onarıyor.' },
        },
        pfEx: {
          v: 'Naprawiłem ',
          obj: 'rower',
          lemma: 'rower',
          tr: { en: 'I fixed the bike.', ru: 'Я починил велосипед.', tr: 'Bisikleti tamir ettim.' },
        },
      },
    ],
  },
  // 143. psuć / zepsuć
  {
    slug: 'psuc',
    level: 'A2',
    rank: 153,
    tags: ['daily'],
    tr: { en: 'to spoil, to break', ru: 'портить, ломать / сломать', tr: 'bozmak, kırmak' },
    impf: {
      inf: 'psuć',
      pres: ['psuję', 'psujesz', 'psuje', 'psujemy', 'psujecie', 'psują'],
      past: ['psuł', 'psuł', 'psuli'],
      imp2: 'psuj',
    },
    pf: {
      inf: 'zepsuć',
      pres: ['zepsuję', 'zepsujesz', 'zepsuje', 'zepsujemy', 'zepsujecie', 'zepsują'],
      past: ['zepsuł', 'zepsuł', 'zepsuli'],
      imp2: 'zepsuj',
    },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Nie psuj ',
          obj: 'niespodzianki',
          lemma: 'niespodzianka',
          tr: { en: "Don't spoil the surprise.", ru: 'Не порти сюрприз.', tr: 'Sürprizi bozma.' },
        },
        pfEx: {
          v: 'Zepsułem ',
          obj: 'zamek w drzwiach',
          lemma: 'zamek w drzwiach',
          tr: { en: 'I broke the door lock.', ru: 'Я сломал дверной замок.', tr: 'Kapı kilidini bozdum.' },
        },
      },
    ],
  },
  // 144. zostawać / zostać
  {
    slug: 'zostawac',
    level: 'A2',
    rank: 154,
    tags: ['daily', 'work'],
    tr: { en: 'to stay / to become', ru: 'оставаться / остаться (а также: становиться кем-то)', tr: 'kalmak / olmak (meslek)' },
    impf: { inf: 'zostawać', cls: 'awa' },
    pf: {
      inf: 'zostać',
      pres: ['zostanę', 'zostaniesz', 'zostanie', 'zostaniemy', 'zostaniecie', 'zostaną'],
      past: ['został', 'został', 'zostali'],
      imp2: 'zostań',
    },
    gov: [
      {
        case: 'instrumental',
        meaning: { en: 'to become (a profession/role)', ru: 'стать кем-то (профессия)', tr: 'bir meslek sahibi olmak' },
        ex: {
          v: 'Chcę zostać ',
          obj: 'architektem',
          lemma: 'architekt',
          tr: { en: 'I want to become an architect.', ru: 'Я хочу стать архитектором.', tr: 'Mimar olmak istiyorum.' },
        },
      },
      {
        case: 'locative',
        prep: 'w',
        meaning: { en: 'to stay in a place', ru: 'оставаться где-то', tr: 'bir yerde kalmak' },
        ex: {
          v: 'Dziś zostaję ',
          prep: 'w ',
          obj: 'domu',
          lemma: 'dom',
          tr: { en: 'Today I am staying at home.', ru: 'Сегодня я остаюсь дома.', tr: 'Bugün evde kalıyorum.' },
        },
      },
    ],
  },
  // 145. zostawiać / zostawić
  {
    slug: 'zostawiac',
    level: 'A2',
    rank: 155,
    tags: ['daily'],
    tr: { en: 'to leave behind (an object/person)', ru: 'оставлять / оставить (вещь)', tr: 'bırakmak (bir şeyi bir yerde)' },
    impf: { inf: 'zostawiać', cls: 'a' },
    pf: { inf: 'zostawić', cls: 'i' },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Zostawiam ',
          obj: 'klucze',
          negObj: 'kluczy',
          lemma: 'klucze',
          post: ' na stole.',
          tr: { en: 'I leave the keys on the table.', ru: 'Я оставляю ключи на столе.', tr: 'Anahtarları masada bırakıyorum.' },
        },
        pfEx: {
          v: 'Zostawiłem ',
          obj: 'laptop',
          lemma: 'laptop',
          post: ' w biurze.',
          tr: { en: 'I left my laptop at the office.', ru: 'Я оставил ноутбук в офисе.', tr: 'Dizüstü bilgisayarımı ofiste bıraktım.' },
        },
      },
    ],
  },
  // 146. pokazywać / pokazać
  {
    slug: 'pokazywac',
    level: 'A1',
    rank: 156,
    tags: ['daily', 'work'],
    tr: { en: 'to show', ru: 'показывать / показать', tr: 'göstermek' },
    impf: { inf: 'pokazywać', cls: 'iwa' },
    pf: {
      inf: 'pokazać',
      pres: ['pokażę', 'pokażesz', 'pokaże', 'pokażemy', 'pokażecie', 'pokażą'],
      imp2: 'pokaż',
    },
    gov: [
      {
        case: 'dative',
        meaning: { en: 'to show to someone', ru: 'показывать кому-то', tr: 'birine göstermek' },
        ex: {
          v: 'Pokazuję ',
          obj: 'turystom',
          lemma: 'turyści',
          post: ' miasto.',
          tr: { en: 'I am showing the city to tourists.', ru: 'Я показываю туристам город.', tr: 'Turistlere şehri gösteriyorum.' },
        },
        pfEx: {
          v: 'Pokaż ',
          obj: 'mi',
          lemma: 'ja',
          post: ' zdjęcia!',
          tr: { en: 'Show me the photos!', ru: 'Покажи мне фотографии!', tr: 'Bana fotoğrafları göster!' },
        },
      },
    ],
  },
  // 147. opowiadać / opowiedzieć
  {
    slug: 'opowiadac',
    level: 'A2',
    rank: 157,
    tags: ['daily'],
    tr: { en: 'to tell (a story), to narrate', ru: 'рассказывать / рассказать', tr: 'anlatmak (hikâye, olay)' },
    impf: { inf: 'opowiadać', cls: 'a' },
    pf: {
      inf: 'opowiedzieć',
      pres: ['opowiem', 'opowiesz', 'opowie', 'opowiemy', 'opowiecie', 'opowiedzą'],
      past: ['opowiedział', 'opowiedział', 'opowiedzieli'],
      imp2: 'opowiedz',
    },
    gov: [
      {
        case: 'locative',
        prep: 'o',
        ex: {
          v: 'Opowiadam ',
          prep: 'o ',
          obj: 'swojej podróży',
          lemma: 'swoja podróż',
          tr: { en: 'I am telling about my trip.', ru: 'Я рассказываю о своей поездке.', tr: 'Seyahatim hakkında anlatıyorum.' },
        },
      },
    ],
  },
  // 148. przynosić / przynieść
  {
    slug: 'przynosic',
    level: 'A2',
    rank: 158,
    tags: ['daily', 'work'],
    tr: { en: 'to bring (by hand)', ru: 'приносить / принести', tr: 'getirmek (elde)' },
    impf: { inf: 'przynosić', cls: 'i', pres: ['przynoszę', 'przynosisz', 'przynosi', 'przynosimy', 'przynosicie', 'przynoszą'] },
    pf: {
      inf: 'przynieść',
      pres: ['przyniosę', 'przyniesiesz', 'przyniesie', 'przyniesiemy', 'przyniesiecie', 'przyniosą'],
      past: ['przyniosł', 'przyniósł', 'przynieśli'],
      imp2: 'przynieś',
    },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Kelner przynosi ',
          obj: 'menu',
          negObj: 'menu',
          lemma: 'menu',
          tr: { en: 'The waiter brings the menu.', ru: 'Официант приносит меню.', tr: 'Garson menüyü getiriyor.' },
        },
        pfEx: {
          v: 'Przyniosłem ',
          obj: 'ciastka',
          lemma: 'ciastka',
          tr: { en: 'I brought cookies.', ru: 'Я принёс печенье.', tr: 'Kurabiye getirdim.' },
        },
      },
    ],
  },
  // 149. prowadzić / poprowadzić
  {
    slug: 'prowadzic',
    level: 'B1',
    rank: 159,
    tags: ['work', 'travel'],
    tr: { en: 'to drive, to lead, to run (a business)', ru: 'водить (машину), вести (бизнес, переговоры)', tr: 'sürmek (araç), yönetmek (iş, toplantı)' },
    impf: { inf: 'prowadzić', cls: 'i', pres: ['prowadzę', 'prowadzisz', 'prowadzi', 'prowadzimy', 'prowadzicie', 'prowadzą'] },
    pf: { inf: 'poprowadzić', cls: 'i', pres: ['poprowadzę', 'poprowadzisz', 'poprowadzi', 'poprowadzimy', 'poprowadzicie', 'poprowadzą'] },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Prowadzę ',
          obj: 'własną firmę',
          negObj: 'własnej firmy',
          lemma: 'własna firma',
          tr: { en: 'I run my own company.', ru: 'Я веду собственный бизнес (фирму).', tr: 'Kendi şirketimi yönetiyorum.' },
        },
      },
    ],
  },
  // 150. tworzyć / stworzyć
  {
    slug: 'tworzyc',
    level: 'B1',
    rank: 160,
    tags: ['work', 'university'],
    tr: { en: 'to create', ru: 'создавать, творить / создать', tr: 'oluşturmak, yaratmak' },
    impf: { inf: 'tworzyć', cls: 'y' },
    pf: { inf: 'stworzyć', cls: 'y' },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Tworzymy ',
          obj: 'nowoczesny system',
          negObj: 'nowoczesnego systemu',
          lemma: 'nowoczesny system',
          tr: { en: 'We are creating a modern system.', ru: 'Мы создаём современную систему.', tr: 'Modern bir sistem oluşturuyoruz.' },
        },
      },
    ],
  },
  // 151. rozwijać / rozwinąć
  {
    slug: 'rozwijac',
    level: 'B1',
    rank: 161,
    tags: ['work', 'university'],
    tr: { en: 'to develop, to expand', ru: 'развивать / развить', tr: 'geliştirmek' },
    impf: { inf: 'rozwijać', cls: 'a' },
    pf: { inf: 'rozwinąć', cls: 'na' },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Rozwijam ',
          obj: 'swoje umiejętności',
          negObj: 'swoich umiejętności',
          lemma: 'swoje umiejętności',
          tr: { en: 'I am developing my skills.', ru: 'Я развиваю свои навыки.', tr: 'Becerilerimi geliştiriyorum.' },
        },
      },
    ],
  },
  // 152. osiągać / osiągnąć
  {
    slug: 'osiagac',
    level: 'B1',
    rank: 162,
    tags: ['work', 'university'],
    tr: { en: 'to achieve, to reach', ru: 'достигать / достичь', tr: 'ulaşmak, başarmak' },
    impf: { inf: 'osiągać', cls: 'a' },
    pf: { inf: 'osiągnąć', cls: 'na' },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Osiągamy ',
          obj: 'dobre wyniki',
          negObj: 'dobrych wyników',
          lemma: 'dobre wyniki',
          tr: { en: 'We achieve good results.', ru: 'Мы достигаем хороших результатов.', tr: 'İyi sonuçlar elde ediyoruz.' },
        },
        pfEx: {
          v: 'Osiągnąłem ',
          obj: 'swój cel',
          lemma: 'swój cel',
          tr: { en: 'I achieved my goal.', ru: 'Я достиг своей цели.', tr: 'Hedefime ulaştım.' },
        },
      },
    ],
  },
  // 153. proponować / zaproponować
  {
    slug: 'proponowac',
    level: 'A2',
    rank: 163,
    tags: ['work', 'daily'],
    tr: { en: 'to propose, to suggest, to offer', ru: 'предлагать / предложить', tr: 'önermek, teklif etmek' },
    impf: { inf: 'proponować', cls: 'owa' },
    pf: { inf: 'zaproponować', cls: 'owa' },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Proponuję ',
          obj: 'krótką przerwę',
          negObj: 'krótkiej przerwy',
          lemma: 'krótka przerwa',
          tr: { en: 'I suggest a short break.', ru: 'Я предлагаю короткий перерыв.', tr: 'Kısa bir mola öneriyorum.' },
        },
      },
    ],
  },
  // 154. akceptować / zaakceptować
  {
    slug: 'akceptowac',
    level: 'B1',
    rank: 164,
    tags: ['work'],
    tr: { en: 'to accept, to approve', ru: 'принимать, одобрять / принять', tr: 'kabul etmek, onaylamak' },
    impf: { inf: 'akceptować', cls: 'owa' },
    pf: { inf: 'zaakceptować', cls: 'owa' },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Akceptujemy ',
          obj: 'karty płatnicze',
          negObj: 'kart płatniczych',
          lemma: 'karty płatnicze',
          tr: { en: 'We accept payment cards.', ru: 'Мы принимаем платёжные карты.', tr: 'Ödeme kartlarını kabul ediyoruz.' },
        },
      },
    ],
  },
  // 155. podpisywać / podpisać
  {
    slug: 'podpisywac',
    level: 'A2',
    rank: 165,
    tags: ['work'],
    tr: { en: 'to sign', ru: 'подписывать / подписать', tr: 'imzalamak' },
    impf: { inf: 'podpisywać', cls: 'iwa' },
    pf: {
      inf: 'podpisać',
      pres: ['podpiszę', 'podpiszesz', 'podpisze', 'podpiszemy', 'podpiszecie', 'podpiszą'],
      imp2: 'podpisz',
    },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Podpisuję ',
          obj: 'umowę o pracę',
          negObj: 'umowy o pracę',
          lemma: 'umowa o pracę',
          tr: { en: 'I am signing an employment contract.', ru: 'Я подписываю трудовой договор.', tr: 'İş sözleşmesini imzalıyorum.' },
        },
        pfEx: {
          v: 'Podpisałem ',
          obj: 'dokument',
          lemma: 'dokument',
          tr: { en: 'I signed the document.', ru: 'Я подписал документ.', tr: 'Belgeyi imzaladım.' },
        },
      },
    ],
  },
  // 156. rozwiązywać / rozwiązać
  {
    slug: 'rozwiazywac',
    level: 'B1',
    rank: 166,
    tags: ['work', 'university'],
    tr: { en: 'to solve (a problem/test), to terminate (a contract)', ru: 'решать / решить (проблему, тест)', tr: 'çözmek (sorun, test)' },
    impf: { inf: 'rozwiązywać', cls: 'iwa' },
    pf: {
      inf: 'rozwiązać',
      pres: ['rozwiążę', 'rozwiążesz', 'rozwiąże', 'rozwiążemy', 'rozwiążecie', 'rozwiążą'],
      imp2: 'rozwiąż',
    },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Rozwiązujemy ',
          obj: 'trudny problem',
          negObj: 'trudnego problemu',
          lemma: 'trudny problem',
          tr: { en: 'We are solving a difficult problem.', ru: 'Мы решаем сложную проблему.', tr: 'Zor bir sorunu çözüyoruz.' },
        },
        pfEx: {
          v: 'Rozwiązałem ',
          obj: 'test gramatyczny',
          lemma: 'test gramatyczny',
          tr: { en: 'I solved the grammar test.', ru: 'Я решил грамматический тест.', tr: 'Dilbilgisi testini çözdüm.' },
        },
      },
    ],
  },
];
