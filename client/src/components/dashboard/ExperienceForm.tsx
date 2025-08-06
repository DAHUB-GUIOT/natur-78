import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Upload, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const ExperienceForm = ({ onClose }: { onClose: () => void }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    // Basic Information
    title: "",
    modality: "",
    type: "regular", // regular/shared
    
    // Pricing
    adultPrice: { net: "", pvp: "" },
    childPrice: { net: "", pvp: "" },
    seniorPrice: { net: "", pvp: "" },
    babyPrice: "gratis",
    commission: "25",
    
    // Tour Details
    description: "",
    duration: "",
    included: "",
    notIncluded: "",
    
    // Operation Details
    operationDays: "",
    operationHours: "",
    meetingPoint: "",
    hotelTransfer: false,
    cutOff: "12", // hours
    minimumPeople: "",
    
    // Accessibility & Requirements
    wheelchairAccessible: "no",
    petsAllowed: false,
    minimumAge: "",
    closedDays: "",
    
    // Additional Info
    foodIncluded: false,
    foodDetails: "",
    activeTourism: {
      distance: "",
      altitude: "",
      difficulty: "",
      restrictions: ""
    },
    
    // Policies
    cancellationPolicy: "",
    voucherInfo: "",
    faqs: "",
    additionalQuestions: "",
    
    // Languages & Guide
    languages: [] as string[],
    guideType: "",
    
    // Passenger Data Required
    passengerData: {
      name: false,
      surname: false,
      document: false,
      age: false,
      nationality: false,
      birthDate: false
    }
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  const languageOptions = [
    "Español", "Inglés", "Portugués", "Francés", "Italiano", "Alemán"
  ];

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as any),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleLanguageToggle = (language: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Información Básica</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white text-sm">Título Original</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Ej: Tour de Café Sostenible"
                  className="bg-white/10 border-white/30 text-white placeholder-white/60 text-sm h-8"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-white text-sm">Modalidad</Label>
                <Input
                  value={formData.modality}
                  onChange={(e) => handleInputChange('modality', e.target.value)}
                  placeholder="Ej: Con recogida y comida"
                  className="bg-white/10 border-white/30 text-white placeholder-white/60 text-sm h-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white text-sm">Tipo de Tour</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger className="bg-white/10 border-white/30 text-white text-sm h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="regular">Regular</SelectItem>
                  <SelectItem value="compartido">Compartido</SelectItem>
                  <SelectItem value="privado">Privado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-white text-sm">Idiomas Disponibles</Label>
              <div className="grid grid-cols-2 gap-2">
                {languageOptions.map((lang) => (
                  <div key={lang} className="flex items-center space-x-2">
                    <Checkbox
                      checked={formData.languages.includes(lang)}
                      onCheckedChange={() => handleLanguageToggle(lang)}
                      className="border-white/30"
                    />
                    <Label className="text-white text-xs">{lang}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white text-sm">Tipo de Guía</Label>
              <Select value={formData.guideType} onValueChange={(value) => handleInputChange('guideType', value)}>
                <SelectTrigger className="bg-white/10 border-white/30 text-white text-sm h-8">
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="con-guia">Con guía</SelectItem>
                  <SelectItem value="solo-chofer">Solo chofer</SelectItem>
                  <SelectItem value="audioguia">Audioguía</SelectItem>
                  <SelectItem value="autoguiado">Autoguiado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Tarifas y Precios</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-white/5 border-white/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-white">Adultos (18-60 años)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <Label className="text-white text-xs">NET (Proveedor)</Label>
                      <Input
                        value={formData.adultPrice.net}
                        onChange={(e) => handleInputChange('adultPrice.net', e.target.value)}
                        placeholder="75.000"
                        className="bg-white/10 border-white/30 text-white text-sm h-7"
                      />
                    </div>
                    <div className="flex-1">
                      <Label className="text-white text-xs">PVP (Cliente)</Label>
                      <Input
                        value={formData.adultPrice.pvp}
                        onChange={(e) => handleInputChange('adultPrice.pvp', e.target.value)}
                        placeholder="100.000"
                        className="bg-white/10 border-white/30 text-white text-sm h-7"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-white">Niños (5-18 años)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <Label className="text-white text-xs">NET</Label>
                      <Input
                        value={formData.childPrice.net}
                        onChange={(e) => handleInputChange('childPrice.net', e.target.value)}
                        placeholder="37.500"
                        className="bg-white/10 border-white/30 text-white text-sm h-7"
                      />
                    </div>
                    <div className="flex-1">
                      <Label className="text-white text-xs">PVP</Label>
                      <Input
                        value={formData.childPrice.pvp}
                        onChange={(e) => handleInputChange('childPrice.pvp', e.target.value)}
                        placeholder="50.000"
                        className="bg-white/10 border-white/30 text-white text-sm h-7"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-white">Mayores (+60 años)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <Label className="text-white text-xs">NET</Label>
                      <Input
                        value={formData.seniorPrice.net}
                        onChange={(e) => handleInputChange('seniorPrice.net', e.target.value)}
                        placeholder="56.250"
                        className="bg-white/10 border-white/30 text-white text-sm h-7"
                      />
                    </div>
                    <div className="flex-1">
                      <Label className="text-white text-xs">PVP</Label>
                      <Input
                        value={formData.seniorPrice.pvp}
                        onChange={(e) => handleInputChange('seniorPrice.pvp', e.target.value)}
                        placeholder="75.000"
                        className="bg-white/10 border-white/30 text-white text-sm h-7"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-white">Bebés (-5 años)</CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge className="bg-green-600 text-white text-xs">Gratis</Badge>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-2">
              <Label className="text-white text-sm">Comisión (%)</Label>
              <Input
                value={formData.commission}
                onChange={(e) => handleInputChange('commission', e.target.value)}
                placeholder="25"
                className="bg-white/10 border-white/30 text-white text-sm h-8 w-24"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Descripción e Itinerario</h3>
            
            <div className="space-y-3">
              <div className="space-y-2">
                <Label className="text-white text-sm">Descripción Completa del Tour</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describir el itinerario paso a paso. Indicar lugar y hora de finalización del tour..."
                  className="bg-white/10 border-white/30 text-white placeholder-white/60 text-sm min-h-[150px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white text-sm">Duración Total</Label>
                  <Input
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    placeholder="Ej: 10h - tiempo total tour, 3h30 - traslados"
                    className="bg-white/10 border-white/30 text-white placeholder-white/60 text-sm h-8"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white text-sm">Edad Mínima</Label>
                  <Input
                    value={formData.minimumAge}
                    onChange={(e) => handleInputChange('minimumAge', e.target.value)}
                    placeholder="Ej: 12 años"
                    className="bg-white/10 border-white/30 text-white placeholder-white/60 text-sm h-8"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white text-sm">¿Es actividad de turismo activo?</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <Input
                    value={formData.activeTourism.distance}
                    onChange={(e) => handleInputChange('activeTourism.distance', e.target.value)}
                    placeholder="Extensión (km)"
                    className="bg-white/10 border-white/30 text-white placeholder-white/60 text-sm h-8"
                  />
                  <Input
                    value={formData.activeTourism.altitude}
                    onChange={(e) => handleInputChange('activeTourism.altitude', e.target.value)}
                    placeholder="Altitud (m)"
                    className="bg-white/10 border-white/30 text-white placeholder-white/60 text-sm h-8"
                  />
                  <Select value={formData.activeTourism.difficulty} onValueChange={(value) => handleInputChange('activeTourism.difficulty', value)}>
                    <SelectTrigger className="bg-white/10 border-white/30 text-white text-sm h-8">
                      <SelectValue placeholder="Nivel de dificultad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="facil">Fácil</SelectItem>
                      <SelectItem value="medio">Medio</SelectItem>
                      <SelectItem value="dificil">Difícil</SelectItem>
                      <SelectItem value="extremo">Extremo</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    value={formData.activeTourism.restrictions}
                    onChange={(e) => handleInputChange('activeTourism.restrictions', e.target.value)}
                    placeholder="Restricciones"
                    className="bg-white/10 border-white/30 text-white placeholder-white/60 text-sm h-8"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Incluido y No Incluido</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white text-sm">¿Incluye Comida?</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.foodIncluded}
                    onCheckedChange={(checked) => handleInputChange('foodIncluded', checked)}
                    className="border-white/30"
                  />
                  <Label className="text-white text-xs">Sí, incluye comida</Label>
                </div>
              </div>

              {formData.foodIncluded && (
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-white text-sm">Detalles de la Comida</Label>
                  <Textarea
                    value={formData.foodDetails}
                    onChange={(e) => handleInputChange('foodDetails', e.target.value)}
                    placeholder="Indicar hora, lugar, menú, opciones vegetarianas..."
                    className="bg-white/10 border-white/30 text-white placeholder-white/60 text-sm"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white text-sm">Incluido en el Precio</Label>
                <Textarea
                  value={formData.included}
                  onChange={(e) => handleInputChange('included', e.target.value)}
                  placeholder="Guía, comida, traslados, fotos de cortesía..."
                  className="bg-white/10 border-white/30 text-white placeholder-white/60 text-sm min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white text-sm">No Incluido</Label>
                <Textarea
                  value={formData.notIncluded}
                  onChange={(e) => handleInputChange('notIncluded', e.target.value)}
                  placeholder="Bebidas, entradas adicionales, propinas..."
                  className="bg-white/10 border-white/30 text-white placeholder-white/60 text-sm min-h-[100px]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white text-sm">Preguntas Adicionales para Reserva</Label>
              <Textarea
                value={formData.additionalQuestions}
                onChange={(e) => handleInputChange('additionalQuestions', e.target.value)}
                placeholder="Ej: ¿Tienes alguna alergia o intolerancia alimentaria?"
                className="bg-white/10 border-white/30 text-white placeholder-white/60 text-sm"
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Operación y Logística</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white text-sm">Días y Horarios de Operación</Label>
                <Textarea
                  value={formData.operationDays}
                  onChange={(e) => handleInputChange('operationDays', e.target.value)}
                  placeholder="Ej: Todos los días del año, 07:00 a 08:00 - pick-up hoteles, 08:00 - comienzo del tour"
                  className="bg-white/10 border-white/30 text-white placeholder-white/60 text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white text-sm">Punto de Encuentro</Label>
                <Textarea
                  value={formData.meetingPoint}
                  onChange={(e) => handleInputChange('meetingPoint', e.target.value)}
                  placeholder="Ej: Shopping Beira Mar - entrada principal (Calle Don Emilio, 57)"
                  className="bg-white/10 border-white/30 text-white placeholder-white/60 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-white text-sm">Cut Off (horas antes)</Label>
                <Input
                  value={formData.cutOff}
                  onChange={(e) => handleInputChange('cutOff', e.target.value)}
                  placeholder="12"
                  className="bg-white/10 border-white/30 text-white text-sm h-8"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white text-sm">Mínimo de Personas</Label>
                <Input
                  value={formData.minimumPeople}
                  onChange={(e) => handleInputChange('minimumPeople', e.target.value)}
                  placeholder="2-3 personas"
                  className="bg-white/10 border-white/30 text-white text-sm h-8"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white text-sm">Días de Cierre</Label>
                <Input
                  value={formData.closedDays}
                  onChange={(e) => handleInputChange('closedDays', e.target.value)}
                  placeholder="25/12, 01/01"
                  className="bg-white/10 border-white/30 text-white text-sm h-8"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={formData.hotelTransfer}
                  onCheckedChange={(checked) => handleInputChange('hotelTransfer', checked)}
                  className="border-white/30"
                />
                <Label className="text-white text-sm">Incluye traslado desde/hacia hotel</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={formData.petsAllowed}
                  onCheckedChange={(checked) => handleInputChange('petsAllowed', checked)}
                  className="border-white/30"
                />
                <Label className="text-white text-sm">Permite mascotas</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white text-sm">Accesibilidad para Silla de Ruedas</Label>
              <Select value={formData.wheelchairAccessible} onValueChange={(value) => handleInputChange('wheelchairAccessible', value)}>
                <SelectTrigger className="bg-white/10 border-white/30 text-white text-sm h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">No accesible</SelectItem>
                  <SelectItem value="parcial">Parcialmente accesible</SelectItem>
                  <SelectItem value="total">Totalmente accesible</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Políticas y Datos de Pasajeros</h3>
            
            <div className="space-y-3">
              <div className="space-y-2">
                <Label className="text-white text-sm">Política de Cancelación</Label>
                <Textarea
                  value={formData.cancellationPolicy}
                  onChange={(e) => handleInputChange('cancellationPolicy', e.target.value)}
                  placeholder="Ej: Cancelación gratuita: 24h, Menos de 24h: no reembolsable"
                  className="bg-white/10 border-white/30 text-white placeholder-white/60 text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white text-sm">Información del Voucher</Label>
                <Textarea
                  value={formData.voucherInfo}
                  onChange={(e) => handleInputChange('voucherInfo', e.target.value)}
                  placeholder="Datos imprescindibles que deben aparecer en el voucher del cliente"
                  className="bg-white/10 border-white/30 text-white placeholder-white/60 text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white text-sm">FAQs - Preguntas Frecuentes</Label>
                <Textarea
                  value={formData.faqs}
                  onChange={(e) => handleInputChange('faqs', e.target.value)}
                  placeholder="P: ¿El vehículo tiene baño? R: Sí."
                  className="bg-white/10 border-white/30 text-white placeholder-white/60 text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white text-sm">Datos de Pasajeros Requeridos</Label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(formData.passengerData).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      checked={value}
                      onCheckedChange={(checked) => handleInputChange(`passengerData.${key}`, checked)}
                      className="border-white/30"
                    />
                    <Label className="text-white text-xs capitalize">
                      {key === 'name' ? 'Nombre' : 
                       key === 'surname' ? 'Apellidos' :
                       key === 'document' ? 'Número de documento' :
                       key === 'age' ? 'Edad' :
                       key === 'nationality' ? 'Nacionalidad' :
                       key === 'birthDate' ? 'Fecha de nacimiento' : key}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const createExperienceMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest(`/api/experiences`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: data.title,
          modality: data.modality,
          type: data.type,
          category: "experiencia", // Default category for experiences
          adultPriceNet: data.adultPrice.net,
          adultPricePvp: data.adultPrice.pvp,
          childPriceNet: data.childPrice.net,
          childPricePvp: data.childPrice.pvp,
          seniorPriceNet: data.seniorPrice.net,
          seniorPricePvp: data.seniorPrice.pvp,
          commission: data.commission,
          description: data.description,
          duration: data.duration,
          included: data.included,
          notIncluded: data.notIncluded,
          operationDays: data.operationDays,
          operationHours: data.operationHours,
          meetingPoint: data.meetingPoint,
          hotelTransfer: data.hotelTransfer,
          cutOff: data.cutOff,
          minimumPeople: data.minimumPeople,
          wheelchairAccessible: data.wheelchairAccessible,
          petsAllowed: data.petsAllowed,
          minimumAge: data.minimumAge,
          closedDays: data.closedDays,
          foodIncluded: data.foodIncluded,
          foodDetails: data.foodDetails,
          activeTourismData: data.activeTourism,
          cancellationPolicy: data.cancellationPolicy,
          voucherInfo: data.voucherInfo,
          faqs: data.faqs,
          additionalQuestions: data.additionalQuestions,
          languages: data.languages || [],
          guideType: data.guideType,
          passengerDataRequired: data.passengerData
        }),
      });
    },
    onSuccess: () => {
      toast({
        title: "Experiencia creada",
        description: "Tu experiencia ha sido creada exitosamente.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/experiences'] });
      onClose();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Hubo un error al crear la experiencia.",
        variant: "destructive",
      });
    },
  });

  const handleSave = () => {
    if (!formData.title.trim()) {
      toast({
        title: "Campo requerido",
        description: "El título de la experiencia es obligatorio.",
        variant: "destructive",
      });
      return;
    }

    createExperienceMutation.mutate(formData);
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                i + 1 <= currentStep ? 'bg-blue-500' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
        <p className="text-white/70 text-sm text-center">Paso {currentStep} de {totalSteps}</p>
      </div>

      {/* Form Content */}
      <div className="min-h-[400px]">
        {renderStep()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-white/20">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          className="border-white/30 text-white hover:bg-white/20"
        >
          Anterior
        </Button>

        <div className="flex space-x-2">
          {currentStep === totalSteps ? (
            <Button
              onClick={handleSave}
              disabled={createExperienceMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              {createExperienceMutation.isPending ? "Guardando..." : "Guardar Experiencia"}
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Siguiente
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperienceForm;