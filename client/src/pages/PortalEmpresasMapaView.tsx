import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Building2, MapPin, ArrowLeft, User } from "lucide-react";
import { InteractiveMap } from "@/components/dashboard/InteractiveMap";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";

interface RegisteredCompany {
  id: number;
  companyName: string;
  firstName: string;
  lastName: string;
  email: string;
  companyDescription: string;
  companyCategory: string;
  companySubcategory: string;
  coordinates: { lat: number; lng: number } | null;
  address: string;
  city: string;
  country: string;
  website: string;
  phone: string;
  facebookUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  businessType: string;
  createdAt: string;
}

const PortalEmpresasMapaView = () => {
  const [, setLocation] = useLocation();

  // Fetch all companies for the sidebar list
  const { data: companies = [], isLoading } = useQuery({
    queryKey: ['/api/companies/map'],
  });

  const filteredCompanies = (companies as RegisteredCompany[]).filter((company: RegisteredCompany) => 
    company.coordinates && 
    company.coordinates.lat && 
    company.coordinates.lng
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Cargando mapa de empresas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-black">
      {/* Header */}
      <motion.header 
        className="bg-black/40 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setLocation('/portal-empresas')}
              className="text-white hover:bg-white/10"
              data-testid="button-back"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Portal Empresas
            </Button>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-green-400" />
              <h1 className="text-xl font-bold text-white">
                Mapa de Empresas
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation('/portal-empresas/perfil')}
              className="text-white hover:bg-white/10"
              data-testid="button-perfil"
            >
              <User className="w-4 h-4 mr-2" />
              Mi Perfil
            </Button>
            <Badge className="bg-green-600/20 text-green-300 border-green-500/50">
              {filteredCompanies.length} empresas ubicadas
            </Badge>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)]">
        {/* Sidebar with company list */}
        <motion.div 
          className="w-full lg:w-80 bg-black/40 backdrop-blur-xl border-r border-white/10 overflow-y-auto"
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="p-4">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-white flex items-center">
                <Building2 className="w-5 h-5 mr-2 text-green-400" />
                Empresas Registradas
              </h2>
              <p className="text-gray-400 text-sm">
                Click en una empresa para ver su ubicación
              </p>
            </div>
            
            <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
              {filteredCompanies.map((company, index) => (
                <motion.div
                  key={company.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card 
                    className="backdrop-blur-xl bg-gray-900/40 border border-gray-600/30 hover:bg-gray-800/50 transition-all cursor-pointer group"
                    data-testid={`card-company-${company.id}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-white group-hover:text-green-300 transition-colors">
                            {company.companyName || company.firstName}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {company.businessType || company.role}
                          </p>
                          {company.address && (
                            <p className="text-xs text-gray-500 mt-1 flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {company.address}
                            </p>
                          )}
                        </div>
                        <Badge 
                          variant="outline" 
                          className="text-xs bg-green-600/20 text-green-300 border-green-500/50"
                        >
                          Activa
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredCompanies.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <MapPin className="w-8 h-8 mx-auto mb-3 opacity-50" />
                <p>No hay empresas con ubicación registrada</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Map View */}
        <motion.div 
          className="flex-1"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="h-full w-full" data-testid="interactive-map-container">
            <InteractiveMap />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PortalEmpresasMapaView;