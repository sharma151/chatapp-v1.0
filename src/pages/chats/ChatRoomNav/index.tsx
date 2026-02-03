import CustomDropdown from "@/Components/UI/Dropdown";
import type { MenuProps } from "antd";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { useActiveChat } from "@/core/hooks/common/useActiveChat";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import { HiUserAdd } from "react-icons/hi";
import { GiExitDoor } from "react-icons/gi";
const ChatRoomNav = ({ handleMenuClick }: { handleMenuClick?: () => void }) => {
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

  const { activeChat } = useActiveChat();

  return (
    <div className="  bg-white flex items-center justify-between px-3 h-16 border-b border-gray-400">
      <div className="flex gap-2 items-center">
        <img
          src={activeChat?.otherAvatar}
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
        />
        <div className="font-semibold text-lg">
          {activeChat?.isGroup
            ? activeChat?.Groupname
            : activeChat?.otherUsername}
        </div>
      </div>

      <CustomDropdown
        items={activeChat?.isGroup ? GroupChatItems : items}
        triggerContent={<BsThreeDotsVertical size={18} />}
        onMenuClick={handleMenuClick}
      />
    </div>
  );
};

export default ChatRoomNav;
