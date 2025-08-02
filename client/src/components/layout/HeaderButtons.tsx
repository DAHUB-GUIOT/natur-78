import React, { useState } from "react";
import { Globe, LogIn, UserPlus, Building2, MapPin, Menu, X, Calendar, Ticket, Info, Users, Mail, Instagram, Twitter, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderButtonsProps {
  showPortalButtons?: boolean;
}

export function HeaderButtons({ showPortalButtons = false }: HeaderButtonsProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTicketsOpen, setIsTicketsOpen] = useState(false);

  return (
    <>
      {/* Transparent header with logo and hamburger menu over background */}
      <div className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm transition-all duration-300 ${
        isTicketsOpen ? 'bg-yellow-400' : 'bg-black/10'
      }`}>
        <div className="flex items-center justify-between p-4">
          {/* Logo on the left */}
          <Link to="/" className="flex items-center">
            <div className="w-12 h-12 flex items-center justify-center">
              <span className={`font-gasoek text-3xl font-bold drop-shadow-lg transition-colors duration-300 ${
                isTicketsOpen ? 'text-green-600' : 'text-yellow-400'
              }`}>N</span>
            </div>
            <div className="ml-3 hidden sm:block">
              <h1 className={`font-gasoek text-lg font-bold transition-colors duration-300 ${
                isTicketsOpen ? 'text-green-600' : 'text-white'
              }`}>NATUR</h1>
              <p className={`text-xs transition-colors duration-300 ${
                isTicketsOpen ? 'text-green-600/80' : 'text-white/80'
              }`}>Festival 2025</p>
            </div>
          </Link>

          {/* Desktop Portal Buttons and Tickets Dropdown */}
          <div className="hidden md:flex items-center gap-3">
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

            {/* Tickets Dropdown */}
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
                    className="absolute top-full right-0 mt-2 w-72 bg-yellow-400 border border-yellow-500 rounded-lg shadow-xl backdrop-blur-sm"
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
            <Button 
              variant="ghost" 
              size="icon" 
              className={`w-10 h-10 touch-manipulation min-w-[44px] transition-colors duration-300 ${
                isTicketsOpen 
                  ? 'text-green-600 hover:text-green-700 hover:bg-green-600/10' 
                  : 'text-white hover:text-[#cad95e] hover:bg-white/10'
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
                  : 'text-white hover:text-[#cad95e] hover:bg-white/10'
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-16 left-0 right-0 z-40 backdrop-blur-lg border-b transition-all duration-300 ${
              isTicketsOpen 
                ? 'bg-yellow-400/95 border-green-600/20' 
                : 'bg-black/90 border-white/20'
            }`}
          >
            <div className="p-4 space-y-3">
              {/* Portal Buttons */}
              <Link to="/auth/empresas" onClick={() => setIsMenuOpen(false)}>
                <Button 
                  variant="ghost"
                  className={`w-full justify-start transition-colors duration-300 ${
                    isTicketsOpen 
                      ? 'text-green-600 hover:text-green-700 hover:bg-green-600/10' 
                      : 'text-white hover:text-[#cad95e] hover:bg-white/10'
                  }`}
                >
                  <Building2 className="w-4 h-4 mr-3" />
                  <span className={isTicketsOpen ? 'text-2xl font-bold' : ''}>Portal Empresas</span>
                </Button>
              </Link>
              
              <Link to="/portal-viajeros" onClick={() => setIsMenuOpen(false)}>
                <Button 
                  variant="ghost"
                  className={`w-full justify-start transition-colors duration-300 ${
                    isTicketsOpen 
                      ? 'text-green-600 hover:text-green-700 hover:bg-green-600/10' 
                      : 'text-white hover:text-[#cad95e] hover:bg-white/10'
                  }`}
                >
                  <MapPin className="w-4 h-4 mr-3" />
                  <span className={isTicketsOpen ? 'text-2xl font-bold' : ''}>Mapa Turismo Sostenible</span>
                </Button>
              </Link>

              {/* Divider */}
              <div className={`border-t my-3 transition-colors duration-300 ${
                isTicketsOpen ? 'border-green-600/20' : 'border-white/20'
              }`}></div>

              {/* Event Information */}
              <Link to="/agenda" onClick={() => setIsMenuOpen(false)}>
                <Button 
                  variant="ghost"
                  className={`w-full justify-start transition-colors duration-300 ${
                    isTicketsOpen 
                      ? 'text-green-600 hover:text-green-700 hover:bg-green-600/10' 
                      : 'text-white hover:text-[#cad95e] hover:bg-white/10'
                  }`}
                >
                  <Calendar className="w-4 h-4 mr-3" />
                  <span className={isTicketsOpen ? 'text-2xl font-bold' : ''}>Agenda Festival</span>
                </Button>
              </Link>
              
              <Link to="/tickets" onClick={() => setIsMenuOpen(false)}>
                <Button 
                  variant="ghost"
                  className={`w-full justify-start transition-colors duration-300 ${
                    isTicketsOpen 
                      ? 'text-green-600 hover:text-green-700 hover:bg-green-600/10' 
                      : 'text-white hover:text-[#cad95e] hover:bg-white/10'
                  }`}
                >
                  <Ticket className="w-4 h-4 mr-3" />
                  <span className={isTicketsOpen ? 'text-2xl font-bold' : ''}>Entradas</span>
                </Button>
              </Link>

              {/* About Section */}
              <div className={`border-t my-3 transition-colors duration-300 ${
                isTicketsOpen ? 'border-green-600/20' : 'border-white/20'
              }`}></div>
              
              <Button 
                variant="ghost"
                className={`w-full justify-start transition-colors duration-300 ${
                  isTicketsOpen 
                    ? 'text-green-600 hover:text-green-700 hover:bg-green-600/10' 
                    : 'text-white hover:text-[#cad95e] hover:bg-white/10'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Info className="w-4 h-4 mr-3" />
                <span className={isTicketsOpen ? 'text-2xl font-bold' : ''}>Sobre NATUR</span>
              </Button>

              <Button 
                variant="ghost"
                className={`w-full justify-start transition-colors duration-300 ${
                  isTicketsOpen 
                    ? 'text-green-600 hover:text-green-700 hover:bg-green-600/10' 
                    : 'text-white hover:text-[#cad95e] hover:bg-white/10'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Users className="w-4 h-4 mr-3" />
                <span className={isTicketsOpen ? 'text-2xl font-bold' : ''}>Quiénes Somos</span>
              </Button>

              <Button 
                variant="ghost"
                className={`w-full justify-start transition-colors duration-300 ${
                  isTicketsOpen 
                    ? 'text-green-600 hover:text-green-700 hover:bg-green-600/10' 
                    : 'text-white hover:text-[#cad95e] hover:bg-white/10'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Mail className="w-4 h-4 mr-3" />
                <span className={isTicketsOpen ? 'text-2xl font-bold' : ''}>Contacto</span>
              </Button>

              {/* Social Links */}
              <div className={`border-t my-3 transition-colors duration-300 ${
                isTicketsOpen ? 'border-green-600/20' : 'border-white/20'
              }`}></div>
              
              <div className="flex justify-center space-x-4">
                <Button 
                  variant="ghost"
                  size="icon"
                  className={`transition-colors duration-300 ${
                    isTicketsOpen 
                      ? 'text-green-600 hover:text-green-700 hover:bg-green-600/10' 
                      : 'text-white hover:text-[#cad95e] hover:bg-white/10'
                  }`}
                >
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost"
                  size="icon"
                  className={`transition-colors duration-300 ${
                    isTicketsOpen 
                      ? 'text-green-600 hover:text-green-700 hover:bg-green-600/10' 
                      : 'text-white hover:text-[#cad95e] hover:bg-white/10'
                  }`}
                >
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost"
                  size="icon"
                  className={`transition-colors duration-300 ${
                    isTicketsOpen 
                      ? 'text-green-600 hover:text-green-700 hover:bg-green-600/10' 
                      : 'text-white hover:text-[#cad95e] hover:bg-white/10'
                  }`}
                >
                  <Facebook className="w-4 h-4" />
                </Button>
              </div>

              {/* Festival Info */}
              <div className={`text-center pt-4 border-t transition-colors duration-300 ${
                isTicketsOpen ? 'border-green-600/20' : 'border-white/20'
              }`}>
                <p className={`text-xs transition-colors duration-300 ${
                  isTicketsOpen ? 'text-green-600/80' : 'text-white/80'
                }`}>
                  Festival NATUR 2025
                </p>
                <p className={`text-xs transition-colors duration-300 ${
                  isTicketsOpen ? 'text-green-600/60' : 'text-white/60'
                }`}>
                  14-15 Noviembre • Bogotá
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}