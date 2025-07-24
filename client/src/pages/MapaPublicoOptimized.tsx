import React, { useState } from 'react';
import { HeaderButtons } from "@/components/layout/HeaderButtons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  Filter,
  Phone,
  Mail,
  Globe,
  Heart,
  Leaf,
  Camera,
  Mountain
} from "lucide-react";

const MapaPublicoOptimized = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [selectedExperience, setSelectedExperience] = useState<any>(null);

  // Mock experiences data - more realistic and complete
  const experiences = [
    {
      id: '1',
      title: 'Caminata Ecológica Sierra Nevada',
      organization: 'EcoAventura Colombia',
      description: 'Experiencia única de senderismo en la Sierra Nevada de Santa Marta con guías especializados de la comunidad Arhuaca.',
      location: 'Sierra Nevada, Santa Marta, Magdalena',
      department: 'Magdalena',
      category: 'Ecoturismo',
      price: 180000,
      duration: '3 días, 2 noches',
      maxParticipants: 12,
      rating: 4.8,
      reviewCount: 24,
      coordinates: { lat: 11.0858, lng: -74.0358 },
      images: ['/placeholder-sierra.jpg'],
      tags: ['naturaleza', 'aventura', 'sostenible', 'indígena'],
      contact: {
        phone: '+57 300 123 4567',
        email: 'contacto@ecoaventura.co',
        website: 'www.ecoaventura.co'
      },
      dates: ['2025-02-15', '2025-03-01', '2025-03-15'],
      includes: ['Guía especializado', 'Alimentación', 'Hospedaje rural', 'Transporte interno'],
      requirements: 'Buen estado físico, calzado de montaña'
    },
    {
      id: '2',
      title: 'Taller de Cocina Ancestral Boyacense',
      organization: 'Mujeres Rurales de Boyacá',
      description: 'Sumérgete en la tradición culinaria de Boyacá. Aprende a preparar platos típicos con ingredientes orgánicos locales.',
      location: 'Villa de Leyva, Boyacá',
      department: 'Boyacá',
      category: 'Cultura y Gastronomía',
      price: 120000,
      duration: '1 día (8 horas)',
      maxParticipants: 15,
      rating: 4.9,
      reviewCount: 18,
      coordinates: { lat: 5.6339, lng: -73.5270 },
      images: ['/placeholder-cocina.jpg'],
      tags: ['gastronomía', 'tradición', 'local', 'orgánico'],
      contact: {
        phone: '+57 310 987 6543',
        email: 'cocina@mujeresloyaca.org',
        website: 'www.mujeresloyaca.org'
      },
      dates: ['2025-03-10', '2025-03-24', '2025-04-07'],
      includes: ['Ingredientes', 'Utensilios', 'Almuerzo tradicional', 'Recetas'],
      requirements: 'Ninguno especial'
    },
    {
      id: '3',
      title: 'Avistamiento de Aves Endémicas',
      organization: 'Fundación ProAves',
      description: 'Descubre la increíble diversidad de aves del Chocó biogeográfico. Expedición especializada para observar especies endémicas.',
      location: 'Reserva Natural Río Ñambí, Nariño',
      department: 'Nariño',
      category: 'Ecoturismo',
      price: 250000,
      duration: '3 días, 2 noches',
      maxParticipants: 8,
      rating: 4.7,
      reviewCount: 15,
      coordinates: { lat: 1.0469, lng: -78.8086 },
      images: ['/placeholder-aves.jpg'],
      tags: ['aves', 'biodiversidad', 'conservación', 'fotografía'],
      contact: {
        phone: '+57 320 456 7890',
        email: 'turismo@proaves.org',
        website: 'www.proaves.org'
      },
      dates: ['2025-04-05', '2025-04-19', '2025-05-03'],
      includes: ['Guía ornitólogo', 'Hospedaje', 'Alimentación', 'Lista de especies'],
      requirements: 'Binoculares (se pueden prestar), ropa de lluvia'
    },
    {
      id: '4',
      title: 'Inmersión Cultural Wayuu',
      organization: 'Comunidad Wayuu Uribia',
      description: 'Vive con la comunidad Wayuu, aprende sobre su cultura, tradiciones y artesanías en el desierto de La Guajira.',
      location: 'Uribia, La Guajira',
      department: 'La Guajira',
      category: 'Cultura y Tradición',
      price: 200000,
      duration: '4 días, 3 noches',
      maxParticipants: 10,
      rating: 4.9,
      reviewCount: 32,
      coordinates: { lat: 11.7289, lng: -72.2647 },
      images: ['/placeholder-wayuu.jpg'],
      tags: ['cultura', 'indígena', 'artesanías', 'desierto'],
      contact: {
        phone: '+57 315 234 5678',
        email: 'turismo@wayuuuribia.org',
        website: 'www.wayuuuribia.org'
      },
      dates: ['2025-02-20', '2025-03-10', '2025-03-25'],
      includes: ['Hospedaje tradicional', 'Alimentación típica', 'Actividades culturales', 'Guía comunitario'],
      requirements: 'Respeto por las tradiciones locales'
    }
  ];

  const filteredExperiences = experiences.filter(exp => {
    const matchesSearch = exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exp.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exp.organization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || exp.category === categoryFilter;
    const matchesLocation = locationFilter === 'all' || exp.department === locationFilter;
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const departments = [...new Set(experiences.map(exp => exp.department))];
  const categories = [...new Set(experiences.map(exp => exp.category))];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Ecoturismo': return <Leaf className="h-4 w-4" />;
      case 'Cultura y Gastronomía': return <Heart className="h-4 w-4" />;
      case 'Cultura y Tradición': return <Heart className="h-4 w-4" />;
      case 'Aventura': return <Mountain className="h-4 w-4" />;
      default: return <Camera className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderButtons showPortalButtons={false} />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Descubre Experiencias de Turismo Sostenible
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100">
              Conecta con la naturaleza y las comunidades locales de Colombia
            </p>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-2 max-w-2xl mx-auto">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
                  <Input
                    placeholder="Buscar experiencias, ubicaciones..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-0 bg-white/20 text-white placeholder:text-white/70 focus:bg-white/30 h-12"
                  />
                </div>
                <Button className="bg-green-700 hover:bg-green-800 text-white h-12 px-8">
                  Explorar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-center gap-2 text-gray-700">
              <Filter className="h-4 w-4" />
              <span className="font-medium">Filtros:</span>
            </div>
            <div className="flex flex-wrap gap-3 flex-1">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48 border-gray-200">
                  <SelectValue placeholder="Todas las categorías" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-48 border-gray-200">
                  <SelectValue placeholder="Todos los departamentos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los departamentos</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="text-sm text-gray-600">
              {filteredExperiences.length} experiencias encontradas
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Experiences List */}
          <div className="lg:col-span-2 space-y-6">
            {filteredExperiences.map((experience) => (
              <Card 
                key={experience.id} 
                className="shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer"
                onClick={() => setSelectedExperience(experience)}
              >
                <CardContent className="p-0">
                  <div className="md:flex">
                    {/* Image */}
                    <div className="md:w-80 h-48 md:h-auto bg-gradient-to-br from-green-400 to-green-600 relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white/90 text-gray-900 hover:bg-white">
                          {getCategoryIcon(experience.category)}
                          <span className="ml-1">{experience.category}</span>
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <div className="bg-white/90 rounded-lg px-3 py-1">
                          <div className="text-lg font-bold text-gray-900">
                            ${experience.price.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-600">COP por persona</div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {experience.title}
                          </h3>
                          <p className="text-sm text-green-600 font-medium mb-2">
                            {experience.organization}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {experience.location}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {experience.duration}
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              Máx. {experience.maxParticipants}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-sm font-medium text-gray-900">
                            {experience.rating}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({experience.reviewCount})
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {experience.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {experience.tags.slice(0, 4).map((tag, index) => (
                          <Badge 
                            key={index}
                            variant="outline" 
                            className="text-xs text-gray-600 border-gray-200 bg-gray-50"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {experience.tags.length > 4 && (
                          <Badge variant="outline" className="text-xs text-gray-600 border-gray-200 bg-gray-50">
                            +{experience.tags.length - 4} más
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          Próximas fechas: {experience.dates.slice(0, 2).join(', ')}
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-green-200 text-green-700 hover:bg-green-50"
                        >
                          Ver detalles
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredExperiences.length === 0 && (
              <Card className="shadow-sm border border-gray-200">
                <CardContent className="p-12 text-center">
                  <div className="text-gray-400 mb-4">
                    <Search className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No se encontraron experiencias
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Intenta cambiar los filtros de búsqueda o explorar otras opciones
                  </p>
                  <Button 
                    onClick={() => {
                      setSearchQuery('');
                      setCategoryFilter('all');
                      setLocationFilter('all');
                    }}
                    variant="outline"
                    className="border-green-200 text-green-700 hover:bg-green-50"
                  >
                    Limpiar filtros
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Experience Detail Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              {selectedExperience ? (
                <Card className="shadow-sm border border-gray-200">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg text-gray-900">
                      {selectedExperience.title}
                    </CardTitle>
                    <p className="text-sm text-green-600 font-medium">
                      {selectedExperience.organization}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Descripción</h4>
                      <p className="text-sm text-gray-600">
                        {selectedExperience.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Qué incluye</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {selectedExperience.includes.map((item: string, index: number) => (
                          <li key={index} className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Requisitos</h4>
                      <p className="text-sm text-gray-600">
                        {selectedExperience.requirements}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Fechas disponibles</h4>
                      <div className="space-y-2">
                        {selectedExperience.dates.map((date: string, index: number) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span className="text-sm text-gray-700">{date}</span>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                              Reservar
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <h4 className="font-medium text-gray-900 mb-3">Contacto</h4>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Phone className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="text-gray-600">{selectedExperience.contact.phone}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Mail className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="text-gray-600">{selectedExperience.contact.email}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Globe className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="text-gray-600">{selectedExperience.contact.website}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <div className="bg-green-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-700 mb-1">
                          ${selectedExperience.price.toLocaleString()} COP
                        </div>
                        <div className="text-sm text-green-600 mb-3">por persona</div>
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                          Contactar ahora
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="shadow-sm border border-gray-200">
                  <CardContent className="p-8 text-center">
                    <div className="text-gray-400 mb-4">
                      <MapPin className="h-12 w-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Selecciona una experiencia
                    </h3>
                    <p className="text-gray-600">
                      Haz clic en cualquier experiencia para ver más detalles
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapaPublicoOptimized;