import type { CompactVerbSpec } from './verbBuilder';

export const VERBS_PART_2: CompactVerbSpec[] = [
  // 56. zaczynać / zacząć
  {
    slug: 'zaczynac',
    level: 'A1',
    rank: 63,
    tags: ['daily', 'work'],
    tr: { en: 'to begin, to start', ru: 'начинать / начать', tr: 'başlamak' },
    impf: { inf: 'zaczynać', cls: 'a' },
    pf: {
      inf: 'zacząć',
      pres: ['zacznę', 'zaczniesz', 'zacznie', 'zaczniemy', 'zaczniecie', 'zaczną'],
      past: ['zaczęł', 'zaczął', 'zaczęli'],
      imp2: 'zacznij',
    },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Zaczynam ',
          obj: 'nową pracę',
          negObj: 'nowej pracy',
          lemma: 'nowa praca',
          tr: { en: 'I am starting a new job.', ru: 'Я начинаю новую работу.', tr: 'Yeni bir işe başlıyorum.' },
        },
        pfEx: {
          v: 'Zacząłem ',
          obj: 'kurs polskiego',
          lemma: 'kurs polskiego',
          tr: { en: 'I started a Polish course.', ru: 'Я начал курс польского.', tr: 'Lehçe kursuna başladım.' },
        },
      },
      {
        case: 'genitive',
        prep: 'od',
        meaning: { en: 'to start with / from something', ru: 'начинать с чего-то', tr: 'bir şeyden başlamak' },
        ex: {
          v: 'Zaczynamy dzień ',
          prep: 'od ',
          obj: 'kawy',
          lemma: 'kawa',
          tr: { en: 'We start the day with coffee.', ru: 'Мы начинаем день с кофе.', tr: 'Güne kahveyle (kahveden) başlıyoruz.' },
        },
      },
    ],
  },
  // 57. kończyć / skończyć
  {
    slug: 'konczyc',
    level: 'A1',
    rank: 66,
    tags: ['daily', 'work', 'university'],
    tr: { en: 'to finish, to end, to graduate', ru: 'заканчивать / закончить', tr: 'bitirmek, mezun olmak' },
    impf: { inf: 'kończyć', cls: 'y' },
    pf: { inf: 'skończyć', cls: 'y' },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Kończę ',
          obj: 'pracę',
          negObj: 'pracy',
          lemma: 'praca',
          post: ' o piątej.',
          tr: { en: 'I finish work at five.', ru: 'Я заканчиваю работу в пять.', tr: 'İşi beşte bitiriyorum.' },
        },
        pfEx: {
          v: 'Skończyłam ',
          obj: 'uniwersytet',
          lemma: 'uniwersytet',
          tr: { en: 'I graduated from university.', ru: 'Я окончила университет.', tr: 'Üniversiteden mezun oldum.' },
        },
      },
    ],
  },
  // 58. otwierać / otworzyć
  {
    slug: 'otwierac',
    level: 'A1',
    rank: 67,
    tags: ['daily'],
    tr: { en: 'to open', ru: 'открывать / открыть', tr: 'açmak' },
    impf: { inf: 'otwierać', cls: 'a' },
    pf: {
      inf: 'otworzyć',
      pres: ['otworzę', 'otworzysz', 'otworzy', 'otworzymy', 'otworzycie', 'otworzą'],
      imp2: 'otwórz',
    },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Otwieram ',
          obj: 'okno',
          negObj: 'okna',
          lemma: 'okno',
          tr: { en: 'I am opening the window.', ru: 'Я открываю окно.', tr: 'Pencereyi açıyorum.' },
        },
        pfEx: {
          v: 'Otwórz ',
          obj: 'drzwi',
          lemma: 'drzwi',
          tr: { en: 'Open the door.', ru: 'Открой дверь.', tr: 'Kapıyı aç.' },
        },
      },
    ],
  },
  // 59. zamykać / zamknąć
  {
    slug: 'zamykac',
    level: 'A1',
    rank: 68,
    tags: ['daily'],
    tr: { en: 'to close, to shut', ru: 'закрывать / закрыть', tr: 'kapatmak' },
    impf: { inf: 'zamykać', cls: 'a' },
    pf: { inf: 'zamknąć', cls: 'na' },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Zamykam ',
          obj: 'sklep',
          negObj: 'sklepu',
          lemma: 'sklep',
          post: ' wieczorem.',
          tr: { en: 'I close the shop in the evening.', ru: 'Я закрываю магазин вечером.', tr: 'Akşam dükkânı kapatıyorum.' },
        },
        pfEx: {
          v: 'Zamknij ',
          obj: 'książkę',
          lemma: 'książka',
          tr: { en: 'Close the book.', ru: 'Закрой книгу.', tr: 'Kitabı kapat.' },
        },
      },
    ],
  },
  // 60. włączać / włączyć
  {
    slug: 'wlaczac',
    level: 'A2',
    rank: 69,
    tags: ['daily'],
    tr: { en: 'to turn on, to switch on', ru: 'включать / включить', tr: 'açmak (cihaz, ışık)' },
    impf: { inf: 'włączać', cls: 'a' },
    pf: { inf: 'włączyć', cls: 'y' },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Włączam ',
          obj: 'komputer',
          negObj: 'komputera',
          lemma: 'komputer',
          tr: { en: 'I am turning on the computer.', ru: 'Я включаю компьютер.', tr: 'Bilgisayarı açıyorum.' },
        },
        pfEx: {
          v: 'Włącz ',
          obj: 'światło',
          lemma: 'światło',
          tr: { en: 'Turn on the light.', ru: 'Включи свет.', tr: 'Işığı aç.' },
        },
      },
    ],
  },
  // 61. wyłączać / wyłączyć
  {
    slug: 'wylaczac',
    level: 'A2',
    rank: 70,
    tags: ['daily'],
    tr: { en: 'to turn off, to switch off', ru: 'выключать / выключить', tr: 'kapatmak (cihaz, ışık)' },
    impf: { inf: 'wyłączać', cls: 'a' },
    pf: { inf: 'wyłączyć', cls: 'y' },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Wyłączam ',
          obj: 'telewizor',
          negObj: 'telewizora',
          lemma: 'telewizor',
          tr: { en: 'I am turning off the TV.', ru: 'Я выключаю телевизор.', tr: 'Televizyonu kapatıyorum.' },
        },
        pfEx: {
          v: 'Wyłącz ',
          obj: 'budzik',
          lemma: 'budzik',
          tr: { en: 'Turn off the alarm.', ru: 'Выключи будильник.', tr: 'Alarmı kapat.' },
        },
      },
    ],
  },
  // 62. wstawać / wstać
  {
    slug: 'wstawac',
    level: 'A1',
    rank: 71,
    tags: ['daily'],
    tr: { en: 'to get up, to stand up', ru: 'вставать / встать', tr: 'kalkmak, ayağa kalkmak' },
    impf: { inf: 'wstawać', cls: 'awa' },
    pf: {
      inf: 'wstać',
      pres: ['wstanę', 'wstaniesz', 'wstanie', 'wstaniemy', 'wstaniecie', 'wstaną'],
      past: ['wstał', 'wstał', 'wstali'],
      imp2: 'wstań',
    },
    gov: [
      {
        case: 'genitive',
        prep: 'z',
        meaning: { en: 'to get up from (bed / chair)', ru: 'вставать с (кровати, кресла)', tr: 'yataktan / koltuktan kalkmak' },
        ex: {
          v: 'Rano wstaję ',
          prep: 'z ',
          obj: 'łóżka',
          lemma: 'łóżko',
          post: ' o siódmej.',
          tr: { en: 'In the morning I get out of bed at seven.', ru: 'Утром я встаю с кровати в семь.', tr: 'Sabah yedide yataktan kalkıyorum.' },
        },
      },
    ],
  },
  // 63. spać / pospać
  {
    slug: 'spac',
    level: 'A1',
    rank: 72,
    tags: ['daily'],
    tr: { en: 'to sleep', ru: 'спать / поспать', tr: 'uyumak' },
    impf: {
      inf: 'spać',
      pres: ['śpię', 'śpisz', 'śpi', 'śpimy', 'śpicie', 'śpią'],
      past: ['spał', 'spał', 'spali'],
      imp2: 'śpij',
    },
    pf: {
      inf: 'pospać',
      pres: ['pośpię', 'pośpisz', 'pośpi', 'pośpimy', 'pośpicie', 'pośpią'],
      past: ['pospał', 'pospał', 'pospali'],
      imp2: 'pośpij',
    },
    gov: [
      {
        case: 'locative',
        prep: 'w',
        meaning: { en: 'to sleep in', ru: 'спать в', tr: 'bir yerde uyumak' },
        ex: {
          v: 'Dziecko śpi ',
          prep: 'w ',
          obj: 'swoim pokoju',
          lemma: 'swój pokój',
          tr: { en: 'The child is sleeping in their room.', ru: 'Ребёнок спит в своей комнате.', tr: 'Çocuk kendi odasında uyuyor.' },
        },
      },
    ],
  },
  // 64. budzić się / obudzić się
  {
    slug: 'budzic-sie',
    level: 'A1',
    rank: 73,
    tags: ['daily'],
    tr: { en: 'to wake up', ru: 'просыпаться / проснуться', tr: 'uyanmak' },
    impf: { inf: 'budzić się', cls: 'i', pres: ['budzę', 'budzisz', 'budzi', 'budzimy', 'budzicie', 'budzą'] },
    pf: { inf: 'obudzić się', cls: 'i', pres: ['obudzę', 'obudzisz', 'obudzi', 'obudzimy', 'obudzicie', 'obudzą'] },
    gov: [
      {
        case: 'locative',
        prep: 'o',
        meaning: { en: 'to wake up at (an hour)', ru: 'просыпаться в (котором часу)', tr: 'saat ...-de uyanmak' },
        ex: {
          v: 'Zwykle budzę się ',
          prep: 'o ',
          obj: 'szóstej rano',
          lemma: 'szósta rano',
          tr: { en: 'I usually wake up at six in the morning.', ru: 'Обычно я просыпаюсь в шесть утра.', tr: 'Genelde sabah altıda uyanırım.' },
        },
      },
    ],
  },
  // 65. myć / umyć
  {
    slug: 'myc',
    level: 'A1',
    rank: 74,
    tags: ['daily'],
    tr: { en: 'to wash', ru: 'мыть / помыть', tr: 'yıkamak' },
    impf: {
      inf: 'myć',
      pres: ['myję', 'myjesz', 'myje', 'myjemy', 'myjecie', 'myją'],
      past: ['mył', 'mył', 'myli'],
      imp2: 'myj',
    },
    pf: {
      inf: 'umyć',
      pres: ['umyję', 'umyjesz', 'umyje', 'umyjemy', 'umyjecie', 'umyją'],
      past: ['umył', 'umył', 'umyli'],
      imp2: 'umyj',
    },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Myję ',
          obj: 'ręce',
          negObj: 'rąk',
          lemma: 'ręce',
          tr: { en: 'I am washing my hands.', ru: 'Я мою руки.', tr: 'Ellerimi yıkıyorum.' },
        },
        pfEx: {
          v: 'Umyłem ',
          obj: 'naczynia',
          lemma: 'naczynia',
          tr: { en: 'I washed the dishes.', ru: 'Я помыл посуду.', tr: 'Bulaşıkları yıkadım.' },
        },
      },
    ],
  },
  // 66. sprzątać / posprzątać
  {
    slug: 'sprzatac',
    level: 'A1',
    rank: 75,
    tags: ['daily'],
    tr: { en: 'to clean, to tidy up', ru: 'убирать / убрать (в комнате)', tr: 'temizlemek, toplamak' },
    impf: { inf: 'sprzątać', cls: 'a' },
    pf: { inf: 'posprzątać', cls: 'a' },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'W sobotę sprzątam ',
          obj: 'mieszkanie',
          negObj: 'mieszkania',
          lemma: 'mieszkanie',
          tr: { en: 'On Saturday I clean the apartment.', ru: 'В субботу я убираю квартиру.', tr: 'Cumartesi günü daireyi temizliyorum.' },
        },
        pfEx: {
          v: 'Posprzątaj ',
          obj: 'swój pokój',
          lemma: 'swój pokój',
          tr: { en: 'Clean your room.', ru: 'Убери свою комнату.', tr: 'Odanı topla.' },
        },
      },
    ],
  },
  // 67. ubierać się / ubrać się
  {
    slug: 'ubierac-sie',
    level: 'A1',
    rank: 76,
    tags: ['daily'],
    tr: { en: 'to get dressed', ru: 'одеваться / одеться', tr: 'giyinmek' },
    impf: { inf: 'ubierać się', cls: 'a' },
    pf: {
      inf: 'ubrać się',
      pres: ['ubiorę', 'ubierzesz', 'ubierze', 'ubierzemy', 'ubierzecie', 'ubiorą'],
      past: ['ubrał', 'ubrał', 'ubrali'],
      imp2: 'ubierz',
    },
    gov: [
      {
        case: 'accusative',
        prep: 'w',
        meaning: { en: 'to dress in (put on clothes)', ru: 'одеваться во что-то', tr: 'bir kıyafet giymek' },
        ex: {
          v: 'Ubieram się ',
          prep: 'w ',
          obj: 'ciepły sweter',
          lemma: 'ciepły sweter',
          tr: { en: 'I am putting on a warm sweater.', ru: 'Я одеваюсь в тёплый свитер.', tr: 'Kalın bir kazak giyiyorum.' },
        },
      },
    ],
  },
  // 68. nosić
  {
    slug: 'nosic',
    level: 'A1',
    rank: 77,
    tags: ['daily'],
    tr: { en: 'to wear, to carry (regularly)', ru: 'носить (одежду, вещи)', tr: 'giymek (taşımak)' },
    impf: { inf: 'nosić', cls: 'i', pres: ['noszę', 'nosisz', 'nosi', 'nosimy', 'nosicie', 'noszą'] },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Noszę ',
          obj: 'okulary',
          negObj: 'okularów',
          lemma: 'okulary',
          tr: { en: 'I wear glasses.', ru: 'Я ношу очки.', tr: 'Gözlük takıyorum.' },
        },
      },
    ],
  },
  // 69. przychodzić / przyjść
  {
    slug: 'przychodzic',
    level: 'A1',
    rank: 78,
    tags: ['daily', 'work'],
    tr: { en: 'to come, to arrive (on foot)', ru: 'приходить / прийти', tr: 'gelmek (yürüyerek)' },
    impf: { inf: 'przychodzić', cls: 'i', pres: ['przychodzę', 'przychodzisz', 'przychodzi', 'przychodzimy', 'przychodzicie', 'przychodzą'], imp2: 'przychodź' },
    pf: {
      inf: 'przyjść',
      pres: ['przyjdę', 'przyjdziesz', 'przyjdzie', 'przyjdziemy', 'przyjdziecie', 'przyjdą'],
      past: ['przyszł', 'przyszedł', 'przyszli'],
      imp2: 'przyjdź',
    },
    gov: [
      {
        case: 'genitive',
        prep: 'do',
        ex: {
          v: 'Przychodzę ',
          prep: 'do ',
          obj: 'biura',
          lemma: 'biuro',
          post: ' o ósmej.',
          tr: { en: 'I come to the office at eight.', ru: 'Я прихожу в офис в восемь.', tr: 'Sekizde ofise geliyorum.' },
        },
        pfEx: {
          v: 'Przyjdź ',
          prep: 'do ',
          obj: 'nas',
          lemma: 'my',
          post: ' jutro!',
          tr: { en: 'Come to our place tomorrow!', ru: 'Приходи к нам завтра!', tr: 'Yarın bize gel!' },
        },
      },
    ],
  },
  // 70. przyjeżdżać / przyjechać
  {
    slug: 'przyjezdzac',
    level: 'A1',
    rank: 79,
    tags: ['travel', 'daily'],
    tr: { en: 'to arrive, to come (by vehicle)', ru: 'приезжать / приехать', tr: 'gelmek, varmak (araçla)' },
    impf: { inf: 'przyjeżdżać', cls: 'a' },
    pf: {
      inf: 'przyjechać',
      pres: ['przyjadę', 'przyjedziesz', 'przyjedzie', 'przyjedziemy', 'przyjedziecie', 'przyjadą'],
      past: ['przyjechał', 'przyjechał', 'przyjechali'],
      imp2: 'przyjedź',
    },
    gov: [
      {
        case: 'genitive',
        prep: 'z',
        meaning: { en: 'to come from', ru: 'приезжать из', tr: 'bir yerden gelmek' },
        ex: {
          v: 'Przyjeżdżam ',
          prep: 'z ',
          obj: 'Turcji',
          lemma: 'Turcja',
          tr: { en: 'I come from Turkey.', ru: 'Я приезжаю из Турции.', tr: "Türkiye'den geliyorum." },
        },
        pfEx: {
          v: 'Pociąg przyjechał ',
          prep: 'z ',
          obj: 'Krakowa',
          lemma: 'Kraków',
          tr: { en: 'The train arrived from Kraków.', ru: 'Поезд приехал из Кракова.', tr: "Tren Krakow'dan geldi." },
        },
      },
    ],
  },
  // 71. wychodzić / wyjść
  {
    slug: 'wychodzic',
    level: 'A1',
    rank: 80,
    tags: ['daily'],
    tr: { en: 'to go out, to leave (on foot)', ru: 'выходить / выйти', tr: 'çıkmak, dışarı çıkmak' },
    impf: { inf: 'wychodzić', cls: 'i', pres: ['wychodzę', 'wychodzisz', 'wychodzi', 'wychodzimy', 'wychodzicie', 'wychodzą'], imp2: 'wychodź' },
    pf: {
      inf: 'wyjść',
      pres: ['wyjdę', 'wyjdziesz', 'wyjdzie', 'wyjdziemy', 'wyjdziecie', 'wyjdą'],
      past: ['wyszł', 'wyszedł', 'wyszli'],
      imp2: 'wyjdź',
    },
    gov: [
      {
        case: 'genitive',
        prep: 'z',
        ex: {
          v: 'Wychodzę ',
          prep: 'z ',
          obj: 'domu',
          lemma: 'dom',
          tr: { en: 'I am leaving the house.', ru: 'Я выхожу из дома.', tr: 'Evden çıkıyorum.' },
        },
        pfEx: {
          v: 'Wyszedłem ',
          prep: 'z ',
          obj: 'pracy',
          lemma: 'praca',
          post: ' wcześniej.',
          tr: { en: 'I left work early.', ru: 'Я вышел с работы пораньше.', tr: 'İşten erken çıktım.' },
        },
      },
    ],
  },
  // 72. wchodzić / wejść
  {
    slug: 'wchodzic',
    level: 'A1',
    rank: 81,
    tags: ['daily'],
    tr: { en: 'to enter, to go in / up', ru: 'входить / войти', tr: 'girmek, içeri girmek' },
    impf: { inf: 'wchodzić', cls: 'i', pres: ['wchodzę', 'wchodzisz', 'wchodzi', 'wchodzimy', 'wchodzicie', 'wchodzą'], imp2: 'wchodź' },
    pf: {
      inf: 'wejść',
      pres: ['wejdę', 'wejdziesz', 'wejdzie', 'wejdziemy', 'wejdziecie', 'wejdą'],
      past: ['weszł', 'wszedł', 'weszli'],
      imp2: 'wejdź',
    },
    gov: [
      {
        case: 'genitive',
        prep: 'do',
        ex: {
          v: 'Wchodzę ',
          prep: 'do ',
          obj: 'budynku',
          lemma: 'budynek',
          tr: { en: 'I am entering the building.', ru: 'Я вхожу в здание.', tr: 'Binaya giriyorum.' },
        },
        pfEx: {
          v: 'Wejdź ',
          prep: 'do ',
          obj: 'środka',
          lemma: 'środek',
          tr: { en: 'Come inside.', ru: 'Войди внутрь.', tr: 'İçeri gir.' },
        },
      },
    ],
  },
  // 73. wracać / wrócić
  {
    slug: 'wracac',
    level: 'A1',
    rank: 82,
    tags: ['daily', 'travel'],
    tr: { en: 'to return, to come back', ru: 'возвращаться / вернуться', tr: 'dönmek, geri gelmek' },
    impf: { inf: 'wracać', cls: 'a' },
    pf: { inf: 'wrócić', cls: 'i', pres: ['wrócę', 'wrócisz', 'wróci', 'wrócimy', 'wrócicie', 'wrócą'] },
    gov: [
      {
        case: 'genitive',
        prep: 'do',
        meaning: { en: 'to return to', ru: 'возвращаться в / к', tr: 'bir yere / kişiye dönmek' },
        ex: {
          v: 'Wracam ',
          prep: 'do ',
          obj: 'domu',
          lemma: 'dom',
          tr: { en: 'I am coming back home.', ru: 'Я возвращаюсь домой.', tr: 'Eve dönüyorum.' },
        },
        pfEx: {
          v: 'Kiedy wrócisz ',
          prep: 'do ',
          obj: 'Polski',
          lemma: 'Polska',
          post: '?',
          tr: { en: 'When will you return to Poland?', ru: 'Когда ты вернёшься в Польшу?', tr: "Polonya'ya ne zaman döneceksin?" },
        },
      },
      {
        case: 'genitive',
        prep: 'z',
        meaning: { en: 'to return from', ru: 'возвращаться из / с', tr: 'bir yerden dönmek' },
        ex: {
          v: 'Wracamy ',
          prep: 'z ',
          obj: 'urlopu',
          lemma: 'urlop',
          tr: { en: 'We are returning from vacation.', ru: 'Мы возвращаемся из отпуска.', tr: 'Tatilden dönüyoruz.' },
        },
      },
    ],
  },
  // 74. wyjeżdżać / wyjechać
  {
    slug: 'wyjezdzac',
    level: 'A2',
    rank: 83,
    tags: ['travel'],
    tr: { en: 'to leave, to depart (by vehicle)', ru: 'уезжать / уехать', tr: 'ayrılmak, yola çıkmak (araçla)' },
    impf: { inf: 'wyjeżdżać', cls: 'a' },
    pf: {
      inf: 'wyjechać',
      pres: ['wyjadę', 'wyjedziesz', 'wyjedzie', 'wyjedziemy', 'wyjedziecie', 'wyjadą'],
      past: ['wyjechał', 'wyjechał', 'wyjechali'],
      imp2: 'wyjedź',
    },
    gov: [
      {
        case: 'accusative',
        prep: 'na',
        meaning: { en: 'to go away for (vacation / trip)', ru: 'уезжать на (каникулы, выходные)', tr: 'tatile / geziye çıkmak' },
        ex: {
          v: 'Jutro wyjeżdżamy ',
          prep: 'na ',
          obj: 'wakacje',
          lemma: 'wakacje',
          tr: { en: 'Tomorrow we are leaving for vacation.', ru: 'Завтра мы уезжаем в отпуск.', tr: 'Yarın tatile çıkıyoruz.' },
        },
      },
    ],
  },
  // 75. podróżować
  {
    slug: 'podrozowac',
    level: 'A2',
    rank: 84,
    tags: ['travel'],
    tr: { en: 'to travel', ru: 'путешествовать', tr: 'seyahat etmek' },
    impf: { inf: 'podróżować', cls: 'owa' },
    gov: [
      {
        case: 'locative',
        prep: 'po',
        meaning: { en: 'to travel around (a country/region)', ru: 'путешествовать по', tr: 'bir yeri gezmek, dolaşmak' },
        ex: {
          v: 'Lubię podróżować ',
          prep: 'po ',
          obj: 'Europie',
          lemma: 'Europa',
          tr: { en: 'I like travelling around Europe.', ru: 'Я люблю путешествовать по Европе.', tr: "Avrupa'da seyahat etmeyi seviyorum." },
        },
      },
    ],
  },
  // 76. zwiedzać / zwiedzić
  {
    slug: 'zwiedzac',
    level: 'A2',
    rank: 85,
    tags: ['travel'],
    tr: { en: 'to sightsee, to visit (a place/museum)', ru: 'осматривать достопримечательности / посетить (город, музей)', tr: 'gezmek, ziyaret etmek (şehir, müze)' },
    impf: { inf: 'zwiedzać', cls: 'a' },
    pf: { inf: 'zwiedzić', cls: 'i', pres: ['zwiedzę', 'zwiedzisz', 'zwiedzi', 'zwiedzimy', 'zwiedzicie', 'zwiedzą'] },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Zwiedzamy ',
          obj: 'stare miasto',
          negObj: 'starego miasta',
          lemma: 'stare miasto',
          tr: { en: 'We are sightseeing the Old Town.', ru: 'Мы осматриваем Старый город.', tr: 'Eski şehri geziyoruz.' },
        },
        pfEx: {
          v: 'Zwiedziliśmy ',
          obj: 'zamek królewski',
          lemma: 'zamek królewski',
          tr: { en: 'We visited the Royal Castle.', ru: 'Мы посетили Королевский замок.', tr: 'Kraliyet Kalesini gezdik.' },
        },
      },
    ],
  },
  // 77. odwiedzać / odwiedzić
  {
    slug: 'odwiedzac',
    level: 'A2',
    rank: 86,
    tags: ['daily', 'travel'],
    tr: { en: 'to visit (a person)', ru: 'навещать / навестить (кого-то)', tr: 'ziyaret etmek (birini)' },
    impf: { inf: 'odwiedzać', cls: 'a' },
    pf: { inf: 'odwiedzić', cls: 'i', pres: ['odwiedzę', 'odwiedzisz', 'odwiedzi', 'odwiedzimy', 'odwiedzicie', 'odwiedzą'] },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'W weekend odwiedzam ',
          obj: 'babcię',
          negObj: 'babci',
          lemma: 'babcia',
          tr: { en: 'On the weekend I visit my grandma.', ru: 'На выходных я навещаю бабушку.', tr: 'Hafta sonu büyükannemi ziyaret ediyorum.' },
        },
        pfEx: {
          v: 'Odwiedziliśmy ',
          obj: 'znajomych',
          lemma: 'znajomi',
          tr: { en: 'We visited our friends.', ru: 'Мы навестили знакомых.', tr: 'Tanıdıklarımızı ziyaret ettik.' },
        },
      },
    ],
  },
  // 78. zapraszać / zaprosić
  {
    slug: 'zapraszac',
    level: 'A2',
    rank: 87,
    tags: ['daily'],
    tr: { en: 'to invite', ru: 'приглашать / пригласить', tr: 'davet etmek' },
    impf: { inf: 'zapraszać', cls: 'a' },
    pf: { inf: 'zaprosić', cls: 'i', pres: ['zaproszę', 'zaprosisz', 'zaprosi', 'zaprosimy', 'zaprosicie', 'zaproszą'] },
    gov: [
      {
        case: 'accusative',
        prep: 'na',
        meaning: { en: 'to invite to (an event / meal)', ru: 'приглашать на (ужин, праздник)', tr: 'bir etkinliğe / yemeğe davet etmek' },
        ex: {
          v: 'Zapraszam cię ',
          prep: 'na ',
          obj: 'kolację',
          lemma: 'kolacja',
          tr: { en: 'I invite you to dinner.', ru: 'Я приглашаю тебя на ужин.', tr: 'Seni akşam yemeğine davet ediyorum.' },
        },
        pfEx: {
          v: 'Zaprosiliśmy gości ',
          prep: 'na ',
          obj: 'ślub',
          lemma: 'ślub',
          tr: { en: 'We invited guests to the wedding.', ru: 'Мы пригласили гостей на свадьбу.', tr: 'Misafirleri düğüne davet ettik.' },
        },
      },
    ],
  },
  // 79. znajdować / znaleźć
  {
    slug: 'znajdowac',
    level: 'A1',
    rank: 88,
    tags: ['daily', 'work'],
    tr: { en: 'to find', ru: 'находить / найти', tr: 'bulmak' },
    impf: { inf: 'znajdować', cls: 'owa' },
    pf: {
      inf: 'znaleźć',
      pres: ['znajdę', 'znajdziesz', 'znajdzie', 'znajdziemy', 'znajdziecie', 'znajdą'],
      past: ['znalazł', 'znalazł', 'znaleźli'],
      imp2: 'znajdź',
    },
    gov: [
      {
        case: 'accusative',
        contrast: {
          ru: {
            equivalent: 'находить + В. п.',
            level: 'match',
            note: 'Обратите внимание: szukać требует родительного падежа (szukam pracy), но результат — znaleźć — требует винительного (znalazłem pracę)!',
          },
        },
        ex: {
          v: 'Zawsze znajduję ',
          obj: 'rozwiązanie',
          negObj: 'rozwiązania',
          lemma: 'rozwiązanie',
          tr: { en: 'I always find a solution.', ru: 'Я всегда нахожу решение.', tr: 'Her zaman bir çözüm bulurum.' },
        },
        pfEx: {
          v: 'Wreszcie znalazłem ',
          obj: 'dobrą pracę',
          lemma: 'dobra praca',
          tr: { en: 'I finally found a good job.', ru: 'Я наконец нашёл хорошую работу.', tr: 'Sonunda iyi bir iş buldum.' },
        },
      },
    ],
  },
  // 80. gubić / zgubić
  {
    slug: 'gubic',
    level: 'A2',
    rank: 89,
    tags: ['daily', 'travel'],
    tr: { en: 'to lose (an object)', ru: 'терять / потерять (вещь)', tr: 'kaybetmek (eşya)' },
    impf: { inf: 'gubić', cls: 'i' },
    pf: { inf: 'zgubić', cls: 'i' },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Często gubię ',
          obj: 'długopisy',
          negObj: 'długopisów',
          lemma: 'długopisy',
          tr: { en: 'I often lose pens.', ru: 'Я часто теряю ручки.', tr: 'Sık sık kalem kaybediyorum.' },
        },
        pfEx: {
          v: 'Zgubiłem ',
          obj: 'portfel',
          lemma: 'portfel',
          tr: { en: 'I lost my wallet.', ru: 'Я потерял кошелёк.', tr: 'Cüzdanımı kaybettim.' },
        },
      },
    ],
  },
  // 81. tracić / stracić
  {
    slug: 'tracic',
    level: 'A2',
    rank: 90,
    tags: ['daily', 'work'],
    tr: { en: 'to lose, to waste (time, money, job)', ru: 'терять, тратить впустую (время, работу)', tr: 'kaybetmek, boşa harcamak (zaman, iş)' },
    impf: { inf: 'tracić', cls: 'i', pres: ['tracę', 'tracisz', 'traci', 'tracimy', 'tracicie', 'tracą'] },
    pf: { inf: 'stracić', cls: 'i', pres: ['stracę', 'stracisz', 'straci', 'stracimy', 'stracicie', 'stracą'] },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Tracimy ',
          obj: 'cenny czas',
          negObj: 'cennego czasu',
          lemma: 'cenny czas',
          tr: { en: 'We are wasting precious time.', ru: 'Мы теряем драгоценное время.', tr: 'Değerli zamanımızı kaybediyoruz.' },
        },
        pfEx: {
          v: 'On stracił ',
          obj: 'cierpliwość',
          lemma: 'cierpliwość',
          tr: { en: 'He lost his patience.', ru: 'Он потерял терпение.', tr: 'Sabrını kaybetti.' },
        },
      },
    ],
  },
  // 82. dostawać / dostać
  {
    slug: 'dostawac',
    level: 'A1',
    rank: 91,
    tags: ['daily', 'work', 'university'],
    tr: { en: 'to get, to receive', ru: 'получать / получить', tr: 'almak (hediye, mesaj, not)' },
    impf: { inf: 'dostawać', cls: 'awa' },
    pf: {
      inf: 'dostać',
      pres: ['dostanę', 'dostaniesz', 'dostanie', 'dostaniemy', 'dostaniecie', 'dostaną'],
      past: ['dostał', 'dostał', 'dostali'],
      imp2: 'dostań',
    },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Dostaję ',
          obj: 'dużo wiadomości',
          negObj: 'dużo wiadomości',
          lemma: 'dużo wiadomości',
          tr: { en: 'I get a lot of messages.', ru: 'Я получаю много сообщений.', tr: 'Çok fazla mesaj alıyorum.' },
        },
        pfEx: {
          v: 'Dostałam ',
          obj: 'stypendium',
          lemma: 'stypendium',
          tr: { en: 'I received a scholarship.', ru: 'Я получила стипендию.', tr: 'Burs aldım.' },
        },
      },
    ],
  },
  // 83. wysyłać / wysłać
  {
    slug: 'wysylac',
    level: 'A2',
    rank: 92,
    tags: ['work', 'daily'],
    tr: { en: 'to send', ru: 'отправлять, посылать / отправить', tr: 'göndermek, yollamak' },
    impf: { inf: 'wysyłać', cls: 'a' },
    pf: {
      inf: 'wysłać',
      pres: ['wyślę', 'wyślesz', 'wyśle', 'wyślemy', 'wyślecie', 'wyślą'],
      past: ['wysłał', 'wysłał', 'wysłali'],
      imp2: 'wyślij',
    },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Wysyłam ',
          obj: 'paczkę',
          negObj: 'paczki',
          lemma: 'paczka',
          tr: { en: 'I am sending a parcel.', ru: 'Я отправляю посылку.', tr: 'Kargo gönderiyorum.' },
        },
        pfEx: {
          v: 'Wysłałem ',
          obj: 'CV',
          lemma: 'CV',
          tr: { en: 'I sent my CV.', ru: 'Я отправил резюме.', tr: 'Özgeçmişimi gönderdim.' },
        },
      },
    ],
  },
  // 84. odbierać / odebrać
  {
    slug: 'odbierac',
    level: 'A2',
    rank: 93,
    tags: ['daily', 'work'],
    tr: { en: 'to pick up, to answer (a call), to collect', ru: 'забирать, принимать (звонок, посылку)', tr: 'teslim almak, telefonu açmak' },
    impf: { inf: 'odbierać', cls: 'a' },
    pf: {
      inf: 'odebrać',
      pres: ['odbiorę', 'odbierzesz', 'odbierze', 'odbierzemy', 'odbierzecie', 'odbiorą'],
      past: ['odebrał', 'odebrał', 'odebrali'],
      imp2: 'odbierz',
    },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Odbieram ',
          obj: 'telefon',
          negObj: 'telefonu',
          lemma: 'telefon',
          tr: { en: 'I am answering the phone.', ru: 'Я беру трубку (отвечаю на звонок).', tr: 'Telefonu açıyorum.' },
        },
        pfEx: {
          v: 'Odebrałem ',
          obj: 'przesyłkę',
          lemma: 'przesyłka',
          tr: { en: 'I picked up the package.', ru: 'Я забрал посылку.', tr: 'Paketi teslim aldım.' },
        },
      },
    ],
  },
  // 85. zamawiać / zamówić
  {
    slug: 'zamawiac',
    level: 'A1',
    rank: 94,
    tags: ['daily', 'travel'],
    tr: { en: 'to order, to book', ru: 'заказывать / заказать', tr: 'sipariş vermek' },
    impf: { inf: 'zamawiać', cls: 'a' },
    pf: { inf: 'zamówić', cls: 'i' },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Zamawiam ',
          obj: 'taksówkę',
          negObj: 'taksówki',
          lemma: 'taksówka',
          tr: { en: 'I am ordering a taxi.', ru: 'Я заказываю такси.', tr: 'Taksi çağırıyorum.' },
        },
        pfEx: {
          v: 'Zamówiliśmy ',
          obj: 'pierogi',
          lemma: 'pierogi',
          tr: { en: 'We ordered pierogi.', ru: 'Мы заказали вареники (пероги).', tr: 'Pierogi sipariş ettik.' },
        },
      },
    ],
  },
  // 86. rezerwować / zarezerwować
  {
    slug: 'rezerwowac',
    level: 'A2',
    rank: 96,
    tags: ['travel'],
    tr: { en: 'to book, to reserve', ru: 'бронировать / забронировать', tr: 'rezervasyon yapmak' },
    impf: { inf: 'rezerwować', cls: 'owa' },
    pf: { inf: 'zarezerwować', cls: 'owa' },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Rezerwuję ',
          obj: 'pokój w hotelu',
          negObj: 'pokoju w hotelu',
          lemma: 'pokój w hotelu',
          tr: { en: 'I am booking a hotel room.', ru: 'Я бронирую номер в отеле.', tr: 'Otelde oda rezervasyonu yapıyorum.' },
        },
        pfEx: {
          v: 'Zarezerwowałem ',
          obj: 'stolik',
          lemma: 'stolik',
          tr: { en: 'I reserved a table.', ru: 'Я забронировал столик.', tr: 'Masa ayırtım.' },
        },
      },
    ],
  },
  // 87. wynajmować / wynająć
  {
    slug: 'wynajmowac',
    level: 'A2',
    rank: 97,
    tags: ['daily', 'university', 'travel'],
    tr: { en: 'to rent, to hire', ru: 'снимать / снять (или сдавать в аренду)', tr: 'kiralamak' },
    impf: { inf: 'wynajmować', cls: 'owa' },
    pf: {
      inf: 'wynająć',
      pres: ['wynajmę', 'wynajmiesz', 'wynajmie', 'wynajmiemy', 'wynajmiecie', 'wynajmą'],
      past: ['wynajęł', 'wynajął', 'wynajęli'],
      imp2: 'wynajmij',
    },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Wynajmuję ',
          obj: 'kawalerki',
          negObj: 'kawalerek',
          lemma: 'kawalerki',
          tr: { en: 'I rent studio apartments.', ru: 'Я снимаю квартиры-студии.', tr: 'Stüdyo daireler kiralıyorum.' },
        },
        pfEx: {
          v: 'Wynajęliśmy ',
          obj: 'samochód',
          lemma: 'samochód',
          tr: { en: 'We rented a car.', ru: 'Мы арендовали машину.', tr: 'Araba kiraladık.' },
        },
      },
    ],
  },
  // 88. przeprowadzać się / przeprowadzić się
  {
    slug: 'przeprowadzac-sie',
    level: 'A2',
    rank: 98,
    tags: ['daily'],
    tr: { en: 'to move (change residence)', ru: 'переезжать / переехать (на новую квартиру)', tr: 'taşınmak (ev değiştirmek)' },
    impf: { inf: 'przeprowadzać się', cls: 'a' },
    pf: { inf: 'przeprowadzić się', cls: 'i', pres: ['przeprowadzę', 'przeprowadzisz', 'przeprowadzi', 'przeprowadzimy', 'przeprowadzicie', 'przeprowadzą'] },
    gov: [
      {
        case: 'genitive',
        prep: 'do',
        ex: {
          v: 'Przeprowadzamy się ',
          prep: 'do ',
          obj: 'Wrocławia',
          lemma: 'Wrocław',
          tr: { en: 'We are moving to Wrocław.', ru: 'Мы переезжаем во Вроцлав.', tr: "Wrocław'a taşınıyoruz." },
        },
      },
    ],
  },
  // 89. zarabiać / zarobić
  {
    slug: 'zarabiac',
    level: 'A2',
    rank: 99,
    tags: ['work'],
    tr: { en: 'to earn (money)', ru: 'зарабатывать / заработать', tr: 'para kazanmak' },
    impf: { inf: 'zarabiać', cls: 'a' },
    pf: { inf: 'zarobić', cls: 'i' },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Zarabiam ',
          obj: 'dobre pieniądze',
          negObj: 'dobrych pieniędzy',
          lemma: 'dobre pieniądze',
          tr: { en: 'I earn good money.', ru: 'Я зарабатываю хорошие деньги.', tr: 'İyi para kazanıyorum.' },
        },
      },
    ],
  },
  // 90. wydawać / wydać
  {
    slug: 'wydawac',
    level: 'A2',
    rank: 100,
    tags: ['daily', 'work'],
    tr: { en: 'to spend (money), to publish', ru: 'тратить / потратить (деньги)', tr: 'harcamak (para)' },
    impf: { inf: 'wydawać', cls: 'awa' },
    pf: {
      inf: 'wydać',
      pres: ['wydam', 'wydasz', 'wyda', 'wydamy', 'wydacie', 'wydadzą'],
      imp2: 'wydaj',
    },
    gov: [
      {
        case: 'accusative',
        prep: 'na',
        meaning: { en: 'to spend on something', ru: 'тратить на что-то', tr: 'bir şeye para harcamak' },
        ex: {
          v: 'Wydaję dużo ',
          prep: 'na ',
          obj: 'książki',
          lemma: 'książki',
          tr: { en: 'I spend a lot on books.', ru: 'Я много трачу на книги.', tr: 'Kitaplara çok para harcıyorum.' },
        },
      },
    ],
  },
  // 91. oszczędzać / zaoszczędzić
  {
    slug: 'oszczedzac',
    level: 'B1',
    rank: 101,
    tags: ['daily', 'work'],
    tr: { en: 'to save (money, time)', ru: 'экономить, копить / сэкономить', tr: 'tasarruf etmek, biriktirmek' },
    impf: { inf: 'oszczędzać', cls: 'a' },
    pf: { inf: 'zaoszczędzić', cls: 'i', pres: ['zaoszczędzę', 'zaoszczędzisz', 'zaoszczędzi', 'zaoszczędzimy', 'zaoszczędzicie', 'zaoszczędzą'] },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Oszczędzam ',
          obj: 'pieniądze',
          negObj: 'pieniędzy',
          lemma: 'pieniądze',
          tr: { en: 'I am saving money.', ru: 'Я коплю (экономлю) деньги.', tr: 'Para biriktiriyorum.' },
        },
        pfEx: {
          v: 'Zaoszczędziliśmy ',
          obj: 'sporo czasu',
          lemma: 'sporo czasu',
          tr: { en: 'We saved a lot of time.', ru: 'Мы сэкономили немало времени.', tr: 'epey zaman tasarruf ettik.' },
        },
      },
    ],
  },
  // 92. pożyczać / pożyczyć
  {
    slug: 'pozyczac',
    level: 'A2',
    rank: 102,
    tags: ['daily'],
    tr: { en: 'to borrow / to lend', ru: 'одалживать (брать или давать в долг)', tr: 'ödünç almak / ödünç vermek' },
    impf: { inf: 'pożyczać', cls: 'a' },
    pf: { inf: 'pożyczyć', cls: 'y' },
    gov: [
      {
        case: 'dative',
        meaning: { en: 'to lend to someone', ru: 'одалживать кому-то', tr: 'birine ödünç vermek' },
        ex: {
          v: 'Pożyczam ',
          obj: 'koledze',
          lemma: 'kolega',
          post: ' notatki.',
          tr: { en: 'I lend my notes to a classmate.', ru: 'Я одалживаю конспекты коллеге.', tr: 'Arkadaşıma ders notlarını ödünç veriyorum.' },
        },
      },
      {
        case: 'genitive',
        prep: 'od',
        meaning: { en: 'to borrow from someone', ru: 'одалживать у кого-то', tr: 'birinden ödünç almak' },
        ex: {
          v: 'Pożyczyłem książkę ',
          prep: 'od ',
          obj: 'brata',
          lemma: 'brat',
          tr: { en: 'I borrowed a book from my brother.', ru: 'Я одолжил книгу у брата.', tr: 'Kardeşimden kitap ödünç aldım.' },
        },
      },
    ],
  },
  // 93. oddawać / oddać
  {
    slug: 'oddawac',
    level: 'A2',
    rank: 103,
    tags: ['daily', 'university'],
    tr: { en: 'to give back, to return, to hand in', ru: 'отдавать, возвращать / отдать, сдать (работу)', tr: 'geri vermek, teslim etmek' },
    impf: { inf: 'oddawać', cls: 'awa' },
    pf: {
      inf: 'oddać',
      pres: ['oddam', 'oddasz', 'odda', 'oddamy', 'oddacie', 'oddadzą'],
      imp2: 'oddaj',
    },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Oddaję ',
          obj: 'książki',
          negObj: 'książek',
          lemma: 'książki',
          post: ' do biblioteki.',
          tr: { en: 'I am returning books to the library.', ru: 'Я сдаю книги в библиотеку.', tr: 'Kitapları kütüphaneye iade ediyorum.' },
        },
        pfEx: {
          v: 'Oddałem ',
          obj: 'projekt',
          lemma: 'projekt',
          post: ' na czas.',
          tr: { en: 'I handed in the project on time.', ru: 'Я сдал проект вовремя.', tr: 'Projeyi zamanında teslim ettim.' },
        },
      },
    ],
  },
  // 94. zdawać / zdać
  {
    slug: 'zdawac',
    level: 'A2',
    rank: 104,
    tags: ['university'],
    tr: { en: 'to take (an exam) / to pass (an exam)', ru: 'сдавать (экзамен) / сдать (успешно!)', tr: 'sınava girmek / sınavı geçmek' },
    impf: { inf: 'zdawać', cls: 'awa' },
    pf: {
      inf: 'zdać',
      pres: ['zdam', 'zdasz', 'zda', 'zdamy', 'zdacie', 'zdadzą'],
      imp2: 'zdaj',
    },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Jutro zdaję ',
          obj: 'trudny egzamin',
          negObj: 'trudnego egzaminu',
          lemma: 'trudny egzamin',
          tr: { en: 'Tomorrow I am taking a difficult exam.', ru: 'Завтра я сдаю сложный экзамен.', tr: 'Yarın zor bir sınava giriyorum.' },
        },
        pfEx: {
          v: 'Zdałem ',
          obj: 'egzamin na prawo jazdy',
          lemma: 'egzamin na prawo jazdy',
          tr: { en: 'I passed my driving test.', ru: 'Я сдал экзамен на права.', tr: 'Ehliyet sınavını geçtim.' },
        },
      },
    ],
  },
  // 95. powtarzać / powtórzyć
  {
    slug: 'powtarzac',
    level: 'A1',
    rank: 105,
    tags: ['university', 'daily'],
    tr: { en: 'to repeat, to review (material)', ru: 'повторять / повторить', tr: 'tekrarlamak, gözden geçirmek' },
    impf: { inf: 'powtarzać', cls: 'a' },
    pf: { inf: 'powtórzyć', cls: 'y' },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Powtarzam ',
          obj: 'gramatykę',
          negObj: 'gramatyki',
          lemma: 'gramatyka',
          tr: { en: 'I am reviewing grammar.', ru: 'Я повторяю грамматику.', tr: 'Dilbilgisini tekrar ediyorum.' },
        },
        pfEx: {
          v: 'Czy możesz powtórzyć ',
          obj: 'ostatnie zdanie',
          lemma: 'ostatnie zdanie',
          post: '?',
          tr: { en: 'Can you repeat the last sentence?', ru: 'Можешь повторить последнее предложение?', tr: 'Son cümleyi tekrar edebilir misin?' },
        },
      },
    ],
  },
  // 96. tłumaczyć / przetłumaczyć
  {
    slug: 'tlumaczyc',
    level: 'A2',
    rank: 106,
    tags: ['university', 'work'],
    tr: { en: 'to translate, to explain', ru: 'переводить / перевести (а также: объяснять)', tr: 'çevirmek, tercüme etmek (ayrıca: açıklamak)' },
    impf: { inf: 'tłumaczyć', cls: 'y' },
    pf: { inf: 'przetłumaczyć', cls: 'y' },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Tłumaczę ',
          obj: 'tekst',
          negObj: 'tekstu',
          lemma: 'tekst',
          post: ' na polski.',
          tr: { en: 'I am translating a text into Polish.', ru: 'Я перевожу текст на польский.', tr: 'Metni Lehçeye çeviriyorum.' },
        },
        pfEx: {
          v: 'Przetłumaczyłem ',
          obj: 'dokumenty',
          lemma: 'dokumenty',
          tr: { en: 'I translated the documents.', ru: 'Я перевёл документы.', tr: 'Belgeleri tercüme ettim.' },
        },
      },
    ],
  },
  // 97. wyjaśniać / wyjaśnić
  {
    slug: 'wyjasniac',
    level: 'B1',
    rank: 107,
    tags: ['university', 'work'],
    tr: { en: 'to explain, to clarify', ru: 'объяснять, разъяснять / объяснить', tr: 'açıklamak, aydınlatmak' },
    impf: { inf: 'wyjaśniać', cls: 'a' },
    pf: { inf: 'wyjaśnić', cls: 'i' },
    gov: [
      {
        case: 'dative',
        meaning: { en: 'to explain to someone', ru: 'объяснять кому-то', tr: 'birine açıklamak' },
        ex: {
          v: 'Nauczyciel wyjaśnia ',
          obj: 'studentom',
          lemma: 'studenci',
          post: ' nową regułę.',
          tr: { en: 'The teacher explains the new rule to the students.', ru: 'Преподаватель объясняет студентам новое правило.', tr: 'Öğretmen öğrencilere yeni kuralı açıklıyor.' },
        },
      },
    ],
  },
  // 98. sprawdzać / sprawdzić
  {
    slug: 'sprawdzac',
    level: 'A2',
    rank: 108,
    tags: ['work', 'university', 'daily'],
    tr: { en: 'to check, to verify', ru: 'проверять / проверить', tr: 'kontrol etmek' },
    impf: { inf: 'sprawdzać', cls: 'a' },
    pf: { inf: 'sprawdzić', cls: 'i', pres: ['sprawdzę', 'sprawdzisz', 'sprawdzi', 'sprawdzimy', 'sprawdzicie', 'sprawdzą'] },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Sprawdzam ',
          obj: 'pocztę',
          negObj: 'poczty',
          lemma: 'poczta',
          tr: { en: 'I am checking my email.', ru: 'Я проверяю почту.', tr: 'Postamı kontrol ediyorum.' },
        },
        pfEx: {
          v: 'Sprawdź ',
          obj: 'rozkład jazdy',
          lemma: 'rozkład jazdy',
          tr: { en: 'Check the timetable.', ru: 'Проверь расписание.', tr: 'Sefer saatlerini kontrol et.' },
        },
      },
    ],
  },
  // 99. przygotowywać / przygotować
  {
    slug: 'przygotowywac',
    level: 'A2',
    rank: 109,
    tags: ['work', 'university', 'daily'],
    tr: { en: 'to prepare', ru: 'готовить, подготавливать / подготовить', tr: 'hazırlamak' },
    impf: { inf: 'przygotowywać', cls: 'iwa' },
    pf: { inf: 'przygotować', cls: 'owa' },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Przygotowuję ',
          obj: 'prezentację',
          negObj: 'prezentacji',
          lemma: 'prezentacja',
          tr: { en: 'I am preparing a presentation.', ru: 'Я готовлю презентацию.', tr: 'Sunum hazırlıyorum.' },
        },
        pfEx: {
          v: 'Przygotowałem ',
          obj: 'wszystkie materiały',
          lemma: 'wszystkie materiały',
          tr: { en: 'I prepared all the materials.', ru: 'Я подготовил все материалы.', tr: 'Tüm materyalleri hazırladım.' },
        },
      },
    ],
  },
  // 100. planować / zaplanować
  {
    slug: 'planowac',
    level: 'A2',
    rank: 110,
    tags: ['work', 'travel'],
    tr: { en: 'to plan', ru: 'планировать / запланировать', tr: 'planlamak' },
    impf: { inf: 'planować', cls: 'owa' },
    pf: { inf: 'zaplanować', cls: 'owa' },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Planujemy ',
          obj: 'podróż',
          negObj: 'podróży',
          lemma: 'podróż',
          tr: { en: 'We are planning a trip.', ru: 'Мы планируем поездку.', tr: 'Bir seyahat planlıyoruz.' },
        },
        pfEx: {
          v: 'Zaplanowałem ',
          obj: 'cały tydzień',
          lemma: 'cały tydzień',
          tr: { en: 'I planned the whole week.', ru: 'Я спланировал всю неделю.', tr: 'Bütün haftayı planladım.' },
        },
      },
    ],
  },
  // 101. organizować / zorganizować
  {
    slug: 'organizowac',
    level: 'A2',
    rank: 111,
    tags: ['work', 'university'],
    tr: { en: 'to organize', ru: 'организовывать / организовать', tr: 'organize etmek, düzenlemek' },
    impf: { inf: 'organizować', cls: 'owa' },
    pf: { inf: 'zorganizować', cls: 'owa' },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Organizujemy ',
          obj: 'konferencję',
          negObj: 'konferencji',
          lemma: 'konferencja',
          tr: { en: 'We are organizing a conference.', ru: 'Мы организуем конференцию.', tr: 'Bir konferans düzenliyoruz.' },
        },
      },
    ],
  },
  // 102. wybierać / wybrać
  {
    slug: 'wybierac',
    level: 'A2',
    rank: 112,
    tags: ['daily', 'work'],
    tr: { en: 'to choose, to select', ru: 'выбирать / выбрать', tr: 'seçmek' },
    impf: { inf: 'wybierać', cls: 'a' },
    pf: {
      inf: 'wybrać',
      pres: ['wybiorę', 'wybierzesz', 'wybierze', 'wybierzemy', 'wybierzecie', 'wybiorą'],
      past: ['wybrał', 'wybrał', 'wybrali'],
      imp2: 'wybierz',
    },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Wybieram ',
          obj: 'prezent',
          negObj: 'prezentu',
          lemma: 'prezent',
          post: ' dla siostry.',
          tr: { en: 'I am choosing a gift for my sister.', ru: 'Я выбираю подарок для сестры.', tr: 'Kız kardeşim için hediye seçiyorum.' },
        },
        pfEx: {
          v: 'Wybraliśmy ',
          obj: 'najlepszą ofertę',
          lemma: 'najlepsza oferta',
          tr: { en: 'We chose the best offer.', ru: 'Мы выбрали лучшее предложение.', tr: 'En iyi teklifi seçtik.' },
        },
      },
    ],
  },
  // 103. decydować się / zdecydować się
  {
    slug: 'decydowac-sie',
    level: 'B1',
    rank: 113,
    tags: ['work', 'daily'],
    tr: { en: 'to decide (on something)', ru: 'решаться / решиться (выбрать что-то)', tr: 'karar vermek' },
    impf: { inf: 'decydować się', cls: 'owa' },
    pf: { inf: 'zdecydować się', cls: 'owa' },
    gov: [
      {
        case: 'accusative',
        prep: 'na',
        ex: {
          v: 'Zdecydowałem się ',
          prep: 'na ',
          obj: 'ten kurs',
          lemma: 'ten kurs',
          tr: { en: 'I decided on this course.', ru: 'Я остановил выбор на этом курсе (решился на этот курс).', tr: 'Bu kursa karar verdim.' },
        },
      },
    ],
  },
  // 104. zmieniać / zmienić
  {
    slug: 'zmieniac',
    level: 'A2',
    rank: 114,
    tags: ['daily', 'work'],
    tr: { en: 'to change', ru: 'менять / изменить, поменять', tr: 'değiştirmek' },
    impf: { inf: 'zmieniać', cls: 'a' },
    pf: { inf: 'zmienić', cls: 'i' },
    gov: [
      {
        case: 'accusative',
        ex: {
          v: 'Zmieniam ',
          obj: 'plany',
          negObj: 'planów',
          lemma: 'plany',
          tr: { en: 'I am changing my plans.', ru: 'Я меняю планы.', tr: 'Planlarımı değiştiriyorum.' },
        },
        pfEx: {
          v: 'Zmieniłam ',
          obj: 'pracę',
          lemma: 'praca',
          tr: { en: 'I changed my job.', ru: 'Я сменила работу.', tr: 'İşimi değiştirdim.' },
        },
      },
    ],
  },
  // 105. próbować / spróbować
  {
    slug: 'probowac',
    level: 'A2',
    rank: 115,
    tags: ['daily'],
    tr: { en: 'to try, to taste', ru: 'пробовать, пытаться / попробовать', tr: 'denemek, tadına bakmak' },
    impf: { inf: 'próbować', cls: 'owa' },
    pf: { inf: 'spróbować', cls: 'owa' },
    gov: [
      {
        case: 'genitive',
        meaning: { en: 'to taste / try something', ru: 'пробовать что-то (блюдо, напиток)', tr: 'bir şeyin tadına bakmak / denemek' },
        contrast: {
          ru: {
            equivalent: 'попробовать + В. п.',
            level: 'mismatch',
            note: 'С существительными próbować требует родительного падежа (Dopełniacz): spróbuj tego ciasta (попробуй этот пирог).',
          },
        },
        ex: {
          v: 'Próbuję ',
          obj: 'tradycyjnego żurku',
          lemma: 'tradycyjny żurek',
          tr: { en: 'I am tasting traditional żurek soup.', ru: 'Я пробую традиционный журек.', tr: 'Geleneksel żurek çorbasının tadına bakıyorum.' },
        },
        pfEx: {
          v: 'Spróbuj ',
          obj: 'tej herbaty',
          lemma: 'ta herbata',
          tr: { en: 'Try this tea.', ru: 'Попробуй этот чай.', tr: 'Bu çayı dene.' },
        },
      },
    ],
  },
];
