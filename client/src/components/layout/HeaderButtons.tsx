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
      {/* Portal buttons removed from header - now in main hero section */}

      {/* Navigation buttons (right side) - on all pages */}
      <div className="fixed top-2 right-2 z-50 flex items-center gap-1 sm:gap-2 md:gap-3 fixed-header-buttons p-1">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-[#FCF8EE] hover:text-[#cad95e] hover:bg-transparent w-10 h-10 touch-manipulation min-w-[44px]"
        >
          <Globe className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}