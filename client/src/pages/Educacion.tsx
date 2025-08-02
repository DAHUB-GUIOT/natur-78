
import { IntroSection } from "@/components/educacion/IntroSection";
import { GuiasDestacadasSection } from "@/components/educacion/GuiasDestacadasSection";
import { TalleresSection } from "@/components/educacion/TalleresSection";
import { ColaboracionSection } from "@/components/educacion/ColaboracionSection";
import { EducacionQuickAccess } from "@/components/educacion/EducacionQuickAccess";
import { EducacionBanner } from "@/components/educacion/EducacionBanner";
import { MainLayout } from "@/components/layout/MainLayout";


const Educacion = () => {
  return (
    <MainLayout>
      <div className="w-full">
        <EducacionBanner />
        <div className="px-4 md:px-6 py-6">
          <EducacionQuickAccess />
          <div className="mt-8">
            <IntroSection />
          </div>
          <div className="mt-10">
            <GuiasDestacadasSection />
          </div>
          <div className="mt-10">
            <TalleresSection />
          </div>
          <div className="mt-10">
            <ColaboracionSection />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Educacion;
