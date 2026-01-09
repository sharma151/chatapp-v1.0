import { IoCamera } from "react-icons/io5";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa";
import defaultaimage from "@/assets/default-user.webp";
import { useRef } from "react";
import { useAuth } from "@/core/hooks/api/useAuth";

interface AllUsersListProps {
  onBack: () => void;
}

const UserDetailCard = ({ onBack }: AllUsersListProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { updateAvatar, userdetail } = useAuth();

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-[#111b21] text-[#e9edef] min-h-screen mx-auto flex flex-col font-sans">
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

      <div className="flex flex-col items-center my-8 relative">
        <div className="relative group mb-4">
          <div className="w-48 h-48 rounded-full overflow-hidden border-none">
            {userdetail?.account?.avatar?.url ? (
              <img
                src={userdetail?.account?.avatar?.url}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={defaultaimage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const formData = new FormData();
                formData.append("avatar", file);
                updateAvatar(formData);
              }
            }}
          />
          <button
            onClick={handleButtonClick}
            className="absolute bottom-2 left-2 bg-[#00a884] p-3 rounded-full shadow-lg hover:bg-[#06cf9c] transition-colors"
            title="Edit Avatar"
          >
            <IoCamera size={20} className="text-white" />
          </button>
        </div>
        <section className="flex  flex-col items-center">
          <label className="text-[#00a884] text-sm  w-fit">BIO</label>
          <div className="">
            <span className="text-lg">{userdetail?.bio}</span>
          </div>
        </section>
      </div>

      <div className="flex-1 space-y-8 p-8">
        {/* Name Section */}
        <section>
          <label className="text-[#00a884] text-sm block mb-4">User name</label>
          <div className="flex items-center justify-between">
            <span className="text-lg">{userdetail?.account?.username}</span>
            <HiOutlinePencilAlt
              size={20}
              className="text-[#8696a0] cursor-pointer hover:text-[#e9edef]"
            />
          </div>
        </section>

        <section>
          <label className="text-[#8696a0] text-sm block mb-4">Full Name</label>
          <div className="flex items-center justify-between">
            <span className="text-lg">
              {userdetail?.firstName} {userdetail?.lastName}
            </span>
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
              {userdetail?.account?.email || "Hey there! I am using WhatsApp."}
            </span>
            <HiOutlinePencilAlt
              size={20}
              className="text-[#8696a0] cursor-pointer hover:text-[#e9edef]"
            />
          </div>
        </section>
        <section>
          <label className="text-[#8696a0] text-sm block mb-4">Phone</label>
          <div className="flex items-center justify-between">
            <span className="text-lg">
              {userdetail?.phoneNumber || "Hey there! I am using WhatsApp."}
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
