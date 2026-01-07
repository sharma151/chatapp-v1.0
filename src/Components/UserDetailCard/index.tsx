import { useAuthStore } from "@/app/store/auth.store";
import { IoCamera } from "react-icons/io5";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa";
import defaultaimage from "@/assets/default-user.webp";

interface AllUsersListProps {
  onBack: () => void;
}

const UserDetailCard = ({ onBack }: AllUsersListProps) => {
  const user = useAuthStore((state) => state.user);

  // Mock data if user is empty for testing
  const userData = user || {
    name: "Saurav Sharma",
    about: "Hey there! I am using WhatsApp.",
    phone: "+977 976-3299993",
    avatar: defaultaimage,
    email: "example@mail.com",
  };

  return (
    <div className="bg-[#111b21] text-[#e9edef] min-h-screen max-w-md mx-auto flex flex-col font-sans">
      {/* Header */}

      <div className="flex items-center gap-3 p-4 border-b ">
        <button
          onClick={onBack}
          className="p-2  rounded-full transition-colors cursor-pointer"
        >
          <FaArrowLeft size={16} />
        </button>
        <h3 className="font-semibold text-lg">Back</h3>
      </div>

      <div className="flex items-center p-5 pt-12">
        <h1 className="text-xl font-medium">Profile</h1>
      </div>

      <div className="flex justify-center my-8 relative">
        <div className="relative group">
          <div className="w-48 h-48 rounded-full overflow-hidden border-none">
            <img
              src={userData.avatar}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <button
            className="absolute bottom-2 left-2 bg-[#00a884] p-3 rounded-full shadow-lg hover:bg-[#06cf9c] transition-colors"
            title="Edit Avatar"
          >
            <IoCamera size={20} className="text-white" />
          </button>
        </div>
      </div>

      <div className="flex-1 space-y-8 p-8">
        {/* Name Section */}
        <section>
          <label className="text-[#00a884] text-sm block mb-4">Name</label>
          <div className="flex items-center justify-between">
            <span className="text-lg">{userData.name}</span>
            <HiOutlinePencilAlt
              size={20}
              className="text-[#8696a0] cursor-pointer hover:text-[#e9edef]"
            />
          </div>
        </section>

        {/* About Section */}
        <section>
          <label className="text-[#8696a0] text-sm block mb-4">Email</label>
          <div className="flex items-center justify-between">
            <span className="text-lg">
              {userData?.email || "Hey there! I am using WhatsApp."}
            </span>
            <HiOutlinePencilAlt
              size={20}
              className="text-[#8696a0] cursor-pointer hover:text-[#e9edef]"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserDetailCard;
