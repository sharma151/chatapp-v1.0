import CustomDropdown from "@/Components/UI/Dropdown";
import type { MenuProps } from "antd";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { useAuth } from "@/core/hooks/api/useAuth";
interface SideBarNavProps {
  onOpenNewChat: () => void;
}

const SideBarNav = ({ onOpenNewChat }: SideBarNavProps) => {
  const { logout } = useAuth();
  const items: MenuProps["items"] = [
    { key: "Logout", label: "Logout", icon: <TbLogout size={16} /> },
  ];

  const handleLogoutUser = () => {
    logout();
  };
  return (
    <>
      <div className="flex items-center  justify-between p-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold  items-center">chatapp</h2>
        <div className="flex items-center gap-3">
          <button className="cursor-pointer" onClick={onOpenNewChat}>
            <IoChatboxEllipsesOutline size={20} />
          </button>

          <div>
            <CustomDropdown
              items={items}
              triggerContent={<BsThreeDotsVertical size={18} />}
              onMenuClick={handleLogoutUser}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBarNav;
