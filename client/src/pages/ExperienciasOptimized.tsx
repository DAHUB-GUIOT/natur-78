import React, { useState } from 'react';
import { HeaderButtons } from "@/components/layout/HeaderButtons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Edit, Trash2, MapPin, Calendar, Users, Search, Filter, Eye, Clock, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ExperienciasOptimized = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    category: '',
    price: '',
    dates: '',
    duration: '',
    maxParticipants: '',
    tags: '',
    requirements: '',
    includes: '',
    images: []
  });

  // Mock user experiences with more detailed data
  const [experiences, setExperiences] = useState([
    {
      id: '1',
      title: 'Caminata Ecológica Sierra Nevada',
      description: 'Experiencia única de senderismo en la Sierra Nevada de Santa Marta con guías especializados de la comunidad Arhuaca. Aprende sobre biodiversidad, plantas medicinales y cosmovisión indígena.',
      location: 'Sierra Nevada, Santa Marta, Magdalena',
      category: 'Ecoturismo',
      price: '180000',
      dates: '2025-02-15 al 2025-02-17',
      duration: '3 días, 2 noches',
      maxParticipants: '12',
      tags: 'naturaleza, aventura, sostenible, indígena, plantas medicinales',
      status: 'activa',
      views: 45,
      bookings: 8,
      rating: 4.8,
      createdAt: '2025-01-20',
      requirements: 'Buen estado físico, calzado de montaña',
      includes: 'Guía especializado, alimentación, hospedaje rural, transporte interno'
    },
    {
      id: '2',
      title: 'Taller de Cocina Ancestral Boyacense',
      description: 'Sumérgete en la tradición culinaria de Boyacá. Aprende a preparar platos típicos con ingredientes orgánicos locales junto a cocineras tradicionales.',
      location: 'Villa de Leyva, Boyacá',
      category: 'Cultura y Gastronomía',
      price: '120000',
      dates: '2025-03-10',
      duration: '1 día (8 horas)',
      maxParticipants: '15',
      tags: 'gastronomía, tradición, local, orgánico, mujeres rurales',
      status: 'pendiente',
      views: 23,
      bookings: 0,
      rating: 0,
      createdAt: '2025-01-22',
      requirements: 'Ninguno especial',
      includes: 'Ingredientes, utensilios, almuerzo tradicional, recetas'
    },
    {
      id: '3',
      title: 'Avistamiento de Aves Endémicas',
      description: 'Descubre la increíble diversidad de aves del Chocó biogeográfico. Expedición especializada para observar especies endémicas y migratorias.',
      location: 'Reserva Natural Río Ñambí, Nariño',
      category: 'Ecoturismo',
      price: '250000',
      dates: '2025-04-05 al 2025-04-07',
      duration: '3 días, 2 noches',
      maxParticipants: '8',
      tags: 'aves, biodiversidad, conservación, investigación, fotografía',
      status: 'borrador',
      views: 0,
      bookings: 0,
      rating: 0,
      createdAt: '2025-01-24',
      requirements: 'Binoculares (se pueden prestar), ropa de lluvia',
      includes: 'Guía ornitólogo, hospedaje, alimentación, lista de especies'
    }
  ]);

  const filteredExperiences = experiences.filter(exp => {
    const matchesSearch = exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exp.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || exp.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSubmit = () => {
    if (!formData.title || !formData.description || !formData.location) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa título, descripción y ubicación",
        variant: "destructive"
      });
      return;
    }

    if (editingId) {
      setExperiences(experiences.map(exp => 
        exp.id === editingId 
          ? { 
              ...exp,
              ...formData,
              status: 'pendiente',
              views: exp.views,
              bookings: exp.bookings,
              rating: exp.rating,
              createdAt: exp.createdAt
            }
          : exp
      ));
      toast({
        title: "Experiencia actualizada",
        description: "Los cambios están pendientes de aprobación"
      });
    } else {
      const newExperience = {
        ...formData,
        id: Date.now().toString(),
        status: 'borrador',
        views: 0,
        bookings: 0,
        rating: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setExperiences([...experiences, newExperience]);
      toast({
        title: "Experiencia creada",
        description: "Tu experiencia se guardó como borrador"
      });
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '', description: '', location: '', category: '', price: '',
      dates: '', duration: '', maxParticipants: '', tags: '', 
      requirements: '', includes: '', images: []
    });
    setShowCreateForm(false);
    setEditingId(null);
  };

  const handleEdit = (experience: any) => {
    setFormData({
      title: experience.title,
      description: experience.description,
      location: experience.location,
      category: experience.category,
      price: experience.price,
      dates: experience.dates,
      duration: experience.duration,
      maxParticipants: experience.maxParticipants,
      tags: experience.tags,
      requirements: experience.requirements,
      includes: experience.includes,
      images: []
    });
    setEditingId(experience.id);
    setShowCreateForm(true);
  };

  const handleDelete = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
    toast({
      title: "Experiencia eliminada",
      description: "La experiencia ha sido eliminada exitosamente"
    });
  };

  const handlePublish = (id: string) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, status: 'pendiente' } : exp
    ));
    toast({
      title: "Experiencia enviada",
      description: "Tu experiencia está pendiente de aprobación"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'activa': return 'bg-green-100 text-green-800 border-green-200';
      case 'pendiente': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'borrador': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'activa': return <CheckCircle2 className="h-3 w-3" />;
      case 'pendiente': return <Clock className="h-3 w-3" />;
      case 'borrador': return <Edit className="h-3 w-3" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderButtons showPortalButtons={false} />
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Mis Experiencias</h1>
              <p className="text-gray-600 mt-1">
                Gestiona las experiencias de turismo sostenible que ofreces
              </p>
            </div>
            <Button
              onClick={() => setShowCreateForm(true)}
              className="bg-green-600 hover:bg-green-700 text-white shadow-sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nueva Experiencia
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar experiencias..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-200 focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48 border-gray-200">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="activa">Activas</SelectItem>
                <SelectItem value="pendiente">Pendientes</SelectItem>
                <SelectItem value="borrador">Borradores</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Create/Edit Form */}
        {showCreateForm && (
          <Card className="mb-8 shadow-sm border border-gray-200">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <CardTitle className="text-gray-900">
                {editingId ? 'Editar Experiencia' : 'Crear Nueva Experiencia'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      Título de la experiencia *
                    </label>
                    <Input
                      placeholder="Ej: Caminata Ecológica Sierra Nevada"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      Ubicación *
                    </label>
                    <Input
                      placeholder="Ciudad, Departamento, País"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">
                        Categoría
                      </label>
                      <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                        <SelectTrigger className="border-gray-200">
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Ecoturismo">Ecoturismo</SelectItem>
                          <SelectItem value="Cultura y Gastronomía">Cultura y Gastronomía</SelectItem>
                          <SelectItem value="Aventura">Aventura</SelectItem>
                          <SelectItem value="Bienestar">Bienestar</SelectItem>
                          <SelectItem value="Educativo">Educativo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">
                        Precio (COP)
                      </label>
                      <Input
                        placeholder="150000"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">
                        Duración
                      </label>
                      <Input
                        placeholder="3 días, 2 noches"
                        value={formData.duration}
                        onChange={(e) => setFormData({...formData, duration: e.target.value})}
                        className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">
                        Máx. participantes
                      </label>
                      <Input
                        placeholder="12"
                        value={formData.maxParticipants}
                        onChange={(e) => setFormData({...formData, maxParticipants: e.target.value})}
                        className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      Fechas disponibles
                    </label>
                    <Input
                      placeholder="2025-02-15 al 2025-02-17"
                      value={formData.dates}
                      onChange={(e) => setFormData({...formData, dates: e.target.value})}
                      className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      Descripción *
                    </label>
                    <Textarea
                      placeholder="Describe detalladamente la experiencia, qué incluye, qué aprenderán los participantes..."
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={4}
                      className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      Qué incluye
                    </label>
                    <Textarea
                      placeholder="Guía especializado, alimentación, hospedaje, transporte..."
                      value={formData.includes}
                      onChange={(e) => setFormData({...formData, includes: e.target.value})}
                      rows={3}
                      className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      Requisitos
                    </label>
                    <Textarea
                      placeholder="Buen estado físico, calzado de montaña..."
                      value={formData.requirements}
                      onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                      rows={2}
                      className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      Etiquetas
                    </label>
                    <Input
                      placeholder="naturaleza, aventura, sostenible (separadas por comas)"
                      value={formData.tags}
                      onChange={(e) => setFormData({...formData, tags: e.target.value})}
                      className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button 
                  onClick={handleSubmit} 
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {editingId ? 'Actualizar' : 'Crear'} Experiencia
                </Button>
                <Button 
                  variant="outline" 
                  onClick={resetForm}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Experiences Grid */}
        <div className="space-y-4">
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
                          <Badge className={`${getStatusColor(experience.status)} text-xs font-medium border`}>
                            {getStatusIcon(experience.status)}
                            <span className="ml-1">
                              {experience.status === 'activa' ? 'Activa' : 
                               experience.status === 'pendiente' ? 'Pendiente' : 'Borrador'}
                            </span>
                          </Badge>
                          {experience.category && (
                            <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
                              {experience.category}
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-gray-600 mb-3 line-clamp-2">
                          {experience.description}
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                            {experience.location}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                            {experience.dates}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-gray-400" />
                            {experience.duration}
                          </div>
                        </div>

                        {experience.tags && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {experience.tags.split(',').slice(0, 4).map((tag: string, index: number) => (
                              <Badge 
                                key={index}
                                variant="outline" 
                                className="text-xs text-gray-600 border-gray-200 bg-gray-50"
                              >
                                {tag.trim()}
                              </Badge>
                            ))}
                            {experience.tags.split(',').length > 4 && (
                              <Badge variant="outline" className="text-xs text-gray-600 border-gray-200 bg-gray-50">
                                +{experience.tags.split(',').length - 4} más
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-80 space-y-4">
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900">{experience.views}</div>
                        <div className="text-xs text-gray-600">Vistas</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900">{experience.bookings}</div>
                        <div className="text-xs text-gray-600">Reservas</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900">
                          {experience.rating > 0 ? experience.rating : '-'}
                        </div>
                        <div className="text-xs text-gray-600">Rating</div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-2xl font-bold text-green-700">
                        ${parseInt(experience.price).toLocaleString()} COP
                      </div>
                      <div className="text-sm text-green-600">por persona</div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(experience)}
                        className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                      {experience.status === 'borrador' && (
                        <Button
                          size="sm"
                          onClick={() => handlePublish(experience.id)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Publicar
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(experience.id)}
                        className="border-red-300 text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
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
                  <Plus className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchQuery || statusFilter !== 'all' 
                    ? 'No se encontraron experiencias' 
                    : 'No tienes experiencias registradas'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchQuery || statusFilter !== 'all'
                    ? 'Intenta cambiar los filtros de búsqueda'
                    : 'Comienza creando tu primera experiencia de turismo sostenible'}
                </p>
                {(!searchQuery && statusFilter === 'all') && (
                  <Button
                    onClick={() => setShowCreateForm(true)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Crear Primera Experiencia
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperienciasOptimized;