
import React from 'react';
import { Clock, Award, Calendar, ShoppingBag, Briefcase, Rocket, Star, Heart } from "lucide-react";
import { UserCategory } from './ProfileHeader';
import { ModernActivityTimeline } from './ModernActivityTimeline';

interface ActivityHistoryProps {
  userCategory?: UserCategory;
}

export const ActivityHistory = ({ userCategory = "ecosystem" }: ActivityHistoryProps) => {
  // Get activities based on user category
  const getActivities = () => {
    switch(userCategory) {
      case "attendee":
        return [
          {
            id: "1",
            type: "certification",
            title: "Obtuviste la certificación \"Guía de Turismo Regenerativo\"",
            date: "15 Mar 2023",
            icon: <Award className="h-5 w-5 text-amber-600" />
          },
          {
            id: "2",
            type: "experience",
            title: "Reservaste \"Expedición Biodiversidad Amazónica\"",
            date: "03 Oct 2023",
            icon: <Calendar className="h-5 w-5 text-amber-600" />
          },
          {
            id: "3",
            type: "product",
            title: "Compraste \"Café Orgánico Especial 500g\"",
            date: "25 May 2023",
            icon: <ShoppingBag className="h-5 w-5 text-amber-600" />
          }
        ];
      
      case "sponsor":
        return [
          {
            id: "1",
            type: "event",
            title: "Patrocinaste el evento \"Foro de Turismo Sostenible\"",
            date: "12 Jun 2023",
            icon: <Star className="h-5 w-5 text-blue-600" />
          },
          {
            id: "2",
            type: "alliance",
            title: "Nueva alianza con \"Asociación de Guías Locales\"",
            date: "28 Aug 2023",
            icon: <Briefcase className="h-5 w-5 text-blue-600" />
          },
          {
            id: "3",
            type: "project",
            title: "Lanzamiento de campaña \"Playas Limpias 2023\"",
            date: "05 Apr 2023",
            icon: <Heart className="h-5 w-5 text-blue-600" />
          }
        ];
      
      case "startup":
        return [
          {
            id: "1",
            type: "investment",
            title: "Recibiste inversión de \"Green Ventures Capital\"",
            date: "20 Jul 2023",
            icon: <Rocket className="h-5 w-5 text-purple-600" />
          },
          {
            id: "2",
            type: "client",
            title: "Nuevo cliente: \"Ministerio de Turismo\"",
            date: "10 Sep 2023",
            icon: <Briefcase className="h-5 w-5 text-purple-600" />
          },
          {
            id: "3",
            type: "product",
            title: "Lanzamiento de tu app \"EcoGuide Pro\"",
            date: "15 Feb 2023",
            icon: <Star className="h-5 w-5 text-purple-600" />
          }
        ];
      
      case "ecosystem":
      default:
        return [
          {
            id: "1",
            type: "certification",
            title: "Obtuviste la certificación \"Destino Turístico Sostenible\"",
            date: "15 Mar 2023",
            icon: <Award className="h-5 w-5 text-green-600" />
          },
          {
            id: "2",
            type: "experience",
            title: "Nueva experiencia: \"Rutas Ancestrales\"",
            date: "03 Oct 2023",
            icon: <Calendar className="h-5 w-5 text-green-600" />
          },
          {
            id: "3",
            type: "alliance",
            title: "Alianza con \"Red de Turismo Comunitario\"",
            date: "25 May 2023",
            icon: <Briefcase className="h-5 w-5 text-green-600" />
          },
          {
            id: "4",
            type: "certification",
            title: "Renovación de certificado \"Biodiversidad Protegida\"",
            date: "20 Jun 2023",
            icon: <Award className="h-5 w-5 text-green-600" />
          },
          {
            id: "5",
            type: "experience",
            title: "Actualización de experiencia \"Observación de Aves\"",
            date: "08 Oct 2022",
            icon: <Calendar className="h-5 w-5 text-green-600" />
          }
        ];
    }
  };

  const activities = getActivities();
  
  return (
    <ModernActivityTimeline activities={activities} />
  );
};
