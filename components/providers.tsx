'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster';
import { NextIntlClientProvider } from 'next-intl';
import { useState, useEffect } from 'react';
import enMessages from '@/i18n/en.json';
import ruMessages from '@/i18n/ru.json';

const messages = {
  en: enMessages,
  ru: ruMessages,
};

export function Providers({ children }: { children: React.ReactNode }) {
  // Create a client
  const [queryClient] = useState(() => new QueryClient());
  const [mounted, setMounted] = useState(false);
  const [locale, setLocale] = useState('en');

  // Ensure we're only rendering on the client
  useEffect(() => {
    setMounted(true);
    // Get stored locale or default to 'en'
    const storedLocale = localStorage.getItem('locale') || 'en';
    setLocale(storedLocale);
  }, []);

  // Expose locale change function to window for easy access
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).changeLocale = (newLocale: 'en' | 'ru') => {
        localStorage.setItem('locale', newLocale);
        setLocale(newLocale);
      };
    }
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages[locale as keyof typeof messages]}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </QueryClientProvider>
    </NextIntlClientProvider>
  );
}