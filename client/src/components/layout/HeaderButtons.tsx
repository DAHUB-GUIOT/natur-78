import React, { useState } from "react";
import { Globe, LogIn, UserPlus, Building2, MapPin, Menu, X, Calendar, Ticket, Info, Users, Mail, Instagram, Twitter, Facebook, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderButtonsProps {
  showPortalButtons?: boolean;
  showPortalEmpresasNav?: boolean;
  navItems?: Array<{id: string; label: string; icon: React.ComponentType<any>}>;
  activeView?: string;
  onNavigation?: (viewId: string) => void;
}

export function HeaderButtons({ 
  showPortalButtons = false,
  showPortalEmpresasNav = false,
  navItems = [],
  activeView = "",
  onNavigation
}: HeaderButtonsProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTicketsOpen, setIsTicketsOpen] = useState(false);
  const [isPortalNavOpen, setIsPortalNavOpen] = useState(false);

  return (
    <>
      {/* Transparent header with logo and hamburger menu over background */}
      <div className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm transition-all duration-300 ${
        isTicketsOpen ? 'bg-yellow-400' : (isPortalNavOpen ? 'bg-blue-800' : (isMenuOpen ? 'bg-green-800' : 'bg-black/10'))
      }`}>
        <div className="flex items-center justify-between p-4">
          {/* Logo on the left */}
          <Link to="/" className="flex items-center">
            <div className="w-12 h-12 flex items-center justify-center">
              <span className={`font-gasoek text-3xl font-bold drop-shadow-lg transition-colors duration-300 ${
                isTicketsOpen ? 'text-green-600' : (isMenuOpen ? 'text-yellow-400' : 'text-yellow-400')
              }`}>N</span>
            </div>
            <div className="ml-3 hidden sm:block">
              <h1 className={`font-gasoek text-lg font-bold transition-colors duration-300 ${
                isTicketsOpen ? 'text-green-600' : (isMenuOpen ? 'text-yellow-400' : 'text-white')
              }`}>NATUR</h1>
              <p className={`text-xs transition-colors duration-300 ${
                isTicketsOpen ? 'text-green-600/80' : (isMenuOpen ? 'text-yellow-400/80' : 'text-white/80')
              }`}>Festival 2025</p>
            </div>
          </Link>

          {/* Enhanced Desktop Navigation - More Spacious Layout */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Portal Buttons - Enhanced Desktop */}
            {showPortalButtons && (
              <>
                <Link to="/auth/empresas">
                  <Button 
                    size="default" 
                    variant="outline"
                    className={`desktop-btn-enhanced border-2 font-medium backdrop-blur-sm ${
                      isTicketsOpen 
                        ? 'bg-green-600/10 border-green-600 text-green-600 hover:bg-green-600 hover:text-yellow-400' 
                        : 'bg-white/10 border-[#cad95e] text-[#cad95e] hover:bg-[#cad95e] hover:text-black'
                    }`}
                  >
                    <Building2 className="w-5 h-5 mr-2" />
                    Portal Empresas
                  </Button>
                </Link>
                
                <Link to="/portal-viajeros">
                  <Button 
                    size="default" 
                    variant="outline"
                    className={`desktop-btn-enhanced border-2 font-medium backdrop-blur-sm ${
                      isTicketsOpen 
                        ? 'bg-green-600/10 border-green-600 text-green-600 hover:bg-green-600 hover:text-yellow-400' 
                        : 'bg-white/10 border-[#cad95e] text-[#cad95e] hover:bg-[#cad95e] hover:text-black'
                    }`}
                  >
                    <MapPin className="w-5 h-5 mr-2" />
                    Portal Viajeros
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Portal Empresas Navigation removed - only one button needed */}

          {/* Enhanced Tickets Dropdown - Desktop First */}
          <div className="hidden md:block">
            <div className="relative">
              <Button 
                size="default" 
                variant="outline"
                onClick={() => setIsTicketsOpen(!isTicketsOpen)}
                className={`desktop-btn-enhanced bg-yellow-400 border-2 border-yellow-400 text-black font-medium backdrop-blur-sm ${
                  isTicketsOpen ? 'scale-105 shadow-lg' : ''
                }`}
              >
                <Ticket className="w-5 h-5 mr-2" />
                Entradas Festival
                <motion.div
                  animate={{ rotate: isTicketsOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-2"
                >
                  ▼
                </motion.div>
              </Button>

              {/* Enhanced Desktop Tickets Dropdown */}
              <AnimatePresence>
                {isTicketsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-80 bg-yellow-400/95 backdrop-blur-xl border-2 border-yellow-500/50 rounded-xl shadow-2xl z-50"
                  >
                    <div className="p-6 space-y-4">
                      <div className="text-center">
                        <h3 className="text-green-600 font-gasoek text-2xl font-bold">FESTIVAL NATUR 2025</h3>
                        <p className="text-green-600/80 text-sm mt-1">14-15 Noviembre • Bogotá</p>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="bg-green-600/15 rounded-xl p-4 border-2 border-green-600/30 hover:border-green-600/50 transition-all">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-green-600 font-bold text-lg">VIVE NATUR</h4>
                            <Badge className="bg-green-600 text-yellow-400 font-bold">GRATIS</Badge>
                          </div>
                          <p className="text-green-600/80 text-sm mb-2">Acceso completo • Charlas • Experiencias • Red</p>
                          <div className="text-xs text-green-600/70">
                            ✓ Zona de comidas • ✓ Networking • ✓ Actividades culturales
                          </div>
                        </div>
                        
                        <div className="bg-green-600/15 rounded-xl p-4 border-2 border-green-600/30 hover:border-green-600/50 transition-all">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-green-600 font-bold text-lg">NATUR PRO</h4>
                            <Badge className="bg-green-600 text-yellow-400 font-bold">$240K</Badge>
                          </div>
                          <p className="text-green-600/80 text-sm mb-2">Todo lo anterior + experiencias premium</p>
                          <div className="text-xs text-green-600/70">
                            ✓ Talleres VIP • ✓ Zona wellness • ✓ Rumba exclusiva
                          </div>
                        </div>
                      </div>

                      <Link to="/tickets">
                        <Button 
                          className="w-full bg-green-600 hover:bg-green-700 text-yellow-400 font-bold py-3 shadow-lg hover:shadow-xl transition-all"
                          onClick={() => setIsTicketsOpen(false)}
                        >
                          <Ticket className="w-4 h-4 mr-2" />
                          Ver Todos los Paquetes
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation buttons on the right */}
          <div className="flex items-center gap-2">
            {/* Enhanced Portal Empresas Navigation Button - Desktop First */}
            {showPortalEmpresasNav && (
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsPortalNavOpen(!isPortalNavOpen)}
                  className={`w-10 h-10 lg:w-12 lg:h-12 touch-manipulation min-w-[44px] transition-all duration-300 ${
                    isPortalNavOpen 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'text-white hover:text-blue-400 hover:bg-blue-600/20 hover:scale-105'
                  }`}
                >
                  <Building2 className="h-4 w-4 lg:h-5 lg:w-5" />
                </Button>
                
                {/* Enhanced Desktop Portal Navigation Dropdown */}
                <AnimatePresence>
                  {isPortalNavOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 desktop-dropdown-enhanced z-50 hidden lg:block"
                    >
                      <div className="p-3">
                        <div className="text-blue-200 text-xs font-medium mb-3 px-2 py-1 uppercase tracking-wider">
                          Portal Empresas
                        </div>
                        {navItems.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => {
                              onNavigation?.(item.id);
                              setIsPortalNavOpen(false);
                            }}
                            className={`desktop-nav-item w-full flex items-center gap-3 text-left ${
                              activeView === item.id 
                                ? 'desktop-nav-item active text-blue-200' 
                                : 'text-blue-300 hover:text-blue-200'
                            }`}
                          >
                            <item.icon className="w-4 h-4 flex-shrink-0" />
                            <span className="font-medium">{item.label}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
            
            {/* Hamburger menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`w-10 h-10 touch-manipulation min-w-[44px] transition-colors duration-300 ${
                isTicketsOpen 
                  ? 'text-green-600 hover:text-green-700 hover:bg-green-600/10' 
                  : (isMenuOpen ? 'text-yellow-400 hover:text-yellow-300 hover:bg-green-900/10' : 'text-white hover:text-[#cad95e] hover:bg-white/10')
              }`}
            >
              {isMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Portal Empresas Navigation Overlay - Mobile First */}
      <AnimatePresence>
        {isPortalNavOpen && showPortalEmpresasNav && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-40 bg-blue-800 border-b border-blue-900"
          >
            <div className="p-4 space-y-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigation?.(item.id);
                      setIsPortalNavOpen(false);
                    }}
                    className={`w-full flex items-center px-4 py-6 text-left rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-white text-blue-800' 
                        : 'text-white hover:bg-blue-700'
                    }`}
                  >
                    <Icon className={`w-6 h-6 mr-4 ${isActive ? 'text-blue-800' : 'text-blue-200'}`} />
                    <span className={`text-xl font-black font-gasoek tracking-wider uppercase ${
                      isActive ? 'text-blue-800' : 'text-white'
                    }`}>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-40 bg-green-800 border-b border-green-900"
          >
            <div className="p-4 space-y-3">
              {/* Portal Buttons */}
              <Link to="/auth/empresas" onClick={() => setIsMenuOpen(false)}>
                <Button 
                  variant="ghost"
                  className="w-full justify-start text-yellow-400 hover:text-yellow-400 hover:bg-green-900/50 py-6"
                >
                  <Building2 className="w-6 h-6 mr-4" />
                  <span className="text-2xl font-black font-gasoek tracking-wider uppercase">Portal Empresas</span>
                </Button>
              </Link>
              
              <Link to="/portal-viajeros" onClick={() => setIsMenuOpen(false)}>
                <Button 
                  variant="ghost"
                  className="w-full justify-start text-yellow-400 hover:text-yellow-400 hover:bg-green-900/50 py-6"
                >
                  <MapPin className="w-6 h-6 mr-4" />
                  <span className="text-2xl font-black font-gasoek tracking-wider uppercase">Mapa Turismo</span>
                </Button>
              </Link>

              {/* Divider */}
              <div className="border-t border-yellow-400/30 my-6"></div>

              {/* Event Information */}
              <Link to="/agenda" onClick={() => setIsMenuOpen(false)}>
                <Button 
                  variant="ghost"
                  className="w-full justify-start text-yellow-400 hover:text-yellow-400 hover:bg-green-900/50 py-6"
                >
                  <Calendar className="w-6 h-6 mr-4" />
                  <span className="text-2xl font-black font-gasoek tracking-wider uppercase">Agenda</span>
                </Button>
              </Link>
              
              <Link to="/tickets" onClick={() => setIsMenuOpen(false)}>
                <Button 
                  variant="ghost"
                  className="w-full justify-start text-yellow-400 hover:text-yellow-400 hover:bg-green-900/50 py-6"
                >
                  <Ticket className="w-6 h-6 mr-4" />
                  <span className="text-2xl font-black font-gasoek tracking-wider uppercase">Entradas</span>
                </Button>
              </Link>
              
              <Link to="/biodiversidad" onClick={() => setIsMenuOpen(false)}>
                <Button 
                  variant="ghost"
                  className="w-full justify-start text-yellow-400 hover:text-yellow-400 hover:bg-green-900/50 py-6"
                >
                  <Leaf className="w-6 h-6 mr-4" />
                  <span className="text-2xl font-black font-gasoek tracking-wider uppercase">Biodiversidad</span>
                </Button>
              </Link>

              {/* About Section */}
              <div className="border-t border-yellow-400/30 my-6"></div>
              
              <Button 
                variant="ghost"
                className="w-full justify-start text-yellow-400 hover:text-yellow-400 hover:bg-green-900/50 py-6"
                onClick={() => setIsMenuOpen(false)}
              >
                <Info className="w-6 h-6 mr-4" />
                <span className="text-2xl font-black font-gasoek tracking-wider uppercase">Sobre NATUR</span>
              </Button>

              <Button 
                variant="ghost"
                className="w-full justify-start text-yellow-400 hover:text-yellow-400 hover:bg-green-900/50 py-6"
                onClick={() => setIsMenuOpen(false)}
              >
                <Users className="w-6 h-6 mr-4" />
                <span className="text-2xl font-black font-gasoek tracking-wider uppercase">Quiénes Somos</span>
              </Button>

              <Button 
                variant="ghost"
                className="w-full justify-start text-yellow-400 hover:text-yellow-400 hover:bg-green-900/50 py-6"
                onClick={() => setIsMenuOpen(false)}
              >
                <Mail className="w-6 h-6 mr-4" />
                <span className="text-2xl font-black font-gasoek tracking-wider uppercase">Contacto</span>
              </Button>

              {/* Social Links */}
              <div className="border-t border-yellow-400/30 my-6"></div>
              
              <div className="flex justify-center space-x-6">
                <Button 
                  variant="ghost"
                  size="icon"
                  className="text-yellow-400 hover:text-yellow-400 hover:bg-green-900/50 w-12 h-12"
                >
                  <Instagram className="w-8 h-8" />
                </Button>
                <Button 
                  variant="ghost"
                  size="icon"
                  className="text-yellow-400 hover:text-yellow-400 hover:bg-green-900/50 w-12 h-12"
                >
                  <Twitter className="w-8 h-8" />
                </Button>
                <Button 
                  variant="ghost"
                  size="icon"
                  className="text-yellow-400 hover:text-yellow-400 hover:bg-green-900/50 w-12 h-12"
                >
                  <Facebook className="w-8 h-8" />
                </Button>
              </div>

              {/* Festival Info */}
              <div className="text-center pt-6 border-t border-yellow-400/30">
                <p className="text-yellow-400 text-lg font-gasoek font-bold tracking-wider">
                  FESTIVAL NATUR 2025
                </p>
                <p className="text-yellow-300 text-sm font-bold tracking-wide">
                  14-15 NOVIEMBRE • BOGOTÁ
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}