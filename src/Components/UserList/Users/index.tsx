import CreateGroupChat from "@/Components/CreateGroupChat";
import AllUsersList from "../AllUsersList";
import { useModalStore } from "@/store/modal.store";

const Users = () => {
  const { onClose, isCreateGroupOpen } = useModalStore();
  return (
    <>
      {isCreateGroupOpen ? (
        <CreateGroupChat />
      ) : (
        <AllUsersList onBack={onClose} />
      )}
    </>
  );
};
export default Users;
