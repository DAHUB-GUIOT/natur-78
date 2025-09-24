import React, { useState } from "react";
import { useLocation, Link } from "wouter";
import { Map, Building2, Star, MessageCircle, User, Settings } from "lucide-react";
import { DesktopSidebar } from "./DesktopSidebar";
import { MobileBottomNav } from "./MobileBottomNav";
import { HeaderButtons } from "./HeaderButtons";

interface PortalEmpresasLayoutProps {
  children: React.ReactNode;
}

export function PortalEmpresasLayout({ children }: PortalEmpresasLayoutProps) {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Get current active view from URL
  const getActiveView = () => {
    if (location === '/portal-empresas') return 'home';
    if (location.includes('/portal-empresas/mapa')) return 'map';
    if (location.includes('/portal-empresas/red')) return 'network';
    if (location.includes('/portal-empresas/experiencias')) return 'experiences';
    if (location.includes('/portal-empresas/mensajes')) return 'messages';
    if (location.includes('/portal-empresas/perfil')) return 'profile';
    if (location.includes('/portal-empresas/config')) return 'settings';
    return 'home'; // default to home
  };

  const activeView = getActiveView();

  const navItems = [
    { id: "home", label: "Inicio", icon: Building2 },
    { id: "map", label: "Mapa", icon: Map },
    { id: "network", label: "Red", icon: Building2 },
    { id: "experiences", label: "Experiencias", icon: Star },
    { id: "messages", label: "Mensajes", icon: MessageCircle },
    { id: "profile", label: "Perfil", icon: User },
    { id: "settings", label: "Config", icon: Settings }
  ];

  const handleNavigation = (viewId: string) => {
    const routeMap = {
      home: '/portal-empresas',
      map: '/portal-empresas/mapa',
      network: '/portal-empresas/red',
      experiences: '/portal-empresas/experiencias',
      messages: '/portal-empresas/mensajes',
      profile: '/portal-empresas/perfil',
      settings: '/portal-empresas/config'
    };
    
    window.location.href = routeMap[viewId as keyof typeof routeMap] || '/portal-empresas';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-green-900">
      {/* Glassmorphism Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 lg:hidden">
        <div className="bg-white/5 backdrop-blur-2xl border-b border-white/10 shadow-lg">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/10 backdrop-blur-lg rounded-lg flex items-center justify-center border border-white/20 shadow-sm">
                <span className="text-green-400 font-gasoek text-lg font-bold">N</span>
              </div>
              <div>
                <h1 className="text-white font-semibold text-sm">Portal Empresas</h1>
                <p className="text-white/60 text-xs">
                  {navItems.find(item => item.id === activeView)?.label || 'Mapa'}
                </p>
              </div>
            </div>
            <HeaderButtons 
              showPortalEmpresasNav={true}
            />
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <DesktopSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        activeView={activeView}
        onNavigation={handleNavigation}
        navItems={navItems}
        portalType="empresas"
      />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-48' : 'lg:ml-16'}`}>
        {/* Desktop Top Bar */}
        <div className="hidden lg:block fixed top-0 right-0 z-40" style={{ left: sidebarOpen ? '192px' : '64px' }}>
          <div className="bg-white/5 backdrop-blur-2xl border-b border-white/10 shadow-lg">
            <div className="flex items-center justify-between p-4">
              <div>
                <h1 className="text-white font-semibold text-lg">
                  {navItems.find(item => item.id === activeView)?.label || 'Mapa'}
                </h1>
                <p className="text-white/60 text-sm">Portal Empresas</p>
              </div>
              <HeaderButtons 
                showPortalEmpresasNav={true}
              />
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="pt-20 lg:pt-20 pb-20 lg:pb-0">
          {children}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        items={navItems}
        activeView={activeView}
        onNavigation={handleNavigation}
      />
    </div>
  );
}