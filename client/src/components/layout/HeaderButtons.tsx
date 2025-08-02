import React, { useState } from "react";
import { Globe, LogIn, UserPlus, Building2, MapPin, Menu, X } from "lucide-react";
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
                  className="bg-white/10 border-2 border-[#cad95e] text-[#cad95e] font-medium px-4 py-2 hover:bg-[#cad95e] hover:text-black backdrop-blur-sm transition-all"
                >
                  Portal Empresas
                </Button>
              </Link>
              
              <Link to="/portal-viajeros">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="bg-white/10 border-2 border-[#cad95e] text-[#cad95e] font-medium px-4 py-2 hover:bg-[#cad95e] hover:text-black backdrop-blur-sm transition-all"
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
            className="fixed top-16 left-0 right-0 z-40 bg-black/90 backdrop-blur-lg border-b border-white/20"
          >
            <div className="p-4 space-y-3">
              {showPortalButtons && (
                <>
                  <Link to="/auth/empresas" onClick={() => setIsMenuOpen(false)}>
                    <Button 
                      variant="ghost"
                      className="w-full justify-start text-white hover:text-[#cad95e] hover:bg-white/10"
                    >
                      <Building2 className="w-4 h-4 mr-3" />
                      Portal Empresas
                    </Button>
                  </Link>
                  
                  <Link to="/portal-viajeros" onClick={() => setIsMenuOpen(false)}>
                    <Button 
                      variant="ghost"
                      className="w-full justify-start text-white hover:text-[#cad95e] hover:bg-white/10"
                    >
                      <MapPin className="w-4 h-4 mr-3" />
                      Mapa Turismo Sostenible
                    </Button>
                  </Link>
                </>
              )}
              
              <Link to="/agenda" onClick={() => setIsMenuOpen(false)}>
                <Button 
                  variant="ghost"
                  className="w-full justify-start text-white hover:text-[#cad95e] hover:bg-white/10"
                >
                  Agenda
                </Button>
              </Link>
              
              <Link to="/tickets" onClick={() => setIsMenuOpen(false)}>
                <Button 
                  variant="ghost"
                  className="w-full justify-start text-white hover:text-[#cad95e] hover:bg-white/10"
                >
                  Entradas
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}