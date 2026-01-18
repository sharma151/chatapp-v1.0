// src/routes/chats/index.tsx
import { createFileRoute } from "@tanstack/react-router";
import AppLayout from "@/Components/Layout/AppLayout";

export const Route = createFileRoute("/chats/")({
  component: ChatsHomePage,
});

function ChatsHomePage() {
  return (
    <AppLayout>
      <div className="flex h-full items-center justify-center text-gray-400">
        Select a chat to start messaging
      </div>
    </AppLayout>
  );
}
