import HeroSection from '@/components/reusable/HeroSection';
import RentalFlowSection from '@/components/reusable/RentalFlowSection';
import BusinessRangeSection from '@/components/reusable/BusinessRangeSection';
import WashingProcessSection from '@/components/reusable/WashingProcessSection';
import WashingFacilitySection from '@/components/reusable/WashingFacilitySection';
import PostWashingSection from '@/components/reusable/PostWashingSection';
import StatsSection from '@/components/reusable/StatsSection';

export default function ReusablePage() {
  return (
    <main>
      <HeroSection />
      <RentalFlowSection />
      <BusinessRangeSection />
      <WashingProcessSection />
      <WashingFacilitySection />
      <PostWashingSection />
      <StatsSection />
    </main>
  );
}
