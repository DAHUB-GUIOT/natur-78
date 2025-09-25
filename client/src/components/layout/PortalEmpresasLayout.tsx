import React, { useState } from "react";
import { useLocation, Link } from "wouter";
import { Map, Building2, Star, MessageCircle, User, Settings, ChevronDown, LogOut, UserIcon, Bell } from "lucide-react";
import { DesktopSidebar } from "./DesktopSidebar";
import { MobileBottomNav } from "./MobileBottomNav";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import mapBackgroundImage from '@assets/stock_images/world_map_background_96663005.jpg';

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
    return 'home'; // default to home
  };

  const activeView = getActiveView();

  const navItems = [
    { id: "home", label: "Inicio", icon: Building2 },
    { id: "map", label: "Mapa", icon: Map },
    { id: "network", label: "Red", icon: Building2 },
    { id: "experiences", label: "Experiencias", icon: Star },
    { id: "messages", label: "Chat", icon: MessageCircle }
  ];

  const handleNavigation = (viewId: string) => {
    const routeMap = {
      home: '/portal-empresas',
      map: '/portal-empresas/mapa',
      network: '/portal-empresas/red',
      experiences: '/portal-empresas/experiencias',
      messages: '/portal-empresas/mensajes'
    };
    
    window.location.href = routeMap[viewId as keyof typeof routeMap] || '/portal-empresas';
  };

  // Mock user data - in production this would come from auth context
  const mockUser = {
    name: "María González",
    email: "maria@empresa.com",
    avatar: "", // Empty for now, will show initials
    company: "EcoTours Colombia"
  };

  const ProfileDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-12 w-auto px-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg"
        >
          <Avatar className="h-8 w-8 mr-3">
            <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
            <AvatarFallback className="bg-green-600 text-white font-semibold">
              {mockUser.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start mr-2">
            <span className="text-white font-semibold text-sm">{mockUser.name}</span>
            <span className="text-white/60 text-xs">{mockUser.company}</span>
          </div>
          <ChevronDown className="h-4 w-4 text-white/60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-64 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl" 
        align="end"
      >
        <DropdownMenuLabel className="text-white">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{mockUser.name}</p>
            <p className="text-xs leading-none text-white/60">{mockUser.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/20" />
        <DropdownMenuItem className="text-white hover:bg-white/20 cursor-pointer">
          <UserIcon className="mr-2 h-4 w-4" />
          <Link href="/portal-empresas/perfil">Ver perfil</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-white hover:bg-white/20 cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <Link href="/portal-empresas/config">Configuración</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-white hover:bg-white/20 cursor-pointer">
          <Bell className="mr-2 h-4 w-4" />
          Notificaciones
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-white/20" />
        <DropdownMenuItem className="text-red-400 hover:bg-red-500/20 cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Map with Glassmorphism */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-15 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${mapBackgroundImage})` }}
        ></div>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      </div>
      
      {/* Top Profile Bar - Fixed and Transparent */}
      <div className="fixed top-0 right-0 z-50 p-4">
        <ProfileDropdown />
      </div>
      
      {/* Mobile Top Bar - Simplified */}
      <div className="fixed top-0 left-0 right-0 z-40 lg:hidden">
        <div className="bg-white/5 backdrop-blur-xl border-b border-white/10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 backdrop-blur-lg rounded-lg flex items-center justify-center border border-white/30">
                <span className="text-green-400 font-gasoek text-lg font-bold">N</span>
              </div>
              <div>
                <h1 className="text-white font-semibold text-sm">Portal Empresas</h1>
                <p className="text-white/60 text-xs">
                  {navItems.find(item => item.id === activeView)?.label || 'Inicio'}
                </p>
              </div>
            </div>
            <div className="mr-20"> {/* Space for profile button */}
            </div>
          </div>
        </div>
      </div>

      {/* Transparent Desktop Sidebar */}
      <div className={`fixed left-0 top-0 h-full z-30 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="h-full bg-white/5 backdrop-blur-xl border-r border-white/20 shadow-2xl">
          <div className="p-6">
            {/* Toggle Button */}
            <Button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              variant="ghost"
              size="sm"
              className="mb-6 text-white hover:bg-white/20 rounded-full"
            >
              {sidebarOpen ? '←' : '→'}
            </Button>
            
            {/* Navigation Items */}
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 text-left group
                      ${isActive 
                        ? 'bg-green-600/30 text-white border border-green-500/50 shadow-lg' 
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                      }
                    `}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? 'text-green-400' : 'text-white/60 group-hover:text-white'}`} />
                    {sidebarOpen && (
                      <span className="font-medium">{item.label}</span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content with Glassmorphism */}
      <div className={`transition-all duration-300 relative z-10 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        {/* Page Content */}
        <div className="pt-16 lg:pt-6 pb-20 lg:pb-0 min-h-screen">
          <div className="max-w-full mx-auto px-4 lg:px-6">
            {/* Content Wrapper with subtle glassmorphism */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl shadow-2xl min-h-[calc(100vh-6rem)] p-6 lg:p-8">
              {children}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
        <div className="bg-white/10 backdrop-blur-xl border-t border-white/20 shadow-2xl">
          <div className="flex justify-around items-center py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`flex flex-col items-center p-2 rounded-xl transition-all duration-200
                    ${isActive 
                      ? 'text-green-400 bg-green-600/20' 
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs mt-1 font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}