import { BsThreeDotsVertical } from "react-icons/bs";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
const SideBarNav = () => {
  return (
    <>
      <div className="flex items-center  justify-between p-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold  items-center">chatapp</h2>
        <div className="flex items-center gap-3">
          <button className="cursor-pointer">
            <IoChatboxEllipsesOutline size={20} />
          </button>
          <button className="cursor-pointer">
            <BsThreeDotsVertical size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBarNav;
