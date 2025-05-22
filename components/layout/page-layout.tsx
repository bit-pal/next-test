'use client';

import { Header } from '@/components/layout/header';
import { useProtectedRoute } from '@/lib/utils/hooks';

interface PageLayoutProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export function PageLayout({ children, requireAuth = false }: PageLayoutProps) {
  // If requireAuth is true, this hook will redirect to login if not authenticated
  const { isAuthenticated } = requireAuth ? useProtectedRoute() : { isAuthenticated: false };
  
  // If we require auth but the user isn't authenticated yet, show a loading state
  if (requireAuth && !isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse">Loading...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}