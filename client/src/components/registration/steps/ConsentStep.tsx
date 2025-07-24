
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
    <form onSubmit={onNext ? onNext : onSubmit} className="space-y-6">
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
            <Label htmlFor="acceptTerms" className="text-black font-bold text-base flex flex-col gap-2">
              <span className="flex items-center gap-1">
                Acepto los términos y condiciones de participación*
              </span>
              <div className="font-medium text-black text-sm">
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
            <Label htmlFor="acceptUpdates" className="text-black font-bold text-base flex flex-col gap-2">
              <span>Deseo recibir noticias y actualizaciones del Festival NATUR</span>
              <span className="font-medium text-black text-sm">
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
          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold px-8 py-6 text-lg disabled:opacity-50 shadow-xl"
        >
          Continuar
        </Button>
      </div>
    </form>
  );
};

export default ConsentStep;
