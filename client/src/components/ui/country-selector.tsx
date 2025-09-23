import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Globe } from "lucide-react";

// Updated country list focusing on Spanish-speaking countries and major tourism markets
const COUNTRIES = [
  "Colombia",
  "Argentina",
  "Brasil", 
  "Chile",
  "Perú",
  "Ecuador",
  "Venezuela",
  "Bolivia",
  "Paraguay",
  "Uruguay",
  "México",
  "Guatemala",
  "El Salvador",
  "Honduras",
  "Nicaragua",
  "Costa Rica",
  "Panamá",
  "España",
  "Estados Unidos",
  "Canadá",
  "Reino Unido",
  "Francia",
  "Alemania",
  "Italia",
  "Países Bajos",
  "Suiza",
  "Australia",
  "Nueva Zelanda",
  "Japón",
  "Corea del Sur"
];

interface CountrySelectorProps {
  field: any;
  placeholder?: string;
}

export const CountrySelector = ({ field, placeholder = "Selecciona el país" }: CountrySelectorProps) => {
  return (
    <FormItem data-testid="country-selector">
      <FormLabel className="flex items-center gap-2 text-white">
        <Globe className="w-4 h-4" />
        País
      </FormLabel>
      <FormControl>
        <Select onValueChange={field.onChange} value={field.value}>
          <SelectTrigger className="bg-white/5 border-white/20 text-white" data-testid="select-country">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {COUNTRIES.map((country) => (
              <SelectItem key={country} value={country} data-testid={`country-${country}`}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};