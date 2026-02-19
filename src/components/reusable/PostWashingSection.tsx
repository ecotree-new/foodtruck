'use client';

import Image from 'next/image';
import { REUSABLE_POST_WASHING } from '@/lib/constants';

export default function PostWashingSection() {
  const cards = REUSABLE_POST_WASHING.cards;

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-[#FBFBFB] relative z-10">
      <div className="container-content">
        {/* Header */}
        <div className="mb-10 md:mb-14 lg:mb-16">
          <h2 className="text-[18px] md:text-[40px] font-bold text-[#111111] mb-2">
            {REUSABLE_POST_WASHING.title}
          </h2>
          <p className="text-[12px] md:text-[20px] font-medium text-[#111111]">
            {REUSABLE_POST_WASHING.subtitle}
          </p>
        </div>

        {/* Cards - 2 columns */}
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="relative h-[200px] md:h-[240px] lg:h-[280px] rounded-2xl overflow-hidden bg-gray-200"
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover object-left"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

              {/* Content */}
              <div className="absolute top-8 left-6 md:top-10 md:left-8 lg:top-14 lg:left-12">
                <h3 className="text-white text-[16px] md:text-[32px] lg:text-[32px] font-semibold mb-2">
                  {card.title}
                </h3>
                <p className="text-white text-[12px] md:text-[20px]">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
