
import { Calendar, MapPin, Users, Globe, Book, Info, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FeaturedArticles } from "@/components/sections/FeaturedArticles";

const Agenda = () => {
  return (
    <section className="space-y-6 mb-12">
      {/* Main Banner */}
      <div className="relative w-full h-[350px] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{
            backgroundImage: "url('/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg')",
            filter: "brightness(0.65)"
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-green-800/70 to-transparent z-10" />
        
        {/* Content */}
        <div className="relative z-20 h-full flex flex-col justify-center px-8 md:px-12">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1 bg-green-600/90 text-white text-sm rounded-full mb-4">
              22-23 Noviembre 2025
            </span>
            <h1 className="text-3xl md:text-5xl text-white font-gasoek mb-4">
              Agenda del Festival NATUR
            </h1>
            <p className="text-lg text-white/90 mb-6 max-w-2xl">
              Explora las diferentes actividades, charlas y eventos del festival más importante de turismo regenerativo en Colombia
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                Ver Programa Completo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                Descargar PDF <Calendar className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white/50 rounded-lg p-6 shadow-sm border border-green-100 mb-8">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-xl font-bold text-green-700">Acerca del Festival</h3>
          <Button variant="outline" size="icon" className="rounded-full border-green-700 text-green-700 h-10 w-10">
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Manifesto Card */}
          <Card className="overflow-hidden border border-green-100/20 shadow-sm hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <div className="bg-green-100 p-3 rounded-lg w-fit mb-2">
                <Info className="h-5 w-5 text-green-700" />
              </div>
              <CardTitle className="text-xl">Manifiesto</CardTitle>
              <p className="pt-1 text-muted-foreground">
                Colombia, el país más biodiverso por metro cuadrado del planeta, es un tesoro natural y cultural que debemos proteger.
              </p>
            </CardHeader>
            <CardContent className="pt-0 pb-4">
              <Button variant="link" className="text-green-700 p-0 hover:text-green-800">
                Leer más <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
          
          {/* Objectives Card */}
          <Card className="overflow-hidden border border-green-100/20 shadow-sm hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <div className="bg-green-100 p-3 rounded-lg w-fit mb-2">
                <Book className="h-5 w-5 text-green-700" />
              </div>
              <CardTitle className="text-xl">Objetivos del Festival</CardTitle>
              <p className="pt-1 text-muted-foreground">
                Conectar estratégicamente a la cadena turística y impulsar el turismo como motor de transformación.
              </p>
            </CardHeader>
            <CardContent className="pt-0 pb-4">
              <Button variant="link" className="text-green-700 p-0 hover:text-green-800">
                Leer más <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
          
          {/* Activities Card */}
          <Card className="overflow-hidden border border-green-100/20 shadow-sm hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <div className="bg-green-100 p-3 rounded-lg w-fit mb-2">
                <Users className="h-5 w-5 text-green-700" />
              </div>
              <CardTitle className="text-xl">Actividades Destacadas</CardTitle>
              <p className="pt-1 text-muted-foreground">
                Charlas, talleres, networking y muestras culturales para todos los asistentes.
              </p>
            </CardHeader>
            <CardContent className="pt-0 pb-4">
              <Button variant="link" className="text-green-700 p-0 hover:text-green-800">
                Leer más <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Event Details */}
      <div className="bg-white/50 rounded-lg p-6 shadow-sm border border-green-100 mb-8">
        <div className="flex flex-col md:flex-row md:gap-8">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h3 className="text-xl font-bold text-green-700 mb-4">Información del Evento</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-green-600" />
                <span>Un viaje a través de Colombia</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-600" />
                <span>22 y 23 de Noviembre / 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-600" />
                <span>CEFE Chapinero - Bogotá, Colombia</span>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <h3 className="text-xl font-bold text-green-700 mb-4">Contacto</h3>
            <div className="space-y-4">
              <p>¿Te interesa participar o colaborar en el Festival NATUR?</p>
              <p className="flex items-center gap-2">📧 contacto@festivalnatur.org</p>
              <p className="flex items-center gap-2">📍 Bogotá, Colombia</p>
              <Button size="icon" className="bg-green-600 hover:bg-green-700 rounded-full h-12 w-12">
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Articles Section */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-green-700 mb-5">Artículos Destacados</h3>
        <FeaturedArticles />
      </div>
    </section>
  );
};

export default Agenda;
