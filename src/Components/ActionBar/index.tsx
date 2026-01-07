import { useAuthStore } from "@/app/store/auth.store";

const ActionBar = () => {
  const user = useAuthStore((state) => state.user);
  console.log(user);
  return (
    <>
      <div className="w-20 border border-r shrink-0 h-full ">
        
      </div>
    </>
  );
};

export default ActionBar;
