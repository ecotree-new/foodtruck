'use client';

import Image from 'next/image';
import { REUSABLE_BUSINESS_RANGE } from '@/lib/constants';

export default function BusinessRangeSection() {
  const cards = REUSABLE_BUSINESS_RANGE.cards;
  const duplicatedCards = [...cards, ...cards];

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-[#FBFBFB] relative z-10">
      <div className="container-content w-full overflow-hidden">
        {/* Header */}
        <div className="mb-8 lg:mb-16">
          <p className="text-[10px] md:text-[16px] text-[#FF6B26] font-medium mb-2">
            {REUSABLE_BUSINESS_RANGE.label}
          </p>
          <h2 className="text-[18px] md:text-[40px] font-bold text-[#111111]">
            {REUSABLE_BUSINESS_RANGE.title}
          </h2>
        </div>

        {/* Infinite Slider */}
        <div className="relative overflow-hidden">
          <div className="animate-slide-business flex gap-4 md:gap-6">
            {duplicatedCards.map((card, index) => (
              <div
                key={`${card.id}-${index}`}
                className="flex-shrink-0 w-[240px] md:w-[280px] lg:w-[400px]"
              >
                <div className="relative aspect-[5/4] rounded-2xl overflow-hidden bg-gray-200">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover object-center"
                  />
                  {/* Orange Gradient Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(to top, rgba(36, 37, 39, 0.85) 0%, rgba(36, 37, 39, 0.4) 40%, transparent 70%)'
                    }}
                  />
                  {/* Title */}
                  <div className="absolute bottom-5 md:bottom-8 left-5 md:left-10 right-10">
                    <h3 className="text-white text-[10px] md:text-[24px] font-bold">
                      {card.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes slideBusinessRange {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-slide-business {
          animation: slideBusinessRange 25s linear infinite;
          width: fit-content;
        }
      `}</style>
    </section>
  );
}
