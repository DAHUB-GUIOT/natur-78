
import React, { useState } from "react";
import { Link } from "wouter";
import { Building2, MapPin, Search, User, Menu, Calendar, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Hero() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <img 
        alt="Festival NATUR - Sustainable Tourism Community" 
        className="absolute h-full w-full object-cover inset-0" 
        src="/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg" 
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-green-900/70"></div>
      
      {/* Top Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 p-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
              <Input 
                placeholder="Busca en NATUR..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-3 bg-green-100/90 border-2 border-green-300 rounded-full text-green-800 placeholder:text-green-600 focus:bg-white focus:border-green-400 backdrop-blur-sm font-medium"
              />
              <Button 
                size="sm" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-500 hover:bg-green-600 rounded-full px-4"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Top Right Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-green-300 hover:bg-green-500/20">
              <User className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-green-300 hover:bg-green-500/20">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <div className="relative z-10 flex items-center min-h-screen px-6 sm:px-8 md:px-20">
        <div className="max-w-7xl mx-auto w-full">
          {/* Main Title */}
          <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-black text-green-300 mb-6 font-gasoek tracking-wider leading-none">
            NATUR
          </h1>
          
          {/* Subtitle */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 max-w-3xl leading-tight">
            Todo sobre turismo sostenible
            <br />
            <span className="text-green-300">y más</span>
          </h2>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-2xl">
            <Link to="/auth/empresas">
              <Button 
                size="lg" 
                className="bg-green-500 hover:bg-green-600 text-white font-bold text-lg px-8 py-4 rounded-lg shadow-xl flex items-center justify-center w-full sm:w-auto min-w-[200px]"
              >
                <Ticket className="w-6 h-6 mr-3" />
                PORTAL EMPRESAS
              </Button>
            </Link>
            
            <Link to="/mapa">
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-green-800 font-bold text-lg px-8 py-4 rounded-lg backdrop-blur-sm flex items-center justify-center w-full sm:w-auto min-w-[200px]"
              >
                <Calendar className="w-6 h-6 mr-3" />
                EXPERIENCIAS
              </Button>
            </Link>
          </div>
          
          {/* Secondary Link */}
          <div className="text-left">
            <Link to="/auth/consentidos">
              <Button 
                variant="link" 
                className="text-green-300 hover:text-green-200 font-medium text-lg underline p-0 h-auto"
              >
                ¿Eres viajero consciente? Únete a Con-Sentidos →
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </header>
  );
}
