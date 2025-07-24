
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { colombiaLocations } from "@/data/colombiaLocations";
import { useState } from "react";

// Define categories array
const categories = [
  { emoji: "📍", name: "Emprendedor" },
  { emoji: "🎒", name: "Viajero" },
  { emoji: "🌍", name: "ONG" },
  { emoji: "🛖", name: "Anfitrión" },
  { emoji: "🧭", name: "Guía" },
  { emoji: "🏛", name: "Institución" },
  { emoji: "🛠", name: "Creativo" },
];

export const SearchSection = () => {
  const [selectedDepartamento, setSelectedDepartamento] = useState<string>("");
  const [selectedCiudad, setSelectedCiudad] = useState<string>("");
  const [openDepartamento, setOpenDepartamento] = useState(false);
  const [openCiudad, setOpenCiudad] = useState(false);
  
  // Get cities for the selected departamento
  const ciudadesForDepartamento = colombiaLocations.find(
    loc => loc.departamento === selectedDepartamento
  )?.ciudades || [];

  return (
    <section className="bg-white/50 rounded-lg p-6 shadow-sm border border-green-100 my-8">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold text-green-700">Explora la comunidad</h2>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <label className="text-lg font-medium text-gray-700">Categoría de participación</label>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Button
                key={category.name}
                variant="outline"
                className="bg-white border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800 transition-all duration-300"
              >
                {category.emoji} {category.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-lg font-medium text-gray-700">Ubicación</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {/* Departamento Selection */}
            <Popover open={openDepartamento} onOpenChange={setOpenDepartamento}>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  role="combobox" 
                  aria-expanded={openDepartamento} 
                  className="w-full justify-between bg-white border-green-200 text-gray-700"
                >
                  {selectedDepartamento ? selectedDepartamento : "Selecciona departamento"}
                  <MapPin className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0 bg-white border-green-200 text-gray-700">
                <Command>
                  <CommandInput placeholder="Buscar departamento..." className="h-9 text-gray-700" />
                  <CommandList>
                    <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                    <CommandGroup>
                      {colombiaLocations.map((loc) => (
                        <CommandItem
                          key={loc.departamento}
                          value={loc.departamento}
                          onSelect={(currentValue) => {
                            setSelectedDepartamento(currentValue);
                            setSelectedCiudad("");
                            setOpenDepartamento(false);
                          }}
                        >
                          {loc.departamento}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {/* Ciudad Selection - Only enabled if departamento is selected */}
            <Popover open={openCiudad} onOpenChange={setOpenCiudad}>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  role="combobox" 
                  aria-expanded={openCiudad} 
                  disabled={!selectedDepartamento}
                  className="w-full justify-between bg-white border-green-200 text-gray-700"
                >
                  {selectedCiudad ? selectedCiudad : "Selecciona ciudad"}
                  <MapPin className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0 bg-white border-green-200 text-gray-700">
                <Command>
                  <CommandInput placeholder="Buscar ciudad..." className="h-9 text-gray-700" />
                  <CommandList>
                    <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                    <CommandGroup>
                      {ciudadesForDepartamento.map((ciudad) => (
                        <CommandItem
                          key={ciudad}
                          value={ciudad}
                          onSelect={(currentValue) => {
                            setSelectedCiudad(currentValue);
                            setOpenCiudad(false);
                          }}
                        >
                          {ciudad}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-lg font-medium text-gray-700">Nombre, persona o proyecto</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-green-600" />
              <Input 
                placeholder="🔍 Búsqueda rápida" 
                className="bg-white border-green-200 pl-10 text-gray-700 placeholder:text-gray-500 focus:border-green-400"
              />
            </div>
            <Button className="bg-green-600 text-white hover:bg-green-700">
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
