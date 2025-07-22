
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star, Award, TrendingUp, Users, CheckCircle } from "lucide-react";

export interface Badge {
  name: string;
  description: string;
  icon: string;
  unlocked?: boolean;
}

export interface BadgesProps {
  badges?: Badge[];
}

export const BadgesCard: React.FC<BadgesProps> = ({ badges }) => {
  // Default badges if none are provided
  const defaultBadges: Badge[] = badges || [
    { name: "Primeros pasos", description: "Has completado tu perfil", icon: "star", unlocked: true },
    { name: "Eco-amigable", description: "Comprometido con la sostenibilidad", icon: "leaf", unlocked: false },
    { name: "Networker", description: "Has conectado con 10+ personas", icon: "users", unlocked: false }
  ];
  
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'star': return <Star className="h-5 w-5" />;
      case 'award': return <Award className="h-5 w-5" />;
      case 'trending-up': return <TrendingUp className="h-5 w-5" />;
      case 'users': return <Users className="h-5 w-5" />;
      case 'check-circle': return <CheckCircle className="h-5 w-5" />;
      case 'leaf': return <CheckCircle className="h-5 w-5" />;
      default: return <Award className="h-5 w-5" />;
    }
  };

  return (
    <Card className="border border-green-100 bg-white/80 backdrop-blur-sm shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-green-800">Insignias</h3>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          {defaultBadges.map((badge, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center justify-center p-3 rounded-lg text-center ${
                badge.unlocked 
                  ? "bg-green-50 border border-green-200" 
                  : "bg-gray-100 border border-gray-200 opacity-60"
              }`}
            >
              <div className={`p-2 rounded-full mb-2 ${
                badge.unlocked ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-500"
              }`}>
                {getIconComponent(badge.icon)}
              </div>
              <h4 className="text-xs font-medium mb-1">
                {badge.name}
              </h4>
            </div>
          ))}
        </div>
        
      </CardContent>
    </Card>
  );
};
