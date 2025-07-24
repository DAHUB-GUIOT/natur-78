import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Edit, Trash2, MapPin, Calendar, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

// MVP Experience Management for Entrepreneurs/Initiatives
const Experiencias = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    category: '',
    price: '',
    dates: '',
    tags: ''
  });

  // Mock user experiences - in real app, would fetch from API
  const [experiences, setExperiences] = useState([{
    id: '1',
    title: 'Caminata Ecológica Guiada',
    description: 'Experiencia de senderismo en reserva natural con guía especializado',
    location: 'Sierra Nevada, Colombia',
    category: 'Ecoturismo',
    price: '$150,000',
    dates: '2025-02-15 al 2025-02-17',
    tags: 'naturaleza, aventura, sostenible',
    status: 'activa'
  }, {
    id: '2',
    title: 'Taller de Cocina Ancestral',
    description: 'Aprende técnicas culinarias tradicionales con ingredientes locales',
    location: 'Boyacá, Colombia',
    category: 'Cultura',
    price: '$80,000',
    dates: '2025-03-10',
    tags: 'gastronomía, tradición, local',
    status: 'pendiente'
  }]);

  const handleSubmit = () => {
    if (!formData.title || !formData.description) {
      toast({
        title: "Error",
        description: "Por favor completa al menos el título y descripción",
        variant: "destructive"
      });
      return;
    }

    if (editingId) {
      setExperiences(experiences.map(exp => 
        exp.id === editingId 
          ? { ...formData, id: editingId, status: 'pendiente' }
          : exp
      ));
      toast({
        title: "Experiencia actualizada",
        description: "Los cambios han sido guardados y están pendientes de aprobación"
      });
    } else {
      const newExperience = {
        ...formData,
        id: Date.now().toString(),
        status: 'pendiente'
      };
      setExperiences([...experiences, newExperience]);
      toast({
        title: "Experiencia creada",
        description: "Tu experiencia ha sido enviada para revisión"
      });
    }

    setFormData({
      title: '', description: '', location: '', category: '', 
      price: '', dates: '', tags: ''
    });
    setShowCreateForm(false);
    setEditingId(null);
  };

  const handleEdit = (experience: any) => {
    setFormData(experience);
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#FCF8EE]">Mis Experiencias</h1>
          <p className="text-[#FCF8EE]/70 mt-2">
            Gestiona las experiencias de turismo sostenible que ofreces
          </p>
        </div>
        <Button
          onClick={() => setShowCreateForm(true)}
          className="bg-[#EDFF60] text-[#222408] hover:bg-[#EDFF60]/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva Experiencia
        </Button>
      </div>

      {/* Create/Edit Form */}
      {showCreateForm && (
        <Card className="bg-[#FCF8EE]/5 border-[#FCF8EE]/20 mb-6">
          <CardHeader>
            <CardTitle className="text-[#FCF8EE]">
              {editingId ? 'Editar Experiencia' : 'Crear Nueva Experiencia'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Input
                  placeholder="Título de la experiencia"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="bg-[#FCF8EE]/10 border-[#FCF8EE]/20 text-[#FCF8EE]"
                />
              </div>
              <div>
                <Input
                  placeholder="Ubicación"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="bg-[#FCF8EE]/10 border-[#FCF8EE]/20 text-[#FCF8EE]"
                />
              </div>
            </div>
            
            <Textarea
              placeholder="Descripción detallada de la experiencia"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="bg-[#FCF8EE]/10 border-[#FCF8EE]/20 text-[#FCF8EE]"
              rows={3}
            />

            <div className="grid md:grid-cols-3 gap-4">
              <Input
                placeholder="Categoría"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="bg-[#FCF8EE]/10 border-[#FCF8EE]/20 text-[#FCF8EE]"
              />
              <Input
                placeholder="Precio (ej: $150,000)"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="bg-[#FCF8EE]/10 border-[#FCF8EE]/20 text-[#FCF8EE]"
              />
              <Input
                placeholder="Fechas disponibles"
                value={formData.dates}
                onChange={(e) => setFormData({...formData, dates: e.target.value})}
                className="bg-[#FCF8EE]/10 border-[#FCF8EE]/20 text-[#FCF8EE]"
              />
            </div>

            <Input
              placeholder="Tags (separados por comas)"
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
              className="bg-[#FCF8EE]/10 border-[#FCF8EE]/20 text-[#FCF8EE]"
            />

            <div className="flex gap-2">
              <Button onClick={handleSubmit} className="bg-[#EDFF60] text-[#222408] hover:bg-[#EDFF60]/90">
                {editingId ? 'Actualizar' : 'Crear'} Experiencia
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowCreateForm(false);
                  setEditingId(null);
                  setFormData({title: '', description: '', location: '', category: '', price: '', dates: '', tags: ''});
                }}
                className="border-[#FCF8EE]/30 text-[#FCF8EE] hover:bg-[#FCF8EE]/10"
              >
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Experiences List */}
      <div className="space-y-4">
        {experiences.map((experience) => (
          <Card key={experience.id} className="bg-[#FCF8EE]/5 border-[#FCF8EE]/20">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-semibold text-[#FCF8EE]">
                      {experience.title}
                    </h3>
                    <Badge 
                      variant={experience.status === 'activa' ? 'default' : 'secondary'}
                      className={experience.status === 'activa' 
                        ? "bg-green-500/20 text-green-400 border-green-500/30" 
                        : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                      }
                    >
                      {experience.status === 'activa' ? 'Activa' : 'Pendiente'}
                    </Badge>
                  </div>
                  
                  <p className="text-[#FCF8EE]/80">{experience.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-[#FCF8EE]/70">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {experience.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {experience.dates}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {experience.price}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {experience.tags.split(',').map((tag: string, index: number) => (
                      <Badge 
                        key={index}
                        variant="outline" 
                        className="border-[#EDFF60]/30 text-[#EDFF60]"
                      >
                        {tag.trim()}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(experience)}
                    className="border-[#FCF8EE]/30 text-[#FCF8EE] hover:bg-[#FCF8EE]/10"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(experience.id)}
                    className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {experiences.length === 0 && (
          <Card className="bg-[#FCF8EE]/5 border-[#FCF8EE]/20">
            <CardContent className="p-12 text-center">
              <div className="text-[#FCF8EE]/50 mb-4">
                <Plus className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-[#FCF8EE] mb-2">
                No tienes experiencias registradas
              </h3>
              <p className="text-[#FCF8EE]/70 mb-4">
                Comienza creando tu primera experiencia de turismo sostenible
              </p>
              <Button
                onClick={() => setShowCreateForm(true)}
                className="bg-[#EDFF60] text-[#222408] hover:bg-[#EDFF60]/90"
              >
                Crear Primera Experiencia
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Experiencias;