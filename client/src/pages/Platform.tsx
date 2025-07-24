
import { ImpactIndicators } from "@/components/platform/ImpactIndicators";
import { NewsSection } from "@/components/platform/NewsSection";
import { QuickAccess } from "@/components/platform/QuickAccess";
import { PlatformBanner } from "@/components/platform/PlatformBanner";
import { PlatformArticles } from "@/components/platform/PlatformArticles";

const Platform = () => {
  return (
    <section className="min-h-[calc(100vh-56px)] w-full bg-[#FAFAF8]">
      <PlatformBanner />
      <div className="px-4 md:px-6 py-6">
        <QuickAccess />
        <div className="mt-8">
          <ImpactIndicators />
        </div>
        <div className="mt-10">
          <PlatformArticles />
        </div>
        <div className="my-10">
          <NewsSection />
        </div>
      </div>
    </section>
  );
};

export default Platform;
