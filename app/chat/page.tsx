'use client';

import { ChatInterface } from '@/components/chat/chat-interface';
import { PageLayout } from '@/components/layout/page-layout';

export default function ChatPage() {
  return (
    <PageLayout requireAuth>
      <ChatInterface />
    </PageLayout>
  );
}