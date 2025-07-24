
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings, Users, FileText, Shield } from "lucide-react";

export default function Admin() {
  return (
    <section className="space-y-6 min-h-[calc(100vh-64px)] w-full">
      {/* Banner Section */}
      <div className="relative h-[180px] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{
            backgroundImage: "url('/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg')",
            filter: "brightness(0.7)"
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-transparent z-10" />

        <div className="relative z-20 h-full flex flex-col justify-center px-6">
          <div className="max-w-2xl">
            <h2 className="text-xl md:text-2xl text-white font-gasoek mb-2">
              Administración NATUR
            </h2>
            
            <p className="text-sm md:text-base text-white/90 mb-3 max-w-xl">
              Gestiona tu cuenta, usuarios y configuraciones de la plataforma
            </p>
            
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Panel de Control <Settings className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <div className="px-4 md:px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="hover:shadow-md transition-all h-full">
            <CardContent className="flex flex-col gap-2 p-5">
              <div className="bg-green-600/10 p-3 rounded-lg w-fit">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">Gestión de Usuarios</h3>
                <p className="text-sm text-muted-foreground">Administra los usuarios de la plataforma</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all h-full">
            <CardContent className="flex flex-col gap-2 p-5">
              <div className="bg-green-600/10 p-3 rounded-lg w-fit">
                <Settings className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">Configuración</h3>
                <p className="text-sm text-muted-foreground">Ajustes generales de la plataforma</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all h-full">
            <CardContent className="flex flex-col gap-2 p-5">
              <div className="bg-green-600/10 p-3 rounded-lg w-fit">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">Informes</h3>
                <p className="text-sm text-muted-foreground">Reportes y estadísticas</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all h-full">
            <CardContent className="flex flex-col gap-2 p-5">
              <div className="bg-green-600/10 p-3 rounded-lg w-fit">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">Seguridad</h3>
                <p className="text-sm text-muted-foreground">Permisos y roles de usuario</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Admin Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Actividad Reciente</h3>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex justify-between items-center border-b pb-3">
                    <div>
                      <p className="font-medium">Acción realizada por usuario</p>
                      <p className="text-sm text-muted-foreground">Hace {item} horas</p>
                    </div>
                    <Badge variant="outline" className="bg-green-50">Completado</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Rendimiento</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="font-medium">Usuarios activos</p>
                  <p className="font-bold">1,245</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-medium">Nuevos registros</p>
                  <p className="font-bold">+28</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-medium">Certificaciones</p>
                  <p className="font-bold">42</p>
                </div>
              </div>
              <Button className="w-full mt-4">Ver Estadísticas Completas</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
