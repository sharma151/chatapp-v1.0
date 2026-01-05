import { useQuery } from "@tanstack/react-query";
import ChatService from "@/core/services/chat.service";

export const useChat = () => {
  //Fetch Available user list
  const fetchAvailableUsers = useQuery({
    queryKey: ["availableUsers"],
    queryFn: ChatService.GetAvailableUsers,

    // staleTime: 5 * 60 * 1000, // 5 minutes
  });

  //Fetch chat list
  const fetchChatList = useQuery({
    queryKey: ["chatList"],
    queryFn: ChatService.GetChatList,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    chatList: fetchChatList?.data?.data,
    availableUsers: fetchAvailableUsers?.data?.data,
  };
};
