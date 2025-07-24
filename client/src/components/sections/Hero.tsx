
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
      <div className="relative z-10 flex items-center min-h-screen px-6 sm:px-8 md:px-20">
        <div className="max-w-7xl mx-auto w-full">
          {/* Main Title */}
          <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-black text-emerald-300 mb-6 font-gasoek tracking-wide leading-none">
            NATUR
          </h1>
          
          {/* Subtitle */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 max-w-3xl leading-tight font-jakarta">
            Todo sobre turismo sostenible
            <br />
            <span className="text-emerald-300">y más</span>
          </h2>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-2xl">
            <Link to="/auth/empresas">
              <Button 
                size="lg" 
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg px-8 py-4 rounded-lg shadow-xl flex items-center justify-center w-full sm:w-auto min-w-[200px]"
              >
                <Ticket className="w-6 h-6 mr-3" />
                PORTAL EMPRESAS
              </Button>
            </Link>
            
            <Link to="/mapa">
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-emerald-800 font-bold text-lg px-8 py-4 rounded-lg backdrop-blur-sm flex items-center justify-center w-full sm:w-auto min-w-[200px]"
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
                className="text-emerald-300 hover:text-emerald-200 font-medium text-lg underline p-0 h-auto"
              >
                ¿Eres viajero consciente? Únete a Con-Sentidos →
              </Button>
            </Link>
          </div>
        </div>
      </div>

    </header>
  );
}
