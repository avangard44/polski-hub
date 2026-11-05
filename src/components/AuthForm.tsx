'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useLearningProgress } from '@/context/LearningProgressContext';
import { useRouter } from '@/i18n/navigation';

export function AuthForm({ redirectOnSuccess = false }: { redirectOnSuccess?: boolean }) {
  const t = useTranslations('auth');
  const router = useRouter();
  const { signInWithEmail, signInWithGoogle, isSupabaseReady } = useLearningProgress();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);
    try {
      const res = await signInWithEmail(email, password, mode);
      if (res.error) {
        setError(res.error);
      } else {
        setSuccessMsg(mode === 'signup' ? t('signupSuccess') : t('loginSuccess'));
        if (redirectOnSuccess) {
          router.push('/');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await signInWithGoogle();
      if (res.error) {
        setError(res.error);
      } else if (redirectOnSuccess && !isSupabaseReady) {
        router.push('/');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-7">
      <div className="flex items-center justify-between gap-2">
        <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-700 ring-1 ring-red-200">
          {isSupabaseReady ? `☁️ ${t('cloudBadge')}` : `💾 ${t('localSyncBadge')}`}
        </span>
      </div>

      <h2 className="mt-3 text-2xl font-bold text-slate-900">
        {mode === 'login' ? t('loginTitle') : t('signupTitle')}
      </h2>
      <p className="mt-1 text-sm text-slate-500">{t('subtitle')}</p>

      {/* Mode Switcher */}
      <div className="mt-5 grid grid-cols-2 rounded-2xl bg-slate-100 p-1 text-xs font-bold">
        <button
          type="button"
          onClick={() => {
            setMode('login');
            setError(null);
          }}
          className={`rounded-xl py-2.5 transition ${
            mode === 'login' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          {t('loginTab')}
        </button>
        <button
          type="button"
          onClick={() => {
            setMode('signup');
            setError(null);
          }}
          className={`rounded-xl py-2.5 transition ${
            mode === 'signup' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          {t('signupTab')}
        </button>
      </div>

      {/* Google OAuth Button */}
      <button
        type="button"
        disabled={loading}
        onClick={handleGoogle}
        className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-slate-800 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50 disabled:opacity-50"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
          <path
            fill="#EA4335"
            d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.8C6.2 7.2 8.9 5 12 5z"
          />
          <path
            fill="#4285F4"
            d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.6l3.7 2.9c2.2-2 3.7-5 3.7-8.7z"
          />
          <path
            fill="#FBBC05"
            d="M5.3 14.8c-.2-.8-.4-1.8-.4-2.8s.2-2 .4-2.8L1.6 6.4C.6 8.3 0 10.1 0 12s.6 3.7 1.6 5.6l3.7-2.8z"
          />
          <path
            fill="#34A853"
            d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.1-6.7-5l-3.7 2.8C3.5 20.4 7.4 23 12 23z"
          />
        </svg>
        <span>{t('googleBtn')}</span>
      </button>

      <div className="my-4 flex items-center gap-3 text-xs text-slate-400">
        <div className="h-px flex-1 bg-slate-200" />
        <span>{t('orEmail')}</span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      {/* Email / Password Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label className="block text-xs font-bold text-slate-600">{t('emailLabel')}</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="anna@example.com"
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600">{t('passwordLabel')}</label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100"
          />
        </div>

        {error && (
          <p className="rounded-xl bg-rose-50 px-3.5 py-2.5 text-xs font-semibold text-rose-800 ring-1 ring-rose-200">
            {error}
          </p>
        )}

        {successMsg && (
          <p className="rounded-xl bg-emerald-50 px-3.5 py-2.5 text-xs font-semibold text-emerald-900 ring-1 ring-emerald-200">
            ✓ {successMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-red-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-red-700 disabled:opacity-50"
        >
          {loading
            ? '...'
            : mode === 'login'
              ? `${t('loginSubmit')} →`
              : `${t('signupSubmit')} →`}
        </button>
      </form>
    </div>
  );
}
