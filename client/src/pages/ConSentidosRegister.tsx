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
      description: "Te has unido a Con-Sentidos. Descubre experiencias sostenibles en nuestro marketplace.",
    });
    
    // Redirect to marketplace after successful registration
    setTimeout(() => {
      window.location.href = '/mapa';
    }, 1500);
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image - Same as Hero */}
      <img 
        alt="Festival NATUR - Con-Sentidos Registration" 
        className="absolute h-full w-full object-cover inset-0" 
        src="/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg" 
      />
      
      {/* Light Gradient Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Top Navigation - Fixed with Glassmorphism (same as Hero) */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <span className="font-bold text-2xl font-gasoek" style={{ color: '#EDFF60' }}>N</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" className="text-white hover:bg-white/20">
                Volver
              </Button>
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Main Content - Centered */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 pt-20">
        <div className="w-full max-w-4xl">
          
          {/* Title Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#EDFF60' }}>
                <Heart className="w-8 h-8 text-black" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-gasoek tracking-wide" style={{ color: '#EDFF60' }}>
              CON-SENTIDOS
            </h1>
            <p className="text-lg text-white max-w-2xl mx-auto font-medium">
              Conecta con experiencias de turismo sostenible y descubre Colombia de manera consciente
            </p>
          </div>

          {/* Registration Form - Transparent with yellow outlines */}
          <Card className="shadow-2xl backdrop-blur-md bg-white/10 border-2" style={{ borderColor: '#EDFF60' }}>
            <CardHeader className="backdrop-blur-md bg-white/5 border-b-2" style={{ borderColor: '#EDFF60' }}>
              <CardTitle className="text-2xl flex items-center font-bold" style={{ color: '#EDFF60' }}>
                <MapPin className="w-6 h-6 mr-4" style={{ color: '#EDFF60' }} />
                Registro de Viajero Consciente
              </CardTitle>
            </CardHeader>
          
          <CardContent className="p-8 backdrop-blur-md bg-white/5">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="name" className="font-bold text-lg" style={{ color: '#EDFF60' }}>
                    Nombre completo *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="border-2 bg-white/10 backdrop-blur-sm text-white font-medium text-lg p-4 placeholder-white/60"
                    style={{ borderColor: '#EDFF60' }}
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="email" className="font-bold text-lg" style={{ color: '#EDFF60' }}>
                    Correo electrónico *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="border-2 bg-white/10 backdrop-blur-sm text-white font-medium text-lg p-4 placeholder-white/60"
                    style={{ borderColor: '#EDFF60' }}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-medium" style={{ color: '#EDFF60' }}>
                    Teléfono
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="border-2 bg-white/10 backdrop-blur-sm text-white font-medium placeholder-white/60"
                    style={{ borderColor: '#EDFF60' }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country" className="font-medium" style={{ color: '#EDFF60' }}>
                    País de origen *
                  </Label>
                  <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                    <SelectTrigger className="border-2 bg-white/10 backdrop-blur-sm text-white" style={{ borderColor: '#EDFF60' }}>
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
                <Label htmlFor="city" className="font-medium" style={{ color: '#EDFF60' }}>
                  Ciudad de residencia
                </Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="border-2 bg-white/10 backdrop-blur-sm text-white font-medium placeholder-white/60"
                  style={{ borderColor: '#EDFF60' }}
                />
              </div>

              {/* Travel Preferences */}
              <div className="border-t pt-6" style={{ borderColor: '#EDFF60' }}>
                <h3 className="text-lg font-semibold mb-4" style={{ color: '#EDFF60' }}>
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
          <div className="text-center mt-8">
            <p className="text-sm" style={{ color: '#EDFF60' }}>
              ¿Tienes una empresa de turismo sostenible?{" "}
              <Link to="/registro" className="hover:underline font-medium" style={{ color: '#EDFF60' }}>
                Regístrate como empresa
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConSentidosRegister;