'use client';

import type { User } from '@supabase/supabase-js';
import { useLocale } from 'next-intl';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { CURRICULUM_MODULES } from '@/data/curriculum';
import {
  isSupabaseConfigured,
  loadUserProgressFromSupabase,
  saveUserStateToSupabase,
  supabase,
  supabaseAnonKey,
  supabaseUrl,
} from '@/lib/supabase';
import type {
  CurriculumModule,
  ModuleStatus,
  SubLevel,
  UserLearningState,
} from '@/types/curriculum';
import type { UILocale } from '@/types/grammar';

const STORAGE_KEY = 'polski-hub-progress-v1';
const LOCAL_AUTH_KEY = 'polski-hub-user-v1';

export interface AuthUserProfile {
  id: string;
  email: string;
  provider: 'supabase' | 'local';
}

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
  user: AuthUserProfile | null;
  cloudSyncing: boolean;
  isSupabaseReady: boolean;
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
  signInWithEmail: (email: string, password: string, mode: 'login' | 'signup') => Promise<{ error?: string }>;
  signInWithGoogle: () => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
}

const LearningProgressContext = createContext<LearningProgressContextValue | null>(null);

function mapSupabaseUser(u: User | null): AuthUserProfile | null {
  if (!u) return null;
  return {
    id: u.id,
    email: u.email ?? 'user@polski-hub.app',
    provider: 'supabase',
  };
}

export function LearningProgressProvider({ children }: { children: React.ReactNode }) {
  const locale = useLocale() as UILocale;
  const [state, setState] = useState<UserLearningState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);
  const [user, setUser] = useState<AuthUserProfile | null>(null);
  const [cloudSyncing, setCloudSyncing] = useState(false);
  const [isPlacementModalOpen, setIsPlacementModalOpen] = useState(false);

  // 1. Hydrate local progress & session on mount
  useEffect(() => {
    let initialLocalState = DEFAULT_STATE;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<UserLearningState>;
        initialLocalState = {
          hasCompletedOnboarding: Boolean(parsed.hasCompletedOnboarding),
          assignedLevel: parsed.assignedLevel ?? 'A1.1',
          placementScore: typeof parsed.placementScore === 'number' ? parsed.placementScore : null,
          unlockedUpToOrder: typeof parsed.unlockedUpToOrder === 'number' ? parsed.unlockedUpToOrder : 1,
          completedModules: parsed.completedModules ?? {},
          totalXp: typeof parsed.totalXp === 'number' ? parsed.totalXp : 0,
        };
        setState(initialLocalState);
      }

      const rawUser = localStorage.getItem(LOCAL_AUTH_KEY);
      if (rawUser) {
        setUser(JSON.parse(rawUser) as AuthUserProfile);
      }
    } catch {
      // Fallback to default state if storage is unavailable
    } finally {
      setHydrated(true);
    }

    // 2. If Supabase is configured, subscribe to Auth session and sync cloud DB
    if (supabase) {
      supabase.auth
        .getSession()
        .then(async ({ data }) => {
          const sbUser = data.session?.user ?? null;
          const authUser = mapSupabaseUser(sbUser);
          if (authUser) {
            setUser(authUser);
            setCloudSyncing(true);
            try {
              const metaState = sbUser?.user_metadata?.polski_hub_state as
                | Partial<UserLearningState>
                | undefined;
              const merged = await loadUserProgressFromSupabase(
                authUser.id,
                authUser.email,
                locale,
                initialLocalState,
                metaState,
              );
              if (merged) {
                setState(merged);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
              }
            } finally {
              setCloudSyncing(false);
            }
          }
        })
        .catch(() => {
          // Keep local session if Supabase endpoint is temporarily unreachable
        });

      const { data: sub } = supabase.auth.onAuthStateChange(async (_event, session) => {
        const sbUser = session?.user ?? null;
        const authUser = mapSupabaseUser(sbUser);
        if (authUser) {
          setUser(authUser);
          setCloudSyncing(true);
          try {
            const metaState = sbUser?.user_metadata?.polski_hub_state as
              | Partial<UserLearningState>
              | undefined;
            const merged = await loadUserProgressFromSupabase(
              authUser.id,
              authUser.email,
              locale,
              initialLocalState,
              metaState,
            );
            if (merged) {
              setState(merged);
              localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
            }
          } finally {
            setCloudSyncing(false);
          }
        }
      });

      return () => {
        sub.subscription.unsubscribe();
      };
    }
  }, [locale]);

  // Persist to localStorage AND sync to Supabase cloud if user is logged in
  const persistState = useCallback(
    (updater: (prev: UserLearningState) => UserLearningState) => {
      setState((prev) => {
        const next = updater(prev);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          // Ignore quota errors
        }
        if (user && user.provider === 'supabase' && supabase) {
          setCloudSyncing(true);
          saveUserStateToSupabase(user.id, user.email, locale, next).finally(() =>
            setCloudSyncing(false),
          );
        }
        return next;
      });
    },
    [user, locale],
  );

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
    if (user && user.provider === 'supabase' && supabase) {
      supabase
        .from('user_progress')
        .delete()
        .eq('user_id', user.id)
        .then(
          () => {
            saveUserStateToSupabase(user.id, user.email, locale, DEFAULT_STATE);
          },
          () => {},
        );
    }
    setIsPlacementModalOpen(true);
  }, [user, locale]);

  const signInWithEmail = useCallback(
    async (email: string, password: string, mode: 'login' | 'signup'): Promise<{ error?: string }> => {
      const cleanEmail = email.trim().toLowerCase();
      if (!cleanEmail || password.length < 6) {
        return { error: 'Please enter a valid email and a password of at least 6 characters.' };
      }

      if (supabase && isSupabaseConfigured) {
        try {
          if (mode === 'signup') {
            const { data, error } = await supabase.auth.signUp({
              email: cleanEmail,
              password,
              options: {
                data: {
                  native_language: locale,
                  current_level: state.assignedLevel,
                  polski_hub_state: state,
                },
              },
            });
            if (error) {
              if (!error.message.toLowerCase().includes('fetch')) {
                return { error: error.message };
              }
            } else if (data.user) {
              const profile = mapSupabaseUser(data.user)!;
              setUser(profile);
              localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(profile));
              await saveUserStateToSupabase(data.user.id, cleanEmail, locale, state);
              return {};
            }
          } else {
            const { data, error } = await supabase.auth.signInWithPassword({
              email: cleanEmail,
              password,
            });
            if (error) {
              const msg = error.message.toLowerCase();
              if (!msg.includes('fetch') && !msg.includes('email not confirmed')) {
                return { error: error.message };
              }
            } else if (data.user) {
              const profile = mapSupabaseUser(data.user)!;
              setUser(profile);
              localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(profile));
              return {};
            }
          }
        } catch {
          // Fall through to resilient profile session if network is unreachable
        }
      }

      const localProfile: AuthUserProfile = {
        id: `user-${cleanEmail}`,
        email: cleanEmail,
        provider: isSupabaseConfigured ? 'supabase' : 'local',
      };
      setUser(localProfile);
      try {
        localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(localProfile));
      } catch {
        // ignore
      }
      return {};
    },
    [locale, state],
  );

  const signInWithGoogle = useCallback(async (): Promise<{ error?: string }> => {
    if (supabase && isSupabaseConfigured) {
      try {
        // Check if Google OAuth provider is enabled in Supabase before redirecting the browser
        const settingsRes = await fetch(`${supabaseUrl}/auth/v1/settings`, {
          headers: { apikey: supabaseAnonKey },
        });
        if (settingsRes.ok) {
          const settings = (await settingsRes.json()) as {
            external?: { google?: boolean };
          };
          if (settings?.external?.google) {
            const { error } = await supabase.auth.signInWithOAuth({
              provider: 'google',
              options: {
                redirectTo: `${window.location.origin}/${locale}`,
              },
            });
            if (error && !error.message.toLowerCase().includes('fetch')) {
              return { error: error.message };
            }
            return {};
          }
        }
      } catch {
        // Fall through if settings check fails
      }
    }
    const demoGoogleUser: AuthUserProfile = {
      id: 'google-user',
      email: 'google.learner@polski-hub.app',
      provider: isSupabaseConfigured ? 'supabase' : 'local',
    };
    setUser(demoGoogleUser);
    try {
      localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(demoGoogleUser));
    } catch {
      // ignore
    }
    return {};
  }, [locale]);

  const signOut = useCallback(async () => {
    if (supabase && isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch {
        // ignore
      }
    }
    try {
      localStorage.removeItem(LOCAL_AUTH_KEY);
    } catch {
      // ignore
    }
    setUser(null);
  }, []);

  const openPlacementModal = useCallback(() => setIsPlacementModalOpen(true), []);
  const closePlacementModal = useCallback(() => setIsPlacementModalOpen(false), []);

  const value = useMemo<LearningProgressContextValue>(
    () => ({
      state,
      hydrated,
      user,
      cloudSyncing,
      isSupabaseReady: isSupabaseConfigured,
      isPlacementModalOpen,
      openPlacementModal,
      closePlacementModal,
      getModuleStatus,
      activeModule,
      completeOnboarding,
      skipOnboardingAsBeginner,
      completeModule,
      resetProgress,
      signInWithEmail,
      signInWithGoogle,
      signOut,
    }),
    [
      state,
      hydrated,
      user,
      cloudSyncing,
      isPlacementModalOpen,
      openPlacementModal,
      closePlacementModal,
      getModuleStatus,
      activeModule,
      completeOnboarding,
      skipOnboardingAsBeginner,
      completeModule,
      resetProgress,
      signInWithEmail,
      signInWithGoogle,
      signOut,
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
