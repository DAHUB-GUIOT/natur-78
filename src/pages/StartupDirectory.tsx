import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Users, Rocket, LineChart, Lightbulb, TestTube, Filter, ArrowUpRight, Star, Award, DollarSign, TrendingUp } from "lucide-react";

// Demo data for startups
const startupsData = [{
  id: 1,
  name: "EcoTrip",
  description: "Plataforma de planificación de viajes sostenibles que conecta viajeros con experiencias ecológicas certificadas.",
  logo: "/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg",
  subcategory: "growth",
  location: "Medellín, Colombia",
  funding: "Serie A",
  interests: ["Turismo Sostenible", "Tecnología Verde", "Impacto Social"]
}, {
  id: 2,
  name: "GreenRide",
  description: "Solución de movilidad compartida con vehículos eléctricos para destinos turísticos.",
  logo: "/lovable-uploads/43a94f6a-0c7c-4302-8eb6-e178fa2bd9a1.png",
  subcategory: "mvp",
  location: "Bogotá, Colombia",
  funding: "Seed",
  interests: ["Movilidad Sostenible", "Transporte", "Smart Cities"]
}, {
  id: 3,
  name: "LocalHarvest",
  description: "Marketplace que conecta hoteles y restaurantes con productores locales para promover la gastronomía sostenible.",
  logo: "/lovable-uploads/82486c47-640c-497b-a6e3-7e218da4868a.png",
  subcategory: "established",
  location: "Cartagena, Colombia",
  funding: "Serie B",
  interests: ["Gastronomía", "Agricultura Sostenible", "Economía Local"]
}, {
  id: 4,
  name: "EcoLodgeConnect",
  description: "Plataforma que facilita la certificación y visibilidad de alojamientos ecológicos en Latinoamérica.",
  logo: "/lovable-uploads/850ef1ad-80eb-4c12-8ffc-c619372b301f.png",
  subcategory: "growth",
  location: "Ciudad de México, México",
  funding: "Serie A",
  interests: ["Hospitalidad", "Certificaciones", "Turismo Sostenible"]
}, {
  id: 5,
  name: "CarbonoZero",
  description: "Solución para calcular y compensar la huella de carbono de viajes turísticos.",
  logo: "/lovable-uploads/77c65fac-fd99-4467-8049-68be605c4770.png",
  subcategory: "idea",
  location: "San José, Costa Rica",
  funding: "Pre-seed",
  interests: ["Cambio Climático", "Compensación de Carbono", "Sostenibilidad"]
}, {
  id: 6,
  name: "WildGuide",
  description: "App que conecta turistas con guías locales especializados en avistamiento de fauna.",
  logo: "/lovable-uploads/b5b37f28-840d-4fcf-97c7-79446d8d7767.png",
  subcategory: "mvp",
  location: "Quito, Ecuador",
  funding: "Seed",
  interests: ["Ecoturismo", "Conservación", "Comunidades Indígenas"]
}];

// Statistics for the ecosystem
const ecosystemStats = [{
  label: "Total Startups",
  value: 124
}, {
  label: "Inversión Total",
  value: "$18.5M"
}, {
  label: "Empleos Creados",
  value: "1,450+"
}, {
  label: "Países Representados",
  value: 12
}];
const StartupDirectory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [selectedViewMode, setSelectedViewMode] = useState<string>('startup');

  // Filter startups based on search query and filters
  const filteredStartups = startupsData.filter(startup => {
    // Filter by search query
    const matchesSearch = startup.name.toLowerCase().includes(searchQuery.toLowerCase()) || startup.description.toLowerCase().includes(searchQuery.toLowerCase()) || startup.interests.some(interest => interest.toLowerCase().includes(searchQuery.toLowerCase()));

    // Filter by subcategory
    const matchesSubcategory = selectedSubcategory === 'all' || startup.subcategory === selectedSubcategory;

    // Filter by tab
    const matchesTab = selectedTab === 'all' || selectedTab === 'funding' && ['Serie A', 'Serie B'].includes(startup.funding) || selectedTab === 'new' && ['Pre-seed', 'Seed'].includes(startup.funding);
    return matchesSearch && matchesSubcategory && matchesTab;
  });

  // Get icon for subcategory
  const getSubcategoryIcon = (subcategory: string) => {
    switch (subcategory) {
      case 'idea':
        return <Lightbulb className="h-4 w-4 text-amber-500" />;
      case 'mvp':
        return <TestTube className="h-4 w-4 text-blue-500" />;
      case 'growth':
        return <LineChart className="h-4 w-4 text-green-500" />;
      case 'established':
        return <Rocket className="h-4 w-4 text-purple-500" />;
      default:
        return <Rocket className="h-4 w-4 text-gray-500" />;
    }
  };

  // Get badge for subcategory
  const getSubcategoryBadge = (subcategory: string) => {
    switch (subcategory) {
      case 'idea':
        return <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">Idea Validada</Badge>;
      case 'mvp':
        return <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">MVP</Badge>;
      case 'growth':
        return <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">Crecimiento</Badge>;
      case 'established':
        return <Badge variant="outline" className="bg-purple-50 text-purple-800 border-purple-200">Consolidada</Badge>;
      default:
        return <Badge variant="outline">Startup</Badge>;
    }
  };
  return <section className="min-h-[calc(100vh-64px)] w-full pb-12">
      <div className="w-full bg-gradient-to-r from-green-600 to-emerald-600 py-10">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white mb-2">Directorio de Startups</h1>
          <p className="text-green-50 max-w-2xl">
            Explora el ecosistema de startups sostenibles y regenerativas. Conecta con emprendedores, investiga oportunidades de inversión y descubre innovaciones en ecoturismo.
          </p>
          
          {/* Stats cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {ecosystemStats.map((stat, index) => <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-green-50 text-sm">{stat.label}</p>
                <p className="text-white font-bold text-2xl">{stat.value}</p>
              </div>)}
          </div>
        </div>
      </div>
      
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8 mt-8">
        {/* View mode tabs */}
        <div className="mb-6">
          <Tabs defaultValue="startup" value={selectedViewMode} onValueChange={setSelectedViewMode}>
            
          </Tabs>
        </div>
        
        {/* Search and filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Buscar startups por nombre, descripción o intereses..." className="pl-10" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            <Select value={selectedSubcategory} onValueChange={setSelectedSubcategory}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2 text-gray-500" />
                  <SelectValue placeholder="Etapa de startup" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las etapas</SelectItem>
                <SelectItem value="idea">Idea validada</SelectItem>
                <SelectItem value="mvp">MVP</SelectItem>
                <SelectItem value="growth">Crecimiento</SelectItem>
                <SelectItem value="established">Consolidada</SelectItem>
              </SelectContent>
            </Select>
            
            {selectedViewMode === "investor" && <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-[200px]">
                  <div className="flex items-center">
                    <LineChart className="h-4 w-4 mr-2 text-gray-500" />
                    <SelectValue placeholder="Sector de inversión" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los sectores</SelectItem>
                  <SelectItem value="tourism">Turismo Sostenible</SelectItem>
                  <SelectItem value="eco">Tecnología Ecológica</SelectItem>
                  <SelectItem value="agri">Agricultura Sostenible</SelectItem>
                  <SelectItem value="energy">Energía Renovable</SelectItem>
                </SelectContent>
              </Select>}
            
            {selectedViewMode === "mentor" && <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-[200px]">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-2 text-gray-500" />
                    <SelectValue placeholder="Área de expertise" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las áreas</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="finance">Finanzas</SelectItem>
                  <SelectItem value="tech">Tecnología</SelectItem>
                  <SelectItem value="operations">Operaciones</SelectItem>
                </SelectContent>
              </Select>}
          </div>
          
          <Button variant="outline" className="hidden md:flex">
            <Users className="mr-2 h-4 w-4" />
            Añadir mi startup
          </Button>
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="funding">Buscando inversión</TabsTrigger>
            <TabsTrigger value="new">Recién llegadas</TabsTrigger>
            <TabsTrigger value="recommended">Recomendadas</TabsTrigger>
            {selectedViewMode === "investor" && <TabsTrigger value="potential">Alto potencial</TabsTrigger>}
            {selectedViewMode === "mentor" && <TabsTrigger value="mentoring">Buscan mentoría</TabsTrigger>}
          </TabsList>
        </Tabs>
        
        {/* Results count */}
        <p className="text-gray-500 mb-6">Mostrando {filteredStartups.length} startups</p>
        
        {/* Startups grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStartups.map(startup => <Card key={startup.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-32 overflow-hidden relative">
                <img src={startup.logo} alt={startup.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3">
                  {getSubcategoryBadge(startup.subcategory)}
                </div>
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-bold">{startup.name}</CardTitle>
                  <div className="flex items-center text-xs text-gray-500">
                    {getSubcategoryIcon(startup.subcategory)}
                    <span className="ml-1">{startup.funding}</span>
                  </div>
                </div>
                <CardDescription className="text-sm text-gray-500">
                  {startup.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{startup.description}</p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {startup.interests.map((interest, index) => <Badge key={index} variant="secondary" className="text-xs bg-gray-100">
                      {interest}
                    </Badge>)}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button size="sm" variant="outline" className="text-xs ml-auto">
                  Ver perfil
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </Button>
              </CardFooter>
            </Card>)}
        </div>
        
        {filteredStartups.length === 0 && <div className="text-center py-16">
            <Rocket className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-1">No se encontraron startups</h3>
            <p className="text-gray-500">
              No hay startups que coincidan con tus criterios de búsqueda. Intenta con otros filtros.
            </p>
          </div>}
      </div>
    </section>;
};
export default StartupDirectory;