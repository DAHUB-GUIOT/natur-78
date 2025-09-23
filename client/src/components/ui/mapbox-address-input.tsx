import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { MapPin, Search } from "lucide-react";

interface MapboxAddressInputProps {
  addressField: any;
  coordinatesField: any;
  placeholder?: string;
}

interface Coordinates {
  lat: number;
  lng: number;
}

// Mock Mapbox functionality for now - can be replaced with real Mapbox later
const CITY_COORDINATES: Record<string, Coordinates> = {
  "Bogotá": { lat: 4.6097, lng: -74.0817 },
  "Medellín": { lat: 6.2442, lng: -75.5812 },
  "Cali": { lat: 3.4516, lng: -76.5320 },
  "Barranquilla": { lat: 10.9685, lng: -74.7813 },
  "Cartagena": { lat: 10.3910, lng: -75.4794 },
  "Santa Marta": { lat: 11.2408, lng: -74.2099 },
  "Bucaramanga": { lat: 7.1253, lng: -73.1198 },
  "Pereira": { lat: 4.8133, lng: -75.6961 },
  "Manizales": { lat: 5.0689, lng: -75.5174 },
  "Villavicencio": { lat: 4.1420, lng: -73.6266 },
  "Cúcuta": { lat: 7.8939, lng: -72.5078 },
  "Ibagué": { lat: 4.4389, lng: -75.2322 },
  "Pasto": { lat: 1.2136, lng: -77.2811 },
  "Neiva": { lat: 2.9273, lng: -75.2819 },
  "Armenia": { lat: 4.5339, lng: -75.6811 },
  "Popayán": { lat: 2.4448, lng: -76.6147 },
  "Tunja": { lat: 5.5353, lng: -73.3678 },
  "Valledupar": { lat: 10.4731, lng: -73.2532 },
  "Montería": { lat: 8.7479, lng: -75.8814 },
  "Sincelejo": { lat: 9.3047, lng: -75.3978 },
  "Riohacha": { lat: 11.5444, lng: -72.9072 }
};

export const MapboxAddressInput = ({ 
  addressField, 
  coordinatesField, 
  placeholder = "Ingresa la dirección completa" 
}: MapboxAddressInputProps) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Simple address geocoding using city names
  const handleAddressChange = (value: string) => {
    addressField.onChange(value);
    
    if (value.length > 2) {
      // Find matching cities
      const matchingCities = Object.keys(CITY_COORDINATES).filter(city =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(matchingCities);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }

    // Try to extract city from address and set coordinates
    const foundCity = Object.keys(CITY_COORDINATES).find(city =>
      value.toLowerCase().includes(city.toLowerCase())
    );
    
    if (foundCity && CITY_COORDINATES[foundCity]) {
      coordinatesField.onChange(CITY_COORDINATES[foundCity]);
    }
  };

  const handleSuggestionSelect = (suggestion: string) => {
    const currentAddress = addressField.value || "";
    const newAddress = currentAddress.includes(suggestion) 
      ? currentAddress 
      : `${currentAddress}, ${suggestion}`;
    
    addressField.onChange(newAddress);
    coordinatesField.onChange(CITY_COORDINATES[suggestion]);
    setShowSuggestions(false);
  };

  // Hide suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <FormItem className="relative" data-testid="mapbox-address-input">
      <FormLabel className="flex items-center gap-2 text-white">
        <MapPin className="w-4 h-4" />
        Dirección Completa
      </FormLabel>
      <FormControl>
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
            <Input
              ref={inputRef}
              placeholder={placeholder}
              value={addressField.value || ""}
              onChange={(e) => handleAddressChange(e.target.value)}
              className="bg-white/5 border-white/20 text-white placeholder:text-white/60 pl-10"
              data-testid="input-address"
            />
          </div>
          
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-black/90 border border-white/20 rounded-md max-h-40 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestionSelect(suggestion)}
                  className="w-full text-left px-3 py-2 text-white hover:bg-white/10 transition-colors"
                  data-testid={`suggestion-${suggestion}`}
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-green-400" />
                    {suggestion}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </FormControl>
      <FormMessage />
      
      {coordinatesField.value && (
        <div className="text-xs text-white/60 mt-1">
          📍 Coordenadas: {coordinatesField.value.lat?.toFixed(4)}, {coordinatesField.value.lng?.toFixed(4)}
        </div>
      )}
    </FormItem>
  );
};