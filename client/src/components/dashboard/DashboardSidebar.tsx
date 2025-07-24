import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Map, 
  Users, 
  MessageCircle, 
  ChevronLeft, 
  ChevronRight,
  Heart
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardSidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const DashboardSidebar = ({ 
  activeView, 
  setActiveView, 
  collapsed, 
  setCollapsed 
}: DashboardSidebarProps) => {
  const menuItems = [
    {
      id: 'map',
      label: 'Mapa de Empresas',
      icon: Map,
    },
    {
      id: 'contacts',
      label: 'Directorio de Contactos',
      icon: Users,
    },
    {
      id: 'chat',
      label: 'Chat Comunitario',
      icon: MessageCircle,
    },
  ];

  return (
    <div className={cn(
      "absolute top-4 left-4 z-50 backdrop-blur-md bg-white/10 border border-white/20 rounded-lg flex flex-col transition-all duration-300 shadow-lg",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-white/20 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-white" />
            <span className="font-gasoek text-lg text-white">NATUR</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 text-white hover:bg-white/20"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={cn(
              "w-full justify-start text-white hover:bg-white/20",
              collapsed && "px-2",
              activeView === item.id && "bg-white/30 text-white hover:bg-white/40"
            )}
            onClick={() => setActiveView(item.id)}
          >
            <item.icon className={cn("h-4 w-4", !collapsed && "mr-2")} />
            {!collapsed && item.label}
          </Button>
        ))}
      </nav>
    </div>
  );
};