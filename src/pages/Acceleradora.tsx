
import { AcceleradoraBanner } from "@/components/acceleradora/AcceleradoraBanner";
import { StartupTools } from "@/components/acceleradora/StartupTools";
import { ProgramTimeline } from "@/components/acceleradora/ProgramTimeline";
import { Testimonials } from "@/components/acceleradora/Testimonials";
import { ApplicationCTA } from "@/components/acceleradora/ApplicationCTA";
import { SuccessStories } from "@/components/acceleradora/SuccessStories";
import { InvestmentOpportunities } from "@/components/acceleradora/InvestmentOpportunities";
import { Card, CardContent } from "@/components/ui/card";

const Acceleradora = () => {
  return (
    <div className="w-full">
      <AcceleradoraBanner />
      
      <div className="px-6">
        {/* Program Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white shadow hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-2 text-green-700">Programa de Aceleración</h2>
              <p className="text-gray-600">
                Un programa diseñado para impulsarte en el ecosistema emprendedor sostenible, con mentores 
                especializados y acceso a financiación regenerativa.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-2 text-green-700">Mentoría Especializada</h2>
              <p className="text-gray-600">
                Conecta con expertos en sostenibilidad, economía circular y regeneración para 
                potenciar el impacto positivo de tu proyecto.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-2 text-green-700">Networking Estratégico</h2>
              <p className="text-gray-600">
                Acceso a una red de contactos enfocada en la sostenibilidad y la innovación
                dentro del ecosistema NATUR.
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Próximas Convocatorias */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Próximas Convocatorias</h2>
          <div className="bg-white shadow rounded-lg p-6">
            <div className="space-y-4">
              <div className="border-b pb-3">
                <h3 className="font-semibold">Cohorte Primavera 2025</h3>
                <p className="text-sm text-gray-600">Inscripciones: 1 de Febrero - 15 de Marzo</p>
              </div>
              <div className="border-b pb-3">
                <h3 className="font-semibold">Programa de Verano 2025</h3>
                <p className="text-sm text-gray-600">Inscripciones: 1 de Mayo - 15 de Junio</p>
              </div>
              <div>
                <h3 className="font-semibold">Aceleración Internacional</h3>
                <p className="text-sm text-gray-600">Inscripciones: 1 de Septiembre - 15 de Octubre</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Success Stories */}
        <SuccessStories />
        
        {/* Startup Tools */}
        <StartupTools />
        
        {/* Investment Opportunities */}
        <InvestmentOpportunities />
        
        {/* Program Timeline */}
        <ProgramTimeline />
        
        {/* Testimonials */}
        <Testimonials />
        
        {/* Application CTA */}
        <ApplicationCTA />
      </div>
    </div>
  );
};

export default Acceleradora;
