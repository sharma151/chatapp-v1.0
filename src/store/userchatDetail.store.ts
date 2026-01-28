import { create } from 'zustand';

export interface SelectedChatData {
  Groupname?: string;
  isGroup: boolean;
  chatId: string;
  otherUsername: string;
  otherAvatar: string;
  lastMessage: {
    senderUsername: string;
    content: string;
  } | null;
}

interface ChatDetailStore {
  selectedChat: SelectedChatData | null;
  setSelectedChat: (chat: SelectedChatData) => void;
  clearSelectedChat: () => void;
}

export const useChatDetailStore = create<ChatDetailStore>((set) => ({
  selectedChat: null,
  setSelectedChat: (chat) => set({ selectedChat: chat }),
  clearSelectedChat: () => set({ selectedChat: null }),
}));