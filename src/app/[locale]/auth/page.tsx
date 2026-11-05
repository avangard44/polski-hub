import { setRequestLocale } from 'next-intl/server';
import { AuthForm } from '@/components/AuthForm';
import type { UILocale } from '@/types/grammar';

export default async function AuthPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: UILocale };
  setRequestLocale(locale);

  return (
    <div className="py-6 sm:py-10">
      <AuthForm redirectOnSuccess />
    </div>
  );
}
