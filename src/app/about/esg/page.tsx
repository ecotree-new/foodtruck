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

const ESG_DATA = {
  environmental: [
    {
      image: HOMEPAGE_IMAGES.about.esg.environmental_01,
      title: '위생교육',
      bullets: [
        '체계적인 위생교육을 통한 식품 안전 기준 준수',
        '정기적 위생점검 및 교육 프로그램 운영',
        '탄소 저감을 통한 친환경 운영 제시',
      ],
    },
    {
      image: HOMEPAGE_IMAGES.about.esg.environmental_02,
      title: '에코트리',
      bullets: [
        '다회용기 사업',
        '일회용기 사용량 감소',
        '쓰레기 배출 저하',
      ],
    },
  ],
  social: [
    {
      image: HOMEPAGE_IMAGES.about.esg.social_01,
      title: '봉사활동',
      bullets: [
        '지역 행사와 연계한 공익 활동',
        '소외계층 대상 지원 활동',
        '지부 단위 사회공헌 연계',
      ],
    },
    {
      image: HOMEPAGE_IMAGES.about.esg.social_02,
      title: '기부',
      bullets: [
        '수익의 일부 사회 환원',
        '고향사랑 기부금 연계',
        '공공 가치 실현을 위한 기부 활동',
      ],
    },
    {
      image: HOMEPAGE_IMAGES.about.esg.social_03,
      title: '지역상생',
      bullets: ['지역 특산물·로컬 브랜드 연계 확대', '지역 문화 존중 행사 운영', '지역 자원 가치 확산'],
    },
    {
      image: HOMEPAGE_IMAGES.about.esg.social_04,
      title: '창업 교육',
      bullets: [
        '푸드트럭 창업 관련 정보 제공',
        '운영·관리 기준 안내',
        '안전한 창업 환경 조성',
      ],
    },
    {
      image: HOMEPAGE_IMAGES.about.esg.social_05,
      title: '청년 창업',
      bullets: [
        '푸드트럭 창업 진입 장벽 완화',
        '운영 경험 공유 및 현장 연계',
        '청년 창업 생태계 조성 기여',
      ],
    },
  ],
  governance: [
    {
      image: HOMEPAGE_IMAGES.about.esg.governance_01,
      title: '지부 중심 실행 체계',
      bullets: ['지부를 통한 체계적이고 지속 가능한 관리 기능'],
    },
    {
      image: HOMEPAGE_IMAGES.about.esg.governance_02,
      title: '표준화된 교육 운영',
      bullets: ['중앙회 교육 운영 방침을 통한 표준화된 교육 관리'],
    },
  ],
};

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
      <h2 className="text-[18px] md:text-title-2 font-bold text-text-inverse shrink-0">
        {title}
      </h2>
      <div className="h-[2px] flex-1 bg-brand-primary" />
    </div>
  );
}

function ESGCard({
  card,
  index,
  className,
  imageHeight,
}: {
  card: { image: string; title: string; bullets: string[] };
  index: number;
  className?: string;
  imageHeight: string;
}) {
  return (
    <motion.div
      className={`overflow-hidden ${className ?? ''}`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.15 }}
    >
      <div className={`relative ${imageHeight}`}>
        <Image
          src={card.image}
          alt={card.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="pt-4 md:pt-6">
        <h3 className="text-[14px] md:text-heading-2 font-semibold text-text-inverse mb-2 md:mb-3">
          {card.title}
        </h3>
        <div className="h-px bg-[#CACACA] mb-2 md:mb-3" />
        <ul className="space-y-1">
          {card.bullets.map((bullet, i) => (
            <li
              key={i}
              className="text-[10px] md:text-body-2 font-medium text-text-inverse flex items-start gap-1.5"
            >
              <span className="shrink-0">·</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function ESGPage() {
  return (
    <main>
      {/* 히어로 배너 */}
      <section className="relative h-[240px] md:h-[320px] flex items-center justify-center overflow-hidden">
        <Image
          src={HOMEPAGE_IMAGES.about.esg.title}
          alt="ESG 배경"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <h1 className="relative z-10 text-[24px] md:text-title-1 font-bold text-text-primary">
          ESG
        </h1>
      </section>

      {/* Goal 소개 */}
      <section className="bg-bg-inverse py-16 md:py-24">
        <div className="container-content text-center">
          <p className="text-[10px] md:text-heading-2 font-semibold text-brand-primary mb-4 md:mb-6">
            Goal
          </p>
          <h2 className="text-[12px] md:text-heading-1 font-semibold text-text-inverse leading-relaxed">
            세계음식 한국 푸드트럭 중앙회는 산업의 성장과 사회적 책임이 함께 가야
            한다는 인식 아래, ESG 경영 원칙을 기반으로 한 사업 운영을
            지향합니다.
          </h2>
        </div>
      </section>

      {/* Environmental */}
      <section className="bg-bg-inverse pb-16 md:pb-24">
        <div className="container-content">
          <SectionHeader title="Environmental" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ESG_DATA.environmental.map((card, index) => (
              <ESGCard key={index} card={card} index={index} imageHeight="h-[220px] md:h-[320px]" />
            ))}
          </div>
        </div>
      </section>

      {/* Social */}
      <section className="bg-bg-inverse pb-16 md:pb-24">
        <div className="container-content">
          <SectionHeader title="Social" />
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            {ESG_DATA.social.map((card, index) => (
              <ESGCard
                key={index}
                card={card}
                index={index}
                imageHeight="h-[160px] md:h-[220px]"
                className={
                  index < 3
                    ? `md:col-span-3 lg:col-span-2${index === 2 ? ' md:col-span-6 lg:col-span-2' : ''}`
                    : 'md:col-span-3'
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* Governance */}
      <section className="bg-bg-inverse pb-16 md:pb-24">
        <div className="container-content">
          <SectionHeader title="Governance" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ESG_DATA.governance.map((card, index) => (
              <ESGCard key={index} card={card} index={index} imageHeight="h-[220px] md:h-[320px]" />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
