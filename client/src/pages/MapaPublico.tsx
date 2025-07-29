import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, Phone, Globe, ExternalLink } from "lucide-react";
import { useLocation } from "wouter";

// Mock data for map visualization - viajeros can see initiatives without registration
const mockInitiatives = [
  {
    id: 1,
    name: "EcoAventura Colombia",
    type: "Emprendimiento",
    location: "Medellín, Colombia",
    coordinates: { lat: 6.2442, lng: -75.5812 },
    description: "Experiencias de turismo sostenible en Antioquia",
    contact: "+57 300 123 4567",
    website: "www.ecoaventura.co",
    experiences: ["Senderismo ecológico", "Avistamiento de aves", "Turismo rural"]
  },
  {
    id: 2,
    name: "Verde Patagonia",
    type: "Iniciativa",
    location: "Bariloche, Argentina",
    coordinates: { lat: -41.1335, lng: -71.3103 },
    description: "Conservación y turismo regenerativo en la Patagonia",
    contact: "+54 9 294 456 7890",
    website: "www.verdepatagonia.com",
    experiences: ["Turismo regenerativo", "Conservación marina", "Educación ambiental"]
  },
  {
    id: 3,
    name: "Amazonia Sostenible",
    type: "Emprendimiento",
    location: "Leticia, Colombia",
    coordinates: { lat: -4.2151, lng: -69.9406 },
    description: "Turismo comunitario en el corazón del Amazonas",
    contact: "+57 318 987 6543",
    website: "www.amazoniasostenible.org",
    experiences: ["Turismo comunitario", "Medicina ancestral", "Biodiversidad"]
  }
];

const MapaPublico = () => {
  const [selectedInitiative, setSelectedInitiative] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [, setLocation] = useLocation();

  const filteredInitiatives = mockInitiatives.filter(initiative =>
    initiative.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    initiative.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    initiative.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContactClick = () => {
    setLocation('/registro');
  };

  return (
    <div className="min-h-screen bg-[#222408] text-[#FCF8EE]">
      {/* Header */}
      <header className="bg-[#222408] border-b border-[#FCF8EE]/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-gasoek text-3xl md:text-4xl text-[#cad95e] uppercase">
                Festival NATUR
              </h1>
              <p className="text-[#FCF8EE]/80 mt-2">
                Explora experiencias de turismo sostenible
              </p>
            </div>
            <Button 
              onClick={() => setLocation('/registro')}
              className="bg-[#cad95e] text-[#222408] hover:bg-[#cad95e]/90"
            >
              Conectar
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-[#FCF8EE]/60" />
              <Input
                placeholder="Buscar iniciativas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#FCF8EE]/10 border-[#FCF8EE]/20 text-[#FCF8EE]"
              />
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredInitiatives.map((initiative) => (
                <Card 
                  key={initiative.id}
                  className="bg-[#FCF8EE]/5 border-[#FCF8EE]/20 cursor-pointer hover:bg-[#FCF8EE]/10 transition-colors"
                  onClick={() => setSelectedInitiative(initiative)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-[#FCF8EE]">{initiative.name}</h3>
                        <div className="flex items-center text-sm text-[#FCF8EE]/70">
                          <MapPin className="h-3 w-3 mr-1" />
                          {initiative.location}
                        </div>
                        <Badge 
                          variant="secondary" 
                          className="bg-[#cad95e]/20 text-[#cad95e] border-[#cad95e]/30"
                        >
                          {initiative.type}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Map Area */}
          <div className="lg:col-span-2">
            <Card className="bg-[#FCF8EE]/5 border-[#FCF8EE]/20 h-96">
              <CardContent className="p-0 h-full">
                <div className="w-full h-full bg-gradient-to-br from-[#cad95e]/20 to-[#FCF8EE]/10 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-[#cad95e] mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-[#FCF8EE] mb-2">
                      Mapa Interactivo
                    </h3>
                    <p className="text-[#FCF8EE]/70">
                      Selecciona una iniciativa del panel lateral para ver detalles
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Initiative Details */}
            {selectedInitiative && (
              <Card className="bg-[#FCF8EE]/5 border-[#FCF8EE]/20 mt-6">
                <CardHeader>
                  <CardTitle className="text-[#FCF8EE] flex items-center justify-between">
                    {selectedInitiative.name}
                    <Badge 
                      variant="secondary" 
                      className="bg-[#cad95e]/20 text-[#cad95e] border-[#cad95e]/30"
                    >
                      {selectedInitiative.type}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-[#FCF8EE]/80">{selectedInitiative.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center text-[#FCF8EE]/70">
                      <MapPin className="h-4 w-4 mr-2" />
                      {selectedInitiative.location}
                    </div>
                    <div className="flex items-center text-[#FCF8EE]/70">
                      <Phone className="h-4 w-4 mr-2" />
                      {selectedInitiative.contact}
                    </div>
                    <div className="flex items-center text-[#FCF8EE]/70">
                      <Globe className="h-4 w-4 mr-2" />
                      {selectedInitiative.website}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-[#FCF8EE] mb-2">Experiencias Disponibles</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedInitiative.experiences.map((exp: string, index: number) => (
                        <Badge 
                          key={index}
                          variant="outline" 
                          className="border-[#cad95e]/30 text-[#cad95e]"
                        >
                          {exp}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button 
                      onClick={handleContactClick}
                      className="bg-[#cad95e] text-[#222408] hover:bg-[#cad95e]/90"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Contactar
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-[#FCF8EE]/30 text-[#FCF8EE] hover:bg-[#FCF8EE]/10"
                      onClick={() => window.open(`https://${selectedInitiative.website}`, '_blank')}
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      Visitar Web
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapaPublico;