import React, { useState } from 'react';
import { MainLayout } from "@/components/layout/MainLayout";
import { ExperienceSearch } from "@/components/experiences/ExperienceSearch";
import { ExperienceCard } from "@/components/experiences/ExperienceCard";
import { ViajesMedida } from "@/components/experiences/ViajesMedida";
import { useToast } from "@/components/ui/use-toast";
import { ExperienceType } from "@/types/experiences";
import { Button } from "@/components/ui/button";
import { PlaneTakeoff } from "lucide-react";
import { ExperiencesBanner } from "@/components/experiences/ExperiencesBanner";
import { ExperiencesQuickAccess } from "@/components/experiences/ExperiencesQuickAccess";

const Experiencias = () => {
  const { toast } = useToast();
  const [showViajesMedida, setShowViajesMedida] = useState(false);
  const [searchParams, setSearchParams] = useState({
    category: '',
    department: '',
    city: '',
    dateRange: {
      from: undefined as Date | undefined,
      to: undefined as Date | undefined
    },
    searchQuery: ''
  });

  // Ejemplo de experiencias (en una aplicación real, esto vendría de una API)
  const [experiences] = useState<ExperienceType[]>([{
    id: '1',
    title: 'Caminata ancestral con comunidad indígena',
    description: 'Vive una experiencia única con la comunidad Kamentsá, aprende de su cultura mientras recorres senderos ancestrales en el Valle de Sibundoy.',
    location: {
      department: 'Putumayo',
      city: 'Valle de Sibundoy'
    },
    image: `https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=1200&q=80`,
    dates: {
      start: new Date('2025-06-15'),
      end: new Date('2025-06-17')
    },
    price: 250000,
    category: 'Cultura',
    tags: ['comunidades indígenas', 'biodiversidad', 'saberes ancestrales'],
    rating: 4.9,
    reviews: 26
  }, {
    id: '2',
    title: 'Taller de cocina ancestral',
    description: 'Aprende a preparar platos típicos de la región con ingredientes locales y técnicas transmitidas por generaciones, guiado por cocineras tradicionales.',
    location: {
      department: 'Santander',
      city: 'Barichara'
    },
    image: `https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80`,
    dates: {
      start: new Date('2025-07-10'),
      end: new Date('2025-07-10')
    },
    price: 180000,
    category: 'Gastronomía',
    tags: ['gastronomía local', 'mujeres', 'tradiciones'],
    rating: 4.7,
    reviews: 34
  }, {
    id: '3',
    title: 'Baño de bosque con guía local',
    description: 'Reconéctate con la naturaleza a través de esta práctica ancestral de bienestar en uno de los ecosistemas más biodiversos del mundo.',
    location: {
      department: 'Magdalena',
      city: 'Sierra Nevada de Santa Marta'
    },
    image: `https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=80`,
    dates: {
      start: new Date('2025-05-20'),
      end: new Date('2025-05-22')
    },
    price: 210000,
    category: 'Bienestar',
    tags: ['bienestar', 'biodiversidad', 'conservación'],
    rating: 5.0,
    reviews: 18
  }, {
    id: '4',
    title: 'Avistamiento de ballenas jorobadas',
    description: 'Embárcate en un viaje único para observar las majestuosas ballenas jorobadas durante su temporada de apareamiento en aguas del Pacífico.',
    location: {
      department: 'Chocó',
      city: 'Nuquí'
    },
    image: `https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=1200&q=80`,
    dates: {
      start: new Date('2025-08-05'),
      end: new Date('2025-08-08')
    },
    price: 350000,
    category: 'Naturaleza',
    tags: ['biodiversidad', 'conservación', 'comunidades locales'],
    rating: 4.8,
    reviews: 42
  }, {
    id: '5',
    title: 'Reforestación en reserva natural',
    description: 'Contribuye activamente a la restauración de ecosistemas nativos mientras aprendes sobre ecología, biodiversidad y conservación.',
    location: {
      department: 'Quindío',
      city: 'Salento'
    },
    image: `https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80`,
    dates: {
      start: new Date('2025-04-22'),
      end: new Date('2025-04-24')
    },
    price: 120000,
    category: 'Voluntariado',
    tags: ['reforestación', 'biodiversidad', 'impacto directo'],
    rating: 4.6,
    reviews: 31
  }]);

  // Filtrar experiencias basado en los parámetros de búsqueda
  const filteredExperiences = experiences.filter(experience => {
    // Filtrar por categoría
    if (searchParams.category && experience.category !== searchParams.category) {
      return false;
    }

    // Filtrar por departamento
    if (searchParams.department && experience.location.department !== searchParams.department) {
      return false;
    }

    // Filtrar por ciudad
    if (searchParams.city && experience.location.city !== searchParams.city) {
      return false;
    }

    // Filtrar por fecha
    if (searchParams.dateRange.from && searchParams.dateRange.to) {
      const from = new Date(searchParams.dateRange.from);
      const to = new Date(searchParams.dateRange.to);
      const experienceStart = new Date(experience.dates.start);
      if (experienceStart < from || experienceStart > to) {
        return false;
      }
    }

    // Filtrar por búsqueda de texto
    if (searchParams.searchQuery && !experience.title.toLowerCase().includes(searchParams.searchQuery.toLowerCase()) && !experience.description.toLowerCase().includes(searchParams.searchQuery.toLowerCase()) && !experience.location.department.toLowerCase().includes(searchParams.searchQuery.toLowerCase()) && !experience.location.city.toLowerCase().includes(searchParams.searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });
  const handleSearch = (params: any) => {
    setSearchParams(params);
  };
  const handleSaveExperience = (id: string) => {
    toast({
      title: "Experiencia guardada",
      description: "La experiencia ha sido guardada en tus favoritos."
    });
  };
  const handleShareExperience = (id: string) => {
    // En una aplicación real, esto podría abrir un modal o integrar con la API de compartir
    toast({
      title: "Compartir experiencia",
      description: "Enlace copiado al portapapeles."
    });
  };
  const handleBookNow = (id: string) => {
    toast({
      title: "Reserva iniciada",
      description: "Serás redirigido al proceso de reserva."
    });
  };
  const openViajesMedida = () => {
    setShowViajesMedida(true);
  };
  const closeViajesMedida = () => {
    setShowViajesMedida(false);
  };

  return (
    <MainLayout>
      <div className="space-y-4 w-full">
        <ExperiencesBanner />
        <div className="px-4 md:px-6">
          <ExperiencesQuickAccess />
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <Button onClick={openViajesMedida} className="bg-green-600 hover:bg-green-700 text-white mb-4 md:mb-0">
              <PlaneTakeoff className="mr-2 h-4 w-4" />
              Diseña tu viaje personalizado
            </Button>
            
            <div className="text-gray-600 text-sm">
              <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded mr-2">Nuevo</span>
              Responde un cuestionario y encuentra el viaje perfecto para ti
            </div>
          </div>

          <ExperienceSearch onSearch={handleSearch} />

          <div className="mt-4">
            <p className="text-gray-600 mb-4">
              Mostrando {filteredExperiences.length} {filteredExperiences.length === 1 ? 'experiencia' : 'experiencias'}
            </p>
            
            {filteredExperiences.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredExperiences.map(experience => (
                  <ExperienceCard 
                    key={experience.id} 
                    experience={experience} 
                    onSave={() => handleSaveExperience(experience.id)} 
                    onShare={() => handleShareExperience(experience.id)} 
                    onBook={() => handleBookNow(experience.id)} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                <h3 className="text-xl font-medium text-gray-700 mb-2">No se encontraron experiencias</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Intenta ajustar tus filtros o busca con otros términos para encontrar experiencias que se ajusten a tus criterios.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showViajesMedida && <ViajesMedida experiences={experiences} onClose={closeViajesMedida} />}
    </MainLayout>
  );
};

export default Experiencias;
