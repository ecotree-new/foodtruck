import Image from 'next/image';
import { HOMEPAGE_IMAGES } from '@/lib/r2-images';

export default function CTASection() {
  return (
    <section className="relative py-28 md:py-36 lg:py-44">
      <Image
        src={HOMEPAGE_IMAGES.main.cta}
        alt="CTA 배경"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 container-foodtruck text-center">
        <h2 className="text-[18px] md:text-title-2 font-bold text-text-primary mb-[18px] md:mb-[48px]">
          행사의 품격을 높이는 선택, 중앙회와 함께하세요
        </h2>
        <a
          href="/contact/event"
          className="inline-block bg-brand-primary text-text-primary font-semibold px-[24px] py-[6px] md:px-[64px] md:py-4 rounded text-[12px] md:text-[20px] hover:opacity-90 transition-opacity"
        >
          문의하기
        </a>
      </div>
    </section>
  );
}
