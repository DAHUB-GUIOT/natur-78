import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle, XCircle, Eye, Users, MapPin, Calendar, Settings } from "lucide-react";

// MVP Admin Panel based on user flow diagrams
const AdminSimple = () => {
  const { toast } = useToast();

  // Mock pending experiences for approval - in real app, would fetch from API
  const [pendingExperiences, setPendingExperiences] = useState([
    {
      id: '1',
      title: 'Caminata Ecológica Guiada',
      description: 'Experiencia de senderismo en reserva natural con guía especializado',
      location: 'Sierra Nevada, Colombia',
      category: 'Ecoturismo',
      price: '$150,000',
      dates: '2025-02-15 al 2025-02-17',
      submittedBy: 'EcoAventura Colombia',
      submittedDate: '2025-01-20',
      status: 'pendiente'
    },
    {
      id: '2',
      title: 'Taller de Medicina Ancestral',
      description: 'Aprendizaje de plantas medicinales con sabedores indígenas',
      location: 'Amazonas, Colombia',
      category: 'Cultura',
      price: '$200,000',
      dates: '2025-03-10 al 2025-03-12',
      submittedBy: 'Amazonia Sostenible',
      submittedDate: '2025-01-22',
      status: 'pendiente'
    }
  ]);

  // Mock registered companies/initiatives
  const [registeredCompanies, setRegisteredCompanies] = useState([
    {
      id: '1',
      name: 'EcoAventura Colombia',
      type: 'Emprendimiento',
      location: 'Medellín, Colombia',
      email: 'contacto@ecoaventura.co',
      phone: '+57 300 123 4567',
      registrationDate: '2025-01-15',
      status: 'activa',
      experiencesCount: 3
    },
    {
      id: '2',
      name: 'Verde Patagonia',
      type: 'Iniciativa',
      location: 'Bariloche, Argentina',
      email: 'info@verdepatagonia.com',
      phone: '+54 9 294 456 7890',
      registrationDate: '2025-01-18',
      status: 'activa',
      experiencesCount: 2
    },
    {
      id: '3',
      name: 'Turismo Regenerativo Nariño',
      type: 'Emprendimiento',
      location: 'Pasto, Colombia',
      email: 'hola@turismonarino.co',
      phone: '+57 320 987 6543',
      registrationDate: '2025-01-24',
      status: 'pendiente',
      experiencesCount: 0
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black">Panel de Administración</h1>
        <p className="text-black/70 mt-2 font-medium">
          Gestiona contenido y usuarios de la plataforma Festival NATUR
        </p>
      </div>

      <Tabs defaultValue="experiences" className="space-y-6">
        <TabsList className="bg-white border-2 border-green-500">
          <TabsTrigger 
            value="experiences" 
            className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-black font-bold"
          >
            <Eye className="h-4 w-4 mr-2" />
            Experiencias Pendientes ({pendingExperiences.length})
          </TabsTrigger>
          <TabsTrigger 
            value="companies"
            className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-black font-bold"
          >
            <Users className="h-4 w-4 mr-2" />
            Empresas Registradas ({registeredCompanies.length})
          </TabsTrigger>
          <TabsTrigger 
            value="settings"
            className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-black font-bold"
          >
            <Settings className="h-4 w-4 mr-2" />
            Configuración
          </TabsTrigger>
        </TabsList>

        {/* Pending Experiences Tab */}
        <TabsContent value="experiences" className="space-y-4">
          <div className="grid gap-4">
            {pendingExperiences.map((experience) => (
              <Card key={experience.id} className="bg-white border-2 border-green-500 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold text-black">
                          {experience.title}
                        </h3>
                        <Badge 
                          variant="secondary"
                          className="bg-gray-500 text-white border-gray-500"
                        >
                          Pendiente
                        </Badge>
                      </div>
                      
                      <p className="text-black/80 font-medium">{experience.description}</p>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-black/70 font-medium">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {experience.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          {experience.dates}
                        </div>
                        <div>
                          <strong>Empresa:</strong> {experience.submittedBy}
                        </div>
                        <div>
                          <strong>Enviado:</strong> {experience.submittedDate}
                        </div>
                        <div>
                          <strong>Categoría:</strong> {experience.category}
                        </div>
                        <div>
                          <strong>Precio:</strong> {experience.price}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <Button
                        onClick={() => handleApproveExperience(experience.id)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Aprobar
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleRejectExperience(experience.id)}
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Rechazar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {pendingExperiences.length === 0 && (
              <Card className="bg-[#FCF8EE]/5 border-[#FCF8EE]/20">
                <CardContent className="p-12 text-center">
                  <div className="text-[#FCF8EE]/50 mb-4">
                    <CheckCircle className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-[#FCF8EE] mb-2">
                    No hay experiencias pendientes
                  </h3>
                  <p className="text-[#FCF8EE]/70">
                    Todas las experiencias han sido revisadas
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Registered Companies Tab */}
        <TabsContent value="companies" className="space-y-4">
          <div className="grid gap-4">
            {registeredCompanies.map((company) => (
              <Card key={company.id} className="bg-[#FCF8EE]/5 border-[#FCF8EE]/20">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-semibold text-[#FCF8EE]">
                          {company.name}
                        </h3>
                        <Badge 
                          variant={company.status === 'activa' ? 'default' : 'secondary'}
                          className={company.status === 'activa' 
                            ? "bg-green-500/20 text-green-400 border-green-500/30" 
                            : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                          }
                        >
                          {company.status === 'activa' ? 'Activa' : 'Pendiente'}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className="border-[#EDFF60]/30 text-[#EDFF60]"
                        >
                          {company.type}
                        </Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-[#FCF8EE]/70">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {company.location}
                        </div>
                        <div>
                          <strong>Email:</strong> {company.email}
                        </div>
                        <div>
                          <strong>Teléfono:</strong> {company.phone}
                        </div>
                        <div>
                          <strong>Registro:</strong> {company.registrationDate}
                        </div>
                        <div>
                          <strong>Experiencias:</strong> {company.experiencesCount}
                        </div>
                      </div>
                    </div>

                    {company.status === 'pendiente' && (
                      <div className="flex gap-2 ml-4">
                        <Button
                          onClick={() => handleApproveCompany(company.id)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Aprobar
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleRejectCompany(company.id)}
                          className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Rechazar
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card className="bg-[#FCF8EE]/5 border-[#FCF8EE]/20">
            <CardHeader>
              <CardTitle className="text-[#FCF8EE]">Configuración del Sistema</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-[#FCF8EE] mb-2">Estadísticas</h4>
                  <div className="space-y-2 text-sm text-[#FCF8EE]/70">
                    <div>Total Empresas Activas: {registeredCompanies.filter(c => c.status === 'activa').length}</div>
                    <div>Empresas Pendientes: {registeredCompanies.filter(c => c.status === 'pendiente').length}</div>
                    <div>Experiencias Pendientes: {pendingExperiences.length}</div>
                    <div>Total Experiencias Publicadas: 8</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-[#FCF8EE] mb-2">Acciones Rápidas</h4>
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full border-[#FCF8EE]/30 text-[#FCF8EE] hover:bg-[#FCF8EE]/10"
                    >
                      Exportar Datos
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full border-[#FCF8EE]/30 text-[#FCF8EE] hover:bg-[#FCF8EE]/10"
                    >
                      Configurar Notificaciones
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSimple;