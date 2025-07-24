
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Heart } from "lucide-react";
import { useLocation } from "wouter";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CategoryType } from "../RegistrationForm";

interface ProfileSetupStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
  successMessage: string;
  category: CategoryType;
}

const ProfileSetupStep = ({ 
  formData, 
  updateFormData, 
  onSubmit, 
  onBack,
  successMessage,
  category
}: ProfileSetupStepProps) => {
  const [, setLocation] = useLocation();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    updateFormData({ [name]: value });
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    const supportNeeded = { ...formData.supportNeeded, [name]: checked };
    updateFormData({ supportNeeded });
  };

  const handleSubmitAndRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save all form data to localStorage for backup
    localStorage.setItem('userProfileData', JSON.stringify({
      ...formData,
      userCategory: category,
    }));
    
    // Call the original onSubmit to process form submission
    onSubmit(e);
  };

  const renderCategorySpecificFields = () => {
    switch(category) {
      case 'startup':
        return (
          <>
            <div>
              <Label htmlFor="startupName" className="text-[#FCF8EE]">
                Nombre de tu startup*
              </Label>
              <Input
                id="startupName"
                name="startupName"
                value={formData.startupName || ""}
                onChange={handleChange}
                required
                placeholder="Nombre de tu empresa"
                className="bg-[#FCF8EE]/10 border-[#FCF8EE]/30 text-[#FCF8EE] placeholder:text-[#FCF8EE]/50"
              />
            </div>

            <div>
              <Label htmlFor="foundingYear" className="text-[#FCF8EE]">
                Año de fundación*
              </Label>
              <Input
                id="foundingYear"
                name="foundingYear"
                type="number"
                value={formData.foundingYear || ""}
                onChange={handleChange}
                required
                placeholder="2023"
                className="bg-[#FCF8EE]/10 border-[#FCF8EE]/30 text-[#FCF8EE] placeholder:text-[#FCF8EE]/50"
              />
            </div>
            
            <div>
              <Label htmlFor="problemSolved" className="text-[#FCF8EE]">
                Problema que resuelve tu startup*
              </Label>
              <Textarea
                id="problemSolved"
                name="problemSolved"
                value={formData.problemSolved || ""}
                onChange={handleChange}
                required
                placeholder="Describe el problema que resuelve tu startup en el ámbito del turismo sostenible..."
                className="bg-[#FCF8EE]/10 border-[#FCF8EE]/30 text-[#FCF8EE] placeholder:text-[#FCF8EE]/50"
              />
            </div>
            
            <div>
              <Label htmlFor="startupStage" className="text-[#FCF8EE]">
                Etapa de desarrollo*
              </Label>
              <Select
                value={formData.startupStage || ""}
                onValueChange={(value) => handleSelectChange("startupStage", value)}
              >
                <SelectTrigger className="bg-[#FCF8EE]/10 border-[#FCF8EE]/30 text-[#FCF8EE]">
                  <SelectValue placeholder="Selecciona la etapa" />
                </SelectTrigger>
                <SelectContent className="bg-[#222408] border-[#FCF8EE]/30 text-[#FCF8EE]">
                  <SelectItem value="idea">Idea validada</SelectItem>
                  <SelectItem value="mvp">MVP / Producto mínimo viable</SelectItem>
                  <SelectItem value="growth">En crecimiento</SelectItem>
                  <SelectItem value="scaling">En expansión</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              <Label className="text-[#FCF8EE]">
                Tipo de apoyo que necesitas*
              </Label>
              
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="visibility"
                  checked={formData.supportNeeded?.visibility || false}
                  onCheckedChange={(checked) => handleCheckboxChange("visibility", checked as boolean)}
                />
                <Label htmlFor="visibility" className="text-[#FCF8EE] text-sm">
                  Visibilidad y promoción
                </Label>
              </div>
              
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="marketplace"
                  checked={formData.supportNeeded?.marketplace || false}
                  onCheckedChange={(checked) => handleCheckboxChange("marketplace", checked as boolean)}
                />
                <Label htmlFor="marketplace" className="text-[#FCF8EE] text-sm">
                  Acceso al marketplace
                </Label>
              </div>
              
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="networking"
                  checked={formData.supportNeeded?.networking || false}
                  onCheckedChange={(checked) => handleCheckboxChange("networking", checked as boolean)}
                />
                <Label htmlFor="networking" className="text-[#FCF8EE] text-sm">
                  Networking con aliados
                </Label>
              </div>
              
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="funding"
                  checked={formData.supportNeeded?.funding || false}
                  onCheckedChange={(checked) => handleCheckboxChange("funding", checked as boolean)}
                />
                <Label htmlFor="funding" className="text-[#FCF8EE] text-sm">
                  Búsqueda de financiación
                </Label>
              </div>
              
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="incubation"
                  checked={formData.supportNeeded?.incubation || false}
                  onCheckedChange={(checked) => handleCheckboxChange("incubation", checked as boolean)}
                />
                <Label htmlFor="incubation" className="text-[#FCF8EE] text-sm">
                  Incubación/Aceleración
                </Label>
              </div>
            </div>
          </>
        );
        
      case 'ecosystem':
        return (
          <>
            <div>
              <Label htmlFor="orgType" className="text-[#FCF8EE]">
                Tipo de organización*
              </Label>
              <Input
                id="orgType"
                name="orgType"
                value={formData.orgType || ""}
                onChange={handleChange}
                required
                placeholder="Agencia, operador, ONG, etc."
                className="bg-[#FCF8EE]/10 border-[#FCF8EE]/30 text-[#FCF8EE] placeholder:text-[#FCF8EE]/50"
              />
            </div>
            
            <div>
              <Label htmlFor="yearsOperating" className="text-[#FCF8EE]">
                Años de operación*
              </Label>
              <Input
                id="yearsOperating"
                name="yearsOperating"
                type="number"
                value={formData.yearsOperating || ""}
                onChange={handleChange}
                required
                placeholder="5"
                className="bg-[#FCF8EE]/10 border-[#FCF8EE]/30 text-[#FCF8EE] placeholder:text-[#FCF8EE]/50"
              />
            </div>
            
            <div>
              <Label htmlFor="servicesOffered" className="text-[#FCF8EE]">
                Servicios ofrecidos*
              </Label>
              <Textarea
                id="servicesOffered"
                name="servicesOffered"
                value={formData.servicesOffered || ""}
                onChange={handleChange}
                required
                placeholder="Describe los servicios que ofreces relacionados con turismo sostenible..."
                className="bg-[#FCF8EE]/10 border-[#FCF8EE]/30 text-[#FCF8EE] placeholder:text-[#FCF8EE]/50"
              />
            </div>
            
            <div>
              <Label htmlFor="certifications" className="text-[#FCF8EE]">
                Certificaciones (opcional)
              </Label>
              <Textarea
                id="certifications"
                name="certifications"
                value={formData.certifications || ""}
                onChange={handleChange}
                placeholder="Lista tus certificaciones en turismo sostenible..."
                className="bg-[#FCF8EE]/10 border-[#FCF8EE]/30 text-[#FCF8EE] placeholder:text-[#FCF8EE]/50"
              />
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="wantsSeal"
                checked={formData.wantsSeal || false}
                onCheckedChange={(checked) => updateFormData({ wantsSeal: checked })}
              />
              <Label htmlFor="wantsSeal" className="text-[#FCF8EE] text-sm">
                Me interesa obtener el Sello NATUR de turismo regenerativo
              </Label>
            </div>
          </>
        );
        
      case 'sponsor':
        return (
          <>
            <div>
              <Label htmlFor="companySize" className="text-[#FCF8EE]">
                Tamaño de la empresa*
              </Label>
              <Select
                value={formData.companySize || ""}
                onValueChange={(value) => handleSelectChange("companySize", value)}
              >
                <SelectTrigger className="bg-[#FCF8EE]/10 border-[#FCF8EE]/30 text-[#FCF8EE]">
                  <SelectValue placeholder="Selecciona el tamaño" />
                </SelectTrigger>
                <SelectContent className="bg-[#222408] border-[#FCF8EE]/30 text-[#FCF8EE]">
                  <SelectItem value="small">Pequeña (1-50 empleados)</SelectItem>
                  <SelectItem value="medium">Mediana (51-250 empleados)</SelectItem>
                  <SelectItem value="large">Grande (251+ empleados)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="budget" className="text-[#FCF8EE]">
                Presupuesto estimado para patrocinio (opcional)
              </Label>
              <Input
                id="budget"
                name="budget"
                value={formData.budget || ""}
                onChange={handleChange}
                placeholder="Rango aproximado en COP"
                className="bg-[#FCF8EE]/10 border-[#FCF8EE]/30 text-[#FCF8EE] placeholder:text-[#FCF8EE]/50"
              />
            </div>
            
            <div className="space-y-3">
              <Label className="text-[#FCF8EE]">
                Tipo de participación que te interesa*
              </Label>
              
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="sponsorActivities"
                  checked={formData.participationType?.sponsorActivities || false}
                  onCheckedChange={(checked) => {
                    const participationType = { ...formData.participationType, sponsorActivities: checked };
                    updateFormData({ participationType });
                  }}
                />
                <Label htmlFor="sponsorActivities" className="text-[#FCF8EE] text-sm">
                  Patrocinar actividades específicas
                </Label>
              </div>
              
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="installStand"
                  checked={formData.participationType?.installStand || false}
                  onCheckedChange={(checked) => {
                    const participationType = { ...formData.participationType, installStand: checked };
                    updateFormData({ participationType });
                  }}
                />
                <Label htmlFor="installStand" className="text-[#FCF8EE] text-sm">
                  Instalar un stand en el festival
                </Label>
              </div>
              
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="brandExposure"
                  checked={formData.participationType?.brandExposure || false}
                  onCheckedChange={(checked) => {
                    const participationType = { ...formData.participationType, brandExposure: checked };
                    updateFormData({ participationType });
                  }}
                />
                <Label htmlFor="brandExposure" className="text-[#FCF8EE] text-sm">
                  Presencia de marca en materiales
                </Label>
              </div>
              
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="productSupport"
                  checked={formData.participationType?.productSupport || false}
                  onCheckedChange={(checked) => {
                    const participationType = { ...formData.participationType, productSupport: checked };
                    updateFormData({ participationType });
                  }}
                />
                <Label htmlFor="productSupport" className="text-[#FCF8EE] text-sm">
                  Apoyo con productos o servicios
                </Label>
              </div>
            </div>
            
            <div>
              <Label htmlFor="proposal" className="text-[#FCF8EE]">
                Propuesta de patrocinio (opcional)
              </Label>
              <Textarea
                id="proposal"
                name="proposal"
                value={formData.proposal || ""}
                onChange={handleChange}
                placeholder="Describe brevemente tu propuesta de patrocinio o colaboración..."
                className="bg-[#FCF8EE]/10 border-[#FCF8EE]/30 text-[#FCF8EE] placeholder:text-[#FCF8EE]/50"
              />
            </div>
          </>
        );
        
      case 'attendee':
      default:
        return (
          <>
            <div>
              <Label htmlFor="occupation" className="text-[#FCF8EE]">
                Ocupación*
              </Label>
              <Input
                id="occupation"
                name="occupation"
                value={formData.occupation || ""}
                onChange={handleChange}
                required
                placeholder="Profesión o actividad"
                className="bg-[#FCF8EE]/10 border-[#FCF8EE]/30 text-[#FCF8EE] placeholder:text-[#FCF8EE]/50"
              />
            </div>
            
            <div className="space-y-3">
              <Label className="text-[#FCF8EE]">
                Intereses en el festival*
              </Label>
              
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="ecotourism"
                  checked={formData.interests?.ecotourism || false}
                  onCheckedChange={(checked) => {
                    const interests = { ...formData.interests, ecotourism: checked };
                    updateFormData({ interests });
                  }}
                />
                <Label htmlFor="ecotourism" className="text-[#FCF8EE] text-sm">
                  Ecoturismo y naturaleza
                </Label>
              </div>
              
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="communityTourism"
                  checked={formData.interests?.communityTourism || false}
                  onCheckedChange={(checked) => {
                    const interests = { ...formData.interests, communityTourism: checked };
                    updateFormData({ interests });
                  }}
                />
                <Label htmlFor="communityTourism" className="text-[#FCF8EE] text-sm">
                  Turismo comunitario
                </Label>
              </div>
              
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="culturalTourism"
                  checked={formData.interests?.culturalTourism || false}
                  onCheckedChange={(checked) => {
                    const interests = { ...formData.interests, culturalTourism: checked };
                    updateFormData({ interests });
                  }}
                />
                <Label htmlFor="culturalTourism" className="text-[#FCF8EE] text-sm">
                  Turismo cultural
                </Label>
              </div>
              
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="slowTravel"
                  checked={formData.interests?.slowTravel || false}
                  onCheckedChange={(checked) => {
                    const interests = { ...formData.interests, slowTravel: checked };
                    updateFormData({ interests });
                  }}
                />
                <Label htmlFor="slowTravel" className="text-[#FCF8EE] text-sm">
                  Slow travel
                </Label>
              </div>
              
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="workshops"
                  checked={formData.interests?.workshops || false}
                  onCheckedChange={(checked) => {
                    const interests = { ...formData.interests, workshops: checked };
                    updateFormData({ interests });
                  }}
                />
                <Label htmlFor="workshops" className="text-[#FCF8EE] text-sm">
                  Talleres y formación
                </Label>
              </div>
            </div>
            
            <div>
              <Label htmlFor="expectations" className="text-[#FCF8EE]">
                ¿Qué esperas del festival? (opcional)
              </Label>
              <Textarea
                id="expectations"
                name="expectations"
                value={formData.expectations || ""}
                onChange={handleChange}
                placeholder="Cuéntanos qué te gustaría experimentar o aprender en el festival..."
                className="bg-[#FCF8EE]/10 border-[#FCF8EE]/30 text-[#FCF8EE] placeholder:text-[#FCF8EE]/50"
              />
            </div>
          </>
        );
    }
  };

  return (
    <form onSubmit={handleSubmitAndRedirect} className="space-y-6">
      <div className="flex items-start">
        <Button 
          variant="ghost" 
          onClick={onBack}
          type="button"
          className="text-[#FCF8EE] hover:text-[#EDFF60] hover:bg-transparent p-0 mr-4"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-2xl font-gasoek text-[#EDFF60] tracking-wide uppercase">
            Configura tu perfil en la plataforma
          </h2>
          <Badge variant="outline" className="mt-2 bg-[#EDFF60]/10 text-[#EDFF60] border-[#EDFF60]/20">
            {category === 'startup' && 'Startup'}
            {category === 'ecosystem' && 'Ecosistema'}
            {category === 'sponsor' && 'Patrocinador'}
            {category === 'attendee' && 'Asistente'}
          </Badge>
        </div>
      </div>

      <ScrollArea className="max-h-[400px] pr-4">
        <div className="space-y-6 pb-4">
          <div>
            <Label htmlFor="profileBio" className="text-[#FCF8EE]">
              Descripción breve de tu perfil*
            </Label>
            <Textarea
              id="profileBio"
              name="profileBio"
              value={formData.profileBio || ""}
              onChange={handleChange}
              required
              placeholder="Cuéntanos un poco sobre ti o tu organización..."
              className="bg-[#FCF8EE]/10 border-[#FCF8EE]/30 text-[#FCF8EE] placeholder:text-[#FCF8EE]/50"
            />
          </div>

          <div>
            <Label htmlFor="interests" className="text-[#FCF8EE]">
              Intereses principales*
            </Label>
            <Input
              id="interests"
              name="interests"
              value={formData.interestsTags || ""}
              onChange={(e) => updateFormData({ interestsTags: e.target.value })}
              required
              placeholder="Turismo regenerativo, sostenibilidad, cultura local..."
              className="bg-[#FCF8EE]/10 border-[#FCF8EE]/30 text-[#FCF8EE] placeholder:text-[#FCF8EE]/50"
            />
          </div>

          <div>
            <Label htmlFor="expertise" className="text-[#FCF8EE]">
              Áreas de experiencia (opcional)
            </Label>
            <Input
              id="expertise"
              name="expertise"
              value={formData.expertise || ""}
              onChange={handleChange}
              placeholder="Ecoturismo, guía local, gastronomía..."
              className="bg-[#FCF8EE]/10 border-[#FCF8EE]/30 text-[#FCF8EE] placeholder:text-[#FCF8EE]/50"
            />
          </div>
          
          {renderCategorySpecificFields()}
        </div>
      </ScrollArea>

      {successMessage ? (
        <div className="space-y-4">
          <div className="bg-[#EDFF60]/10 border border-[#EDFF60] rounded-md p-4 text-[#EDFF60]">
            {successMessage}
          </div>
          <div className="flex justify-center">
            <Button 
              onClick={() => window.location.href = '/heart'}
              className="bg-[#EDFF60] text-[#191C0F] hover:bg-[#CEDD9F] px-8 py-6 text-lg font-gasoek tracking-wide uppercase flex items-center gap-2"
            >
              <Heart className="h-5 w-5" />
              Corazón NATUR
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex justify-end">
          <Button 
            type="submit" 
            className="bg-[#EDFF60] text-[#191C0F] hover:bg-[#CEDD9F] px-8 py-6 text-lg"
          >
            Finalizar Registro
          </Button>
        </div>
      )}
    </form>
  );
};

export default ProfileSetupStep;
