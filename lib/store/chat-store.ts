import { create } from 'zustand';

export type MessageType = 'user' | 'ai';

export interface Message {
  id: string;
  type: MessageType;
  content: string;
  timestamp: Date;
}

interface ChatState {
  messages: Message[];
  addMessage: (type: MessageType, content: string) => void;
  resetChat: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  addMessage: (type, content) => 
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: crypto.randomUUID(),
          type,
          content,
          timestamp: new Date(),
        },
      ],
    })),
  resetChat: () => set({ messages: [] }),
}));