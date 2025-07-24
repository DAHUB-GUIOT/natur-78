import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";
import { CategoryType } from "../RegistrationForm";

interface AdditionalInfoStepProps {
  category: CategoryType;
  subcategory: string;
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const AdditionalInfoStep = ({
  category,
  subcategory,
  formData,
  updateFormData,
  onNext,
  onBack,
}: AdditionalInfoStepProps) => {
  const handleCheckboxChange = (field: string, subfield: string) => (checked: boolean) => {
    updateFormData({
      [field]: {
        ...formData[field],
        [subfield]: checked,
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  const handleWantsSeal = (checked: boolean) => {
    updateFormData({ wantsSeal: checked });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const renderAttendeeFields = () => (
    <div className="space-y-4">
      <p className="text-[#FCF8EE]">¿Qué tipo de experiencias te interesan?</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="ecotourism"
            checked={formData.interests.ecotourism}
            onCheckedChange={handleCheckboxChange("interests", "ecotourism")}
          />
          <Label htmlFor="ecotourism" className="text-[#FCF8EE]">Ecoturismo</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="communityTourism"
            checked={formData.interests.communityTourism}
            onCheckedChange={handleCheckboxChange("interests", "communityTourism")}
          />
          <Label htmlFor="communityTourism" className="text-[#FCF8EE]">Turismo comunitario</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="culturalTourism"
            checked={formData.interests.culturalTourism}
            onCheckedChange={handleCheckboxChange("interests", "culturalTourism")}
          />
          <Label htmlFor="culturalTourism" className="text-[#FCF8EE]">Turismo cultural y creativo</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="slowTravel"
            checked={formData.interests.slowTravel}
            onCheckedChange={handleCheckboxChange("interests", "slowTravel")}
          />
          <Label htmlFor="slowTravel" className="text-[#FCF8EE]">Workation / Slow Travel</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="workshops"
            checked={formData.interests.workshops}
            onCheckedChange={handleCheckboxChange("interests", "workshops")}
          />
          <Label htmlFor="workshops" className="text-[#FCF8EE]">Formación y talleres</Label>
        </div>
      </div>
    </div>
  );

  const renderSponsorFields = () => (
    <div className="space-y-4">
      <p className="text-[#FCF8EE]">¿Qué tipo de participación te interesa?</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="sponsorActivities"
            checked={formData.participationType.sponsorActivities}
            onCheckedChange={handleCheckboxChange("participationType", "sponsorActivities")}
          />
          <Label htmlFor="sponsorActivities" className="text-[#FCF8EE]">Patrocinar actividades o escenarios</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="installStand"
            checked={formData.participationType.installStand}
            onCheckedChange={handleCheckboxChange("participationType", "installStand")}
          />
          <Label htmlFor="installStand" className="text-[#FCF8EE]">Instalar un stand</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="brandExposure"
            checked={formData.participationType.brandExposure}
            onCheckedChange={handleCheckboxChange("participationType", "brandExposure")}
          />
          <Label htmlFor="brandExposure" className="text-[#FCF8EE]">Difundir marca en app y redes</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="productSupport"
            checked={formData.participationType.productSupport}
            onCheckedChange={handleCheckboxChange("participationType", "productSupport")}
          />
          <Label htmlFor="productSupport" className="text-[#FCF8EE]">Apoyar con productos/servicios</Label>
        </div>
      </div>

      <div>
        <Label htmlFor="proposal" className="text-[#FCF8EE]">¿Tienes una propuesta específica?</Label>
        <Textarea
          id="proposal"
          name="proposal"
          value={formData.proposal}
          onChange={handleChange}
          placeholder="Descríbenos tu propuesta..."
          className="bg-[#FCF8EE]/10 border-[#FCF8EE]/30 text-[#FCF8EE] placeholder:text-[#FCF8EE]/50"
        />
      </div>
    </div>
  );

  const renderEcosystemFields = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="wantsSeal"
          checked={formData.wantsSeal}
          onCheckedChange={handleWantsSeal}
        />
        <Label htmlFor="wantsSeal" className="text-[#FCF8EE]">¿Quieres optar al Sello NATUR?</Label>
      </div>

      <div>
        <Label htmlFor="servicesOffered" className="text-[#FCF8EE]">¿Qué servicios o experiencias ofreces?*</Label>
        <Textarea
          id="servicesOffered"
          name="servicesOffered"
          value={formData.servicesOffered}
          onChange={handleChange}
          required
          placeholder="Describe tus servicios o experiencias..."
          className="bg-[#FCF8EE]/10 border-[#FCF8EE]/30 text-[#FCF8EE] placeholder:text-[#FCF8EE]/50"
        />
      </div>

      <div>
        <Label htmlFor="certifications" className="text-[#FCF8EE]">¿Ya cuentas con certificaciones previas? (opcional)</Label>
        <Input
          id="certifications"
          name="certifications"
          value={formData.certifications}
          onChange={handleChange}
          placeholder="Certificaciones de sostenibilidad, turismo responsable, etc."
          className="bg-[#FCF8EE]/10 border-[#FCF8EE]/30 text-[#FCF8EE] placeholder:text-[#FCF8EE]/50"
        />
      </div>
    </div>
  );

  const renderStartupFields = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="startupName" className="text-[#FCF8EE]">Nombre de tu startup*</Label>
        <Input
          id="startupName"
          name="startupName"
          value={formData.startupName}
          onChange={handleChange}
          required
          placeholder="Nombre de tu emprendimiento o solución"
          className="bg-[#FCF8EE]/10 border-[#FCF8EE]/30 text-[#FCF8EE] placeholder:text-[#FCF8EE]/50"
        />
      </div>

      <div>
        <Label htmlFor="problemSolved" className="text-[#FCF8EE]">¿Qué problema resuelves en el turismo sostenible?*</Label>
        <Textarea
          id="problemSolved"
          name="problemSolved"
          value={formData.problemSolved}
          onChange={handleChange}
          required
          placeholder="Describe el problema que resuelve tu startup..."
          className="bg-[#FCF8EE]/10 border-[#FCF8EE]/30 text-[#FCF8EE] placeholder:text-[#FCF8EE]/50"
        />
      </div>

      <div>
        <Label htmlFor="startupWebsite" className="text-[#FCF8EE]">Sitio web o redes sociales (opcional)</Label>
        <Input
          id="startupWebsite"
          name="startupWebsite"
          value={formData.startupWebsite}
          onChange={handleChange}
          placeholder="URL de tu sitio web o perfiles sociales"
          className="bg-[#FCF8EE]/10 border-[#FCF8EE]/30 text-[#FCF8EE] placeholder:text-[#FCF8EE]/50"
        />
      </div>

      <div className="space-y-2">
        <p className="text-[#FCF8EE]">¿Qué tipo de apoyo te interesa?</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="visibility"
              checked={formData.supportNeeded.visibility}
              onCheckedChange={handleCheckboxChange("supportNeeded", "visibility")}
            />
            <Label htmlFor="visibility" className="text-[#FCF8EE]">Visibilidad en el festival</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="marketplace"
              checked={formData.supportNeeded.marketplace}
              onCheckedChange={handleCheckboxChange("supportNeeded", "marketplace")}
            />
            <Label htmlFor="marketplace" className="text-[#FCF8EE]">Espacio en el marketplace</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="networking"
              checked={formData.supportNeeded.networking}
              onCheckedChange={handleCheckboxChange("supportNeeded", "networking")}
            />
            <Label htmlFor="networking" className="text-[#FCF8EE]">Networking con aliados</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="funding"
              checked={formData.supportNeeded.funding}
              onCheckedChange={handleCheckboxChange("supportNeeded", "funding")}
            />
            <Label htmlFor="funding" className="text-[#FCF8EE]">Acceso a fondos o inversión</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="incubation"
              checked={formData.supportNeeded.incubation}
              onCheckedChange={handleCheckboxChange("supportNeeded", "incubation")}
            />
            <Label htmlFor="incubation" className="text-[#FCF8EE]">Programas de incubación/aceleración</Label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCategoryFields = () => {
    switch (category) {
      case "startup":
        return renderStartupFields();
      case "attendee":
        return renderAttendeeFields();
      case "sponsor":
        return renderSponsorFields();
      case "ecosystem":
        return renderEcosystemFields();
      default:
        return null;
    }
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
          Información adicional
        </h2>
      </div>

      {renderCategoryFields()}

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

export default AdditionalInfoStep;
