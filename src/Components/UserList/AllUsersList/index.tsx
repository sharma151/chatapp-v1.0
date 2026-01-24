import { FaArrowLeft } from "react-icons/fa";
import { useChat } from "@/core/hooks/api/useChat";
import defaultaimage from "@/assets/default-user.webp";
import { useNavigate } from "@tanstack/react-router";

interface AllUsersListProps {
  onBack: () => void;
}

const AllUsersList = ({ onBack }: AllUsersListProps) => {
  const { createOneToOneChat, availableUsers } = useChat();
  const navigate = useNavigate();

  const handleStartChat = (userId: number) => {
    onBack();
    createOneToOneChat(userId.toString());
    navigate({
      to: "/chats/$chatId",
      params: { chatId: userId.toString() },
      // search: { userId: userId },
    });
  };

  return (
    <div className="flex flex-col h-full bg-white animate-in fade-in duration-200">
      <div className="flex items-center gap-3 p-4 border-b border-gray-100 bg-gray-50">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-200 rounded-full transition-colors"
        >
          <FaArrowLeft size={16} />
        </button>
        <h3 className="font-semibold text-lg">New Chat</h3>
      </div>

      {/* User List */}
      <div className="space-y-1 overflow-y-auto max-h-screen mb-2 px-4">
        {Array.isArray(availableUsers) && availableUsers.length > 0 ? (
          availableUsers.map((user) => (
            <div
              key={user._id}
              className="flex items-center border-b  justify-between border-gray-200 space-x-3  p-2 hover:rounded-lg hover:bg-gray-100"
              onClick={() => handleStartChat(user._id)}
            >
              {" "}
              <div className="flex  items-center gap-3">
                <img
                  src={user.avatar?.url || defaultaimage}
                  alt={user?.participants?.[0]?.username}
                  className="w-10 h-10 rounded-full"
                />
                <span className="text-gray-800">{user?.username}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No available users.</p>
        )}
      </div>
    </div>
  );
};

export default AllUsersList;
