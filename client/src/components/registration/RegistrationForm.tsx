
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

export type CategoryType = "sponsor" | "ecosystem" | "startup";
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
              <h2 className="text-2xl font-gasoek text-[#EDFF60] tracking-wide uppercase mb-6">
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
    <div className="min-h-screen relative">
      {/* Background Image - Same as Hero */}
      <img 
        alt="Festival NATUR - Empresa Registration" 
        className="absolute h-full w-full object-cover inset-0" 
        src="/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg" 
      />
      
      {/* Light Gradient Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Top Navigation - Fixed with Glassmorphism (same as Hero) */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <span className="font-bold text-2xl font-gasoek" style={{ color: '#EDFF60' }}>N</span>
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-gasoek tracking-wide" style={{ color: '#EDFF60' }}>
              REGISTRO DE EMPRESA
            </h1>
            <p className="text-lg text-white max-w-2xl mx-auto font-medium">
              Únete a la comunidad de empresas comprometidas con el turismo sostenible
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-between mb-4">
              {[1, 2, 3, 4, 5, 6].map((stepNumber) => (
                <div 
                  key={stepNumber}
                  className={`flex flex-col items-center ${stepNumber <= step ? "opacity-100" : "opacity-50"}`}
                >
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 font-bold border-2
                    ${stepNumber < step ? "text-black border-transparent" : 
                      stepNumber === step ? "text-black border-transparent" : "text-white border-white/50"}`}
                    style={{ backgroundColor: stepNumber <= step ? '#EDFF60' : 'transparent' }}
                  >
                    {stepNumber < step ? "✓" : stepNumber}
                  </div>
                  <span className="text-xs hidden sm:block font-bold" style={{ color: '#EDFF60' }}>
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
            <div className="h-2 bg-white/20 rounded-full">
              <div 
                className="h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${(step / 6) * 100}%`,
                  backgroundColor: '#EDFF60'
                }}
              ></div>
            </div>
          </div>

          <Card className="shadow-2xl backdrop-blur-md bg-white/10 border-2" style={{ borderColor: '#EDFF60' }}>
            <CardContent className="pt-6 backdrop-blur-md bg-white/5">
              {renderStep()}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
