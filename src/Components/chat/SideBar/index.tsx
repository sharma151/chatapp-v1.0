import AvailableUser from "@/Components/chat/AvailableUser";
import SideBarNav from "@/Components/chat/SideBar/SideBarNav/index";
import AllUsersList from "@/Components/chat/AllUsersList";
import { useModalStore } from "@/app/store/modal.store";

const Sidebar = () => {
  const { onClose, onOpen, isOpen } = useModalStore();

  return (
    <div className="flex flex-col h-full">
      <SideBarNav onOpenNewChat={onOpen} />

      <div className="flex-1 overflow-y-auto">
        {isOpen ? <AllUsersList onBack={onClose} /> : <AvailableUser />}
      </div>
    </div>
  );
};

export default Sidebar;
