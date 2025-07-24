import React, { useState } from 'react';
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
  Leaf
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
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<any>(null);

  const filteredCompanies = companies.filter(company => {
    const matchesFilter = selectedFilter === 'all' || company.type === selectedFilter;
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         company.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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
    <div className="p-6 h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Mapa Interactivo de Empresas
        </h1>
        <p className="text-gray-600">
          Explora el ecosistema de empresas sostenibles en Latinoamérica
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar empresas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedFilter} onValueChange={setSelectedFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filtrar por tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los tipos</SelectItem>
            <SelectItem value="startup">Startups</SelectItem>
            <SelectItem value="investor">Inversores</SelectItem>
            <SelectItem value="ecosystem">Ecosistema</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-250px)]">
        {/* Map area (placeholder) */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Mapa de Ubicaciones
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full">
              <div className="w-full h-full bg-gradient-to-br from-green-50 to-blue-50 rounded-lg flex items-center justify-center relative overflow-hidden">
                {/* Placeholder map with company markers */}
                <div className="absolute inset-0 opacity-20">
                  <svg viewBox="0 0 800 600" className="w-full h-full">
                    {/* Simple South America outline */}
                    <path
                      d="M300 100 L500 120 L520 200 L480 350 L450 420 L400 480 L350 500 L280 480 L250 400 L220 300 L240 200 Z"
                      fill="currentColor"
                      className="text-green-200"
                    />
                  </svg>
                </div>
                
                {/* Company markers */}
                {filteredCompanies.map((company, index) => (
                  <div
                    key={company.id}
                    className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
                    style={{
                      left: `${30 + (index * 15)}%`,
                      top: `${40 + (index * 8)}%`
                    }}
                    onClick={() => setSelectedCompany(company)}
                  >
                    <div className="bg-white rounded-full p-2 shadow-lg border-2 border-green-500">
                      {getCompanyIcon(company.type)}
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                      {company.name}
                    </div>
                  </div>
                ))}
                
                <div className="text-center text-gray-500">
                  <Globe className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Mapa Interactivo</p>
                  <p className="text-sm">Haz clic en los marcadores para ver detalles</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Company list */}
        <div className="space-y-4 overflow-y-auto">
          <h3 className="font-semibold text-lg flex items-center">
            <Building className="h-5 w-5 mr-2" />
            Empresas ({filteredCompanies.length})
          </h3>
          
          {filteredCompanies.map((company) => (
            <Card 
              key={company.id} 
              className={`cursor-pointer hover:shadow-md transition-shadow ${
                selectedCompany?.id === company.id ? 'ring-2 ring-green-500' : ''
              }`}
              onClick={() => setSelectedCompany(company)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    {getCompanyIcon(company.type)}
                    <CardTitle className="text-sm">{company.name}</CardTitle>
                  </div>
                  <Badge className={getBadgeColor(company.stage)}>
                    {company.stage}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-600 mb-2">{company.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {company.location.city}, {company.location.country}
                  </span>
                  <span className="flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    {company.employees}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};