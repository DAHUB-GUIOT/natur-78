
import React from "react";
import { Link } from "wouter";
import { User, Menu, Calendar, Ticket, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrutalistMenu } from "@/components/ui/BrutalistMenu";

import Festival_NATUR from "@assets/Festival-NATUR.png";

export function Hero() {

  return (
    <header className="relative min-h-screen w-full overflow-hidden">
      {/* Skip to Content Link for Accessibility */}
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>
      {/* Background Image */}
      <img 
        alt="Festival NATUR - Sustainable Tourism Community" 
        className="absolute h-full w-full object-cover inset-0" 
        src="/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg" 
      />
      {/* Light Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-black/20"></div>
      {/* Navigation is now handled by HeaderButtons component - transparent over background */}
      {/* Main Content - Left Aligned like BIME */}
      <div id="main-content" className="relative z-10 flex items-center min-h-screen px-6 sm:px-8 md:px-20 pt-24">
        <div className="max-w-7xl w-full">
          <div className="max-w-4xl mx-auto text-center">
            {/* Festival NATUR Logo */}
            <div className="mb-12">
              <img 
                src={Festival_NATUR} 
                alt="Festival NATUR 2025"
                className="mx-auto max-w-lg w-full h-auto"
              />
            </div>

            {/* Main Action Buttons - Centered horizontally */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
              <Link to="/tickets" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="text-black font-bold text-lg px-8 py-4 rounded-none shadow-lg flex items-center justify-center w-full hover:opacity-90 transition-all duration-300"
                  style={{ backgroundColor: '#cad95e', fontFamily: 'Unbounded, sans-serif', fontWeight: '300' }}
                >
                  <Ticket className="w-5 h-5 mr-2" />
                  TICKETS
                </Button>
              </Link>
              
              <Link to="/agenda" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="font-bold text-lg px-8 py-4 rounded-none shadow-lg flex items-center justify-center w-full hover:opacity-90 transition-all duration-300"
                  style={{ backgroundColor: '#aa3b1e', color: '#e5bbb0', fontFamily: 'Unbounded, sans-serif', fontWeight: '300' }}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  AGENDA
                </Button>
              </Link>
              

            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
