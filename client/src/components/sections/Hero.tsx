
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
      
      {/* Top Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 p-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
          </div>
          
          {/* Top Right Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-emerald-300 hover:bg-emerald-600/20">
              <User className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-emerald-300 hover:bg-emerald-600/20">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
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
          
          {/* Portal Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Link to="/auth/empresas">
              <Button 
                size="lg" 
                className="bg-black hover:bg-gray-800 text-white font-bold text-xl px-12 py-6 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Portal Empresas
              </Button>
            </Link>
            
            <Link to="/auth/consentidos">
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-white font-bold text-xl px-12 py-6 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Con-Sentidos
              </Button>
            </Link>
          </div>
          
          {/* Quick Access */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/mapa">
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-green-600 text-green-700 hover:bg-green-50 font-medium text-lg px-8 py-4"
              >
                Explorar Experiencias
              </Button>
            </Link>
          </div>
        </div>
      </div>

    </header>
  );
}
