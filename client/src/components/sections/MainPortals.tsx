import React from "react";
import { Link } from "wouter";
import { Building2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MainPortals() {
  return (
    <div className="fixed top-2 left-2 z-50 flex gap-1 sm:gap-2">
      <Link to="/registro">
        <Button className="bg-green-600 hover:bg-green-700 text-white px-2 h-8 text-xs font-medium touch-manipulation">
          <Building2 className="w-3 h-3 mr-1" />
          <span className="hidden sm:inline">Portal </span>Empresas
        </Button>
      </Link>
      
      <Link to="/con-sentidos">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-2 h-8 text-xs font-medium touch-manipulation">
          <MapPin className="w-3 h-3 mr-1" />
          Con-Sentidos
        </Button>
      </Link>
    </div>
  );
}