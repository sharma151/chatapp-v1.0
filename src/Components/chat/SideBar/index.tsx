import { useState } from "react";
import AvailableUser from "@/Components/chat/AvailableUser";
import SideBarNav from "@/Components/chat/SideBarNav/index";
import AllUsersList from "@/Components/chat/AllUsersList"; 

const Sidebar = () => {
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <SideBarNav onOpenNewChat={() => setIsNewChatOpen(true)} />
      
      <div className="flex-1 overflow-y-auto">
        {isNewChatOpen ? (
          <AllUsersList onBack={() => setIsNewChatOpen(false)} />
        ) : (
          <AvailableUser />
        )}
      </div>
    </div>
  );
};

export default Sidebar;