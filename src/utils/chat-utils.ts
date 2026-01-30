/* eslint-disable @typescript-eslint/no-explicit-any */
interface chatFormattedResponse {
  Groupname: string;
  name: string;
  _id: string;
  participants: any;
  isGroupChat: boolean;
  chatId: string;
  otherUsername: string;
  otherAvatar: string;
  lastMessage: {
    sender: { username: string };
    content: string;
  } | null;
}

export const formatChatData = (
  chat: chatFormattedResponse,
  loggedInUserId: string | undefined,
) => {
  if (!chat || !loggedInUserId) return null;

  const otherParticipant = chat.participants.find(
    (p: any) => p._id !== loggedInUserId,
  );

  if (!otherParticipant) return null;

  return {
    Groupname: chat.name,
    isGroup: chat.isGroupChat,
    chatId: chat._id,
    otherUsername: otherParticipant.username,
    otherAvatar: otherParticipant.avatar?.url || "",
    lastMessage: chat.lastMessage
      ? {
          senderUsername: chat.lastMessage.sender.username,
          content: chat.lastMessage.content || "",
        }
      : null,
  };
};