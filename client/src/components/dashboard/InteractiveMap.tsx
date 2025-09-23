import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { 
  MapPin, 
  Building, 
  Users, 
  Filter,
  Search,
  Globe,
  Zap,
  Leaf,
  X,
  MessageCircle,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ExternalLink
} from "lucide-react";
import { useLocation } from 'wouter';

// Interface for registered company from API
interface RegisteredCompany {
  id: number;
  companyName: string;
  firstName: string;
  lastName: string;
  email: string;
  companyDescription: string;
  companyCategory: string;
  companySubcategory: string;
  coordinates: { lat: number; lng: number } | null;
  address: string;
  city: string;
  country: string;
  website: string;
  phone: string;
  facebookUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  businessType: string;
  createdAt: string;
}

interface Experience {
  id: number;
  title: string;
  description: string;
  adultPricePvp: string;
  duration: string;
  type: string;
  status: string;
  isActive: boolean;
  userId: number;
  createdAt: string;
}

interface InteractiveMapProps {
  experiences?: Experience[];
  selectedCategory?: string;
  showMarkers?: boolean;
  onMarkerClick?: (experience: Experience) => void;
}

export const InteractiveMap = ({ experiences = [], selectedCategory, showMarkers = false, onMarkerClick }: InteractiveMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const isUnmounted = useRef(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<RegisteredCompany | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [, setLocation] = useLocation();

  // Fetch registered companies from API
  const { data: registeredCompanies = [], isLoading: isLoadingCompanies, error: companiesError } = useQuery({
    queryKey: ['/api/companies/map'],
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (TanStack Query v5 uses gcTime instead of cacheTime)
    retry: (failureCount, error: any) => {
      if (error?.message?.includes('aborted') || error?.message?.includes('timeout')) return false;
      return failureCount < 1;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    queryFn: async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);
        
        const response = await apiRequest('/api/companies/map', {
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        console.log(`📍 Raw API Response:`, response);
        return response;
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          console.log('Companies map request was aborted due to timeout');
          throw new Error('Companies load timeout');
        }
        console.error('Companies map request failed:', error);
        throw error;
      }
    }
  });

  // Debug log for companies data  
  console.log(`📍 InteractiveMap: Received ${registeredCompanies.length} companies from API`, registeredCompanies);
  if (companiesError) {
    console.error('📍 Companies API Error:', companiesError);
  }

  const filteredCompanies = (registeredCompanies as RegisteredCompany[]).filter((company: RegisteredCompany) => {
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'empresa' && company.companyCategory) ||
                         (selectedFilter === company.companyCategory?.toLowerCase());
    const matchesSearch = (company.companyName?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
                         (company.companyDescription?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
                         (company.companyCategory?.toLowerCase() || '').includes(searchQuery.toLowerCase());
    const hasValidCoordinates = company.coordinates && 
                               typeof company.coordinates.lat === 'number' && 
                               typeof company.coordinates.lng === 'number' &&
                               company.coordinates.lat !== 0 && 
                               company.coordinates.lng !== 0;
    
    console.log(`📍 Company Filter Check:`, {
      name: company.companyName,
      coordinates: company.coordinates,
      hasValidCoordinates,
      matchesFilter,
      matchesSearch
    });
    
    return matchesFilter && matchesSearch && hasValidCoordinates;
  });

  // Initialize map
  useEffect(() => {
    if (map.current || isUnmounted.current) return; // Initialize map only once
    
    // Set the Mapbox access token
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_PUBLIC_KEY || '';
    
    if (!mapboxgl.accessToken) {
      // Silently handle missing Mapbox token
      return;
    }
    
    if (!mapContainer.current) {
      return;
    }

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/mapbox/satellite-streets-v12', // More natural satellite view
        center: [-74.0721, 4.7110], // Bogotá, Colombia
        zoom: 6,
        pitch: 70, // More dramatic 3D angle
        bearing: -20, // Better rotation for natural view
        projection: 'globe' // Enable 3D globe
      });
    } catch (error) {
      // Silently handle map initialization errors
      return;
    }

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    // Add fullscreen control
    map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');
    
    // Add scale control
    map.current.addControl(new mapboxgl.ScaleControl(), 'bottom-left');
    
    // Add 3D terrain
    map.current.on('style.load', () => {
      // Add terrain source
      map.current!.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 14
      });
      
      // Add the terrain layer with more dramatic elevation
      map.current!.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 2.2 });
      
      // Add sky layer for realistic atmosphere
      map.current!.addLayer({
        'id': 'sky',
        'type': 'sky',
        'paint': {
          'sky-type': 'atmosphere',
          'sky-atmosphere-sun': [0.0, 90.0],
          'sky-atmosphere-sun-intensity': 15,
          'sky-atmosphere-color': 'rgb(135, 206, 235)'
        }
      });
      
      // Add natural atmospheric fog
      map.current!.setFog({
        'color': 'rgb(200, 230, 200)', // Natural green-tinted fog
        'high-color': 'rgb(120, 180, 120)', // Green atmosphere
        'horizon-blend': 0.05, // More gradual blend
        'space-color': 'rgb(20, 40, 20)', // Dark green space
        'star-intensity': 0.3 // Subtle stars
      });
    });

    return () => {
      isUnmounted.current = true;
      if (map.current) {
        try {
          // Use a more robust cleanup approach
          const mapInstance = map.current;
          map.current = null; // Clear reference first
          
          // Check if map container still exists and is attached
          const container = mapInstance.getContainer?.();
          if (container && container.parentNode && document.contains(container)) {
            // Only remove if the map is still properly loaded
            if (mapInstance._loaded !== false && typeof mapInstance.remove === 'function') {
              mapInstance.remove();
            }
          }
        } catch (error) {
          // Completely silent cleanup - any errors are handled gracefully
        }
      }
    };
  }, []);

  // Update markers when filtered companies or experiences change
  useEffect(() => {
    console.log(`📍 useEffect triggered: map=${!!map.current}, unmounted=${isUnmounted.current}, filteredCompanies=${filteredCompanies.length}`);
    
    if (!map.current || isUnmounted.current) {
      console.log('📍 useEffect early return: map not ready');
      return;
    }

    // Clear existing markers
    const existingMarkers = document.querySelectorAll('.mapbox-marker');
    existingMarkers.forEach(marker => marker.remove());

    if (showMarkers && experiences.length > 0) {
      // Add markers for experiences
      experiences.forEach((experience, index) => {
        const el = document.createElement('div');
        el.className = 'mapbox-marker experience-marker';
        
        // Create beautiful green experience marker
        const markerContainer = document.createElement('div');
        markerContainer.className = 'bg-gradient-to-br from-lime-400 to-emerald-600 rounded-full p-3 shadow-xl border-3 border-white cursor-pointer hover:scale-125 transition-all duration-300 hover:shadow-2xl';
        markerContainer.style.cssText = `
          width: 36px;
          height: 36px;
          box-shadow: 0 6px 24px rgba(34, 197, 94, 0.5);
          backdrop-filter: blur(6px);
        `;
        
        const iconContainer = document.createElement('div');
        iconContainer.className = 'w-full h-full text-white font-bold text-sm flex items-center justify-center';
        iconContainer.textContent = '🎯';
        
        markerContainer.appendChild(iconContainer);
        el.appendChild(markerContainer);
        
        el.addEventListener('click', () => {
          if (onMarkerClick) {
            onMarkerClick(experience);
          }
        });
        
        // Random positions around Colombia for demo
        const baseLatLng = [
          { lat: 4.7110, lng: -74.0721 }, // Bogotá
          { lat: 6.2442, lng: -75.5812 }, // Medellín
          { lat: 10.4236, lng: -75.5378 }, // Cartagena
          { lat: 3.4516, lng: -76.5320 }, // Cali
          { lat: 7.1193, lng: -73.1227 }, // Bucaramanga
        ];
        const position = baseLatLng[index % baseLatLng.length];
        
        new mapboxgl.Marker(el)
          .setLngLat([position.lng, position.lat])
          .addTo(map.current!);
      });
    }
    
    // Always add markers for registered companies from database
    console.log(`📍 Creating markers for ${filteredCompanies.length} filtered companies`);
    
    filteredCompanies.forEach((company: RegisteredCompany, index) => {
      // Skip companies without valid coordinates
      if (!company.coordinates || typeof company.coordinates.lat !== 'number' || typeof company.coordinates.lng !== 'number') {
        console.log(`📍 Skipping ${company.companyName} - invalid coordinates:`, company.coordinates);
        return;
      }
      
      console.log(`📍 Creating marker ${index + 1} for ${company.companyName} at [${company.coordinates.lng}, ${company.coordinates.lat}]`);
      
      const el = document.createElement('div');
      el.className = 'mapbox-marker registered-company';
      
      // Create beautiful company bubble
      const markerContainer = document.createElement('div');
      markerContainer.className = 'bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full p-2 shadow-xl border-2 border-white cursor-pointer hover:scale-110 transition-all duration-300 hover:shadow-2xl animate-pulse touch-manipulation';
      markerContainer.style.cssText = `
        width: 40px;
        height: 40px;
        box-shadow: 0 8px 32px rgba(6, 182, 212, 0.6);
        backdrop-filter: blur(10px);
        animation: pulse 3s infinite;
        z-index: 10;
      `;
      
      // Company icon in bubble
      const iconContainer = document.createElement('div');
      iconContainer.className = 'w-full h-full flex items-center justify-center text-white font-bold text-sm';
      const iconText = getCompanyIconText(company.companyCategory || 'empresa');
      iconContainer.textContent = iconText;
      
      console.log(`📍 Icon for ${company.companyName}: "${iconText}" (category: ${company.companyCategory})`);
      
      markerContainer.appendChild(iconContainer);
      el.appendChild(markerContainer);
      
      // Add click event for floating card
      el.addEventListener('click', () => {
        console.log(`📍 Marker clicked for ${company.companyName}`);
        setSelectedCompany(company);
      });

      // Create and add the marker
      const marker = new mapboxgl.Marker(el)
        .setLngLat([company.coordinates.lng, company.coordinates.lat])
        .addTo(map.current!);
      
      console.log(`📍 Marker added successfully for ${company.companyName}`);
    });
  }, [filteredCompanies, experiences, showMarkers, onMarkerClick]);

  const getMarkerIconText = (type: string) => {
    switch (type) {
      case 'startup':
        return '🚀';
      case 'investor':
        return '💎';
      case 'ecosystem':
        return '🌿';
      default:
        return '🌱';
    }
  };

  const getCompanyIconText = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'agencias u operadores turísticos':
        return '🏝️';
      case 'alojamientos sostenibles':
        return '🏡';
      case 'gastronomía sostenible':
        return '🍃';
      case 'movilidad y transporte ecológico':
        return '🚲';
      case 'ong y fundaciones':
        return '🌍';
      case 'educación y sensibilización ambiental':
        return '📚';
      case 'tecnología para el turismo sostenible':
        return '💻';
      case 'aliados y patrocinadores':
        return '🤝';
      default:
        return '🏢';
    }
  };

  const handleChatRedirect = (companyId: number) => {
    setLocation(`/portal-empresas/chat?company=${companyId}`);
  };

  return (
    <div className="h-screen w-full relative">
      {/* Full-screen Mapbox map */}
      <div 
        ref={mapContainer} 
        className="absolute inset-0 w-full h-full"
        style={{ background: '#f8f9fa' }}
      />

      {/* Compact Mobile Filters Panel */}
      <div className="absolute top-2 right-2 z-40">
        <Button
          onClick={() => setShowFilters(!showFilters)}
          className="mb-1 backdrop-blur-xl bg-black/30 border border-white/30 text-white hover:bg-white/20 rounded-lg px-3 py-2 shadow-2xl text-xs min-h-[36px] touch-manipulation"
        >
          <Filter className="h-3 w-3 mr-1" />
          <span className="font-semibold">Filtros</span>
        </Button>
        
        {showFilters && (
          <Card className="w-64 backdrop-blur-xl bg-black/30 border border-white/30 rounded-xl shadow-2xl">
            <CardHeader className="pb-2 p-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-sm font-bold">Buscar Empresas</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(false)}
                  className="text-white hover:bg-white/20 rounded-lg p-1 min-h-[32px] min-w-[32px] touch-manipulation"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 p-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 text-white/70" />
                <Input
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 h-8 backdrop-blur-xl bg-white/10 border-white/40 text-white placeholder:text-white/60 rounded-lg font-medium text-xs touch-manipulation"
                />
              </div>
              <div className="space-y-1">
                <label className="text-white font-semibold text-xs">Tipo</label>
                <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                  <SelectTrigger className="h-8 backdrop-blur-xl bg-white/10 border-white/40 text-white rounded-lg touch-manipulation text-xs">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-white/30">
                    <SelectItem value="all" className="text-white hover:bg-white/20 h-8 text-xs">Todas las empresas</SelectItem>
                    <SelectItem value="agencias u operadores turísticos" className="text-white hover:bg-white/20 h-8 text-xs">Operadores Turísticos</SelectItem>
                    <SelectItem value="alojamientos sostenibles" className="text-white hover:bg-white/20 h-8 text-xs">Alojamientos</SelectItem>
                    <SelectItem value="gastronomía sostenible" className="text-white hover:bg-white/20 h-8 text-xs">Gastronomía</SelectItem>
                    <SelectItem value="movilidad y transporte ecológico" className="text-white hover:bg-white/20 h-8 text-xs">Transporte</SelectItem>
                    <SelectItem value="ong y fundaciones" className="text-white hover:bg-white/20 h-8 text-xs">ONG</SelectItem>
                    <SelectItem value="educación y sensibilización ambiental" className="text-white hover:bg-white/20 h-8 text-xs">Educación</SelectItem>
                    <SelectItem value="tecnología para el turismo sostenible" className="text-white hover:bg-white/20 h-8 text-xs">Tecnología</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="pt-1 border-t border-white/20">
                <p className="text-white/90 text-xs font-medium">
                  {filteredCompanies.length} empresas
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Floating Company Card */}
      {selectedCompany && (
        <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 z-50 max-h-[60vh] overflow-y-auto">
          <Card className="backdrop-blur-xl bg-gradient-to-br from-white/95 to-white/85 border border-green-200/50 rounded-2xl shadow-2xl">
            <CardHeader className="pb-3 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="p-2 bg-gradient-to-br from-lime-400 to-emerald-600 rounded-xl shadow-lg flex-shrink-0">
                    <Building className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <CardTitle className="text-gray-900 text-lg font-bold truncate">
                        {selectedCompany.companyName}
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setLocation(`/portal-empresas/chat?company=${selectedCompany.id}`)}
                        className="text-green-600 hover:bg-green-50 rounded-lg p-1.5 min-h-[32px] min-w-[32px] touch-manipulation"
                        title="Enviar mensaje"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-gray-600 text-sm font-medium truncate">
                      {selectedCompany.companyCategory}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedCompany(null)}
                  className="text-gray-500 hover:bg-gray-100 rounded-lg p-1.5 min-h-[32px] min-w-[32px] touch-manipulation"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 p-4 pt-0">
              <p className="text-gray-700 text-sm leading-relaxed line-clamp-2">
                {selectedCompany.companyDescription || 'Empresa registrada en Festival NATUR'}
              </p>
              
              {/* Company Info Grid */}
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <div className="flex items-center space-x-2 text-gray-700 p-2 bg-gray-50 rounded-lg">
                  <MapPin className="h-4 w-4 flex-shrink-0 text-green-600" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{selectedCompany.city}, {selectedCompany.country}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-700 p-2 bg-gray-50 rounded-lg">
                  <Building className="h-4 w-4 flex-shrink-0 text-green-600" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{selectedCompany.businessType || 'Turismo'}</p>
                  </div>
                </div>
              </div>
              
              {/* Social Media and Website Links */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  {selectedCompany.website && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(`https://${selectedCompany.website}`, '_blank')}
                      className="text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg p-2 touch-manipulation"
                      title="Sitio web"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                  {selectedCompany.facebookUrl && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(selectedCompany.facebookUrl, '_blank')}
                      className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg p-2 touch-manipulation"
                      title="Facebook"
                    >
                      <Facebook className="h-4 w-4" />
                    </Button>
                  )}
                  {selectedCompany.twitterUrl && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(selectedCompany.twitterUrl, '_blank')}
                      className="text-gray-600 hover:text-blue-400 hover:bg-blue-50 rounded-lg p-2 touch-manipulation"
                      title="Twitter"
                    >
                      <Twitter className="h-4 w-4" />
                    </Button>
                  )}
                  {selectedCompany.instagramUrl && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(selectedCompany.instagramUrl, '_blank')}
                      className="text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-lg p-2 touch-manipulation"
                      title="Instagram"
                    >
                      <Instagram className="h-4 w-4" />
                    </Button>
                  )}
                  {selectedCompany.linkedinUrl && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(selectedCompany.linkedinUrl, '_blank')}
                      className="text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg p-2 touch-manipulation"
                      title="LinkedIn"
                    >
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <Badge className="bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold text-xs">
                  Registrada
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};