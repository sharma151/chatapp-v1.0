import { useState } from "react";
import CustomDropdown from "@/Components/UI/Dropdown";
import type { MenuProps } from "antd";
import { BsThreeDotsVertical, BsCheckLg } from "react-icons/bs"; // Added check icon
import { MdDelete, MdClose } from "react-icons/md"; // Added close icon
import { useActiveChat } from "@/core/hooks/common/useActiveChat";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import { HiUserAdd } from "react-icons/hi";
import { GiExitDoor } from "react-icons/gi";
import { useChat } from "@/core/hooks/api/useChat";
import { useNavigate } from "@tanstack/react-router";

const ChatRoomNav = () => {
  const { updateGroupChatName, DeleteChat } = useChat();
  const { activeChat } = useActiveChat();
  const navigate = useNavigate();

  const [isRenaming, setIsRenaming] = useState(false);
  const [tempName, setTempName] = useState("");

  const handleRenameSave = () => {
    if (
      tempName.trim() &&
      tempName !== activeChat?.Groupname &&
      activeChat?.chatId
    ) {
      updateGroupChatName({
        chatId: activeChat.chatId,
        name: tempName.trim(),
      });
    }
    setIsRenaming(false);
  };

  const onDropdownClick: MenuProps["onClick"] = (e) => {
    if (e.key === "Rename") {
      setTempName(activeChat?.Groupname || "");
      setIsRenaming(true);
    }
    if (e.key === "Delete") {
      DeleteChat(activeChat?.chatId || "");
      navigate({
        to: "/chats",
      });
    }
  };

  const items: MenuProps["items"] = [
    { key: "Delete", label: "Delete chat", icon: <MdDelete size={16} /> },
  ];

  const GroupChatItems: MenuProps["items"] = [
    {
      key: "GroupInfo",
      label: "View Group Info",
      icon: <AiOutlineInfoCircle size={16} />,
    },
    { key: "Rename", label: "Rename group", icon: <FaUserEdit size={16} /> },
    { key: "Add", label: "Add members", icon: <HiUserAdd size={16} /> },
    { key: "Leave", label: "Leave group", icon: <GiExitDoor size={16} /> },
    { key: "Delete", label: "Delete chat", icon: <MdDelete size={16} /> },
  ];

  return (
    <div className="bg-white flex items-center justify-between px-3 h-16 border-b border-gray-400">
      <div className="flex gap-2 items-center flex-1">
        <img
          src={activeChat?.otherAvatar}
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
        />

        {isRenaming ? (
          <div className="flex items-center gap-1 flex-1">
            <input
              autoFocus
              className="border-b border-gray-500 outline-none font-semibold text-lg px-1 w-full max-w-50"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleRenameSave()}
            />
            <button onClick={handleRenameSave} className="text-green-600">
              <BsCheckLg size={18} />
            </button>
            <button
              onClick={() => setIsRenaming(false)}
              className="text-red-500"
            >
              <MdClose size={18} />
            </button>
          </div>
        ) : (
          <div className="font-semibold text-lg">
            {activeChat?.isGroup
              ? activeChat?.Groupname
              : activeChat?.otherUsername}
          </div>
        )}
      </div>

      <CustomDropdown
        items={activeChat?.isGroup ? GroupChatItems : items}
        triggerContent={<BsThreeDotsVertical size={18} />}
        onMenuClick={onDropdownClick}
      />
    </div>
  );
};

export default ChatRoomNav;
