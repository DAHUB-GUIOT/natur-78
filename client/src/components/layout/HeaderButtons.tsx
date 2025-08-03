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
        isTicketsOpen ? 'bg-yellow-400' : (isMenuOpen || isPortalNavOpen ? 'bg-green-800' : 'bg-black/10')
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

          {/* Desktop Navigation - Portal Buttons and Tickets Dropdown */}
          <div className="hidden md:flex items-center gap-3">
            {/* Portal Buttons - conditional */}
            {showPortalButtons && (
              <>
                <Link to="/auth/empresas">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className={`border-2 font-medium px-4 py-2 backdrop-blur-sm transition-all ${
                      isTicketsOpen 
                        ? 'bg-green-600/10 border-green-600 text-green-600 hover:bg-green-600 hover:text-yellow-400' 
                        : 'bg-white/10 border-[#cad95e] text-[#cad95e] hover:bg-[#cad95e] hover:text-black'
                    }`}
                  >
                    Portal Empresas
                  </Button>
                </Link>
                
                <Link to="/portal-viajeros">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className={`border-2 font-medium px-4 py-2 backdrop-blur-sm transition-all ${
                      isTicketsOpen 
                        ? 'bg-green-600/10 border-green-600 text-green-600 hover:bg-green-600 hover:text-yellow-400' 
                        : 'bg-white/10 border-[#cad95e] text-[#cad95e] hover:bg-[#cad95e] hover:text-black'
                    }`}
                  >
                    Mapa Turismo
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Portal Empresas Navigation - conditional */}
          {showPortalEmpresasNav && (
            <div className="relative">
              <Button
                onClick={() => setIsPortalNavOpen(!isPortalNavOpen)}
                size="sm"
                variant="ghost"
                className={`p-2 transition-all ${
                  isPortalNavOpen 
                    ? 'bg-green-600 text-yellow-400' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <Building2 className="w-5 h-5" />
              </Button>
              
              <AnimatePresence>
                {isPortalNavOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-black/90 backdrop-blur-xl border border-white/20 rounded-lg shadow-lg z-50"
                  >
                    <div className="p-2">
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
                            className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                              isActive 
                                ? 'bg-green-600 text-yellow-400' 
                                : 'text-white hover:bg-white/10'
                            }`}
                          >
                            <Icon className={`w-4 h-4 mr-3 ${isActive ? 'text-yellow-400' : 'text-white/70'}`} />
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Tickets Dropdown - always visible */}
          <div className="hidden md:block">
            <div className="relative">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setIsTicketsOpen(!isTicketsOpen)}
                className="bg-yellow-400 border-2 border-yellow-400 text-black font-medium px-4 py-2 hover:bg-yellow-500 hover:border-yellow-500 backdrop-blur-sm transition-all"
              >
                <Ticket className="w-4 h-4 mr-2" />
                Entradas
              </Button>

              {/* Yellow Dropdown Menu */}
              <AnimatePresence>
                {isTicketsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full right-0 mt-2 w-72 bg-yellow-400 border border-yellow-500 rounded-lg shadow-xl backdrop-blur-sm z-50"
                  >
                    <div className="p-4 space-y-3">
                      <h3 className="text-green-600 font-gasoek text-xl font-bold">ENTRADAS FESTIVAL</h3>
                      
                      <div className="space-y-3">
                        <div className="bg-green-600/10 rounded-lg p-3 border border-green-600/20">
                          <h4 className="text-green-600 font-bold text-lg">VIVE NATUR</h4>
                          <p className="text-green-600/80 text-sm">Acceso completo al festival</p>
                          <p className="text-green-600 font-bold">$50.000 COP</p>
                        </div>
                        
                        <div className="bg-green-600/10 rounded-lg p-3 border border-green-600/20">
                          <h4 className="text-green-600 font-bold text-lg">NATUR PRO</h4>
                          <p className="text-green-600/80 text-sm">Acceso profesional + networking</p>
                          <p className="text-green-600 font-bold">$120.000 COP</p>
                        </div>
                      </div>

                      <Link to="/tickets">
                        <Button 
                          className="w-full bg-green-600 hover:bg-green-700 text-yellow-400 font-bold"
                          onClick={() => setIsTicketsOpen(false)}
                        >
                          Comprar Entradas
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
            {/* Portal Empresas Navigation - Mobile */}
            {showPortalEmpresasNav && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsPortalNavOpen(!isPortalNavOpen)}
                className={`w-10 h-10 touch-manipulation min-w-[44px] transition-colors duration-300 md:hidden ${
                  isPortalNavOpen 
                    ? 'bg-green-600 text-yellow-400' 
                    : 'text-white hover:text-[#cad95e] hover:bg-white/10'
                }`}
              >
                <Building2 className="h-4 w-4" />
              </Button>
            )}
            
            <Button 
              variant="ghost" 
              size="icon" 
              className={`w-10 h-10 touch-manipulation min-w-[44px] transition-colors duration-300 ${
                isTicketsOpen 
                  ? 'text-green-600 hover:text-green-700 hover:bg-green-600/10' 
                  : (isMenuOpen ? 'text-yellow-400 hover:text-yellow-300 hover:bg-green-900/10' : 'text-white hover:text-[#cad95e] hover:bg-white/10')
              }`}
            >
              <Globe className="h-4 w-4" />
            </Button>
            
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

      {/* Portal Empresas Mobile Navigation Overlay */}
      <AnimatePresence>
        {isPortalNavOpen && showPortalEmpresasNav && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-40 bg-black/90 backdrop-blur-xl border-b border-white/20"
          >
            <div className="p-4 space-y-2">
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
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-green-600 text-yellow-400' 
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-yellow-400' : 'text-white/70'}`} />
                    <span className="font-medium">{item.label}</span>
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