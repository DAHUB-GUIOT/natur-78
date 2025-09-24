import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Search, Star, Plus, Calendar, MapPin, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import ExperienceForm from "@/components/dashboard/ExperienceForm";

export default function ExperienciasPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const queryClient = useQueryClient();

  // Fetch user's experiences
  const { data: experiences = [], isLoading: experiencesLoading } = useQuery({
    queryKey: ['/api/experiences/my'],
    staleTime: 5 * 60 * 1000,
  });

  // Filter experiences
  const filteredExperiences = experiences.filter((exp: any) => {
    const matchesSearch = searchQuery === "" || 
      exp.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.location?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || exp.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const statusFilters = [
    { id: "all", label: "Todas", count: experiences.length },
    { id: "draft", label: "Borradores", count: experiences.filter((e: any) => e.status === 'draft').length },
    { id: "active", label: "Activas", count: experiences.filter((e: any) => e.status === 'active').length },
    { id: "paused", label: "Pausadas", count: experiences.filter((e: any) => e.status === 'paused').length }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600/20 text-green-300 border-green-500/30';
      case 'draft': return 'bg-yellow-600/20 text-yellow-300 border-yellow-500/30';
      case 'paused': return 'bg-gray-600/20 text-gray-300 border-gray-500/30';
      default: return 'bg-blue-600/20 text-blue-300 border-blue-500/30';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Activa';
      case 'draft': return 'Borrador';
      case 'paused': return 'Pausada';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-green-900 p-4 lg:p-6">
      {/* Header */}
      <div className="mb-6">
        <Card className="bg-white/10 backdrop-blur-xl border-white/20">
          <CardContent className="p-4 lg:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Mis Experiencias</h1>
                <p className="text-white/70">Gestiona y crea nuevas experiencias de turismo sostenible</p>
              </div>
              
              <Sheet open={showExperienceForm} onOpenChange={setShowExperienceForm}>
                <SheetTrigger asChild>
                  <Button 
                    className="bg-green-600/80 hover:bg-green-600 text-white"
                    data-testid="button-create-experience"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Nueva Experiencia
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:max-w-2xl p-0 bg-gradient-to-br from-gray-900 via-black to-green-900 border-l border-white/20">
                  <SheetHeader className="p-6 border-b border-white/20">
                    <SheetTitle className="text-white font-light">Crear Nueva Experiencia</SheetTitle>
                  </SheetHeader>
                  <div className="p-6">
                    <ExperienceForm onClose={() => {
                      setShowExperienceForm(false);
                      queryClient.invalidateQueries({ queryKey: ['/api/experiences/my'] });
                    }} />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="mb-6">
        <Card className="bg-white/5 backdrop-blur-xl border-white/10">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                <Input
                  placeholder="Buscar experiencias por título, descripción, ubicación..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 pl-10"
                  data-testid="input-search-experiences"
                />
              </div>
              
              {/* Status Filter */}
              <div className="flex items-center gap-2 flex-wrap">
                {statusFilters.map((filter) => (
                  <Button
                    key={filter.id}
                    size="sm"
                    variant={filterStatus === filter.id ? "default" : "outline"}
                    onClick={() => setFilterStatus(filter.id)}
                    className={filterStatus === filter.id 
                      ? "bg-green-600 text-white" 
                      : "bg-white/10 border-white/20 text-white/80 hover:bg-white/20"
                    }
                    data-testid={`filter-${filter.id}`}
                  >
                    {filter.label} ({filter.count})
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Experiences Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {experiencesLoading ? (
          // Loading skeleton
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardContent className="p-4">
                <div className="animate-pulse">
                  <div className="h-32 bg-white/20 rounded mb-4"></div>
                  <div className="h-4 bg-white/20 rounded mb-2"></div>
                  <div className="h-3 bg-white/20 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-white/20 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : filteredExperiences.length === 0 ? (
          <div className="col-span-full">
            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardContent className="p-8 text-center">
                <Star className="w-12 h-12 text-white/40 mx-auto mb-4" />
                <h3 className="text-white/80 text-lg mb-2">
                  {experiences.length === 0 ? 'No tienes experiencias aún' : 'No se encontraron experiencias'}
                </h3>
                <p className="text-white/60 mb-4">
                  {experiences.length === 0 
                    ? 'Crea tu primera experiencia para comenzar'
                    : 'Intenta cambiar los filtros de búsqueda'
                  }
                </p>
                {experiences.length === 0 && (
                  <Button 
                    onClick={() => setShowExperienceForm(true)}
                    className="bg-green-600/80 hover:bg-green-600 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Crear Primera Experiencia
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          filteredExperiences.map((experience: any) => (
            <Card key={experience.id} className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300 group">
              <CardContent className="p-4" data-testid={`experience-card-${experience.id}`}>
                {/* Experience Image */}
                {experience.images && experience.images.length > 0 && (
                  <div className="w-full h-32 bg-white/5 rounded-lg mb-4 overflow-hidden">
                    <img 
                      src={experience.images[0]} 
                      alt={experience.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Status Badge */}
                <div className="flex items-center justify-between mb-3">
                  <Badge className={getStatusColor(experience.status)}>
                    {getStatusLabel(experience.status)}
                  </Badge>
                  {experience.price && (
                    <span className="text-green-400 font-semibold">
                      ${experience.price.toLocaleString()} COP
                    </span>
                  )}
                </div>

                {/* Experience Details */}
                <h3 className="text-white font-semibold mb-2 line-clamp-1" data-testid={`experience-title-${experience.id}`}>
                  {experience.title}
                </h3>
                
                <p className="text-white/70 text-sm mb-3 line-clamp-2">
                  {experience.description}
                </p>

                {/* Meta Information */}
                <div className="space-y-2 mb-4">
                  {experience.location && (
                    <div className="flex items-center gap-2 text-white/60 text-xs">
                      <MapPin className="w-3 h-3" />
                      <span>{experience.location}</span>
                    </div>
                  )}
                  
                  {experience.duration && (
                    <div className="flex items-center gap-2 text-white/60 text-xs">
                      <Clock className="w-3 h-3" />
                      <span>{experience.duration}</span>
                    </div>
                  )}
                  
                  {experience.maxParticipants && (
                    <div className="flex items-center gap-2 text-white/60 text-xs">
                      <Users className="w-3 h-3" />
                      <span>Máx. {experience.maxParticipants} personas</span>
                    </div>
                  )}

                  {experience.dates && experience.dates.length > 0 && (
                    <div className="flex items-center gap-2 text-white/60 text-xs">
                      <Calendar className="w-3 h-3" />
                      <span>Próxima: {new Date(experience.dates[0]).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                    data-testid={`button-edit-experience-${experience.id}`}
                  >
                    Editar
                  </Button>
                  <Button 
                    size="sm"
                    className="bg-green-600/80 hover:bg-green-600 text-white"
                    data-testid={`button-view-experience-${experience.id}`}
                  >
                    Ver
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}