'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const PROCESS_DATA = [
  {
    number: '01',
    title: '행사 정보 접수',
    description: '행사 목적과 규모에 맞는 운영 계획 수립을 위해 사전 정보를 체계적으로 접수합니다.',
    cta: true,
  },
  {
    number: '02',
    title: '장소, 전기, 소방 협의',
    description: '현장 안전 확보를 위해 관계 기관 및 담당자와 사전 협의를 진행합니다.',
  },
  {
    number: '03',
    title: '부스 라인업, 배치도 확정',
    description: '행사 콘셉트와 동선 효율을 고려하여 최적의 부스 구성을 확정합니다.',
  },
  {
    number: '04',
    title: '민원 저감 대책 사전 공지',
    description: '소음·위생·교통 등 민원 요소를 사전에 분석하고 대응 방안을 안내합니다.',
  },
  {
    number: '05',
    title: '운영',
    description: '행사 당일 현장 관리 및 운영 총괄을 통해 안정적인 진행을 지원합니다.',
  },
  {
    number: '06',
    title: '매출, 만족도 조사 등 리포트 제출',
    description: '행사 종료 후 매출 및 만족도 데이터를 분석하여 결과 보고서를 제공합니다.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
};

function CTAButton({ className }: { className?: string }) {
  return (
    <Link
      href="/contact/event"
      className={`shrink-0 flex items-center gap-1 text-[10px] md:text-body-2 font-medium text-brand-primary hover:opacity-80 transition-opacity ${className ?? ''}`}
    >
      문의하기
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        className="w-3 h-3 md:w-3.5 md:h-3.5"
      >
        <path
          d="M4 10L10 4M10 4H5M10 4V9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}

export default function ProcessPage() {
  return (
    <main>
      <section className="bg-bg-inverse py-16 md:py-24">
        <div className="container-content">
          <div className="flex flex-col xl:flex-row xl:gap-[160px]">
            {/* 좌측 타이틀 */}
            <h2 className="text-[18px] min-[760px]:text-title-2 font-bold text-text-inverse shrink-0 xl:pt-2 mb-8 xl:mb-0">
              중앙회는 이런식으로
              <br />
              운영됩니다.
            </h2>

            {/* 우측 프로세스 리스트 */}
            <div className="flex-1">
              {PROCESS_DATA.map((step, index) => (
                <motion.div
                  key={step.number}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.08 }}
                >
                  {/* 상단 구분선: 번호 영역은 오렌지, 내용 영역은 회색 */}
                  <div className="flex">
                    <div className="shrink-0 w-[60px] min-[760px]:w-[100px] mr-6 min-[760px]:mr-10 h-[2px] bg-brand-primary" />
                    <div className="flex-1 h-px bg-[#CACACA]" />
                  </div>

                  <div className="flex items-start pt-3 min-[760px]:pt-4 pb-6 min-[760px]:pb-8">
                    {/* 번호 */}
                    <div className="shrink-0 w-[60px] min-[760px]:w-[100px] mr-6 min-[760px]:mr-10">
                      <p
                        className="text-[24px] min-[760px]:text-[32px] text-brand-primary font-normal leading-tight"
                        style={{ fontFamily: 'Aboreto, cursive' }}
                      >
                        {step.number}
                      </p>
                    </div>

                    {/* 프로세스 내용 */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[14px] min-[760px]:text-heading-2 font-semibold text-[#000000] mb-2 min-[760px]:mb-3">
                        {step.title}
                      </h3>
                      <div>
                        <p className="text-[10px] min-[760px]:text-body-2 font-medium text-[#000000]">
                          {step.description}
                        </p>
                        {step.cta && <CTAButton className="mt-2 min-[760px]:mt-3" />}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
