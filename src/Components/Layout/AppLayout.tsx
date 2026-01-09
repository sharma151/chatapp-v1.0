// src/components/layout/AppLayout.tsx
import Sidebar from "@/Components/chat/SideBar/index";
import ActionBar from "../ActionBar";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <PanelGroup direction="horizontal" className="h-screen">
      {/* Left Sidebar */}
      <div className="h-screen flex">
        <ActionBar />
      </div>
      <Panel defaultSize={30} minSize={20} maxSize={40}>
        <Sidebar />
      </Panel>
      <PanelResizeHandle className="w-0.5 bg-gray-300 cursor-col-resize hover:bg-gray-400" />
      {/* Right Panel */}
      <Panel>
        <div className="h-full flex-1">{children}</div>
      </Panel>
    </PanelGroup>
  );
}
