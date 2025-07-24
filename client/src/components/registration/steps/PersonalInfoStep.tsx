
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
          className="hover:bg-transparent p-0 mr-4"
          style={{ color: '#EDFF60' }}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-xl sm:text-2xl font-gasoek tracking-wide uppercase font-bold" style={{ color: '#EDFF60' }}>
          Datos personales / de organización
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="font-bold text-base sm:text-lg" style={{ color: '#EDFF60' }}>
            Nombre completo / Nombre de la organización*
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Ingresa tu nombre completo o el de tu organización"
            className="border-2 border-[#EDFF60] focus:border-[#EDFF60] bg-transparent font-medium mt-2"
            style={{ color: '#EDFF60' }}
          />
        </div>
        
        <div>
          <Label htmlFor="email" className="font-bold text-base sm:text-lg" style={{ color: '#EDFF60' }}>
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
            className="border-2 border-[#EDFF60] focus:border-[#EDFF60] bg-transparent font-medium mt-2"
            style={{ color: '#EDFF60' }}
          />
        </div>
        
        <div>
          <Label htmlFor="phone" className="font-bold text-base sm:text-lg" style={{ color: '#EDFF60' }}>
            Número de contacto (WhatsApp opcional)
          </Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+57 300 000 0000"
            className="border-2 border-[#EDFF60] focus:border-[#EDFF60] bg-transparent font-medium mt-2"
            style={{ color: '#EDFF60' }}
          />
        </div>
        
        <div>
          <Label htmlFor="location" className="font-bold text-base sm:text-lg" style={{ color: '#EDFF60' }}>
            Ciudad y país*
          </Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="Bogotá, Colombia"
            className="border-2 border-[#EDFF60] focus:border-[#EDFF60] bg-transparent font-medium mt-2"
            style={{ color: '#EDFF60' }}
          />
        </div>
        
        <div>
          <Label htmlFor="website" className="font-bold text-base sm:text-lg" style={{ color: '#EDFF60' }}>
            Página web / redes sociales (opcional)
          </Label>
          <Input
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="https://example.com o @username"
            className="border-2 border-[#EDFF60] focus:border-[#EDFF60] bg-transparent font-medium mt-2"
            style={{ color: '#EDFF60' }}
          />
        </div>
        
        <div>
          <Label htmlFor="referral" className="font-bold text-base sm:text-lg" style={{ color: '#EDFF60' }}>
            ¿Cómo te enteraste del Festival NATUR?*
          </Label>
          <Input
            id="referral"
            name="referral"
            value={formData.referral}
            onChange={handleChange}
            required
            placeholder="Redes sociales, amigos, etc."
            className="border-2 border-[#EDFF60] focus:border-[#EDFF60] bg-transparent font-medium mt-2"
            style={{ color: '#EDFF60' }}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button 
          type="submit" 
          className="border-2 border-[#EDFF60] bg-transparent hover:bg-[#EDFF60]/10 font-bold px-6 py-3 text-base shadow-lg"
          style={{ color: '#EDFF60' }}
        >
          Continuar
        </Button>
      </div>
    </form>
  );
};

export default PersonalInfoStep;
