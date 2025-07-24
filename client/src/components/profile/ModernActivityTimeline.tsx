
import React from 'react';
import { Activity, Calendar, Clock, FileText, MessageSquare, ShoppingBag, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCategory } from './ProfileHeader';

interface ActivityItem {
  id: string;
  type: string;
  title: string;
  date: string;
  icon: React.ReactNode;
}

interface ModernActivityTimelineProps {
  activities?: ActivityItem[];
  extended?: boolean;
  userCategory?: UserCategory;
}

export const ModernActivityTimeline: React.FC<ModernActivityTimelineProps> = ({ 
  activities, 
  extended = false,
  userCategory 
}) => {
  // Mock activity data
  const mockActivities: ActivityItem[] = activities || [
    {
      id: "1",
      type: "message",
      title: "Nuevo mensaje de Juan",
      date: "Hace 5 minutos",
      icon: <MessageSquare className="h-5 w-5 text-blue-500" />
    },
    {
      id: "2",
      type: "event",
      title: "Recordatorio: Reunión de equipo a las 3 PM",
      date: "Hoy",
      icon: <Calendar className="h-5 w-5 text-green-500" />
    },
    {
      id: "3",
      type: "file",
      title: "Archivo 'Informe Trimestral' subido",
      date: "Ayer",
      icon: <FileText className="h-5 w-5 text-yellow-500" />
    },
    {
      id: "4",
      type: "task",
      title: "Tarea 'Revisar propuesta' completada",
      date: "3 de Mayo",
      icon: <Clock className="h-5 w-5 text-red-500" />
    },
    {
      id: "5",
      type: "product",
      title: "Nuevo producto añadido al catálogo",
      date: "1 de Mayo",
      icon: <ShoppingBag className="h-5 w-5 text-purple-500" />
    },
    {
      id: "6",
      type: "certification",
      title: "Certificación en Turismo Sostenible obtenida",
      date: "28 de Abril",
      icon: <Star className="h-5 w-5 text-amber-500" />
    }
  ];

  const displayedActivities = extended ? mockActivities : mockActivities.slice(0, 3);

  return (
    <Card className="border border-green-100 bg-white/80 backdrop-blur-sm shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-semibold text-green-800">
            {userCategory === "sponsor" ? "Actividad de Patrocinio" : "Actividad Reciente"}
          </h3>
          <Activity className="h-5 w-5 text-green-600" />
        </div>
        
        <ul className="space-y-4">
          {displayedActivities.map((activity) => (
            <li key={activity.id} className="flex items-center space-x-3">
              <Avatar className="h-9 w-9">
                <AvatarImage alt="Activity Icon" />
                <AvatarFallback>{activity.icon}</AvatarFallback>
              </Avatar>
              
              <div>
                <p className="text-sm font-medium text-green-800">{activity.title}</p>
                <p className="text-xs text-green-600">{activity.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
