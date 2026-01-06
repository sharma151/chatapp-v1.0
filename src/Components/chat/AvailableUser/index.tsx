/* eslint-disable @typescript-eslint/no-explicit-any */
import { useChat } from "@/core/hooks/api/useChat";
import defaultaimage from "@/assets/default-user.webp";
import CustomDropdown from "@/Components/UI/Dropdown";
import { BsThreeDotsVertical } from "react-icons/bs";
import type { MenuProps } from "antd";
import { MdDelete } from "react-icons/md";

const AvailableUser = () => {
  const { chatList, DeleteChat } = useChat();
  const items: MenuProps["items"] = [
    { key: "Delete", label: "Delete", icon: <MdDelete size={16} /> },
  ];

  const handleMenuClick = (e: any, chatId: string) => {
    if (e.key === "Delete") {
      console.log("Deleting chat with ID:", chatId);
      DeleteChat(chatId);
    }
  };
  return (
    <>
      <div className="p-4 ">
        <h2 className="text-md font-semibold mb-2">Available Users</h2>
        <div className="space-y-1 overflow-y-auto max-h-96">
          {Array.isArray(chatList) && chatList.length > 0 ? (
            chatList.map((user) => (
              <div
                key={user._id}
                className="flex items-center border-b  justify-between border-gray-200 space-x-3  p-2 hover:rounded-lg hover:bg-gray-100"
              >
                {" "}
                <div className="flex  items-center gap-3">
                  <img
                    src={user.avatar?.url || defaultaimage}
                    alt={user?.participants?.[0]?.username}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="text-gray-800">
                    {user?.participants?.[0]?.username}
                  </span>
                </div>
                <div>
                  <CustomDropdown
                    items={items}
                    triggerContent={<BsThreeDotsVertical size={18} />}
                    onMenuClick={(e) => handleMenuClick(e, user._id)}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No available users.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AvailableUser;
