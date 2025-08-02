import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Map, Building2, Star, MessageCircle, Settings, ShieldCheck, 
  ChevronLeft, ChevronRight, Pin, X, Menu, Minimize2, Maximize2,
  Bell, Search, Filter
} from "lucide-react";

interface AdaptiveSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  user: any;
  notificationCount?: number;
  messageCount?: number;
  onSearchFocus?: () => void;
  isMapView: boolean;
}

const AdaptiveSidebar: React.FC<AdaptiveSidebarProps> = ({
  activeSection,
  setActiveSection,
  user,
  notificationCount = 0,
  messageCount = 0,
  onSearchFocus,
  isMapView
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPinned, setIsPinned] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive detection
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile && isPinned) {
        setIsPinned(false);
        setIsCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isPinned]);

  const sidebarItems = [
    { 
      id: "mapa", 
      label: "Explorar Mapa", 
      icon: Map, 
      shortLabel: "Mapa",
      description: "Vista principal del territorio",
      priority: 1
    },
    { 
      id: "empresas", 
      label: "Directorio Empresarial", 
      icon: Building2, 
      shortLabel: "Empresas",
      description: "Red de aliados comerciales",
      priority: 2
    },
    { 
      id: "experiencias", 
      label: "Gestión de Experiencias", 
      icon: Star, 
      shortLabel: "Experiencias",
      description: "Productos turísticos",
      priority: 2
    },
    { 
      id: "mensajes", 
      label: "Centro de Mensajes", 
      icon: MessageCircle, 
      shortLabel: "Mensajes",
      description: "Comunicación directa",
      priority: 3,
      badge: messageCount > 0 ? messageCount : null
    },
    { 
      id: "ajustes", 
      label: "Configuración", 
      icon: Settings, 
      shortLabel: "Ajustes",
      description: "Personalización de cuenta",
      priority: 4
    },
    ...(user?.role === 'admin' ? [{ 
      id: "admin", 
      label: "Panel Administrativo", 
      icon: ShieldCheck, 
      shortLabel: "Admin",
      description: "Gestión de plataforma",
      priority: 5
    }] : [])
  ];

  // Smart sidebar behavior based on context
  const getSidebarMode = () => {
    if (isMobile) return 'overlay';
    if (isMapView && !isPinned) return 'floating';
    if (isCollapsed) return 'minimal';
    return 'full';
  };

  const sidebarMode = getSidebarMode();

  // Handle navigation with map context preservation
  const handleNavigation = (itemId: string) => {
    if (itemId === 'admin') {
      window.location.href = '/admin';
      return;
    }
    
    setActiveSection(itemId);
    
    // Auto-minimize sidebar on mobile after selection
    if (isMobile) {
      setIsMinimized(true);
    }
    
    // Smart collapse for non-map views
    if (itemId !== 'mapa' && !isPinned && !isMobile) {
      setIsCollapsed(true);
    }
  };

  // Compact width for better UX
  const getSidebarWidth = () => {
    switch (sidebarMode) {
      case 'overlay': return 'w-56';
      case 'floating': return 'w-48';
      case 'minimal': return 'w-12';
      case 'full': return 'w-48'; // Reduced from w-72 to w-48
      default: return 'w-48';
    }
  };

  // Position classes
  const getPositionClasses = () => {
    if (sidebarMode === 'overlay') {
      return 'fixed inset-y-0 left-0 z-50 transform transition-transform duration-300';
    }
    if (sidebarMode === 'floating') {
      return 'fixed top-24 left-6 bottom-6 z-40 rounded-lg shadow-2xl';
    }
    return 'fixed inset-y-0 left-0 z-40';
  };

  if (isMinimized && isMobile) {
    return (
      <Button
        onClick={() => setIsMinimized(false)}
        className="fixed top-16 left-4 z-50 w-10 h-10 bg-black/80 hover:bg-black/90 border border-white/20 text-white shadow-xl backdrop-blur-sm"
      >
        <Menu className="w-4 h-4" />
      </Button>
    );
  }

  return (
    <>
      {/* Mobile overlay backdrop */}
      {sidebarMode === 'overlay' && !isMinimized && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setIsMinimized(true)}
        />
      )}

      {/* Adaptive Sidebar */}
      <aside
        className={`
          ${getSidebarWidth()}
          ${getPositionClasses()}
          bg-black/80 backdrop-blur-xl 
          border-r border-white/10
          transition-all duration-300 ease-in-out
          ${sidebarMode === 'floating' ? 'border rounded-lg' : ''}
          ${isMinimized && isMobile ? '-translate-x-full' : ''}
        `}
      >
        {/* Compact Header */}
        <div className="p-2 border-b border-white/10">
          <div className="flex items-center justify-between">
            {/* NATUR Branding - Smaller */}
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-[#cad95e] flex items-center justify-center shadow-lg">
                <span className="text-black font-gasoek text-xs font-bold">N</span>
              </div>
              {sidebarMode !== 'minimal' && (
                <div>
                  <h1 className="text-sm font-gasoek text-white uppercase tracking-wider">NATUR</h1>
                  <p className="text-xs text-white/60 font-jakarta">Portal</p>
                </div>
              )}
            </div>

            {/* Compact Control Buttons */}
            <div className="flex items-center space-x-1">
              {!isMobile && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsPinned(!isPinned)}
                    className="w-6 h-6 p-0 text-white/60 hover:text-[#cad95e]"
                    title={isPinned ? "Desanclar" : "Anclar"}
                  >
                    <Pin className={`w-3 h-3 ${isPinned ? 'fill-current' : ''}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="w-6 h-6 p-0 text-white/60 hover:text-[#cad95e]"
                    title={isCollapsed ? "Expandir" : "Contraer"}
                  >
                    {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
                  </Button>
                </>
              )}
              {isMobile && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(true)}
                  className="w-6 h-6 p-0 text-white/60 hover:text-[#cad95e]"
                >
                  <X className="w-3 h-3" />
                </Button>
              )}
            </div>
          </div>

          {/* Compact Search */}
          {sidebarMode === 'full' || sidebarMode === 'overlay' && (
            <div className="mt-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-white/40" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-full pl-7 pr-3 py-1.5 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/40 text-xs font-jakarta focus:outline-none focus:border-[#cad95e] focus:ring-1 focus:ring-[#cad95e]/20"
                  onFocus={onSearchFocus}
                />
              </div>
            </div>
          )}
        </div>

        {/* Compact Navigation Section */}
        <nav className="flex-1 overflow-y-auto p-1">
          <div className="space-y-0.5">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`
                    w-full flex items-center space-x-2 px-2 py-2 rounded-md transition-all duration-200 font-jakarta group
                    ${isActive 
                      ? 'bg-[#cad95e]/20 text-[#cad95e] border border-[#cad95e]/30 shadow-sm' 
                      : 'text-white/70 hover:bg-white/10 hover:text-white hover:shadow-sm'
                    }
                    ${sidebarMode === 'minimal' ? 'justify-center' : ''}
                  `}
                  title={sidebarMode === 'minimal' ? item.label : ''}
                >
                  <div className="relative">
                    <Icon className={`w-3 h-3 ${isActive ? 'text-[#cad95e]' : ''} transition-colors`} />
                    {item.badge && (
                      <Badge className="absolute -top-1 -right-1 w-3 h-3 p-0 bg-red-500 text-white text-xs flex items-center justify-center">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  
                  {sidebarMode !== 'minimal' && (
                    <div className="flex-1 text-left">
                      <div className="text-xs font-medium text-white">
                        {sidebarMode === 'floating' ? item.shortLabel : item.label}
                      </div>
                      {sidebarMode === 'full' && (
                        <div className="text-xs opacity-60 mt-0.5 text-white/60">
                          {item.description}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Active indicator */}
                  {isActive && (
                    <div className="w-0.5 h-4 bg-[#cad95e] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Compact Footer */}
        {sidebarMode === 'full' && (
          <div className="p-2 border-t border-white/10">
            <div className="flex items-center justify-between text-xs text-white/60 font-jakarta">
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span>Online</span>
              </div>
              {notificationCount > 0 && (
                <Badge className="bg-[#cad95e]/20 text-[#cad95e] px-1 py-0.5 text-xs">
                  {notificationCount}
                </Badge>
              )}
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default AdaptiveSidebar;