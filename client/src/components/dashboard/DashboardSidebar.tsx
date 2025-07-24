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
      id: 'overview',
      label: 'Panel General',
      icon: LayoutDashboard,
    },
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
      "bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-green-600" />
            <span className="font-gasoek text-lg text-green-700">NATUR</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="p-1"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={activeView === item.id ? "default" : "ghost"}
            className={cn(
              "w-full justify-start",
              collapsed && "px-2",
              activeView === item.id && "bg-green-100 text-green-700 hover:bg-green-200"
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