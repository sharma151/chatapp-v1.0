import CustomDropdown from "@/Components/UI/Dropdown";
import type { MenuProps } from "antd";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

const ChatRoomNav = ({ userName }: { userName?: string }) => {
  const items: MenuProps["items"] = [
    { key: "Delete", label: "Delete chat", icon: <MdDelete size={16} /> },
  ];
  return (
    <div className="  bg-white flex items-center justify-between px-3 h-16 border-b border-gray-400">
      <div className="font-semibold text-lg">{userName}</div>
      <CustomDropdown
        items={items}
        triggerContent={<BsThreeDotsVertical size={18} />}
      />
    </div>
  );
};

export default ChatRoomNav;
