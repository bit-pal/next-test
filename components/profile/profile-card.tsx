'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { authApi } from '@/lib/api/mock';
import { useAuthStore } from '@/lib/store/auth-store';
import { Skeleton } from '@/components/ui/skeleton';

export function ProfileCard() {
  const t = useTranslations();
  const { setUser } = useAuthStore();
  
  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['profile'],
    queryFn: () => authApi.getProfile(),
  });

  useEffect(() => {
    if (profile) {
      setUser(profile);
    }
  }, [profile, setUser]);

  const formattedDate = profile?.registrationDate 
    ? format(new Date(profile.registrationDate), 'PPP')
    : '';

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (error) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-destructive">{t('common.errorOccurred')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{error instanceof Error ? error.message : String(error)}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{t('profile.title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">
            {t('profile.emailLabel')}
          </h3>
          <p className="font-medium">{profile?.email}</p>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">
            {t('profile.registrationDate')}
          </h3>
          <p className="font-medium">{formattedDate}</p>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">
            {t('profile.subscriptions')}
          </h3>
          {profile?.subscriptions && profile.subscriptions.length > 0 ? (
            <ul className="list-disc pl-5 space-y-1">
              {profile.subscriptions.map((sub, i) => (
                <li key={i}>{sub}</li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">{t('profile.noSubscriptions')}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function ProfileSkeleton() {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <Skeleton className="h-8 w-[200px]" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="h-6 w-[250px]" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[170px]" />
          <Skeleton className="h-6 w-[150px]" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[130px]" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-[80%]" />
        </div>
      </CardContent>
    </Card>
  );
}