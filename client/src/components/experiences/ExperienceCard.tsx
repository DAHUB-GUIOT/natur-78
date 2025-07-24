import React, { useState } from 'react';
import { CalendarIcon, MapPin, Heart, Share2, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { ExperienceType } from "@/types/experiences";

interface ExperienceCardProps {
  experience: ExperienceType;
  onSave: () => void;
  onShare: () => void;
  onBook: () => void;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  onSave,
  onShare,
  onBook
}) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (date: Date) => {
    return format(date, 'd MMM yyyy', { locale: es });
  };

  const formatDateRange = (start: Date, end: Date) => {
    if (start.toDateString() === end.toDateString()) {
      return formatDate(start);
    }
    return `${formatDate(start)} - ${formatDate(end)}`;
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden border border-gray-200 bg-white hover:shadow-lg transition-all duration-300 rounded-lg">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={experience.image} 
          alt={experience.title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute top-0 left-0 right-0 p-2 flex justify-between">
          <Badge 
            className="bg-amber-500 hover:bg-amber-600 text-white text-xs"
          >
            {experience.category}
          </Badge>
          
          <div className="flex space-x-1">
            <Button 
              size="sm" 
              variant="ghost" 
              className="bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 rounded-full h-7 w-7 p-0"
              onClick={handleSave}
            >
              <Heart className={`h-3.5 w-3.5 ${isSaved ? 'fill-amber-500 text-amber-500' : ''}`} />
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className="bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 rounded-full h-7 w-7 p-0"
              onClick={onShare}
            >
              <Share2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
      
      <CardHeader className="pb-1 px-2.5 md:px-3 pt-3">
        <CardTitle className="text-gray-900 text-base font-medium line-clamp-2">
          {experience.title}
        </CardTitle>
        <div className="flex items-center text-gray-600 text-xs mt-1">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{experience.location.city}, {experience.location.department}</span>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2 flex-grow px-2.5 md:px-3">
        <CardDescription className="text-gray-600 text-xs line-clamp-2 mb-3">
          {experience.description}
        </CardDescription>
        
        <div className="flex flex-wrap gap-1 mt-1">
          {experience.tags.slice(0, 2).map((tag, idx) => (
            <Badge 
              key={idx}
              variant="outline" 
              className="text-xs bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
            >
              {tag}
            </Badge>
          ))}
          {experience.tags.length > 2 && (
            <Badge 
              variant="outline" 
              className="text-xs bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
            >
              +{experience.tags.length - 2}
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 px-2.5 md:px-3 border-t border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-1 md:gap-0">
        <div className="flex items-center text-gray-600 text-xs">
          <CalendarIcon className="h-3 w-3 mr-1 text-amber-500" />
          <span>{formatDateRange(experience.dates.start, experience.dates.end)}</span>
        </div>
        
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="flex items-center cursor-help">
              <span className="text-sm font-semibold text-gray-900 mr-1">
                {formatPrice(experience.price)}
              </span>
              <Info className="h-3 w-3 text-gray-400" />
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="bg-white border-gray-200 text-gray-800 w-64">
            <div className="flex flex-col space-y-1">
              <p className="text-sm">
                Precio por persona. Incluye:
              </p>
              <ul className="text-sm list-disc pl-5 text-gray-600">
                <li>Guía local especializado</li>
                <li>Materiales y equipamiento</li>
                <li>Aporte a comunidades locales</li>
              </ul>
            </div>
          </HoverCardContent>
        </HoverCard>
      </CardFooter>
      
      <div className="px-2.5 md:px-3 pb-3">
        <Button 
          className="w-full bg-green-600 hover:bg-green-700 text-white text-xs md:text-sm py-1"
          onClick={onBook}
        >
          Reservar ahora
        </Button>
      </div>
    </Card>
  );
};
