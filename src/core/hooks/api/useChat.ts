import { useMutation, useQuery } from "@tanstack/react-query";
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
    queryFn: ChatService.GetAllUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  //create one to one chat
  const createOneToOneChat = useMutation({
    mutationFn: (userId: string) => ChatService.CreateOneToOneChat(userId),
    onSuccess: () => {
      fetchChatList.refetch();
    },
  });

  //Delete chat by ID
  const DeleteChat = useMutation({
    mutationFn: (chatId: string) => ChatService.DeleteChat(chatId),
    onSuccess: () => {
      fetchChatList.refetch();
    },
  });

  return {
    chatList: fetchChatList?.data?.data,
    availableUsers: fetchAvailableUsers?.data?.data,
    DeleteChat: DeleteChat.mutate,
    createOneToOneChat: createOneToOneChat.mutate,
  };
};
