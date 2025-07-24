
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge as UIBadge } from "@/components/ui/badge";
import { AtSign, Award, Star, Rocket, Globe, Leaf, Shield, Zap, Laptop, Camera, Users } from "lucide-react";
import { UserCategory } from './ProfileHeader';
import { BadgesCard } from './BadgesCard';

interface BadgeItem {
  id: string;
  name: string;
  icon: string;
  description: string;
  locked?: boolean;
}

export interface BadgesProps {
  userCategory: UserCategory;
  isPublicView?: boolean;
}

export const Badges: React.FC<BadgesProps> = ({ userCategory, isPublicView = false }): JSX.Element => {
  const [badges, setBadges] = useState<BadgeItem[]>([]);

  useEffect(() => {
    // Load badges based on user category
    setBadges(getBadgesByCategory(userCategory));
  }, [userCategory]);

  return (
    <BadgesCard badges={badges} />
  );
};

// Helper function to get badges for different user categories
const getBadgesByCategory = (category: UserCategory): BadgeItem[] => {
  switch(category) {
    case 'startup':
      return [
        { id: '1', name: 'Innovación', icon: 'rocket', description: 'Por ideas innovadoras en sostenibilidad' },
        { id: '2', name: 'Crecimiento', icon: 'zap', description: 'Por crecimiento sostenido' },
        { id: '3', name: 'Inversión', icon: 'star', description: 'Por atraer inversión', locked: true },
        { id: '4', name: 'Impacto', icon: 'leaf', description: 'Por impacto ambiental positivo' },
        { id: '5', name: 'Global', icon: 'globe', description: 'Por expansión internacional', locked: true },
        { id: '6', name: 'Mentor', icon: 'award', description: 'Por mentoría a otros emprendedores', locked: true }
      ];
      
    case 'sponsor':
      return [
        { id: '1', name: 'Patrocinador', icon: 'award', description: 'Patrocinador oficial' },
        { id: '2', name: 'Alianzas', icon: 'shield', description: 'Por crear alianzas estratégicas' },
        { id: '3', name: 'Eventos', icon: 'star', description: 'Por organizar eventos' },
        { id: '4', name: 'Contribución', icon: 'leaf', description: 'Por contribuciones a la sostenibilidad' },
        { id: '5', name: 'Liderazgo', icon: 'zap', description: 'Por liderazgo en el sector', locked: true },
        { id: '6', name: 'Comunidad', icon: 'globe', description: 'Por apoyo a la comunidad', locked: true }
      ];
      
    case 'attendee':
      return [
        { id: '1', name: 'Asistencia', icon: 'award', description: 'Por asistir a eventos' },
        { id: '2', name: 'Participación', icon: 'star', description: 'Por participar activamente' },
        { id: '3', name: 'Social', icon: 'at-sign', description: 'Por actividad en redes sociales', locked: true },
        { id: '4', name: 'Ambiental', icon: 'leaf', description: 'Por acciones ambientales' },
        { id: '5', name: 'Global', icon: 'globe', description: 'Por participación internacional', locked: true },
        { id: '6', name: 'Innovador', icon: 'zap', description: 'Por propuestas innovadoras', locked: true }
      ];
      
    case 'digital-nomad':
      return [
        { id: '1', name: 'Trotamundos', icon: 'globe', description: 'Por visitar más de 20 países' },
        { id: '2', name: 'Remoto', icon: 'laptop', description: 'Por trabajo remoto sostenible' },
        { id: '3', name: 'Creador', icon: 'camera', description: 'Por crear contenido de viajes' },
        { id: '4', name: 'Comunidad', icon: 'users', description: 'Por crear comunidad nómada', locked: true },
        { id: '5', name: 'Sostenible', icon: 'leaf', description: 'Por prácticas de viaje sostenibles' },
        { id: '6', name: 'Explorador', icon: 'compass', description: 'Por explorar destinos no convencionales', locked: true }
      ];
      
    case 'ecosystem':
    default:
      return [
        { id: '1', name: 'Certificación', icon: 'award', description: 'Por certificación ambiental' },
        { id: '2', name: 'Influencia', icon: 'star', description: 'Por influencia en el ecosistema' },
        { id: '3', name: 'Conexión', icon: 'at-sign', description: 'Por crear conexiones valiosas' },
        { id: '4', name: 'Sostenible', icon: 'leaf', description: 'Por prácticas sostenibles' },
        { id: '5', name: 'Global', icon: 'globe', description: 'Por alcance global', locked: true },
        { id: '6', name: 'Protección', icon: 'shield', description: 'Por protección ambiental', locked: true }
      ];
  }
};
