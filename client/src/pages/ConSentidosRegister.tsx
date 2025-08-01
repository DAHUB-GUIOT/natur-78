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
      
      {/* Top Navigation - Fixed with Green Background */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-green-600 border-b border-green-700 shadow-lg">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <span className="font-bold text-2xl font-gasoek" style={{ color: '#cad95e' }}>N</span>
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
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#cad95e' }}>
                <Heart className="w-8 h-8 text-black" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-gasoek mb-4 tracking-wide" style={{ color: '#cad95e' }}>
              CON-SENTIDOS
            </h1>
            <p className="text-lg text-white max-w-2xl mx-auto font-medium">
              Conecta con experiencias de turismo sostenible y descubre Colombia de manera consciente
            </p>
          </div>

          {/* Registration Form - Transparent with yellow outlines */}
          <Card className="shadow-2xl backdrop-blur-md bg-white/10 border-2" style={{ borderColor: '#cad95e' }}>
            <CardHeader className="backdrop-blur-md bg-white/5 border-b-2" style={{ borderColor: '#cad95e' }}>
              <CardTitle className="text-2xl flex items-center font-bold" style={{ color: '#cad95e' }}>
                <MapPin className="w-6 h-6 mr-4" style={{ color: '#cad95e' }} />
                Registro de Viajero Consciente
              </CardTitle>
            </CardHeader>
          
          <CardContent className="p-8 backdrop-blur-md bg-white/5">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="name" className="font-bold text-lg" style={{ color: '#cad95e' }}>
                    Nombre completo *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="border-2 bg-white/10 backdrop-blur-sm text-white font-medium text-lg p-4 placeholder-white/60"
                    style={{ borderColor: '#cad95e' }}
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="email" className="font-bold text-lg" style={{ color: '#cad95e' }}>
                    Correo electrónico *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="border-2 bg-white/10 backdrop-blur-sm text-white font-medium text-lg p-4 placeholder-white/60"
                    style={{ borderColor: '#cad95e' }}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-medium" style={{ color: '#cad95e' }}>
                    Teléfono
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="border-2 bg-white/10 backdrop-blur-sm text-white font-medium placeholder-white/60"
                    style={{ borderColor: '#cad95e' }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country" className="font-medium" style={{ color: '#cad95e' }}>
                    País de origen *
                  </Label>
                  <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                    <SelectTrigger className="border-2 bg-white/10 backdrop-blur-sm text-white" style={{ borderColor: '#cad95e' }}>
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
                <Label htmlFor="city" className="font-medium" style={{ color: '#cad95e' }}>
                  Ciudad de residencia
                </Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="border-2 bg-white/10 backdrop-blur-sm text-white font-medium placeholder-white/60"
                  style={{ borderColor: '#cad95e' }}
                />
              </div>

              {/* Travel Preferences */}
              <div className="border-t pt-6" style={{ borderColor: '#cad95e' }}>
                <h3 className="text-lg font-semibold mb-4" style={{ color: '#cad95e' }}>
                  Preferencias de viaje
                </h3>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="travelStyle" className="font-medium" style={{ color: '#cad95e' }}>
                      Estilo de viaje preferido
                    </Label>
                    <Select value={formData.travelStyle} onValueChange={(value) => handleInputChange('travelStyle', value)}>
                      <SelectTrigger className="border-2 bg-white/10 backdrop-blur-sm text-white font-medium" style={{ borderColor: '#cad95e' }}>
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
                    <Label htmlFor="interests" className="font-medium" style={{ color: '#cad95e' }}>
                      Intereses específicos (separados por comas)
                    </Label>
                    <Input
                      id="interests"
                      value={formData.interests}
                      onChange={(e) => handleInputChange('interests', e.target.value)}
                      placeholder="Ej: naturaleza, medicina ancestral, artesanías, fauna, flora"
                      className="border-2 bg-white/10 backdrop-blur-sm text-white font-medium placeholder-white/60"
                      style={{ borderColor: '#cad95e' }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience" className="font-medium" style={{ color: '#cad95e' }}>
                      Experiencia en turismo sostenible
                    </Label>
                    <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                      <SelectTrigger className="border-2 bg-white/10 backdrop-blur-sm text-white font-medium" style={{ borderColor: '#cad95e' }}>
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
                    <Label htmlFor="motivation" className="font-medium" style={{ color: '#cad95e' }}>
                      ¿Qué te motiva a viajar de manera sostenible?
                    </Label>
                    <Textarea
                      id="motivation"
                      value={formData.motivation}
                      onChange={(e) => handleInputChange('motivation', e.target.value)}
                      placeholder="Comparte tu motivación para el turismo consciente..."
                      className="border-2 bg-white/10 backdrop-blur-sm text-white font-medium placeholder-white/60 min-h-[100px]"
                      style={{ borderColor: '#cad95e' }}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t-2" style={{ borderColor: '#cad95e' }}>
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <Link to="/portal-viajeros">
                    <Button variant="ghost" className="hover:bg-white/20" style={{ color: '#cad95e' }}>
                      ← Explorar sin registrarse
                    </Button>
                  </Link>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link to="/auth/consentidos">
                      <Button
                        variant="outline"
                        className="border-2 bg-transparent hover:bg-[#cad95e]/10 w-full sm:w-auto"
                        style={{ borderColor: '#cad95e', color: '#cad95e' }}
                      >
                        Ya tengo cuenta - Iniciar sesión
                      </Button>
                    </Link>
                    <Button
                      type="submit"
                      className="border-2 border-[#cad95e] bg-transparent hover:bg-[#cad95e]/10 px-8 py-3 text-lg font-medium"
                      style={{ color: '#cad95e' }}
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
            <p className="text-sm" style={{ color: '#cad95e' }}>
              ¿Tienes una empresa de turismo sostenible?{" "}
              <Link to="/registro" className="hover:underline font-medium" style={{ color: '#cad95e' }}>
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