'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { loginSchema, type LoginFormValues } from '@/lib/utils/validation';
import { authApi } from '@/lib/api/mock';
import { useAuthStore } from '@/lib/store/auth-store';

export function LoginForm() {
  const t = useTranslations();
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { setToken, setUser } = useAuthStore();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setIsLoading(true);
    try {
      const response = await authApi.login(values);
      setToken(response.token);
      setUser({
        email: response.email,
        registrationDate: response.registrationDate,
        subscriptions: [],
      });
      router.push('/profile');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: t('common.errorOccurred'),
        description: error instanceof Error ? error.message : String(error),
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-6 p-6 bg-card rounded-lg shadow-lg">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">{t('auth.loginTitle')}</h1>
        <p className="text-muted-foreground">{t('auth.loginSubtitle')}</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('common.email')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder="you@example.com"
                    type="email"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('common.password')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder="••••••••"
                    type="password"
                    autoComplete="current-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full transition-opacity"
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.7 : 1 }}
          >
            {isLoading ? t('common.loading') : t('common.login')}
          </Button>
        </form>
      </Form>
      <div className="text-center text-sm">
        <p className="text-muted-foreground">
          {t('auth.noAccount')}{' '}
          <Link href="/auth/register" className="underline">
            {t('common.register')}
          </Link>
        </p>
      </div>
    </div>
  );
}