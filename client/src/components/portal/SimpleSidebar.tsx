import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Map, Building2, Star, MessageCircle, Settings, ShieldCheck, 
  Home, Users, Calendar, BarChart3
} from "lucide-react";

interface SimpleSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  user: any;
  notificationCount?: number;
  messageCount?: number;
}

const SimpleSidebar: React.FC<SimpleSidebarProps> = ({
  activeSection,
  setActiveSection,
  user,
  notificationCount = 0,
  messageCount = 0
}) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const sidebarItems = [
    { 
      id: "mapa", 
      label: "Dashboard", 
      icon: Home, 
      color: "text-white"
    },
    { 
      id: "empresas", 
      label: "Red Empresarial", 
      icon: Building2, 
      color: "text-white"
    },
    { 
      id: "experiencias", 
      label: "Experiencias", 
      icon: Star, 
      color: "text-white"
    },
    { 
      id: "agenda", 
      label: "Agenda", 
      icon: Calendar, 
      color: "text-white"
    },
    { 
      id: "directorio", 
      label: "Directorio", 
      icon: Users, 
      color: "text-white"
    },
    { 
      id: "mensajes", 
      label: "Mensajes", 
      icon: MessageCircle, 
      color: "text-white",
      badge: messageCount > 0 ? messageCount : undefined
    },
    { 
      id: "ajustes", 
      label: "Configuración", 
      icon: Settings, 
      color: "text-white"
    },
    ...(user?.role === 'admin' ? [{ 
      id: "admin", 
      label: "Admin", 
      icon: ShieldCheck, 
      color: "text-white"
    }] : [])
  ];

  const handleNavigation = (itemId: string) => {
    if (itemId === 'admin') {
      window.location.href = '/admin';
      return;
    }
    
    setActiveSection(itemId);
    setSelectedItem(itemId);
    
    // Hide label after 2 seconds
    setTimeout(() => {
      setSelectedItem(null);
    }, 2000);
  };

  return (
    <motion.aside
      initial={{ x: -64, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed left-0 top-0 bottom-0 w-16 z-40 glass-card border-r border-white/20 flex flex-col"
    >
      {/* Logo */}
      <div className="p-3 border-b border-white/10">
        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-green-400 rounded-lg flex items-center justify-center shadow-lg">
          <span className="text-black font-gasoek text-lg font-bold">N</span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-2 mt-4">
        <div className="space-y-3">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            const showLabel = selectedItem === item.id;
            
            return (
              <div key={item.id} className="relative">
                <button
                  onClick={() => handleNavigation(item.id)}
                  className={`
                    w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 relative
                    ${isActive 
                      ? 'bg-gradient-to-r from-yellow-400/20 to-green-400/20 border border-yellow-400/30 shadow-lg' 
                      : 'glass-button hover:bg-white/10 border-transparent'
                    }
                  `}
                  title={item.label}
                >
                  {/* Icon */}
                  <Icon className={`
                    w-5 h-5 transition-all duration-300
                    ${isActive 
                      ? 'text-yellow-400' 
                      : 'text-white/80 hover:text-white'
                    }
                  `} />
                  
                  {/* Badge for notifications */}
                  {item.badge && (
                    <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 min-w-[1.25rem] h-5 flex items-center justify-center">
                      {item.badge > 9 ? '9+' : item.badge}
                    </Badge>
                  )}
                  
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 to-green-400 rounded-r"
                    />
                  )}
                </button>

                {/* Floating Label on Click */}
                <AnimatePresence>
                  {showLabel && (
                    <motion.div
                      initial={{ opacity: 0, x: -10, scale: 0.8 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -10, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-black/90 backdrop-blur-lg text-white px-3 py-2 rounded-lg shadow-xl border border-white/20 z-50 whitespace-nowrap"
                    >
                      <p className="text-sm font-medium text-white">{item.label}</p>
                      {/* Arrow pointing to sidebar */}
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-black/90 rotate-45 border-l border-b border-white/20"></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </nav>

      {/* User indicator at bottom */}
      <div className="p-3 border-t border-white/10">
        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
          <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full"></div>
        </div>
      </div>
    </motion.aside>
  );
};

export default SimpleSidebar;