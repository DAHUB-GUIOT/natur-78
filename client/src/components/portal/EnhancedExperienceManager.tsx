import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Star, Edit, Trash2, Eye, Calendar, Users, MapPin, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Mock data for demonstration
const mockExperiences = [
  {
    id: 1,
    title: "Avistamiento de Aves en los Farallones",
    description: "Experiencia única de observación de aves en el Parque Nacional de los Farallones",
    status: "active",
    category: "Ecoturismo",
    location: "Cali, Valle del Cauca",
    price: 150000,
    rating: 4.8,
    views: 342,
    bookings: 12,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    tags: ["Naturaleza", "Aves", "Fotografía"]
  },
  {
    id: 2,
    title: "Caminata Ecológica Sierra Nevada",
    description: "Recorrido interpretativo por la biodiversidad de la Sierra Nevada de Santa Marta",
    status: "pending",
    category: "Senderismo",
    location: "Santa Marta, Magdalena",
    price: 200000,
    rating: 4.9,
    views: 189,
    bookings: 8,
    image: "https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    tags: ["Montaña", "Cultura", "Aventura"]
  }
];

interface EnhancedExperienceManagerProps {
  onCreateNew: () => void;
}

const EnhancedExperienceManager: React.FC<EnhancedExperienceManagerProps> = ({ onCreateNew }) => {
  const [experiences, setExperiences] = useState(mockExperiences);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'draft': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Activa';
      case 'pending': return 'Pendiente';
      case 'draft': return 'Borrador';
      default: return 'Desconocido';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-unbounded font-light text-white mb-2">
            Mis Experiencias
          </h2>
          <p className="text-white/70">
            Gestiona y optimiza tus ofertas turísticas sostenibles
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="border-white/30 text-white hover:bg-white/10"
          >
            {viewMode === 'grid' ? 'Vista Lista' : 'Vista Cuadrícula'}
          </Button>
          
          <Button
            onClick={onCreateNew}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nueva Experiencia
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/70">Total</p>
                <p className="text-2xl font-bold text-white">{experiences.length}</p>
              </div>
              <Star className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/70">Activas</p>
                <p className="text-2xl font-bold text-green-400">
                  {experiences.filter(e => e.status === 'active').length}
                </p>
              </div>
              <Eye className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/70">Reservas</p>
                <p className="text-2xl font-bold text-blue-400">
                  {experiences.reduce((sum, e) => sum + e.bookings, 0)}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/70">Calificación</p>
                <p className="text-2xl font-bold text-yellow-400">4.8</p>
              </div>
              <Heart className="w-8 h-8 text-pink-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Experiences Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-4'}>
        <AnimatePresence>
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 overflow-hidden">
                {/* Experience Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={experience.image} 
                    alt={experience.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Status Badge */}
                  <Badge className={`absolute top-3 right-3 ${getStatusColor(experience.status)}`}>
                    {getStatusLabel(experience.status)}
                  </Badge>
                  
                  {/* Quick Actions */}
                  <div className="absolute bottom-3 right-3 flex gap-2">
                    <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1 line-clamp-1">
                        {experience.title}
                      </h3>
                      <p className="text-sm text-white/70 mb-2 line-clamp-2">
                        {experience.description}
                      </p>
                    </div>
                  </div>

                  {/* Location and Category */}
                  <div className="flex items-center gap-4 mb-3 text-sm text-white/60">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{experience.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      <span>{experience.category}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {experience.tags.map((tag, tagIndex) => (
                      <Badge 
                        key={tagIndex}
                        variant="secondary"
                        className="bg-white/10 text-white/80 text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Stats Row */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span>{experience.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-blue-400">
                        <Eye className="w-4 h-4" />
                        <span>{experience.views}</span>
                      </div>
                      <div className="flex items-center gap-1 text-green-400">
                        <Users className="w-4 h-4" />
                        <span>{experience.bookings}</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg font-semibold text-white">
                        ${experience.price.toLocaleString()}
                      </p>
                      <p className="text-xs text-white/60">por persona</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {experiences.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Star className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <h3 className="text-xl font-unbounded font-light text-white mb-2">
            No tienes experiencias aún
          </h3>
          <p className="text-white/70 mb-6">
            Crea tu primera experiencia turística sostenible
          </p>
          <Button onClick={onCreateNew} className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Crear Primera Experiencia
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default EnhancedExperienceManager;