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

// Mock data para empresas
const companies = [
  {
    id: 1,
    name: "EcoTours Colombia",
    type: "startup",
    category: "Turismo Sostenible",
    location: { lat: 4.7110, lng: -74.0721, city: "Bogotá", country: "Colombia" },
    stage: "growth",
    employees: 25,
    description: "Turismo regenerativo en la Amazonía colombiana",
    website: "www.ecotours.co"
  },
  {
    id: 2,
    name: "Green Impact Fund",
    type: "investor",
    category: "Venture Capital",
    location: { lat: 6.2442, lng: -75.5812, city: "Medellín", country: "Colombia" },
    stage: "established",
    employees: 12,
    description: "Fondo de inversión en startups sostenibles",
    website: "www.greenimpact.vc"
  },
  {
    id: 3,
    name: "Sustainable Costa Rica",
    type: "startup",
    category: "Conservación",
    location: { lat: 9.7489, lng: -83.7534, city: "San José", country: "Costa Rica" },
    stage: "mvp",
    employees: 8,
    description: "Plataforma de conservación marina",
    website: "www.sustainablecr.com"
  },
  {
    id: 4,
    name: "Amazon Regenerative",
    type: "ecosystem",
    category: "ONG",
    location: { lat: -3.4653, lng: -62.2159, city: "Manaus", country: "Brasil" },
    stage: "established",
    employees: 45,
    description: "Regeneración de ecosistemas amazónicos",
    website: "www.amazonregen.org"
  },
  {
    id: 5,
    name: "Digital Nomad Hub",
    type: "ecosystem",
    category: "Coworking",
    location: { lat: -12.0464, lng: -77.0428, city: "Lima", country: "Perú" },
    stage: "growth",
    employees: 15,
    description: "Espacios de trabajo para nómadas digitales",
    website: "www.nomahub.pe"
  }
];

export const InteractiveMap = () => {
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
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-74.0721, 4.7110], // Bogotá, Colombia
      zoom: 4
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Update markers when filtered companies change
  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    const existingMarkers = document.querySelectorAll('.mapbox-marker');
    existingMarkers.forEach(marker => marker.remove());

    // Add markers for filtered companies
    filteredCompanies.forEach((company) => {
      const el = document.createElement('div');
      el.className = 'mapbox-marker';
      el.innerHTML = `
        <div class="bg-white rounded-full p-2 shadow-lg border-2 border-green-500 cursor-pointer hover:scale-110 transition-transform">
          ${getMarkerIcon(company.type)}
        </div>
      `;
      
      el.addEventListener('click', () => {
        setSelectedCompany(company);
      });

      new mapboxgl.Marker(el)
        .setLngLat([company.location.lng, company.location.lat])
        .addTo(map.current!);
    });
  }, [filteredCompanies]);

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case 'startup':
        return '<div class="w-4 h-4 text-blue-500">⚡</div>';
      case 'investor':
        return '<div class="w-4 h-4 text-green-500">🏢</div>';
      case 'ecosystem':
        return '<div class="w-4 h-4 text-emerald-500">🌱</div>';
      default:
        return '<div class="w-4 h-4 text-gray-500">🌐</div>';
    }
  };

  const getCompanyIcon = (type: string) => {
    switch (type) {
      case 'startup':
        return <Zap className="h-4 w-4 text-blue-500" />;
      case 'investor':
        return <Building className="h-4 w-4 text-green-500" />;
      case 'ecosystem':
        return <Leaf className="h-4 w-4 text-emerald-500" />;
      default:
        return <Globe className="h-4 w-4 text-gray-500" />;
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

      {/* Floating Filters Panel */}
      <div className="absolute top-4 right-4 z-40">
        <Button
          onClick={() => setShowFilters(!showFilters)}
          className="mb-2 backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filtros
        </Button>
        
        {showFilters && (
          <Card className="w-80 backdrop-blur-md bg-white/10 border border-white/20">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-sm">Filtros de Búsqueda</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(false)}
                  className="text-white hover:bg-white/20 p-1"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
                <Input
                  placeholder="Buscar empresas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 backdrop-blur-md bg-white/20 border-white/30 text-white placeholder:text-white/70"
                />
              </div>
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="backdrop-blur-md bg-white/20 border-white/30 text-white">
                  <SelectValue placeholder="Filtrar por tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="startup">Startups</SelectItem>
                  <SelectItem value="investor">Inversores</SelectItem>
                  <SelectItem value="ecosystem">Ecosistema</SelectItem>
                </SelectContent>
              </Select>
              <div className="text-white/80 text-sm">
                Mostrando {filteredCompanies.length} empresas
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Selected Company Info Panel */}
      {selectedCompany && (
        <div className="absolute bottom-4 left-4 right-4 z-40 md:left-80 md:right-4">
          <Card className="backdrop-blur-md bg-white/10 border border-white/20">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {getCompanyIcon(selectedCompany.type)}
                  <div>
                    <CardTitle className="text-white text-lg">{selectedCompany.name}</CardTitle>
                    <p className="text-white/80 text-sm">{selectedCompany.category}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getBadgeColor(selectedCompany.stage)}>
                    {selectedCompany.stage}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedCompany(null)}
                    className="text-white hover:bg-white/20 p-1"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-white/90 mb-4">{selectedCompany.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center text-white/80">
                  <MapPin className="h-4 w-4 mr-2" />
                  {selectedCompany.location.city}, {selectedCompany.location.country}
                </div>
                <div className="flex items-center text-white/80">
                  <Users className="h-4 w-4 mr-2" />
                  {selectedCompany.employees} empleados
                </div>
                <div className="flex items-center text-white/80">
                  <Globe className="h-4 w-4 mr-2" />
                  <a 
                    href={`https://${selectedCompany.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    {selectedCompany.website}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};