import AvailableUser from "@/Components/UserList/AvailableUser";
import SideBarNav from "@/Components/SideBar/SideBarNav/index";
// import AllUsersList from "@/Components/UserList/AllUsersList";
import { useModalStore } from "@/store/modal.store";
import UserDetailCard from "@/Components/UserDetail/UserDetailCard";
// import CreateGroupChat from "../CreateGroupChat";
import Users from "../UserList/Users";

const Sidebar = () => {
  const { onOpen, isOpen, isUserDetailOpen, onUserDetailClose } =
    useModalStore();

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        {isUserDetailOpen ? (
          <UserDetailCard onBack={onUserDetailClose} />
        ) : isOpen ? (
          // <AllUsersList onBack={onClose} />
          // <CreateGroupChat onBack={onClose} />
          <Users />
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
