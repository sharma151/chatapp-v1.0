import CustomDropdown from "@/Components/UI/Dropdown";
import type { MenuProps } from "antd";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { useChatDetailStore } from "@/store/userchatDetail.store";
const ChatRoomNav = ({ handleMenuClick }: { handleMenuClick?: () => void }) => {
  const { selectedChat } = useChatDetailStore();

  const items: MenuProps["items"] = [
    { key: "Delete", label: "Delete chat", icon: <MdDelete size={16} /> },
  ];
  const ischatGroup = selectedChat?.isGroup;

  return (
    <div className="  bg-white flex items-center justify-between px-3 h-16 border-b border-gray-400">
      <div className="flex gap-2 items-center">
        <img
          src={selectedChat?.otherAvatar}
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
        />
        <div className="font-semibold text-lg">
          {ischatGroup ? selectedChat?.Groupname : selectedChat?.otherUsername}
        </div>
      </div>
      <CustomDropdown
        items={items}
        triggerContent={<BsThreeDotsVertical size={18} />}
        onMenuClick={handleMenuClick}
      />
    </div>
  );
};

export default ChatRoomNav;
