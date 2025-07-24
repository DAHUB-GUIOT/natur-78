import React, { useState } from 'react';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { InteractiveMap } from '@/components/dashboard/InteractiveMap';
import { ContactSearch } from '@/components/dashboard/ContactSearch';
import { ChatSystem } from '@/components/dashboard/ChatSystem';

export default function Dashboard() {
  const [activeView, setActiveView] = useState('map');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderActiveView = () => {
    switch (activeView) {
      case 'map':
        return <InteractiveMap />;
      case 'contacts':
        return <ContactSearch />;
      case 'chat':
        return <ChatSystem />;
      default:
        return <InteractiveMap />;
    }
  };

  return (
    <div className="h-screen flex overflow-hidden relative">
      {/* Main content - Full screen map */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Content area */}
        <main className="flex-1 overflow-hidden">
          {renderActiveView()}
        </main>
      </div>
      
      {/* Floating Sidebar */}
      <DashboardSidebar 
        activeView={activeView}
        setActiveView={setActiveView}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
    </div>
  );
}