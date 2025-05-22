import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '../store/auth-store';

export const useProtectedRoute = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Check if the route is in the auth section
    const isAuthRoute = pathname.startsWith('/auth');
    
    if (!isAuthenticated && !isAuthRoute) {
      // Redirect to login if not authenticated and not on an auth route
      router.push('/auth/login');
    } else if (isAuthenticated && isAuthRoute) {
      // Redirect to profile if already authenticated and on an auth route
      router.push('/profile');
    }
  }, [isAuthenticated, pathname, router]);

  return { isAuthenticated };
};

export const useScrollToBottom = (
  dependencies: any[],
  containerRef: React.RefObject<HTMLElement>
) => {
  useEffect(() => {
    if (containerRef.current) {
      const { scrollHeight, clientHeight } = containerRef.current;
      containerRef.current.scrollTop = scrollHeight - clientHeight;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies]);
};