
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

interface PersonalInfoStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const PersonalInfoStep = ({ formData, updateFormData, onNext, onBack }: PersonalInfoStepProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-start">
        <Button 
          variant="ghost" 
          onClick={onBack}
          type="button"
          className="text-black hover:text-green-700 hover:bg-transparent p-0 mr-4"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-gasoek text-black tracking-wide uppercase font-bold">
          Datos personales / de organización
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-black font-bold text-lg">
            Nombre completo / Nombre de la organización*
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Ingresa tu nombre completo o el de tu organización"
            className="border-2 border-green-600 focus:border-green-700 text-black font-medium placeholder:text-black/50 mt-2"
          />
        </div>
        
        <div>
          <Label htmlFor="email" className="text-black font-bold text-lg">
            Correo electrónico*
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="correo@ejemplo.com"
            className="border-2 border-green-600 focus:border-green-700 text-black font-medium placeholder:text-black/50 mt-2"
          />
        </div>
        
        <div>
          <Label htmlFor="phone" className="text-black font-bold text-lg">
            Número de contacto (WhatsApp opcional)
          </Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+57 300 000 0000"
            className="border-2 border-green-600 focus:border-green-700 text-black font-medium placeholder:text-black/50 mt-2"
          />
        </div>
        
        <div>
          <Label htmlFor="location" className="text-black font-bold text-lg">
            Ciudad y país*
          </Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="Bogotá, Colombia"
            className="border-2 border-green-600 focus:border-green-700 text-black font-medium placeholder:text-black/50 mt-2"
          />
        </div>
        
        <div>
          <Label htmlFor="website" className="text-black font-bold text-lg">
            Página web / redes sociales (opcional)
          </Label>
          <Input
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="https://example.com o @username"
            className="border-2 border-green-600 focus:border-green-700 text-black font-medium placeholder:text-black/50 mt-2"
          />
        </div>
        
        <div>
          <Label htmlFor="referral" className="text-black font-bold text-lg">
            ¿Cómo te enteraste del Festival NATUR?*
          </Label>
          <Input
            id="referral"
            name="referral"
            value={formData.referral}
            onChange={handleChange}
            required
            placeholder="Redes sociales, amigos, etc."
            className="border-2 border-green-600 focus:border-green-700 text-black font-medium placeholder:text-black/50 mt-2"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button 
          type="submit" 
          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold px-8 py-6 text-lg shadow-xl"
        >
          Continuar
        </Button>
      </div>
    </form>
  );
};

export default PersonalInfoStep;
