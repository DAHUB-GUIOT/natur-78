
import React from "react";
import { Link } from "wouter";
import { User, Menu, Calendar, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrutalistMenu } from "@/components/ui/BrutalistMenu";

export function Hero() {

  return (
    <header className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <img 
        alt="Festival NATUR - Sustainable Tourism Community" 
        className="absolute h-full w-full object-cover inset-0" 
        src="/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg" 
      />
      
      {/* Light Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Top Navigation - Fixed with Dark Green Background */}
      <nav className="fixed top-0 left-0 right-0 z-50 shadow-lg" style={{ backgroundColor: '#181c0d', borderBottom: '1px solid #2a2f1a' }}>
        <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <span className="font-bold text-2xl" style={{ color: '#EDFF60' }}>N</span>
          </div>
          
          {/* Portal Buttons in Top Menu */}
          <div className="flex items-center space-x-4">
            <Link to="/auth/empresas">
              <Button 
                size="sm" 
                variant="outline"
                className="bg-transparent border-2 text-black font-medium px-4 py-2 rounded-full backdrop-blur-sm hover:opacity-90"
                style={{ borderColor: '#EDFF60', color: '#EDFF60' }}
              >
                Portal Empresas
              </Button>
            </Link>
            
            <Link to="/portal-viajeros">
              <Button 
                size="sm" 
                variant="outline"
                className="bg-transparent border-2 text-black font-medium px-4 py-2 rounded-full backdrop-blur-sm hover:opacity-90"
                style={{ borderColor: '#EDFF60', color: '#EDFF60' }}
              >
                Mapa Turismo Sostenible
              </Button>
            </Link>
            
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <User className="w-5 h-5" />
            </Button>
            <BrutalistMenu />
          </div>
        </div>
      </nav>
      
      {/* Main Content - Left Aligned like BIME */}
      <div className="relative z-10 flex items-center min-h-screen px-6 sm:px-8 md:px-20 pt-20">
        <div className="max-w-7xl w-full">
          <div className="max-w-3xl">
            {/* Main Title */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-gasoek mb-3 tracking-wide leading-none" style={{ color: '#EDFF60' }}>
              NATUR
            </h1>
            
            {/* Subtitle */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-gasoek mb-6 leading-tight max-w-xl" style={{ color: '#EDFF60' }}>
              TODO SOBRE TURISMO SOSTENIBLE
              <br />
              <span style={{ color: '#EDFF60', opacity: 0.8 }}>Y MÁS</span>
            </h2>

            {/* Main Action Buttons - Stacked vertically like BIME */}
            <div className="flex flex-col gap-3 max-w-xs">
              <Link to="/tickets">
                <Button 
                  size="lg" 
                  className="text-black font-bold text-sm px-6 py-3 rounded-lg shadow-lg flex items-center justify-center w-full hover:opacity-90"
                  style={{ backgroundColor: '#EDFF60' }}
                >
                  <Ticket className="w-4 h-4 mr-2" />
                  TICKETS
                </Button>
              </Link>
              
              <Link to="/agenda">
                <Button 
                  size="lg" 
                  className="bg-black hover:bg-gray-800 text-white font-bold text-sm px-6 py-3 rounded-lg shadow-lg flex items-center justify-center w-full"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  AGENDA
                </Button>
              </Link>
              
              <Link to="/portal-viajeros">
                <Button 
                  size="lg" 
                  className="bg-white hover:bg-yellow-50 text-black font-bold text-sm px-6 py-3 rounded-lg shadow-lg flex items-center justify-center w-full"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  EXPERIENCIAS
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

    </header>
  );
}
