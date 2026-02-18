'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { HOMEPAGE_IMAGES } from '@/lib/r2-images';

const images = HOMEPAGE_IMAGES.industry.operation;

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

const PROBLEM_DATA = [
  {
    title: '혼잡',
    description: '특정 시간, 공연 직후 대기열 급증',
    icon: images.problem_icon_01,
  },
  {
    title: '민원 요인',
    description: '연기/ 냄새, 소음, 쓰레기 적치',
    icon: images.problem_icon_02,
  },
  {
    title: '결제/ 정산',
    description: '계좌이체만 가능하고 계산서 발행이 어려움 등 불편함 존재',
    icon: images.problem_icon_03,
  },
];

const OPERATION_DATA = [
  {
    number: '01',
    title: '존 플래닝',
    description:
      '무분별한 푸드트럭 배치가 아닌, 수년간 노하우에 따라 푸드트럭을 배치하여 연기/냄새 등을 최소화합니다.',
    image: images.operation_01,
  },
  {
    number: '02',
    title: '라인 매니지먼트',
    description:
      '줄 서있는 동선을 사전에 구상하여 안전사고에 대비하고, 혼동을 최소화합니다.',
    image: images.operation_02,
  },
  {
    number: '03',
    title: '합리적 가격 / 편리한 결제',
    description:
      '현금 / 모바일, 지역화폐 등 다양한 결제수단을 이용할 수 있으며, 부가세 포함 영수증이 발행됩니다.',
    image: images.operation_03,
  },
  {
    number: '04',
    title: '위생 관리',
    description:
      '냄새 저감 장치, 오수 기름 분리 시설을 갖추고 정기 안전 점검을 실시하며, 클린업 브리게이드를 운영하여 위생을 관리합니다.',
    image: images.operation_04,
  },
];

const EFFECT_DATA = [
  {
    label: '일회용품 사용 감소율',
    value: '60%',
    type: 'image' as const,
  },
  {
    label: '대기열 감소율',
    value: '25%',
    type: 'dark' as const,
  },
  {
    label: '재방문 의사율',
    value: '80%',
    type: 'orange' as const,
  },
  {
    label: '소음·연기·쓰레기 민원',
    value: '최소화',
    type: 'dark' as const,
  },
];

/* ──────────────────────────────────────────────
   섹션 1 — 문제점
   ────────────────────────────────────────────── */
function ProblemSection() {
  return (
    <section className="relative min-h-[400px] md:min-h-[560px] flex flex-col items-center justify-center overflow-hidden py-16 md:py-24">
      {/* 배경 이미지 + 오버레이 */}
      <Image
        src={images.problem}
        alt="문제점 배경"
        fill
        className="object-cover"
        priority
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #8B5942 0%, rgba(36, 37, 39, 0.85) 83.65%, #242527 100%)',
        }}
      />

      {/* 콘텐츠 */}
      <div className="relative z-10 container-content text-center">
        <p className="text-[6px] md:text-body-2 font-medium text-text-primary mb-2 md:mb-4">
          Expected Effects
        </p>
        <h2 className="text-[15px] md:text-title-2 font-bold text-text-primary mb-8 md:mb-12">
          문제점
        </h2>

        {/* 카드 그리드 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 max-lg:grid-cols-2">
          {PROBLEM_DATA.map((card, index) => (
            <motion.div
              key={card.title}
              className={`bg-black/40 backdrop-blur rounded-lg px-[21px] py-[26.26px] md:px-[56px] md:py-[70px] flex flex-col justify-between min-h-[160px] md:min-h-[200px] text-left ${
                index === 2 ? 'max-lg:col-span-2' : ''
              }`}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.15 }}
            >
              <div>
                <h3 className="text-[9px] md:text-heading-2 font-semibold text-text-primary mb-2 md:mb-3">
                  {card.title}
                </h3>
                <p className="text-[6px] md:text-body-2 font-medium text-text-primary">
                  {card.description}
                </p>
              </div>
              <div className="flex justify-end mt-[45.5px] md:mt-[122px]">
                <div className="relative w-[40px] h-[40px] md:w-[64px] md:h-[64px]">
                  <Image
                    src={card.icon}
                    alt={card.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   섹션 2 — 운영 방식
   ────────────────────────────────────────────── */
function OperationSection() {
  return (
    <section className="bg-bg-default py-16 md:py-24">
      <div className="container-content">
        {/* 타이틀: 태블릿 중앙, 데스크톱 좌측 */}
        <h2 className="text-[15px] md:text-title-2 font-bold text-text-primary mb-12 md:mb-16 max-xl:text-center">
          운영 방식
        </h2>

        {/* 데스크톱(>1024px): 세로 리스트, 좌우 배치 */}
        <div className="hidden lg:flex flex-col gap-0 px-[72px] pb-[72px]">
          {OPERATION_DATA.map((card, index) => (
            <motion.div
              key={card.number}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex flex-row items-center justify-between py-14 gap-12">
                <div className="flex-1">
                  <p
                    className="text-[72px] text-brand-primary font-normal leading-tight mb-4"
                    style={{ fontFamily: 'Aboreto, cursive' }}
                  >
                    {card.number}
                  </p>
                  <h3 className="text-heading-1 font-semibold text-text-primary mb-4">
                    {card.title}
                  </h3>
                  <p className="text-body-1 font-medium text-text-primary">
                    {card.description}
                  </p>
                </div>
                <div className="relative max-w-[360px] w-full aspect-square shrink-0">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              {index < OPERATION_DATA.length - 1 && (
                <div className="h-px bg-[#898DA1]" />
              )}
            </motion.div>
          ))}
        </div>

        {/* 태블릿(≤1024px): 2x2 그리드, 텍스트 위 + 이미지 아래 */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-x-6">
          {OPERATION_DATA.map((card, index) => (
            <motion.div
              key={card.number}
              className="flex flex-col"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex flex-col py-10 md:py-12">
                <div>
                  <p
                    className="text-[24px] md:text-[48px] text-brand-primary font-normal leading-tight mb-2 md:mb-3"
                    style={{ fontFamily: 'Aboreto, cursive' }}
                  >
                    {card.number}
                  </p>
                  <h3 className="text-[12px] md:text-heading-2 font-semibold text-text-primary mb-2 md:mb-3">
                    {card.title}
                  </h3>
                  <p className="text-[10px] md:text-body-2 font-medium text-text-primary">
                    {card.description}
                  </p>
                </div>
                <div className="relative w-full max-w-[280px] aspect-square mx-auto mt-6 md:mt-8">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="h-px bg-[#898DA1]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   섹션 3 — 기대 효과
   ────────────────────────────────────────────── */
function ExpectedEffectSection() {
  return (
    <section className="bg-bg-default py-16 md:py-24">
      <div className="container-content">
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-16">
          {/* 좌측 타이틀 */}
          <h2 className="text-[15px] md:text-title-2 font-bold text-text-primary shrink-0 lg:pt-4">
            기대 효과
          </h2>

          {/* 우측 카드 그리드 */}
          <div className="flex-1 flex flex-col gap-4 md:gap-6">
            {/* Row 1 — 이미지 배경 full-width */}
            <motion.div
              className="relative rounded-[16px] overflow-hidden min-h-[140px] md:min-h-[200px] p-6 md:p-10 flex flex-col justify-end"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              <Image
                src={images.expected_effect}
                alt="일회용품 사용 감소율"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="relative z-10">
                <p className="text-[10px] md:text-body-1 font-medium text-text-primary mb-1 md:mb-2">
                  {EFFECT_DATA[0].label}
                </p>
                <p className="text-[18px] md:text-title-1 font-bold text-text-primary">
                  {EFFECT_DATA[0].value}
                </p>
              </div>
            </motion.div>

            {/* Row 2 — 2열 */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {/* 대기열 감소율 — 다크 */}
              <motion.div
                className="bg-bg-raised rounded-[16px] p-6 md:p-10 min-h-[120px] md:min-h-[160px] flex flex-col justify-end"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: 0.1 }}
              >
                <p className="text-[10px] md:text-body-1 font-medium text-text-primary mb-1 md:mb-2">
                  {EFFECT_DATA[1].label}
                </p>
                <p className="text-[18px] md:text-title-1 font-bold text-text-primary">
                  {EFFECT_DATA[1].value}
                </p>
              </motion.div>

              {/* 재방문 의사율 — 오렌지 */}
              <motion.div
                className="bg-brand-primary rounded-[16px] p-6 md:p-10 min-h-[120px] md:min-h-[160px] flex flex-col justify-end"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-[10px] md:text-body-1 font-medium text-text-primary mb-1 md:mb-2">
                  {EFFECT_DATA[2].label}
                </p>
                <p className="text-[18px] md:text-title-1 font-bold text-text-primary">
                  {EFFECT_DATA[2].value}
                </p>
              </motion.div>
            </div>

            {/* Row 3 — full-width 다크 */}
            <motion.div
              className="bg-bg-raised rounded-[16px] p-6 md:p-10 min-h-[120px] md:min-h-[160px] flex flex-col justify-end"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-[10px] md:text-body-1 font-medium text-text-primary mb-1 md:mb-2">
                {EFFECT_DATA[3].label}
              </p>
              <p className="text-[18px] md:text-title-1 font-bold text-text-primary">
                {EFFECT_DATA[3].value}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   페이지
   ────────────────────────────────────────────── */
export default function OperationPage() {
  return (
    <main>
      <ProblemSection />
      <OperationSection />
      <ExpectedEffectSection />
    </main>
  );
}
