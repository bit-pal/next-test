'use client';

import { useTranslations } from 'next-intl';
import { format } from 'date-fns';
import { Avatar } from '@/components/ui/avatar';
import { UserIcon, BotIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Message } from '@/lib/store/chat-store';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const t = useTranslations();
  const isUser = message.type === 'user';
  
  const formattedTime = format(new Date(message.timestamp), 'HH:mm');
  
  return (
    <div
      className={cn(
        "flex gap-3 max-w-[80%]",
        isUser ? "ml-auto" : "mr-auto"
      )}
    >
      {!isUser && (
        <Avatar className="h-8 w-8 bg-primary/10">
          <BotIcon className="h-4 w-4" />
        </Avatar>
      )}
      
      <div className="flex flex-col">
        <div
          className={cn(
            "rounded-lg px-4 py-2",
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-muted"
          )}
        >
          <div className="prose prose-sm dark:prose-invert">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        </div>
        
        <div
          className={cn(
            "flex items-center text-xs text-muted-foreground mt-1",
            isUser ? "justify-end" : "justify-start"
          )}
        >
          <span>{isUser ? t('chat.user') : t('chat.ai')}</span>
          <span className="mx-1">•</span>
          <span>{formattedTime}</span>
        </div>
      </div>
      
      {isUser && (
        <Avatar className="h-8 w-8 bg-primary/10">
          <UserIcon className="h-4 w-4" />
        </Avatar>
      )}
    </div>
  );
}