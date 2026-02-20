'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { HOMEPAGE_IMAGES } from '@/lib/r2-images';

const images = HOMEPAGE_IMAGES.industry.world_food;

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

/* ──────────────────────────────────────────────
   데이터
   ────────────────────────────────────────────── */

const MENU_DATA = [
  { country: '미국', items: ['뉴욕 핫도그', '햄버거', '감자튀김', '쉬림프'] },
  { country: '베트남', items: ['분짜', '열대 음료'] },
  { country: '일본', items: ['타꼬야끼', '오꼬노미야끼', '초밥', '야끼소바빵'] },
  { country: '호주', items: ['스테이크', '소세지'] },
  { country: '이탈리아', items: ['파스타', '젤라또 아이스크림'] },
  { country: '튀르키에', items: ['케밥', '튀르키에 아이스크림'] },
  { country: '동남아시아', items: ['팟타이', '나시고랭', '쌀국수'] },
  {
    country: '디저트 / 음료',
    items: ['츄러스', '아이스크림', '에이드', '커피', '티'],
  },
];

const COMPARISON_DATA = [
  {
    label: '메뉴 다양성',
    normal: '제한적, 중복 가능',
    special: (
      <>
        <span className="text-brand-primary font-semibold">8개국 대표 음식</span> 제공
      </>
    ),
  },
  {
    label: '상인회와 충돌',
    normal: '메뉴 겹침으로 인한 민원 발생',
    special: (
      <>
        메뉴 차별화로 <span className="text-brand-primary font-semibold">민원 최소화</span>
      </>
    ),
  },
  {
    label: '위생, 신선도',
    normal: '개별 관리, 편차 존재',
    special: (
      <>
        냉동차 보관 및{' '}
        <span className="text-brand-primary font-semibold">표준화된 위생 관리</span> 체계
      </>
    ),
  },
  {
    label: '환경 친화',
    normal: '일회용기 위주',
    special: (
      <>
        다회용기 사용,{' '}
        <span className="text-brand-primary font-semibold">친환경</span> 운영
      </>
    ),
  },
  {
    label: '운영 방식',
    normal: '개인 단위',
    special: (
      <>
        <span className="text-brand-primary font-semibold">단체 운영</span>으로 행정 절차
        간소화
      </>
    ),
  },
];

const BUBBLE_DATA = [
  {
    label: '동시 실현',
    bg: '#FF6B26',
    text: 'white',
    main: true,
  },
  { label: '차별성', bg: '#FF6B26', text: 'white' },
  { label: '효율', bg: '#FF9462', text: 'white' },
  { label: '만족도', bg: '#FFDDCD', text: '#FF6B26' },
  { label: '상생', bg: '#FBFBFB', text: '#FF6B26' },
];

/* ──────────────────────────────────────────────
   섹션 1 — 메뉴 소개
   ────────────────────────────────────────────── */

/**
 * CSS columns는 위→아래로 흐르므로, 시각적 행 배치를 유지하려면
 * 데이터를 열 순서로 재배치해야 함.
 *
 * Desktop (>1280px) 4열 × 2행:
 *   Row1: 미국(0)  베트남(1)  일본(2)    호주(3)
 *   Row2: 이탈(4)  튀르키(5)  동남아(6)  디저트(7)
 * → 열 순서: [0,4, 1,5, 2,6, 3,7]
 *
 * Tablet/Mobile (≤1280px) 3열 × 2행 + 마지막 2개 중앙:
 *   Row1: 미국(0)   베트남(1)  일본(2)
 *   Row2: 이탈(4)   튀르키(5)  동남아(6)
 *   Row3: [디저트(7)  호주(3)] ← 중앙 정렬
 * → 상위 6개 열 순서: [0,4, 1,5, 2,6]
 */
const DESKTOP_COL_ORDER = [0, 4, 1, 5, 2, 6, 3, 7];
const TABLET_COL_ORDER = [0, 4, 1, 5, 2, 6];
const TABLET_LAST_ROW = [7, 3]; // 디저트/음료, 호주 — 중앙 정렬
// Mobile 2열 × 4행: [미국,베트남] [일본,호주] [이탈리아,튀르키에] [동남아시아,디저트/음료]
const MOBILE_COL_ORDER = [0, 2, 4, 6, 1, 3, 5, 7];

function MenuSection() {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden py-16 md:py-24">
      {/* 배경 이미지 + 오버레이 */}
      <Image
        src={images.menu_description}
        alt="세계 음식 배경"
        fill
        className="object-cover"
        priority
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(36,37,39,0.5) 0%, #242527 100%)',
        }}
      />

      {/* 콘텐츠 */}
      <div className="relative z-10 container-content text-center">
        <h2 className="text-[18px] md:text-[40px] font-bold text-text-primary leading-snug mb-10 md:mb-16">
          다양한 문화가 어우러진 세계 음식을
          <br />
          한자리에서 만나보세요
        </h2>

        {/* Desktop (>1280px): 4열 × 2행 */}
        <div
          className="hidden [@media(min-width:1281px)]:block"
          style={{ columns: 4, columnGap: '24px' }}
        >
          {DESKTOP_COL_ORDER.map((dataIndex) => {
            const card = MENU_DATA[dataIndex];
            return (
              <motion.div
                key={card.country}
                className="rounded-lg text-left bg-[#35363A] break-inside-avoid mb-[24px]"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: dataIndex * 0.08 }}
              >
                <h3 className="text-[24px] font-semibold text-text-primary pt-[56px] px-[32px] mb-[27px]">
                  {card.country}
                </h3>
                <ul className="space-y-0.5 pb-[56px] px-[32px]">
                  {card.items.map((item) => (
                    <li
                      key={item}
                      className="text-[16px] font-medium text-text-primary before:content-['·'] before:mr-1"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Tablet (768px~1280px): 3열 + 마지막 2개 중앙 */}
        <div className="hidden md:block [@media(min-width:1281px)]:hidden">
          <div style={{ columns: 3, columnGap: '24px' }}>
            {TABLET_COL_ORDER.map((dataIndex) => {
              const card = MENU_DATA[dataIndex];
              return (
                <motion.div
                  key={card.country}
                  className="rounded-lg text-left bg-[#35363A] break-inside-avoid mb-[24px]"
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: dataIndex * 0.08 }}
                >
                  <h3 className="text-[24px] font-semibold text-text-primary pt-[56px] px-[32px] mb-[27px]">
                    {card.country}
                  </h3>
                  <ul className="space-y-0.5 pb-[56px] px-[32px]">
                    {card.items.map((item) => (
                      <li
                        key={item}
                        className="text-[16px] font-medium text-text-primary before:content-['·'] before:mr-1"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
          {/* 마지막 2개 중앙 정렬 */}
          <div className="flex justify-center gap-[24px]">
            {TABLET_LAST_ROW.map((dataIndex) => {
              const card = MENU_DATA[dataIndex];
              return (
                <motion.div
                  key={card.country}
                  className="rounded-lg text-left bg-[#35363A]"
                  style={{ width: 'calc((100% - 48px) / 3)' }}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: dataIndex * 0.08 }}
                >
                  <h3 className="text-[24px] font-semibold text-text-primary pt-[56px] px-[32px] mb-[27px]">
                    {card.country}
                  </h3>
                  <ul className="space-y-0.5 pb-[56px] px-[32px]">
                    {card.items.map((item) => (
                      <li
                        key={item}
                        className="text-[16px] font-medium text-text-primary before:content-['·'] before:mr-1"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile (<768px): 4열 × 2행 */}
        <div
          className="md:hidden"
          style={{ columns: 4, columnGap: '9px' }}
        >
          {DESKTOP_COL_ORDER.map((dataIndex) => {
            const card = MENU_DATA[dataIndex];
            return (
              <motion.div
                key={card.country}
                className="rounded-lg text-left bg-[#35363A] break-inside-avoid mb-[9px]"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: dataIndex * 0.06 }}
              >
                <h3 className="text-[10px] font-semibold text-text-primary pt-[21px] px-[8px] mb-[10px]">
                  {card.country}
                </h3>
                <ul className="space-y-0.5 pb-[21px] px-[8px]">
                  {card.items.map((item) => (
                    <li
                      key={item}
                      className="text-[8px] font-medium text-text-primary before:content-['·'] before:mr-1"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   섹션 2 — 차별성
   ────────────────────────────────────────────── */

function ComparisonTable() {
  return (
    <div className="w-full">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="w-[20%]" />
            <th className="w-[35%] bg-[#35363A] text-white text-[10px] md:text-[20px] font-medium py-[8px] md:py-[16px] pl-[8px] md:pl-[24px] text-left rounded-tl-lg">
              일반 푸드트럭
            </th>
            <th className="w-[45%] bg-brand-primary text-white text-[10px] md:text-[20px] font-medium py-[8px] md:py-[16px] pl-[8px] md:pl-[24px] text-left rounded-tr-lg">
              세계 음식 부스
            </th>
          </tr>
        </thead>
        <tbody>
          {COMPARISON_DATA.map((row, index) => (
            <tr
              key={row.label}
              className={`bg-white ${
                index < COMPARISON_DATA.length - 1
                  ? 'border-b border-[#E0E0E0]'
                  : ''
              } ${index === COMPARISON_DATA.length - 1 ? '[&>td:first-child]:rounded-bl-lg [&>td:last-child]:rounded-br-lg' : ''}`}
            >
              <td className="text-[8px] md:text-[16px] font-medium text-[#828282] py-[8px] md:py-[16px] pl-[8px] md:pl-[24px] border-r border-[#E0E0E0]">
                {row.label}
              </td>
              <td className="text-[8px] md:text-[16px] font-medium text-black py-[8px] md:py-[16px] pl-[8px] md:pl-[24px] border-r border-[#E0E0E0]">
                {row.normal}
              </td>
              <td className="text-[8px] md:text-[16px] font-medium text-black py-[8px] md:py-[16px] pl-[8px] md:pl-[24px]">
                {row.special}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BubbleUI() {
  const mainBubble = BUBBLE_DATA[0];
  const smallBubbles = BUBBLE_DATA.slice(1);

  return (
    <div className="bg-[#35363A]/80 rounded-2xl p-6 md:p-10 mt-6 md:mt-8">
      {/* >960px: 1행 가로 정렬 */}
      <div className="hidden [@media(min-width:961px)]:flex items-center justify-center gap-5">
        {/* 메인 버블 — boxShadow 24px + 간격 100px 확보 */}
        <div
          className="shrink-0 w-[120px] h-[120px] rounded-full flex items-center justify-center mr-[76px]"
          style={{
            backgroundColor: mainBubble.bg,
            color: mainBubble.text,
            boxShadow: '0 0 0 24px rgba(255,107,38,0.3)',
          }}
        >
          <span className="text-[20px] font-medium">{mainBubble.label}</span>
        </div>
        {smallBubbles.map((b) => (
          <div
            key={b.label}
            className="shrink-0 w-[120px] h-[120px] rounded-full flex items-center justify-center"
            style={{ backgroundColor: b.bg, color: b.text }}
          >
            <span className="text-[18px] font-medium">{b.label}</span>
          </div>
        ))}
      </div>

      {/* 768px~960px: 메인(좌) + 2×2 그리드(우), 120px 원, 72px 간격 */}
      <div className="hidden md:flex [@media(min-width:961px)]:hidden items-center justify-center gap-[72px]">
        <div
          className="shrink-0 w-[120px] h-[120px] rounded-full flex items-center justify-center"
          style={{
            backgroundColor: mainBubble.bg,
            color: mainBubble.text,
            boxShadow: '0 0 0 24px rgba(255,107,38,0.3)',
          }}
        >
          <span className="text-[20px] font-medium">{mainBubble.label}</span>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {smallBubbles.map((b) => (
            <div
              key={b.label}
              className="w-[120px] h-[120px] rounded-full flex items-center justify-center"
              style={{ backgroundColor: b.bg, color: b.text }}
            >
              <span className="text-[18px] font-medium">{b.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* <768px: 1행 가로 정렬, 45px 원, 동시실현↔차별성 32px / 나머지 9px */}
      <div className="md:hidden flex items-center justify-center">
        <div
          className="shrink-0 w-[45px] h-[45px] rounded-full flex items-center justify-center mr-[32px]"
          style={{
            backgroundColor: mainBubble.bg,
            color: mainBubble.text,
            boxShadow: '0 0 0 8px rgba(255,107,38,0.3)',
          }}
        >
          <span className="text-[8px] font-medium">{mainBubble.label}</span>
        </div>
        <div className="flex items-center gap-[9px]">
          {smallBubbles.map((b) => (
            <div
              key={b.label}
              className="shrink-0 w-[45px] h-[45px] rounded-full flex items-center justify-center"
              style={{ backgroundColor: b.bg, color: b.text }}
            >
              <span className="text-[8px] font-medium">{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DifferentiatorSection() {
  return (
    <section className="relative flex flex-col items-center overflow-hidden py-16 md:py-24">
      {/* 배경 이미지 + 오버레이 */}
      <Image
        src={images.differentiator_01}
        alt="차별성 배경"
        fill
        className="object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #242527 0%, rgba(36,37,39,0.5) 100%)',
        }}
      />

      {/* 콘텐츠 */}
      <div className="relative z-10 container-content">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-[18px] md:text-[40px] font-bold text-text-primary mb-2 md:mb-4">
            세계 음식 부스 이렇게 다릅니다.
          </h2>
          <p className="text-[10px] md:text-[16px] font-medium text-text-primary/80">
            일반 푸드트럭과 달리 어쩌구 저쩌구를 제공합니다.
          </p>
        </div>

        {/* Desktop >1280px: 표 + 빛 + 이미지 2열 */}
        <motion.div
          className="hidden [@media(min-width:1281px)]:flex items-stretch"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <div className="flex-1">
            <ComparisonTable />
          </div>
          {/* 표→이미지 연결 빛 (사다리꼴) — 표 헤더 높이만큼 상단 오프셋 */}
          <div className="relative shrink-0 flex flex-col">
            {/* 표 헤더 높이만큼 빈 공간 */}
            <div className="h-[52px] shrink-0" />
            {/* 나머지 영역(표 본문 높이)에 사다리꼴 + 이미지 */}
            <div className="flex-1 flex items-center">
              <div
                className="w-[180px] h-full"
                style={{
                  clipPath: 'polygon(0 0, 100% 20%, 100% 80%, 0 100%)',
                  background:
                    'linear-gradient(90deg, rgba(255,107,38,0.15) 0%, rgba(255,107,38,0.05) 100%)',
                }}
              />
              <div className="relative w-[261px] h-[262px] -ml-[40px]">
                <Image
                  src={images.differentiator_02}
                  alt="원형 다이어그램"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ≤1280px: 1열 스택 */}
        <motion.div
          className="[@media(min-width:1281px)]:hidden"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <ComparisonTable />
          <BubbleUI />
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   페이지
   ────────────────────────────────────────────── */
export default function WorldFoodPage() {
  return (
    <main>
      <MenuSection />
      <DifferentiatorSection />
    </main>
  );
}
