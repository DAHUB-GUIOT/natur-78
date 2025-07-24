
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Leaf, 
  Users, 
  Calendar as CalendarIcon, 
  MapPin, 
  DollarSign, 
  Heart, 
  Share2, 
  ArrowRight, 
  CheckCircle2, 
  Loader2,
  PanelsTopLeft,
  Landmark,
  Compass,
  Flower2,
  UtensilsCrossed,
  Earth,
  X
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useToast } from "@/components/ui/use-toast";
import { ExperienceType } from "@/types/experiences";
import { ExperienceCard } from "@/components/experiences/ExperienceCard";

type TravelType = 'naturaleza' | 'cultura' | 'aventura' | 'bienestar' | 'gastronomico' | 'regenerativo';
type TravelDuration = 'corto' | 'medio' | 'largo';
type TravelGroup = 'solo' | 'pareja' | 'familia' | 'amigos' | 'grupo';
type TravelRegion = 'amazonia' | 'andes' | 'caribe' | 'pacifico' | 'orinoquia';
type BudgetLevel = 'bajo' | 'medio' | 'alto';
type ImpactPreference = 'participar' | 'conocer' | 'tradicional';

interface Step {
  id: number;
  title: string;
  description: string;
}

interface ViajesMedidaProps {
  experiences: ExperienceType[];
  onClose: () => void;
}

export const ViajesMedida: React.FC<ViajesMedidaProps> = ({ experiences, onClose }) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [travelType, setTravelType] = useState<TravelType | null>(null);
  const [travelDuration, setTravelDuration] = useState<TravelDuration | null>(null);
  const [travelGroup, setTravelGroup] = useState<TravelGroup | null>(null);
  const [travelRegion, setTravelRegion] = useState<TravelRegion | null>(null);
  const [travelDates, setTravelDates] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [budget, setBudget] = useState<BudgetLevel>('medio');
  const [impactPreference, setImpactPreference] = useState<ImpactPreference | null>(null);
  const [filteredExperiences, setFilteredExperiences] = useState<ExperienceType[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const steps: Step[] = [
    {
      id: 1,
      title: "¿Qué tipo de experiencia buscas?",
      description: "Selecciona el tipo de experiencia que más te interese para tu viaje."
    },
    {
      id: 2,
      title: "¿Qué tan largo quieres que sea tu viaje?",
      description: "Elige la duración aproximada de tu viaje."
    },
    {
      id: 3,
      title: "¿Con quién viajas?",
      description: "Cuéntanos con quién planeas realizar este viaje."
    },
    {
      id: 4,
      title: "¿Qué región de Colombia te interesa?",
      description: "Selecciona la región que más te gustaría conocer."
    },
    {
      id: 5,
      title: "¿En qué fechas planeas viajar?",
      description: "Selecciona las fechas aproximadas de tu viaje."
    },
    {
      id: 6,
      title: "¿Cuál es tu presupuesto aproximado?",
      description: "Indícanos un rango de presupuesto para tu viaje."
    },
    {
      id: 7,
      title: "¿Te interesa participar en proyectos de impacto?",
      description: "¿Quieres que tu viaje incluya actividades de turismo regenerativo?"
    }
  ];

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      generateResults();
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateResults = () => {
    setLoading(true);
    
    // Simular tiempo de procesamiento
    setTimeout(() => {
      // Filtrar experiencias basado en las respuestas
      // En un caso real, esto podría ser una llamada a API o un algoritmo más complejo
      const filtered = experiences.filter(exp => {
        // Estos son filtros simplificados para demostración
        let matchesType = true;
        if (travelType) {
          if (travelType === 'naturaleza') matchesType = exp.category === 'Naturaleza';
          if (travelType === 'cultura') matchesType = exp.category === 'Cultura';
          if (travelType === 'bienestar') matchesType = exp.category === 'Bienestar';
          if (travelType === 'gastronomico') matchesType = exp.category === 'Gastronomía';
          if (travelType === 'regenerativo') matchesType = exp.category === 'Voluntariado';
        }

        // Más filtros se pueden agregar aquí basados en duración, región, etc.

        // Filtro básico de presupuesto
        let matchesBudget = true;
        if (budget === 'bajo') matchesBudget = exp.price < 200000;
        if (budget === 'medio') matchesBudget = exp.price >= 200000 && exp.price <= 300000;
        if (budget === 'alto') matchesBudget = exp.price > 300000;

        return matchesType && matchesBudget;
      });

      setFilteredExperiences(filtered);
      setLoading(false);
      setShowResults(true);
    }, 1500);
  };

  const handleSaveTrip = () => {
    toast({
      title: "Viaje guardado",
      description: "Hemos guardado tu viaje personalizado en tu perfil.",
    });
  };

  const handleShareTrip = () => {
    toast({
      title: "Compartir viaje",
      description: "Enlace copiado. Puedes compartirlo con tus amigos.",
    });
  };

  const handleContactRequest = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Solicitud enviada",
      description: "Un asesor de viajes se pondrá en contacto contigo pronto.",
    });
    setContactInfo({ name: '', email: '', phone: '' });
  };

  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 0: return travelType !== null;
      case 1: return travelDuration !== null;
      case 2: return travelGroup !== null;
      case 3: return travelRegion !== null;
      case 4: return travelDates.from !== undefined;
      case 5: return true; // Budget always has a default value
      case 6: return impactPreference !== null;
      default: return false;
    }
  };

  const handleSaveExperience = () => {
    toast({
      title: "Experiencia guardada",
      description: "La experiencia ha sido guardada en tus favoritos.",
    });
  };

  const handleShareExperience = () => {
    toast({
      title: "Compartir experiencia",
      description: "Enlace copiado al portapapeles.",
    });
  };

  const handleBookNow = () => {
    toast({
      title: "Reserva iniciada",
      description: "Serás redirigido al proceso de reserva.",
    });
  };

  const getTypeIcon = (type: TravelType) => {
    switch (type) {
      case 'naturaleza': return <Leaf className="h-5 w-5" />;
      case 'cultura': return <Landmark className="h-5 w-5" />;
      case 'aventura': return <Compass className="h-5 w-5" />;
      case 'bienestar': return <Flower2 className="h-5 w-5" />;  // Changed from Spa to Flower2
      case 'gastronomico': return <UtensilsCrossed className="h-5 w-5" />;
      case 'regenerativo': return <Earth className="h-5 w-5" />;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                {id: 'naturaleza', label: 'Naturaleza', icon: <Leaf className="h-6 w-6" />},
                {id: 'cultura', label: 'Cultura', icon: <Landmark className="h-6 w-6" />},
                {id: 'aventura', label: 'Aventura', icon: <Compass className="h-6 w-6" />},
                {id: 'bienestar', label: 'Bienestar', icon: <Flower2 className="h-6 w-6" />}, // Changed from Spa to Flower2
                {id: 'gastronomico', label: 'Gastronómico', icon: <UtensilsCrossed className="h-6 w-6" />},
                {id: 'regenerativo', label: 'Turismo regenerativo', icon: <Earth className="h-6 w-6" />}
              ].map((item) => (
                <Button
                  key={item.id}
                  variant="outline"
                  className={`h-24 flex flex-col gap-2 items-center justify-center ${
                    travelType === item.id as TravelType
                      ? "bg-[#5D7A3C] border-[#5D7A3C] text-white hover:bg-[#5D7A3C]/90"
                      : "bg-[#222417] border-[#4B5D39]/50 text-[#E3DAC9] hover:bg-[#2A2E22]"
                  }`}
                  onClick={() => setTravelType(item.id as TravelType)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Button>
              ))}
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <RadioGroup 
              value={travelDuration || ''} 
              onValueChange={(value) => setTravelDuration(value as TravelDuration)}
              className="flex flex-col space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem 
                  value="corto" 
                  id="corto"
                  className="text-[#C77B30] border-[#C77B30] focus:ring-[#C77B30]"
                />
                <label htmlFor="corto" className="text-[#E3DAC9] cursor-pointer">1-3 días</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem 
                  value="medio" 
                  id="medio"
                  className="text-[#C77B30] border-[#C77B30] focus:ring-[#C77B30]"
                />
                <label htmlFor="medio" className="text-[#E3DAC9] cursor-pointer">4-7 días</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem 
                  value="largo" 
                  id="largo"
                  className="text-[#C77B30] border-[#C77B30] focus:ring-[#C77B30]"
                />
                <label htmlFor="largo" className="text-[#E3DAC9] cursor-pointer">Más de una semana</label>
              </div>
            </RadioGroup>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <RadioGroup 
              value={travelGroup || ''} 
              onValueChange={(value) => setTravelGroup(value as TravelGroup)}
              className="flex flex-col space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem 
                  value="solo" 
                  id="solo"
                  className="text-[#C77B30] border-[#C77B30] focus:ring-[#C77B30]"
                />
                <label htmlFor="solo" className="text-[#E3DAC9] cursor-pointer">Solo/a</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem 
                  value="pareja" 
                  id="pareja"
                  className="text-[#C77B30] border-[#C77B30] focus:ring-[#C77B30]"
                />
                <label htmlFor="pareja" className="text-[#E3DAC9] cursor-pointer">Pareja</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem 
                  value="familia" 
                  id="familia"
                  className="text-[#C77B30] border-[#C77B30] focus:ring-[#C77B30]"
                />
                <label htmlFor="familia" className="text-[#E3DAC9] cursor-pointer">Familia</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem 
                  value="amigos" 
                  id="amigos"
                  className="text-[#C77B30] border-[#C77B30] focus:ring-[#C77B30]"
                />
                <label htmlFor="amigos" className="text-[#E3DAC9] cursor-pointer">Amigos</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem 
                  value="grupo" 
                  id="grupo"
                  className="text-[#C77B30] border-[#C77B30] focus:ring-[#C77B30]"
                />
                <label htmlFor="grupo" className="text-[#E3DAC9] cursor-pointer">Grupo organizado</label>
              </div>
            </RadioGroup>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                {id: 'amazonia', label: 'Amazonía'},
                {id: 'andes', label: 'Andes'},
                {id: 'caribe', label: 'Caribe'},
                {id: 'pacifico', label: 'Pacífico'},
                {id: 'orinoquia', label: 'Orinoquía'}
              ].map((region) => (
                <Button
                  key={region.id}
                  variant="outline"
                  className={`h-16 ${
                    travelRegion === region.id as TravelRegion
                      ? "bg-[#5D7A3C] border-[#5D7A3C] text-white hover:bg-[#5D7A3C]/90"
                      : "bg-[#222417] border-[#4B5D39]/50 text-[#E3DAC9] hover:bg-[#2A2E22]"
                  }`}
                  onClick={() => setTravelRegion(region.id as TravelRegion)}
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  {region.label}
                </Button>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className={`w-full justify-start h-16 ${
                    !travelDates.from
                    ? "text-[#E3DAC9]/60 bg-[#222417] border-[#4B5D39]/50 hover:bg-[#2A2E22]"
                    : "text-white bg-[#5D7A3C] border-[#5D7A3C] hover:bg-[#5D7A3C]/90"
                  }`}
                >
                  <CalendarIcon className="mr-2 h-5 w-5" />
                  {travelDates.from ? (
                    travelDates.to ? (
                      <>
                        {format(travelDates.from, "d MMM", { locale: es })} - {format(travelDates.to, "d MMM, yyyy", { locale: es })}
                      </>
                    ) : (
                      format(travelDates.from, "d MMMM, yyyy", { locale: es })
                    )
                  ) : (
                    <span>Seleccionar fechas de viaje</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-[#2A2E22] border-[#4B5D39]" align="center">
                <Calendar
                  initialFocus
                  locale={es}
                  mode="range"
                  defaultMonth={travelDates.from}
                  selected={{
                    from: travelDates.from,
                    to: travelDates.to,
                  }}
                  onSelect={(range) => {
                    if (range) {
                      setTravelDates({
                        from: range.from,
                        to: range.to ?? undefined
                      });
                    }
                  }}
                  numberOfMonths={2}
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between text-[#E3DAC9] mb-2">
                <span>Bajo</span>
                <span>Medio</span>
                <span>Alto</span>
              </div>
              <Slider 
                defaultValue={[50]} 
                max={100} 
                step={50}
                onValueChange={(value) => {
                  if (value[0] === 0) setBudget('bajo');
                  else if (value[0] === 50) setBudget('medio');
                  else setBudget('alto');
                }}
                className="[&>span]:bg-[#C77B30] [&>span]:h-2 [&>span>span]:bg-[#C77B30] [&>span>span]:h-4 [&>span>span]:w-4 [&>span>span]:mt-[-6px]"
              />
            </div>
            
            <div className="border border-[#4B5D39]/30 rounded-lg p-4 bg-[#2A2E22]/50">
              <h4 className="text-[#F5F5F2] font-medium mb-2">Presupuesto seleccionado: 
                <span className="ml-2 font-semibold text-[#C77B30]">
                  {budget === 'bajo' ? 'Económico' : budget === 'medio' ? 'Intermedio' : 'Premium'}
                </span>
              </h4>
              <div className="text-[#E3DAC9]/80 text-sm">
                {budget === 'bajo' && "Hospedaje sencillo, transporte público, experiencias básicas."}
                {budget === 'medio' && "Hoteles 3-4 estrellas, excursiones guiadas, algunas experiencias premium."}
                {budget === 'alto' && "Hoteles boutique, transporte privado, experiencias exclusivas."}
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-4">
            <RadioGroup 
              value={impactPreference || ''} 
              onValueChange={(value) => setImpactPreference(value as ImpactPreference)}
              className="flex flex-col space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem 
                  value="participar" 
                  id="participar"
                  className="text-[#C77B30] border-[#C77B30] focus:ring-[#C77B30]"
                />
                <label htmlFor="participar" className="text-[#E3DAC9] cursor-pointer">
                  Sí, quiero participar en proyectos locales
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem 
                  value="conocer" 
                  id="conocer"
                  className="text-[#C77B30] border-[#C77B30] focus:ring-[#C77B30]"
                />
                <label htmlFor="conocer" className="text-[#E3DAC9] cursor-pointer">
                  Prefiero solo conocer iniciativas
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem 
                  value="tradicional" 
                  id="tradicional"
                  className="text-[#C77B30] border-[#C77B30] focus:ring-[#C77B30]"
                />
                <label htmlFor="tradicional" className="text-[#E3DAC9] cursor-pointer">
                  No, prefiero turismo tradicional
                </label>
              </div>
            </RadioGroup>
            <div className="mt-6">
              <div className="border border-[#4B5D39]/30 rounded-lg p-4 bg-[#2A2E22]/50">
                <p className="text-[#E3DAC9]/80 text-sm">
                  El turismo regenerativo busca no solo minimizar el impacto negativo sino generar 
                  impactos positivos en los ecosistemas y comunidades locales.
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderResults = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-12 w-12 text-[#C77B30] animate-spin mb-4" />
          <p className="text-[#E3DAC9] text-lg">Diseñando tu viaje personalizado...</p>
          <p className="text-[#E3DAC9]/70 mt-2 text-sm text-center max-w-md">
            Estamos encontrando las mejores experiencias según tus preferencias
          </p>
        </div>
      );
    }

    if (filteredExperiences.length === 0) {
      return (
        <div className="text-center py-10">
          <div className="bg-[#2A2E22]/50 border border-[#4B5D39]/30 rounded-lg p-6">
            <h3 className="text-xl font-medium text-[#F5F5F2] mb-2">
              No encontramos experiencias que coincidan exactamente
            </h3>
            <p className="text-[#E3DAC9]/80 mb-6">
              Pero podemos diseñar un viaje personalizado para ti. 
              Déjanos tus datos y un asesor te contactará pronto.
            </p>
            
            <form onSubmit={handleContactRequest} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-[#E3DAC9] mb-1">Nombre</label>
                <input 
                  type="text" 
                  id="name" 
                  value={contactInfo.name}
                  onChange={e => setContactInfo({...contactInfo, name: e.target.value})}
                  className="w-full bg-[#222417] border border-[#4B5D39] text-[#F5F5F2] p-2 rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-[#E3DAC9] mb-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  value={contactInfo.email}
                  onChange={e => setContactInfo({...contactInfo, email: e.target.value})}
                  className="w-full bg-[#222417] border border-[#4B5D39] text-[#F5F5F2] p-2 rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-[#E3DAC9] mb-1">Teléfono</label>
                <input 
                  type="tel" 
                  id="phone" 
                  value={contactInfo.phone}
                  onChange={e => setContactInfo({...contactInfo, phone: e.target.value})}
                  className="w-full bg-[#222417] border border-[#4B5D39] text-[#F5F5F2] p-2 rounded-md"
                  required
                />
              </div>
              <Button 
                type="submit"
                className="w-full bg-[#C77B30] hover:bg-[#C77B30]/90 text-white"
              >
                Solicitar asesoría personalizada
              </Button>
            </form>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-medium text-[#F5F5F2]">
            Experiencias recomendadas para ti
          </h3>
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              variant="outline"
              className="flex items-center border-[#5D7A3C] text-[#5D7A3C] hover:bg-[#5D7A3C]/10"
              onClick={handleSaveTrip}
            >
              <Heart className="mr-1 h-4 w-4" />
              Guardar
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="flex items-center border-[#5D7A3C] text-[#5D7A3C] hover:bg-[#5D7A3C]/10"
              onClick={handleShareTrip}
            >
              <Share2 className="mr-1 h-4 w-4" />
              Compartir
            </Button>
          </div>
        </div>

        {travelType && (
          <div className="flex items-center space-x-2">
            <Badge className="bg-[#5D7A3C] text-white px-3 py-1">
              {getTypeIcon(travelType)}
              <span className="ml-1 capitalize">
                {travelType === 'naturaleza' ? 'Naturaleza' : 
                travelType === 'cultura' ? 'Cultura' :
                travelType === 'aventura' ? 'Aventura' :
                travelType === 'bienestar' ? 'Bienestar' :
                travelType === 'gastronomico' ? 'Gastronomía' : 'Turismo regenerativo'}
              </span>
            </Badge>
            
            {impactPreference === 'participar' && (
              <Badge className="bg-[#C77B30] text-white">
                Alto impacto positivo
              </Badge>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperiences.map((experience) => (
            <ExperienceCard 
              key={experience.id}
              experience={experience}
              onSave={() => handleSaveExperience()}
              onShare={() => handleShareExperience()}
              onBook={() => handleBookNow()}
            />
          ))}
        </div>

        <div className="bg-[#2A2E22]/50 border border-[#4B5D39]/30 rounded-lg p-4 mt-6">
          <h4 className="text-[#F5F5F2] font-medium mb-2">
            ¿Necesitas ayuda para organizar tu viaje?
          </h4>
          <p className="text-[#E3DAC9]/80 mb-3">
            Nuestros asesores pueden ayudarte a personalizar aún más tu experiencia.
          </p>
          <Button 
            onClick={() => {
              setContactInfo({name: '', email: '', phone: ''});
              setShowResults(false);
              setCurrentStep(0);
            }}
            className="bg-[#C77B30] hover:bg-[#C77B30]/90 text-white"
          >
            Diseñar otro viaje
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center overflow-y-auto py-8">
      <Card className="w-full max-w-4xl mx-4 bg-[#222417] border-[#4B5D39]/30">
        <div className="flex justify-end p-2">
          <Button 
            variant="ghost" 
            size="icon"
            className="text-[#E3DAC9] hover:bg-[#2A2E22]"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <CardContent className="p-4 md:p-6">
          {!showResults ? (
            <>
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-[#F5F5F2] mb-2">
                  Viajes a tu Medida
                </h2>
                <p className="text-[#E3DAC9]/80">
                  Diseña tu experiencia perfecta en Colombia respondiendo algunas preguntas
                </p>
                
                <div className="mt-4 space-y-1">
                  <div className="flex justify-between text-xs text-[#E3DAC9]/60">
                    <span>Paso {currentStep + 1}</span>
                    <span>{Math.round(progressPercentage)}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2 bg-[#2A2E22]" />
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-medium text-[#F5F5F2] mb-1">
                  {steps[currentStep].title}
                </h3>
                <p className="text-[#E3DAC9]/80">
                  {steps[currentStep].description}
                </p>
              </div>

              <div className="mb-8">
                {renderStep()}
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="border-[#4B5D39] text-[#E3DAC9] hover:bg-[#2A2E22]"
                >
                  Atrás
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!isCurrentStepValid()}
                  className={`${
                    isCurrentStepValid()
                      ? "bg-[#C77B30] hover:bg-[#C77B30]/90"
                      : "bg-[#C77B30]/40"
                  } text-white`}
                >
                  {currentStep === steps.length - 1 ? (
                    <>Mostrar resultados <ArrowRight className="ml-1 h-4 w-4" /></>
                  ) : (
                    "Siguiente"
                  )}
                </Button>
              </div>
            </>
          ) : (
            renderResults()
          )}
        </CardContent>
      </Card>
    </div>
  );
};
