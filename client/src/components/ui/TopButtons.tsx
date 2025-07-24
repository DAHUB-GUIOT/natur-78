
import React from "react";
import { Globe, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function TopButtons() {
  return (
    <div className="fixed top-2 right-2 z-50 flex items-center gap-1 sm:gap-2 md:gap-3">
      <Link to="/dashboard">
        <Button 
          className="bg-[#E97451] text-white hover:bg-[#D15A35] h-8 px-2 text-xs font-medium touch-manipulation"
        >
          Dashboard
        </Button>
      </Link>
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-[#FCF8EE] hover:text-[#EDFF60] hover:bg-transparent w-8 h-8 touch-manipulation"
      >
        <Globe className="h-4 w-4" />
      </Button>
      <Link to="/registro">
        <Button 
          className="bg-[#EDFF60] text-[#191C0F] hover:bg-[#CEDD9F] h-8 px-2 text-xs font-medium touch-manipulation"
        >
          <UserPlus className="mr-1 h-3 w-3" />
          Registro
        </Button>
      </Link>
      <Link to="/mapa">
        <Button 
          className="bg-[#EDFF60] text-[#191C0F] hover:bg-[#CEDD9F] h-8 px-2 text-xs font-medium touch-manipulation"
        >
          <LogIn className="mr-1 h-3 w-3" />
          Explorar
        </Button>
      </Link>
    </div>
  );
}
