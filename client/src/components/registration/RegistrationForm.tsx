
import React, { useState } from "react";
import {
  Globe,
  Users,
  GraduationCap,
  UserPlus,
  Briefcase,
  Handshake,
  Star,
  MapPin,
  ChartBar,
  Building2,
  Map,
  Hotel,
  Heart,
  Utensils,
  GraduationCap as Education,
  Rocket,
  TrendingUp,
  Network,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CategoryStep from "./steps/CategoryStep";
import SubcategoryStep from "./steps/SubcategoryStep";
import PersonalInfoStep from "./steps/PersonalInfoStep";
import AdditionalInfoStep from "./steps/AdditionalInfoStep";
import ConsentStep from "./steps/ConsentStep";
import ProfileSetupStep from "./steps/ProfileSetupStep";
import { useLocation, Link } from "wouter";
import { useToast } from "@/components/ui/use-toast";
import RegistrationAuth from "../auth/RegistrationAuth";
import { createUserProfile } from "@/services/profileService";

export type CategoryType = "sponsor" | "ecosystem" | "startup" | "attendee" | "investor" | "mentor" | "other" | "digital-nomad" | "tour-guide" | "interpreter" | "dmc";
export type SubcategoryType = string;

const RegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | "">("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  // Updated initial form data
  const [formData, setFormData] = useState({
    // Personal info
    name: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    referral: "",
    
    // Interests
    interests: {
      ecotourism: false,
      communityTourism: false,
      culturalTourism: false,
      slowTravel: false,
      workshops: false,
    },
    
    // Sponsor participation
    participationType: {
      sponsorActivities: false,
      installStand: false,
      brandExposure: false,
      productSupport: false,
    },
    proposal: "",
    
    // Ecosystem details
    wantsSeal: false,
    servicesOffered: "",
    certifications: "",
    
    // Consent
    acceptTerms: false,
    acceptUpdates: false,

    // Profile setup
    profileBio: "",
    expertise: "",
    
    // Startup specific fields
    startupName: "",
    problemSolved: "",
    startupStage: "",
    supportNeeded: {
      visibility: false,
      marketplace: false,
      networking: false,
      funding: false,
      incubation: false
    },
    
    // Digital nomad specific fields
    nomadSince: "",
    workStyle: "",
    currentCountry: "",
    visitedCountries: "",
    communitySize: "",
    remoteWorkType: "",
    travelFrequency: "",
    preferredDestinations: "",
    
    // Additional fields for different categories
    yearsOperating: "",
    orgType: "",
    companySize: "",
    budget: "",
    occupation: "",
    expectations: "",
    interestsTags: "",
    foundingYear: "",
  });
  
  const [successMessage, setSuccessMessage] = useState("");
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData({ ...formData, ...data });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleCategorySelect = (category: CategoryType) => {
    setSelectedCategory(category);
    setSelectedSubcategory("");
    nextStep();
  };

  const handleSubcategorySelect = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
    nextStep();
  };

  const handleAuthSuccess = async (user: any) => {
    setIsSubmitting(true);
    try {
      if (user?.id) {
        // Create user profile in database
        await createUserProfile(
          parseInt(user.id), 
          formData, 
          selectedCategory as CategoryType, 
          selectedSubcategory
        );
        
        // Show success message
        setSuccessMessage("¡Registro enviado con éxito! Te enviaremos un correo de confirmación con tu usuario y clave para acceder a tu perfil en la plataforma.");
        
        // Show toast notification
        toast({
          title: "Registro exitoso",
          description: "Tus datos han sido guardados. Te redirigiremos a tu dashboard empresarial.",
          variant: "default",
        });
        
        // After a short delay, redirect to Portal Empresas dashboard
        setTimeout(() => {
          setLocation('/portal-empresas');
        }, 3000);
      } else {
        throw new Error("No se pudo obtener el ID de usuario");
      }
    } catch (error: any) {
      console.error("Error creating profile:", error);
      toast({
        title: "Error al crear perfil",
        description: error.message || "Hubo un problema al crear tu perfil. Por favor intenta nuevamente.",
        variant: "destructive",
      });
      setSuccessMessage(""); // Clear success message on error
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAuthError = (error: any) => {
    console.error("Authentication error:", error);
    setIsSubmitting(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreatingAccount(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <CategoryStep 
            onCategorySelect={handleCategorySelect} 
          />
        );
      case 2:
        return (
          <SubcategoryStep
            category={selectedCategory as CategoryType}
            onSubcategorySelect={handleSubcategorySelect}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <PersonalInfoStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <AdditionalInfoStep
            category={selectedCategory as CategoryType}
            subcategory={selectedSubcategory}
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 5:
        return (
          <ConsentStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 6:
        if (isCreatingAccount && !successMessage) {
          return (
            <div className="py-6">
              <h2 className="text-2xl font-gasoek text-[#cad95e] tracking-wide uppercase mb-6">
                Crea tu cuenta en la plataforma
              </h2>
              <RegistrationAuth 
                email={formData.email} 
                onSuccess={handleAuthSuccess}
                onError={handleAuthError}
              />
            </div>
          );
        }
        return (
          <ProfileSetupStep
            formData={formData}
            updateFormData={updateFormData}
            onSubmit={handleSubmit}
            onBack={prevStep}
            successMessage={successMessage}
            category={selectedCategory as CategoryType}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {/* Progress Steps - Simplified without banners */}
      <div className="mb-6">
        <div className="flex justify-between mb-4">
          {[1, 2, 3, 4, 5, 6].map((stepNumber) => (
            <div 
              key={stepNumber}
              className={`flex flex-col items-center ${stepNumber <= step ? "opacity-100" : "opacity-50"}`}
            >
              <div 
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mb-1 sm:mb-2 font-bold border-2 text-xs sm:text-sm
                ${stepNumber < step ? "text-black border-transparent" : 
                  stepNumber === step ? "text-black border-transparent" : "border-[#cad95e]/50"}`}
                style={{ backgroundColor: stepNumber <= step ? '#cad95e' : 'transparent', color: stepNumber <= step ? 'black' : '#cad95e' }}
              >
                {stepNumber < step ? "✓" : stepNumber}
              </div>
              <span className="text-xs hidden sm:block font-bold" style={{ color: '#cad95e' }}>
                {stepNumber === 1 && "Participación"}
                {stepNumber === 2 && "Perfil"}
                {stepNumber === 3 && "Datos"}
                {stepNumber === 4 && "Información"}
                {stepNumber === 5 && "Términos"}
                {stepNumber === 6 && "Plataforma"}
              </span>
            </div>
          ))}
        </div>
        <div className="h-1 sm:h-2 bg-white/20 rounded-full">
          <div 
            className="h-1 sm:h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${(step / 6) * 100}%`,
              backgroundColor: '#cad95e'
            }}
          ></div>
        </div>
      </div>

      {/* Form Content - Transparent with Yellow Outline */}
      <div className="backdrop-blur-sm bg-transparent border-2 border-[#cad95e] rounded-xl p-4 sm:p-6 md:p-8">
        {renderStep()}
      </div>
    </div>
  );
};

export default RegistrationForm;
