import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Calendar,
  Ticket,
  Users,
  ChevronLeft,
  ChevronRight,
  TreePine,
  Globe,
  User
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  
  const portalConfig = {
    empresas: {
      title: "Portal Empresas",
      subtitle: "Plataforma de negocios sostenibles",
      color: "blue",
      accent: "rgba(59, 130, 246, 0.2)"
    },
    viajeros: {
      title: "Portal Viajeros", 
      subtitle: "Experiencias de turismo consciente",
      color: "green",
      accent: "rgba(34, 197, 94, 0.2)"
    }
  };

  const config = portalConfig[portalType];

  const quickActions = [
    { id: "directory", label: "Directorio", icon: Users, external: false }
  ];

  return (
    <>
      {/* Sidebar Toggle Button - Always visible on desktop */}
      <Button
        onClick={onToggle}
        className="desktop-sidebar-toggle hidden lg:flex"
        size="icon"
        variant="ghost"
      >
        {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </Button>

      {/* Glassmorphism Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -280, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -280, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="desktop-sidebar hidden lg:block"
          >
            <div className="desktop-sidebar-content">
              {/* Header */}
              <div className="desktop-sidebar-header">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                    <TreePine className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="desktop-sidebar-title">{config.title}</h2>
                    <p className="desktop-sidebar-subtitle">{config.subtitle}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-white border-white/30 bg-white/10">
                  Festival NATUR 2025
                </Badge>
              </div>

              {/* Main Navigation */}
              <div className="desktop-nav-section">
                <h3 className="desktop-nav-section-title">Navegación Principal</h3>
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => onNavigation(item.id)}
                      className={`desktop-nav-item ${
                        activeView === item.id ? 'active' : ''
                      }`}
                    >
                      <item.icon className="desktop-nav-item-icon" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Portal Navigation - Show when showHeaderButtons is true */}
              {showHeaderButtons && (
                <div className="desktop-nav-section">
                  <h3 className="desktop-nav-section-title">Navegación Portal</h3>
                  <div className="space-y-1">
                    <button
                      onClick={() => window.location.href = '/auth/empresas'}
                      className="desktop-nav-item"
                    >
                      <Building2 className="desktop-nav-item-icon" />
                      <span>Portal Empresas</span>
                      <Globe className="w-3 h-3 ml-auto opacity-60" />
                    </button>
                    <button
                      onClick={() => window.location.href = '/'}
                      className="desktop-nav-item"
                    >
                      <TreePine className="desktop-nav-item-icon" />
                      <span>Inicio</span>
                      <Globe className="w-3 h-3 ml-auto opacity-60" />
                    </button>
                  </div>
                </div>
              )}

              {/* Tickets Section - Always show */}
              <div className="desktop-nav-section">
                <h3 className="desktop-nav-section-title">Festival</h3>
                <div className="space-y-1">
                  <button
                    onClick={() => window.location.href = '/tickets'}
                    className="desktop-nav-item bg-yellow-400/10 border border-yellow-400/20 hover:bg-yellow-400/20"
                  >
                    <Ticket className="desktop-nav-item-icon text-yellow-400" />
                    <span className="text-yellow-400">Entradas Festival</span>
                    <Globe className="w-3 h-3 ml-auto opacity-60" />
                  </button>
                  <button
                    onClick={() => window.location.href = '/agenda'}
                    className="desktop-nav-item"
                  >
                    <Calendar className="desktop-nav-item-icon" />
                    <span>Agenda</span>
                    <Globe className="w-3 h-3 ml-auto opacity-60" />
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="desktop-nav-section">
                <h3 className="desktop-nav-section-title">Acceso Rápido</h3>
                <div className="space-y-1">
                  {quickActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => onNavigation(action.id)}
                      className="desktop-nav-item"
                    >
                      <action.icon className="desktop-nav-item-icon" />
                      <span>{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* User Status */}
              <div className="mt-auto">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm truncate">Usuario Activo</p>
                      <p className="text-white/60 text-xs">Estado: Verificado</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}