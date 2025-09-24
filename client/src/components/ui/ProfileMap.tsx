import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

interface ProfileMapProps {
  address: string;
  coordinates?: { lat: number; lng: number };
  companyName: string;
  className?: string;
}

export function ProfileMap({ address, coordinates, companyName, className = "" }: ProfileMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const mapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

  useEffect(() => {
    if (!mapContainer.current || !coordinates || !mapboxToken) return;

    // Initialize the map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [coordinates.lng, coordinates.lat],
      zoom: 15,
      accessToken: mapboxToken
    });

    // Add a marker for the company location
    const marker = new mapboxgl.Marker({
      color: '#CAD95E',
      scale: 1.2
    })
      .setLngLat([coordinates.lng, coordinates.lat])
      .addTo(map.current);

    // Add a popup with company information
    const popup = new mapboxgl.Popup({ offset: 25 })
      .setHTML(`
        <div class="p-2">
          <h4 class="font-semibold text-sm mb-1">${companyName}</h4>
          <p class="text-xs text-gray-600">${address}</p>
        </div>
      `);
    
    marker.setPopup(popup);

    // Navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Cleanup function
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [coordinates, address, companyName, mapboxToken]);

  // If no coordinates, show address text only
  if (!coordinates) {
    return (
      <Card className={`${className} bg-gray-800/50 border-gray-600/30`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center gap-2">
            <MapPin className="h-5 w-5 text-[#CAD95E]" />
            Ubicación
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-gray-300">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="text-sm">{address || 'Dirección no disponible'}</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Las coordenadas no están disponibles para mostrar el mapa
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${className} bg-gray-800/50 border-gray-600/30`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-white flex items-center gap-2">
          <MapPin className="h-5 w-5 text-[#CAD95E]" />
          Ubicación
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-3">
          {/* Address text */}
          <div className="px-6 flex items-center gap-2 text-gray-300">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="text-sm">{address}</span>
          </div>
          
          {/* Map container */}
          <div 
            ref={mapContainer}
            className="w-full h-64 rounded-b-lg"
            style={{ minHeight: '250px' }}
          />
          
          {/* Coordinates info */}
          <div className="px-6 pb-6">
            <p className="text-xs text-gray-500">
              Lat: {coordinates.lat.toFixed(6)}, Lng: {coordinates.lng.toFixed(6)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}