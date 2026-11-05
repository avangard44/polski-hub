import { setRequestLocale } from 'next-intl/server';
import { ProfileView } from '@/components/ProfileView';
import type { UILocale } from '@/types/grammar';

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: UILocale };
  setRequestLocale(locale);

  return <ProfileView />;
}
