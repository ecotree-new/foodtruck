'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { HOMEPAGE_IMAGES } from '@/lib/r2-images';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

const BRANCH_ROLE_DATA = [
  {
    image: HOMEPAGE_IMAGES.about.organization.branch_role_01,
    number: '01',
    title: '지역 행사 운영 지원',
    bullets: [
      '중앙회에서 기획한 정책·캠페인·교육 프로그램을 지역 단위로 실행',
      '지역 특성에 맞게 운영 방식 조정 및 현장 관리',
      '행사 준비부터 운영, 종료 후 정리까지 전 과정 담당',
      '참여자 관리, 현장 이슈 대응, 결과 정리 및 피드백 전달',
    ],
  },
  {
    image: HOMEPAGE_IMAGES.about.organization.branch_role_02,
    number: '02',
    title: '위생·안전 관리 협력',
    bullets: [
      '중앙회 기준에 따른 위생·안전 가이드라인 현장 적용',
      '정기 점검 및 현장 확인을 통한 운영 품질 유지',
      '문제 발생 시 즉각적인 조치 및 중앙회 공유',
      '지부 간 운영 품질 편차 최소화 역할',
    ],
  },
  {
    image: HOMEPAGE_IMAGES.about.organization.branch_role_03,
    number: '03',
    title: '지역 사회공헌 활동 연계',
    bullets: [
      '지자체, 지역 기관, 협력 단체와의 실무적 소통 담당',
      '지역 특화 협력 모델 발굴 및 중앙회 연계',
      '지역 사회공헌 활동 기획 및 참여 유도',
      '중앙회와 지역을 연결하는 공식 커뮤니케이션 채널 역할',
    ],
  },
];

const BRANCH_PRINCIPLE_DATA = [
  {
    image: HOMEPAGE_IMAGES.about.organization.branch_principle_01,
    title: '지역 행사 운영 지원',
    bullets: [
      '중앙회가 수립한 정책·운영 기준을 기반으로 지부 운영',
      '현장 판단이 필요한 부분은 지부에서 자율적으로 대응',
      '주요 사항은 중앙회와 공유하며 일관성 유지',
    ],
  },
  {
    image: HOMEPAGE_IMAGES.about.organization.branch_principle_02,
    title: '중앙 관리 체계 하 운영',
    bullets: [
      '모든 지부는 동일한 운영 흐름과 기준 사용',
      '인수인계, 신규 지부 확대 시에도 빠른 안정화 가능',
      "운영 방식이 '사람'이 아닌 '시스템'에 의해 유지됨",
    ],
  },
  {
    image: HOMEPAGE_IMAGES.about.organization.branch_principle_03,
    title: '지역 행사 운영 지원',
    bullets: [
      '주요 활동 결과는 정기적으로 중앙회에 공유',
      '운영 기록과 자료를 체계적으로 관리',
      '필요 시 재무·행정 사항은 중앙회 기준에 따라 처리',
    ],
  },
];

export default function OrganizationPage() {
  return (
    <main>
      {/* 섹션 1: 히어로 배너 */}
      <section className="relative h-[240px] md:h-[320px] flex items-center justify-center overflow-hidden">
        <Image
          src={HOMEPAGE_IMAGES.about.organization.title}
          alt="조직 및 지부안내 배경"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <h1 className="relative z-10 text-[24px] md:text-title-1 font-bold text-text-primary">
          조직 및 지부안내
        </h1>
      </section>

      {/* 섹션 2: Organization 소개 */}
      <section className="bg-bg-inverse py-16 md:py-24">
        <div className="container-content text-center">
          <p className="text-[10px] md:text-heading-2 font-semibold text-brand-primary mb-4 md:mb-6">
            Organization
          </p>
          <h2 className="text-[12px] md:text-heading-1 font-semibold text-text-inverse leading-relaxed whitespace-pre-line">
            {'중앙회는 지역별 행사 특성과 운영 환경을 반영하기 위해\n지역 단위 지부 설립 및 운영 체계를 갖추고 있습니다.'}
          </h2>
        </div>
      </section>

      {/* 섹션 3: 지부 구조 (조직도) */}
      <section className="bg-bg-inverse pb-16 md:pb-24">
        <div className="container-content">
          {/* 타이틀 바 */}
          <div className="bg-bg-default py-3 md:py-4 text-center mb-10 md:mb-16">
            <h3 className="text-[10px] md:text-heading-2 font-semibold text-text-primary">
              지부 구조
            </h3>
          </div>

          {/* 조직도 — 비율: 데스크톱 180px 원 / 모바일 67.5px 원, scale 0.375 */}
          <div className="flex flex-col items-center">
            {/* Step 01 — 중앙회 */}
            <p className="mb-3 md:mb-8 text-[10px] md:text-body-1 font-medium text-text-inverse">
              정책 수립 · 표준 기준 관리
            </p>

            {/* 원 + 감싸는 하단 반원 아크 */}
            {/* 데스크톱: 원 180px, 간격 40px, 아크 260x130 / 모바일: 원 68px, 간격 15px, 아크 98x49 */}
            <div className="relative flex flex-col items-center pb-[15px] md:pb-[40px]">
              <div className="w-[68px] h-[68px] md:w-[180px] md:h-[180px] rounded-full bg-brand-primary flex flex-col items-center justify-center shadow-[0_0_0_6px_rgba(255,107,38,0.15)] md:shadow-[0_0_0_16px_rgba(255,107,38,0.15)] z-10">
                <span className="text-[8px] md:text-label-1 font-medium text-text-primary">
                  Step 01
                </span>
                <span className="text-[12px] md:text-heading-2 font-semibold text-text-primary">
                  중앙회
                </span>
              </div>
              {/* 하단 반원: 원 중심에서 시작 */}
              <div
                className="absolute left-1/2 -translate-x-1/2 top-[34px] md:top-[90px] w-[98px] h-[49px] md:w-[260px] md:h-[130px] border-[0.75px] md:border-2 border-[#CACACA] border-t-0 md:border-t-0 rounded-b-full"
              />
            </div>

            {/* 아크 중앙에서 나오는 화살표 */}
            <div className="flex flex-col items-center">
              <div className="w-[0.75px] md:w-0.5 h-[8px] md:h-7 bg-[#CACACA]" />
              <svg width="12" height="8" viewBox="0 0 12 8" className="text-[#CACACA]">
                <path d="M6 8L0 0h12L6 8z" fill="currentColor" />
              </svg>
            </div>

            {/* 지역 실행 라벨 */}
            <p className="my-2 md:my-6 text-[10px] md:text-body-1 font-medium text-text-inverse">
              지역 실행 · 현장 관리
            </p>

            {/* Step 02 — 지부 A/B/C */}
            {/* 데스크톱: 원 140px, 아크 gap 20px, 아크 180x90, gap 112px */}
            {/* 모바일: 원 53px, 아크 gap 8px, 아크 69x35, gap 42px */}
            <div className="flex flex-col items-center">
              <div className="relative">
                {/* 가로 연결선 */}
                <div className="absolute top-[5px] md:top-[16px] left-[34px] md:left-[70px] right-[34px] md:right-[70px] h-[0.75px] md:h-0.5 bg-[#CACACA]" />

                <div className="flex gap-[42px] md:gap-[112px] items-start">
                  {['지부 A', '지부 B', '지부 C'].map((name, i) => (
                    <div key={i} className="relative flex flex-col items-center">
                      {i === 1 ? (
                        <div className="w-[0.75px] md:w-0.5 h-[12px] md:h-[40px] bg-[#CACACA] mx-auto" />
                      ) : (
                        <>
                          <div className="h-[5px] md:h-[16px]" />
                          <div className="w-[0.75px] md:w-0.5 h-[7px] md:h-[24px] bg-[#CACACA] mx-auto" />
                        </>
                      )}
                      {/* 상단 반원 아크 */}
                      <div
                        className="absolute left-1/2 -translate-x-1/2 top-[12px] md:top-[40px] w-[84px] h-[42px] md:w-[180px] md:h-[90px] border-[0.75px] md:border-2 border-[#CACACA] border-b-0 md:border-b-0 rounded-t-full"
                      />
                    {/* 원 */}
                    <div className="mt-[8px] md:mt-[20px] w-[68px] h-[68px] md:w-[140px] md:h-[140px] rounded-full bg-[#373737] flex flex-col items-center justify-center z-10">
                      <span className="text-[8px] md:text-label-1 font-medium text-text-primary">
                        Step 02
                      </span>
                      <span className="text-[12px] md:text-heading-2 font-semibold text-text-primary">
                        {name}
                      </span>
                    </div>
                    {/* 중앙 지부(B)에서만 화살표 */}
                    {i === 1 && (
                      <div className="flex flex-col items-center">
                        <div className="w-[0.75px] md:w-0.5 h-[8px] md:h-7 bg-[#CACACA]" />
                        <svg width="12" height="8" viewBox="0 0 12 8" className="text-[#CACACA]">
                          <path d="M6 8L0 0h12L6 8z" fill="currentColor" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
                </div>
              </div>
            </div>

            {/* 행사 운영 라벨 */}
            <p className="my-2 md:my-6 text-[10px] md:text-body-1 font-medium text-text-inverse">
              행사 운영 · 서비스 제공
            </p>

            {/* Step 03 — 현장 x4 */}
            <div className="flex flex-col items-center w-full">
              {/* 트리 연결선 */}
              <div className="relative w-full max-w-[1280px] h-[12px] md:h-[40px]">
                <div className="absolute left-1/2 top-0 w-[0.75px] md:w-0.5 h-[5px] md:h-4 bg-[#CACACA] -translate-x-1/2" />
                <div className="absolute top-[5px] md:top-[16px] left-[12.5%] right-[12.5%] h-[0.75px] md:h-0.5 bg-[#CACACA]" />
                <div className="absolute top-[5px] md:top-[16px] left-[12.5%] w-[0.75px] md:w-0.5 h-[7px] md:h-[24px] bg-[#CACACA]" />
                <div className="absolute top-[5px] md:top-[16px] left-[37.5%] w-[0.75px] md:w-0.5 h-[7px] md:h-[24px] bg-[#CACACA]" />
                <div className="absolute top-[5px] md:top-[16px] left-[62.5%] w-[0.75px] md:w-0.5 h-[7px] md:h-[24px] bg-[#CACACA]" />
                <div className="absolute top-[5px] md:top-[16px] right-[12.5%] w-[0.75px] md:w-0.5 h-[7px] md:h-[24px] bg-[#CACACA]" />
              </div>

              <div className="flex gap-2 md:gap-4 xl:gap-6 w-full justify-center">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 max-w-[302px] h-[38px] md:h-[100px] border border-brand-primary rounded-lg flex flex-col items-center justify-center"
                  >
                    <span className="text-[8px] md:text-label-1 font-medium text-brand-primary">
                      Step 03
                    </span>
                    <span className="text-[12px] md:text-heading-2 font-semibold text-brand-primary">
                      현장
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 섹션 4: 지부 역할 */}
      <section className="bg-bg-default py-[60px] md:py-[160px]">
        <div className="container-content">
          <div className="flex flex-col xl:flex-row xl:items-start xl:gap-16">
            {/* 타이틀 */}
            <h2 className="text-[18px] md:text-title-2 font-bold text-text-primary leading-none mb-8 xl:mb-0 xl:shrink-0">
              지부 역할
            </h2>

            {/* 카드 리스트 */}
            <div className="flex-1 flex flex-col">
              {BRANCH_ROLE_DATA.map((card, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.15 }}
                >
                  <div className={`flex flex-col md:flex-row md:items-start gap-6 md:gap-[5vw] xl:gap-[100px] pb-8 ${index > 0 ? 'pt-8' : ''}`}>
                    {/* 이미지: 모바일 full-width, md+ 320x180 고정 */}
                    <div className="relative w-full md:w-[320px] h-[200px] md:h-[180px] shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* 텍스트 */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                        <p
                          className="text-[24px] md:text-title-1 text-brand-primary font-normal leading-none"
                          style={{ fontFamily: 'Aboreto, cursive' }}
                        >
                          {card.number}
                        </p>
                        <h3 className="text-[14px] md:text-heading-2 font-semibold text-text-primary">
                          {card.title}
                        </h3>
                      </div>
                      <ul className="space-y-1.5">
                        {card.bullets.map((bullet, i) => (
                          <li
                            key={i}
                            className="text-[10px] md:text-body-2 font-medium text-text-primary flex items-start gap-1.5"
                          >
                            <span className="shrink-0">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* 구분선 */}
                  {index < BRANCH_ROLE_DATA.length - 1 && (
                    <div className="h-[0.38px] bg-white" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 섹션 5: 지부 운영 원칙 */}
      <section className="bg-bg-default py-[60px] md:py-[160px]">
        <div className="container-content">
          <h2 className="text-[18px] md:text-title-2 font-bold text-text-primary mb-8 md:mb-12">
            지부 운영 원칙
          </h2>

          <div className="grid grid-cols-1 cards:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {BRANCH_PRINCIPLE_DATA.map((card, index) => (
              <motion.div
                key={index}
                className={index === 2 ? 'cards:col-span-2 xl:col-span-1' : ''}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="pb-6">
                  {/* 아이콘 */}
                  <div className="relative w-[48px] h-[48px] md:w-[64px] md:h-[64px] mb-4 md:mb-6">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* 제목 */}
                  <h3 className="text-[14px] md:text-heading-2 font-semibold text-text-primary mb-3 md:mb-4">
                    {card.title}
                  </h3>

                  {/* 불릿 */}
                  <ul className="space-y-1.5">
                    {card.bullets.map((bullet, i) => (
                      <li
                        key={i}
                        className="text-[10px] md:text-body-2 font-medium text-text-primary flex items-start gap-1.5"
                      >
                        <span className="shrink-0">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 하단 구분선 */}
                <div className="h-[0.38px] bg-white" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 섹션 6: CTA 배너 */}
      <section className="relative py-28 md:py-36 lg:py-44">
        <Image
          src={HOMEPAGE_IMAGES.main.cta}
          alt="CTA 배경"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container-content text-center">
          <h2 className="text-[18px] md:text-title-2 font-bold text-text-primary mb-[18px] md:mb-[48px]">
            푸드트럭 중앙회와 함께 시작해보세요.
          </h2>
          <a
            href="/contact/event"
            className="inline-block bg-brand-primary text-text-primary font-semibold px-[24px] py-[6px] md:px-[64px] md:py-4 rounded text-[12px] md:text-[20px] hover:opacity-90 transition-opacity"
          >
            문의하기
          </a>
        </div>
      </section>
    </main>
  );
}
