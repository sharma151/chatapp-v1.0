// src/components/layout/AppLayout.tsx
import Sidebar from "@/Components/chat/SideBar/index";
import ActionBar from "../ActionBar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex">
      {/* Left Sidebar */}
      <ActionBar />
      <div className="w-120 border-r">
        <Sidebar />
      </div>

      {/* Right Panel */}
      <div className="flex-1">{children}</div>
    </div>
  );
}
