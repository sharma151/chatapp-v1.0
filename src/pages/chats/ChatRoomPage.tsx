const ChatRoomPage = ({
  chatId,
  userId,
}: {
  chatId: string;
  userId?: string;
}) => {
  return (
    <>
      <div className="p-4">
        <h1 className="text-xl font-bold">Chat Room</h1>
        <p>Chat ID: {chatId}</p>
        <p>User ID: {userId}</p>
      </div>
    </>
  );
};

export default ChatRoomPage;
