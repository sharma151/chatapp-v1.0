import { useModalStore } from "@/app/store/modal.store";

const ActionBar = () => {
  const { onUserDetailOpen } = useModalStore();
  return (
    <>
      <p onClick={onUserDetailOpen}>open </p>
    </>
  );
};

export default ActionBar;
