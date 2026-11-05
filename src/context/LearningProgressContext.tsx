'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { CURRICULUM_MODULES } from '@/data/curriculum';
import type {
  CurriculumModule,
  ModuleStatus,
  SubLevel,
  UserLearningState,
} from '@/types/curriculum';

const STORAGE_KEY = 'polski-hub-progress-v1';

const DEFAULT_STATE: UserLearningState = {
  hasCompletedOnboarding: false,
  assignedLevel: 'A1.1',
  placementScore: null,
  unlockedUpToOrder: 1,
  completedModules: {},
  totalXp: 0,
};

interface LearningProgressContextValue {
  state: UserLearningState;
  hydrated: boolean;
  isPlacementModalOpen: boolean;
  openPlacementModal: () => void;
  closePlacementModal: () => void;
  getModuleStatus: (mod: CurriculumModule) => ModuleStatus;
  /** The next recommended module to study */
  activeModule: CurriculumModule;
  completeOnboarding: (payload: {
    assignedLevel: SubLevel;
    placementScore: number;
    unlockedUpToOrder: number;
  }) => void;
  skipOnboardingAsBeginner: () => void;
  completeModule: (moduleId: string, scorePercent: number, xpReward: number) => void;
  resetProgress: () => void;
}

const LearningProgressContext = createContext<LearningProgressContextValue | null>(null);

export function LearningProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<UserLearningState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);
  const [isPlacementModalOpen, setIsPlacementModalOpen] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<UserLearningState>;
        setState({
          hasCompletedOnboarding: Boolean(parsed.hasCompletedOnboarding),
          assignedLevel: parsed.assignedLevel ?? 'A1.1',
          placementScore: typeof parsed.placementScore === 'number' ? parsed.placementScore : null,
          unlockedUpToOrder: typeof parsed.unlockedUpToOrder === 'number' ? parsed.unlockedUpToOrder : 1,
          completedModules: parsed.completedModules ?? {},
          totalXp: typeof parsed.totalXp === 'number' ? parsed.totalXp : 0,
        });
      }
    } catch {
      // Fallback to default state if storage is unavailable
    } finally {
      setHydrated(true);
    }
  }, []);

  // Persist to localStorage whenever state updates after hydration
  const persistState = useCallback((updater: (prev: UserLearningState) => UserLearningState) => {
    setState((prev) => {
      const next = updater(prev);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore quota errors
      }
      return next;
    });
  }, []);

  const getModuleStatus = useCallback(
    (mod: CurriculumModule): ModuleStatus => {
      if (state.completedModules[mod.id]) {
        return 'completed';
      }
      if (mod.order === 1 || mod.order <= state.unlockedUpToOrder) {
        return 'unlocked';
      }
      const prevModule = CURRICULUM_MODULES.find((m) => m.order === mod.order - 1);
      if (prevModule && state.completedModules[prevModule.id]) {
        return 'unlocked';
      }
      return 'locked';
    },
    [state.completedModules, state.unlockedUpToOrder],
  );

  const activeModule = useMemo(() => {
    // First unlocked but not yet completed module (preferring from unlockedUpToOrder or first uncompleted)
    const firstAtAssigned = CURRICULUM_MODULES.find(
      (m) => m.order >= state.unlockedUpToOrder && !state.completedModules[m.id] && getModuleStatus(m) === 'unlocked',
    );
    if (firstAtAssigned) return firstAtAssigned;

    const firstUncompletedUnlocked = CURRICULUM_MODULES.find(
      (m) => !state.completedModules[m.id] && getModuleStatus(m) === 'unlocked',
    );
    return firstUncompletedUnlocked ?? CURRICULUM_MODULES[CURRICULUM_MODULES.length - 1];
  }, [state.completedModules, state.unlockedUpToOrder, getModuleStatus]);

  const completeOnboarding = useCallback(
    ({
      assignedLevel,
      placementScore,
      unlockedUpToOrder,
    }: {
      assignedLevel: SubLevel;
      placementScore: number;
      unlockedUpToOrder: number;
    }) => {
      persistState((prev) => ({
        ...prev,
        hasCompletedOnboarding: true,
        assignedLevel,
        placementScore,
        unlockedUpToOrder: Math.max(prev.unlockedUpToOrder, unlockedUpToOrder),
      }));
      setIsPlacementModalOpen(false);
    },
    [persistState],
  );

  const skipOnboardingAsBeginner = useCallback(() => {
    persistState((prev) => ({
      ...prev,
      hasCompletedOnboarding: true,
      assignedLevel: 'A1.1',
      placementScore: 0,
      unlockedUpToOrder: Math.max(prev.unlockedUpToOrder, 1),
    }));
    setIsPlacementModalOpen(false);
  }, [persistState]);

  const completeModule = useCallback(
    (moduleId: string, scorePercent: number, xpReward: number) => {
      persistState((prev) => {
        const existing = prev.completedModules[moduleId];
        const alreadyCompleted = Boolean(existing);
        const bestScore = existing ? Math.max(existing.score, scorePercent) : scorePercent;
        const attempts = existing ? existing.attempts + 1 : 1;
        const earnedXp = alreadyCompleted ? Math.round(xpReward * 0.25) : xpReward;

        const mod = CURRICULUM_MODULES.find((m) => m.id === moduleId);
        const nextUnlockedOrder = mod ? Math.max(prev.unlockedUpToOrder, mod.order + 1) : prev.unlockedUpToOrder;

        return {
          ...prev,
          hasCompletedOnboarding: true,
          unlockedUpToOrder: nextUnlockedOrder,
          totalXp: prev.totalXp + earnedXp,
          completedModules: {
            ...prev.completedModules,
            [moduleId]: {
              score: bestScore,
              completedAt: new Date().toISOString(),
              attempts,
            },
          },
        };
      });
    },
    [persistState],
  );

  const resetProgress = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setState(DEFAULT_STATE);
    setIsPlacementModalOpen(true);
  }, []);

  const openPlacementModal = useCallback(() => setIsPlacementModalOpen(true), []);
  const closePlacementModal = useCallback(() => setIsPlacementModalOpen(false), []);

  const value = useMemo<LearningProgressContextValue>(
    () => ({
      state,
      hydrated,
      isPlacementModalOpen,
      openPlacementModal,
      closePlacementModal,
      getModuleStatus,
      activeModule,
      completeOnboarding,
      skipOnboardingAsBeginner,
      completeModule,
      resetProgress,
    }),
    [
      state,
      hydrated,
      isPlacementModalOpen,
      openPlacementModal,
      closePlacementModal,
      getModuleStatus,
      activeModule,
      completeOnboarding,
      skipOnboardingAsBeginner,
      completeModule,
      resetProgress,
    ],
  );

  return <LearningProgressContext.Provider value={value}>{children}</LearningProgressContext.Provider>;
}

export function useLearningProgress(): LearningProgressContextValue {
  const ctx = useContext(LearningProgressContext);
  if (!ctx) {
    throw new Error('useLearningProgress must be used inside <LearningProgressProvider>');
  }
  return ctx;
}
