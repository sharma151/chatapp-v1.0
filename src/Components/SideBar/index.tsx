import AvailableUser from "@/Components/UserList/AvailableUser";
import SideBarNav from "@/Components/SideBar/SideBarNav/index";
// import AllUsersList from "@/Components/UserList/AllUsersList";
import { useModalStore } from "@/store/modal.store";
import UserDetailCard from "@/Components/UserDetail/UserDetailCard";
import CreateGroupChat from "../CreateGroupChat";

const Sidebar = () => {
  const { onClose, onOpen, isOpen, isUserDetailOpen, onUserDetailClose } =
    useModalStore();

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        {isUserDetailOpen ? (
          <UserDetailCard onBack={onUserDetailClose} />
        ) : isOpen ? (
          // <AllUsersList onBack={onClose} />
          <CreateGroupChat onBack={onClose} />
        ) : (
          <>
            <SideBarNav onOpenNewChat={onOpen} />
            <AvailableUser />
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
