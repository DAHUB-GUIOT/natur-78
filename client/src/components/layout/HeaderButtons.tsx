import React, { useState } from "react";
import { Globe, LogIn, UserPlus, Building2, MapPin, Menu, X, Calendar, Ticket, Info, Users, Mail, Instagram, Twitter, Facebook, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
      {/* Glassmorphism header with transparent background */}
      <div className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-black/10 border-b border-white/10 transition-all duration-300 ${
        isTicketsOpen ? 'bg-yellow-400/20 backdrop-blur-xl border-yellow-400/20' : 
        (isPortalNavOpen ? 'bg-blue-800/20 backdrop-blur-xl border-blue-400/20' : 
        (isMenuOpen ? 'bg-green-800/20 backdrop-blur-xl border-green-400/20' : 'bg-black/10 backdrop-blur-lg border-white/10'))
      }`}>
        <div className="flex items-center justify-between p-3 sm:p-4">
          {/* Enhanced Logo - Mobile Optimized */}
          <Link to="/" className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-[#cad95e]/20 rounded-lg border border-[#cad95e]/30">
              <span className={`font-gasoek text-2xl sm:text-3xl font-bold drop-shadow-lg transition-colors duration-300 ${
                isTicketsOpen ? 'text-green-600' : (isMenuOpen ? 'text-yellow-400' : 'text-yellow-400')
              }`}>N</span>
            </div>
            <div className="ml-2 sm:ml-3">
              <h1 className={`font-gasoek text-sm sm:text-lg font-bold transition-colors duration-300 ${
                isTicketsOpen ? 'text-green-600' : (isMenuOpen ? 'text-yellow-400' : 'text-white')
              }`}>NATUR</h1>
              <p className={`text-xs transition-colors duration-300 hidden xs:block ${
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
                    className={`desktop-btn-enhanced border-2 font-medium backdrop-blur-md ${
                      isTicketsOpen 
                        ? 'bg-green-600/20 border-green-600 text-green-600 hover:bg-green-600 hover:text-yellow-400' 
                        : 'bg-white/15 border-[#cad95e] text-[#cad95e] hover:bg-[#cad95e] hover:text-black'
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
                    className={`desktop-btn-enhanced border-2 font-medium backdrop-blur-md ${
                      isTicketsOpen 
                        ? 'bg-green-600/20 border-green-600 text-green-600 hover:bg-green-600 hover:text-yellow-400' 
                        : 'bg-white/15 border-[#cad95e] text-[#cad95e] hover:bg-[#cad95e] hover:text-black'
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
                className={`desktop-btn-enhanced bg-yellow-400 border-2 border-yellow-400 text-black font-medium backdrop-blur-md ${
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
                    className="absolute top-full right-0 mt-2 w-80 bg-yellow-400/90 backdrop-blur-xl border-2 border-yellow-500/30 rounded-xl shadow-2xl z-50"
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
            
            {/* Enhanced Hamburger Menu Button - Mobile Optimized */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`w-11 h-11 sm:w-12 sm:h-12 touch-manipulation min-w-[44px] rounded-lg border transition-all duration-300 ${
                isTicketsOpen 
                  ? 'text-green-600 hover:text-green-700 border-green-600/30 hover:bg-green-600/20 hover:border-green-600/50' 
                  : (isMenuOpen 
                      ? 'text-yellow-400 hover:text-yellow-300 border-yellow-400/50 bg-green-900/20 hover:bg-green-900/30' 
                      : 'text-white hover:text-[#cad95e] border-white/20 hover:bg-white/15 hover:border-[#cad95e]/50'
                    )
              }`}
              data-testid="button-menu-toggle"
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                ) : (
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                )}
              </motion.div>
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

      {/* Enhanced Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-14 sm:top-16 left-0 right-0 z-40 bg-green-800/20 backdrop-blur-xl border-b border-green-400/20 shadow-2xl"
          >
            <div className="p-4 sm:p-6 space-y-2 max-h-[calc(100vh-80px)] overflow-y-auto">
              {/* Enhanced Portal Buttons */}
              <Link to="/auth/empresas" onClick={() => setIsMenuOpen(false)}>
                <Button 
                  variant="ghost"
                  className="w-full justify-start text-yellow-400 hover:text-yellow-400 hover:bg-green-900/30 py-4 sm:py-6 rounded-lg border border-transparent hover:border-yellow-400/20 transition-all duration-200"
                  data-testid="link-portal-empresas"
                >
                  <Building2 className="w-5 h-5 sm:w-6 sm:h-6 mr-3 sm:mr-4" />
                  <span className="text-lg sm:text-2xl font-black font-gasoek tracking-wider uppercase">Portal Empresas</span>
                </Button>
              </Link>
              
              <Link to="/portal-viajeros" onClick={() => setIsMenuOpen(false)}>
                <Button 
                  variant="ghost"
                  className="w-full justify-start text-yellow-400 hover:text-yellow-400 hover:bg-green-900/30 py-4 sm:py-6 rounded-lg border border-transparent hover:border-yellow-400/20 transition-all duration-200"
                  data-testid="link-portal-viajeros"
                >
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 mr-3 sm:mr-4" />
                  <span className="text-lg sm:text-2xl font-black font-gasoek tracking-wider uppercase">Mapa Turismo</span>
                </Button>
              </Link>

              {/* Enhanced Divider */}
              <div className="border-t border-yellow-400/20 my-4 sm:my-6"></div>

              {/* Enhanced Event Information */}
              <Link to="/agenda" onClick={() => setIsMenuOpen(false)}>
                <Button 
                  variant="ghost"
                  className="w-full justify-start text-yellow-400 hover:text-yellow-400 hover:bg-green-900/30 py-4 sm:py-6 rounded-lg border border-transparent hover:border-yellow-400/20 transition-all duration-200"
                  data-testid="link-agenda"
                >
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 mr-3 sm:mr-4" />
                  <span className="text-lg sm:text-2xl font-black font-gasoek tracking-wider uppercase">Agenda</span>
                </Button>
              </Link>
              
              <Link to="/tickets" onClick={() => setIsMenuOpen(false)}>
                <Button 
                  variant="ghost"
                  className="w-full justify-start text-yellow-400 hover:text-yellow-400 hover:bg-green-900/30 py-4 sm:py-6 rounded-lg border border-transparent hover:border-yellow-400/20 transition-all duration-200"
                  data-testid="link-tickets"
                >
                  <Ticket className="w-5 h-5 sm:w-6 sm:h-6 mr-3 sm:mr-4" />
                  <span className="text-lg sm:text-2xl font-black font-gasoek tracking-wider uppercase">Entradas</span>
                </Button>
              </Link>
              
              <Link to="/biodiversidad" onClick={() => setIsMenuOpen(false)}>
                <Button 
                  variant="ghost"
                  className="w-full justify-start text-yellow-400 hover:text-yellow-400 hover:bg-green-900/30 py-4 sm:py-6 rounded-lg border border-transparent hover:border-yellow-400/20 transition-all duration-200"
                  data-testid="link-biodiversidad"
                >
                  <Leaf className="w-5 h-5 sm:w-6 sm:h-6 mr-3 sm:mr-4" />
                  <span className="text-lg sm:text-2xl font-black font-gasoek tracking-wider uppercase">Biodiversidad</span>
                </Button>
              </Link>

              {/* Enhanced About Section */}
              <div className="border-t border-yellow-400/20 my-4 sm:my-6"></div>
              
              <Button 
                variant="ghost"
                className="w-full justify-start text-yellow-400 hover:text-yellow-400 hover:bg-green-900/30 py-4 sm:py-6 rounded-lg border border-transparent hover:border-yellow-400/20 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
                data-testid="button-sobre-natur"
              >
                <Info className="w-5 h-5 sm:w-6 sm:h-6 mr-3 sm:mr-4" />
                <span className="text-lg sm:text-2xl font-black font-gasoek tracking-wider uppercase">Sobre NATUR</span>
              </Button>

              <Button 
                variant="ghost"
                className="w-full justify-start text-yellow-400 hover:text-yellow-400 hover:bg-green-900/30 py-4 sm:py-6 rounded-lg border border-transparent hover:border-yellow-400/20 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
                data-testid="button-quienes-somos"
              >
                <Users className="w-5 h-5 sm:w-6 sm:h-6 mr-3 sm:mr-4" />
                <span className="text-lg sm:text-2xl font-black font-gasoek tracking-wider uppercase">Quiénes Somos</span>
              </Button>

              <Button 
                variant="ghost"
                className="w-full justify-start text-yellow-400 hover:text-yellow-400 hover:bg-green-900/30 py-4 sm:py-6 rounded-lg border border-transparent hover:border-yellow-400/20 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
                data-testid="button-contacto"
              >
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 mr-3 sm:mr-4" />
                <span className="text-lg sm:text-2xl font-black font-gasoek tracking-wider uppercase">Contacto</span>
              </Button>

              {/* Enhanced Social Links */}
              <div className="border-t border-yellow-400/20 my-4 sm:my-6"></div>
              
              <div className="text-center">
                <p className="text-yellow-400/80 text-sm sm:text-base mb-4 font-medium">Síguenos en redes</p>
                <div className="flex justify-center space-x-4 sm:space-x-6 mb-4">
                  <Button 
                    variant="ghost"
                    size="icon"
                    className="text-yellow-400 hover:text-white hover:bg-green-900/30 w-10 h-10 sm:w-12 sm:h-12 rounded-lg border border-transparent hover:border-yellow-400/20 transition-all duration-200"
                    data-testid="button-instagram"
                  >
                    <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
                  </Button>
                  <Button 
                    variant="ghost"
                    size="icon"
                    className="text-yellow-400 hover:text-white hover:bg-green-900/30 w-10 h-10 sm:w-12 sm:h-12 rounded-lg border border-transparent hover:border-yellow-400/20 transition-all duration-200"
                    data-testid="button-twitter"
                  >
                    <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
                  </Button>
                  <Button 
                    variant="ghost"
                    size="icon"
                    className="text-yellow-400 hover:text-white hover:bg-green-900/30 w-10 h-10 sm:w-12 sm:h-12 rounded-lg border border-transparent hover:border-yellow-400/20 transition-all duration-200"
                    data-testid="button-facebook"
                  >
                    <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
                  </Button>
                </div>

                {/* Enhanced Festival Info */}
                <div className="bg-green-900/30 rounded-lg p-3 sm:p-4 border border-yellow-400/20">
                  <p className="text-yellow-400 text-base sm:text-lg font-gasoek font-bold tracking-wider" data-testid="text-festival-name">
                    FESTIVAL NATUR 2025
                  </p>
                  <p className="text-yellow-300 text-sm sm:text-base font-bold tracking-wide" data-testid="text-festival-date">
                    14-15 NOVIEMBRE • BOGOTÁ
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}