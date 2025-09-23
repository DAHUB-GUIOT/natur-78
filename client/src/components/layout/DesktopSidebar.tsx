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
        className={`fixed left-0 top-0 h-full z-40 bg-black/40 backdrop-blur-xl border-r border-white/20 transition-all duration-300 ${
          isOpen ? 'w-48' : 'w-16'
        }`}
      >
        <div className="flex flex-col h-full p-3">
          {/* Ultra-Compact Header */}
          <div className="flex items-center justify-between mb-6">
            <div className={`${!isOpen ? 'hidden' : 'block'}`}>
              <div className="w-8 h-8 bg-[#cad95e]/20 rounded-lg flex items-center justify-center border border-[#cad95e]/30">
                <span className="text-yellow-400 font-gasoek text-lg font-bold">N</span>
              </div>
              <p className="text-xs text-white/60 mt-1">{portalType === 'viajeros' ? 'Viajeros' : 'Empresas'}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="h-8 w-8 p-0 hover:bg-white/10 rounded-full"
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
                  w-full flex items-center gap-3 p-2 rounded-lg transition-all duration-200 relative
                  ${activeView === item.id 
                    ? 'bg-green-500/30 text-green-400' 
                    : 'text-white/80 hover:bg-white/10 hover:text-green-400'
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
          <div className={`${!isOpen ? 'hidden' : 'block'} mt-auto pt-4 border-t border-white/10`}>
            <Button
              onClick={signOut}
              className="w-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-200 hover:text-white transition-all duration-200 text-xs py-2"
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