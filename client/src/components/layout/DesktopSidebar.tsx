import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';

interface DesktopSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activeView: string;
  onNavigation: (viewId: string) => void;
  navItems: Array<{id: string; label: string; icon: React.ComponentType<any>}>;
  portalType?: 'empresas' | 'viajeros';
  showHeaderButtons?: boolean;
}

export function DesktopSidebar({ 
  isOpen, 
  onToggle, 
  activeView, 
  onNavigation, 
  navItems,
  portalType = 'empresas',
  showHeaderButtons = false
}: DesktopSidebarProps) {
  const { signOut } = useAuth();

  return (
    <div className="hidden lg:block">
      <div 
        className={`fixed left-0 top-0 h-full z-40 bg-white/5 backdrop-blur-2xl border-r border-white/10 shadow-lg transition-all duration-300 ${
          isOpen ? 'w-48' : 'w-16'
        }`}
      >
        <div className="flex flex-col h-full p-3">
          {/* Ultra-Compact Header */}
          <div className="flex items-center justify-between mb-6">
            <div className={`${!isOpen ? 'hidden' : 'block'}`}>
              <div className="w-8 h-8 bg-white/10 backdrop-blur-lg rounded-lg flex items-center justify-center border border-white/20 shadow-sm">
                <span className="text-green-400 font-gasoek text-lg font-bold">N</span>
              </div>
              <p className="text-xs text-white/60 mt-1">{portalType === 'viajeros' ? 'Viajeros' : 'Empresas'}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="h-8 w-8 p-0 hover:bg-white/20 rounded-full backdrop-blur-lg"
            >
              <span className="text-white text-sm">{isOpen ? '←' : '→'}</span>
            </Button>
          </div>

          {/* Ultra-Compact Navigation */}
          <div className="flex-1 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigation(item.id)}
                className={`
                  w-full flex items-center gap-3 p-2 rounded-lg transition-all duration-200 relative backdrop-blur-lg
                  ${activeView === item.id 
                    ? 'bg-white/20 text-green-400 border border-white/30 shadow-sm' 
                    : 'text-white/90 hover:bg-white/15 hover:text-green-400 border border-transparent'
                  }
                `}
                title={item.label}
              >
                <item.icon className="text-lg w-5 h-5" />
                <span className={`${!isOpen ? 'hidden' : 'block'} text-sm font-medium`}>
                  {item.label}
                </span>
                {activeView === item.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-400 rounded-r"></div>}
              </button>
            ))}
          </div>

          {/* Compact Footer - Logout */}
          <div className={`${!isOpen ? 'hidden' : 'block'} mt-auto pt-4 border-t border-white/20`}>
            <Button
              onClick={signOut}
              className="w-full bg-white/10 hover:bg-white/20 border border-white/30 text-white/80 hover:text-white transition-all duration-200 text-xs py-2 backdrop-blur-lg"
              variant="outline"
            >
              <LogOut className="w-3 h-3 mr-2" />
              Salir
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}