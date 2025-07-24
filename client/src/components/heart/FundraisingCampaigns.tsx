
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sun, TreeDeciduous, Activity } from "lucide-react";

interface FundraisingCampaignsProps {
  handleContribute: (campaignId: string) => void;
}

export const FundraisingCampaigns = ({ handleContribute }: FundraisingCampaignsProps) => {
  return (
    <div className="px-4 md:px-6 py-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Campañas Principales</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Campaign 1: Clean Energy */}
        <Card className="overflow-hidden hover:shadow-xl transition-all">
          <div className="h-48 bg-yellow-100 relative">
            <div className="absolute inset-0 flex items-center justify-center bg-yellow-500/20">
              <Sun size={64} className="text-yellow-600" />
            </div>
          </div>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Energía Limpia Colombia</CardTitle>
              <Badge className="bg-yellow-600">Destacado</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Proyecto para implementar soluciones de energía renovable en comunidades rurales de Colombia, 
              brindando acceso a electricidad limpia y sostenible.
            </p>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Recaudado</span>
                <span>$45.000.000 / $100.000.000</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full">
                <div className="h-full bg-green-600 rounded-full" style={{width: "45%"}}></div>
              </div>
            </div>
            
            <Button 
              onClick={() => handleContribute("energia-limpia")} 
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold"
            >
              Contribuir a esta causa
            </Button>
          </CardContent>
        </Card>

        {/* Campaign 2: Ecosystem Regeneration */}
        <Card className="overflow-hidden hover:shadow-xl transition-all">
          <div className="h-48 bg-green-100 relative">
            <div className="absolute inset-0 flex items-center justify-center bg-green-500/20">
              <TreeDeciduous size={64} className="text-green-600" />
            </div>
          </div>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Regeneración de Ecosistemas</CardTitle>
              <Badge className="bg-green-600">Urgente</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Recuperación de ecosistemas degradados mediante turismo regenerativo, 
              involucrando a comunidades locales en la conservación y restauración.
            </p>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Recaudado</span>
                <span>$65.000.000 / $100.000.000</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full">
                <div className="h-full bg-green-600 rounded-full" style={{width: "65%"}}></div>
              </div>
            </div>
            
            <Button 
              onClick={() => handleContribute("regeneracion-ecosistemas")} 
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Contribuir a esta causa
            </Button>
          </CardContent>
        </Card>

        {/* Campaign 3: NATUR Documentary */}
        <Card className="overflow-hidden hover:shadow-xl transition-all">
          <div className="h-48 bg-blue-100 relative">
            <div className="absolute inset-0 flex items-center justify-center bg-blue-500/20">
              <Activity size={64} className="text-blue-600" />
            </div>
          </div>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Documental NATUR</CardTitle>
              <Badge className="bg-blue-600">Nuevo</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Producción de un documental que resalta la importancia de la biodiversidad 
              colombiana y las iniciativas de conservación en territorios clave.
            </p>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Recaudado</span>
                <span>$25.000.000 / $100.000.000</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full">
                <div className="h-full bg-blue-600 rounded-full" style={{width: "25%"}}></div>
              </div>
            </div>
            
            <Button 
              onClick={() => handleContribute("documental-natur")} 
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Contribuir a esta causa
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
