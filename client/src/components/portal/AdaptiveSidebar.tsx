import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Map, Building2, Star, MessageCircle, Settings, ShieldCheck, 
  ChevronLeft, ChevronRight, Pin, X, Menu, Minimize2, Maximize2,
  Bell, Search, Filter, Home, Users, Calendar, BarChart3
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
  const [isCollapsed, setIsCollapsed] = useState(true); // Start collapsed by default
  const [isPinned, setIsPinned] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

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
      label: "Dashboard", 
      icon: Home, 
      shortLabel: "Inicio",
      description: "Panel principal del ecosistema",
      priority: 1,
      color: "text-yellow-400"
    },
    { 
      id: "empresas", 
      label: "Red Empresarial", 
      icon: Building2, 
      shortLabel: "Empresas",
      description: "Directorio de aliados comerciales",
      priority: 2,
      color: "text-green-400"
    },
    { 
      id: "experiencias", 
      label: "Experiencias", 
      icon: Star, 
      shortLabel: "Productos",
      description: "Gestión de ofertas turísticas",
      priority: 2,
      color: "text-blue-400"
    },
    { 
      id: "mensajes", 
      label: "Mensajes", 
      icon: MessageCircle, 
      shortLabel: "Chat",
      description: "Comunicación empresarial",
      priority: 3,
      badge: messageCount > 0 ? messageCount : undefined,
      color: "text-purple-400"
    },
    { 
      id: "ajustes", 
      label: "Configuración", 
      icon: Settings, 
      shortLabel: "Config",
      description: "Ajustes de perfil y cuenta",
      priority: 4,
      color: "text-gray-400"
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
      {isMobile && !isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* Symbol-Only Sidebar with Glassmorphism */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ 
          x: isMinimized ? -100 : 0,
          opacity: isMinimized ? 0 : 1,
          width: isCollapsed || isMobile ? '4rem' : '16rem'
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-0 top-16 bottom-0 z-40 glass-card border-r border-white/20 overflow-hidden group"
        onMouseEnter={() => !isPinned && !isMobile && setIsCollapsed(false)}
        onMouseLeave={() => !isPinned && !isMobile && setIsCollapsed(true)}
      >
        {/* Logo Section */}
        <div className="p-4 border-b border-white/10">
          <motion.div 
            className="flex items-center space-x-3"
            animate={{ justifyContent: isCollapsed ? 'center' : 'flex-start' }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-green-400 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-black font-gasoek text-lg font-bold">N</span>
            </div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <h1 className="text-title text-white">NATUR</h1>
                  <p className="text-caption">Portal Empresas</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-2 mt-4">
          <div className="space-y-2">
            {sidebarItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <button
                    onClick={() => handleNavigation(item.id)}
                    className={`
                      w-full flex items-center rounded-xl transition-all duration-300 relative overflow-hidden group
                      ${isActive 
                        ? 'bg-gradient-to-r from-yellow-400/20 to-green-400/20 border border-yellow-400/30 shadow-lg' 
                        : 'glass-button hover:bg-white/10 border-transparent'
                      }
                      ${isCollapsed ? 'p-3 justify-center' : 'p-4 space-x-4'}
                    `}
                  >
                    {/* Icon with colored glow */}
                    <div className={`relative flex-shrink-0 ${isCollapsed ? '' : 'ml-0'}`}>
                      <Icon className={`
                        w-6 h-6 transition-all duration-300
                        ${isActive 
                          ? 'text-yellow-400 drop-shadow-lg' 
                          : item.color || 'text-white/70 group-hover:text-white'
                        }
                      `} />
                      
                      {/* Badge for notifications */}
                      {item.badge && (
                        <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 min-w-[1.25rem] h-5 flex items-center justify-center">
                          {item.badge > 9 ? '9+' : item.badge}
                        </Badge>
                      )}
                      
                      {/* Active glow effect */}
                      {isActive && (
                        <div className="absolute inset-0 bg-yellow-400/20 rounded-full animate-pulse -z-10" />
                      )}
                    </div>

                    {/* Expandable Text */}
                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.div
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex-1 text-left overflow-hidden"
                        >
                          <p className={`
                            text-sm font-medium transition-colors
                            ${isActive ? 'text-yellow-400' : 'text-white group-hover:text-white'}
                          `}>
                            {item.label}
                          </p>
                          <p className="text-xs text-white/60 mt-1 truncate">
                            {item.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Hover tooltip for collapsed state */}
                    {isCollapsed && hoveredItem === item.id && (
                      <motion.div
                        initial={{ opacity: 0, x: -10, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        className="absolute left-16 bg-black/90 backdrop-blur-lg text-white p-3 rounded-lg shadow-xl border border-white/20 z-50 min-w-[200px]"
                      >
                        <p className="text-sm font-medium">{item.label}</p>
                        <p className="text-xs text-white/70 mt-1">{item.description}</p>
                      </motion.div>
                    )}

                    {/* Active indicator line */}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-yellow-400 to-green-400 rounded-full"
                      />
                    )}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </nav>

        {/* Controls at bottom */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center justify-center space-x-2">
            {!isMobile && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPinned(!isPinned)}
                className="w-8 h-8 p-0 text-white/60 hover:text-yellow-400"
                title={isPinned ? "Desanclar" : "Anclar"}
              >
                <Pin className={`w-4 h-4 ${isPinned ? 'fill-current' : ''}`} />
              </Button>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default AdaptiveSidebar;