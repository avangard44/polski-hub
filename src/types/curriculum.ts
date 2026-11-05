import type { CEFRLevel, Localized, PolishCase, VocabTopic } from './grammar';

export type SubLevel = 'A1.1' | 'A1.2' | 'A2' | 'B1' | 'B2';
export type CurriculumCEFR = Extract<CEFRLevel, 'A1' | 'A2' | 'B1' | 'B2'>;

export type ModuleCategory = 'grammar' | 'vocabulary' | 'reading';
export type ModuleStatus = 'locked' | 'unlocked' | 'completed';

export interface TheoryExample {
  pl: string;
  highlight?: string;
  translation: Localized;
}

export interface TheorySection {
  id: string;
  heading: Localized;
  body: Localized;
  l1Tip: Localized;
  examples: TheoryExample[];
}

export interface ReadingPassage {
  title: Localized;
  plParagraphs: string[];
  translationParagraphs: Localized<string[]>;
  keyPhrases: { pl: string; translation: Localized }[];
}

export type ExerciseType = 'multiple-choice' | 'fill-blank' | 'case-match';

export interface LessonExercise {
  id: string;
  type: ExerciseType;
  prompt: Localized;
  /** Optional Polish sentence with "___" placeholder for fill-blank / case-match */
  sentencePl?: string;
  sentenceTranslation?: Localized;
  /** Target verb or case hint */
  governedCase?: PolishCase;
  options: string[];
  correctIndex: number;
  explanation: Localized;
}

export interface CurriculumModule {
  id: string;
  slug: string;
  /** 1-based sequential order across the entire A1 -> B2 path */
  order: number;
  cefr: CurriculumCEFR;
  subLevel: SubLevel;
  category: ModuleCategory;
  estimatedMinutes: number;
  xpReward: number;
  title: Localized;
  subtitle: Localized;
  /** Optional deep-links into reference sections */
  relatedCase?: PolishCase;
  relatedVerbSlug?: string;
  relatedVocabTopic?: VocabTopic;
  theory: TheorySection[];
  reading?: ReadingPassage;
  exercises: LessonExercise[];
}

export interface QuestionnaireItem {
  id: string;
  question: Localized;
  options: {
    label: Localized;
    points: number;
  }[];
}

export interface PlacementQuestion {
  id: string;
  level: SubLevel;
  prompt: Localized;
  sentencePl?: string;
  options: string[];
  correctIndex: number;
  explanation: Localized;
}

export interface CompletedModuleRecord {
  score: number;
  completedAt: string;
  attempts: number;
}

export interface UserLearningState {
  hasCompletedOnboarding: boolean;
  assignedLevel: SubLevel;
  placementScore: number | null;
  /** Highest module `order` unlocked directly by the placement test */
  unlockedUpToOrder: number;
  completedModules: Record<string, CompletedModuleRecord>;
  totalXp: number;
}
