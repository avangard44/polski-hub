import type { CompactVerbSpec } from './verbBuilder';

export const VERBS_PART_1: CompactVerbSpec[] = [
  // 7. być
  {
    slug: 'byc',
    level: 'A1',
    rank: 1,
    tags: ['daily'],
    tr: { en: 'to be', ru: 'быть', tr: 'olmak' },
    impf: {
      inf: 'być',
      pres: ['jestem', 'jesteś', 'jest', 'jesteśmy', 'jesteście', 'są'],
      past: ['był', 'był', 'byli'],
      imp2: 'bądź',
    },
    gov: [
      {
        case: 'instrumental',
        meaning: { en: 'to be (a profession / role)', ru: 'быть кем-то (профессия, роль)', tr: 'bir meslek / rolde olmak' },
        contrast: {
          en: {
            equivalent: 'be + a noun',
            level: 'mismatch',
            note: 'In Polish, professions and nationalities after "być" take the Instrumental (Narzędnik): Jestem lekarzem (not *Jestem lekarz).',
          },
          ru: {
            equivalent: 'быть + И. п. (в наст. вр.) / Т. п.',
            level: 'partial',
            note: 'В русском в настоящем времени говорят «Я студент» (И. п.), а в польском глагол być не опускается и требует творительного падежа: Jestem studentem!',
          },
          tr: {
            equivalent: 'isim + -im/-sin (ek-fiil)',
            level: 'mismatch',
            note: 'Lehçede meslek ve kimlik bildirirken "być" fiilinden sonra isim Narzędnik hâline girer: Jestem lekarzem (Doktorum).',
          },
        },
        ex: {
          v: 'Jestem ',
          obj: 'studentem',
          lemma: 'student',
          tr: { en: 'I am a student.', ru: 'Я студент.', tr: 'Ben öğrenciyim.' },
        },
      },
    ],
  },
  // 8. mieć
  {
    slug: 'miec',
    level: 'A1',
    rank: 2,
    tags: ['daily'],
    tr: { en: 'to have', ru: 'иметь (у меня есть)', tr: 'sahip olmak (var)' },
    impf: {
      inf: 'mieć',
      pres: ['mam', 'masz', 'ma', 'mamy', 'macie', 'mają'],
      past: ['miał', 'miał', 'mieli'],
      imp2: 'miej',
    },
    gov: [
      {
        case: 'accusative',
        contrast: {
          ru: {
            equivalent: 'у меня есть + И. п. (нет + Р. п.)',
            level: 'mismatch',
            note: 'Вместо русского «У меня есть машина» поляки всегда говорят «Я имею машину» (Mam samochód — Biernik). При отрицании: Nie mam samochodu (Dopełniacz).',
          },
          tr: {
            equivalent: '-im var / -im yok',
            level: 'mismatch',
            note: 'Türkçe "Arabam var" yerine Lehçede "mieć" (sahip olmak) + Biernik kullanılır: Mam samochód. Olumsuzu: Nie mam samochodu (Dopełniacz).',
          },
        },
        ex: {
          v: 'Mam ',
          obj: 'czas',
          negObj: 'czasu',
          lemma: 'czas',
          tr: { en: 'I have time.', ru: 'У меня есть время.', tr: 'Vaktim var.' },
          negTr: { en: "I don't have time.", ru: 'У меня нет времени.', tr: 'Vaktim yok.' },
        },
      },
    ],
  },
  // 9. robić / zrobić
  {
    slug: 'robic',
    level: 'A1',
    rank: 12,
    tags: ['daily', 'work'],
    tr: { en: 'to do, to make', ru: 'делать / сделать', tr: 'yapmak' },
    impf: { inf: 'robić', cls: 'i' },
    pf: { inf: 'zrobić', cls: 'i' },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Robię ',
          obj: 'śniadanie',
          negObj: 'śniadania',
          lemma: 'śniadanie',
          tr: { en: 'I am making breakfast.', ru: 'Я готовлю завтрак.', tr: 'Kahvaltı hazırlıyorum.' },
        },
        pfEx: {
          v: 'Zrobiłem ',
          obj: 'zadanie domowe',
          lemma: 'zadanie domowe',
          tr: { en: 'I did my homework.', ru: 'Я сделал домашнее задание.', tr: 'Ev ödevimi yaptım.' },
        },
      },
    ],
  },
  // 10. mówić / powiedzieć
  {
    slug: 'mowic',
    level: 'A1',
    rank: 15,
    tags: ['daily'],
    tr: { en: 'to speak, to say, to tell', ru: 'говорить / сказать', tr: 'konuşmak, söylemek' },
    impf: { inf: 'mówić', cls: 'i' },
    pf: {
      inf: 'powiedzieć',
      pres: ['powiem', 'powiesz', 'powie', 'powiemy', 'powiecie', 'powiedzą'],
      past: ['powiedział', 'powiedział', 'powiedzieli'],
      imp2: 'powiedz',
    },
    gov: [
      {
        case: 'dative',
        meaning: { en: 'to tell someone', ru: 'говорить / сказать кому-то', tr: 'birine söylemek' },
        ex: {
          v: 'Mówię ',
          obj: 'bratu',
          lemma: 'brat',
          post: ' prawdę.',
          tr: { en: 'I tell my brother the truth.', ru: 'Я говорю брату правду.', tr: 'Kardeşime gerçeği söylüyorum.' },
        },
        pfEx: {
          v: 'Powiem ',
          obj: 'ci',
          lemma: 'ty',
          post: ' wszystko jutro.',
          tr: { en: "I'll tell you everything tomorrow.", ru: 'Я скажу тебе всё завтра.', tr: 'Yarın sana her şeyi söyleyeceğim.' },
        },
      },
      {
        case: 'locative',
        prep: 'o',
        meaning: { en: 'to talk about something', ru: 'говорить о ком-то / чём-то', tr: 'bir şey hakkında konuşmak' },
        ex: {
          v: 'Mówimy ',
          prep: 'o ',
          obj: 'nowym projekcie',
          lemma: 'nowy projekt',
          tr: { en: 'We are talking about the new project.', ru: 'Мы говорим о новом проекте.', tr: 'Yeni proje hakkında konuşuyoruz.' },
        },
      },
    ],
  },
  // 11. wiedzieć / dowiedzieć się
  {
    slug: 'wiedziec',
    level: 'A1',
    rank: 18,
    tags: ['daily'],
    tr: { en: 'to know (a fact) / to find out', ru: 'знать (факт) / узнать', tr: 'bilmek (bilgi) / öğrenmek' },
    impf: {
      inf: 'wiedzieć',
      pres: ['wiem', 'wiesz', 'wie', 'wiemy', 'wiecie', 'wiedzą'],
      past: ['wiedział', 'wiedział', 'wiedzieli'],
      imp2: 'wiedz',
    },
    pf: {
      inf: 'dowiedzieć się',
      pres: ['dowiem', 'dowiesz', 'dowie', 'dowiemy', 'dowiecie', 'dowiedzą'],
      past: ['dowiedział', 'dowiedział', 'dowiedzieli'],
      imp2: 'dowiedz',
    },
    gov: [
      {
        case: 'locative',
        prep: 'o',
        meaning: { en: 'to know about something', ru: 'знать о чём-то', tr: 'bir şeyden haberdar olmak' },
        ex: {
          v: 'Wiem ',
          prep: 'o ',
          obj: 'tym spotkaniu',
          lemma: 'to spotkanie',
          tr: { en: 'I know about this meeting.', ru: 'Я знаю об этой встрече.', tr: 'Bu toplantıdan haberim var.' },
        },
      },
    ],
  },
  // 12. znać / poznać
  {
    slug: 'znac',
    level: 'A1',
    rank: 24,
    tags: ['daily'],
    tr: { en: 'to know (be acquainted with), to meet', ru: 'знать (кого-то/что-то) / познакомиться, узнать', tr: 'tanımak, bilmek / tanışmak' },
    impf: { inf: 'znać', cls: 'a' },
    pf: { inf: 'poznać', cls: 'a' },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Znam ',
          obj: 'dobrą restaurację',
          negObj: 'dobrej restauracji',
          lemma: 'dobra restauracja',
          tr: { en: 'I know a good restaurant.', ru: 'Я знаю хороший ресторан.', tr: 'İyi bir restoran biliyorum.' },
        },
        pfEx: {
          v: 'Poznałem ',
          obj: 'twoją siostrę',
          lemma: 'twoja siostra',
          tr: { en: 'I met your sister.', ru: 'Я познакомился с твоей сестрой.', tr: 'Kız kardeşinle tanıştım.' },
        },
      },
    ],
  },
  // 13. rozumieć / zrozumieć
  {
    slug: 'rozumiec',
    level: 'A1',
    rank: 28,
    tags: ['daily', 'university'],
    tr: { en: 'to understand', ru: 'понимать / понять', tr: 'anlamak' },
    impf: { inf: 'rozumieć', cls: 'em' },
    pf: { inf: 'zrozumieć', cls: 'em' },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Rozumiem ',
          obj: 'to pytanie',
          negObj: 'tego pytania',
          lemma: 'to pytanie',
          tr: { en: 'I understand this question.', ru: 'Я понимаю этот вопрос.', tr: 'Bu soruyu anlıyorum.' },
        },
        pfEx: {
          v: 'W końcu zrozumiałem ',
          obj: 'tę regułę',
          lemma: 'ta reguła',
          tr: { en: 'I finally understood this rule.', ru: 'Я наконец понял это правило.', tr: 'Sonunda bu kuralı anladım.' },
        },
      },
    ],
  },
  // 14. czytać / przeczytać
  {
    slug: 'czytac',
    level: 'A1',
    rank: 35,
    tags: ['daily', 'university'],
    tr: { en: 'to read', ru: 'читать / прочитать', tr: 'okumak' },
    impf: { inf: 'czytać', cls: 'a' },
    pf: { inf: 'przeczytać', cls: 'a' },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Czytam ',
          obj: 'ciekawą książkę',
          negObj: 'ciekawej książki',
          lemma: 'ciekawa książka',
          tr: { en: 'I am reading an interesting book.', ru: 'Я читаю интересную книгу.', tr: 'İlginç bir kitap okuyorum.' },
        },
        pfEx: {
          v: 'Przeczytałam ',
          obj: 'cały artykuł',
          lemma: 'cały artykuł',
          tr: { en: 'I read the whole article.', ru: 'Я прочитала всю статью.', tr: 'Makalenin tamamını okudum.' },
        },
      },
    ],
  },
  // 15. pisać / napisać
  {
    slug: 'pisac',
    level: 'A1',
    rank: 38,
    tags: ['daily', 'university', 'work'],
    tr: { en: 'to write', ru: 'писать / написать', tr: 'yazmak' },
    impf: {
      inf: 'pisać',
      pres: ['piszę', 'piszesz', 'pisze', 'piszemy', 'piszecie', 'piszą'],
      imp2: 'pisz',
    },
    pf: {
      inf: 'napisać',
      pres: ['napiszę', 'napiszesz', 'napisze', 'napiszemy', 'napiszecie', 'napiszą'],
      imp2: 'napisz',
    },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Piszę ',
          obj: 'wiadomość',
          negObj: 'wiadomości',
          lemma: 'wiadomość',
          tr: { en: 'I am writing a message.', ru: 'Я пишу сообщение.', tr: 'Mesaj yazıyorum.' },
        },
        pfEx: {
          v: 'Napisałem ',
          obj: 'raport',
          lemma: 'raport',
          tr: { en: 'I wrote the report.', ru: 'Я написал отчёт.', tr: 'Raporu yazdım.' },
        },
      },
      {
        case: 'genitive',
        prep: 'do',
        meaning: { en: 'to write to someone', ru: 'писать кому-то (досл. «к кому-то»)', tr: 'birine yazmak' },
        ex: {
          v: 'Często piszę ',
          prep: 'do ',
          obj: 'rodziców',
          lemma: 'rodzice',
          tr: { en: 'I often write to my parents.', ru: 'Я часто пишу родителям.', tr: 'Aileme sık sık yazıyorum.' },
        },
      },
    ],
  },
  // 16. słuchać / posłuchać
  {
    slug: 'sluchac',
    level: 'A1',
    rank: 42,
    tags: ['daily'],
    tr: { en: 'to listen (to)', ru: 'слушать / послушать', tr: 'dinlemek' },
    impf: { inf: 'słuchać', cls: 'a' },
    pf: { inf: 'posłuchać', cls: 'a' },
    gov: [
      {
        case: 'genitive',
        contrast: {
          en: {
            equivalent: 'listen to + object',
            level: 'mismatch',
            note: 'No preposition "to" in Polish! The thing or person you listen to goes directly into the Genitive (Dopełniacz): słucham muzyki, słucham podcastu.',
          },
          ru: {
            equivalent: 'слушать + В. п.',
            level: 'mismatch',
            note: 'Ловушка для русскоязычных! В русском «слушать музыку» (В. п.), а в польском ВСЕГДА родительный падеж: słucham muzyki (не *słucham muzykę!).',
          },
          tr: {
            equivalent: 'dinlemek + belirtme (-i) / yalın',
            level: 'mismatch',
            note: 'Türkçede "müzik dinliyorum" denir; Lehçede słuchać fiili her zaman Dopełniacz ister: słucham muzyki.',
          },
        },
        ex: {
          v: 'Słucham ',
          obj: 'polskiej muzyki',
          lemma: 'polska muzyka',
          tr: { en: 'I listen to Polish music.', ru: 'Я слушаю польскую музыку.', tr: 'Lehçe müzik dinliyorum.' },
        },
        pfEx: {
          v: 'Posłuchaj ',
          obj: 'mojej rady',
          lemma: 'moja rada',
          tr: { en: 'Listen to my advice.', ru: 'Послушай моего совета.', tr: 'Tavsiyemi dinle.' },
        },
      },
    ],
  },
  // 17. słyszeć / usłyszeć
  {
    slug: 'slyszec',
    level: 'A1',
    rank: 45,
    tags: ['daily'],
    tr: { en: 'to hear', ru: 'слышать / услышать', tr: 'duymak, işitmek' },
    impf: { inf: 'słyszeć', cls: 'e_y' },
    pf: { inf: 'usłyszeć', cls: 'e_y' },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Słyszę ',
          obj: 'dziwny hałas',
          negObj: 'dziwnego hałasu',
          lemma: 'dziwny hałas',
          tr: { en: 'I hear a strange noise.', ru: 'Я слышу странный шум.', tr: 'Garip bir gürültü duyuyorum.' },
        },
        pfEx: {
          v: 'Usłyszałem ',
          obj: 'dobrą wiadomość',
          lemma: 'dobra wiadomość',
          tr: { en: 'I heard good news.', ru: 'Я услышал хорошую новость.', tr: 'İyi bir haber duydum.' },
        },
      },
    ],
  },
  // 18. oglądać / obejrzeć
  {
    slug: 'ogladac',
    level: 'A1',
    rank: 48,
    tags: ['daily'],
    tr: { en: 'to watch, to view', ru: 'смотреть (фильм, выставку) / посмотреть', tr: 'izlemek, seyretmek' },
    impf: { inf: 'oglądać', cls: 'a' },
    pf: {
      inf: 'obejrzeć',
      pres: ['obejrzę', 'obejrzysz', 'obejrzy', 'obejrzymy', 'obejrzycie', 'obejrzą'],
      past: ['obejrzał', 'obejrzał', 'obejrzeli'],
      imp2: 'obejrzyj',
    },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Oglądamy ',
          obj: 'nowy serial',
          negObj: 'nowego serialu',
          lemma: 'nowy serial',
          tr: { en: 'We are watching a new series.', ru: 'Мы смотрим новый сериал.', tr: 'Yeni bir dizi izliyoruz.' },
        },
        pfEx: {
          v: 'Wczoraj obejrzałem ',
          obj: 'świetny film',
          lemma: 'świetny film',
          tr: { en: 'Yesterday I watched a great movie.', ru: 'Вчера я посмотрел отличный фильм.', tr: 'Dün harika bir film izledim.' },
        },
      },
    ],
  },
  // 19. patrzeć / spojrzeć
  {
    slug: 'patrzec',
    level: 'A1',
    rank: 50,
    tags: ['daily'],
    tr: { en: 'to look (at)', ru: 'смотреть / взглянуть (на)', tr: 'bakmak' },
    impf: { inf: 'patrzeć', cls: 'e_y', imp2: 'patrz' },
    pf: { inf: 'spojrzeć', cls: 'e_y', imp2: 'spójrz' },
    gov: [
      {
        case: 'accusative',
        prep: 'na',
        ex: {
          v: 'Patrzę ',
          prep: 'na ',
          obj: 'obraz',
          lemma: 'obraz',
          tr: { en: 'I am looking at the painting.', ru: 'Я смотрю на картину.', tr: 'Tabloya bakıyorum.' },
        },
        pfEx: {
          v: 'Spójrz ',
          prep: 'na ',
          obj: 'zegarek',
          lemma: 'zegarek',
          tr: { en: 'Look at your watch.', ru: 'Взгляни на часы.', tr: 'Saatine bak.' },
        },
      },
    ],
  },
  // 20. widzieć / zobaczyć
  {
    slug: 'widziec',
    level: 'A1',
    rank: 20,
    tags: ['daily'],
    tr: { en: 'to see', ru: 'видеть / увидеть', tr: 'görmek' },
    impf: { inf: 'widzieć', cls: 'e_i' },
    pf: { inf: 'zobaczyć', cls: 'y' },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Widzę ',
          obj: 'przystanek autobusowy',
          negObj: 'przystanku autobusowego',
          lemma: 'przystanek autobusowy',
          tr: { en: 'I see the bus stop.', ru: 'Я вижу автобусную остановку.', tr: 'Otobüs durağını görüyorum.' },
        },
        pfEx: {
          v: 'Zobaczyłem ',
          obj: 'starego przyjaciela',
          lemma: 'stary przyjaciel',
          tr: { en: 'I saw an old friend.', ru: 'Я увидел старого друга.', tr: 'Eski bir arkadaşımı gördüm.' },
        },
      },
    ],
  },
  // 21. jeść / zjeść
  {
    slug: 'jesc',
    level: 'A1',
    rank: 32,
    tags: ['daily'],
    tr: { en: 'to eat', ru: 'есть (кушать) / съесть', tr: 'yemek yemek' },
    impf: {
      inf: 'jeść',
      pres: ['jem', 'jesz', 'je', 'jemy', 'jecie', 'jedzą'],
      past: ['jadł', 'jadł', 'jedli'],
      imp2: 'jedz',
    },
    pf: {
      inf: 'zjeść',
      pres: ['zjem', 'zjesz', 'zje', 'zjemy', 'zjecie', 'zjedzą'],
      past: ['zjadł', 'zjadł', 'zjedli'],
      imp2: 'zjedz',
    },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Jem ',
          obj: 'zupę pomidorową',
          negObj: 'zupy pomidorowej',
          lemma: 'zupa pomidorowa',
          tr: { en: 'I am eating tomato soup.', ru: 'Я ем томатный суп.', tr: 'Domates çorbası içiyorum.' },
        },
        pfEx: {
          v: 'Zjadłem ',
          obj: 'całą pizzę',
          lemma: 'cała pizza',
          tr: { en: 'I ate the whole pizza.', ru: 'Я съел всю пиццу.', tr: 'Bütün pizzayı yedim.' },
        },
      },
    ],
  },
  // 22. gotować / ugotować
  {
    slug: 'gotowac',
    level: 'A1',
    rank: 65,
    tags: ['daily'],
    tr: { en: 'to cook', ru: 'готовить (еду) / приготовить', tr: 'pişirmek, yemek yapmak' },
    impf: { inf: 'gotować', cls: 'owa' },
    pf: { inf: 'ugotować', cls: 'owa' },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Gotuję ',
          obj: 'obiad',
          negObj: 'obiadu',
          lemma: 'obiad',
          tr: { en: 'I am cooking dinner.', ru: 'Я готовлю обед.', tr: 'Öğle yemeği pişiriyorum.' },
        },
        pfEx: {
          v: 'Ugotowałam ',
          obj: 'barszcz',
          lemma: 'barszcz',
          tr: { en: 'I cooked borscht.', ru: 'Я приготовила борщ.', tr: 'Borş çorbası pişirdim.' },
        },
      },
    ],
  },
  // 23. kupować / kupić
  {
    slug: 'kupowac',
    level: 'A1',
    rank: 40,
    tags: ['daily', 'travel'],
    tr: { en: 'to buy', ru: 'покупать / купить', tr: 'satın almak' },
    impf: { inf: 'kupować', cls: 'owa' },
    pf: { inf: 'kupić', cls: 'i' },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Kupuję ',
          obj: 'bilet miesięczny',
          negObj: 'biletu miesięcznego',
          lemma: 'bilet miesięczny',
          tr: { en: 'I am buying a monthly pass.', ru: 'Я покупаю проездной на месяц.', tr: 'Aylık bilet alıyorum.' },
        },
        pfEx: {
          v: 'Kupiłem ',
          obj: 'nowy telefon',
          lemma: 'nowy telefon',
          tr: { en: 'I bought a new phone.', ru: 'Я купил новый телефон.', tr: 'Yeni bir telefon aldım.' },
        },
      },
    ],
  },
  // 24. sprzedawać / sprzedać
  {
    slug: 'sprzedawac',
    level: 'A2',
    rank: 95,
    tags: ['daily', 'work'],
    tr: { en: 'to sell', ru: 'продавать / продать', tr: 'satmak' },
    impf: { inf: 'sprzedawać', cls: 'awa' },
    pf: {
      inf: 'sprzedać',
      pres: ['sprzedam', 'sprzedasz', 'sprzeda', 'sprzedamy', 'sprzedacie', 'sprzedadzą'],
      imp2: 'sprzedaj',
    },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Sprzedaję ',
          obj: 'stary rower',
          negObj: 'starego roweru',
          lemma: 'stary rower',
          tr: { en: 'I am selling my old bike.', ru: 'Я продаю старый велосипед.', tr: 'Eski bisikletimi satıyorum.' },
        },
        pfEx: {
          v: 'Sprzedaliśmy ',
          obj: 'mieszkanie',
          lemma: 'mieszkanie',
          tr: { en: 'We sold the apartment.', ru: 'Мы продали квартиру.', tr: 'Daireyi sattık.' },
        },
      },
    ],
  },
  // 25. płacić / zapłacić
  {
    slug: 'placic',
    level: 'A1',
    rank: 55,
    tags: ['daily', 'travel'],
    tr: { en: 'to pay', ru: 'платить / заплатить', tr: 'ödemek' },
    impf: { inf: 'płacić', cls: 'i', pres: ['płacę', 'płacisz', 'płaci', 'płacimy', 'płacicie', 'płacą'] },
    pf: { inf: 'zapłacić', cls: 'i', pres: ['zapłacę', 'zapłacisz', 'zapłaci', 'zapłacimy', 'zapłacicie', 'zapłacą'] },
    gov: [
      {
        case: 'accusative',
        prep: 'za',
        meaning: { en: 'to pay for something', ru: 'платить за что-то', tr: 'bir şey için ödeme yapmak' },
        ex: {
          v: 'Płacę ',
          prep: 'za ',
          obj: 'kawę',
          lemma: 'kawa',
          tr: { en: 'I am paying for the coffee.', ru: 'Я плачу за кофе.', tr: 'Kahvenin parasını ödüyorum.' },
        },
        pfEx: {
          v: 'Zapłaciłem ',
          prep: 'za ',
          obj: 'obiad',
          lemma: 'obiad',
          tr: { en: 'I paid for dinner.', ru: 'Я заплатил за обед.', tr: 'Yemeğin hesabını ödedim.' },
        },
      },
      {
        case: 'instrumental',
        meaning: { en: 'to pay by (card / cash)', ru: 'платить чем (картой / наличными)', tr: 'kartla / nakit ödemek' },
        ex: {
          v: 'Zawsze płacę ',
          obj: 'kartą',
          lemma: 'karta',
          tr: { en: 'I always pay by card.', ru: 'Я всегда плачу картой.', tr: 'Her zaman kartla öderim.' },
        },
      },
    ],
  },
  // 26. dawać / dać
  {
    slug: 'dawac',
    level: 'A1',
    rank: 22,
    tags: ['daily'],
    tr: { en: 'to give', ru: 'давать / дать', tr: 'vermek' },
    impf: { inf: 'dawać', cls: 'awa' },
    pf: {
      inf: 'dać',
      pres: ['dam', 'dasz', 'da', 'damy', 'dacie', 'dadzą'],
      imp2: 'daj',
    },
    gov: [
      {
        case: 'dative',
        meaning: { en: 'to give to someone', ru: 'давать кому-то', tr: 'birine vermek' },
        ex: {
          v: 'Daję ',
          obj: 'dziecku',
          lemma: 'dziecko',
          post: ' jabłko.',
          tr: { en: 'I give the child an apple.', ru: 'Я даю ребёнку яблоко.', tr: 'Çocuğa elma veriyorum.' },
        },
        pfEx: {
          v: 'Daj ',
          obj: 'mi',
          lemma: 'ja',
          post: ' chwilę!',
          tr: { en: 'Give me a moment!', ru: 'Дай мне минутку!', tr: 'Bana bir dakika ver!' },
        },
      },
    ],
  },
  // 27. brać / wziąć
  {
    slug: 'brac',
    level: 'A1',
    rank: 26,
    tags: ['daily'],
    tr: { en: 'to take', ru: 'брать / взять', tr: 'almak' },
    impf: {
      inf: 'brać',
      pres: ['biorę', 'bierzesz', 'bierze', 'bierzemy', 'bierzecie', 'biorą'],
      past: ['brał', 'brał', 'brali'],
      imp2: 'bierz',
    },
    pf: {
      inf: 'wziąć',
      pres: ['wezmę', 'weźmiesz', 'weźmie', 'weźmiemy', 'weźmiecie', 'wezmą'],
      past: ['wzięł', 'wziął', 'wzięli'],
      imp2: 'weź',
    },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Biorę ',
          obj: 'parasol',
          negObj: 'parasola',
          lemma: 'parasol',
          tr: { en: 'I am taking an umbrella.', ru: 'Я беру зонт.', tr: 'Şemsiye alıyorum.' },
        },
        pfEx: {
          v: 'Weź ',
          obj: 'kurtkę',
          lemma: 'kurtka',
          tr: { en: 'Take a jacket.', ru: 'Возьми куртку.', tr: 'Ceketini al.' },
        },
      },
    ],
  },
  // 28. chcieć / zechcieć
  {
    slug: 'chciec',
    level: 'A1',
    rank: 8,
    tags: ['daily'],
    tr: { en: 'to want', ru: 'хотеть / захотеть', tr: 'istemek' },
    impf: {
      inf: 'chcieć',
      pres: ['chcę', 'chcesz', 'chce', 'chcemy', 'chcecie', 'chcą'],
      past: ['chciał', 'chciał', 'chcieli'],
      imp2: 'chciej',
    },
    pf: {
      inf: 'zechcieć',
      pres: ['zechcę', 'zechcesz', 'zechce', 'zechcemy', 'zechcecie', 'zechcą'],
      past: ['zechciał', 'zechciał', 'zechcieli'],
      imp2: 'zechciej',
    },
    gov: [
      {
        case: 'genitive',
        meaning: { en: 'to want something (noun)', ru: 'хотеть чего-то', tr: 'bir şey istemek' },
        contrast: {
          en: {
            equivalent: 'want + direct object',
            level: 'mismatch',
            note: 'With nouns, Polish "chcieć" traditionally governs the Genitive (Dopełniacz): chcę spokoju, chcę wody.',
          },
          ru: {
            equivalent: 'хотеть + Р. п. / В. п.',
            level: 'match',
            note: 'Как в русском «хочу воды / хочу покоя» — в польском с существительными используется Dopełniacz: chcę kawy, chcę spokoju.',
          },
          tr: {
            equivalent: 'bir şey istemek',
            level: 'mismatch',
            note: 'İsimlerle kullanıldığında chcieć fiili Dopełniacz alır: chcę kawy (kahve istiyorum).',
          },
        },
        ex: {
          v: 'Chcę ',
          obj: 'świętego spokoju',
          lemma: 'święty spokój',
          tr: { en: 'I want peace and quiet.', ru: 'Я хочу покоя.', tr: 'Huzur istiyorum.' },
        },
      },
    ],
  },
  // 29. móc
  {
    slug: 'moc',
    level: 'A1',
    rank: 6,
    tags: ['daily'],
    tr: { en: 'can, to be able to', ru: 'мочь', tr: '-ebilmek, muktedir olmak' },
    impf: {
      inf: 'móc',
      pres: ['mogę', 'możesz', 'może', 'możemy', 'możecie', 'mogą'],
      past: ['mogł', 'mógł', 'mogli'],
      imp2: 'móż',
    },
    gov: [
      {
        case: 'accusative',
        meaning: { en: 'to be able to do (it) + infinitive', ru: 'мочь (+ инфинитив)', tr: 'yapabilmek (+ mastar)' },
        ex: {
          v: 'Mogę zrobić ',
          obj: 'to zadanie',
          negObj: 'tego zadania',
          lemma: 'to zadanie',
          tr: { en: 'I can do this task.', ru: 'Я могу сделать это задание.', tr: 'Bu görevi yapabilirim.' },
        },
      },
    ],
  },
  // 30. musieć
  {
    slug: 'musiec',
    level: 'A1',
    rank: 9,
    tags: ['daily', 'work'],
    tr: { en: 'must, to have to', ru: 'быть должным (нужно, приходится)', tr: 'zorunda olmak, gerekmek (-meli)' },
    impf: {
      inf: 'musieć',
      pres: ['muszę', 'musisz', 'musi', 'musimy', 'musicie', 'muszą'],
      past: ['musiał', 'musiał', 'musieli'],
      imp2: 'musij',
    },
    gov: [
      {
        case: 'accusative',
        meaning: { en: 'must (+ infinitive + object)', ru: 'должен (+ инфинитив)', tr: 'zorunda olmak (+ mastar)' },
        ex: {
          v: 'Muszę skończyć ',
          obj: 'tę pracę',
          negObj: 'tej pracy',
          lemma: 'ta praca',
          tr: { en: 'I have to finish this work.', ru: 'Я должен закончить эту работу.', tr: 'Bu işi bitirmeliyim.' },
        },
      },
    ],
  },
  // 31. umieć / zrozumieć skill
  {
    slug: 'umiec',
    level: 'A1',
    rank: 52,
    tags: ['daily', 'university'],
    tr: { en: 'to know how to (have a skill)', ru: 'уметь', tr: '-ebilmek (beceri sahibi olmak)' },
    impf: { inf: 'umieć', cls: 'em' },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Umiem prowadzić ',
          obj: 'samochód',
          negObj: 'samochodu',
          lemma: 'samochód',
          tr: { en: 'I know how to drive a car.', ru: 'Я умею водить машину.', tr: 'Araba kullanmayı biliyorum.' },
        },
      },
    ],
  },
  // 32. lubić / polubić
  {
    slug: 'lubic',
    level: 'A1',
    rank: 30,
    tags: ['daily'],
    tr: { en: 'to like', ru: 'любить (нравится) / полюбить', tr: 'sevmek, hoşlanmak' },
    impf: { inf: 'lubić', cls: 'i' },
    pf: { inf: 'polubić', cls: 'i' },
    gov: [
      {
        case: 'accusative',
        contrast: {
          ru: {
            equivalent: 'мне нравится + И. п. / я люблю + В. п.',
            level: 'partial',
            note: 'Для русского «мне нравится кофе» в польском обычно используют активный глагол lubić + Biernik: Lubię kawę (а не *Podoba mi się kawa).',
          },
        },
        ex: {
          v: 'Lubię ',
          obj: 'zieloną herbatę',
          negObj: 'zielonej herbaty',
          lemma: 'zielona herbata',
          tr: { en: 'I like green tea.', ru: 'Я люблю зелёный чай (мне нравится зелёный чай).', tr: 'Yeşil çayı severim.' },
        },
        pfEx: {
          v: 'Od razu polubiłem ',
          obj: 'Kraków',
          lemma: 'Kraków',
          tr: { en: 'I immediately took a liking to Kraków.', ru: 'Мне сразу полюбился Краков.', tr: "Krakow'u hemen sevdim." },
        },
      },
    ],
  },
  // 33. kochać / pokochać
  {
    slug: 'kochac',
    level: 'A1',
    rank: 58,
    tags: ['daily'],
    tr: { en: 'to love', ru: 'любить / полюбить', tr: 'sevmek (aşık olmak)' },
    impf: { inf: 'kochać', cls: 'a' },
    pf: { inf: 'pokochać', cls: 'a' },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Kocham ',
          obj: 'swoją rodzinę',
          negObj: 'swojej rodziny',
          lemma: 'swoja rodzina',
          tr: { en: 'I love my family.', ru: 'Я люблю свою семью.', tr: 'Ailemi seviyorum.' },
        },
      },
    ],
  },
  // 34. iść / pójść
  {
    slug: 'isc',
    level: 'A1',
    rank: 10,
    tags: ['daily', 'travel'],
    tr: { en: 'to go (on foot, right now)', ru: 'идти / пойти (пешком, однонаправленно)', tr: 'gitmek (yürüyerek, şu an)' },
    impf: {
      inf: 'iść',
      pres: ['idę', 'idziesz', 'idzie', 'idziemy', 'idziecie', 'idą'],
      past: ['szł', 'szedł', 'szli'],
      imp2: 'idź',
    },
    pf: {
      inf: 'pójść',
      pres: ['pójdę', 'pójdziesz', 'pójdzie', 'pójdziemy', 'pójdziecie', 'pójdą'],
      past: ['poszł', 'poszedł', 'poszli'],
      imp2: 'pójdź',
    },
    gov: [
      {
        case: 'genitive',
        prep: 'do',
        meaning: { en: 'to go to (an enclosed place / person)', ru: 'идти в / к', tr: 'bir yere / kişiye gitmek' },
        ex: {
          v: 'Idę ',
          prep: 'do ',
          obj: 'sklepu',
          lemma: 'sklep',
          tr: { en: 'I am going to the shop.', ru: 'Я иду в магазин.', tr: 'Markete gidiyorum.' },
        },
        pfEx: {
          v: 'Jutro pójdę ',
          prep: 'do ',
          obj: 'lekarza',
          lemma: 'lekarz',
          tr: { en: 'Tomorrow I will go to the doctor.', ru: 'Завтра я пойду к врачу.', tr: 'Yarın doktora gideceğim.' },
        },
      },
      {
        case: 'accusative',
        prep: 'na',
        meaning: { en: 'to go to (an event / open space)', ru: 'идти на (мероприятие, открытое место)', tr: 'bir etkinliğe / açık yere gitmek' },
        ex: {
          v: 'Idziemy ',
          prep: 'na ',
          obj: 'spacer',
          lemma: 'spacer',
          tr: { en: 'We are going for a walk.', ru: 'Мы идём на прогулку.', tr: 'Yürüyüşe gidiyoruz.' },
        },
      },
    ],
  },
  // 35. chodzić
  {
    slug: 'chodzic',
    level: 'A1',
    rank: 29,
    tags: ['daily', 'travel'],
    tr: { en: 'to walk, to go regularly (on foot)', ru: 'ходить (регулярно, туда-сюда)', tr: 'yürümek, düzenli olarak gitmek' },
    impf: {
      inf: 'chodzić',
      pres: ['chodzę', 'chodzisz', 'chodzi', 'chodzimy', 'chodzicie', 'chodzą'],
      imp2: 'chodź',
    },
    gov: [
      {
        case: 'genitive',
        prep: 'do',
        ex: {
          v: 'Codziennie chodzę ',
          prep: 'do ',
          obj: 'pracy',
          lemma: 'praca',
          post: ' pieszo.',
          tr: { en: 'Every day I walk to work.', ru: 'Каждый день я хожу на работу пешком.', tr: 'Her gün işe yürüyerek gidiyorum.' },
        },
      },
    ],
  },
  // 36. jechać / pojechać
  {
    slug: 'jechac',
    level: 'A1',
    rank: 25,
    tags: ['travel', 'daily'],
    tr: { en: 'to go (by vehicle, right now)', ru: 'ехать / поехать (на транспорте)', tr: 'gitmek (araçla, şu an)' },
    impf: {
      inf: 'jechać',
      pres: ['jadę', 'jedziesz', 'jedzie', 'jedziemy', 'jedziecie', 'jadą'],
      past: ['jechał', 'jechał', 'jechali'],
      imp2: 'jedź',
    },
    pf: {
      inf: 'pojechać',
      pres: ['pojadę', 'pojedziesz', 'pojedzie', 'pojedziemy', 'pojedziecie', 'pojadą'],
      past: ['pojechał', 'pojechał', 'pojechali'],
      imp2: 'pojedź',
    },
    gov: [
      {
        case: 'genitive',
        prep: 'do',
        meaning: { en: 'to travel to (a city/country)', ru: 'ехать в (город, страну)', tr: 'bir şehre / ülkeye gitmek' },
        ex: {
          v: 'Jadę ',
          prep: 'do ',
          obj: 'Warszawy',
          lemma: 'Warszawa',
          tr: { en: 'I am going to Warsaw.', ru: 'Я еду в Варшаву.', tr: "Varşova'ya gidiyorum." },
        },
        pfEx: {
          v: 'Latem pojedziemy ',
          prep: 'do ',
          obj: 'Gdańska',
          lemma: 'Gdańsk',
          tr: { en: 'In summer we will go to Gdańsk.', ru: 'Летом мы поедем в Гданьск.', tr: "Yazın Gdańsk'a gideceğiz." },
        },
      },
      {
        case: 'instrumental',
        meaning: { en: 'to go by (means of transport)', ru: 'ехать на чём-то (вид транспорта)', tr: 'bir araçla gitmek' },
        ex: {
          v: 'Jadę ',
          obj: 'pociągiem',
          lemma: 'pociąg',
          tr: { en: 'I am going by train.', ru: 'Я еду на поезде (поездом).', tr: 'Trenle gidiyorum.' },
        },
      },
    ],
  },
  // 37. jeździć
  {
    slug: 'jezdzic',
    level: 'A1',
    rank: 46,
    tags: ['travel', 'daily'],
    tr: { en: 'to travel regularly (by vehicle), to ride/drive', ru: 'ездить (регулярно)', tr: 'araçla düzenli gitmek, sürmek' },
    impf: {
      inf: 'jeździć',
      pres: ['jeżdżę', 'jeździsz', 'jeździ', 'jeździmy', 'jeździcie', 'jeżdżą'],
      imp2: 'jeździj',
    },
    gov: [
      {
        case: 'instrumental',
        ex: {
          v: 'Do pracy jeżdżę ',
          obj: 'metrem',
          lemma: 'metro',
          tr: { en: 'I commute to work by metro.', ru: 'На работу я езжу на метро.', tr: 'İşe metroyla gidip geliyorum.' },
        },
      },
    ],
  },
  // 38. mieszkać / zamieszkać
  {
    slug: 'mieszkac',
    level: 'A1',
    rank: 34,
    tags: ['daily'],
    tr: { en: 'to live (reside)', ru: 'жить (проживать) / поселиться', tr: 'yaşamak, ikamet etmek' },
    impf: { inf: 'mieszkać', cls: 'a' },
    pf: { inf: 'zamieszkać', cls: 'a' },
    gov: [
      {
        case: 'locative',
        prep: 'w',
        meaning: { en: 'to live in', ru: 'жить в (городе, стране, доме)', tr: 'bir yerde yaşamak (-de/-da)' },
        ex: {
          v: 'Mieszkam ',
          prep: 'w ',
          obj: 'Polsce',
          lemma: 'Polska',
          tr: { en: 'I live in Poland.', ru: 'Я живу в Польше.', tr: "Polonya'da yaşıyorum." },
        },
        pfEx: {
          v: 'Zamieszkaliśmy ',
          prep: 'w ',
          obj: 'nowym domu',
          lemma: 'nowy dom',
          tr: { en: 'We moved into a new house.', ru: 'Мы поселились в новом доме.', tr: 'Yeni bir eve yerleştik.' },
        },
      },
    ],
  },
  // 39. pracować / popracować
  {
    slug: 'pracowac',
    level: 'A1',
    rank: 21,
    tags: ['work', 'daily'],
    tr: { en: 'to work', ru: 'работать / поработать', tr: 'çalışmak' },
    impf: { inf: 'pracować', cls: 'owa' },
    pf: { inf: 'popracować', cls: 'owa' },
    gov: [
      {
        case: 'locative',
        prep: 'w',
        meaning: { en: 'to work at / in', ru: 'работать в (компании, месте)', tr: 'bir yerde çalışmak' },
        ex: {
          v: 'Pracuję ',
          prep: 'w ',
          obj: 'dużej firmie',
          lemma: 'duża firma',
          tr: { en: 'I work at a big company.', ru: 'Я работаю в крупной компании.', tr: 'Büyük bir şirkette çalışıyorum.' },
        },
      },
      {
        case: 'instrumental',
        prep: 'nad',
        meaning: { en: 'to work on (a project)', ru: 'работать над (проектом)', tr: 'bir proje üzerinde çalışmak' },
        ex: {
          v: 'Pracujemy ',
          prep: 'nad ',
          obj: 'nową aplikacją',
          lemma: 'nowa aplikacja',
          tr: { en: 'We are working on a new app.', ru: 'Мы работаем над новым приложением.', tr: 'Yeni bir uygulama üzerinde çalışıyoruz.' },
        },
      },
    ],
  },
  // 40. uczyć się / nauczyć się
  {
    slug: 'uczyc-sie',
    level: 'A1',
    rank: 36,
    tags: ['university', 'daily'],
    tr: { en: 'to learn, to study', ru: 'учиться, учить / выучить', tr: 'öğrenmek, ders çalışmak' },
    impf: { inf: 'uczyć się', cls: 'y' },
    pf: { inf: 'nauczyć się', cls: 'y' },
    gov: [
      {
        case: 'genitive',
        contrast: {
          en: {
            equivalent: 'learn + direct object',
            level: 'mismatch',
            note: 'What you study or learn after "uczyć się" ALWAYS takes the Genitive (Dopełniacz): uczę się polskiego (not *uczę się polski).',
          },
          ru: {
            equivalent: 'учить + В. п. / учиться + Д. п.',
            level: 'mismatch',
            note: 'Важнейшее правило! В русском «учу польский язык» (В. п.), а в польском uczyć się ВСЕГДА требует родительного падежа (Dopełniacz): uczę się języka polskiego!',
          },
          tr: {
            equivalent: 'öğrenmek + nesne',
            level: 'mismatch',
            note: 'uczyć się fiili öğrenilen şey için her zaman Dopełniacz ister: uczę się języka polskiego (Lehçe öğreniyorum).',
          },
        },
        ex: {
          v: 'Uczę się ',
          obj: 'języka polskiego',
          lemma: 'język polski',
          tr: { en: 'I am learning Polish.', ru: 'Я учу польский язык.', tr: 'Lehçe öğreniyorum.' },
        },
        pfEx: {
          v: 'Nauczyłem się ',
          obj: 'nowych słów',
          lemma: 'nowe słowa',
          tr: { en: 'I learned new words.', ru: 'Я выучил новые слова.', tr: 'Yeni kelimeler öğrendim.' },
        },
      },
    ],
  },
  // 41. studiować
  {
    slug: 'studiowac',
    level: 'A1',
    rank: 62,
    tags: ['university'],
    tr: { en: 'to study (at university)', ru: 'учиться в вузе, изучать (специальность)', tr: 'üniversitede okumak' },
    impf: { inf: 'studiować', cls: 'owa' },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Studiuję ',
          obj: 'informatykę',
          negObj: 'informatyki',
          lemma: 'informatyka',
          tr: { en: 'I study computer science.', ru: 'Я изучаю информатику (в университете).', tr: 'Bilgisayar bilimi okuyorum.' },
        },
      },
    ],
  },
  // 42. pytać / zapytać
  {
    slug: 'pytac',
    level: 'A1',
    rank: 49,
    tags: ['daily', 'university'],
    tr: { en: 'to ask (a question)', ru: 'спрашивать / спросить', tr: 'sormak' },
    impf: { inf: 'pytać', cls: 'a' },
    pf: { inf: 'zapytać', cls: 'a' },
    gov: [
      {
        case: 'accusative',
        prep: 'o',
        meaning: { en: 'to ask about something', ru: 'спрашивать о чём-то', tr: 'bir şeyi sormak' },
        ex: {
          v: 'Pytam ',
          prep: 'o ',
          obj: 'drogę',
          lemma: 'droga',
          tr: { en: 'I am asking for directions.', ru: 'Я спрашиваю дорогу.', tr: 'Yolu soruyorum.' },
        },
        pfEx: {
          v: 'Zapytałem profesora ',
          prep: 'o ',
          obj: 'wyniki egzaminu',
          lemma: 'wyniki egzaminu',
          tr: { en: 'I asked the professor about the exam results.', ru: 'Я спросил профессора о результатах экзамена.', tr: 'Profesöre sınav sonuçlarını sordum.' },
        },
      },
    ],
  },
  // 43. odpowiadać / odpowiedzieć
  {
    slug: 'odpowiadac',
    level: 'A1',
    rank: 54,
    tags: ['daily', 'university'],
    tr: { en: 'to answer, to reply', ru: 'отвечать / ответить', tr: 'cevap vermek, yanıtlamak' },
    impf: { inf: 'odpowiadać', cls: 'a' },
    pf: {
      inf: 'odpowiedzieć',
      pres: ['odpowiem', 'odpowiesz', 'odpowie', 'odpowiemy', 'odpowiecie', 'odpowiedzą'],
      past: ['odpowiedział', 'odpowiedział', 'odpowiedzieli'],
      imp2: 'odpowiedz',
    },
    gov: [
      {
        case: 'accusative',
        prep: 'na',
        meaning: { en: 'to answer (a question / message)', ru: 'отвечать на (вопрос / письмо)', tr: 'bir soruyu / mesajı yanıtlamak' },
        ex: {
          v: 'Odpowiadam ',
          prep: 'na ',
          obj: 'pytanie',
          lemma: 'pytanie',
          tr: { en: 'I am answering the question.', ru: 'Я отвечаю на вопрос.', tr: 'Soruyu yanıtlıyorum.' },
        },
        pfEx: {
          v: 'Odpowiedziałem ',
          prep: 'na ',
          obj: 'wszystkie mejle',
          lemma: 'wszystkie mejle',
          tr: { en: 'I replied to all emails.', ru: 'Я ответил на все письма.', tr: 'Tüm e-postaları yanıtladım.' },
        },
      },
      {
        case: 'dative',
        meaning: { en: 'to reply to someone', ru: 'отвечать кому-то', tr: 'birine cevap vermek' },
        ex: {
          v: 'Odpowiadam ',
          obj: 'nauczycielowi',
          lemma: 'nauczyciel',
          tr: { en: 'I answer the teacher.', ru: 'Я отвечаю учителю.', tr: 'Öğretmene cevap veriyorum.' },
        },
      },
    ],
  },
  // 44. prosić / poprosić
  {
    slug: 'prosic',
    level: 'A1',
    rank: 44,
    tags: ['daily', 'travel'],
    tr: { en: 'to ask for, to request', ru: 'просить / попросить', tr: 'rica etmek, istemek' },
    impf: { inf: 'prosić', cls: 'i', pres: ['proszę', 'prosisz', 'prosi', 'prosimy', 'prosicie', 'proszą'] },
    pf: { inf: 'poprosić', cls: 'i', pres: ['poproszę', 'poprosisz', 'poprosi', 'poprosimy', 'poprosicie', 'poproszą'] },
    gov: [
      {
        case: 'accusative',
        prep: 'o',
        meaning: { en: 'to ask for something', ru: 'просить о чём-то / просить что-то', tr: 'bir şey rica etmek' },
        ex: {
          v: 'Proszę ',
          prep: 'o ',
          obj: 'pomoc',
          lemma: 'pomoc',
          tr: { en: 'I am asking for help.', ru: 'Я прошу о помощи.', tr: 'Yardım rica ediyorum.' },
        },
        pfEx: {
          v: 'Poproszę ',
          prep: 'o ',
          obj: 'rachunek',
          lemma: 'rachunek',
          tr: { en: 'The bill, please.', ru: 'Попрошу счёт, пожалуйста.', tr: 'Hesabı rica edeyim.' },
        },
      },
    ],
  },
  // 45. dziękować / podziękować
  {
    slug: 'dziekowac',
    level: 'A1',
    rank: 47,
    tags: ['daily'],
    tr: { en: 'to thank', ru: 'благодарить / поблагодарить', tr: 'teşekkür etmek' },
    impf: { inf: 'dziękować', cls: 'owa' },
    pf: { inf: 'podziękować', cls: 'owa' },
    gov: [
      {
        case: 'dative',
        meaning: { en: 'to thank someone', ru: 'благодарить кого-то (кому?)', tr: 'birine teşekkür etmek' },
        contrast: {
          en: {
            equivalent: 'thank + direct object',
            level: 'mismatch',
            note: 'In Polish you give thanks TO someone (Dative / Celownik): dziękuję ci, dziękuję pani.',
          },
          ru: {
            equivalent: 'благодарить + В. п.',
            level: 'mismatch',
            note: 'В русском «благодарю тебя» (В. п.), а в польском dziękować требует дательного падежа (Celownik — komu?): dziękuję ci (тебе), dziękuję panu!',
          },
          tr: {
            equivalent: 'birine (-e) teşekkür etmek',
            level: 'match',
            note: 'Türkçedeki gibi yönelme hâli (Celownik) alır: dziękuję ci = sana teşekkür ederim.',
          },
        },
        ex: {
          v: 'Dziękuję ',
          obj: 'ci',
          lemma: 'ty',
          post: ' za pomoc.',
          tr: { en: 'Thank you for your help.', ru: 'Спасибо тебе за помощь.', tr: 'Yardımın için sana teşekkür ederim.' },
        },
      },
      {
        case: 'accusative',
        prep: 'za',
        meaning: { en: 'to thank for something', ru: 'благодарить за что-то', tr: 'bir şey için teşekkür etmek' },
        ex: {
          v: 'Dziękuję ',
          prep: 'za ',
          obj: 'prezent',
          lemma: 'prezent',
          tr: { en: 'Thank you for the gift.', ru: 'Спасибо за подарок.', tr: 'Hediye için teşekkür ederim.' },
        },
      },
    ],
  },
  // 46. przepraszać / przeprosić
  {
    slug: 'przepraszac',
    level: 'A1',
    rank: 59,
    tags: ['daily'],
    tr: { en: 'to apologize, to excuse oneself', ru: 'извиняться / извиниться (перед кем-то)', tr: 'özür dilemek' },
    impf: { inf: 'przepraszać', cls: 'a' },
    pf: { inf: 'przeprosić', cls: 'i', pres: ['przeproszę', 'przeprosisz', 'przeprosi', 'przeprosimy', 'przeprosicie', 'przeproszą'] },
    gov: [
      {
        case: 'accusative',
        meaning: { en: 'to apologize to someone', ru: 'извиняться перед кем-то (в польском — В. п. без предлога!)', tr: 'birinden özür dilemek' },
        contrast: {
          ru: {
            equivalent: 'извиняться перед + Т. п.',
            level: 'mismatch',
            note: 'В польском глагол не возвратный и требует прямого винительного падежа (Biernik): przepraszam cię = извиняюсь перед тобой.',
          },
          tr: {
            equivalent: 'birinden (-den) özür dilemek',
            level: 'mismatch',
            note: 'Türkçede "-den özür dilemek" denir; Lehçede ise doğrudan Biernik kullanılır: przepraszam cię (senden özür dilerim).',
          },
        },
        ex: {
          v: 'Przepraszam ',
          obj: 'cię',
          negObj: 'cię',
          lemma: 'ty',
          post: ' za spóźnienie.',
          tr: { en: 'I apologize to you for being late.', ru: 'Извини меня за опоздание.', tr: 'Geciktiğim için senden özür dilerim.' },
        },
      },
    ],
  },
  // 47. myśleć / pomyśleć
  {
    slug: 'myslec',
    level: 'A1',
    rank: 31,
    tags: ['daily'],
    tr: { en: 'to think', ru: 'думать / подумать', tr: 'düşünmek' },
    impf: { inf: 'myśleć', cls: 'e_i' },
    pf: { inf: 'pomyśleć', cls: 'e_i' },
    gov: [
      {
        case: 'locative',
        prep: 'o',
        ex: {
          v: 'Myślę ',
          prep: 'o ',
          obj: 'wakacjach',
          lemma: 'wakacje',
          tr: { en: 'I am thinking about the holidays.', ru: 'Я думаю об отпуске (каникулах).', tr: 'Tatil hakkında düşünüyorum.' },
        },
        pfEx: {
          v: 'Pomyślę ',
          prep: 'o ',
          obj: 'twojej propozycji',
          lemma: 'twoja propozycja',
          tr: { en: 'I will think about your offer.', ru: 'Я подумаю о твоём предложении.', tr: 'Teklifin hakkında düşüneceğim.' },
        },
      },
    ],
  },
  // 48. pamiętać / zapamiętać
  {
    slug: 'pamietac',
    level: 'A1',
    rank: 51,
    tags: ['daily', 'university'],
    tr: { en: 'to remember / to memorize', ru: 'помнить / запомнить', tr: 'hatırlamak / ezberlemek, aklında tutmak' },
    impf: { inf: 'pamiętać', cls: 'a' },
    pf: { inf: 'zapamiętać', cls: 'a' },
    gov: [
      {
        case: 'locative',
        prep: 'o',
        meaning: { en: 'to remember (keep in mind)', ru: 'помнить о чём-то', tr: 'bir şeyi unutmamak, hatırlamak' },
        ex: {
          v: 'Pamiętam ',
          prep: 'o ',
          obj: 'twoich urodzinach',
          lemma: 'twoje urodziny',
          tr: { en: 'I remember your birthday.', ru: 'Я помню о твоём дне рождения.', tr: 'Doğum gününü hatırlıyorum.' },
        },
      },
      {
        case: 'accusative',
        meaning: { en: 'to remember / memorize a fact or person', ru: 'помнить / запомнить кого-то или что-то', tr: 'birini veya bir şeyi hatırlamak' },
        ex: {
          v: 'Pamiętam ',
          obj: 'ten dzień',
          negObj: 'tego dnia',
          lemma: 'ten dzień',
          tr: { en: 'I remember that day.', ru: 'Я помню тот день.', tr: 'O günü hatırlıyorum.' },
        },
        pfEx: {
          v: 'Zapamiętaj ',
          obj: 'ten numer',
          lemma: 'ten numer',
          tr: { en: 'Memorize this number.', ru: 'Запомни этот номер.', tr: 'Bu numarayı aklında tut.' },
        },
      },
    ],
  },
  // 49. zapominać / zapomnieć
  {
    slug: 'zapominac',
    level: 'A1',
    rank: 60,
    tags: ['daily'],
    tr: { en: 'to forget', ru: 'забывать / забыть', tr: 'unutmak' },
    impf: { inf: 'zapominać', cls: 'a' },
    pf: {
      inf: 'zapomnieć',
      pres: ['zapomnę', 'zapomnisz', 'zapomni', 'zapomnimy', 'zapomnicie', 'zapomną'],
      past: ['zapomniał', 'zapomniał', 'zapomnieli'],
      imp2: 'zapomnij',
    },
    gov: [
      {
        case: 'genitive',
        meaning: { en: 'to forget something (e.g. password, word)', ru: 'забыть что-то (слово, пароль, зонт)', tr: 'bir şeyi unutmak' },
        contrast: {
          ru: {
            equivalent: 'забыть + В. п.',
            level: 'partial',
            note: 'В польском zapomnieć часто требует родительного падежа (Dopełniacz): zapomniałem hasła, zapomniałem parasola.',
          },
        },
        ex: {
          v: 'Często zapominam ',
          obj: 'hasła',
          lemma: 'hasło',
          tr: { en: 'I often forget my password.', ru: 'Я часто забываю пароль.', tr: 'Şifremi sık sık unutuyorum.' },
        },
        pfEx: {
          v: 'Zapomniałem ',
          obj: 'parasola',
          lemma: 'parasol',
          tr: { en: 'I forgot my umbrella.', ru: 'Я забыл зонт.', tr: 'Şemsiyemi unuttum.' },
        },
      },
      {
        case: 'locative',
        prep: 'o',
        meaning: { en: 'to forget about someone / something', ru: 'забыть о ком-то / чём-то', tr: 'bir şeyi / birini unutmak' },
        ex: {
          v: 'Nie zapomnij ',
          prep: 'o ',
          obj: 'spotkaniu',
          lemma: 'spotkanie',
          tr: { en: "Don't forget about the meeting.", ru: 'Не забудь о встрече.', tr: 'Toplantıyı unutma.' },
        },
      },
    ],
  },
  // 50. rozmawiać / porozmawiać
  {
    slug: 'rozmawiac',
    level: 'A1',
    rank: 43,
    tags: ['daily', 'work'],
    tr: { en: 'to talk, to converse', ru: 'разговаривать / поговорить', tr: 'sohbet etmek, konuşmak' },
    impf: { inf: 'rozmawiać', cls: 'a' },
    pf: { inf: 'porozmawiać', cls: 'a' },
    gov: [
      {
        case: 'instrumental',
        prep: 'z',
        meaning: { en: 'to talk with someone', ru: 'разговаривать с кем-то', tr: 'biriyle konuşmak' },
        ex: {
          v: 'Rozmawiam ',
          prep: 'z ',
          obj: 'szefem',
          lemma: 'szef',
          tr: { en: 'I am talking with my boss.', ru: 'Я разговариваю с начальником.', tr: 'Patronla konuşuyorum.' },
        },
        pfEx: {
          v: 'Musimy porozmawiać ',
          prep: 'z ',
          obj: 'nauczycielem',
          lemma: 'nauczyciel',
          tr: { en: 'We need to talk with the teacher.', ru: 'Нам нужно поговорить с учителем.', tr: 'Öğretmenle konuşmamız lazım.' },
        },
      },
    ],
  },
  // 51. dzwonić / zadzwonić
  {
    slug: 'dzwonic',
    level: 'A1',
    rank: 56,
    tags: ['daily', 'work'],
    tr: { en: 'to call (by phone), to ring', ru: 'звонить / позвонить', tr: 'telefon etmek, aramak' },
    impf: { inf: 'dzwonić', cls: 'i' },
    pf: { inf: 'zadzwonić', cls: 'i' },
    gov: [
      {
        case: 'genitive',
        prep: 'do',
        contrast: {
          en: {
            equivalent: 'call + direct object',
            level: 'mismatch',
            note: 'In Polish you call TO someone: dzwonić do + Genitive (Dopełniacz): dzwonię do mamy.',
          },
          ru: {
            equivalent: 'звонить + Д. п. (кому?)',
            level: 'mismatch',
            note: 'Частая ошибка! В русском «звоню маме» (Д. п.), а в польском — dzwonić DO + родительный падеж: dzwonię do mamy (не *dzwonię mamie!).',
          },
          tr: {
            equivalent: 'birini (-i) aramak',
            level: 'mismatch',
            note: 'Türkçede "annemi arıyorum" (-i hâli) denir; Lehçede ise "do + Dopełniacz" kullanılır: dzwonię do mamy.',
          },
        },
        ex: {
          v: 'Dzwonię ',
          prep: 'do ',
          obj: 'mamy',
          lemma: 'mama',
          tr: { en: 'I am calling my mom.', ru: 'Я звоню маме.', tr: 'Annemi arıyorum.' },
        },
        pfEx: {
          v: 'Zadzwonię ',
          prep: 'do ',
          obj: 'ciebie',
          lemma: 'ty',
          post: ' wieczorem.',
          tr: { en: "I'll call you in the evening.", ru: 'Я позвоню тебе вечером.', tr: 'Akşam seni arayacağım.' },
        },
      },
    ],
  },
  // 52. spotykać / spotkać
  {
    slug: 'spotykac',
    level: 'A1',
    rank: 57,
    tags: ['daily'],
    tr: { en: 'to meet (encounter)', ru: 'встречать / встретить', tr: 'karşılaşmak, buluşmak' },
    impf: { inf: 'spotykać', cls: 'a' },
    pf: { inf: 'spotkać', cls: 'a' },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Często spotykam ',
          obj: 'sąsiada',
          negObj: 'sąsiada',
          lemma: 'sąsiad',
          tr: { en: 'I often meet my neighbor.', ru: 'Я часто встречаю соседа.', tr: 'Komşumla sık sık karşılaşıyorum.' },
        },
        pfEx: {
          v: 'Wczoraj spotkałem ',
          obj: 'kolegę',
          lemma: 'kolega',
          tr: { en: 'Yesterday I met a colleague.', ru: 'Вчера я встретил коллегу.', tr: 'Dün bir iş arkadaşımla karşılaştım.' },
        },
      },
    ],
  },
  // 53. spotykać się / spotkać się
  {
    slug: 'spotykac-sie',
    level: 'A1',
    rank: 61,
    tags: ['daily'],
    tr: { en: 'to meet up (with someone)', ru: 'встречаться / встретиться (с кем-то)', tr: 'biriyle buluşmak' },
    impf: { inf: 'spotykać się', cls: 'a' },
    pf: { inf: 'spotkać się', cls: 'a' },
    gov: [
      {
        case: 'instrumental',
        prep: 'z',
        ex: {
          v: 'W piątek spotykam się ',
          prep: 'z ',
          obj: 'przyjaciółmi',
          lemma: 'przyjaciele',
          tr: { en: 'On Friday I am meeting up with friends.', ru: 'В пятницу я встречаюсь с друзьями.', tr: 'Cuma günü arkadaşlarımla buluşuyorum.' },
        },
      },
    ],
  },
  // 54. używać / użyć
  {
    slug: 'uzywac',
    level: 'A2',
    rank: 64,
    tags: ['daily', 'work'],
    tr: { en: 'to use', ru: 'использовать, пользоваться / воспользоваться', tr: 'kullanmak' },
    impf: { inf: 'używać', cls: 'a' },
    pf: {
      inf: 'użyć',
      pres: ['użyję', 'użyjesz', 'użyje', 'użyjemy', 'użyjecie', 'użyją'],
      past: ['użył', 'użył', 'użyli'],
      imp2: 'użyj',
    },
    gov: [
      {
        case: 'genitive',
        contrast: {
          en: {
            equivalent: 'use + direct object',
            level: 'mismatch',
            note: 'Polish "używać" ALWAYS requires the Genitive (Dopełniacz): używam telefonu, używam słownika.',
          },
          ru: {
            equivalent: 'использовать + В. п. / пользоваться + Т. п.',
            level: 'mismatch',
            note: 'Внимание! Глагол używać требует родительного падежа (Dopełniacz): używam słownika (не *używam słownik и не *słownikiem!).',
          },
          tr: {
            equivalent: 'kullanmak + nesne',
            level: 'mismatch',
            note: 'używać fiili her zaman Dopełniacz ister: używam słownika (sözlük kullanıyorum).',
          },
        },
        ex: {
          v: 'Codziennie używam ',
          obj: 'słownika',
          lemma: 'słownik',
          tr: { en: 'I use a dictionary every day.', ru: 'Я каждый день пользуюсь словарём.', tr: 'Her gün sözlük kullanıyorum.' },
        },
        pfEx: {
          v: 'Użyj ',
          obj: 'innego hasła',
          lemma: 'inne hasło',
          tr: { en: 'Use a different password.', ru: 'Используй другой пароль.', tr: 'Başka bir şifre kullan.' },
        },
      },
    ],
  },
  // 55. potrzebować
  {
    slug: 'potrzebowac',
    level: 'A1',
    rank: 53,
    tags: ['daily', 'work'],
    tr: { en: 'to need', ru: 'нуждаться в чём-то (мне нужно)', tr: 'ihtiyaç duymak' },
    impf: { inf: 'potrzebować', cls: 'owa' },
    gov: [
      {
        case: 'genitive',
        contrast: {
          en: {
            equivalent: 'need + direct object',
            level: 'mismatch',
            note: 'In Polish, "potrzebować" governs the Genitive (Dopełniacz): potrzebuję pomocy, potrzebuję czasu.',
          },
          ru: {
            equivalent: 'мне нужен + И. п. / нуждаться в + П. п.',
            level: 'mismatch',
            note: 'Вместо «мне нужна помощь» поляки говорят «Я нуждаюсь помощи» с родительным падежом (Dopełniacz): potrzebuję pomocy, potrzebuję czasu.',
          },
          tr: {
            equivalent: '-e ihtiyacım var',
            level: 'mismatch',
            note: 'Lehçede potrzebować fiili doğrudan Dopełniacz alır: potrzebuję pomocy (yardıma ihtiyacım var).',
          },
        },
        ex: {
          v: 'Potrzebuję ',
          obj: 'twojej pomocy',
          lemma: 'twoja pomoc',
          tr: { en: 'I need your help.', ru: 'Мне нужна твоя помощь.', tr: 'Senin yardımına ihtiyacım var.' },
        },
      },
    ],
  },
];
