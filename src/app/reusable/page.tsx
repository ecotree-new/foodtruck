import Image from 'next/image';
import HeroSection from '@/components/reusable/HeroSection';
import RentalFlowSection from '@/components/reusable/RentalFlowSection';
import BusinessRangeSection from '@/components/reusable/BusinessRangeSection';
import WashingProcessSection from '@/components/reusable/WashingProcessSection';
import WashingFacilitySection from '@/components/reusable/WashingFacilitySection';
import PostWashingSection from '@/components/reusable/PostWashingSection';
import StatsSection from '@/components/reusable/StatsSection';
import { HOMEPAGE_IMAGES } from '@/lib/r2-images';

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

      {/* CTA 배너 */}
      <section className="relative py-28 md:py-36 lg:py-44">
        <Image
          src={HOMEPAGE_IMAGES.reusable.cta_bg}
          alt="CTA 배경"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container-content text-center">
          <h2 className="text-[18px] md:text-title-2 font-bold text-text-primary mb-[18px] md:mb-[48px]">
            친환경 다회용기의 시작, 에코트리와 함께하세요.
          </h2>
          <a
            href="https://ecotree.co.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-brand-primary text-text-primary font-semibold px-[24px] py-[6px] md:px-[64px] md:py-4 rounded text-[12px] md:text-[20px] hover:opacity-90 transition-opacity"
          >
            에코트리 홈페이지
          </a>
        </div>
      </section>
    </main>
  );
}
