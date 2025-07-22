
import { SearchSection } from "@/components/networking/SearchSection";
import { CommunitySection } from "@/components/networking/CommunitySection";
import { ForumsSection } from "@/components/networking/ForumsSection";
import { NetworkingBanner } from "@/components/networking/NetworkingBanner";
import { NetworkingArticles } from "@/components/networking/NetworkingArticles";
import { NetworkingQuickAccess } from "@/components/networking/NetworkingQuickAccess";
import { MainLayout } from "@/components/layout/MainLayout";

const Networking = () => {
  return (
    <MainLayout>
      <div className="w-full">
        <NetworkingBanner />
        <div className="px-4 md:px-6 py-6">
          <NetworkingQuickAccess />
          <div className="mt-8">
            <SearchSection />
          </div>
          <div className="mt-10">
            <NetworkingArticles />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
            <CommunitySection />
            <ForumsSection />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Networking;
