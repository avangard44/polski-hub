import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { CompletedModuleRecord, SubLevel, UserLearningState } from '@/types/curriculum';
import type { UILocale } from '@/types/grammar';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes('your-project-ref') &&
    supabaseUrl.startsWith('http'),
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

export interface DbUserRow {
  id: string;
  email: string;
  native_language: UILocale;
  current_level: SubLevel;
  placement_score: number | null;
  unlocked_up_to_order: number;
  total_xp: number;
  has_completed_onboarding: boolean;
}

export interface DbUserProgressRow {
  user_id: string;
  module_id: string;
  score: number;
  attempts: number;
  is_completed: boolean;
  completed_at: string;
}

/**
 * Loads the authenticated user's profile (`users`) and completed modules (`user_progress`)
 * from Supabase and merges them with any local progress.
 */
export async function loadUserProgressFromSupabase(
  userId: string,
  userEmail: string,
  locale: UILocale,
  localState: UserLearningState,
): Promise<UserLearningState | null> {
  if (!supabase) return null;

  const [{ data: userRow }, { data: progressRows }] = await Promise.all([
    supabase.from('users').select('*').eq('id', userId).maybeSingle<DbUserRow>(),
    supabase.from('user_progress').select('*').eq('user_id', userId).returns<DbUserProgressRow[]>(),
  ]);

  const mergedCompleted: Record<string, CompletedModuleRecord> = {
    ...localState.completedModules,
  };

  if (progressRows) {
    for (const row of progressRows) {
      if (!row.is_completed) continue;
      const existing = mergedCompleted[row.module_id];
      mergedCompleted[row.module_id] = {
        score: existing ? Math.max(existing.score, row.score) : row.score,
        attempts: existing ? Math.max(existing.attempts, row.attempts) : row.attempts,
        completedAt: row.completed_at || existing?.completedAt || new Date().toISOString(),
      };
    }
  }

  const mergedState: UserLearningState = {
    hasCompletedOnboarding: Boolean(userRow?.has_completed_onboarding || localState.hasCompletedOnboarding),
    assignedLevel: userRow?.current_level ?? localState.assignedLevel,
    placementScore: userRow?.placement_score ?? localState.placementScore,
    unlockedUpToOrder: Math.max(userRow?.unlocked_up_to_order ?? 1, localState.unlockedUpToOrder),
    completedModules: mergedCompleted,
    totalXp: Math.max(userRow?.total_xp ?? 0, localState.totalXp),
  };

  // Upsert merged profile & any local modules back to Supabase so local pre-login progress is preserved
  await saveUserStateToSupabase(userId, userEmail, locale, mergedState);

  return mergedState;
}

/**
 * Upserts the user profile (`public.users`) and all completed lessons (`public.user_progress`).
 */
export async function saveUserStateToSupabase(
  userId: string,
  userEmail: string,
  locale: UILocale,
  state: UserLearningState,
): Promise<void> {
  if (!supabase) return;

  await supabase.from('users').upsert(
    {
      id: userId,
      email: userEmail,
      native_language: locale,
      current_level: state.assignedLevel,
      placement_score: state.placementScore,
      unlocked_up_to_order: state.unlockedUpToOrder,
      total_xp: state.totalXp,
      has_completed_onboarding: state.hasCompletedOnboarding,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'id' },
  );

  const entries = Object.entries(state.completedModules);
  if (entries.length > 0) {
    const rows = entries.map(([moduleId, rec]) => ({
      user_id: userId,
      module_id: moduleId,
      score: rec.score,
      attempts: rec.attempts,
      is_completed: true,
      completed_at: rec.completedAt,
      updated_at: new Date().toISOString(),
    }));

    await supabase.from('user_progress').upsert(rows, {
      onConflict: 'user_id,module_id',
    });
  }
}
