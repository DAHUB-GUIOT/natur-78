import React, { useState } from 'react';
import { Menu, Search, Bell, MessageCircle, Globe, User, LogOut, X, Building2, Star, Settings, ChevronDown, ChevronRight } from "lucide-react";
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
  const [expandedDesktopCategory, setExpandedDesktopCategory] = useState<string | null>(null);
  const [expandedMobileCategories, setExpandedMobileCategories] = useState<Set<string>>(new Set());
  const { user } = useAuth();
  const [location] = useLocation();

  const navigationItems = [
    {
      id: 'festival',
      label: 'Festival NATUR Bogotá 2025',
      icon: Star,
      type: 'category',
      subcategories: [
        {
          group: 'VIVE NATUR',
          items: [
            { label: 'Charlas NATUR (Agenda Académica)', href: '/charlas' },
            { label: 'Rooftop + Zona de Comidas', href: '/rooftop' },
            { label: 'Emprendimientos Sostenibles', href: '/emprendimientos' },
            { label: 'Zona Chill', href: '/zona-chill' },
            { label: 'Foro Colombia Sostenible 2025', href: '/foro' },
            { label: 'Zona Kinder & Coffee Party', href: '/zona-kinder' }
          ]
        },
        {
          group: 'NATUR PRO',
          items: [
            { label: 'Cartel de Artistas', href: '/artistas' },
            { label: 'Talleres', href: '/talleres' },
            { label: 'Zona Startups', href: '/startups' },
            { label: 'Coffee Talks / Speed Talks', href: '/coffee-talks' },
            { label: 'Rumba y Manifestaciones', href: '/rumba' },
            { label: 'Zona Wellness', href: '/wellness' },
            { label: 'Experiencia NATUR', href: '/experiencia' },
            { label: 'Zona VIP', href: '/vip' }
          ]
        }
      ]
    },
    { 
      id: 'noticias', 
      label: 'Noticias', 
      href: '/noticias', 
      icon: MessageCircle, 
      type: 'single',
      description: 'Artículos, crónicas, entrevistas y novedades del turismo regenerativo.'
    },
    { 
      id: 'plataforma', 
      label: 'Plataforma NATUR', 
      href: '/plataforma', 
      icon: Building2, 
      type: 'single',
      description: 'Accede al portal de empresas, comunidad de viajeros y mapa interactivo de experiencias sostenibles.'
    },
    { 
      id: 'info', 
      label: 'Info', 
      href: '/info', 
      icon: Settings, 
      type: 'single',
      description: 'Sobre nosotros, contacto, aliados, preguntas frecuentes, términos y condiciones.'
    }
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
              
              if (item.type === 'single') {
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
              } else {
                return (
                  <div key={item.id} className="relative">
                    <Button
                      variant="ghost"
                      className="text-sm text-white/80 hover:bg-white/10 hover:text-white"
                      onMouseEnter={() => setExpandedDesktopCategory(item.id)}
                      onMouseLeave={() => setExpandedDesktopCategory(null)}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.label}
                      <ChevronDown className="w-3 h-3 ml-1" />
                    </Button>
                    
                    {/* Desktop Dropdown */}
                    {expandedDesktopCategory === item.id && (
                      <div 
                        className="absolute top-full left-0 mt-1 min-w-80 bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-lg shadow-2xl z-50"
                        onMouseEnter={() => setExpandedDesktopCategory(item.id)}
                        onMouseLeave={() => setExpandedDesktopCategory(null)}
                      >
                        <div className="p-4">
                          {item.subcategories?.map((subcat, subcatIndex) => (
                            <div key={subcatIndex} className="mb-4 last:mb-0">
                              <h4 className="text-[#cad95e] text-sm font-medium mb-2 uppercase tracking-wide">
                                {subcat.group}
                              </h4>
                              <ul className="space-y-1">
                                {subcat.items.map((subItem, subItemIndex) => {
                                  const SubIcon = (subItem as any).icon;
                                  return (
                                    <li key={subItemIndex}>
                                      <Link href={subItem.href || '#'}>
                                        <Button
                                          variant="ghost"
                                          className="w-full justify-start text-xs text-white/80 hover:text-white hover:bg-white/10 h-8"
                                        >
                                          {SubIcon && <SubIcon className="w-3 h-3 mr-2" />}
                                          {subItem.label}
                                        </Button>
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
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
                      <AvatarImage src={(user as any).profileImageUrl || "/placeholder-avatar.png"} />
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
          <div className="md:hidden py-4 border-t border-white/20 space-y-2 max-h-96 overflow-y-auto">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.href;
              const isExpanded = expandedMobileCategories.has(item.id);
              
              if (item.type === 'single') {
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
              } else {
                return (
                  <div key={item.id} className="space-y-1">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm text-white/80 hover:bg-white/10"
                      onClick={() => {
                        const newExpanded = new Set(expandedMobileCategories);
                        if (isExpanded) {
                          newExpanded.delete(item.id);
                        } else {
                          newExpanded.add(item.id);
                        }
                        setExpandedMobileCategories(newExpanded);
                      }}
                    >
                      <Icon className="w-4 h-4 mr-3" />
                      {item.label}
                      {isExpanded ? (
                        <ChevronDown className="w-3 h-3 ml-auto" />
                      ) : (
                        <ChevronRight className="w-3 h-3 ml-auto" />
                      )}
                    </Button>
                    
                    {/* Mobile Subcategories */}
                    {isExpanded && (
                      <div className="ml-4 space-y-1">
                        {item.subcategories?.map((subcat, subcatIndex) => (
                          <div key={subcatIndex}>
                            <div className="text-[#cad95e] text-xs font-medium mb-1 px-3 uppercase tracking-wide">
                              {subcat.group}
                            </div>
                            {subcat.items.map((subItem, subItemIndex) => {
                              const SubIcon = (subItem as any).icon;
                              return (
                                <Link key={subItemIndex} href={subItem.href || '#'}>
                                  <Button
                                    variant="ghost"
                                    className="w-full justify-start text-xs text-white/70 hover:text-white hover:bg-white/10 h-8 ml-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    {SubIcon && <SubIcon className="w-3 h-3 mr-2" />}
                                    {subItem.label}
                                  </Button>
                                </Link>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    </header>
  );
};