import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, MapPin, Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InteractiveMap } from "@/components/dashboard/InteractiveMap";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import ExperienceForm from "@/components/dashboard/ExperienceForm";
import { apiRequest } from "@/lib/queryClient";

export default function MapaPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch all companies for the map
  const { data: allCompanies = [], isLoading: companiesLoading } = useQuery({
    queryKey: ['/api/users/companies'],
    staleTime: 5 * 60 * 1000,
  }) as { data: any[]; isLoading: boolean };

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden">
      {/* Full-Screen Interactive Map - Completely Immersive */}
      <div className="absolute inset-0 w-full h-full z-0">
        <InteractiveMap
          className="w-full h-full"
          data-testid="interactive-map"
        />
      </div>

      {/* Search Control - Top Left Floating Overlay */}
      <div className="absolute top-4 left-4 z-30 lg:top-6 lg:left-6">
        <div className="portal-glassmorphism p-4 rounded-2xl shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-green-400" />
              <div>
                <h3 className="text-white font-semibold text-sm">Mapa Interactivo</h3>
                <p className="text-white/60 text-xs">
                  {companiesLoading ? 'Cargando...' : `${allCompanies.length} empresas`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Input - Top Right Floating Overlay */}
      <div className="absolute top-4 right-4 z-30 lg:top-6 lg:right-6">
        <div className="portal-glassmorphism p-3 rounded-2xl shadow-2xl">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
              <Input
                placeholder="Buscar empresas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 pl-10 w-48 lg:w-64 h-10"
                data-testid="input-search-companies"
              />
            </div>
            
            {/* Filter Toggle Button */}
            <Button 
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className={`bg-white/10 hover:bg-white/20 text-white border-white/20 h-10 px-3 ${
                showFilters ? 'bg-green-600/50' : ''
              }`}
              data-testid="button-toggle-filters"
            >
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Advanced Filters - Floating Overlay (when toggled) */}
      {showFilters && (
        <div className="absolute top-20 right-4 z-30 lg:top-24 lg:right-6">
          <div className="portal-glassmorphism p-4 rounded-2xl shadow-2xl w-72">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-white font-semibold text-sm">Filtros Avanzados</h4>
                <Button 
                  size="sm"
                  onClick={() => setShowFilters(false)}
                  className="text-white hover:bg-white/20 p-1 h-6 w-6"
                >
                  ×
                </Button>
              </div>
              
              {/* Additional filter controls can be added here */}
              <div className="text-white/80 text-xs">
                {searchQuery ? (
                  <span className="text-green-400">Filtrando por: "{searchQuery}"</span>
                ) : (
                  <span>Mostrando todas las empresas</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Experience Button - Bottom Right Floating Overlay */}
      <div className="absolute bottom-6 right-6 z-30">
        <Sheet open={showExperienceForm} onOpenChange={setShowExperienceForm}>
          <SheetTrigger asChild>
            <Button 
              size="lg" 
              className="portal-glassmorphism bg-green-600/80 hover:bg-green-600 text-white border-green-500/50 shadow-2xl h-14 px-6 rounded-2xl"
              data-testid="button-add-experience"
            >
              <Plus className="w-5 h-5 mr-2" />
              Nueva Experiencia
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
  );
}