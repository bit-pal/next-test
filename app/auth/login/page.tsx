import { LoginForm } from '@/components/auth/login-form';
import { PageLayout } from '@/components/layout/page-layout';

export default function LoginPage() {
  return (
    <PageLayout>
      <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <LoginForm />
      </div>
    </PageLayout>
  );
}