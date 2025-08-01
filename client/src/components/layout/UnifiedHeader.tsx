import React, { useState } from 'react';
import { Menu, Search, Bell, MessageCircle, Globe, User, LogOut, X, Home, Map, Building2, Star, BarChart3, ShieldCheck, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UnifiedHeaderProps {
  title?: string;
  showSearch?: boolean;
  variant?: 'main' | 'portal' | 'admin';
}

export const UnifiedHeader: React.FC<UnifiedHeaderProps> = ({ 
  title = "Festival NATUR", 
  showSearch = true,
  variant = 'main'
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const [location] = useLocation();

  const navigationItems = [
    { id: 'inicio', label: 'Inicio', href: '/', icon: Home },
    { id: 'plataforma', label: 'Plataforma', href: '/plataforma', icon: Building2 },
    { id: 'agenda', label: 'Agenda', href: '/agenda', icon: Star },
    { id: 'mapa', label: 'Mapa', href: '/mapa', icon: Map },
    { id: 'experiencias', label: 'Experiencias', href: '/experiencias', icon: Star },
    { id: 'networking', label: 'Networking', href: '/networking', icon: Building2 },
  ];

  const portalItems = [
    { id: 'portal-empresas', label: 'Portal Empresas', href: '/portal-empresas' },
    { id: 'portal-viajeros', label: 'Portal Viajeros', href: '/portal-viajeros' },
    { id: 'admin', label: 'Admin', href: '/admin' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-gray-900/95 border-b border-white/20 shadow-2xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-600/80 rounded-lg flex items-center justify-center shadow-lg backdrop-blur-sm">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold text-white tracking-wide">NATUR</span>
              <p className="text-white/70 text-xs">{title}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.href;
              return (
                <Link key={item.id} href={item.href}>
                  <Button
                    variant="ghost"
                    className={`text-sm transition-all duration-200 ${
                      isActive 
                        ? 'bg-white/20 text-white shadow-lg border border-white/30' 
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Search Bar (Desktop) */}
          {showSearch && (
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/70" />
                <Input 
                  placeholder="Buscar experiencias, empresas, ubicaciones..." 
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/60 backdrop-blur-md"
                />
              </div>
            </div>
          )}

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            {/* Language Switch */}
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <Globe className="w-4 h-4" />
            </Button>

            {/* Notifications (if user logged in) */}
            {user && (
              <>
                <Button variant="ghost" size="sm" className="relative text-white hover:bg-white/20">
                  <Bell className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
                </Button>
                <Button variant="ghost" size="sm" className="relative text-white hover:bg-white/20">
                  <MessageCircle className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full text-xs"></span>
                </Button>
              </>
            )}

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.profileImageUrl || "/placeholder-avatar.png"} />
                      <AvatarFallback className="bg-[#cad95e]/20 text-[#cad95e]">
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-gray-900/95 border-white/20 backdrop-blur-xl" align="end">
                  <DropdownMenuLabel className="text-white">Mi Cuenta</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/20" />
                  
                  {/* Portal Access */}
                  {portalItems.map((item) => (
                    <DropdownMenuItem key={item.id} className="text-white/80 hover:bg-white/10">
                      <Link href={item.href} className="w-full">
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  
                  <DropdownMenuSeparator className="bg-white/20" />
                  
                  <DropdownMenuItem className="text-white/80 hover:bg-white/10">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configuración</span>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem 
                    className="text-red-400 hover:bg-red-500/10"
                    onClick={() => window.location.href = '/api/auth/logout'}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar Sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                className="border-white/30 text-white hover:bg-white/20"
                onClick={() => window.location.href = '/auth/empresas'}
              >
                Iniciar Sesión
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        {showSearch && isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/70" />
              <Input 
                placeholder="Buscar..." 
                className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/60"
              />
            </div>
          </div>
        )}

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.href;
              return (
                <Link key={item.id} href={item.href}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-sm ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : 'text-white/80 hover:bg-white/10'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};