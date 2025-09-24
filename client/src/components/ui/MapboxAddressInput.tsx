import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MapPin, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AddressSuggestion {
  place_name: string;
  text: string;
  center: [number, number]; // [longitude, latitude]
  relevance: number;
}

interface MapboxAddressInputProps {
  value: string;
  onChange: (address: string, coordinates?: { lat: number; lng: number }) => void;
  placeholder?: string;
  required?: boolean;
  label?: string;
  className?: string;
}

export function MapboxAddressInput({
  value,
  onChange,
  placeholder = "Ingresa tu dirección",
  required = false,
  label = "Dirección",
  className = ""
}: MapboxAddressInputProps) {
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [validationError, setValidationError] = useState<string>("");
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  const mapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchAddresses = async (query: string) => {
    if (!query.trim() || query.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);
    setValidationError("");

    try {
      // Focus on Colombian addresses with broader coverage
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?` +
        `access_token=${mapboxToken}&` +
        `country=co,ec,pe,ar,cl,ve,mx,es,us,ca,fr,br,uy,py,bo&` +
        `types=address,poi,locality,place&` +
        `limit=5&` +
        `language=es`
      );

      if (!response.ok) {
        throw new Error(`Error de geocodificación: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const addressSuggestions: AddressSuggestion[] = data.features.map((feature: any) => ({
          place_name: feature.place_name,
          text: feature.text,
          center: feature.center,
          relevance: feature.relevance
        }));
        
        setSuggestions(addressSuggestions);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
        setValidationError("No se encontraron direcciones. Intenta ser más específico.");
      }
    } catch (error) {
      console.error("Error searching addresses:", error);
      setSuggestions([]);
      setShowSuggestions(false);
      setValidationError("Error al buscar direcciones. Verifica tu conexión.");
      toast({
        title: "Error de geocodificación",
        description: "No se pudieron cargar las sugerencias de direcciones",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (inputValue: string) => {
    onChange(inputValue);
    setIsValidated(false);
    setCoordinates(null);
    setValidationError("");

    // Clear previous debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Debounce the search
    debounceRef.current = setTimeout(() => {
      searchAddresses(inputValue);
    }, 300);
  };

  const handleSuggestionSelect = (suggestion: AddressSuggestion) => {
    const coords = {
      lat: suggestion.center[1], // Mapbox returns [lng, lat]
      lng: suggestion.center[0]
    };
    
    setCoordinates(coords);
    setIsValidated(true);
    setShowSuggestions(false);
    setSuggestions([]);
    setValidationError("");
    
    onChange(suggestion.place_name, coords);
    
    toast({
      title: "Dirección validada",
      description: "La dirección ha sido geocodificada correctamente",
    });
  };

  const validateCurrentAddress = async () => {
    if (!value.trim()) {
      setValidationError("La dirección es requerida");
      return;
    }

    await searchAddresses(value);
  };

  return (
    <div className={`space-y-2 relative ${className}`}>
      {label && (
        <Label className="text-sm font-medium flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          {label} {required && "*"}
        </Label>
      )}
      
      <div className="relative">
        <Input
          ref={inputRef}
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={`pr-12 ${
            isValidated ? "border-green-500" : 
            validationError ? "border-red-500" : ""
          }`}
          data-testid="input-address"
        />
        
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
          {isLoading && <Loader2 className="h-4 w-4 animate-spin text-gray-400" />}
          {isValidated && <CheckCircle className="h-4 w-4 text-green-500" />}
          {validationError && <AlertCircle className="h-4 w-4 text-red-500" />}
        </div>
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSuggestionSelect(suggestion)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-600 last:border-b-0 flex items-start gap-3"
              data-testid={`suggestion-${index}`}
            >
              <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {suggestion.text}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 break-words">
                  {suggestion.place_name}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Validation button for manual validation */}
      {value && !isValidated && !isLoading && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={validateCurrentAddress}
          className="mt-2"
          data-testid="button-validate-address"
        >
          <MapPin className="h-4 w-4 mr-2" />
          Validar dirección
        </Button>
      )}

      {/* Error message */}
      {validationError && (
        <div className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2 mt-2">
          <AlertCircle className="h-4 w-4" />
          {validationError}
        </div>
      )}

      {/* Success message with coordinates */}
      {isValidated && coordinates && (
        <div className="text-sm text-green-600 dark:text-green-400 flex items-center gap-2 mt-2">
          <CheckCircle className="h-4 w-4" />
          Dirección validada - Lat: {coordinates.lat.toFixed(6)}, Lng: {coordinates.lng.toFixed(6)}
        </div>
      )}
    </div>
  );
}