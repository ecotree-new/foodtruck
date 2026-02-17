'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { HOMEPAGE_IMAGES } from '@/lib/r2-images';

const EFFECT_CARDS = [
  {
    icon: HOMEPAGE_IMAGES.main.expected_effect_01,
    title: '매출 · 만족 · 친환경 동시 달성',
    description: '체계적 운영으로 매출, 참가자 만족도, 환경 보호를 동시에 실현하는 운영 체계를 구축합니다.',
  },
  {
    icon: HOMEPAGE_IMAGES.main.expected_effect_02,
    title: '위생과 친절로 시민과 관광객의 만족도 높힘',
    description: '체계적 운영으로 매출, 참가자 만족도, 환경 보호를 동시에 실현하는 운영 체계를 구축합니다.',
  },
  {
    icon: HOMEPAGE_IMAGES.main.expected_effect_03,
    title: '지자체 상생을 통해 선순환 발행',
    description: '체계적 운영으로 매출, 참가자 만족도, 환경 보호를 동시에 실현하는 운영 체계를 구축합니다.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export default function ExpectedEffectSection() {
  return (
    <section className="bg-bg-default py-20 md:py-28 lg:py-32">
      <div className="container-foodtruck">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-[10px] md:text-body-2 text-text-primary mb-3">Expected Effects</p>
          <h2 className="text-[18px] md:text-title-2 lg:text-title-1 font-bold text-text-primary">
            기대효과
          </h2>
        </div>

        <div className="grid grid-cols-1 cards:grid-cols-2 xl:grid-cols-3 gap-6">
          {EFFECT_CARDS.map((card, index) => (
            <motion.div
              key={index}
              className={`bg-bg-raised${
                index === EFFECT_CARDS.length - 1
                  ? ' cards:col-span-2 xl:col-span-1'
                  : ''
              }`}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.15 }}
            >
              <div className="pt-[22.5px] pb-[22.5px] pl-[18px] pr-[18px] md:pt-[78.5px] md:pb-[78.5px] md:pl-[48px] md:pr-[48px]">
                <div className="relative w-16 h-16">
                  <Image
                    src={card.icon}
                    alt={card.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="mt-[27px] md:mt-[72px]">
                  <h3 className="text-[14px] md:text-heading-2 font-bold text-text-primary mb-[6px]">
                    {card.title}
                  </h3>
                  <p className="text-[10px] md:text-body-2 text-text-primary">
                    {card.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
