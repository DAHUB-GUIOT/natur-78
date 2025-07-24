
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const FeaturedCauses = () => {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Causas Destacadas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            { title: "Protección Bosques Nativos", location: "Cundinamarca", raised: "85%", category: "Conservación" },
            { title: "Apoyo Artesanas Wayuu", location: "La Guajira", raised: "62%", category: "Comunidad" },
            { title: "Limpieza Playas del Caribe", location: "Santa Marta", raised: "45%", category: "Limpieza" }
          ].map((cause, i) => (
            <div key={i} className="flex justify-between items-center border-b pb-3">
              <div>
                <p className="font-medium">{cause.title}</p>
                <p className="text-sm text-muted-foreground">{cause.location}</p>
              </div>
              <div className="flex flex-col items-end">
                <Badge variant={i === 0 ? "default" : "outline"} className={i === 0 ? "bg-green-600" : "bg-green-50"}>
                  {cause.category}
                </Badge>
                <p className="text-sm font-medium mt-1">{cause.raised} recaudado</p>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4">Ver todas las causas</Button>
      </CardContent>
    </Card>
  );
};
