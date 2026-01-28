/* eslint-disable @typescript-eslint/no-explicit-any */
// A pure function to format a single chat object
export const formatChatData = (chat: any, loggedInUserId: string | undefined) => {
  if (!chat || !loggedInUserId) return null;

  const otherParticipant = chat.participants.find(
    (p: any) => p._id !== loggedInUserId
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