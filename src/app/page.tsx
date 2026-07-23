import { AdSlot } from "@/components/ads/AdSlot";
import { HomeHeroSection, HomeFeaturesSection } from "@/components/sections/HomeSections";

export default function HomePage() {
  return (
    <>
      <HomeHeroSection />
      <HomeFeaturesSection />
      <div className="mt-10 sm:mt-12">
        <AdSlot slotKey="home" minHeight={100} />
      </div>
    </>
  );
}
