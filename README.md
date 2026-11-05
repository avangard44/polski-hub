# Polski Hub — architecture & design

An interactive Polish-learning platform for **English, Russian and Turkish** speakers.
It compares Polish with the learner's own language: every explanation, warning and
"native lens" note is written for that learner's first language (L1).

```bash
npm install
npm run dev        # http://localhost:3000  →  redirects to /en, /ru or /tr
npm run build      # static pre-render of every page × every locale
```

---

## 1. Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15 (App Router, React 19)** | Server Components + SSG/ISR give fast pages that search engines can fully index. Each locale gets its own static URL. |
| i18n | **next-intl v4** | Built for the App Router (works in Server Components). Has ICU plurals (needed for Russian one/few/many), locale-prefixed routing with middleware, typed message keys and hreflang helpers. `next-i18next` is a Pages Router library, so it's a poor fit here. |
| Styling | **Tailwind CSS v4** | Utility classes make it easy to keep a fixed colour per case across the whole site. Small CSS bundle. |
| Language | **TypeScript (strict)** | The content model *is* the product. `Localized<T>` makes a missing translation a compile error. |
| Content (next step) | Typed TS/JSON in Git → **Payload CMS / Sanity** or **PostgreSQL + Drizzle** | Same interfaces, different source. Linguists edit content in a CMS. |
| Search (next step) | **Meilisearch / Typesense** or Postgres `unaccent` + trigram | Search that ignores diacritics (`szukac` → `szukać`) and supports EN/RU/TR glosses. |
| Audio | Recorded files on a CDN (`audioUrl`) → fallback `speechSynthesis('pl-PL')` | Works today. Real recordings can be added verb by verb. |
| Auth / progress (next step) | Auth.js + Postgres, spaced repetition (FSRS) | Flashcard scheduling. |
| Hosting | Vercel / Netlify / any Node host | Static pages are served from the edge. |

### i18n strategy — two separate layers

1. **UI strings** → `messages/{en,ru,tr}.json`. These are loaded by next-intl and typed through `global.d.ts`.
2. **Learning content** → typed data with `Localized<T>` fields (`src/data/*`). The Polish forms are stored **once**. Only the explanations are localized. This lets content move to a CMS later without touching UI translations.

URL scheme: `/{locale}/verbs/{slug}`, e.g. `/ru/verbs/szukac`. The `<html lang>` value and `hreflang` alternates are set per locale. Polish text is wrapped in `lang="pl"` so screen readers and fonts handle it correctly.

> Assumption: UI language = learner's native language. To support e.g. a Turkish
> speaker who wants an English UI, split this into `uiLocale` and `nativeLanguage`.
> The `contrast` field is already keyed separately, so this is a small change.

---

## 2. Data architecture

Full interfaces are in [`src/types/grammar.ts`](src/types/grammar.ts). Main ideas:

- `Localized<T> = Record<'en'|'ru'|'tr', T>`: one value per learner language.
- `VerbEntry.aspects`: the **aspect pair** as one learning unit (`imperfective` / `perfective`, either may be missing, e.g. *bać się*).
- `GovernmentPattern` (**rekcja**): case + optional preposition + case question + negation behaviour + **contrastive note keyed by L1**. A verb can have several patterns (*pomagać **komu** **w czym***).
- `ExampleSentence.segments`: sentences are pre-segmented. Each governed word links to its pattern through `patternId`, so the UI can colour it and connect it back to its case node. An optional `negated` version demonstrates the *Genitive of negation*.

### Example: `szukać` (abridged JSON)

```json
{
  "slug": "szukac",
  "level": "A1",
  "translation": { "en": "to look for", "ru": "искать", "tr": "aramak" },
  "aspects": {
    "imperfective": {
      "infinitive": "szukać",
      "present": { "1sg": "szukam", "2sg": "szukasz", "3sg": "szuka",
                   "1pl": "szukamy", "2pl": "szukacie", "3pl": "szukają" },
      "future":  { "1sg": "będę szukać", "...": "..." },
      "past": { "masculine": { "1sg": "szukałem", "3pl": "szukali", "...": "..." },
                "feminine":  { "1sg": "szukałam", "3pl": "szukały", "...": "..." } },
      "imperative": { "2sg": "szukaj", "1pl": "szukajmy", "2pl": "szukajcie" }
    },
    "perfective": { "infinitive": "poszukać", "future": { "1sg": "poszukam", "...": "..." } }
  },
  "government": [
    {
      "id": "szukac-gen",
      "case": "genitive",
      "question": "kogo? czego?",
      "negation": "unchanged",
      "meaning": { "en": "to look for sb/sth", "ru": "искать кого-то/что-то", "tr": "birini/bir şeyi aramak" },
      "contrast": {
        "en": { "equivalent": "look for + object", "level": "mismatch",
                "note": "No preposition in Polish — the object goes into the Genitive: szukam pracy." },
        "ru": { "equivalent": "искать + В. п.", "level": "partial",
                "note": "В польском всегда родительный: szukam pracy (не *szukam pracę)." },
        "tr": { "equivalent": "aramak + -ı / yalın", "level": "mismatch",
                "note": "Belirli/belirsiz fark etmez: her zaman Dopełniacz — szukam pracy." }
      },
      "examples": [
        {
          "id": "szukac-e1",
          "segments": [
            { "text": "Szukam ", "role": "verb" },
            { "text": "pracy", "role": "object", "case": "genitive", "lemma": "praca", "patternId": "szukac-gen" },
            { "text": "." }
          ],
          "translation": { "en": "I'm looking for a job.", "ru": "Я ищу работу.", "tr": "İş arıyorum." }
        }
      ]
    }
  ]
}
```

The `level` field (`match` / `partial` / `mismatch`) drives the colour of the "native lens" badge. So the same verb shows **green to a Russian speaker** (*pomagać + Dat* = помогать + Д. п.) and **red to an English speaker** (*help him* ≠ *pomagam mu*).

---

## 3. UI/UX wireframe — "Verb & Case" page (`/[locale]/verbs/[slug]`)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ Polski Hub        Cases  Verbs  Vocabulary                    [EN|RU|TR]     │
├──────────────────────────────────────────────────────────┬───────────────────┤
│ ← All verbs                                              │ NATIVE LENS  ● red│
│ ┌──────────────────────────────────────────────────────┐ │ look for + object │
│ │ szukać  🔊                                        A1 │ │ "No preposition…  │
│ │ to look for, to search                               │ │  *szukam pracę ✗" │
│ │ [ Imperfective: szukać ][ Perfective: poszukać ]     │ ├───────────────────┤
│ └──────────────────────────────────────────────────────┘ │ CONJUGATION       │
│ ┌ CASE GOVERNMENT (rekcja) ────────────────────────────┐ │ [Pres|Past|Fut|Imp│
│ │ [szukać]━━━━━━━━━━━━━━━━━━━━▶[ Dopełniacz          ] │ │ ja      szukam    │
│ │                              [ kogo? czego? · Gen. ] │ │ ty      szukasz…  │
│ │ szukać + Dopełniacz — to look for sb/sth             │ ├───────────────────┤
│ └──────────────────────────────────────────────────────┘ │ ASPECT IN CONTEXT │
│ ┌ EXAMPLES                  (Negate nie) (Translations)┐ │ impf: Szukałem    │
│ │ 🔊 Szukam ‗pracy‗.           ← amber underline       │ │  kluczy przez…    │
│ │    I'm looking for a job.     tooltip: praca → pracy │ │ pf:  Poszukam     │
│ │ 🔊 ‗Czego‗ szukasz?                                  │ │  tego w internecie│
│ └──────────────────────────────────────────────────────┘ │                   │
└──────────────────────────────────────────────────────────┴───────────────────┘
```

### How the verb ↔ case links work

1. **Fixed colour per case.** Each case has one colour everywhere: case pages, filters, badges, bridges and underlines (Genitive = amber, Dative = emerald, Accusative = sky, Instrumental = violet, Locative = rose…). Learners start to link the colour with the case.
2. **The government "bridge".** Each `GovernmentPattern` is drawn as **verb node → coloured connector → case node**. A required preposition sits *on the connector* (`czekać ━━(na)━━▶ Biernik`). This shows that the preposition and the case come as a pair.
3. **Linked highlighting both ways.**
   - Hover a **case node** → every word in that case lights up in the examples.
   - Hover / focus a **word** in an example → its case node gets a ring, and a tooltip shows `lemma → form · Dopełniacz · Родительный`.
   - Governed words have a **solid** underline. Words in a case *not* caused by the verb (e.g. *historią **Polski***) have a **dotted** one. This teaches what the verb controls and what it doesn't.
4. **Several patterns = several bridges.** Clicking a bridge (radio group) switches the example set: *pomagać → Celownik* vs *pomagać → w + Miejscownik*.
5. **Negation toggle.** For direct-object verbs (*pić + Biernik*) the "Negate" switch swaps in the negated sentences. The underline turns from sky to amber (*piję kawę → nie piję kawy*) and a note explains the Genitive of negation. For *czekać na* the same toggle shows that the preposition **keeps** the case unchanged.
6. **Native lens (sidebar).** It shows the closest structure in the learner's L1 with a traffic-light badge and the typical interference error. This is the comparative-linguistics core of the page.
7. **Aspect switch.** It swaps the header, bridges and conjugation table between *szukać* and *poszukać*. A separate "Aspect in context" block shows contrasting example sentences.
8. **Accessibility / mobile.** Everything works by keyboard (radiogroups, switches, focusable words with tooltips). Colour is never the only signal: the case name is always written out. On mobile the sidebar stacks below the main column, and the bridge shrinks to verb → case with the preposition pill kept.

---

## 4. Project structure

```
messages/{en,ru,tr}.json         UI strings (ICU, typed)
global.d.ts                      next-intl AppConfig typing (Locale + Messages)
next.config.ts                   next-intl plugin
src/middleware.ts                locale detection + redirects
src/i18n/routing.ts              locales, default, prefix strategy
src/i18n/request.ts              per-request message loading
src/i18n/navigation.ts           locale-aware Link / router
src/types/grammar.ts             content model (VerbEntry, GovernmentPattern…)
src/lib/cases.ts                 7 cases: names, questions, L1 notes, colour tokens
src/data/verbs.ts                szukać, pomagać, interesować się, czekać, bać się, pić
src/data/vocabulary.ts           thematic high-frequency words
src/components/VerbCaseExplorer  ★ verb + case government + contextual translations
src/components/Sentence          colour-linked example renderer with tooltips
src/components/ConjugationTable  present/past(gendered)/future/imperative
src/components/VerbSearch        diacritic-insensitive search + case filter
src/components/Flashcards        flashcards / list + audio placeholder
src/app/[locale]/…               home, cases, verbs, verbs/[slug], vocabulary
```

## 5. Suggested roadmap

1. Move content to a CMS with a linguist review workflow (status: draft → reviewed → published).
2. Exercises built from the same data: "pick the case" and "fix the L1 error" (the `contrast.note` errors become distractors).
3. Spaced-repetition progress tracking. Show which case colours a user confuses most.
4. Tenses hub (aspect × tense matrix) and declension tables per noun, using the same `Localized` + segment model.
