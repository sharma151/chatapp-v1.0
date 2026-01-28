import { useState } from "react";
import { FaArrowLeft, FaCheck, FaArrowRight, FaCamera } from "react-icons/fa"; // Added icons
import { useChat } from "@/core/hooks/api/useChat";
import defaultaimage from "@/assets/default-user.webp";
import { useModalStore } from "@/store/modal.store";
// import { useNavigate } from "@tanstack/react-router";

const CreateGroupChat = () => {
  const { onCreateGroupClose } = useModalStore();
  const { createGroupChat, availableUsers } = useChat(); // Assuming createGroupChat exists in your hook
  //   const navigate = useNavigate();

  // State for group creation
  const [groupName, setGroupName] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Toggle user selection
  const handleToggleUser = (userId: string) => {
    setSelectedUserIds((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId); // Uncheck
      } else {
        return [...prev, userId]; // Check
      }
    });
  };

  // Handle Form Submit
  const handleCreateGroup = async () => {
    if (!groupName.trim() || selectedUserIds.length === 0) return;

    setIsLoading(true);
    try {
      // 1. Construct the payload as requested
      const payload = {
        name: groupName,
        participants: selectedUserIds,
      };

      // 2. Call your API hook
      //   const newChat = await createGroupChat(payload);
      createGroupChat(payload);
    } catch (error) {
      console.error("Failed to create group", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-100 bg-gray-50">
        <button
          onClick={onCreateGroupClose}
          className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-600"
        >
          <FaArrowLeft size={16} />
        </button>
        <div className="flex flex-col">
          <h3 className="font-semibold text-lg text-gray-800">New Group</h3>
          <span className="text-xs text-gray-500">
            {selectedUserIds.length} selected
          </span>
        </div>
      </div>

      {/* Group Info Section (Name Input) */}
      <div className="p-4 bg-white border-b border-gray-100 flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
          <FaCamera />
        </div>
        <input
          type="text"
          placeholder="Group Subject"
          className="flex-1 border-b-2 border-gray-100 py-2 focus:outline-none focus:border-green-500 transition-colors"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
      </div>

      {/* User List with Checkboxes */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
        <p className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
          Select Participants
        </p>

        {Array.isArray(availableUsers) && availableUsers.length > 0 ? (
          availableUsers.map((user) => {
            const isSelected = selectedUserIds.includes(user._id.toString());

            return (
              <div
                key={user._id}
                onClick={() => handleToggleUser(user._id.toString())}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                  isSelected ? "bg-green-50" : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Avatar with Stacked Checkmark logic */}
                  <div className="relative">
                    <img
                      src={user.avatar?.url || defaultaimage}
                      alt={user.username}
                      className="w-10 h-10 rounded-full object-cover border border-gray-100"
                    />
                    {isSelected && (
                      <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1 border-2 border-white animate-in zoom-in duration-200">
                        <FaCheck size={8} />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <span
                      className={`text-sm font-medium ${isSelected ? "text-green-800" : "text-gray-800"}`}
                    >
                      {user.username}
                    </span>
                    <span className="text-xs text-gray-500 line-clamp-1">
                      {user.email || "Available"}
                    </span>
                  </div>
                </div>

                {/* Checkbox UI */}
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    isSelected
                      ? "bg-green-500 border-green-500"
                      : "border-gray-300"
                  }`}
                >
                  {isSelected && <FaCheck size={10} className="text-white" />}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 py-8">No available users.</p>
        )}
      </div>

      {/* Floating Action Button (FAB) for Submit */}
      {selectedUserIds.length > 0 && groupName.length > 0 && (
        <div className="absolute bottom-6 right-6 animate-in slide-in-from-bottom duration-300">
          <button
            onClick={handleCreateGroup}
            disabled={isLoading}
            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <FaArrowRight size={20} />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateGroupChat;
