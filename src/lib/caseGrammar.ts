import type { Localized, PolishCase } from '@/types/grammar';

export type GenderCategory = 'm_anim' | 'm_inanim' | 'f' | 'n' | 'pl';

export interface DeclensionRow {
  gender: GenderCategory;
  genderLabel: Localized;
  /** Nominative (Mianownik) baseline: "dobry brat" */
  nominative: string;
  /** Inflected form in the target case: "dobremu bratu" */
  inflected: string;
  /** Ending formula: "прил. -emu, сущ. -owi / -u" */
  endingRule: Localized;
  /** Example with a verb that governs this case */
  miniExample: {
    pl: string;
    tr: Localized;
  };
}

export interface CaseConstruction {
  pl: string;
  formula: string;
  tr: Localized;
  note: Localized;
}

export interface CaseGrammarDetail {
  case: PolishCase;
  prepositions: { prep: string; meaning: Localized; example: string }[];
  whenToUse: Localized<string[]>;
  alternationNote?: Localized;
  declension: DeclensionRow[];
  commonPhrases: CaseConstruction[];
}

export const GENDER_LABELS: Record<GenderCategory, Localized> = {
  m_anim: {
    en: 'Masculine animate (kto?)',
    ru: 'Мужской одуш. (кто?)',
    tr: 'Eril canlı (kim?)',
  },
  m_inanim: {
    en: 'Masculine inanimate (co?)',
    ru: 'Мужской неодуш. (что?)',
    tr: 'Eril cansız (ne?)',
  },
  f: {
    en: 'Feminine (ona)',
    ru: 'Женский род (она)',
    tr: 'Dişil (ona)',
  },
  n: {
    en: 'Neuter (ono)',
    ru: 'Средний род (оно)',
    tr: 'Nötr (ono)',
  },
  pl: {
    en: 'Plural (oni / one)',
    ru: 'Множественное число',
    tr: 'Çoğul (oni / one)',
  },
};

export const CASE_GRAMMAR: Record<PolishCase, CaseGrammarDetail> = {
  /* ========================================================================
   * 1. MIANOWNIK (Nominative)
   * ======================================================================== */
  nominative: {
    case: 'nominative',
    prepositions: [],
    whenToUse: {
      en: [
        'The grammatical subject of the sentence (who or what performs the action).',
        'Dictionary base form of nouns, adjectives, and pronouns.',
        'After the construction "To jest..." / "To są..." (To jest nowy komputer).',
      ],
      ru: [
        'Подлежащее в предложении (кто или что выполняет действие).',
        'Словарная (начальная) форма существительных, прилагательных и местоимений.',
        'После указательной связки «To jest...» / «To są...» (To jest dobry pomysł — Это хорошая идея). Внимание: после глагола «Jestem...» используется Творительный падеж!',
      ],
      tr: [
        'Cümlenin öznesi (eylemi yapan kişi veya şey).',
        'İsimlerin, sıfatların ve zamirlerin sözlükteki temel biçimi.',
        '"To jest..." / "To są..." tanıtım kalıbından sonra (To jest nowy komputer).',
      ],
    },
    declension: [
      {
        gender: 'm_anim',
        genderLabel: GENDER_LABELS.m_anim,
        nominative: 'dobry student',
        inflected: 'dobry student',
        endingRule: {
          en: 'Adj: -y / -i · Noun: consonant (sometimes -a: kolega)',
          ru: 'Прил.: -y / -i · Сущ.: согласный (редко -a: kolega, kierowca)',
          tr: 'Sıfat: -y / -i · İsim: ünsüz (bazen -a: kolega)',
        },
        miniExample: {
          pl: 'Ten dobry student dużo czyta.',
          tr: { en: 'This good student reads a lot.', ru: 'Этот хороший студент много читает.', tr: 'Bu iyi öğrenci çok okuyor.' },
        },
      },
      {
        gender: 'm_inanim',
        genderLabel: GENDER_LABELS.m_inanim,
        nominative: 'nowy telefon',
        inflected: 'nowy telefon',
        endingRule: {
          en: 'Adj: -y / -i · Noun: consonant',
          ru: 'Прил.: -y / -i · Сущ.: твёрдый или мягкий согласный',
          tr: 'Sıfat: -y / -i · İsim: ünsüz',
        },
        miniExample: {
          pl: 'Nowy telefon leży na stole.',
          tr: { en: 'The new phone is lying on the table.', ru: 'Новый телефон лежит на столе.', tr: 'Yeni telefon masada duruyor.' },
        },
      },
      {
        gender: 'f',
        genderLabel: GENDER_LABELS.f,
        nominative: 'dobra kawa',
        inflected: 'dobra kawa',
        endingRule: {
          en: 'Adj: -a · Noun: -a / -i (or soft consonant: noc, miłość)',
          ru: 'Прил.: -a · Сущ.: -a / -i (или мягкий согл.: noc, rzecz)',
          tr: 'Sıfat: -a · İsim: -a / -i (veya yumuşak ünsüz: noc)',
        },
        miniExample: {
          pl: 'Dobra kawa pachnie świetnie.',
          tr: { en: 'Good coffee smells great.', ru: 'Хороший кофе отлично пахнет.', tr: 'İyi kahve harika kokuyor.' },
        },
      },
      {
        gender: 'n',
        genderLabel: GENDER_LABELS.n,
        nominative: 'nowe mieszkanie',
        inflected: 'nowe mieszkanie',
        endingRule: {
          en: 'Adj: -e · Noun: -o / -e / -ę / -um',
          ru: 'Прил.: -e · Сущ.: -o / -e / -ę (imię) / -um (muzeum)',
          tr: 'Sıfat: -e · İsim: -o / -e / -ę / -um',
        },
        miniExample: {
          pl: 'To nowe mieszkanie jest jasne.',
          tr: { en: 'This new apartment is bright.', ru: 'Эта новая квартира светлая.', tr: 'Bu yeni daire aydınlık.' },
        },
      },
      {
        gender: 'pl',
        genderLabel: GENDER_LABELS.pl,
        nominative: 'nowe projekty / dobrzy koledzy',
        inflected: 'nowe projekty / dobrzy koledzy',
        endingRule: {
          en: 'Non-virile: -e / -y, -i · Virile (men): -y/-i + stem change, noun -i/-y/-owie',
          ru: 'Не м.-личн.: -e / -y, -i · Муж.-личн. (группа с мужчинами): прил. -y/-i, сущ. -i/-y/-owie',
          tr: 'Diğer çoğul: -e / -y, -i · Erkek-kişi çoğul: -y/-i, isim -i/-y/-owie',
        },
        miniExample: {
          pl: 'Dobrzy koledzy zawsze pomagają.',
          tr: { en: 'Good colleagues always help.', ru: 'Хорошие коллеги всегда помогают.', tr: 'İyi iş arkadaşları her zaman yardım eder.' },
        },
      },
    ],
    commonPhrases: [
      {
        pl: 'To jest świetny pomysł!',
        formula: 'To jest + Mianownik',
        tr: { en: 'That is a great idea!', ru: 'Это отличная идея!', tr: 'Bu harika bir fikir!' },
        note: {
          en: 'After "To jest..." use the Nominative (unlike "Jestem...", which takes the Instrumental).',
          ru: 'После «To jest...» всегда используется Именительный падеж (в отличие от «Jestem...» + Творительный).',
          tr: '"To jest..." kalıbından sonra her zaman Mianownik (yalın hâl) gelir.',
        },
      },
      {
        pl: 'Boli mnie głowa.',
        formula: 'Boli mnie + Mianownik (орган)',
        tr: { en: 'My head hurts.', ru: 'У меня болит голова.', tr: 'Başım ağrıyor.' },
        note: {
          en: 'The body part that hurts is the grammatical subject in the Nominative.',
          ru: 'Часть тела стоит в Именительном падеже («голова болит меня»).',
          tr: 'Ağrıyan organ cümlenin öznesidir ve Mianownik hâlindedir.',
        },
      },
      {
        pl: 'Podoba mi się ten film.',
        formula: 'Podoba mi się + Mianownik',
        tr: { en: 'I like this movie.', ru: 'Мне нравится этот фильм.', tr: 'Bu film hoşuma gidiyor.' },
        note: {
          en: 'The thing that pleases you is in the Nominative; the person is in the Dative (mi).',
          ru: 'То, что нравится, стоит в Именительном падеже, а кому нравится — в Дательном (mi).',
          tr: 'Beğenilen şey Mianownik, beğenen kişi Celownik (mi) hâlindedir.',
        },
      },
    ],
  },

  /* ========================================================================
   * 2. DOPEŁNIACZ (Genitive)
   * ======================================================================== */
  genitive: {
    case: 'genitive',
    prepositions: [
      { prep: 'do', meaning: { en: 'to, into, until', ru: 'в (куда?), к (кому?), до', tr: '-e/-a (yönelme), kadar' }, example: 'Idę do sklepu / Dzwonię do mamy' },
      { prep: 'z / ze', meaning: { en: 'from, out of', ru: 'из, с (откуда?)', tr: '-den/-dan (ayrılma)' }, example: 'Wracam z pracy / Cieszę się z prezentu' },
      { prep: 'od', meaning: { en: 'from (a person), since', ru: 'от (кого?), с (какого времени)', tr: '-den (kişiden), -den beri' }, example: 'Prezent od brata / Od poniedziałku' },
      { prep: 'bez', meaning: { en: 'without', ru: 'без', tr: '-sız/-siz (olmadan)' }, example: 'Kawa bez cukru' },
      { prep: 'dla', meaning: { en: 'for (someone)', ru: 'для (кого-то)', tr: 'için (biri için)' }, example: 'Prezent dla ciebie' },
      { prep: 'u', meaning: { en: "at someone's place", ru: 'у (кого-то дома / у врача)', tr: 'birinin yanında / evinde' }, example: 'Jestem u lekarza' },
      { prep: 'koło / obok', meaning: { en: 'next to, near', ru: 'около, рядом с', tr: 'yanında, yakınında' }, example: 'Sklep koło domu' },
    ],
    whenToUse: {
      en: [
        'Direct object after ANY negated transitive verb (Genitive of negation: Mam czas → Nie mam czasu).',
        'Required directly by key verbs: szukać (look for), słuchać (listen to), uczyć się (learn), używać (use), potrzebować (need), bać się (fear), zapomnieć (forget), życzyć (wish), gratulować (congratulate).',
        'Possession ("of" / "\'s"): samochód brata (brother\'s car), centrum miasta (city center).',
        'After quantities and numbers (5+): dużo pracy, mało czasu, pięć złotych, butelka wody.',
      ],
      ru: [
        'После ОТРИЦАНИЯ «nie» любое прямое дополнение переходит из винительного в родительный: Lubię kawę → Nie lubię kawy!',
        'Управление важнейших глаголов без предлога: szukać (искать), słuchać (слушать), uczyć się (учить что-то), używać (пользоваться), potrzebować (нуждаться), bać się (бояться), życzyć (желать), gratulować (поздравлять с чем-то).',
        'Принадлежность (чей? чего?): dom rodziców (дом родителей), wynik egzaminu.',
        'Количество, отсутствие и меры: Nie ma (нет), dużo czasu, mało pieniędzy, filiżanka herbaty.',
      ],
      tr: [
        'Olumsuz ("nie") geçişli fiillerden sonra nesne her zaman Biernik\'ten Dopełniacz\'a geçer: Mam czas → Nie mam czasu.',
        'Pek çok temel fiil doğrudan Dopełniacz ister: szukać (aramak), słuchać (dinlemek), uczyć się (öğrenmek), używać (kullanmak), potrzebować (ihtiyaç duymak), bać się (korkmak).',
        'İyelik / isim tamlaması (-in/-ın): samochód brata (kardeşimin arabası).',
        'Miktar ve yokluk ifadelerinden sonra: Nie ma (yok), dużo pracy (çok iş), kubek kawy.',
      ],
    },
    declension: [
      {
        gender: 'm_anim',
        genderLabel: GENDER_LABELS.m_anim,
        nominative: 'dobry brat / nowy klient',
        inflected: 'dobrego brata / nowego klienta',
        endingRule: {
          en: 'Adj: -ego · Noun: ALWAYS -a (for people & animals)',
          ru: 'Прил.: -ego · Сущ.: ВСЕГДА -a (для людей и животных)',
          tr: 'Sıfat: -ego · İsim: HER ZAMAN -a (insan ve hayvanlar için)',
        },
        miniExample: {
          pl: 'Dzwonię do dobrego brata.',
          tr: { en: 'I am calling my good brother.', ru: 'Я звоню доброму брату.', tr: 'İyi kardeşimi arıyorum.' },
        },
      },
      {
        gender: 'm_inanim',
        genderLabel: GENDER_LABELS.m_inanim,
        nominative: 'nowy telefon / ten sklep',
        inflected: 'nowego telefonu / tego sklepu',
        endingRule: {
          en: 'Adj: -ego · Noun: -u (abstract, loanwords, places) or -a (tools, body parts, months)',
          ru: 'Прил.: -ego · Сущ.: -u (абстрактные, транспорт, места) или -a (предметы, месяцы, города на -ów/-sk)',
          tr: 'Sıfat: -ego · İsim: -u (soyut, mekan, ulaşım) veya -a (eşyalar, aylar)',
        },
        miniExample: {
          pl: 'Szukam nowego telefonu.',
          tr: { en: 'I am looking for a new phone.', ru: 'Я ищу новый телефон.', tr: 'Yeni bir telefon arıyorum.' },
        },
      },
      {
        gender: 'f',
        genderLabel: GENDER_LABELS.f,
        nominative: 'dobra praca / polska muzyka',
        inflected: 'dobrej pracy / polskiej muzyki',
        endingRule: {
          en: 'Adj: -ej · Noun: -y (after hard consonant) or -i (after k, g, l, j, soft consonant)',
          ru: 'Прил.: -ej · Сущ.: -y (после твёрдых) или -i (после k, g, l, j и мягких)',
          tr: 'Sıfat: -ej · İsim: -y (sert ünsüzden sonra) veya -i (k, g ve yumuşak ünsüzden sonra)',
        },
        miniExample: {
          pl: 'Szukam dobrej pracy i słucham polskiej muzyki.',
          tr: { en: 'I look for a good job and listen to Polish music.', ru: 'Я ищу хорошую работу и слушаю польскую музыку.', tr: 'İyi bir iş arıyorum ve Lehçe müzik dinliyorum.' },
        },
      },
      {
        gender: 'n',
        genderLabel: GENDER_LABELS.n,
        nominative: 'nowe mieszkanie / małe okno',
        inflected: 'nowego mieszkania / małego okna',
        endingRule: {
          en: 'Adj: -ego · Noun: -a (for -o/-e nouns)',
          ru: 'Прил.: -ego · Сущ.: ВСЕГДА -a (для слов на -o / -e)',
          tr: 'Sıfat: -ego · İsim: HER ZAMAN -a (-o / -e ile bitenler için)',
        },
        miniExample: {
          pl: 'Szukamy nowego mieszkania w centrum.',
          tr: { en: 'We are looking for a new apartment in the center.', ru: 'Мы ищем новую квартиру в центре.', tr: 'Merkezde yeni bir daire arıyoruz.' },
        },
      },
      {
        gender: 'pl',
        genderLabel: GENDER_LABELS.pl,
        nominative: 'nowe słowa / dobrzy studenci',
        inflected: 'nowych słów / dobrych studentów',
        endingRule: {
          en: 'Adj: -ych / -ich · Noun: -ów (masc.) or zero ending -Ø (fem./neuter) or -y/-i',
          ru: 'Прил.: -ych / -ich · Сущ.: -ów (муж. род), нулевое окончание -Ø (жен. и ср. род: kobiet, słów) или -y/-i',
          tr: 'Sıfat: -ych / -ich · İsim: -ów (eril), eksiz kök (dişil/nötr: słów) veya -y/-i',
        },
        miniExample: {
          pl: 'Uczę się nowych słów.',
          tr: { en: 'I am learning new words.', ru: 'Я учу новые слова.', tr: 'Yeni kelimeler öğreniyorum.' },
        },
      },
    ],
    commonPhrases: [
      {
        pl: 'Nie ma problemu!',
        formula: 'Nie ma + Dopełniacz',
        tr: { en: 'No problem!', ru: 'Нет проблем! (Не за что!)', tr: 'Sorun değil!' },
        note: {
          en: 'Absence in the present tense is always expressed with "Nie ma" + Genitive.',
          ru: 'Отсутствие чего-либо («нет») всегда выражается через «Nie ma» + Родительный падеж.',
          tr: '"Yok" anlamı her zaman "Nie ma" + Dopełniacz ile ifade edilir.',
        },
      },
      {
        pl: 'Wszystkiego najlepszego!',
        formula: '(Życzę) + Dopełniacz',
        tr: { en: 'All the best! (Happy birthday!)', ru: 'Всего наилучшего!', tr: 'Her şeyin en iyisini dilerim! (Mutlu yıllar!)' },
        note: {
          en: 'Short for "Życzę ci wszystkiego najlepszego" — życzyć requires the Genitive.',
          ru: 'Сокращение от «Życzę ci wszystkiego najlepszego» — глагол życzyć требует Родительного падежа.',
          tr: '"Życzę" (dilerim) fiili Dopełniacz istediği için dilek kalıpları bu hâldedir.',
        },
      },
      {
        pl: 'Szukam taniego mieszkania.',
        formula: 'szukać + Dopełniacz',
        tr: { en: 'I am looking for a cheap apartment.', ru: 'Я ищу недорогую квартиру.', tr: 'Ucuz bir daire arıyorum.' },
        note: {
          en: 'Remember: szukać never takes the Accusative.',
          ru: 'Запомните: после szukać всегда Родительный падеж, даже для конкретных вещей.',
          tr: 'szukać fiili her zaman Dopełniacz alır.',
        },
      },
    ],
  },

  /* ========================================================================
   * 3. CELOWNIK (Dative)
   * ======================================================================== */
  dative: {
    case: 'dative',
    prepositions: [
      { prep: 'dzięki', meaning: { en: 'thanks to', ru: 'благодаря (кому? чему?)', tr: 'sayesinde' }, example: 'Dzięki twojej pomocy' },
      { prep: 'przeciwko', meaning: { en: 'against', ru: 'против (кого? чего?)', tr: 'karşı (-e karşı)' }, example: 'Nie mam nic przeciwko temu' },
      { prep: 'wbrew', meaning: { en: 'contrary to', ru: 'вопреки', tr: 'rağmen, aksine' }, example: 'Wbrew przepisom' },
    ],
    whenToUse: {
      en: [
        'Indirect object — the recipient or beneficiary of an action (dać komuś, powiedzieć komuś, pokazać komuś).',
        'Required by key verbs where English uses a direct object: pomagać (help), dziękować (thank), ufać (trust), wierzyć (believe), przeszkadzać (bother), gratulować komuś (congratulate someone).',
        'Impersonal expressions of state and feeling: Zimno mi (I am cold), Wydaje mi się (It seems to me), Podoba mi się (I like), Smakuje mi (It tastes good to me).',
      ],
      ru: [
        'Косвенное дополнение — адресат действия (кому? чему?): dać (дать), powiedzieć (сказать), pokazać (показать), wysłać (отправить), pożyczyć (одолжить).',
        'Глаголы, требующие Celownik (внимание на «dziękować»!): pomagać (помогать кому), dziękować (благодарить кого — в польском КОМУ!), ufać (доверять), wierzyć (верить), dziwić się (удивляться).',
        'Безличные конструкции состояния: Zimno mi (мне холодно), Nudzi mi się (мне скучно), Podoba mi się (мне нравится), Zależy mi (мне важно).',
      ],
      tr: [
        'Dolaylı tümleç — eylemin yöneldiği kişi (kime? neye?): dać (vermek), powiedzieć (söylemek), pokazać (göstermek).',
        'Yönelme isteyen fiiller: pomagać (yardım etmek), dziękować (teşekkür etmek), ufać (güvenmek), wierzyć (inanmak), przeszkadzać (rahatsız etmek).',
        'Kişisiz durum ve his kalıpları: Zimno mi (üşüyorum), Podoba mi się (hoşuma gidiyor), Wydaje mi się (bana öyle geliyor ki).',
      ],
    },
    alternationNote: {
      en: 'Feminine nouns in -a soften their stem consonant before -ie/-y: k → c (matka → matce), g → dz (koleżanka → koleżance, droga → drodze), r → rz (siostra → siostrze), t → ci (kobieta → kobiecie).',
      ru: 'Важно! В женском роде перед окончанием -ie/-y происходит чередование согласной основы: k → c (matka → matce, Polska → Polsce), g → dz (koleżanka → koleżance), r → rz (siostra → siostrze), m → mi (mama → mamie).',
      tr: 'Dikkat! Dişil (-a ile biten) isimlerde -ie/-y ekinden önce ünsüz yumuşaması olur: k → c (matka → matce), g → dz (koleżanka → koleżance), r → rz (siostra → siostrze), m → mi (mama → mamie).',
    },
    declension: [
      {
        gender: 'm_anim',
        genderLabel: GENDER_LABELS.m_anim,
        nominative: 'dobry kolega / młodszy brat',
        inflected: 'dobremu koledze / młodszemu bratu',
        endingRule: {
          en: 'Adj: -emu · Noun: -owi (most nouns: studentowi) or -u (short nouns: bratu, ojcu, psu, panu)',
          ru: 'Прил.: -emu · Сущ.: -owi (большинство: studentowi, szefowi) или -u (короткие слова: bratu, ojcu, psu, panu, chłopcu)',
          tr: 'Sıfat: -emu · İsim: -owi (çoğu isim: studentowi) veya -u (kısa kelimeler: bratu, ojcu, psu, panu)',
        },
        miniExample: {
          pl: 'Pomagam młodszemu bratu.',
          tr: { en: 'I help my younger brother.', ru: 'Я помогаю младшему брату.', tr: 'Küçük kardeşime yardım ediyorum.' },
        },
      },
      {
        gender: 'm_inanim',
        genderLabel: GENDER_LABELS.m_inanim,
        nominative: 'nowy projekt',
        inflected: 'nowemu projektowi',
        endingRule: {
          en: 'Adj: -emu · Noun: -owi',
          ru: 'Прил.: -emu · Сущ.: -owi',
          tr: 'Sıfat: -emu · İsim: -owi',
        },
        miniExample: {
          pl: 'Poświęcam czas nowemu projektowi.',
          tr: { en: 'I dedicate time to the new project.', ru: 'Я посвящаю время новому проекту.', tr: 'Yeni projeye zaman ayırıyorum.' },
        },
      },
      {
        gender: 'f',
        genderLabel: GENDER_LABELS.f,
        nominative: 'moja mama / młodsza siostra',
        inflected: 'mojej mamie / młodszej siostrze',
        endingRule: {
          en: 'Adj: -ej · Noun: -ie (with consonant softening) or -y / -i',
          ru: 'Прил.: -ej · Сущ.: -ie (с чередованием основы: mama → mamie, siostra → siostrze) или -y / -i (praca → pracy)',
          tr: 'Sıfat: -ej · İsim: -ie (ünsüz yumuşamasıyla: mamie, siostrze) veya -y / -i (pracy)',
        },
        miniExample: {
          pl: 'Dziękuję mojej mamie za wszystko.',
          tr: { en: 'I thank my mom for everything.', ru: 'Я благодарю свою маму за всё.', tr: 'Anneme her şey için teşekkür ediyorum.' },
        },
      },
      {
        gender: 'n',
        genderLabel: GENDER_LABELS.n,
        nominative: 'małe dziecko / nowe państwo',
        inflected: 'małemu dziecku / nowemu państwu',
        endingRule: {
          en: 'Adj: -emu · Noun: ALWAYS -u',
          ru: 'Прил.: -emu · Сущ.: ВСЕГДА -u (dziecku, oknu, mieszkaniu)',
          tr: 'Sıfat: -emu · İsim: HER ZAMAN -u (dziecku, mieszkaniu)',
        },
        miniExample: {
          pl: 'Daję zabawkę małemu dziecku.',
          tr: { en: 'I give a toy to the small child.', ru: 'Я даю игрушку маленькому ребёнку.', tr: 'Küçük çocuğa oyuncak veriyorum.' },
        },
      },
      {
        gender: 'pl',
        genderLabel: GENDER_LABELS.pl,
        nominative: 'nasi rodzice / nowi klienci',
        inflected: 'naszym rodzicom / nowym klientom',
        endingRule: {
          en: 'Adj: -ym / -im · Noun: ALWAYS -om (for all genders!)',
          ru: 'Прил.: -ym / -im · Сущ.: ВСЕГДА -om (для всех родов без исключений!)',
          tr: 'Sıfat: -ym / -im · İsim: HER ZAMAN -om (tüm cinsiyetler için istisnasız!)',
        },
        miniExample: {
          pl: 'Wysyłamy ofertę nowym klientom.',
          tr: { en: 'We send the offer to new clients.', ru: 'Мы отправляем предложение новым клиентам.', tr: 'Yeni müşterilere teklif gönderiyoruz.' },
        },
      },
    ],
    commonPhrases: [
      {
        pl: 'Dziękuję ci (tobie) / Dziękuję pani!',
        formula: 'dziękować + Celownik (mi, ci, mu, jej, nam, wam, im)',
        tr: { en: 'Thank you! / Thank you, ma’am!', ru: 'Спасибо тебе! / Спасибо вам (пани)!', tr: 'Sana / Size teşekkür ederim!' },
        note: {
          en: 'Pronouns in Dative have short unstressed forms (mi, ci, mu) and long stressed forms (mnie, tobie, jemu).',
          ru: 'Местоимения в дательном имеют краткую форму (mi, ci, mu — внутри фразы) и полную ударную (mnie, tobie, jemu — в начале фразы или после предлога).',
          tr: 'Zamirlerin Celownik hâlinde kısa (mi, ci, mu) ve vurgulu uzun (mnie, tobie, jemu) biçimleri vardır.',
        },
      },
      {
        pl: 'Czy możesz mi pomóc?',
        formula: 'pomóc + Celownik',
        tr: { en: 'Can you help me?', ru: 'Можешь мне помочь?', tr: 'Bana yardım edebilir misin?' },
        note: {
          en: 'pomagać / pomóc always governs the Dative.',
          ru: 'Глагол pomagać / pomóc всегда управляет дательным падежом.',
          tr: 'pomagać / pomóc her zaman Celownik ister.',
        },
      },
      {
        pl: 'Wydaje mi się, że masz rację.',
        formula: 'Wydaje + Celownik + się',
        tr: { en: 'It seems to me that you are right.', ru: 'Мне кажется, что ты прав.', tr: 'Bana öyle geliyor ki haklısın.' },
        note: {
          en: 'Very common conversational starter using Dative.',
          ru: 'Одна из самых частых разговорных фраз («Мне кажется...»).',
          tr: 'Günlük konuşmada çok sık kullanılan "Bana göre / Sanırım" kalıbı.',
        },
      },
    ],
  },

  /* ========================================================================
   * 4. BIERNIK (Accusative)
   * ======================================================================== */
  accusative: {
    case: 'accusative',
    prepositions: [
      { prep: 'na', meaning: { en: 'onto, for (direction, event, waiting)', ru: 'на (куда? на мероприятие; ждать кого)', tr: '-e/-a (etkinlik, yön), için' }, example: 'Czekam na autobus / Idę na kawę' },
      { prep: 'w', meaning: { en: 'into, on (days of week, games)', ru: 'в (дни недели, игры)', tr: '-de (günler), oyun oynamak' }, example: 'W sobotę / Gram w piłkę' },
      { prep: 'o', meaning: { en: 'for, about (with ask, fight, worry)', ru: 'о, про, за (с глаголами просить, спрашивать, переживать)', tr: 'için, hakkında (sormak, istemek)' }, example: 'Proszę o pomoc / Pytam o drogę' },
      { prep: 'za', meaning: { en: 'for (payment, thanks, apology)', ru: 'за (оплата, благодарность, извинение)', tr: 'için (ödeme, teşekkür, özür)' }, example: 'Płacę za obiad / Dziękuję za pomoc' },
      { prep: 'przez', meaning: { en: 'through, for (duration), because of', ru: 'через, в течение (времени), из-за', tr: 'boyunca, içinden, yüzünden' }, example: 'Przez cały dzień / Przez park' },
    ],
    whenToUse: {
      en: [
        'Direct object of affirmative transitive verbs: czytać (read), pisać (write), pić (drink), jeść (eat), kupować (buy), widzieć (see), znać (know), lubić (like), kochać (love), mieć (have).',
        'Remember: as soon as you add "nie" to a direct-object verb, Biernik turns into Dopełniacz (Mam czas → Nie mam czasu)!',
        'After prepositions of motion/direction (na, w, przez) and verb-governed prepositions (czekać na, prosić o, pytać o, płacić za, dziękować za, wierzyć w). Prepositional Biernik does NOT change under negation!',
      ],
      ru: [
        'Прямое дополнение переходных глаголов в утвердительных предложениях: czytać, pisać, pić, jeść, kupować, widzieć, znać, lubić, kochać, mieć.',
        'Золотое правило: при отрицании («nie») прямое дополнение без предлога переходит из Винительного (Biernik) в Родительный (Dopełniacz): Piję kawę → Nie piję kawy!',
        'С предлогами направления и времени (w poniedziałek, na koncert, przez godzinę) и в предложном управлении глаголов (czekać na, prosić o, pytać o, płacić za, martwić się o). После предлога отрицание падеж НЕ меняет!',
      ],
      tr: [
        'Olumlu geçişli fiillerin doğrudan nesnesi: czytać (okumak), pisać (yazmak), pić (içmek), jeść (yemek), kupować (satın almak), widzieć (görmek), lubić (sevmek), mieć (sahip olmak).',
        'Altın kural: Edat olmayan bir Biernik cümlesi "nie" ile olumsuz yapıldığında nesne Dopełniacz\'a dönüşür: Piję kawę → Nie piję kawy!',
        'Edatlı fiil yönetimlerinde (czekać na, prosić o, pytać o, płacić za) edat olduğu için olumsuz cümlede de Biernik korunur.',
      ],
    },
    declension: [
      {
        gender: 'm_anim',
        genderLabel: GENDER_LABELS.m_anim,
        nominative: 'dobry brat / mały pies',
        inflected: 'dobrego brata / małego psa',
        endingRule: {
          en: 'Equals GENITIVE! Adj: -ego · Noun: -a',
          ru: 'Совпадает с РОДИТЕЛЬНЫМ! Прил.: -ego · Сущ.: -a (как в русском «вижу брата»)',
          tr: 'DOPEŁNIACZ ile aynıdır! Sıfat: -ego · İsim: -a',
        },
        miniExample: {
          pl: 'Widzę dobrego brata i małego psa.',
          tr: { en: 'I see my good brother and a small dog.', ru: 'Я вижу доброго брата и маленькую собаку.', tr: 'İyi kardeşimi ve küçük köpeği görüyorum.' },
        },
      },
      {
        gender: 'm_inanim',
        genderLabel: GENDER_LABELS.m_inanim,
        nominative: 'nowy samochód / ten autobus',
        inflected: 'nowy samochód / ten autobus',
        endingRule: {
          en: 'Equals NOMINATIVE! No change (Exception: sports, dances, brands, food often take -a: jem banana, gram w tenisa)',
          ru: 'Совпадает с ИМЕНИТЕЛЬНЫМ! Форма не меняется (Исключение: фрукты, грибы, игры, марки авто часто берут -a: jem banana, mam iPhone’a)',
          tr: 'MIANOWNIK (yalın hâl) ile aynıdır, değişmez! (İstisna: meyveler, oyunlar ve markalar genelde -a alır: jem banana)',
        },
        miniExample: {
          pl: 'Kupuję nowy samochód. Czekam na ten autobus.',
          tr: { en: 'I am buying a new car. I wait for this bus.', ru: 'Я покупаю новую машину. Я жду этот автобус.', tr: 'Yeni araba alıyorum. Bu otobüsü bekliyorum.' },
        },
      },
      {
        gender: 'f',
        genderLabel: GENDER_LABELS.f,
        nominative: 'dobra kawa / ta książka',
        inflected: 'dobrą kawę / tę książkę',
        endingRule: {
          en: 'Adj: -ą · Noun: -ę (for -a nouns; consonant nouns like "noc, wiadomość" stay unchanged; note: ta → tę!)',
          ru: 'Прил.: -ą · Сущ.: -ę (для слов на -a; слова на согласный типа noc, wiadomość не меняются; местоимение ta → tę!)',
          tr: 'Sıfat: -ą · İsim: -ę (-a ile bitenler için; ünsüzle biten "wiadomość, noc" değişmez; ta → tę olur!)',
        },
        miniExample: {
          pl: 'Piję dobrą kawę i czytam tę książkę.',
          tr: { en: 'I drink good coffee and read this book.', ru: 'Я пью хороший кофе и читаю эту книгу.', tr: 'İyi kahve içiyorum ve bu kitabı okuyorum.' },
        },
      },
      {
        gender: 'n',
        genderLabel: GENDER_LABELS.n,
        nominative: 'nowe mieszkanie / trudne pytanie',
        inflected: 'nowe mieszkanie / trudne pytanie',
        endingRule: {
          en: 'Equals NOMINATIVE! Always unchanged (-e / -o)',
          ru: 'Совпадает с ИМЕНИТЕЛЬНЫМ! Никогда не меняется (-e / -o)',
          tr: 'MIANOWNIK ile birebir aynıdır! Hiç değişmez (-e / -o)',
        },
        miniExample: {
          pl: 'Rozumiem to trudne pytanie.',
          tr: { en: 'I understand this difficult question.', ru: 'Я понимаю этот сложный вопрос.', tr: 'Bu zor soruyu anlıyorum.' },
        },
      },
      {
        gender: 'pl',
        genderLabel: GENDER_LABELS.pl,
        nominative: 'nowe plany / dobrzy znajomi',
        inflected: 'nowe plany / dobrych znajomych',
        endingRule: {
          en: 'Non-virile (things, women, animals): = Nominative (nowe plany) · Virile (men): = Genitive (-ych/-ich, -ów)',
          ru: 'Не муж.-личн. (предметы, женщины, животные): = Именительный (widzę koty, kobiety) · Муж.-личн. (группы с мужчинами): = Родительный (widzę dobrych znajomych)',
          tr: 'Erkek-kişi dışı çoğul: = Mianownik (nowe plany) · Erkek-kişi çoğul: = Dopełniacz (dobrych znajomych)',
        },
        miniExample: {
          pl: 'Mam nowe plany. Odwiedzam dobrych znajomych.',
          tr: { en: 'I have new plans. I visit good friends.', ru: 'У меня новые планы. Я навещаю хороших знакомых.', tr: 'Yeni planlarım var. İyi tanıdıklarımı ziyaret ediyorum.' },
        },
      },
    ],
    commonPhrases: [
      {
        pl: 'Poproszę czarną kawę.',
        formula: 'Poproszę + Biernik (lub o + Biernik)',
        tr: { en: 'A black coffee, please.', ru: 'Чёрный кофе, пожалуйста.', tr: 'Sade bir kahve lütfen.' },
        note: {
          en: 'The standard way to order in cafés, restaurants, and shops.',
          ru: 'Самая частая фраза для заказа в кафе, магазине или кассе.',
          tr: 'Kafe, restoran ve mağazalarda sipariş verirken kullanılan en yaygın kalıp.',
        },
      },
      {
        pl: 'Czekam na ciebie przed kinem.',
        formula: 'czekać na + Biernik',
        tr: { en: 'I am waiting for you in front of the cinema.', ru: 'Я жду тебя перед кинотеатром.', tr: 'Sinemanın önünde seni bekliyorum.' },
        note: {
          en: 'Always include the preposition "na" after czekać.',
          ru: 'После czekać обязательно ставится предлог «na» + Винительный падеж.',
          tr: 'czekać fiilinden sonra her zaman "na" edatı gelir.',
        },
      },
      {
        pl: 'Mam na imię Anna.',
        formula: 'mieć na + Biernik',
        tr: { en: 'My name is Anna.', ru: 'Меня зовут Анна.', tr: 'Benim adım Anna.' },
        note: {
          en: 'Literally: "I have for a name Anna."',
          ru: 'Дословно: «Имею на имя Анна».',
          tr: 'Kelimesi kelimesine: "İsim olarak Anna\'ya sahibim."',
        },
      },
    ],
  },

  /* ========================================================================
   * 5. NARZĘDNIK (Instrumental)
   * ======================================================================== */
  instrumental: {
    case: 'instrumental',
    prepositions: [
      { prep: 'z / ze', meaning: { en: 'with (accompaniment)', ru: 'с (кем? чем? — совместно)', tr: '-le/-la (ile, birlikte)' }, example: 'Rozmawiam z szefem / Kawa z mlekiem' },
      { prep: 'nad', meaning: { en: 'above, over, on (working on), at (sea)', ru: 'над (чем-то), на (море)', tr: 'üzerinde, deniz kenarında' }, example: 'Pracuję nad projektem / Nad morzem' },
      { prep: 'pod', meaning: { en: 'under, near', ru: 'под', tr: 'altında' }, example: 'Klucz jest pod wycieraczką' },
      { prep: 'przed', meaning: { en: 'in front of, before', ru: 'перед (местом или временем)', tr: 'önünde, -den önce' }, example: 'Przed domem / Przed pracą' },
      { prep: 'za', meaning: { en: 'behind, longing for (tęsknić za)', ru: 'за (местом), по (скучать по — tęsknić za!)', tr: 'arkasında, özlemek (tęsknić za)' }, example: 'Tęsknię za rodziną / Za rogiem' },
      { prep: 'między', meaning: { en: 'between, among', ru: 'между', tr: 'arasında' }, example: 'Między nami' },
    ],
    whenToUse: {
      en: [
        'Professions, nationalities, and roles after "być" (to be) and "zostać" (to become): Jestem programistą, Ona jest Polką, Chcę zostać lekarzem.',
        'Means of transport and tools (without a preposition!): jadę pociągiem (by train), lecę samolotem (by plane), płacę kartą (by card), piszę długopisem (with a pen).',
        'Required by reflexive verbs of interest and care: interesować się (be interested in), zajmować się (deal with), opiekować się (take care of), martwić się / denerwować się (worry about).',
        'After "z" (with) and spatial prepositions (nad, pod, przed, za, między).',
      ],
      ru: [
        'Профессия, национальность, статус после глаголов «być» (быть) и «zostać» (стать) ДАЖЕ В НАСТОЯЩЕМ ВРЕМЕНИ: Jestem studentem (Я студент), Ona jest lekarką.',
        'Транспорт и инструмент действия (БЕЗ предлога!): jadę pociągiem / autobusem / metrem (еду на поезде / автобусе / метро), płacę kartą (плачу картой).',
        'Управление важных возвратных глаголов: interesować się (интересоваться), zajmować się (заниматься), opiekować się (заботиться о ком-то — в польском КЕМ!), tęsknić za (скучать по кому-то).',
        'После предлога «z» (с кем/чем) и предлогов места «nad, pod, przed, za, między».',
      ],
      tr: [
        '"być" (olmak) ve "zostać" fiillerinden sonra meslek, milliyet ve kimlik bildirirken: Jestem inżynierem (Mühendisim).',
        'Ulaşım araçları ve aletlerle (edatsız!): jadę pociągiem (trenle gidiyorum), płacę kartą (kartla ödüyorum).',
        'Önemli dönüşlü fiillerle: interesować się (ilgilenmek), zajmować się (uğraşmak), opiekować się (bakmak/ilgilenmek), tęsknić za (özlemek).',
        '"z" (ile) ve yer edatlarından (nad, pod, przed, za, między) sonra.',
      ],
    },
    declension: [
      {
        gender: 'm_anim',
        genderLabel: GENDER_LABELS.m_anim,
        nominative: 'dobry lekarz / mój brat',
        inflected: 'dobrym lekarzem / moim bratem',
        endingRule: {
          en: 'Adj: -ym / -im · Noun: -em (or -iem after k/g: Polakiem; -ą for -a nouns: kolegą)',
          ru: 'Прил.: -ym / -im · Сущ.: -em (после k/g → -iem: Polakiem; слова на -a берут -ą: kolegą, kierowcą)',
          tr: 'Sıfat: -ym / -im · İsim: -em (k/g sonrası -iem: Polakiem; -a ile bitenler -ą: kolegą)',
        },
        miniExample: {
          pl: 'Rozmawiam z dobrym lekarzem i moim bratem.',
          tr: { en: 'I am talking with a good doctor and my brother.', ru: 'Я разговариваю с хорошим врачом и моим братом.', tr: 'İyi bir doktorla ve kardeşimle konuşuyorum.' },
        },
      },
      {
        gender: 'm_inanim',
        genderLabel: GENDER_LABELS.m_inanim,
        nominative: 'szybki pociąg / nowy projekt',
        inflected: 'szybkim pociągiem / nowym projektem',
        endingRule: {
          en: 'Adj: -ym / -im · Noun: -em (-iem after k, g)',
          ru: 'Прил.: -ym / -im · Сущ.: -em (после k, g → -iem: pociągiem, rokiem)',
          tr: 'Sıfat: -ym / -im · İsim: -em (k, g sonrası -iem: pociągiem)',
        },
        miniExample: {
          pl: 'Jadę szybkim pociągiem.',
          tr: { en: 'I am going by fast train.', ru: 'Я еду на скоростном поезде.', tr: 'Hızlı trenle gidiyorum.' },
        },
      },
      {
        gender: 'f',
        genderLabel: GENDER_LABELS.f,
        nominative: 'polska muzyka / dobra przyjaciółka',
        inflected: 'polską muzyką / dobrą przyjaciółką',
        endingRule: {
          en: 'Adj: -ą · Noun: ALWAYS -ą (One of the easiest rules in Polish!)',
          ru: 'Прил.: -ą · Сущ.: ВСЕГДА -ą (И прилагательное, и существительное оканчиваются на -ą!)',
          tr: 'Sıfat: -ą · İsim: HER ZAMAN -ą (Hem sıfat hem isim -ą alır!)',
        },
        miniExample: {
          pl: 'Interesuję się polską muzyką.',
          tr: { en: 'I am interested in Polish music.', ru: 'Я интересуюсь польской музыкой.', tr: 'Lehçe müzikle ilgileniyorum.' },
        },
      },
      {
        gender: 'n',
        genderLabel: GENDER_LABELS.n,
        nominative: 'małe dziecko / nowe metro',
        inflected: 'małym dzieckiem / nowym metrem',
        endingRule: {
          en: 'Adj: -ym / -im · Noun: -em (-iem after k/g)',
          ru: 'Прил.: -ym / -im · Сущ.: -em (после k/g → -iem: dzieckiem)',
          tr: 'Sıfat: -ym / -im · İsim: -em (k/g sonrası -iem: dzieckiem)',
        },
        miniExample: {
          pl: 'Opiekuję się małym dzieckiem.',
          tr: { en: 'I look after a small child.', ru: 'Я присматриваю за маленьким ребёнком.', tr: 'Küçük çocukla ilgileniyorum.' },
        },
      },
      {
        gender: 'pl',
        genderLabel: GENDER_LABELS.pl,
        nominative: 'nasi przyjaciele / nowe pomysły',
        inflected: 'naszymi przyjaciółmi / nowymi pomysłami',
        endingRule: {
          en: 'Adj: -ymi / -imi · Noun: -ami (almost all nouns; a few take -mi: ludźmi, przyjaciółmi, dziećmi)',
          ru: 'Прил.: -ymi / -imi · Сущ.: -ami (почти все слова; несколько частых слов на -mi: ludźmi, przyjaciółmi, dziećmi, pieniędzmi)',
          tr: 'Sıfat: -ymi / -imi · İsim: -ami (neredeyse tüm isimler; birkaç kelimede -mi: ludźmi, przyjaciółmi)',
        },
        miniExample: {
          pl: 'Spotykam się z naszymi przyjaciółmi.',
          tr: { en: 'I am meeting up with our friends.', ru: 'Я встречаюсь с нашими друзьями.', tr: 'Arkadaşlarımızla buluşuyorum.' },
        },
      },
    ],
    commonPhrases: [
      {
        pl: 'Jestem programistą / Jestem nauczycielką.',
        formula: 'być + Narzędnik',
        tr: { en: 'I am a programmer / I am a teacher.', ru: 'Я программист / Я учительница.', tr: 'Ben yazılımcıyım / Ben öğretmenim.' },
        note: {
          en: 'Always use Instrumental when stating your profession or nationality after "być".',
          ru: 'Называя профессию или национальность с глаголом być, всегда ставьте Творительный падеж.',
          tr: 'Meslek veya milliyet söylerken być fiilinden sonra her zaman Narzędnik kullanılır.',
        },
      },
      {
        pl: 'Płacę kartą, nie gotówką.',
        formula: 'płacić + Narzędnik',
        tr: { en: 'I am paying by card, not cash.', ru: 'Я плачу картой, а не наличными.', tr: 'Nakit değil, kartla ödüyorum.' },
        note: {
          en: 'Payment method takes the Instrumental.',
          ru: 'Способ оплаты ставится в Творительном падеже без предлога.',
          tr: 'Ödeme yöntemi edatsız Narzędnik alır.',
        },
      },
      {
        pl: 'Moim zdaniem to świetny plan.',
        formula: 'Moim zdaniem (Narzędnik)',
        tr: { en: 'In my opinion, that is a great plan.', ru: 'По моему мнению (по-моему), это отличный план.', tr: 'Bence (benim fikrimce) bu harika bir plan.' },
        note: {
          en: 'Essential B1/B2 connector meaning "in my opinion".',
          ru: 'Незаменимая вводная конструкция «по моему мнению».',
          tr: '"Bence / kanaatimce" anlamına gelen çok yaygın bir kalıp.',
        },
      },
    ],
  },

  /* ========================================================================
   * 6. MIEJSCOWNIK (Locative)
   * ======================================================================== */
  locative: {
    case: 'locative',
    prepositions: [
      { prep: 'w / we', meaning: { en: 'in, inside (static location, months, years)', ru: 'в (где? в месяце, в году)', tr: '-de/-da (içinde, aylarda)' }, example: 'Mieszkam w Warszawie / W maju' },
      { prep: 'na', meaning: { en: 'on, at (open spaces, events, university)', ru: 'на (где? на улице, на факультете, на встрече)', tr: 'üzerinde, -de (açık alan, üniversite)' }, example: 'Na uniwersytecie / Na dworcu / Na spotkaniu' },
      { prep: 'o', meaning: { en: 'about (topic), at (clock time)', ru: 'о / об (тема мысли или речи), в (котором часу)', tr: 'hakkında, saat ...-de' }, example: 'Myślę o tobie / O ósmej rano' },
      { prep: 'przy', meaning: { en: 'by, near, while doing', ru: 'при, у, за (столом)', tr: 'yanında, başında (masada)' }, example: 'Siedzimy przy stole' },
      { prep: 'po', meaning: { en: 'after (time), around (movement), in (language)', ru: 'после (чего-то), по (гулять по парку, говорить по-польски)', tr: '-den sonra, içinde (parkta gezmek), dilde' }, example: 'Po pracy / Spacer po parku / Mówię po polsku' },
    ],
    whenToUse: {
      en: [
        'NEVER used without a preposition! Only appears after: w, na, o, przy, po.',
        'Static location (Where? Gdzie?): mieszkam w Polsce, pracuję w biurze, studiuję na uniwersytecie, czekam na przystanku.',
        'Topic of thought, speech, or memory after "o": myśleć o (think about), mówić o (talk about), pamiętać o (remember), zapomnieć o (forget about), marzyć o (dream about), wiedzieć o (know about).',
        'Clock time after "o" (o siódmej godzinie) and months after "w" (w styczniu, w sierpniu).',
      ],
      ru: [
        'НИКОГДА не употребляется без предлога! Используется только после 5 предлогов: w, na, o, przy, po.',
        'Местонахождение (Где? Gdzie?): mieszkam w Polsce, pracuję w biurze, jestem na dworcu, studiuję na uniwersytecie.',
        'Объект мысли, речи и памяти с предлогом «o»: myśleć o (думать о), mówić o (говорить о), pamiętać o (помнить о), zapomnieć o (забыть о), marzyć o (мечтать о), wiedzieć o (знать о).',
        'Время по часам с предлогом «o» (o ósmej — в восемь часов) и месяцы с предлогом «w» (w marcu — в марте).',
      ],
      tr: [
        'ASLA edatsız kullanılmaz! Sadece şu 5 edattan sonra gelir: w, na, o, przy, po.',
        'Bulunma yeri (Nerede? Gdzie?): mieszkam w Polsce, pracuję w biurze, jestem na dworcu.',
        'Düşünme, konuşma ve hatırlama konusu ("o" edatıyla): myśleć o (hakkında düşünmek), mówić o (hakkında konuşmak), pamiętać o (hatırlamak), marzyć o (hayal kurmak).',
        'Saatlerde "o" edatıyla (o ósmej = saat sekizde) ve aylarda "w" edatıyla (w maju = mayısta).',
      ],
    },
    alternationNote: {
      en: 'Hard stems take -e/-ie and soften the final consonant (sklep → w sklepie, biuro → w biurze, Polska → w Polsce). Stems ending in k, g, ch, sz, ż, cz, c, j, l take -u (bank → w banku, pociąg → w pociągu, mieszkanie → w mieszkaniu).',
      ru: 'Твёрдые согласные основы перед -ie смягчаются или чередуются: p/b/m/w/n → pi/bi/mi/wi/ni (sklep → w sklepie), t → ci (uniwersytet → na uniwersytecie), d → dzi (wykład → na wykładzie), r → rz (biuro → w biurze). А основы на k, g, ch и шипящие/мягкие в муж. и ср. роде берут просто -u (w banku, w pociągu, w hotelu, w mieszkaniu)!',
      tr: 'Sert ünsüzle biten kökler -ie alır ve yumuşar (sklep → w sklepie, biuro → w biurze). k, g, ch veya yumuşak ünsüzle biten eril/nötr kelimeler ise sadece -u alır (w banku, w hotelu, w mieszkaniu).',
    },
    declension: [
      {
        gender: 'm_anim',
        genderLabel: GENDER_LABELS.m_anim,
        nominative: 'dobry przyjaciel / mój brat',
        inflected: '(o) dobrym przyjacielu / moim bracie',
        endingRule: {
          en: 'Adj: -ym / -im · Noun: -ie (hard stems: brat → bracie) or -u (soft / k, g, ch: przyjacielu, chłopaku)',
          ru: 'Прил.: -ym / -im · Сущ.: -ie (твёрдая основа: brat → bracie) или -u (мягкая основа и k, g, ch: przyjacielu, lekarzu)',
          tr: 'Sıfat: -ym / -im · İsim: -ie (sert kök: bracie) veya -u (yumuşak kök ve k, g, ch: przyjacielu)',
        },
        miniExample: {
          pl: 'Rozmawiamy o moim bracie i dobrym przyjacielu.',
          tr: { en: 'We are talking about my brother and a good friend.', ru: 'Мы говорим о моём брате и хорошем друге.', tr: 'Kardeşim ve iyi bir arkadaşım hakkında konuşuyoruz.' },
        },
      },
      {
        gender: 'm_inanim',
        genderLabel: GENDER_LABELS.m_inanim,
        nominative: 'ten sklep / duży bank',
        inflected: '(w) tym sklepie / dużym banku',
        endingRule: {
          en: 'Adj: -ym / -im · Noun: -ie (sklepie, Krakowie) or -u (after k, g, ch, l, j, sz, cz, ż: banku, hotelu)',
          ru: 'Прил.: -ym / -im · Сущ.: -ie (w sklepie, w Krakowie) или -u (после k, g, ch и мягких/шипящих: w banku, w hotelu, na dworcu)',
          tr: 'Sıfat: -ym / -im · İsim: -ie (w sklepie) veya -u (k, g, ch ve yumuşak ünsüzlerden sonra: w banku, w hotelu)',
        },
        miniExample: {
          pl: 'Pracuję w dużym banku. Kupuję chleb w tym sklepie.',
          tr: { en: 'I work in a big bank. I buy bread in this shop.', ru: 'Я работаю в крупном банке. Покупаю хлеб в этом магазине.', tr: 'Büyük bir bankada çalışıyorum. Ekmeği bu marketten alıyorum.' },
        },
      },
      {
        gender: 'f',
        genderLabel: GENDER_LABELS.f,
        nominative: 'duża firma / nasza praca',
        inflected: '(w) dużej firmie / naszej pracy',
        endingRule: {
          en: 'Equals DATIVE (Celownik)! Adj: -ej · Noun: -ie (firmie, Polsce) or -y / -i (pracy, ulicy)',
          ru: 'Полностью совпадает с ДАТЕЛЬНЫМ (Celownik)! Прил.: -ej · Сущ.: -ie (w firmie, w Polsce) или -y / -i (w pracy, na ulicy)',
          tr: 'CELOWNIK ile birebir aynıdır! Sıfat: -ej · İsim: -ie (w firmie, w Polsce) veya -y / -i (w pracy)',
        },
        miniExample: {
          pl: 'Pracuję w dużej firmie. Myślę o naszej pracy.',
          tr: { en: 'I work in a big company. I think about our work.', ru: 'Я работаю в крупной фирме. Думаю о нашей работе.', tr: 'Büyük bir şirkette çalışıyorum. İşimiz hakkında düşünüyorum.' },
        },
      },
      {
        gender: 'n',
        genderLabel: GENDER_LABELS.n,
        nominative: 'nowoczesne biuro / nowe mieszkanie',
        inflected: '(w) nowoczesnym biurze / nowym mieszkaniu',
        endingRule: {
          en: 'Adj: -ym / -im · Noun: -ie (for -o: biurze, oknie) or -u (for -e / k, g, ch: mieszkaniu, lotnisku, centrum - unchanged)',
          ru: 'Прил.: -ym / -im · Сущ.: -ie (для слов на -o: w biurze, w oknie) или -u (для слов на -e и k, g, ch: w mieszkaniu, na lotnisku; слова на -um не меняются: w centrum)',
          tr: 'Sıfat: -ym / -im · İsim: -ie (-o ile bitenler: w biurze) veya -u (-e ve k, g, ch ile bitenler: w mieszkaniu, na lotnisku)',
        },
        miniExample: {
          pl: 'Mieszkam w nowym mieszkaniu i pracuję w nowoczesnym biurze.',
          tr: { en: 'I live in a new apartment and work in a modern office.', ru: 'Я живу в новой квартире и работаю в современном офисе.', tr: 'Yeni bir dairede yaşıyorum ve modern bir ofiste çalışıyorum.' },
        },
      },
      {
        gender: 'pl',
        genderLabel: GENDER_LABELS.pl,
        nominative: 'ciekawe podróże / inne kraje',
        inflected: '(o) ciekawych podróżach / (w) innych krajach',
        endingRule: {
          en: 'Adj: -ych / -ich · Noun: ALWAYS -ach (Exceptions: w Niemczech, na Węgrzech, we Włoszech)',
          ru: 'Прил.: -ych / -ich · Сущ.: ВСЕГДА -ach для всех родов! (Исключение — 3 страны: w Niemczech, na Węgrzech, we Włoszech)',
          tr: 'Sıfat: -ych / -ich · İsim: HER ZAMAN -ach! (Sadece 3 ülke istisnadır: w Niemczech, na Węgrzech, we Włoszech)',
        },
        miniExample: {
          pl: 'Marzę o ciekawych podróżach.',
          tr: { en: 'I dream about interesting travels.', ru: 'Я мечтаю об интересных путешествиях.', tr: 'İlginç seyahatler hakkında hayal kuruyorum.' },
        },
      },
    ],
    commonPhrases: [
      {
        pl: 'Mieszkam w Polsce, w Warszawie.',
        formula: 'mieszkać w + Miejscownik',
        tr: { en: 'I live in Poland, in Warsaw.', ru: 'Я живу в Польше, в Варшаве.', tr: "Polonya'da, Varşova'da yaşıyorum." },
        note: {
          en: 'Notice the k → c alternation in Polska → w Polsce.',
          ru: 'Обратите внимание на чередование k → c: Polska → w Polsce.',
          tr: 'Polska → w Polsce değişimindeki k → c yumuşamasına dikkat edin.',
        },
      },
      {
        pl: 'Spotkajmy się o siódmej na dworcu.',
        formula: 'o + Miejscownik (czas) / na + Miejscownik (miejsce)',
        tr: { en: "Let's meet at seven at the station.", ru: 'Давай встретимся в семь на вокзале.', tr: 'Saat yedide garda buluşalım.' },
        note: {
          en: 'Hours use "o" + feminine ordinal number in Locative (o siódmej godzinie).',
          ru: 'Часы всегда выражаются через «o» + порядковое числительное жен. рода в Предложном падеже.',
          tr: 'Saatler "o" edatı + dişil sıra sayısının Miejscownik hâli ile söylenir.',
        },
      },
      {
        pl: 'Zależy mi na tej pracy.',
        formula: 'zależeć (komuś) na + Miejscownik',
        tr: { en: 'This job really matters to me.', ru: 'Мне очень важна эта работа (я дорожу этой работой).', tr: 'Bu iş benim için çok önemli.' },
        note: {
          en: 'High-frequency idiomatic construction.',
          ru: 'Очень частая и естественная польская конструкция.',
          tr: 'Lehçede çok sık kullanılan doğal bir deyimsel yapı.',
        },
      },
    ],
  },

  /* ========================================================================
   * 7. WOŁACZ (Vocative)
   * ======================================================================== */
  vocative: {
    case: 'vocative',
    prepositions: [],
    whenToUse: {
      en: [
        'Addressing someone directly by name, title, or affectionate form: Panie profesorze! Pani dyrektor! Mamo! Kochanie!',
        'In official letters and emails: Szanowny Panie! Szanowna Pani! Drodzy Państwo!',
      ],
      ru: [
        'Прямое обращение по имени, титулу или ласковой форме: Panie profesorze! Mamo! Tato! Aniu! Kochanie!',
        'В деловых письмах и обращениях: Szanowny Panie! (Уважаемый господин!), Szanowni Państwo! (Уважаемые дамы и господа!).',
      ],
      tr: [
        'Birine doğrudan isim, unvan veya sevgi sözcüğüyle hitap ederken: Panie profesorze! Mamo! Aniu!',
        'Resmi mektup ve e-posta başlangıçlarında: Szanowny Panie! Szanowni Państwo!',
      ],
    },
    declension: [
      {
        gender: 'm_anim',
        genderLabel: GENDER_LABELS.m_anim,
        nominative: 'pan profesor / Marek',
        inflected: 'panie profesorze! / Marku!',
        endingRule: {
          en: 'Equals LOCATIVE (-ie / -u)! (pan → panie, profesor → profesorze, Marek → Marku)',
          ru: 'Окончания совпадают с ПРЕДЛОЖНЫМ падежом (-ie / -u): pan → panie!, profesor → profesorze!, Marek → Marku!',
          tr: 'Ekleri MIEJSCOWNIK ile aynıdır (-ie / -u): pan → panie!, Marek → Marku!',
        },
        miniExample: {
          pl: 'Dzień dobry, panie profesorze!',
          tr: { en: 'Good morning, Professor!', ru: 'Здравствуйте, господин профессор!', tr: 'İyi günler, профеsör bey!' },
        },
      },
      {
        gender: 'm_inanim',
        genderLabel: GENDER_LABELS.m_inanim,
        nominative: 'mój kraj',
        inflected: 'mój kraju!',
        endingRule: {
          en: 'Same as Locative (-ie / -u), used in poetry.',
          ru: 'Совпадает с Предложным падежом (-ie / -u), встречается в поэзии.',
          tr: 'Miejscownik ile aynıdır (-ie / -u).',
        },
        miniExample: {
          pl: 'Litwo! Ojczyzno moja!',
          tr: { en: 'Lithuania! My homeland! (Adam Mickiewicz)', ru: 'Литва! Моя отчизна! (А. Мицкевич)', tr: 'Litvanya! Vatanım!' },
        },
      },
      {
        gender: 'f',
        genderLabel: GENDER_LABELS.f,
        nominative: 'mama / Anna / Ania (diminutive)',
        inflected: 'mamo! / Anno! / Aniu!',
        endingRule: {
          en: '-o (standard nouns & full names: mamo!, Anno!) or -u (affectionate diminutives in -ia/-sia: Aniu!, Kasiu!, babciu!)',
          ru: '-o (обычные слова и полные имена: mamo!, Anno!) или -u (ласковые имена на -ia/-sia/-cia: Aniu!, Kasiu!, babciu!)',
          tr: '-o (standart isimler: mamo!, Anno!) veya -u (sevgi/küçültme isimleri: Aniu!, Kasiu!)',
        },
        miniExample: {
          pl: 'Cześć, Aniu! Co u ciebie słychać?',
          tr: { en: 'Hi, Ania! How are you doing?', ru: 'Привет, Аня! Как у тебя дела?', tr: 'Merhaba Ania! Nasılsın?' },
        },
      },
      {
        gender: 'n',
        genderLabel: GENDER_LABELS.n,
        nominative: 'kochanie / dziecko',
        inflected: 'kochanie! / dziecko!',
        endingRule: {
          en: 'Equals NOMINATIVE!',
          ru: 'Полностью совпадает с ИМЕНИТЕЛЬНЫМ падежом!',
          tr: 'MIANOWNIK ile aynıdır!',
        },
        miniExample: {
          pl: 'Kochanie, gdzie są klucze?',
          tr: { en: 'Honey, where are the keys?', ru: 'Солнышко (дорогой/дорогая), где ключи?', tr: 'Canım, anahtarlar nerede?' },
        },
      },
      {
        gender: 'pl',
        genderLabel: GENDER_LABELS.pl,
        nominative: 'Szanowni Państwo / Drodzy Przyjaciele',
        inflected: 'Szanowni Państwo! / Drodzy Przyjaciele!',
        endingRule: {
          en: 'Equals NOMINATIVE!',
          ru: 'Всегда совпадает с ИМЕНИТЕЛЬНЫМ падежом!',
          tr: 'Her zaman MIANOWNIK ile aynıdır!',
        },
        miniExample: {
          pl: 'Szanowni Państwo, zaczynamy spotkanie.',
          tr: { en: 'Ladies and Gentlemen, we are starting the meeting.', ru: 'Уважаемые дамы и господа, мы начинаем встречу.', tr: 'Sayın Bayanlar ve Baylar, toplantıya başlıyoruz.' },
        },
      },
    ],
    commonPhrases: [
      {
        pl: 'Przepraszam, proszę pana / proszę pani!',
        formula: 'Panie + Wołacz / Proszę pana (Dopełniacz)',
        tr: { en: 'Excuse me, sir / ma’am!', ru: 'Извините, пожалуйста (обращение к мужчине / женщине)!', tr: 'Affedersiniz beyefendi / hanımefendi!' },
        note: {
          en: 'With a title use Vocative (Panie dyrektorze!), alone use "Proszę pana / pani".',
          ru: 'С должностью или именем используется Звательный (Panie Marku! Pani Anno!), а без имени — вежливая форма «Proszę pana / proszę pani».',
          tr: 'Unvan veya isimle birlikte Wołacz (Panie Marku!), tek başına ise "Proszę pana / pani" kullanılır.',
        },
      },
    ],
  },
};
