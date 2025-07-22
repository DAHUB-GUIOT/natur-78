
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TreeDeciduous, Users, Leaf, Sun, Activity } from "lucide-react";

export const RegenerativeProjects = () => {
  return (
    <div className="my-8">
      <h2 className="text-xl font-bold mb-4">Proyectos Regenerativos</h2>
      <Tabs defaultValue="conservacion" className="w-full">
        <TabsList className="w-full justify-start mb-4 bg-green-50">
          <TabsTrigger value="conservacion">Conservación</TabsTrigger>
          <TabsTrigger value="comunidades">Comunidades</TabsTrigger>
          <TabsTrigger value="sostenibles">Sostenibilidad</TabsTrigger>
          <TabsTrigger value="energia">Energía</TabsTrigger>
          <TabsTrigger value="tech">Tecnología</TabsTrigger>
        </TabsList>
        
        <TabsContent value="conservacion" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Restauración Bosque Andino",
                image: "/placeholder.svg",
                description: "Recuperación de ecosistemas nativos en la cordillera de los Andes",
                progress: 65
              },
              {
                title: "Protección de Manglares",
                image: "/placeholder.svg",
                description: "Conservación de manglares en la costa pacífica colombiana",
                progress: 42
              },
              {
                title: "Corredores Biológicos",
                image: "/placeholder.svg",
                description: "Creación de corredores para fauna silvestre en zonas fragmentadas",
                progress: 78
              }
            ].map((project, i) => (
              <Card key={i} className="overflow-hidden hover:shadow-lg transition-all">
                <div className="h-40 w-full bg-gray-200">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start mb-2">
                    <div className="bg-green-100 p-2 rounded-full mr-2">
                      <TreeDeciduous className="h-4 w-4 text-green-600" />
                    </div>
                    <h3 className="font-medium">{project.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progreso</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full">
                    <div 
                      className="h-full bg-green-600 rounded-full" 
                      style={{width: `${project.progress}%`}}
                    ></div>
                  </div>
                  <Button className="w-full mt-3 bg-green-600 hover:bg-green-700">
                    Apoyar Proyecto
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="comunidades" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Artesanías Wayuu",
                image: "/placeholder.svg",
                description: "Apoyo a comunidades indígenas Wayuu y su arte tradicional",
                progress: 55
              },
              {
                title: "Pescadores de Tumaco",
                image: "/placeholder.svg",
                description: "Pesca sostenible en comunidades afro del pacífico",
                progress: 38
              },
              {
                title: "Emprendimientos Campesinos",
                image: "/placeholder.svg",
                description: "Desarrollo de micronegocios en zonas rurales",
                progress: 62
              }
            ].map((project, i) => (
              <Card key={i} className="overflow-hidden hover:shadow-lg transition-all">
                <div className="h-40 w-full bg-gray-200">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start mb-2">
                    <div className="bg-blue-100 p-2 rounded-full mr-2">
                      <Users className="h-4 w-4 text-blue-600" />
                    </div>
                    <h3 className="font-medium">{project.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progreso</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full">
                    <div 
                      className="h-full bg-blue-600 rounded-full" 
                      style={{width: `${project.progress}%`}}
                    ></div>
                  </div>
                  <Button className="w-full mt-3 bg-blue-600 hover:bg-blue-700">
                    Apoyar Proyecto
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="sostenibles" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Agricultura Regenerativa",
                image: "/placeholder.svg",
                description: "Implementación de prácticas agrícolas regenerativas",
                progress: 45
              },
              {
                title: "Gestión de Residuos",
                image: "/placeholder.svg",
                description: "Manejo integral de residuos orgánicos en ciudades",
                progress: 70
              },
              {
                title: "Economía Circular",
                image: "/placeholder.svg",
                description: "Desarrollo de cadenas productivas circulares",
                progress: 50
              }
            ].map((project, i) => (
              <Card key={i} className="overflow-hidden hover:shadow-lg transition-all">
                <div className="h-40 w-full bg-gray-200">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start mb-2">
                    <div className="bg-amber-100 p-2 rounded-full mr-2">
                      <Leaf className="h-4 w-4 text-amber-600" />
                    </div>
                    <h3 className="font-medium">{project.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progreso</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full">
                    <div 
                      className="h-full bg-amber-600 rounded-full" 
                      style={{width: `${project.progress}%`}}
                    ></div>
                  </div>
                  <Button className="w-full mt-3 bg-amber-600 hover:bg-amber-700">
                    Apoyar Proyecto
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="energia" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Energía Solar Comunitaria",
                image: "/placeholder.svg",
                description: "Instalación de paneles solares en comunidades rurales",
                progress: 85
              },
              {
                title: "Microhidroeléctricas",
                image: "/placeholder.svg",
                description: "Generación de energía limpia a pequeña escala",
                progress: 60
              },
              {
                title: "Biomasa Sostenible",
                image: "/placeholder.svg",
                description: "Aprovechamiento de residuos orgánicos para energía",
                progress: 40
              }
            ].map((project, i) => (
              <Card key={i} className="overflow-hidden hover:shadow-lg transition-all">
                <div className="h-40 w-full bg-gray-200">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start mb-2">
                    <div className="bg-yellow-100 p-2 rounded-full mr-2">
                      <Sun className="h-4 w-4 text-yellow-600" />
                    </div>
                    <h3 className="font-medium">{project.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progreso</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full">
                    <div 
                      className="h-full bg-yellow-600 rounded-full" 
                      style={{width: `${project.progress}%`}}
                    ></div>
                  </div>
                  <Button className="w-full mt-3 bg-yellow-600 hover:bg-yellow-700">
                    Apoyar Proyecto
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="tech" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Monitoreo Forestal IA",
                image: "/placeholder.svg",
                description: "Uso de inteligencia artificial para monitoreo de bosques",
                progress: 75
              },
              {
                title: "Blockchain para Trazabilidad",
                image: "/placeholder.svg",
                description: "Tecnología blockchain para cadenas productivas sostenibles",
                progress: 30
              },
              {
                title: "App para Conservación",
                image: "/placeholder.svg",
                description: "Desarrollo de aplicación para monitoreo comunitario",
                progress: 55
              }
            ].map((project, i) => (
              <Card key={i} className="overflow-hidden hover:shadow-lg transition-all">
                <div className="h-40 w-full bg-gray-200">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start mb-2">
                    <div className="bg-purple-100 p-2 rounded-full mr-2">
                      <Activity className="h-4 w-4 text-purple-600" />
                    </div>
                    <h3 className="font-medium">{project.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progreso</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full">
                    <div 
                      className="h-full bg-purple-600 rounded-full" 
                      style={{width: `${project.progress}%`}}
                    ></div>
                  </div>
                  <Button className="w-full mt-3 bg-purple-600 hover:bg-purple-700">
                    Apoyar Proyecto
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
