import React from "react";
import { Link } from "wouter";
import { Building2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MainPortals() {
  return (
    <div className="fixed top-4 left-4 z-50 flex gap-3">
      <Link to="/registro">
        <Button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm font-medium">
          <Building2 className="w-4 h-4 mr-2" />
          Portal Empresas
        </Button>
      </Link>
      
      <Link to="/mapa">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium">
          <MapPin className="w-4 h-4 mr-2" />
          Con-Sentidos
        </Button>
      </Link>
    </div>
  );
}