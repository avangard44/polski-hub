import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { CompletedModuleRecord, SubLevel, UserLearningState } from '@/types/curriculum';
import type { UILocale } from '@/types/grammar';

const DEFAULT_SUPABASE_URL = 'https://qmujgprmwsvvkpnifgfh.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_OrBI6ml303wDwA7YvKbxkg_NsZdgRJj';

const rawUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? DEFAULT_SUPABASE_URL).trim();
const rawKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? DEFAULT_SUPABASE_ANON_KEY)
  .trim()
  .replace(/^\[|\]$/g, '');

export const supabaseUrl = rawUrl;
export const supabaseAnonKey = rawKey;

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
 * Loads the authenticated user's profile (`users`), completed modules (`user_progress`),
 * and Auth `user_metadata.polski_hub_state` from Supabase and merges them with local progress.
 */
export async function loadUserProgressFromSupabase(
  userId: string,
  userEmail: string,
  locale: UILocale,
  localState: UserLearningState,
  metaState?: Partial<UserLearningState> | null,
): Promise<UserLearningState | null> {
  if (!supabase) return null;

  let userRow: DbUserRow | null = null;
  let progressRows: DbUserProgressRow[] | null = null;

  try {
    const [uRes, pRes] = await Promise.all([
      supabase.from('users').select('*').eq('id', userId).maybeSingle<DbUserRow>(),
      supabase.from('user_progress').select('*').eq('user_id', userId).returns<DbUserProgressRow[]>(),
    ]);
    userRow = uRes.data ?? null;
    progressRows = pRes.data ?? null;
  } catch {
    // Tables may not be initialized yet; fall back to user_metadata + localState
  }

  const mergedCompleted: Record<string, CompletedModuleRecord> = {
    ...(metaState?.completedModules ?? {}),
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
    hasCompletedOnboarding: Boolean(
      userRow?.has_completed_onboarding ||
        metaState?.hasCompletedOnboarding ||
        localState.hasCompletedOnboarding,
    ),
    assignedLevel: userRow?.current_level ?? metaState?.assignedLevel ?? localState.assignedLevel,
    placementScore:
      userRow?.placement_score ?? metaState?.placementScore ?? localState.placementScore,
    unlockedUpToOrder: Math.max(
      userRow?.unlocked_up_to_order ?? 1,
      metaState?.unlockedUpToOrder ?? 1,
      localState.unlockedUpToOrder,
    ),
    completedModules: mergedCompleted,
    totalXp: Math.max(userRow?.total_xp ?? 0, metaState?.totalXp ?? 0, localState.totalXp),
  };

  await saveUserStateToSupabase(userId, userEmail, locale, mergedState);

  return mergedState;
}

/**
 * Upserts the user profile (`public.users`), completed lessons (`public.user_progress`),
 * and Auth `user_metadata` so progress is saved across devices even if SQL tables were not run yet.
 */
export async function saveUserStateToSupabase(
  userId: string,
  userEmail: string,
  locale: UILocale,
  state: UserLearningState,
): Promise<void> {
  if (!supabase) return;

  try {
    await supabase.auth.updateUser({
      data: {
        native_language: locale,
        current_level: state.assignedLevel,
        polski_hub_state: state,
      },
    });
  } catch {
    // Ignore metadata sync error if session is refreshing
  }

  try {
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
  } catch {
    // Graceful fallback if SQL tables are not created yet
  }
}
