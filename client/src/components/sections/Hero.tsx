
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
          <h1 className="text-8xl sm:text-9xl md:text-[10rem] lg:text-[12rem] xl:text-[14rem] font-black text-yellow-400 mb-6 font-gasoek tracking-wide leading-none">
            NATUR
          </h1>
          
          {/* Subtitle */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-yellow-300 mb-8 leading-tight">
            Todo sobre turismo sostenible
            <br />
            <span className="text-yellow-200">y más</span>
          </h2>

          
          {/* Main Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/tickets">
              <Button 
                size="lg" 
                className="bg-white hover:bg-yellow-50 text-black font-bold text-lg px-8 py-4 rounded-lg shadow-xl flex items-center justify-center w-full sm:w-auto min-w-[180px]"
              >
                <Ticket className="w-6 h-6 mr-3" />
                TICKETS
              </Button>
            </Link>
            
            <Link to="/agenda">
              <Button 
                size="lg" 
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-lg px-8 py-4 rounded-lg shadow-xl flex items-center justify-center w-full sm:w-auto min-w-[180px]"
              >
                <Calendar className="w-6 h-6 mr-3" />
                AGENDA
              </Button>
            </Link>
            
            <Link to="/mapa">
              <Button 
                size="lg" 
                className="bg-white hover:bg-yellow-50 text-black font-bold text-lg px-8 py-4 rounded-lg shadow-xl flex items-center justify-center w-full sm:w-auto min-w-[180px]"
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
