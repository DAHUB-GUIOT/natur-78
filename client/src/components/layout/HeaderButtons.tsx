import React from "react";
import { Globe, LogIn, UserPlus, Building2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface HeaderButtonsProps {
  showPortalButtons?: boolean;
}

export function HeaderButtons({ showPortalButtons = false }: HeaderButtonsProps) {
  return (
    <>
      {/* Portal buttons (left side) - only on homepage */}
      {showPortalButtons && (
        <div className="fixed top-2 left-2 z-50 flex gap-1 sm:gap-2 fixed-header-buttons p-1">
          <Link to="/registro">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-2 h-10 text-xs font-medium touch-manipulation min-w-[44px]">
              <Building2 className="w-3 h-3 mr-1" />
              <span className="hidden sm:inline">Portal </span>Empresas
            </Button>
          </Link>
          
          <Link to="/con-sentidos">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-2 h-10 text-xs font-medium touch-manipulation min-w-[44px]">
              <MapPin className="w-3 h-3 mr-1" />
              Con-Sentidos
            </Button>
          </Link>
        </div>
      )}

      {/* Navigation buttons (right side) - on all pages */}
      <div className="fixed top-2 right-2 z-50 flex items-center gap-1 sm:gap-2 md:gap-3 fixed-header-buttons p-1">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-[#FCF8EE] hover:text-[#EDFF60] hover:bg-transparent w-10 h-10 touch-manipulation min-w-[44px]"
        >
          <Globe className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}