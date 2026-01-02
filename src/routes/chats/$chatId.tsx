// src/routes/chats/$chatId.tsx
import { createFileRoute } from "@tanstack/react-router";
import AppLayout from "@/Components/Layout/AppLayout";
// import ChatRoomPage from "@/pages/chats/ChatRoomPage";

export const Route = createFileRoute("/chats/$chatId")({
  component: ChatRoute,
});

function ChatRoute() {
  return (
    <AppLayout>
      {/* <ChatRoomPage /> */}
      <h1>hello</h1>
    </AppLayout>
  );
}
