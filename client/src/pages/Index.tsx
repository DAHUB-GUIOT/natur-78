import React from "react";
import { HeaderButtons } from "@/components/layout/HeaderButtons";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Leaf, Map, Calendar, Users, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#0a1a0a] text-white overflow-hidden">
      <HeaderButtons showPortalButtons={true} />
      
      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 border border-[#cad95e] rotate-45"></div>
          <div className="absolute bottom-32 right-20 w-24 h-24 border border-[#cad95e] rotate-12"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-[#cad95e] -rotate-45"></div>
        </div>
        
        {/* Central Content */}
        <div className="text-center max-w-4xl mx-auto px-6 z-10">
          {/* Logo */}
          <div className="mb-12">
            <h1 className="font-gasoek text-8xl md:text-9xl text-[#cad95e] uppercase tracking-wider mb-4">
              NATUR
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-jakarta">
              Festival de Turismo Sostenible
            </p>
            <p className="text-lg text-white/60 font-jakarta mt-2">
              14 - 15 Noviembre 2025 • Bogotá
            </p>
          </div>
          
          {/* Action Buttons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Link href="/sobre-natur">
              <Button className="w-full h-16 bg-transparent border-2 border-[#cad95e] text-[#cad95e] hover:bg-[#cad95e] hover:text-[#0a1a0a] transition-all duration-300 text-lg font-jakarta">
                <Leaf className="w-6 h-6 mr-3" />
                Sobre NATUR
                <ArrowRight className="w-5 h-5 ml-3" />
              </Button>
            </Link>
            
            <Link href="/mapa-publico">
              <Button className="w-full h-16 bg-transparent border-2 border-white/30 text-white hover:bg-white hover:text-[#0a1a0a] transition-all duration-300 text-lg font-jakarta">
                <Map className="w-6 h-6 mr-3" />
                Explorar Mapa
                <ArrowRight className="w-5 h-5 ml-3" />
              </Button>
            </Link>
            
            <Link href="/agenda">
              <Button className="w-full h-16 bg-transparent border-2 border-white/30 text-white hover:bg-white hover:text-[#0a1a0a] transition-all duration-300 text-lg font-jakarta">
                <Calendar className="w-6 h-6 mr-3" />
                Ver Agenda
                <ArrowRight className="w-5 h-5 ml-3" />
              </Button>
            </Link>
            
            <Link href="/registro">
              <Button className="w-full h-16 bg-[#cad95e] text-[#0a1a0a] hover:bg-[#cad95e]/90 transition-all duration-300 text-lg font-jakarta font-semibold">
                <Users className="w-6 h-6 mr-3" />
                Conectar
                <ArrowRight className="w-5 h-5 ml-3" />
              </Button>
            </Link>
          </div>
          
          {/* Bottom Text */}
          <div className="text-center">
            <p className="text-white/60 font-jakarta text-sm">
              Únete al movimiento de turismo sostenible y regenerativo
            </p>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute bottom-10 left-10 opacity-20">
          <Leaf className="w-12 h-12 text-[#cad95e] animate-pulse" />
        </div>
        <div className="absolute top-20 right-20 opacity-20">
          <Leaf className="w-8 h-8 text-[#cad95e] animate-pulse" style={{ animationDelay: "1s" }} />
        </div>
      </div>
    </div>
  );
};

export default Index;