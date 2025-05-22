'use client';

import { ProfileCard } from '@/components/profile/profile-card';
import { PageLayout } from '@/components/layout/page-layout';

export default function ProfilePage() {
  return (
    <PageLayout requireAuth>
      <div className="container py-8">
        <ProfileCard />
      </div>
    </PageLayout>
  );
}