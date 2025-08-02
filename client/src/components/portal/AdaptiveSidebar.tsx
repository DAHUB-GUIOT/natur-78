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

  // Adaptive width based on mode
  const getSidebarWidth = () => {
    switch (sidebarMode) {
      case 'overlay': return 'w-80';
      case 'floating': return 'w-64';
      case 'minimal': return 'w-16';
      case 'full': return 'w-72';
      default: return 'w-72';
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
        className="fixed top-20 left-4 z-50 w-12 h-12 bg-[var(--color-surface)]/95 hover:bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] shadow-xl backdrop-blur-sm"
      >
        <Menu className="w-5 h-5" />
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
          bg-[var(--color-surface)]/95 backdrop-blur-xl 
          border-r border-[var(--color-border)]
          transition-all duration-300 ease-in-out
          ${sidebarMode === 'floating' ? 'border rounded-lg' : ''}
          ${isMinimized && isMobile ? '-translate-x-full' : ''}
        `}
      >
        {/* Header Section */}
        <div className="p-4 border-b border-[var(--color-border)]/30">
          <div className="flex items-center justify-between">
            {/* NATUR Branding */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[var(--color-accent)] flex items-center justify-center shadow-lg">
                <span className="text-black font-gasoek text-sm font-bold">N</span>
              </div>
              {sidebarMode !== 'minimal' && (
                <div>
                  <h1 className="text-lg font-gasoek text-[var(--color-text)] uppercase tracking-wider">NATUR</h1>
                  <p className="text-xs text-[var(--color-text)]/60 font-jakarta">Portal Empresas</p>
                </div>
              )}
            </div>

            {/* Control Buttons */}
            <div className="flex items-center space-x-1">
              {!isMobile && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsPinned(!isPinned)}
                    className="w-8 h-8 p-0 text-[var(--color-text)]/60 hover:text-[var(--color-accent)]"
                    title={isPinned ? "Desanclar" : "Anclar"}
                  >
                    <Pin className={`w-4 h-4 ${isPinned ? 'fill-current' : ''}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="w-8 h-8 p-0 text-[var(--color-text)]/60 hover:text-[var(--color-accent)]"
                    title={isCollapsed ? "Expandir" : "Contraer"}
                  >
                    {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                  </Button>
                </>
              )}
              {isMobile && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(true)}
                  className="w-8 h-8 p-0 text-[var(--color-text)]/60 hover:text-[var(--color-accent)]"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Quick Search - Only in expanded modes */}
          {sidebarMode === 'full' || sidebarMode === 'overlay' && (
            <div className="mt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--color-text)]/40" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-full pl-10 pr-4 py-2 bg-[var(--color-bg)]/50 border border-[var(--color-border)]/50 rounded-md text-[var(--color-text)] placeholder-[var(--color-text)]/40 text-sm font-jakarta focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/20"
                  onFocus={onSearchFocus}
                />
              </div>
            </div>
          )}
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 font-jakarta group
                    ${isActive 
                      ? 'bg-[var(--color-accent)]/15 text-[var(--color-accent)] border border-[var(--color-accent)]/30 shadow-sm' 
                      : 'text-[var(--color-text)]/70 hover:bg-[var(--color-accent)]/10 hover:text-[var(--color-text)] hover:shadow-sm'
                    }
                    ${sidebarMode === 'minimal' ? 'justify-center' : ''}
                  `}
                  title={sidebarMode === 'minimal' ? item.label : ''}
                >
                  <div className="relative">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-[var(--color-accent)]' : ''} transition-colors`} />
                    {item.badge && (
                      <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  
                  {sidebarMode !== 'minimal' && (
                    <div className="flex-1 text-left">
                      <div className="text-sm font-medium">
                        {sidebarMode === 'floating' ? item.shortLabel : item.label}
                      </div>
                      {sidebarMode === 'full' && (
                        <div className="text-xs opacity-60 mt-0.5">
                          {item.description}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Active indicator */}
                  {isActive && (
                    <div className="w-1 h-8 bg-[var(--color-accent)] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Footer Section - Status & Notifications */}
        {sidebarMode === 'full' && (
          <div className="p-4 border-t border-[var(--color-border)]/30">
            <div className="flex items-center justify-between text-xs text-[var(--color-text)]/60 font-jakarta">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>En línea</span>
              </div>
              {notificationCount > 0 && (
                <Badge className="bg-[var(--color-accent)]/20 text-[var(--color-accent)]">
                  {notificationCount} nuevas
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