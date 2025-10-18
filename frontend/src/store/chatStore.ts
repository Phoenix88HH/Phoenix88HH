import {create} from 'zustand';

export type Message = {
  id: string;
  author: 'You' | 'TARS';
  text: string;
};

type ChatState = {
  messages: Message[];
  isLoading: boolean;
  addMessage: (message: Message) => void;
  setLoading: (loading: boolean) => void;
};

export const useChatStore = create<ChatState>((set) => ({
  messages: [
    { id: '1', author: 'TARS', text: 'Welcome to TARS Assistant. How can I help you today?' }
  ],
  isLoading: false,
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setLoading: (loading) => set({ isLoading: loading }),
}));