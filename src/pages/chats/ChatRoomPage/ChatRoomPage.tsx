import React, { useState, useRef, useEffect } from "react";
import ChatService from "@/core/services/chat.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ChatRoomNav from "@/pages/chats/ChatRoomNav";
import { useAuthStore } from "@/store/auth.store";
import { useChat } from "@/core/hooks/api/useChat";
import { useNavigate } from "@tanstack/react-router";
import type { MenuProps } from "antd";
import { MdDelete } from "react-icons/md";
import CustomDropdown from "@/Components/UI/Dropdown";
import { FaAngleDown } from "react-icons/fa6";

interface Sender {
  _id: string;
  username: string;
  email: string;
  avatar?: {
    url?: string;
  };
}

interface Attachment {
  url: string;
}

interface Message {
  _id: string;
  content: string;
  sender: Sender;
  createdAt: string;
  attachments?: Attachment[];
}

interface ChatRoomPageProps {
  chatId: string;
  userName?: string;
}

const ChatRoomPage = ({ chatId, userName }: ChatRoomPageProps) => {
  const loggedInUserID = useAuthStore.getState().user;
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const { DeleteChat } = useChat();
  const navigate = useNavigate();

  // GET USER CHAT MESSAGES
  const { data: messages, isLoading } = useQuery({
    queryKey: ["chatMessages", chatId],
    queryFn: () => ChatService.GetChatById(chatId),
    enabled: !!chatId,
    select: (data) => {
      if (!Array.isArray(data)) return [];
      return [...data].sort(
        (a: Message, b: Message) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    },
  });

  //Delete Message by chatId and messageId
  const DeleteMessage = useMutation({
    mutationFn: ({
      chatId,
      messageId,
    }: {
      chatId: string;
      messageId: string;
    }) => ChatService.Deletemessage(chatId, messageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chatMessages", chatId] });
    },
  });

  //SEND MESSAGES
  const sendMessageMutation = useMutation({
    mutationFn: ({ chatId, content }: { chatId: string; content: string }) =>
      ChatService.SendMessage(chatId, content),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chatMessages", chatId] });
      setInputValue("");
    },
    onError: (error) => {
      console.error("Failed to send message", error);
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    sendMessageMutation.mutate({
      chatId,
      content: inputValue,
    });
  };

  const handleDeleteChat = () => {
    DeleteChat(chatId);
    navigate({
      to: "/chats",
    });
  };
  const handleMenuClick = (_id: string) => {
    DeleteMessage.mutate({ chatId, messageId: _id });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Loading conversation...
      </div>
    );
  }
  const items: MenuProps["items"] = [
    { key: "Delete", label: "Unsend", icon: <MdDelete size={16} /> },
  ];
  return (
    <div className="flex flex-col h-screen bg-[#efeae2]">
      <ChatRoomNav userName={userName} handleMenuClick={handleDeleteChat} />
      <div className="flex-1 overflow-y-scroll p-4 flex flex-col space-y-3">
        {messages?.map((message: Message) => {
          const isSender = message.sender._id === loggedInUserID?.id;
          const hasAttachments =
            message.attachments && message.attachments.length > 0;

          return (
            <div
              key={message._id}
              className={`flex ${isSender ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] rounded-lg px-3 py-2 text-sm shadow relative flex gap-2 group
                  ${
                    isSender
                      ? "bg-[#dcf8c6] rounded-tr-none"
                      : "bg-white rounded-tl-none"
                  }
                `}
              >
                {isSender ? (
                  <CustomDropdown
                    items={items}
                    buttonClassName="!hidden group-hover:!block absolute top-2 right-2 z-10 bg-white/50 rounded-full p-1"
                    triggerContent={<FaAngleDown size={12} />}
                    onMenuClick={() => {
                      handleMenuClick(message._id);
                    }}
                  />
                ) : (
                  ""
                )}
                <div>
                  {!isSender && (
                    <p className="text-xs font-bold text-blue-600 mb-1">
                      {message.sender.username}
                    </p>
                  )}

                  {hasAttachments && (
                    <div className="mb-2">
                      {message.attachments!.map((attachment, index) => (
                        <img
                          key={index}
                          src={attachment.url}
                          alt="attachment"
                          className="rounded-lg max-h-64 object-cover"
                        />
                      ))}
                    </div>
                  )}

                  {message.content && (
                    <p className="text-gray-900 wrap-break-words leading-relaxed">
                      {message.content}
                    </p>
                  )}

                  <p className="text-[10px] text-gray-500 text-right mt-1 ml-4">
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white border-t flex items-center gap-2">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          disabled={sendMessageMutation.isPending}
          className="flex-1 px-4 py-2 rounded-full border bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        />
        <button
          onClick={handleSendMessage}
          disabled={!inputValue.trim() || sendMessageMutation.isPending}
          className={`
            bg-blue-500 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors
            ${
              !inputValue.trim() || sendMessageMutation.isPending
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600"
            }
          `}
        >
          {sendMessageMutation.isPending ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatRoomPage;
