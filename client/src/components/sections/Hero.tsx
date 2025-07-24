
import React from "react";
import { Link } from "wouter";
import { User, Menu, Calendar, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {

  return (
    <header className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <img 
        alt="Festival NATUR - Sustainable Tourism Community" 
        className="absolute h-full w-full object-cover inset-0" 
        src="/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg" 
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-emerald-800/60"></div>
      
      {/* Top Navigation - Fixed with Glassmorphism */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
          </div>
          
          {/* Portal Buttons in Top Menu */}
          <div className="flex items-center space-x-4">
            <Link to="/auth/empresas">
              <Button 
                size="sm" 
                variant="outline"
                className="bg-transparent border-2 border-white hover:bg-white/20 text-white font-medium px-4 py-2 rounded-full backdrop-blur-sm"
              >
                Portal Empresas
              </Button>
            </Link>
            
            <Link to="/auth/consentidos">
              <Button 
                size="sm" 
                variant="outline"
                className="bg-transparent border-2 border-white hover:bg-white/20 text-white font-medium px-4 py-2 rounded-full backdrop-blur-sm"
              >
                Con-Sentidos
              </Button>
            </Link>
            
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <User className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-bold text-green-800 mb-6 font-gasoek tracking-wide">
            NATUR
          </h1>
          
          {/* Subtitle */}
          <h2 className="text-2xl md:text-3xl text-green-700 mb-8 font-medium">
            Plataforma de Turismo Sostenible
          </h2>
          <p className="text-lg md:text-xl text-white mb-12 max-w-3xl mx-auto leading-relaxed">
            Conectamos emprendedores, viajeros e inversores para crear experiencias de turismo consciente y regenerativo
          </p>
          
          {/* Main Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/tickets">
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-4 rounded-lg shadow-xl flex items-center justify-center w-full sm:w-auto min-w-[180px]"
              >
                <Ticket className="w-6 h-6 mr-3" />
                TICKETS
              </Button>
            </Link>
            
            <Link to="/agenda">
              <Button 
                size="lg" 
                className="bg-black hover:bg-gray-800 text-white font-bold text-lg px-8 py-4 rounded-lg shadow-xl flex items-center justify-center w-full sm:w-auto min-w-[180px]"
              >
                <Calendar className="w-6 h-6 mr-3" />
                AGENDA
              </Button>
            </Link>
            
            <Link to="/mapa">
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-4 rounded-lg shadow-xl flex items-center justify-center w-full sm:w-auto min-w-[180px]"
              >
                <Calendar className="w-6 h-6 mr-3" />
                EXPERIENCIAS
              </Button>
            </Link>
          </div>
        </div>
      </div>

    </header>
  );
}
