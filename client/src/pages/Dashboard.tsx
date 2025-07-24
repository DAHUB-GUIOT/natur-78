import React, { useState } from 'react';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { DashboardTopbar } from '@/components/dashboard/DashboardTopbar';
import { InteractiveMap } from '@/components/dashboard/InteractiveMap';
import { ContactSearch } from '@/components/dashboard/ContactSearch';
import { ChatSystem } from '@/components/dashboard/ChatSystem';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';

export default function Dashboard() {
  const [activeView, setActiveView] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderActiveView = () => {
    switch (activeView) {
      case 'overview':
        return <DashboardOverview />;
      case 'map':
        return <InteractiveMap />;
      case 'contacts':
        return <ContactSearch />;
      case 'chat':
        return <ChatSystem />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <DashboardSidebar 
        activeView={activeView}
        setActiveView={setActiveView}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <DashboardTopbar 
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />
        
        {/* Content area */}
        <main className="flex-1 overflow-auto">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
}