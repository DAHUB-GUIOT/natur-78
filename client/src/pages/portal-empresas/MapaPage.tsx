import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { InteractiveMap } from "@/components/dashboard/InteractiveMap";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import ExperienceForm from "@/components/dashboard/ExperienceForm";
import { apiRequest } from "@/lib/queryClient";

export default function MapaPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showExperienceForm, setShowExperienceForm] = useState(false);

  // Fetch all companies for the map
  const { data: allCompanies = [], isLoading: companiesLoading } = useQuery({
    queryKey: ['/api/users/companies'],
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-gray-900 via-black to-green-900 min-h-[calc(100vh-5rem)] lg:min-h-[calc(100vh-5rem)]">
      {/* Map Header - Floating */}
      <div className="absolute top-4 left-4 right-4 z-20 lg:top-6 lg:left-6 lg:right-6">
        <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-semibold text-sm lg:text-base">Mapa Interactivo</h3>
                <p className="text-white/60 text-xs lg:text-sm">Explora empresas de turismo sostenible</p>
              </div>
              <div className="flex items-center gap-2">
                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                  <Input
                    placeholder="Buscar empresas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 pl-10 w-48 lg:w-64"
                    data-testid="input-search-companies"
                  />
                </div>
                
                {/* Add Experience Button */}
                <Sheet open={showExperienceForm} onOpenChange={setShowExperienceForm}>
                  <SheetTrigger asChild>
                    <Button 
                      size="sm" 
                      className="bg-green-600/80 hover:bg-green-600 text-white border-green-500/50"
                      data-testid="button-add-experience"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Experiencia
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full sm:max-w-2xl p-0 bg-gradient-to-br from-gray-900 via-black to-green-900 border-l border-white/20">
                    <SheetHeader className="p-6 border-b border-white/20">
                      <SheetTitle className="text-white font-light">Crear Nueva Experiencia</SheetTitle>
                    </SheetHeader>
                    <div className="p-6">
                      <ExperienceForm onClose={() => setShowExperienceForm(false)} />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Companies Counter */}
      <div className="absolute top-20 left-4 right-4 z-10 lg:top-24 lg:left-6 lg:right-6">
        <Card className="bg-white/5 backdrop-blur-xl border-white/10">
          <CardContent className="p-2 lg:p-3">
            <div className="flex items-center justify-between text-white/80">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-400" />
                <span className="text-xs lg:text-sm">
                  {companiesLoading ? 'Cargando...' : `${allCompanies.length} empresas registradas`}
                </span>
              </div>
              {searchQuery && (
                <span className="text-xs text-green-400">
                  Filtrando por: "{searchQuery}"
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Full-Screen Interactive Map */}
      <div className="absolute inset-0 z-0">
        <InteractiveMap
          companies={allCompanies}
          searchQuery={searchQuery}
          isLoading={companiesLoading}
          className="w-full h-full"
          data-testid="interactive-map"
        />
      </div>
    </div>
  );
}