
import React from 'react';
import { Button } from "@/components/ui/button";
import { colombiaLocations } from "@/data/colombiaLocations";
import { Filter, ArrowDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

interface MarketplaceFiltersProps {
  activeFilters: {
    tipo: string[];
    region: string[];
    impacto: string[];
  };
  onFilterChange: (category: string, value: string) => void;
  onClearFilters: () => void;
}

export const MarketplaceFilters: React.FC<MarketplaceFiltersProps> = ({ 
  activeFilters, 
  onFilterChange,
  onClearFilters 
}) => {
  const tipoOptions = [
    { id: 'artesania', label: 'Artesanía' },
    { id: 'alimentacion', label: 'Alimentación' },
    { id: 'cosmetica', label: 'Cosmética Natural' },
    { id: 'experiencias', label: 'Experiencias' }
  ];

  const impactoOptions = [
    { id: 'mujeres', label: 'Mujeres' },
    { id: 'indigenas', label: 'Comunidades indígenas' },
    { id: 'reforestacion', label: 'Reforestación' },
    { id: 'energia', label: 'Energía limpia' },
    { id: 'agua', label: 'Conservación de agua' },
    { id: 'residuos', label: 'Gestión de residuos' }
  ];

  const isFilterActive = (category: string, value: string) => {
    return activeFilters[category as keyof typeof activeFilters].includes(value);
  };

  const hasActiveFilters = Object.values(activeFilters).some(arr => arr.length > 0);

  return (
    <Card className="p-5 h-fit sticky top-24 border border-border shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5" style={{ color: '#181c0d' }} />
          <h2 className="text-xl font-semibold">Filtros</h2>
        </div>
        
        {hasActiveFilters && (
          <Button 
            variant="link" 
            className="text-sm p-0 h-auto"
            style={{ color: '#181c0d' }}
            onClick={onClearFilters}
          >
            Limpiar todos
          </Button>
        )}
      </div>

      <Separator className="my-4" />

      {/* Filtros por Tipo */}
      <div className="mb-6">
        <h3 className="font-medium mb-3" style={{ color: '#181c0d' }}>Por Tipo</h3>
        <div className="flex flex-wrap gap-2">
          {tipoOptions.map(option => (
            <Button
              key={option.id}
              variant={isFilterActive('tipo', option.id) ? "default" : "outline"}
              className={
                isFilterActive('tipo', option.id) 
                  ? "text-white border-none hover:opacity-90"
                  : "bg-transparent text-foreground hover:bg-gray-100/20"
              }
              style={{
                backgroundColor: isFilterActive('tipo', option.id) ? '#181c0d' : 'transparent',
                borderColor: isFilterActive('tipo', option.id) ? '#181c0d' : '#d1d5db'
              }}
              onClick={() => onFilterChange('tipo', option.id)}
              size="sm"
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Filtros por Región */}
      <div className="mb-6">
        <h3 className="font-medium mb-3" style={{ color: '#181c0d' }}>Por Región</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="regiones" className="border-b-border">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <ArrowDown className="h-4 w-4" />
                <span>Departamentos</span>
                {activeFilters.region.length > 0 && (
                  <span className="text-white text-xs rounded-full px-2 py-0.5 ml-2" style={{ backgroundColor: '#181c0d' }}>
                    {activeFilters.region.length}
                  </span>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ScrollArea className="h-48 pr-2">
                <div className="space-y-1">
                  {colombiaLocations.map(location => (
                    <Button
                      key={location.departamento}
                      variant="ghost"
                      className={`w-full justify-start mb-1 ${
                        isFilterActive('region', location.departamento)
                          ? "bg-gray-100 text-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-gray-100/30"
                      }`}
                      onClick={() => onFilterChange('region', location.departamento)}
                      size="sm"
                    >
                      {location.departamento}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Filtros por Impacto */}
      <div className="mb-3">
        <h3 className="font-medium mb-3" style={{ color: '#181c0d' }}>Por Impacto</h3>
        <div className="flex flex-wrap gap-2">
          {impactoOptions.map(option => (
            <Button
              key={option.id}
              variant={isFilterActive('impacto', option.id) ? "default" : "outline"}
              className={
                isFilterActive('impacto', option.id) 
                  ? "text-white border-none hover:opacity-90"
                  : "bg-transparent text-foreground hover:bg-gray-100/20"
              }
              style={{
                backgroundColor: isFilterActive('impacto', option.id) ? '#181c0d' : 'transparent',
                borderColor: isFilterActive('impacto', option.id) ? '#181c0d' : '#d1d5db'
              }}
              onClick={() => onFilterChange('impacto', option.id)}
              size="sm"
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
};
