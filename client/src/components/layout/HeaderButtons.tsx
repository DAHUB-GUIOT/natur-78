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

  return (
    <>
      {/* Transparent header with logo and hamburger menu over background */}
      <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-black/10">
        <div className="flex items-center justify-between p-4">
          {/* Logo on the left */}
          <Link to="/" className="flex items-center">
            <div className="w-12 h-12 flex items-center justify-center">
              <span className="text-yellow-400 font-gasoek text-3xl font-bold drop-shadow-lg">N</span>
            </div>
            <div className="ml-3 hidden sm:block">
              <h1 className="text-white font-gasoek text-lg font-bold">NATUR</h1>
              <p className="text-white/80 text-xs">Festival 2025</p>
            </div>
          </Link>

          {/* Desktop Portal Buttons - only visible on larger screens */}
          {showPortalButtons && (
            <div className="hidden md:flex items-center gap-3">
              <Link to="/auth/empresas">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="bg-yellow-400/90 border-2 border-green-600 text-green-800 font-bold uppercase tracking-wide px-4 py-2 hover:bg-green-600 hover:text-yellow-400 backdrop-blur-sm transition-all shadow-lg"
                >
                  Portal Empresas
                </Button>
              </Link>
              
              <Link to="/portal-viajeros">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="bg-yellow-400/90 border-2 border-green-600 text-green-800 font-bold uppercase tracking-wide px-4 py-2 hover:bg-green-600 hover:text-yellow-400 backdrop-blur-sm transition-all shadow-lg"
                >
                  Mapa Turismo
                </Button>
              </Link>
            </div>
          )}

          {/* Navigation buttons on the right */}
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:text-[#cad95e] hover:bg-white/10 w-10 h-10 touch-manipulation min-w-[44px]"
            >
              <Globe className="h-4 w-4" />
            </Button>
            
            {/* Hamburger menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-[#cad95e] hover:bg-white/10 w-10 h-10 touch-manipulation min-w-[44px]"
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
            className="fixed top-16 left-0 right-0 z-40 bg-yellow-400/90 backdrop-blur-sm border-b border-green-600/30"
          >
            <div className="p-4 space-y-3">
              {/* Portal Buttons */}
              <Link to="/auth/empresas" onClick={() => setIsMenuOpen(false)}>
                <Button 
                  variant="ghost"
                  className="w-full justify-start text-green-800 hover:text-green-900 hover:bg-green-600/20 font-bold uppercase tracking-wide"
                >
                  <Building2 className="w-4 h-4 mr-3" />
                  Portal Empresas
                </Button>
              </Link>
              
              <Link to="/portal-viajeros" onClick={() => setIsMenuOpen(false)}>
                <Button 
                  variant="ghost"
                  className="w-full justify-start text-green-800 hover:text-green-900 hover:bg-green-600/20 font-bold uppercase tracking-wide"
                >
                  <MapPin className="w-4 h-4 mr-3" />
                  Mapa Turismo Sostenible
                </Button>
              </Link>

              {/* Divider */}
              <div className="border-t border-green-600/30 my-3"></div>

              {/* Event Information */}
              <Link to="/agenda" onClick={() => setIsMenuOpen(false)}>
                <Button 
                  variant="ghost"
                  className="w-full justify-start text-green-800 hover:text-green-900 hover:bg-green-600/20 font-bold uppercase tracking-wide"
                >
                  <Calendar className="w-4 h-4 mr-3" />
                  Agenda Festival
                </Button>
              </Link>
              
              <Link to="/tickets" onClick={() => setIsMenuOpen(false)}>
                <Button 
                  variant="ghost"
                  className="w-full justify-start text-green-800 hover:text-green-900 hover:bg-green-600/20 font-bold uppercase tracking-wide"
                >
                  <Ticket className="w-4 h-4 mr-3" />
                  Entradas
                </Button>
              </Link>

              {/* About Section */}
              <div className="border-t border-green-600/30 my-3"></div>
              
              <Button 
                variant="ghost"
                className="w-full justify-start text-green-800 hover:text-green-900 hover:bg-green-600/20 font-bold uppercase tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                <Info className="w-4 h-4 mr-3" />
                Sobre NATUR
              </Button>

              <Button 
                variant="ghost"
                className="w-full justify-start text-green-800 hover:text-green-900 hover:bg-green-600/20 font-bold uppercase tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                <Users className="w-4 h-4 mr-3" />
                Quiénes Somos
              </Button>

              <Button 
                variant="ghost"
                className="w-full justify-start text-green-800 hover:text-green-900 hover:bg-green-600/20 font-bold uppercase tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                <Mail className="w-4 h-4 mr-3" />
                Contacto
              </Button>

              {/* Social Links */}
              <div className="border-t border-green-600/30 my-3"></div>
              
              <div className="flex justify-center space-x-4">
                <Button 
                  variant="ghost"
                  size="icon"
                  className="text-green-800 hover:text-green-900 hover:bg-green-600/20"
                >
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost"
                  size="icon"
                  className="text-green-800 hover:text-green-900 hover:bg-green-600/20"
                >
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost"
                  size="icon"
                  className="text-green-800 hover:text-green-900 hover:bg-green-600/20"
                >
                  <Facebook className="w-4 h-4" />
                </Button>
              </div>

              {/* Festival Info */}
              <div className="text-center pt-4 border-t border-green-600/30">
                <p className="text-green-800 text-xs font-bold uppercase tracking-wide">
                  Festival NATUR 2025
                </p>
                <p className="text-green-700 text-xs font-medium">
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