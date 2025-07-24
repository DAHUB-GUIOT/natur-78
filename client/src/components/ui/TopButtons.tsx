
import React from "react";
import { Globe, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function TopButtons() {
  return (
    <div className="fixed top-0 right-0 z-50 p-2 sm:p-4 flex items-center gap-2 sm:gap-4">
      <Link to="/dashboard">
        <Button 
          className="bg-[#E97451] text-white hover:bg-[#D15A35] h-8 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm"
        >
          Dashboard
        </Button>
      </Link>
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-[#FCF8EE] hover:text-[#EDFF60] hover:bg-transparent w-8 h-8 sm:w-10 sm:h-10"
      >
        <Globe className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
      <Link to="/registro">
        <Button 
          className="bg-[#EDFF60] text-[#191C0F] hover:bg-[#CEDD9F] h-8 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm"
        >
          <UserPlus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          Registrarse
        </Button>
      </Link>
      <Link to="/mapa">
        <Button 
          className="bg-[#EDFF60] text-[#191C0F] hover:bg-[#CEDD9F] h-8 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm"
        >
          <LogIn className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          Explorar Experiencias
        </Button>
      </Link>
    </div>
  );
}
