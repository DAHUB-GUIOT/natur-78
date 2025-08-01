import React, { useState } from 'react';
import { UnifiedHeader } from "@/components/layout/UnifiedHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { 
  CheckCircle, 
  XCircle, 
  Eye, 
  Users, 
  MapPin, 
  Calendar, 
  Settings,
  Search,
  Filter,
  TrendingUp,
  AlertCircle,
  Clock,
  Star,
  Building2,
  Mail,
  Phone
} from "lucide-react";

const AdminOptimized = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock pending experiences for approval
  const [pendingExperiences, setPendingExperiences] = useState([
    {
      id: '1',
      title: 'Caminata Ecológica Sierra Nevada',
      description: 'Experiencia única de senderismo en la Sierra Nevada de Santa Marta con guías especializados de la comunidad Arhuaca.',
      location: 'Sierra Nevada, Santa Marta, Magdalena',
      category: 'Ecoturismo',
      price: '180,000',
      dates: '2025-02-15 al 2025-02-17',
      submittedBy: 'EcoAventura Colombia',
      submittedDate: '2025-01-20',
      submittedEmail: 'contacto@ecoaventura.co',
      status: 'pendiente',
      urgency: 'high',
      duration: '3 días',
      maxParticipants: 12
    },
    {
      id: '2',
      title: 'Taller de Medicina Ancestral',
      description: 'Aprendizaje de plantas medicinales con sabedores indígenas de la comunidad Kamentsá en el Valle de Sibundoy.',
      location: 'Valle de Sibundoy, Putumayo',
      category: 'Cultura y Medicina Ancestral',
      price: '200,000',
      dates: '2025-03-10 al 2025-03-12',
      submittedBy: 'Amazonia Sostenible',
      submittedDate: '2025-01-22',
      submittedEmail: 'info@amazoniasostenible.org',
      status: 'pendiente',
      urgency: 'medium',
      duration: '3 días',
      maxParticipants: 15
    },
    {
      id: '3',
      title: 'Avistamiento de Ballenas Jorobadas',
      description: 'Observación de ballenas jorobadas en su migración anual por el Pacífico colombiano, con guías locales especializados.',
      location: 'Bahía Málaga, Valle del Cauca',
      category: 'Ecoturismo Marino',
      price: '150,000',
      dates: '2025-07-15 al 2025-07-17',
      submittedBy: 'Pacífico Sustentable',
      submittedDate: '2025-01-24',
      submittedEmail: 'ballenas@pacificosustentable.co',
      status: 'revision',
      urgency: 'low',
      duration: '3 días',
      maxParticipants: 20
    }
  ]);

  // Mock registered companies/initiatives
  const [registeredCompanies, setRegisteredCompanies] = useState([
    {
      id: '1',
      name: 'EcoAventura Colombia',
      type: 'Emprendimiento',
      location: 'Medellín, Antioquia',
      email: 'contacto@ecoaventura.co',
      phone: '+57 300 123 4567',
      website: 'www.ecoaventura.co',
      registrationDate: '2025-01-15',
      status: 'activa',
      experiencesCount: 3,
      rating: 4.8,
      totalBookings: 156
    },
    {
      id: '2',
      name: 'Verde Patagonia',
      type: 'Iniciativa',
      location: 'Bariloche, Argentina',
      email: 'info@verdepatagonia.com',
      phone: '+54 9 294 456 7890',
      website: 'www.verdepatagonia.com',
      registrationDate: '2025-01-18',
      status: 'activa',
      experiencesCount: 2,
      rating: 4.9,
      totalBookings: 89
    },
    {
      id: '3',
      name: 'Turismo Regenerativo Nariño',
      type: 'Emprendimiento',
      location: 'Pasto, Nariño',
      email: 'hola@turismonarino.co',
      phone: '+57 320 987 6543',
      website: 'www.turismonarino.co',
      registrationDate: '2025-01-24',
      status: 'pendiente',
      experiencesCount: 0,
      rating: 0,
      totalBookings: 0
    }
  ]);

  const handleApproveExperience = (id: string) => {
    setPendingExperiences(experiences => 
      experiences.filter(exp => exp.id !== id)
    );
    toast({
      title: "Experiencia aprobada",
      description: "La experiencia ha sido aprobada y publicada en el mapa"
    });
  };

  const handleRejectExperience = (id: string) => {
    setPendingExperiences(experiences => 
      experiences.filter(exp => exp.id !== id)
    );
    toast({
      title: "Experiencia rechazada",
      description: "La experiencia ha sido rechazada y se notificó al usuario",
      variant: "destructive"
    });
  };

  const handleApproveCompany = (id: string) => {
    setRegisteredCompanies(companies =>
      companies.map(company =>
        company.id === id ? { ...company, status: 'activa' } : company
      )
    );
    toast({
      title: "Empresa aprobada",
      description: "La empresa ha sido activada en la plataforma"
    });
  };

  const handleRejectCompany = (id: string) => {
    setRegisteredCompanies(companies =>
      companies.filter(company => company.id !== id)
    );
    toast({
      title: "Empresa rechazada",
      description: "La empresa ha sido rechazada y removida del sistema",
      variant: "destructive"
    });
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredExperiences = pendingExperiences.filter(exp => {
    const matchesSearch = exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exp.submittedBy.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const stats = {
    totalExperiences: 45,
    pendingApproval: pendingExperiences.length,
    activeCompanies: registeredCompanies.filter(c => c.status === 'activa').length,
    totalBookings: registeredCompanies.reduce((sum, c) => sum + c.totalBookings, 0)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <UnifiedHeader title="Administración NATUR" showSearch={true} />
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
              <p className="text-gray-600 mt-1">
                Gestiona contenido y usuarios de la plataforma Festival NATUR
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-blue-700">{stats.totalExperiences}</div>
                <div className="text-xs text-blue-600">Experiencias</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-yellow-700">{stats.pendingApproval}</div>
                <div className="text-xs text-yellow-600">Pendientes</div>
              </div>
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-green-700">{stats.activeCompanies}</div>
                <div className="text-xs text-green-600">Empresas</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-purple-700">{stats.totalBookings}</div>
                <div className="text-xs text-purple-600">Reservas</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Tabs defaultValue="experiences" className="space-y-6">
          <TabsList className="bg-white border border-gray-200 shadow-sm">
            <TabsTrigger 
              value="experiences" 
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              <AlertCircle className="h-4 w-4 mr-2" />
              Experiencias Pendientes ({pendingExperiences.length})
            </TabsTrigger>
            <TabsTrigger 
              value="companies"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              <Building2 className="h-4 w-4 mr-2" />
              Empresas Registradas ({registeredCompanies.length})
            </TabsTrigger>
            <TabsTrigger 
              value="analytics"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Analíticas
            </TabsTrigger>
          </TabsList>

          {/* Pending Experiences Tab */}
          <TabsContent value="experiences" className="space-y-6">
            {/* Search and Filters */}
            <Card className="shadow-sm border border-gray-200">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Buscar experiencias o empresas..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 border-gray-200 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <Button variant="outline" className="border-gray-200">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros avanzados
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6">
              {filteredExperiences.map((experience) => (
                <Card key={experience.id} className="shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex-1 space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-semibold text-gray-900">
                                {experience.title}
                              </h3>
                              <Badge className={`text-xs font-medium border ${getUrgencyColor(experience.urgency)}`}>
                                <Clock className="h-3 w-3 mr-1" />
                                {experience.urgency === 'high' ? 'Urgente' : 
                                 experience.urgency === 'medium' ? 'Medio' : 'Bajo'}
                              </Badge>
                              <Badge 
                                variant="outline" 
                                className="text-green-700 border-green-200 bg-green-50"
                              >
                                {experience.category}
                              </Badge>
                            </div>
                            
                            <p className="text-gray-600 mb-3">
                              {experience.description}
                            </p>
                            
                            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                                {experience.location}
                              </div>
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                                {experience.dates}
                              </div>
                              <div>
                                <strong>Empresa:</strong> {experience.submittedBy}
                              </div>
                              <div>
                                <strong>Enviado:</strong> {experience.submittedDate}
                              </div>
                              <div>
                                <strong>Duración:</strong> {experience.duration}
                              </div>
                              <div>
                                <strong>Precio:</strong> ${experience.price} COP
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="lg:w-80 space-y-4">
                        {/* Company Info */}
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">Información del proveedor</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center">
                              <Building2 className="h-4 w-4 mr-2 text-gray-400" />
                              <span className="text-gray-600">{experience.submittedBy}</span>
                            </div>
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 mr-2 text-gray-400" />
                              <span className="text-gray-600">{experience.submittedEmail}</span>
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2 text-gray-400" />
                              <span className="text-gray-600">Máx. {experience.maxParticipants} personas</span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2">
                          <Button
                            onClick={() => handleApproveExperience(experience.id)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Aprobar experiencia
                          </Button>
                          <Button
                            variant="outline"
                            className="border-blue-200 text-blue-700 hover:bg-blue-50"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Ver detalles completos
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleRejectExperience(experience.id)}
                            className="border-red-200 text-red-700 hover:bg-red-50"
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Rechazar
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
                      <CheckCircle className="h-16 w-16 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {searchQuery ? 'No se encontraron resultados' : 'No hay experiencias pendientes'}
                    </h3>
                    <p className="text-gray-600">
                      {searchQuery ? 'Intenta con otros términos de búsqueda' : 'Todas las experiencias han sido revisadas'}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Registered Companies Tab */}
          <TabsContent value="companies" className="space-y-6">
            <div className="grid gap-4">
              {registeredCompanies.map((company) => (
                <Card key={company.id} className="shadow-sm border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {company.name}
                          </h3>
                          <Badge 
                            variant={company.status === 'activa' ? 'default' : 'secondary'}
                            className={company.status === 'activa' 
                              ? "bg-green-100 text-green-800 border-green-200" 
                              : "bg-yellow-100 text-yellow-800 border-yellow-200"
                            }
                          >
                            {company.status === 'activa' ? 'Activa' : 'Pendiente'}
                          </Badge>
                          <Badge 
                            variant="outline" 
                            className="border-blue-200 text-blue-700 bg-blue-50"
                          >
                            {company.type}
                          </Badge>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                            {company.location}
                          </div>
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-2 text-gray-400" />
                            {company.email}
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2 text-gray-400" />
                            {company.phone}
                          </div>
                          <div>
                            <strong>Registro:</strong> {company.registrationDate}
                          </div>
                        </div>
                      </div>

                      <div className="lg:w-80 space-y-4">
                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                          <div className="text-center">
                            <div className="text-lg font-semibold text-gray-900">{company.experiencesCount}</div>
                            <div className="text-xs text-gray-600">Experiencias</div>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center">
                              <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                              <span className="text-lg font-semibold text-gray-900">
                                {company.rating > 0 ? company.rating : '-'}
                              </span>
                            </div>
                            <div className="text-xs text-gray-600">Rating</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold text-gray-900">{company.totalBookings}</div>
                            <div className="text-xs text-gray-600">Reservas</div>
                          </div>
                        </div>

                        {/* Actions */}
                        {company.status === 'pendiente' && (
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleApproveCompany(company.id)}
                              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Aprobar
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => handleRejectCompany(company.id)}
                              className="flex-1 border-red-200 text-red-700 hover:bg-red-50"
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Rechazar
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="shadow-sm border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                    Estadísticas Generales
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-700">45</div>
                      <div className="text-sm text-blue-600">Experiencias Activas</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-700">12</div>
                      <div className="text-sm text-green-600">Empresas Activas</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-purple-700">334</div>
                      <div className="text-sm text-purple-600">Total Reservas</div>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-yellow-700">4.8</div>
                      <div className="text-sm text-yellow-600">Rating Promedio</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-900">Acciones Administrativas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 justify-start"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Configurar notificaciones
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 justify-start"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Gestionar usuarios
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 justify-start"
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Exportar reportes
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminOptimized;