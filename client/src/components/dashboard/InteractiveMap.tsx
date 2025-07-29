import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MapPin, 
  Building, 
  Users, 
  Filter,
  Search,
  Globe,
  Zap,
  Leaf,
  X
} from "lucide-react";

// Real companies data with updated Colombian locations
const companies = [
  {
    id: 21,
    name: "DaHub",
    type: "startup",
    category: "Tecnología",
    location: { lat: 6.2088, lng: -75.5906, city: "Medellín, Poblado", country: "Colombia" },
    stage: "growth",
    employees: 8,
    description: "Empresa de tecnología especializada en desarrollo de plataformas digitales para turismo sostenible. Creadores del ecosistema Festival NATUR.",
    website: "www.dahub.tech"
  },
  {
    id: 22,
    name: "TripCol",
    type: "ecosystem",
    category: "Operador Turístico",
    location: { lat: 11.2408, lng: -74.1990, city: "Santa Marta", country: "Colombia" },
    stage: "established",
    employees: 15,
    description: "Operador turístico especializado en experiencias auténticas de turismo sostenible en la Costa Caribe colombiana.",
    website: "www.tripcol.com"
  },
  {
    id: 24,
    name: "Festival NATUR",
    type: "ecosystem",
    category: "Organizador de Eventos",
    location: { lat: 4.6533, lng: -74.0836, city: "Bogotá, Chapinero - CEFE", country: "Colombia" },
    stage: "established",
    employees: 20,
    description: "Organizadores del Festival NATUR, el evento más importante de turismo sostenible en Colombia. Conectamos startups, empresas, viajeros y comunidades.",
    website: "www.festivalnatur.com"
  }
];

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
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredCompanies = companies.filter(company => {
    const matchesFilter = selectedFilter === 'all' || company.type === selectedFilter;
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         company.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Initialize map
  useEffect(() => {
    if (map.current) return; // Initialize map only once
    
    // Set the Mapbox access token
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_PUBLIC_KEY || '';
    
    if (!mapboxgl.accessToken) {
      console.warn('Mapbox access token not found. Please set VITE_MAPBOX_PUBLIC_KEY environment variable.');
      return;
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/satellite-streets-v12', // More natural satellite view
      center: [-74.0721, 4.7110], // Bogotá, Colombia
      zoom: 6,
      pitch: 70, // More dramatic 3D angle
      bearing: -20, // Better rotation for natural view
      projection: 'globe' // Enable 3D globe
    });

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
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Update markers when filtered companies or experiences change
  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    const existingMarkers = document.querySelectorAll('.mapbox-marker');
    existingMarkers.forEach(marker => marker.remove());

    if (showMarkers && experiences.length > 0) {
      // Add markers for experiences
      experiences.forEach((experience, index) => {
        const el = document.createElement('div');
        el.className = 'mapbox-marker';
        
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
    } else {
      // Add markers for filtered companies (original functionality)
      filteredCompanies.forEach((company) => {
        const el = document.createElement('div');
        el.className = 'mapbox-marker';
        
        // Create beautiful green marker
        const markerContainer = document.createElement('div');
        markerContainer.className = 'bg-gradient-to-br from-emerald-400 to-green-600 rounded-full p-3 shadow-xl border-3 border-white cursor-pointer hover:scale-125 transition-all duration-300 hover:shadow-2xl animate-pulse';
        markerContainer.style.cssText = `
          width: 40px;
          height: 40px;
          box-shadow: 0 8px 32px rgba(16, 185, 129, 0.4);
          backdrop-filter: blur(8px);
          animation: pulse 2s infinite;
        `;
        
        const iconContainer = document.createElement('div');
        iconContainer.className = 'w-full h-full flex items-center justify-center text-white font-bold text-sm';
        
        // Use beautiful green icons for companies
        const iconText = getMarkerIconText(company.type);
        iconContainer.textContent = iconText;
        
        markerContainer.appendChild(iconContainer);
        el.appendChild(markerContainer);
        
        el.addEventListener('click', () => {
          setSelectedCompany(company);
        });

        new mapboxgl.Marker(el)
          .setLngLat([company.location.lng, company.location.lat])
          .addTo(map.current!);
      });
    }
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

  const getCompanyIcon = (type: string) => {
    switch (type) {
      case 'startup':
        return <Zap className="h-4 w-4 text-emerald-400" />;
      case 'investor':
        return <Building className="h-4 w-4 text-green-500" />;
      case 'ecosystem':
        return <Leaf className="h-4 w-4 text-lime-500" />;
      default:
        return <Globe className="h-4 w-4 text-green-400" />;
    }
  };

  const getBadgeColor = (stage: string) => {
    switch (stage) {
      case 'idea':
        return 'bg-yellow-100 text-yellow-800';
      case 'mvp':
        return 'bg-blue-100 text-blue-800';
      case 'growth':
        return 'bg-green-100 text-green-800';
      case 'established':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="h-screen w-full relative">
      {/* Full-screen Mapbox map */}
      <div 
        ref={mapContainer} 
        className="absolute inset-0 w-full h-full"
        style={{ background: '#f8f9fa' }}
      />

      {/* Floating Filters Panel - optimized design */}
      <div className="absolute top-24 right-6 z-40">
        <Button
          onClick={() => setShowFilters(!showFilters)}
          className="mb-3 backdrop-blur-xl bg-black/20 border border-white/30 text-white hover:bg-white/20 rounded-xl px-6 py-3 shadow-2xl"
        >
          <Filter className="h-5 w-5 mr-2" />
          <span className="font-semibold">Filtros</span>
        </Button>
        
        {showFilters && (
          <Card className="w-80 backdrop-blur-xl bg-black/20 border border-white/30 rounded-2xl shadow-2xl">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-lg font-bold">Buscar Empresas</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(false)}
                  className="text-white hover:bg-white/20 rounded-lg p-2"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70" />
                <Input
                  placeholder="Buscar por nombre o descripción..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 backdrop-blur-xl bg-white/10 border-white/40 text-white placeholder:text-white/60 rounded-xl font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-white font-semibold text-sm">Tipo de Empresa</label>
                <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                  <SelectTrigger className="h-12 backdrop-blur-xl bg-white/10 border-white/40 text-white rounded-xl">
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-white/30">
                    <SelectItem value="all" className="text-white hover:bg-white/20">Todos los tipos</SelectItem>
                    <SelectItem value="startup" className="text-white hover:bg-white/20">Startups</SelectItem>
                    <SelectItem value="investor" className="text-white hover:bg-white/20">Inversores</SelectItem>
                    <SelectItem value="ecosystem" className="text-white hover:bg-white/20">Ecosistema</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="pt-2 border-t border-white/20">
                <p className="text-white/90 text-sm font-medium">
                  {filteredCompanies.length} empresas encontradas
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Selected Company Info Panel - optimized design */}
      {selectedCompany && (
        <div className="absolute bottom-6 left-80 right-6 z-40">
          <Card className="backdrop-blur-xl bg-black/20 border border-white/30 rounded-2xl shadow-2xl">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-green-400 to-green-600 rounded-xl shadow-lg">
                    {getCompanyIcon(selectedCompany.type)}
                  </div>
                  <div>
                    <CardTitle className="text-white text-xl font-bold">{selectedCompany.name}</CardTitle>
                    <p className="text-white/80 text-sm font-medium">{selectedCompany.category}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={`${getBadgeColor(selectedCompany.stage)} px-3 py-1 rounded-full font-semibold`}>
                    {selectedCompany.stage}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedCompany(null)}
                    className="text-white hover:bg-white/20 rounded-lg p-2"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-white/90 text-base leading-relaxed">{selectedCompany.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3 text-white/90">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Ubicación</p>
                    <p className="text-sm text-white/70">{selectedCompany.location.city}, {selectedCompany.location.country}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-white/90">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Equipo</p>
                    <p className="text-sm text-white/70">{selectedCompany.employees} empleados</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-white/90">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Sitio Web</p>
                    <a 
                      href={`https://${selectedCompany.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-green-300 hover:text-green-200 transition-colors underline"
                    >
                      {selectedCompany.website}
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3 pt-4 border-t border-white/20">
                <Button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl">
                  Contactar
                </Button>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-xl">
                  Ver Perfil
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};