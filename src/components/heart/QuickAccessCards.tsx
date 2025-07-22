
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Activity, Users, Calendar } from "lucide-react";

export const QuickAccessCards = () => {
  return (
    <div className="px-4 md:px-6 py-6">
      <h2 className="text-xl font-bold mb-4">Accesos Rápidos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="hover:shadow-md transition-all h-full">
          <CardContent className="flex flex-col gap-2 p-5">
            <div className="bg-red-100 p-3 rounded-lg w-fit">
              <Heart className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <h3 className="font-medium">Apoya Causas</h3>
              <p className="text-sm text-muted-foreground">Proyectos de conservación y comunidad</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-all h-full">
          <CardContent className="flex flex-col gap-2 p-5">
            <div className="bg-green-100 p-3 rounded-lg w-fit">
              <Activity className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium">Impacto Actual</h3>
              <p className="text-sm text-muted-foreground">Métricas de las causas apoyadas</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-all h-full">
          <CardContent className="flex flex-col gap-2 p-5">
            <div className="bg-blue-100 p-3 rounded-lg w-fit">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium">Comunidades</h3>
              <p className="text-sm text-muted-foreground">Proyectos con comunidades locales</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-all h-full">
          <CardContent className="flex flex-col gap-2 p-5">
            <div className="bg-purple-100 p-3 rounded-lg w-fit">
              <Calendar className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium">Eventos</h3>
              <p className="text-sm text-muted-foreground">Actividades de recaudación</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
