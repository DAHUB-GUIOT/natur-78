
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
          className="text-[#FCF8EE] hover:text-[#EDFF60] hover:bg-transparent p-0 mr-4"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-gasoek text-[#EDFF60] tracking-wide uppercase">
          Datos personales / de organización
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-[#FCF8EE]">
            Nombre completo / Nombre de la organización*
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Ingresa tu nombre completo o el de tu organización"
            className="bg-[#FCF8EE]/10 border-[#FCF8EE]/30 text-[#FCF8EE] placeholder:text-[#FCF8EE]/50"
          />
        </div>
        
        <div>
          <Label htmlFor="email" className="text-[#FCF8EE]">
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
            className="bg-[#FCF8EE]/10 border-[#FCF8EE]/30 text-[#FCF8EE] placeholder:text-[#FCF8EE]/50"
          />
        </div>
        
        <div>
          <Label htmlFor="phone" className="text-[#FCF8EE]">
            Número de contacto (WhatsApp opcional)
          </Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+57 300 000 0000"
            className="bg-[#FCF8EE]/10 border-[#FCF8EE]/30 text-[#FCF8EE] placeholder:text-[#FCF8EE]/50"
          />
        </div>
        
        <div>
          <Label htmlFor="location" className="text-[#FCF8EE]">
            Ciudad y país*
          </Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="Bogotá, Colombia"
            className="bg-[#FCF8EE]/10 border-[#FCF8EE]/30 text-[#FCF8EE] placeholder:text-[#FCF8EE]/50"
          />
        </div>
        
        <div>
          <Label htmlFor="website" className="text-[#FCF8EE]">
            Página web / redes sociales (opcional)
          </Label>
          <Input
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="https://example.com o @username"
            className="bg-[#FCF8EE]/10 border-[#FCF8EE]/30 text-[#FCF8EE] placeholder:text-[#FCF8EE]/50"
          />
        </div>
        
        <div>
          <Label htmlFor="referral" className="text-[#FCF8EE]">
            ¿Cómo te enteraste del Festival NATUR?*
          </Label>
          <Input
            id="referral"
            name="referral"
            value={formData.referral}
            onChange={handleChange}
            required
            placeholder="Redes sociales, amigos, etc."
            className="bg-[#FCF8EE]/10 border-[#FCF8EE]/30 text-[#FCF8EE] placeholder:text-[#FCF8EE]/50"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button 
          type="submit" 
          className="bg-[#EDFF60] text-[#191C0F] hover:bg-[#CEDD9F] px-8 py-6 text-lg"
        >
          Continuar
        </Button>
      </div>
    </form>
  );
};

export default PersonalInfoStep;
