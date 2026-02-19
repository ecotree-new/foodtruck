'use client';

import { REUSABLE_HERO } from '@/lib/constants';

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={REUSABLE_HERO.video} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center container-content">
        <h1 className="text-[30px] md:text-[64px] font-bold text-white">
          다회용기 운영의
          <br className="md:hidden" />
          {' '}기준을 만들다.
        </h1>
        <p className="text-[12px] md:text-[20px] font-medium text-white mt-4">
          에코트리는 다회용기 운영의 전 과정을
          <br className="md:hidden" />
          {' '}직접 설계하고 관리합니다.
        </p>
      </div>
    </section>
  );
}
