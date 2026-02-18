import Image from 'next/image';
import { HOMEPAGE_IMAGES } from '@/lib/r2-images';

export default function GreetingPage() {
  return (
    <main>
      {/* 히어로 배너 */}
      <section className="relative h-[240px] md:h-[320px] flex items-center justify-center overflow-hidden">
        <Image
          src={HOMEPAGE_IMAGES.about.greeting.title}
          alt="인사말 배경"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <h1 className="relative z-10 text-[24px] md:text-title-1 font-bold text-text-primary">
          인사말
        </h1>
      </section>

      {/* 콘텐츠 */}
      <section className="bg-bg-inverse py-16 md:py-24">
        <div className="container-content">
          <div className="flex flex-col lg:flex-row gap-[30px] lg:gap-[80px]">
            {/* 이미지 */}
            <div className="relative w-full lg:w-[45%] aspect-[36/25] lg:aspect-auto lg:h-[567px] shrink-0">
              <Image
                src={HOMEPAGE_IMAGES.about.greeting.content}
                alt="인사말 대표 이미지"
                fill
                className="object-cover"
              />
            </div>

            {/* 텍스트 */}
            <div className="flex flex-col justify-center">
              <h2 className="text-[14px] md:text-heading-2 font-semibold text-text-inverse leading-snug">
                세계음식 한국 푸드트럭 중앙회가 되도록 하겠습니다.
              </h2>

              <div className="mt-8 md:mt-10 space-y-5 md:space-y-6 text-[10px] md:text-body-1 font-medium text-text-inverse leading-relaxed">
                <p>
                  푸드트럭 산업은 공공 행사와 지역 축제, 기업 행사 등 다양한 현장에서 중요한 역할을 수행해 왔습니다.
                </p>
                <p>
                  한국 세계음식 푸드트럭 중앙회는 현장 운영 경험을 바탕으로, 푸드트럭 운영을 보다 체계적이고 안정적으로 관리할 필요성에 공감한 여러 운영 주체들이 뜻을 모아 설립되었습니다.
                </p>
                <p>
                  중앙회는 특정 기업이나 개인을 위한 조직이 아닌, 푸드트럭 산업 전반의 신뢰도와 운영 기준을 높이기 위한 중앙 관리 역할을 수행하고자 합니다.
                </p>
                <p>
                  앞으로도 표준화된 운영 체계와 책임 있는 관리 방식을 통해 주최 기관이 신뢰할 수 있는 행사 운영 환경을 만들어 가겠습니다.
                </p>
              </div>

              <p
                className="mt-12 md:mt-16 text-[14px] md:text-body-1 text-text-inverse"
                style={{ fontFamily: 'GriunPolHumanrights' }}
              >
                한국 세계음식 푸드트럭 중앙회 일동
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
