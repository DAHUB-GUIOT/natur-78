
import React, { useState, useEffect } from 'react';
import { Search, Calendar, MapPin } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { colombiaLocations } from "@/data/colombiaLocations";
import { DateRange } from "react-day-picker";

interface ExperienceSearchProps {
  onSearch: (params: any) => void;
}

export const ExperienceSearch: React.FC<ExperienceSearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [department, setDepartment] = useState('');
  const [city, setCity] = useState('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [availableCities, setAvailableCities] = useState<string[]>([]);

  useEffect(() => {
    // Actualizar ciudades disponibles cuando cambia el departamento
    if (department) {
      const selectedDept = colombiaLocations.find(loc => loc.departamento === department);
      setAvailableCities(selectedDept ? selectedDept.ciudades : []);
      setCity(''); // Reset city when department changes
    } else {
      setAvailableCities([]);
      setCity('');
    }
  }, [department]);

  const handleSearch = () => {
    onSearch({
      searchQuery,
      category,
      department,
      city,
      dateRange: dateRange || {}
    });
  };

  const handleReset = () => {
    setSearchQuery('');
    setCategory('');
    setDepartment('');
    setCity('');
    setDateRange(undefined);
    onSearch({
      searchQuery: '',
      category: '',
      department: '',
      city: '',
      dateRange: {}
    });
  };

  return (
    <div className="bg-white rounded-lg p-4 md:p-5 border border-gray-200 shadow-sm">
      <div className="grid grid-cols-1 gap-4">
        {/* Buscador de texto */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar experiencias..." 
            className="pl-10 bg-white border-gray-300 text-gray-800 placeholder:text-gray-400 h-12"
          />
        </div>

        {/* Categoría */}
        <div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="bg-white border-gray-300 text-gray-800 h-12">
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200 text-gray-800">
              <SelectItem value="Bienestar">Bienestar</SelectItem>
              <SelectItem value="Cultura">Cultura</SelectItem>
              <SelectItem value="Naturaleza">Naturaleza</SelectItem>
              <SelectItem value="Gastronomía">Gastronomía</SelectItem>
              <SelectItem value="Voluntariado">Voluntariado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Departamento */}
        <div>
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="bg-white border-gray-300 text-gray-800 h-12">
              <SelectValue placeholder="Departamento" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200 text-gray-800 max-h-[300px]">
              {colombiaLocations.map((location) => (
                <SelectItem key={location.departamento} value={location.departamento}>
                  {location.departamento}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Ciudad */}
        <div>
          <Select value={city} onValueChange={setCity} disabled={!department}>
            <SelectTrigger className="bg-white border-gray-300 text-gray-800 h-12">
              <SelectValue placeholder="Ciudad" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200 text-gray-800 max-h-[300px]">
              {availableCities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Fecha */}
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-start h-12 bg-white border-gray-300 text-gray-800 hover:bg-gray-50"
              >
                <Calendar className="mr-2 h-4 w-4 text-green-600" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "d MMM", { locale: es })} - {format(dateRange.to, "d MMM, yyyy", { locale: es })}
                    </>
                  ) : (
                    format(dateRange.from, "d MMMM, yyyy", { locale: es })
                  )
                ) : (
                  <span className="text-gray-500">Seleccionar fechas</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-screen md:w-auto p-0 bg-white border-gray-200">
              <CalendarComponent
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={1}
                className="w-full"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Botones */}
        <div className="flex flex-col md:flex-row gap-2">
          <Button 
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            onClick={handleSearch}
          >
            <Search className="mr-2 h-4 w-4" /> Buscar
          </Button>
          
          <Button 
            variant="outline"
            className="border-amber-500 text-amber-600 hover:bg-amber-50"
            onClick={handleReset}
          >
            Limpiar filtros
          </Button>
        </div>
      </div>
    </div>
  );
};
