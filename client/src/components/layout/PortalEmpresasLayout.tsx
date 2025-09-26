import React, { useState } from "react";
import { useLocation, Link, useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Map, Building2, Star, MessageCircle, Settings, ChevronDown, LogOut, UserIcon, Bell, Home, MapPin, CheckCircle } from "lucide-react";
import type { SafeUser } from "@shared/schema";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import mapBackgroundImage from '@assets/stock_images/world_map_background_96663005.jpg';

interface PortalEmpresasLayoutProps {
  children: React.ReactNode;
}


export function PortalEmpresasLayout({ children }: PortalEmpresasLayoutProps) {
  const [location, navigate] = useLocation();
  // Always keep sidebar collapsed for better UX
  const sidebarOpen = false;

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
    { id: "home", label: "Inicio", icon: Home },
    { id: "map", label: "Mapa Interactivo", icon: Map },
    { id: "network", label: "Red de Contactos", icon: Building2 },
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
    
    navigate(routeMap[viewId as keyof typeof routeMap] || '/portal-empresas');
  };

  // Fetch current user data from auth endpoint
  const { data: currentUser, isLoading: userLoading, error: userError } = useQuery<SafeUser>({
    queryKey: ['/api/auth/me'],
    queryFn: async () => {
      try {
        return await apiRequest('/api/auth/me');
      } catch (error: any) {
        // Handle authentication errors gracefully - return null instead of throwing
        if (error.status === 401) {
          console.log('User not authenticated, showing login prompt');
          return null;
        }
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: (failureCount, error: any) => {
      // Don't retry if user is not authenticated (401)
      if (error?.status === 401) {
        return false;
      }
      return failureCount < 1;
    },
  });

  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await apiRequest('/api/auth/logout', {
        method: 'POST',
      });
      
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente",
      });
      
      // Redirect to home after logout
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al cerrar sesión",
        variant: "destructive",
      });
    }
  };

  const ProfileDropdown = () => {
    // Show loading state while fetching user data
    if (userLoading) {
      return (
        <div className="animate-pulse">
          <div className="h-12 w-40 bg-white/10 backdrop-blur-xl rounded-full"></div>
        </div>
      );
    }

    // Handle authentication error or missing user data
    if (userError || !currentUser) {
      // Log authentication errors for debugging
      if (userError && userError.status === 401) {
        console.log('Authentication required for Portal Empresas');
      }
      
      return (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="h-10 px-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg text-white text-sm"
            onClick={() => navigate('/auth/empresas')}
            data-testid="login-prompt"
          >
            Iniciar sesión
          </Button>
        </div>
      );
    }

    const user = currentUser;

    const displayName = `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email?.split('@')[0] || 'Usuario';
    const companyInfo = user.companyName || 'Empresa';
    const location = user.city && user.country ? `${user.city}, ${user.country}` : (user.city || user.country || 'Ubicación');
    const avatar = user.profilePicture || '';
    const initials = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase() || 'U';

    return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-12 w-auto px-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg"
          data-testid="profile-dropdown-trigger"
        >
          <Avatar className="h-8 w-8 mr-3">
            <AvatarImage src={avatar} alt={displayName} />
            <AvatarFallback className="bg-green-600 text-white font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start mr-2">
            <span className="text-white font-semibold text-sm" data-testid="user-name-display">{displayName}</span>
            <div className="flex items-center gap-1">
              <span className="text-white/60 text-xs" data-testid="company-name-display">{companyInfo}</span>
              {user.isVerified && (
                <CheckCircle className="h-3 w-3 text-green-400" />
              )}
            </div>
          </div>
          <ChevronDown className="h-4 w-4 text-white/60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-80 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl" 
        align="end"
        data-testid="profile-dropdown-content"
      >
        <DropdownMenuLabel className="text-white">
          <div className="flex flex-col space-y-2 p-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium leading-none" data-testid="dropdown-user-name">{displayName}</p>
              {user.isVerified && (
                <Badge variant="secondary" className="bg-green-500/20 text-green-400 text-xs">
                  Verificada
                </Badge>
              )}
            </div>
            <p className="text-xs leading-none text-white/60" data-testid="dropdown-user-email">{user.email}</p>
            
            {/* Company Information */}
            <div className="flex flex-col gap-1 mt-2 pt-2 border-t border-white/20">
              <div className="flex items-center gap-1">
                <Building2 className="h-3 w-3 text-green-400" />
                <span className="text-xs text-green-400 font-medium" data-testid="dropdown-company-name">{companyInfo}</span>
              </div>
              {user.companyCategory && (
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-white/60" />
                  <span className="text-xs text-white/60" data-testid="dropdown-company-category">{user.companyCategory}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3 text-white/60" />
                <span className="text-xs text-white/60" data-testid="dropdown-location">{location}</span>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/20" />
        <DropdownMenuItem className="text-white hover:bg-white/20 cursor-pointer" data-testid="menu-profile">
          <UserIcon className="mr-2 h-4 w-4" />
          <Link href="/portal-empresas/perfil" className="flex-1">Ver perfil</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-white hover:bg-white/20 cursor-pointer" data-testid="menu-config">
          <Settings className="mr-2 h-4 w-4" />
          <Link href="/portal-empresas/config" className="flex-1">Configuración</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-white hover:bg-white/20 cursor-pointer" data-testid="menu-notifications">
          <Bell className="mr-2 h-4 w-4" />
          Notificaciones
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-white/20" />
        <DropdownMenuItem 
          className="text-red-400 hover:bg-red-500/20 cursor-pointer" 
          onClick={handleLogout}
          data-testid="menu-logout"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    );
  };

  return (
    <TooltipProvider>
      <div className="portal-empresas-full-image min-h-screen relative overflow-hidden" 
           style={{ backgroundImage: `url(${mapBackgroundImage})` }}>
        {/* Background Map with Glassmorphism */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 opacity-15 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${mapBackgroundImage})` }}
          ></div>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        </div>
        
        {/* Enhanced Top Menu Bar */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <div className="bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-2xl">
            <div className="flex items-center justify-between px-6 py-3">
              {/* Left side - Logo */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-600/20 backdrop-blur-lg rounded-xl flex items-center justify-center border border-green-500/30 shadow-lg">
                    <span className="text-green-400 font-gasoek text-xl font-bold">N</span>
                  </div>
                  <div>
                    <h1 className="text-white font-gasoek text-lg font-bold">NATUR</h1>
                    <p className="text-green-400 text-xs font-medium">Portal Empresas</p>
                  </div>
                </div>
                
                {/* Current page indicator - Only on desktop */}
                <div className="hidden lg:flex items-center">
                  <div className="w-px h-6 bg-white/20 mx-4"></div>
                  <div className="flex items-center gap-2">
                    {(() => {
                      const currentItem = navItems.find(item => item.id === activeView);
                      const IconComponent = currentItem?.icon || Home;
                      return (
                        <>
                          <IconComponent className="w-5 h-5 text-green-400" />
                          <span className="text-white font-medium">{currentItem?.label || 'Inicio'}</span>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
              
              {/* Right side - Profile */}
              <ProfileDropdown />
            </div>
          </div>
        </div>
        
        {/* Mobile Current Page Indicator */}
        <div className="fixed top-16 left-0 right-0 z-40 lg:hidden">
          <div className="bg-white/5 backdrop-blur-lg border-b border-white/10">
            <div className="px-4 py-2">
              <div className="flex items-center gap-2">
                {(() => {
                  const currentItem = navItems.find(item => item.id === activeView);
                  const IconComponent = currentItem?.icon || Home;
                  return (
                    <>
                      <IconComponent className="w-4 h-4 text-green-400" />
                      <span className="text-white text-sm font-medium">{currentItem?.label || 'Inicio'}</span>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Compact Sidebar */}
        <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] z-30 w-20">
          <div className="h-full bg-white/10 backdrop-blur-xl border-r border-white/20 shadow-2xl">
            <div className="p-4">
              {/* Navigation Items with Enhanced Icons */}
              <nav className="space-y-4 mt-4">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeView === item.id;
                  
                  return (
                    <Tooltip key={item.id} delayDuration={300}>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => handleNavigation(item.id)}
                          className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300 group relative overflow-hidden
                            ${isActive 
                              ? 'bg-green-600/40 text-green-400 border-2 border-green-500/60 shadow-2xl shadow-green-500/20 scale-110' 
                              : 'text-white/60 hover:bg-white/20 hover:text-white hover:scale-105 border-2 border-transparent'
                            }
                          `}
                          data-testid={`nav-${item.id}`}
                        >
                          <Icon className={`h-7 w-7 transition-all duration-300 ${
                            isActive 
                              ? 'text-green-400 drop-shadow-lg' 
                              : 'text-white/60 group-hover:text-white group-hover:scale-110'
                          }`} />
                          
                          {/* Active indicator */}
                          {isActive && (
                            <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-green-400 rounded-l-full shadow-lg"></div>
                          )}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent 
                        side="right" 
                        className="bg-white/90 backdrop-blur-lg border border-white/20 shadow-2xl px-3 py-2 text-black font-medium"
                      >
                        <p>{item.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </nav>
              
              {/* Sidebar decoration */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                <div className="w-8 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-60"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Main Content */}
        <div className="transition-all duration-300 relative z-10 ml-20">
          {/* Full-image layout for map page */}
          {activeView === 'map' ? (
            <div className="fixed inset-0 left-20 top-16">
              {children}
            </div>
          ) : (
            /* Full-width borderless layout for all other pages */
            <div className="portal-empresas-content pt-24 lg:pt-20 pb-24 lg:pb-6 min-h-screen">
              {children}
            </div>
          )}
        </div>

        {/* Enhanced Mobile Bottom Navigation - Hide on map page for full immersion */}
        <div className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden ${activeView === 'map' ? 'hidden' : ''}`}>
          <div className="bg-white/15 backdrop-blur-xl border-t border-white/25 shadow-2xl">
            <div className="flex justify-around items-center py-3 px-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={`flex flex-col items-center p-3 rounded-2xl transition-all duration-300 min-w-[60px]
                      ${isActive 
                        ? 'text-green-400 bg-green-600/30 scale-105 shadow-lg' 
                        : 'text-white/60 hover:text-white hover:bg-white/15 hover:scale-105'
                      }
                    `}
                  >
                    <Icon className={`h-6 w-6 transition-all duration-300 ${
                      isActive ? 'scale-110' : ''
                    }`} />
                    <span className={`text-xs mt-1 font-medium transition-all duration-300 ${
                      isActive ? 'text-green-400' : ''
                    }`}>
                      {item.label.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}