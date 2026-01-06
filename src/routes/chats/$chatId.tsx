import { createFileRoute } from "@tanstack/react-router";
import AppLayout from "@/Components/Layout/AppLayout";
import ChatRoomPage from "@/pages/chats/ChatRoomPage";

type ChatSearch = {
  userId?: string;
};

export const Route = createFileRoute("/chats/$chatId")({
  validateSearch: (search: Record<string, unknown>): ChatSearch => {
    return {
      userId: search.userId as string | undefined,
    };
  },
  component: ChatRoute,
});

function ChatRoute() {
  const { chatId } = Route.useParams();
  const { userId } = Route.useSearch();

  return (
    <AppLayout>
      <ChatRoomPage chatId={chatId} userId={userId} />
    </AppLayout>
  );
}
