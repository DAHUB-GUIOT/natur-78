import React, { useState } from 'react';
import { HeaderButtons } from "@/components/layout/HeaderButtons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, User, Mail, Phone, Heart } from "lucide-react";
import { Link } from "wouter";

const ConSentidosRegister = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    travelStyle: '',
    interests: '',
    experience: '',
    motivation: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "¡Registro exitoso!",
      description: "Te has unido a Con-Sentidos. Pronto recibirás información sobre experiencias sostenibles.",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <HeaderButtons showPortalButtons={false} />
      
      {/* Hero Banner with Background Image */}
      <div className="relative bg-gradient-to-r from-green-900/80 to-black/70 text-white">
        <img 
          src="/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg"
          alt="Conscious Travel"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
        <div className="relative z-10 container mx-auto px-4 py-24 text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-2xl">
              <Heart className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-gasoek tracking-wide drop-shadow-2xl">
            CON-SENTIDOS
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto font-medium drop-shadow-lg">
            Conecta con experiencias de turismo sostenible y descubre Colombia de manera consciente
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16 max-w-4xl">

        {/* Registration Form */}
        <Card className="shadow-2xl border-2 border-green-500 bg-white">
          <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 border-b-2 border-green-500">
            <CardTitle className="text-3xl text-white flex items-center font-bold">
              <MapPin className="w-8 h-8 mr-4 text-white" />
              Registro de Viajero Consciente
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-8 bg-white">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-black font-bold text-lg">
                    Nombre completo *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="border-2 border-green-600 focus:border-green-700 focus:ring-green-600 text-black font-medium text-lg p-4"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="email" className="text-black font-bold text-lg">
                    Correo electrónico *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="border-2 border-green-600 focus:border-green-700 focus:ring-green-600 text-black font-medium text-lg p-4"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-700 font-medium">
                    Teléfono
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country" className="text-gray-700 font-medium">
                    País de origen *
                  </Label>
                  <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                    <SelectTrigger className="border-gray-200 focus:border-green-500 focus:ring-green-500">
                      <SelectValue placeholder="Selecciona tu país" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="colombia">Colombia</SelectItem>
                      <SelectItem value="argentina">Argentina</SelectItem>
                      <SelectItem value="brasil">Brasil</SelectItem>
                      <SelectItem value="chile">Chile</SelectItem>
                      <SelectItem value="peru">Perú</SelectItem>
                      <SelectItem value="ecuador">Ecuador</SelectItem>
                      <SelectItem value="mexico">México</SelectItem>
                      <SelectItem value="usa">Estados Unidos</SelectItem>
                      <SelectItem value="canada">Canadá</SelectItem>
                      <SelectItem value="españa">España</SelectItem>
                      <SelectItem value="francia">Francia</SelectItem>
                      <SelectItem value="alemania">Alemania</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="text-gray-700 font-medium">
                  Ciudad de residencia
                </Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                />
              </div>

              {/* Travel Preferences */}
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Preferencias de viaje
                </h3>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="travelStyle" className="text-gray-700 font-medium">
                      Estilo de viaje preferido
                    </Label>
                    <Select value={formData.travelStyle} onValueChange={(value) => handleInputChange('travelStyle', value)}>
                      <SelectTrigger className="border-gray-200 focus:border-green-500 focus:ring-green-500">
                        <SelectValue placeholder="Selecciona tu estilo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ecoturismo">Ecoturismo</SelectItem>
                        <SelectItem value="aventura">Turismo de aventura</SelectItem>
                        <SelectItem value="cultural">Turismo cultural</SelectItem>
                        <SelectItem value="gastronomico">Turismo gastronómico</SelectItem>
                        <SelectItem value="comunitario">Turismo comunitario</SelectItem>
                        <SelectItem value="bienestar">Turismo de bienestar</SelectItem>
                        <SelectItem value="fotografico">Turismo fotográfico</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interests" className="text-gray-700 font-medium">
                      Intereses específicos (separados por comas)
                    </Label>
                    <Input
                      id="interests"
                      value={formData.interests}
                      onChange={(e) => handleInputChange('interests', e.target.value)}
                      placeholder="Ej: naturaleza, medicina ancestral, artesanías, fauna, flora"
                      className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience" className="text-gray-700 font-medium">
                      Experiencia en turismo sostenible
                    </Label>
                    <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                      <SelectTrigger className="border-gray-200 focus:border-green-500 focus:ring-green-500">
                        <SelectValue placeholder="Selecciona tu nivel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="principiante">Principiante - Es mi primera vez</SelectItem>
                        <SelectItem value="intermedio">Intermedio - Tengo alguna experiencia</SelectItem>
                        <SelectItem value="avanzado">Avanzado - Soy un viajero experimentado</SelectItem>
                        <SelectItem value="experto">Experto - Trabajo en el sector</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="motivation" className="text-gray-700 font-medium">
                      ¿Qué te motiva a viajar de manera sostenible?
                    </Label>
                    <Textarea
                      id="motivation"
                      value={formData.motivation}
                      onChange={(e) => handleInputChange('motivation', e.target.value)}
                      placeholder="Comparte tu motivación para el turismo consciente..."
                      className="border-gray-200 focus:border-green-500 focus:ring-green-500 min-h-[100px]"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <Link to="/mapa">
                    <Button variant="ghost" className="text-gray-600 hover:text-gray-800">
                      ← Explorar sin registrarse
                    </Button>
                  </Link>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link to="/auth/consentidos">
                      <Button
                        variant="outline"
                        className="border-green-200 text-green-700 hover:bg-green-50 w-full sm:w-auto"
                      >
                        Ya tengo cuenta - Iniciar sesión
                      </Button>
                    </Link>
                    <Button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-medium"
                    >
                      Registrarme en Con-Sentidos
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="text-center mt-8 text-gray-600">
          <p className="text-sm">
            ¿Tienes una empresa de turismo sostenible?{" "}
            <Link to="/registro" className="text-green-600 hover:underline font-medium">
              Regístrate como empresa
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConSentidosRegister;