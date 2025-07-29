import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Users, 
  Building, 
  MessageCircle,
  MapPin,
  Activity,
  Calendar,
  Target
} from "lucide-react";

export const DashboardOverview = () => {
  const stats = [
    {
      title: "Empresas Registradas",
      value: "324",
      change: "+12%",
      changeType: "positive",
      icon: Building
    },
    {
      title: "Contactos Activos",
      value: "1,284",
      change: "+8%",
      changeType: "positive", 
      icon: Users
    },
    {
      title: "Mensajes Enviados",
      value: "5,632",
      change: "+23%",
      changeType: "positive",
      icon: MessageCircle
    },
    {
      title: "Conexiones Realizadas",
      value: "89",
      change: "+15%",
      changeType: "positive",
      icon: Target
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'connection',
      message: 'María González se conectó con Carlos Rivera',
      time: 'Hace 2 horas',
      icon: Users
    },
    {
      id: 2,
      type: 'message',
      message: 'Nuevo mensaje en el chat de Startups',
      time: 'Hace 3 horas',
      icon: MessageCircle
    },
    {
      id: 3,
      type: 'company',
      message: 'EcoTours Colombia actualizó su perfil',
      time: 'Hace 5 horas',
      icon: Building
    },
    {
      id: 4,
      type: 'location',
      message: '3 nuevas empresas en Bogotá',
      time: 'Hace 1 día',
      icon: MapPin
    }
  ];

  const topRegions = [
    { name: 'Colombia', companies: 89, growth: '+12%' },
    { name: 'Brasil', companies: 67, growth: '+8%' },
    { name: 'México', companies: 54, growth: '+15%' },
    { name: 'Perú', companies: 43, growth: '+10%' },
    { name: 'Chile', companies: 38, growth: '+7%' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-sans text-gray-900 mb-2">
          Panel de Control
        </h1>
        <p className="text-gray-600">
          Resumen de la actividad en el ecosistema NATUR
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="flex items-center text-sm">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-600">{stat.change}</span>
                <span className="text-gray-500 ml-1">vs mes anterior</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Actividad Reciente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="bg-gray-100 p-2 rounded-full">
                      <activity.icon className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Ver toda la actividad
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Top Regions */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Principales Regiones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topRegions.map((region, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{region.name}</p>
                      <p className="text-xs text-gray-500">{region.companies} empresas</p>
                    </div>
                    <Badge variant="outline" className="text-green-600">
                      {region.growth}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                <MapPin className="h-4 w-4 mr-2" />
                Ver mapa completo
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-16 flex flex-col space-y-2">
              <Building className="h-6 w-6" />
              <span className="text-xs">Añadir Empresa</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col space-y-2">
              <Users className="h-6 w-6" />
              <span className="text-xs">Buscar Contactos</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col space-y-2">
              <MessageCircle className="h-6 w-6" />
              <span className="text-xs">Enviar Mensaje</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col space-y-2">
              <Calendar className="h-6 w-6" />
              <span className="text-xs">Programar Reunión</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};