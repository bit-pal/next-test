'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { MoonIcon, SunIcon, LogOutIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useAuthStore } from '@/lib/store/auth-store';

export function Header() {
  const t = useTranslations();
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, logout } = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [locale, setLocale] = useState('en');

  useEffect(() => {
    setMounted(true);
    setLocale(localStorage.getItem('locale') || 'en');
  }, []);

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'ru' : 'en';
    localStorage.setItem('locale', newLocale);
    setLocale(newLocale);
    // Using the globally exposed function from providers.tsx
    (window as any).changeLocale(newLocale);
  };

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  if (!mounted) return null;

  return (
    <header className="border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">{t('common.appName')}</span>
          </Link>
          {isAuthenticated && (
            <nav className="hidden md:flex gap-6">
              <Link href="/profile" className="text-sm font-medium">
                {t('common.profile')}
              </Link>
              <Link href="/chat" className="text-sm font-medium">
                {t('common.chat')}
              </Link>
            </nav>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle Theme"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </Button>
          <Button variant="outline" onClick={toggleLanguage}>
            {t('common.switchLanguage')}
          </Button>
          {isAuthenticated && (
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOutIcon className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}