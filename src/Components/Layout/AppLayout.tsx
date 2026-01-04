// src/components/layout/AppLayout.tsx
import Sidebar from "@/Components/chat/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex">
      {/* Left Sidebar */}
      <div className="w-95 border-r">
        <Sidebar />
      </div>

      {/* Right Panel */}
      <div className="flex-1">{children}</div>
    </div>
  );
}
