/* eslint-disable @typescript-eslint/no-explicit-any */

import { useChat } from "@/core/hooks/api/useChat";
import defaultaimage from "@/assets/default-user.webp";
import CustomDropdown from "@/Components/UI/Dropdown";
import { BsThreeDotsVertical } from "react-icons/bs";
import type { MenuProps } from "antd";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/store/auth.store";
import { formatChatData } from "@/utils/chat-utils";

const AvailableUser = () => {
  const { chatList, DeleteChat } = useChat();
  const navigate = useNavigate();
  const loggedInUserID = useAuthStore.getState().user;
  const items: MenuProps["items"] = [
    { key: "Delete", label: "Delete", icon: <MdDelete size={16} /> },
  ];

  const handleMenuClick = (e: any, chatId: string) => {
    if (e.key === "Delete") {
      console.log("Deleting chat with ID:", chatId);
      DeleteChat(chatId);
    }
  };
  const handleRowClick = ({
    chat,
  }: {
    chat: { chatId: string; otherUsername: string };
  }) => {
    navigate({
      to: "/chats/$chatId",
      params: { chatId: chat.chatId },
      search: { userId: chat.otherUsername },
    });
  };

  const loggedInUserId = loggedInUserID?.id;

  //   ? chatList
  //       .map((chat) => {
  //         const otherParticipant = chat.participants.find(
  //           (p: { _id: string | undefined }) => p._id !== loggedInUserId,
  //         );

  //         if (!otherParticipant) {
  //           return null;
  //         }

  //         const lastMsg = chat.lastMessage;

  //         return {
  //           Groupname: chat.name,
  //           isGroup: chat.isGroupChat,
  //           chatId: chat._id,
  //           otherUsername: otherParticipant.username,
  //           otherAvatar: otherParticipant.avatar?.url || "",
  //           lastMessage: lastMsg
  //             ? {
  //                 senderUsername: lastMsg.sender.username,
  //                 content: lastMsg.content || "",
  //               }
  //             : null,
  //         };
  //       })
  //       .filter((chat): chat is NonNullable<typeof chat> => chat !== null)
  //   : [];

  const formattedChats =
    (Array.isArray(chatList) ? chatList : [])
      ?.map((c: any) => formatChatData(c, loggedInUserId))
      .filter(Boolean) || [];

  return (
    <>
      <div className="p-4 ">
        <h2 className="text-md font-semibold mb-2">Available Users</h2>
        <div className="space-y-1 overflow-y-auto max-h-96">
          {formattedChats.length > 0 ? (
            formattedChats.map((chat: any) => (
              <div
                key={chat?.chatId}
                onClick={() => handleRowClick(chat)}
                className="flex items-center border-b justify-between border-gray-200 space-x-3 p-2 hover:rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={chat?.otherAvatar || defaultaimage}
                    alt={chat?.otherUsername}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex flex-col">
                    <span className="text-gray-800 text-md">
                      {chat?.isGroup ? chat?.Groupname : chat?.otherUsername}
                    </span>
                    <span className="text-xs text-gray-500 ">
                      {chat?.lastMessage?.content}
                    </span>
                  </div>
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                  <CustomDropdown
                    items={items}
                    triggerContent={<BsThreeDotsVertical size={18} />}
                    onMenuClick={(e) => handleMenuClick(e, chat?.chatId)}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No available users.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AvailableUser;
