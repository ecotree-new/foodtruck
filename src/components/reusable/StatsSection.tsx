'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import CountUp from '@/components/ui/CountUp';
import { REUSABLE_STATS } from '@/lib/constants';

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [trigger, setTrigger] = useState(0);
  const [hasLeft, setHasLeft] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (hasLeft) {
              setTrigger(prev => prev + 1);
              setHasLeft(false);
            } else if (trigger === 0) {
              setTrigger(1);
            }
          } else {
            setHasLeft(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasLeft, trigger]);

  return (
    <section ref={sectionRef} className="relative z-10 pt-20 pb-40 md:pt-28 md:pb-60 lg:pt-36 lg:pb-80 bg-[#FBFBFB] overflow-hidden">
      {/* Background Graph Image */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1100px]">
        <Image
          src={REUSABLE_STATS.backgroundImage}
          alt="Statistics Background"
          width={1110}
          height={300}
          className="w-[1100px] h-auto"
        />
      </div>

      <div className="container-content relative z-10">
        {/* Header */}
        <div className="text-center mb-[56px] md:mb-[140px]">
          <h2 className="text-[18px] md:text-[40px] font-bold text-[#111111] mb-3">
            {REUSABLE_STATS.title}
          </h2>
          <p className="text-[12px] md:text-[20px] font-medium text-[#010101]">
            {REUSABLE_STATS.subtitle}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="flex justify-between">
          {REUSABLE_STATS.stats.map((stat) => (
            <div key={stat.id} className="text-center">
              <p className="text-[8px] md:text-[20px] font-medium text-[#111111] mb-2">
                {stat.label}
              </p>
              <div className="flex items-baseline gap-1 justify-center">
                <span className="text-[20px] md:text-[48px] font-bold text-[#111111]">
                  <CountUp
                    end={stat.value}
                    duration={2000}
                    trigger={trigger}
                  />
                </span>
                <span className="text-[8px] md:text-[20px] font-medium text-[#111111]">
                  {stat.unit}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
