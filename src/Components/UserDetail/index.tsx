import { useAuthStore } from "@/store/auth.store";
import { useModalStore } from "@/store/modal.store";

const UserDetailActionButton = () => {
  const { onUserDetailOpen } = useModalStore();
  const user = useAuthStore((state) => state.user);
  return (
    <>
      <div className="w-18 shrink-0 flex flex-col  items-center justify-end  ">
        <div
          className="w-14 h-14 rounded-full overflow-hidden border-none flex justify-end"
          onClick={onUserDetailOpen}
        >
          <img
            src={user?.avatar}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default UserDetailActionButton;
