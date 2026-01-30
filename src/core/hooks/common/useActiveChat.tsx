import { useMemo } from "react";
import { useParams } from "@tanstack/react-router";
import { useChat } from "@/core/hooks/api/useChat";
import { useAuthStore } from "@/store/auth.store";
import { formatChatData } from "@/utils/chat-utils";

export const useActiveChat = () => {
  const { chatId } = useParams({ strict: false });

  const { chatList, isLoading } = useChat() as {
    chatList: any[];
    isLoading: boolean;
  };
  console.log("chatList in useActiveChat:", chatList);
  const loggedInUserId = useAuthStore((state) => state.user?.id);

  const activeChat = useMemo(() => {
    if (!chatList || !chatId) return null;

    const rawChat = chatList.find((c: any) => c._id === chatId);

    return formatChatData(rawChat, loggedInUserId);
  }, [chatList, chatId, loggedInUserId]);

  return {
    activeChat,
    isLoading: isLoading && !activeChat,
  };
};
