'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { HOMEPAGE_IMAGES } from '@/lib/r2-images';

const BUSINESS_CARDS = [
  {
    image: HOMEPAGE_IMAGES.main.business_area_01,
    title: '푸드트럭 운영',
    description: '공공·민간 행사를 위한 운영 협의 및 연계',
  },
  {
    image: HOMEPAGE_IMAGES.main.business_area_02,
    title: '다회용기 서비스 운영',
    description: '지속가능한 행사 운영을 위한 환경 대응 사업',
  },
  {
    image: HOMEPAGE_IMAGES.about.esg.environmental_01,
    title: 'ESG 경영',
    description: '사회적 책임을 기반으로 한 사업 운영 체계',
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

export default function BusinessAreaSection() {
  return (
    <section className="bg-bg-default py-20 md:py-28 lg:py-32">
      <div className="container-foodtruck">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-[10px] md:text-body-2 text-text-primary mb-3">Our Business</p>
          <h2 className="text-[18px] md:text-title-2 lg:text-title-1 font-bold text-text-primary">
            주요 사업 분야
          </h2>
        </div>

        <div className="grid grid-cols-1 cards:grid-cols-2 xl:grid-cols-3 gap-6">
          {BUSINESS_CARDS.map((card, index) => (
            <motion.div
              key={index}
              className={`bg-bg-raised overflow-hidden${
                index === BUSINESS_CARDS.length - 1
                  ? ' cards:col-span-2 xl:col-span-1'
                  : ''
              }`}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.15 }}
            >
              <div className="relative aspect-[4/3] cards:aspect-auto cards:h-[308px]">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-[14px] md:text-heading-2 font-bold text-text-primary mb-2">
                  {card.title}
                </h3>
                <p className="text-[10px] md:text-body-2 text-text-primary">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
