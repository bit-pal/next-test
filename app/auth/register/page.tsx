import { RegisterForm } from '@/components/auth/register-form';
import { PageLayout } from '@/components/layout/page-layout';

export default function RegisterPage() {
  return (
    <PageLayout>
      <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <RegisterForm />
      </div>
    </PageLayout>
  );
}