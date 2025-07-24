
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";
import TermsAndConditionsDialog from "../TermsAndConditionsDialog";

interface ConsentStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  onSubmit?: (e: React.FormEvent) => void;
  onBack: () => void;
  onNext: () => void;
}

const ConsentStep = ({ formData, updateFormData, onSubmit, onBack, onNext }: ConsentStepProps) => {
  const handleAcceptTerms = (checked: boolean) => {
    updateFormData({ acceptTerms: checked });
  };

  const handleAcceptUpdates = (checked: boolean) => {
    updateFormData({ acceptUpdates: checked });
  };

  return (
    <form onSubmit={onNext ? (e) => { e.preventDefault(); onNext(); } : onSubmit} className="space-y-6">
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
          Consentimiento y envío
        </h2>
      </div>

      <div className="space-y-4 py-4">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="acceptTerms"
            checked={formData.acceptTerms}
            onCheckedChange={handleAcceptTerms}
            required
          />
          <div className="space-y-1 leading-none">
            <Label htmlFor="acceptTerms" className="font-bold text-base flex flex-col gap-2" style={{ color: '#EDFF60' }}>
              <span className="flex items-center gap-1">
                Acepto los términos y condiciones de participación*
              </span>
              <div className="font-medium text-sm" style={{ color: '#EDFF60' }}>
                <p>Al aceptar, confirmas que has leído y estás de acuerdo con nuestras políticas de privacidad
                y los términos de participación en el Festival NATUR.</p>
                <div className="mt-2">
                  <TermsAndConditionsDialog />
                </div>
              </div>
            </Label>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <Checkbox
            id="acceptUpdates"
            checked={formData.acceptUpdates}
            onCheckedChange={handleAcceptUpdates}
          />
          <div className="space-y-1 leading-none">
            <Label htmlFor="acceptUpdates" className="font-bold text-base flex flex-col gap-2" style={{ color: '#EDFF60' }}>
              <span>Deseo recibir noticias y actualizaciones del Festival NATUR</span>
              <span className="font-medium text-sm" style={{ color: '#EDFF60' }}>
                Te mantendremos informado sobre novedades, eventos y oportunidades relacionadas con el festival.
                Puedes darte de baja en cualquier momento.
              </span>
            </Label>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button 
          type="submit" 
          disabled={!formData.acceptTerms}
          className="border-2 border-[#EDFF60] bg-transparent hover:bg-[#EDFF60]/10 font-bold px-6 py-3 text-base disabled:opacity-50 shadow-lg"
          style={{ color: '#EDFF60' }}
        >
          Continuar
        </Button>
      </div>
    </form>
  );
};

export default ConsentStep;
