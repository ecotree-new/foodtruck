import { HOMEPAGE_IMAGES } from '@/lib/r2-images';

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={HOMEPAGE_IMAGES.main.hero_video} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 container-foodtruck text-center">
        <h1 className="text-heading-1 md:text-title-1 lg:text-display-2 font-bold text-text-primary leading-tight">
          공공행사와 지역 축제를 위한
          <br />
          푸드트럭 운영 협의체
        </h1>
        <p className="mt-6 text-body-2 md:text-body-1 text-text-primary max-w-2xl mx-auto">
          행사 운영 경험을 기반으로 푸드트럭 운영을 보다 체계적으로 연결합니다.
        </p>
        <div className="mt-10">
          <a
            href="/contact"
            className="inline-block bg-brand-primary text-text-primary font-semibold px-[24px] py-[6px] md:px-[48px] md:py-[8px] rounded text-[12px] md:text-[20px] hover:opacity-90 transition-opacity"
          >
            문의하기
          </a>
        </div>
      </div>
    </section>
  );
}
