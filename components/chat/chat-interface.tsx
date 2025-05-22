'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { SendIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChatStore } from '@/lib/store/chat-store';
import { ChatMessage } from '@/components/chat/chat-message';
import { useScrollToBottom } from '@/lib/utils/hooks';

export function ChatInterface() {
  const t = useTranslations();
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { messages, addMessage, resetChat } = useChatStore();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useScrollToBottom([messages], chatContainerRef);

  // Reset chat when component mounts (to implement the reset on page reload requirement)
  useEffect(() => {
    resetChat();
  }, [resetChat]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isSending) return;

    setIsSending(true);
    
    // Add user message
    addMessage('user', message);
    setMessage('');

    // Simulate AI response after 1 second
    setTimeout(() => {
      addMessage('ai', message);
      setIsSending(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-3xl mx-auto">
      <div className="flex-1 p-4 overflow-hidden">
        <ScrollArea className="h-full pr-4" ref={chatContainerRef}>
          <div className="space-y-4 pb-4">
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full min-h-[50vh]">
                <p className="text-muted-foreground">{t('chat.emptyChat')}</p>
              </div>
            )}
            
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
          </div>
        </ScrollArea>
      </div>
      
      <div className="border-t p-4 bg-background">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t('chat.placeholder')}
            className="flex-1"
            disabled={isSending}
          />
          <Button 
            type="submit" 
            disabled={!message.trim() || isSending}
            className="transition-opacity"
            style={{ opacity: isSending ? 0.7 : 1 }}
          >
            <SendIcon className="h-4 w-4 mr-2" />
            {t('common.send')}
          </Button>
        </form>
      </div>
    </div>
  );
}