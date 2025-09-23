import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { MapPin } from "lucide-react";

// Colombian cities organized by region
const COLOMBIAN_CITIES = {
  "Región Andina": [
    "Bogotá", "Medellín", "Cali", "Bucaramanga", "Pereira", "Manizales", "Armenia", "Tunja", "Popayán", "Neiva", "Pasto", "Cúcuta", "Ibagué", "Villavicencio"
  ],
  "Región Caribe": [
    "Barranquilla", "Cartagena", "Santa Marta", "Valledupar", "Montería", "Sincelejo", "Riohacha", "San Andrés"
  ],
  "Región Pacífica": [
    "Quibdó", "Buenaventura", "Tumaco"
  ],
  "Región Orinoquía": [
    "Villavicencio", "Yopal", "Arauca", "Puerto Carreño"
  ],
  "Región Amazónica": [
    "Leticia", "Florencia", "Mocoa", "San José del Guaviare", "Inírida", "Mitú"
  ]
};

interface CitySelectorProps {
  field: any;
  placeholder?: string;
}

export const CitySelector = ({ field, placeholder = "Selecciona tu ciudad" }: CitySelectorProps) => {
  const [selectedRegion, setSelectedRegion] = useState<string>("");

  const handleCitySelect = (city: string) => {
    field.onChange(city);
  };

  return (
    <div className="space-y-4" data-testid="city-selector">
      <FormItem>
        <FormLabel className="flex items-center gap-2 text-white">
          <MapPin className="w-4 h-4" />
          Región
        </FormLabel>
        <FormControl>
          <Select onValueChange={setSelectedRegion}>
            <SelectTrigger className="bg-white/5 border-white/20 text-white" data-testid="select-region">
              <SelectValue placeholder="Primero selecciona una región" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(COLOMBIAN_CITIES).map((region) => (
                <SelectItem key={region} value={region} data-testid={`region-${region}`}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormControl>
      </FormItem>

      {selectedRegion && (
        <FormItem>
          <FormLabel className="flex items-center gap-2 text-white">
            <MapPin className="w-4 h-4" />
            Ciudad
          </FormLabel>
          <FormControl>
            <Select onValueChange={handleCitySelect} value={field.value}>
              <SelectTrigger className="bg-white/5 border-white/20 text-white" data-testid="select-city">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {COLOMBIAN_CITIES[selectedRegion as keyof typeof COLOMBIAN_CITIES].map((city) => (
                  <SelectItem key={city} value={city} data-testid={`city-${city}`}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    </div>
  );
};